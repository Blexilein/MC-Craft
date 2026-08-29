// ===== CAPES.JS =====

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen
const T = {
    site_title_capes: "MC-Craft | Cape Galerie",
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
    capes_hero_title: "Minecraft <span class=\"highlight\">Cape Galerie</span>",
    capes_hero_desc: "Entdecke alle offiziellen Minecraft Capes im interaktiven 3D-Viewer. Teste Capes auf verschiedenen Skins und lade deine Favoriten herunter.",
    capes_btn_gallery: "Capes entdecken",
    capes_btn_viewer: "3D Viewer",
    capes_grid_all: "Alle Offizielle Capes",
    capes_grid_3d: "3D Cape Viewer",
    capes_grid_preview: "Live Vorschau",
    capes_grid_download: "Kostenlos Downloaden",
    capes_viewer_title: "3D Cape Viewer",
    capes_viewer_subtitle: "Teste Capes live auf verschiedenen Skins",
    capes_controls_drag: "Ziehen zum Rotieren",
    capes_controls_scroll: "Scrollen zum Zoomen",
    capes_info_title: "Informationen",
    capes_info_current: "Aktuelles Cape",
    capes_info_year: "Jahr",
    capes_info_type: "Typ",
    capes_info_availability: "Verfügbarkeit",
    capes_btn_pause: "Animation pausieren",
    capes_btn_play: "Animation abspielen",
    capes_anim_mode_label: "Bewegung",
    capes_anim_walk: "Laufen",
    capes_anim_run: "Rennen",
    capes_anim_fly: "Fliegen",
    capes_anim_swim: "Schwimmen",
    capes_anim_sneak: "Schleichen",
    capes_btn_rotate: "Drehung:",
    capes_btn_layer: "2. Layer:",
    capes_rotate_on: "An",
    capes_rotate_off: "Aus",
    capes_btn_view_mode: "Ansicht:",
    capes_view_mode_cape: "Cape",
    capes_view_mode_elytra: "Elytra",
    capes_btn_download: "Cape downloaden",
    capes_gallery_title: "Alle Offiziellen Capes",
    capes_gallery_subtitle: "Klicke auf ein Cape für die 3D-Vorschau",
    capes_filter_all: "Alle",
    capes_filter_account: "Account",
    capes_filter_mojang: "Mojang",
    capes_filter_physical: "Physische Events",
    capes_filter_virtual: "Virtuelle Events",
    capes_filter_minecon: "MineCon",
    capes_filter_personal: "Persönlich",
    capes_filter_competition: "Wettbewerb",
    capes_filter_volunteer: "Volunteer",
    capes_filter_temporary: "Temporär",
    capes_filter_api: "API Test",
    capes_filter_joke: "Joke",
    capes_filter_unused: "Ungenutzt",
    capes_search_placeholder: "Capes suchen...",
    capes_upload_title: "Eigene Elytra anzeigen",
    capes_upload_subtitle: "Lade deine Elytra-Textur hoch und teste sie direkt im Viewer",
    capes_upload_drop: "Elytra Datei hier ablegen",
    capes_upload_click: "oder klicken um eine Datei auszuwählen",
    capes_btn_select_elytra: "Elytra auswählen",
    capes_upload_note: "Unterstützt nur .png Dateien (empfohlen 64x32, max. 100KB)",
    capes_requirements_title: "Voraussetzungen",
    capes_requirements_line1: "• PNG Format (transparente Bereiche möglich)",
    capes_requirements_line2: "• Empfohlenes Format: 64x32 Pixel",
    capes_requirements_line3: "• Maximal 100KB Dateigröße",
    capes_availability_official: "Offiziell",
    capes_availability_custom: "Lokal hochgeladen",
    capes_type_custom_elytra: "Custom Elytra",
    capes_info_section_title: "Über Minecraft Capes",
    capes_info_section_subtitle: "Wissenswertes über die exklusiven Umhänge",
    capes_info_card1_title: "Was sind Capes?",
    capes_info_card1_desc: "Capes sind spezielle Umhänge, die nur von Mojang vergeben werden. Sie sind reine Kosmetik-Items ohne Spieleffekte.",
    capes_info_card2_title: "Erhalt von Capes",
    capes_info_card2_desc: "Capes werden für besondere Leistungen vergeben: MineCon-Teilnahme, Übersetzungshilfen, Mitarbeit bei Mojang oder besondere Events.",
    capes_info_card3_title: "Wichtiger Hinweis",
    capes_info_card3_desc: "Offizielle Capes können nicht gekauft oder durch Mods erhalten werden. Unerlaubte Cape-Mods führen zum Account-Ban.",
    capes_info_card4_title: "Cross-Platform",
    capes_info_card4_desc: "Capes sind auf allen Plattformen sichtbar (Java & Bedrock) und werden über dein Microsoft-Konto synchronisiert.",
    capes_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
    capes_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
    capes_cta_btn_lookup: "Skin Lookup",
    capes_cta_btn_all: "Alle Tools ansehen",
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
    loader_text1_capes: "MC-Craft Cape Galerie wird geladen...",
    loader_text2: "Cape-Daten werden geladen...",
    loader_text3: "3D Viewer wird initialisiert...",
    loader_text4: "Fast fertig...",
    loader_text5: "Fast fertig...",
    toast_welcome_title: "Cape Galerie geladen!",
    toast_welcome_message: "Entdecke die offiziellen Capes!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_rotation_toggle: "Auto-Rotation",
    toast_rotation_on: "aktiviert",
    toast_rotation_off: "deaktiviert",
    toast_animation_toggle: "Animation",
    toast_animation_started: "gestartet",
    toast_animation_paused: "pausiert",
    toast_animation_mode: "Bewegung: {mode}",
    toast_animation_mode_fallback: "{mode} nicht nativ verfugbar, {fallback} wird verwendet",
    toast_animation_mode_simulated: "Schwimmen wird simuliert",
    toast_layer_toggle: "Zweite Lage",
    toast_layer_on: "aktiviert",
    toast_layer_off: "deaktiviert",
    toast_download_started: "Download gestartet",
    toast_download_failed: "Download fehlgeschlagen",
    toast_cape_loaded: "Cape geladen",
    toast_view_mode_title: "Rückenansicht",
    toast_view_mode_cape_active: "Cape-Ansicht aktiviert",
    toast_view_mode_elytra_active: "Elytra-Ansicht aktiviert",
    toast_upload_success_elytra: "Elytra geladen",
    toast_upload_error_elytra: "Fehler beim Laden der Elytra",
    toast_error_general: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
    toast_error_title: "Fehler",
    toast_error_no_cape: "Kein Cape ausgewählt",
    toast_error_no_data: "Fehler beim Laden der Cape-Daten",
    toast_error_file_too_large: "Datei zu groß (max. 100KB)",
    toast_error_file_type: "Nur PNG Dateien erlaubt"
};

// DOM Elements
const loader = document.getElementById('loader');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const backToTop = document.getElementById('backToTop');
const toastContainer = document.getElementById('toastContainer');
const capesGrid = document.getElementById('capesGrid');
const capeSearch = document.getElementById('capeSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeOptions = document.querySelectorAll('.theme-option, .theme-option-btn');

// Sound-Elemente
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// Sprach-Elemente
// 3D Viewer Elements
const capeViewerCanvas = document.getElementById('capeViewer');
const toggleAnimButton = document.getElementById('toggleAnimButton');
const animationModeSelect = document.getElementById('animationModeSelect');
const rotateBtn = document.getElementById('rotateBtn');
const toggleLayerBtn = document.getElementById('toggleLayerBtn');
const layerStatus = document.getElementById('layerStatus');
const toggleElytraBtn = document.getElementById('toggleElytraBtn');
const viewModeStatus = document.getElementById('viewModeStatus');
const downloadCapeBtn = document.getElementById('downloadCapeBtn');

// Cape Info Elements
const capeNameEl = document.getElementById('capeName');
const capeYearEl = document.getElementById('capeYear');
const capeTypeEl = document.getElementById('capeType');
const capeAvailabilityEl = document.getElementById('capeAvailability');

// 3D Viewer Variables
let viewer = null;
let walkAnimation = null;
let isAnimating = true;
let isRotating = true;
let secondLayerVisible = true;
let animationMode = 'walk';
let resolvedAnimationMode = 'walk';
let currentCape = null;
let isElytraMode = false;
let customElytraDataUrl = null;
let customElytraFileName = '';

// Cape Data Storage – wird aus window.allCapesCategories befüllt (keine eigene Deklaration mit let!)
var capesData;
var allCapes;
var filteredCapes = [];
var currentFilter = 'all';

// ===== HILFSFUNKTION =====
function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [placeholder, value] of Object.entries(placeholders)) {
        text = text.replace(`{${placeholder}}`, value);
    }
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

// ===== HILFSFUNKTIONEN FÜR CAPE-DATEN (sprachabhängig) =====
function getCapeName(cape) {
    return cape.name_de || cape.name;
}

function getCapeDescription(cape) {
    return cape.description_de || cape.description;
}

function getCapeTags(cape) {
    return cape.tags_de || cape.tags;
}

function getAnimationModeLabel(mode) {
    switch (mode) {
        case 'run': return t('capes_anim_run');
        case 'fly': return t('capes_anim_fly');
        case 'swim': return t('capes_anim_swim');
        case 'sneak': return t('capes_anim_sneak');
        default: return t('capes_anim_walk');
    }
}

function createViewerAnimation(mode) {
    const modeConstructors = {
        walk: ['WalkingAnimation'],
        run: ['RunningAnimation', 'WalkingAnimation'],
        fly: ['FlyingAnimation', 'WalkingAnimation'],
        // Einige SkinView3D-Versionen haben keine SwimmingAnimation.
        // Dann nehmen wir FlyingAnimation als bestes visuelles Fallback.
        swim: ['SwimAnimation', 'FlyingAnimation', 'WalkingAnimation'],
        sneak: ['CrouchAnimation', 'WalkingAnimation']
    };

    const constructorCandidates = modeConstructors[mode] || modeConstructors.walk;
    let animation = null;
    let usedMode = mode;

    for (const ctorName of constructorCandidates) {
        const ctor = skinview3d && skinview3d[ctorName];
        if (typeof ctor === 'function') {
            animation = new ctor();
            usedMode =
                ctorName === 'WalkingAnimation' ? 'walk' :
                ctorName === 'FlyingAnimation' ? 'fly' :
                ctorName === 'RunningAnimation' ? 'run' :
                'swim';
            break;
        }
    }

    if (animation) {
        if (usedMode === 'run') animation.speed = 0.85;
        else if (usedMode === 'fly') animation.speed = 0.9;
        else if (usedMode === 'swim') animation.speed = 0.75;
        else if (usedMode === 'sneak') animation.speed = 0.45;
        else animation.speed = 0.5;
    }

    return { animation, usedMode };
}

function applyMovementPose(mode) {
    if (!viewer || !viewer.playerObject) return;
    const playerObject = viewer.playerObject;

    if (mode === 'swim') {
        playerObject.rotation.x = -Math.PI / 2.2;
    } else if (mode === 'fly') {
        playerObject.rotation.x = -Math.PI / 6;
    } else {
        playerObject.rotation.x = 0;
        playerObject.position.y = 0;
    }
}

function applyAnimationMode(showFeedback = false) {
    if (!viewer) return;
    const result = createViewerAnimation(animationMode);
    walkAnimation = result.animation;
    resolvedAnimationMode = result.usedMode;

    if (isAnimating) {
        viewer.animation = walkAnimation;
    }

    applyMovementPose(animationMode);

    if (animationModeSelect) {
        animationModeSelect.value = animationMode;
    }

    if (showFeedback) {
        const modeLabel = getAnimationModeLabel(animationMode);
        if (resolvedAnimationMode !== animationMode) {
            if (animationMode === 'swim') {
                showToast(
                    t('toast_animation_mode', { mode: modeLabel }),
                    t('toast_animation_mode_simulated'),
                    'info'
                );
            } else {
                const fallbackLabel = getAnimationModeLabel(resolvedAnimationMode);
                showToast(
                    t('toast_animation_mode', { mode: modeLabel }),
                    t('toast_animation_mode_fallback', { mode: modeLabel, fallback: fallbackLabel }),
                    'warning'
                );
            }
        } else {
            showToast(
                t('toast_animation_mode', { mode: modeLabel }),
                '',
                'info'
            );
        }
    }
}

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    init3DViewer();
    initFooterYear();
    initEventListeners();
    setupBackToTop();
    initSoundToggle();
    initDynamicUI();
    
    // Lade alle Cape-Daten aus der zentralen Datei
    loadAllCapesData();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
        initWebAudioFallback();
    }
}

function initWebAudioFallback() {
    if (window.AudioContext || window.webkitAudioContext) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.start();
            setTimeout(() => oscillator.stop(), 200);
        } catch (error) {
            console.log('Web Audio API Fallback fehlgeschlagen:', error);
        }
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
    showToast(
        t('toast_sound_title'),
        t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'),
        'info'
    );
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

function initDynamicUI() {




    // Rotations-Status
    const rotateStatus = document.getElementById('rotateStatus');
    if (rotateStatus) {
        rotateStatus.textContent = isRotating ? t('capes_rotate_on') : t('capes_rotate_off');
    }
    if (animationModeSelect) {
        animationModeSelect.value = animationMode;
    }
    updateLayerButtonState();
    updateViewModeButtonState();

    // Galerie neu rendern
    if (allCapes && allCapes.length) {
        renderCapes(filteredCapes.length ? filteredCapes : allCapes);
        if (isElytraMode && customElytraDataUrl) {
            updateCustomElytraInfo();
        } else if (currentCape) {
            updateCapeInfo(currentCape);
        }
    }
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

    let progress = 0;
    const loadingText = document.querySelector('.loading-text');
    const texts = [
        t('loader_text1_capes'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
    ];
    let index = 0;
    const interval = setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => playLevelUpSound(), 150);
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
    if (allCapes && allCapes.length) {
        showToast(
            t('toast_welcome_title'),
            `${allCapes.length} ${t('capes_filter_all')}`,
            'success'
        );
    }
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
    updateThemeButtonIcon();
}

function updateThemeButtonIcon() {
    const icon = themeBtn.querySelector('i');
    icon.className = 'fa-solid fa-palette';
}

function updateActiveThemeButtons() {
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
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

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
        playClickSound();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) themeDropdown.classList.remove('show');
    });
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            themeDropdown.classList.remove('show');
            playClickSound();
            showToast(
                t('toast_theme_changed'),
                t('toast_theme_to', { theme: getThemeName(theme) }),
                'info'
            );
        });
    });
}

// ===== BACK TO TOP =====
function setupBackToTop() {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.pageYOffset > 300);
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
    let icon = 'fa-check';
    if (type === 'error') icon = 'fa-times';
    else if (type === 'info') icon = 'fa-info';
    else if (type === 'warning') icon = 'fa-exclamation';
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    playClickSound();
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 7000); // ⬅️ 7 Sekunden
}

// ===== DATEN LADEN =====
async function loadAllCapesData() {
    console.log("📥 Lade Cape-Daten aus zentraler Datei...");
    try {
        const res = await fetch('/assets/JS/capes/capes-data.json');
        if (!res.ok) {
            throw new Error('Cape-Daten nicht gefunden (capes-data.json).');
        }
        const categories = await res.json();

        capesData = categories;
        allCapes = Object.values(categories).flat();
        filteredCapes = [...allCapes];

        console.log(`✅ ${allCapes.length} Capes geladen`);

        // Galerie initialisieren
        initCapeGallery();
    } catch (error) {
        console.error('Fehler beim Laden der Cape-Daten:', error);
        showError(t('toast_error_no_data'));
    }
}

function showError(message) {
    if (capesGrid) {
        capesGrid.innerHTML = `
            <div class="error-message" style="text-align:center; padding:2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size:3rem; color:var(--accent);"></i>
                <h3>${t('toast_error_title')}</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn btn-primary">
                    <i class="fas fa-redo"></i> ${t('loader_text1_capes')}
                </button>
            </div>
        `;
    }
}

// ===== CAPE GALLERY =====
function initCapeGallery() {
    if (!allCapes.length) {
        console.warn('Keine Cape-Daten verfügbar');
        showToast(t('toast_error_title'), t('toast_error_no_data'), 'error');
        return;
    }
    renderCapes(allCapes);
    if (allCapes.length > 0) selectCape(allCapes[0]);
    showWelcomeToast();
}

function renderCapes(capes) {
    capesGrid.innerHTML = '';
    if (!capes.length) {
        capesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${t('capes_filter_all')}</h3>
                <p>${t('capes_gallery_subtitle')}</p>
            </div>
        `;
        return;
    }
    capes.forEach(cape => {
        const card = document.createElement('div');
        card.className = `cape-card ${cape.featured ? 'featured' : ''}`;
        card.dataset.id = cape.id;
        card.dataset.category = cape.category;
        card.innerHTML = `
            <div class="cape-image">
                <img src="${cape.thumbnailUrl || '/assets/img/capes/Default_Cape_texture.png'}" alt="${getCapeName(cape)}" loading="lazy"
                     onerror="this.src='/assets/img/capes/Default_Cape.png'">
                ${cape.featured ? '<div class="cape-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                <div class="cape-type-badge ${cape.category}">${cape.type}</div>
            </div>
            <div class="cape-info">
                <h3 class="cape-name">${getCapeName(cape)}</h3>
                <div class="cape-meta">
                    <div class="cape-year"><i class="fas fa-calendar"></i> <span>${cape.year}</span></div>
                </div>
                <p class="cape-description">${getCapeDescription(cape)}</p>
                <div class="cape-tags">
                    ${(getCapeTags(cape) || []).map(tag => `<span class="cape-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        card.addEventListener('click', () => selectCape(cape));
        capesGrid.appendChild(card);
    });
}

// ===== 3D VIEWER =====
function init3DViewer() {
    try {
        viewer = new skinview3d.SkinViewer({
            canvas: capeViewerCanvas,
            width: 400,
            height: 500,
            skin: '/assets/img/backgrounds/Steve.png',
            cape: null
        });
        applyAnimationMode(false);
        viewer.animation = walkAnimation;
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.5;
        viewer.camera.position.z = 50;
        viewer.controls.enableZoom = true;
        viewer.controls.enableRotate = true;
        setSecondLayerVisible(secondLayerVisible);
        updateLayerButtonState();
        applyBackEquipmentMode();
        updateViewModeButtonState();
    } catch (error) {
        console.error('Fehler beim Initialisieren des 3D Viewers:', error);
        showToast(t('toast_error_title'), '3D Viewer konnte nicht geladen werden', 'error');
    }
}

function selectCape(cape) {
    if (!viewer) return;
    currentCape = cape;
    try {
        applyBackEquipmentMode();
        loadBackTexture();
        applyMovementPose(animationMode);
        setSecondLayerVisible(secondLayerVisible);
        document.getElementById('viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (isElytraMode && customElytraDataUrl) {
            updateCustomElytraInfo();
        } else {
            updateCapeInfo(cape);
        }
        document.querySelectorAll('.cape-card').forEach(c => c.classList.remove('active'));
        const activeCard = document.querySelector(`.cape-card[data-id="${cape.id}"]`);
        if (activeCard) activeCard.classList.add('active');
        showToast(t('toast_cape_loaded'), getCapeName(cape), 'success');
    } catch (error) {
        console.error('Fehler beim Laden des Capes:', error);
        showToast(t('toast_error_title'), t('toast_download_failed'), 'error');
    }
}

function updateCapeInfo(cape) {
    capeNameEl.textContent = getCapeName(cape);
    capeYearEl.textContent = cape.year;
    capeTypeEl.textContent = cape.type;
    if (capeAvailabilityEl) {
        capeAvailabilityEl.textContent = cape.availability || t('capes_availability_official');
    }
}

function updateCustomElytraInfo() {
    capeNameEl.textContent = customElytraFileName || 'custom-elytra.png';
    capeYearEl.textContent = '-';
    capeTypeEl.textContent = t('capes_type_custom_elytra');
    if (capeAvailabilityEl) {
        capeAvailabilityEl.textContent = t('capes_availability_custom');
    }
}

function applyBackEquipmentMode() {
    if (!viewer || !viewer.playerObject) return false;

    const targetMode = isElytraMode ? 'elytra' : 'cape';
    let applied = false;

    if (typeof viewer.playerObject.backEquipment !== 'undefined') {
        viewer.playerObject.backEquipment = targetMode;
        applied = true;
    }

    if (typeof viewer.backEquipment !== 'undefined') {
        viewer.backEquipment = targetMode;
        applied = true;
    }

    const capeObject = viewer.playerObject.cape;
    const elytraObject = viewer.playerObject.elytra;

    if (capeObject && typeof capeObject.visible === 'boolean') {
        capeObject.visible = !isElytraMode;
        applied = true;
    }

    if (elytraObject && typeof elytraObject.visible === 'boolean') {
        elytraObject.visible = isElytraMode;
        applied = true;
    }

    return applied;
}

function scheduleBackEquipmentReapply() {
    // Einige skinview3d-Versionen setzen den Modus nach async-Textur-Loads zurück.
    [0, 80, 180, 360].forEach(delay => {
        window.setTimeout(() => {
            applyBackEquipmentMode();
        }, delay);
    });
}

function getActiveBackTexture() {
    if (isElytraMode && customElytraDataUrl) {
        return customElytraDataUrl;
    }
    return currentCape ? currentCape.capeUrl : null;
}

function loadBackTexture() {
    if (!viewer) return false;
    const textureUrl = getActiveBackTexture();
    if (!textureUrl) return false;

    if (isElytraMode && typeof viewer.loadElytra === 'function') {
        viewer.loadElytra(textureUrl);
        scheduleBackEquipmentReapply();
        return true;
    }

    if (typeof viewer.loadCape === 'function') {
        viewer.loadCape(textureUrl);
        scheduleBackEquipmentReapply();
        return true;
    }

    return false;
}

function updateViewModeButtonState() {
    if (viewModeStatus) {
        viewModeStatus.textContent = t(
            isElytraMode ? 'capes_view_mode_elytra' : 'capes_view_mode_cape'
        );
    }
    if (toggleElytraBtn) {
        toggleElytraBtn.classList.toggle('btn-secondary', !isElytraMode);
        toggleElytraBtn.classList.toggle('btn-outline', isElytraMode);
    }
}

function toggleElytraMode() {
    if (!viewer) return;

    isElytraMode = !isElytraMode;
    applyBackEquipmentMode();
    loadBackTexture();
    scheduleBackEquipmentReapply();
    updateViewModeButtonState();

    if (isElytraMode && customElytraDataUrl) {
        updateCustomElytraInfo();
    } else if (currentCape) {
        updateCapeInfo(currentCape);
    }

    showToast(
        t('toast_view_mode_title'),
        t(isElytraMode ? 'toast_view_mode_elytra_active' : 'toast_view_mode_cape_active'),
        'info'
    );
}

function handleElytraUpload(file) {
    if (!file || file.type !== 'image/png') {
        showToast(
            t('toast_error_title'),
            t('toast_error_file_type'),
            'error'
        );
        return;
    }

    if (file.size > 100 * 1024) {
        showToast(
            t('toast_error_title'),
            t('toast_error_file_too_large'),
            'error'
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        customElytraDataUrl = event.target.result;
        customElytraFileName = file.name;
        isElytraMode = true;

        applyBackEquipmentMode();
        loadBackTexture();
        scheduleBackEquipmentReapply();
        applyMovementPose(animationMode);
        setSecondLayerVisible(secondLayerVisible);
        updateViewModeButtonState();
        updateCustomElytraInfo();

        showToast(
            t('toast_upload_success_elytra'),
            file.name,
            'success'
        );
    };

    reader.onerror = () => {
        showToast(
            t('toast_error_title'),
            t('toast_upload_error_elytra'),
            'error'
        );
    };

    reader.readAsDataURL(file);
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterCapes(capeSearch.value);
            playClickSound();
        });
    });
    capeSearch.addEventListener('input', (e) => filterCapes(e.target.value));
    toggleAnimButton.addEventListener('click', toggleAnimation);
    if (animationModeSelect) {
        animationModeSelect.addEventListener('change', () => {
            animationMode = animationModeSelect.value;
            applyAnimationMode(true);
            playClickSound();
        });
    }
    rotateBtn.addEventListener('click', toggleRotation);
    if (toggleElytraBtn) {
        toggleElytraBtn.addEventListener('click', toggleElytraMode);
    }
    if (toggleLayerBtn) {
        toggleLayerBtn.addEventListener('click', toggleLayer);
    }
    downloadCapeBtn.addEventListener('click', downloadCurrentCape);

    const elytraUploadArea = document.getElementById('elytraUploadArea');
    const elytraUploadInput = document.getElementById('elytraUpload');
    const selectElytraBtn = document.getElementById('selectElytraBtn');

    if (elytraUploadArea && elytraUploadInput) {
        elytraUploadArea.addEventListener('click', () => elytraUploadInput.click());
        elytraUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            elytraUploadArea.classList.add('dragover');
        });
        elytraUploadArea.addEventListener('dragleave', () => {
            elytraUploadArea.classList.remove('dragover');
        });
        elytraUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            elytraUploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            handleElytraUpload(file);
        });

        elytraUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleElytraUpload(file);
            }
        });
    }

    if (selectElytraBtn && elytraUploadInput) {
        selectElytraBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            elytraUploadInput.click();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                playClickSound();
            }
        });
    });
}

function filterCapes(searchTerm = '') {
    const term = searchTerm.toLowerCase().trim();
    filteredCapes = allCapes.filter(cape => {
        if (currentFilter !== 'all' && cape.category !== currentFilter) return false;
        if (term === '') return true;
        const name = getCapeName(cape).toLowerCase();
        const desc = getCapeDescription(cape).toLowerCase();
        const tags = (getCapeTags(cape) || []).map(t => t.toLowerCase()).join(' ');
        return name.includes(term) || desc.includes(term) || tags.includes(term) || cape.year.includes(term);
    });
    renderCapes(filteredCapes);
}

function toggleRotation() {
    isRotating = !isRotating;
    viewer.autoRotate = isRotating;
    const status = document.getElementById('rotateStatus');
    status.textContent = isRotating ? t('capes_rotate_on') : t('capes_rotate_off');
    showToast(
        t('toast_rotation_toggle'),
        isRotating ? t('toast_rotation_on') : t('toast_rotation_off'),
        'info'
    );
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    if (!walkAnimation) applyAnimationMode(false);
    viewer.animation = isAnimating ? walkAnimation : null;
    toggleAnimButton.innerHTML = isAnimating 
        ? '<i class="fas fa-pause"></i> ' + t('capes_btn_pause')
        : '<i class="fas fa-play"></i> ' + t('capes_btn_play') || 'Animation starten';
    showToast(
        t('toast_animation_toggle'),
        isAnimating ? t('toast_animation_started') : t('toast_animation_paused'),
        'info'
    );
}

function setSecondLayerVisible(visible) {
    if (!viewer || !viewer.playerObject) return false;

    let applied = false;
    const playerObject = viewer.playerObject;

    if (typeof playerObject.setOuterLayerVisible === 'function') {
        playerObject.setOuterLayerVisible(visible);
        applied = true;
    }

    if (playerObject.skin && typeof playerObject.skin.setOuterLayerVisible === 'function') {
        playerObject.skin.setOuterLayerVisible(visible);
        applied = true;
    }

    const outerParts = ['head2', 'body2', 'leftArm2', 'rightArm2', 'leftLeg2', 'rightLeg2'];
    [playerObject.skin, playerObject].forEach(partRoot => {
        if (!partRoot) return;
        outerParts.forEach(partName => {
            const part = partRoot[partName];
            if (part && typeof part.visible === 'boolean') {
                part.visible = visible;
                applied = true;
            }
        });
    });

    if (typeof playerObject.traverse === 'function') {
        const outerPartSet = new Set(outerParts.map(name => name.toLowerCase()));
        playerObject.traverse(node => {
            const nodeName = String(node.name || '').toLowerCase();
            if (outerPartSet.has(nodeName) && typeof node.visible === 'boolean') {
                node.visible = visible;
                applied = true;
            }
        });
    }

    return applied;
}

function updateLayerButtonState() {
    if (layerStatus) {
        layerStatus.textContent = secondLayerVisible ? t('capes_rotate_on') : t('capes_rotate_off');
    }
    if (toggleLayerBtn) {
        toggleLayerBtn.classList.toggle('btn-outline', secondLayerVisible);
        toggleLayerBtn.classList.toggle('btn-secondary', !secondLayerVisible);
    }
}

function toggleLayer() {
    if (!viewer) return;
    secondLayerVisible = !secondLayerVisible;
    const applied = setSecondLayerVisible(secondLayerVisible);
    updateLayerButtonState();

    showToast(
        t('toast_layer_toggle'),
        secondLayerVisible ? t('toast_layer_on') : t('toast_layer_off'),
        applied ? 'success' : 'warning'
    );
}

function downloadCurrentCape() {
    if (isElytraMode && customElytraDataUrl) {
        const fileName = customElytraFileName || 'custom-elytra.png';
        const a = document.createElement('a');
        a.href = customElytraDataUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast(
            t('toast_download_started'),
            fileName,
            'success'
        );
        return;
    }

    if (!currentCape) {
        showToast(
            t('toast_error_title'), 
            t('toast_error_no_cape'), 'error'
        );
        return;
    }
    const a = document.createElement('a');
    a.href = currentCape.capeUrl;
    a.download = `${getCapeName(currentCape)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(
        t('toast_download_started'), 
        getCapeName(currentCape), 'success'
    );
}

function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== WINDOW RESIZE & KEYBOARD =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
        if (themeDropdown.classList.contains('show')) themeDropdown.classList.remove('show');
    }
});

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====
document.addEventListener('DOMContentLoaded', () => {
    const interactive = document.querySelectorAll('button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .filter-btn');
    interactive.forEach(el => el.addEventListener('click', () => setTimeout(playClickSound, 50)));
});

// ===== ERROR HANDLING & OFFLINE =====
window.addEventListener('error', (e) => {
    console.error('JS Error:', e.message);
    if (!document.querySelector('.error-toast')) {
        showToast(t('toast_error_title'), t('toast_error_general'), 'error');
    }
});

window.addEventListener('online', () => showToast(t('toast_online_title'), t('toast_online_message'), 'success'));
window.addEventListener('offline', () => showToast(t('toast_offline_title'), t('toast_offline_message'), 'warning'));
