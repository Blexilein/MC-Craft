// mobs.js

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Text strings for this page (English only)
const T = {
    site_title: "MC-Craft | Mobs Database",
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
    mobs_hero_title: "Minecraft <span class=\"highlight\">Mobs Catalog</span>",
    hero_badge: "V 1.0.0 is here",
    mobs_hero_desc: "Discover all creatures, monsters and animals from the Minecraft world. Find detailed information, behavior and commands for every mob.",
    mobs_btn_explore: "Explore Mobs",
    mobs_btn_copyright: "Copyright Info",
    mobs_grid_count: "85+ Mobs",
    mobs_grid_commands: "Commands",
    mobs_grid_search: "Live Search",
    mobs_grid_details: "Detailed Info",
    mobs_section_title: "Minecraft <span class=\"highlight\">Mobs</span>",
    mobs_section_subtitle: "Search all mobs by type or use live search",
    filter_all: "All",
    filter_passive: "Passive",
    filter_neutral: "Neutral",
    filter_hostile: "Hostile",
    filter_jockey: "Jockeys",
    filter_boss: "Bosses",
    filter_summonable: "Summonable",
    filter_player: "Player",
    search_placeholder: "Search mobs...",
    results_title: "No mobs found",
    results_text: "Try a different search term or category",
    category_all: "All Categories",
    modal_texture_title: "Texture Preview",
    modal_no_texture: "No texture available for this mob.",
    modal_sounds_title: "Mob Sounds",
    modal_sounds_text: "Listen to the sounds of each mob in the game.",
    modal_play_all_sounds: "Play All Sounds",
    modal_stop_all_sounds: "Stop All Sounds",
    modal_no_sounds: "No sounds available for this mob.",
    modal_sound_info: "Click on a sound to play it. Hold down the mouse button to play the sound on a loop.",
    copyright_title: "Copyright Information",
    copyright_subtitle: "Legal information about Minecraft content",
    copyright_notice_title: "Minecraft is a registered trademark",
    copyright_notice_text1: "This website is not affiliated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Studios. All rights to game content, including sounds, graphics and texts, belong to Mojang Studios.",
    copyright_important: "Important Notice:",
    copyright_important_text: "Due to copyright restrictions, we cannot offer Minecraft sounds for download directly on our website.",
    copyright_resources: "Official Resources:",
    copyright_wiki: "Minecraft Wiki - Mob Sounds:",
    copyright_wiki_desc: "Visit the official Minecraft Wiki to listen to all mob sounds.",
    copyright_official: "Official Minecraft Website:",
    copyright_official_desc: "The official Minecraft website by Mojang Studios.",
    copyright_legal: "Legal Information:",
    copyright_legal_text1: "Use of Minecraft content is subject to the <a href=\"https://www.minecraft.net/terms\" target=\"_blank\" rel=\"noopener\">Minecraft Terms of Use</a>. If you have questions about the use of the content, please contact Mojang Studios directly.",
    copyright_disclaimer: "This site is for informational purposes only and makes no claim to completeness or accuracy.",
    modal_health: "Health Points",
    tab_properties: "Properties",
    tab_extended: "Extended Info",
    tab_commands: "Commands",
    tab_texture: "Texture",
    tab_copyright: "Copyright",
    prop_type: "Type",
    prop_health: "Health",
    prop_damage: "Damage",
    prop_size: "Size (Adult)",
    prop_baby_size: "Size (Baby)",
    prop_biome: "Spawn Biome",
    prop_xp: "Experience",
    prop_description: "Description",
    prop_drops: "Drops",
    player_sizes_title: "Player Sizes",
    player_size_sneaking: "Sneaking",
    player_size_gliding: "Gliding/Swimming",
    player_size_sleeping: "Sleeping",
    ext_version: "Version",
    ext_numeric_id: "Numeric ID",
    ext_damage_details: "Damage details",
    ext_dragon_fireball: "Dragon Fireball",
    ext_flying_wither_skull: "Wither Skull",
    ext_dimension: "Dimension",
    ext_speed: "Movement Speed",
    ext_light: "Light Level",
    ext_structure: "Structure",
    ext_abilities: "Abilities",
    ext_funfact: "Fun Fact",
    ext_classification: "Classification",
    ext_category: "Category",
    ext_edition: "Edition",
    ext_status: "Status",
    ext_armor: "Armor",
    ext_attack_type: "Attack Type",
    ext_knockback: "Knockback Resistance",
    ext_loot_table: "Loot Table",
    ext_introduced: "First Released",
    ext_removed: "Removed",
    ext_updated: "Last Updated",
    ext_model: "Model",
    effects_title: "Status Effects",
    effects_gives: "Immunities",
    effects_none: "No known status effects",
    notes_title: "Notes",
    history_none: "No version history available",
    misc_animation: "Animations",
    misc_gallery: "Gallery",
    behavior_title: "Behavior",
    behavior_renewable: "Renewable",
    behavior_despawn: "Can Despawn",
    behavior_tameable: "Tameable",
    behavior_breedable: "Breedable",
    behavior_duplicable: "Duplicable",
    behavior_leashable: "Leashable",
    behavior_rideable: "Rideable",
    behavior_baby_variant: "Baby Variant",
    behavior_fire_immune: "Fire Immune",
    behavior_undead: "Undead",
    behavior_boss_bar: "Boss Bar",
    misc_title: "Additional Information",
    misc_aliases: "Alternative Names",
    misc_tags: "Tags",
    misc_related: "Related Entries",
    misc_source: "Source",
    misc_java_id: "Java Entity ID",
    misc_bedrock_id: "Bedrock Entity ID",
    misc_targets: "Targets",
    misc_enemy_mobs: "Enemy Mobs",
    misc_follows: "Follows",
    misc_healing_item: "Healing Item",
    history_title: "Version History",
    value_none: "—",
    cmd_summon: "/summon Command",
    cmd_spawnegg: "Spawn Egg ID",
    cmd_give: "/give Command (Spawn Egg)",
    texture_unnamed: "Unnamed Texture",
    modal_copyright_text: "The sounds are provided only as short audio examples to explain each Minecraft creature. All sounds and textures are <strong>property of Mojang Studios and Microsoft</strong>.",
    modal_official_links: "Official Sound Sources:",
    modal_official_info: "Visit the official Minecraft Wiki for information about all Minecraft mob sounds.",
    modal_legal_title: "Legal Notice:",
    modal_legal_text: "This website does not provide resource packs or complete game files for download.",
    cta_title: "Missing a mob?",
    cta_desc: "We are constantly expanding our database. Let us know if a mob is missing or information is incomplete.",
    cta_discord: "Report Mob",
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
    loader_text: "Mobs Database is loading...",
    loader_text2: "Loading Passive and Neutral Mobs...",
    loader_text3: "Loading Boss and Hostile Mobs...",
    loader_text4: "Loading Player and Summonable Mobs...",
    loader_text5: "Almost there...",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_welcome_title: "Mobs loaded!",
    toast_welcome_message: "Database ready",
    toast_error_no_data: "Failed to load data",
    toast_error_fallback: "Fallback mobs loaded",
    toast_mob_opened: "Mob opened",
    toast_mob_opened_message: "Details for {name}",
    toast_copy_success: "Copied to clipboard",
    toast_copy_error: "Copy failed",
    toast_success: "Success",
    toast_info: "Info",
    toast_error: "Error",
    no_texture: "No texture available for this mob.",
    modal_copyright_title: "Copyright Notice"
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
const mobsGrid = document.getElementById('mobsGrid');
const mobSearch = document.getElementById('mobSearch');
const categoryTabs = document.getElementById('categoryTabs');
const mobCount = document.getElementById('mobCount');
const activeCategory = document.getElementById('activeCategory');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalMobName = document.getElementById('modalMobName');
const modalMobIcon = document.getElementById('modalMobIcon');
const modalMobId = document.getElementById('modalMobId');
const modalMobHealth = document.getElementById('modalMobHealth');
const modalMobType = document.getElementById('modalMobType');
const modalMobTypeValue = document.getElementById('modalMobTypeValue');
const modalMobHealthValue = document.getElementById('modalMobHealthValue');
const modalMobDamage = document.getElementById('modalMobDamage');
const modalMobSize = document.getElementById('modalMobSize');
const modalBabyMobSize = document.getElementById('modalBabyMobSize');
const modalMobBiome = document.getElementById('modalMobBiome');
const modalMobXP = document.getElementById('modalMobXP');
const modalMobDescription = document.getElementById('modalMobDescription');
const modalMobDrops = document.getElementById('modalMobDrops');
const modalPlayerSneakingSize = document.getElementById('modalPlayerSneakingSize');
const modalPlayerGlidingSwimmingSize = document.getElementById('modalPlayerGlidingSwimmingSize');
const modalPlayerSleepingSize = document.getElementById('modalPlayerSleepingSize');
const modalMobVersion = document.getElementById('modalMobVersion');
const modalMobNumericID = document.getElementById('modalMobNumericID');
const modalMobDimension = document.getElementById('modalMobDimension');
const modalMobMovementSpeed = document.getElementById('modalMobMovementSpeed');
const modalMobLightLevel = document.getElementById('modalMobLightLevel');
const modalMobStructure = document.getElementById('modalMobStructure');
const modalMobAbilitiesList = document.getElementById('modalMobAbilitiesList');
const modalMobFunFact = document.getElementById('modalMobFunFact');
const modalSummonCommand = document.getElementById('modalSummonCommand');
const modalSpawnEggCommand = document.getElementById('modalSpawnEggCommand');
const modalGiveCommand = document.getElementById('modalGiveCommand');
const playAllSoundsBtn = document.getElementById('playAllSounds');
const stopAllSoundsBtn = document.getElementById('stopAllSounds');
const soundsContainer = document.getElementById('modalMobSoundsContainer');
const playerSizesContainer = document.getElementById('playerSizesContainer');
const babySizeProperty = document.getElementById('babySizeProperty');

// Texture tab element
const modalTextureIcon = document.getElementById('modalTextureIcon');
const modalMobTexturesContainer = document.getElementById('modalMobTexturesContainer');

// Boss details elements
const bossDetailsContainer = document.getElementById('bossDetailsContainer');
const modalMobMobType = document.getElementById('modalMobMobType');
const damageDetailsContainer = document.getElementById('damageDetailsContainer');
const damageDetailsContent = document.getElementById('damageDetailsContent');
const dragonFireballContainer = document.getElementById('dragonFireballContainer');
const dragonFireballContent = document.getElementById('dragonFireballContent');
const witherSkullContainer = document.getElementById('witherSkullContainer');
const witherSkullContent = document.getElementById('witherSkullContent');

// Extended database fields
const modalMobCategory = document.getElementById('modalMobCategory');
const modalMobEdition = document.getElementById('modalMobEdition');
const modalMobStatus = document.getElementById('modalMobStatus');
const modalMobArmor = document.getElementById('modalMobArmor');
const modalMobAttackType = document.getElementById('modalMobAttackType');
const modalMobKnockback = document.getElementById('modalMobKnockback');
const modalMobLootTable = document.getElementById('modalMobLootTable');
const modalMobIntroduced = document.getElementById('modalMobIntroduced');
const modalMobRemoved = document.getElementById('modalMobRemoved');
const modalMobUpdated = document.getElementById('modalMobUpdated');
const modalMobModel = document.getElementById('modalMobModel');

// Behavior elements
const behaviorContainer = document.getElementById('behaviorContainer');
const modalMobRenewable = document.getElementById('modalMobRenewable');
const modalMobDespawn = document.getElementById('modalMobDespawn');
const modalMobTameable = document.getElementById('modalMobTameable');
const modalMobBreedable = document.getElementById('modalMobBreedable');
const modalMobDuplicable = document.getElementById('modalMobDuplicable');
const modalMobLeashable = document.getElementById('modalMobLeashable');
const modalMobRideable = document.getElementById('modalMobRideable');
const modalMobBabyVariant = document.getElementById('modalMobBabyVariant');
const modalMobFireImmune = document.getElementById('modalMobFireImmune');
const modalMobUndead = document.getElementById('modalMobUndead');
const modalMobBossBar = document.getElementById('modalMobBossBar');

// Additional info & version history
const modalMobMiscContainer = document.getElementById('modalMobMiscContainer');
const modalMobMiscContent = document.getElementById('modalMobMiscContent');
const modalMobHistoryContainer = document.getElementById('modalMobHistoryContainer');
const modalMobHistoryList = document.getElementById('modalMobHistoryList');
const modalMobEffectsContent = document.getElementById('modalMobEffectsContent');
const modalMobNotes = document.getElementById('modalMobNotes');

// Sound Buttons
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// Global variables
let mobsData = {
    passive: [],
    neutral: [],
    hostile: [],
    jockey: [],
    boss: [],
    summonable: [],
    player: []
};
let state = {
    currentMobs: [],
    filteredMobs: [],
    currentFilter: 'all',
    currentSearchTerm: ''
};
let currentMob = null;
let activeSounds = [];

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

// ===== DATA FORMATTING (supports old & new mob data schema) =====
function humanizeKey(key) {
    if (!key) return '';
    return key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function formatGenericValue(value) {
    if (value === null || value === undefined || value === '') return t('value_none');
    if (Array.isArray(value)) return value.length ? value.join(', ') : t('value_none');
    if (typeof value === 'object') {
        return Object.entries(value).map(([k, v]) => `${humanizeKey(k)}: ${v}`).join(' / ');
    }
    return String(value);
}

// Compact health display for the card overview (e.g. jockeys: {camel_husk: 32, husk: 20, parched: 16})
function formatHealthCompact(health) {
    if (health === undefined || health === null || health === '') return 'N/A';
    if (typeof health === 'object') {
        return Object.values(health).join(' / ');
    }
    return String(health);
}

function formatSizeValue(value) {
    if (value === undefined || value === null || value === '') return '?';
    if (typeof value === 'string') {
        const match = value.match(/-?\d+(\.\d+)?/);
        return match ? match[0] : value;
    }
    return value;
}

// Some mobs don't have a standard width/height, only named variants
// (e.g. Axolotl: size.java/size.bedrock, Happy Ghast: size.adult/size.ghastling)
function getPrimarySize(size) {
    if (!size) return null;
    if (size.width !== undefined || size.height !== undefined) return size;
    for (const key of Object.keys(size)) {
        const variant = size[key];
        if (variant && typeof variant === 'object' && (variant.width !== undefined || variant.height !== undefined)) {
            return variant;
        }
    }
    return null;
}

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => console.log('Sound file not found'));
    } catch (error) {
        console.log('Failed to initialize audio:', error);
    }
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try {
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(() => {});
    } catch (error) {}
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
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
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
    if (!loadingText) return;
    const texts = [
        t('loader_text'),
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
    showToast(t('toast_welcome_title'), t('toast_welcome_message'), 'info');
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
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }));
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
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-triangle';
    else if (type === 'info') icon = 'fa-info-circle';
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

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== LOAD DATA =====
async function loadAllMobsData() {
    for (const cat in mobsData) mobsData[cat] = [];

    const langPrefix = 'en_';
    const t = Date.now();

    const files = [
        { url: `/assets/JS/mobs/${langPrefix}Passive_mobs.json`,  cat: 'passive'    },
        { url: `/assets/JS/mobs/${langPrefix}Neutral_mobs.json`,  cat: 'neutral'    },
        { url: `/assets/JS/mobs/${langPrefix}Hostile_mobs.json`,  cat: 'hostile'    },
        { url: `/assets/JS/mobs/${langPrefix}Jockeys_mobs.json`,  cat: 'jockey'     },
        { url: `/assets/JS/mobs/${langPrefix}Boss_mobs.json`,     cat: 'boss'       },
        { url: `/assets/JS/mobs/${langPrefix}Unused_mobs.json`,   cat: 'summonable' },
        { url: `/assets/JS/mobs/${langPrefix}Player.json`,        cat: 'player'     }
    ];

    for (const file of files) {
        try {
            const res = await fetch(`${file.url}?v=${t}`);
            const mobs = res.ok ? await res.json() : [];
            if (Array.isArray(mobs) && mobs.length > 0) {
                mobsData[file.cat] = mobs;
                console.log(`✅ ${file.cat}: ${mobs.length} Mobs`);
                filterMobsByCategory(state.currentFilter);
            } else {
                console.warn(`⚠️ ${file.cat}: no data (${file.url})`);
            }
        } catch (err) {
            console.error(`❌ Error loading: ${file.url}`, err);
        }
    }

    const total = Object.values(mobsData).reduce((s, a) => s + a.length, 0);
    console.log(`Total: ${total} mobs (en)`);

    if (total === 0) {
        showToast(t('toast_error_no_data'), 'Fehler beim Laden', 'error');
        loadFallbackMobs();
        return;
    }

    filterMobsByCategory(state.currentFilter);
    showWelcomeToast();

    if (mobsGrid) {
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (m.type === 'attributes' && m.attributeName === 'style') {
                    const el = m.target;
                    if (el.classList.contains('mob-card') && el.style.display === 'none') {
                        el.style.display = 'block';
                    }
                }
            }
        });
        observer.observe(mobsGrid, { attributes: true, subtree: true, attributeFilter: ['style'] });
    }

    setTimeout(() => {
        const grid = document.getElementById('mobsGrid');
        const headerEl = document.querySelector('.header');
        if (grid) {
            const top = grid.getBoundingClientRect().top + window.scrollY;
            const offset = (headerEl ? headerEl.offsetHeight : 70) + 20;
            window.scrollTo({ top: top - offset, behavior: 'smooth' });
        }
    }, 300);
}

// ===== FILTER & SEARCH =====
function filterMobsByCategory(category) {
    state.currentFilter = category;
    state.currentSearchTerm = '';
    if (mobSearch) mobSearch.value = '';

    if (category === 'all') {
        let allMobs = [];
        for (const cat in mobsData) {
            if (mobsData[cat] && mobsData[cat].length) allMobs = allMobs.concat(mobsData[cat]);
        }
        state.currentMobs = allMobs;
    } else {
        state.currentMobs = mobsData[category] ? [...mobsData[category]] : [];
    }

    state.filteredMobs = [...state.currentMobs];
    console.log(`Filter: ${category}, count: ${state.filteredMobs.length}`);
    renderMobs();
    updateMobStats();
    updateActiveCategoryTab(category);
}

function searchMobs(searchTerm) {
    state.currentSearchTerm = searchTerm.toLowerCase().trim();
    if (!state.currentSearchTerm) {
        filterMobsByCategory(state.currentFilter);
        return;
    }
    if (state.currentFilter === 'all') {
        let allMobs = [];
        for (const cat in mobsData) {
            if (mobsData[cat]) {
                const filtered = mobsData[cat].filter(mob => mobMatchesSearch(mob, state.currentSearchTerm));
                allMobs = allMobs.concat(filtered);
            }
        }
        state.filteredMobs = allMobs;
    } else {
        state.filteredMobs = mobsData[state.currentFilter].filter(mob => mobMatchesSearch(mob, state.currentSearchTerm)) || [];
    }
    renderMobs();
    updateMobStats();
}

function mobMatchesSearch(mob, term) {
    return (mob.name && mob.name.toLowerCase().includes(term)) ||
           (mob.id && mob.id.toLowerCase().includes(term)) ||
           (mob.description && mob.description.toLowerCase().includes(term));
}

function renderMobs() {
    if (!mobsGrid) return;
    mobsGrid.innerHTML = '';
    if (!state.filteredMobs.length) {
        mobsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3><span>${t('results_title')}</span></h3>
                <p><span>${t('results_text')}</span></p>
            </div>
        `;
        return;
    }

    for (const mob of state.filteredMobs) {
        try {
            const card = document.createElement('div');
            card.className = 'mob-card';
            card.dataset.id = mob.id;
            card.tabIndex = 0;
            const sizeDisplay = formatSizeDisplay(mob.size);
            const icon = mob.icon || '/assets/img/mobs/default/default.png';
            const healthDisplay = formatHealthCompact(mob.health);
            const healthTitle = (mob.health && typeof mob.health === 'object') ? ` title="${escapeHtml(formatGenericValue(mob.health))}"` : '';
            card.innerHTML = `
                <div class="item-card-header">
                    <div class="item-icon" style="background-image: url('${icon}')"></div>
                    <div class="item-info">
                        <div class="item-name">${escapeHtml(mob.name)}</div>
                        <div class="item-id">${escapeHtml(mob.id)}</div>
                        <div class="item-meta">
                            <span class="item-category ${mob.type}">${getCategoryName(mob.type)}</span>
                            <div class="item-meta-row">
                                <div class="meta-item"${healthTitle}><i class="fas fa-heart"></i> ${escapeHtml(healthDisplay)}</div>
                                <div class="meta-item"><i class="fas fa-ruler-combined"></i> ${escapeHtml(sizeDisplay)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            card.setAttribute('style', 'display: block !important;');
            card.addEventListener('click', () => openMobModal(mob));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMobModal(mob);
                }
            });
            mobsGrid.appendChild(card);
            setTimeout(() => {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
            }, 50);
        } catch (error) {
            console.error('Error rendering mob:', mob.name, error);
        }
    }
}

function formatSizeDisplay(size) {
    if (!size) return 'None';
    if (typeof size === 'object') {
        const primary = getPrimarySize(size);
        return primary ? `${formatSizeValue(primary.width)} x ${formatSizeValue(primary.height)}` : 'None';
    }
    return String(size);
}

function getCategoryName(type) {
    const names = {
        passive: t('filter_passive'),
        neutral: t('filter_neutral'),
        hostile: t('filter_hostile'),
        jockey:  t('filter_jockey'),
        boss: t('filter_boss'),
        summonable: t('filter_summonable'),
        player: t('filter_player')
    };
    return names[type] || type;
}

function updateMobStats() {
    if (mobCount) mobCount.textContent = `${state.filteredMobs.length} ${t('mobs_grid_count').replace(/[0-9+]/g, '').trim()}`;
    if (activeCategory) activeCategory.textContent = getCategoryName(state.currentFilter);
}

function updateActiveCategoryTab(category) {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
}

// ===== MODAL FUNCTIONS =====
function openMobModal(mob) {
    if (!mob) return;
    currentMob = mob;
    setModalBasicInfo(mob);
    setModalProperties(mob);
    setModalExtendedInfo(mob);
    setModalCommands(mob);
    setModalTexture(mob);
    loadMobSounds(mob);
    document.getElementById('mobModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    showToast(t('toast_mob_opened'), t('toast_mob_opened_message', { name: mob.name }), 'info');
}

function closeMobModal() {
    document.getElementById('mobModal').classList.remove('show');
    document.body.style.overflow = '';
    playClickSound();
    stopAllSounds();
}

function setModalBasicInfo(mob) {
    modalMobName.textContent = mob.name || 'Unknown';
    modalMobIcon.style.backgroundImage = `url('${mob.icon || '/assets/img/mobs/default/default.png'}')`;
    modalMobId.textContent = mob.id || 'N/A';
    modalMobHealth.textContent = mob.health !== undefined ? formatGenericValue(mob.health) : 'N/A';
    modalMobType.textContent = getCategoryName(mob.type);
}

function setModalProperties(mob) {
    modalMobTypeValue.textContent = getCategoryName(mob.type);
    modalMobHealthValue.textContent = mob.health !== undefined ? formatGenericValue(mob.health) : 'N/A';

    // Show damage correctly - use a placeholder for bosses or object damage
    if (mob.type === 'player') {
        modalMobDamage.textContent = mob.attack_strength ? `Fist: ${mob.attack_strength.fist || '2HP'}, Items: ${mob.attack_strength.items || 'Varies'}` : 'Fist: 2HP, Items: Varies';
    } else if (typeof mob.damage === 'object' && mob.damage !== null) {
        // For bosses or complex damage objects show "Special (see details)"
        modalMobDamage.textContent = 'Special (see details)';
    } else {
        modalMobDamage.textContent = mob.damage || 'None';
    }

    const primarySize = getPrimarySize(mob.size);
    const adultSize = primarySize ? `${formatSizeValue(primarySize.width)} x ${formatSizeValue(primarySize.height)}` : 'Unknown';
    modalMobSize.textContent = adultSize;
    if (mob.type === 'player') {
        if (babySizeProperty) babySizeProperty.style.display = 'none';
        if (playerSizesContainer) playerSizesContainer.style.display = 'block';
        if (modalPlayerSneakingSize && mob.size?.sneaking) {
            modalPlayerSneakingSize.textContent = `${formatSizeValue(mob.size.sneaking.width)} x ${formatSizeValue(mob.size.sneaking.height)}`;
        }
        if (modalPlayerGlidingSwimmingSize && mob.size?.gliding_swimming) {
            modalPlayerGlidingSwimmingSize.textContent = `${formatSizeValue(mob.size.gliding_swimming.width)} x ${formatSizeValue(mob.size.gliding_swimming.height)}`;
        }
        if (modalPlayerSleepingSize && mob.size?.sleeping) {
            modalPlayerSleepingSize.textContent = `${formatSizeValue(mob.size.sleeping.width)} x ${formatSizeValue(mob.size.sleeping.height)}`;
        }
    } else {
        if (babySizeProperty) babySizeProperty.style.display = 'block';
        if (playerSizesContainer) playerSizesContainer.style.display = 'none';
        if (modalBabyMobSize) {
            const babySize = mob.size?.baby ? `${formatSizeValue(mob.size.baby.width)} x ${formatSizeValue(mob.size.baby.height)}` : 'None';
            modalBabyMobSize.textContent = babySize;
        }
    }
    modalMobBiome.textContent = mob.spawn?.biome || mob.biome || 'None';
    modalMobXP.textContent = mob.experience !== undefined ? mob.experience : (mob.xp || 'None');
    modalMobDescription.textContent = mob.description || 'No description available.';
    modalMobDrops.textContent = formatDrops(mob.drops);
}

function setModalExtendedInfo(mob) {
    modalMobVersion.textContent = mob.version || 'Unknown';
    modalMobNumericID.textContent = mob.numeric_id !== undefined ? mob.numeric_id : 'N/A';
    modalMobDimension.textContent = mob.dimension || 'Unknown';
    modalMobMovementSpeed.textContent = mob.movement_speed !== undefined ? formatGenericValue(mob.movement_speed) : 'Unknown';
    const lightLevel = Array.isArray(mob.light_level) ? mob.light_level.join(', ') : mob.light_level;
    modalMobLightLevel.textContent = lightLevel || 'Unknown';
    modalMobStructure.textContent = mob.spawn?.structure || mob.structure || 'None';
    modalMobMobType.textContent = mob.classification || mob.mob_type || t('value_none');

    // Extended database fields (new de_*_mobs.js schema)
    modalMobCategory.textContent = mob.category || t('value_none');
    modalMobEdition.textContent = mob.edition || t('value_none');
    modalMobStatus.textContent = mob.status || t('value_none');
    modalMobArmor.textContent = mob.armor !== undefined ? formatGenericValue(mob.armor) : t('value_none');
    modalMobAttackType.textContent = mob.attack_type || t('value_none');
    modalMobKnockback.textContent = mob.knockback_resistance !== undefined ? formatGenericValue(mob.knockback_resistance) : t('value_none');
    modalMobIntroduced.textContent = mob.introduced_date || t('value_none');
    modalMobRemoved.textContent = mob.removed_date || t('value_none');
    modalMobUpdated.textContent = mob.updated_at || t('value_none');
    modalMobLootTable.textContent = mob.loot_table || t('value_none');
    modalMobModel.textContent = mob.model || t('value_none');

    // Behavior section (always visible, missing values shown as "—")
    modalMobRenewable.textContent = mob.renewable || t('value_none');
    modalMobDespawn.textContent = mob.can_despawn || t('value_none');
    modalMobTameable.textContent = mob.tameable || t('value_none');
    modalMobBreedable.textContent = mob.breedable || t('value_none');
    modalMobDuplicable.textContent = mob.duplicable ? `${mob.duplicable}${mob.duplication_item ? ` (${mob.duplication_item})` : ''}` : t('value_none');
    modalMobLeashable.textContent = mob.leashable || t('value_none');
    modalMobRideable.textContent = mob.rideable || t('value_none');
    modalMobBabyVariant.textContent = mob.baby_variant || t('value_none');
    modalMobFireImmune.textContent = mob.fire_immune || t('value_none');
    modalMobUndead.textContent = mob.undead || t('value_none');
    modalMobBossBar.textContent = mob.boss_bar || t('value_none');

    // Detailed damage values (always visible, generic for any key)
    damageDetailsContent.innerHTML = '';
    if (mob.damage && typeof mob.damage === 'object') {
        for (const [key, value] of Object.entries(mob.damage)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${humanizeKey(key)}:</strong> ${formatGenericValue(value)}`;
            damageDetailsContent.appendChild(p);
        }
    } else {
        damageDetailsContent.innerHTML = `<p>${t('value_none')}</p>`;
    }

    // Dragon fireball (legacy field)
    if (mob.dragon_fireball) {
        dragonFireballContainer.style.display = 'block';
        const sizeLabel = 'Size:';
        dragonFireballContent.innerHTML = `${sizeLabel} ${formatSizeValue(mob.dragon_fireball.size?.width)} x ${formatSizeValue(mob.dragon_fireball.size?.height)}`;
        dragonFireballContent.style.textAlign = 'center';
    } else {
        dragonFireballContainer.style.display = 'none';
    }

    // Wither skull (legacy field)
    if (mob.wither_skull) {
        witherSkullContainer.style.display = 'block';
        const sizeLabel = 'Size:';
        witherSkullContent.innerHTML = `${sizeLabel} ${formatSizeValue(mob.wither_skull.size?.width)} x ${formatSizeValue(mob.wither_skull.size?.height)}`;
        witherSkullContent.style.textAlign = 'center';
    } else {
        witherSkullContainer.style.display = 'none';
    }

    // Abilities (always visible)
    if (modalMobAbilitiesList) {
        modalMobAbilitiesList.innerHTML = '';
        if (mob.abilities?.length) {
            mob.abilities.forEach(ability => {
                const li = document.createElement('li');
                li.textContent = ability;
                modalMobAbilitiesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = t('value_none');
            modalMobAbilitiesList.appendChild(li);
        }
    }

    // Status effects & immunities (always visible)
    if (modalMobEffectsContent) {
        let html = '';
        if (mob.effects?.length) {
            html += mob.effects.map(effect => {
                const parts = [effect.type, effect.level, effect.duration, effect.chance, effect.condition].filter(Boolean).join(' · ');
                const desc = effect.description ? `<br><span>${escapeHtml(effect.description)}</span>` : '';
                return `<p><strong>${escapeHtml(effect.name || humanizeKey('effect'))}:</strong> ${escapeHtml(parts)}${desc}</p>`;
            }).join('');
        } else {
            html += `<p>${t('effects_none')}</p>`;
        }
        html += `<p><strong>${escapeHtml(t('effects_gives'))}:</strong> ${mob.effect_immunities?.length ? escapeHtml(mob.effect_immunities.join(', ')) : t('value_none')}</p>`;
        modalMobEffectsContent.innerHTML = html;
    }

    // Additional information (aliases, tags, references, interactions, IDs, media) - always visible
    if (modalMobMiscContent) {
        const rows = [
            [t('misc_aliases'), mob.aliases?.length ? mob.aliases.join(', ') : null, false],
            [t('misc_tags'), mob.tags?.length ? mob.tags.join(', ') : null, false],
            [t('misc_targets'), mob.targets?.length ? mob.targets.join(', ') : null, false],
            [t('misc_enemy_mobs'), mob.enemy_mobs?.length ? mob.enemy_mobs.join(', ') : null, false],
            [t('misc_follows'), mob.follows?.length ? mob.follows.join(', ') : null, false],
            [t('misc_healing_item'), (mob.healing_item && (!Array.isArray(mob.healing_item) || mob.healing_item.length)) ? formatGenericValue(mob.healing_item) : null, false],
            [t('misc_related'), mob.related_entries?.length ? mob.related_entries.join(', ') : null, true],
            [t('misc_animation'), mob.animation?.length ? mob.animation.join(', ') : null, false],
            [t('misc_gallery'), mob.gallery?.length ? mob.gallery.join(', ') : null, false],
            [t('misc_java_id'), mob.java_entity_id || null, true],
            [t('misc_bedrock_id'), mob.bedrock_entity_id || null, true]
        ];

        modalMobMiscContent.innerHTML = rows.map(([label, value, isCode]) => {
            const displayValue = value ? escapeHtml(value) : t('value_none');
            return `<p><strong>${escapeHtml(label)}:</strong> ${isCode && value ? `<code class="value-code">${displayValue}</code>` : displayValue}</p>`;
        }).join('');
        modalMobMiscContent.innerHTML += mob.source
            ? `<p><strong>${escapeHtml(t('misc_source'))}:</strong> <a href="${escapeHtml(mob.source)}" target="_blank" rel="noopener">${escapeHtml(mob.source)}</a></p>`
            : `<p><strong>${escapeHtml(t('misc_source'))}:</strong> ${t('value_none')}</p>`;
    }

    // Version history (always visible)
    if (modalMobHistoryList) {
        modalMobHistoryList.innerHTML = '';
        if (mob.version_history?.length) {
            mob.version_history.forEach(entry => {
                const li = document.createElement('li');
                const date = entry.date ? `${entry.date} – ` : '';
                li.innerHTML = `${date}<strong>${escapeHtml(entry.version || '')}</strong>: ${escapeHtml(entry.change || '')}`;
                modalMobHistoryList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = t('history_none');
            modalMobHistoryList.appendChild(li);
        }
    }

    // Notes (always visible)
    if (modalMobNotes) {
        modalMobNotes.textContent = mob.notes || t('value_none');
    }

    // Fun fact (always visible)
    if (modalMobFunFact) {
        modalMobFunFact.textContent = mob.fun_fact || t('value_none');
    }
}

function setModalCommands(mob) {
    const mobId = mob.id ? mob.id.replace('minecraft:', '') : 'unknown';
    if (mob.type === 'player') {
        modalSummonCommand.textContent = '/summon minecraft:player ~ ~ ~';
        modalSpawnEggCommand.textContent = 'minecraft:player_spawn_egg';
        modalGiveCommand.textContent = '/give @p minecraft:player_spawn_egg 1';
    } else {
        modalSummonCommand.textContent = `/summon ${mob.id || 'minecraft:unknown'} ~ ~ ~`;
        modalSpawnEggCommand.textContent = `minecraft:${mobId}_spawn_egg`;
        modalGiveCommand.textContent = `/give @p minecraft:${mobId}_spawn_egg 1`;
    }
}

function getDisplayTextureMeta(texture, mob) {
    const fallbackName = texture?.name || t('texture_unnamed');
    const fallbackDescription = texture?.description || '';
    return { name: fallbackName, description: fallbackDescription };
}

function setModalTexture(mob) {
    if (!modalTextureIcon || !modalMobTexturesContainer) return;
    
    const textures = mob.texture || [];
    
    if (!textures.length) {
        modalMobTexturesContainer.innerHTML = `<p class="no-texture-message" data-i18n="modal_no_texture">${t('modal_no_texture')}</p>`;
        modalTextureIcon.style.backgroundImage = '';
        modalTextureIcon.style.backgroundColor = 'rgba(0,0,0,0.2)';
        return;
    }
    
    // Show first texture as main icon
    const firstTexture = textures[0];
    if (firstTexture.file) {
        modalTextureIcon.style.backgroundImage = `url('${firstTexture.file}')`;
        modalTextureIcon.style.backgroundSize = 'contain';
        modalTextureIcon.style.backgroundRepeat = 'no-repeat';
        modalTextureIcon.style.backgroundPosition = 'center';
        modalTextureIcon.style.width = '128px';
        modalTextureIcon.style.height = '128px';
        modalTextureIcon.style.margin = '0 auto';
        modalTextureIcon.style.borderRadius = '12px';
        modalTextureIcon.style.border = `2px solid var(--primary)`;
        modalTextureIcon.style.backgroundColor = 'rgba(0,0,0,0.2)';
    }
    
    modalMobTexturesContainer.innerHTML = '';
    modalMobTexturesContainer.style.marginTop = '2rem';
    
    textures.forEach((texture, index) => {
        const textureCard = document.createElement('div');
        textureCard.className = 'texture-card';
        const textureMeta = getDisplayTextureMeta(texture, mob);
        
        // Preview image
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
        
        // Texture name
        const nameEl = document.createElement('div');
        nameEl.style.cssText = `
            font-weight: 600;
            color: var(--text-primary);
            text-align: center;
            margin-bottom: var(--spacing-xs);
            font-size: var(--text-sm);
        `;
        nameEl.textContent = textureMeta.name || t('texture_unnamed');
        
        // Description
        const descEl = document.createElement('div');
        descEl.style.cssText = `
            font-size: var(--text-xs);
            color: var(--text-secondary);
            text-align: center;
        `;
        descEl.textContent = textureMeta.description || '';
        
        textureCard.appendChild(previewImg);
        textureCard.appendChild(nameEl);
        if (textureMeta.description) {
            textureCard.appendChild(descEl);
        }
        
        // Click event
        textureCard.addEventListener('click', () => {
            modalTextureIcon.style.backgroundImage = `url('${texture.file}')`;
            document.querySelectorAll('.texture-card').forEach(card => {
                card.style.borderColor = 'var(--border-color)';
                card.style.backgroundColor = 'var(--bg-surface)';
            });
            textureCard.style.borderColor = 'var(--primary)';
            textureCard.style.backgroundColor = 'rgba(0, 168, 107, 0.1)';
            playClickSound();
        });
        
        modalMobTexturesContainer.appendChild(textureCard);
    });
    
    // Mark first texture as active
    if (textures.length > 0) {
        const firstCard = modalMobTexturesContainer.querySelector('.texture-card');
        if (firstCard) {
            firstCard.style.borderColor = 'var(--primary)';
            firstCard.style.backgroundColor = 'rgba(0, 168, 107, 0.1)';
        }
    }
}

function loadMobSounds(mob) {
    if (!soundsContainer) return;
    const sounds = mob.sounds || [];
    if (!sounds.length) {
        soundsContainer.innerHTML = `<p class="no-sounds" data-i18n="modal_no_sounds">${t('modal_no_sounds')}</p>`;
        return;
    }
    soundsContainer.innerHTML = '';
    sounds.forEach((sound, idx) => {
        const soundItem = document.createElement('div');
        soundItem.className = 'sound-item';
        soundItem.setAttribute('data-sound-index', idx);
        soundItem.innerHTML = `
            <div class="sound-play-icon">
                <i class="fas fa-play"></i>
            </div>
            <div class="sound-info">
                <div class="sound-name">${escapeHtml(sound.name)}</div>
                ${sound.description ? `<div class="sound-description">${escapeHtml(sound.description)}</div>` : ''}
                ${sound.duration ? `<div class="sound-duration">${escapeHtml(sound.duration)}</div>` : ''}
                ${sound.category ? `<div class="sound-category">${escapeHtml(sound.category)}</div>` : ''}
            </div>
        `;
        soundItem.addEventListener('click', (e) => {
            e.stopPropagation();
            playSoundOnce(sound, soundItem);
        });
        let loopInterval = null;
        soundItem.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (loopInterval) return;
            loopInterval = setInterval(() => {
                playSoundOnce(sound, soundItem);
            }, 100);
        });
        soundItem.addEventListener('mouseup', () => {
            if (loopInterval) {
                clearInterval(loopInterval);
                loopInterval = null;
            }
            const iconDiv = soundItem.querySelector('.sound-play-icon i');
            if (iconDiv) iconDiv.className = 'fas fa-play';
        });
        soundItem.addEventListener('mouseleave', () => {
            if (loopInterval) {
                clearInterval(loopInterval);
                loopInterval = null;
            }
            const iconDiv = soundItem.querySelector('.sound-play-icon i');
            if (iconDiv) iconDiv.className = 'fas fa-play';
        });
        soundsContainer.appendChild(soundItem);
    });
}

function playSoundOnce(sound, element) {
    if (!soundEnabled) return;
    if (!sound.file) return;
    try {
        const audio = new Audio(sound.file);
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Sound playback failed:', e));
        const icon = element.querySelector('.sound-play-icon i');
        if (icon) {
            const originalClass = icon.className;
            icon.className = 'fas fa-volume-up';
            setTimeout(() => {
                icon.className = originalClass;
            }, 300);
        }
    } catch (error) {
        console.error('Sound error:', error);
    }
}

function playAllSounds() {
    if (!currentMob) return;
    const sounds = currentMob.sounds || [];
    if (!sounds.length) return;
    stopAllSounds();
    sounds.forEach(sound => {
        if (!sound.file) return;
        try {
            const audio = new Audio(sound.file);
            audio.volume = 0.5;
            audio.loop = false;
            audio.play().catch(e => console.log('PlayAll error:', e));
            activeSounds.push(audio);
            audio.addEventListener('ended', () => {
                const idx = activeSounds.indexOf(audio);
                if (idx !== -1) activeSounds.splice(idx, 1);
            });
        } catch (error) {
            console.error('PlayAll error:', error);
        }
    });
}

function stopAllSounds() {
    activeSounds.forEach(audio => {
        try {
            audio.pause();
            audio.currentTime = 0;
        } catch (e) {}
    });
    activeSounds = [];
}

function formatDrops(drops) {
    if (!drops) return 'None';
    if (Array.isArray(drops)) {
        if (!drops.length) return 'None';
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
    return drops;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== EVENT LISTENER =====
function initEventListeners() {
    if (mobSearch) {
        let timeout;
        mobSearch.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => searchMobs(e.target.value), 300);
        });
    }
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            filterMobsByCategory(tab.dataset.category);
            playClickSound();
        });
    });
    if (modalOverlay) modalOverlay.addEventListener('click', closeMobModal);
    if (modalClose) modalClose.addEventListener('click', closeMobModal);
    document.querySelectorAll('.item-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            document.querySelectorAll('.item-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
            playClickSound();
        });
    });
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.copy;
            let text = '';
            if (type === 'summon') text = modalSummonCommand.textContent;
            else if (type === 'spawnegg') text = modalSpawnEggCommand.textContent;
            else if (type === 'give') text = modalGiveCommand.textContent;
            if (text) {
                copyToClipboard(text);
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
            }
        });
    });
    if (playAllSoundsBtn) {
        playAllSoundsBtn.addEventListener('click', () => {
            playAllSounds();
            playClickSound();
        });
    }
    if (stopAllSoundsBtn) {
        stopAllSoundsBtn.addEventListener('click', () => {
            stopAllSounds();
            playClickSound();
        });
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('toast_copy_success'), t('toast_success'), 'success');
    }).catch(() => {
        showToast(t('toast_copy_error'), t('toast_error'), 'error');
    });
}

// ===== FALLBACK =====
function loadFallbackMobs() {
    mobsData.player = [{
        id: "minecraft:player",
        name: "Steve",
        type: "player",
        icon: "/assets/img/mobs/player/steve.png",
        health: 20,
        attack_strength: { fist: "2HP", items: "Varies" },
        description: "The default player character in Minecraft.",
        version: "Cave game tech test",
        dimension: "All",
        movement_speed: 0.1,
        size: {
            width: 0.6, height: 1.8,
            sneaking: { width: 0.6, height: 1.5 },
            gliding_swimming: { width: 0.6, height: 0.6 },
            sleeping: { width: 0.2, height: 0.2 }
        },
        spawn: { biome: "All", structure: "None" },
        fun_fact: "Steve was originally intended as a placeholder name.",
        abilities: ["Can use all kinds of tools and weapons", "Can wear armor"],
        drops: [{ item: "minecraft:experience_orb", chance: "100%" }],
        xp: "Varies"
    }];
    mobsData.hostile = [{
        id: "minecraft:zombie",
        name: "Zombie",
        type: "hostile",
        icon: "/assets/img/mobs/hostile/Zombie.webp",
        health: 20,
        damage: 3,
        description: "A hostile undead mob that appears at night.",
        version: "Alpha",
        dimension: "Overworld",
        movement_speed: 0.23,
        size: { width: 0.6, height: 1.95, baby: { width: 0.3, height: 0.975 } },
        spawn: { biome: "All Overworld biomes", structure: "None" },
        fun_fact: "Zombies burn in sunlight.",
        abilities: ["Can infect villagers", "Can open doors"],
        drops: [{ item: "minecraft:rotten_flesh", chance: "100%" }],
        xp: "5"
    }];
    filterMobsByCategory('all');
    showToast(t('toast_error_fallback'), 'Info', 'info');
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .items-grid .mob-card {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            height: auto !important;
            overflow: visible !important;
        }
        .texture-icon-large {
            width: 128px;
            height: 128px;
            margin: 0 auto;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 12px;
            border: 2px solid var(--primary);
            background-color: rgba(0,0,0,0.2);
        }
        .texture-preview {
            text-align: center;
        }
        .no-texture-message {
            text-align: center;
            margin-top: 1rem;
            color: var(--text-secondary);
            font-style: italic;
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
    loadAllMobsData();
});
