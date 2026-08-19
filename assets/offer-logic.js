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
  var backdrop = document.getElementById("confirm-backdrop");
  acceptBtns.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      if (acceptBlocked()) return;
      if (backdrop) {
        var t = backdrop.querySelector("[data-total]");
        if (t) t.textContent = kr(total());
        backdrop.classList.add("visible");
        var card = backdrop.querySelector(".of-confirm");
        if (card) card.focus();
      }
    });
  });
  if (backdrop) {
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) backdrop.classList.remove("visible"); });
    var closeBtn = backdrop.querySelector("[data-close]");
    if (closeBtn) closeBtn.addEventListener("click", function () { backdrop.classList.remove("visible"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") backdrop.classList.remove("visible"); });
  }

  // "Begär ändring eller ställ en fråga" — synlig sekundärväg (Jobber-mönstret)
  var changeBtn = document.getElementById("change-btn");
  var changePanel = document.getElementById("change-panel");
  if (changeBtn && changePanel) {
    changeBtn.addEventListener("click", function () {
      var open = changePanel.classList.toggle("visible");
      changeBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) changePanel.querySelector("textarea").focus();
    });
    var sendBtn = changePanel.querySelector("[data-send-change]");
    if (sendBtn) {
      sendBtn.addEventListener("click", function () {
        var hint = changePanel.querySelector(".c-hint");
        if (hint) hint.textContent = "Skickat till Marcus. Du får svar inom 24 timmar på vardagar. Offerten ligger kvar oförändrad tills dess.";
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
  var declineBtn = document.getElementById("decline-btn");
  var declinePanel = document.getElementById("decline-panel");
  if (declineBtn && declinePanel) {
    declineBtn.addEventListener("click", function () {
      var open = declinePanel.classList.toggle("visible");
      declineBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ?gaps=1 visar författaranteckningarna igen (för Felix och jurist)
  if (/[?&]gaps=1/.test(location.search)) document.body.classList.add("show-gaps");

  // utgången offert — demo via ?expired=1 (§4.10)
  if (/[?&]expired=1/.test(location.search)) document.body.classList.add("is-expired");

  render();
})();
