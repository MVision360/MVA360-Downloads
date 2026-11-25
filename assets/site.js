// MVA360 website: the animated app demo in the header and the billing switch.
(function () {
  "use strict";

  // Hero demo: players move, a goal, press T, pick player and event, reel ready.
  var app = document.querySelector(".demo-app");
  if (app) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var steps = document.querySelectorAll(".demo-steps li");
    var showStep = function (step) {
      app.setAttribute("data-step", String(step));
      var active = { "1": 1, "2": 2, "3": 2, "4": 3 }[String(step)] || 0;
      steps.forEach(function (li) {
        li.classList.toggle("on", step === "static" || Number(li.getAttribute("data-for")) === active);
      });
    };
    var svgNS = "http://www.w3.org/2000/svg";
    var group = app.querySelector(".players");
    var ball = app.querySelector(".ball");
    // Home team (navy) attacks the left-hand goal, so the action stays clear of the tag panel.
    var players = [
      [460, 90, "#13202B"], [440, 210, "#13202B"], [340, 120, "#13202B"], [310, 200, "#13202B"], [200, 150, "#13202B"],
      [210, 80, "#f4f7f6"], [170, 220, "#f4f7f6"], [120, 130, "#f4f7f6"], [80, 180, "#f4f7f6"], [40, 150, "#f4f7f6"]
    ].map(function (p, i) {
      var c = document.createElementNS(svgNS, "circle");
      c.setAttribute("r", "9");
      c.setAttribute("fill", p[2]);
      group.appendChild(c);
      return { x: p[0], y: p[1], el: c, phase: i * 1.7 };
    });
    // The move: a few passes, then a shot into the right-hand goal.
    var path = [[340, 120], [310, 200], [200, 150], [120, 170], [24, 150]];
    var LOOP = 12000, GOAL_AT = 3000, start = null, visible = true, timers = [];

    var place = function (t) {
      var moving = t < GOAL_AT ? t : GOAL_AT;
      players.forEach(function (p, i) {
        var dx = Math.sin(moving / 900 + p.phase) * (i < 5 ? 26 : 14) - (i < 5 ? moving / 55 : moving / 200);
        var dy = Math.cos(moving / 1100 + p.phase) * 16;
        p.el.setAttribute("cx", (p.x + dx).toFixed(1));
        p.el.setAttribute("cy", (p.y + dy).toFixed(1));
      });
      var f = Math.min(1, moving / GOAL_AT) * (path.length - 1);
      var i = Math.min(path.length - 2, Math.floor(f)), k = f - i;
      ball.setAttribute("cx", (path[i][0] + (path[i + 1][0] - path[i][0]) * k).toFixed(1));
      ball.setAttribute("cy", (path[i][1] + (path[i + 1][1] - path[i][1]) * k).toFixed(1));
    };

    var schedule = function () {
      timers.forEach(clearTimeout);
      timers = [
        setTimeout(function () { showStep(1); }, GOAL_AT + 150),   // T pressed: video pauses, panel opens
        setTimeout(function () { showStep(2); }, GOAL_AT + 1500),  // player chosen
        setTimeout(function () { showStep(3); }, GOAL_AT + 2700),  // event chosen: dot lands on the timeline
        setTimeout(function () { showStep(4); }, GOAL_AT + 4300),  // highlight reel ready
        setTimeout(function () { showStep(0); start = null; schedule(); }, LOOP)
      ];
    };

    var frame = function (now) {
      if (!visible) { requestAnimationFrame(frame); return; }
      if (start === null) start = now;
      place(now - start);
      requestAnimationFrame(frame);
    };

    if (reduce) {
      place(GOAL_AT);
      showStep("static");
    } else {
      showStep(0);
      schedule();
      requestAnimationFrame(frame);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) { visible = entry.isIntersecting; });
        }).observe(app);
      }
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
