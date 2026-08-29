// ---------- GLOBALE VARIABLEN ----------

// UI & Homepage
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Editor (Three.js)
let scene, camera, renderer;
let skinModel, gridOverlay;
let currentTool = 'rotate';
let currentEditingLayer = 'body';
let currentColor = '#8B4513';
let showPixelGrid = true;
let isEditMode = false;
let layerVisibility = { body: true, outer: false };
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let hoveredFace = null;
let isDragging = false;
let isRotating = false;
let dragStart = new THREE.Vector2();
let lastPaintedVoxel = null;
let skinData = { body: new Uint8ClampedArray(64*64*4), outer: new Uint8ClampedArray(64*64*4) };
let undoStack = [], redoStack = [];
const MAX_UNDO_STEPS = 50;
let bodyPartsVisible = { head:true, body:true, leftarm:true, rightarm:true, leftleg:true, rightleg:true };
const SKIN_SIZE = 64;
let currentModelType = 'classic';
let isUvDrawing = false;
let lastUvPainted = null;
let mirrorPainting = false;
let overlayPreviewOpacity = 0.92;
const MODEL_CENTER_Y = 5.25;
let animationMode = 'walk';
let animationPlaying = true;
let loadedPlayerName = '';
let lastPlayerRequestTime = 0;
const PLAYER_REQUEST_DELAY = 5000;
const commonColors = [
    '#8B4513','#F4A460','#DEB887','#D2691E','#654321','#A0522D',
    '#FF0000','#FF4500','#FF6347','#DC143C','#8B0000','#B22222',
    '#0000FF','#4169E1','#1E90FF','#87CEEB','#000080','#191970',
    '#228B22','#32CD32','#00FF00','#ADFF2F','#006400','#9ACD32',
    '#800080','#9932CC','#DA70D6','#FF69B4','#4B0082','#8A2BE2',
    '#FFFF00','#FFD700','#FFA500','#FF8C00','#DAA520','#B8860B',
    '#000000','#2F2F2F','#696969','#808080','#C0C0C0','#FFFFFF'
];

// ---------- ÜBERSETZUNGEN ----------
const T = {
    site_title_short: "MC-Craft",
    loader_text1: "MC-Craft is loading...",
    tools_dropdown: "Tools",
    discover_dropdown: "Explore",
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
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    editor_hero_badge: "ALPHA V 0.8.0",
    editor_hero_title: "MINECRAFT <span class=\"highlight\">3D SKIN</span> EDITOR",
    editor_hero_description: "CREATE AND EDIT YOUR SKINS DIRECTLY IN THE BROWSER –<br>WITH LAYERS, 3D PREVIEW AND IMPORT/EXPORT.",
    editor_start_btn: "Start Editor",
    editor_features_btn: "Features",
    editor_grid_layers: "LAYERS",
    editor_grid_colors: "COLORS",
    editor_grid_3d: "3D PREVIEW",
    editor_grid_export: "EXPORT",
    editor_title: "3D Skin Editor",
    editor_features_title: "Skin Editor <span class=\"highlight\">Features</span>",
    editor_features_subtitle: "Everything you need to create unique skins",
    editor_feature1_title: "3D Editing",
    editor_feature1_desc: "Paint directly on the 3D model – each face is selectable.",
    editor_feature2_title: "Layer System",
    editor_feature2_desc: "Switch between body and outer layer for jackets, hats & more.",
    editor_feature3_title: "Import & Export",
    editor_feature3_desc: "Upload existing skins and export your creation as PNG.",
    editor_feature4_title: "Undo/Redo",
    editor_feature4_desc: "Full history – no accidental overwrites.",
    editor_player_load_label: "Load player skin",
    editor_player_placeholder: "Player name or UUID",
    editor_player_load: "Load player",
    editor_player_loading: "Loading skin...",
    editor_player_status_empty: "No player loaded yet",
    editor_animation_title: "Animations",
    editor_animation_reset: "Original Pose",
    editor_animation_label: "Choose movement",
    editor_anim_idle: "Idle",
    editor_anim_walk: "Walk",
    editor_anim_run: "Run",
    editor_anim_fly: "Fly",
    editor_anim_swim: "Swim",
    editor_anim_sneak: "Sneak",
    editor_anim_idle_desc: "Calm breathing movement",
    editor_anim_walk_desc: "Normal walking movement",
    editor_anim_run_desc: "Fast run with a bounce",
    editor_anim_fly_desc: "Elytra gliding pose",
    editor_anim_swim_desc: "Minecraft swimming movement",
    editor_anim_sneak_desc: "Crouched and careful",
    editor_animation_pause: "Pause animation",
    editor_animation_play: "Resume animation",
    editor_model_classic: "Classic (4px arms)",
    editor_model_slim: "Slim (3px arms)",
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
    footer_version: "Version ALPHA V 0.8.0",
    footer_changelog: "Changelog",
    toast_welcome_title: "MC-Craft loaded!",
    toast_welcome_message: "Enjoy the Skin Editor!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_import_done: "Skin imported: {name}",
    toast_export_done: "Skin exported as PNG",
    toast_clear_done: "Skin cleared",
    toast_new_steve: "New Steve skin loaded",
    toast_color_picked: "Color picked: {color}",
    toast_layer_changed: "Now editing: {layer} layer",
    toast_grid_toggled: "Pixel grid {state}",
    toast_part_toggled: "{part} {state}",
    toast_undo: "Undo",
    toast_redo: "Redo",
    toast_nothing_to_undo: "Nothing to undo",
    toast_nothing_to_redo: "Nothing to redo",
    toast_invalid_color: "Invalid color code!",
    toast_enter_player: "Please enter a player name or UUID.",
    toast_player_loaded_editor: "Player skin loaded: {name}",
    toast_player_not_found_editor: "Player not found. Please check the name or UUID.",
    toast_player_rate_limit: "Please wait {seconds} seconds before searching again.",
    toast_skin_load_failed: "The skin could not be loaded into the editor.",
    toast_model_detected: "Model detected automatically: {model}",
    toast_animation_changed: "Animation: {mode}"
};

// ---------- HILFSFUNKTIONEN ----------
function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [p, v] of Object.entries(placeholders)) text = text.replace(`{${p}}`, v);
    return text;
}
function getThemeName(theme) {
    return theme === 'overworld' ? t('theme_overworld') : theme === 'nether' ? t('theme_nether') : t('theme_end');
}
function showToast(title, message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    toast.innerHTML = `<div class="toast-icon"><i class="fas ${type==='error'?'fa-exclamation-triangle':'fa-check'}"></i></div>
                       <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;

    try {
        levelUpSound.currentTime = 0;
        levelUpSound.volume = 0.3;
        levelUpSound.play().catch(() => {});
    } catch (error) {
        console.log('Sound-Fehler:', error);
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('mc-craft-sound', soundEnabled);
    updateSoundIcon();
    playClickSound();
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
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
function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (!translation) return;

        // Wenn das Element nur Text enthält oder die Übersetzung HTML-Tags hat
        if (el.children.length === 0 || translation.includes('<')) {
            el.innerHTML = translation;
        } else {
            // Nur den letzten Textknoten aktualisieren (nach dem <span>)
            const textNode = el.childNodes[el.childNodes.length - 1];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = ' ' + translation; // Leerzeichen ggf. anpassen
            }
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const translation = t(el.getAttribute('data-i18n-placeholder'));
        if (translation) el.placeholder = translation;
    });

    updatePlayerModelStatus();
    updateAnimationControls();
}
function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (document.getElementById('soundIcon')) document.getElementById('soundIcon').src = src;
    if (document.getElementById('mobileSoundIcon')) document.getElementById('mobileSoundIcon').src = src;
}
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    currentTheme = theme;
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === theme);
    });
    if (scene) {
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--editor-bg').trim() || '#1E293B';
        scene.background = new THREE.Color(bgColor);
    }
}

function getModelConfig() {
    if (currentModelType === 'slim') {
        return {
            armWidth: 3,
            parts: [
                ['head', -4,4,50,58,-4,4],
                ['body', -4,4,38,50,-2,2],
                ['rightarm', -7,-4,38,50,-2,2],
                ['leftarm', 4,7,38,50,-2,2],
                ['rightleg', -4,0,26,38,-2,2],
                ['leftleg', 0,4,26,38,-2,2]
            ]
        };
    }

    return {
        armWidth: 4,
        parts: [
            ['head', -4,4,50,58,-4,4],
            ['body', -4,4,38,50,-2,2],
            ['rightarm', -8,-4,38,50,-2,2],
            ['leftarm', 4,8,38,50,-2,2],
            ['rightleg', -4,0,26,38,-2,2],
            ['leftleg', 0,4,26,38,-2,2]
        ]
    };
}

// ---------- EDITOR UI AUFBAU ----------
    function buildUI() {
        const root = document.getElementById('skin-editor-content');
        root.innerHTML = `
            <div class="app-container">
                    <div class="toolbar">
                            <div class="toolbar-row toolbar-shell">
                                <div class="tool-group tool-group-files"><span class="tool-group-label">📂 File</span>
                                    <input type="file" id="import-skin" accept=".png" class="hidden-file-input">
                                    <button id="importBtn" class="tool-btn import"><img src="/assets/img/editor/misc/add.svg" alt="" class="btn-icon">Import</button>
                                    <button id="exportBtn" class="tool-btn export"><img src="/assets/img/editor/download.svg" alt="" class="btn-icon">Export</button>
                                    <button id="newSteveBtn" class="tool-btn"><img src="/assets/img/editor/toggles/base.svg" alt="" class="btn-icon">Steve</button>
                                    <button id="clearBtn" class="tool-btn clear"><img src="/assets/img/editor/misc/remove.svg" alt="" class="btn-icon">Clear</button>
                                </div>
                                <div class="tool-group player-load-group">
                                    <label class="tool-group-label" for="playerSkinName" data-i18n="editor_player_load_label">Spieler-Skin laden</label>
                                    <div class="player-load-row">
                                        <input id="playerSkinName" class="player-skin-input" type="text" maxlength="36" autocomplete="off" spellcheck="false" data-i18n-placeholder="editor_player_placeholder" placeholder="Spielername oder UUID">
                                        <button id="loadPlayerSkinBtn" class="tool-btn player-load-btn" type="button">
                                            <i class="fas fa-user-download" aria-hidden="true"></i>
                                            <span data-i18n="editor_player_load">Spieler laden</span>
                                        </button>
                                    </div>
                                    <div id="playerModelStatus" class="player-model-status" role="status" aria-live="polite"></div>
                                </div>
                        </div>
                    </div>
                <div class="main-content">
                    <div class="left-panel">
                                <div class="layer-controls"><div class="panel-title">🧍 Model Type</div>
                            <div class="layer-row">
                                <button id="model-classic" class="layer-toggle-btn visible">Classic 4px</button>
                                <button id="model-slim" class="layer-toggle-btn">Slim 3px</button>
                            </div>
                        </div>
                        <div class="layer-controls animation-controls"><div class="panel-title">🎬 <span data-i18n="editor_animation_title">Animationen</span></div>
                            <div class="animation-label" id="animationModeLabel" data-i18n="editor_animation_label">Bewegung auswählen</div>
                            <div class="animation-option-list" role="group" aria-labelledby="animationModeLabel">
                                <button class="animation-option-btn" type="button" data-animation-mode="idle" style="--animation-accent: #38bdf8" aria-pressed="false">
                                    <span class="animation-option-icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_idle">Stillstehen</strong><small data-i18n="editor_anim_idle_desc">Ruhige Atembewegung</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                                <button class="animation-option-btn" type="button" data-animation-mode="walk" style="--animation-accent: #22c55e" aria-pressed="true">
                                    <span class="animation-option-icon"><i class="fas fa-person-walking" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_walk">Laufen</strong><small data-i18n="editor_anim_walk_desc">Normale Gehbewegung</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                                <button class="animation-option-btn" type="button" data-animation-mode="run" style="--animation-accent: #f59e0b" aria-pressed="false">
                                    <span class="animation-option-icon"><i class="fas fa-person-running" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_run">Rennen</strong><small data-i18n="editor_anim_run_desc">Schneller Lauf mit Sprung</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                                <button class="animation-option-btn" type="button" data-animation-mode="fly" style="--animation-accent: #a78bfa" aria-pressed="false">
                                    <span class="animation-option-icon"><i class="fas fa-feather" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_fly">Fliegen</strong><small data-i18n="editor_anim_fly_desc">Elytra-Gleitflug</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                                <button class="animation-option-btn" type="button" data-animation-mode="swim" style="--animation-accent: #06b6d4" aria-pressed="false">
                                    <span class="animation-option-icon"><i class="fas fa-person-swimming" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_swim">Schwimmen</strong><small data-i18n="editor_anim_swim_desc">Minecraft-Schwimmbewegung</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                                <button class="animation-option-btn" type="button" data-animation-mode="sneak" style="--animation-accent: #f472b6" aria-pressed="false">
                                    <span class="animation-option-icon"><i class="fas fa-user-ninja" aria-hidden="true"></i></span>
                                    <span class="animation-option-copy"><strong data-i18n="editor_anim_sneak">Schleichen</strong><small data-i18n="editor_anim_sneak_desc">Gebückt und vorsichtig</small></span>
                                    <i class="fas fa-check animation-option-check" aria-hidden="true"></i>
                                </button>
                            </div>
                            <button id="toggleAnimationBtn" class="animation-toggle-btn" type="button" aria-pressed="true"></button>
                            <button id="resetAnimationPoseBtn" class="animation-toggle-btn animation-reset-btn" type="button">
                                <i class="fas fa-rotate-left"></i>
                                <span data-i18n="editor_animation_reset">Ursprüngliche Pose</span>
                            </button>                        
                        </div>
                        <div class="layer-controls"><div class="panel-title">📋 Display Options</div>
                            <div class="layer-row">
                                    <button id="layer-body" class="layer-toggle-btn visible"><img src="/assets/img/editor/box-inner-checked.svg" alt="" class="mini-icon">Body</button>
                                    <button id="layer-outer" class="layer-toggle-btn"><img src="/assets/img/editor/box-outer-checked.svg" alt="" class="mini-icon">Overlay</button>
                                    <button id="pixel-grid-btn" class="layer-toggle-btn visible"><img src="/assets/img/editor/toggles/base-grid.svg" alt="" class="mini-icon">Grid</button>
                            </div>
                                <label class="range-block" for="overlayOpacityRange">
                                    <span>Overlay Mix</span>
                                    <input id="overlayOpacityRange" type="range" min="0.15" max="1" step="0.05" value="0.92">
                                </label>
                        </div>
                        <div class="layer-controls"><div class="panel-title">👤 Body Parts</div>
                            <div class="body-parts-grid" id="body-parts-container"></div>
                        </div>
                        <div class="layer-controls"><div class="panel-title">🗺️ 2D UV Editor</div>
                            <div class="uv-editor-wrap">
                                <canvas id="uvEditorCanvas" width="256" height="256"></canvas>
                            </div>
                            <div class="uv-hint">Paint directly on the skin map (active layer: Body/Outer)</div>
                        </div>
                    </div>
                    <div class="center-panel">
                        <div class="viewer-container">
                            <div class="edit-mode-indicator" id="edit-mode-indicator">Edit Mode: Body</div>
                            <div class="view-mode-indicator" id="view-mode-indicator">View Mode: Body</div>
                                <div class="skin-preview">
                                    <div class="viewer-hud">
                                        <div class="hud-chip">3D Preview</div>
                                        <div class="hud-chip" id="mirrorStateChip">Mirror Off</div>
                                    </div>
                                    <canvas id="skinViewer"></canvas>
                                </div>
                            <div class="controls">
                                    <button id="resetView" class="control-btn"><img src="/assets/img/editor/facing-indicator.svg" alt="" class="mini-icon">Reset</button>
                                    <button id="toggleMode" class="control-btn"><img src="/assets/img/editor/toggles/blow-up-model.svg" alt="" class="mini-icon">Edit</button>
                                    <button id="zoomIn" class="control-btn"><i class="fas fa-search-plus"></i></button>
                                    <button id="zoomOut" class="control-btn"><i class="fas fa-search-minus"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="right-panel">
                        <div class="layer-controls"><div class="panel-title">🎯 Colors</div>
                            <div id="color-palette"></div>
                            <div class="color-picker-container">
                                <span>Current Color:</span>
                                <input type="color" id="color-picker" class="color-picker" value="#8B4513">
                            </div>
                            <div class="color-input-group">
                                <input type="text" id="color-code-input" class="color-code-input" value="#8B4513">
                                <button id="applyColorBtn" class="color-apply-btn">Apply</button>
                            </div>
                        </div>
                        <div class="layer-controls"><div class="panel-title">🎨 Tools</div>
                            <div class="tools-grid">
                                <button id="tool-pen" class="grid-tool-btn"><img src="/assets/img/editor/tools/brush.svg" alt="" class="mini-icon">Paint</button>
                                <button id="tool-brush" class="grid-tool-btn"><img src="/assets/img/editor/modifiers/shade-once.svg" alt="" class="mini-icon">Noise</button>
                                <button id="tool-eraser" class="grid-tool-btn"><img src="/assets/img/editor/tools/eraser.svg" alt="" class="mini-icon">Erase</button>
                                <button id="tool-eyedropper" class="grid-tool-btn"><img src="/assets/img/editor/tools/eyedropper.svg" alt="" class="mini-icon">Pick</button>
                                <button id="tool-rotate" class="grid-tool-btn active"><img src="/assets/img/editor/toggles/backface-culling.svg" alt="" class="mini-icon">Orbit</button>
                            </div>
                        </div>
                        <div class="layer-controls"><div class="panel-title">✨ MC-Craft Extras</div>
                            <div class="tools-grid compact-tools">
                                <button id="mirrorToggleBtn" class="grid-tool-btn"><img src="/assets/img/editor/modifiers/mirror.svg" alt="" class="mini-icon">Mirror</button>
                                <button id="focusOverlayBtn" class="grid-tool-btn"><img src="/assets/img/editor/toggles/overlay.svg" alt="" class="mini-icon">Overlay Focus</button>
                            </div>
                            <div class="uv-hint">Aether Mirror mirrors your brush strokes horizontally on the same layer. Overlay Focus hides the body in edit mode.</div>
                        </div>
                       <div class="layer-controls"><div class="panel-title">🔧 Actions</div>
                            <div class="action-row">
                                <button id="undoBtn" class="action-btn"><img src="/assets/img/editor/misc/undo.svg" alt="" class="mini-icon">Undo</button>
                                <button id="redoBtn" class="action-btn"><img src="/assets/img/editor/misc/redo.svg" alt="" class="mini-icon">Redo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="status-bar">
                    <span id="status-text">👁️ View Mode</span>
                    <span id="pixel-info">Body | Rotate</span>
                    <span id="camera-info">Zoom: 100%</span>
                </div>
            </div>
        `;
    // Body-Parts Buttons
    const parts = ['head','body','leftarm','rightarm','leftleg','rightleg'];
    const grid = document.getElementById('body-parts-container');
    parts.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'body-part-btn';
        btn.id = `part-${p}`;
        btn.textContent = p.charAt(0).toUpperCase()+p.slice(1);
        btn.onclick = () => toggleBodyPart(p);
        grid.appendChild(btn);
    });
    generateColorPalette();
    bindEditorEvents();
    updateModeIndicators();
    updateLanguage();
}

function bindEditorEvents() {
    document.getElementById('import-skin').addEventListener('change', importSkin);
    document.getElementById('importBtn').addEventListener('click', () => document.getElementById('import-skin').click());
    document.getElementById('exportBtn').addEventListener('click', exportSkin);
    document.getElementById('newSteveBtn').addEventListener('click', newSkin);
    document.getElementById('clearBtn').addEventListener('click', clearSkin);
    document.getElementById('loadPlayerSkinBtn').addEventListener('click', loadPlayerSkin);
    document.getElementById('playerSkinName').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') loadPlayerSkin();
    });
    document.getElementById('model-classic').addEventListener('click', () => setModelType('classic'));
    document.getElementById('model-slim').addEventListener('click', () => setModelType('slim'));
    document.querySelectorAll('.animation-option-btn').forEach(button => {
        button.addEventListener('click', () => setAnimationMode(button.dataset.animationMode));
    });
    document.getElementById('toggleAnimationBtn').addEventListener('click', toggleAnimationPlayback);
    document.getElementById('resetAnimationPoseBtn').addEventListener('click', resetAnimationPose);
    document.getElementById('layer-body').addEventListener('click', () => toggleLayerVisibility('body'));
    document.getElementById('layer-outer').addEventListener('click', () => toggleLayerVisibility('outer'));
    document.getElementById('pixel-grid-btn').addEventListener('click', togglePixelGrid);
    document.getElementById('overlayOpacityRange').addEventListener('input', setOverlayPreviewOpacity);
    document.getElementById('undoBtn').addEventListener('click', undoAction);
    document.getElementById('redoBtn').addEventListener('click', redoAction);
    document.getElementById('resetView').addEventListener('click', resetView);
    document.getElementById('toggleMode').addEventListener('click', toggleMode);
    document.getElementById('zoomIn').addEventListener('click', () => zoomCamera(0.9));
    document.getElementById('zoomOut').addEventListener('click', () => zoomCamera(1.1));
    document.getElementById('mirrorToggleBtn').addEventListener('click', toggleMirrorPainting);
    document.getElementById('focusOverlayBtn').addEventListener('click', toggleOverlayFocus);
    document.getElementById('color-picker').addEventListener('change', (e) => {
        currentColor = e.target.value;
        document.getElementById('color-code-input').value = currentColor;
    });
    document.getElementById('applyColorBtn').addEventListener('click', applyColorCode);
    document.getElementById('tool-pen').addEventListener('click', () => setTool('pen'));
    document.getElementById('tool-brush').addEventListener('click', () => setTool('brush'));
    document.getElementById('tool-eraser').addEventListener('click', () => setTool('eraser'));
    document.getElementById('tool-eyedropper').addEventListener('click', () => setTool('eyedropper'));
    document.getElementById('tool-rotate').addEventListener('click', () => setTool('rotate'));

    bindUvEditorEvents();
}

function bindUvEditorEvents() {
    const canvas = document.getElementById('uvEditorCanvas');
    if (!canvas) return;

    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('mousedown', (e) => {
        if (!isEditMode || e.button !== 0) return;
        const tex = getUvTextureCoordsFromMouse(e, canvas);
        if (!tex) return;

        isUvDrawing = true;
        lastUvPainted = null;
        if (currentTool === 'eyedropper') {
            pickColorAtTexture(tex.x, tex.y);
            isUvDrawing = false;
            return;
        }
        if (currentTool === 'rotate') {
            isUvDrawing = false;
            return;
        }
        saveUndoState();
        paintAtTexture(tex.x, tex.y);
    });

    canvas.addEventListener('mousemove', (e) => {
        const tex = getUvTextureCoordsFromMouse(e, canvas);
        if (!tex) return;

        document.getElementById('camera-info').textContent = `UV: ${tex.x},${tex.y}`;

        if (!isUvDrawing || !isEditMode) return;
        if (currentTool === 'rotate' || currentTool === 'eyedropper') return;
        paintAtTexture(tex.x, tex.y);
    });

    canvas.addEventListener('mouseleave', () => updateCameraInfo());

    window.addEventListener('mouseup', () => {
        isUvDrawing = false;
        lastUvPainted = null;
    });
}

function getUvTextureCoordsFromMouse(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * SKIN_SIZE);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * SKIN_SIZE);
    if (x < 0 || x >= SKIN_SIZE || y < 0 || y >= SKIN_SIZE) return null;
    return { x, y };
}

function paintAtTexture(x, y) {
    const uvId = `${x},${y},${currentEditingLayer}`;
    if (lastUvPainted === uvId) return;
    lastUvPainted = uvId;

    applyCurrentTool(x, y);

    if (mirrorPainting) {
        const mirrorX = SKIN_SIZE - 1 - x;
        if (mirrorX !== x) applyCurrentTool(mirrorX, y);
    }

    updateSkinTextures();
}

function applyCurrentTool(x, y) {
    if (currentTool === 'pen') paintPixelPen(x, y);
    else if (currentTool === 'brush') paintPixelBrush(x, y);
    else if (currentTool === 'eraser') erasePixel(x, y);
}

function pickColorAtTexture(x, y) {
    const color = getPixelColor(x, y, currentEditingLayer);
    currentColor = color;
    document.getElementById('color-picker').value = color;
    document.getElementById('color-code-input').value = color;
    showToast('Color', t('toast_color_picked', {color}));
}

function generateColorPalette() {
    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';
    commonColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.title = color;
        swatch.addEventListener('click', () => {
            currentColor = color;
            document.getElementById('color-picker').value = color;
            document.getElementById('color-code-input').value = color;
            showToast('Color', t('toast_color_picked', {color}));
        });
        palette.appendChild(swatch);
    });
}

// ---------- THREE.JS INITIALISIERUNG ----------
function initScene() {
    const container = document.querySelector('.skin-preview');
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--editor-bg').trim() || '#1E293B';
    scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    camera = new THREE.PerspectiveCamera(75, container.clientWidth/container.clientHeight, 0.1, 1000);
    camera.position.set(5,6,5);
    camera.lookAt(0,6,0);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('skinViewer'), antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5,10,5);
    scene.add(dir);
    setupCameraControls();
    animate();
    window.addEventListener('resize', onWindowResize);
}
function animate(time = 0) {
    requestAnimationFrame(animate);
    updateModelAnimation(time / 1000);
    renderer.render(scene, camera);
}

function getAnimationModeLabel(mode) {
    const key = {
        idle: 'editor_anim_idle',
        walk: 'editor_anim_walk',
        run: 'editor_anim_run',
        fly: 'editor_anim_fly',
        swim: 'editor_anim_swim',
        sneak: 'editor_anim_sneak'
    }[mode] || 'editor_anim_walk';
    return t(key);
}

function updateAnimationControls() {
    const button = document.getElementById('toggleAnimationBtn');
    document.querySelectorAll('.animation-option-btn').forEach(option => {
        const isActive = option.dataset.animationMode === animationMode;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-pressed', String(isActive));
    });
    if (button) {
        button.innerHTML = animationPlaying
            ? `<i class="fas fa-pause" aria-hidden="true"></i><span>${t('editor_animation_pause')}</span>`
            : `<i class="fas fa-play" aria-hidden="true"></i><span>${t('editor_animation_play')}</span>`;
        button.setAttribute('aria-pressed', String(animationPlaying));
    }
}

function setAnimationMode(mode) {
    if (!['idle', 'walk', 'run', 'fly', 'swim', 'sneak'].includes(mode)) return;
    animationMode = mode;
    animationPlaying = true;
    resetModelPose();
    updateAnimationControls();
    showToast('Animation', t('toast_animation_changed', { mode: getAnimationModeLabel(mode) }));
}

function toggleAnimationPlayback() {
    animationPlaying = !animationPlaying;
    updateAnimationControls();
}

function resetAnimationPose() {
    animationMode = 'idle';
    animationPlaying = false;

    resetModelPose();
    updateAnimationControls();
}

function getAnimatedPartGroups(partName) {
    const groups = [];
    if (skinModel) {
        skinModel.children.forEach(layerGroup => {
            const part = layerGroup.getObjectByName(`${partName}_${layerGroup.name.replace('_layer', '')}`);
            if (part) groups.push(part);
        });
    }
    if (gridOverlay) {
        ['body', 'outer'].forEach(layer => {
            const part = gridOverlay.getObjectByName(`grid_${partName}_${layer}`);
            if (part) groups.push(part);
        });
    }
    return groups;
}

function setAnimatedPartRotation(partName, x = 0, y = 0, z = 0) {
    getAnimatedPartGroups(partName).forEach(group => group.rotation.set(x, y, z));
}

function setAnimatedPartQuaternion(partName, quaternion) {
    getAnimatedPartGroups(partName).forEach(group => group.quaternion.copy(quaternion));
}

function setAnimatedPartPositionOffset(partName, x = 0, y = 0, z = 0) {
    getAnimatedPartGroups(partName).forEach(group => {
        const base = group.userData.animationBasePosition;
        if (!base) return;
        group.position.set(base.x + x, base.y + y, base.z + z);
    });
}

function setAnimationRootPose(rotationX = 0, yOffset = 0, rotationZ = 0, xOffset = 0, zOffset = 0) {
    [skinModel, gridOverlay].forEach(root => {
        if (!root) return;
        root.rotation.set(rotationX, 0, rotationZ);
        root.position.set(xOffset, MODEL_CENTER_Y + yOffset, zOffset);
    });
}

function resetModelPose() {
    setAnimationRootPose();
    ['head', 'body', 'leftarm', 'rightarm', 'leftleg', 'rightleg'].forEach(part => {
        setAnimatedPartRotation(part, 0, 0, 0);
        setAnimatedPartPositionOffset(part);
    });
}

function createSwimQuaternion(zDegrees, yDegrees, xDegrees) {
    const toRad = Math.PI / 180;
    const z = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), zDegrees * toRad);
    const y = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yDegrees * toRad);
    const x = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), xDegrees * toRad);
    return x.multiply(y).multiply(z);
}

function getSwimArmQuaternion(side, time) {
    const period = 1.3;
    const phase = ((time % period) + period) % period / period;
    const times = [0, 0.7 / period, 1.1 / period, 1];
    const keyframes = side === 'left'
        ? [[180, 180, 0], [287.2, 180, 0], [180, 180, 90], [180, 180, 0]]
        : [[-180, 180, 0], [-287.2, 180, 0], [-180, 180, 90], [-180, 180, 0]];
    let segment = times.length - 2;
    for (let index = 0; index < times.length - 1; index += 1) {
        if (phase >= times[index] && phase <= times[index + 1]) {
            segment = index;
            break;
        }
    }
    const segmentProgress = (phase - times[segment]) / (times[segment + 1] - times[segment]);
    const start = createSwimQuaternion(...keyframes[segment]);
    const end = createSwimQuaternion(...keyframes[segment + 1]);
    return start.slerp(end, THREE.MathUtils.clamp(segmentProgress, 0, 1));
}

function updateModelAnimation(time) {
    if (!animationPlaying || !skinModel) return;
    resetModelPose();

    if (animationMode === 'idle') {
        const t = time * 2;
        const armBase = Math.PI * 0.02;
        setAnimationRootPose(0, Math.sin(t) * 0.008);
        setAnimatedPartRotation('leftarm', 0, 0, Math.cos(t) * 0.03 + armBase);
        setAnimatedPartRotation('rightarm', 0, 0, Math.cos(t + Math.PI) * 0.03 - armBase);
        setAnimatedPartRotation('head', Math.sin(t * 0.35) * 0.025, Math.sin(t * 0.25) * 0.07, 0);
        return;
    }

    if (animationMode === 'walk') {
        const t = time * 4;
        const armBase = Math.PI * 0.02;
        setAnimatedPartRotation('leftleg', Math.sin(t) * 0.5);
        setAnimatedPartRotation('rightleg', Math.sin(t + Math.PI) * 0.5);
        setAnimatedPartRotation('leftarm', Math.sin(t + Math.PI) * 0.5, 0, Math.cos(t) * 0.03 + armBase);
        setAnimatedPartRotation('rightarm', Math.sin(t) * 0.5, 0, Math.cos(t + Math.PI) * 0.03 - armBase);
        setAnimatedPartRotation('head', Math.sin(t / 5) * 0.1, Math.sin(t / 4) * 0.2, 0);
        return;
    }

    if (animationMode === 'run') {
        const t = time * 12.75 + Math.PI * 0.5;
        const armBase = Math.PI * 0.1;
        setAnimationRootPose(-0.08, Math.max(0, Math.cos(t * 2)) * 0.11, Math.cos(t + Math.PI) * 0.01, Math.cos(t) * 0.018);
        setAnimatedPartRotation('body', 0.08, 0, 0);
        setAnimatedPartRotation('leftleg', Math.cos(t + Math.PI) * 1.3);
        setAnimatedPartRotation('rightleg', Math.cos(t) * 1.3);
        setAnimatedPartRotation('leftarm', Math.cos(t) * 1.5, 0, Math.cos(t) * 0.1 + armBase);
        setAnimatedPartRotation('rightarm', Math.cos(t + Math.PI) * 1.5, 0, Math.cos(t + Math.PI) * 0.1 - armBase);
        setAnimatedPartRotation('head', -0.04, 0, 0);
        return;
    }

    if (animationMode === 'fly') {
        const glide = Math.sin(time * 1.8);
        const armDrift = Math.sin(time * 1.35) * 0.025;
        setAnimationRootPose(Math.PI / 2, glide * 0.018, glide * 0.012);
        setAnimatedPartRotation('head', -Math.PI / 4 + glide * 0.025, 0, 0);
        setAnimatedPartRotation('leftarm', 0, 0, Math.PI * 0.25 + armDrift);
        setAnimatedPartRotation('rightarm', 0, 0, -Math.PI * 0.25 - armDrift);
        setAnimatedPartRotation('leftleg', glide * 0.02, 0, 0.015);
        setAnimatedPartRotation('rightleg', -glide * 0.02, 0, -0.015);
        return;
    }

    if (animationMode === 'swim') {
        const swimTime = time * 0.75;
        const legFrequency = 390 * Math.PI / 180;
        const legAmplitude = 17.2 * Math.PI / 180;
        setAnimationRootPose(Math.PI / 2, -0.12 + Math.sin(swimTime * 2.2) * 0.018);
        setAnimatedPartRotation('head', -Math.PI / 4, 0, 0);
        setAnimatedPartQuaternion('leftarm', getSwimArmQuaternion('left', swimTime));
        setAnimatedPartQuaternion('rightarm', getSwimArmQuaternion('right', swimTime));
        setAnimatedPartRotation('leftleg', legAmplitude * Math.cos(swimTime * legFrequency + Math.PI), -0.002, -0.002);
        setAnimatedPartRotation('rightleg', legAmplitude * Math.cos(swimTime * legFrequency), 0.002, 0.002);
        return;
    }

    if (animationMode === 'sneak') {
        const phase = Math.sin(time * 3.2);
        setAnimationRootPose(0, Math.abs(phase) * 0.008);
        setAnimatedPartRotation('body', 0.4537860552, phase * 0.015, 0);
        setAnimatedPartPositionOffset('body', 0, -0.263, -0.4);
        setAnimatedPartRotation('head', 0, Math.sin(time * 1.4) * 0.055, 0);
        setAnimatedPartPositionOffset('head', 0, -0.452, 0);
        setAnimatedPartRotation('leftarm', 0.4103677462 - phase * 0.12, 0, 0.1);
        setAnimatedPartRotation('rightarm', 0.4103677462 + phase * 0.12, 0, -0.1);
        setAnimatedPartPositionOffset('leftarm', 0, -0.317, 0.021);
        setAnimatedPartPositionOffset('rightarm', 0, -0.317, 0.021);
        setAnimatedPartRotation('leftleg', phase * 0.22, 0, 0);
        setAnimatedPartRotation('rightleg', -phase * 0.22, 0, 0);
        setAnimatedPartPositionOffset('leftleg', 0, 0, -0.431);
        setAnimatedPartPositionOffset('rightleg', 0, 0, -0.431);
    }
}
function onWindowResize() {
    const container = document.querySelector('.skin-preview');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}
function setupCameraControls() {
    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onMouseWheel, { passive: true });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
}

// ---------- MAUS-EVENTS ----------
function onMouseDown(e) {
    e.preventDefault();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    dragStart.copy(mouse);
    isDragging = true;
    lastPaintedVoxel = null;
    if (e.button === 2) { isRotating = true; return; }
    if (e.button === 0) {
        if ((currentTool === 'pen' || currentTool === 'brush' || currentTool === 'eraser') && isEditMode) paintFace();
        else if (currentTool === 'eyedropper' && isEditMode) pickColor();
        else if (currentTool === 'rotate' || !isEditMode) isRotating = true;
    }
}
function onMouseMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (isEditMode && !isRotating) updateFaceHover();
    if (isDragging) {
        if (isRotating) {
            const deltaX = mouse.x - dragStart.x;
            const deltaY = mouse.y - dragStart.y;
            const target = new THREE.Vector3(0,6,0);
            const offset = camera.position.clone().sub(target);
            const spherical = new THREE.Spherical().setFromVector3(offset);
            spherical.theta -= deltaX * 2;
            spherical.phi += deltaY * 2;
            spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
            camera.position.setFromSpherical(spherical).add(target);
            camera.lookAt(target);
            dragStart.copy(mouse);
        } else if ((currentTool === 'pen' || currentTool === 'brush' || currentTool === 'eraser') && isEditMode) paintFace();
    }
}
function onMouseUp() { isDragging = false; isRotating = false; lastPaintedVoxel = null; }
function onMouseWheel(e) {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const direction = e.deltaY > 0 ? 1 : -1;
    const target = new THREE.Vector3(0,6,0);
    const offset = camera.position.clone().sub(target);
    offset.multiplyScalar(1 + direction * zoomSpeed);
    const dist = offset.length();
    if (dist < 3) offset.setLength(3);
    if (dist > 12) offset.setLength(12);
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
    updateCameraInfo();
}

function updateFaceHover() {
    if (!skinModel) return;
    raycaster.setFromCamera(mouse, camera);
    const meshes = [];
    skinModel.children.forEach(layerGroup => {
        if (layerGroup.name === `${currentEditingLayer}_layer` && layerGroup.visible) {
            layerGroup.children.forEach(part => part.visible && part.children.forEach(mesh => mesh.visible && meshes.push(mesh)));
        }
    });
    const intersects = raycaster.intersectObjects(meshes, false);
    if (hoveredFace) { hoveredFace.material.emissive?.setHex(0x000000); hoveredFace = null; }
    if (intersects.length > 0) {
        const face = intersects[0].object;
        if (face.userData?.layer === currentEditingLayer) {
            hoveredFace = face;
            face.material.emissive?.setHex(0x404040);
        }
    }
}

// ---------- MALEN & FARBAUSWAHL ----------
function paintFace() {
    if (!hoveredFace?.userData) return;
    const { voxelX, voxelY, voxelZ, layer, face: faceName, partName } = hoveredFace.userData;
    if (layer !== currentEditingLayer) return;
    const voxelId = `${voxelX},${voxelY},${voxelZ},${layer},${faceName}`;
    if (lastPaintedVoxel === voxelId) return;
    if (!lastPaintedVoxel) saveUndoState();
    lastPaintedVoxel = voxelId;
    const tex = getVoxelFaceTextureCoords(voxelX, voxelY, voxelZ, faceName, partName, layer);
    if (!tex) return;
    const { x: tx, y: ty } = tex;
    applyCurrentTool(tx, ty);
    if (mirrorPainting) {
        const mirrorX = SKIN_SIZE - 1 - tx;
        if (mirrorX !== tx) applyCurrentTool(mirrorX, ty);
    }
    updateSkinTextures();
}
function pickColor() {
    if (!hoveredFace?.userData) return;
    const { voxelX, voxelY, voxelZ, layer, face: faceName, partName } = hoveredFace.userData;
    if (layer !== currentEditingLayer) return;
    const tex = getVoxelFaceTextureCoords(voxelX, voxelY, voxelZ, faceName, partName, layer);
    if (!tex) return;
    const color = getPixelColor(tex.x, tex.y, layer);
    currentColor = color;
    document.getElementById('color-picker').value = color;
    document.getElementById('color-code-input').value = color;
    showToast('Color', t('toast_color_picked', {color}));
}
function paintPixelPen(x, y) {
    if (x<0||x>=64||y<0||y>=64) return;
    const rgb = hexToRgb(currentColor);
    const data = currentEditingLayer === 'body' ? skinData.body : skinData.outer;
    const idx = (y*64+x)*4;
    data[idx]=rgb.r; data[idx+1]=rgb.g; data[idx+2]=rgb.b; data[idx+3]=255;
}
function paintPixelBrush(x, y) {
    if (x<0||x>=64||y<0||y>=64) return;
    const rgb = hexToRgb(currentColor);
    const shift = (Math.random()-0.5)*60;
    let r = Math.round(rgb.r+shift), g = Math.round(rgb.g+shift), b = Math.round(rgb.b+shift);
    r = Math.max(0,Math.min(255,r)); g = Math.max(0,Math.min(255,g)); b = Math.max(0,Math.min(255,b));
    const data = currentEditingLayer === 'body' ? skinData.body : skinData.outer;
    const idx = (y*64+x)*4;
    data[idx]=r; data[idx+1]=g; data[idx+2]=b; data[idx+3]=255;
}
function erasePixel(x, y) {
    if (x<0||x>=64||y<0||y>=64) return;
    const data = currentEditingLayer === 'body' ? skinData.body : skinData.outer;
    const idx = (y*64+x)*4;
    data[idx]=0; data[idx+1]=0; data[idx+2]=0; data[idx+3]=0;
}
function getPixelColor(x, y, layer) {
    const data = layer==='body'?skinData.body:skinData.outer;
    const idx = (y*64+x)*4;
    if (data[idx+3]===0) return '#000000';
    return rgbToHex(data[idx], data[idx+1], data[idx+2]);
}
function hexToRgb(hex) {
    const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
    return {r,g,b};
}
function rgbToHex(r,g,b) { return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1); }

// ---------- TEXTUR-KOORDINATEN (Minecraft Skin Layout) ----------
function getVoxelFaceTextureCoords(vx, vy, vz, face, partHint, layerCtx) {
    const layer = layerCtx || currentEditingLayer;
    const cfg = getModelConfig();
    const armWidth = cfg.armWidth;
    const rightArmMin = cfg.parts.find(p => p[0] === 'rightarm')[1];
    const rightArmMax = cfg.parts.find(p => p[0] === 'rightarm')[2];
    const leftArmMin = cfg.parts.find(p => p[0] === 'leftarm')[1];
    const leftArmMax = cfg.parts.find(p => p[0] === 'leftarm')[2];
    let localX, localY, localZ, part = partHint;

    function mapArmTexture(isLeftArm) {
        const isSlim = armWidth === 3;
        const base = {
            right: {
                body: { front: 44, back: isSlim ? 51 : 52, right: isSlim ? 47 : 40, left: 48, top: 44, bottom: isSlim ? 47 : 48, y: 20, yTop: 16 },
                outer: { front: 44, back: isSlim ? 51 : 52, right: isSlim ? 47 : 40, left: 48, top: 44, bottom: isSlim ? 47 : 48, y: 36, yTop: 32 }
            },
            left: {
                body: { front: 36, back: isSlim ? 43 : 44, right: isSlim ? 39 : 32, left: 40, top: 36, bottom: isSlim ? 39 : 40, y: 52, yTop: 48 },
                outer: { front: 52, back: isSlim ? 59 : 60, right: isSlim ? 55 : 48, left: 56, top: 52, bottom: isSlim ? 55 : 56, y: 52, yTop: 48 }
            }
        };

        const arm = isLeftArm ? base.left : base.right;
        const tex = isOuter ? arm.outer : arm.body;

        if (face==='front') return {x:tex.front+localX, y:tex.y+(11-localY)};
        if (face==='back') return {x:tex.back+localX, y:tex.y+(11-localY)};
        if (face==='right') return {x:tex.right+localZ, y:tex.y+(11-localY)};
        if (face==='left') return {x:tex.left+localZ, y:tex.y+(11-localY)};
        if (face==='top') return {x:tex.top+localX, y:tex.yTop+localZ};
        if (face==='bottom') return {x:tex.bottom+localX, y:tex.yTop+(3-localZ)};
        return null;
    }

    if (vy>=50 && vy<=57) { part='head'; localX=vx+4; localY=vy-50; localZ=vz+4; }
    else if (vy>=38 && vy<=49) {
        // Important: detect arms before body so classic 4px border columns are not swallowed by body hitbox.
        if (vx>=rightArmMin && vx<=rightArmMax-1) { part='rightarm'; localX=vx-rightArmMin; localY=vy-38; localZ=vz+2; }
        else if (vx>=leftArmMin && vx<=leftArmMax-1) { part='leftarm'; localX=vx-leftArmMin; localY=vy-38; localZ=vz+2; }
        else if (vx>=-4 && vx<=3) { part='body'; localX=vx+4; localY=vy-38; localZ=vz+2; }
    } else if (vy>=26 && vy<=37) {
        if (vx>=-4 && vx<=-1) { part='rightleg'; localX=vx+4; localY=vy-26; localZ=vz+2; }
        else if (vx>=0 && vx<=3) { part='leftleg'; localX=vx; localY=vy-26; localZ=vz+2; }
    }
    if (!part) return null;
    const isOuter = layer==='outer';
    switch(part) {
        case 'head':
            if (isOuter) {
                if (face==='front') return {x:40+localX, y:8+(7-localY)};
                if (face==='back') return {x:56+localX, y:8+(7-localY)};
                if (face==='right') return {x:32+localZ, y:8+(7-localY)};
                if (face==='left') return {x:48+7-localZ, y:8+(7-localY)};
                if (face==='top') return {x:40+localX, y:0+localZ};
                if (face==='bottom') return {x:48+localX, y:0+(7-localZ)};
            } else {
                if (face==='front') return {x:8+localX, y:8+(7-localY)};
                if (face==='back') return {x:24+localX, y:8+(7-localY)};
                if (face==='right') return {x:0+localZ, y:8+(7-localY)};
                if (face==='left') return {x:16+7-localZ, y:8+(7-localY)};
                if (face==='top') return {x:8+localX, y:0+localZ};
                if (face==='bottom') return {x:16+localX, y:0+(7-localZ)};
            }
            break;
        case 'body':
            if (isOuter) {
                if (face==='front') return {x:20+localX, y:36+(11-localY)};
                if (face==='back') return {x:32+localX, y:36+(11-localY)};
                if (face==='right') return {x:16+localZ, y:36+(11-localY)};
                if (face==='left') return {x:28+localZ, y:36+(11-localY)};
                if (face==='top') return {x:20+localX, y:32+localZ};
                if (face==='bottom') return {x:28+localX, y:32+(3-localZ)};
            } else {
                if (face==='front') return {x:20+localX, y:20+(11-localY)};
                if (face==='back') return {x:32+localX, y:20+(11-localY)};
                if (face==='right') return {x:16+localZ, y:20+(11-localY)};
                if (face==='left') return {x:28+localZ, y:20+(11-localY)};
                if (face==='top') return {x:20+localX, y:16+localZ};
                if (face==='bottom') return {x:28+localX, y:16+(3-localZ)};
            }
            break;
        case 'rightarm':
            return mapArmTexture(false);
            break;
        case 'leftarm':
            return mapArmTexture(true);
            break;
        case 'rightleg':
            if (isOuter) {
                if (face==='front') return {x:4+localX, y:36+(11-localY)};
                if (face==='back') return {x:12+localX, y:36+(11-localY)};
                if (face==='left') return {x:0+localZ, y:36+(11-localY)};
                if (face==='right') return {x:8+localZ, y:36+(11-localY)};
                if (face==='top') return {x:4+localX, y:32+localZ};
                if (face==='bottom') return {x:8+localX, y:32+(3-localZ)};
            } else {
                if (face==='front') return {x:4+localX, y:20+(11-localY)};
                if (face==='back') return {x:12+localX, y:20+(11-localY)};
                if (face==='left') return {x:0+localZ, y:20+(11-localY)};
                if (face==='right') return {x:8+localZ, y:20+(11-localY)};
                if (face==='top') return {x:4+localX, y:16+localZ};
                if (face==='bottom') return {x:8+localX, y:16+(3-localZ)};
            }
            break;
        case 'leftleg':
            if (isOuter) {
                if (face==='front') return {x:4+localX, y:52+(11-localY)};
                if (face==='back') return {x:12+localX, y:52+(11-localY)};
                if (face==='right') return {x:8+localZ, y:52+(11-localY)};
                if (face==='left') return {x:0+localZ, y:52+(11-localY)};
                if (face==='top') return {x:4+localX, y:48+localZ};
                if (face==='bottom') return {x:8+localX, y:48+(3-localZ)};
            } else {
                if (face==='front') return {x:20+localX, y:52+(11-localY)};
                if (face==='back') return {x:28+localX, y:52+(11-localY)};
                if (face==='right') return {x:16+localZ, y:52+(11-localY)};
                if (face==='left') return {x:24+localZ, y:52+(11-localY)};
                if (face==='top') return {x:20+localX, y:48+localZ};
                if (face==='bottom') return {x:24+localX, y:48+(3-localZ)};
            }
            break;
    }

    if ((part === 'rightarm' || part === 'leftarm') && armWidth === 3) {
        if (localX < 0 || localX > 2) return null;
    }

    return null;
}

// ---------- MODELL ERSTELLEN ----------
function initSkinData() {
    loadSteveSkin(false);
}
function loadSteveSkin(saveHistory = true) {
    const img = new Image();
    img.onload = () => {
        const { canvas } = createNormalizedSkinCanvas(img);
        applySkinCanvasToEditor(canvas, {
            modelType: 'classic',
            sourceName: 'Steve',
            saveHistory
        });
        showToast('Info', t('toast_new_steve'));
    };
    img.onerror = () => { createEmptySkin(); showToast('Info', 'Leerer Skin erstellt'); };
    img.src = '/assets/img/editor/steve.png'; 
}
function createEmptySkin() {
    skinData.body.fill(0); skinData.outer.fill(0);
    updateSkinTextures();
}
function extractSkinLayers(pixels) {
    const bodyAreas = [
        [8,8,8,8],[0,8,8,8],[16,8,8,8],[24,8,8,8],[8,0,8,8],[16,0,8,8],
        [20,20,8,12],[16,20,4,12],[28,20,4,12],[32,20,8,12],[20,16,8,4],[28,16,8,4],
        [44,20,4,12],[40,20,4,12],[48,20,4,12],[52,20,4,12],[44,16,4,4],[48,16,4,4],
        [36,52,4,12],[32,52,4,12],[40,52,4,12],[44,52,4,12],[36,48,4,4],[40,48,4,4],
        [4,20,4,12],[0,20,4,12],[8,20,4,12],[12,20,4,12],[4,16,4,4],[8,16,4,4],
        [20,52,4,12],[16,52,4,12],[24,52,4,12],[28,52,4,12],[20,48,4,4],[24,48,4,4]
    ];
    const outerAreas = [
        [40,8,8,8],[32,8,8,8],[48,8,8,8],[56,8,8,8],[40,0,8,8],[48,0,8,8],
        [20,36,8,12],[16,36,4,12],[28,36,4,12],[32,36,8,12],[20,32,8,4],[28,32,8,4],
        [44,36,4,12],[40,36,4,12],[48,36,4,12],[52,36,4,12],[44,32,4,4],[48,32,4,4],
        [52,52,4,12],[48,52,4,12],[56,52,4,12],[60,52,4,12],[52,48,4,4],[56,48,4,4],
        [4,36,4,12],[0,36,4,12],[8,36,4,12],[12,36,4,12],[4,32,4,4],[8,32,4,4],
        [4,52,4,12],[0,52,4,12],[8,52,4,12],[12,52,4,12],[4,48,4,4],[8,48,4,4]
    ];
    const copy = (areas, target) => {
        areas.forEach(([sx,sy,w,h]) => {
            for (let dy=0; dy<h; dy++) {
                for (let dx=0; dx<w; dx++) {
                    const src = ((sy+dy)*64 + (sx+dx))*4;
                    const dst = ((sy+dy)*64 + (sx+dx))*4;
                    target[dst]=pixels[src]; target[dst+1]=pixels[src+1]; target[dst+2]=pixels[src+2]; target[dst+3]=pixels[src+3];
                }
            }
        });
    };
    copy(bodyAreas, skinData.body);
    copy(outerAreas, skinData.outer);
}
function createSkinModel() {
    if (skinModel) scene.remove(skinModel);
    skinModel = new THREE.Group();
    skinModel.position.set(0, MODEL_CENTER_Y, 0);
    const bodyGroup = new THREE.Group(); bodyGroup.name='body_layer';
    const outerGroup = new THREE.Group(); outerGroup.name='outer_layer';
    bodyGroup.position.y = -MODEL_CENTER_Y;
    outerGroup.position.y = -MODEL_CENTER_Y;
    createBodyPartSurfaces(bodyGroup, 'body', 1.0);
    createBodyPartSurfaces(outerGroup, 'outer', 1.1);
    skinModel.add(bodyGroup); skinModel.add(outerGroup);
    scene.add(skinModel);
    updateLayerVisibility3D();
}

function getPartCenter(xMin, xMax, yMin, yMax, zMin, zMax) {
    return new THREE.Vector3(
        ((xMin + xMax) / 2) * 0.125,
        ((yMin + yMax) / 2) * 0.125,
        ((zMin + zMax) / 2) * 0.125
    );
}

function getPartPivot(name, xMin, xMax, yMin, yMax, zMin, zMax) {
    const center = getPartCenter(xMin, xMax, yMin, yMax, zMin, zMax);
    const pivotY = name === 'head' || name === 'body' ? yMin * 0.125 : yMax * 0.125;
    return new THREE.Vector3(center.x, pivotY, center.z);
}

function createBodyPartSurfaces(parent, layer, scale) {
    const parts = getModelConfig().parts;
    parts.forEach(([name, xMin,xMax, yMin,yMax, zMin,zMax]) => {
        const partGroup = new THREE.Group(); partGroup.name = `${name}_${layer}`;
        for (let x=xMin; x<xMax; x++) {
            for (let y=yMin; y<yMax; y++) {
                for (let z=zMin; z<zMax; z++) {
                    if (x===xMin||x===xMax-1||y===yMin||y===yMax-1||z===zMin||z===zMax-1) {
                        createVoxelSurfaces(partGroup, x,y,z, xMin,xMax,yMin,yMax,zMin,zMax, scale, layer, name);
                    }
                }
            }
        }
        const center = getPartCenter(xMin, xMax, yMin, yMax, zMin, zMax);
        const pivot = getPartPivot(name, xMin, xMax, yMin, yMax, zMin, zMax);
        partGroup.position.copy(pivot);
        partGroup.userData.animationBasePosition = pivot.clone();
        partGroup.children.forEach(mesh => {
            if (layer === 'outer' && scale !== 1.0) {
                mesh.position.sub(center).multiplyScalar(scale).add(center).sub(pivot);
                mesh.scale.setScalar(scale);
            } else {
                mesh.position.sub(pivot);
            }
        });
        partGroup.visible = bodyPartsVisible[name] !== false;
        parent.add(partGroup);
    });
}
function createVoxelSurfaces(parent, vx,vy,vz, xMin,xMax,yMin,yMax,zMin,zMax, scale, layer, partName) {
    const size = 0.125;
    const geom = new THREE.PlaneGeometry(size, size);
    const faces = [
        { pos: [size/2,0,0], rot:[0,Math.PI/2,0], name:'right', cond: vx===xMax-1 },
        { pos: [-size/2,0,0], rot:[0,-Math.PI/2,0], name:'left', cond: vx===xMin },
        { pos: [0,size/2,0], rot:[-Math.PI/2,0,0], name:'top', cond: vy===yMax-1 },
        { pos: [0,-size/2,0], rot:[Math.PI/2,0,0], name:'bottom', cond: vy===yMin },
        { pos: [0,0,size/2], rot:[0,0,0], name:'front', cond: vz===zMax-1 },
        { pos: [0,0,-size/2], rot:[0,Math.PI,0], name:'back', cond: vz===zMin }
    ];
    faces.forEach(f => {
        if (!f.cond) return;
        const tex = getVoxelFaceTextureCoords(vx,vy,vz, f.name, partName, layer);
        if (!tex) return;
        const mat = getVoxelMaterial(tex.x, tex.y, layer);
        const mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({ color: mat.color, transparent: true, opacity: mat.opacity, side: THREE.DoubleSide }));
        const baseX = (vx+0.5)*0.125, baseY = (vy+0.5)*0.125, baseZ = (vz+0.5)*0.125;
        mesh.position.set(baseX+f.pos[0], baseY+f.pos[1], baseZ+f.pos[2]);
        mesh.rotation.set(f.rot[0], f.rot[1], f.rot[2]);
        mesh.userData = { textureX: tex.x, textureY: tex.y, layer, partName, voxelX: vx, voxelY: vy, voxelZ: vz, face: f.name };
        parent.add(mesh);
    });
}
function getVoxelMaterial(tx, ty, layer) {
    const data = layer==='body'? skinData.body : skinData.outer;
    const idx = (ty*64+tx)*4;
    const r=data[idx], g=data[idx+1], b=data[idx+2], a=data[idx+3];
    if (a===0) {
        if (layer==='outer') return { color: 0x000000, opacity: 0 };
        else return { color: showPixelGrid?0x404040:0x202020, opacity: showPixelGrid?0.2:0 };
    }
    return { color: (r<<16)|(g<<8)|b, opacity: layer === 'outer' ? overlayPreviewOpacity : 1 };
}
function updateSkinTextures() {
    if (!skinModel) return;
    skinModel.children.forEach(layerGroup => {
        layerGroup.children.forEach(part => {
            part.children.forEach(mesh => {
                if (mesh.userData) {
                    const { voxelX, voxelY, voxelZ, layer, face, partName } = mesh.userData;
                    const tex = getVoxelFaceTextureCoords(voxelX, voxelY, voxelZ, face, partName, layer);
                    if (tex) {
                        const mat = getVoxelMaterial(tex.x, tex.y, layer);
                        mesh.material.color.setHex(mat.color);
                        mesh.material.opacity = mat.opacity;

                        // Keep empty overlay faces editable without letting them interfere with body painting.
                        if (!layerVisibility[layer]) {
                            mesh.visible = false;
                        } else if (mat.opacity > 0) {
                            mesh.visible = true;
                        } else if (layer === 'outer' && currentEditingLayer === 'outer' && isEditMode) {
                            mesh.visible = true;
                            mesh.material.opacity = 0.075;
                        } else {
                            mesh.visible = layer === 'body' && showPixelGrid;
                        }
                    }
                }
            });
        });
    });

    renderUvEditor();
}
function updateLayerVisibility3D() {
    if (!skinModel) return;
    skinModel.children.forEach(g => { g.visible = layerVisibility[g.name.replace('_layer','')]; });
}
function createGridOverlay() {
    if (gridOverlay) scene.remove(gridOverlay);
    gridOverlay = new THREE.Group();
    gridOverlay.position.set(0, MODEL_CENTER_Y, 0);
    if (!showPixelGrid) { scene.add(gridOverlay); return; }
    const matBody = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const matOuter = new THREE.LineBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.4 });
    const parts = getModelConfig().parts;
    parts.forEach(([name, xMin,xMax, yMin,yMax, zMin,zMax]) => {
        if (layerVisibility.body) addPartGrid(gridOverlay, name+'_body', xMin,xMax,yMin,yMax,zMin,zMax, matBody, 1.0, false);
        if (layerVisibility.outer) addPartGrid(gridOverlay, name+'_outer', xMin,xMax,yMin,yMax,zMin,zMax, matOuter, 1.1, true);
    });
    scene.add(gridOverlay);
}
function addPartGrid(parent, name, xMin,xMax,yMin,yMax,zMin,zMax, material, scale, isOuter) {
    const group = new THREE.Group(); group.name = `grid_${name}`;
    const partName = name.replace(/_(body|outer)$/, '');
    for (let x=xMin; x<=xMax; x++) {
        for (let y=yMin; y<=yMax; y++) {
            if ((x===xMin||x===xMax)||(y===yMin||y===yMax)) {
                const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x*0.125,y*0.125,zMin*0.125), new THREE.Vector3(x*0.125,y*0.125,zMax*0.125)]);
                group.add(new THREE.Line(geom, material));
            }
        }
        for (let z=zMin; z<=zMax; z++) {
            if ((x===xMin||x===xMax)||(z===zMin||z===zMax)) {
                const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x*0.125,yMin*0.125,z*0.125), new THREE.Vector3(x*0.125,yMax*0.125,z*0.125)]);
                group.add(new THREE.Line(geom, material));
            }
        }
    }
    for (let y=yMin; y<=yMax; y++) {
        for (let z=zMin; z<=zMax; z++) {
            if ((y===yMin||y===yMax)||(z===zMin||z===zMax)) {
                const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xMin*0.125,y*0.125,z*0.125), new THREE.Vector3(xMax*0.125,y*0.125,z*0.125)]);
                group.add(new THREE.Line(geom, material));
            }
        }
    }
    const center = getPartCenter(xMin, xMax, yMin, yMax, zMin, zMax);
    const pivot = getPartPivot(partName, xMin, xMax, yMin, yMax, zMin, zMax);
    group.children.forEach(line => {
        if (isOuter) {
            line.geometry.scale(scale, scale, scale);
            line.geometry.translate(
                (1 - scale) * center.x - pivot.x,
                (1 - scale) * center.y - pivot.y,
                (1 - scale) * center.z - pivot.z
            );
        } else {
            line.geometry.translate(-pivot.x, -pivot.y, -pivot.z);
        }
    });
    group.position.set(pivot.x, pivot.y - MODEL_CENTER_Y, pivot.z);
    group.userData.animationBasePosition = group.position.clone();
    group.visible = bodyPartsVisible[partName] !== false;
    parent.add(group);
}

// ---------- STEUERUNG ----------
function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('[id^="tool-"]').forEach(b => b.classList.remove('active'));
    document.getElementById(`tool-${tool}`).classList.add('active');
    const canvas = renderer.domElement;
    canvas.style.cursor = (tool==='rotate'||!isEditMode) ? 'grab' : 'crosshair';
    const uvCanvas = document.getElementById('uvEditorCanvas');
    if (uvCanvas) uvCanvas.style.cursor = (tool==='rotate'||!isEditMode) ? 'default' : 'crosshair';
    document.getElementById('pixel-info').textContent = `${currentEditingLayer} | ${tool}`;
    updateModeIndicators();
}

function setOverlayPreviewOpacity(e) {
    overlayPreviewOpacity = Number(e.target.value);
    updateSkinTextures();
}

function toggleMirrorPainting() {
    mirrorPainting = !mirrorPainting;
    document.getElementById('mirrorToggleBtn').classList.toggle('active', mirrorPainting);
    const chip = document.getElementById('mirrorStateChip');
    if (chip) chip.textContent = mirrorPainting ? 'Mirror On' : 'Mirror Off';
    showToast('Mirror', mirrorPainting ? 'Aether Mirror enabled' : 'Aether Mirror disabled');
}

function toggleOverlayFocus() {
    if (!isEditMode) {
        showToast('Overlay', 'Overlay Focus funktioniert im Edit Mode.');
        return;
    }

    if (currentEditingLayer === 'outer') {
        layerVisibility.body = !layerVisibility.body;
        updateLayerButtons();
        updateLayerVisibility3D();
        updateGridOverlay();
        updateSkinTextures();
    } else {
        currentEditingLayer = 'outer';
        layerVisibility.outer = true;
        updateLayerButtons();
        updateLayerVisibility3D();
        updateGridOverlay();
        updateModeIndicators();
        updateSkinTextures();
    }
}
function toggleLayerVisibility(layer) {
    if (isEditMode) {
        currentEditingLayer = layer;
        layerVisibility[layer] = true;
    } else {
        layerVisibility[layer] = !layerVisibility[layer];
    }
    updateLayerButtons();
    updateLayerVisibility3D();
    updateGridOverlay();
    updateModeIndicators();
    showToast('Layer', t('toast_layer_changed', {layer}));
}
function togglePixelGrid() {
    showPixelGrid = !showPixelGrid;
    document.getElementById('pixel-grid-btn').classList.toggle('visible', showPixelGrid);
    updateGridOverlay();
    updateSkinTextures();
    showToast('Grid', t('toast_grid_toggled', {state: showPixelGrid?'an':'aus'}));
}
function toggleBodyPart(part) {
    bodyPartsVisible[part] = !bodyPartsVisible[part];
    const btn = document.getElementById(`part-${part}`);
    btn.classList.toggle('hidden', !bodyPartsVisible[part]);
    skinModel.children.forEach(layer => {
        layer.children.forEach(p => { if (p.name.includes(part)) p.visible = bodyPartsVisible[part]; });
    });
    if (gridOverlay) {
        gridOverlay.children.forEach(group => {
            if (group.name.includes(part)) group.visible = bodyPartsVisible[part];
        });
    }
    showToast('Body Part', t('toast_part_toggled', {part, state: bodyPartsVisible[part]?'visible':'hidden'}));
}
function updateLayerButtons() {
    const bBody = document.getElementById('layer-body'), bOuter = document.getElementById('layer-outer');
    bBody.classList.toggle('visible', layerVisibility.body);
    bOuter.classList.toggle('visible', layerVisibility.outer);
    bBody.classList.toggle('editing', currentEditingLayer==='body');
    bOuter.classList.toggle('editing', currentEditingLayer==='outer');
}
function updateGridOverlay() { createGridOverlay(); }
function toggleMode() {
    isEditMode = !isEditMode;
    renderer.domElement.style.cursor = (currentTool==='rotate'||!isEditMode) ? 'grab' : 'crosshair';
    const uvCanvas = document.getElementById('uvEditorCanvas');
    if (uvCanvas) uvCanvas.style.cursor = (currentTool==='rotate'||!isEditMode) ? 'default' : 'crosshair';
    updateModeIndicators();
}

function updateModeIndicators() {
    const btn = document.getElementById('toggleMode');
    const editIndicator = document.getElementById('edit-mode-indicator');
    const viewIndicator = document.getElementById('view-mode-indicator');
    const statusText = document.getElementById('status-text');
    const tool = currentTool.charAt(0).toUpperCase() + currentTool.slice(1);
    const layer = currentEditingLayer === 'outer' ? 'Overlay' : 'Body';

    btn.textContent = isEditMode ? '👁️ View' : '🎨 Edit';
    statusText.textContent = isEditMode ? `🎨 Edit Mode (${layer}, ${currentModelType})` : `👁️ View Mode (${currentModelType})`;

    editIndicator.style.display = isEditMode ? 'block' : 'none';
    viewIndicator.style.display = isEditMode ? 'none' : 'block';

    editIndicator.textContent = `Edit: ${layer} | Tool: ${tool}`;
    viewIndicator.textContent = `View: Rotate & Zoom${mirrorPainting ? ' | Mirror' : ''}`;
    document.getElementById('pixel-info').textContent = `${layer} | ${tool}`;

    const chip = document.getElementById('mirrorStateChip');
    if (chip) chip.textContent = mirrorPainting ? 'Mirror On' : 'Mirror Off';
}

function updateModelButtons() {
    const classicBtn = document.getElementById('model-classic');
    const slimBtn = document.getElementById('model-slim');
    if (!classicBtn || !slimBtn) return;

    classicBtn.classList.toggle('visible', currentModelType === 'classic');
    slimBtn.classList.toggle('visible', currentModelType === 'slim');
}

function setModelType(type) {
    if (type !== 'classic' && type !== 'slim') return;
    if (currentModelType === type) return;

    currentModelType = type;
    createSkinModel();
    updateSkinTextures();
    updateGridOverlay();
    updateModelButtons();
    updatePlayerModelStatus();
    updateModeIndicators();
    showToast('Model', `Modelltyp: ${type === 'slim' ? 'Slim (3px)' : 'Classic (4px)'}`);
}
function resetView() { camera.position.set(5,6,5); camera.lookAt(0,6,0); updateCameraInfo(); }
function zoomCamera(factor) {
    const target = new THREE.Vector3(0,6,0);
    const offset = camera.position.clone().sub(target);
    offset.multiplyScalar(factor);
    const d = offset.length();
    if (d<3) offset.setLength(3);
    if (d>12) offset.setLength(12);
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
    updateCameraInfo();
}
function updateCameraInfo() {
    const d = camera.position.distanceTo(new THREE.Vector3(0,6,0));
    const zoom = Math.round((1 - (d-3)/(12-3)) * 100);
    document.getElementById('camera-info').textContent = `Zoom: ${zoom}%`;
}

// ---------- SPIELER-SKINS & AUTOMATISCHE MODELLERKENNUNG ----------
const STEVE_SKIN_URL = 'https://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b';

function getCurrentModelLabel() {
    return currentModelType === 'slim'
        ? t('editor_model_slim')
        : t('editor_model_classic');
}

function updatePlayerModelStatus() {
    const status = document.getElementById('playerModelStatus');
    if (!status) return;

    status.replaceChildren();
    if (!loadedPlayerName) {
        status.textContent = t('editor_player_status_empty');
        return;
    }

    const name = document.createElement('span');
    name.className = 'player-status-name';
    name.textContent = loadedPlayerName;

    const model = document.createElement('span');
    model.className = `model-detection-badge ${currentModelType}`;
    model.textContent = getCurrentModelLabel();
    status.append(name, model);
}

function areaMatches(canvasContext, x0, y0, width, height, matcher) {
    const pixels = canvasContext.getImageData(x0, y0, width, height).data;
    for (let i = 0; i < pixels.length; i += 4) {
        if (!matcher(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3])) return false;
    }
    return true;
}

function areaHasTransparency(canvasContext, x0, y0, width, height) {
    const pixels = canvasContext.getImageData(x0, y0, width, height).data;
    for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 255) return true;
    }
    return false;
}

function inferSkinModelType(canvas) {
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const unusedArmAreas = [
        [50, 16, 2, 4],
        [54, 20, 2, 12],
        [42, 48, 2, 4],
        [46, 52, 2, 12]
    ];

    const hasTransparentArea = unusedArmAreas.some(area => areaHasTransparency(context, ...area));
    const allBlack = unusedArmAreas.every(area => areaMatches(context, ...area, (r, g, b, a) => r === 0 && g === 0 && b === 0 && a === 255));
    const allWhite = unusedArmAreas.every(area => areaMatches(context, ...area, (r, g, b, a) => r === 255 && g === 255 && b === 255 && a === 255));
    return hasTransparentArea || allBlack || allWhite ? 'slim' : 'classic';
}

function createNormalizedSkinCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = SKIN_SIZE;
    canvas.height = SKIN_SIZE;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.clearRect(0, 0, SKIN_SIZE, SKIN_SIZE);

    if (image.width === 64 && image.height === 64) {
        context.drawImage(image, 0, 0);
        return { canvas, legacy: false };
    }
    if (image.width === 64 && image.height === 32) {
        context.drawImage(image, 0, 0);
        convertLegacySkinToModern(context);
        return { canvas, legacy: true };
    }

    throw new Error('INVALID_SKIN_SIZE');
}

function applySkinCanvasToEditor(canvas, options = {}) {
    const { modelType = 'auto', sourceName = '', saveHistory = true } = options;
    const detectedModel = modelType === 'slim' || modelType === 'classic'
        ? modelType
        : inferSkinModelType(canvas);

    if (saveHistory) saveUndoState();
    const imageData = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, SKIN_SIZE, SKIN_SIZE);
    skinData.body.fill(0);
    skinData.outer.fill(0);
    extractSkinLayers(imageData.data);

    currentModelType = detectedModel;
    loadedPlayerName = sourceName;
    layerVisibility.body = true;
    layerVisibility.outer = true;
    currentEditingLayer = 'body';

    createSkinModel();
    updateGridOverlay();
    updateLayerButtons();
    updateSkinTextures();
    updateModelButtons();
    updatePlayerModelStatus();
    updateModeIndicators();
    return detectedModel;
}

function loadImageForEditor(url, crossOrigin = false) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        if (crossOrigin) image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('SKIN_IMAGE_LOAD_FAILED'));
        image.src = url;
    });
}

async function getPlayerSkinData(input) {
    const cleanInput = input.trim();
    const uuidPattern = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
    const query = uuidPattern.test(cleanInput)
        ? cleanInput.replace(/-/g, '').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5')
        : encodeURIComponent(cleanInput);

    const response = await fetch(`https://playerdb.co/api/player/minecraft/${query}`, {
        headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error(response.status === 429 ? 'RATE_LIMIT' : 'PLAYER_NOT_FOUND');

    const payload = await response.json();
    const player = payload.data?.player;
    if (!player) throw new Error('PLAYER_NOT_FOUND');

    let skinUrl = player.skin_texture || null;
    let modelType = null;
    const textureProperty = (player.properties || []).find(property => property.name === 'textures');
    if (textureProperty?.value) {
        try {
            const decoded = JSON.parse(atob(textureProperty.value));
            const skin = decoded.textures?.SKIN;
            if (skin?.url) skinUrl = skin.url;
            if (skin?.metadata?.model === 'slim') modelType = 'slim';
            else if (skin?.url) modelType = 'classic';
        } catch (error) {
            console.warn('Texture metadata could not be read:', error);
        }
    }

    return {
        username: player.username || cleanInput,
        skinUrl: skinUrl || STEVE_SKIN_URL,
        modelType
    };
}

async function loadPlayerSkin() {
    const input = document.getElementById('playerSkinName');
    const button = document.getElementById('loadPlayerSkinBtn');
    const value = input?.value.trim() || '';
    if (!value) {
        showToast('Skin', t('toast_enter_player'), 'error');
        return;
    }

    const now = Date.now();
    if (now - lastPlayerRequestTime < PLAYER_REQUEST_DELAY) {
        const seconds = Math.ceil((PLAYER_REQUEST_DELAY - (now - lastPlayerRequestTime)) / 1000);
        showToast('Skin', t('toast_player_rate_limit', { seconds }), 'error');
        return;
    }
    lastPlayerRequestTime = now;

    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i><span>${t('editor_player_loading')}</span>`;

    try {
        const player = await getPlayerSkinData(value);
        const image = await loadImageForEditor(player.skinUrl, true);
        const { canvas, legacy } = createNormalizedSkinCanvas(image);
        const detectedModel = applySkinCanvasToEditor(canvas, {
            modelType: player.modelType || (legacy ? 'classic' : 'auto'),
            sourceName: player.username,
            saveHistory: true
        });
        showToast('Skin', t('toast_player_loaded_editor', { name: player.username }));
        showToast('Model', t('toast_model_detected', {
            model: detectedModel === 'slim' ? t('editor_model_slim') : t('editor_model_classic')
        }));
    } catch (error) {
        console.error('Player skin could not be loaded:', error);
        const message = error.message === 'RATE_LIMIT'
            ? t('toast_player_rate_limit', { seconds: 5 })
            : error.message === 'PLAYER_NOT_FOUND'
                ? t('toast_player_not_found_editor')
                : t('toast_skin_load_failed');
        showToast('Skin', message, 'error');
    } finally {
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-user-download" aria-hidden="true"></i><span data-i18n="editor_player_load">${t('editor_player_load')}</span>`;
    }
}

// ---------- UNDO / REDO ----------
function saveUndoState() {
    undoStack.push({ body: new Uint8ClampedArray(skinData.body), outer: new Uint8ClampedArray(skinData.outer) });
    if (undoStack.length > MAX_UNDO_STEPS) undoStack.shift();
    redoStack = [];
}
function undoAction() {
    if (undoStack.length===0) { showToast('Undo', t('toast_nothing_to_undo')); return; }
    const curr = { body: new Uint8ClampedArray(skinData.body), outer: new Uint8ClampedArray(skinData.outer) };
    redoStack.push(curr);
    const prev = undoStack.pop();
    skinData.body.set(prev.body); skinData.outer.set(prev.outer);
    updateSkinTextures();
    showToast('Undo', t('toast_undo'));
}
function redoAction() {
    if (redoStack.length===0) { showToast('Redo', t('toast_nothing_to_redo')); return; }
    saveUndoState(); undoStack.pop();
    const next = redoStack.pop();
    skinData.body.set(next.body); skinData.outer.set(next.outer);
    updateSkinTextures();
    showToast('Redo', t('toast_redo'));
}

// ---------- IMPORT / EXPORT ----------
function exportSkin() {
    const canvas = document.createElement('canvas'); canvas.width=64; canvas.height=64;
    const ctx = canvas.getContext('2d');
    const combined = composeMergedSkinData();
    ctx.putImageData(new ImageData(combined,64,64),0,0);
    const a = document.createElement('a'); a.download='skin.png'; a.href=canvas.toDataURL(); a.click();
    showToast('Export', t('toast_export_done'));
}
function importSkin(e) {
    const file = e.target.files[0]; if (!file) return;
    const img = new Image();
    img.onload = () => {
        try {
            const { canvas, legacy } = createNormalizedSkinCanvas(img);
            const detectedModel = applySkinCanvasToEditor(canvas, {
                modelType: legacy ? 'classic' : 'auto',
                sourceName: file.name,
                saveHistory: true
            });
            showToast('Import', t('toast_import_done', {name: file.name}));
            showToast('Model', t('toast_model_detected', {
                model: detectedModel === 'slim' ? t('editor_model_slim') : t('editor_model_classic')
            }));
        } catch (error) {
            showToast('Import', 'Only 64x64 or 64x32 PNG skins are supported.', 'error');
        }
        URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
        showToast('Import', 'The skin file could not be loaded.', 'error');
        URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
    e.target.value = '';
}

function copyFlippedRegion(ctx, srcX, srcY, width, height, dstX, dstY) {
    const src = ctx.getImageData(srcX, srcY, width, height);
    const flipped = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const srcIndex = (y * width + (width - 1 - x)) * 4;
            const dstIndex = (y * width + x) * 4;
            flipped.data[dstIndex] = src.data[srcIndex];
            flipped.data[dstIndex + 1] = src.data[srcIndex + 1];
            flipped.data[dstIndex + 2] = src.data[srcIndex + 2];
            flipped.data[dstIndex + 3] = src.data[srcIndex + 3];
        }
    }
    ctx.putImageData(flipped, dstX, dstY);
}

function convertLegacySkinToModern(ctx) {
    // Mirror right leg (0..15,16..31) -> left leg (16..31,48..63)
    copyFlippedRegion(ctx, 0, 16, 16, 16, 16, 48);
    // Mirror right arm (40..55,16..31) -> left arm (32..47,48..63)
    copyFlippedRegion(ctx, 40, 16, 16, 16, 32, 48);
}
function newSkin() { loadSteveSkin(true); }
function clearSkin() { saveUndoState(); skinData.body.fill(0); skinData.outer.fill(0); updateSkinTextures(); showToast('Clear', t('toast_clear_done')); }
function applyColorCode() {
    const inp = document.getElementById('color-code-input');
    let code = inp.value.trim();
    if (!code.startsWith('#')) code = '#'+code;
    if (/^#[0-9A-F]{6}$/i.test(code)) {
        currentColor = code.toLowerCase();
        document.getElementById('color-picker').value = currentColor;
        showToast('Color', t('toast_color_picked', {color: currentColor}));
    } else {
        showToast('Error', t('toast_invalid_color'), 'error');
        inp.value = currentColor;
    }
}

function composeMergedSkinData() {
    const combined = new Uint8ClampedArray(SKIN_SIZE * SKIN_SIZE * 4);
    combined.set(skinData.body);

    for (let i=0; i<skinData.outer.length; i+=4) {
        if (skinData.outer[i+3]>0) {
            combined[i]=skinData.outer[i];
            combined[i+1]=skinData.outer[i+1];
            combined[i+2]=skinData.outer[i+2];
            combined[i+3]=skinData.outer[i+3];
        }
    }

    return combined;
}

function renderUvEditor() {
    const canvas = document.getElementById('uvEditorCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const pixelSize = size / SKIN_SIZE;

    // Checkerboard background for transparent pixels.
    for (let y = 0; y < SKIN_SIZE; y++) {
        for (let x = 0; x < SKIN_SIZE; x++) {
            const isDark = (x + y) % 2 === 0;
            ctx.fillStyle = isDark ? '#5e5e5e' : '#7a7a7a';
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }

    const active = currentEditingLayer === 'outer' ? skinData.outer : skinData.body;
    const preview = composeMergedSkinData();

    // Use merged image as reference, then reinforce active layer alpha with border tint.
    const imgData = new ImageData(preview, SKIN_SIZE, SKIN_SIZE);
    const temp = document.createElement('canvas');
    temp.width = SKIN_SIZE;
    temp.height = SKIN_SIZE;
    const tctx = temp.getContext('2d');
    tctx.putImageData(imgData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(temp, 0, 0, size, size);

    // Highlight active edit layer pixels very lightly.
    for (let y = 0; y < SKIN_SIZE; y++) {
        for (let x = 0; x < SKIN_SIZE; x++) {
            const idx = (y * SKIN_SIZE + x) * 4;
            if (active[idx + 3] === 0) continue;
            ctx.fillStyle = currentEditingLayer === 'outer' ? 'rgba(255, 170, 0, 0.08)' : 'rgba(0, 220, 140, 0.08)';
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }

    // UV grid.
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= SKIN_SIZE; i++) {
        const p = i * pixelSize;
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, size);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, p);
        ctx.lineTo(size, p);
        ctx.stroke();
    }
}

// ---------- INIT BEIM LADEN ----------
window.addEventListener('DOMContentLoaded', () => {
    try { levelUpSound = new Audio('/assets/audio/levelup.ogg'); levelUpSound.volume=0.3; } catch(e){}
    const loader = document.getElementById('loader');
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
    const interval = setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.style.display='none', 500);
                playLevelUpSound();
                showToast(t('toast_welcome_title'), t('toast_welcome_message'));
            }, 300);
        }
    }, 120);
    applyTheme(currentTheme);
    updateLanguage();
    updateSoundIcon();
    buildUI();
    initScene();
    initSkinData();
    createSkinModel();
    createGridOverlay();
    updateModelButtons();
    updateModeIndicators();
    // Homepage Event Listener
    document.getElementById('themeBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('themeDropdown').classList.toggle('show');
    });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(opt => {
        opt.addEventListener('click', () => {
            const theme = opt.dataset.theme;
            applyTheme(theme);
            document.getElementById('themeDropdown').classList.remove('show');
            showToast(t('toast_theme_title'), t('toast_theme_to', {theme: getThemeName(theme)}));
        });
    });
    document.getElementById('soundBtn').addEventListener('click', toggleSound);
    document.getElementById('mobileMenuBtn').addEventListener('click', () => document.getElementById('mobileNav').classList.add('show'));
    document.getElementById('closeBtn').addEventListener('click', () => document.getElementById('mobileNav').classList.remove('show'));
    window.addEventListener('scroll', () => {
        document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50);
        document.getElementById('backToTop').classList.toggle('show', window.scrollY > 300);
    });
    document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    // Mobile Sound/Lang
    document.getElementById('mobileSoundBtn').addEventListener('click', toggleSound);
    document.querySelectorAll('button, .btn, .nav-link, .theme-option, .theme-option-btn, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn').forEach((element) => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
    // Click outside für Dropdowns
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) document.getElementById('themeDropdown').classList.remove('show');
    });
});

// Globale Funktionen für onclick (falls benötigt)
window.toggleLayerVisibility = toggleLayerVisibility;
window.togglePixelGrid = togglePixelGrid;
window.toggleBodyPart = toggleBodyPart;
window.undoAction = undoAction;
window.redoAction = redoAction;
window.setTool = setTool;
window.applyColorCode = applyColorCode; 