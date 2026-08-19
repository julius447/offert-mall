# Ampy digital quote — developer handover

**For:** Yassine
**From:** Julius (owner) — design and front-end are locked and owner-approved
**Repo:** `julius447/offert-mall`
**Status:** front-end complete and verified. No backend exists yet. That is your part.

---

## 1. What this is

A customer gets an SMS with a link. They open one page, read their quote, and do one of
three things: **accept**, **ask a question / request a change**, or **decline**. Each
outcome sends them to a different page.

**58 % of customers open this on a phone.** Mobile is not the secondary case, it is the
main case. Every measurement in this document was taken at 320, 360, 390, 430, 768, 1024,
1440 and 1920 px.

### The three pages

| Page | Path in this repo | Live preview |
|---|---|---|
| The quote | `r2-checkouten/` | https://julius447.github.io/offert-mall/r2-checkouten/ |
| Accepted | `offert-accepterad/` | https://julius447.github.io/Offer-accepted-preview/ |
| Declined | `offert-avbojd/` | https://julius447.github.io/offert-mall/offert-avbojd/ |

### Demo parameters (development only — remove nothing, they are inert in production)

| URL | What it shows you |
|---|---|
| `?forma=0` | The quote with the "Forma ditt köp" section switched off |
| `?expired=1` | The expired state |
| `?gaps=1` | Author notes that are hidden from customers |
| `offert-avbojd/?skal=pris` | The declined page as it arrives from the quote page |

### Run it locally

```bash
git clone https://github.com/julius447/offert-mall.git
cd offert-mall
python3 -m http.server 8000
```

Then open `http://localhost:8000/r2-checkouten/`. There is no build step, no bundler, no
dependencies. Plain HTML, CSS and one vanilla-JS file.

### Try the data contract before you write any server code

Open **`http://localhost:8000/exempel-integration.html`**. It is a two-pane harness: fill in
the fields on the left, press Render, and the real quote page is rebuilt on the right from
the object you just described. The exact `window.AMPY_OFFER` your server has to emit is
printed underneath the form, ready to copy.

Use it to answer "what happens if I leave this field out" without touching the CRM. The
harness is a development tool and is not part of the customer-facing delivery.

---

## 2. Repository map

```
offert-mall/
├─ r2-checkouten/index.html      the quote page (the main deliverable)
├─ assets/
│  ├─ tokens.css                 production design tokens — DO NOT EDIT
│  ├─ shared.css                 all styling for the quote page (~1150 lines)
│  ├─ offer-logic.js             CRM injection, pricing, panels, navigation
│  ├─ fonts/Outfit-*.woff2       self-hosted webfont (2 subsets)
│  ├─ *.webp / *.svg / *.png     logos and the trust-card photo
├─ offert-accepterad/            self-contained: index + styles + script + fonts
├─ offert-avbojd/                self-contained: index + styles + script + fonts
├─ exempel-integration.html      live harness for the data contract (dev tool)
├─ HANDOVER.md                   this document
├─ README.md                     build log in Swedish: every owner decision and every
│                                defect found, with measurements. Read it if you wonder
│                                *why* something is the way it is.
└─ r1-dokumentet/, r3-genomgangen/, gt-prisblock.html
                                 rejected design directions. Not part of the delivery.
                                 They share shared.css and offer-logic.js, so if you
                                 change those, they may break. That is acceptable.
```

**The two landing pages are deliberately self-contained.** They do not link
`assets/shared.css`. That file is 61 KB of render-blocking CSS of which exactly five
selectors matched anything on those pages. Giving them their own CSS took the declined
page from 110 KB to 43 KB. Keep it that way.

---

## 3. The data contract

Everything the CRM sends arrives in **one global object**, `window.AMPY_OFFER`, declared
**before** the page's own script tag.

```html
<script>
  window.AMPY_OFFER = { /* keys below */ };
</script>
<script src="../assets/offer-logic.js"></script>
```

**Load order is a hard requirement on the quote page.** `offer-logic.js` reads the object
at parse time. If your `<script>` comes after it, nothing is injected and the customer
sees the sample values.

### 3.1 How injection works

Four declarative hooks, all already present in the markup. You never edit the HTML; you
only supply data.

| Hook | Effect |
|---|---|
| `data-oa="key"` | sets `textContent` |
| `data-oa-list="key"` | rebuilds a `<ul>` from an array |
| `data-oa-photo="key"` | replaces the placeholder silhouette with an `<img>` |
| `data-base-amt` | the base amount, reformatted through the currency formatter |

**A missing, `null` or empty value leaves the sample text in place.** That is deliberate —
a half-filled quote is worse than an obviously-unfilled mockup. It also means: **an
unmapped field ships `[Bokare]` to a paying customer.** Section 8 has the check that
catches this.

### 3.2 Keys — the quote page

| Key | Type | Required | Appears | Sample today |
|---|---|---|---|---|
| `kund.fornamn` | string | **yes** | H1 greeting | `[name]` |
| `bokare.namn` | string | **yes** | **5 places** | `[Bokare]` |
| `bokare.profilbild_url` | URL | **yes** | avatar | silhouette placeholder |
| `offert.referens` | string | **yes** | header pill | `#2026-0187` |
| `offert.giltig_till_kort` | string | **yes** | header | `Gäller t.o.m. 16 sep 2026` |
| `offert.grundbelopp` | **number** | **yes** | receipt + total maths | `11900` |
| `offert.arbetsbeskrivning` | array | **yes** | "Det här gör vi" | 5 items |
| `offert.material` | array of strings | no | "Material som ingår" | 9 lines |
| `bokare.villkorstext` | string | **yes** | "Villkor för uppdraget" | bracketed placeholder |
| `offert.forma_ditt_kop` | **boolean** | no (default `true`) | see section 4 | on |
| `offert.ar_utgangen` | boolean | no | adds `is-expired` to `<body>` | off |
| `offert.gick_ut_kort` | string | only if expired | header in expired state | `Gick ut 16 sep 2026` |
| `offert.gick_ut_lang` | string | only if expired | the two expired banners | `16 september 2026` |

`bokare.namn` fills **seven** places from one key: five in the quote page markup, two
strings generated by `offer-logic.js` (the question panel's confirmation and its
empty-field warning), and one on the accepted page. Do not try to set them individually.

`offert.grundbelopp` **must be a number, not a string.** It sets both the receipt line and
the arithmetic behind the total. Send `18400`, not `"18 400 kr"`. The page formats it.

### 3.3 Keys — the two landing pages

| Key | Accepted | Declined |
|---|---|---|
| `offert.referens` | yes | yes |
| `bokare.namn` | yes | — |
| `offert.giltig_till_lang` | — | yes (long form: `16 september 2026`) |

**`offert.referens` takes the same value on all three pages: `#2026-0421`, without the
word "Offert".** All three pages carry that word in their own markup. This was a real trap
during review: the quote page originally held the whole string, so sending the same value
everywhere produced "Offert Offert #2026-0421" on the confirmation page. Fixed in markup,
one key, one format.

The quote page uses `giltig_till_**kort**` and the declined page `giltig_till_**lang**`.
Two different date formats, two keys, on purpose.

### 3.4 `offert.arbetsbeskrivning` — the work description

This is the tab the booker already fills in in the CRM today. Owner requirement: it must
come through as a clean bullet list.

```json
"offert.arbetsbeskrivning": [
  { "rubrik": "Byte av huvudcentral" },
  { "rubrik": "Ny jordfelsbrytare", "beskrivning": "Hela huset delas på två grupper." },
  { "rubrik": "Uppmärkning av gruppschema" }
]
```

- `rubrik` is required per item. `beskrivning` is optional and is only rendered when
  present — no empty paragraph is emitted, so a title-only item keeps the same rhythm as
  its siblings.
- A plain string is accepted as shorthand for `{ "rubrik": "..." }`.
- Text is set with `textContent`, never as HTML. **Free text from the CRM cannot inject
  markup into a customer's quote.** If the CRM field is rich text, you must decide how to
  flatten it — see open questions.

> **Why you should not hand-build this markup.** Each `<li>` is a two-column grid: a 26 px
> check disc, then exactly one child holding the text. Omit that wrapper and the paragraph
> becomes a third grid item and falls into the 26 px icon column — measured at 640 px it
> renders as a 26-px-wide, 180-px-tall ribbon of text. The list renderer in
> `offer-logic.js` already emits the correct structure. Use it.

### 3.5 `offert.material` — the materials list

Also already in the CRM's material section today.

```json
"offert.material": [
  "2 st modulkapsling 2×13",
  "1 st personskyddsautomat 10 A",
  "Installationsmaterial"
]
```

- A flat array of strings. One string per line.
- **Quantity and unit belong inside the string.** There is no separate quantity column in
  the design. Compose `"{antal} st {benämning}"` before sending.
- Lines without a quantity are fine (`Installationsmaterial`).
- If the array is empty, the whole expander is removed. Without that you would ship a
  "Material som ingår" box that opens onto nothing.
- The list is an auto-filling grid, minimum 210 px per column: two or three columns on
  desktop, one on a phone. You do not control the columns and should not try to.

### 3.6 Worked example

```html
<script>
window.AMPY_OFFER = {
  "kund.fornamn":            "Sofia",
  "bokare.namn":             "Elin Norberg",
  "bokare.profilbild_url":   "https://ampy.se/uploads/team/elin.webp",
  "offert.referens":         "Offert #2026-0421",
  "offert.giltig_till_kort": "Gäller t.o.m. 3 okt 2026",
  "offert.grundbelopp":      18400,
  "offert.forma_ditt_kop":   true,
  "bokare.villkorstext":     "Vi drar ny matning till garaget i samma vända.",
  "offert.arbetsbeskrivning": [
    { "rubrik": "Byte av huvudcentral" },
    { "rubrik": "Ny jordfelsbrytare", "beskrivning": "Hela huset delas på två grupper." }
  ],
  "offert.material": [
    "1 st normkapsling 3×12",
    "2 st jordfelsbrytare 40 A"
  ]
};
</script>
```

Verified end to end: greeting, all five booker mentions, the portrait, the reference, the
date, the base amount (`18 400 kr`, correct non-breaking spaces), the total, a rebuilt
three-item work list, a three-line material list and the booker's terms text, all updated,
with zero horizontal overflow.

You can reproduce exactly this in `exempel-integration.html`.

### 3.7 Content that is global — do **not** send it per offer

| Block | Why |
|---|---|
| `Därför kan du känna dig trygg` | the testimonial, the rating, the certification logos |
| The whole service agreement section | same wording and same 149 kr/mån on every offer |
| The three process steps | except the booker's name, which is a merge field |
| Footer, org. number, phone number | company constants |

---

## 4. The one new CRM field

Owner requirement: add **one** field, a toggle called **"Forma ditt köp"**.

```
offert.forma_ditt_kop   boolean   default: TRUE (on)
```

When it is on, nothing changes. When the booker switches it **off**, the entire "Forma
ditt köp" section disappears: the three delivery tiers (Express / Prioritet / Standard),
the "Extra arbetstimme" add-on, and their two receipt lines.

Implementation notes that matter:

- The section is **removed from the DOM**, not hidden. A hidden radio group stays in the
  tab order and in the price calculation.
- The removal runs **before** the price engine initialises, so the total is computed
  without the tiers from the very first frame.
- The value must be a real boolean. `"false"`, `"0"`, `0` and `null` are all ignored and
  the section stays visible. Send JSON `false`.
- The CRM value **overrides** the `?forma=0` demo parameter.
- Absent key = on, which matches the required default.

Verified with the toggle off: zero tier inputs, zero add-on inputs, the receipt shows only
`Komplett arbete`, the total is unchanged, no layout gap left behind, no horizontal
overflow.

---

## 5. Integrations — what you need to build

**The pages have no backend at all.** There is no `fetch`, no `XMLHttpRequest`, no form
`action`, no analytics. Every outcome today is a client-side navigation. Everything in
this section is yours to wire.

### 5.1 Accept

**Today:** clicking `[data-accept]` navigates to `window.AMPY_OFFER_DEST.accepterad`,
declared inline in `r2-checkouten/index.html`.

```js
window.AMPY_OFFER_DEST = {
  accepterad: "https://julius447.github.io/Offer-accepted-preview/",
  avbojd: "../offert-avbojd/"
};
```

> ⚠️ **The accepted URL is a GitHub Pages preview showing sample data. It must not go out
> in a live SMS link.** Replace both values at deploy time.

**You need to:** record the acceptance server-side *before* navigating, and carry the
customer's selections with it. The page knows all of them but sends none of them.

### 5.2 Question / change request

**Today:** the customer types in a textarea and clicks send. The page validates that the
field is not empty, shows a confirmation line, and disables the button. Nothing leaves the
browser.

**Owner requirement:** the question must land **in the chat** and as a **Slack
notification** — "a customer has sent a question about the quote".

### 5.3 Decline

**Today:** the customer optionally picks a reason, optionally writes a comment, and clicks
`Avböj offerten`. The page navigates to the declined page and **passes the reason as a
query parameter**: `offert-avbojd/?skal=pris`.

Reason values: `pris` · `tid` · `annan` · `behov` · `ovrigt`

The free-text comment is **not** carried anywhere today.

**Owner requirement:** a notification in the **CRM** and in **Slack**, then the customer
lands on the declined page.

### 5.4 A proposed API shape

This is a **proposal**, not a decision. Confirm the shape with Julius before building.

```
POST /api/offert/{token}/handelse
Content-Type: application/json
```

```json
{
  "typ": "accept | fraga | avboj",
  "tidpunkt": "2026-08-19T14:32:11+02:00",
  "val": {
    "tid": "express | prioritet | standard | null",
    "tillagg": ["timme"],
    "serviceavtal": "ja | senare | nej | null",
    "totalbelopp": 13750
  },
  "fraga":  { "text": "..." },
  "avboj":  { "skal": "pris", "kommentar": "..." }
}
```

`val` is meaningful for `accept`; for the other two it records what the customer was
looking at when they acted, which is useful context in Slack.

**Note on the service agreement:** the customer's choice (`ja` / `senare` / `nej`) is
currently read only by the local render and is transmitted nowhere. It is commercially
interesting and should be captured on all three event types.

**The monthly fee must never be added to the one-off total.** The design keeps them in
separate surfaces on purpose. `totalbelopp` is the one-off amount only.

### 5.5 Reading the customer's selections

`offer-logic.js` exposes one function for exactly this purpose. It always returns the same
shape, including when "Forma ditt köp" is switched off.

```js
window.ampyOfferState()
// → { tid: "express" | "prioritet" | "standard" | null,
//     tillagg: ["timme"],
//     serviceavtal: "ja" | "senare" | "nej" | null,
//     totalbelopp: 13750,
//     referens: "#2026-0421" }
```

`totalbelopp` is the one-off amount as a number. **Never parse `[data-total]` as text** —
it contains non-breaking spaces and the string " kr".

If you would rather react than poll, the page fires `offer:render` on `document` after
every recalculation, with `event.detail.total`.

Buttons you can hook onto: `[data-accept]`, `[data-send-change]`, `[data-send-decline]`.

### 5.6 Behaviour you must decide (not designed yet)

| Case | Question |
|---|---|
| Double click / double submit | The accept button is not disabled on click. Make the endpoint idempotent on `{token, typ}`. |
| Reopening the link after accepting | The page renders as a fresh, acceptable quote. It should probably show a "you have already accepted" state. **No such state exists.** |
| Reopening after declining | Same. |
| Network failure | There is a canonical error string ready: `window.ampyOfferError(element)` writes *"Vi kunde inte skicka just nu. Ring oss på 010-265 79 79 så tar vi det direkt."* Nothing calls it yet. Call it. |
| Expired quote | Send `offert.ar_utgangen: true` plus `offert.gick_ut_kort` and `offert.gick_ut_lang`. The header, both banners and all three outcome paths then switch over together. Without the flag an expired quote is fully acceptable. |

In the expired state the accept path, the question path and the decline path are all
blocked with honest messages. That logic is done; you only need to set the flag.

---

## 6. Deployment

### 6.1 Replace before going live

| Location | What | To what |
|---|---|---|
| `r2-checkouten/index.html`, `AMPY_OFFER_DEST` | both preview URLs | production URLs under `ampy.se` |
| `offert-avbojd/index.html` | the declined page's own path | production URL |
| Everywhere | `010-265 79 79` / `tel:+46102657979` | confirm it is current (15 occurrences) |
| Footer | `Org.nr 559254-9819` | **unconfirmed** — sourced from allabolag, see open questions |

### 6.2 Requirements

- **Token URLs.** Each quote needs an unguessable token: `https://ampy.se/offert/<token>/`.
  Sequential IDs would let anyone read other customers' quotes.
- **`noindex` is already set** on all three pages (`robots` and `referrer` meta tags).
  Keep them.
- **Serve the fonts with a long cache and `Access-Control-Allow-Origin`** if they end up on
  a different host than the pages. They are preloaded with `crossorigin`.
- **No external requests.** The pages call nothing outside their own origin — no Google
  Fonts, no CDN, no analytics. A named customer's quote page should not tell a third party
  they opened it. Please keep it that way.
- **`assets/tokens.css` is verbatim production tokens.** Do not edit it. If a colour looks
  wrong, it is wrong somewhere else.

### 6.3 Cache

`shared.css` and `offer-logic.js` are shared across the flow. Version them
(`shared.css?v=7`) or fingerprint them. A stale `offer-logic.js` against a new HTML is the
one combination that breaks the price engine silently.

---

## 7. Design system — what you may and may not touch

| Layer | Rule |
|---|---|
| `assets/tokens.css` | **Never edit.** Production tokens. |
| `assets/shared.css` | Edit only with a visual diff. Rendering is owner-approved. |
| Colours | teal `#00a991`, teal link `#017666`, midnight `#090b32`, ink `#0b1030`, body `#333333`, muted `#565e82`, faint `#646b88`, gold `#f6b53d`, sky-mist `#f5f9ff`. **No new colours.** |
| Type | Outfit, weights 300–700, self-hosted. **No new fonts.** |
| Spacing | 8 / 12 / 16 / 24 / 32 / 48 |
| Radii | 14 / 22 / 32 / 999 |
| Touch targets | minimum 44 × 44 |
| Contrast | 4.5:1 body text, 3:1 large text and control borders |
| Swedish | all customer-facing text. No em-dashes or en-dashes (hyphens are fine). |

**The rendering is pixel-approved by the owner.** If you find something "technically
wrong" that would change how the page looks, raise it rather than fixing it silently.

---

## 8. Acceptance checklist

Run this against your implementation. Every line has a measurable outcome.

### Data

- [ ] Search the rendered HTML of **all three pages** for `[name]`, `[Bokare]`, `[GAP]`, `EXEMPEL`, `Bokarens text`. **Expect zero hits.** This is the single most important check: an unmapped field ships a placeholder to a paying customer.
- [ ] The greeting shows the customer's first name.
- [ ] The booker's name appears in all five places, identical each time.
- [ ] The booker's photo renders, cropped round, not the silhouette.
- [ ] The work list renders one `<li>` per item; items without a description have no empty paragraph.
- [ ] The material list renders one line per string; an empty array removes the whole expander.
- [ ] The base amount matches the CRM and uses non-breaking spaces (`11 900 kr`, not `11 900 kr`).

### Prices

- [ ] Default state: total = base amount.
- [ ] Express → total = base + 1 000. Prioritet → +700. Standard → +0.
- [ ] Extra arbetstimme → +850, and unticking it returns the total.
- [ ] **Selecting the service agreement never changes the one-off total.** It appears in its own monthly row only.
- [ ] The receipt total and the mobile bar total always agree.

### The toggle

- [ ] `forma_ditt_kop: true` → the section renders.
- [ ] `forma_ditt_kop: false` → the section, the tier receipt row and the add-on receipt row are all gone from the DOM, and the total is the base amount.
- [ ] Key absent → the section renders (default on).

### Outcomes

- [ ] Accept records server-side, then navigates to the accepted page.
- [ ] The accepted page shows the same quote reference as the quote page.
- [ ] A question with an empty field is refused with a message; a filled field confirms, disables the button, and reaches chat + Slack.
- [ ] Decline reaches CRM + Slack, carries the reason, and lands on the declined page.
- [ ] The declined page shows the same reference and the correct validity date.
- [ ] Opening the same link twice does not create two events.
- [ ] `ar_utgangen: true` → the banner shows at the top, the controls are disabled, and all three outcome paths are blocked with a message.

### Responsive and accessibility

- [ ] 320, 360, 390, 430, 768, 1024, 1440, 1920: `document.documentElement.scrollWidth === clientWidth`. **Zero horizontal overflow.**
- [ ] Both expandable panels open, and opening one closes the other.
- [ ] On a short window (e.g. 1366 × 620) the summary panel does not clip the accept button.
- [ ] Tab order follows the visual order; every focused element has a visible ring.
- [ ] Print to PDF: the material list and the terms text are both **in** the PDF. A closed `<details>` silently dropped them once.
- [ ] Screen reader: one `<main>`, no unnamed landmarks, the total is announced when it changes.

---

## 9. Traps — defects that already happened once here

Each of these was found, measured and fixed. They are easy to reintroduce.

| Trap | What went wrong |
|---|---|
| `display: none` on a price chip | It reserved no height, so tapping the add-on moved the card 40.5 px **under the finger**. The second tap hit the heading above and the customer was stuck with a charge they were trying to remove. Use `visibility` plus reserved height. |
| `position: sticky` with only `top` | Pins the **top** edge. When the panel grew taller than the window, the accept button was fully visible in **0 %** of scroll positions. The panel now releases sticky when it does not fit. |
| `backdrop-filter` on a fixed element | Re-samples and blurs the backdrop on every scroll frame. The single most expensive line on mobile. |
| `details { open: true }` in CSS | `open` is an HTML attribute, not a CSS property, so the declaration was dropped and a closed `<details>` was never painted. The printed PDF lost the entire material list and the terms. |
| `grid-row: 1 / -1` without `grid-template-rows` | `-1` resolves against the *explicit* grid, which was line 1. Icons centred against the heading instead of the card. |
| An icon in an `overflow: hidden` circle | The verification badge's centre point sat outside the clip path and it rendered as a chopped green wedge. |
| Logo heights set by box height | Trygg-Hansa's mark fills only 38 % of its image height, so at a 21 px box it rendered 8 px tall — seven times less ink than ID06. Normalise on **ink area**, not height. |
| A dead link that looks alive | The terms link had `href="#"` with `onclick="return false"` and tap-highlight disabled: a 174 × 44 px target with zero response. |
| A promise with no door | The declined page said the quote could be reopened after the link to reopen it was removed. |
| One key, two value formats | The quote page's reference pill held the whole string `Offert #2026-0187` while the landing pages held only `#2026-0187`. Sending the same value to all three rendered "Offert Offert #2026-0421" on the confirmation page. Normalised in markup. |
| Placeholders inside JS strings | Two `[Bokare]` occurrences lived in generated strings in `offer-logic.js`, so mapping the field correctly still showed the placeholder in the question confirmation, which is the one line the customer reads most closely. |
| aria-live in a hidden element | The live region announced price rises but was silent on decreases, because the element it lived in was hidden at +0 kr. |

---

## 10. Open questions for the owner

These are unresolved and must not be guessed.

1. **Org. number `559254-9819`** in the footer came from allabolag and is unconfirmed.
2. **Trygg-Hansa's logo** is a low-resolution bitmap (56 px of ink height). Its own site
   and ampy.se serve the same file. A real vector is needed from their brand portal.
   Elsäkerhetsverket and ID06 are also bitmaps, currently adequate at 3×.
3. **Extra arbetstimme, 850 kr** is marked as an example price in the code and has not been
   confirmed.
4. **The base guarantee length** is unknown, so "förlängd garanti i 5 år" cannot be
   compared with anything. The copy avoids claiming a comparison.
5. **Rich text from the CRM** — if the work description or terms text can contain
   formatting, decide what is allowed. Today everything is escaped to plain text.
6. **Material lines with a sub-description** have nowhere to go in the design. Either the
   CRM flattens them into the same string, or the design needs a new slot.
7. **The already-accepted / already-declined states** are not designed. Decide what a
   customer sees when they reopen the link.
8. **The service agreement selection** is not transmitted anywhere. Confirm it should be
   captured.
9. **Production URLs** for all three pages.

---

## 11. Verified state at handover

| Measure | Result |
|---|---|
| Owner-instruction checks | 66 / 66 |
| Console errors across five page states | 0 |
| Horizontal overflow, 320–1920 px | 0 px at every width |
| Em/en-dashes in customer-facing text | 0 |
| External network requests | 0 |
| Total page weight, quote page | ~210 KB |
| Total page weight, landing pages | ~43 KB each |
| Step-node contrast, landing pages | 4.74:1 and 6.42:1 |
| Service-agreement icon weight spread | 12 % at 2× |
| Touch targets below 44 × 44 | 0 |

`README.md` records how each of these was measured, and every owner decision behind them.
