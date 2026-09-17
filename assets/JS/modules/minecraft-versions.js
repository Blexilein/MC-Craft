// Minecraft versions page module

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_welcome_title: "Minecraft Versionen geladen!",
        toast_welcome_message: "Durchsuche alle Releases, Snapshots und Betas!",
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
        toast_welcome_title: "Minecraft Versions loaded!",
        toast_welcome_message: "Browse every release, snapshot and beta!",
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

function updateSoundIcons() {
    const src = soundEnabled ? "/assets/img/backgrounds/sound-on.svg" : "/assets/img/backgrounds/sound-off.svg";
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
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
    return MCCraftAPI.getVersions();
}

function formatDate(isoDate) {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
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
    // Sound buttons and back-to-top are wired by main.js; binding them a second
    // time here made every click toggle twice, which cancelled itself out.
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
    updateSoundIcons();
    initEventListeners();
    setFooterYear();

    await loadAndRenderVersions();

    waitForSplashGone(() => { playLevelUpSound(); });
});
