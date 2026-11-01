// The outline of the page follows the reading: the link of the heading in view takes the accent.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".side .sub a"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) {
    byId[decodeURIComponent(a.getAttribute("href").slice(1))] = a;
  });
  var heads = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  function mark(id) {
    links.forEach(function (a) { a.classList.toggle("on", a === byId[id]); });
  }
  var visible = {};
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    for (var i = 0; i < heads.length; i++) {
      if (visible[heads[i].id]) return mark(heads[i].id);
    }
  }, { rootMargin: "0px 0px -70% 0px" });
  heads.forEach(function (h) { io.observe(h); });
})();
