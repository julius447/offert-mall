/* =========================================================================
   Ampy offertsida — delad beteendelogik (alla tre riktningar)
   Renderingskontraktet: allt innehåll är läsbart utan JS. Det här lagret
   adderar ENBART: live-total, delta-chips, serviceavtalets val, ändrings-
   begäran, bekräftelsemocken och utgången-demon (?expired=1). Samtyckes-
   grinden är borttagen per ägarbeslut 2026-08-17: villkoret bor i köpvillkoren.
   Priser: bas 11 900 kr = riktiga offerten (Ali). Split + tillvalspriser =
   EXEMPEL/[GAP] — se README.
   ========================================================================= */
(function () {
  "use strict";

  var BASE_TOTAL = 11900; // kr inkl. moms efter ROT — riktig offert (Ali)
  var TIER_PRICES = { express: 1000, prioritet: 700, standard: 0 };
  var ADDON_PRICES = { timme: 850 }; // EXEMPEL — GAP-G2. Garantin flyttad till serviceavtalet.
  var SVC_MONTHLY = 149;             // kr/mån — ägarsatt, [FELIX] godkänner innehållet

  function kr(n) {
    return n.toLocaleString("sv-SE").replace(/ /g, " ") + " kr";
  }

  var tierInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="tid"]'));
  var addonInputs = Array.prototype.slice.call(document.querySelectorAll('input[data-addon]'));
  var acceptBtns = Array.prototype.slice.call(document.querySelectorAll("[data-accept]"));
  var blockMsgs = Array.prototype.slice.call(document.querySelectorAll("[data-blockmsg]"));

  function currentTier() {
    var checked = tierInputs.filter(function (i) { return i.checked; })[0];
    return checked ? checked.value : "standard";
  }

  // ENGÅNGSTOTALEN. Serviceavtalets 149 kr/mån ligger medvetet UTANFÖR:
  // att blanda en månadskostnad in i ett engångsbelopp vore vilseledande.
  function total() {
    var sum = BASE_TOTAL + (TIER_PRICES[currentTier()] || 0);
    addonInputs.forEach(function (i) {
      if (i.checked) sum += ADDON_PRICES[i.getAttribute("data-addon")] || 0;
    });
    return sum;
  }

  var svcRadios = Array.prototype.slice.call(document.querySelectorAll('input[name="svc"]'));
  function svcValue() {
    var c = svcRadios.filter(function (i) { return i.checked; })[0];
    return c ? c.value : "";
  }
  function svcChosen() { return svcValue() === "ja"; }

  function acceptBlocked() {
    return document.body.classList.contains("is-expired");
  }

  function render() {
    var sum = total();

    // totalen — överallt den visas (platta, sticky, betalningsrad)
    Array.prototype.forEach.call(document.querySelectorAll("[data-total]"), function (el) {
      el.textContent = kr(sum);
    });

    // tillvalsrader i kvittot
    addonInputs.forEach(function (i) {
      var key = i.getAttribute("data-addon");
      Array.prototype.forEach.call(document.querySelectorAll('[data-addon-row="' + key + '"]'), function (row) {
        row.classList.toggle("visible", i.checked);
      });
    });

    // tid-raden i kvittot (visas när ≠ standard)
    var tier = currentTier();
    Array.prototype.forEach.call(document.querySelectorAll("[data-tier-row]"), function (row) {
      var show = tier !== "standard";
      row.classList.toggle("visible", show);
      if (show) {
        var lbl = row.querySelector("[data-tier-label]");
        var amt = row.querySelector("[data-tier-amt]");
        if (lbl) lbl.textContent = tier === "express" ? "Installationstid: Express" : "Installationstid: Prioritet";
        if (amt) amt.textContent = "+" + " " + kr(TIER_PRICES[tier]);
      }
    });

    // delta-chips intill kontrollerna
    Array.prototype.forEach.call(document.querySelectorAll("[data-delta]"), function (chip) {
      var diff = sum - BASE_TOTAL;
      chip.classList.toggle("visible", diff > 0);
      chip.textContent = "+" + " " + kr(diff) + " · totalt " + kr(sum);
    });

    // Egen live-region för totalen. Chippet ovan döljs vid +0 kr, så en
    // aria-live DÄR annonserade prishöjningar men tigde när kunden gick
    // tillbaka till Standard. Skriv bara vid faktisk ändring, annars läser
    // skärmläsaren om samma belopp vid varje orelaterat val.
    Array.prototype.forEach.call(document.querySelectorAll("[data-total-live]"), function (el) {
      var t = "Att betala " + kr(sum);
      if (el.textContent !== t) el.textContent = t;
    });

    // serviceavtalets månadsrad — egen yta, aldrig inne i engångstotalen
    Array.prototype.forEach.call(document.querySelectorAll("[data-monthly]"), function (row) {
      row.classList.toggle("visible", svcChosen());
    });


    // Alla tre serviceavtalsvalen kvitteras. Tidigare var två av tre döda
    // kontroller: de gick att kryssa men gjorde ingenting alls.
    Array.prototype.forEach.call(document.querySelectorAll("[data-svc-ack]"), function (el) {
      var v = svcValue();
      el.textContent =
        v === "ja" ? "Serviceavtalet läggs till. Det faktureras separat från installationen." :
        v === "senare" ? "Noterat. Marcus tar upp det när jobbet är klart." :
        v === "nej" ? "Noterat. Vi tar inte upp det igen." : "";
      el.classList.toggle("visible", !!v);
    });

    var blocked = acceptBlocked();
    acceptBtns.forEach(function (b) { b.setAttribute("aria-disabled", blocked ? "true" : "false"); });
    blockMsgs.forEach(function (m) { m.classList.remove("visible"); });

    document.dispatchEvent(new CustomEvent("offer:render", { detail: { total: sum } }));
  }

  tierInputs.forEach(function (i) { i.addEventListener("change", render); });
  addonInputs.forEach(function (i) { i.addEventListener("change", render); });
  svcRadios.forEach(function (i) { i.addEventListener("change", render); });

  // accept → bekräftelsemock (visar ångerknappens plats, DAL 2:10a)
  // Accept: kunden skickas till accepterad-sidan. Sidans URL:er sätts i
  // window.AMPY_OFFER_DEST så de kan bytas till produktion utan att röra logiken.
  acceptBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      if (acceptBlocked()) return;
      var d = (window.AMPY_OFFER_DEST || {}).accepterad;
      if (d) window.location.href = d;
    });
  });


  // Summeringspanelen är sticky med takhöjd på desktop. Så fort en
  // utfällningspanel öppnas släpper den stickyn (se .co-panel.is-expanded),
  // annars hamnar innehållet under panelens egen vik.
  // Kortet växlar mellan sticky och static när en panel öppnas eller stängs,
  // och det flyttar kortet i dokumentet. Utan förankring hoppar sidan under
  // fingret. Vi mäter knappen kunden just tryckte på före och efter växlingen
  // och kompenserar med scrollBy, så den står stilla på skärmen.
  function syncPanelHojd(ankare) {
    var panel = document.getElementById("summering");
    if (!panel) return;
    var fore = ankare ? ankare.getBoundingClientRect().top : null;
    panel.classList.toggle("is-expanded", !!panel.querySelector(".of-change.visible"));
    if (fore === null) return;
    var efter = ankare.getBoundingClientRect().top;
    if (Math.abs(efter - fore) > 1) window.scrollBy(0, efter - fore);
  }

  // "Begär ändring eller ställ en fråga" — synlig sekundärväg (Jobber-mönstret)
  var changeBtn = document.getElementById("change-btn");
  var changePanel = document.getElementById("change-panel");
  if (changeBtn && changePanel) {
    changeBtn.addEventListener("click", function () {
      var open = changePanel.classList.toggle("visible");
      changeBtn.setAttribute("aria-expanded", open ? "true" : "false");
      syncPanelHojd(changeBtn);
      if (open) {
        changePanel.scrollIntoView({ block: "nearest" });
        changePanel.querySelector("textarea").focus();
      }
    });
    var sendBtn = changePanel.querySelector("[data-send-change]");
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var hint = changePanel.querySelector(".c-hint");
        var falt = changePanel.querySelector("textarea");
        // Utgången offert: rutan svarade "Skickat till Marcus" på en offert
        // som inte längre går att hantera här.
        if (acceptBlocked()) {
          if (hint) hint.textContent = "Den här offerten har gått ut, så meddelandet går inte fram här. Ring oss på 010-265 79 79 så tar vi det direkt.";
          return;
        }
        // Tom ruta kvitterades som skickad: kunden väntade på ett svar som
        // aldrig kunde komma.
        if (!falt || !falt.value.trim()) {
          if (hint) hint.textContent = "Skriv din fråga eller ändring i rutan först, så går den till Marcus.";
          if (falt) falt.focus();
          return;
        }
        if (hint) hint.textContent = "Skickat till Marcus. Du får svar inom 24 timmar på vardagar. Offerten ligger kvar oförändrad tills dess.";
        sendBtn.disabled = true;
        falt.readOnly = true;
        // Panelen är avklarad: bottenbaren ska inte längre hållas nere av den.
        changePanel.classList.add("is-done");
      });
    }
  }

  // Felmeddelande. Saknades helt; utan en kanonisk sträng uppfinns den i
  // produktion när backend kopplas in. Voice-kanon: säg vad som hände och ge
  // en väg vidare, aldrig bara "något gick fel".
  window.ampyOfferError = function (el) {
    if (el) el.textContent = "Vi kunde inte skicka just nu. Ring oss på 010-265 79 79 så tar vi det direkt.";
  };

  // "Tacka nej"-vägen (GAP-N1 — ritas i Riktning 3)
  // Avböj: "Skicka svar" tar kunden till avböjd-sidan.
  var declineSend = document.querySelector("#decline-panel .of-btn-send");
  if (declineSend) {
    declineSend.addEventListener("click", function (e) {
      e.preventDefault();
      var panel = document.getElementById("decline-panel");
      var hints = panel ? panel.querySelectorAll(".c-hint") : [];
      // Utgången offert gick fortfarande att avböja, och kunden landade då på
      // en sida som lovade att offerten låg kvar - tvärtemot vad den här sidan
      // säger. Sista .c-hint är den avslutande raden, den första är introt.
      if (acceptBlocked()) {
        if (hints.length) hints[hints.length - 1].textContent = "Den här offerten har redan gått ut, så det finns inget att avböja. Ring oss på 010-265 79 79 om du vill ha en ny.";
        declineSend.disabled = true;
        return;
      }
      // Skälet följer med i URL:en. Utan det landade kunden som kryssat
      // "Jag vill prata med någon först" på en sida som lovade tystnad.
      // KONTRAKT: avböjd-sidan läser ?skal= och backend måste ta emot samma
      // värde när formuläret kopplas in.
      var skal = document.querySelector('input[name="avbojskal"]:checked');
      var d = (window.AMPY_OFFER_DEST || {}).avbojd;
      if (!d) return;
      if (skal) d += (d.indexOf("?") < 0 ? "?" : "&") + "skal=" + encodeURIComponent(skal.value);
      window.location.href = d;
    });
  }

  var declineBtn = document.getElementById("decline-btn");
  var declinePanel = document.getElementById("decline-panel");
  if (declineBtn && declinePanel) {
    declineBtn.addEventListener("click", function () {
      var open = declinePanel.classList.toggle("visible");
      declineBtn.setAttribute("aria-expanded", open ? "true" : "false");
      syncPanelHojd(declineBtn);
      if (open) {
        // Förankra PANELEN, inte skicka-knappen. Med knappen som mål hamnade
        // viken mitt i raden under den, så "Offerten ligger kvar och du kan
        // öppna den igen" visades 12 av 39 px (uppmätt 360-768 px).
        declinePanel.scrollIntoView({ block: "nearest" });
      }
    });
  }

  // ?gaps=1 visar författaranteckningarna igen (för Felix och jurist)
  if (/[?&]gaps=1/.test(location.search)) document.body.classList.add("show-gaps");

  // utgången offert — demo via ?expired=1 (§4.10)
  if (/[?&]expired=1/.test(location.search)) {
    document.body.classList.add("is-expired");
    // Huvudet sa "Gäller t.o.m. 16 sep 2026" samtidigt som rutan längre ner
    // sa att offerten gått ut samma datum: två motsatta besked.
    var giltig = document.querySelector(".of-top__valid");
    if (giltig) giltig.textContent = "Gick ut 16 sep 2026";
  }

  // Utskriften är kundens sparade handling. En stängd <details> målas inte i
  // print, så materiallistan och villkorstexten föll ur pappersofferten.
  var printOpened = [];
  window.addEventListener("beforeprint", function () {
    printOpened = Array.prototype.filter.call(
      document.querySelectorAll("details"), function (el) { return !el.open; });
    printOpened.forEach(function (el) { el.open = true; });
  });
  window.addEventListener("afterprint", function () {
    printOpened.forEach(function (el) { el.open = false; });
    printOpened = [];
  });

  render();
})();
