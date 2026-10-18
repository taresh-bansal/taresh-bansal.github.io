/* Theme (dark by default), mobile menu, CV viewer choice and publication toggles. Loaded in <head>. */
(function () {
  var root = document.documentElement;
  var COLORS = { dark: "#1c1c1e", light: "#ffffff" };
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  root.classList.add("js");
  // Embedded PDF only where the browser can show it; otherwise the CV page shows a link card.
  if (navigator.pdfViewerEnabled === false) root.classList.add("cv-card");

  function current() { return root.getAttribute("data-theme") === "light" ? "light" : "dark"; }
  function syncMeta() {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", COLORS[current()]);
  }
  function syncToggle() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var label = current() === "dark" ? "Switch to light theme" : "Switch to dark theme";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
    syncToggle(); syncMeta();
  }
  syncMeta();

  document.addEventListener("DOMContentLoaded", function () {
    syncToggle(); syncMeta();
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      setTheme(current() === "light" ? "dark" : "light");
    });

    // Mobile menu: toggle, Escape, outside click.
    var nav = document.querySelector(".navbar");
    var menu = document.querySelector(".menu-btn");
    function setMenu(open, focusBtn) {
      if (!nav || !menu) return;
      nav.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open && focusBtn) menu.focus();
    }
    if (nav && menu) {
      menu.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) setMenu(false, true);
      });
      document.addEventListener("click", function (e) {
        if (nav.classList.contains("open") && !nav.contains(e.target)) setMenu(false);
      });
    }

    // Summary / BibTeX panels: shown without JS, toggled with it. Opened automatically when targeted by URL hash.
    var panelBtns = {};
    document.querySelectorAll("[data-panel]").forEach(function (btn) {
      var id = btn.getAttribute("data-panel");
      var panel = document.getElementById(id);
      if (!panel) return;
      panelBtns[id] = btn;
      btn.setAttribute("aria-controls", id);
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var open = panel.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    function openFromHash() {
      var id = decodeURIComponent(location.hash.slice(1));
      var panel = id && document.getElementById(id);
      if (panel && panelBtns[id]) {
        panel.classList.add("open");
        panelBtns[id].setAttribute("aria-expanded", "true");
        panel.scrollIntoView();
      }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    document.querySelectorAll(".copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = document.getElementById(btn.getAttribute("data-copy"));
        if (!src) return;
        var text = src.textContent;
        var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
        } else { fallback(text); done(); }
      });
    });
  });

  function fallback(t) {
    var ta = document.createElement("textarea");
    ta.value = t; ta.setAttribute("readonly", "");
    ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
})();
