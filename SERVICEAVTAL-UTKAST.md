# Serviceavtalet — utkast för Felix att godkänna

**Status: UTKAST. Julius första förslag, Felix godkänner.**
**Läs §8 först — marknadsunderlaget kom in efter §1–7 och ändrar tre saker i dem.** Inget i det här dokumentet är
beslutat. Priset 149 kr/mån är ägarsatt; allt annat är förslag med källor där de finns.
Research 2026-08-17 (fetchade primärkällor, se länkar).

---

## 1. Vad avtalet innehåller — förslag

Ägarens lista, rangordnad efter hur mycket den bär avtalet:

| # | Innehåll | Roll i avtalet | Vad Felix måste bestämma |
|---|---|---|---|
| 1 | **Elkontroll vartannat år** (se §8.1 — ändrat från årligt) | Bär hela avtalet. Det är den enda posten som ger kunden något konkret varje år, och den enda som skapar ett återkommande besök hos kunden (= merförsäljningstillfälle). | Vad besiktningen omfattar, hur lång tid den tar, vad den kostar oss internt |
| 2 | **Test av jordfelsbrytare** | Ingår naturligt i besiktningen. Stark att nämna separat, för den är begriplig: alla vet att den finns, ingen vet om den fungerar. | Ingår i besiktningstiden eller separat moment? |
| 3 | **Förlängd garanti på utfört arbete** | Flyttad hit från tillvalen enligt din order. Trovärdig eftersom det är vår egen arbetsgaranti, inte en försäkringsprodukt. | Hur lång förlängning, och vad som händer med garantin om avtalet sägs upp |
| 4 | **Rabatt på jourjobb** | Hög upplevd trygghet, låg kostnad för oss (jour säljs ändå). | Rabattsats |
| 5 | **20 % rabatt på nästa jobb** | Driver återköp, men urholkar marginalen på arbete. Överväg att kapa den till arbetskostnad och sätta ett tak. | Sats, vad den gäller på, tak, giltighetstid |
| 6 | **Förtur i kön** | Billigt att utlova, men kostar när kalendern är full. Motsvarar Express-tillägget (+1 000 kr), så det är ett reellt värde. | Kan ops garantera förtur, och vad händer när två avtalskunder ringer samma dag? |
| 7 | **Support dygnet runt** | Svagaste posten. Kräver bemanning eller blir ett löfte vi bryter. | Vem svarar 02:00 på en tisdag? Om ingen: byt till "svar samma vardag" |

**Rekommendation:** posterna 1–4 bär avtalet. 5–6 är förhandlingsbara. **7 bör strykas eller
skrivas om** till något vi faktiskt levererar — ett brutet supportlöfte kostar mer än det säljer.

### Ett grepp som saknas i listan
Avtalet har inget som gör kunden **påmind** om att det finns. Ett abonnemang man glömmer är ett
abonnemang man säger upp. Förslag: besiktningsprotokollet mejlas som ett kort dokument med
"det här kollade vi, det här ser bra ut, det här bör du hålla ögonen på". Det är billigt att
producera, och det är det enda kunden får i handen för sina 1 788 kr om året.

---

## 2. Priset

**149 kr/mån = 1 788 kr/år.** Ägarsatt.

Att sätta i relation (för Felix bedömning, inte för copyn):
- En fristående elbesiktning prissätts enligt förslaget till 1 500 kr. Då är avtalet i praktiken
  besiktningen + 288 kr för allt annat. Det är en stark inramning **om** besiktningen verkligen
  säljs fristående för 1 500 kr. **[GAP-B1]** Gör vi det?
- Om vi inte säljer besiktningen fristående får siffran 1 500 kr inte användas i copyn alls.

**Copyregeln som gäller oavsett:** skriv **"ingår"**, aldrig **"gratis"**. En förmån som kräver att
kunden betalar 149 kr/mån är inte gratis. Svarta listan punkt 20 (bilaga I till direktivet om
otillbörliga affärsmetoder, gäller som svensk lag via 4 § MFL) förbjuder "gratis" när konsumenten
måste betala något utöver att svara på erbjudandet, och Marknadsdomstolen har prövat exakt den här
konstruktionen: i [MD 2012:4](https://lagen.nu/dom/md/2012:4) godkändes "0 kr" bara eftersom
abonnemangspriset var identiskt med och utan tillägget — där månadsavgiften höjts för att täcka
"gratisvaran" förbjöds påståendet.

Dessutom talar forskningen mot "gratis": en produkt som ges bort som gratisgåva **värderas lägre**
(Raghubir 2004, *J. Consumer Psychology* 14(1)). Ett verifierbart eget styckepris är starkare än
ett påklistrat värdeankare.

Formuleringen som används i mockupen:
> Din första elbesiktning ingår, och vi gör den i samband med installationen.
> Samma besiktning kostar 1 500 kr om du beställer den fristående av oss.

---

## 3. Faktureringsmodellen — det här är den viktiga delen

Researchen gav ett tydligt svar, och det är inte faktura.

### Slutsatsen först
**Swish Återkommande (recurring) är rätt betalrail för 149 kr/mån.** Det är en riktig produkt i
drift, med ett äkta medgivande-API: kunden signerar **en gång** med Mobilt BankID i Swish-appen,
sedan drar vi själva varje månad
([Swish developer docs](https://developer.swish.nu/documentation/guides/recurring-payments)).

### Varför inte faktura
| Kanal | Avgift per dragning à 149 kr | Andel av intäkten |
|---|---|---|
| **Swish Återkommande, Nordea** | **2,00 kr** | **1,34 %** |
| Swish Återkommande, Swedbank | 3,50 kr | 2,35 % |
| E-faktura till privatperson via Kivra (pris via Spiris) | 5,00 kr | 3,36 % |
| **Brevfaktura (utskrift + porto via Spiris)** | **20,00 kr** | **13,42 %** |

Källor: [Nordea](https://www.nordea.se/foretag/produkter/betala/swish-aterkommande.html) ·
[Swedbank](https://www.swedbank.se/foretag/betala-och-ta-betalt/swish/swish-aterkommande-betalningar.html) ·
[Spiris styckpriser](https://support.spiris.se/visma-administration-500/content/online-help/edokument.htm)

Brevfaktura äter 13,4 % av intäkten och får aldrig bli standardkanal. Men det största problemet med
faktura är inte avgiften: **en faktura kräver att kunden aktivt betalar varje månad.** På 149 kr är
det ren churn-mekanik. Ett medgivande som dras automatiskt är själva poängen med produkten.

### Fasta kostnader att räkna med (Nordea)
Anslutning 500 kr (för närvarande 0 kr) + årspris 720 kr = 60 kr/mån.

Kostnad per abonnent och månad:
- 50 abonnenter: 2,00 + 1,20 = **3,20 kr** (2,15 %)
- 200 abonnenter: 2,00 + 0,30 = **2,30 kr** (1,54 %)
- 500 abonnenter: 2,00 + 0,12 = **2,12 kr** (1,42 %)

Bankvalet är värt pengar: Nordea 2 kr mot Swedbank 3,50 kr är 75 % skillnad på samma rail.
**Ingen av bankernas sidor anger om priserna är inkl. eller exkl. moms** — kontrollera.

### Tre saker vi måste bygga själva
Swish-dokumentationen namnger dem:
1. **Egen dunning-logik.** *"If a payment is declined no retries will be executed by swish. The
   logic for retries needs to lie with the merchant."* Vi måste själva hantera misslyckade
   dragningar, påminnelser och när ett avtal ska pausas.
2. **Fallback när kundens bank inte stödjer recurring** (felkoden `RECURRING_NOT_OFFERED`) eller när
   kunden har en för gammal Swish-app (`DEVICE_VERSION_INVALID`). Där behövs autogiro eller kort.
3. **Medgivandehantering** — statusar `CREATED / PENDING / ACTIVE / DELETED / TIMEOUT / SIGNING /
   DECLINED` måste speglas i vårt eget system, och ett raderat medgivande måste stoppa faktureringen
   omedelbart.

### Autogiro som andrahandsval
Autogiro är Swishs främsta konkurrent på den här prispunkten och fungerar likadant i princip
(medgivande via internetbank eller webbtjänst, filer via Bankgirot). **Priset kunde inte
verifieras** — ingen svensk bank publicerar sin autogiro-tariff publikt. **Det här är den
viktigaste öppna posten innan modellen låses.** Notera att autogiro och e-faktura inte påverkas av
Bankgirots formatutfasning under 2026, men att BG Max-avprickningen försvinner, vilket påverkar hur
vi matchar inbetalningar.

### Fakturamotorn är en separat fråga
Visma eEkonomi heter numera **Spiris** (alla gamla URL:er redirectar). Det kan skapa och skicka
återkommande fakturor automatiskt, från 199 kr/mån, men har **inte** autogiro inbyggt —
partnerlösningen (Datapartner) kräver Visma Administration, inte det som eEkonomi blivit. Och
privatpersoner nås bara via Kivra, inte via internetbankens e-faktura.

Två kandidater visade sig vara felspår: **Fakturino** var aldrig ett faktureringssystem (det var en
låneförmedlare, uppköpt av Krea) och **Bricknode** finns inte längre (domänen går till done.ai, ett
norskt business-OS). Chargebee och Younium är byggda för B2B-SaaS-komplexitet vi inte har, och
Paddle är diskvalificerad: som merchant of record skulle de bli juridisk säljare, vilket inte går
att kombinera med ROT och grön teknik.

---

## 4. Operativt — vad som måste finnas innan första avtalet säljs

| Fråga | Varför den blockerar |
|---|---|
| **Vem bokar de årliga besiktningarna?** | 200 avtal = 200 besök om året som ska planeras in i en kalender som redan är full. Utan en rutin blir det första året skulden vi inte betalar. |
| **När på året?** | Om alla tecknar i augusti ska alla besiktas i augusti. Sprid ut dem, eller lägg dem i lågsäsong. |
| **Vem påminner kunden?** | Ett avtal utan synlig leverans sägs upp. Besiktningsprotokollet är beviset på att vi gjort något. |
| **Vad händer vid uppsägning?** | Går den förlängda garantin ut samma dag? Behåller kunden sin 20 %-rabatt om jobbet redan är bokat? |
| **Vad händer om vi inte hinner besikta?** | Ett år utan besiktning är ett år kunden betalat för ingenting. Behövs en kompensationsregel. |
| **Vem svarar på supportlöftet?** | Se punkt 7 i innehållslistan. |
| **Ångerfunktion i samma gränssnitt** | Tecknas avtalet digitalt måste kunden kunna ångra sig på samma sajt. Det är samma krav som gäller offerten, och det är en annan knapp än "Avböj offert". |

---

## 5. Elavtal + delbetalning — två spår som inte är designfrågor

### Elavtal → serviceavtalet ingår i 2 år
Erbjudandet är ritat i mockupen men **inte** aktiverat.

**Vägen dit, rangordnad.** Elhandel kräver inget tillstånd i sig, men **balansansvar är obligatoriskt**
(ellagen 8 kap. 12 §: *"En elleverantör får leverera eller ta emot el endast i en leveranspunkt där
någon har åtagit sig balansansvaret"*), och elhandelsföretag bär rapporteringsplikt till Ei samt
informationsföreskrifterna EIFS 2024:2. Att bli eget elhandelsbolag är inte motiverat av volymen.

Den realistiska vägen är att **förmedla åt EN elhandlare**. Det finns en färdig förlaga i
marknaden: Assemblin Solar förmedlar till Bixia, kunden tecknar med **Bixia**, som därmed behåller
balansansvaret, Ediel-hanteringen och hela EIFS 2024:2-bördan. Ampy äger marknadsföringen och
därmed ansvaret enligt marknadsföringslagen, prisinformationslagen och jämförpriskravet.
Rena installatörer som Otovo, Soltech och Alstra säljer inte el alls; de som paketerar har antingen
eget elhandelsbolag (Svea Solar, Tibber, Greenely, Vattenfall) eller förmedlar (Assemblin → Bixia).

**Den skarpaste risken, med praxis bakom sig.** Tre elbolag (Cheap Energy AB, Stockholms Elbolag AB,
Svealands Elbolag AB) fälldes i Patent- och marknadsdomstolen och fick förbud vid **2 miljoner kronor
i vite vardera**. De hade upplyst att rabatten upphörde efter tolv månader, men fälldes ändå
eftersom de inte berättade att *"priset på elen höjs rejält efter ett år"*
([Konsumentverket](https://www.konsumentverket.se/pressmeddelande/tre-elbolag-falls-for-vilseledande-marknadsforing/)).

**Att förmånen tar slut räcker alltså inte att nämna — konsekvensen måste framgå med belopp.**
Därför står det i mockupen rakt ut: *"Efter de 24 månaderna kostar serviceavtalet 149 kr per månad
om du inte säger upp det."* Den raden får inte tas bort.

Övrigt som krävs i kombinationserbjudandet:
- Skriv **"ingår när du tecknar"**, aldrig "gratis" (Svarta listan p. 20).
- Villkoret för förmånen ska stå i samma blickfång som förmånen, inte i finstilten.
- Elpriset ska anges med **jämförpris i öre/kWh per elområde** (upp till fyra olika), vilken period
  som gäller, plus upplysning om att nätkostnaden inte ingår (KOVFS 2018:1).
- Bindningstid, uppsägningsvillkor och ersättning vid förtida uppsägning för **båda** avtalen — och
  särskilt vad som händer med serviceavtalet om elavtalet sägs upp i förtid.
- Ångerrättsinformation **plus standardformuläret** ska ges, inte hänvisas till. El kan inte undantas
  från ångerrätten: *"Leverans av el faller inte under något av undantagen i lagen."*
- Ringer vi: skriftlig accept **efter** samtalet, annars är avtalet ogiltigt, och säljaren måste
  uppge sin relation till elhandelsföretaget.
- Elhandlaren gör leverantörsbytesanmälan med **sitt eget** Ediel-id, inte vårt.

Notera också att ellagen (1997:857) upphör 2027-01-01 och ersätts av en ny elmarknadslag.

### Delbetalning
Ritad som en rad vid priset med gated siffra, inte som ett eget block — den är en möjliggörare av
huvudköpet, inte ett konkurrerande köp.

**Marknadsläget:** Wasa Kredit heter numera **LF Finans** (Länsförsäkringar Bank, omdöpt 2025 —
gammal copy som säger "Wasa Kredit" är inaktuell). LF Finans är de facto standard bland svenska
installatörer: 11 av 15 granskade installatörssajter använder dem, med i stort sett identiska
villkor (0 % ränta, 6/12/24/36 mån, uppläggning 195–595 kr, aviavgift 35–45 kr, räntefritt tak
100 000 kr per person). För 11 900 kr ligger vi tryggt under det taket.

**Men LF Finans har inget publikt API** — flödet är att vår personal knappar in ansökan i deras
partnerportal. Det fungerar inte som en självbetjäningsknapp på en offertsida.

**Rekommendation för den tekniska vägen: Svea Bank Sales Finance.** Det är den enda leverantören som
klarar båda grindarna samtidigt: dokumenterat API för Sverige som uttryckligen hanterar *tjänster*
(capture sker "once goods or **services** have been delivered"), och ett flöde som passar
offertaccept exakt — vi skapar ordern när kunden accepterar, kunden får en inbjudningslänk och
signerar själv, vi capturar när elcentralen faktiskt är installerad. Dessutom exponerar deras
kampanjobjekt `nominalInterest`, `effectiveInterest`, `setupFee` och `administrationFee`, så sidan
kan visa kundens **verkliga** effektiva ränta hämtad live i stället för en hårdkodad siffra.

**Bygg inte på Klarna:** auktorisationen går ut efter 28 dagar som default, och ett eljobb som bokas
fem veckor fram spräcker det. Ingen av de 15 granskade installatörssajterna använde Klarna.

**Ingen leverantör publicerar sina merchant-avgifter.** Vad det kostar Ampy måste offereras. Låt
ingen sätta en siffra på det utan skriftligt bud.

En sak värd att notera: det mest utelämnade i hela installatörsmarknaden är avgiften. Ungefär en
tredjedel skriver "räntefritt" utan att nämna uppläggnings- eller aviavgift. Att publicera
kampanjavgiften och effektiva räntan rakt ut är alltså en äkta differentiering här, inte en risk.

---

## 6. Öppna beslut

| # | Fråga | Ägare |
|---|---|---|
| B1 | Säljer vi en fristående elbesiktning för 1 500 kr, med prissatt artikel? Om nej: siffran bort ur all copy. | Felix |
| B2 | Höjs något annat pris för att täcka besiktningen? | Felix |
| C1 | Bindningstid? Om ja måste minsta totalkostnad anges. | Felix + jurist |
| C2 | Automatisk förlängning? Egna regler gäller. | Felix + jurist |
| D1 | Supportlöftet: bemanning eller omskrivning? | Felix + ops |
| D2 | Kan ops garantera förtur, och hur prioriteras två avtalskunder samma dag? | Ops |
| D3 | Rabattsatser: nästa jobb, jourjobb. Tak och giltighet. | Felix |
| E1 | Bank för Swish Återkommande (Nordea 2 kr vs Swedbank 3,50 kr). | Julius |
| E2 | Autogiro-priset — måste hämtas från bank, är inte publikt. | Julius |
| E3 | Är bankernas priser inkl. eller exkl. moms? | Julius |
| F1 | Kan Ampy förmedla elavtal, och genom vem? | Felix |
| F2 | Långivare för delbetalning: Svea (API) eller LF Finans (portal) eller båda. | Julius + Felix |
| G1 | Vem mäter accept-graden före och efter att serviceavtalssektionen läggs på sidan? | Julius |

---

## 7. En invändning du bör känna till innan du bestämmer

Researchen är entydig på en punkt som talar mot att sälja avtalet på just den här sidan:

Ett tillägg som säljs **digitalt utan människa** tecknas av ungefär **4–6 %**. Samma tillägg sålt av
en tekniker **på plats** landar på **20–30 %**. ServiceTitans egen doktrin — de bygger mjukvara för
just den här branschen — är att serviceavtal säljs av teknikern hos kunden, inte via ett webbformulär.

Samtidigt: en sida med en enda uppmaning konverterar 13,5 %, en sida med 2–4 uppmaningar 11,9 %
(Unbounce, 18 639 landningssidor). Serviceavtalet med egen knapp **är** en andra uppmaning.

Räknat på Ampys siffror: 149 kr × 12 = 1 788 kr per år, alltså 15 % av jobbets värde. Ett tapp på
1 procentenhet i accept-grad kostar 120 kr per offert, medan 5 % attach ger 89 kr per offert.
**Marginalen blir negativ om sektionen kostar mer än ungefär 1,5 procentenheter i accept-grad.**

Därför bär mockupen **båda vägarna**: "Ja, teckna serviceavtal" för den som vill bestämma nu, och
"Berätta mer när jobbet är klart" för den som inte vill. Den andra rutan flyttar stängningen till
kanalen där den fungerar 4–6 gånger bättre, utan att kosta något i accept-grad.

**Det som fortfarande behövs: en baseline på accept-graden innan sektionen går live.** Utan den kan
vi inte se om den kostar oss mer än den ger. Toleransen är för snäv för att chansa.

---

## 8. Marknadsunderlaget (kom in efter första utkastet) — fyra beslut

### 1. Priset 149 kr är validerat. Intervallet är problemet.

**Två svenska bolag tar exakt 149 kr/mån för exakt den här produktformen:**
[Karlshamn Energi »Trygg Värme villa«](https://www.karlshamnenergi.se/wp-content/uploads/2026/02/Prislista-Serviceavtal-Trygg-Varme-villa-bilaga-2026.pdf)
(149 kr inkl. moms, kontrollbesök vartannat år) och VME »Trygghetsavtal 25+« (149 kr).
Det är den starkaste prisvalideringen som finns. 149 kr ligger runt 65–70:e percentilen i marknaden:
över energibolagens basavtal (60–120 kr), under installatörernas premiumnivå (189–199 kr), långt under
riktiga hembesöksabonnemang (349–499 kr) och larm (599 kr).

**Men: 149 × 12 = 1 788 kr per år.** En elbesiktning av villa kostar i verkligheten **3 000–7 500 kr**
(Elsäkerhetsverkets eget grundfall 5 000 kr, tidsåtgång 2,7–3,3 timmar exkl. restid). En **årlig**
besiktning kostar alltså mer att leverera än hela årsintäkten, före jour, support och administration.

**Marknaden har redan svarat:** varje jämförbart avtal med ett fysiskt besök gör det **vartannat år**
(Solor 75 kr, VME 99/149 kr, Karlshamn 149 kr). Det enda avtalet med årliga besök,
[Trygga Byggare »Trygga Hem«](https://www.tryggabyggare.se/trygga-hem), tar **349–399 kr/mån** för
5 besök om året. **Ingen tar 149 kr för ett årligt kvalificerat hembesök.**

→ **Mockupen är därför ändrad till »Elkontroll vartannat år«.** 3 576 kr per cykel bär en kontroll på
3 000–4 000 kr med marginal kvar. Alternativen: behåll årligt intervall men gör det till en smalare
okulär elkontroll (marknadspris ändå från 2 888 kr), eller höj priset mot 199 kr.

### 2. Värdet 1 500 kr underprissätter oss

Den enda källan som ens nämner 1 500 kr är en bloggpost vars eget företag prissätter tjänsten till
»fr 3 140 kr«. Trovärdigt spann är **3 000–7 500 kr, typvärde 4 500–5 000 kr**. Trygga Byggare
värderar sin generella hembesiktning till 5 000 kr — med 1 500 kr framstår en auktoriserad elfirma
som mindre värd än en allmän hembesiktning. **Rekommendation: ange 3 000–4 000 kr, eller ingen siffra.**

### 3. Rabatterna kan inte bära avtalet

[SveaDo](https://www.sveado.se/serviceavtal/) ger bort **hela** paketet — prioriterad service, rabatt,
fast kontaktperson, jour, ingen bindningstid — för **0 kr/mån**, och tjänar pengarna på jobben.
Förtur-och-rabatt är alltså priskonkurrerat till noll. 149 kr måste bäras av något vi faktiskt kör ut
en bil för.

Därför är innehållslistan omarbetad: »20 % rabatt« → **konkret timpris med/utan avtal** (Solkraft visar
595 kr/h mot 900 kr/h — mätbart i stället för procentuellt); »rabatt på jourjobb« → **inkluderad eller
takad jour** (en utryckning kostar annars från 1 600 kr enligt Karlshamns egen prislista);
»test av jordfelsbrytare« → **intyg** som ger kunden 10 % rabatt på villaförsäkringen hos
Länsförsäkringar; »support dygnet runt« → **felanmälan** dygnet runt, åtgärd vardagar.

### 4. Bygg det som tillsvidareavtal — det håller oss utanför en hel lag

**Lag (2014:1449)** om automatisk avtalsförlängning gäller bara *tidsbestämda* avtal med
förlängningsklausul. Då krävs skriftlig påminnelse **senast en månad** före sista uppsägningsdag,
annars får kunden säga upp med omedelbar verkan. **Ett tillsvidareavtal med en månads uppsägning
ligger helt utanför lagen** — inget »förlängs«, ingen påminnelseplikt. Det är ett arkitekturval,
inte en detalj.

Två premisser i mitt första utkast var fel och rättas här:
- Det finns **ingen** svensk regel att uppsägningstiden är kapad till en månad efter förlängning.
  »Max 30 dagar« är Konsumentverkets vägledning om oskäliga villkor, inte lag.
- **En prishöjningsklausul räddas inte av att kunden får säga upp.** MD 2009:35 (Bahnhof) avvisade
  precis det argumentet: en 15-dagars uppsägningsrätt *»medför inte någon annan bedömning«*. Det som
  krävs är en begränsad, symmetrisk och i avtalet angiven grund för ändringen.

### Autogiros regel som gör fastprisabonnemang enkelt

Huvudregeln är avisering senast åtta bankdagar före betalningsdagen — men Bg Autogiro-manualen har ett
uttryckligt undantag: *»Om betalaren har lämnat ett medgivande för löpande betalningar, där beloppet är
oförändrat, behöver du inte avisera varje betalningsdag separat.«* **För 149 kr fast krävs alltså ingen
avisering före varje dragning** — plikten återaktiveras först när priset ändras. Medgivandet kan
signeras med **BankID på ampy.se** via »Medgivande via Hemsida« (SEB: 8 kr exkl. moms per medgivande).

**Varning:** *»Medgivande som är tecknat på annat sätt än alternativen i tabellen är inte godkända …
ditt företag kan bli skyldig att återbetala redan utförda debiteringar.«*

### Fyra candour-grindar från researchen

1. **»Elsäkerhetsverket rekommenderar elbesiktning vart tionde år« är obelagt** — formuleringen finns
   inte på myndighetens sajt. Belagt istället: gå igenom anläggningen själv minst en gång om året,
   testa jordfelsbrytaren minst två gånger om året, anlita besiktning vid överlåtelse av hus från
   före 1970.
2. **Det finns inget lagkrav på periodisk elbesiktning av villa.** Regeringsuppdraget 2021–2022
   avslog det som *»inte samhällsekonomiskt försvarbart«*.
3. **Försäkringsbolagen kräver inte elbesiktning.** Länsförsäkringars villkor VH25 har inget
   el-specifikt aktsamhetskrav. Säg aldrig »försäkringen gäller inte« — säg att ersättningen **kan**
   sättas ned. Det som faktiskt belönas är jordfelsbrytare, 10 % premierabatt.
4. **Låna inte elrevisionsbesiktningens auktoritet.** Brandskyddsföreningens F200 § 3.2.1:
   *»Besiktningsplikt gäller inte för privata bostäder.«*

**Det som däremot är starkt och belagt:** Elsäkerhetsverkets genomgång av 162 verkliga
besiktningsprotokoll från småhus visade brister i **99,4 %** av husen, varav **38,2 %** hade mycket
allvarliga brister som krävde omedelbar åtgärd. Elcentralen låg bakom 298 händelser 2018–2022, varav
**78 % ledde till brand med skada** — och besiktning av centralen kan förebygga upp till **90 %** av
de bränder som startar där. Den siffran behöver ingen förstärkning.

Ett cirkulerande påstående som **inte** kunde beläggas: att el ligger bakom ~35 % av alla
bostadsbränder. Använd det inte.
