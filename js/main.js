(function () {
    "use strict";

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (new URLSearchParams(location.search).get("og") === "1") {
        document.documentElement.classList.add("og-shot");
    }

    /* ---------- Theme + palette (persisted) ---------- */
    var STORAGE_KEY = "ya-theme";

    function readStored() {
        try {
            var raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
            return raw && typeof raw === "object" ? raw : { palette: "mono", theme: "dark" };
        } catch (_) {
            return { palette: "mono", theme: "dark" };
        }
    }

    function apply(settings) {
        document.documentElement.setAttribute("data-palette", settings.palette);
        document.documentElement.setAttribute("data-theme", settings.theme);
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            var light = settings.theme === "light" || settings.palette === "terra";
            meta.setAttribute("content", light ? "#0e0b08" : "#000000");
        }
    }

    function save(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (_) { /* private mode, just don't persist */ }
    }

    var settings = readStored();
    apply(settings);

    var themeToggle = document.getElementById("themeToggle");
    var paletteToggle = document.getElementById("paletteToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            settings.theme = settings.theme === "light" ? "dark" : "light";
            apply(settings);
            save(settings);
        });
    }
    if (paletteToggle) {
        paletteToggle.addEventListener("click", function () {
            settings.palette = settings.palette === "mono" ? "terra" : "mono";
            apply(settings);
            save(settings);
        });
    }

    /* ---------- Contact email from meta ---------- */
    var meta = window.PORTFOLIO_META || {};
    var email = meta.email || "";
    if (email) {
        document.querySelectorAll("[data-mailto]").forEach(function (el) {
            el.setAttribute("href", "mailto:" + email);
        });
    }

    /* ---------- Reading progress ---------- */
    var progress = document.getElementById("progress");
    var toTop = document.getElementById("toTop");

    function onScroll() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? window.scrollY / max : 0;
        if (progress) progress.style.width = (ratio * 100).toFixed(2) + "%";
        if (toTop) toTop.classList.toggle("is-shown", window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
        });
    }

    /* ---------- Nav highlight (scrollspy) ---------- */
    var sections = ["work", "skills", "about", "contact"].map(function (id) {
        return document.getElementById(id);
    }).filter(Boolean);
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));

    function spy() {
        var pos = window.scrollY + window.innerHeight * 0.35;
        var current = sections[0];
        sections.forEach(function (sec) {
            if (sec.offsetTop <= pos) current = sec;
        });
        navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + current.id);
        });
    }
    window.addEventListener("scroll", spy, { passive: true });
    if (!prefersReduced) spy();

    /* ---------- Marquee: duplicate track for seamless -50% loop ---------- */
    var marquee = document.getElementById("marqueeTrack");
    if (marquee && marquee.children.length) {
        marquee.innerHTML += marquee.innerHTML;
    }

    /* ---------- Reveal on scroll ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !prefersReduced) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* ---------- Render projects ---------- */
    var grid = document.getElementById("workGrid");
    var projects = (window.PORTFOLIO_PROJECTS || []);

    if (grid && projects.length) {
        var frag = document.createDocumentFragment();
        projects.forEach(function (p, i) {
            var card = document.createElement("article");
            card.className = "work-card reveal";
            if (i < 4) card.style.setProperty("--reveal-delay", (i * 0.06) + "s");

            var n = String(i + 1).padStart(2, "0");
            var href = p.url || p.repo;
            card.innerHTML =
                '<a class="work-cover" href="' + href + '" target="_blank" rel="noopener" aria-label="' + p.title + ', open project" style="--cover:' + p.cover + '">' +
                    (p.image
                        ? '<img class="work-img" src="' + p.image + '" alt="" loading="lazy">'
                        : "") +
                    '<span class="work-index">' + n + '</span>' +
                    '<span class="work-orb"></span>' +
                '</a>' +
                '<div class="work-body">' +
                    '<span class="work-type">' + p.type + '</span>' +
                    '<h3><a class="work-title" href="' + href + '" target="_blank" rel="noopener">' + p.title + '</a></h3>' +
                    '<p>' + p.description + '</p>' +
                    '<div class="work-meta">' +
                        '<span class="work-tags">' +
                            p.tags.map(function (t) { return '<span class="pill">' + t + '</span>'; }).join("") +
                        '</span>' +
                        '<span class="work-links">' +
                            (p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">Live ↗</a>' : "") +
                            (p.repo ? '<a href="' + p.repo + '" target="_blank" rel="noopener">GitHub ↗</a>' : "") +
                        '</span>' +
                    '</div>' +
                '</div>';

            frag.appendChild(card);
        });
        grid.appendChild(frag);
        // observe the newly added cards
        if (window.__yaObserve) window.__yaObserve();
    }

    /* Re-usable: let card reveals work even though they're injected late */
    function observeNew() {
        if (prefersReduced) {
            document.querySelectorAll("#workGrid .reveal").forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        if (!("IntersectionObserver" in window)) {
            document.querySelectorAll("#workGrid .reveal").forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }
        var io2 = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        document.querySelectorAll("#workGrid .reveal").forEach(function (el) { io2.observe(el); });
    }
    window.__yaObserve = observeNew;
    observeNew();

    /* ---------- Render "more experiments" ---------- */
    var moreList = document.getElementById("moreList");
    var extras = (window.PORTFOLIO_EXTRA || []);
    if (moreList && extras.length) {
        extras.forEach(function (x) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = x.repo;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = x.name;
            li.appendChild(a);
            moreList.appendChild(li);
        });
    }

    /* ---------- Footer year ---------- */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

})();