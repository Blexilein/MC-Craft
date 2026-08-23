// Minecraft versions page module

let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

const translations = {
    de: {
        site_title_versions: "MC-Craft | Minecraft Versionen",
        site_title_short: "MC-Craft",
        nav_home: "Home",
        nav_text_converter: "Text Konverter",
        nav_color_text: "Farbtext",
        nav_items: "Items Datenbank",
        nav_mobs: "Mobs Datenbank",
        nav_server_status: "Server Status",
        nav_skin_lookup: "Skin Lookup",
        nav_skin_editor: "Skin Editor",
        nav_day_night_cycle: "Tag-Nacht-Zyklus",
        nav_end_poem: "End Poem",
        nav_capes: "Cape-Datenbank",
        nav_skins: "Skin-Bibliothek",
        nav_beacon_mixer: "Beacon Farbmischer",
        tools_dropdown: "Werkzeuge",
        discover_dropdown: "Entdecken",
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Theme auswählen:",
        sound_toggle: "Sound",
        language: "Sprache",
        versions_badge: "Versionen Live-Archiv",
        versions_title: "Minecraft <span class=\"highlight\">Versionen</span>",
        versions_desc: "Durchsuche das vollständige Versionsarchiv nach Stable Releases, Snapshot Preview, Beta und Alpha.",
        versions_latest_release_label: "Neueste Release",
        versions_latest_snapshot_label: "Neuester Snapshot",
        versions_search_placeholder: "Version suchen (z.B. 1.20, 24w, b1.7)",
        versions_year_all: "Alle Jahre",
        versions_col_release: "Stable Releases",
        versions_col_snapshot: "Snapshot Preview",
        versions_col_beta: "Beta",
        versions_col_alpha: "Alpha",
        versions_loading: "Versionen werden geladen...",
        versions_no_results: "Keine Versionen gefunden.",
        versions_fetch_error: "Versionen konnten nicht geladen werden.",
        footer_description: "Kostenlose Minecraft-Tools für die Community. Entwickelt von Spielern für Spieler.",
        footer_tools: "Tools",
        footer_more_tools: "Mehr Tools",
        footer_legal: "Rechtliches",
        footer_about: "Über Uns",
        footer_support: "Support",
        footer_impressum: "Impressum",
        footer_privacy: "Datenschutz",
        footer_terms: "Nutzungsbedingungen",
        footer_copyright: "Copyright",
        capes_db_title: "Cape-Datenbank",
        skins_library_title: "Skin-Bibliothek",
        footer_history: "MC-Craft Geschichte",
        footer_team: "Unser Team",
        footer_about_us: "Über uns",
        footer_faq: "FAQ & Hilfe",
        footer_bug: "Bug melden",
        footer_support_contact: "Support Kontakt",
        footer_rights: "Alle Rechte vorbehalten.",
        footer_disclaimer: "Minecraft ist eine Marke von Mojang Studios. Diese Seite ist nicht offiziell mit Mojang oder Microsoft verbunden.",
        footer_version: "Version 1.0.0",
        footer_changelog: "Changelog"
    },
    en: {
        site_title_versions: "MC-Craft | Minecraft Versions",
        site_title_short: "MC-Craft",
        nav_home: "Home",
        nav_text_converter: "Text Converter",
        nav_color_text: "Color Text",
        nav_items: "Items Database",
        nav_mobs: "Mobs Database",
        nav_server_status: "Server Status",
        nav_skin_lookup: "Skin Lookup",
        nav_skin_editor: "Skin Editor",
        nav_day_night_cycle: "Day-Night Cycle",
        nav_end_poem: "End Poem",
        nav_capes: "Capes Database",
        nav_skins: "Skin Library",
        nav_beacon_mixer: "Beacon Color Mixer",
        tools_dropdown: "Tools",
        discover_dropdown: "Discover",
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Choose Theme:",
        sound_toggle: "Sound",
        language: "Language",
        versions_badge: "Live Version Archive",
        versions_title: "Minecraft <span class=\"highlight\">Versions</span>",
        versions_desc: "Browse the complete version archive with Stable Releases, Snapshot Preview, Beta, and Alpha.",
        versions_latest_release_label: "Latest Release",
        versions_latest_snapshot_label: "Latest Snapshot",
        versions_search_placeholder: "Search version (e.g. 1.20, 24w, b1.7)",
        versions_year_all: "All years",
        versions_col_release: "Stable Releases",
        versions_col_snapshot: "Snapshot Preview",
        versions_col_beta: "Beta",
        versions_col_alpha: "Alpha",
        versions_loading: "Loading versions...",
        versions_no_results: "No versions found.",
        versions_fetch_error: "Could not load versions.",
        footer_description: "Free Minecraft tools for the community. Developed by players for players.",
        footer_tools: "Tools",
        footer_more_tools: "More Tools",
        footer_legal: "Legal",
        footer_about: "About Us",
        footer_support: "Support",
        footer_impressum: "Imprint",
        footer_privacy: "Privacy Policy",
        footer_terms: "Terms of Use",
        footer_copyright: "Copyright",
        capes_db_title: "Capes Database",
        skins_library_title: "Skin Library",
        footer_history: "MC-Craft History",
        footer_team: "Our Team",
        footer_about_us: "About us",
        footer_faq: "FAQ & Help",
        footer_bug: "Report Bug",
        footer_support_contact: "Support Contact",
        footer_rights: "All rights reserved.",
        footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not officially affiliated with Mojang or Microsoft.",
        footer_version: "Version 1.0.0",
        footer_changelog: "Changelog"
    }
};

const soundBtn = document.getElementById("soundBtn");
const soundIcon = document.getElementById("soundIcon");
const mobileSoundBtn = document.getElementById("mobileSoundBtn");
const mobileSoundIcon = document.getElementById("mobileSoundIcon");
const langBtn = document.getElementById("langBtn");
const langFlag = document.getElementById("langFlag");
const mobileLangBtn = document.getElementById("mobileLangBtn");
const mobileLangFlag = document.getElementById("mobileLangFlag");
const themeBtn = document.getElementById("themeBtn");
const themeDropdown = document.getElementById("themeDropdown");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileNav = document.getElementById("mobileNav");
const backToTop = document.getElementById("backToTop");
const header = document.querySelector(".header");

const searchInput = document.getElementById("versionsSearch");
const yearSelect = document.getElementById("yearFilter");
const latestRelease = document.getElementById("latestRelease");
const latestSnapshot = document.getElementById("latestSnapshot");

const sectionDefs = {
    release: { list: document.getElementById("releaseList"), count: document.getElementById("releaseCount") },
    snapshot: { list: document.getElementById("snapshotList"), count: document.getElementById("snapshotCount") },
    beta: { list: document.getElementById("betaList"), count: document.getElementById("betaCount") },
    alpha: { list: document.getElementById("alphaList"), count: document.getElementById("alphaCount") }
};

const state = {
    all: {
        release: [],
        snapshot: [],
        beta: [],
        alpha: []
    },
    filtered: {
        release: [],
        snapshot: [],
        beta: [],
        alpha: []
    }
};

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
}

function initAudio() {
    try {
        levelUpSound = new Audio("/assets/audio/levelup.ogg");
        levelUpSound.volume = 0.25;
        levelUpSound.preload = "auto";
    } catch (_) {}
}

function playClickSound() {
    if (!soundEnabled) return;

    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const last = window.__mcCraftLastClickSoundAt || 0;
    if (now - last < 120) return;
    window.__mcCraftLastClickSoundAt = now;

    try {
        const ctx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());

        if (ctx.state === 'suspended') {
            ctx.resume().then(() => {
                window.__mcCraftLastClickSoundAt = 0;
                playClickSound();
            }).catch(() => {});
            return;
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        setTimeout(() => osc.stop(), 100);
    } catch (e) {}
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    levelUpSound.currentTime = 0;
    levelUpSound.volume = 0.25;
    levelUpSound.play().catch(() => {});
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[currentLang] && Object.prototype.hasOwnProperty.call(translations[currentLang], key)) {
            el.innerHTML = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[currentLang] && Object.prototype.hasOwnProperty.call(translations[currentLang], key)) {
            el.placeholder = t(key);
        }
    });

    document.title = t("site_title_versions");
    updateLatestStrip();
    rebuildYearOptions();
    applyFilters();
}

function toggleLanguage() {
    currentLang = currentLang === "de" ? "en" : "de";
    localStorage.setItem("mc-craft-lang", currentLang);
    updateLanguageFlags();
    applyTranslations();
    playClickSound();
}

function updateLanguageFlags() {
    const src = currentLang === "de" ? "/assets/img/backgrounds/de.svg" : "/assets/img/backgrounds/en.svg";
    const alt = currentLang === "de" ? "Deutsch" : "English";

    if (langFlag) {
        langFlag.src = src;
        langFlag.alt = alt;
    }
    if (mobileLangFlag) {
        mobileLangFlag.src = src;
        mobileLangFlag.alt = alt;
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem("mc-craft-sound", String(soundEnabled));
    updateSoundIcons();
    playClickSound();
}

function updateSoundIcons() {
    const src = soundEnabled ? "/assets/img/backgrounds/sound-on.svg" : "/assets/img/backgrounds/sound-off.svg";
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem("mc-craft-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    document.querySelectorAll(".theme-option, .theme-option-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.theme === theme);
    });

    playClickSound();
}

function initTheme() {
    applyTheme(currentTheme);
    document.querySelectorAll(".theme-option, .theme-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
    });

    if (themeBtn && themeDropdown) {
        themeBtn.addEventListener("click", () => themeDropdown.classList.toggle("show"));
        document.addEventListener("click", (event) => {
            if (!themeBtn.contains(event.target) && !themeDropdown.contains(event.target)) {
                themeDropdown.classList.remove("show");
            }
        });
    }
}

function initMobileMenu() {
    if (!mobileMenuBtn || !mobileNav || !closeBtn) return;

    mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.add("show");
        document.body.style.overflow = "hidden";
        playClickSound();
    });

    closeBtn.addEventListener("click", () => {
        mobileNav.classList.remove("show");
        document.body.style.overflow = "";
        playClickSound();
    });

    mobileNav.addEventListener("click", (event) => {
        if (event.target === mobileNav) {
            mobileNav.classList.remove("show");
            document.body.style.overflow = "";
        }
    });

    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("show");
            document.body.style.overflow = "";
        });
    });
}

function initScroll() {
    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }

        if (backToTop) {
            backToTop.classList.toggle("show", window.scrollY > 400);
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            playClickSound();
        });
    }
}

function parseVersionYear(entry) {
    if (entry.releaseTime) {
        const year = new Date(entry.releaseTime).getFullYear();
        if (!Number.isNaN(year)) return String(year);
    }
    return "unknown";
}

function classify(type) {
    if (type === "release") return "release";
    if (type === "snapshot") return "snapshot";
    if (type === "old_beta") return "beta";
    if (type === "old_alpha") return "alpha";
    return null;
}

async function fetchManifest() {
    const endpoints = [
        "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json",
        "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"
    ];

    let lastError = null;
    for (const url of endpoints) {
        try {
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) continue;
            return await res.json();
        } catch (err) {
            lastError = err;
        }
    }

    throw lastError || new Error("Manifest fetch failed");
}

function formatDate(isoDate) {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat(currentLang === "de" ? "de-DE" : "en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
}

function setSectionLoading() {
    Object.values(sectionDefs).forEach((section) => {
        section.list.innerHTML = `<div class=\"section-loading\">${t("versions_loading")}</div>`;
        section.count.textContent = "0";
    });
}

function setSectionError() {
    Object.values(sectionDefs).forEach((section) => {
        section.list.innerHTML = `<div class=\"section-error\">${t("versions_fetch_error")}</div>`;
        section.count.textContent = "0";
    });
}

function renderSection(type) {
    const section = sectionDefs[type];
    const entries = state.filtered[type];

    section.count.textContent = String(entries.length);

    if (!entries.length) {
        section.list.innerHTML = `<div class=\"section-empty\">${t("versions_no_results")}</div>`;
        return;
    }

    const html = entries
        .map((entry) => {
            return `<div class=\"version-item\"><span class=\"version-name\">${entry.id}</span><span class=\"version-date\">${formatDate(entry.releaseTime)}</span></div>`;
        })
        .join("");

    section.list.innerHTML = html;
}

function updateLatestStrip() {
    const releaseValue = state.all.release[0] ? `${state.all.release[0].id} (${formatDate(state.all.release[0].releaseTime)})` : "-";
    const snapshotValue = state.all.snapshot[0] ? `${state.all.snapshot[0].id} (${formatDate(state.all.snapshot[0].releaseTime)})` : "-";

    if (latestRelease) {
        latestRelease.textContent = `${t("versions_latest_release_label")}: ${releaseValue}`;
    }
    if (latestSnapshot) {
        latestSnapshot.textContent = `${t("versions_latest_snapshot_label")}: ${snapshotValue}`;
    }
}

function rebuildYearOptions() {
    if (!yearSelect) return;

    const existing = yearSelect.value || "all";
    const years = new Set();

    Object.values(state.all).forEach((entries) => {
        entries.forEach((entry) => {
            if (entry._year !== "unknown") years.add(entry._year);
        });
    });

    const sorted = [...years].sort((a, b) => Number(b) - Number(a));

    yearSelect.innerHTML = `<option value=\"all\">${t("versions_year_all")}</option>${sorted
        .map((year) => `<option value=\"${year}\">${year}</option>`)
        .join("")}`;

    const valid = existing === "all" || sorted.includes(existing);
    yearSelect.value = valid ? existing : "all";
}

function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const year = yearSelect?.value || "all";

    Object.keys(state.all).forEach((type) => {
        state.filtered[type] = state.all[type].filter((entry) => {
            const matchQuery = !query || entry.id.toLowerCase().includes(query);
            const matchYear = year === "all" || entry._year === year;
            return matchQuery && matchYear;
        });

        renderSection(type);
    });
}

async function loadAndRenderVersions() {
    setSectionLoading();

    try {
        const manifest = await fetchManifest();
        const versions = Array.isArray(manifest.versions) ? manifest.versions : [];

        const grouped = {
            release: [],
            snapshot: [],
            beta: [],
            alpha: []
        };

        versions.forEach((entry) => {
            const bucket = classify(entry.type);
            if (!bucket) return;

            grouped[bucket].push({
                id: entry.id,
                releaseTime: entry.releaseTime,
                _year: parseVersionYear(entry)
            });
        });

        Object.keys(grouped).forEach((key) => {
            grouped[key].sort((a, b) => new Date(b.releaseTime) - new Date(a.releaseTime));
            state.all[key] = grouped[key];
        });

        updateLatestStrip();
        rebuildYearOptions();
        applyFilters();
    } catch (error) {
        console.error(error);
        setSectionError();
        if (latestRelease) latestRelease.textContent = `${t("versions_latest_release_label")}: -`;
        if (latestSnapshot) latestSnapshot.textContent = `${t("versions_latest_snapshot_label")}: -`;
    }
}

function initEventListeners() {
    if (langBtn) langBtn.addEventListener("click", toggleLanguage);
    if (mobileLangBtn) mobileLangBtn.addEventListener("click", toggleLanguage);
    if (soundBtn) soundBtn.addEventListener("click", toggleSound);
    if (mobileSoundBtn) mobileSoundBtn.addEventListener("click", toggleSound);

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (yearSelect) yearSelect.addEventListener("change", applyFilters);
}

function setFooterYear() {
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const loaderStartTime = Date.now();

    const loadingProgressEl = document.querySelector('.loading-progress');
    let loadingProgressBar = null, loadingPercentEl = null;
    if (loadingProgressEl) {
        loadingProgressEl.innerHTML = '<div class="loading-progress-bar"></div>';
        loadingProgressBar = loadingProgressEl.querySelector('.loading-progress-bar');
        loadingPercentEl = document.createElement('span');
        loadingPercentEl.className = 'loading-percent';
        loadingPercentEl.textContent = '0%';
        loadingProgressEl.insertAdjacentElement('afterend', loadingPercentEl);
    }
    const updateLoaderProgress = (value) => {
        const v = Math.min(100, value);
        if (loadingProgressBar) loadingProgressBar.style.width = v + '%';
        if (loadingPercentEl) loadingPercentEl.textContent = v + '%';
    };
    let simulatedProgress = 0;
    const progressTicker = setInterval(() => {
        simulatedProgress = Math.min(90, simulatedProgress + 15);
        updateLoaderProgress(simulatedProgress);
    }, 100);

    initAudio();
    updateLanguageFlags();
    updateSoundIcons();
    initTheme();
    initMobileMenu();
    initScroll();
    initEventListeners();
    applyTranslations();
    setFooterYear();

    await loadAndRenderVersions();

    clearInterval(progressTicker);
    updateLoaderProgress(100);

    const loader = document.getElementById("loader");
    if (loader) {
        const elapsed = Date.now() - loaderStartTime;
        const remaining = Math.max(0, 500 - elapsed);

        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                playLevelUpSound();
            }, 280);
        }, remaining);
    }
});
