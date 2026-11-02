// MVA360 website: the timeline arrival animation and the billing switch.
(function () {
  "use strict";

  // Match timeline: dots arrive in match order once, when the timeline is seen.
  var match = document.querySelector(".match.animate");
  if (match) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      match.classList.remove("animate");
    } else {
      var seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            match.classList.add("play");
            seen.disconnect();
          }
        });
      }, { threshold: 0.4 });
      seen.observe(match);
    }
  }

  // Pricing: monthly or annual.
  var buttons = document.querySelectorAll("[data-billing]");
  function setBilling(period) {
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-billing") === period));
    });
    document.querySelectorAll(".price").forEach(function (el) {
      el.querySelector(".amount").textContent = el.getAttribute("data-" + period);
      el.querySelector(".per").textContent = period === "annual" ? "a year" : "a month";
    });
    document.querySelectorAll(".price-sub").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + period);
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () { setBilling(b.getAttribute("data-billing")); });
  });
})();
