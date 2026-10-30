(function () {
  var root = document.querySelector(".carousel");
  if (!root) return;
  var track = root.querySelector(".track");
  var prev = root.querySelector(".prev"), next = root.querySelector(".next"), toggle = root.querySelector(".toggle");
  var dots = root.querySelector(".dots"), box = document.querySelector(".lightbox");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var real = Array.prototype.slice.call(track.children), n = real.length, pad = Math.min(3, n);
  var timer = null, held = false, stopped = reduced, settling = null;
  root.classList.add("live");
  // The row is the slides, with the last ones in front and the first ones behind, so it never ends.
  function copy(slide) {
    var c = slide.cloneNode(true);
    c.setAttribute("aria-hidden", "true");
    Array.prototype.forEach.call(c.querySelectorAll("button"), function (b) { b.tabIndex = -1; });
    return c;
  }
  for (var k = 0; k < pad; k++) {
    track.insertBefore(copy(real[n - 1 - k]), track.firstChild);
    track.appendChild(copy(real[k]));
  }
  function step() { return real[0].offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0); }
  function pos() { return Math.round(track.scrollLeft / step()); }
  function at() { return (((pos() - pad) % n) + n) % n; }
  function jump(p) {
    track.style.scrollSnapType = "none";
    track.scrollLeft = p * step();
    requestAnimationFrame(function () { requestAnimationFrame(function () { track.style.scrollSnapType = ""; }); });
  }
  function go(p) {
    track.scrollTo({ left: Math.max(0, Math.min(n + 2 * pad - 1, p)) * step(), behavior: reduced ? "auto" : "smooth" });
  }
  function settle() {
    var p = pos();
    if (p < pad) jump(p + n);
    else if (p >= pad + n) jump(p - n);
    mark();
  }
  function build() {
    dots.textContent = "";
    for (var k = 0; k < n; k++) (function (r) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show screens from " + (r + 1));
      b.addEventListener("click", function () { halt(); go(pad + r); });
      dots.appendChild(b);
    })(k);
    mark();
  }
  function mark() {
    var r = at(), all = dots.children;
    for (var k = 0; k < all.length; k++) all[k].setAttribute("aria-current", k === r ? "true" : "false");
  }
  function tick() {
    if (held || document.hidden) return;
    go(pos() + 1);
  }
  function play() {
    if (timer || stopped) return;
    timer = setInterval(tick, 4500);
    label(true);
  }
  function pause() { clearInterval(timer); timer = null; }
  function halt() {
    stopped = true;
    pause();
    label(false);
  }
  function label(playing) {
    toggle.setAttribute("aria-label", playing ? "Pause the automatic scroll" : "Play the automatic scroll");
    toggle.dataset.state = playing ? "playing" : "paused";
  }
  track.addEventListener("scroll", function () {
    mark();
    clearTimeout(settling);
    settling = setTimeout(settle, 140);
  }, { passive: true });
  prev.addEventListener("click", function () { halt(); go(pos() - 1); });
  next.addEventListener("click", function () { halt(); go(pos() + 1); });
  toggle.addEventListener("click", function () {
    if (stopped) { stopped = false; play(); } else { halt(); }
  });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { halt(); go(pos() + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { halt(); go(pos() - 1); e.preventDefault(); }
  });
  track.addEventListener("pointerdown", halt);
  root.addEventListener("mouseenter", function () { held = true; });
  root.addEventListener("mouseleave", function () { held = false; });
  root.addEventListener("focusin", function () { held = true; });
  root.addEventListener("focusout", function () { held = false; });
  track.addEventListener("click", function (e) {
    var z = e.target.closest(".zoom");
    if (!z) return;
    halt();
    box.querySelector("img").src = z.querySelector("img").currentSrc;
    box.querySelector("img").alt = z.querySelector("img").alt;
    box.showModal();
  });
  box.addEventListener("click", function () { box.close(); });
  window.addEventListener("resize", function () { var r = at(); jump(pad + r); mark(); });
  build();
  jump(pad);
  mark();
  label(!stopped);
  play();
})();
