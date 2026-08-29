// ===== CAPES.JS =====

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen
const T = {
    site_title_capes: "MC-Craft | Cape Gallery",
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
    capes_hero_title: "Minecraft <span class=\"highlight\">Cape Gallery</span>",
    hero_badge: "V 1.0.0 is here",
    capes_hero_desc: "Discover all official Minecraft capes in the interactive 3D viewer. Try capes on different skins and download your favorites.",
    capes_btn_gallery: "Discover Capes",
    capes_btn_viewer: "3D Viewer",
    capes_grid_all: "All Official Capes",
    capes_grid_3d: "3D Cape Viewer",
    capes_grid_preview: "Live Preview",
    capes_grid_download: "Free Download",
    capes_viewer_title: "3D Cape Viewer",
    capes_viewer_subtitle: "Try capes live on different skins",
    capes_controls_drag: "Drag to rotate",
    capes_controls_scroll: "Scroll to zoom",
    capes_info_title: "Information",
    capes_info_current: "Current Cape",
    capes_info_year: "Year",
    capes_info_type: "Type",
    capes_info_availability: "Availability",
    capes_btn_pause: "Pause animation",
    capes_btn_play: "Play animation",
    capes_anim_mode_label: "Movement",
    capes_anim_walk: "Walk",
    capes_anim_run: "Run",
    capes_anim_fly: "Fly",
    capes_anim_swim: "Swim",
    capes_anim_sneak: "Sneak",
    capes_btn_rotate: "Rotation:",
    capes_btn_layer: "Second layer:",
    capes_rotate_on: "On",
    capes_rotate_off: "Off",
    capes_btn_view_mode: "View:",
    capes_view_mode_cape: "Cape",
    capes_view_mode_elytra: "Elytra",
    capes_btn_download: "Download Cape",
    capes_gallery_title: "All Official Capes",
    capes_gallery_subtitle: "Click on a cape for 3D preview",
    capes_filter_all: "All",
    capes_filter_account: "Account",
    capes_filter_mojang: "Mojang",
    capes_filter_physical: "Physical Events",
    capes_filter_virtual: "Virtual Events",
    capes_filter_minecon: "MineCon",
    capes_filter_personal: "Personal",
    capes_filter_competition: "Competition",
    capes_filter_volunteer: "Volunteer",
    capes_filter_temporary: "Temporary",
    capes_filter_api: "API Test",
    capes_filter_joke: "Joke",
    capes_filter_unused: "Unused",
    capes_search_placeholder: "Search capes...",
    capes_upload_title: "View your own elytra",
    capes_upload_subtitle: "Upload your elytra texture and test it directly in the viewer",
    capes_upload_drop: "Drop elytra file here",
    capes_upload_click: "or click to select a file",
    capes_btn_select_elytra: "Select Elytra",
    capes_upload_note: "Only .png files supported (recommended 64x32, max 100KB)",
    capes_requirements_title: "Requirements",
    capes_requirements_line1: "• PNG format (transparent areas possible)",
    capes_requirements_line2: "• Recommended format: 64x32 pixels",
    capes_requirements_line3: "• Maximum file size: 100KB",
    capes_availability_official: "Official",
    capes_availability_custom: "Local upload",
    capes_type_custom_elytra: "Custom Elytra",
    capes_info_section_title: "About Minecraft Capes",
    capes_info_section_subtitle: "Facts about the exclusive capes",
    capes_info_card1_title: "What are capes?",
    capes_info_card1_desc: "Capes are special cloaks only awarded by Mojang. They are purely cosmetic items with no gameplay effects.",
    capes_info_card2_title: "Obtaining Capes",
    capes_info_card2_desc: "Capes are awarded for special achievements: MineCon attendance, translation help, working at Mojang or special events.",
    capes_info_card3_title: "Important Note",
    capes_info_card3_desc: "Official capes cannot be purchased or obtained through mods. Unauthorized cape mods lead to account bans.",
    capes_info_card4_title: "Cross-Platform",
    capes_info_card4_desc: "Capes are visible on all platforms (Java & Bedrock) and are synchronized via your Microsoft account.",
    capes_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
    capes_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
    capes_cta_btn_lookup: "Skin Lookup",
    capes_cta_btn_all: "View all tools",
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
    footer_changelog: "Changelog",
    loader_text1_capes: "MC-Craft Cape Gallery is loading...",
    loader_text2: "Loading cape data...",
    loader_text3: "Initializing 3D viewer...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done...",
    toast_welcome_title: "Cape Gallery loaded!",
    toast_welcome_message: "Discover the official capes!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_rotation_toggle: "Auto-rotation",
    toast_rotation_on: "enabled",
    toast_rotation_off: "disabled",
    toast_animation_toggle: "Animation",
    toast_animation_started: "started",
    toast_animation_paused: "paused",
    toast_animation_mode: "Movement: {mode}",
    toast_animation_mode_fallback: "{mode} is not natively available, using {fallback}",
    toast_animation_mode_simulated: "Swimming is simulated",
    toast_layer_toggle: "Second layer",
    toast_layer_on: "enabled",
    toast_layer_off: "disabled",
    toast_download_started: "Download started",
    toast_download_failed: "Download failed",
    toast_cape_loaded: "Cape loaded",
    toast_view_mode_title: "Back equipment",
    toast_view_mode_cape_active: "Cape view enabled",
    toast_view_mode_elytra_active: "Elytra view enabled",
    toast_upload_success_elytra: "Elytra loaded",
    toast_upload_error_elytra: "Error loading elytra",
    toast_error_general: "A small error occurred. The page continues to work.",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some features may not be available.",
    toast_error_title: "Error",
    toast_error_no_cape: "No cape selected",
    toast_error_no_data: "Error loading cape data",
    toast_error_file_too_large: "File too large (max 100KB)",
    toast_error_file_type: "Only PNG files allowed"
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
    return cape.name_en || cape.name;
}

function getCapeDescription(cape) {
    return cape.description_en || cape.description;
}

function getCapeTags(cape) {
    return cape.tags_en || cape.tags;
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
        console.log('Failed to initialize audio:', error);
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
            console.log('Web Audio API fallback failed:', error);
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
            throw new Error('Cape data not found (capes-data.json).');
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
        console.warn('No cape data available');
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
        console.error('Error initializing the 3D viewer:', error);
        showToast(t('toast_error_title'), '3D viewer could not be loaded', 'error');
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
