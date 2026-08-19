# Ampy offertmall — tre riktningar (mockups)

Klickbara HTML-mockups av Ampys nya digitala offertsida — sidan där kunden läser sin offert,
formar den med tillval och installationstid, och accepterar eller begär ändring.
**Uppdrag 07** enligt arbetsordern (design + UX; wiring/mapping/backend = Yassine).

**Live (GitHub Pages):** öppna `index.html` — den listar alla riktningar.

Byggd på payload 1 (Ali · byte av elcentral · ROT · 11 900 kr inkl. moms efter ROT = riktig
offert). Payload 2 (grön teknik/laddbox) renderad som prisblock-variant i `gt-prisblock.html`.
Utgången offert-vyn (§4.10) demonstreras via `?expired=1` på valfri riktning.

## Riktningarna — vad var och en optimerar för, och vilket ägarbeslut som låser den

| Riktning | Optimerar för | Ägarbeslutet som låser den |
|---|---|---|
| **1 · Dokumentet** (`r1-dokumentet/`) | Förtroende och läsro: offerten som en genomarbetad handling i ett sammanhållet glaskort (Offer-accepted-språket), accepten sist. Bäst när kunden jämför offerter och Ampys seriositet ska bära. | Att lugn läsbarhet väger tyngre än maximal konverteringsmekanik — ingen sticky total, kunden scrollar själv tillbaka till priset. |
| **2 · Checkouten** (`r2-checkouten/`) | Konvertering och klarhet: sticky summeringspanel (Qwilr-mönstret) som räknas om live, mobil sticky bottenbar. Tillvalen bor nära summeringen — interaktiv prissättning är kärnmekaniken (2× vinst, +21 % close). | Att offerten får kännas som e-handel. Kräver också ägar-OK på att mobil-bottenbaren tar permanent skärmyta. |
| **3 · Genomgången** (`r3-genomgangen/`) | Pedagogik och trygghet: fyra numrerade steg med förankrad stegindikator, "elektrikern går igenom offerten med dig". Störst yta, flest förklaringar. Bär GAP-N1: **båda** neka-vägarna ritade (Begär ändring + explicit Tacka nej). | GAP-N1 (behåll/stryk Tacka nej-knappen) + att mer yta/scroll accepteras för mer pedagogik. |

**Rekommendation:** Riktning 2 för konverteringsjobbet (evidensen pekar dit: interaktiv
prissättning + alltid synlig total träffar #1-abandonskälet "oväntade kostnader"), med
Riktning 3:s "elektrikern förklarar"-inslag som möjlig hybrid.

## Juridiska ytor (§4 i arbetsordern — finns i alla tre riktningarna)

- Betalningsraden vid accept-knappen (DAL 2:9): "Beställning med betalningsskyldighet · Totalt X kr inkl. moms", live-uppdaterad.
- Express/Prioritet fäller ut en **separat, okryssad** samtyckesruta (DAL 2:11+15); utan ikryssad ruta är accept blockerad (knappen aria-disabled + förklarande rad + scroll till rutan).
- Båda priserna: arbetskostnad och material separerade, pris före avdrag, ROT-raden som teal chip (kvitto-mönstret ur ROT-GT-CRO d2).
- ROT-mellanskillnadsraden VID priset (Hantverkarformuläret p. 11) + tilläggsarbetslöftet (KtjL 8 §, omskrivet från dagens verkningslösa klausul) + "Fast pris"-pill.
- Villkors-expander + ångerrättsinfo/standardformulär FÖRE accept, versionsstämplade ([JURIST]-platshållare).
- Ångerknappens plats (DAL 2:10a): i bekräftelsevyn ("Ångra köp"-knapp) + sidfoten.
- "Gäller t.o.m. [datum]" i toppanelen; utgången vy via `?expired=1` inaktiverar accepten.
- Alla tillval AV som default (AVLK 13 §); Standard +0 kr förvald med "Vår rekommendation" (aldrig "Mest vald" — ingen mätdata).

## Vad som är riktigt och vad som är platshållare

**Riktigt:** tokens (`assets/tokens.css`, verbatim från ampy.se) · Ali-payloadens arbets- och
materiallista · totalen 11 900 kr efter ROT · tier-priserna +1 000/+700/0 · recensionen
(Moa Olaussen, en av de 12 äkta ur Testimonial documentation — elcentral-matchad) ·
5 av 5-betyget och 3 000+/år (ägarbekräftade) · certifikat-SVG:erna · Offer-accepted-ytan och
kvitto-mönstret (kopierade komponenter, inte nyritade).

**Platshållare (märkta i UI):** arbets-/materialsplitten 9 000/5 600 kr **EXEMPEL** [GAP-P1]
(vald så att 30 % ROT på arbetet landar exakt på riktiga 11 900) · tillvalspriserna 1 200/850 kr
**EXEMPEL** [GAP-G1/G2] · datumen (EXEMPEL-DATUM-chip) · [Ansvarig elektriker]/[Namnteckning] ·
[JURIST]-texterna · [ORG.NR] · [GAP-B]-bildytor · offertnummer #2026-0187.

## GAP-register (blockerar SHIP, inte wireframe)

| # | Fråga | Så ritades fallbacken |
|---|---|---|
| GAP-P1 | Arbets-/materialsplit i kronor per offert | EXEMPEL-märkta rader (9 000/5 600) |
| GAP-O1 | Kan ops leverera Express 24 h / Prioritet 72 h | Ritad med tiderna; copy låses efter ägarsvar |
| GAP-G1 | Förlängd garanti: omfattning, pris, längd | Kort med EXEMPEL-pris + GAP-chip |
| GAP-G2 | Extra arbetstimme: pris | Kort med EXEMPEL-pris |
| GAP-T1 | Svenska originalen för ägarens inklistrade recensioner (Shad Kadir-recensionen — kunden som jämförde 13 offerter — är offertsidans starkaste kort men finns bara i engelsk översättning) | Moa Olaussen ur de 12 äkta svenska används tills originalen hämtats |
| GAP-J1 | Juristtext: Express-samtycket, ångerrätt, villkor | [JURIST]-taggade platshållare |
| GAP-B | Produktbild/illustration per tjänst | Grå streckad platshållare |
| GAP-N1 | Räcker "Begär ändring" eller ska explicit "Tacka nej" finnas? | BÅDA ritade i riktning 3. Rekommendation: behåll båda — ett nej med skäl slår tystnad, och revisionsrundor korrelerar med vinst; nej-vägen är neutral (ingen confirmshaming) |
| GAP (ny) | ROT-behandling av tillval/tid: mockupen räknar tillval och tidstillägg **utanför** ROT-underlaget (extra arbetstimme borde sannolikt vara ROT-grundande) | Synlig not vid priset; jurist + ops låser |

## Ops-riktlinjer (utanför designens jobb)

- **Stavning ägs av offertskrivaren.** Mallen normaliserar typografi (mellanslag, tankstreck,
  listpunkter) men rättar inte stavfel i payloaden ("upptäkt", "Invändninga" i dagens mejl).
- Google Fonts laddas via CDN i mockupen — vid Bricks-produktion självhostas Outfit som vanligt.
- Bekräftelsemejl på varaktigt medium + accept-loggning (klick, tidsstämpel, offertversion,
  tillvalsläge) = Yassines backend; ytorna finns ritade i bekräftelsemocken.

## Källor

Designspråket ärvs 1:1 från `Website-blocks-git/Offer-accepted/` (glaskort, aurora, stegen,
guldstjärnor) och `ROT-GT-CRO-/designs/d2-kvittot-forst.html` (kvitto-mönstret, live på Pages,
verifierad 2026-08-17). Tokens verbatim ur `Testimonial documentation/assets/tokens.css`.
Research-kondensaten: `~/Desktop/Ampy Designuppdrag/_research-offertmall-{juridik,upsell,verktyg}.md`.

---

# v2 — R2 »Checkouten« vald som vinnare (2026-08-17)

Ägaren valde Riktning 2. Den är nu utvecklad från mockup till produktionsnära design med sex
research-agenter som underlag (marknad, kredit/finansiering, elavtal, CRO, UX-arkitektur,
spacing/UI-granskning). R1 och R3 ligger kvar orörda som referens.

**Nytt separat dokument:** `SERVICEAVTAL-UTKAST.md` — innehåll, pris, faktureringsmodell och
operativa krav för serviceavtalet, samt elavtals- och delbetalningsvägarna. Allt [FELIX]-gated.

## Vad som ändrades enligt ägarens noteringar

| # | Ägarens punkt | Vad som gjordes |
|---|---|---|
| 1 | Ansvarig elektriker = bokaren, med bild | Grön check-ikon ersatt av bokarens porträttyta (56 px, initialavatar som fallback + liten teal behörighetsbock i hörnet). Namn + roll + namnteckning. Foto och namn är per-offert-data från CRM. Demonamnet är EXEMPEL-märkt. |
| 2 | Bara totalkostnad + valda tillägg | Arbetskostnad, material, pris före avdrag och ROT-raden borta ur panelen. Kvar: jobbraden, de tillägg kunden själv valt, och EN dominant total (40 px) med »inkl. moms, efter ROT-avdrag«. |
| 3 | Serviceavtal, egen sektion, 149 kr/mån | Egen sektion med prisbricka, värdeankare, 7 förmåner i två spalter, elavtals-erbjudandet som eget kort, och TVÅ vägar: teckna nu, eller »berätta mer när jobbet är klart«. Arbetsgarantin flyttad hit från tillvalen. |
| 4 | Mindre knapp »Avböj offert« | Ren textlänk, lättast av de tre utgångarna, aldrig sida vid sida med accepten. Öppnar ett skälval (5 alternativ, allt frivilligt) — ett nej med skäl är mer värt än tystnad. |
| 5 | Designa om trust-blocket | Ny komposition: citatet är sektionens dominant (29 px), husbilden från ampy.se/kontakt bär resultatet, ett tal får display-grad (5,0 vid 44 px = 3× brödtext), certifikaten får rubricerad rad i färg. |
| 6 | UC kreditvärdighet | Ritad som textrad med gate, INTE som märke — se varningen nedan. |
| 7 | Ta bort bildplatshållare | Alla `[GAP-B]`-rutor borta. Arbetssektionen har nu ett riktigt Ampy-foto (elektriker vid elcentral, 4:5). |

## Tre saker ägaren bör läsa innan beslut

**1. UC-märket får inte ritas av oss.** UC:s sigill är en licensierad, serverrenderad bild där
texten (»HÖGSTA KREDITVÄRDIGHET« / »god kreditvärdighet« / »kreditvärdigt«) och dagens datum är
inbakade, och metallfärgen ÄR betyget. Ett egenritat »UC«-märke är en imitation av ett registrerat
varumärke. Webbsigillet kostar 4 995 kr ex moms och kräver riskklass 3–5. Sidan visar därför en
textrad med gate tills licensen är köpt och Ampys riskklass är känd.

**2. Serviceavtalet på just den här sidan är en avvägning, inte en självklarhet.** Ett tillägg som
säljs digitalt utan människa tecknas av 4–6 %; samma tillägg sålt av teknikern på plats av 20–30 %.
En sida med en enda uppmaning konverterar 13,5 %, en med 2–4 uppmaningar 11,9 %. Räknat på Ampys
siffror blir marginalen negativ om sektionen kostar mer än ~1,5 procentenheter i accept-grad.
Därför bär mockupen båda vägarna. **Mät accept-graden innan sektionen går live.**

**3. Betyget bör visa antal.** Forskning på 57 000 omdömen: köpsannolikheten toppar mellan 4,0 och
4,7 och **sjunker mot 5,0** — perfekta betyg läses som manipulerade. Volym slår siffra. Sidan visar
nu »5,0 av 5 · 27 omdömen på Google« med UPPDATERA-märkning, eftersom antalet är från 2026-07-19.

## Defekter som granskningen hittade och som är åtgärdade

Nio P0 och ett tjugotal P1 från en mätande UI-granskning:

- **Accept-knappen hade ingen synlig fokusring.** `box-shadow`-ringen förlorade kaskaden mot knappens
  egen skugga, så den juridiskt bindande knappen var otillgänglig för tangentbord. Ringen bärs nu av
  `outline`, med `forced-colors`-stöd.
- **Panelens CTA låg under viken.** Med Express + tillval blev panelen 953 px hög och knappen låg
  permanent 160 px under kanten på en 1280×800-laptop. Panelen har nu tak och intern sticky acceptzon.
- **Tvåspalten tände vid 980 px** och gav arbetsbeskrivningen en 211 px spalt som bröt på 10–30 tecken
  per rad. Flyttad till 1140 px.
- **Kvittot och accepten låg SIST på mobil**, efter villkoren — för 58 % av kunderna. Panelen ligger nu
  mellan »Forma ditt köp« och trust-sektionen i DOM.
- **Tillvalskorten kollapsade på mobil** (17–24 tecken per rad). Priset flyttas till egen rad ≤560 px.
- **`--faint` #8a90ac mätte 3,07:1** mot krav 4,5:1 → #646b88. **`--line-strong` mätte 1,41:1** mot krav
  3:1 för kontrollgränser → .48. **Vit text på nodgradienten mätte 2,27:1** → mörkare stopp.
- **Kvittots tre viktigaste tal låg på tre olika högerkanter** (1225 / 1210 / 1205 px). Totalplattans
  bakgrund ritas nu av ett `::before` som blöder ut i kortets padding, så alla tal delar räls.
- **Sektionsbytet var mindre än största interna avstånd** (24 mot 32 px) — hierarkin inverterad. Nu 48.
- **Rubrikhierarkin var inverterad i DOM:en**: en 13 px `h2` följd av en 24 px `h3`. Varje kort har nu
  en riktig 24 px `h2` och underrubriker på 17 px.
- **Prickraden — kvittots enda signaturenhet — försvann på mobil.** Container-tröskeln sänkt till 300 px.
- **Print-CSS:en gömde Express-samtycket** ur den utskrivna handlingen. Nu tvingas det fram.
- **Verifieringslänken pekade på fel URL.** Rätt register: `e-tjanster.elsakerhetsverket.se/foretag` (200).
- **Gråskala på auktoritetsmärken borttagen.** 33 av 33 svenska sajter visar UC-sigillet i färg; Vanta
  färglägger compliancemärken men dämpar kundloggor. Ett märke som är en länk till en kontrollerbar
  uppgift ska inte muteras till textur.
- **Det uppblåsta citattecknet** (1,9em) ersatt av textens egen grad med hängande indrag.
- Tryckytor under 44 px, ångerknappen som sidfotens svagaste länk, `✓ 2 3`-numreringen i stegen.

## Nya öppna beslut (utöver GAP-listan ovan)

| # | Fråga | Ägare |
|---|---|---|
| UC-1 | Ampys riskklass hos UC + är webbsigill-licensen (4 995 kr) köpt? | Felix |
| SVC-1..7 | Serviceavtalets innehåll, satser, bemanning — se `SERVICEAVTAL-UTKAST.md` §6 | Felix |
| FIN-1 | Långivare: Svea (dokumenterat API, tjänstemedveten) eller LF Finans (marknadsstandard, ingen API) | Julius + Felix |
| BANK-1 | Bank för Swish Återkommande — Nordea 2 kr vs Swedbank 3,50 kr per dragning | Julius |
| MÄT-1 | Baseline på accept-graden innan serviceavtalssektionen aktiveras | Julius |
| ORG-1 | Org.nr 559254-9819 är hämtat ur allabolag — bekräfta | Julius |
| FOTO-1 | Bokarporträtt saknas helt. Ampys fotostil är ansiktslös (elektriker bakifrån) | Julius |
| REV-1 | Antal Google-omdömen per dagens datum (27 är från 2026-07-19) | Julius |

## Vad som medvetet INTE gjordes

- **Ingen prisnedbrytning bakom expander.** Både juridikunderlaget och UX-agenten föreslog att lägga
  arbete/material/före-ROT i en kollapsad »Så räknas priset fram«. Ägaren avgjorde 2026-08-17 att
  sidan kör enbart totalen. Beslutet är loggat här, inte glidet igenom — det är en enkel ändring om
  det ska in.
- **Ingen dubblerad acceptzon på mobil.** UX-agenten rekommenderade en andra acceptzon längst ned.
  Den sticky bottenbaren löser räckvidden, och att duplicera den juridiskt bindande knappen dubblar
  riskytan. Kan läggas till om ägaren vill.

## v2.1 — ägarändringar 2026-08-17 (kväll)

| # | Ändring | Följd |
|---|---|---|
| 1 | Bilden i »Det här gör vi« borttagen | Arbetslistan går full bredd i kortet; `co-work`-gridden och dess CSS är borta |
| 2 | »· behörig elektriker« struket efter »Har räknat på ditt jobb« | Bokarraden är kortare; rollen framgår ändå av behörighetsbocken på avataren |
| 3 | »Redan undertecknad för Ampy« → **»Undertecknare för Ampy«** | — |
| 4 | **Express/Prioritet-samtycket borttaget** — villkoret bor i köpvillkoren som kunden godkänner | Se nedan |
| 5 | UC-raden i bevispanelen borttagen | Certifikatraden är nu de fyra märkena; UC-frågan lever kvar i GAP-listan |

**Följdändring på punkt 4 som var nödvändig:** accept-grinden i `offer-logic.js` krävde en ikryssad
samtyckesruta för Express och Prioritet. Hade bara HTML:en tagits bort skulle `acceptBlocked()`
returnerat `true` för de två snabbaste alternativen **utan någon väg att låsa upp** — accept-knappen
hade varit permanent död. `acceptBlocked()` kollar därför nu bara om offerten är utgången.
Verifierat i alla tre riktningarna: Express och Prioritet accepteras direkt, totalen räknar rätt
(12 900 / 12 600 kr), noll JS-fel.

Samtyckesrutan togs bort ur **R1 och R3 också**. Beslutet gäller produkten, inte layouten — och de
delar samma logikfil, så rutorna hade blivit tysta attrapper där.

Kvar att notera för jurist: villkoret om arbetsstart under ångerfristen (DAL 2:11+15) måste finnas
i köpvillkoren, och kundens godkännande av köpvillkoren vid accept måste loggas — annars kan Ampy
inte fakturera utfört arbete om kunden ångrar sig. Ytan för det är accept-knappens payline.

## v3.3 — fem granskningsagenter (2026-08-17 kväll)

Tre agenter levererade (mobil, copy/röst, adversariell helhet); två dog på API-fel
(spacing/typografi, craft-granskning av beviskortet). Beviskortet mätte jag själv i stället.

### Två P0 som gjorde sidan trasig på mobil

**Summeringspanelen renderade 38 px bred** vid allt under 1140 px — kvittot, totalen och
accept-knappen låg i en smal remsa med texten utanför kortet. Orsak: `margin-inline: auto` på ett
grid-item stänger av `justify-self: stretch`, och `container-type: inline-size` gör att innehållet
bidrar med noll intrinsic size. Shrink-to-fit av noll = padding + border = 38 px. `width: 100%`
återställer. Två var för sig rimliga rader CSS som möts i en spec-detalj.

**Bottenbaren låg dold under sidans första 2 000 px.** IntersectionObserver mot en panel som är
högre än viewporten är opålitlig. Ersatt av direkt kontroll mot accept-knappen. Den första
ersättningen använde `requestAnimationFrame`, som pausas i dolda flikar — nu direktanrop.

### Fynd som ändrade innehållet

- **Datumen motsade sig själva.** »senast tisdag 19 augusti, inom 24 timmar« — 19 augusti 2026 är en
  onsdag, och 24 timmar från måndag är den 18:e. Prioritet sa »fredag 22 augusti, inom 72 timmar«
  (= lördag, och 120 timmar). Alla tre raderna rättade: tisdag 18, torsdag 20, 20–31 augusti.
- **Serviceavtalets två kryssrutor var logiskt trasiga.** Båda kunde kryssas samtidigt, och
  »Berätta mer när jobbet är klart« hade ingen lyssnare alls — en död kontroll på ett
  beslutsdokument. Nu tre ömsesidigt uteslutande val, inget förvalt, alla tre kvitterar.
- **19 chip, varav 13 var anteckningar till oss själva** (»[FELIX] satser: konkret timpris säljer
  bättre än en procentsats«) renderade i kundens dokument. Ett ärligt utkastband ersätter dem;
  Felix ser alla igen med `?gaps=1`. Kvar synliga: 4, alla kundvända (EXEMPEL-priser, [LÅNGIVARE]).
- **Copy påstod en samtyckesruta som tagits bort.** Villkorstexten sa att samtycket »står redan
  öppet på sidan«. Referensen städad.
- **En projektanteckning läckte till kund** i en JS-sträng: »(Wiring = Yassine.)«
- **Alla tankstreck** ur kundvänd text. `ampy-rost` R12 förbjuder både em- och en-streck; mitt
  tidigare svep bytte bara det ena mot det andra. Noll kvar.
- **Delbetalningens 992 kr borttaget.** Finstilten under sa själv att den verkliga kostnaden blir
  högre — ett tal man underkänner i nästa mening överlever inte candour-grinden.

### Tillgänglighet och hantverk

- Beviskortets slöja **omkalibrerad för den här bredden**. Källkomponenten är tunad för 852 px;
  här är kortet 648 px (desktop) och 332 px (mobil), så texten nådde in i det ljusa partiet.
  Uppmätt: attributionen låg på 2,19:1 mot krav 4,5:1. Texten slutar vid 52 % av kortet, så
  slöjan är tät till 58 % och släpper sedan fram fotot. Komponentens **egna färger behållna**.
- Bottenbaren var **fokusbar när den var aria-hidden** — tangentbordsanvändare tabbade in i tomma
  intet. `visibility: hidden` efter transformen, renderingen oförändrad.
- Baren tänds inte förrän arbetsbeskrivningen passerats. Tidigare var det andra en mobilkund såg
  en uppmaning att acceptera 12 000 kr.
- Textfälten till 16 px: iOS zoomar in på allt under 16 och zoomar aldrig tillbaka.
- Tryckytor: PDF-länken (selektorn `.of-verify a` matchade aldrig elementet, som bär klassen
  själv) och delbetalningens villkorsknapp (38×16 px) till 44 px. Skälvalen fick 8 px luft och
  egen kontrollstil — de låg 2 px isär.
- **Outfit självhostad.** En Google Fonts-request per öppning läcker till Google att en namngiven
  kund tittat på sin offert.
- `body{padding-bottom}` följer nu `env(safe-area-inset-bottom)`; baren mäter 71–100 px.

### Invändningar jag INTE åtgärdade, och varför

- **Express-samtycket.** Den adversariella granskningen kallar det sidans värsta fel och en
  no-go-grind: kunden kan välja Express, få jobbet gjort på 24 timmar och ångra sig inom 14 dagar.
  Du beslutade 2026-08-17 att villkoret bor i köpvillkoren. Beslutet står, risken är loggad här.
- **Elavtal och delbetalning bort.** Båda föreslogs strykas eftersom parterna inte är valda. Du
  har uttryckligen bett om dem; de är kvar och gated.
- **Serviceavtalet ned till ≤10 % av sidan.** Det är 30 %. Du bad om en egen sektion »likt
  Därför kan du känna dig trygg«. Chip-städningen tar bort det som fick den att läsa som ofärdig.
- **`#5eb1bf` i knappgradienten** flaggades som en uppfunnen färg utanför tokens. Den kommer ur
  `CTA button documentation/delivery/ampy-cta-buttons.css` — det är produktionens egen CTA-gradient.
  Falskt positivt.
- **Antalet Google-omdömen.** Två agenter uppgav olika tal (16 respektive 27). Kortet visar
  »5 av 5 · Betyg på Google« precis som den ägargodkända energikalkylator-komponenten. Behöver
  ett aktuellt tal från dig innan det byggs ut.

## v5 — ägarändringar 2026-08-19

### Layout-buggen (P0, rapporterad av ägaren)

Acceptzonen var `position: sticky; bottom: 0` **och** innehöll utfällningspanelerna för
»Fråga eller ändra något« och »Avböj offert«. När en panel öppnades växte hela det sticky-blocket
och lade sig **ovanpå totalen** — panelen blev oläslig på både desktop och mobil.

Fixen: panelens `max-height` och interna scroll borttagna, den inre sticky borttagen. Panelen växer
fritt och scrollar med sidan, vilket aldrig kan överlappa. Verifierat med överlappstest på alla
kombinationer (total mot accept, total mot panel, accept mot panel), båda panelerna: noll överlapp.

### Borttaget

Betalningsraden vid knappen · »Fast pris«-pillen · hjälptexten över fritextfältet · »9 poster« ·
undertexten under tidsvalen · telefonraden i panelen · PDF-länken · ångerrätts-expandern ·
sidfotens fyra länkar · bekräftelsemocken (kunden går till en riktig sida i stället) ·
elavtal och delbetalning (helt: markup, CSS och logik).

**Om undertexten under tidsvalen:** den fanns för att motivera tillägget. Efter att datumen togs
bort säger raden redan namn + tidsspann + pris, vilket är hela beslutet — och Prioritets undertext
motsade sitt eget spann (»tre dygn« mot »2 till 5 dagar«). Borttagen, inte omskriven.

### Ändrat

- **Tidsvalen utan datum:** 24 till 48 timmar / 2 till 5 dagar / 5 till 14 dagar. Standard förvalt,
  ingen rekommendationsmärkning.
- **Skicka-knappen** var en outline-knapp identisk med »Fråga eller ändra något«, så det gick inte
  att se vilken som var handlingen. Nu fylld navy med pil — primär inuti panelen, men aldrig teal
  (teal är accept-knappens ensamma färg på sidan).
- **Serviceavtalet** är nu en intresseanmälan, inte en signering. Rubrik »Serviceavtal«, »Pris
  149 kr/mån«, beskrivning av vad det är och vem det passar. Elbesiktning 2 000 kr · förlängd
  produktgaranti 5 år · förtur utan extra kostnad · intyg på jordfelsbrytare · 150 mot 850 kr/tim
  efter ROT. Jourutryckningen borttagen. Valen utan brödtext. Månadsraden i summeringen säger att
  kunden inte binder sig och att Marcus går igenom villkoren innan signering.
- **Villkor och process:** en expander med generella villkor, en streckad yta för bokarens egen
  text per uppdrag, och länk till allmänna köpvillkor.
- **Processtegen 1-2-3** använder förloppsringen från ROT/grön teknik/hemförsäkringsblocket
  (`rot-gt-cro/designs/hemforsakring.html`, »VARIANT F«, ägarval 2026-08-17): bågen fylls
  1/3 → 2/3 → sluten, ingen fylld platta, siffran ensam i navy 500.
- **Giltighet 30 dagar** (branschstandard). Dubbleringen i huvudet berodde på två datumvarianter i
  DOM för mobilkortning — skärmläsare och textkopiering fick båda. Nu en enda sträng.
- **Certifikatraden** börjar med Installatörsföretagen. Middot borta ur betygsraden. Lättare
  gradient på beviskortet.

### Nya destinationer

Accept går till accepterad-sidan, avböjande till nya `offert-avbojd/` som är klonad från den med
ett rött släkte i vågorna (teal-rollerna utbytta 1:1: `#00a991`→`#d94f45`, `#018271`→`#a8382f`,
`#016a5d`→`#8c2c25`, `#00c2a6`→`#e8695c`, plus mint- och crystal-tonerna i bakgrunden). Copyn är
varm och utan confirmshaming: svaret är registrerat, vi hör inte av oss igen, offerten ligger kvar.

URL:erna ligger i `window.AMPY_OFFER_DEST` i r2:s markup så de kan bytas till produktion utan att
röra logiken.

### Öppna frågor till ägaren

| # | Fråga |
|---|---|
| 1 | Timpriset 150 kr/tim mot 850 kr/tim är en rabatt på 82 %. Stämmer siffrorna? |
| 2 | Allmänna köpvillkor: länken i villkorsexpandern pekar ingenstans än. |
| 3 | Bokarens unika villkorstext per uppdrag — var kommer den ifrån i CRM:et? |
| 4 | Produktions-URL:er för accepterad- och avböjd-sidan. |

---

## v6 — tio-lins granskning, 42 bekräftade fynd implementerade

Tio specialister (CSS, JS, HTML/a11y, spacing, typografi, UX, CRO, copy, plus en var för
accepterad- och avböjd-sidan) granskade sidorna. Varje fynd motgranskades sedan av en egen
skeptiker vars uppgift var att **fälla** det. 69 fynd lämnades in, 42 överlevde. De 27 fällda
var testartefakter, smakfrågor eller redan fattade ägarbeslut.

Alla 42 är implementerade och uppmätta. Det som satt djupast:

### P0

| Fynd | Uppmätt före | Efter |
|---|---|---|
| **Avböjknappen onåbar på desktop.** `position: sticky` med enbart `top` pinnar ÖVERKANTEN. När avböjpanelen fälldes ut blev kortet 1 036 px mot en vy på 800 px, så underkanten kom aldrig fram. | "Skicka svar" synlig i 0 % av scrollen vid 1440×800, 1440×700, 1280×700 och 1152×800 | Kortet släpper stickyn när en panel öppnas (`.co-panel.is-expanded`), och knappen kunden tryckte på förankras med `scrollBy` så inget hoppar. Både skäl och knapp synliga vid **varje** scrollposition och fönsterhöjd |
| **Två av tre serviceavtalsval var döda kontroller.** JS skrev till `[data-svc-ack]`, CSS stylade `.of-svc__ack` — men elementet fanns inte i HTML. | `document.querySelectorAll('[data-svc-ack]').length === 0` | Elementet inlagt. Alla tre valen kvitterar |
| **Utgången offert gick att avböja**, och frågerutan svarade "Skickat till Marcus". Kunden landade på en sida som lovade att offerten låg kvar — tvärtemot vad offertsidan sa. | `acceptBlocked()` konsulterades bara i accept-handlaren | Grind i alla tre vägarna, med besked som säger vad som gäller och ger telefonvägen |
| **Kunden som bad om ett samtal fick löftet att ingen ringer.** Skälet "Jag vill prata med någon först" skickades ingenstans; avböjd-sidan sa "Ingen påminnelse, inget uppföljningssamtal." | Skälet lästes aldrig av | Skälet följer med som `?skal=`, och avböjd-sidan byter steg 2 till "Du bad om ett samtal, så vi ringer upp". **Kontrakt för Yassine: backend måste ta emot samma värde** |
| **Accepterad-sidan visade fel offertnummer** i sekunden efter att kunden bundit sig. | `#2026-0142` mot offertens `#2026-0187` | Rättat på båda sidorna plus i kontraktsdokumentationen |
| **"Vi hör av oss inom 24 timmar"** var en SLA offerten aldrig ger, utlovad även till den som valt Standard (5-14 dagar). | Sökning i offertsidan: enda träffen på "timmar" är Express installationstid | Borttagen |
| **Accepterad-sidan hämtade Outfit från Google.** Enda sidan i flödet som gjorde det. | Med `fonts.gstatic.com` blockerad: `document.fonts.size === 0`, h1 renderad i system-ui | Självhostad, samma produktionssubset som offertsidan. 0 externa anrop |
| **Avböjd-sidan lovade att offerten låg kvar men hade ingen väg tillbaka.** | 1 interaktivt element på hela sidan, och det var telefonnumret | "Öppna offerten igen" inlagd, med `data-oa-href` |
| **Hårdkodat giltighetsdatum** på avböjd-sidan: varje kund fick "16 september 2026". | Enda `data-oa` på sidan var referensnumret | Datumet är nu en datakrok |
| **"Ja, teckna serviceavtal"** motsade "intresseanmälan, inte en signering" 230 px längre upp. | | → "Ja, jag är intresserad" |

### P1 och P2 i urval

- **Utskriften tappade hela materiallistan och villkorstexten.** `details { open: true }` är inte CSS
  utan ett HTML-attribut, så deklarationen slängdes av parsern och en stängd `<details>` målades
  aldrig. Uppmätt: 4 sidor mot 5, rubrikerna kvar men innehållet borta. `::details-content` +
  `beforeprint` löser det. Verifierat: materiallistan, dvärgbrytarna, bokartexten och
  köpvillkorslänken finns nu i PDF:en.
- **Tom frågeruta kvitterades som skickad.** Kunden väntade på ett svar som aldrig kunde komma.
- **Live-regionen tigde när priset gick NER.** Chippet döljs vid +0 kr, så `aria-live` där
  annonserade bara höjningar. Totalen annonseras nu från en egen sr-only-region.
- **Inga landmarks.** Sidan saknade `<main>` och de tre bindande knapparna låg i en
  complementary-landmark, alltså märkta som sidoinnehåll.
- **Panelen låg 18 px från serviceavtalskortet** och 66 px från villkoren, medan alla andra kort
  låg 48 px isär. Nu 48/48 vid 390, 768 och 1024.
- **Stegkopplingen bröts på mobil** på båda landningssidorna: fast `height: 60px` mot ett
  nod-till-nod-avstånd som varierar med radbrytningen (uppmätt 66 px och 77 px vid 390 px, alltså
  6 och 17 px synliga glapp). Linjen ankras nu i steget. Uppmätt glapp efter fixen: 0 px.
- **Enda kontrollen på båda landningssidorna mätte 89×18 px** mot kravet 44×44, och på avböjd-sidan
  skildes länken från brödtexten med i praktiken enbart färg (1,21:1). Nu 109×44 och understruken.
- **Radlängd 185 tecken** i serviceavtalets finstilta mellan 768 och 1139 px. Tak på 48ch.
- Fokusringen på landningssidorna mätte 2,91:1. Nu navy, samma ring som offertsidan.
- Betygsblocket är **borttaget från avböjd-sidan**. Fem gyllene stjärnor 200 px under "vi hör inte
  av oss mer" riktar ett säljbudskap mot någon som just sagt nej och läser som att kunden gjort
  ett misstag. Det ligger för nära confirmshaming. **Ägargrind: säg till om du vill ha kvar det.**
- Ledtiderna skrevs "24 till 48 timmar". Du skrev `24-48 timmar`. Bindestreck är tillåtet, det är
  bara em- och en-dash som är bannlysta. Rättat.

### Öppna ägargrindar

- **150 kr/tim mot 850 kr/tim** i serviceavtalet är 82 % rabatt. Bekräfta att siffran stämmer.
- **Grundgarantins längd** saknas, så "förlängd garanti i 5 år" går inte att ställa mot något. `[GAP]`
- **Produktions-URL för accepterad-sidan.** Nuvarande värde är en GitHub Pages-förhandsvisning och
  får inte gå ut i en skarp SMS-länk.
- **Var köpvillkorslänken ska peka**, och var bokarens unika villkorstext hämtas i CRM:et.
- **Google-betyget**: antal recensioner är inte bekräftat och står därför inte utskrivet någonstans.
- **Betygsblocket på avböjd-sidan** (se ovan).
