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
