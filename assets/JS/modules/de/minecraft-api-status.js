// Minecraft API Status – vollstaendige Infrastruktur analog zu server-status.js

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// ===== UEBERSETZUNGEN =====
const T = {
    site_title_apistatus: "MC-Craft | Minecraft API Status",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Konverter",
    nav_color_text: "Farbtext",
    nav_items: "Items Datenbank",
    nav_mobs: "Mobs Datenbank",
    nav_server_status: "Server Status",
    nav_api_status: "Minecraft API Status",
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
    apistatus_hero_badge: "Live Status",
    apistatus_hero_title: "Minecraft & Mojang <span class=\"highlight\">API Status</span>",
    apistatus_hero_desc: "Prüfe, ob die offiziellen Minecraft- und Mojang-Dienste erreichbar sind. Automatische Aktualisierung einmal pro Stunde oder manuell per Klick.",
    apistatus_hero_btn_status: "Status ansehen",
    apistatus_hero_btn_tools: "Alle Tools",
    apistatus_grid_mojang: "Mojang API",
    apistatus_grid_textures: "Texturen API",
    apistatus_grid_session: "Session API",
    apistatus_grid_versions: "Versionen API",
    apistatus_btn_refresh: "Jetzt aktualisieren",
    apistatus_checking: "Wird geprüft…",
    apistatus_last_check: "Zuletzt geprüft",
    apistatus_online: "Online",
    apistatus_offline: "Offline",
    apistatus_unknown: "Unbekannt",
    apistatus_checking_label: "Prüfe…",
    apistatus_info_note: "Die Prüfung erfolgt direkt im Browser. Blockierte, abgelaufene oder nicht eindeutig prüfbare Anfragen werden als <strong>Unbekannt</strong> angezeigt – nicht fälschlich als Offline.",
    apistatus_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
    apistatus_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
    apistatus_cta_btn_server: "Server Status",
    apistatus_cta_btn_all: "Alle Tools ansehen",
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
    footer_changelog: "Changelog",
    apistatus_loader_text1: "Minecraft API Status wird geladen…",
    loader_text2: "Dienste werden initialisiert…",
    loader_text3: "Verbindungen werden geprüft…",
    loader_text4: "Fast fertig…",
    toast_welcome_title: "Minecraft API Status geladen!",
    toast_welcome_message: "Prüfe jetzt den Status aller Mojang-Dienste!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_error_title: "Fehler",
    toast_error_message: "Ein Fehler ist aufgetreten.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar."
};

// ===== SERVICES =====
// auth.mojang.com, authserver.mojang.com, skins.minecraft.net and
// status.mojang.com were removed here: verified via DNS lookup that they no
// longer resolve at all (Mojang fully retired the legacy Yggdrasil auth/skin
// stack after migrating everyone to Microsoft accounts). They would have sat
// here permanently stuck on "Unknown" forever, which looks like a broken
// check rather than what it actually is (a genuinely retired service).
const SERVICES = [
    { id: 'minecraft-net', name: 'Minecraft Website', url: 'https://www.minecraft.net/', icon: 'fas fa-globe', desc: { de: 'Offizielle Minecraft-Website', en: 'Official Minecraft website' }, probe: () => probeFetch('https://www.minecraft.net/') },
    { id: 'session-mc-net', name: 'Minecraft Session Server', url: 'https://session.minecraft.net/', icon: 'fas fa-id-card', desc: { de: 'Klassischer Sitzungsdienst', en: 'Classic session service' }, probe: () => probeCors('https://session.minecraft.net/') },
    { id: 'account-mojang-com', name: 'Mojang Account', url: 'https://account.mojang.com/', icon: 'fas fa-user-shield', desc: { de: 'Frühere Mojang-Kontoverwaltung', en: 'Former Mojang account management' }, probe: () => probeCors('https://account.mojang.com/') },
    { id: 'api-mojang-com', name: 'Mojang Profile API', url: 'https://api.mojang.com/', icon: 'fas fa-address-card', desc: { de: 'Spielernamen- und UUID-Abfragen', en: 'Player name and UUID lookups' }, probe: () => probeFetch('https://api.mojang.com/users/profiles/minecraft/Notch') },
    { id: 'sessionserver-mojang', name: 'Mojang Session Server', url: 'https://sessionserver.mojang.com/', icon: 'fas fa-server', desc: { de: 'Spielerprofile, Skin- und Cape-Daten', en: 'Player profiles, skin and cape data' }, probe: () => probeFetch('https://sessionserver.mojang.com/session/minecraft/profile/069a79f444e94726a5befca90e38aaf5') },
    { id: 'textures-mc-net', name: 'Minecraft Texture Server', url: 'https://textures.minecraft.net/', icon: 'fas fa-image', desc: { de: 'Skin- und Cape-Texturen', en: 'Skin and cape textures' }, probe: () => probeImage('https://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b') },
    { id: 'minecraft-services', name: 'Minecraft Services API', url: 'https://api.minecraftservices.com/', icon: 'fas fa-cubes', desc: { de: 'Microsoft-Konten und Minecraft-Profile', en: 'Microsoft accounts and Minecraft profiles' }, probe: () => probeFetch('https://api.minecraftservices.com/minecraft/profile') },
    { id: 'piston-meta', name: 'Minecraft Version Manifest', url: 'https://piston-meta.mojang.com/', icon: 'fas fa-code-branch', desc: { de: 'Versionen und Download-Metadaten', en: 'Version and download metadata' }, probe: () => probeCors('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json') },
    { id: 'launcher-meta', name: 'Minecraft Launcher Meta', url: 'https://launchermeta.mojang.com/', icon: 'fas fa-list', desc: { de: 'Launcher- und Versionsmetadaten', en: 'Launcher and version metadata' }, probe: () => probeFetch('https://launchermeta.mojang.com/mc/game/version_manifest.json') },
    { id: 'piston-data', name: 'Minecraft Game Downloads', url: 'https://piston-data.mojang.com/', icon: 'fas fa-download', desc: { de: 'Offizielle Spieldateien und Server-Downloads', en: 'Official game files and server downloads' }, probe: () => probeFetch('https://piston-data.mojang.com/') },
    { id: 'resources-download', name: 'Minecraft Assets CDN', url: 'https://resources.download.minecraft.net/', icon: 'fas fa-box-archive', desc: { de: 'Sounds, Sprachen und weitere Spielressourcen', en: 'Sounds, languages, and other game assets' }, probe: () => probeFetch('https://resources.download.minecraft.net/') },
    { id: 'libraries-minecraft', name: 'Minecraft Libraries', url: 'https://libraries.minecraft.net/', icon: 'fas fa-book', desc: { de: 'Java-Bibliotheken für Minecraft und den Launcher', en: 'Java libraries for Minecraft and the launcher' }, probe: () => probeFetch('https://libraries.minecraft.net/') },
    { id: 'launcher-content', name: 'Minecraft Launcher Content', url: 'https://launchercontent.mojang.com/', icon: 'fas fa-newspaper', desc: { de: 'Neuigkeiten und Inhalte des Minecraft Launchers', en: 'Minecraft Launcher news and content' }, probe: () => probeFetch('https://launchercontent.mojang.com/') }
];

// ===== HILFSFUNKTIONEN =====
function t(key, placeholders) {
    let text = T[key] || key;
    if (placeholders) {
        for (const [k, v] of Object.entries(placeholders)) text = text.replace('{' + k + '}', v);
    }
    return text;
}

function getThemeName(theme) {
    return t({ overworld: 'theme_overworld', nether: 'theme_nether', end: 'theme_end' }[theme] || 'theme_overworld');
}

// ===== DOM-ELEMENTE =====
const loader         = document.getElementById('loader');
const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
const closeBtn       = document.getElementById('closeBtn');
const mobileNav      = document.getElementById('mobileNav');
const themeBtn       = document.getElementById('themeBtn');
const themeDropdown  = document.getElementById('themeDropdown');
const backToTop      = document.getElementById('backToTop');
const header         = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');
const soundBtn       = document.getElementById('soundBtn');
const soundIcon      = document.getElementById('soundIcon');
const mobileSoundBtn  = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
let autoRefreshTimer = null;
let isChecking       = false;

const AUTO_REFRESH_INTERVAL = 60 * 60 * 1000;

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initSoundToggle();
    initDynamicUI();
    initApiStatus();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => {});
    } catch (e) {}
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try { levelUpSound.currentTime = 0; levelUpSound.play().catch(() => {}); } catch (e) {}
}

function playClickSound() {
    if (!soundEnabled) return;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    if (now - (window.__mcCraftLastClick || 0) < 120) return;
    window.__mcCraftLastClick = now;
    try {
        const ctx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());
        if (ctx.state === 'suspended') { ctx.resume(); return; }
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start(); setTimeout(() => osc.stop(), 100);
    } catch (e) {}
}

// ===== SOUND TOGGLE =====
function initSoundToggle() {
    updateSoundIcon();
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);
    if (mobileSoundBtn) mobileSoundBtn.addEventListener('click', toggleSound);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('mc-craft-sound', soundEnabled);
    updateSoundIcon();
    playClickSound();
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'), 'info');
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

function initDynamicUI() {


    // Update service card descriptions
    document.querySelectorAll('.api-card').forEach(card => {
        const svc = SERVICES.find(s => s.id === card.id.replace('card-', ''));
        if (svc) {
            const descEl = card.querySelector('.api-card-desc');
            if (descEl) descEl.textContent = svc.desc.de;
        }
    });

    // Status-Badges übersetzen
    document.querySelectorAll('.api-status-badge').forEach(badge => {
        const status =
            ['online', 'offline', 'unknown', 'checking']
                .find(value => badge.classList.contains(value)) || 'unknown';

        const label = badge.querySelector('[id^="badge-label-"]');

        if (label) {
            label.textContent = t(BADGE_KEYS[status]);
        }
    });

}

// ===== LOADER =====
function initLoader() {
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

    const loadingText = document.querySelector('.loading-text');
    const texts = ['apistatus_loader_text1', 'loader_text2', 'loader_text3', 'loader_text4'].map(k => t(k));
    let idx = 0, progress = 0;
    const iv = setInterval(() => {
        progress += 25;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            clearInterval(iv);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => { playLevelUpSound(); showWelcomeToast(); }, 150);
                setTimeout(() => loader.style.display = 'none', 500);
            }, 250);
        } else if (idx < texts.length - 1) {
            loadingText.textContent = texts[++idx];
        }
    }, 120);
}

function showWelcomeToast() {
    showToast(t('toast_welcome_title'), t('toast_welcome_message'), 'info');
}

// ===== THEME =====
function initTheme() { applyTheme(currentTheme); updateActiveThemeButtons(); }

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    currentTheme = theme;
}

function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === currentTheme);
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => { mobileNav.classList.add('show'); document.body.style.overflow = 'hidden'; playClickSound(); });
    closeBtn.addEventListener('click', closeMobileMenu);
    mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeMobileMenu(); });
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMobileMenu));
}

function closeMobileMenu() { mobileNav.classList.remove('show'); document.body.style.overflow = ''; playClickSound(); }

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    themeBtn.addEventListener('click', e => { e.stopPropagation(); themeDropdown.classList.toggle('show'); playClickSound(); });
    document.addEventListener('click', e => { if (!e.target.closest('.theme-switcher')) themeDropdown.classList.remove('show'); });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            applyTheme(theme); updateActiveThemeButtons(); themeDropdown.classList.remove('show'); playClickSound();
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }), 'info');
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); playClickSound(); });
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) window.scrollTo({ top: target.offsetTop - header.offsetHeight, behavior: 'smooth' });
        });
    });
}

// ===== TOAST =====
function showToast(title, message, type) {
    const icons = { error: 'fas fa-exclamation-triangle', warning: 'fas fa-exclamation-circle', success: 'fas fa-check-circle', info: 'fas fa-server' };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<div class="toast-icon"><i class="' + (icons[type] || 'fas fa-info-circle') + '"></i></div>' +
        '<div class="toast-content"><div class="toast-title">' + title + '</div><div class="toast-message">' + message + '</div></div>';
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 7000);
    toast.addEventListener('click', () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}

// ===== API STATUS CHECKER =====
const STATUS_CLASS = { online: 'status-online', offline: 'status-offline', unknown: 'status-unknown', checking: 'status-checking' };
const BADGE_CLASS  = { online: 'online', offline: 'offline', unknown: 'unknown', checking: 'checking' };
const BADGE_KEYS   = { online: 'apistatus_online', offline: 'apistatus_offline', unknown: 'apistatus_unknown', checking: 'apistatus_checking_label' };

function buildCard(svc) {
    const card = document.createElement('div');
    card.className = 'api-card ' + STATUS_CLASS.checking;
    card.id = 'card-' + svc.id;
    card.innerHTML =
        '<div class="api-card-icon"><i class="' + svc.icon + '"></i></div>' +
        '<div class="api-card-info">' +
            '<div class="api-card-name">' + svc.name + '</div>' +
            '<div class="api-card-url">' + svc.url + '</div>' +
            '<div class="api-card-desc">' + (svc.desc.de) + '</div>' +
        '</div>' +
        '<div class="api-status-badge checking" id="badge-' + svc.id + '">' +
            '<span class="status-dot"></span>' +
            '<span id="badge-label-' + svc.id + '">' + t('apistatus_checking_label') + '</span>' +
        '</div>';
    return card;
}

function updateCard(svc, status) {
    const card  = document.getElementById('card-'        + svc.id);
    const badge = document.getElementById('badge-'       + svc.id);
    const label = document.getElementById('badge-label-' + svc.id);
    if (!card || !badge || !label) return;
    card.className    = 'api-card ' + (STATUS_CLASS[status] || STATUS_CLASS.unknown);
    badge.className   = 'api-status-badge ' + (BADGE_CLASS[status] || BADGE_CLASS.unknown);
    label.textContent = t(BADGE_KEYS[status] || BADGE_KEYS.unknown);
}

function probeFetch(url) {
    return new Promise(resolve => {
        const ctrl  = new AbortController();
        const timer = setTimeout(() => { ctrl.abort(); resolve('unknown'); }, 8000);
        // GET + no-cors: opaque response = server responded = online.
        // Ein Fehler ist im Browser nicht eindeutig: CORS, Tracking-Schutz,
        // DNS oder ein wirklich nicht erreichbarer Dienst sehen gleich aus.
        fetch(url, { method: 'GET', mode: 'no-cors', signal: ctrl.signal })
            .then(() => { clearTimeout(timer); resolve('online'); })
            .catch(() => { clearTimeout(timer); resolve('unknown'); });
    });
}

function probeCors(url) {
    return new Promise(resolve => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => { ctrl.abort(); resolve('unknown'); }, 8000);
        fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store', signal: ctrl.signal })
            .then(response => {
                clearTimeout(timer);
                resolve(response.ok ? 'online' : response.status >= 500 ? 'offline' : 'unknown');
            })
            .catch(() => { clearTimeout(timer); resolve('unknown'); });
    });
}

function probeImage(url) {
    return new Promise(resolve => {
        const img   = new Image();
        const timer = setTimeout(() => { img.src = ''; resolve('unknown'); }, 6000);
        img.onload  = () => { clearTimeout(timer); resolve('online');  };
        img.onerror = () => { clearTimeout(timer); resolve('unknown'); };
        img.src = url + '?_=' + Date.now();
    });
}

async function checkAll() {
    if (isChecking) return;
    isChecking = true;

    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    btn.disabled = true;
    document.getElementById('lastCheck').textContent = t('apistatus_checking');

    SERVICES.forEach(svc => updateCard(svc, 'checking'));

    const results = {};
    await Promise.allSettled(SERVICES.map(async svc => {
        const status = await svc.probe();
        results[svc.id] = status;
        updateCard(svc, status);
    }));

    const vals = Object.values(results);
    document.getElementById('countOnline').textContent  = vals.filter(v => v === 'online').length;
    document.getElementById('countOffline').textContent = vals.filter(v => v === 'offline').length;
    document.getElementById('countUnknown').textContent = vals.filter(v => v === 'unknown').length;

    const now = new Date();
    document.getElementById('lastCheck').textContent =
        t('apistatus_last_check') + ': ' +
        now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    btn.classList.remove('spinning');
    btn.disabled = false;
    isChecking = false;
    clearTimeout(autoRefreshTimer);
    autoRefreshTimer = setTimeout(checkAll, AUTO_REFRESH_INTERVAL);
}

function initApiStatus() {
    const grid = document.getElementById('statusGrid');
    SERVICES.forEach(svc => grid.appendChild(buildCard(svc)));
    document.getElementById('refreshBtn').addEventListener('click', () => {
        clearTimeout(autoRefreshTimer);
        checkAll();
        playClickSound();
    });
    checkAll();
}