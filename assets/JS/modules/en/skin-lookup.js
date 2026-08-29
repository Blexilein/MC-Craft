// Skin Lookup JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;
// Übersetzungen – alle für die Skin-Lookup-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_skinlookup: "MC-Craft | Skin Lookup Java Edition",
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
    skinlookup_hero_title: "Minecraft <span class=\"highlight\">Skin Lookup</span>",
    hero_badge: "V 1.0.0 is here",
    skinlookup_hero_desc: "Find and view Minecraft Java Edition player skins in 3D. Perfect for server owners, content creators and players who want to explore skins.",
    skinlookup_btn_search: "Search Skin",
    skinlookup_btn_info: "Information",
    skinlookup_grid_3d: "3D Skin Viewer",
    skinlookup_grid_rotate: "Interactive rotation",
    skinlookup_grid_download: "Download Skin",
    skinlookup_grid_commands: "Head commands",
    skinlookup_section_title: "Skin <span class=\"highlight\">Search</span>",
    skinlookup_section_subtitle: "Enter a Minecraft player name or UUID to load the skin",
    skinlookup_placeholder: "Minecraft player name or UUID... (e.g. Blexilein, Notch)",
    skinlookup_btn_load: "Load Skin",
    skinlookup_btn_pause: "Pause animation",
    skinlookup_btn_play: "Resume animation",
    skinlookup_anim_mode_label: "Movement",
    skinlookup_anim_walk: "Walk",
    skinlookup_anim_run: "Run",
    skinlookup_anim_fly: "Fly",
    skinlookup_anim_swim: "Swim",
    skinlookup_anim_sneak: "Sneak",
    skinlookup_btn_rotate: "Rotation:",
    skinlookup_btn_layer: "Second layer:",
    skinlookup_rotate_on: "On",
    skinlookup_rotate_off: "Off",
    skinlookup_btn_loading: "Loading...",
    skinlookup_controls_drag: "Drag to rotate",
    skinlookup_controls_scroll: "Scroll to zoom",
    skinlookup_playerinfo_title: "Player Information",
    skinlookup_label_username: "Player Name",
    skinlookup_label_trimmed: "Trimmed UUID",
    skinlookup_label_custom: "Custom Skin",
    skinlookup_label_model: "Skin Model",
    skinlookup_label_history: "Name History",
    skinlookup_namehistory: "Mojang disabled the Name History API on September 13, 2022",
    skinlookup_copy_username: "Copy Name",
    skinlookup_copy_trimmed: "Copy Trimmed UUID",
    skinlookup_download: "Download Skin",
    skinlookup_yes: "Yes",
    skinlookup_yes_alex: "Yes (Alex)",
    skinlookup_no_steve: "No (Steve)",
    skinlookup_command_title: "Head Command Generator",
    skinlookup_command_subtitle: "Create a command for the player head",
    skinlookup_copy_command: "Copy Command",
    skinlookup_version_label: "Minecraft Version:",
    skinlookup_version_1812: "1.8 - 1.12",
    skinlookup_version_113204: "1.13 - 1.20.4",
    skinlookup_version_205plus: "1.20.5 - 1.21 +",
    skinlookup_tips_title: "Tips & Tricks",
    skinlookup_tip1: "You can enter either the player name or UUID",
    skinlookup_tip2: "Skins are loaded in real-time from the official Minecraft servers",
    skinlookup_tip3: "Use the generated commands for player heads in your worlds",
    skinlookup_tip4: "Pro tip: Download your own skin to edit it",
    skinlookup_info_title: "About <span class=\"highlight\">Skin Lookup</span>",
    skinlookup_info_subtitle: "How our technology works",
    skinlookup_info_card1_title: "What are Minecraft skins?",
    skinlookup_info_card1_desc: "Skins are textures that change the appearance of your Minecraft character. Every player can upload and customize their own skin.",
    skinlookup_info_card2_title: "Steve vs. Alex model",
    skinlookup_info_card2_desc: "There are two basic models: Steve (wide arms) and Alex (slim arms). Our viewer automatically detects which model is used.",
    skinlookup_info_card3_title: "PlayerDB API",
    skinlookup_info_card3_desc1: "We use",
    skinlookup_info_card3_desc2: "as a CORS-compatible proxy that retrieves UUID, player name and skin texture data from the official Mojang servers.",
    skinlookup_info_card4_title: "Mojang Texture CDN",
    skinlookup_info_card4_desc1: "The actual skin file comes directly from",
    skinlookup_info_card4_desc2: " – Mojang’s official texture server.",
    skinlookup_info_card4_desc3: "",
    skinlookup_info_card5_title: "SkinView3D Renderer",
    skinlookup_info_card5_desc1: "The 3D viewer is based on",
    skinlookup_info_card5_desc2: "a WebGL library that renders skins in real time.",
    skinlookup_info_card6_title: "Mojang data, browser-compatible",
    skinlookup_info_card6_desc1: "Since browsers cannot call the Mojang Session Server directly (CORS), we use",
    skinlookup_info_card6_desc2: "as a middleman – the skin data still comes exclusively from Mojang.",
    skinlookup_info_card7_title: "Player heads",
    skinlookup_info_card7_desc: "With the generated commands you can place player heads in your world. Perfect for galleries or decoration.",
    skinlookup_api_table_title: "APIs used in detail",
    skinlookup_api_service: "Service",
    skinlookup_api_url: "URL",
    skinlookup_api_usage: "Usage",
    skinlookup_api_example: "Example",
    skinlookup_api_playerdata: "Retrieve player data",
    skinlookup_api_skin: "Retrieve skin images",
    skinlookup_api_skin_alt: "Alternative skin source",
    skinlookup_api_3d: "3D rendering",
    skinlookup_workflow_title: "How our system works",
    skinlookup_step1_title: "Input",
    skinlookup_step1_desc: "Player name is entered",
    skinlookup_step2_title: "API request",
    skinlookup_step2_desc: "Mojang API returns UUID & texture",
    skinlookup_step3_title: "Skin retrieval",
    skinlookup_step3_desc: "Mojang CDN delivers skin directly",
    skinlookup_step4_title: "3D rendering",
    skinlookup_step4_desc: "SkinView3D displays skin in 3D",
    skinlookup_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
    skinlookup_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
    skinlookup_cta_btn_editor: "Skin Editor",
    skinlookup_cta_btn_all: "View all tools",
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
    loader_text1_skinlookup: "MC-Craft Skin Lookup is loading...",
    loader_text2: "Initializing 3D viewer...",
    loader_text3: "Preparing skin database...",
    loader_text4: "Loading sound system...",
    loader_text5: "Almost done...",
    toast_welcome_title: "Skin Lookup loaded!",
    toast_welcome_message: "Search for Minecraft skins now!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_error_title: "Error",
    toast_error_message: "An error occurred.",
    toast_success: "Success",
    toast_rate_limit: "Too many requests",
    toast_rate_limit_exceeded: "Server overloaded - please wait 1 minute",
    toast_rate_limit_wait: "Please wait {seconds} seconds",
    toast_network_error: "Network error - please check your internet connection",
    toast_timeout: "Server not responding - please try again later",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some functions may not be available.",
    toast_enter_name: "Please enter a player name or UUID!",
    toast_enter_name_detail: "No player name or UUID found!",
    toast_name_too_short: "Name must be at least 3 characters long!",
    toast_name_too_short_detail: "Name cannot be less than 3 characters",
    toast_player_not_found: "Player not found",
    toast_player_not_found_detail: "Player not found, did you spell the name correctly?",
    toast_player_loaded: "Player loaded successfully!",
    toast_load_first: "Please load a player first",
    toast_download_started: "is downloading",
    toast_download_failed: "Download failed: ",
    toast_download_cape: "Download Cape",
    toast_cape_download_started: "Cape is downloading",
    toast_copy_success: "copied!",
    toast_copy_error: "Copy error",
    toast_rotation_toggle: "Auto-rotation {status}",
    toast_animation_toggle: "Animation {status}",
    toast_animation_mode: "Movement: {mode}",
    toast_animation_mode_fallback: "{mode} is not natively available, using {fallback}",
    toast_animation_mode_simulated: "Swimming is simulated",
    toast_layer_toggle: "Second layer {status}"
};

// ===== GLOBALE VARIABLEN =====
let viewer = null;
let walkAnim = null;
let isRotating = true;
let isAnimating = true;
let secondLayerVisible = true;
let animationMode = 'walk';
let resolvedAnimationMode = 'walk';

// Rate-Limiting für API-Anfragen
let lastRequestTime = 0;
const REQUEST_DELAY = 5000; // 5 Sekunden

// Aktuell geladener Skin-URL (für Download)
let currentSkinUrl = null;
let currentCapeUrl = null;

// ===== DOM ELEMENTE =====
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// Sound-Elemente
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// Sprach-Elemente
// Skin-Lookup Elemente
const playerNameInput = document.getElementById('playerName');
const loadButton = document.getElementById('loadButton');
const toggleAnimButton = document.getElementById('toggleAnimButton');
const animationModeSelect = document.getElementById('animationModeSelect');
const rotateBtn = document.getElementById('rotateBtn');
const rotateStatus = document.getElementById('rotateStatus');
const toggleLayerBtn = document.getElementById('toggleLayerBtn');
const layerStatus = document.getElementById('layerStatus');
const downloadSkinBtn = document.getElementById('downloadSkinBtn');
const downloadCapeBtn = document.getElementById('downloadCapeBtn');
const usernameEl = document.getElementById('username');
const uuidEl = document.getElementById('uuid');
const fullUuidEl = document.getElementById('fullUuid');
const customSkinEl = document.getElementById('customSkin');
const slimModelEl = document.getElementById('slimModel');
const commandOutput = document.getElementById('commandOutput');
const mcVersion = document.getElementById('mcVersion');

// ===== HILFSFUNKTIONEN =====
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

function getAnimationModeLabel(mode) {
    switch (mode) {
        case 'run': return t('skinlookup_anim_run');
        case 'fly': return t('skinlookup_anim_fly');
        case 'swim': return t('skinlookup_anim_swim');
        case 'sneak': return t('skinlookup_anim_sneak');
        default: return t('skinlookup_anim_walk');
    }
}

function createViewerAnimation(mode) {
    const modeConstructors = {
        walk: ['WalkingAnimation'],
        run: ['RunningAnimation', 'WalkingAnimation'],
        fly: ['FlyingAnimation', 'WalkingAnimation'],
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
    walkAnim = result.animation;
    resolvedAnimationMode = result.usedMode;

    if (isAnimating) {
        viewer.animation = walkAnim;
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
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initPageAnalytics();
    initSkinViewer();
    initEventListeners();
    initSoundToggle();
    initDynamicUI();
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




    // Spezielle Elemente aktualisieren
    if (rotateStatus) {
        rotateStatus.textContent = isRotating ? t('skinlookup_rotate_on') : t('skinlookup_rotate_off');
    }
    if (animationModeSelect) {
        animationModeSelect.value = animationMode;
    }
    updateLayerButtonState();
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
        t('loader_text1_skinlookup'),
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
    updateThemeButtonIcon();
}

function updateThemeButtonIcon() {
    const icon = themeBtn.querySelector('i');
    icon.className = 'fa-solid fa-palette';
}

function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
    document.querySelectorAll('.theme-option-btn').forEach(option => {
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
        if (!e.target.closest('.theme-switcher')) {
            themeDropdown.classList.remove('show');
        }
    });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

// ===== TOAST =====
function showToast(title, message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    playClickSound();
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 7000); // ⬅️ 7 Sekunden
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Skin Lookup loaded');
}

// ===== SKIN VIEWER INITIALIZATION =====
function initSkinViewer() {
    try {
        viewer = new skinview3d.SkinViewer({
            canvas: document.getElementById("skin_container"),
            width: 300,
            height: 400,
            skin: STEVE_SKIN_URL,
            cape: null
        });

        applyAnimationMode(false);
        viewer.animation = walkAnim;
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.5;
        viewer.controls.enableZoom = true;
        viewer.controls.enableRotate = true;
        viewer.camera.position.z = 50;
        setSecondLayerVisible(secondLayerVisible);
        updateLayerButtonState();

        console.log('Skin viewer initialized');
    } catch (error) {
        console.error('Error initializing the skin viewer:', error);
        showToast(t('toast_error_title'), '3D viewer could not be loaded', 'error');
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Load Skin Button
    loadButton.addEventListener('click', loadPlayerData);
    
    // Enter key in search input
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loadPlayerData();
    });
    
    // Toggle Animation Button
    toggleAnimButton.addEventListener('click', toggleAnimation);

    if (animationModeSelect) {
        animationModeSelect.addEventListener('change', () => {
            animationMode = animationModeSelect.value;
            applyAnimationMode(true);
            // Elytra/Cape je nach Flug-Modus tauschen
            if (currentCapeUrl) {
                const backEquipment = animationMode === 'fly' ? 'elytra' : 'cape';
                try { viewer.loadCape(currentCapeUrl, { backEquipment }); } catch {}
            }
            playClickSound();
        });
    }
    
    // Rotate Button
    rotateBtn.addEventListener('click', toggleRotation);

    // Toggle second layer
    if (toggleLayerBtn) {
        toggleLayerBtn.addEventListener('click', toggleLayer);
    }
    
    // Download Skin Button
    downloadSkinBtn.addEventListener('click', downloadSkin);

    // Download Cape Button
    if (downloadCapeBtn) downloadCapeBtn.addEventListener('click', downloadCape);
    
    // Copy Buttons
    document.querySelectorAll('.btn[data-target]').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const text = document.getElementById(targetId).textContent;
            
            if (text && text !== '-') {
                copyToClipboard(text, getElementName(targetId));
            } else {
                showToast(t('toast_error_title'), t('toast_copy_error'), 'error');
            }
        });
    });
    
    // Minecraft Version Selector
    mcVersion.addEventListener('change', updateCommandBlock);
}

// Mojang-Textur-URLs für Default-Skins
const STEVE_SKIN_URL = 'https://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b';
const ALEX_SKIN_URL  = 'https://textures.minecraft.net/texture/3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3';

// ===== API FUNCTIONS =====
// PlayerDB proxied Mojang-Daten mit CORS-Support; Skin-URL kommt direkt von textures.minecraft.net
async function getPlayerData(username) {
    try {
        const cleanInput = username.trim();
        const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
        const isUuid = uuidRegex.test(cleanInput);

        const query = isUuid
            ? cleanInput.replace(/-/g, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')
            : encodeURIComponent(cleanInput);

        const res = await fetch(`https://playerdb.co/api/player/minecraft/${query}`, {
            headers: { 'Accept': 'application/json' }
        });

        if (res.status === 404 || res.status === 204 || res.status === 400) throw new Error('Player not found');
        if (res.status === 429) throw new Error('Too many requests');
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        if (!data.data?.player) throw new Error('Player not found');

        const player = data.data.player;
        const uuid = player.id; // bereits mit Bindestrichen

        // Textur-Properties von Mojang (via PlayerDB) dekodieren
        let skinUrl = null;
        let capeUrl = null;
        let isSlim = false;

        const texProp = (player.properties || []).find(p => p.name === 'textures');
        if (texProp) {
            const decoded = JSON.parse(atob(texProp.value));
            const skin = decoded.textures?.SKIN;
            const cape = decoded.textures?.CAPE;
            if (skin?.url) {
                skinUrl = skin.url; // direkt textures.minecraft.net
                isSlim = skin.metadata?.model === 'slim';
            }
            if (cape?.url) capeUrl = cape.url;
        }

        // Fallback: PlayerDB liefert skin_texture direkt
        if (!skinUrl && player.skin_texture) skinUrl = player.skin_texture;

        return { username: player.username, uuid, skinUrl, capeUrl, isSlim };

    } catch (err) {
        console.error('Fehler in getPlayerData:', err);
        throw err;
    }
}

// ===== MAIN FUNCTIONS (mit übersetzten Toasts) =====
async function loadPlayerData() {
    const now = Date.now();
    if (now - lastRequestTime < REQUEST_DELAY) {
        showToast(
            t('toast_rate_limit'),
            t('toast_rate_limit_wait', { seconds: Math.ceil((REQUEST_DELAY - (now - lastRequestTime))/1000) }),
            'error'
        );
        return;
    }
    lastRequestTime = now;

    const name = playerNameInput.value.trim();
    if (!name) {
        showToast(
            t('toast_enter_name'),
            t('toast_enter_name_detail'),
            'error'
        );
        return;
    }

    if (name.length < 3) {
        showToast(
            t('toast_name_too_short'),
            t('toast_name_too_short_detail'),
            'error'
        );
        return;
    }

    try {
        loadButton.disabled = true;
        loadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('skinlookup_btn_loading');

        const data = await getPlayerData(name);
        const { uuid, isSlim, skinUrl, capeUrl } = data;

        currentSkinUrl = skinUrl;
        currentCapeUrl = capeUrl;

        const skinToLoad = skinUrl || (isSlim ? ALEX_SKIN_URL : STEVE_SKIN_URL);
        await viewer.loadSkin(skinToLoad, { model: isSlim ? 'slim' : 'default' });

        if (capeUrl) {
            const backEquipment = animationMode === 'fly' ? 'elytra' : 'cape';
            try { await viewer.loadCape(capeUrl, { backEquipment }); } catch {}
        } else {
            try { viewer.loadCape(null); } catch {}
        }

        if (downloadCapeBtn) downloadCapeBtn.style.display = capeUrl ? '' : 'none';

        applyMovementPose(animationMode);
        setSecondLayerVisible(secondLayerVisible);

        updatePlayerInfo(data, uuid, isSlim);
        updateCommandBlock();
        
        showToast(
            t('toast_success'),
            `${t('toast_player_loaded')} (${data.username})`,
            'success'
        );
        
    } catch (err) {
        let errorMsg = err.message;
        let errorTitle = t('toast_error_title');
        
        if (err.message.includes("Player not found") || 
            err.message.includes("player.found") ||
            err.message.includes("404") ||
            err.message.includes("not found") ||
            err.message.includes("invalid") ||
            err.message.includes("No player")) {
            errorMsg = t('toast_player_not_found');
        } else if (err.message.includes("Too many requests") || 
                   err.message.includes("429") ||
                   err.message.includes("rate limit") ||
                   err.message.includes("too many")) {
            errorMsg = t('toast_rate_limit_exceeded');
        } else if (err.message.includes("Network") ||
                   err.message.includes("Failed to fetch") ||
                   err.message.includes("CORS") ||
                   err.message.includes("net::ERR")) {
            errorMsg = t('toast_network_error');
        } else if (err.message.includes("timeout") ||
                   err.message.includes("Timeout")) {
            errorMsg = t('toast_timeout');
        }
        
        showToast(
            errorTitle,
            errorMsg + (errorMsg.includes('?') ? '' : `: ${name}`),
            'error'
        );
        
    } finally {
        loadButton.disabled = false;
        loadButton.innerHTML = '<i class="fas fa-search"></i> ' + t('skinlookup_btn_load');
    }
}

function updatePlayerInfo(data, uuid, isSlim) {
    usernameEl.textContent = data.username;
    uuidEl.textContent = uuid;
    fullUuidEl.textContent = uuid.replace(/-/g, '');
    customSkinEl.textContent = data.skinUrl ? t('skinlookup_yes') : t('skinlookup_no_steve');
    slimModelEl.textContent = isSlim ? t('skinlookup_yes_alex') : t('skinlookup_no_steve');
}

function updateCommandBlock() {
    const username = usernameEl.textContent;
    const version = mcVersion.value;
    let command;
    
    if (username === '-') {
        command = '/give @p minecraft:player_head{SkullOwner:""}';
    } else {
        switch(version) {
            case '1.8-1.12':
                command = `/give @p minecraft:skull 1 3 {SkullOwner:"${username}"}`;
                break;
            case '1.13-1.20.4':
                command = `/give @p minecraft:player_head{SkullOwner:"${username}"}`;
                break;
            case '1.20.5+':
                command = `/give @p minecraft:player_head[profile={name:"${username}"}]`;
                break;
        }
    }
    
    commandOutput.textContent = command;
}

// ===== 3D VIEWER CONTROLS =====
function toggleRotation() {
    isRotating = !isRotating;
    viewer.autoRotate = isRotating;
    
    rotateStatus.textContent = isRotating ? t('skinlookup_rotate_on') : t('skinlookup_rotate_off');
    
    showToast(
        t('toast_rotation_toggle').replace('{status}', isRotating ? 'enabled' : 'disabled'),
        '',
        'info'
    );
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    if (!walkAnim) applyAnimationMode(false);
    viewer.animation = isAnimating ? walkAnim : null;
    
    toggleAnimButton.innerHTML = isAnimating 
        ? '<i class="fas fa-pause"></i> ' + t('skinlookup_btn_pause')
        : '<i class="fas fa-play"></i> ' + t('skinlookup_btn_play');
    
    showToast(
        t('toast_animation_toggle').replace('{status}', isAnimating ? 'gestartet' : 'pausiert'),
        '',
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
        layerStatus.textContent = secondLayerVisible ? t('skinlookup_rotate_on') : t('skinlookup_rotate_off');
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

    const statusText = secondLayerVisible ? t('skinlookup_rotate_on') : t('skinlookup_rotate_off');
    showToast(
        t('toast_layer_toggle').replace('{status}', statusText),
        '',
        applied ? 'success' : 'warning'
    );
}

async function downloadSkin() {
    const username = usernameEl.textContent;
    const uuid = uuidEl.textContent;
    
    if (uuid === '-' || !currentSkinUrl) {
        showToast(
            t('toast_error_title'),
            t('toast_load_first'),
            'error'
        );
        return;
    }
    
    try {
        const response = await fetch(currentSkinUrl);
        if (!response.ok) throw new Error('File could not be loaded');
        
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${username || uuid}_skin.png`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
        }, 100);
        
        showToast(
            t('toast_success'),
            `${username || uuid} ${t('toast_download_started')}`,
            'success'
        );
    } catch (error) {
        console.error('Download failed:', error);
        showToast(
            t('toast_error_title'),
            t('toast_download_failed') + error.message,
            'error'
        );
    }
}

async function downloadCape() {
    const username = usernameEl.textContent;

    if (!currentCapeUrl) {
        showToast(t('toast_error_title'), t('toast_load_first'), 'error');
        return;
    }

    try {
        const response = await fetch(currentCapeUrl);
        if (!response.ok) throw new Error('File could not be loaded');

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${username || 'player'}_cape.png`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(downloadUrl); }, 100);

        showToast(t('toast_success'), t('toast_cape_download_started'), 'success');
    } catch (error) {
        showToast(t('toast_error_title'), t('toast_download_failed') + error.message, 'error');
    }
}


function copyToClipboard(text, elementName = 'Text') {
    navigator.clipboard.writeText(text).then(() => {
        showToast(
            elementName,
            t('toast_copy_success'),
            'success'
        );
        
        const copyBtn = document.querySelector(`[data-target="${elementName.toLowerCase()}"]`);
        if (copyBtn) {
            copyBtn.classList.add('copy-success');
            setTimeout(() => copyBtn.classList.remove('copy-success'), 2000);
        }
    }).catch(err => {
        console.error('Fehler beim Kopieren:', err);
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(
            elementName,
            t('toast_copy_success'),
            'success'
        );
    });
}

function getElementName(targetId) {
    switch(targetId) {
        case 'username':
            return t('skinlookup_label_username') || 'Spielername';
        case 'uuid':
            return 'UUID';
        case 'fullUuid':
            return t('skinlookup_label_trimmed') || 'Trimmed UUID';
        case 'commandOutput':
            return t('skinlookup_command_title') || 'Befehl';
        default:
            return 'Text';
    }
}

// ===== WINDOW RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('show')) closeMobileMenu();
        if (themeDropdown.classList.contains('show')) themeDropdown.classList.remove('show');
    }
    if ((e.key === ' ' || e.key === 'Enter') && e.target === themeBtn) {
        e.preventDefault();
        themeDropdown.classList.toggle('show');
    }
});

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    showToast(
        t('toast_error_title'),
        t('toast_error_message'),
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    showToast(t('toast_online_title'), t('toast_online_message'), 'success');
});
window.addEventListener('offline', () => {
    showToast(t('toast_offline_title'), t('toast_offline_message'), 'warning');
});

// Export functions for global access
window.loadPlayerData = loadPlayerData;
window.toggleAnimation = toggleAnimation;
window.downloadSkin = downloadSkin;
