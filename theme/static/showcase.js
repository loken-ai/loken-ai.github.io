// The showcase: the scenes in a list, the picture of the one chosen beside it. It moves on by
// itself while the bar of the active scene fills, holds while the pointer or the focus is on it,
// and stops once the reader chooses a scene. A click on a picture shows it larger.
(function () {
  var root = document.querySelector(".showcase");
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(root.querySelectorAll(".panel"));
  var pause = root.querySelector(".pause");
  var label = root.querySelector(".chrome .label");
  var box = document.querySelector(".lightbox");
  var stopped = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var current = 0;

  function restart() {
    root.classList.remove("play");
    void root.offsetWidth;
    if (!stopped) root.classList.add("play");
  }
  function show(i, focus) {
    current = (i + tabs.length) % tabs.length;
    tabs.forEach(function (tab, k) {
      var on = k === current;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[k].dataset.active = String(on);
    });
    label.textContent = tabs[current].querySelector(".t").textContent;
    restart();
    if (focus) tabs[current].focus();
  }
  function halt() {
    stopped = true;
    root.classList.remove("play");
    pause.setAttribute("aria-pressed", "true");
    pause.setAttribute("aria-label", "Play the automatic scroll");
    root.classList.add("paused");
  }
  function resume() {
    stopped = false;
    pause.setAttribute("aria-pressed", "false");
    pause.setAttribute("aria-label", "Pause the automatic scroll");
    root.classList.remove("paused");
    restart();
  }

  tabs.forEach(function (tab, k) {
    tab.addEventListener("click", function () {
      halt();
      show(k);
    });
    tab.addEventListener("keydown", function (e) {
      var to = { ArrowDown: current + 1, ArrowRight: current + 1, ArrowUp: current - 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      halt();
      show(to, true);
    });
  });
  pause.addEventListener("click", function () {
    if (stopped) resume();
    else halt();
  });
  root.addEventListener("animationend", function (e) {
    if (e.animationName === "showcase-fill") show(current + 1);
  });
  root.addEventListener("mouseenter", function () { root.classList.add("held"); });
  root.addEventListener("mouseleave", function () { root.classList.remove("held"); });
  root.addEventListener("focusin", function () { root.classList.add("held"); });
  root.addEventListener("focusout", function () { root.classList.remove("held"); });

  var startX = null;
  var panelsBox = root.querySelector(".panels");
  panelsBox.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  panelsBox.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) {
      halt();
      show(current + (dx < 0 ? 1 : -1));
    }
  });
  panelsBox.addEventListener("click", function (e) {
    var zoom = e.target.closest(".zoom");
    if (!zoom || !box) return;
    halt();
    var img = zoom.querySelector("img");
    box.querySelector("img").src = img.currentSrc;
    box.querySelector("img").alt = img.alt;
    box.showModal();
  });
  if (box) box.addEventListener("click", function () { box.close(); });

  if (stopped) {
    root.classList.add("paused");
    pause.setAttribute("aria-pressed", "true");
    pause.setAttribute("aria-label", "Play the automatic scroll");
  } else {
    restart();
  }
})();
