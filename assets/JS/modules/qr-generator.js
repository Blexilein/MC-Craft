let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

const translations = {
    de: {
        site_title: 'MC-Craft | QR Generator',
        site_title_short: 'MC-Craft',
        loader_text: 'QR Generator wird geladen...',
        loader_text2: 'Mob Styles werden vorbereitet...',
        loader_text3: 'Vorschau wird initialisiert...',
        loader_text4: 'Theme und Sounds werden geladen...',
        loader_text5: 'Fast fertig...',
        nav_home: 'Home',
        nav_text_converter: 'Text Konverter',
        nav_color_text: 'Farbtext',
        nav_items: 'Items Datenbank',
        nav_mobs: 'Mobs Datenbank',
        nav_server_status: 'Server Status',
        nav_skin_lookup: 'Skin Lookup',
        nav_skin_editor: 'Skin Editor',
        nav_day_night_cycle: 'Tag-Nacht-Zyklus',
        nav_end_poem: 'End Poem',
        nav_capes: 'Cape-Datenbank',
        nav_skins: 'Skin-Bibliothek',
        nav_beacon_mixer: 'Beacon Color Mixer',
        tools_dropdown: 'Werkzeuge',
        discover_dropdown: 'Entdecken',
        theme_overworld: 'Overworld',
        theme_nether: 'Nether',
        theme_end: 'The End',
        theme_select: 'Theme auswählen:',
        sound_toggle: 'Sound',
        language: 'Sprache',
        hero_badge: 'V 1.0.0 IST DA',
        hero_title: 'DEINE <span class="highlight">MINECRAFT</span> <span class="highlight">TOOLS</span><br>PLATTFORM',
        hero_desc: 'Alles, was du für dein nächstes Abenteuer brauchst. Kostenlos, schnell und immer verfügbar.',
        hero_btn: 'Zum Generator',
        hero_btn_tools: 'Alle Tools',
        hero_grid_style: 'MOB STYLES',
        hero_grid_export: 'PNG EXPORT',
        hero_grid_scan: 'SCAN READY',
        hero_grid_settings: 'FLEX SETTINGS',
        settings_title: 'Einstellungen',
        input_label: 'Text oder URL',
        input_placeholder: 'https://mc-craft.com oder dein Text hier...',
        type_label: 'Kategorie',
        type_mob: 'Mobs',
        type_item: 'Items',
        type_heart: 'Herzen',
        type_dialog: 'Dialoge',
        asset_search_placeholder: 'Mob, Item, Herz oder Dialog-Icon suchen...',
        icon_tab_all: 'Alle',
        icon_loading: 'Wird geladen...',
        icon_empty: 'Nichts gefunden.',
        icon_failed: 'Katalog nicht erreichbar.',
        icon_group_heart: 'Herz',
        icon_group_dialog: 'Dialog',
        icon_upload: 'Eigenes Bild',
        icon_url: 'Bild-URL',
        icon_url_prompt: 'Bild-URL einfügen (PNG empfohlen):',
        toast_icon_failed: 'Bild konnte nicht geladen werden.',
        mob_variant_face: 'Gesicht',
        mob_variant_body: 'Körper',
        style_label: 'Mob-Style',
        style_label_mob: 'Mob-Style',
        style_label_item: 'Item Auswahl',
        style_label_heart: 'Herz Auswahl',
        style_label_dialog: 'Dialog-Icon Auswahl',
        style_creeper: 'Creeper Face',
        style_enderman: 'Enderman Face',
        style_zombie: 'Zombie Face',
        style_pig: 'Pig Face',
        custom_colors_toggle: 'Eigene QR Farben nutzen',
        color_bg: 'Hintergrund',
        color_dark: 'QR Dunkel',
        color_finder_dark: 'Finder Rahmen',
        color_finder_center: 'Finder Mitte',
        btn_reset_colors: 'Farben zuruecksetzen',
        design_label: 'QR Design',
        design_normal: 'Normal QR',
        design_frame: 'Frame QR',
        size_label: 'Auflösung',
        ec_label: 'Fehlerkorrektur',
        ec_l: 'Niedrig (L)',
        ec_m: 'Mittel (M)',
        ec_q: 'Hoch (Q)',
        ec_h: 'Sehr hoch (H)',
        preset_website: 'Website',
        preset_motd: 'Server MOTD',
        btn_generate: 'QR generieren',
        btn_download: 'PNG Download',
        preview_title: 'Vorschau',
        preview_placeholder: 'Dein Mob-QR erscheint hier',
        preview_hint: 'Tipp: Für beste Lesbarkeit dunkle Mob-Styles mit Fehlerkorrektur H oder Q nutzen.',
        footer_description: 'Kostenlose Minecraft-Tools für die Community. Entwickelt von Spielern für Spieler.',
        footer_tools: 'Tools',
        footer_more_tools: 'Mehr Tools',
        footer_legal: 'Rechtliches',
        footer_about: 'Über Uns',
        footer_support: 'Support',
        footer_impressum: 'Impressum',
        footer_privacy: 'Datenschutz',
        footer_terms: 'Nutzungsbedingungen',
        footer_copyright: 'Copyright',
        capes_db_title: 'Cape-Datenbank',
        skins_library_title: 'Skin-Bibliothek',
        footer_history: 'MC-Craft Geschichte',
        footer_team: 'Unser Team',
        footer_about_us: 'Über uns',
        footer_faq: 'FAQ & Hilfe',
        footer_bug: 'Bug melden',
        footer_support_contact: 'Support Kontakt',
        footer_rights: 'Alle Rechte vorbehalten.',
        footer_disclaimer: 'Minecraft ist eine Marke von Mojang Studios. Diese Seite ist nicht offiziell mit Mojang oder Microsoft verbunden.',
        footer_version: 'Version 1.0.0',
        footer_changelog: 'Changelog',
        toast_sound_title: 'Sound',
        toast_sound_on: 'Sound an',
        toast_sound_off: 'Sound aus',
        toast_language_title: 'Sprache',
        toast_language_de: 'Deutsch',
        toast_language_en: 'Englisch',
        toast_theme_title: 'Theme',
        toast_theme_to: 'Zu {theme} gewechselt',
        toast_error_title: 'Fehler',
        toast_error_empty: 'Bitte zuerst Text oder eine URL eingeben.',
        toast_error_qr_lib: 'QR Bibliothek konnte nicht geladen werden.',
        toast_generated: 'Mob-QR wurde generiert.',
        toast_downloaded: 'PNG wurde heruntergeladen.',
        toast_export_failed: 'Externes Bild blockiert den Export. Lade das Bild stattdessen hoch.',
        toast_loaded_title: 'QR Generator geladen',
        toast_loaded_message: 'Seite ist bereit. Du kannst direkt loslegen.'
    },
    en: {
        site_title: 'MC-Craft | QR Generator',
        site_title_short: 'MC-Craft',
        loader_text: 'Loading QR Generator...',
        loader_text2: 'Preparing mob styles...',
        loader_text3: 'Initializing preview...',
        loader_text4: 'Loading theme and sounds...',
        loader_text5: 'Almost done...',
        nav_home: 'Home',
        nav_text_converter: 'Text Converter',
        nav_color_text: 'Color Text',
        nav_items: 'Items Database',
        nav_mobs: 'Mobs Database',
        nav_server_status: 'Server Status',
        nav_skin_lookup: 'Skin Lookup',
        nav_skin_editor: 'Skin Editor',
        nav_day_night_cycle: 'Day-Night Cycle',
        nav_end_poem: 'End Poem',
        nav_capes: 'Capes Database',
        nav_skins: 'Skin Library',
        nav_beacon_mixer: 'Beacon Color Mixer',
        tools_dropdown: 'Tools',
        discover_dropdown: 'Explore',
        theme_overworld: 'Overworld',
        theme_nether: 'Nether',
        theme_end: 'The End',
        theme_select: 'Choose theme:',
        sound_toggle: 'Sound',
        language: 'Language',
        hero_badge: 'V 1.0.0 IS HERE',
        hero_title: 'YOUR <span class="highlight">MINECRAFT</span> <span class="highlight">TOOLS</span><br>PLATFORM',
        hero_desc: 'Everything you need for your next adventure. Free, fast, and always available.',
        hero_btn: 'Open Generator',
        hero_btn_tools: 'All Tools',
        hero_grid_style: 'MOB STYLES',
        hero_grid_export: 'PNG EXPORT',
        hero_grid_scan: 'SCAN READY',
        hero_grid_settings: 'FLEX SETTINGS',
        settings_title: 'Settings',
        input_label: 'Text or URL',
        input_placeholder: 'https://mc-craft.com or your text...',
        type_label: 'Category',
        type_mob: 'Mobs',
        type_item: 'Items',
        type_heart: 'Hearts',
        type_dialog: 'Dialogs',
        asset_search_placeholder: 'Search mob, item, heart or dialog icon...',
        icon_tab_all: 'All',
        icon_loading: 'Loading...',
        icon_empty: 'Nothing found.',
        icon_failed: 'Catalog unavailable.',
        icon_group_heart: 'Heart',
        icon_group_dialog: 'Dialog',
        icon_upload: 'Own image',
        icon_url: 'Image URL',
        icon_url_prompt: 'Paste an image URL (PNG recommended):',
        toast_icon_failed: 'Image could not be loaded.',
        mob_variant_face: 'Face',
        mob_variant_body: 'Body',
        style_label: 'Mob style',
        style_label_mob: 'Mob style',
        style_label_item: 'Item selection',
        style_label_heart: 'Heart selection',
        style_label_dialog: 'Dialog icon selection',
        style_creeper: 'Creeper Face',
        style_enderman: 'Enderman Face',
        style_zombie: 'Zombie Face',
        style_pig: 'Pig Face',
        custom_colors_toggle: 'Use custom QR colors',
        color_bg: 'Background',
        color_dark: 'QR dark',
        color_finder_dark: 'Finder border',
        color_finder_center: 'Finder center',
        btn_reset_colors: 'Reset colors',
        design_label: 'QR design',
        design_normal: 'Normal QR',
        design_frame: 'Frame QR',
        size_label: 'Resolution',
        ec_label: 'Error correction',
        ec_l: 'Low (L)',
        ec_m: 'Medium (M)',
        ec_q: 'High (Q)',
        ec_h: 'Very high (H)',
        preset_website: 'Website',
        preset_motd: 'Server MOTD',
        btn_generate: 'Generate QR',
        btn_download: 'PNG Download',
        preview_title: 'Preview',
        preview_placeholder: 'Your mob QR will appear here',
        preview_hint: 'Tip: For best readability, use darker mob styles with error correction H or Q.',
        footer_description: 'Free Minecraft tools for the community. Built by players for players.',
        footer_tools: 'Tools',
        footer_more_tools: 'More Tools',
        footer_legal: 'Legal',
        footer_about: 'About Us',
        footer_support: 'Support',
        footer_impressum: 'Imprint',
        footer_privacy: 'Privacy Policy',
        footer_terms: 'Terms of Use',
        footer_copyright: 'Copyright',
        capes_db_title: 'Capes Database',
        skins_library_title: 'Skin Library',
        footer_history: 'MC-Craft History',
        footer_team: 'Our Team',
        footer_about_us: 'About us',
        footer_faq: 'FAQ & Help',
        footer_bug: 'Report Bug',
        footer_support_contact: 'Support Contact',
        footer_rights: 'All rights reserved.',
        footer_disclaimer: 'Minecraft is a trademark of Mojang Studios. This site is not officially affiliated with Mojang or Microsoft.',
        footer_version: 'Version 1.0.0',
        footer_changelog: 'Changelog',
        toast_sound_title: 'Sound',
        toast_sound_on: 'Sound on',
        toast_sound_off: 'Sound off',
        toast_language_title: 'Language',
        toast_language_de: 'German',
        toast_language_en: 'English',
        toast_theme_title: 'Theme',
        toast_theme_to: 'Switched to {theme}',
        toast_error_title: 'Error',
        toast_error_empty: 'Please enter text or a URL first.',
        toast_error_qr_lib: 'QR library could not be loaded.',
        toast_generated: 'Mob QR generated.',
        toast_downloaded: 'PNG downloaded.',
        toast_export_failed: 'External image blocks the export. Upload the image instead.',
        toast_loaded_title: 'QR Generator loaded',
        toast_loaded_message: 'Page is ready. Start right away.'
    }
};

const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const qrInput = document.getElementById('qrInput');
const mobSelect = document.getElementById('mobSelect');
const assetSelectLabel = document.getElementById('assetSelectLabel');
const assetGroupTabs = document.getElementById('assetGroupTabs');
const assetSubTabs = document.getElementById('assetSubTabs');
const assetSearch = document.getElementById('assetSearch');
const assetGrid = document.getElementById('assetGrid');
const assetUploadBtn = document.getElementById('assetUploadBtn');
const assetUrlBtn = document.getElementById('assetUrlBtn');
const assetFile = document.getElementById('assetFile');
const colorSettings = document.getElementById('colorSettings');
const customColorsToggle = document.getElementById('customColorsToggle');
const customColorsGrid = document.getElementById('customColorsGrid');
const colorBg = document.getElementById('colorBg');
const colorDark = document.getElementById('colorDark');
const colorFinderDark = document.getElementById('colorFinderDark');
const colorFinderCenter = document.getElementById('colorFinderCenter');
const resetColorsBtn = document.getElementById('resetColorsBtn');
const designSelect = document.getElementById('designSelect');
const sizeSelect = document.getElementById('sizeSelect');
const ecLevel = document.getElementById('ecLevel');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('qrCanvas');
const placeholder = document.getElementById('placeholder');
const toastContainer = document.getElementById('toastContainer');
const loader = document.getElementById('loader');
const header = document.querySelector('.header');

let lastFileName = 'mob-qr.png';
const centerImages = {};
let activeMobCatalogLoad = 0;
let hasInitializedAssetSelect = false;
let hasUserSelectedAsset = false;

const assetCatalog = {
    mob: [],
    item: [],
    heart: [],
    dialog: []
};

const customColors = {
    enabled: false,
    bgLight: '#d6f0d2',
    dark: '#0f2a16',
    finderDark: '#0e2e19',
    finderCenter: '#29ad52'
};

const mobCatalogFiles = [
    { category: 'passive', file: 'Passive_mobs.js', varName: 'passiveMobsData' },
    { category: 'neutral', file: 'Neutral_mobs.js', varName: 'neutralMobsData' },
    { category: 'hostile', file: 'Hostile_mobs.js', varName: 'hostileMobsData' },
    { category: 'boss', file: 'Boss_mobs.js', varName: 'bossMobsData' },
    { category: 'jockeys', file: 'Jockeys_mobs.js', varName: 'jockeyMobsData' },
    { category: 'summonable', file: 'Unused_mobs.js', varName: 'summonableMobsData' },
    { category: 'player', file: 'Player.js', varName: 'playerMobsData' }
];

const itemCatalogFiles = [
    { category: 'building', file: 'building.js', fallbackFile: 'building.js', varName: 'buildingItemsData' },
    { category: 'color', file: 'color.js', fallbackFile: 'color.js', varName: 'colorItemsData' },
    { category: 'nature', file: 'nature.js', fallbackFile: 'nature.js', varName: 'natureItemsData' },
    { category: 'utility', file: 'utility.js', fallbackFile: 'de_utility.js', varName: 'utilityItemsData' },
    { category: 'redstone', file: 'redstone.js', fallbackFile: 'de_redstone.js', varName: 'redstoneItemsData' },
    { category: 'tools', file: 'tools.js', fallbackFile: 'tools.js', varName: 'toolsItemsData' },
    { category: 'combat', file: 'combat.js', fallbackFile: 'combat.js', varName: 'combatItemsData' },
    { category: 'food', file: 'food.js', fallbackFile: 'food.js', varName: 'foodItemsData' },
    { category: 'materials', file: 'materials.js', fallbackFile: 'materials.js', varName: 'materialsItemsData' },
    { category: 'spawn', file: 'spawneggs.js', fallbackFile: 'de_spawneggs.js', varName: 'spawneggsItemsData' },
    { category: 'gamemode', file: 'gamemod.js', fallbackFile: 'de_gamemod.js', varName: 'gamemodItemsData' }
];

const assetPickerState = { group: 'mob', category: 'all' };

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

const assetSubCategoriesByGroup = {
    mob: [
        { key: 'passive', de: 'Passiv', en: 'Passive' },
        { key: 'neutral', de: 'Neutral', en: 'Neutral' },
        { key: 'hostile', de: 'Feindlich', en: 'Hostile' },
        { key: 'boss', de: 'Bosse', en: 'Bosses' },
        { key: 'jockeys', de: 'Jockeys', en: 'Jockeys' },
        { key: 'summonable', de: 'Beschwörbar', en: 'Summonable' },
        { key: 'player', de: 'Spieler', en: 'Player' }
    ],
    item: itemSubCategories
};

const qrMobImageBasePath = '/assets/img/qrcode/mobs';
const externalThemeOverrides = window.mobQrThemeOverrides || {};
const externalThemeMeta = window.mobQrThemeMeta || {};

const qrMobFaceFiles = new Set([
    'allay', 'armadillo', 'axolotl', 'bat', 'bee', 'blaze', 'bogged', 'breeze', 'camel_husk', 'camel',
    'cat', 'cave_spider', 'chicken', 'cod', 'copper_golem', 'cow', 'creaking', 'creeper', 'dolphin', 'donkey',
    'drowned', 'elder_guardian_ghost', 'ender_dragon', 'enderman', 'endermite', 'evoker', 'fox', 'frog', 'ghast',
    'giant', 'glow_squid', 'goat', 'guardian', 'happy_ghast', 'hoglin', 'horse', 'husk', 'illusioner', 'iron_golem',
    'llama', 'magma_cube', 'mooshroom', 'mule', 'nautilus', 'ocelot', 'panda', 'parched', 'parrot', 'phantom',
    'piglin_brute', 'piglin', 'pig', 'pillager', 'player', 'polar_bear', 'pufferfish', 'rabbit', 'ravager',
    'salmon', 'sheep', 'shulker', 'silverfish', 'skeleton_horse', 'skeleton', 'slime', 'sniffer', 'snow_golem',
    'spider', 'squid', 'stray', 'strider', 'sulfur_cube', 'tadpole', 'trader_llama', 'tropical_fish', 'turtle',
    'vex', 'villager', 'vindicator', 'wandering_trader', 'warden', 'witch', 'wither', 'wither_skeleton', 'wolf',
    'zoglin', 'zombie_horse', 'zombie_nautilus', 'zombie', 'zombie_villager', 'zombified_piglin'
]);

const TEXTURE_BASE = '/assets/img/textures/gui/advancement/';

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
    'accept_highlighted.png', 'accept.png', 'bug.png', 'button_highlighted.png', 'button.png', 'close.png',
    'error_highlighted.png', 'error.png', 'info.png', 'item_broken.png', 'item_crafted.png', 'item_dropped.png',
    'item_picked_up.png', 'mouse.png', 'mute_button_highlighted.png', 'mute_button.png', 'player_reporting.png',
    'recipe_book.png', 'reject_highlighted.png', 'reject.png', 'right_click.png', 'social_interactions.png',
    'unmute_button_highlighted.png', 'unmute_button.png', 'unseen_notification.png', 'warning_button_disabled.png',
    'warning_button_highlighted.png', 'warning_button.png', 'warning_highlighted.png', 'warning.png'
];

function labelFromIconFilename(file) {
    return file
        .replace(/\.png$/i, '')
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Mobs

const categoryLabels = {
    de: {
        passive: 'Passiv',
        neutral: 'Neutral',
        hostile: 'Feindlich',
        boss: 'Bosse',
        jockeys: 'Jockeyss',
        summonable: 'Beschwoerbar',
        player: 'Spieler'
    },
    en: {
        passive: 'Passive',
        neutral: 'Neutral',
        hostile: 'Hostile',
        boss: 'Bosses',
        jockeys: 'Jockeys',
        summonable: 'Summonable',
        player: 'Player'
    }
};

// items / blocks

const itemCategoryLabels = {
    de: Object.fromEntries(itemSubCategories.map((sub) => [sub.key, sub.de])),
    en: Object.fromEntries(itemSubCategories.map((sub) => [sub.key, sub.en]))
};

const categoryBaseHue = {
    passive: 145,
    neutral: 200,
    hostile: 5,
    boss: 280,
    jockeys: 320,
    summonable: 35,
    player: 215,
    item: 28,
    heart: 350,
    dialog: 210
};

// Define mob themes with their respective colors, face patterns, and logo images

const mobThemes = {
    creeper: {
        bgLight: '#d6f0d2',
        dark: ['#0f2a16', '#184322', '#21652f'],
        eye: '#08110a',
        mouth: '#06100a',
        finderDark: '#0e2e19',
        finderCenter: '#29ad52',     
        logoImage: `${qrMobImageBasePath}/creeper.png`,
        logoCrop: { x: 7, y: 7, w: 7, h: 7 },
        faceColors: { '#': '#102f1a' },
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..##..##..',
            '..........',
            '...####...',
            '...####...',
            '..##..##..',
            '..##..##..',
            '...####...'
        ]
    },
    enderman: {
        bgLight: '#f5ecff',
        dark: ['#0a0a0f', '#12121a', '#1a1a25'],
        eye: '#c084fc',
        mouth: '#9333ea',
        finderDark: '#0d0d15',
        finderCenter: '#a855f7',
        logoImage: `${qrMobImageBasePath}/enderman.png`,
        logoCrop: { x: 8, y: 8, w: 8, h: 8 },
        faceColors: { '*': '#a855f7', '#': '#23183a' },
        face: [
            '..........',
            '.********.',
            '.********.',
            '.********.',
            '..........',
            '..######..',
            '...####...',
            '....##....',
            '..........',
            '..........'
        ]
    },
    zombie: {
        bgLight: '#d9f7de',
        dark: ['#1a3a2a', '#266443', '#2f8054'],
        eye: '#163427',
        mouth: '#1d4735',
        finderDark: '#1d4f38',
        finderCenter: '#6ee7b7',
        logoImage: `${qrMobImageBasePath}/zombie.png`,
        logoCrop: { x: 8, y: 8, w: 8, h: 8 },
        faceColors: { '#': '#1d4f38', '+': '#266443' },
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..........',
            '..++++++..',
            '..++..++..',
            '..++++++..',
            '..++..++..',
            '..++++++..',
            '..........'
        ]
    },
    pig: {
        bgLight: '#ffe2e8',
        dark: ['#7f4b58', '#9c5f6e', '#bc7384'],
        eye: '#4c2a32',
        mouth: '#7f4b58',
        finderDark: '#8f5c69',
        finderCenter: '#f472b6',
        logoImage: `${qrMobImageBasePath}/pig.png`,
        logoCrop: { x: 8, y: 8, w: 8, h: 8 },
        faceColors: { '#': '#8f5c69', '+': '#f472b6', '*': '#6b3141' },
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..........',
            '..++++++..',
            '..+**+**..',
            '..++++++..',
            '..........',
            '..........',
            '..........'
        ]
    }
};

function hslToHex(h, s, l) {
    const sat = s / 100;
    const light = l / 100;
    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = light - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getMobKeyFromId(id) {
    const cleanId = String(id || '').replace(/^minecraft:/, '').trim();
    if (!cleanId) return 'creeper';
    return cleanId.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}

function resolveAssetTheme(key) {
    const raw = String(key || '');
    if (raw.endsWith('_face') && mobThemes[raw.slice(0, -5)]) {
        const baseKey = raw.slice(0, -5);
        return { theme: mobThemes[baseKey], variant: 'face', baseKey };
    }
    if (raw.endsWith('_body') && mobThemes[raw.slice(0, -5)]) {
        const baseKey = raw.slice(0, -5);
        return { theme: mobThemes[baseKey], variant: 'body', baseKey };
    }
    const baseKey = mobThemes[raw] ? raw : 'creeper';
    return { theme: mobThemes[baseKey], variant: 'face', baseKey };
}

function createMobPalette(category, globalIndex) {
    const baseHue = Number.isFinite(categoryBaseHue[category]) ? categoryBaseHue[category] : 165;
    const uniqueHue = (baseHue + globalIndex * 137.50776405) % 360;

    const satMain = category === 'hostile' || category === 'boss' ? 64 : 56;
    const satAccent = category === 'passive' ? 62 : 68;

    return {
        bgLight: hslToHex((uniqueHue + 10) % 360, 72, 93),
        dark: [
            hslToHex(uniqueHue, satMain, 16),
            hslToHex((uniqueHue + 12) % 360, satMain + 2, 24),
            hslToHex((uniqueHue + 24) % 360, satMain + 4, 32)
        ],
        eye: hslToHex((uniqueHue + 180) % 360, satAccent, 34),
        mouth: hslToHex((uniqueHue + 180) % 360, Math.max(48, satAccent - 8), 26),
        finderDark: hslToHex((uniqueHue + 6) % 360, satMain + 8, 25),
        finderCenter: hslToHex((uniqueHue + 180) % 360, satAccent + 4, 54),
        faceColors: {
            '#': hslToHex((uniqueHue + 180) % 360, satAccent - 4, 24),
            '+': hslToHex(uniqueHue, satMain + 2, 22)
        }
    };
}

function preloadMobFaceImage(mobKey, imagePath, fallbackPath = '') {
    if (!imagePath || centerImages[mobKey]) return;

    const img = new Image();
    img.decoding = 'async';
    if (/^https?:\/\//i.test(imagePath) && !imagePath.startsWith(window.location.origin)) {
        img.crossOrigin = 'anonymous';
    }
    if (fallbackPath && fallbackPath !== imagePath) {
        img.addEventListener('error', () => {
            if (img.src.includes(fallbackPath)) return;
            img.src = fallbackPath;
        }, { once: true });
    }
    img.addEventListener('load', () => {
        if (canvas.style.display !== 'block') return;

        drawMobQr(
            qrInput.value.trim() || 'https://mc-craft.com',
            mobSelect.value,
            Number(sizeSelect.value),
            ecLevel.value,
            designSelect?.value || 'frame'
        );
    }, { once: true });

    centerImages[mobKey] = img;
    img.src = imagePath;
}

function ensureMobTheme(mob, mobKey, paletteContext = {}) {
    const fallbackLogo = typeof mob?.icon === 'string' && mob.icon.trim() ? mob.icon.trim() : '';
    const overrideTheme = externalThemeOverrides[mobKey];
    const autoPalette = createMobPalette(paletteContext.category, paletteContext.globalIndex || 0);
    const useAutoPalette = !(overrideTheme && overrideTheme.autoPalette === false);

    if (overrideTheme && typeof overrideTheme === 'object') {
        mobThemes[mobKey] = {
            ...(mobThemes[mobKey] || {}),
            ...(useAutoPalette ? autoPalette : {}),
            ...overrideTheme
        };

        if (!mobThemes[mobKey].logoImage && qrMobFaceFiles.has(mobKey)) {
            mobThemes[mobKey].logoImage = `${qrMobImageBasePath}/${mobKey}.png`;
        }

        if (!mobThemes[mobKey].bodyImage) {
            mobThemes[mobKey].bodyImage = fallbackLogo || mobThemes[mobKey].logoImage;
        }
        mobThemes[mobKey].hasFaceVariant = Boolean(mobThemes[mobKey].logoImage) && mobThemes[mobKey].logoImage !== mobThemes[mobKey].bodyImage;

        preloadMobFaceImage(`${mobKey}:face`, mobThemes[mobKey].logoImage, fallbackLogo);
        preloadMobFaceImage(`${mobKey}:body`, mobThemes[mobKey].bodyImage, mobThemes[mobKey].logoImage);
        return;
    }

    if (mobThemes[mobKey]) {
        if (useAutoPalette) {
            mobThemes[mobKey] = {
                ...mobThemes[mobKey],
                ...autoPalette,
                faceColors: {
                    ...(mobThemes[mobKey].faceColors || {}),
                    ...(autoPalette.faceColors || {})
                }
            };
        }
        if (!mobThemes[mobKey].bodyImage) {
            mobThemes[mobKey].bodyImage = fallbackLogo || mobThemes[mobKey].logoImage;
        }
        mobThemes[mobKey].hasFaceVariant = Boolean(mobThemes[mobKey].logoImage) && mobThemes[mobKey].logoImage !== mobThemes[mobKey].bodyImage;
        if (mobThemes[mobKey].logoImage) preloadMobFaceImage(`${mobKey}:face`, mobThemes[mobKey].logoImage, fallbackLogo);
        if (mobThemes[mobKey].bodyImage) preloadMobFaceImage(`${mobKey}:body`, mobThemes[mobKey].bodyImage, mobThemes[mobKey].logoImage);
        return;
    }

    const hasFaceSprite = qrMobFaceFiles.has(mobKey);
    const customLogo = hasFaceSprite ? `${qrMobImageBasePath}/${mobKey}.png` : '';
    const bodyImage = fallbackLogo || customLogo || `${qrMobImageBasePath}/${mobKey}.png`;
    const logoImage = customLogo || bodyImage;

    mobThemes[mobKey] = {
        ...autoPalette,
        logoImage,
        bodyImage,
        hasFaceVariant: Boolean(customLogo) && customLogo !== bodyImage,
        logoCrop: customLogo ? { x: 8, y: 8, w: 8, h: 8 } : null,
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..........',
            '..++++++..',
            '..++..++..',
            '..++++++..',
            '..++..++..',
            '..++++++..',
            '..........'
        ]
    };

    if (customLogo) preloadMobFaceImage(`${mobKey}:face`, customLogo, fallbackLogo);
    preloadMobFaceImage(`${mobKey}:body`, bodyImage, customLogo || bodyImage);
}

function ensureItemBlockTheme(item, assetKey, assetType, globalIndex) {
    if (mobThemes[assetKey]) {
        if (mobThemes[assetKey].logoImage) preloadMobFaceImage(`${assetKey}:icon`, mobThemes[assetKey].logoImage);
        return;
    }

    const palette = createMobPalette(assetType, globalIndex || 0);
    const icon = typeof item?.icon === 'string' ? item.icon.trim() : '';
    mobThemes[assetKey] = {
        ...palette,
        logoImage: icon,
        bodyImage: icon,
        logoCrop: null,
        faceColors: { '#': palette.finderDark },
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..........',
            '..++++++..',
            '..++++++..',
            '..++..++..',
            '..++..++..',
            '..++++++..',
            '..........'
        ]
    };

    if (icon) preloadMobFaceImage(`${assetKey}:icon`, icon);
}

function ensureStaticIconTheme(assetKey, iconPath, assetType, globalIndex) {
    if (mobThemes[assetKey]) {
        if (mobThemes[assetKey].logoImage) preloadMobFaceImage(`${assetKey}:icon`, mobThemes[assetKey].logoImage);
        return;
    }

    const palette = createMobPalette(assetType, globalIndex || 0);
    mobThemes[assetKey] = {
        ...palette,
        logoImage: iconPath,
        bodyImage: iconPath,
        logoCrop: null,
        faceColors: { '#': palette.finderDark },
        face: [
            '..........',
            '..##..##..',
            '..##..##..',
            '..........',
            '..++++++..',
            '..++++++..',
            '..++..++..',
            '..++..++..',
            '..++++++..',
            '..........'
        ]
    };

    if (iconPath) preloadMobFaceImage(`${assetKey}:icon`, iconPath);
}

async function loadScriptArray(url, varName) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `${url}?v=${Date.now()}`;
        script.dataset.mobQrScript = '1';
        script.onload = () => resolve(window[varName] || []);
        script.onerror = () => resolve([]);
        document.head.appendChild(script);
    });
}

async function loadScriptArrayWithFallback(primaryUrl, fallbackUrl, varName) {
    const fromPrimary = await loadScriptArray(primaryUrl, varName);
    if (Array.isArray(fromPrimary) && fromPrimary.length) return fromPrimary;
    if (!fallbackUrl || fallbackUrl === primaryUrl) return Array.isArray(fromPrimary) ? fromPrimary : [];
    return loadScriptArray(fallbackUrl, varName);
}

function toAssetKey(prefix, id) {
    const clean = getMobKeyFromId(id);
    return `${prefix}_${clean}`;
}

function renderAssetOptions(preferredValue = '') {
    if (!mobSelect) return;

    const selectedType = assetPickerState.group;
    const list = Array.isArray(assetCatalog[selectedType]) ? assetCatalog[selectedType] : [];
    mobSelect.innerHTML = '';

    if (selectedType === 'mob') {
        const byCategory = new Map();
        list.forEach((entry) => {
            const bucket = byCategory.get(entry.category) || [];
            bucket.push(entry);
            byCategory.set(entry.category, bucket);
        });

        for (const file of mobCatalogFiles) {
            const category = file.category;
            const categoryItems = byCategory.get(category) || [];
            if (!categoryItems.length) continue;

            const group = document.createElement('optgroup');
            group.label = categoryLabels[currentLang]?.[category] || category;
            categoryItems.forEach((entry) => {
                const option = document.createElement('option');
                option.value = entry.key;
                option.textContent = entry.name;
                group.appendChild(option);
            });
            mobSelect.appendChild(group);
        }
    } else if (selectedType === 'item') {
        const byGroup = new Map();
        list.forEach((entry) => {
            const bucket = byGroup.get(entry.category) || [];
            bucket.push(entry);
            byGroup.set(entry.category, bucket);
        });

        for (const file of itemCatalogFiles) {
            const groupEntries = byGroup.get(file.category) || [];
            if (!groupEntries.length) continue;

            const group = document.createElement('optgroup');
            group.label = itemCategoryLabels[currentLang]?.[file.category] || file.category;
            groupEntries
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name, currentLang === 'de' ? 'de' : 'en'))
                .forEach((entry) => {
                    const option = document.createElement('option');
                    option.value = entry.key;
                    option.textContent = entry.name;
                    group.appendChild(option);
                });

            mobSelect.appendChild(group);
        }
    } else {
        list.forEach((entry) => {
            const option = document.createElement('option');
            option.value = entry.key;
            option.textContent = entry.name;
            mobSelect.appendChild(option);
        });
    }

    if (!mobSelect.options.length) {
        mobSelect.innerHTML = `<option value="creeper">${t('style_creeper')}</option>`;
    }

    const optionValues = Array.from(mobSelect.options).map((option) => option.value);
    const canUsePreferred = hasUserSelectedAsset && optionValues.includes(preferredValue);

    if (canUsePreferred) {
        mobSelect.value = preferredValue;
    } else {
        mobSelect.value = mobSelect.options[0].value;
    }

    hasInitializedAssetSelect = true;
}

function renderAssetGroupTabs() {
    assetGroupTabs?.querySelectorAll('.icon-group-tab').forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.group === assetPickerState.group);
    });
}

function dedupeAssetEntries(list) {
    const seen = new Set();
    return list.filter((entry) => {
        if (!entry.id) return true;
        const identity = `${entry.id}::${entry.icon || ''}::${entry.name}`;
        if (seen.has(identity)) return false;
        seen.add(identity);
        return true;
    });
}

function renderAssetSubTabs() {
    if (!assetSubTabs) return;
    assetSubTabs.innerHTML = '';

    const list = assetSubCategoriesByGroup[assetPickerState.group];
    if (!list) {
        assetSubTabs.style.display = 'none';
        return;
    }
    assetSubTabs.style.display = 'flex';

    const groupEntries = assetCatalog[assetPickerState.group] || [];

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `icon-sub-tab${assetPickerState.category === 'all' ? ' active' : ''}`;
    allBtn.dataset.category = 'all';
    allBtn.textContent = `${t('icon_tab_all')} (${dedupeAssetEntries(groupEntries).length})`;
    assetSubTabs.appendChild(allBtn);

    list.forEach((sub) => {
        const count = groupEntries.filter((entry) => entry.category === sub.key).length;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `icon-sub-tab${assetPickerState.category === sub.key ? ' active' : ''}`;
        btn.dataset.category = sub.key;
        btn.textContent = `${sub[currentLang] || sub.de} (${count})`;
        assetSubTabs.appendChild(btn);
    });

    assetSubTabs.querySelectorAll('.icon-sub-tab').forEach((btn) => {
        btn.addEventListener('click', () => {
            assetPickerState.category = btn.dataset.category;
            assetSubTabs.querySelectorAll('.icon-sub-tab').forEach((b) => b.classList.toggle('active', b === btn));
            renderAssetGrid();
            playClickSound();
        });
    });
}

function markActiveAsset() {
    assetGrid?.querySelectorAll('.icon-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.key === mobSelect.value);
    });
}

function selectAsset(key) {
    const changedAsset = mobSelect.value !== key;
    hasUserSelectedAsset = true;
    mobSelect.value = key;
    markActiveAsset();
    if (changedAsset) syncCustomColorInputsFromTheme();
    drawMobQr(
        qrInput.value.trim() || 'https://mc-craft.com',
        mobSelect.value,
        Number(sizeSelect.value),
        ecLevel.value,
        designSelect?.value || 'frame'
    );
}

function selectCustomAsset(src, key, label) {
    if (!src) return;

    const baseTheme = resolveAssetTheme(mobSelect.value).theme || mobThemes.creeper;
    mobThemes[key] = {
        ...baseTheme,
        logoImage: src,
        bodyImage: src,
        hasFaceVariant: false,
        logoCrop: null
    };
    delete centerImages[`${key}:face`];
    delete centerImages[`${key}:body`];
    delete centerImages[`${key}:icon`];

    let option = Array.from(mobSelect.options).find((o) => o.value === key);
    if (!option) {
        option = document.createElement('option');
        option.value = key;
        mobSelect.appendChild(option);
    }
    option.textContent = label;

    selectAsset(key);
}

function renderAssetGrid() {
    if (!assetGrid) return;

    const query = (assetSearch?.value || '').trim().toLowerCase();
    assetGrid.innerHTML = '';

    const list = assetCatalog[assetPickerState.group] || [];
    if (!list.length) {
        const info = document.createElement('p');
        info.className = 'icon-grid-state';
        info.textContent = t('icon_failed');
        assetGrid.appendChild(info);
        return;
    }

    const byCategory = assetPickerState.category !== 'all'
        ? list.filter((entry) => entry.category === assetPickerState.category)
        : dedupeAssetEntries(list);

    const filtered = query
        ? byCategory.filter((entry) => entry.name.toLowerCase().includes(query))
        : byCategory;

    if (!filtered.length) {
        const info = document.createElement('p');
        info.className = 'icon-grid-state';
        info.textContent = t('icon_empty');
        assetGrid.appendChild(info);
        return;
    }

    filtered.forEach((entry) => {
        const { theme, variant } = resolveAssetTheme(entry.key);
        const iconSrc = (variant === 'body' ? theme?.bodyImage : theme?.logoImage) || theme?.bodyImage || theme?.logoImage || '';
        const fallbackSrc = (variant === 'body' ? theme?.logoImage : theme?.bodyImage) || '';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = `icon-btn${mobSelect.value === entry.key ? ' active' : ''}`;
        button.title = entry.name;
        button.dataset.key = entry.key;

        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = entry.name;
        img.src = iconSrc;
        let triedFallback = false;
        img.addEventListener('error', () => {
            if (!triedFallback && fallbackSrc && fallbackSrc !== iconSrc) {
                triedFallback = true;
                img.src = fallbackSrc;
            } else {
                button.remove();
            }
        });

        button.appendChild(img);
        button.addEventListener('click', () => {
            selectAsset(entry.key);
            playClickSound();
        });

        assetGrid.appendChild(button);
    });
}

function renderAssetPicker(preferredValue = '') {
    renderAssetOptions(preferredValue);
    renderAssetGroupTabs();
    renderAssetSubTabs();
    renderAssetGrid();
}

function updateAssetControlUi() {
    const selectedType = assetPickerState.group;
    const isMob = selectedType === 'mob';

    if (assetSelectLabel) {
        const key = selectedType === 'mob' ? 'style_label_mob'
            : selectedType === 'item' ? 'style_label_item'
            : selectedType === 'heart' ? 'style_label_heart'
            : 'style_label_dialog';
        assetSelectLabel.textContent = t(key);
    }
}

function syncCustomColorInputsFromTheme(theme = null) {
    const currentTheme = theme || resolveAssetTheme(mobSelect?.value).theme;
    const dark = Array.isArray(currentTheme.dark) && currentTheme.dark.length ? currentTheme.dark[0] : '#111111';

    customColors.bgLight = currentTheme.bgLight || customColors.bgLight;
    customColors.dark = dark;
    customColors.finderDark = currentTheme.finderDark || customColors.finderDark;
    customColors.finderCenter = currentTheme.finderCenter || customColors.finderCenter;

    if (colorBg) colorBg.value = customColors.bgLight;
    if (colorDark) colorDark.value = customColors.dark;
    if (colorFinderDark) colorFinderDark.value = customColors.finderDark;
    if (colorFinderCenter) colorFinderCenter.value = customColors.finderCenter;
}

function updateColorSettingsUi() {
    if (!colorSettings || !customColorsToggle) return;

    customColorsToggle.checked = customColors.enabled;
    colorSettings.classList.toggle('disabled', !customColors.enabled);
    if (customColorsGrid) customColorsGrid.setAttribute('aria-hidden', customColors.enabled ? 'false' : 'true');
}

function initCustomColorControls() {
    if (!colorSettings || !customColorsToggle) return;

    syncCustomColorInputsFromTheme();
    updateColorSettingsUi();

    customColorsToggle.addEventListener('change', () => {
        customColors.enabled = customColorsToggle.checked;
        if (!customColors.enabled) {
            syncCustomColorInputsFromTheme();
        }
        updateColorSettingsUi();
        drawMobQr(
            qrInput.value.trim() || 'https://mc-craft.com',
            mobSelect.value,
            Number(sizeSelect.value),
            ecLevel.value,
            designSelect?.value || 'frame'
        );
        playClickSound();
    });

    [
        ['bgLight', colorBg],
        ['dark', colorDark],
        ['finderDark', colorFinderDark],
        ['finderCenter', colorFinderCenter]
    ].forEach(([key, input]) => {
        if (!input) return;
        input.addEventListener('input', () => {
            customColors[key] = input.value;
            if (!customColors.enabled) return;
            drawMobQr(
                qrInput.value.trim() || 'https://mc-craft.com',
                mobSelect.value,
                Number(sizeSelect.value),
                ecLevel.value,
                designSelect?.value || 'frame'
            );
        });
    });

    if (resetColorsBtn) {
        resetColorsBtn.addEventListener('click', () => {
            syncCustomColorInputsFromTheme();
            if (customColors.enabled) {
                drawMobQr(
                    qrInput.value.trim() || 'https://mc-craft.com',
                    mobSelect.value,
                    Number(sizeSelect.value),
                    ecLevel.value,
                    designSelect?.value || 'frame'
                );
            }
            playClickSound();
        });
    }
}

async function loadMobCatalogOptions() {
    if (!mobSelect) return;

    const loadId = ++activeMobCatalogLoad;
    document.querySelectorAll('script[data-mob-qr-script="1"]').forEach((s) => s.remove());

    const langPrefix = currentLang === 'de' ? 'de_' : 'en_';
    const orderedGroups = new Map();

    for (const file of mobCatalogFiles) {
        window[file.varName] = null;
        const mobs = await loadScriptArray(`/assets/JS/mobs/${langPrefix}${file.file}`, file.varName);
        const valid = Array.isArray(mobs) ? mobs.filter((mob) => String(mob?.type || '').toLowerCase() !== 'jockey') : [];
        orderedGroups.set(file.category, valid);
    }

    if (loadId !== activeMobCatalogLoad) return;

    const previousValue = mobSelect.value;

    const orderedMobKeysByCategory = externalThemeMeta.orderedMobKeysByCategory || {};
    const existingMobIds = new Set();
    const mobEntries = [];
    let globalIndex = 0;
    for (const file of mobCatalogFiles) {
        const category = file.category;
        const categoryMobs = orderedGroups.get(category) || [];
        if (!categoryMobs.length) continue;

        const mobByKey = new Map();
        categoryMobs.forEach((mob) => {
            const key = getMobKeyFromId(mob?.id);
            if (!key) return;
            if (!mobByKey.has(key)) mobByKey.set(key, mob);
        });

        const orderedKeys = Array.isArray(orderedMobKeysByCategory[category]) ? orderedMobKeysByCategory[category] : [];
        const sortedCategoryMobs = [];

        orderedKeys.forEach((mobKey) => {
            const mob = mobByKey.get(mobKey);
            if (!mob) return;
            sortedCategoryMobs.push(mob);
            mobByKey.delete(mobKey);
        });

        if (mobByKey.size) {
            mobByKey.forEach((mob) => sortedCategoryMobs.push(mob));
        }

        const group = document.createElement('optgroup');
        group.label = categoryLabels[currentLang]?.[category] || category;

        sortedCategoryMobs.forEach((mob) => {
            const id = String(mob?.id || '').trim();
            if (!id || existingMobIds.has(id)) return;
            existingMobIds.add(id);

            const mobKey = getMobKeyFromId(id);
            ensureMobTheme(mob, mobKey, { category, globalIndex });
            globalIndex += 1;

            const name = mob.name || mobKey;
            if (mobThemes[mobKey]?.hasFaceVariant) {
                mobEntries.push({ key: `${mobKey}_face`, name: `${name} (${t('mob_variant_face')})`, category });
                mobEntries.push({ key: `${mobKey}_body`, name: `${name} (${t('mob_variant_body')})`, category });
            } else {
                mobEntries.push({ key: `${mobKey}_body`, name, category });
            }
        });
    }

    const itemEntries = [];

    for (const file of itemCatalogFiles) {
        window[file.varName] = null;
        const primary = `/assets/JS/items/${langPrefix}${file.file}`;
        const fallback = `/assets/JS/items/${file.fallbackFile}`;
        const entries = await loadScriptArrayWithFallback(primary, fallback, file.varName);
        if (loadId !== activeMobCatalogLoad) return;

        const validEntries = Array.isArray(entries) ? entries : [];
        const seenInCategory = new Set();
        validEntries.forEach((entry) => {
            const id = String(entry?.id || '').trim();
            const name = String(entry?.name || '').trim();
            const icon = String(entry?.icon || '').trim();
            if (!id || !name || !icon) return;

            const dedupeKey = `${id}::${icon}::${name}`;
            if (seenInCategory.has(dedupeKey)) return;
            seenInCategory.add(dedupeKey);

            const key = `${toAssetKey('item', id)}_${getMobKeyFromId(icon)}_${getMobKeyFromId(name)}_${file.category}`;
            ensureItemBlockTheme(entry, key, 'item', globalIndex);
            globalIndex += 1;

            itemEntries.push({ key, id, icon, name, category: file.category });
        });
    }

    const heartEntries = [];
    heartIconFiles.forEach((file) => {
        const key = `heart_${file.replace(/\.png$/i, '')}`;
        const icon = `${TEXTURE_BASE}heart/${file}`;
        ensureStaticIconTheme(key, icon, 'heart', globalIndex);
        globalIndex += 1;
        heartEntries.push({ key, name: `${t('icon_group_heart')} – ${labelFromIconFilename(file)}`, category: 'heart' });
    });

    const dialogEntries = [];
    dialogIconFiles.forEach((file) => {
        const key = `dialog_${file.replace(/\.png$/i, '')}`;
        const icon = `${TEXTURE_BASE}dialogs/${file}`;
        ensureStaticIconTheme(key, icon, 'dialog', globalIndex);
        globalIndex += 1;
        dialogEntries.push({ key, name: `${t('icon_group_dialog')} – ${labelFromIconFilename(file)}`, category: 'dialog' });
    });

    assetCatalog.mob = mobEntries;
    assetCatalog.item = itemEntries;
    assetCatalog.heart = heartEntries;
    assetCatalog.dialog = dialogEntries;

    updateAssetControlUi();
    renderAssetPicker(previousValue);
    if (!customColors.enabled) syncCustomColorInputsFromTheme();
}

function preloadMobFaceImages() {
    Object.entries(mobThemes).forEach(([key, theme]) => {
        if (!theme.logoImage) return;
        preloadMobFaceImage(`${key}:face`, theme.logoImage);
        if (theme.bodyImage) preloadMobFaceImage(`${key}:body`, theme.bodyImage, theme.logoImage);
    });
}

function t(key, params = {}) {
    let text = translations[currentLang]?.[key] || translations.de[key] || key;
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

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    ['soundIcon', 'mobileSoundIcon'].forEach((id) => {
        const icon = document.getElementById(id);
        if (icon) icon.src = src;
    });
}

function updateFlagIcon() {
    const src = currentLang === 'de' ? '/assets/img/backgrounds/de.svg' : '/assets/img/backgrounds/en.svg';
    ['langFlag', 'mobileLangFlag'].forEach((id) => {
        const icon = document.getElementById(id);
        if (icon) icon.src = src;
    });
}

function getThemeName(theme) {
    if (theme === 'nether') return t('theme_nether');
    if (theme === 'end') return t('theme_end');
    return t('theme_overworld');
}

function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = t(key);
        if (!value) return;
        if (el.children.length === 0) el.textContent = value;
        else el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = t(key);
        if (value) el.setAttribute('placeholder', value);
    });

    document.title = t('site_title');
    updateAssetControlUi();
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
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 400);
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
}

function initSoundLanguage() {
    const toggleSound = () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('mc-craft-sound', String(soundEnabled));
        updateSoundIcon();
        playClickSound();
        showToast(t('toast_sound_title'), soundEnabled ? t('toast_sound_on') : t('toast_sound_off'));
    };

    const toggleLang = () => {
        currentLang = currentLang === 'de' ? 'en' : 'de';
        localStorage.setItem('mc-craft-lang', currentLang);
        applyTranslations();
        updateFlagIcon();
        loadMobCatalogOptions().then(() => {
            drawMobQr(
                qrInput.value.trim() || 'https://mc-craft.com',
                mobSelect.value,
                Number(sizeSelect.value),
                ecLevel.value,
                designSelect?.value || 'frame'
            );
            showToast(t('toast_language_title'), currentLang === 'de' ? t('toast_language_de') : t('toast_language_en'));
        });
    };

    ['soundBtn', 'mobileSoundBtn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', toggleSound);
    });

    ['langBtn', 'mobileLangBtn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', toggleLang);
    });
}

function hideLoader() {
    if (!loader) return;
    loader.style.opacity = '0';
    window.setTimeout(() => {
        loader.style.display = 'none';
    }, 280);
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
    const texts = [
        t('loader_text'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
    ];
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

function isFinderModule(x, y, size) {
    const inTopLeft = x < 7 && y < 7;
    const inTopRight = x >= size - 7 && y < 7;
    const inBottomLeft = x < 7 && y >= size - 7;
    return inTopLeft || inTopRight || inBottomLeft;
}

function finderCellType(x, y, size) {
    let localX = x;
    let localY = y;

    if (x >= size - 7 && y < 7) localX = x - (size - 7);
    if (x < 7 && y >= size - 7) localY = y - (size - 7);

    const outer = localX === 0 || localX === 6 || localY === 0 || localY === 6;
    const center = localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4;

    if (outer) return 'outer';
    if (center) return 'center';
    return 'ring';
}

function getPreviewScale(pixelSize) {
    if (pixelSize <= 512) return 72;
    if (pixelSize <= 768) return 86;
    return 100;
}

function drawMobFaceLogo(ctx, mob, imageCacheKey, centerX, centerY, faceSize, iconColor) {
    ctx.save();

    const img = centerImages[imageCacheKey];
    if (img && img.complete && img.naturalWidth > 0) {
        const crop = mob.logoCrop;
        const canUseSpriteCrop =
            crop &&
            Number.isFinite(crop.x) &&
            Number.isFinite(crop.y) &&
            Number.isFinite(crop.w) &&
            Number.isFinite(crop.h) &&
            img.naturalWidth <= 32 &&
            img.naturalHeight <= 32;

        const prevSmoothing = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = false;
        if (canUseSpriteCrop) {
            ctx.drawImage(
                img,
                crop.x,
                crop.y,
                crop.w,
                crop.h,
                centerX - faceSize / 2,
                centerY - faceSize / 2,
                faceSize,
                faceSize
            );
        } else {
            ctx.drawImage(img, centerX - faceSize / 2, centerY - faceSize / 2, faceSize, faceSize);
        }
        ctx.imageSmoothingEnabled = prevSmoothing;

        ctx.restore();
        return;
    }

    const face = mob.face || [];
    const rows = face.length;
    const cols = rows > 0 ? face[0].length : 0;
    if (!rows || !cols) {
        ctx.restore();
        return;
    }

    const innerSize = faceSize;
    const cellSize = innerSize / Math.max(rows, cols);
    const startX = centerX - (cols * cellSize) / 2;
    const startY = centerY - (rows * cellSize) / 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const marker = face[y][x];
            if (marker === '.') continue;

            const faceColors = mob.faceColors || {};
            const color = faceColors[marker] || iconColor;
            ctx.fillStyle = color;
            ctx.fillRect(startX + x * cellSize, startY + y * cellSize, cellSize, cellSize);
        }
    }

    ctx.restore();
}

function drawMobQr(text, mobKey, pixelSize, errorLevel, designMode = 'frame') {
    if (!window.QRCode) {
        showToast(t('toast_error_title'), t('toast_error_qr_lib'), 'error');
        return false;
    }

    const selectedType = assetPickerState.group;
    const { theme: mob, variant, baseKey } = resolveAssetTheme(mobKey);
    const effectiveBg = customColors.enabled ? customColors.bgLight : mob.bgLight;
    const effectiveDark = customColors.enabled
        ? [customColors.dark, customColors.dark, customColors.dark]
        : (Array.isArray(mob.dark) && mob.dark.length ? mob.dark : ['#111111']);
    const effectiveFinderDark = customColors.enabled ? customColors.finderDark : mob.finderDark;
    const effectiveFinderCenter = customColors.enabled ? customColors.finderCenter : mob.finderCenter;
    const correctLevel = window.QRCode.CorrectLevel?.[errorLevel] ?? window.QRCode.CorrectLevel?.M ?? 0;
    const qrHost = document.createElement('div');
    const qr = new window.QRCode(qrHost, {
        text,
        width: 1,
        height: 1,
        correctLevel
    });
    const qrModel = qr._oQRCode;

    if (!qrModel || typeof qrModel.getModuleCount !== 'function' || typeof qrModel.isDark !== 'function') {
        showToast(t('toast_error_title'), t('toast_error_qr_lib'), 'error');
        return false;
    }

    const moduleCount = qrModel.getModuleCount();
    const paddingModules = 4;
    const drawModules = moduleCount + paddingModules * 2;
    const cell = Math.max(2, Math.floor(pixelSize / drawModules));
    const realSize = cell * drawModules;
    const useFrame = designMode !== 'normal';

    let logoModules = Math.max(9, Math.floor(moduleCount * 0.24));
    // QR matrices have an odd module count. An odd logo area can therefore sit exactly in the middle.
    if (logoModules % 2 === 0) logoModules += 1;
    const logoStart = Math.floor((moduleCount - logoModules) / 2);
    const logoEnd = logoStart + logoModules;
    const logoQuiet = 1;

    canvas.width = realSize;
    canvas.height = realSize;
    canvas.style.width = `${getPreviewScale(pixelSize)}%`;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = effectiveBg;
    ctx.fillRect(0, 0, realSize, realSize);

    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            if (!qrModel.isDark(y, x)) continue;

            const px = (x + paddingModules) * cell;
            const py = (y + paddingModules) * cell;

            if (useFrame) {
                const isInLogoQuietZone = x >= logoStart - logoQuiet && x < logoEnd + logoQuiet && y >= logoStart - logoQuiet && y < logoEnd + logoQuiet;
                if (isInLogoQuietZone) continue;
            }

            if (isFinderModule(x, y, moduleCount)) {
                const type = finderCellType(x, y, moduleCount);
                if (type === 'outer') ctx.fillStyle = effectiveFinderDark;
                else if (type === 'center') ctx.fillStyle = effectiveFinderCenter;
                else ctx.fillStyle = effectiveBg;

                ctx.fillRect(px, py, cell, cell);
                continue;
            }

            const idx = Math.abs((x * 13 + y * 17) % effectiveDark.length);
            ctx.fillStyle = effectiveDark[idx];

            ctx.fillRect(px, py, cell, cell);
        }
    }

    if (useFrame) {
        const centerPx = (paddingModules + logoStart + logoModules / 2) * cell;
        const logoSize = logoModules * cell;

        let imageCacheKey = `${baseKey}:face`;
        if (selectedType === 'mob') {
            if (variant === 'body') {
                imageCacheKey = `${baseKey}:body`;
                preloadMobFaceImage(imageCacheKey, mob.bodyImage || mob.logoImage, mob.logoImage);
            } else {
                imageCacheKey = `${baseKey}:face`;
                preloadMobFaceImage(imageCacheKey, mob.logoImage, mob.bodyImage || mob.logoImage);
            }
        } else {
            imageCacheKey = `${baseKey}:icon`;
            preloadMobFaceImage(imageCacheKey, mob.logoImage, mob.bodyImage || mob.logoImage);
        }

        drawMobFaceLogo(ctx, mob, imageCacheKey, centerPx, centerPx, logoSize, mob.eye);
    }

    canvas.style.display = 'block';
    placeholder.style.display = 'none';
    downloadBtn.disabled = false;
    const modeSuffix = useFrame ? 'frame' : 'normal';
    lastFileName = `mob-qr-${mobKey.replace(/[^a-z0-9_-]/gi, '')}-${modeSuffix}.png`;
    return true;
}

function handleGenerate() {
    const text = qrInput.value.trim();
    if (!text) {
        showToast(t('toast_error_title'), t('toast_error_empty'), 'error');
        return;
    }

    if (drawMobQr(text, mobSelect.value, Number(sizeSelect.value), ecLevel.value, designSelect?.value || 'frame')) {
        showToast('QR', t('toast_generated'));
        playClickSound();
    }
}

function handleDownload() {
    if (downloadBtn.disabled) return;
    try {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = lastFileName;
        link.click();
        showToast('PNG', t('toast_downloaded'));
        playClickSound();
    } catch (error) {
        showToast(t('toast_error_title'), t('toast_export_failed'), 'error');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) currentYear.textContent = String(new Date().getFullYear());

    initAudio();
    preloadMobFaceImages();
    initTheme();
    initThemeSwitcher();
    initMobileMenu();
    initTopButton();
    initSoundLanguage();
    initCustomColorControls();

    applyTranslations();
    updateSoundIcon();
    updateFlagIcon();
    await loadMobCatalogOptions();

    qrInput.value = 'https://mc-craft.com';

    generateBtn.addEventListener('click', handleGenerate);
    downloadBtn.addEventListener('click', handleDownload);

    [sizeSelect, ecLevel, designSelect].forEach((input) => {
        if (!input) return;
        input.addEventListener('change', () => {
            drawMobQr(
                qrInput.value.trim() || 'https://mc-craft.com',
                mobSelect.value,
                Number(sizeSelect.value),
                ecLevel.value,
                designSelect?.value || 'frame'
            );
            playClickSound();
        });
    });

    assetGroupTabs?.querySelectorAll('.icon-group-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            if (assetPickerState.group === tab.dataset.group) return;
            assetPickerState.group = tab.dataset.group;
            assetPickerState.category = 'all';
            renderAssetOptions();
            updateAssetControlUi();
            renderAssetGroupTabs();
            renderAssetSubTabs();
            renderAssetGrid();
            hasUserSelectedAsset = true;
            if (!customColors.enabled) syncCustomColorInputsFromTheme();
            drawMobQr(
                qrInput.value.trim() || 'https://mc-craft.com',
                mobSelect.value,
                Number(sizeSelect.value),
                ecLevel.value,
                designSelect?.value || 'frame'
            );
            playClickSound();
        });
    });

    assetSearch?.addEventListener('input', () => renderAssetGrid());

    assetUploadBtn?.addEventListener('click', () => assetFile?.click());

    assetFile?.addEventListener('change', () => {
        const file = assetFile.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            selectCustomAsset(String(reader.result), 'custom_upload', t('icon_upload'));
            playClickSound();
        };
        reader.onerror = () => showToast(t('toast_error_title'), t('toast_icon_failed'), 'error');
        reader.readAsDataURL(file);
    });

    assetUrlBtn?.addEventListener('click', () => {
        const url = window.prompt(t('icon_url_prompt'), '');
        if (url && url.trim()) {
            selectCustomAsset(url.trim(), 'custom_url', t('icon_url'));
            playClickSound();
        }
    });

    document.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            qrInput.value = btn.dataset.preset;
            qrInput.focus();
            playClickSound();
        });
    });

    drawMobQr(
        qrInput.value,
        mobSelect.value,
        Number(sizeSelect.value),
        ecLevel.value,
        designSelect?.value || 'frame'
    );
    initLoader();
});
