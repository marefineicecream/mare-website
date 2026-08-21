/* =========================================================
   MARÉ | Fine Ice Cream — script.js
   Vanilla JS: sticky header state, responsive nav, and
   restrained scroll-reveal. Smooth scrolling between sections
   is handled by CSS (scroll-behavior: smooth) on the anchors.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("site-header");

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navList = document.getElementById("navList");

  function closeNav() {
    if (!navList || !navToggle) return;
    navList.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Scroll reveal: restrained fade-up on content blocks ---------- */
  var fadeTargets = document.querySelectorAll(
    ".split-copy, .split-media, .section-title, .section-lede, .flavor-item, .collab-copy, .collab-media, .contact-copy, .contact-media"
  );
  fadeTargets.forEach(function (el) { el.classList.add("reveal-fade"); });

  var lineTargets = document.querySelectorAll(".reveal-line");

  var allTargets = [];
  fadeTargets.forEach(function (el) { allTargets.push(el); });
  lineTargets.forEach(function (el) { allTargets.push(el); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    allTargets.forEach(function (el) { observer.observe(el); });
  } else {
    allTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
