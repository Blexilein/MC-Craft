// coming-soon.js

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Texte dieser Seite (nur Deutsch)
const T = {
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
    coming_soon_title: "Coming Soon",
    coming_soon_subtitle: "Etwas Großes entsteht gerade",
    countdown_label: "Noch verbleibende Zeit",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    progress_label: "Entwicklungsfortschritt",
    features_title: "Was kommt",
    feature_mobs: "Mobs Datenbank",
    feature_mobs_desc: "98+ Mobs  mit Details",
    feature_themes: "3 Themes",
    feature_themes_desc: "Overworld, Nether, End",
    feature_lang: "DE / EN",
    feature_lang_desc: "Zwei Sprachen",
    feature_items: "Items",
    feature_items_desc: "Komplette Item DB",
    feature_sounds: "Mob Sounds",
    feature_sounds_desc: "Alle Sounds abspielen",
    feature_biome: "Biome Map",
    feature_biome_desc: "Interaktive Karte",
    feature_enchantment_planner: "Verzauberungsplaner",
    feature_enchantment_planner_desc: "Verzauberungen planen und XP sparen",
    feature_nether_calculator: "Nether-Koordinaten-Rechner",
    feature_nether_calculator_desc: "Oberwelt und Nether umrechnen",
    feature_stack_calculator: "Stack-Rechner",
    feature_stack_calculator_desc: "Stacks und Shulker berechnen",
    feature_command_generator: "Befehlsgenerator",
    feature_command_generator_desc: "Minecraft-Befehle einfach erstellen",
    notify_label: "Benachrichtigung erhalten",
    notify_placeholder: "deine@email.de",
    notify_btn: "ANMELDEN",
    notify_success: "✓ Du wirst benachrichtigt!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_copy_success: "Erfolg",
    toast_copy_error: "Fehler",
    toast_success: "Erfolg",
    toast_info: "Info",
    toast_error: "Fehler"
};

// ===== DOM ELEMENTE =====
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => console.log('Sounddatei nicht gefunden'));
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
    }
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
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
}
function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [p, v] of Object.entries(placeholders)) text = text.replace(`{${p}}`, v);
    return text;
}

// ===== THEME SYSTEM =====
function initTheme() {
    applyTheme(currentTheme);
    updateActiveThemeButtons();
}
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    currentTheme = theme;
}
function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
}
function initThemeSwitcher() {
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
        playClickSound();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) themeDropdown.classList.remove('show');
    });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            themeDropdown.classList.remove('show');
            playClickSound();
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }));
        });
    });
}
function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
        default: return 'Overworld';
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('show');
        document.body.style.overflow = 'hidden';
        playClickSound();
    });
    closeBtn.addEventListener('click', closeMobileMenu);
    mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) closeMobileMenu();
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}
function closeMobileMenu() {
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
    playClickSound();
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playClickSound();
    });
}

// ===== TOAST =====
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-triangle';
    else if (type === 'info') icon = 'fa-info-circle';
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 7000);
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#00A86B','#00C47A','#334155','#6C63FF','#94A3B8'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${Math.random() * 10 + 8}s;
            border-radius: ${Math.random() > 0.5 ? '2px' : '50%'};
        `;
        container.appendChild(p);
    }
}

// INFO: ===== COUNTDOWN =====
// INFO: let targetDate = new Date();
// INFO: targetDate.setDate(targetDate.getDate() + 30); // 30 Tage ab heute
// HACK: Jahr, Monat (0‑11 Für den Monat), Tag 
// NOTE: 0  = Januar
// NOTE: 1  = Februar
// NOTE: 2  = März
// NOTE: 3  = April
// NOTE: 4  = Mai
// NOTE: 5  = Juni
// NOTE: 6  = Juli
// NOTE: 7  = August
// NOTE: 8  = September
// NOTE: 9  = Oktober
// NOTE: 10 = November
// NOTE: 11 = Dezember
let targetDate = new Date(2026, 9, 30); 
targetDate.setHours(0, 0, 0, 0);

function pad(n) { return String(n).padStart(2, '0'); }
function updateCountdown() {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (!el) return;
        const newVal = pad(val);
        if (el.textContent !== newVal) {
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
            el.textContent = newVal;
        }
    };
    setVal('days', days);
    setVal('hours', hours);
    setVal('minutes', mins);
    setVal('seconds', secs);
}

// ===== NOTIFY =====
function initNotify() {
    const btn = document.getElementById('notifyBtn');
    const input = document.getElementById('emailInput');
    const successMsg = document.getElementById('notifySuccess');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const email = input.value.trim();
        if (!email || !email.includes('@')) {
            showToast(t('toast_error'), 'Bitte eine gültige E‑Mail eingeben.', 'error');
            input.style.borderColor = '#FF6B6B';
            setTimeout(() => input.style.borderColor = '', 1500);
            return;
        }
        // Hier könnte eine API‑Anfrage erfolgen – wir simulieren Erfolg
        showToast(t('toast_success'), t('notify_success'));
        if (successMsg) {
            successMsg.textContent = t('notify_success');
            successMsg.style.display = 'block';
            setTimeout(() => successMsg.style.display = 'none', 3000);
        }
        input.value = '';
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initSoundToggle();
    initParticles();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initNotify();
});