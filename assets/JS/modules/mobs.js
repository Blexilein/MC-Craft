// mobs.js

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// ===== ÜBERSETZUNGEN =====
const translations = {
    de: {
        site_title: "MC-Craft | Mobs Datenbank",
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
        mobs_hero_title: "Minecraft <span class=\"highlight\">Mobs Katalog</span>",
        hero_badge: "V 1.0.0 ist da",
        mobs_hero_desc: "Entdecke alle Kreaturen, Monster und Tiere aus der Minecraft-Welt. Finde detaillierte Informationen, Verhalten und Befehle für jeden Mob.",
        mobs_btn_explore: "Mobs Entdecken",
        mobs_btn_copyright: "Copyright Info",
        mobs_grid_count: "85+ Mobs",
        mobs_grid_commands: "Befehle",
        mobs_grid_search: "Live-Suche",
        mobs_grid_details: "Detaillierte Infos",
        mobs_section_title: "Minecraft <span class=\"highlight\">Mobs</span>",
        mobs_section_subtitle: "Durchsuche alle Mobs nach Typ oder nutze die Live-Suche",
        filter_all: "Alle",
        filter_passive: "Passiv",
        filter_neutral: "Neutral",
        filter_hostile: "Feindlich",
        filter_jockey: "Jockeys",
        filter_boss: "Bosse",
        filter_summonable: "Beschwörbar",
        filter_player: "Spieler",
        search_placeholder: "Mobs durchsuchen...",
        results_title: "Keine Mobs gefunden",
        results_text: "Versuche einen anderen Suchbegriff oder eine andere Kategorie",
        modal_texture_title: "Textur-Vorschau",
        modal_no_texture: "Keine Textur für diesen Mob verfügbar.",
        modal_sounds_title: "Mob Sounds",
        modal_sounds_text: "Hör dir die Geräusche der einzelnen Mobs im Spiel an.",
        modal_play_all_sounds: "Alle Sounds abspielen",
        modal_stop_all_sounds: "Alle Sounds stoppen",
        modal_no_sounds: "Keine Sounds für diesen Mob verfügbar.",
        modal_sound_info: "Klicke auf einen Sound, um ihn abzuspielen. Halte die Maustaste gedrückt, um den Sound in einer Schleife abzuspielen.",
        category_all: "Alle Kategorien",
        copyright_title: "Copyright Information",
        copyright_subtitle: "Rechtliche Hinweise zu Minecraft-Inhalten",
        copyright_notice_title: "Minecraft ist ein eingetragenes Markenzeichen",
        copyright_notice_text1: "Diese Website steht in keiner Verbindung zu Mojang Studios oder Microsoft. Minecraft ist eine eingetragene Marke von Mojang Studios. Alle Rechte an den Spielinhalten, einschließlich Sounds, Grafiken und Texten, liegen bei Mojang Studios.",
        copyright_important: "Wichtiger Hinweis:",
        copyright_important_text: "Aufgrund von Urheberrechtsbestimmungen können wir keine Minecraft-Sounds direkt auf unserer Website zum Download anbieten.",
        copyright_resources: "Offizielle Ressourcen:",
        copyright_wiki: "Minecraft Wiki - Mob Sounds:",
        copyright_wiki_desc: "Besuche die offizielle Minecraft Wiki, um alle Mob-Sounds anzuhören.",
        copyright_official: "Offizielle Minecraft Website:",
        copyright_official_desc: "Die offizielle Minecraft Website von Mojang Studios.",
        copyright_legal: "Rechtliche Informationen:",
        copyright_legal_text1: "Die Nutzung von Minecraft-Inhalten unterliegt den <a href=\"https://www.minecraft.net/terms\" target=\"_blank\" rel=\"noopener\">Minecraft-Nutzungsbedingungen</a>. Bei Fragen zur Nutzung der Inhalte wenden Sie sich bitte direkt an Mojang Studios.",
        copyright_disclaimer: "Diese Seite dient ausschließlich Informationszwecken und erhebt keinen Anspruch auf Vollständigkeit oder Richtigkeit.",
        modal_health: "Lebenspunkte",
        tab_properties: "Eigenschaften",
        tab_extended: "Weitere Infos",
        tab_commands: "Befehle",
        tab_texture: "Textur",
        tab_copyright: "Copyright",
        prop_type: "Typ",
        prop_health: "Gesundheit",
        prop_damage: "Schaden",
        prop_size: "Größe (Standard)",
        prop_baby_size: "Größe (Baby)",
        prop_biome: "Spawn-Biome",
        prop_xp: "Erfahrung",
        prop_description: "Beschreibung",
        prop_drops: "Beute",
        player_sizes_title: "Spieler-Größen",
        player_size_sneaking: "Schleichen",
        player_size_gliding: "Segeln/Schwimmen",
        player_size_sleeping: "Schlafen",
        ext_version: "Version",
        ext_numeric_id: "Numeric ID",
        ext_damage_details: "Schadensdetails",
        ext_dragon_fireball: "Drachenfeuerball",
        ext_flying_wither_skull: "Fliegender Wither-Schädel",
        ext_dimension: "Dimension",
        ext_speed: "Bewegungsgeschwindigkeit",
        ext_light: "Lichtstärke",
        ext_structure: "Struktur",
        ext_abilities: "Fähigkeiten",
        ext_funfact: "Fun Fact",
        ext_classification: "Klassifikation",
        ext_category: "Kategorie",
        ext_edition: "Edition",
        ext_status: "Status",
        ext_armor: "Rüstung",
        ext_attack_type: "Angriffsart",
        ext_knockback: "Rückstoßresistenz",
        ext_loot_table: "Loot-Tabelle",
        ext_introduced: "Erstveröffentlichung",
        ext_removed: "Entfernt am",
        ext_updated: "Zuletzt aktualisiert",
        ext_model: "Modell",
        effects_title: "Statuseffekte",
        effects_gives: "Immunitäten",
        effects_none: "Keine bekannten Statuseffekte",
        notes_title: "Notizen",
        history_none: "Keine Versionshistorie vorhanden",
        misc_animation: "Animationen",
        misc_gallery: "Galerie",
        behavior_title: "Verhalten",
        behavior_renewable: "Erneuerbar",
        behavior_despawn: "Kann verschwinden",
        behavior_tameable: "Zähmbar",
        behavior_breedable: "Züchtbar",
        behavior_duplicable: "Vermehrbar",
        behavior_leashable: "Anleinbar",
        behavior_rideable: "Reitbar",
        behavior_baby_variant: "Baby-Variante",
        behavior_fire_immune: "Feuerimmun",
        behavior_undead: "Untot",
        behavior_boss_bar: "Boss-Leiste",
        misc_title: "Zusätzliche Informationen",
        misc_aliases: "Alternative Namen",
        misc_tags: "Tags",
        misc_related: "Verwandte Einträge",
        misc_source: "Quelle",
        misc_java_id: "Java Entity ID",
        misc_bedrock_id: "Bedrock Entity ID",
        misc_targets: "Ziele",
        misc_enemy_mobs: "Feindliche Mobs",
        misc_follows: "Folgt",
        misc_healing_item: "Heilitem",
        history_title: "Versionsverlauf",
        value_none: "—",
        cmd_summon: "/summon Befehl",
        cmd_spawnegg: "Spawn-Ei ID",
        cmd_give: "/give Befehl (Spawn-Ei)",
        texture_unnamed: "Unbenannte Textur",
        modal_copyright_title: "Urheberrechtlicher Hinweis",
        modal_copyright_text: "Die Sounds dienen ausschließlich als kurze Hörbeispiele zur Erklärung der jeweiligen Minecraft-Kreatur. Alle Sounds und Texturen sind Eigentum von <strong>Mojang Studios und Microsoft</strong>.",
        modal_official_links: "Offizielle Sound-Quellen:",
        modal_official_info: "Besuche die offizielle Minecraft Wiki, um Informationen über alle Minecraft Mob-Sounds zu erhalten.",
        modal_legal_title: "Rechtlicher Hinweis:",
        modal_legal_text: "Diese Webseite bietet keine Resourcepacks oder vollständigen Spieldateien zum Download an.",
        cta_title: "Fehlt ein Mob?",
        cta_desc: "Wir erweitern ständig unsere Datenbank. Melde uns, wenn ein Mob fehlt oder Informationen unvollständig sind.",
        cta_discord: "Mob melden",
        cta_support: "Hilfe & Support",
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
        loader_text: "Mobs Datenbank wird geladen...",
        loader_text2: "Passive und Neutrale Mobs einlesen...",
        loader_text3: "Boss und Hostile Mobs einlesen...",
        loader_text4: "Spieler und Beschwörbare Mobs einlesen...",
        loader_text5: "Fast fertig...",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound an",
        toast_sound_off: "Sound aus",
        toast_language_title: "Sprache",
        toast_language_de: "Deutsch",
        toast_language_en: "Englisch",
        toast_theme_changed: "Theme geändert",
        toast_theme_to: "Zu {theme} gewechselt",
        toast_welcome_title: "Mobs geladen!",
        toast_welcome_message: "Datenbank bereit",
        toast_error_no_data: "Daten konnten nicht geladen werden",
        toast_error_fallback: "Fallback-Mobs geladen",
        toast_mob_opened: "Mob geöffnet",
        toast_mob_opened_message: "Details für {name}",
        toast_copy_success: "In Zwischenablage kopiert",
        toast_copy_error: "Kopieren fehlgeschlagen",
        toast_success: "Erfolg",
        toast_info: "Info",
        toast_error: "Fehler",
        no_texture: "Keine Textur für diesen Mob verfügbar."
    },
    en: {
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
        no_texture: "No texture available for this mob."
    }
};

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

// Texture-Tab Element
const modalTextureIcon = document.getElementById('modalTextureIcon');
const modalMobTexturesContainer = document.getElementById('modalMobTexturesContainer');

// Boss-Details Elemente
const bossDetailsContainer = document.getElementById('bossDetailsContainer');
const modalMobMobType = document.getElementById('modalMobMobType');
const damageDetailsContainer = document.getElementById('damageDetailsContainer');
const damageDetailsContent = document.getElementById('damageDetailsContent');
const dragonFireballContainer = document.getElementById('dragonFireballContainer');
const dragonFireballContent = document.getElementById('dragonFireballContent');
const witherSkullContainer = document.getElementById('witherSkullContainer');
const witherSkullContent = document.getElementById('witherSkullContent');

// Erweiterte Datenbank-Felder
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

// Verhalten-Elemente
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

// Zusatzinfos & Versionsverlauf
const modalMobMiscContainer = document.getElementById('modalMobMiscContainer');
const modalMobMiscContent = document.getElementById('modalMobMiscContent');
const modalMobHistoryContainer = document.getElementById('modalMobHistoryContainer');
const modalMobHistoryList = document.getElementById('modalMobHistoryList');
const modalMobEffectsContent = document.getElementById('modalMobEffectsContent');
const modalMobNotes = document.getElementById('modalMobNotes');

// Sound & Language Buttons
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
const langBtn = document.getElementById('langBtn');
const langFlag = document.getElementById('langFlag');
const mobileLangBtn = document.getElementById('mobileLangBtn');
const mobileLangFlag = document.getElementById('mobileLangFlag');

// Globale Variablen
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

// ===== HILFSFUNKTIONEN =====
function getTranslation(key, placeholders = {}) {
    let text = translations[currentLang]?.[key] || translations['de'][key] || key;
    for (const [placeholder, value] of Object.entries(placeholders)) {
        text = text.replace(`{${placeholder}}`, value);
    }
    return text;
}

function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return getTranslation('theme_overworld');
        case 'nether': return getTranslation('theme_nether');
        case 'end': return getTranslation('theme_end');
        default: return 'Overworld';
    }
}

// ===== DATENFORMATIERUNG (unterstützt altes & neues Mob-Datenschema) =====
function humanizeKey(key) {
    if (!key) return '';
    return key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function formatGenericValue(value) {
    if (value === null || value === undefined || value === '') return getTranslation('value_none');
    if (Array.isArray(value)) return value.length ? value.join(', ') : getTranslation('value_none');
    if (typeof value === 'object') {
        return Object.entries(value).map(([k, v]) => `${humanizeKey(k)}: ${v}`).join(' / ');
    }
    return String(value);
}

// Kompakte Health-Anzeige für die Karten-Übersicht (z.B. Jockeys: {camel_husk: 32, husk: 20, parched: 16})
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

// Manche Mobs haben keine Standard-width/height, sondern nur benannte Varianten
// (z.B. Axolotl: size.java/size.bedrock, Happy Ghast: size.adult/size.ghastling)
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
        levelUpSound.addEventListener('error', () => console.log('Sounddatei nicht gefunden'));
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
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
    showToast(getTranslation('toast_sound_title'), getTranslation(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

// ===== LANGUAGE TOGGLE =====
function initLanguageToggle() {
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
    if (mobileLangBtn) mobileLangBtn.addEventListener('click', toggleLanguage);
}

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('mc-craft-lang', currentLang);
    updateLanguage();
    playClickSound();
    showToast(getTranslation('toast_language_title'), getTranslation(currentLang === 'de' ? 'toast_language_de' : 'toast_language_en'));
    loadAllMobsData();
}

function updateLanguage() {
    const flagSrc = currentLang === 'de' ? '/assets/img/backgrounds/de.svg' : '/assets/img/backgrounds/en.svg';
    if (langFlag) langFlag.src = flagSrc;
    if (mobileLangFlag) mobileLangFlag.src = flagSrc;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (!translation) return;

        // Keep leading element markup (icons, badge dots, ...); otherwise replace full content.
        if (translation.includes('<') || el.children.length === 0) {
            el.innerHTML = translation;
            return;
        }

        const textNode = el.childNodes[el.childNodes.length - 1];
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = ' ' + translation;
        } else {
            el.appendChild(document.createTextNode(' ' + translation));
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) el.placeholder = translation;
    });

    document.title = getTranslation('site_title');
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
        getTranslation('loader_text'),
        getTranslation('loader_text2'),
        getTranslation('loader_text3'),
        getTranslation('loader_text4'),
        getTranslation('loader_text5')
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
    showToast(getTranslation('toast_welcome_title'), getTranslation('toast_welcome_message'), 'info');
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
            showToast(getTranslation('toast_theme_changed'), getTranslation('toast_theme_to', { theme: getThemeName(theme) }));
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

// ===== DATEN LADEN =====
async function loadAllMobsData() {
    for (const cat in mobsData) mobsData[cat] = [];

    const langPrefix = currentLang === 'de' ? 'de_' : 'en_';
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
                console.warn(`⚠️ ${file.cat}: keine Daten (${file.url})`);
            }
        } catch (err) {
            console.error(`❌ Fehler beim Laden: ${file.url}`, err);
        }
    }

    const total = Object.values(mobsData).reduce((s, a) => s + a.length, 0);
    console.log(`Gesamt: ${total} Mobs (${currentLang})`);

    if (total === 0) {
        showToast(getTranslation('toast_error_no_data'), 'Fehler beim Laden', 'error');
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

// ===== FILTER & SUCHE =====
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
    console.log(`Filter: ${category}, Anzahl: ${state.filteredMobs.length}`);
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
                <h3><span data-i18n="results_title">No mobs found</span></h3>
                <p><span data-i18n="results_text">Try a different search term or category</span></p>
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
            console.error('Fehler beim Rendern von Mob:', mob.name, error);
        }
    }
}

function formatSizeDisplay(size) {
    if (!size) return 'Keine';
    if (typeof size === 'object') {
        const primary = getPrimarySize(size);
        return primary ? `${formatSizeValue(primary.width)} x ${formatSizeValue(primary.height)}` : 'Keine';
    }
    return String(size);
}

function getCategoryName(type) {
    const names = {
        passive: getTranslation('filter_passive'),
        neutral: getTranslation('filter_neutral'),
        hostile: getTranslation('filter_hostile'),
        jockey:  getTranslation('filter_jockey'),
        boss: getTranslation('filter_boss'),
        summonable: getTranslation('filter_summonable'),
        player: getTranslation('filter_player')
    };
    return names[type] || type;
}

function updateMobStats() {
    if (mobCount) mobCount.textContent = `${state.filteredMobs.length} ${getTranslation('mobs_grid_count').replace(/[0-9+]/g, '').trim()}`;
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
    showToast(getTranslation('toast_mob_opened'), getTranslation('toast_mob_opened_message', { name: mob.name }), 'info');
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

    // Schaden korrekt anzeigen – bei Bossen oder Objekten einen Platzhalter
    if (mob.type === 'player') {
        modalMobDamage.textContent = mob.attack_strength ? `Faust: ${mob.attack_strength.fist || '2HP'}, Items: ${mob.attack_strength.items || 'Variiert'}` : 'Faust: 2HP, Items: Variiert';
    } else if (typeof mob.damage === 'object' && mob.damage !== null) {
        // Bei Bossen oder komplexen Schadensobjekten zeige "Speziell (siehe Details)"
        modalMobDamage.textContent = 'Speziell (siehe Details)';
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
    modalMobMobType.textContent = mob.classification || mob.mob_type || getTranslation('value_none');

    // Erweiterte Datenbank-Felder (neues de_*_mobs.js Schema)
    modalMobCategory.textContent = mob.category || getTranslation('value_none');
    modalMobEdition.textContent = mob.edition || getTranslation('value_none');
    modalMobStatus.textContent = mob.status || getTranslation('value_none');
    modalMobArmor.textContent = mob.armor !== undefined ? formatGenericValue(mob.armor) : getTranslation('value_none');
    modalMobAttackType.textContent = mob.attack_type || getTranslation('value_none');
    modalMobKnockback.textContent = mob.knockback_resistance !== undefined ? formatGenericValue(mob.knockback_resistance) : getTranslation('value_none');
    modalMobIntroduced.textContent = mob.introduced_date || getTranslation('value_none');
    modalMobRemoved.textContent = mob.removed_date || getTranslation('value_none');
    modalMobUpdated.textContent = mob.updated_at || getTranslation('value_none');
    modalMobLootTable.textContent = mob.loot_table || getTranslation('value_none');
    modalMobModel.textContent = mob.model || getTranslation('value_none');

    // Verhalten-Sektion (immer sichtbar, fehlende Werte als "—")
    modalMobRenewable.textContent = mob.renewable || getTranslation('value_none');
    modalMobDespawn.textContent = mob.can_despawn || getTranslation('value_none');
    modalMobTameable.textContent = mob.tameable || getTranslation('value_none');
    modalMobBreedable.textContent = mob.breedable || getTranslation('value_none');
    modalMobDuplicable.textContent = mob.duplicable ? `${mob.duplicable}${mob.duplication_item ? ` (${mob.duplication_item})` : ''}` : getTranslation('value_none');
    modalMobLeashable.textContent = mob.leashable || getTranslation('value_none');
    modalMobRideable.textContent = mob.rideable || getTranslation('value_none');
    modalMobBabyVariant.textContent = mob.baby_variant || getTranslation('value_none');
    modalMobFireImmune.textContent = mob.fire_immune || getTranslation('value_none');
    modalMobUndead.textContent = mob.undead || getTranslation('value_none');
    modalMobBossBar.textContent = mob.boss_bar || getTranslation('value_none');

    // Detaillierte Schadenswerte (immer sichtbar, generisch für beliebige Schlüssel)
    damageDetailsContent.innerHTML = '';
    if (mob.damage && typeof mob.damage === 'object') {
        for (const [key, value] of Object.entries(mob.damage)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${humanizeKey(key)}:</strong> ${formatGenericValue(value)}`;
            damageDetailsContent.appendChild(p);
        }
    } else {
        damageDetailsContent.innerHTML = `<p>${getTranslation('value_none')}</p>`;
    }

    // Drachenfeuerball (Legacy-Feld)
    if (mob.dragon_fireball) {
        dragonFireballContainer.style.display = 'block';
        const sizeLabel = currentLang === 'de' ? 'Größe:' : 'Size:';
        dragonFireballContent.innerHTML = `${sizeLabel} ${formatSizeValue(mob.dragon_fireball.size?.width)} x ${formatSizeValue(mob.dragon_fireball.size?.height)}`;
        dragonFireballContent.style.textAlign = 'center';
    } else {
        dragonFireballContainer.style.display = 'none';
    }

    // Wither-Schädel (Legacy-Feld)
    if (mob.wither_skull) {
        witherSkullContainer.style.display = 'block';
        const sizeLabel = currentLang === 'de' ? 'Größe:' : 'Size:';
        witherSkullContent.innerHTML = `${sizeLabel} ${formatSizeValue(mob.wither_skull.size?.width)} x ${formatSizeValue(mob.wither_skull.size?.height)}`;
        witherSkullContent.style.textAlign = 'center';
    } else {
        witherSkullContainer.style.display = 'none';
    }

    // Fähigkeiten (immer sichtbar)
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
            li.textContent = getTranslation('value_none');
            modalMobAbilitiesList.appendChild(li);
        }
    }

    // Statuseffekte & Immunitäten (immer sichtbar)
    if (modalMobEffectsContent) {
        let html = '';
        if (mob.effects?.length) {
            html += mob.effects.map(effect => {
                const parts = [effect.type, effect.level, effect.duration, effect.chance, effect.condition].filter(Boolean).join(' · ');
                const desc = effect.description ? `<br><span>${escapeHtml(effect.description)}</span>` : '';
                return `<p><strong>${escapeHtml(effect.name || humanizeKey('effect'))}:</strong> ${escapeHtml(parts)}${desc}</p>`;
            }).join('');
        } else {
            html += `<p>${getTranslation('effects_none')}</p>`;
        }
        html += `<p><strong>${escapeHtml(getTranslation('effects_gives'))}:</strong> ${mob.effect_immunities?.length ? escapeHtml(mob.effect_immunities.join(', ')) : getTranslation('value_none')}</p>`;
        modalMobEffectsContent.innerHTML = html;
    }

    // Zusätzliche Informationen (Aliase, Tags, Verweise, Interaktionen, IDs, Medien) – immer sichtbar
    if (modalMobMiscContent) {
        const rows = [
            [getTranslation('misc_aliases'), mob.aliases?.length ? mob.aliases.join(', ') : null, false],
            [getTranslation('misc_tags'), mob.tags?.length ? mob.tags.join(', ') : null, false],
            [getTranslation('misc_targets'), mob.targets?.length ? mob.targets.join(', ') : null, false],
            [getTranslation('misc_enemy_mobs'), mob.enemy_mobs?.length ? mob.enemy_mobs.join(', ') : null, false],
            [getTranslation('misc_follows'), mob.follows?.length ? mob.follows.join(', ') : null, false],
            [getTranslation('misc_healing_item'), (mob.healing_item && (!Array.isArray(mob.healing_item) || mob.healing_item.length)) ? formatGenericValue(mob.healing_item) : null, false],
            [getTranslation('misc_related'), mob.related_entries?.length ? mob.related_entries.join(', ') : null, true],
            [getTranslation('misc_animation'), mob.animation?.length ? mob.animation.join(', ') : null, false],
            [getTranslation('misc_gallery'), mob.gallery?.length ? mob.gallery.join(', ') : null, false],
            [getTranslation('misc_java_id'), mob.java_entity_id || null, true],
            [getTranslation('misc_bedrock_id'), mob.bedrock_entity_id || null, true]
        ];

        modalMobMiscContent.innerHTML = rows.map(([label, value, isCode]) => {
            const displayValue = value ? escapeHtml(value) : getTranslation('value_none');
            return `<p><strong>${escapeHtml(label)}:</strong> ${isCode && value ? `<code class="value-code">${displayValue}</code>` : displayValue}</p>`;
        }).join('');
        modalMobMiscContent.innerHTML += mob.source
            ? `<p><strong>${escapeHtml(getTranslation('misc_source'))}:</strong> <a href="${escapeHtml(mob.source)}" target="_blank" rel="noopener">${escapeHtml(mob.source)}</a></p>`
            : `<p><strong>${escapeHtml(getTranslation('misc_source'))}:</strong> ${getTranslation('value_none')}</p>`;
    }

    // Versionsverlauf (immer sichtbar)
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
            li.textContent = getTranslation('history_none');
            modalMobHistoryList.appendChild(li);
        }
    }

    // Notizen (immer sichtbar)
    if (modalMobNotes) {
        modalMobNotes.textContent = mob.notes || getTranslation('value_none');
    }

    // Fun Fact (immer sichtbar)
    if (modalMobFunFact) {
        modalMobFunFact.textContent = mob.fun_fact || getTranslation('value_none');
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
    const fallbackName = texture?.name || getTranslation('texture_unnamed');
    const fallbackDescription = texture?.description || '';

    if (currentLang !== 'de' || !texture?.file) {
        return { name: fallbackName, description: fallbackDescription };
    }

    const dictionary = {
        aggressive: 'Aggressiv',
        alex: 'Alex',
        all: 'Alle',
        allay: 'Allay',
        angry: 'Wuetend',
        armadillo: 'Guerteltier',
        armorer: 'Ruestungsschmied',
        ashen: 'Asch',
        axolotl: 'Axolotl',
        baby: 'Baby',
        bat: 'Fledermaus',
        beam: 'Laser',
        bee: 'Biene',
        black: 'Schwarz',
        blaze: 'Lohe',
        blue: 'Blau',
        body: 'Koerper',
        bogged: 'Sumpf Skelett',
        bow: 'Bogen',
        breeze: 'Brise',
        brown: 'Braun',
        british: 'Britisch',
        brute: 'Brute',
        butcher: 'Metzger',
        calico: 'Kaliko',
        camel: 'Kamel',
        cartographer: 'Kartograf',
        cat: 'Katze',
        cave: 'Hoehlen',
        chainmail: 'Kettenruestung',
        chicken: 'Huhn',
        cleric: 'Kleriker',
        cod: 'Kabeljau',
        cold: 'Kalt',
        collar: 'Halsband',
        copper: 'Kupfer',
        cow: 'Kuh',
        crackiness: 'Beschaedigung',
        creamy: 'Cremig',
        creeper: 'Creeper',
        cyan: 'Cyan',
        desert: 'Wueste',
        diamond: 'Diamant',
        donkey: 'Esel',
        dragon: 'Drache',
        drowned: 'Ertrunkener',
        elder: 'Aelterer',
        elytra: 'Elytra',
        emerald: 'Smaragd',
        ender: 'Ender',
        enderman: 'Enderman',
        endermite: 'Endermite',
        equipment: 'Ausruestung',
        exposed: 'Freigelegt',
        exploding: 'Explodierend',
        eyes: 'Augen',
        farmer: 'Bauer',
        fisherman: 'Fischer',
        fletcher: 'Pfeilmacher',
        fox: 'Fuchs',
        frog: 'Frosch',
        gaint: 'Riese',
        ghast: 'Ghast',
        glow: 'Leucht',
        goat: 'Ziege',
        gold: 'Gold',
        gray: 'Grau',
        green: 'Gruen',
        guardian: 'Waechter',
        happy: 'Gluecklich',
        harness: 'Geschirr',
        high: 'Hoch',
        hoglin: 'Hoglin',
        horse: 'Pferd',
        humanoid: 'Humanoid',
        husk: 'Husk',
        illusioner: 'Illusionist',
        invulnerable: 'Unverwundbar',
        iron: 'Eisen',
        jellie: 'Jellie',
        jungle: 'Dschungel',
        kai: 'Kai',
        leather: 'Leder',
        leatherworker: 'Lederarbeiter',
        level: 'Stufe',
        librarian: 'Bibliothekar',
        light: 'Hell',
        llama: 'Lama',
        low: 'Niedrig',
        lucy: 'Lucy',
        magenta: 'Magenta',
        magma: 'Magma',
        makena: 'Makena',
        mason: 'Steinmetz',
        medium: 'Mittel',
        mule: 'Maultier',
        nautilus: 'Nautilus',
        nectar: 'Pollen',
        netherite: 'Netherit',
        nitwit: 'Dummkopf',
        noor: 'Noor',
        ocelot: 'Ozelot',
        orange: 'Orange',
        oxidized: 'Oxidiert',
        panda: 'Panda',
        parrot: 'Papagei',
        persian: 'Persisch',
        pig: 'Schwein',
        piglin: 'Piglin',
        pink: 'Pink',
        plains: 'Ebene',
        playful: 'Verspielt',
        polarbear: 'Eisbaer',
        profession: 'Beruf',
        purple: 'Lila',
        rabbit: 'Kaninchen',
        ragdoll: 'Ragdoll',
        red: 'Rot',
        ropes: 'Seile',
        rusty: 'Rost',
        saddle: 'Sattel',
        salmon: 'Lachs',
        savanna: 'Savanne',
        scute: 'Schuppen',
        sheep: 'Schaf',
        shepherd: 'Schaefer',
        shooting: 'Schiessend',
        shorthair: 'Kurzhaar',
        siamese: 'Siam',
        skeleton: 'Skelett',
        slim: 'Schmal',
        snowy: 'Schnee',
        spider: 'Spinne',
        spit: 'Spucke',
        spotted: 'Gefleckt',
        squid: 'Tintenfisch',
        standard: 'Standard',
        steve: 'Steve',
        stone: 'Stein',
        strider: 'Schreiter',
        striped: 'Gestreift',
        sulfur: 'Schwefel',
        sunny: 'Sunny',
        swamp: 'Sumpf',
        tabby: 'Getigert',
        tadpole: 'Kaulquappe',
        taiga: 'Taiga',
        tame: 'Gezaehmt',
        temperate: 'Gemaessigt',
        toolsmith: 'Werkzeugschmied',
        toast: 'Toast',
        trader: 'Haendler',
        tropical: 'Tropisch',
        turtle: 'Schildkroete',
        type: 'Typ',
        villager: 'Dorfbewohner',
        wandering: 'Wander',
        warm: 'Warm',
        weak: 'Schwach',
        weathered: 'Verwittert',
        weaponsmith: 'Waffenschmied',
        white: 'Weiss',
        wild: 'Wild',
        wings: 'Fluegel',
        wolf: 'Wolf',
        worried: 'Besorgt',
        woods: 'Wald',
        yellow: 'Gelb',
        zombie: 'Zombie',
        zuri: 'Zuri'
    };

    const mobFolderPath = texture.file.split('/assets/img/texture/mobs/')[1] || '';
    const basePath = mobFolderPath.replace(/\.[a-z0-9]+$/i, '');
    const parts = basePath.split('/').filter(Boolean);
    const translatedParts = parts
        .join('_')
        .split(/[_-]+/)
        .filter(Boolean)
        .map((part) => dictionary[part.toLowerCase()] || part.charAt(0).toUpperCase() + part.slice(1));

    const name = translatedParts.join(' ').trim() || fallbackName;
    return {
        name,
        description: `Variante: ${name}.`
    };
}

function setModalTexture(mob) {
    if (!modalTextureIcon || !modalMobTexturesContainer) return;
    
    const textures = mob.texture || [];
    
    if (!textures.length) {
        modalMobTexturesContainer.innerHTML = `<p class="no-texture-message" data-i18n="modal_no_texture">${getTranslation('modal_no_texture')}</p>`;
        modalTextureIcon.style.backgroundImage = '';
        modalTextureIcon.style.backgroundColor = 'rgba(0,0,0,0.2)';
        return;
    }
    
    // Erste Textur als Haupt-Icon anzeigen
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
        
        // Vorschau-Bild
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
        
        // Texturname
        const nameEl = document.createElement('div');
        nameEl.style.cssText = `
            font-weight: 600;
            color: var(--text-primary);
            text-align: center;
            margin-bottom: var(--spacing-xs);
            font-size: var(--text-sm);
        `;
        nameEl.textContent = textureMeta.name || getTranslation('texture_unnamed');
        
        // Beschreibung
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
        
        // Klick-Event
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
    
    // Erste Textur als aktiv markieren
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
        soundsContainer.innerHTML = `<p class="no-sounds" data-i18n="modal_no_sounds">${getTranslation('modal_no_sounds')}</p>`;
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
        audio.play().catch(e => console.log('Sound-Wiedergabe fehlgeschlagen:', e));
        const icon = element.querySelector('.sound-play-icon i');
        if (icon) {
            const originalClass = icon.className;
            icon.className = 'fas fa-volume-up';
            setTimeout(() => {
                icon.className = originalClass;
            }, 300);
        }
    } catch (error) {
        console.error('Sound-Fehler:', error);
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
            audio.play().catch(e => console.log('PlayAll Fehler:', e));
            activeSounds.push(audio);
            audio.addEventListener('ended', () => {
                const idx = activeSounds.indexOf(audio);
                if (idx !== -1) activeSounds.splice(idx, 1);
            });
        } catch (error) {
            console.error('PlayAll Fehler:', error);
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
    if (!drops) return 'Keine';
    if (Array.isArray(drops)) {
        if (!drops.length) return 'Keine';
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
        showToast(getTranslation('toast_copy_success'), getTranslation('toast_success'), 'success');
    }).catch(() => {
        showToast(getTranslation('toast_copy_error'), getTranslation('toast_error'), 'error');
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
        attack_strength: { fist: "2HP", items: "Variiert" },
        description: "Der Standard-Spieler-Charakter in Minecraft.",
        version: "Cave game tech test",
        dimension: "Alle",
        movement_speed: 0.1,
        size: {
            width: 0.6, height: 1.8,
            sneaking: { width: 0.6, height: 1.5 },
            gliding_swimming: { width: 0.6, height: 0.6 },
            sleeping: { width: 0.2, height: 0.2 }
        },
        spawn: { biome: "Alle", structure: "Keine" },
        fun_fact: "Steve war ursprünglich als Platzhalter-Name gedacht.",
        abilities: ["Kann alle Arten von Werkzeugen und Waffen verwenden", "Kann Rüstung tragen"],
        drops: [{ item: "minecraft:experience_orb", chance: "100%" }],
        xp: "Variiert"
    }];
    mobsData.hostile = [{
        id: "minecraft:zombie",
        name: "Zombie",
        type: "hostile",
        icon: "/assets/img/mobs/hostile/Zombie.webp",
        health: 20,
        damage: 3,
        description: "Ein feindlicher untoter Mob, der nachts erscheint.",
        version: "Alpha",
        dimension: "Overworld",
        movement_speed: 0.23,
        size: { width: 0.6, height: 1.95, baby: { width: 0.3, height: 0.975 } },
        spawn: { biome: "Alle Overworld-Biome", structure: "Keine" },
        fun_fact: "Zombies verbrennen im Sonnenlicht.",
        abilities: ["Kann Dorfbewohner infizieren", "Kann Türen öffnen"],
        drops: [{ item: "minecraft:rotten_flesh", chance: "100%" }],
        xp: "5"
    }];
    filterMobsByCategory('all');
    showToast(getTranslation('toast_error_fallback'), 'Info', 'info');
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
    initLanguageToggle();
    updateLanguage();
    loadAllMobsData();
});
