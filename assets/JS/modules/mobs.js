// mobs.js

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

// ===== KONFIGURATION =====

// Texte dieser Seite
const I18N = {
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
        modal_3d_loading: "Wird geladen …",
        modal_3d_load_failed: "3D-Modell konnte nicht geladen werden.",
        modal_3d_not_found: "Kein 3D-Modell für diesen Mob verfügbar.",
        modal_3d_jockey_mount: "Kein eigenes Modell – dieser Jockey wird über das Reittier {mob} dargestellt.",
        modal_3d_giant_substitute: "Kein eigenes Modell – der Riese wird als vergrößerter Zombie dargestellt.",
        model3d_equip_saddle: "Sattel",
        model3d_equip_bridle: "Zaumzeug",
        model3d_equip_reins: "Zügel",
        model3d_equip_bags: "Satteltaschen",
        model3d_rotate_stop: "Drehung anhalten",
        model3d_rotate_start: "Drehung fortsetzen",
        modal_sounds_title: "Mob Sounds",
        modal_sounds_text: "Hör dir die Geräusche der einzelnen Mobs im Spiel an.",
        modal_play_all_sounds: "Alle Sounds abspielen",
        modal_stop_all_sounds: "Alle Sounds stoppen",
        modal_no_sounds: "Keine Sounds für diesen Mob verfügbar.",
        modal_sound_info: "Klicke auf einen Sound, um ihn abzuspielen. Halte die Maustaste gedrückt, um den Sound in einer Schleife abzuspielen.",
        modal_sound_variants: "{n} Varianten",
        modal_sound_variant_play: "Variante {n} abspielen",
        modal_sounds_from: "Dieser Mob hat keine eigenen Sounds. Im Spiel sind es die Sounds von: {mob}",
        gd_none: "Für diesen Eintrag gibt es keine Spieldaten – er ist kein eigenes Wesen im Spiel.",
        gd_stats: "Werte",
        gd_hearts: "{n} Herzen",
        gd_damage: "Schaden gegen Spieler",
        gd_easy: "Einfach",
        gd_normal: "Normal",
        gd_hard: "Schwer",
        gd_size: "Größe (Trefferbox)",
        gd_width: "Breite",
        gd_height: "Höhe",
        gd_eye: "Augenhöhe",
        gd_blocks: "{n} Blöcke",
        gd_compare: "Im Vergleich zum Spieler (1,8 Blöcke hoch)",
        gd_player: "Spieler",
        gd_category: "Spawn-Kategorie",
        gd_fire_immune: "Feuerimmun",
        gd_yes: "Ja",
        gd_no: "Nein",
        gd_equipment: "Kann erscheinen mit",
        gd_food: "Futter (Züchten & Heilen)",
        gd_tame: "Zähmen mit",
        gd_drops_none: "Dieser Mob hat im Spiel keine Beutetabelle.",
        gd_drops_hint: "Klicke auf einen Gegenstand, um ihn in der Items-Datenbank zu öffnen.",
        gd_pool: "Beutegruppe {n}",
        gd_rolls: "{n}× gezogen",
        gd_count: "Anzahl",
        gd_chance: "Chance",
        gd_looting: "Plünderung",
        gd_per_level: "je Stufe",
        gd_one_of: "Eins davon:",
        gd_spawn_natural: "Natürliches Spawnen in Biomen",
        gd_spawn_none: "Spawnt nicht natürlich in Biomen – nur über Spawner, Strukturen, Beschwören oder besondere Ereignisse.",
        gd_biome: "Biom",
        gd_spawn_category: "Kategorie",
        gd_weight: "Gewicht",
        gd_group: "Gruppengröße",
        gd_weight_hint: "Je höher das Gewicht, desto häufiger wählt das Spiel diesen Mob beim Spawnen im Biom aus.",
        gd_structures: "Strukturen & Spawner",
        gd_variants: "Varianten",
        gd_sound_variants: "Sound-Varianten",
        gd_dim_overworld: "Oberwelt",
        gd_dim_nether: "Nether",
        gd_dim_end: "Das Ende",
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
        value_unknown: "Unbekannt",
        no_description: "Keine Beschreibung verfügbar.",
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
        modal_3d_loading: "Loading …",
        modal_3d_load_failed: "The 3D model could not be loaded.",
        modal_3d_not_found: "No 3D model available for this mob.",
        modal_3d_jockey_mount: "No model of its own - this jockey is shown as its mount, {mob}.",
        modal_3d_giant_substitute: "No model of its own - the giant is shown as an enlarged zombie.",
        model3d_equip_saddle: "Saddle",
        model3d_equip_bridle: "Bridle",
        model3d_equip_reins: "Reins",
        model3d_equip_bags: "Saddlebags",
        model3d_rotate_stop: "Pause rotation",
        model3d_rotate_start: "Resume rotation",
        modal_sounds_title: "Mob Sounds",
        modal_sounds_text: "Listen to the sounds of each mob in the game.",
        modal_play_all_sounds: "Play All Sounds",
        modal_stop_all_sounds: "Stop All Sounds",
        modal_no_sounds: "No sounds available for this mob.",
        modal_sound_info: "Click on a sound to play it. Hold down the mouse button to play the sound on a loop.",
        modal_sound_variants: "{n} variants",
        modal_sound_variant_play: "Play variant {n}",
        modal_sounds_from: "This mob has no sounds of its own. In the game it uses the sounds of: {mob}",
        gd_none: "There is no game data for this entry – it is not an entity of its own in the game.",
        gd_stats: "Stats",
        gd_hearts: "{n} hearts",
        gd_damage: "Damage to players",
        gd_easy: "Easy",
        gd_normal: "Normal",
        gd_hard: "Hard",
        gd_size: "Size (hitbox)",
        gd_width: "Width",
        gd_height: "Height",
        gd_eye: "Eye height",
        gd_blocks: "{n} blocks",
        gd_compare: "Compared with the player (1.8 blocks tall)",
        gd_player: "Player",
        gd_category: "Spawn category",
        gd_fire_immune: "Fire immune",
        gd_yes: "Yes",
        gd_no: "No",
        gd_equipment: "Can spawn with",
        gd_food: "Food (breeding & healing)",
        gd_tame: "Tame with",
        gd_drops_none: "This mob has no loot table in the game.",
        gd_drops_hint: "Click an item to open it in the items database.",
        gd_pool: "Loot pool {n}",
        gd_rolls: "rolled {n}×",
        gd_count: "Amount",
        gd_chance: "Chance",
        gd_looting: "Looting",
        gd_per_level: "per level",
        gd_one_of: "One of:",
        gd_spawn_natural: "Natural spawning in biomes",
        gd_spawn_none: "Does not spawn naturally in biomes – only from spawners, structures, summoning or special events.",
        gd_biome: "Biome",
        gd_spawn_category: "Category",
        gd_weight: "Weight",
        gd_group: "Group size",
        gd_weight_hint: "The higher the weight, the more often the game picks this mob when spawning in the biome.",
        gd_structures: "Structures & spawners",
        gd_variants: "Variants",
        gd_sound_variants: "Sound variants",
        gd_dim_overworld: "Overworld",
        gd_dim_nether: "Nether",
        gd_dim_end: "The End",
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
        value_unknown: "Unknown",
        no_description: "No description available.",
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
        modal_copyright_title: "Copyright Notice",
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

// Sound Buttons

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

// ===== DATENFORMATIERUNG (unterstützt altes & neues Mob-Datenschema) =====
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

// Kompakte Health-Anzeige für die Karten-Übersicht (z.B. Jockeys: {camel_husk: 32, husk: 20, parched: 16})
function formatHealthCompact(health) {
    if (health === undefined || health === null || health === '') return t('value_none');
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

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== DATEN LADEN =====
async function loadAllMobsData() {
    for (const cat in mobsData) mobsData[cat] = [];

    const langPrefix = lang + '_';
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
    console.log(`Total: ${total} mobs (${lang})`);

    if (total === 0) {
        showToast(t('toast_error_no_data'), lang === 'de' ? 'Fehler beim Laden' : 'Failed to load', 'error');
        loadFallbackMobs();
        return;
    }

    filterMobsByCategory(state.currentFilter);

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
    const none = lang === 'de' ? 'Keine' : 'None';
    if (!size) return none;
    if (typeof size === 'object') {
        const primary = getPrimarySize(size);
        return primary ? `${formatSizeValue(primary.width)} x ${formatSizeValue(primary.height)}` : none;
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
// ===== 3D MODEL TAB =====
// The viewer module (three.js + the Bedrock model renderer, ~1.3MB) is only
// ever imported once the 3D tab is actually clicked - see mob-3d-viewer.js.
let mob3d = null;
let mob3dModulePromise = null;
let mob3dLoadedFor = null; // mob id the canvas currently shows, if any
let mob3dAutoRotate = true;

function findMobById(id) {
    for (const list of Object.values(mobsData)) {
        const found = list.find(m => m.id === id);
        if (found) return found;
    }
    return null;
}

function model3DReasonMessage(reason, entry) {
    if (reason === 'jockey_mount' || reason === 'giant_substitute') {
        const substituteMob = entry && entry.substitute ? findMobById(entry.substitute) : null;
        const mobName = substituteMob ? substituteMob.name : (entry && entry.substitute) || '';
        return t(`modal_3d_${reason}`, { mob: mobName });
    }
    if (reason === 'load_failed') return t('modal_3d_load_failed');
    return t('modal_3d_not_found');
}

function resetModal3D() {
    disposeModal3D();
    mob3dLoadedFor = null;
    const state3d = document.getElementById('model3dState');
    const canvas = document.getElementById('model3dCanvas');
    const hint = document.getElementById('model3dHint');
    const note = document.getElementById('model3dNote');
    const variants = document.getElementById('model3dVariants');
    const equipment = document.getElementById('model3dEquipment');
    if (state3d) { state3d.textContent = t('modal_3d_loading'); state3d.hidden = false; }
    if (canvas) canvas.classList.remove('is-ready');
    if (hint) hint.hidden = true;
    if (note) note.hidden = true;
    if (variants) { variants.hidden = true; variants.innerHTML = ''; }
    if (equipment) { equipment.hidden = true; equipment.innerHTML = ''; }
    updateModel3DRotateToggle(false);
}

// Pause/resume button over the canvas - the choice sticks across mobs.
function updateModel3DRotateToggle(show) {
    const btn = document.getElementById('model3dRotateToggle');
    if (!btn) return;
    btn.hidden = !show;
    const label = t(mob3dAutoRotate ? 'model3d_rotate_stop' : 'model3d_rotate_start');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('aria-pressed', String(!mob3dAutoRotate));
    btn.title = label;
    btn.innerHTML = `<i class="fas fa-${mob3dAutoRotate ? 'pause' : 'play'}"></i>`;
    btn.onclick = () => {
        mob3dAutoRotate = !mob3dAutoRotate;
        if (mob3d && typeof mob3d.setAutoRotate === 'function') mob3d.setAutoRotate(mob3dAutoRotate);
        updateModel3DRotateToggle(true);
    };
}

function disposeModal3D() {
    if (mob3d && typeof mob3d.disposeMob3D === 'function') mob3d.disposeMob3D();
}

// Color/profession/pattern variants (a wolf has 57) share the same geometry
// as the mob's default look - clicking one just swaps the texture.
// The 3D variant labels come from Bedrock's texture keys (English); translated word by word on the DE page.
const MODEL3D_PHRASES_DE = { 'Light Blue': 'Hellblau', 'Light Gray': 'Hellgrau', 'Light Grey': 'Hellgrau', 'All Black': 'Ganz schwarz', 'Tool Smith': 'Werkzeugschmied', 'Weapon Smith': 'Waffenschmied' };
const MODEL3D_WORDS_DE = {
    Aggressive: 'Aggressiv', All: 'Ganz', Angry: 'Wütend', Arctic: 'Arktisch', Armor: 'Rüstung', Armorer: 'Panzermacher',
    Ashen: 'Aschgrau', Base: 'Basis', Beam: 'Strahl', Bioluminescent: 'Biolumineszent', Black: 'Schwarz',
    Blackdots: 'Schwarze Punkte', Blue: 'Blau', Breeze: 'Böe', British: 'Britisch', Brown: 'Braun', Butcher: 'Fleischer',
    Calico: 'Kaliko', Cape: 'Umhang', Cartographer: 'Kartograf', Charged: 'Geladen', Charging: 'Aufladend',
    Chestnut: 'Kastanienbraun', Cleric: 'Geistlicher', Cold: 'Kalt', Copper: 'Kupfer', Coral: 'Koralle', Cracked: 'Rissig',
    Creamy: 'Cremefarben', Cyan: 'Türkis', Darkbrown: 'Dunkelbraun', Decor: 'Dekor', Default: 'Standard', Diamond: 'Diamant',
    Donkey: 'Esel', Elder: 'Groß', Exploding: 'Explodierend', Exposed: 'Angelaufen', Eyes: 'Augen', Farmer: 'Bauer',
    Fisherman: 'Fischer', Fletcher: 'Pfeilmacher', Gray: 'Grau', Green: 'Grün', Grey: 'Grau', Happy: 'Glücklich', Heart: 'Herz',
    High: 'Hoch', Invulnerable: 'Unverwundbar', Iron: 'Eisen', Layer: 'Schicht', Lazy: 'Faul', Leather: 'Leder',
    Leatherworker: 'Gerber', Librarian: 'Bibliothekar', Light: 'Hell', Lime: 'Hellgrün', Low: 'Niedrig', Markings: 'Abzeichen',
    Med: 'Mittel', Mule: 'Maultier', Nectar: 'Nektar', Netherite: 'Netherit', Nitwit: 'Nichtsnutz', None: 'Keine',
    Overlay: 'Überlagerung', Oxidized: 'Oxidiert', Pale: 'Blass', Pattern: 'Muster', Persian: 'Perser', Pink: 'Rosa',
    Playful: 'Verspielt', Priest: 'Priester', Purple: 'Violett', Red: 'Rot', Ropes: 'Seile', Rusty: 'Rostrot', Saddle: 'Sattel',
    Saddled: 'Gesattelt', Salt: 'Salz', Shepherd: 'Schäfer', Shooting: 'Schießend', Siamese: 'Siam', Silver: 'Silber',
    Skeleton: 'Skelett', Sleep: 'Schlafend', Smith: 'Schmied', Snowy: 'Schneeweiß', Splotched: 'Gescheckt', Spots: 'Flecken',
    Spotted: 'Gefleckt', Stonemason: 'Steinmetz', Striped: 'Gestreift', Suffocated: 'Erstickt', Tabby: 'Getigert',
    Tame: 'Gezähmt', Temperate: 'Gemäßigt', Tendrils: 'Ranken', Tnt: 'TNT', Tool: 'Werkzeug', Type: 'Typ', Undyed: 'Ungefärbt',
    Unskilled: 'Ungelernt', Weak: 'Schwach', Weapon: 'Waffe', Weathered: 'Verwittert', White: 'Weiß',
    Whitedots: 'Weiße Punkte', Whitefield: 'Weißes Feld', Woods: 'Wald', Worried: 'Besorgt', Yellow: 'Gelb'
};

function localizeModelLabel(label) {
    if (lang !== 'de' || !label) return label;
    let out = label;
    Object.entries(MODEL3D_PHRASES_DE).forEach(([en, de]) => { out = out.replace(en, de); });
    return out.split(' ').map((word) => MODEL3D_WORDS_DE[word] || word).join(' ');
}

function renderModel3DVariants(entry, activeAssetKey) {
    const container = document.getElementById('model3dVariants');
    if (!container) return;
    container.innerHTML = '';
    const variants = entry && entry.variants;
    if (!variants || variants.length < 2) {
        container.hidden = true;
        return;
    }
    variants.forEach((variant) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'model3d-variant' + (variant.asset === activeAssetKey ? ' active' : '');
        btn.textContent = localizeModelLabel(variant.label);
        btn.dataset.asset = variant.asset;
        btn.addEventListener('click', () => switchModel3DVariant(variant.asset));
        container.appendChild(btn);
    });
    container.hidden = false;
}

async function switchModel3DVariant(assetKey) {
    if (!currentMob || !mob3d) return;
    const mobIdAtCall = currentMob.id;
    const canvas = document.getElementById('model3dCanvas');
    const result = await mob3d.renderMob3D(mobIdAtCall, canvas, assetKey);
    if (!currentMob || currentMob.id !== mobIdAtCall || mob3dLoadedFor !== mobIdAtCall) return;
    if (result.ok) {
        document.querySelectorAll('#model3dVariants .model3d-variant').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.asset === assetKey);
        });
        renderModel3DEquipment(result.equipment);
    }
}

// Tack a rideable mob is wearing (saddle, bridle, reins, saddlebags) is
// baked into its base geometry as its own bone(s) - Model.hideBone()/
// showBone() (from the model-viewer library) toggle it without touching
// the texture or reloading anything.
function renderModel3DEquipment(equipment) {
    const container = document.getElementById('model3dEquipment');
    if (!container) return;
    container.innerHTML = '';
    if (!equipment || !equipment.length) {
        container.hidden = true;
        return;
    }
    equipment.forEach((item) => {
        const label = document.createElement('label');
        label.className = 'model3d-equip-toggle';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.visible;
        checkbox.addEventListener('change', () => {
            if (mob3d) mob3d.setEquipmentVisible(item.key, checkbox.checked);
        });
        const span = document.createElement('span');
        span.textContent = t(`model3d_equip_${item.key}`);
        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
    container.hidden = false;
}

async function loadModel3DTab() {
    if (!currentMob) return;
    if (mob3dLoadedFor === currentMob.id) return; // already showing this mob
    mob3dLoadedFor = currentMob.id;

    const state3d = document.getElementById('model3dState');
    const canvas = document.getElementById('model3dCanvas');
    const hint = document.getElementById('model3dHint');
    const note = document.getElementById('model3dNote');
    if (state3d) { state3d.textContent = t('modal_3d_loading'); state3d.hidden = false; }
    if (canvas) canvas.classList.remove('is-ready');
    if (hint) hint.hidden = true;
    if (note) note.hidden = true;
    updateModel3DRotateToggle(false);

    try {
        if (!mob3dModulePromise) mob3dModulePromise = import('/assets/JS/modules/mob-3d-viewer.js?v=20260913j');
        mob3d = await mob3dModulePromise;
    } catch (err) {
        console.error('Failed to load 3D viewer module:', err);
        if (state3d) state3d.textContent = t('modal_3d_load_failed');
        return;
    }
    if (!currentMob || mob3dLoadedFor !== currentMob.id) return;

    const result = await mob3d.renderMob3D(currentMob.id, canvas);
    if (!currentMob || mob3dLoadedFor !== currentMob.id || result.reason === 'stale') return;

    if (result.ok) {
        if (state3d) state3d.hidden = true;
        // renderMob3D() replaces the canvas with a clone (see mob-3d-viewer.js
        // for why) - result.canvas is that new element, not the one we passed in.
        if (result.canvas) result.canvas.classList.add('is-ready');
        if (hint) hint.hidden = false;
        updateModel3DRotateToggle(true);
        renderModel3DVariants(result.entry, result.assetKey);
        renderModel3DEquipment(result.equipment);
        // A successfully rendered model can still be a substitute (jockey
        // mount, enlarged zombie for "giant") - say so rather than let it
        // look like the mob's own dedicated model.
        const entryReason = result.entry && result.entry.reason;
        if ((entryReason === 'jockey_mount' || entryReason === 'giant_substitute') && note) {
            note.textContent = model3DReasonMessage(entryReason, result.entry);
            note.hidden = false;
        }
    } else {
        if (state3d) state3d.hidden = true;
        if (note) {
            note.textContent = model3DReasonMessage(result.reason, result.entry);
            note.hidden = false;
        }
    }
}

function openMobModal(mob) {
    if (!mob) return;
    currentMob = mob;
    setModalBasicInfo(mob);
    setModalProperties(mob);
    setModalExtendedInfo(mob);
    setModalCommands(mob);
    setModalTexture(mob);
    loadMobSounds(mob);
    renderGameTabs(mob);
    resetModal3D();
    document.getElementById('mobModal').classList.add('show');
    document.body.style.overflow = 'hidden';
    // The 3D tab can still be the active one from the previous mob.
    const tab3d = document.getElementById('model3dTab');
    if (tab3d && tab3d.classList.contains('active')) loadModel3DTab();
    showToast(t('toast_mob_opened'), t('toast_mob_opened_message', { name: mob.name }), 'info');
}

function closeMobModal() {
    document.getElementById('mobModal').classList.remove('show');
    document.body.style.overflow = '';
    playClickSound();
    stopAllSounds();
    disposeModal3D();
}

function setModalBasicInfo(mob) {
    modalMobName.textContent = mob.name || t('value_unknown');
    modalMobIcon.style.backgroundImage = `url('${mob.icon || '/assets/img/mobs/default/default.png'}')`;
    modalMobId.textContent = mob.id || t('value_none');
    modalMobHealth.textContent = mob.health !== undefined ? formatGenericValue(mob.health) : t('value_none');
    modalMobType.textContent = getCategoryName(mob.type);
}

function setModalProperties(mob) {
    modalMobTypeValue.textContent = getCategoryName(mob.type);
    modalMobHealthValue.textContent = mob.health !== undefined ? formatGenericValue(mob.health) : t('value_none');

    // Schaden korrekt anzeigen – bei Bossen oder Objekten einen Platzhalter
    if (mob.type === 'player') {
        if (lang === 'de') {
            modalMobDamage.textContent = mob.attack_strength ? `Faust: ${mob.attack_strength.fist || '2HP'}, Items: ${mob.attack_strength.items || 'Variiert'}` : 'Faust: 2HP, Items: Variiert';
        } else {
            modalMobDamage.textContent = mob.attack_strength ? `Fist: ${mob.attack_strength.fist || '2HP'}, Items: ${mob.attack_strength.items || 'Varies'}` : 'Fist: 2HP, Items: Varies';
        }
    } else if (typeof mob.damage === 'object' && mob.damage !== null) {
        // Bei Bossen oder komplexen Schadensobjekten zeige "Speziell (siehe Details)"
        modalMobDamage.textContent = lang === 'de' ? 'Speziell (siehe Details)' : 'Special (see details)';
    } else {
        modalMobDamage.textContent = mob.damage || t('value_none');
    }

    const primarySize = getPrimarySize(mob.size);
    const adultSize = primarySize ? `${formatSizeValue(primarySize.width)} x ${formatSizeValue(primarySize.height)}` : t('value_unknown');
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
            const babySize = mob.size?.baby ? `${formatSizeValue(mob.size.baby.width)} x ${formatSizeValue(mob.size.baby.height)}` : t('value_none');
            modalBabyMobSize.textContent = babySize;
        }
    }
    modalMobBiome.textContent = mob.spawn?.biome || mob.biome || t('value_none');
    modalMobXP.textContent = mob.experience !== undefined ? mob.experience : (mob.xp || t('value_none'));
    modalMobDescription.textContent = mob.description || t('no_description');
    modalMobDrops.textContent = formatDrops(mob.drops);
}

function setModalExtendedInfo(mob) {
    modalMobVersion.textContent = mob.version || t('value_unknown');
    modalMobNumericID.textContent = mob.numeric_id !== undefined ? mob.numeric_id : t('value_none');
    modalMobDimension.textContent = mob.dimension || t('value_unknown');
    modalMobMovementSpeed.textContent = mob.movement_speed !== undefined ? formatGenericValue(mob.movement_speed) : t('value_unknown');
    const lightLevel = Array.isArray(mob.light_level) ? mob.light_level.join(', ') : mob.light_level;
    modalMobLightLevel.textContent = lightLevel || t('value_unknown');
    modalMobStructure.textContent = mob.spawn?.structure || mob.structure || t('value_none');
    modalMobMobType.textContent = mob.classification || mob.mob_type || t('value_none');

    // Erweiterte Datenbank-Felder (neues de_*_mobs.js Schema)
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

    // Verhalten-Sektion (immer sichtbar, fehlende Werte als "—")
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

    // Detaillierte Schadenswerte (immer sichtbar, generisch für beliebige Schlüssel)
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

    // Drachenfeuerball (Legacy-Feld)
    if (mob.dragon_fireball) {
        dragonFireballContainer.style.display = 'block';
        const sizeLabel = lang === 'de' ? 'Größe:' : 'Size:';
        dragonFireballContent.innerHTML = `${sizeLabel} ${formatSizeValue(mob.dragon_fireball.size?.width)} x ${formatSizeValue(mob.dragon_fireball.size?.height)}`;
        dragonFireballContent.style.textAlign = 'center';
    } else {
        dragonFireballContainer.style.display = 'none';
    }

    // Wither-Schädel (Legacy-Feld)
    if (mob.wither_skull) {
        witherSkullContainer.style.display = 'block';
        const sizeLabel = lang === 'de' ? 'Größe:' : 'Size:';
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
            li.textContent = t('value_none');
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
            html += `<p>${t('effects_none')}</p>`;
        }
        html += `<p><strong>${escapeHtml(t('effects_gives'))}:</strong> ${mob.effect_immunities?.length ? escapeHtml(mob.effect_immunities.join(', ')) : t('value_none')}</p>`;
        modalMobEffectsContent.innerHTML = html;
    }

    // Zusätzliche Informationen (Aliase, Tags, Verweise, Interaktionen, IDs, Medien) – immer sichtbar
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
            li.textContent = t('history_none');
            modalMobHistoryList.appendChild(li);
        }
    }

    // Notizen (immer sichtbar)
    if (modalMobNotes) {
        modalMobNotes.textContent = mob.notes || t('value_none');
    }

    // Fun Fact (immer sichtbar)
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
    // Names and descriptions come localized from the DB.
    return { name: texture?.name || t('texture_unnamed'), description: texture?.description || '' };
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
        nameEl.textContent = textureMeta.name || t('texture_unnamed');

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

// One entry per sound event (tools/build-mob-sounds.py); like the game, a click
// plays one of its variants at random.
// ===== SPIELDATEN (tools/build-mob-data.py) =====

function escapeAttr(text) {
    return escapeHtml(String(text ?? '')).replace(/"/g, '&quot;');
}

function formatGameNumber(value) {
    if (typeof value !== 'number') return String(value ?? '');
    return value.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', { maximumFractionDigits: 3 });
}

function gameSection(icon, title, body) {
    return `<section class="game-section"><h5><i class="fas ${icon}"></i> ${escapeHtml(title)}</h5>${body}</section>`;
}

function gameStat(label, value, sub) {
    return `<div class="game-stat"><span class="game-stat-label">${escapeHtml(label)}</span>`
        + `<span class="game-stat-value">${escapeHtml(value)}</span>`
        + (sub ? `<span class="game-stat-sub">${escapeHtml(sub)}</span>` : '') + '</div>';
}

function gameItemChip(item) {
    const icon = item.icon
        ? `<img src="${escapeAttr(item.icon)}" alt="" loading="lazy">`
        : '<span class="game-item-noicon"><i class="fas fa-cube"></i></span>';
    const inner = `${icon}<span>${escapeHtml(item.name)}</span>`;
    return item.href
        ? `<a class="game-item" href="${escapeAttr(item.href)}" title="${escapeAttr(item.id)}">${inner}</a>`
        : `<span class="game-item" title="${escapeAttr(item.id)}">${inner}</span>`;
}

function gameItemList(items) {
    return `<div class="game-items">${items.map(gameItemChip).join('')}</div>`;
}

// Both hitboxes side by side in blocks, standing on the same ground line.
function sizeCompareSvg(size, mob) {
    const player = { width: 0.6, height: 1.8 };
    const pad = 0.4;
    const gap = 0.8;
    const maxH = Math.max(player.height, size.height);
    const top = maxH * 0.14;
    const w = pad + player.width + gap + size.width + pad;
    const ground = top + maxH;
    const h = ground + maxH * 0.06;
    const unit = Math.max(maxH, 2);
    const font = unit * 0.07;
    const stroke = unit * 0.012;
    const px = pad;
    const mx = pad + player.width + gap;
    const head = player.width * 0.8;
    const grid = [];
    if (maxH <= 16) {
        for (let y = 1; y <= Math.floor(maxH); y++) {
            grid.push(`<line x1="0" x2="${w}" y1="${ground - y}" y2="${ground - y}" stroke="var(--border-color)" stroke-width="${stroke / 2}" stroke-dasharray="${stroke * 3} ${stroke * 3}"/>`);
        }
    }
    const icon = mob.icon
        ? `<image href="${escapeAttr(mob.icon)}" x="${mx}" y="${ground - size.height}" width="${size.width}" height="${size.height}" preserveAspectRatio="xMidYMax meet"/>`
        : '';
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeAttr(t('gd_compare'))}">${grid.join('')}
        <line x1="0" x2="${w}" y1="${ground}" y2="${ground}" stroke="var(--text-secondary)" stroke-width="${stroke}"/>
        <g fill="var(--text-secondary)" opacity="0.75">
            <rect x="${px + (player.width - head) / 2}" y="${ground - player.height}" width="${head}" height="${head}"/>
            <rect x="${px + player.width * 0.15}" y="${ground - player.height + head}" width="${player.width * 0.7}" height="${player.height - head}"/>
        </g>
        <rect x="${px}" y="${ground - player.height}" width="${player.width}" height="${player.height}" fill="none" stroke="var(--text-secondary)" stroke-width="${stroke}" stroke-dasharray="${stroke * 2} ${stroke * 2}"/>
        ${icon}
        <rect x="${mx}" y="${ground - size.height}" width="${size.width}" height="${size.height}" fill="var(--primary)" fill-opacity="0.12" stroke="var(--primary)" stroke-width="${stroke}"/>
        <text x="${px + player.width / 2}" y="${ground - player.height - font * 0.6}" font-size="${font}" text-anchor="middle" fill="var(--text-secondary)">${escapeHtml(t('gd_player'))}</text>
        <text x="${mx + size.width / 2}" y="${ground - size.height - font * 0.6}" font-size="${font}" text-anchor="middle" fill="var(--text-primary)">${escapeHtml(mob.name || '')}</text>
    </svg>`;
}

function renderGameData(mob) {
    const el = document.getElementById('modalGameData');
    if (!el) return;
    const game = mob.game;
    if (!game) {
        el.innerHTML = `<p class="game-empty">${escapeHtml(t('gd_none'))}</p>`;
        return;
    }
    const parts = [];
    const stats = (game.attributes || []).map((a) => {
        const value = typeof a.value === 'number' ? formatGameNumber(a.value) : '?';
        const sub = a.id === 'max_health' && typeof a.value === 'number' ? t('gd_hearts', { n: formatGameNumber(a.value / 2) }) : '';
        return gameStat(a.name, value, sub);
    });
    if (game.category) stats.push(gameStat(t('gd_category'), game.category.name));
    stats.push(gameStat(t('gd_fire_immune'), game.fire_immune ? t('gd_yes') : t('gd_no')));
    parts.push(gameSection('fa-chart-bar', t('gd_stats'), `<div class="game-stats">${stats.join('')}</div>`));
    // Passive mobs carry an attack attribute too, but never attack players.
    if (game.damage && mob.type !== 'passive') {
        const cells = ['easy', 'normal', 'hard'].map((k) =>
            gameStat(t(`gd_${k}`), formatGameNumber(game.damage[k]), t('gd_hearts', { n: formatGameNumber(game.damage[k] / 2) })));
        parts.push(gameSection('fa-fist-raised', t('gd_damage'), `<div class="game-stats">${cells.join('')}</div>`));
    }
    if (game.size) {
        const s = game.size;
        const cells = [
            gameStat(t('gd_width'), t('gd_blocks', { n: formatGameNumber(s.width) })),
            gameStat(t('gd_height'), t('gd_blocks', { n: formatGameNumber(s.height) }))
        ];
        if (typeof s.eye_height === 'number') cells.push(gameStat(t('gd_eye'), t('gd_blocks', { n: formatGameNumber(s.eye_height) })));
        parts.push(gameSection('fa-ruler-combined', t('gd_size'), `<div class="game-stats">${cells.join('')}</div>`
            + `<figure class="size-compare">${sizeCompareSvg(s, mob)}<figcaption>${escapeHtml(t('gd_compare'))}</figcaption></figure>`));
    }
    if (game.equipment) parts.push(gameSection('fa-shield-alt', t('gd_equipment'), gameItemList(game.equipment)));
    if (game.food) parts.push(gameSection('fa-drumstick-bite', t('gd_food'), gameItemList(game.food)));
    if (game.tame) parts.push(gameSection('fa-heart', t('gd_tame'), gameItemList(game.tame)));
    el.innerHTML = parts.join('');
}

function renderGameDrops(mob) {
    const el = document.getElementById('modalGameDrops');
    if (!el || !mob.game) return;
    const pools = mob.game.loot || [];
    if (!pools.length) {
        el.innerHTML = `<p class="game-empty">${escapeHtml(t('gd_drops_none'))}</p>`;
        return;
    }
    const html = pools.map((pool, i) => {
        const head = pools.length > 1 || pool.rolls !== '1'
            ? `<div class="loot-pool-head">${escapeHtml(t('gd_pool', { n: i + 1 }))}${pool.rolls !== '1' ? ' · ' + escapeHtml(t('gd_rolls', { n: pool.rolls })) : ''}</div>`
            : '';
        const rows = pool.rows.map((row) => {
            const badges = [
                `<span class="loot-badge" title="${escapeAttr(t('gd_count'))}"><i class="fas fa-layer-group"></i>${escapeHtml(row.count)}</span>`,
                `<span class="loot-badge" title="${escapeAttr(t('gd_chance'))}"><i class="fas fa-dice"></i>${escapeHtml(row.chance)}</span>`
            ];
            if (row.looting) {
                badges.push(`<span class="loot-badge"><i class="fas fa-magic"></i>${escapeHtml(`${t('gd_looting')} ${row.looting} ${t('gd_per_level')}`)}</span>`);
            }
            const notes = [...(row.conditions || []), ...(row.notes || [])];
            return '<div class="loot-row">'
                + (row.items.length > 1 ? `<span class="loot-one-of">${escapeHtml(t('gd_one_of'))}</span>` : '')
                + gameItemList(row.items)
                + `<div class="loot-meta">${badges.join('')}</div>`
                + (notes.length ? `<ul class="loot-notes">${notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}</ul>` : '')
                + '</div>';
        }).join('');
        return `<div class="loot-pool">${head}${rows}</div>`;
    }).join('');
    el.innerHTML = html + `<p class="game-source">${escapeHtml(t('gd_drops_hint'))}</p>`;
}

function renderGameSpawns(mob) {
    const el = document.getElementById('modalGameSpawns');
    if (!el || !mob.game) return;
    const spawns = mob.game.spawns || {};
    const parts = [];
    const biomes = spawns.biomes || [];
    if (biomes.length) {
        const byDimension = {};
        biomes.forEach((b) => (byDimension[b.dimension] = byDimension[b.dimension] || []).push(b));
        const head = `<tr><th>${escapeHtml(t('gd_biome'))}</th><th>${escapeHtml(t('gd_spawn_category'))}</th>`
            + `<th class="num">${escapeHtml(t('gd_weight'))}</th><th class="num">${escapeHtml(t('gd_group'))}</th></tr>`;
        const tables = Object.entries(byDimension).map(([dimension, list]) =>
            `<h6 class="spawn-dim">${escapeHtml(t('gd_dim_' + dimension))} (${list.length})</h6>`
            + `<div class="spawn-table-wrap"><table class="spawn-table"><thead>${head}</thead><tbody>`
            + list.map((b) => `<tr><td>${escapeHtml(b.name)}</td><td>${escapeHtml(b.category)}</td>`
                + `<td class="num">${escapeHtml(String(b.weight))}</td><td class="num">${escapeHtml(b.count)}</td></tr>`).join('')
            + '</tbody></table></div>').join('');
        parts.push(gameSection('fa-globe-europe', t('gd_spawn_natural'), tables + `<p class="game-source">${escapeHtml(t('gd_weight_hint'))}</p>`));
    } else {
        parts.push(gameSection('fa-globe-europe', t('gd_spawn_natural'), `<p class="game-empty">${escapeHtml(t('gd_spawn_none'))}</p>`));
    }
    if (spawns.structures && spawns.structures.length) {
        const chips = spawns.structures.map((s) => '<span class="game-item"><span class="game-item-noicon"><i class="fas fa-landmark"></i></span>'
            + `<span>${escapeHtml(s.name)} · ${escapeHtml(s.category)}</span></span>`).join('');
        parts.push(gameSection('fa-landmark', t('gd_structures'), `<div class="game-items">${chips}</div>`));
    }
    el.innerHTML = parts.join('');
}

function renderGameVariants(mob) {
    const el = document.getElementById('modalGameVariants');
    if (!el || !mob.game) return;
    const game = mob.game;
    const parts = [];
    if (game.variants && game.variants.length) {
        const cards = game.variants.map((v) => `<div class="variant-card"><h6>${escapeHtml(v.name)}</h6>`
            + `<div class="variant-thumbs">${(v.textures || []).map((tex) => `<figure><img src="${escapeAttr(tex.file)}" alt="${escapeAttr(`${v.name} – ${tex.label}`)}" loading="lazy">`
                + `<figcaption>${escapeHtml(tex.label)}</figcaption></figure>`).join('')}</div>`
            + (v.spawn && v.spawn.length ? `<ul class="variant-spawn">${v.spawn.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>` : '')
            + '</div>').join('');
        parts.push(gameSection('fa-palette', t('gd_variants'), `<div class="variant-grid">${cards}</div>`));
    }
    if (game.sound_variants && game.sound_variants.length) {
        const blocks = game.sound_variants.map((v, vi) => `<div class="sound-variant-block"><h6>${escapeHtml(v.name)}</h6><div class="sound-variant-buttons">`
            + (v.sounds || []).map((s, si) => `<button type="button" data-sv="${vi}" data-si="${si}" title="${escapeAttr(s.event)}"><i class="fas fa-play"></i>${escapeHtml(s.name || s.event)}</button>`).join('')
            + '</div></div>').join('');
        parts.push(gameSection('fa-music', t('gd_sound_variants'), blocks));
    }
    el.innerHTML = parts.join('');
    el.querySelectorAll('.sound-variant-buttons button').forEach((btn) => {
        btn.addEventListener('click', () => playSoundOnce(game.sound_variants[btn.dataset.sv].sounds[btn.dataset.si], btn));
    });
}

// Fills the game-data tabs and hides the ones this mob has nothing for.
function renderGameTabs(mob) {
    renderGameData(mob);
    renderGameDrops(mob);
    renderGameSpawns(mob);
    renderGameVariants(mob);
    const game = mob.game;
    const visible = {
        gamedata: !!game,
        drops: !!game,
        spawning: !!game,
        variants: !!(game && ((game.variants || []).length || (game.sound_variants || []).length))
    };
    Object.entries(visible).forEach(([tab, show]) => {
        const btn = document.querySelector(`.item-tab[data-tab="${tab}"]`);
        if (btn) btn.hidden = !show;
    });
    const active = document.querySelector('.item-tab.active');
    if (active && active.hidden) document.querySelector('.item-tab[data-tab="properties"]')?.click();
}

function soundFiles(sound) {
    if (Array.isArray(sound.files)) return sound.files;
    return sound.file ? [sound.file] : [];
}

function randomSoundFile(sound) {
    const files = soundFiles(sound);
    return files.length ? files[Math.floor(Math.random() * files.length)] : '';
}

function loadMobSounds(mob) {
    if (!soundsContainer) return;
    const sounds = mob.sounds || [];
    if (!sounds.length) {
        soundsContainer.innerHTML = `<p class="no-sounds" data-i18n="modal_no_sounds">${t('modal_no_sounds')}</p>`;
        return;
    }
    soundsContainer.innerHTML = '';
    if (mob.sounds_from) {
        const source = state.currentMobs.find(m => m.id === mob.sounds_from);
        const note = document.createElement('p');
        note.className = 'sound-source-note';
        note.textContent = t('modal_sounds_from', { mob: source ? source.name : mob.sounds_from });
        soundsContainer.appendChild(note);
    }
    sounds.forEach((sound, idx) => {
        const count = soundFiles(sound).length;
        const soundItem = document.createElement('div');
        soundItem.className = 'sound-item';
        soundItem.setAttribute('data-sound-index', idx);
        soundItem.innerHTML = `
            <div class="sound-play-icon">
                <i class="fas fa-play"></i>
            </div>
            <div class="sound-info">
                <div class="sound-name">${escapeHtml(sound.name || sound.event || '')}</div>
                ${sound.event ? `<div class="sound-category">${escapeHtml(sound.event)}</div>` : ''}
                ${sound.description ? `<div class="sound-description">${escapeHtml(sound.description)}</div>` : ''}
            </div>
            ${count > 1 ? `<div class="sound-variants">
                <span class="sound-duration">${escapeHtml(t('modal_sound_variants', { n: count }))}</span>
                <div class="sound-variant-list">${soundFiles(sound).map((file, i) => {
                    const label = escapeHtml(t('modal_sound_variant_play', { n: i + 1 }));
                    return `<button type="button" class="sound-variant" data-variant="${i}" title="${label}" aria-label="${label}">${i + 1}</button>`;
                }).join('')}</div>
            </div>` : ''}
        `;
        // The row plays a random variant, a number button exactly that one.
        const chosenFile = (target) => {
            const btn = target.closest('.sound-variant');
            return btn ? soundFiles(sound)[Number(btn.dataset.variant)] : undefined;
        };
        soundItem.addEventListener('click', (e) => {
            e.stopPropagation();
            playSoundOnce(sound, soundItem, chosenFile(e.target));
            const btn = e.target.closest('.sound-variant');
            if (btn) {
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 300);
            }
        });
        let loopInterval = null;
        soundItem.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if (loopInterval) return;
            const file = chosenFile(e.target);
            loopInterval = setInterval(() => {
                playSoundOnce(sound, soundItem, file);
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

function playSoundOnce(sound, element, file) {
    if (!soundEnabled) return;
    file = file || randomSoundFile(sound);
    if (!file) return;
    try {
        const audio = new Audio(file);
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
        const file = randomSoundFile(sound);
        if (!file) return;
        try {
            const audio = new Audio(file);
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
    const none = lang === 'de' ? 'Keine' : 'None';
    if (!drops) return none;
    if (Array.isArray(drops)) {
        if (!drops.length) return none;
        return drops.map(drop => {
            if (typeof drop === 'object') {
                const item = drop.item || drop.name || t('value_unknown');
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
            if (tabId === 'model3d') {
                loadModel3DTab();
            } else {
                disposeModal3D();
                mob3dLoadedFor = null;
            }
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
    const fallback = lang === 'de' ? {
        player: [{
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
        }],
        hostile: [{
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
        }]
    } : {
        player: [{
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
        }],
        hostile: [{
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
        }]
    };

    mobsData.player = fallback.player;
    mobsData.hostile = fallback.hostile;
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
    initEventListeners();
    loadAllMobsData();
});
