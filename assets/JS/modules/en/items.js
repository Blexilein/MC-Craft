// items.js

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Text strings for this page (English only)
const T = {
    site_title: "MC-Craft | Items Database",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Converter",
    nav_color_text: "Color Text",
    nav_items: "Items Database",
    nav_mobs: "Mobs Database",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_beacon_mixer: "Beacon Color Mixer",
    nav_day_night_cycle: "Day-Night Cycle",
    nav_end_poem: "End Poem",
    nav_capes: "Capes Database",
    nav_skins: "Skin Library",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    items_hero_title: "Minecraft <span class=\"highlight\">Items Catalog</span>",
    hero_badge: "V 1.0.0 is here",
    items_hero_desc: "Discover all blocks, items and tools from the Minecraft world. Find detailed information, properties and commands for each item.",
    items_btn_explore: "Explore Items",
    items_btn_copyright: "Copyright Info",
    items_grid_count: "500+ Items",
    items_grid_commands: "Commands",
    items_grid_search: "Live Search",
    items_grid_details: "Detailed Info",
    items_section_title: "Minecraft <span class=\"highlight\">Items</span>",
    items_section_subtitle: "Search all items by category or use live search",
    filter_all: "All",
    filter_building: "Building Blocks",
    filter_color: "Colored Blocks",
    filter_nature: "Nature Blocks",
    filter_utility: "Utility Blocks",
    filter_redstone: "Redstone",
    filter_tools: "Tools",
    filter_combat: "Combat",
    filter_food: "Food",
    filter_materials: "Materials",
    filter_spawn: "Spawn Eggs",
    filter_gamemod: "Operator Items",
    search_placeholder: "Search items...",
    category_all: "All Categories",
    modal_stack: "per stack",
    copyright_title: "Copyright Information",
    copyright_subtitle: "Legal information about Minecraft content",
    copyright_notice_title: "Minecraft is a registered trademark",
    copyright_notice_text1: "This website is not affiliated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Studios. All rights to game content, including sounds, graphics and texts, belong to Mojang Studios.",
    copyright_important: "Important Notice:",
    copyright_important_text: "Due to copyright restrictions, we cannot offer Minecraft sounds for download directly on our website.",
    copyright_official: "Official Minecraft Website:",
    copyright_official_desc: "The official Minecraft website by Mojang Studios.",
    copyright_legal: "Legal Information:",
    copyright_legal_text1: "Use of Minecraft content is subject to the <a href=\"https://www.minecraft.net/terms\" target=\"_blank\" rel=\"noopener\">Minecraft Terms of Use</a>. If you have questions about the use of the content, please contact Mojang Studios directly.",
    copyright_disclaimer: "This site is for informational purposes only and makes no claim to completeness or accuracy.",
    tab_properties: "Properties",
    tab_extended: "Extended Info",
    tab_commands: "Commands",
    tab_texture: "Texture",
    modal_sounds_title: "Item Sounds",
    modal_texture_title: "Texture Preview",
    modal_no_texture: "No texture available for this item.",
    texture_unnamed: "Unnamed Texture",
    tab_copyright: "Copyright",
    prop_type: "Type",
    prop_hardness: "Hardness",
    prop_durability: "Durability",
    prop_flammable: "Flammable",
    prop_transparent: "Transparent",
    prop_category: "Category",
    prop_description: "Description",
    prop_drops: "Drops",
    ext_version: "Version",
    ext_numeric_id: "Numeric ID",
    ext_edition: "Edition",
    ext_status: "Status",
    ext_rarity: "Rarity",
    ext_variant: "Variant",
    ext_introduced: "First Released",
    ext_removed: "Removed",
    ext_updated: "Last Updated",
    extra_props_title: "Technical Details",
    ext_abilities: "Abilities",
    ext_funfact: "Fun Fact",
    effects_title: "Status Effects",
    effects_gives: "Immunities",
    effects_none: "No known status effects",
    notes_title: "Notes",
    misc_title: "Additional Information",
    misc_aliases: "Alternative Names",
    misc_tags: "Tags",
    misc_related: "Related Entries",
    misc_source: "Source",
    misc_java_id: "Java ID",
    misc_bedrock_id: "Bedrock ID",
    misc_obtain: "Obtained From",
    misc_enchantments: "Possible Enchantments",
    misc_incompatible_enchantments: "Incompatible Enchantments",
    misc_trade_info: "Trade Info",
    misc_block_states: "Block States",
    misc_crafting_recipe: "Crafting Recipe",
    history_title: "Version History",
    history_none: "No version history available",
    value_none: "—",
    cmd_give: "/give Command",
    cmd_setblock: "/setblock Command",
    cmd_summon_item: "/summon Command (Item)",
    modal_play_all_sounds: "Play All Sounds",
    modal_stop_all_sounds: "Stop All Sounds",
    modal_no_sounds: "No sounds available for this item.",
    modal_sound_info: "Click on a sound to play it. Hold down the mouse button to play the sound on a loop.",
    modal_copyright_title: "Copyright Notice",
    modal_copyright_text: "The sounds are provided only as short audio examples to explain each Minecraft creature. All sounds and textures are <strong>property of Mojang Studios and Microsoft</strong>.",
    modal_legal_title: "Legal Notice:",
    modal_legal_text: "This website does not provide resource packs or complete game files for download.",
    cta_title: "Missing an item?",
    cta_desc: "We are constantly expanding our database. Let us know if an item is missing or information is incomplete.",
    cta_discord: "Report Item",
    cta_support: "Help & Support",
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
    loader_text: "Items Database is loading...",
    loader_text2: "Loading building blocks and tools...",
    loader_text3: "Loading combat and food items...",
    loader_text4: "Loading redstone and materials...",
    loader_text5: "Almost there...",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_welcome_title: "Items loaded!",
    toast_welcome_message: "Database ready",
    toast_error_no_data: "Failed to load data",
    toast_error_fallback: "Fallback items loaded",
    toast_item_opened: "Item opened",
    toast_item_opened_message: "Details for {name}",
    toast_copy_success: "Copied to clipboard",
    toast_copy_error: "Copy failed",
    toast_success: "Success",
    toast_info: "Info",
    toast_error: "Error",
    yes: "Yes",
    no: "No",
    no_description: "No description available.",
    copy_all: "Copy all",
    copied_all: "All copied!"
};
// ===== DOM ELEMENTS =====
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');
const itemsGrid = document.getElementById('itemsGrid');
const itemSearch = document.getElementById('itemSearch');
const itemCount = document.getElementById('itemCount');
const activeCategorySpan = document.getElementById('activeCategory');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalItemName = document.getElementById('modalItemName');
const modalItemIcon = document.getElementById('modalItemIcon');
const modalItemId = document.getElementById('modalItemId');
const modalItemStack = document.getElementById('modalItemStack');
const modalItemType = document.getElementById('modalItemType');
const modalItemVersion = document.getElementById('modalItemVersion');
const modalItemNumericID = document.getElementById('modalItemNumericID');
const modalItemAbilitiesList = document.getElementById('modalItemAbilitiesList');
const modalItemFunFact = document.getElementById('modalItemFunFact');
const modalItemHardness = document.getElementById('modalItemHardness');
const modalItemDurability = document.getElementById('modalItemDurability');
const modalItemFlammable = document.getElementById('modalItemFlammable');
const modalItemTransparent = document.getElementById('modalItemTransparent');
const modalItemCategory = document.getElementById('modalItemCategory');
const modalItemDescription = document.getElementById('modalItemDescription');
const modalItemDrops = document.getElementById('modalItemDrops');
const modalGiveCommand = document.getElementById('modalGiveCommand');
const modalSetblockCommand = document.getElementById('modalSetblockCommand');
const modalSummonCommand = document.getElementById('modalSummonCommand');
const playAllSoundsBtn = document.getElementById('playAllSounds');
const stopAllSoundsBtn = document.getElementById('stopAllSounds');
const soundsContainer = document.getElementById('modalItemSoundsContainer');

// Erweiterte Datenbank-Felder
const modalItemEdition = document.getElementById('modalItemEdition');
const modalItemStatus = document.getElementById('modalItemStatus');
const modalItemRarity = document.getElementById('modalItemRarity');
const modalItemVariant = document.getElementById('modalItemVariant');
const modalItemIntroduced = document.getElementById('modalItemIntroduced');
const modalItemRemoved = document.getElementById('modalItemRemoved');
const modalItemUpdated = document.getElementById('modalItemUpdated');
const modalItemExtraGrid = document.getElementById('modalItemExtraGrid');
const modalItemEffectsContent = document.getElementById('modalItemEffectsContent');
const modalItemMiscContent = document.getElementById('modalItemMiscContent');
const modalItemHistoryList = document.getElementById('modalItemHistoryList');
const modalItemNotes = document.getElementById('modalItemNotes');

// Textur-Tab Elemente
const modalItemTextureIcon = document.getElementById('modalItemTextureIcon');
const modalItemTexturesContainer = document.getElementById('modalItemTexturesContainer');

// Sound elements
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// global variables

let itemsData = {
    building: [], 
    color: [], 
    nature: [], 
    utility: [], 
    redstone: [],
    tools: [], 
    combat: [], 
    food: [], 
    materials: [], 
    spawn: [], 
    gamemod: []
};
let state = {
    currentItems: [],
    filteredItems: [],
    currentFilter: 'all',
    currentSearchTerm: ''
};
let activeSounds = [];
let currentItem = null;

// Order of categories for the "All" view (tab order)
const CATEGORY_ORDER = ['building', 'color', 'nature', 'utility', 'redstone', 'tools', 'combat', 'food', 'materials', 'spawn', 'gamemod'];

// Returns all items once (id+name+icon), in category order.
// Items with multiple categories remain in each individual category,
// but appear in "All" only on their first occurrence (earlier category wins).
function getAllItemsDeduped() {
    const seen = new Set();
    const result = [];
    for (const cat of CATEGORY_ORDER) {
        for (const item of (itemsData[cat] || [])) {
            const key = `${item.id || ''}||${item.name || ''}||${item.icon || ''}`;
            if (!seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        }
    }
    return result;
}

// ===== HELPER FUNCTIONS =====
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

// ===== DATA FORMATTING =====
function humanizeKey(key) {
    if (!key) return '';
    return key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function formatGenericValue(value) {
    if (value === null || value === undefined || value === '') return t('value_none');
    if (Array.isArray(value)) return value.length ? value.join(', ') : t('value_none');
    if (typeof value === 'object') {
        const entries = Object.entries(value);
        return entries.length ? entries.map(([k, v]) => `${humanizeKey(k)}: ${v}`).join(' / ') : t('value_none');
    }
    return String(value);
}

// flammable/transparent used to be booleans, but in the new database they are
// already spelled-out yes/no strings - a simple "value ? yes : no" would
// incorrectly show any non-empty string (even "No") as "Yes".
function formatYesNo(value) {
    if (typeof value === 'boolean') return value ? t('yes') : t('no');
    if (value === undefined || value === null || value === '') return t('value_none');
    return value;
}

function formatDrops(drops) {
    if (drops === undefined || drops === null) return t('value_none');
    if (Array.isArray(drops)) {
        if (!drops.length) return t('value_none');
        return drops.map(drop => {
            if (typeof drop === 'object') {
                const item = drop.item || drop.name || 'Unknown';
                const chance = drop.chance ? ` (${drop.chance})` : '';
                const amount = drop.amount ? `, x${drop.amount}` : '';
                const condition = drop.condition ? ` – ${drop.condition}` : '';
                return `${item}${chance}${amount}${condition}`;
            }
            return drop;
        }).join('; ');
    }
    return drops || t('value_none');
}

// All additional technical fields from the new database schema (block and item properties).
// Only rendered when the respective field is actually present on the item.
const EXTRA_ITEM_FIELDS = [
    { key: 'damage', de: 'Schaden', en: 'Damage' },
    { key: 'attack_speed', de: 'Angriffsgeschwindigkeit', en: 'Attack Speed' },
    { key: 'attack_reach', de: 'Angriffsreichweite', en: 'Attack Reach' },
    { key: 'damage_per_second', de: 'Schaden pro Sekunde', en: 'Damage per Second' },
    { key: 'armor_points', de: 'Rüstungspunkte', en: 'Armor Points' },
    { key: 'armor_toughness', de: 'Rüstungshärte', en: 'Armor Toughness' },
    { key: 'knockback_resistance', de: 'Rückstoßresistenz', en: 'Knockback Resistance' },
    { key: 'equip_slot', de: 'Ausrüstungsslot', en: 'Equip Slot' },
    { key: 'enchantable', de: 'Verzauberbar', en: 'Enchantable' },
    { key: 'enchantability', de: 'Verzauberbarkeitswert', en: 'Enchantability' },
    { key: 'repair_material', de: 'Reparaturmaterial', en: 'Repair Material' },
    { key: 'upgrade', de: 'Aufwertung', en: 'Upgrade' },
    { key: 'renewable', de: 'Erneuerbar', en: 'Renewable' },
    { key: 'stackable', de: 'Stapelbar', en: 'Stackable' },
    { key: 'used_as', de: 'Verwendung', en: 'Used As' },
    { key: 'hunger', de: 'Hunger', en: 'Hunger' },
    { key: 'saturation', de: 'Sättigung', en: 'Saturation' },
    { key: 'fuel_time', de: 'Brenndauer', en: 'Fuel Time' },
    { key: 'cooldown', de: 'Abklingzeit', en: 'Cooldown' },
    { key: 'use_duration', de: 'Nutzungsdauer', en: 'Use Duration' },
    { key: 'dispenser_behavior', de: 'Werferverhalten', en: 'Dispenser Behavior' },
    { key: 'compost_chance', de: 'Kompostierchance', en: 'Compost Chance' },
    { key: 'smelting_result', de: 'Schmelzresultat', en: 'Smelting Result' },
    { key: 'smelting_time', de: 'Schmelzdauer', en: 'Smelting Time' },
    { key: 'container_item', de: 'Behälter-Item', en: 'Container Item' },
    { key: 'tool', de: 'Werkzeug', en: 'Tool' },
    { key: 'best_tool', de: 'Bestes Werkzeug', en: 'Best Tool' },
    { key: 'requires_correct_tool', de: 'Benötigt richtiges Werkzeug', en: 'Requires Correct Tool' },
    { key: 'mining_time', de: 'Abbauzeit', en: 'Mining Time' },
    { key: 'blast_resistance', de: 'Explosionsresistenz', en: 'Blast Resistance' },
    { key: 'emits_light', de: 'Lichtabgabe', en: 'Emits Light' },
    { key: 'solid', de: 'Fest', en: 'Solid' },
    { key: 'full_block', de: 'Vollblock', en: 'Full Block' },
    { key: 'lava_flammable', de: 'In Lava brennbar', en: 'Lava Flammable' },
    { key: 'waterloggable', de: 'Wasserloggbar', en: 'Waterloggable' },
    { key: 'gravity', de: 'Schwerkraft', en: 'Gravity' },
    { key: 'map_color', de: 'Kartenfarbe', en: 'Map Color' },
    { key: 'found_in', de: 'Fundort', en: 'Found In' },
    { key: 'piston_reaction', de: 'Kolben-Reaktion', en: 'Piston Reaction' },
    { key: 'mob_spawn', de: 'Mob-Spawn', en: 'Mob Spawn' },
    { key: 'collision_box', de: 'Kollisionsbox', en: 'Collision Box' },
    { key: 'placement', de: 'Platzierung', en: 'Placement' },
    { key: 'interaction', de: 'Interaktion', en: 'Interaction' },
    { key: 'container_size', de: 'Behältergröße', en: 'Container Size' },
    { key: 'fluid', de: 'Flüssigkeit', en: 'Fluid' },
    { key: 'instrument', de: 'Notenblock-Instrument', en: 'Note Block Instrument' },
    { key: 'redstone', de: 'Redstone-Verhalten', en: 'Redstone Behavior' },
    { key: 'redstone_signal', de: 'Redstone-Signal', en: 'Redstone Signal' },
    { key: 'signal_strength', de: 'Signalstärke', en: 'Signal Strength' },
    { key: 'redstone_function', de: 'Redstone-Funktion', en: 'Redstone Function' },
    { key: 'comparator_output', de: 'Komparator-Ausgang', en: 'Comparator Output' },
    { key: 'loot_table', de: 'Loot-Tabelle', en: 'Loot Table', code: true },
    { key: 'is_slab', de: 'Ist Stufe', en: 'Is Slab' },
    { key: 'is_stairs', de: 'Ist Treppe', en: 'Is Stairs' },
    { key: 'is_wall', de: 'Ist Mauer', en: 'Is Wall' }
];

function renderExtraItemFields(item) {
    if (!modalItemExtraGrid) return;
    const rows = EXTRA_ITEM_FIELDS.filter(f => item[f.key] !== undefined);
    if (!rows.length) {
        modalItemExtraGrid.innerHTML = '';
        document.getElementById('extraPropertiesContainer').style.display = 'none';
        return;
    }
    document.getElementById('extraPropertiesContainer').style.display = 'block';
    modalItemExtraGrid.innerHTML = rows.map(f => `
        <div class="property">
            <div class="property-label">${escapeHtml(f.en)}</div>
            <div class="property-value${f.code ? ' value-code' : ''}">${escapeHtml(formatGenericValue(item[f.key]))}</div>
        </div>
    `).join('');
}

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {}
}
function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    levelUpSound.currentTime = 0;
    levelUpSound.play().catch(()=>{});
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

function initSoundToggle() {
    updateSoundIcon();
    if(soundBtn) soundBtn.addEventListener('click', toggleSound);
    if(mobileSoundBtn) mobileSoundBtn.addEventListener('click', toggleSound);
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
    if(soundIcon) soundIcon.src = src;
    if(mobileSoundIcon) mobileSoundIcon.src = src;
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

    let progress = 0;
    const loadingText = document.querySelector('.loading-text');
    if(!loadingText) return;
    const texts = [
        t('loader_text'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
    ];
    let index = 0;
    const interval = setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if(progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    playLevelUpSound();
                    showWelcomeToast();
                }, 150);
                setTimeout(() => loader.style.display = 'none', 500);
            }, 300);
        } else if(index < texts.length-1) {
            index++;
            loadingText.textContent = texts[index];
        }
    }, 120);
}
function showWelcomeToast() {
    showToast(t('toast_welcome_title'), t('toast_welcome_message'), 'info');
}

function initTheme() { applyTheme(currentTheme); updateActiveThemeButtons(); }
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
    document.querySelectorAll('.theme-option').forEach(opt => opt.classList.toggle('active', opt.dataset.theme === currentTheme));
    document.querySelectorAll('.theme-option-btn').forEach(opt => opt.classList.toggle('active', opt.dataset.theme === currentTheme));
}
function initMobileMenu() {
    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('show');
        document.body.style.overflow = 'hidden';
        playClickSound();
    });
    if(closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if(mobileNav) mobileNav.addEventListener('click', (e) => { if(e.target === mobileNav) closeMobileMenu(); });
    document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeMobileMenu));
}
function closeMobileMenu() {
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
    playClickSound();
}
function initThemeSwitcher() {
    if(themeBtn) themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
        playClickSound();
    });
    document.addEventListener('click', (e) => {
        if(!e.target.closest('.theme-switcher')) themeDropdown.classList.remove('show');
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
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if(header) header.classList.toggle('scrolled', window.scrollY > 50);
        if(backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
    });
    if(backToTop) backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playClickSound();
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if(target && header) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    let icon = 'fa-check-circle';
    if(type === 'error') icon = 'fa-exclamation-triangle';
    else if(type === 'info') icon = 'fa-info-circle';
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
    }, 7000);
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
}


// ===== LOAD DATA (with language prefix) =====
async function loadAllItemsData() {
    // Clear all categories
    for (const cat in itemsData) itemsData[cat] = [];

    const langPrefix = 'en_';
    const t = Date.now();

    const files = [
        { url: `/assets/JS/items/${langPrefix}building.json`,  cat: 'building'  },
        { url: `/assets/JS/items/${langPrefix}color.json`,     cat: 'color'     },
        { url: `/assets/JS/items/${langPrefix}nature.json`,    cat: 'nature'    },
        { url: `/assets/JS/items/${langPrefix}utility.json`,   cat: 'utility'   },
        { url: `/assets/JS/items/${langPrefix}redstone.json`,  cat: 'redstone'  },
        { url: `/assets/JS/items/${langPrefix}tools.json`,     cat: 'tools'     },
        { url: `/assets/JS/items/${langPrefix}combat.json`,    cat: 'combat'    },
        { url: `/assets/JS/items/${langPrefix}food.json`,      cat: 'food'      },
        { url: `/assets/JS/items/${langPrefix}materials.json`, cat: 'materials' },
        { url: `/assets/JS/items/${langPrefix}spawneggs.json`, cat: 'spawn'     },
        { url: `/assets/JS/items/${langPrefix}gamemod.json`,   cat: 'gamemod'   }
    ];

    for (const file of files) {
        try {
            const res = await fetch(`${file.url}?v=${t}`);
            const items = res.ok ? await res.json() : [];
            if (Array.isArray(items) && items.length > 0) {
                itemsData[file.cat] = items;
                console.log(`✅ ${file.cat}: ${items.length} Items`);
                // Render immediately so items appear progressively
                filterItemsByCategory(state.currentFilter);
            } else {
                console.warn(`⚠️ ${file.cat}: no data (${file.url})`);
            }
        } catch (err) {
            console.error(`❌ Error: ${file.url}`, err);
        }
    }

    const total = Object.values(itemsData).reduce((s, a) => s + a.length, 0);
    console.log(`Total: ${total} items (en)`);

    if (total === 0) {
        showToast(t('toast_error_no_data'), 'Fehler beim Laden', 'error');
        loadFallbackItems();
        return;
    }

    filterItemsByCategory(state.currentFilter);
    showWelcomeToast();

    // Direkt zum Grid scrollen (nicht zur Section)
    setTimeout(() => {
        const grid = document.getElementById('itemsGrid');
        const header = document.querySelector('.header');
        if (grid) {
            const top = grid.getBoundingClientRect().top + window.scrollY;
            const offset = (header ? header.offsetHeight : 70) + 20;
            window.scrollTo({ top: top - offset, behavior: 'smooth' });
        }
    }, 300);
}

// ===== FALLBACK (four items, two building blocks) =====
function loadFallbackItems() {
    itemsData.building = [
        { 
            id: "minecraft:stone", 
            name: "Stone", 
            category: "building", 
            icon: "/assets/img/blocks/Stone.png",
            stack: 64, 
            type: "Block", 
            hardness: 1.5, 
            flammable: false, 
            transparent: false, 
            description: "Basic building block."
        },
        { 
            id: "minecraft:oak_planks", 
            name: "Oak Planks", 
            category: "building", 
            icon: "/assets/img/blocks/Oak_Planks.png", 
            stack: 64, 
            type: "Block", 
            hardness: 2.0, 
            flammable: true, 
            description: "Wooden planks for buildings." 
        }
    ];
    itemsData.tools = [
        { 
            id: "minecraft:wooden_pickaxe", 
            name: "Wooden Pickaxe", 
            category: "tools", 
            icon: "/assets/img/items/Enchanted_Wooden_Pickaxe.gif", 
            stack: 1, 
            type: "Tool", 
            durability: 59,
            description: "Basic tool." 
        }
    ];
    itemsData.combat = [
        { 
            id: "minecraft:iron_sword", 
            name: "Iron Sword", 
            category: "combat", 
            icon: "/assets/img/items/Enchanted_Iron_Sword.gif", 
            stack: 1, 
            type: "Weapon", 
            durability: 250, 
            description: "Standard sword." 
        }
    ];
    filterItemsByCategory('all');
    showToast(t('toast_error_fallback'), 'Info', 'info');
}

// ===== FILTER & RENDER =====
function filterItemsByCategory(category) {
    state.currentFilter = category;
    state.currentSearchTerm = '';
    if(itemSearch) itemSearch.value = '';
    if(category === 'all') {
        state.currentItems = getAllItemsDeduped();
    } else {
        state.currentItems = itemsData[category] ? [...itemsData[category]] : [];
    }
    state.filteredItems = [...state.currentItems];
    renderItems();
    updateItemStats();
    updateActiveCategoryTab(category);
}
function searchItems(searchTerm) {
    state.currentSearchTerm = searchTerm.toLowerCase().trim();
    if(!state.currentSearchTerm) {
        filterItemsByCategory(state.currentFilter);
        return;
    }
    if(state.currentFilter === 'all') {
        state.filteredItems = getAllItemsDeduped().filter(item => itemMatchesSearch(item, state.currentSearchTerm));
    } else {
        state.filteredItems = itemsData[state.currentFilter].filter(item => itemMatchesSearch(item, state.currentSearchTerm));
    }
    renderItems();
    updateItemStats();
}
function itemMatchesSearch(item, term) {
    return (item.name && item.name.toLowerCase().includes(term)) ||
           (item.id && item.id.toLowerCase().includes(term)) ||
           (item.description && item.description.toLowerCase().includes(term));
}
function renderItems() {
    if(!itemsGrid) return;
    itemsGrid.innerHTML = '';
    if(!state.filteredItems.length) {
        itemsGrid.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search">
            </i><h3>No items found</h3>
            <p>Try a different search term or another category</p>
        </div>`;
        return;
    }
    for(const item of state.filteredItems) {
        try {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.id = item.id;
        card.tabIndex = 0;
        const icon = item.icon || '/assets/img/mobs/default/default.png';
        card.innerHTML = `
            <div class="item-card-header">
                <div class="item-icon" style="background-image: url('${icon}')"></div>
                <div class="item-info">
                    <div class="item-name">${escapeHtml(item.name)}</div>
                    <div class="item-id">${escapeHtml(item.id)}</div>
                    <div class="item-meta">
                        <span class="item-category">${getCategoryName(item.category)}</span>
                        <div class="item-stack"><i class="fas fa-layer-group"></i> ${item.stack || 64}</div>
                    </div>
                </div>
            </div>
        `;
            card.addEventListener('click', () => openItemModal(item));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openItemModal(item);
                }
            });
            itemsGrid.appendChild(card);
        } catch (error) {
            console.error('Error rendering item:', item.name, error);
        }
    }

}
function getCategoryName(category) {
    const names = {
        building: t('filter_building'),
        color: t('filter_color'),
        nature: t('filter_nature'),
        utility: t('filter_utility'),
        redstone: t('filter_redstone'),
        tools: t('filter_tools'),
        combat: t('filter_combat'),
        food: t('filter_food'),
        materials: t('filter_materials'),
        spawn: t('filter_spawn'),
        gamemod: t('filter_gamemod')
    };
    return names[category] || category;
}
function updateItemStats() {
    if(itemCount) itemCount.textContent = `${state.filteredItems.length} ${t('items_grid_count').replace(/[0-9+]/g, '').trim()}`;
    if(activeCategorySpan) activeCategorySpan.textContent = getCategoryName(state.currentFilter);
}
function updateActiveCategoryTab(category) {
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.category === category));
}

// ===== MODAL FUNCTIONS =====
function openItemModal(item) {
    if(!item) return;
    currentItem = item;
    setModalBasicInfo(item);
    setModalProperties(item);
    setModalExtendedInfo(item);
    setModalCommands(item);
    setModalTexture(item);
    loadItemSounds(item);
    document.getElementById('itemModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    showToast(t('toast_item_opened'), t('toast_item_opened_message', { name: item.name }), 'info');
}
function closeItemModal() {
    document.getElementById('itemModal').classList.remove('show');
    document.body.style.overflow = '';
    playClickSound();
    stopAllSounds();
}
function setModalBasicInfo(item) {
    modalItemName.textContent = item.name || 'Unknown';
    modalItemIcon.style.backgroundImage = `url('${item.icon || '/assets/img/mobs/default/default.png'}')`;
    modalItemId.textContent = item.id || 'N/A';
    modalItemStack.textContent = item.stack || 64;
}
function setModalProperties(item) {
    modalItemType.textContent = item.type || 'Item';
    modalItemHardness.textContent = item.hardness !== undefined ? formatGenericValue(item.hardness) : '-';
    modalItemDurability.textContent = item.durability !== undefined ? formatGenericValue(item.durability) : '-';
    modalItemFlammable.textContent = formatYesNo(item.flammable);
    modalItemTransparent.textContent = formatYesNo(item.transparent);
    modalItemCategory.textContent = getCategoryName(item.category);
    modalItemDescription.textContent = item.description || t('no_description');
    if (modalItemDrops) {
        const dropsText = formatDrops(item.drops);
        modalItemDrops.textContent = dropsText;
        const container = document.getElementById('modalItemDropsContainer');
        if (container) container.style.display = (item.drops !== undefined) ? 'block' : 'none';
    }
}

function setModalExtendedInfo(item) {
    modalItemVersion.textContent = item.version || 'Unknown';
    modalItemNumericID.textContent = item.numeric_id !== undefined ? item.numeric_id : 'N/A';
    modalItemEdition.textContent = item.edition || t('value_none');
    modalItemStatus.textContent = item.status || t('value_none');
    modalItemRarity.textContent = item.rarity || t('value_none');
    modalItemVariant.textContent = item.variant || t('value_none');
    modalItemIntroduced.textContent = item.introduced_date || t('value_none');
    modalItemRemoved.textContent = item.removed_date || t('value_none');
    modalItemUpdated.textContent = item.updated_at || t('value_none');

    renderExtraItemFields(item);

    // Abilities (always visible)
    if (modalItemAbilitiesList) {
        modalItemAbilitiesList.innerHTML = '';
        if (item.abilities?.length) {
            item.abilities.forEach(ability => {
                const li = document.createElement('li');
                li.textContent = ability;
                modalItemAbilitiesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = t('value_none');
            modalItemAbilitiesList.appendChild(li);
        }
    }

    // Status effects & immunities (always visible)
    if (modalItemEffectsContent) {
        let html = '';
        if (item.effects?.length) {
            html += item.effects.map(effect => {
                const parts = [effect.type, effect.level, effect.duration, effect.chance, effect.condition].filter(Boolean).join(' · ');
                const desc = effect.description ? `<br><span>${escapeHtml(effect.description)}</span>` : '';
                return `<p><strong>${escapeHtml(effect.name || humanizeKey('effect'))}:</strong> ${escapeHtml(parts)}${desc}</p>`;
            }).join('');
        } else {
            html += `<p>${t('effects_none')}</p>`;
        }
        html += `<p><strong>${escapeHtml(t('effects_gives'))}:</strong> ${item.effect_immunities?.length ? escapeHtml(item.effect_immunities.join(', ')) : t('value_none')}</p>`;
        modalItemEffectsContent.innerHTML = html;
    }

    // Additional information (always visible)
    if (modalItemMiscContent) {
        const rows = [
            [t('misc_aliases'), item.aliases?.length ? item.aliases.join(', ') : null, false],
            [t('misc_tags'), item.tags?.length ? item.tags.join(', ') : null, false],
            [t('misc_obtain'), item.obtain?.length ? item.obtain.join(', ') : null, false],
            [t('misc_crafting_recipe'), (item.crafting_recipe && typeof item.crafting_recipe === 'object' && Object.keys(item.crafting_recipe).length) ? formatGenericValue(item.crafting_recipe) : (typeof item.crafting_recipe === 'string' ? item.crafting_recipe : null), false],
            [t('misc_enchantments'), item.enchantments?.length ? item.enchantments.join(', ') : null, false],
            [t('misc_incompatible_enchantments'), item.incompatible_enchantments?.length ? item.incompatible_enchantments.join(', ') : null, false],
            [t('misc_trade_info'), (item.trade_info && (!Array.isArray(item.trade_info) || item.trade_info.length)) ? formatGenericValue(item.trade_info) : null, false],
            [t('misc_block_states'), item.block_states?.length ? item.block_states.join(', ') : null, false],
            [t('misc_related'), item.related_entries?.length ? item.related_entries.join(', ') : null, true],
            [t('misc_java_id'), item.java_item_id || item.java_block_id || null, true],
            [t('misc_bedrock_id'), item.bedrock_item_id || item.bedrock_block_id || null, true]
        ];

        modalItemMiscContent.innerHTML = rows.map(([label, value, isCode]) => {
            const displayValue = value ? escapeHtml(value) : t('value_none');
            return `<p><strong>${escapeHtml(label)}:</strong> ${isCode && value ? `<code class="value-code">${displayValue}</code>` : displayValue}</p>`;
        }).join('');
        modalItemMiscContent.innerHTML += item.source
            ? `<p><strong>${escapeHtml(t('misc_source'))}:</strong> <a href="${escapeHtml(item.source)}" target="_blank" rel="noopener">${escapeHtml(item.source)}</a></p>`
            : `<p><strong>${escapeHtml(t('misc_source'))}:</strong> ${t('value_none')}</p>`;
    }

    // Version history (always visible)
    if (modalItemHistoryList) {
        modalItemHistoryList.innerHTML = '';
        if (item.version_history?.length) {
            item.version_history.forEach(entry => {
                const li = document.createElement('li');
                const date = entry.date ? `${entry.date} – ` : '';
                li.innerHTML = `${date}<strong>${escapeHtml(entry.version || '')}</strong>: ${escapeHtml(entry.change || '')}`;
                modalItemHistoryList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = t('history_none');
            modalItemHistoryList.appendChild(li);
        }
    }

    // Notes (always visible)
    if (modalItemNotes) {
        modalItemNotes.textContent = item.notes || t('value_none');
    }

    // Fun fact (always visible)
    if (modalItemFunFact) {
        modalItemFunFact.textContent = item.fun_fact || t('value_none');
    }
}

function getDisplayTextureMeta(texture) {
    return {
        name: texture?.name || t('texture_unnamed'),
        description: texture?.description || ''
    };
}

function setModalTexture(item) {
    if (!modalItemTextureIcon || !modalItemTexturesContainer) return;
    const textures = item.texture || [];

    if (!textures.length) {
        modalItemTexturesContainer.innerHTML = `<p class="no-texture-message" data-i18n="modal_no_texture">${t('modal_no_texture')}</p>`;
        modalItemTextureIcon.style.backgroundImage = '';
        modalItemTextureIcon.style.backgroundColor = 'rgba(0,0,0,0.2)';
        return;
    }

    const firstTexture = textures[0];
    if (firstTexture.file) {
        modalItemTextureIcon.style.backgroundImage = `url('${firstTexture.file}')`;
    }

    modalItemTexturesContainer.innerHTML = '';
    textures.forEach((texture) => {
        const textureCard = document.createElement('div');
        textureCard.className = 'texture-card';
        const meta = getDisplayTextureMeta(texture);

        const previewImg = document.createElement('div');
        previewImg.style.cssText = `
            width: 80px;
            height: 80px;
            margin: 0 auto var(--spacing-sm) auto;
            background-image: url('${texture.file}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
        `;

        const nameEl = document.createElement('div');
        nameEl.style.cssText = `
            font-weight: 600;
            color: var(--text-primary);
            text-align: center;
            margin-bottom: var(--spacing-xs);
            font-size: var(--text-sm);
        `;
        nameEl.textContent = meta.name;

        const descEl = document.createElement('div');
        descEl.style.cssText = `
            font-size: var(--text-xs);
            color: var(--text-secondary);
            text-align: center;
        `;
        descEl.textContent = meta.description || '';

        textureCard.appendChild(previewImg);
        textureCard.appendChild(nameEl);
        if (meta.description) textureCard.appendChild(descEl);

        textureCard.addEventListener('click', () => {
            modalItemTextureIcon.style.backgroundImage = `url('${texture.file}')`;
            document.querySelectorAll('.texture-card').forEach(card => {
                card.style.borderColor = 'var(--border-color)';
                card.style.backgroundColor = 'var(--bg-surface)';
            });
            textureCard.style.borderColor = 'var(--primary)';
            textureCard.style.backgroundColor = 'rgba(0, 168, 107, 0.1)';
            playClickSound();
        });

        modalItemTexturesContainer.appendChild(textureCard);
    });

    const firstCard = modalItemTexturesContainer.querySelector('.texture-card');
    if (firstCard) {
        firstCard.style.borderColor = 'var(--primary)';
        firstCard.style.backgroundColor = 'rgba(0, 168, 107, 0.1)';
    }
}

function setModalCommands(item) {
    modalGiveCommand.textContent = `/give @p ${item.id} 1`;
    modalSetblockCommand.textContent = `/setblock ~ ~ ~ ${item.id}`;
    modalSummonCommand.textContent = `/summon item ~ ~ ~ {Item:{id:"${item.id}",Count:1b}}`;
}
function loadItemSounds(item) {
    if(!soundsContainer) return;
    const sounds = item.sounds || [];
    if(!sounds.length) {
        soundsContainer.innerHTML = `<p class="no-sounds" data-i18n="modal_no_sounds">${t('modal_no_sounds')}</p>`;
        return;
    }
    soundsContainer.innerHTML = '';
    sounds.forEach((sound, idx) => {
        const soundItem = document.createElement('div');
        soundItem.className = 'sound-item';
        soundItem.setAttribute('data-sound-index', idx);
        soundItem.innerHTML = `
            <div class="sound-play-icon"><i class="fas fa-play"></i></div>
            <div class="sound-info">
                <div class="sound-name">${escapeHtml(sound.name)}</div>
                ${sound.description ? `<div class="sound-description">${escapeHtml(sound.description)}</div>` : ''}
                ${sound.duration ? `<div class="sound-duration">${escapeHtml(sound.duration)}</div>` : ''}
                ${sound.category ? `<div class="sound-category">${escapeHtml(sound.category)}</div>` : ''}
            </div>
        `;
        soundItem.addEventListener('click', (e) => { e.stopPropagation(); playSoundOnce(sound, soundItem); });
        let loop = null;
        soundItem.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if(loop) return;
            loop = setInterval(() => playSoundOnce(sound, soundItem), 100);
        });
        soundItem.addEventListener('mouseup', () => { if(loop) clearInterval(loop); loop = null; });
        soundItem.addEventListener('mouseleave', () => { if(loop) clearInterval(loop); loop = null; });
        soundsContainer.appendChild(soundItem);
    });
}
function playSoundOnce(sound, element) {
    if(!soundEnabled || !sound.file) return;
    try {
        const audio = new Audio(sound.file);
        audio.volume = 0.5;
        audio.play().catch(()=>{});
        const icon = element.querySelector('.sound-play-icon i');
        if(icon) {
            const old = icon.className;
            icon.className = 'fas fa-volume-up';
            setTimeout(() => icon.className = old, 300);
        }
    } catch(e) {}
}
function playAllSounds() {
    if(!currentItem) return;
    const sounds = currentItem.sounds || [];
    if(!sounds.length) return;
    stopAllSounds();
    sounds.forEach(sound => {
        if(!sound.file) return;
        try {
            const audio = new Audio(sound.file);
            audio.volume = 0.5;
            audio.play().catch(()=>{});
            activeSounds.push(audio);
            audio.addEventListener('ended', () => {
                const idx = activeSounds.indexOf(audio);
                if(idx !== -1) activeSounds.splice(idx,1);
            });
        } catch(e) {}
    });
}
function stopAllSounds() {
    activeSounds.forEach(audio => { try{ audio.pause(); audio.currentTime=0; }catch(e){} });
    activeSounds = [];
}
function escapeHtml(text) {
    if(!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENT LISTENER =====
function initEventListeners() {
    if(itemSearch) {
        let timeout;
        itemSearch.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => searchItems(e.target.value), 300);
        });
    }
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            filterItemsByCategory(tab.dataset.category);
            playClickSound();
        });
    });
    if(modalOverlay) modalOverlay.addEventListener('click', closeItemModal);
    if(modalClose) modalClose.addEventListener('click', closeItemModal);
    document.querySelectorAll('.item-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            document.querySelectorAll('.item-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
            playClickSound();
        });
    });
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.copy;
            let text = '';
            if(type === 'give') text = modalGiveCommand.textContent;
            else if(type === 'setblock') text = modalSetblockCommand.textContent;
            else if(type === 'summon') text = modalSummonCommand.textContent;
            if(text) {
                copyToClipboard(text);
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
            }
        });
    });
    if(playAllSoundsBtn) playAllSoundsBtn.addEventListener('click', () => { playAllSounds(); playClickSound(); });
    if(stopAllSoundsBtn) stopAllSoundsBtn.addEventListener('click', () => { stopAllSounds(); playClickSound(); });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && document.getElementById('itemModal').classList.contains('show')) closeItemModal();
    });
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('toast_copy_success'), t('toast_success'), 'success');
    }).catch(() => {
        showToast(t('toast_copy_error'), t('toast_error'), 'error');
    });
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .items-grid .item-card, .item-card {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            overflow: visible !important;
        }
    `;
    document.head.appendChild(styleEl);
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initEventListeners();
    initSoundToggle();
    loadAllItemsData();
});
