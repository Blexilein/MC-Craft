// Skins Gallery JavaScript

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

// ===== KONFIGURATION =====

// Übersetzungen – alle für die Skin-Bibliothek benötigten Schlüssel (UI + Toasts)
const I18N = {
    de: {
        site_title_skins: "MC-Craft | Skin Galerie",
        site_title_short: "MC-Craft",
        nav_home: "Home",
        nav_text_converter: "Text Konverter",
        nav_color_text: "Farbtext",
        nav_items: "Items Datenbank",
        nav_mobs: "Mobs Datenbank",
        nav_server_status: "Server Status",
        nav_skin_lookup: "Skin Lookup",
        nav_skin_editor: "Skin Editor",
        nav_beacon_mixer: "Beacon Farbmischer",
        nav_day_night_cycle: "Tag-Nacht-Zyklus",
        nav_end_poem: "End Poem",
        nav_capes: "Cape-Datenbank",
        nav_skins: "Skin-Bibliothek",
        tools_dropdown: "Werkzeuge",
        discover_dropdown: "Entdecken",
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Theme auswählen:",
        sound_toggle: "Sound",
        language: "Sprache",
        skins_hero_title: "Minecraft <span class=\"highlight\">Skin Galerie</span>",
        hero_badge: "V 1.0.0 ist da",
        skins_hero_desc: "Entdecke einzigartige Minecraft Skins im interaktiven 3D-Viewer. Teste verschiedene Skins live und lade deine Favoriten herunter.",
        skins_btn_gallery: "Skins entdecken",
        skins_btn_viewer: "3D Viewer",
        skins_grid_3d: "Alle Skins in 3D",
        skins_grid_360: "360° Ansicht",
        skins_grid_preview: "Live Vorschau",
        skins_grid_download: "Kostenlos Downloaden",
        skins_viewer_title: "3D Skin Viewer",
        skins_viewer_subtitle: "Betrachte Skins aus allen Perspektiven",
        skins_controls_drag: "Ziehen zum Rotieren",
        skins_controls_scroll: "Scrollen zum Zoomen",
        skins_info_title: "Skin Informationen",
        skins_info_current: "Aktueller Skin",
        skins_info_type: "Typ",
        skins_info_resolution: "Auflösung",
        skins_info_model: "Modell",
        skins_btn_pause: "Animation pausieren",
        skins_btn_play: "Animation abspielen",
        skins_anim_mode_label: "Bewegung",
        skins_anim_walk: "Laufen",
        skins_anim_run: "Rennen",
        skins_anim_fly: "Fliegen",
        skins_anim_swim: "Schwimmen",
        skins_anim_sneak: "Schleichen",
        skins_btn_rotate: "Drehung:",
        skins_rotate_on: "An",
        skins_rotate_off: "Aus",
        skins_btn_download: "Skin downloaden",
        skins_btn_layer: "2. Layer an/aus",
        skins_gallery_title: "Alle Skins",
        skins_gallery_subtitle: "Klicke auf einen Skin für die 3D-Vorschau",
        skins_filter_all: "Alle",
        skins_filter_character: "Charaktere",
        skins_filter_fantasy: "Fantasy",
        skins_filter_steampunk: "Steampunk",
        skins_filter_anime: "Anime",
        skins_filter_profession: "Berufe",
        skins_filter_medieval: "Mittelalter",
        skins_search_placeholder: "Skins suchen...",
        skins_upload_title: "Eigenen Skin anzeigen",
        skins_upload_subtitle: "Lade deinen eigenen Minecraft Skin hoch",
        skins_upload_drop: "Skin Datei hier ablegen",
        skins_upload_click: "oder klicken um eine Datei auszuwählen",
        skins_btn_select: "Skin auswählen",
        skins_upload_note: "Unterstützt nur .png Dateien (64×64 oder 64×32)",
        skins_requirements_title: "Voraussetzungen",
        skins_requirements_line1: "• PNG Format (transparente Bereiche möglich)",
        skins_requirements_line2: "• 64×64 oder 64×32 Pixel (Slim/Steve)",
        skins_requirements_line3: "• Maximal 50KB Dateigröße",
        skins_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
        skins_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
        skins_cta_btn_lookup: "Skin Lookup",
        skins_cta_btn_editor: "Skin Editor",
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
        loader_text1_skins: "MC-Craft Skin Galerie wird geladen...",
        loader_text2: "3D Viewer wird initialisiert...",
        loader_text3: "Skin-Datenbank wird vorbereitet...",
        loader_text4: "Fast fertig...",
        loader_text5: "Fast fertig...",
        toast_welcome_title: "Skin Galerie geladen!",
        toast_welcome_message: "Entdecke jetzt die Skins!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound an",
        toast_sound_off: "Sound aus",
        toast_language_title: "Sprache",
        toast_language_de: "Deutsch",
        toast_language_en: "Englisch",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme geändert",
        toast_theme_to: "Zu {theme} gewechselt",
        toast_animation_toggle: "Animation",
        toast_animation_started: "gestartet",
        toast_animation_paused: "pausiert",
        toast_animation_mode: "Bewegung: {mode}",
        toast_animation_mode_fallback: "{mode} nicht nativ verfugbar, {fallback} wird verwendet",
        toast_animation_mode_simulated: "Schwimmen wird simuliert",
        toast_rotation_toggle: "Auto-Rotation",
        toast_rotation_on: "aktiviert",
        toast_rotation_off: "deaktiviert",
        toast_layer_toggle: "Zweite Lage",
        toast_layer_on: "aktiviert",
        toast_layer_off: "deaktiviert",
        toast_download_started: "Download gestartet",
        toast_download_failed: "Download fehlgeschlagen",
        toast_upload_success: "Skin geladen",
        toast_upload_error: "Fehler beim Laden des Skins",
        toast_error_general: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
        toast_online_title: "Verbindung wiederhergestellt",
        toast_online_message: "Du bist wieder online!",
        toast_offline_title: "Offline Modus",
        toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
        toast_error_title: "Fehler",
        toast_error_no_skin: "Kein Skin ausgewählt",
        toast_error_file_too_large: "Datei zu groß (max. 50KB)",
        toast_error_file_type: "Nur PNG Dateien erlaubt",
        toast_skin_loaded: "Skin geladen",
        skins_no_results_title: "Keine Skins gefunden",
        skins_no_results_desc: "Versuche es mit einem anderen Suchbegriff oder Filter.",
        skins_viewer_load_error: "3D Viewer konnte nicht geladen werden"
    },
    en: {
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
        toast_skin_loaded: "Skin loaded",
        skins_no_results_title: "No skins found",
        skins_no_results_desc: "Try a different search term or filter.",
        skins_viewer_load_error: "3D viewer could not be loaded"
    }
};

// DOM Elements

// Sound-Elemente

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

function getSkinName(skin) {
    return skin['name_' + lang] || skin.name;
}

function getSkinDescription(skin) {
    return skin['description_' + lang] || skin.description;
}

function getSkinTags(skin) {
    return skin['tags_' + lang] || skin.tags;
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
    init3DViewer();
    initEventListeners();
    initDynamicUI();
    loadSkins(); // Skins werden aus allSkins geladen
});

// ===== AUDIO =====

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

// ===== SOUND TOGGLE =====

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

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

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

        console.log('3D Skin Viewer initialized');
    } catch (error) {
        console.error('Error initializing the 3D viewer:', error);
        showToast(
            t('toast_error_title'),
            t('skins_viewer_load_error'),
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
        console.error('Error loading skin data:', err);
        allSkins = [];
    }
    renderSkins(allSkins);
    if (allSkins.length > 0) {
        selectSkin(allSkins[0], { silent: true });
    }
}

function renderSkins(skins) {
    const skinsGrid = document.getElementById('skinsGrid');
    skinsGrid.innerHTML = '';

    if (skins.length === 0) {
        skinsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${t('skins_no_results_title')}</h3>
                <p>${t('skins_no_results_desc')}</p>
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

function selectSkin(skin, opts) {
    const silent = !!(opts && opts.silent);   // initial auto-pick on page load
    currentSkin = skin;
    viewer.loadSkin(skin.skinUrl);
    applyMovementPose(animationMode);
    setSecondLayerVisible(secondLayerVisible);
    document.getElementById('skinName').textContent = getSkinName(skin);
    document.getElementById('skinType').textContent = getSkinType(skin);
    document.getElementById('skinModel').textContent = skin.model;
    document.getElementById('skinResolution').textContent = '64×64';
    if (!silent) {
        showToast(
            t('toast_skin_loaded'),
            getSkinName(skin),
            'success'
        );
    }
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

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

