// day-night-cycle.js

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// ===== ÜBERSETZUNGEN (erweitert) =====
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
    hero_badge: "V 1.0.0 ist da",
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
    day_night_title: "Minecraft Tag-Nacht-Zyklus",
    day_night_title1: "MC-Craft | Tag-Nacht-Zyklus",
    day_night_desc: "Stelle die Minecraft‑Zeit ein und beobachte den Zeiger auf der Uhr.",
    day_night_cta: "Zur Uhr",
    day_night_mobs: "Mobs Guide",
    clock_title: "Minecraft‑Uhr",
    clock_subtitle: "Ziehe am Schieberegler oder gib einen Tick‑Wert ein.",
    hero_grid_time: "Zeit simulieren",
    hero_grid_command: "Befehl kopieren",
    hero_grid_slider: "Slider & Input",
    hero_grid_cycle: "Tag & Nacht",
    time_slider_label: "Zeit (Ticks):",
    time_input_label: "Wert:",
    copy_success: "Befehl kopiert!",
    copy_error: "Fehler beim Kopieren",
    toast_welcome_title: "Tag-Nacht-Zyklus geladen!",
    toast_welcome_message: "Stelle die Uhr ein und kopiere den Befehl.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    loader_text1_day_night: "Tag-Nacht-Zyklus wird geladen...",
    loader_text2: "Geschichte wird geladen...",
    loader_text3: "Mission wird vorbereitet...",
    loader_text4: "Funktionen werden geladen...",
    loader_text5: "Fast fertig..."
};

// ===== DOM ELEMENTE =====
const loader = document.getElementById('loader');
const canvas = document.getElementById('handCanvas');
const svgImg = document.getElementById('clockFace');
const slider = document.getElementById('timeSlider');
const numberInput = document.getElementById('timeNumber');
const commandCode = document.getElementById('commandCode');
const copyBtn = document.getElementById('copyCommandBtn');
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

let ctx = canvas.getContext('2d');
let currentTime = 0; // Ticks 0–24000

// ===== HILFSFUNKTIONEN =====
function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [p, v] of Object.entries(placeholders)) text = text.replace(`{${p}}`, v);
    return text;
}
function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
        default: return 'Overworld';
    }
}
function showToast(title, message, type = 'success') {
    if (!toastContainer) return;
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
    }, 5000);
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// ===== ZEIGER ZEICHNEN (korrigierte Winkellogik) =====
function drawHand() {
    // Canvas-Größe an das tatsächliche SVG anpassen
    const rect = svgImg.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4; // Zeigerlänge

    // Winkel: 0 Ticks = 6 Uhr (unten) → Winkel 180° (Pi)
    // 24000 Ticks = 6 Uhr nächster Tag → auch 180°
    // Fortschritt über 24000 → Winkel = (ticks / 24000) * 360°
    // Um Nullstellung auf 6 Uhr zu setzen: addiere 180°
    const angle = (currentTime / 24000) * 2 * Math.PI + Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.lineWidth = 4;
    ctx.stroke();

    // Mittelpunkt
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.fill();
}

// ===== ZEIT AKTUALISIEREN =====
function updateTime(value) {
    currentTime = Math.min(24000, Math.max(0, value));
    slider.value = currentTime;
    numberInput.value = currentTime;
    commandCode.textContent = `/time set ${currentTime}`;
    drawHand();
}

// ===== EVENT HANDLER =====
function handleSliderChange(e) {
    updateTime(parseInt(e.target.value));
    playClickSound();
}
function handleNumberChange(e) {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    val = Math.min(24000, Math.max(0, val));
    updateTime(val);
    playClickSound();
}
function copyCommand() {
    const text = commandCode.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('copy_success'), '', 'success');
    }).catch(() => {
        showToast(t('copy_error'), '', 'error');
    });
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

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
    }
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try {
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(error => {
            console.log('Autoplay blockiert:', error);
            const enableSound = () => {
                levelUpSound.play().catch(() => {});
                document.removeEventListener('click', enableSound);
                document.removeEventListener('keydown', enableSound);
            };
            document.addEventListener('click', enableSound, { once: true });
            document.addEventListener('keydown', enableSound, { once: true });
        });
    } catch (error) {
        console.log('Sound-Fehler:', error);
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

// ===== LOADER (angepasst) =====
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

    let progress = 0;
    const loadingText = document.querySelector('.loading-text');
    const texts = [
        t('loader_text1_day_night'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
    ];
    let index = 0;

    const progressInterval = setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    playLevelUpSound();
                    showWelcomeToast();
                }, 150);
                setTimeout(() => loader.style.display = 'none', 500);
            }, 300);
        } else {
            if (index < texts.length - 1) {
                index++;
                loadingText.textContent = texts[index];
            }
        }
    }, 120);
}

function showWelcomeToast() {
    showToast(
        t('toast_welcome_title'),
        t('toast_welcome_message'),
        'info'
    );
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
    drawHand(); // Zeiger neu zeichnen (Farben aktualisieren)
}
function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === currentTheme);
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
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(opt => {
        opt.addEventListener('click', () => {
            const theme = opt.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            themeDropdown.classList.remove('show');
            playClickSound();
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }));
        });
    });
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
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

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
    // Canvas‑Größe anpassen, wenn SVG geladen ist oder Fenster neu skaliert wird
    function resizeAndDraw() {
        drawHand();
    }
    if (svgImg.complete) {
        resizeAndDraw();
    } else {
        svgImg.addEventListener('load', resizeAndDraw);
    }
    window.addEventListener('resize', resizeAndDraw);

    slider.addEventListener('input', handleSliderChange);
    numberInput.addEventListener('input', handleNumberChange);
    copyBtn.addEventListener('click', copyCommand);

    updateTime(0);
});
