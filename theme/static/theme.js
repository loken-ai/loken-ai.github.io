// The choice between the light and the dark theme: a button flips it, the browser remembers it,
// and without a choice the system decides. The images that come in a light and a dark variant
// follow the choice, which a media query alone cannot do.
(function () {
  var KEY = "loken-theme";
  var root = document.documentElement;
  var query = matchMedia("(prefers-color-scheme: dark)");
  function stored() {
    try {
      var t = localStorage.getItem(KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }
  function resolved() {
    return root.dataset.theme || (query.matches ? "dark" : "light");
  }
  function sources(forced) {
    document.querySelectorAll("picture source").forEach(function (s) {
      if (!s.dataset.schemeMedia) {
        var media = s.getAttribute("media") || "";
        if (media.indexOf("prefers-color-scheme") < 0) return;
        s.dataset.schemeMedia = media;
      }
      s.setAttribute("media", forced === "dark" ? "all" : forced === "light" ? "not all" : s.dataset.schemeMedia);
    });
  }
  function apply(forced) {
    if (forced) root.dataset.theme = forced;
    else delete root.dataset.theme;
    sources(forced);
  }
  var button = document.querySelector(".theme-toggle");
  function label() {
    if (!button) return;
    var dark = resolved() === "dark";
    button.setAttribute("aria-label", dark ? "Switch to the light theme" : "Switch to the dark theme");
    button.setAttribute("aria-pressed", String(dark));
  }
  apply(stored());
  label();
  if (button) {
    button.addEventListener("click", function () {
      var next = resolved() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      apply(next);
      label();
    });
  }
  query.addEventListener("change", function () {
    if (!stored()) {
      apply(null);
      label();
    }
  });
})();
