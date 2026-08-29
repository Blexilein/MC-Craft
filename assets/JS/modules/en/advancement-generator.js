let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

const T = {
    site_title: "MC-Craft | Advancement Generator",
    site_title_short: "MC-Craft",
    loader_text: "Loading advancement generator...",
    loader_text2: "Preparing icons...",
    loader_text3: "Initializing preview...",
    loader_text4: "Loading theme and sounds...",
    loader_text5: "Almost done...",
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
    nav_capes: "Cape Database",
    nav_skins: "Skin Library",
    nav_beacon_mixer: "Beacon Color Mixer",
    nav_advancement: "Advancement Generator",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose theme:",
    sound_toggle: "Sound",
    language: "Language",
    hero_badge: "V 1.0.0 IS HERE",
    hero_title: "YOUR <span class=\"highlight\">ADVANCEMENT</span> GENERATOR",
    hero_desc: "Build custom achievement and advancement images with two text lines, an icon and free colors. Download as PNG for thumbnails, Discord and overlays.",
    hero_btn: "Open generator",
    hero_btn_tools: "All tools",
    hero_grid_frames: "4 FRAMES",
    hero_grid_export: "PNG EXPORT",
    hero_grid_lines: "2 TEXT LINES",
    hero_grid_colors: "FREE COLORS",
    settings_title: "Settings",
    frame_label: "Frame type",
    frame_achievement: "Achievement Get!",
    frame_achievement_hint: "Pre-1.12, yellow",
    frame_advancement: "Advancement Made!",
    frame_advancement_hint: "1.12+, green",
    frame_challenge: "Challenge Complete!",
    frame_challenge_hint: "Purple",
    frame_goal: "Goal Reached!",
    frame_goal_hint: "Goal, yellow",
    line1_label: "Line 1 (heading)",
    line1_placeholder: "Advancement Made!",
    line2_label: "Line 2 (subtitle, white)",
    line2_placeholder: "Getting an Upgrade",
    line3_toggle: "Show third line",
    line_toggle: "Show row 4",
    line3_label: "Line 3 (optional)",
    line4_label: "Line 4 (optional)",
    line3_placeholder: "mc-craft.com",
    line4_placeholder: "mc-craft.com",
    style_label: "Box style",
    color_line3: "Line 3",
    color_line4: "Line 4",
    chars_hint: "characters",
    icon_label: "Icon",
    icon_search_placeholder: "Search item, block, mob, heart or dialog icon...",
    icon_group_heart: "Heart",
    icon_group_dialog: "Dialog",
    icon_tab_all: "All",
    icon_tab_items: "Items",
    icon_tab_mobs: "Mobs",
    icon_tab_hearts: "Hearts",
    icon_tab_dialogs: "Dialogs",
    mob_variant_face: "Face",
    mob_variant_body: "Body",
    icon_loading: "Loading icons...",
    icon_empty: "Nothing found. Use your own image or an image URL.",
    icon_failed: "Icon database unavailable. Use your own image or an image URL.",
    icon_upload: "Own image",
    icon_url: "Image URL",
    icon_clear: "No icon",
    icon_url_prompt: "Paste an image URL (PNG recommended):",
    custom_colors_toggle: "Use custom colors",
    color_line1: "Line 1",
    color_line2: "Line 2",
    color_fill: "Box fill",
    color_border: "Box border",
    color_outline: "Outline",
    color_bg_a: "Background",
    color_bg_b: "Gradient color",
    btn_reset_colors: "Reset colors",
    bg_label: "Image background",
    bg_transparent: "Transparent",
    bg_solid: "Solid",
    bg_gradient: "Gradient",
    scale_label: "Resolution",
    width_label: "Box width",
    width_fixed: "Fixed (200 px)",
    width_vanilla: "Vanilla (160 px)",
    width_auto: "Automatic",
    padding_label: "Margin around box",
    caption_rendered: "Rendered at {scale}x pixel scale ({width}x{height} PNG) - ready for thumbnails, Discord and overlays.",
    shadow_toggle: "Minecraft text shadow",
    preset_upgrade: "Getting an Upgrade",
    preset_welcome: "Welcome!",
    btn_download: "Download PNG",
    btn_copy: "Copy image",
    preview_title: "Preview",
    preview_size: "Image size",
    preview_hint: "Tip: the box grows with your text. Use 4x or 8x for thumbnails.",
    footer_description: "Free Minecraft tools for the community. Made by players for players.",
    footer_tools: "Tools",
    footer_more_tools: "More tools",
    footer_legal: "Legal",
    footer_impressum: "Imprint",
    footer_privacy: "Privacy",
    footer_terms: "Terms of use",
    footer_copyright: "Copyright",
    footer_about: "About us",
    footer_history: "MC-Craft history",
    footer_team: "Our team",
    footer_about_us: "About us",
    footer_support: "Support",
    footer_faq: "FAQ & help",
    footer_bug: "Report a bug",
    footer_support_contact: "Support contact",
    footer_rights: "All rights reserved.",
    footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not affiliated with Mojang or Microsoft.",
    footer_version: "Version 1.0.0",
    footer_changelog: "Changelog",
    skins_library_title: "Skin gallery",
    capes_db_title: "Cape gallery",
    toast_loaded_title: "Ready",
    toast_loaded_message: "Advancement generator loaded.",
    toast_theme_title: "Theme",
    toast_theme_to: "Theme switched to {theme}.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound is on.",
    toast_sound_off: "Sound is off.",
    toast_language_title: "Language",
    toast_language_de: "Language set to German.",
    toast_language_en: "Language set to English.",
    toast_downloaded: "PNG saved.",
    toast_copied: "Image copied to clipboard.",
    toast_copy_failed: "Copying failed. Use the download instead.",
    toast_export_failed: "External icon blocks the export. Upload the image instead.",
    toast_colors_reset: "Colors reset.",
    toast_icon_failed: "Image could not be loaded.",
    toast_error_title: "Error"
};

const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const frameGrid = document.getElementById('frameGrid');
const line1Input = document.getElementById('line1Input');
const line2Input = document.getElementById('line2Input');
const line3Input = document.getElementById('line3Input');
const line3Toggle = document.getElementById('line3Toggle');
const line4Input = document.getElementById('line4Input');
const line4Toggle = document.getElementById('line4Toggle');
const line3Row = document.getElementById('line3Row');
const line4Row = document.getElementById('line4Row');
const styleGrid = document.getElementById('styleGrid');
const line1Count = document.getElementById('line1Count');
const line2Count = document.getElementById('line2Count');
const line3Count = document.getElementById('line3Count');
const line4Count = document.getElementById('line4Count');
const iconGroupTabs = document.getElementById('iconGroupTabs');
const iconSubTabs = document.getElementById('iconSubTabs');
const iconSearch = document.getElementById('iconSearch');
const iconGrid = document.getElementById('iconGrid');
const iconGridState = document.getElementById('iconGridState');
const iconUploadBtn = document.getElementById('iconUploadBtn');
const iconUrlBtn = document.getElementById('iconUrlBtn');
const iconClearBtn = document.getElementById('iconClearBtn');
const iconFile = document.getElementById('iconFile');
const colorSettings = document.getElementById('colorSettings');
const customColorsToggle = document.getElementById('customColorsToggle');
const colorLine1 = document.getElementById('colorLine1');
const colorLine2 = document.getElementById('colorLine2');
const colorLine3 = document.getElementById('colorLine3');
const colorLine4 = document.getElementById('colorLine4');
const colorFill = document.getElementById('colorFill');
const colorBorder = document.getElementById('colorBorder');
const colorOutline = document.getElementById('colorOutline');
const colorBgA = document.getElementById('colorBgA');
const colorBgB = document.getElementById('colorBgB');
const resetColorsBtn = document.getElementById('resetColorsBtn');
const bgSelect = document.getElementById('bgSelect');
const scaleSelect = document.getElementById('scaleSelect');
const widthSelect = document.getElementById('widthSelect');
const paddingSelect = document.getElementById('paddingSelect');
const previewStage = document.getElementById('previewStage');
const shadowToggle = document.getElementById('shadowToggle');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const canvas = document.getElementById('advCanvas');
const sizeInfo = document.getElementById('sizeInfo');
const toastContainer = document.getElementById('toastContainer');
const loader = document.getElementById('loader');
const header = document.querySelector('.header');

const ctx = canvas ? canvas.getContext('2d') : null;
const measureCanvas = document.createElement('canvas');
const measureCtx = measureCanvas.getContext('2d');

/* ---------------------------------------------------------------------------
   Toast-Geometrie (aus der Vanilla-Textur toast_background.png, 160x32)
   Aufbau: 1px Außenlinie, 2px Rahmen, Füllung, Ecken um 2px abgerundet.
--------------------------------------------------------------------------- */

const TOAST_MIN_WIDTH = 160;
const LINE_HEIGHT = 11;
const FIRST_LINE_CENTER = 11;
const ICON_X = 8;
const ICON_SIZE = 16;
const TEXT_X = 30;
const TEXT_RIGHT_PADDING = 8;

const TEXTURE_BASE = '/assets/img/textures/gui/advancement/';
const qrMobImageBasePath = '/assets/img/qrcode/mobs';

const boxStyles = [
    {
        key: 'toast-dark', file: 'advancement.png', slice: 6,
        name: { de: 'Toast dunkel', en: 'Toast dark' },
        map: { '#000000': 'outline', '#555555': 'border', '#212121': 'fill' }
    },
    {
        key: 'toast-light', file: 'tutorial.png', slice: 6, 
        name: { de: 'Toast hell', en: 'Toast light' },
        map: { '#000000': 'outline', '#aaaaaa': 'border', '#dedede': 'fill' }
    },
    {
        key: 'toast-blue', file: '5.png', slice: 6, 
        name: { de: 'Tutorial blau', en: 'Tutorial blue' },
        map: { '#000000': 'outline', '#286485': 'border', '#082c4c': 'fill' }
    },
    {
        key: 'toast-system', file: 'system.png', slice: 6,
        name: { de: 'System (blau)', en: 'System (blue)' },
        map: { '#000000': 'outline', '#286485': 'border', '#082c4c': 'fill' }
    },
    {
        key: 'box-dark', file: 'title_box.png', slice: 3, 
        name: { de: 'Leiste dunkel', en: 'Bar dark' },
        map: { '#000000': 'outline', '#555555': 'border', '#212121': 'fill' }
    },
    {
        key: 'box-gold', file: 'box_obtained.png', slice: 3, 
        name: { de: 'Leiste Gold', en: 'Bar gold' },
        map: { '#000000': 'outline', '#dba213': 'border', '#b98f2c': 'fill', '#493606': 'shade' }
    },
    {
        key: 'box-blue', file: 'box_unobtained.png', slice: 3, 
        name: { de: 'Leiste Blau', en: 'Bar blue' },
        map: { '#000000': 'outline', '#0489c1': 'border', '#036a96': 'fill', '#012e40': 'shade' }
    },
    {
        key: 'box-teal', file: '20.png', slice: 3, 
        name: { de: 'Leiste Türkis', en: 'Bar teal' },
        map: { '#000000': 'outline', '#57ffe1': 'border', '#0d4039': 'fill' }
    },
    {
        key: 'box-purple', file: '18.png', slice: 3, 
        name: { de: 'Leiste Lila', en: 'Bar purple' },
        map: { '#b88bf8': 'border', '#000000': 'fill' }
    },
    {
        key: 'box-night', file: '19.png', slice: 3, 
        name: { de: 'Leiste Nacht', en: 'Bar night' },
        map: { '#57ffe1': 'border', '#000000': 'fill' }
    },
    {
        key: 'box-alt-16', file: '16.png', slice: 3, recolor: false, 
        name: { de: 'Leiste (unbekannt 16)', en: 'Bar (unknown 16)' }
    },
    {
        key: 'box-alt-21', file: '21.png', slice: 3, recolor: false,
        name: { de: 'Leiste (unbekannt 21)', en: 'Bar (unknown 21)' }
    },
    {
        key: 'box-mystery-6', file: '6.png', slice: 3, recolor: false,
        name: { de: 'Leiste (unbekannt 6)', en: 'Bar (unknown 6)' }
    },
    {
        key: 'panel-light', file: 'background.png', slice: 8, recolor: false,
        name: { de: 'GUI hell', en: 'GUI light' },
        map: { '#000000': 'outline', '#ffffff': 'light', '#c6c6c6': 'border', '#555555': 'shade', '#373737': 'fill' }
    },
    {
        key: 'panel-dark', file: 'background_dark.png', slice: 8, recolor: false,
        name: { de: 'GUI dunkel', en: 'GUI dark' },
        map: { '#000000': 'outline', '#c6c6c6': 'light', '#555555': 'border', '#303030': 'fill', '#222222': 'shade' }
    },
    {
        key: 'button-gray', file: 'button.png', slice: 3, recolor: false, 
        name: { de: 'Button grau', en: 'Button gray' },
        map: { '#000000': 'outline', '#6f6f6f': 'fill' }
    },
    {
        key: 'button-light', file: 'button_highlighted.png', slice: 3, recolor: false, 
        name: { de: 'Button hell', en: 'Button light' },
        map: { '#ffffff': 'outline', '#757575': 'fill' }
    },
    {
        key: 'button-disabled', file: 'button_disabled.png', slice: 3, recolor: false, 
        name: { de: 'Button deaktiviert', en: 'Button disabled' }
    },
    {
        key: 'enchant-tan', file: 'enchantment_slot.png', slice: 3, recolor: false, 
        name: { de: 'Zauber-Slot', en: 'Enchant slot' },
        map: { '#544c3b': 'outline', '#a09172': 'fill' }
    },
    {
        key: 'enchant-pink', file: 'enchantment_slot_highlighted.png', slice: 3, recolor: false, 
        name: { de: 'Zauber-Slot pink', en: 'Enchant slot pink' },
        map: { '#654c61': 'outline', '#b688ae': 'fill' }
    },
    {
        key: 'enchant-tan-disabled', file: 'enchantment_slot_disabled.png', slice: 3, recolor: false,
        name: { de: 'Zauber-Slot deaktiviert', en: 'Enchant slot disabled' }
    }
];

const textureCache = new Map();
const frameCanvas = document.createElement('canvas');
const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });

const framePresets = {
    achievement: { line1: 'Achievement Get!', line1Color: '#ffff55' },
    advancement: { line1: 'Advancement Made!', line1Color: '#54fc54' },
    challenge: { line1: 'Challenge Complete!', line1Color: '#ff55ff' },
    goal: { line1: 'Goal Reached!', line1Color: '#ffff55' }
};

const baseColors = {
    line2: '#ffffff',
    line3: '#aaaaaa',
    line4: '#817e7e',
    fill: '#212121',
    border: '#555555',
    outline: '#000000',
    bgA: '#0f2a16',
    bgB: '#050b08'
};

const state = {
    frame: 'advancement',
    style: 'toast-dark',
    line1: 'Advancement Made!',
    line2: 'Getting an Upgrade',
    line3: 'mc-craft.com',
    line3Enabled: false,
    line4: '=D',
    line4Enabled: false,
    iconSrc: '',
    iconKey: '',
    iconGroup: 'all',
    iconCategory: 'all',
    scale: 4,
    widthMode: '200',
    padding: 0,
    background: 'transparent',
    shadow: true
};

const customColors = {
    enabled: false,
    line1: framePresets.advancement.line1Color,
    line2: baseColors.line2,
    line3: baseColors.line3,
    line4: baseColors.line4,
    fill: baseColors.fill,
    border: baseColors.border,
    outline: baseColors.outline,
    bgA: baseColors.bgA,
    bgB: baseColors.bgB
};

let iconImage = null;
let iconCleared = false;
let iconCatalog = [];
let catalogLoadId = 0;
let fontReady = false;

const itemCatalogFiles = [
    { category: 'building', file: 'building.json' },
    { category: 'color', file: 'color.json' },
    { category: 'nature', file: 'nature.json' },
    { category: 'utility', file: 'utility.json' },
    { category: 'redstone', file: 'redstone.json' },
    { category: 'tools', file: 'tools.json' },
    { category: 'combat', file: 'combat.json' },
    { category: 'food', file: 'food.json' },
    { category: 'materials', file: 'materials.json' },
    { category: 'spawn', file: 'spawneggs.json' },
    { category: 'gamemode', file: 'gamemod.json' }
];

const qrMobFaceFiles = new Set([
    'allay', 'armadillo', 'axolotl', 'bat', 'bee', 'blaze', 'bogged', 'breeze', 'camel_husk', 'camel',
    'cat', 'cave_spider', 'chicken', 'chicken_jockey', 'cod', 'copper_golem', 'cow', 'creaking', 'creeper', 'dolphin', 'donkey',
    'drowned', 'elder_guardian_ghost', 'ender_dragon', 'enderman', 'endermite', 'evoker', 'fox', 'frog', 'ghast',
    'giant', 'glow_squid', 'goat', 'guardian', 'happy_ghast', 'hoglin', 'horse', 'husk', 'illusioner', 'iron_golem',
    'llama', 'magma_cube', 'mooshroom', 'mule', 'nautilus', 'ocelot', 'panda', 'parched', 'parrot', 'phantom',
    'piglin_brute', 'piglin', 'pig', 'pillager', 'player', 'polar_bear', 'pufferfish', 'rabbit', 'ravager',
    'salmon', 'sheep', 'shulker', 'silverfish', 'skeleton_horse', 'skeleton', 'skeleton_horseman', 'slime', 'sniffer', 'snow_golem',
    'spider', 'spider_jockey', 'squid', 'stray', 'strider', 'sulfur_cube', 'tadpole', 'trader_llama', 'tropical_fish', 'turtle',
    'vex', 'villager', 'vindicator', 'wandering_trader', 'warden', 'witch', 'wither', 'wither_skeleton', 'wolf',
    'zoglin', 'zombie_horse', 'zombie_nautilus', 'zombie', 'zombie_villager', 'zombified_piglin', 'zombified_piglin_chicken_jockey'
]);

const heartIconFiles = [
    'absorbing_full_blinking.png', 'absorbing_full.png', 'absorbing_half_blinking.png', 'absorbing_half.png',
    'absorbing_hardcore_full_blinking.png', 'absorbing_hardcore_full.png', 'absorbing_hardcore_half_blinking.png', 'absorbing_hardcore_half.png',
    'container_blinking.png', 'container_hardcore_blinking.png', 'container_hardcore.png', 'container.png',
    'frozen_full_blinking.png', 'frozen_full.png', 'frozen_half_blinking.png', 'frozen_half.png',
    'frozen_hardcore_full_blinking.png', 'frozen_hardcore_full.png', 'frozen_hardcore_half_blinking.png', 'frozen_hardcore_half.png',
    'full_blinking.png', 'full.png', 'half_blinking.png', 'half.png',
    'hardcore_full_blinking.png', 'hardcore_full.png', 'hardcore_half_blinking.png', 'hardcore_half.png',
    'poisoned_full_blinking.png', 'poisoned_full.png', 'poisoned_half_blinking.png', 'poisoned_half.png',
    'poisoned_hardcore_full_blinking.png', 'poisoned_hardcore_full.png', 'poisoned_hardcore_half_blinking.png', 'poisoned_hardcore_half.png',
    'vehicle_container.png', 'vehicle_full.png', 'vehicle_half.png',
    'withered_full_blinking.png', 'withered_full.png', 'withered_half_blinking.png', 'withered_half.png',
    'withered_hardcore_full_blinking.png', 'withered_hardcore_full.png', 'withered_hardcore_half_blinking.png', 'withered_hardcore_half.png'
];

const dialogIconFiles = [
    '1.png', '2.png', '3.png', '4.png', '5.png', 'accept.png', 'accept2.png', 'accept_highlighted.png',
    'accessibility.png', 'bug.png', 'bug2.png', 'button.png', 'button_highlighted.png', 'cancel.png',
    'checkbox_selected.png', 'checkbox_selected_highlighted.png', 'close.png', 'cross_button.png',
    'cross_button_highlighted.png', 'draft_report.png', 'error.png', 'error_highlighted.png', 'friends.png',
    'info.png', 'info2.png', 'invite.png', 'item_broken.png', 'item_crafted.png', 'item_dropped.png',
    'item_picked_up.png', 'language.png', 'locked_button.png', 'locked_button_disabled.png',
    'locked_button_highlighted.png', 'locked_button_highlighted_blue.png', 'more.png', 'mouse.png',
    'mute_button.png', 'mute_button_highlighted.png', 'news.png', 'player_reporting.png', 'player_reporting2.png',
    'recipe_book.png', 'reject.png', 'reject_highlighted.png', 'right_click.png', 'social_interactions.png',
    'social_interactions2.png', 'unknown_pack.png', 'unlocked_button.png', 'unlocked_button_disabled.png',
    'unlocked_button_highlighted.png', 'unlocked_button_highlighted_blue.png', 'unmute_button.png',
    'unmute_button_highlighted.png', 'unseen_notification.png', 'warning.png', 'warning_button.png',
    'warning_button_disabled.png', 'warning_button_highlighted.png', 'warning_highlighted.png'
];

function labelFromIconFilename(file) {
    return file
        .replace(/\.png$/i, '')
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const mobCatalogFiles = [
    { category: 'passive', file: 'Passive_mobs.json' },
    { category: 'neutral', file: 'Neutral_mobs.json' },
    { category: 'hostile', file: 'Hostile_mobs.json' },
    { category: 'boss', file: 'Boss_mobs.json' },
    { category: 'jockey', file: 'Jockeys_mobs.json' },
    { category: 'player', file: 'Player.json' },
    { category: 'summonable', file: 'Unused_mobs.json' }
];

const itemSubCategories = [
    { key: 'building', de: 'Baublöcke', en: 'Building Blocks' },
    { key: 'color', de: 'Farbige Blöcke', en: 'Colored Blocks' },
    { key: 'nature', de: 'Naturblöcke', en: 'Nature Blocks' },
    { key: 'utility', de: 'Gebrauchsblöcke', en: 'Utility Blocks' },
    { key: 'redstone', de: 'Redstone', en: 'Redstone' },
    { key: 'tools', de: 'Werkzeuge', en: 'Tools' },
    { key: 'combat', de: 'Kampf', en: 'Combat' },
    { key: 'food', de: 'Nahrung', en: 'Food' },
    { key: 'materials', de: 'Wertstoffe', en: 'Materials' },
    { key: 'spawn', de: 'Spawner Eier', en: 'Spawn Eggs' },
    { key: 'gamemode', de: 'Operator Items', en: 'Operator Items' }
];

const mobSubCategories = [
    { key: 'passive', de: 'Passiv', en: 'Passive' },
    { key: 'neutral', de: 'Neutral', en: 'Neutral' },
    { key: 'hostile', de: 'Feindlich', en: 'Hostile' },
    { key: 'boss', de: 'Bosse', en: 'Bosses' },
    { key: 'jockey', de: 'Jockeys', en: 'Jockeys' },
    { key: 'summonable', de: 'Beschwörbar', en: 'Summonable' },
    { key: 'player', de: 'Spieler', en: 'Player' }
];


/* --------------------------------- i18n --------------------------------- */

function t(key, params = {}) {
    let text = T[key] || key;
    Object.entries(params).forEach(([name, value]) => {
        text = text.replace(`{${name}}`, value);
    });
    return text;
}

function showToast(title, message, type = 'info') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-check'}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 80);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

/* --------------------------------- Sound -------------------------------- */

function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.25;
        levelUpSound.preload = 'auto';
    } catch (_) {}
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    levelUpSound.currentTime = 0;
    levelUpSound.volume = 0.25;
    levelUpSound.play().catch(() => {});
}

function playClickSound() {
    if (!soundEnabled) return;

    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const last = window.__mcCraftLastClickSoundAt || 0;
    if (now - last < 120) return;
    window.__mcCraftLastClickSoundAt = now;

    try {
        const audioCtx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());

        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                window.__mcCraftLastClickSoundAt = 0;
                playClickSound();
            }).catch(() => {});
            return;
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        osc.start();
        setTimeout(() => osc.stop(), 100);
    } catch (e) {}
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    ['soundIcon', 'mobileSoundIcon'].forEach((id) => {
        const icon = document.getElementById(id);
        if (icon) icon.src = src;
    });
}

/* --------------------------------- Theme -------------------------------- */

function getThemeName(theme) {
    if (theme === 'nether') return t('theme_nether');
    if (theme === 'end') return t('theme_end');
    return t('theme_overworld');
}

function initTheme() {
    const theme = localStorage.getItem('mc-craft-theme') || 'overworld';
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    showToast(t('toast_theme_title'), t('toast_theme_to', { theme: getThemeName(theme) }));
}

function initThemeSwitcher() {
    if (themeBtn && themeDropdown) {
        themeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            themeDropdown.classList.toggle('show');
            playClickSound();
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.theme-switcher')) {
                themeDropdown.classList.remove('show');
            }
        });

        document.querySelectorAll('.theme-option').forEach((option) => {
            option.addEventListener('click', () => {
                setTheme(option.dataset.theme);
                themeDropdown.classList.remove('show');
                playClickSound();
            });
        });
    }

    document.querySelectorAll('.theme-option-btn').forEach((option) => {
        option.addEventListener('click', () => {
            setTheme(option.dataset.theme);
            playClickSound();
        });
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('closeBtn');

    if (!mobileMenuBtn || !mobileNav || !closeBtn) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('show');
        document.body.style.overflow = 'hidden';
        playClickSound();
    });

    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
        playClickSound();
    });

    mobileNav.addEventListener('click', (event) => {
        if (event.target === mobileNav) {
            mobileNav.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    mobileNav.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
}

function initTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop && !header) return;

    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 30);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
}

function initSound() {
    const toggleSound = () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('mc-craft-sound', String(soundEnabled));
        updateSoundIcon();
        playClickSound();
        showToast(t('toast_sound_title'), soundEnabled ? t('toast_sound_on') : t('toast_sound_off'));
    };

    ['soundBtn', 'mobileSoundBtn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', toggleSound);
    });
}

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

    if (!loader) return;

    let progress = 0;
    const loadingText = loader.querySelector('.loading-text');
    const texts = [t('loader_text'), t('loader_text2'), t('loader_text3'), t('loader_text4'), t('loader_text5')];
    let index = 0;

    const progressInterval = window.setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            window.clearInterval(progressInterval);
            window.setTimeout(() => {
                loader.classList.add('hidden');
                window.setTimeout(() => {
                    loader.style.display = 'none';
                    showToast(t('toast_loaded_title'), t('toast_loaded_message'));
                    playLevelUpSound();
                }, 150);
            }, 300);
            return;
        }

        if (loadingText && index < texts.length - 1) {
            index += 1;
            loadingText.textContent = texts[index];
        }
    }, 120);
}

/* ------------------------------ Icon-Katalog ---------------------------- */

async function loadJsonArray(url) {
    try {
        const res = await fetch(`${url}?v=${Date.now()}`);
        const data = res.ok ? await res.json() : [];
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error(`Fehler beim Laden: ${url}`, err);
        return [];
    }
}

function getMobKeyFromId(id) {
    return String(id || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function bareMobId(id) {
    return getMobKeyFromId(String(id || '').replace(/^minecraft:/i, ''));
}

async function loadIconCatalog() {
    const loadId = ++catalogLoadId;

    const langPrefix = 'en_';
    const entries = [];
    const seen = new Set();

    for (const file of itemCatalogFiles) {
        const list = await loadJsonArray(`/assets/JS/items/${langPrefix}${file.file}`);
        if (loadId !== catalogLoadId) return;

        (Array.isArray(list) ? list : []).forEach((entry) => {
            const id = String(entry?.id || '').trim();
            const name = String(entry?.name || '').trim();
            const icon = String(entry?.icon || '').trim();
            if (!id || !name || !icon) return;
            const dedupeKey = `${file.category}::${id}::${icon}::${name}`;
            if (seen.has(dedupeKey)) return;
            seen.add(dedupeKey);
            const key = `item_${getMobKeyFromId(id)}_${getMobKeyFromId(icon)}_${getMobKeyFromId(name)}_${file.category}`;
            entries.push({ key, id, name, icon, group: 'item', category: file.category });
        });
    }

    for (const file of mobCatalogFiles) {
        const list = await loadJsonArray(`/assets/JS/mobs/${langPrefix}${file.file}`);
        if (loadId !== catalogLoadId) return;

        (Array.isArray(list) ? list : []).forEach((entry) => {
            const id = String(entry?.id || '').trim();
            const name = String(entry?.name || '').trim();
            if (!id || !name) return;
            const baseKey = `mob_${getMobKeyFromId(id)}`;
            if (seen.has(baseKey)) return;
            seen.add(baseKey);

            const face = bareMobId(id);
            const faceIcon = qrMobFaceFiles.has(face) ? `${qrMobImageBasePath}/${face}.png` : '';
            const bodyIcon = String(entry?.icon || '').trim();

            if (faceIcon && bodyIcon && faceIcon !== bodyIcon) {
                entries.push({ key: `${baseKey}_face`, name: `${name} (${t('mob_variant_face')})`, icon: faceIcon, fallbackIcon: bodyIcon, group: 'mob', category: file.category });
                entries.push({ key: `${baseKey}_body`, name: `${name} (${t('mob_variant_body')})`, icon: bodyIcon, fallbackIcon: faceIcon, group: 'mob', category: file.category });
            } else {
                const icon = faceIcon || bodyIcon || `${qrMobImageBasePath}/${face}.png`;
                entries.push({ key: baseKey, name, icon, group: 'mob', category: file.category });
            }
        });
    }

    const heartGroupLabel = t('icon_group_heart');
    heartIconFiles.forEach((file) => {
        const key = `heart_${file.replace(/\.png$/i, '')}`;
        if (seen.has(key)) return;
        seen.add(key);
        entries.push({ key, name: `${heartGroupLabel} – ${labelFromIconFilename(file)}`, icon: `${TEXTURE_BASE}heart/${file}`, group: 'heart' });
    });

    const dialogGroupLabel = t('icon_group_dialog');
    dialogIconFiles.forEach((file) => {
        const key = `dialog_${file.replace(/\.png$/i, '')}`;
        if (seen.has(key)) return;
        seen.add(key);
        entries.push({ key, name: `${dialogGroupLabel} – ${labelFromIconFilename(file)}`, icon: `${TEXTURE_BASE}dialogs/${file}`, group: 'dialog' });
    });

    iconCatalog = entries;
    updateIconGroupTabCounts();
    renderIconSubTabs();
    renderIconGrid();
}

function dedupeItemEntries(list) {
    const seen = new Set();
    return list.filter((entry) => {
        if (entry.group !== 'item') return true;
        const identity = `${entry.id}::${entry.icon}::${entry.name}`;
        if (seen.has(identity)) return false;
        seen.add(identity);
        return true;
    });
}

function updateIconGroupTabCounts() {
    iconGroupTabs?.querySelectorAll('.icon-group-tab').forEach((tab) => {
        const group = tab.dataset.group;
        const list = group === 'all' ? iconCatalog : iconCatalog.filter((entry) => entry.group === group);
        const count = dedupeItemEntries(list).length;
        const label = t(`icon_tab_${group === 'item' ? 'items' : group === 'mob' ? 'mobs' : group === 'heart' ? 'hearts' : group === 'dialog' ? 'dialogs' : 'all'}`);
        tab.textContent = `${label} (${count})`;
    });
}

function renderIconSubTabs() {
    if (!iconSubTabs) return;
    iconSubTabs.innerHTML = '';

    const list = state.iconGroup === 'item' ? itemSubCategories : state.iconGroup === 'mob' ? mobSubCategories : null;
    if (!list) {
        iconSubTabs.style.display = 'none';
        return;
    }
    iconSubTabs.style.display = 'flex';

    const groupEntries = iconCatalog.filter((entry) => entry.group === state.iconGroup);

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `icon-sub-tab${state.iconCategory === 'all' ? ' active' : ''}`;
    allBtn.dataset.category = 'all';
    allBtn.textContent = `${t('icon_tab_all')} (${dedupeItemEntries(groupEntries).length})`;
    iconSubTabs.appendChild(allBtn);

    list.forEach((sub) => {
        const count = groupEntries.filter((entry) => entry.category === sub.key).length;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `icon-sub-tab${state.iconCategory === sub.key ? ' active' : ''}`;
        btn.dataset.category = sub.key;
        btn.textContent = `${sub.en || sub.de} (${count})`;
        iconSubTabs.appendChild(btn);
    });

    iconSubTabs.querySelectorAll('.icon-sub-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
            state.iconCategory = btn.dataset.category;
            iconSubTabs.querySelectorAll('.icon-sub-tab').forEach((b) => b.classList.toggle('active', b === btn));
            renderIconGrid();
            playClickSound();
        });
    });
}

function renderIconGrid() {
    if (!iconGrid) return;

    const query = (iconSearch?.value || '').trim().toLowerCase();
    iconGrid.innerHTML = '';

    if (!iconCatalog.length) {
        const info = document.createElement('p');
        info.className = 'icon-grid-state';
        info.textContent = t('icon_failed');
        iconGrid.appendChild(info);
        return;
    }

    const byGroup = state.iconGroup === 'all'
        ? iconCatalog
        : iconCatalog.filter((entry) => entry.group === state.iconGroup);

    const byCategory = (state.iconGroup === 'item' || state.iconGroup === 'mob') && state.iconCategory !== 'all'
        ? byGroup.filter((entry) => entry.category === state.iconCategory)
        : dedupeItemEntries(byGroup);

    const filtered = query
        ? byCategory.filter((entry) => entry.name.toLowerCase().includes(query) || entry.key.includes(query))
        : byCategory;

    if (!filtered.length) {
        const info = document.createElement('p');
        info.className = 'icon-grid-state';
        info.textContent = t('icon_empty');
        iconGrid.appendChild(info);
        return;
    }

    filtered.forEach((entry) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `icon-btn${state.iconKey === entry.key ? ' active' : ''}`;
        button.title = entry.name;
        button.dataset.key = entry.key;

        const img = document.createElement('img');
        img.src = entry.icon;
        img.alt = entry.name;
        img.loading = 'lazy';

        let resolvedIcon = entry.icon;
        let triedFallback = false;
        img.addEventListener('error', () => {
            if (!triedFallback && entry.fallbackIcon) {
                triedFallback = true;
                resolvedIcon = entry.fallbackIcon;
                img.src = entry.fallbackIcon;
            } else {
                button.remove();
            }
        });

        button.appendChild(img);
        button.addEventListener('click', () => {
            selectIcon(resolvedIcon, entry.key);
            playClickSound();
        });

        iconGrid.appendChild(button);
    });

    if (!state.iconSrc && !iconCleared && filtered.length) {
        selectIcon(filtered[0].icon, filtered[0].key);
    }
}

function markActiveIcon() {
    iconGrid?.querySelectorAll('.icon-btn').forEach((button) => {
        button.classList.toggle('active', button.dataset.key === state.iconKey);
    });
}

function selectIcon(src, key = '') {
    state.iconSrc = src;
    state.iconKey = key;
    iconCleared = !src;
    markActiveIcon();

    if (!src) {
        iconImage = null;
        draw();
        return;
    }

    const img = new Image();
    img.decoding = 'async';
    if (/^https?:\/\//i.test(src) && !src.startsWith(window.location.origin)) {
        img.crossOrigin = 'anonymous';
    }
    img.addEventListener('load', () => {
        iconImage = img;
        draw();
    }, { once: true });
    img.addEventListener('error', () => {
        if (iconImage === img) iconImage = null;
        showToast(t('toast_error_title'), t('toast_icon_failed'), 'error');
    }, { once: true });
    img.src = src;
}

/* -------------------------------- Farben -------------------------------- */

function activeColors() {
    const preset = framePresets[state.frame] || framePresets.advancement;
    if (customColors.enabled) {
        return {
            line1: customColors.line1,
            line2: customColors.line2,
            line3: customColors.line3,
            line4: customColors.line4,
            fill: customColors.fill,
            border: customColors.border,
            outline: customColors.outline,
            bgA: customColors.bgA,
            bgB: customColors.bgB
        };
    }
    return {
        line1: preset.line1Color,
        line2: baseColors.line2,
        line3: baseColors.line3,
        line4: baseColors.line4,
        fill: baseColors.fill,
        border: baseColors.border,
        outline: baseColors.outline,
        bgA: baseColors.bgA,
        bgB: baseColors.bgB
    };
}

function syncColorInputsFromPreset() {
    const preset = framePresets[state.frame] || framePresets.advancement;
    customColors.line1 = preset.line1Color;
    customColors.line2 = baseColors.line2;
    customColors.line3 = baseColors.line3;
    customColors.line4 = baseColors.line4;
    customColors.fill = baseColors.fill;
    customColors.border = baseColors.border;
    customColors.outline = baseColors.outline;
    customColors.bgA = baseColors.bgA;
    customColors.bgB = baseColors.bgB;

    if (colorLine1) colorLine1.value = customColors.line1;
    if (colorLine2) colorLine2.value = customColors.line2;
    if (colorLine3) colorLine3.value = customColors.line3;
    if (colorLine4) colorLine4.value = customColors.line4;
    if (colorFill) colorFill.value = customColors.fill;
    if (colorBorder) colorBorder.value = customColors.border;
    if (colorOutline) colorOutline.value = customColors.outline;
    if (colorBgA) colorBgA.value = customColors.bgA;
    if (colorBgB) colorBgB.value = customColors.bgB;
}

function updateColorSettingsUi() {
    if (!colorSettings) return;
    colorSettings.classList.toggle('disabled', !customColors.enabled);
}

function initColorControls() {
    if (customColorsToggle) {
        customColorsToggle.checked = customColors.enabled;
        customColorsToggle.addEventListener('change', () => {
            customColors.enabled = customColorsToggle.checked;
            if (customColors.enabled) syncColorInputsFromPreset();
            updateColorSettingsUi();
            draw();
            playClickSound();
        });
    }

    const bindings = [
        [colorLine1, 'line1'],
        [colorLine2, 'line2'],
        [colorLine3, 'line3'],
        [colorLine4, 'line4'],
        [colorFill, 'fill'],
        [colorBorder, 'border'],
        [colorOutline, 'outline'],
        [colorBgA, 'bgA'],
        [colorBgB, 'bgB']
    ];

    bindings.forEach(([input, key]) => {
        if (!input) return;
        input.addEventListener('input', () => {
            customColors[key] = input.value;
            if (!customColors.enabled && customColorsToggle) {
                customColors.enabled = true;
                customColorsToggle.checked = true;
                updateColorSettingsUi();
            }
            draw();
        });
    });

    if (resetColorsBtn) {
        resetColorsBtn.addEventListener('click', () => {
            syncColorInputsFromPreset();
            draw();
            playClickSound();
            showToast(t('btn_reset_colors'), t('toast_colors_reset'));
        });
    }

    updateColorSettingsUi();
}

/* ------------------------------- Rendering ------------------------------ */

function currentStyle() {
    return boxStyles.find((entry) => entry.key === state.style) || boxStyles[0];
}

function loadTexture(style) {
    if (textureCache.has(style.key)) return textureCache.get(style.key);

    const image = new Image();
    image.decoding = 'async';
    const record = { image, ready: false, failed: false };
    image.addEventListener('load', () => {
        record.ready = true;
        draw();
    }, { once: true });
    image.addEventListener('error', () => {
        record.failed = true;
        draw();
    }, { once: true });
    image.src = `${TEXTURE_BASE}${style.file}`;

    textureCache.set(style.key, record);
    return record;
}

function hexToRgb(hex) {
    const clean = String(hex || '#000000').replace('#', '');
    const full = clean.length === 3 ? clean.replace(/./g, (c) => c + c) : clean;
    const value = parseInt(full, 16);
    if (Number.isNaN(value)) return [0, 0, 0];
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function mixTowardsWhite(hex, amount) {
    const [r, g, b] = hexToRgb(hex);
    return [
        Math.round(r + (255 - r) * amount),
        Math.round(g + (255 - g) * amount),
        Math.round(b + (255 - b) * amount)
    ];
}

function darken(hex, factor) {
    const [r, g, b] = hexToRgb(hex);
    return [Math.round(r * factor), Math.round(g * factor), Math.round(b * factor)];
}

function roleColors(colors) {
    return {
        outline: hexToRgb(colors.outline),
        border: hexToRgb(colors.border),
        fill: hexToRgb(colors.fill),
        light: mixTowardsWhite(colors.border, 0.45),
        shade: darken(colors.border, 0.4)
    };
}

// Zeichnet die Textur als 9-Slice in der gewuenschten Groesse (logische Pixel).
function drawNineSlice(target, image, slice, width, height) {
    const sw = image.naturalWidth;
    const sh = image.naturalHeight;
    const l = Math.min(slice, Math.floor(sw / 2), Math.floor(width / 2));
    const tp = Math.min(slice, Math.floor(sh / 2), Math.floor(height / 2));
    const midSrcW = Math.max(1, sw - l * 2);
    const midSrcH = Math.max(1, sh - tp * 2);
    const midW = Math.max(0, width - l * 2);
    const midH = Math.max(0, height - tp * 2);

    target.drawImage(image, 0, 0, l, tp, 0, 0, l, tp);
    target.drawImage(image, sw - l, 0, l, tp, width - l, 0, l, tp);
    target.drawImage(image, 0, sh - tp, l, tp, 0, height - tp, l, tp);
    target.drawImage(image, sw - l, sh - tp, l, tp, width - l, height - tp, l, tp);

    if (midW > 0) {
        target.drawImage(image, l, 0, midSrcW, tp, l, 0, midW, tp);
        target.drawImage(image, l, sh - tp, midSrcW, tp, l, height - tp, midW, tp);
    }
    if (midH > 0) {
        target.drawImage(image, 0, tp, l, midSrcH, 0, tp, l, midH);
        target.drawImage(image, sw - l, tp, l, midSrcH, width - l, tp, l, midH);
    }
    if (midW > 0 && midH > 0) {
        target.drawImage(image, l, tp, midSrcW, midSrcH, l, tp, midW, midH);
    }
}

function recolorTexture(style, width, height, colors) {
    const roles = roleColors(colors);
    const lookup = new Map();
    Object.entries(style.map || {}).forEach(([hex, role]) => {
        const [r, g, b] = hexToRgb(hex);
        if (roles[role]) lookup.set(`${r},${g},${b}`, roles[role]);
    });
    if (!lookup.size) return;

    const data = frameCtx.getImageData(0, 0, width, height);
    const pixels = data.data;
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) continue;
        const target = lookup.get(`${pixels[i]},${pixels[i + 1]},${pixels[i + 2]}`);
        if (!target) continue;
        pixels[i] = target[0];
        pixels[i + 1] = target[1];
        pixels[i + 2] = target[2];
    }
    frameCtx.putImageData(data, 0, 0);
}

function colorForRole(style, role, colors) {
    const entry = Object.entries(style.map || {}).find(([, value]) => value === role);
    if (customColors.enabled && style.recolor !== false) return colors[role] || entry?.[0] || '#000000';
    return entry ? entry[0] : (colors[role] || '#000000');
}

// Fallback, solange die Textur noch nicht da ist: Box pixelgenau nachzeichnen.
function drawFallbackBox(x, y, width, height, style, colors, scale) {
    drawPixelBox(x, y, width, height, colorForRole(style, 'outline', colors), [2, 1], scale);
    drawPixelBox(x + 1, y + 1, width - 2, height - 2, colorForRole(style, 'border', colors), [1, 0], scale);
    drawPixelBox(x + 3, y + 3, width - 6, height - 6, colorForRole(style, 'fill', colors), [1, 0], scale);
}

function drawStyledBox(x, y, width, height, style, colors, scale) {
    const texture = loadTexture(style);

    if (!texture.ready || texture.failed || !texture.image.naturalWidth) {
        drawFallbackBox(x, y, width, height, style, colors, scale);
        return;
    }

    frameCanvas.width = width;
    frameCanvas.height = height;
    frameCtx.imageSmoothingEnabled = false;
    frameCtx.clearRect(0, 0, width, height);
    drawNineSlice(frameCtx, texture.image, style.slice, width, height);

    if (customColors.enabled && style.recolor !== false) {
        recolorTexture(style, width, height, colors);
    }

    ctx.drawImage(frameCanvas, 0, 0, width, height, x * scale, y * scale, width * scale, height * scale);
}

function shadowColorOf(hex) {
    const clean = String(hex || '#ffffff').replace('#', '');
    const value = parseInt(clean.length === 3 ? clean.replace(/./g, (c) => c + c) : clean, 16);
    if (Number.isNaN(value)) return '#3f3f3f';
    const r = ((value >> 16) & 0xfc) >> 2;
    const g = ((value >> 8) & 0xfc) >> 2;
    const b = (value & 0xfc) >> 2;
    return `rgb(${r}, ${g}, ${b})`;
}

// Zeichnet eine pixelgenaue Box mit abgetreppten Ecken.
// insets: Einrückung je Zeile von oben (unten gespiegelt).
function drawPixelBox(x, y, width, height, color, insets, scale) {
    ctx.fillStyle = color;
    for (let row = 0; row < height; row += 1) {
        const distance = Math.min(row, height - 1 - row);
        const inset = distance < insets.length ? insets[distance] : 0;
        const lineWidth = width - inset * 2;
        if (lineWidth <= 0) continue;
        ctx.fillRect((x + inset) * scale, (y + row) * scale, lineWidth * scale, scale);
    }
}

function drawMinecraftText(text, x, centerY, color, scale) {
    if (!text) return;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    if (state.shadow) {
        ctx.fillStyle = shadowColorOf(color);
        ctx.fillText(text, (x + 1) * scale, (centerY + 1) * scale);
    }

    ctx.fillStyle = color;
    ctx.fillText(text, x * scale, centerY * scale);
}

function visibleLines() {
    const lines = [state.line1, state.line2];
    if (state.line3Enabled && state.line3.trim()) lines.push(state.line3);
    if (state.line4Enabled && state.line4.trim()) lines.push(state.line4);
    return lines;
}

function draw() {
    if (!ctx) return;

    const scale = state.scale;
    const pad = state.padding;
    const colors = activeColors();
    const style = currentStyle();
    const font = `${8 * scale}px 'Minecraft', 'Minecraft-4', monospace`;
    const lines = visibleLines();
    const lineColors = [colors.line1, colors.line2, colors.line3, colors.line4];

    measureCtx.font = font;
    const textWidth = lines.reduce(
        (widest, line) => Math.max(widest, measureCtx.measureText(line).width / scale),
        0
    );

    const neededWidth = Math.ceil(TEXT_X + textWidth + TEXT_RIGHT_PADDING);
    const wishedWidth = state.widthMode === 'auto' ? TOAST_MIN_WIDTH : Number(state.widthMode) || TOAST_MIN_WIDTH;
    const boxWidth = Math.max(wishedWidth, neededWidth);
    const boxHeight = lines.length > 2 ? 44 : 32;

    const totalWidth = boxWidth + pad * 2;
    const totalHeight = boxHeight + pad * 2;

    canvas.width = totalWidth * scale;
    canvas.height = totalHeight * scale;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state.background === 'solid') {
        ctx.fillStyle = colors.bgA;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (state.background === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, colors.bgA);
        gradient.addColorStop(1, colors.bgB);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawStyledBox(pad, pad, boxWidth, boxHeight, style, colors, scale);

    if (iconImage && iconImage.complete && iconImage.naturalWidth) {
        const iconY = Math.round((boxHeight - ICON_SIZE) / 2);
        ctx.drawImage(
            iconImage,
            (pad + ICON_X) * scale,
            (pad + iconY) * scale,
            ICON_SIZE * scale,
            ICON_SIZE * scale
        );
    }

    ctx.font = font;
    const topOffset = (boxHeight - lines.length * LINE_HEIGHT) / 2;
    lines.forEach((line, index) => {
        const centerY = topOffset + index * LINE_HEIGHT + LINE_HEIGHT / 2;
        drawMinecraftText(line, pad + TEXT_X, pad + centerY, lineColors[index] || colors.line2, scale);
    });

    if (previewStage) previewStage.classList.toggle('is-transparent', state.background === 'transparent');
    if (sizeInfo) {
        sizeInfo.textContent = t('caption_rendered', {
            scale: String(scale),
            width: String(canvas.width),
            height: String(canvas.height)
        });
    }
}

function fileNameForExport() {
    const base = (state.line2 || state.line1 || 'advancement')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40) || 'advancement';
    return `mc-${state.frame}-${base}.png`;
}

function handleDownload() {
    try {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = fileNameForExport();
        link.click();
        showToast('PNG', t('toast_downloaded'));
        playLevelUpSound();
    } catch (error) {
        showToast(t('toast_error_title'), t('toast_export_failed'), 'error');
    }
}

async function handleCopy() {
    try {
        if (!navigator.clipboard || !window.ClipboardItem) throw new Error('clipboard unavailable');
        const blob = await new Promise((resolve, reject) => {
            canvas.toBlob((result) => (result ? resolve(result) : reject(new Error('blob failed'))), 'image/png');
        });
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        showToast('PNG', t('toast_copied'));
        playClickSound();
    } catch (error) {
        showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
    }
}

/* -------------------------------- Eingaben ------------------------------ */

function updateCounters() {
    if (line1Count) line1Count.textContent = String(state.line1.length);
    if (line2Count) line2Count.textContent = String(state.line2.length);
    if (line3Count) line3Count.textContent = String(state.line3.length);
    if (line4Count) line4Count.textContent = String(state.line4.length);
}

function setFrame(frame) {
    if (!framePresets[frame]) return;
    state.frame = frame;

    frameGrid?.querySelectorAll('.frame-btn').forEach((button) => {
        button.classList.toggle('active', button.dataset.frame === frame);
    });

    state.line1 = framePresets[frame].line1;
    if (line1Input) line1Input.value = state.line1;
    if (!customColors.enabled) syncColorInputsFromPreset();

    updateCounters();
    draw();
}

function renderStyleGrid() {
    if (!styleGrid) return;
    styleGrid.innerHTML = '';

    boxStyles.forEach((style) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `style-btn${state.style === style.key ? ' active' : ''}`;
        button.dataset.style = style.key;
        button.title = style.name.en || style.name.de;

        const preview = document.createElement('img');
        preview.src = `${TEXTURE_BASE}${style.file}`;
        preview.alt = button.title;
        preview.loading = 'lazy';

        const label = document.createElement('span');
        label.textContent = button.title;

        button.append(preview, label);
        button.addEventListener('click', () => {
            state.style = style.key;
            renderStyleGrid();
            draw();
            playClickSound();
        });

        styleGrid.appendChild(button);
    });
}

function updateLine3Ui() {
    if (line3Row) line3Row.style.display = state.line3Enabled ? 'block' : 'none';
    if (line3Toggle) line3Toggle.checked = state.line3Enabled;
}

function updateLine4Ui() {
    if (line4Row) line4Row.style.display = state.line4Enabled ? 'block' : 'none';
    if (line4Toggle) line4Toggle.checked = state.line4Enabled;
}

function initInputs() {
    if (line1Input) {
        line1Input.value = state.line1;
        line1Input.addEventListener('input', () => {
            state.line1 = line1Input.value;
            updateCounters();
            draw();
        });
    }

    if (line2Input) {
        line2Input.value = state.line2;
        line2Input.addEventListener('input', () => {
            state.line2 = line2Input.value;
            updateCounters();
            draw();
        });
    }

    if (line3Input) {
        line3Input.value = state.line3;
        line3Input.addEventListener('input', () => {
            state.line3 = line3Input.value;
            updateCounters();
            draw();
        });
    }

    if (line4Input) {
        line4Input.value = state.line4;
        line4Input.addEventListener('input', () => {
            state.line4 = line4Input.value;
            updateCounters();
            draw();
        });
    }

    line3Toggle?.addEventListener('change', () => {
        state.line3Enabled = line3Toggle.checked;
        updateLine3Ui();
        draw();
        playClickSound();
    });

    line4Toggle?.addEventListener('change', () => {
        state.line4Enabled = line4Toggle.checked;
        updateLine4Ui();
        draw();
        playClickSound();
    });

    frameGrid?.querySelectorAll('.frame-btn').forEach((button) => {
        button.addEventListener('click', () => {
            setFrame(button.dataset.frame);
            playClickSound();
        });
    });

    iconGroupTabs?.querySelectorAll('.icon-group-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            state.iconGroup = tab.dataset.group;
            state.iconCategory = 'all';
            iconGroupTabs.querySelectorAll('.icon-group-tab').forEach((btn) => {
                btn.classList.toggle('active', btn === tab);
            });
            renderIconSubTabs();
            renderIconGrid();
            playClickSound();
        });
    });

    iconSearch?.addEventListener('input', () => renderIconGrid());

    iconUploadBtn?.addEventListener('click', () => iconFile?.click());

    iconFile?.addEventListener('change', () => {
        const file = iconFile.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => selectIcon(String(reader.result), 'custom_upload');
        reader.onerror = () => showToast(t('toast_error_title'), t('toast_icon_failed'), 'error');
        reader.readAsDataURL(file);
    });

    iconUrlBtn?.addEventListener('click', () => {
        const url = window.prompt(t('icon_url_prompt'), '');
        if (url && url.trim()) selectIcon(url.trim(), 'custom_url');
    });

    iconClearBtn?.addEventListener('click', () => {
        selectIcon('', '');
        playClickSound();
    });

    bgSelect?.addEventListener('change', () => {
        state.background = bgSelect.value;
        draw();
        playClickSound();
    });

    scaleSelect?.addEventListener('change', () => {
        state.scale = Number(scaleSelect.value) || 4;
        draw();
        playClickSound();
    });

    widthSelect?.addEventListener('change', () => {
        state.widthMode = widthSelect.value;
        draw();
        playClickSound();
    });

    paddingSelect?.addEventListener('change', () => {
        state.padding = Number(paddingSelect.value) || 0;
        draw();
        playClickSound();
    });

    shadowToggle?.addEventListener('change', () => {
        state.shadow = shadowToggle.checked;
        draw();
    });

    document.querySelectorAll('.preset-btn').forEach((button) => {
        button.addEventListener('click', () => {
            state.line2 = button.dataset.line2 || button.textContent.trim();
            if (line2Input) line2Input.value = state.line2;
            updateCounters();
            draw();
            playClickSound();
        });
    });

    downloadBtn?.addEventListener('click', handleDownload);
    copyBtn?.addEventListener('click', handleCopy);
}

async function waitForFont() {
    if (fontReady || !document.fonts) return;
    try {
        await document.fonts.load(`${8 * state.scale}px Minecraft`);
        await document.fonts.ready;
    } catch (_) {}
    fontReady = true;
}

window.addEventListener('DOMContentLoaded', async () => {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());

    initAudio();
    initTheme();
    initThemeSwitcher();
    initMobileMenu();
    initTopButton();
    initSound();
    initColorControls();
    initInputs();

    updateSoundIcon();
    updateCounters();
    updateLine3Ui();
    updateLine4Ui();
    renderStyleGrid();

    if (bgSelect) bgSelect.value = state.background;
    if (scaleSelect) scaleSelect.value = String(state.scale);
    if (widthSelect) widthSelect.value = state.widthMode;
    if (paddingSelect) paddingSelect.value = String(state.padding);
    if (shadowToggle) shadowToggle.checked = state.shadow;

    draw();
    await waitForFont();
    draw();

    loadIconCatalog();
    initLoader();
});