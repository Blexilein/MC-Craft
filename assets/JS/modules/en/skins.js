// Skins Gallery JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Skin-Bibliothek benötigten Schlüssel (UI + Toasts)
const T = {
    site_title_skins: "MC-Craft | Skin Gallery",
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
    skins_hero_title: "Minecraft <span class=\"highlight\">Skin Gallery</span>",
    hero_badge: "V 1.0.0 is here",
    skins_hero_desc: "Discover unique Minecraft skins in the interactive 3D viewer. Try different skins live and download your favorites.",
    skins_btn_gallery: "Discover Skins",
    skins_btn_viewer: "3D Viewer",
    skins_grid_3d: "All skins in 3D",
    skins_grid_360: "360° view",
    skins_grid_preview: "Live preview",
    skins_grid_download: "Free download",
    skins_viewer_title: "3D Skin Viewer",
    skins_viewer_subtitle: "View skins from all angles",
    skins_controls_drag: "Drag to rotate",
    skins_controls_scroll: "Scroll to zoom",
    skins_info_title: "Skin Information",
    skins_info_current: "Current Skin",
    skins_info_type: "Type",
    skins_info_resolution: "Resolution",
    skins_info_model: "Model",
    skins_btn_pause: "Pause animation",
    skins_btn_play: "Play animation",
    skins_anim_mode_label: "Movement",
    skins_anim_walk: "Walk",
    skins_anim_run: "Run",
    skins_anim_fly: "Fly",
    skins_anim_swim: "Swim",
    skins_anim_sneak: "Sneak",
    skins_btn_rotate: "Rotation:",
    skins_rotate_on: "On",
    skins_rotate_off: "Off",
    skins_btn_download: "Download Skin",
    skins_btn_layer: "Second layer on/off",
    skins_gallery_title: "All Skins",
    skins_gallery_subtitle: "Click on a skin for 3D preview",
    skins_filter_all: "All",
    skins_filter_character: "Characters",
    skins_filter_fantasy: "Fantasy",
    skins_filter_steampunk: "Steampunk",
    skins_filter_anime: "Anime",
    skins_filter_profession: "Professions",
    skins_filter_medieval: "Medieval",
    skins_search_placeholder: "Search skins...",
    skins_upload_title: "View your own skin",
    skins_upload_subtitle: "Upload your own Minecraft skin",
    skins_upload_drop: "Drop skin file here",
    skins_upload_click: "or click to select a file",
    skins_btn_select: "Select Skin",
    skins_upload_note: "Only .png files supported (64×64 or 64×32)",
    skins_requirements_title: "Requirements",
    skins_requirements_line1: "• PNG format (transparent areas possible)",
    skins_requirements_line2: "• 64×64 or 64×32 pixels (Slim/Steve)",
    skins_requirements_line3: "• Max 50KB file size",
    skins_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
    skins_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
    skins_cta_btn_lookup: "Skin Lookup",
    skins_cta_btn_editor: "Skin Editor",
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
    loader_text1_skins: "MC-Craft Skin Gallery is loading...",
    loader_text2: "Initializing 3D viewer...",
    loader_text3: "Preparing skin database...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done...",
    toast_welcome_title: "Skin Gallery loaded!",
    toast_welcome_message: "Discover the skins now!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_animation_toggle: "Animation",
    toast_animation_started: "started",
    toast_animation_paused: "paused",
    toast_animation_mode: "Movement: {mode}",
    toast_animation_mode_fallback: "{mode} is not natively available, using {fallback}",
    toast_animation_mode_simulated: "Swimming is simulated",
    toast_rotation_toggle: "Auto-rotation",
    toast_rotation_on: "enabled",
    toast_rotation_off: "disabled",
    toast_layer_toggle: "Second layer",
    toast_layer_on: "enabled",
    toast_layer_off: "disabled",
    toast_download_started: "Download started",
    toast_download_failed: "Download failed",
    toast_upload_success: "Skin loaded",
    toast_upload_error: "Error loading skin",
    toast_error_general: "A small error occurred. The page continues to work.",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some features may not be available.",
    toast_error_title: "Error",
    toast_error_no_skin: "No skin selected",
    toast_error_file_too_large: "File too large (max 50KB)",
    toast_error_file_type: "Only PNG files allowed",
    toast_skin_loaded: "Skin loaded"
};

// DOM Elements
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
const animationModeSelect = document.getElementById('animationModeSelect');

// 3D Viewer Variables
let viewer = null;
let walkAnimation = null;
let isAnimating = true;
let isRotating = true;
let currentSkin = null;
let secondLayerVisible = true;
let animationMode = 'walk';
let resolvedAnimationMode = 'walk';

// Skin-Daten – zweisprachig
let allSkins = [];

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

function getSkinName(skin) {
    return skin.name_en;
}

function getSkinDescription(skin) {
    return skin.description_en;
}

function getSkinTags(skin) {
    return skin.tags_en;
}

function getSkinType(skin) {
    return skin.type; // bleibt einheitlich (z.B. "steampunk")
}

function getAnimationModeLabel(mode) {
    switch (mode) {
        case 'run': return t('skins_anim_run');
        case 'fly': return t('skins_anim_fly');
        case 'swim': return t('skins_anim_swim');
        case 'sneak': return t('skins_anim_sneak');
        default: return t('skins_anim_walk');
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
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    init3DViewer();
    initFooterYear();
    initEventListeners();
    initSoundToggle();
    initDynamicUI();
    loadSkins(); // Skins werden aus allSkins geladen
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




    // Spezielle Elemente wie rotateStatus aktualisieren
    const rotateStatus = document.getElementById('rotateStatus');
    if (rotateStatus) {
        rotateStatus.textContent = isRotating ? t('skins_rotate_on') : t('skins_rotate_off');
    }
    if (animationModeSelect) {
        animationModeSelect.value = animationMode;
    }
    updateLayerButtonState();

    // Skin-Galerie neu rendern, um die Sprache zu aktualisieren
    renderSkins(allSkins);
    if (currentSkin) {
        // Aktuellen Skin neu anzeigen mit aktualisierter Sprache
        document.getElementById('skinName').textContent = getSkinName(currentSkin);
        document.getElementById('skinType').textContent = getSkinType(currentSkin);
        document.getElementById('skinModel').textContent = currentSkin.model;
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
        t('loader_text1_skins'),
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

// ===== 3D VIEWER =====
function init3DViewer() {
    try {
        viewer = new skinview3d.SkinViewer({
            canvas: document.getElementById('skinViewer'),
            width: 400,
            height: 500,
            skin: '/assets/img/skins/default_steve.png' // Fallback-Skin
        });

        applyAnimationMode(false);
        viewer.animation = walkAnimation;
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.5;
        viewer.controls.enableZoom = true;
        viewer.controls.enableRotate = true;
        viewer.camera.position.z = 50;
        setSecondLayerVisible(secondLayerVisible);
        updateLayerButtonState();
        
        console.log('3D Skin Viewer initialisiert');
    } catch (error) {
        console.error('Fehler beim Initialisieren des 3D Viewers:', error);
        showToast(
            t('toast_error_title'),
            '3D viewer could not be loaded',
            'error'
        );
    }
}

// ===== SKIN-DATEN LADEN =====
async function loadSkins() {
    try {
        const res = await fetch('/assets/JS/skins/skins-data.json');
        allSkins = res.ok ? await res.json() : [];
    } catch (err) {
        console.error('Fehler beim Laden der Skin-Daten:', err);
        allSkins = [];
    }
    renderSkins(allSkins);
    if (allSkins.length > 0) {
        selectSkin(allSkins[0]);
    }
}

function renderSkins(skins) {
    const skinsGrid = document.getElementById('skinsGrid');
    skinsGrid.innerHTML = '';
    
    if (skins.length === 0) {
        skinsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Keine Skins gefunden</h3>
                <p>Versuche es mit einem anderen Suchbegriff oder Filter.</p>
            </div>
        `;
        return;
    }
    
    skins.forEach(skin => {
        const skinCard = document.createElement('div');
        skinCard.className = 'skin-card';
        skinCard.dataset.id = skin.id;
        skinCard.dataset.type = skin.type;
        skinCard.innerHTML = `
            <div class="skin-image">
                <img src="${skin.thumbnailUrl || '/assets/img/skins/default_thumb.png'}" alt="${getSkinName(skin)}">
                <div class="skin-type-badge ${skin.type}">${skin.type}</div>
            </div>
            <div class="skin-info">
                <h3 class="skin-name">${getSkinName(skin)}</h3>
                <div class="skin-meta">
                    <span class="skin-model"><i class="fas fa-user"></i> ${skin.model}</span>
                </div>
                <p class="skin-description">${getSkinDescription(skin)}</p>
                <div class="skin-tags">
                    ${getSkinTags(skin).map(tag => `<span class="skin-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        skinCard.addEventListener('click', () => selectSkin(skin));
        skinsGrid.appendChild(skinCard);
    });
}

function selectSkin(skin) {
    currentSkin = skin;
    viewer.loadSkin(skin.skinUrl);
    applyMovementPose(animationMode);
    setSecondLayerVisible(secondLayerVisible);
    document.getElementById('skinName').textContent = getSkinName(skin);
    document.getElementById('skinType').textContent = getSkinType(skin);
    document.getElementById('skinModel').textContent = skin.model;
    document.getElementById('skinResolution').textContent = '64×64';
    showToast(
        t('toast_skin_loaded'),
        getSkinName(skin),
        'success'
    );
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Toggle Animation
    document.getElementById('toggleAnimButton').addEventListener('click', toggleAnimation);
    if (animationModeSelect) {
        animationModeSelect.addEventListener('change', () => {
            animationMode = animationModeSelect.value;
            applyAnimationMode(true);
            playClickSound();
        });
    }
    // Rotate Button
    document.getElementById('rotateBtn').addEventListener('click', toggleRotation);
    // Download Skin
    document.getElementById('downloadSkinBtn').addEventListener('click', downloadCurrentSkin);
    // Toggle Layer
    document.getElementById('toggleLayerBtn').addEventListener('click', toggleLayer);
    // Upload Area
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('skinUpload');
    const selectBtn = document.getElementById('selectSkinBtn');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'image/png') {
            handleSkinUpload(file);
        } else {
            showToast(
                t('toast_error_title'),
                t('toast_error_file_type'),
                'error'
            );
        }
    });
    selectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleSkinUpload(file);
        }
    });
    
    // Filter Buttons und Search
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('skinSearch');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterSkins(btn.dataset.filter, searchInput.value);
            playClickSound();
        });
    });
    
    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterSkins(activeFilter, searchInput.value);
    });
}

function filterSkins(category, search) {
    const term = search.toLowerCase().trim();
    const filtered = allSkins.filter(skin => {
        const skinName = getSkinName(skin).toLowerCase();
        const skinDesc = getSkinDescription(skin).toLowerCase();
        const skinTags = getSkinTags(skin).map(t => t.toLowerCase()).join(' ');
        const matchesCategory = category === 'all' || skin.type === category;
        const matchesSearch = term === '' || 
            skinName.includes(term) ||
            skinDesc.includes(term) ||
            skinTags.includes(term);
        return matchesCategory && matchesSearch;
    });
    renderSkins(filtered);
}

// ===== VIEWER CONTROLS =====
function toggleRotation() {
    isRotating = !isRotating;
    viewer.autoRotate = isRotating;
    const rotateStatus = document.getElementById('rotateStatus');
    rotateStatus.textContent = isRotating ? t('skins_rotate_on') : t('skins_rotate_off');
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
    const toggleBtn = document.getElementById('toggleAnimButton');
    toggleBtn.innerHTML = isAnimating 
        ? '<i class="fas fa-pause"></i> ' + t('skins_btn_pause')
        : '<i class="fas fa-play"></i> ' + t('skins_btn_play') || 'Animation starten';
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
    const layerBtn = document.getElementById('toggleLayerBtn');
    if (!layerBtn) return;

    const status = secondLayerVisible ? t('skins_rotate_on') : t('skins_rotate_off');
    layerBtn.innerHTML = `<i class="fas fa-layer-group"></i> ${t('skins_btn_layer')}: ${status}`;
    layerBtn.classList.toggle('btn-outline', secondLayerVisible);
    layerBtn.classList.toggle('btn-secondary', !secondLayerVisible);
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

function downloadCurrentSkin() {
    if (!currentSkin) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_skin'),
            'error'
        );
        return;
    }
    const a = document.createElement('a');
    a.href = currentSkin.skinUrl;
    a.download = `${getSkinName(currentSkin)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(
        t('toast_download_started'),
        getSkinName(currentSkin),
        'success'
    );
}

// ===== SKIN UPLOAD =====
function handleSkinUpload(file) {
    if (file.size > 50 * 1024) {
        showToast(
            t('toast_error_title'),
            t('toast_error_file_too_large'),
            'error'
        );
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const skinUrl = e.target.result;
        viewer.loadSkin(skinUrl);
        applyMovementPose(animationMode);
        setSecondLayerVisible(secondLayerVisible);
        currentSkin = { name: file.name, url: skinUrl };
        document.getElementById('skinName').textContent = file.name;
        document.getElementById('skinType').textContent = 'Custom';
        showToast(
            t('toast_upload_success'),
            file.name,
            'success'
        );
    };
    reader.readAsDataURL(file);
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .filter-btn'
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
        t('toast_error_general'),
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    showToast(
        t('toast_online_title'),
        t('toast_online_message'),
        'success'
    );
});
window.addEventListener('offline', () => {
    showToast(
        t('toast_offline_title'),
        t('toast_offline_message'),
        'warning'
    );
});
