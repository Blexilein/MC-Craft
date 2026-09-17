// ===== CAPES.JS =====

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

// ===== KONFIGURATION =====

// Übersetzungen
const I18N = {
    de: {
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
        capes_filter_dungeons: "Dungeons II",
        capes_no_texture: "Dieses Cape gibt es nur in Minecraft Dungeons II – dafür existiert keine Minecraft-Textur für die 3D-Ansicht.",
        toast_no_texture: "Für dieses Cape gibt es keine Minecraft-Textur zum Herunterladen.",
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
        toast_error_file_type: "Nur PNG Dateien erlaubt",
        capes_viewer_load_error: "3D Viewer konnte nicht geladen werden"
    },
    en: {
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
        capes_filter_dungeons: "Dungeons II",
        capes_no_texture: "This cape only exists in Minecraft Dungeons II – there is no Minecraft texture for the 3D view.",
        toast_no_texture: "There is no Minecraft texture to download for this cape.",
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
        toast_error_file_type: "Only PNG files allowed",
        capes_viewer_load_error: "3D viewer could not be loaded"
    }
};

// DOM Elements

const capesGrid = document.getElementById('capesGrid');
const capeSearch = document.getElementById('capeSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeOptions = document.querySelectorAll('.theme-option, .theme-option-btn');

// Sound-Elemente

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

// ===== HILFSFUNKTIONEN FÜR CAPE-DATEN (sprachabhängig) =====
function getCapeName(cape) {
    return cape['name_' + lang] || cape.name;
}

function getCapeDescription(cape) {
    return cape['description_' + lang] || cape.description;
}

function getCapeType(cape) {
    return cape['type_' + lang] || cape.type;
}

function getCapeTags(cape) {
    return cape['tags_' + lang] || cape.tags;
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
    init3DViewer();
    initEventListeners();
    initDynamicUI();

    // Lade alle Cape-Daten aus der zentralen Datei
    loadAllCapesData();
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

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== BACK TO TOP =====

// ===== TOAST =====

// ===== DATEN LADEN =====
async function loadAllCapesData() {
    console.log("📥 Lade Cape-Daten aus zentraler Datei...");
    try {
        const res = await fetch('/assets/JS/capes/capes-data.json?v=20260917c');
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
                <button type="button" class="btn btn-primary" data-reload>
                    <i class="fas fa-redo"></i> ${t('loader_text1_capes')}
                </button>
            </div>
        `;
        const reloadBtn = capesGrid.querySelector('[data-reload]');
        if (reloadBtn) reloadBtn.addEventListener('click', () => location.reload());
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
    if (allCapes.length > 0) selectCape(allCapes[0], { silent: true });
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
                <img src="${cape.thumbnailUrl || '/assets/img/capes/Default_Cape_texture.png'}" alt="${getCapeName(cape)}" loading="lazy">
                ${cape.featured ? '<div class="cape-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                <div class="cape-type-badge ${cape.category}">${getCapeType(cape)}</div>
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
        card.querySelector('.cape-image img').addEventListener('error', (e) => {
            e.target.src = '/assets/img/capes/Default_Cape.png';
        }, { once: true });
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
        showToast(t('toast_error_title'), t('capes_viewer_load_error'), 'error');
    }
}

// Dungeons-only capes have no Minecraft texture: the viewer shows a notice with the render instead.
function updateNoTextureNotice(cape) {
    const host = capeViewerCanvas && capeViewerCanvas.parentElement;
    if (!host) return;
    let notice = document.getElementById('capeNoTexture');
    const show = !!(cape && !cape.capeUrl && !(isElytraMode && customElytraDataUrl));
    if (!show) {
        if (notice) notice.hidden = true;
        return;
    }
    if (!notice) {
        notice = document.createElement('div');
        notice.id = 'capeNoTexture';
        notice.className = 'cape-no-texture';
        notice.innerHTML = '<img alt=""><p></p>';
        host.insertBefore(notice, capeViewerCanvas.nextSibling);
    }
    notice.querySelector('img').src = cape.thumbnailUrl || '';
    notice.querySelector('img').alt = getCapeName(cape);
    notice.querySelector('p').textContent = t('capes_no_texture');
    notice.hidden = false;
}

function selectCape(cape, opts) {
    if (!viewer) return;
    const silent = !!(opts && opts.silent);   // initial auto-pick on page load
    currentCape = cape;
    try {
        applyBackEquipmentMode();
        loadBackTexture();
        updateNoTextureNotice(cape);
        applyMovementPose(animationMode);
        setSecondLayerVisible(secondLayerVisible);
        if (!silent) document.getElementById('viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (isElytraMode && customElytraDataUrl) {
            updateCustomElytraInfo();
        } else {
            updateCapeInfo(cape);
        }
        document.querySelectorAll('.cape-card').forEach(c => c.classList.remove('active'));
        const activeCard = document.querySelector(`.cape-card[data-id="${cape.id}"]`);
        if (activeCard) activeCard.classList.add('active');
        if (!silent) showToast(t('toast_cape_loaded'), getCapeName(cape), 'success');
    } catch (error) {
        console.error('Fehler beim Laden des Capes:', error);
        showToast(t('toast_error_title'), t('toast_download_failed'), 'error');
    }
}

function updateCapeInfo(cape) {
    capeNameEl.textContent = getCapeName(cape);
    capeYearEl.textContent = cape.year;
    capeTypeEl.textContent = getCapeType(cape);
    if (capeAvailabilityEl) {
        capeAvailabilityEl.textContent = cape['availability_' + lang] || cape.availability || t('capes_availability_official');
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

    // Nothing on the back when there is no texture (Dungeons-only capes).
    const hasTexture = !!getActiveBackTexture();
    const targetMode = hasTexture ? (isElytraMode ? 'elytra' : 'cape') : null;
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
        capeObject.visible = hasTexture && !isElytraMode;
        applied = true;
    }

    if (elytraObject && typeof elytraObject.visible === 'boolean') {
        elytraObject.visible = hasTexture && isElytraMode;
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
    if (!textureUrl) {
        if (typeof viewer.loadCape === 'function') viewer.loadCape(null);
        return false;
    }

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
    updateNoTextureNotice(currentCape);
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
        updateNoTextureNotice(currentCape);

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

    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
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
    if (!currentCape.capeUrl) {
        showToast(getCapeName(currentCape), t('toast_no_texture'), 'info');
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

// ===== WINDOW RESIZE & KEYBOARD =====

// ===== KLICK-SOUND =====
// main.js already binds the click sound to the shared chrome. Only .filter-btn is
// specific to this page, so that is all that is bound here - the previous copy
// covered the shared selectors too and played the sound twice.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(el =>
        el.addEventListener('click', () => setTimeout(playClickSound, 50)));
});

// ===== ERROR HANDLING & OFFLINE =====

