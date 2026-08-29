// Color Text Converter 

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;
let currentEdition = localStorage.getItem('mc-craft-color-edition') || 'je';
let motdCenterLines = false;

// Übersetzungen – alle für den Farbtext-Konverter benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_color: "MC-Craft | Farbtext-Konverter",
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
    color_hero_title: "Minecraft <span class=\"highlight\">Color Text</span> Konverter",
    hero_badge: "V 1.0.0 ist da",
    color_hero_desc: "Erstelle farbige und formatierte Texte für Minecraft mit einfachen Klicks. Perfekt für deine Server-MOTDs, Schilder, Chat-Nachrichten und vieles mehr.",
    color_hero_btn_converter: "Zum Konverter",
    color_hero_btn_text: "Text Konverter",
    color_grid_colors: "16 Farben",
    color_grid_formats: "6 Formatierungen",
    color_grid_preview: "Live Vorschau",
    color_grid_symbols: "40+ Symbole",
    color_section_title: "Color Text <span class=\"highlight\">Konverter</span>",
    color_section_subtitle: "Wähle Farben und Formatierungen für deinen Minecraft Text",
    color_colors_title: "Farben",
    color_formats_title: "Formatierungen",
    color_label_text: "Dein Text",
    color_placeholder_text: "Gib hier deinen Text ein...",
    color_char_count: "Zeichen",
    color_btn_apply: "Formatierung anwenden",
    color_btn_clear: "Alles löschen",
    color_btn_example: "Beispiel einfügen",
    color_label_preview: "Live Vorschau",
    color_preview_placeholder: "Deine Vorschau erscheint hier...",
    color_btn_copy_formatted: "Formatierten Text kopieren",
    color_btn_copy_codes: "Farbcodes kopieren (&)",
    color_btn_copy_minecraft: "Minecraft Codes kopieren (§)",
    banner_style: "Banner Stil",
    banner_none: "Kein Banner",
    color_symbols_title: "Besondere",
    color_symbols_highlight: "Symbole",
    color_symbols_subtitle: "Symbole für deine Minecraft-Texte",
    color_filter_all: "Alle",
    color_filter_smileys: "😊 Smileys",
    color_filter_people: "👤 Menschen",
    color_filter_animals: "🐶 Tiere",
    color_filter_food: "🍕 Essen",
    color_filter_activity: "⚽ Aktivitäten",
    color_filter_travel: "✈️ Reisen",
    color_filter_objects: "📱 Gegenstände",
    color_filter_symbols: "❤️ Symbole",
    color_filter_flags: "🏳️ Flaggen",
    color_filter_decorative: "♣ Dekoration",
    color_filter_arrows: "↔ Pfeile",
    color_filter_shapes: "❖ Formen",
    color_filter_special: "⚒ Besondere",
    color_tips_title: "Formatierung erklärt",
    color_tip_obfuscated_title: "Verschleierung (&k)",
    color_tip_obfuscated_desc: "Text wird in Minecraft mit zufälligen Zeichen animiert dargestellt",
    color_tip_reset_title: "Zurücksetzen (&r)",
    color_tip_reset_desc: "Setzt alle Formatierungen auf Standard zurück",
    color_tip_combine_title: "Kombinationen",
    color_tip_combine_desc: "Kombiniere Farben und Formatierungen für coole Effekte",
    color_tip_compat_title: "Kompatibilität",
    color_tip_compat_desc: "Funktioniert in Chat, Schildern, Büchern und Server-MOTDs",
    color_examples_title: "Schnelle",
    color_examples_highlight: "Beispiele",
    color_examples_subtitle: "Klicke auf ein Beispiel, um es in den Konverter zu laden",
    color_example_welcome_title: "Willkommensnachricht",
    color_example_welcome_desc: "Perfekt für Server-MOTDs",
    color_example_warning_title: "Warnung",
    color_example_warning_desc: "Wichtige Regeln hervorheben",
    color_example_rainbow_title: "Regenbogen Text",
    color_example_rainbow_desc: "Farbiger Text für alle Buchstaben",
    color_example_secret_title: "Geheime Nachricht",
    color_example_secret_desc: "Mit Verschleierungseffekt",
    color_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
    color_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
    color_cta_btn_text: "Text Konverter",
    color_cta_btn_all: "Alle Tools ansehen",
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
    toast_welcome_title: "Farbtext-Konverter geladen!",
    toast_welcome_message: "Erstelle jetzt farbige Minecraft-Texte!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_apply_title: "Formatierung angewendet",
    toast_apply_message: "Text wurde erfolgreich formatiert",
    toast_clear_title: "Alles gelöscht",
    toast_clear_message: "Alle Texte wurden gelöscht",
    toast_example_title: "Beispiel eingefügt",
    toast_example_message: "Ein Beispieltext wurde geladen",
    toast_example_loaded: "Beispiel geladen",
    toast_example_loaded_message: "Beispieltext wurde eingefügt",
    toast_error_title: "Fehler",
    toast_error_no_text: "Kein Text zum Kopieren vorhanden",
    toast_copy_title: "Text kopiert",
    toast_copy_formatted: "Formatierter Text wurde kopiert",
    toast_copy_codes: "Farbcodes (&) wurden kopiert",
    toast_copy_minecraft: "Minecraft-Farbcodes (§) wurden kopiert",
    toast_symbol_insert: "Symbol eingefügt",
    toast_symbol_copy: "Symbol kopiert",
    toast_symbol_insert_message: "wurde eingefügt",
    toast_symbol_copy_message: "wurde kopiert",
    symbol_insert_title: "Symbol einfügen",
    symbol_copy_title: "Symbol kopieren",
    toast_error_message: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
    color_motd_title: "MOTD Server Vorschau",
    color_motd_subtitle: "So sieht dein Text in typischen Server-Konfigurationen aus",
    color_motd_center_lines: "Zeilen zentrieren",
    color_motd_live_preview: "Live Server Vorschau",
    color_motd_live_preview_je: "Live Server Vorschau (JE)",
    color_motd_live_preview_be: "Live Server Vorschau (BE)",
    color_motd_live_note: "Minecraft kann die MOTD leicht anders rendern. Bitte auf deinem Server testen.",
    color_motd_vanilla_label: "Für official/vanilla server.properties Datei:",
    color_motd_spigot_label: "Für Spigot server.properties Datei:",
    color_motd_bungee_label: "Für BungeeCord config.yml Datei:",
    color_motd_serverlistplus_label: "Für ServerListPlus serverListPlus.yml Datei:",
    color_motd_bedrock_label: "Für Bedrock server.properties Datei (motd):",
    color_reference_title: "Farbcode Referenz (JE + BE)",
    color_reference_subtitle: "Liste mit Code, Name, HEX und Version aus der Minecraft Farbcode-Tabelle",
    color_reference_code: "Code",
    color_reference_name: "Name",
    color_reference_fg_hex: "FG Hex",
    color_reference_bg_hex: "BG Hex",
    color_reference_ansi: "ANSI",
    color_reference_version: "Version",
    color_reference_note: "Hinweis",
    color_reference_conflict: "Code-Konflikt mit JE-Format",
    motd_copy_btn: "Kopieren",
    color_edition_switch_label: "Edition wählen",
    color_edition_je: "JE",
    color_edition_be: "BE",
    color_badge_je: "JE",
    color_badge_be: "BE",
    color_badge_both: "JE+BE",
    color_conflict_note: "(Java: Formatcode)",
    loader_text1_color: "Farbtext-Konverter wird geladen...",
    loader_text2: "Farbpalette wird geladen...",
    loader_text3: "Symbole werden vorbereitet...",
    loader_text4: "Sound-System wird initialisiert...",
    loader_text5: "Fast fertig..."
};

// DOM Elements (vorhanden + neu)
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// NEUE Elements für Sound & Sprache
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
// Converter Elements
const textInput = document.getElementById('color-text-input');
const preview = document.getElementById('color-preview');
const colorGrid = document.getElementById('color-grid');
const formatGrid = document.getElementById('format-grid');
const symbolsGrid = document.getElementById('symbols-grid');
const applyBtn = document.getElementById('applyFormatting');
const clearBtn = document.getElementById('clearAll');
const insertExampleBtn = document.getElementById('insertExample');
const copyFormattedBtn = document.getElementById('copyFormatted');
const copyCodesBtn = document.getElementById('copyCodes');
const copyMinecraftCodesBtn = document.getElementById('copyMinecraftCodes');
const charCount = document.getElementById('charCount');
const editionButtons = document.querySelectorAll('.edition-switch-btn');
const motdCenterLinesCheckbox = document.getElementById('motdCenterLines');
const motdLivePreviewJe = document.getElementById('motdLivePreviewJe');
const motdLivePreviewBe = document.getElementById('motdLivePreviewBe');
const motdVanilla = document.getElementById('motdVanilla');
const motdSpigot = document.getElementById('motdSpigot');
const motdBungee = document.getElementById('motdBungee');
const motdServerListPlus = document.getElementById('motdServerListPlus');
const motdBedrock = document.getElementById('motdBedrock');
const colorReferenceBody = document.getElementById('colorReferenceBody');



// Minecraft Farbcodes (unverändert)
const minecraftColors = [
    { code: '&0', name: { de: 'Schwarz', en: 'Black' }, hex: '#000000', bgHex: '#000000', class: 'black', edition: 'both' },
    { code: '&1', name: { de: 'Dunkelblau', en: 'Dark Blue' }, hex: '#0000AA', bgHex: '#00002A', class: 'dark-blue', edition: 'both' },
    { code: '&2', name: { de: 'Dunkelgrün', en: 'Dark Green' }, hex: '#00AA00', bgHex: '#002A00', class: 'dark-green', edition: 'both' },
    { code: '&3', name: { de: 'Dunkelaqua', en: 'Dark Aqua' }, hex: '#00AAAA', bgHex: '#002A2A', class: 'dark-aqua', edition: 'both' },
    { code: '&4', name: { de: 'Dunkelrot', en: 'Dark Red' }, hex: '#AA0000', bgHex: '#2A0000', class: 'dark-red', edition: 'both' },
    { code: '&5', name: { de: 'Dunkellila', en: 'Dark Purple' }, hex: '#AA00AA', bgHex: '#2A002A', class: 'dark-purple', edition: 'both' },
    { code: '&6', name: { de: 'Gold', en: 'Gold' }, hex: '#FFAA00', bgHex: '#3F2A00', class: 'gold', edition: 'both' },
    { code: '&7', name: { de: 'Grau', en: 'Gray' }, hex: { je: '#AAAAAA', be: '#C6C6C6' }, bgHex: { je: '#2A2A2A', be: '#313131' }, class: 'gray', edition: 'both' },
    { code: '&8', name: { de: 'Dunkelgrau', en: 'Dark Gray' }, hex: '#555555', bgHex: '#151515', class: 'dark-gray', edition: 'both' },
    { code: '&9', name: { de: 'Blau', en: 'Blue' }, hex: '#5555FF', bgHex: '#15153F', class: 'blue', edition: 'both' },
    { code: '&a', name: { de: 'Grün', en: 'Green' }, hex: '#55FF55', bgHex: '#153F15', class: 'green', edition: 'both' },
    { code: '&b', name: { de: 'Aqua', en: 'Aqua' }, hex: '#55FFFF', bgHex: '#153F3F', class: 'aqua', edition: 'both' },
    { code: '&c', name: { de: 'Rot', en: 'Red' }, hex: '#FF5555', bgHex: '#3F1515', class: 'red', edition: 'both' },
    { code: '&d', name: { de: 'Helllila', en: 'Light Purple' }, hex: '#FF55FF', bgHex: '#3F153F', class: 'light-purple', edition: 'both' },
    { code: '&e', name: { de: 'Gelb', en: 'Yellow' }, hex: '#FFFF55', bgHex: '#3F3F15', class: 'yellow', edition: 'both' },
    { code: '&f', name: { de: 'Weiß', en: 'White' }, hex: '#FFFFFF', bgHex: '#3F3F3F', class: 'white', edition: 'both' },
    { code: '&g', name: { de: 'Minecoin Gold', en: 'Minecoin Gold' }, hex: '#DDD605', bgHex: '#373501', class: 'minecoin-gold', edition: 'be' },
    { code: '&h', name: { de: 'Material Quartz', en: 'Material Quartz' }, hex: '#E3D4D1', bgHex: '#383534', class: 'material-quartz', edition: 'be' },
    { code: '&i', name: { de: 'Material Iron', en: 'Material Iron' }, hex: '#CECACA', bgHex: '#333232', class: 'material-iron', edition: 'be' },
    { code: '&j', name: { de: 'Material Netherite', en: 'Material Netherite' }, hex: '#443A3B', bgHex: '#110E0E', class: 'material-netherite', edition: 'be' },
    { code: '&m', name: { de: 'Material Redstone', en: 'Material Redstone' }, hex: '#971607', bgHex: '#250501', class: 'material-redstone', edition: 'be', conflict: true },
    { code: '&n', name: { de: 'Material Copper', en: 'Material Copper' }, hex: '#B4684D', bgHex: '#2D1A13', class: 'material-copper', edition: 'be', conflict: true },
    { code: '&p', name: { de: 'Material Gold', en: 'Material Gold' }, hex: '#DEB12D', bgHex: '#372C0B', class: 'material-gold', edition: 'be' },
    { code: '&q', name: { de: 'Material Emerald', en: 'Material Emerald' }, hex: '#119F36', bgHex: '#04280D', class: 'material-emerald', edition: 'be' },
    { code: '&s', name: { de: 'Material Diamond', en: 'Material Diamond' }, hex: '#2CBAA8', bgHex: '#0B2E2A', class: 'material-diamond', edition: 'be' },
    { code: '&t', name: { de: 'Material Lapis', en: 'Material Lapis' }, hex: '#21497B', bgHex: '#08121E', class: 'material-lapis', edition: 'be' },
    { code: '&u', name: { de: 'Material Amethyst', en: 'Material Amethyst' }, hex: '#9A5CC6', bgHex: '#261731', class: 'material-amethyst', edition: 'be' },
    { code: '&v', name: { de: 'Material Resin', en: 'Material Resin' }, hex: '#EB7114', bgHex: '#3B1D05', class: 'material-resin', edition: 'be' },
    { code: '&w', name: { de: 'Party Blue', en: 'Party Blue' }, hex: '#8CB3FF', bgHex: '#232D40', class: 'party-blue-color', edition: 'be' }
];

// Minecraft Formatierungen
const minecraftFormats = [
    { code: '&l', name: { de: 'Fett', en: 'Bold' }, icon: 'fas fa-bold', description: { de: 'Macht Text fett', en: 'Makes text bold' } },
    { code: '&m', name: { de: 'Durchgestrichen', en: 'Strikethrough' }, icon: 'fas fa-strikethrough', description: { de: 'Macht Text durchgestrichen', en: 'Makes text strikethrough' } },
    { code: '&n', name: { de: 'Unterstrichen', en: 'Underline' }, icon: 'fas fa-underline', description: { de: 'Unterstreicht Text', en: 'Underlines text' } },
    { code: '&o', name: { de: 'Kursiv', en: 'Italic' }, icon: 'fas fa-italic', description: { de: 'Macht Text kursiv', en: 'Makes text italic' } },
    { code: '&k', name: { de: 'Verschleiert', en: 'Obfuscated' }, icon: 'fas fa-eye-slash', description: { de: 'Verschleiert Text in Minecraft', en: 'Obfuscates text in Minecraft' } },
    { code: '&r', name: { de: 'Zurücksetzen', en: 'Reset' }, icon: 'fas fa-eraser', description: { de: 'Setzt alle Formatierungen zurück', en: 'Resets all formatting' } }
];

// Symbole Daten (unverändert)
const symbolsData = [

    // Emoticons

    { char: '😀', category: 'smileys', name: 'Grinning Face' },
    { char: '😃', category: 'smileys', name: 'Grinning Face with Big Eyes' },
    { char: '😄', category: 'smileys', name: 'Grinning Face with Smiling Eyes' },
    { char: '😁', category: 'smileys', name: 'Beaming Face with Smiling Eyes' },
    { char: '😆', category: 'smileys', name: 'Grinning Squinting Face' },
    { char: '😅', category: 'smileys', name: 'Grinning Face with Sweat' },
    { char: '😂', category: 'smileys', name: 'Face with Tears of Joy' },
    { char: '🤣', category: 'smileys', name: 'Rolling on the Floor Laughing' },
    { char: '☺️', category: 'smileys', name: 'Smiling Face' },
    { char: '😊', category: 'smileys', name: 'Smiling Face with Smiling Eyes' },
    { char: '😇', category: 'smileys', name: 'Smiling Face with Halo' },
    { char: '🙂', category: 'smileys', name: 'Slightly Smiling Face' },
    { char: '🙃', category: 'smileys', name: 'Upside-Down Face' },
    { char: '😉', category: 'smileys', name: 'Winking Face' },
    { char: '😌', category: 'smileys', name: 'Relieved Face' },
    { char: '😍', category: 'smileys', name: 'Smiling Face with Heart-Eyes' },
    { char: '😘', category: 'smileys', name: 'Face Blowing a Kiss' },
    { char: '😗', category: 'smileys', name: 'Kissing Face' },
    { char: '😙', category: 'smileys', name: 'Kissing Face with Smiling Eyes' },
    { char: '😚', category: 'smileys', name: 'Kissing Face with Closed Eyes' },
    { char: '😋', category: 'smileys', name: 'Face Savoring Food' },
    { char: '😜', category: 'smileys', name: 'Winking Face with Tongue' },
    { char: '😝', category: 'smileys', name: 'Squinting Face with Tongue' },
    { char: '😛', category: 'smileys', name: 'Face with Tongue' },
    { char: '🤑', category: 'smileys', name: 'Money-Mouth Face' },
    { char: '🤗', category: 'smileys', name: 'Hugging Face' },
    { char: '🤓', category: 'smileys', name: 'Nerd Face' },
    { char: '😎', category: 'smileys', name: 'Smiling Face with Sunglasses' },
    { char: '🤡', category: 'smileys', name: 'Clown Face' },
    { char: '🤠', category: 'smileys', name: 'Cowboy Hat Face' },
    { char: '😏', category: 'smileys', name: 'Smirking Face' },
    { char: '😒', category: 'smileys', name: 'Unamused Face' },
    { char: '😞', category: 'smileys', name: 'Disappointed Face' },
    { char: '😔', category: 'smileys', name: 'Pensive Face' },
    { char: '😟', category: 'smileys', name: 'Worried Face' },
    { char: '😕', category: 'smileys', name: 'Confused Face' },
    { char: '🙁', category: 'smileys', name: 'Slightly Frowning Face' },
    { char: '☹️', category: 'smileys', name: 'Frowning Face' },
    { char: '😣', category: 'smileys', name: 'Persevering Face' },
    { char: '😖', category: 'smileys', name: 'Confounded Face' },
    { char: '😫', category: 'smileys', name: 'Tired Face' },
    { char: '😩', category: 'smileys', name: 'Weary Face' },
    { char: '😤', category: 'smileys', name: 'Face with Steam From Nose' },
    { char: '😠', category: 'smileys', name: 'Angry Face' },
    { char: '😡', category: 'smileys', name: 'Pouting Face' },
    { char: '😶', category: 'smileys', name: 'Face Without Mouth' },
    { char: '😐', category: 'smileys', name: 'Neutral Face' },
    { char: '😑', category: 'smileys', name: 'Expressionless Face' },
    { char: '😯', category: 'smileys', name: 'Hushed Face' },
    { char: '😦', category: 'smileys', name: 'Frowning Face with Open Mouth' },
    { char: '😧', category: 'smileys', name: 'Anguished Face' },
    { char: '😮', category: 'smileys', name: 'Face with Open Mouth' },
    { char: '😲', category: 'smileys', name: 'Astonished Face' },
    { char: '😵', category: 'smileys', name: 'Dizzy Face' },
    { char: '😳', category: 'smileys', name: 'Flushed Face' },
    { char: '😱', category: 'smileys', name: 'Face Screaming in Fear' },
    { char: '😨', category: 'smileys', name: 'Fearful Face' },
    { char: '😰', category: 'smileys', name: 'Anxious Face with Sweat' },
    { char: '😢', category: 'smileys', name: 'Crying Face' },
    { char: '😥', category: 'smileys', name: 'Sad but Relieved Face' },
    { char: '🤤', category: 'smileys', name: 'Drooling Face' },
    { char: '😭', category: 'smileys', name: 'Loudly Crying Face' },
    { char: '😓', category: 'smileys', name: 'Downcast Face with Sweat' },
    { char: '😪', category: 'smileys', name: 'Sleepy Face' },
    { char: '😴', category: 'smileys', name: 'Sleeping Face' },
    { char: '🙄', category: 'smileys', name: 'Face with Rolling Eyes' },
    { char: '🤔', category: 'smileys', name: 'Thinking Face' },
    { char: '🤥', category: 'smileys', name: 'Lying Face' },
    { char: '😬', category: 'smileys', name: 'Grimacing Face' },
    { char: '🤐', category: 'smileys', name: 'Zipper-Mouth Face' },
    { char: '🤢', category: 'smileys', name: 'Nauseated Face' },
    { char: '🤮', category: 'smileys', name: 'Face Vomiting' },
    { char: '🤧', category: 'smileys', name: 'Sneezing Face' },
    { char: '😷', category: 'smileys', name: 'Face with Medical Mask' },
    { char: '🤒', category: 'smileys', name: 'Face with Thermometer' },
    { char: '🤕', category: 'smileys', name: 'Face with Head-Bandage' },
    { char: '🤨', category: 'smileys', name: 'Face with Raised Eyebrow' },
    { char: '🤩', category: 'smileys', name: 'Star-Struck' },
    { char: '🤯', category: 'smileys', name: 'Exploding Head' },
    { char: '🧐', category: 'smileys', name: 'Face with Monocle' },
    { char: '🤫', category: 'smileys', name: 'Shushing Face' },
    { char: '🤪', category: 'smileys', name: 'Zany Face' },
    { char: '🥺', category: 'smileys', name: 'Pleading Face' },
    { char: '🤭', category: 'smileys', name: 'Face with Hand Over Mouth' },
    { char: '🥱', category: 'smileys', name: 'Yawning Face' },
    { char: '🥳', category: 'smileys', name: 'Partying Face' },
    { char: '🥴', category: 'smileys', name: 'Woozy Face' },
    { char: '🥶', category: 'smileys', name: 'Cold Face' },
    { char: '🥲', category: 'smileys', name: 'Smiling Face with Tear' },
    { char: '🥸', category: 'smileys', name: 'Disguised Face' },
    { char: '🫠', category: 'smileys', name: 'Melting Face' },
    { char: '🫤', category: 'smileys', name: 'Face with Diagonal Mouth' },
    { char: '🫥', category: 'smileys', name: 'Dotted Line Face' },
    { char: '🫢', category: 'smileys', name: 'Face with Open Eyes and Hand Over Mouth' },
    { char: '🫣', category: 'smileys', name: 'Face with Peeking Eye' },
    { char: '🫡', category: 'smileys', name: 'Saluting Face' },
    { char: '🥹', category: 'smileys', name: 'Face Holding Back Tears' },
    { char: '🫩', category: 'smileys', name: 'Face with Bags Under Eyes' },
    { char: '🥵', category: 'smileys', name: 'Hot Face' },
    { char: '😈', category: 'smileys', name: 'Smiling Face with Horns' },
    { char: '👿', category: 'smileys', name: 'Angry Face with Horns' },
    { char: '🤬', category: 'smileys', name: 'Face with Symbols on Mouth' },
    { char: '👹', category: 'smileys', name: 'Ogre' },
    { char: '👺', category: 'smileys', name: 'Goblin' },
    { char: '💩', category: 'smileys', name: 'Pile of Poo' },
    { char: '👻', category: 'smileys', name: 'Ghost' },
    { char: '💀', category: 'smileys', name: 'Skull' },
    { char: '☠️', category: 'smileys', name: 'Skull and Crossbones' },
    { char: '👽', category: 'smileys', name: 'Alien' },
    { char: '👾', category: 'smileys', name: 'Alien Monster' },
    { char: '🤖', category: 'smileys', name: 'Robot' },
    { char: '🎃', category: 'smileys', name: 'Jack-O-Lantern' },
    { char: '😺', category: 'smileys', name: 'Grinning Cat' },
    { char: '😸', category: 'smileys', name: 'Grinning Cat with Smiling Eyes' },
    { char: '😹', category: 'smileys', name: 'Cat with Tears of Joy' },
    { char: '😻', category: 'smileys', name: 'Smiling Cat with Heart-Eyes' },
    { char: '😼', category: 'smileys', name: 'Cat with Wry Smile' },
    { char: '😽', category: 'smileys', name: 'Kissing Cat' },
    { char: '😿', category: 'smileys', name: 'Crying Cat' },
    { char: '😾', category: 'smileys', name: 'Pouting Cat' },
    { char: '🙀', category: 'smileys', name: 'Weary Cat' },

    // People & Body 

    { char: '👶', category: 'people', name: 'Baby' },
    { char: '👦', category: 'people', name: 'Boy' },
    { char: '👧', category: 'people', name: 'Girl' },
    { char: '👨', category: 'people', name: 'Man' },
    { char: '👩', category: 'people', name: 'Woman' },
    { char: '🧒', category: 'people', name: 'Child' },
    { char: '🧑', category: 'people', name: 'Person' },
    { char: '👱‍♀️', category: 'people', name: 'Blond Woman' },
    { char: '👱', category: 'people', name: 'Blond Person' },
    { char: '👴', category: 'people', name: 'Old Man' },
    { char: '👵', category: 'people', name: 'Old Woman' },
    { char: '🧓', category: 'people', name: 'Older Person' },
    { char: '🧔', category: 'people', name: 'Bearded Person' },
    { char: '👨‍🦰', category: 'people', name: 'Man with Red Hair' },
    { char: '🧕', category: 'people', name: 'Woman with Headscarf' },
    { char: '👲', category: 'people', name: 'Man with Skullcap' },
    { char: '👳‍♀️', category: 'people', name: 'Woman Wearing Turban' },
    { char: '👳', category: 'people', name: 'Person Wearing Turban' },
    { char: '👮‍♀️', category: 'people', name: 'Woman Police Officer' },
    { char: '👮', category: 'people', name: 'Police Officer' },
    { char: '🤱', category: 'people', name: 'Breastfeeding' },
    { char: '🧙‍♂️', category: 'people', name: 'Wizard' },
    { char: '🧙‍♀️', category: 'people', name: 'Witch' },
    { char: '🧝‍♂️', category: 'people', name: 'Elf' },
    { char: '🧝‍♀️', category: 'people', name: 'Elf Woman' },
    { char: '👷‍♀️', category: 'people', name: 'Woman Construction Worker' },
    { char: '👷', category: 'people', name: 'Construction Worker' },
    { char: '👱‍♂️', category: 'people', name: 'Blond Man' },

    { char: '💂‍♀️', category: 'people', name: 'Woman Guard' },
    { char: '💂', category: 'people', name: 'Guard' },
    { char: '🕵️‍♀️', category: 'people', name: 'Woman Detective' },
    { char: '🕵️', category: 'people', name: 'Detective' },
    { char: '👩‍⚕️', category: 'people', name: 'Woman Health Worker' },
    { char: '👨‍⚕️', category: 'people', name: 'Man Health Worker' },
    { char: '👩‍🌾', category: 'people', name: 'Woman Farmer' },
    { char: '👨‍🌾', category: 'people', name: 'Man Farmer' },
    { char: '👩‍🍳', category: 'people', name: 'Woman Cook' },
    { char: '👨‍🍳', category: 'people', name: 'Man Cook' },
    { char: '👨‍⚖️', category: 'people', name: 'Judge' },
    { char: '👩‍⚖️', category: 'people', name: 'Woman Judge' },
    { char: '👩‍🎓', category: 'people', name: 'Woman Student' },
    { char: '👨‍🎓', category: 'people', name: 'Man Student' },
    { char: '👩‍🎤', category: 'people', name: 'Woman Singer' },
    { char: '👨‍🎤', category: 'people', name: 'Man Singer' },
    { char: '👩‍🏫', category: 'people', name: 'Woman Teacher' },
    { char: '👨‍🏫', category: 'people', name: 'Man Teacher' },
    { char: '👩‍🏭', category: 'people', name: 'Woman Factory Worker' },
    { char: '👨‍🏭', category: 'people', name: 'Man Factory Worker' },
    { char: '👩‍💻', category: 'people', name: 'Woman Technologist' },
    { char: '👨‍💻', category: 'people', name: 'Man Technologist' },
    { char: '👩‍💼', category: 'people', name: 'Woman Office Worker' },
    { char: '👨‍💼', category: 'people', name: 'Man Office Worker' },
    { char: '👩‍🔧', category: 'people', name: 'Woman Mechanic' },
    { char: '👨‍🔧', category: 'people', name: 'Man Mechanic' },
    { char: '👩‍🔬', category: 'people', name: 'Woman Scientist' },
    { char: '👨‍🔬', category: 'people', name: 'Man Scientist' },
    { char: '🧖‍♂️', category: 'people', name: 'Man in Steamy Room' },
    { char: '🧖‍♀️', category: 'people', name: 'Woman in Steamy Room' },
    { char: '👩‍🎨', category: 'people', name: 'Woman Artist' },
    { char: '👨‍🎨', category: 'people', name: 'Man Artist' },
    { char: '👩‍🚒', category: 'people', name: 'Woman Firefighter' },
    { char: '👨‍🚒', category: 'people', name: 'Man Firefighter' },
    { char: '👩‍✈️', category: 'people', name: 'Woman Pilot' },
    { char: '👨‍✈️', category: 'people', name: 'Man Pilot' },
    { char: '👩‍🚀', category: 'people', name: 'Woman Astronaut' },
    { char: '👨‍🚀', category: 'people', name: 'Man Astronaut' },
    { char: '🧟', category: 'people', name: 'Zombie' },
    { char: '🧛', category: 'people', name: 'Vampire' },
    { char: '🧛‍♀️', category: 'people', name: 'Woman Vampire' },
    { char: '🧚', category: 'people', name: 'Fairy' },
    { char: '🧚‍♀️', category: 'people', name: 'Fairy 2' },
    { char: '🧚‍♂️', category: 'people', name: 'Man Fairy' },
    { char: '🧜‍♂️', category: 'people', name: 'Merman' },
    { char: '🧜‍♀️', category: 'people', name: 'Mermaid' },
    { char: '👩‍', category: 'people', name: 'Woman' },
    { char: '👨', category: 'people', name: 'Man' },
    { char: '🤶', category: 'people', name: 'Mrs. Claus' },
    { char: '🎅', category: 'people', name: 'Santa Claus' },
    { char: '👸', category: 'people', name: 'Princess' },
    { char: '🤴', category: 'people', name: 'Prince' },
    { char: '👰', category: 'people', name: 'Bride' },
    { char: '🤵', category: 'people', name: 'Tuxedo Person' },
    { char: '👼', category: 'people', name: 'Baby Angel' },
    { char: '🤰', category: 'people', name: 'Pregnant Woman' },
    { char: '🧘', category: 'people', name: 'Lotus Position' },
    { char: '🧘‍♂️', category: 'people', name: 'Man in Lotus Position' },
    { char: '🙇‍♀️', category: 'people', name: 'Woman Bowing' },
    { char: '🙇‍♂️', category: 'people', name: 'Man Bowing' },
    { char: '🙇', category: 'people', name: 'Bowing Person' },
    { char: '💁', category: 'people', name: 'Woman Tipping Hand' },
    { char: '💁‍♂️', category: 'people', name: 'Man Tipping Hand' },
    { char: '🙅', category: 'people', name: 'Woman Gesturing NO' },
    { char: '🙅‍♂️', category: 'people', name: 'Man Gesturing NO' },
    { char: '🙆', category: 'people', name: 'Woman Gesturing OK' },
    { char: '🙆‍♂️', category: 'people', name: 'Man Gesturing OK' },
    { char: '🙋', category: 'people', name: 'Woman Raising Hand' },
    { char: '🙋‍♂️', category: 'people', name: 'Man Raising Hand' },
    { char: '🤦‍♀️', category: 'people', name: 'Woman Facepalming' },
    { char: '🤦‍♂️', category: 'people', name: 'Man Facepalming' },
    { char: '🤷‍♀️', category: 'people', name: 'Woman Shrugging' },
    { char: '🤷‍♂️', category: 'people', name: 'Man Shrugging' },
    { char: '🙎', category: 'people', name: 'Woman Pouting' },
    { char: '🙎‍♂️', category: 'people', name: 'Man Pouting' },
    { char: '🙍', category: 'people', name: 'Woman Frowning' },
    { char: '🙍‍♂️', category: 'people', name: 'Man Frowning' },
    { char: '💇‍♀️', category: 'people', name: 'Woman Getting Haircut 1' },
    { char: '💇', category: 'people', name: 'Woman Getting Haircut' },
    { char: '🙍‍♀️', category: 'people', name: 'Woman Frowning 2' },
    { char: '🙎‍♀️', category: 'people', name: 'Woman Pouting 2' },
    { char: '🙅‍♀️', category: 'people', name: 'Woman Gesturing No 2' },
    { char: '🙆‍♀️', category: 'people', name: 'Woman Gesturing OK 2' },
    { char: '💁‍♀️', category: 'people', name: 'Woman Tipping Hand 2' },
    { char: '🙋‍♀️', category: 'people', name: 'Woman Raising Hand 2' },
    { char: '🤦', category: 'people', name: 'Face Palm' },
    { char: '🤷', category: 'people', name: 'Shrug' },
    { char: '💆‍♀️', category: 'people', name: 'Woman Getting Massage' },
    { char: '💇‍♂️', category: 'people', name: 'Man Getting Haircut' },
    { char: '💆', category: 'people', name: 'Woman Getting Massage' },
    { char: '💆‍♂️', category: 'people', name: 'Man Getting Massage' },
    { char: '🕴', category: 'people', name: 'Person in Suit Levitating' },
    { char: '💃', category: 'people', name: 'Woman Dancing' },
    { char: '🕺', category: 'people', name: 'Man Dancing' },
    { char: '👯', category: 'people', name: 'Women with Bunny Ears' },
    { char: '👯‍♂️', category: 'people', name: 'Men with Bunny Ears' },
    { char: '🚶‍♀️', category: 'people', name: 'Woman Walking' },
    { char: '🚶', category: 'people', name: 'Walking Person' },
    { char: '🏃‍♀️', category: 'people', name: 'Woman Running' },
    { char: '🏃', category: 'people', name: 'Running Person' },
    { char: '👫', category: 'people', name: 'Man and Woman Holding Hands' },
    { char: '👭', category: 'people', name: 'Two Women Holding Hands' },
    { char: '👬', category: 'people', name: 'Two Men Holding Hands' },
    { char: '🧞‍♂️', category: 'people', name: 'Genie' },
    { char: '🧞‍♀️', category: 'people', name: 'Genie Woman' },
    { char: '🧟‍♂️', category: 'people', name: 'Zombie' },
    { char: '🧟‍♀️', category: 'people', name: 'Zombie Woman' },
    { char: '👤', category: 'people', name: 'Silhouette' },
    { char: '👥', category: 'people', name: 'Two Silhouettes' },
    { char: '🗣️', category: 'people', name: 'Speaking Head' },
    { char: '👣', category: 'people', name: 'Footprints' },
    { char: '💑', category: 'people', name: 'Couple with Heart' },
    { char: '👩‍❤️‍👩', category: 'people', name: 'Women with Heart' },
    { char: '👨‍❤️‍👨', category: 'people', name: 'Men with Heart' },
    { char: '💏', category: 'people', name: 'Kiss' },
    { char: '👩‍❤️‍💋‍👩', category: 'people', name: 'Women Kissing' },
    { char: '👨‍❤️‍💋‍👨', category: 'people', name: 'Men Kissing' },
    { char: '👪', category: 'people', name: 'Family' },
    { char: '👨‍👩‍👧', category: 'people', name: 'Family: Man, Woman, Girl' },
    { char: '👨‍👩‍👧‍👦', category: 'people', name: 'Family: Man, Woman, Girl, Boy' },
    { char: '👨‍👩‍👦‍👦', category: 'people', name: 'Family: Man, Woman, Boy, Boy' },
    { char: '👨‍👩‍👧‍👧', category: 'people', name: 'Family: Man, Woman, Girl, Girl' },
    { char: '👩‍👩‍👦', category: 'people', name: 'Family: Woman, Woman, Boy' },
    { char: '👩‍👩‍👧', category: 'people', name: 'Family: Woman, Woman, Girl' },
    { char: '👩‍👩‍👧‍👦', category: 'people', name: 'Family: Woman, Woman, Girl, Boy' },
    { char: '👩‍👩‍👦‍👦', category: 'people', name: 'Family: Woman, Woman, Boy, Boy' },
    { char: '👩‍👩‍👧‍👧', category: 'people', name: 'Family: Woman, Woman, Girl, Girl' },
    { char: '👨‍👨‍👦', category: 'people', name: 'Family: Man, Man, Boy' },
    { char: '👨‍👨‍👧', category: 'people', name: 'Family: Man, Man, Girl' },
    { char: '👨‍👨‍👧‍👦', category: 'people', name: 'Family: Man, Man, Girl, Boy' },
    { char: '👨‍👨‍👦‍👦', category: 'people', name: 'Family: Man, Man, Boy, Boy' },
    { char: '👨‍👨‍👧‍👧', category: 'people', name: 'Family: Man, Man, Girl, Girl' },
    { char: '👩‍👦', category: 'people', name: 'Family: Woman, Boy' },
    { char: '👩‍👧', category: 'people', name: 'Family: Woman, Girl' },
    { char: '👩‍👧‍👦', category: 'people', name: 'Family: Woman, Girl, Boy' },
    { char: '👩‍👦‍👦', category: 'people', name: 'Family: Woman, Boy, Boy' },
    { char: '👩‍👧‍👧', category: 'people', name: 'Family: Woman, Girl, Girl' },
    { char: '👨‍👦', category: 'people', name: 'Family: Man, Boy' },
    { char: '👨‍👧', category: 'people', name: 'Family: Man, Girl' },
    { char: '👨‍👧‍👦', category: 'people', name: 'Family: Man, Girl, Boy' },
    { char: '👨‍👦‍👦', category: 'people', name: 'Family: Man, Boy, Boy' },
    { char: '👨‍👧‍👧', category: 'people', name: 'Family: Man, Girl, Girl' },

    { char: '💪', category: 'people', name: 'Flexed Biceps' },
    { char: '👈', category: 'people', name: 'Backhand Index Pointing Left' },
    { char: '👉', category: 'people', name: 'Backhand Index Pointing Right' },
    { char: '☝️', category: 'people', name: 'Index Pointing Up' },
    { char: '👆', category: 'people', name: 'Backhand Index Pointing Up' },
    { char: '🖕', category: 'people', name: 'Middle Finger' },
    { char: '👇', category: 'people', name: 'Backhand Index Pointing Down' },
    { char: '✌️', category: 'people', name: 'Victory Hand' },
    { char: '🤞', category: 'people', name: 'Crossed Fingers' },
    { char: '🖖', category: 'people', name: 'Vulcan Salute' },
    { char: '🤘', category: 'people', name: 'Sign of the Horns' },
    { char: '🤙', category: 'people', name: 'Call Me Hand' },
    { char: '🖐️', category: 'people', name: 'Hand with Fingers Splayed' },
    { char: '✋', category: 'people', name: 'Raised Hand' },
    { char: '👌', category: 'people', name: 'OK Hand' },
    { char: '👍', category: 'people', name: 'Thumbs Up' },
    { char: '👎', category: 'people', name: 'Thumbs Down' },
    { char: '✊', category: 'people', name: 'Raised Fist' },
    { char: '👊', category: 'people', name: 'Oncoming Fist' },
    { char: '🤛', category: 'people', name: 'Left-Facing Fist' },
    { char: '🤜', category: 'people', name: 'Right-Facing Fist' },
    { char: '🤚', category: 'people', name: 'Raised Back of Hand' },
    { char: '👋', category: 'people', name: 'Waving Hand' },
    { char: '🤟', category: 'people', name: 'Love-You Gesture' },
    { char: '✍️', category: 'people', name: 'Writing Hand' },
    { char: '👏', category: 'people', name: 'Clapping Hands' },
    { char: '👐', category: 'people', name: 'Open Hands' },
    { char: '🙌', category: 'people', name: 'Raising Hands' },
    { char: '🤲', category: 'people', name: 'Palms Up Together' },
    { char: '💅', category: 'people', name: 'Nail Polish' },
    { char: '🙏', category: 'people', name: 'Folded Hands' },
    { char: '🤝', category: 'people', name: 'Handshake' },
    { char: '👂', category: 'people', name: 'Ear' },
    { char: '👃', category: 'people', name: 'Nose' },
    { char: '👀', category: 'people', name: 'Eyes' },
    { char: '👁️', category: 'people', name: 'Eye' },
    { char: '🧠', category: 'people', name: 'Brain' },
    { char: '👅', category: 'people', name: 'Tongue' },
    { char: '👄', category: 'people', name: 'Mouth' },


    // Animals & Nature (Tiere, Pflanzen & Natur)

    { char: '🐶', category: 'animals', name: 'Dog Face' },
    { char: '🐱', category: 'animals', name: 'Cat Face' },
    { char: '🐭', category: 'animals', name: 'Mouse Face' },
    { char: '🐹', category: 'animals', name: 'Hamster' },
    { char: '🐰', category: 'animals', name: 'Rabbit Face' },
    { char: '🦊', category: 'animals', name: 'Fox' },
    { char: '🐻', category: 'animals', name: 'Bear' },
    { char: '🐼', category: 'animals', name: 'Panda' },
    { char: '🐨', category: 'animals', name: 'Koala' },
    { char: '🐯', category: 'animals', name: 'Tiger Face' },
    { char: '🦁', category: 'animals', name: 'Lion' },
    { char: '🐮', category: 'animals', name: 'Cow Face' },
    { char: '🐷', category: 'animals', name: 'Pig Face' },
    { char: '🐽', category: 'animals', name: 'Pig Nose' },
    { char: '🐸', category: 'animals', name: 'Frog' },
    { char: '🐵', category: 'animals', name: 'Monkey Face' },
    { char: '🙈', category: 'animals', name: 'See-No-Evil Monkey' },
    { char: '🙉', category: 'animals', name: 'Hear-No-Evil Monkey' },
    { char: '🙊', category: 'animals', name: 'Speak-No-Evil Monkey' },
    { char: '🐒', category: 'animals', name: 'Monkey' },
    { char: '🐔', category: 'animals', name: 'Chicken' },
    { char: '🦜', category: 'animals', name: 'Parrot' },
    { char: '🐧', category: 'animals', name: 'Penguin' },
    { char: '🐦', category: 'animals', name: 'Bird' },
    { char: '🐤', category: 'animals', name: 'Baby Chick' },
    { char: '🐣', category: 'animals', name: 'Hatching Chick' },
    { char: '🐥', category: 'animals', name: 'Front-Facing Baby Chick' },
    { char: '🦆', category: 'animals', name: 'Duck' },
    { char: '🦢', category: 'animals', name: 'Swan' },
    { char: '🦅', category: 'animals', name: 'Eagle' },
    { char: '🦚', category: 'animals', name: 'Peacock' },
    { char: '🦉', category: 'animals', name: 'Owl' },
    { char: '🦇', category: 'animals', name: 'Bat' },
    { char: '🐺', category: 'animals', name: 'Wolf' },
    { char: '🐗', category: 'animals', name: 'Boar' },
    { char: '🐴', category: 'animals', name: 'Horse Face' },
    { char: '🦄', category: 'animals', name: 'Unicorn' },
    { char: '🐝', category: 'animals', name: 'Honeybee' },
    { char: '🐛', category: 'animals', name: 'Bug' },
    { char: '🦋', category: 'animals', name: 'Butterfly' },
    { char: '🐌', category: 'animals', name: 'Snail' },
    { char: '🐚', category: 'animals', name: 'Spiral Shell' },
    { char: '🐞', category: 'animals', name: 'Lady Beetle' },
    { char: '🐜', category: 'animals', name: 'Ant' },
    { char: '🦟', category: 'animals', name: 'Mosquito' },
    { char: '🕷️', category: 'animals', name: 'Spider' },
    { char: '🕸️', category: 'animals', name: 'Spider Web' },
    { char: '🐢', category: 'animals', name: 'Turtle' },
    { char: '🐍', category: 'animals', name: 'Snake' },
    { char: '🪱', category: 'animals', name: 'Worm' },
    { char: '🦎', category: 'animals', name: 'Lizard' },
    { char: '🦂', category: 'animals', name: 'Scorpion' },
    { char: '🦀', category: 'animals', name: 'Crab' },
    { char: '🦑', category: 'animals', name: 'Squid' },
    { char: '🐙', category: 'animals', name: 'Octopus' },
    { char: '🦐', category: 'animals', name: 'Shrimp' },
    { char: '🦞', category: 'animals', name: 'Lobster' },
    { char: '🐠', category: 'animals', name: 'Tropical Fish' },
    { char: '🐟', category: 'animals', name: 'Fish' },
    { char: '🐡', category: 'animals', name: 'Blowfish' },
    { char: '🐬', category: 'animals', name: 'Dolphin' },
    { char: '🦈', category: 'animals', name: 'Shark' },
    { char: '🐳', category: 'animals', name: 'Spouting Whale' },
    { char: '🐋', category: 'animals', name: 'Whale' },
    { char: '🐊', category: 'animals', name: 'Crocodile' },
    { char: '🐆', category: 'animals', name: 'Leopard' },
    { char: '🐅', category: 'animals', name: 'Tiger' },
    { char: '🦛', category: 'animals', name: 'Hippopotamus' },
    { char: '🐃', category: 'animals', name: 'Water Buffalo' },
    { char: '🐂', category: 'animals', name: 'Ox' },
    { char: '🐄', category: 'animals', name: 'Cow' },
    { char: '🦌', category: 'animals', name: 'Deer' },
    { char: '🐪', category: 'animals', name: 'Camel' },
    { char: '🐫', category: 'animals', name: 'Two-Hump Camel' },
    { char: '🦘', category: 'animals', name: 'Kangaroo' },
    { char: '🐘', category: 'animals', name: 'Elephant' },
    { char: '🦏', category: 'animals', name: 'Rhinoceros' },
    { char: '🦍', category: 'animals', name: 'Gorilla' },
    { char: '🐎', category: 'animals', name: 'Horse' },
    { char: '🦙', category: 'animals', name: 'Llama' },
    { char: '🐖', category: 'animals', name: 'Pig' },
    { char: '🐐', category: 'animals', name: 'Goat' },
    { char: '🐏', category: 'animals', name: 'Ram' },
    { char: '🐑', category: 'animals', name: 'Ewe' },
    { char: '🐕', category: 'animals', name: 'Dog' },
    { char: '🐩', category: 'animals', name: 'Poodle' },
    { char: '🐈', category: 'animals', name: 'Cat' },
    { char: '🐓', category: 'animals', name: 'Rooster' },
    { char: '🦃', category: 'animals', name: 'Turkey' },
    { char: '🕊️', category: 'animals', name: 'Dove' },
    { char: '🪶', category: 'animals', name: 'Feather' },
    { char: '🐇', category: 'animals', name: 'Rabbit' },
    { char: '🐁', category: 'animals', name: 'Mouse' },
    { char: '🐀', category: 'animals', name: 'Rat' },
    { char: '🐿️', category: 'animals', name: 'Chipmunk' },
    { char: '🐾', category: 'animals', name: 'Paw Prints' },
    { char: '🐉', category: 'animals', name: 'Dragon' },
    { char: '🐲', category: 'animals', name: 'Dragon Face' },
    { char: '🦖', category: 'animals', name: 'T-Rex' },
    { char: '🦕', category: 'animals', name: 'Sauropod' },
    { char: '🦒', category: 'animals', name: 'Giraffe' },
    { char: '🦔', category: 'animals', name: 'Hedgehog' },
    { char: '🦓', category: 'animals', name: 'Zebra' },
    { char: '🦗', category: 'animals', name: 'Cricket' },
    { char: '🦧', category: 'animals', name: 'Orangutan' },
    { char: '🦮', category: 'animals', name: 'Guide Dog' },
    { char: '🦥', category: 'animals', name: 'Sloth' },
    { char: '🦦', category: 'animals', name: 'Otter' },
    { char: '🦡', category: 'animals', name: 'Badger' },
    { char: '🦨', category: 'animals', name: 'Skunk' },
    { char: '🦩', category: 'animals', name: 'Flamingo' },
    { char: '🌵', category: 'animals', name: 'Cactus' },
    { char: '🎄', category: 'animals', name: 'Christmas Tree' },
    { char: '🌲', category: 'animals', name: 'Evergreen Tree' },
    { char: '🌳', category: 'animals', name: 'Deciduous Tree' },
    { char: '🌴', category: 'animals', name: 'Palm Tree' },
    { char: '🌱', category: 'animals', name: 'Seedling' },
    { char: '🌿', category: 'animals', name: 'Herb' },
    { char: '☘️', category: 'animals', name: 'Shamrock' },
    { char: '🍀', category: 'animals', name: 'Four Leaf Clover' },
    { char: '🎍', category: 'animals', name: 'Pine Decoration' },
    { char: '🎋', category: 'animals', name: 'Tanabata Tree' },
    { char: '🍃', category: 'animals', name: 'Leaf Fluttering in Wind' },
    { char: '🍂', category: 'animals', name: 'Fallen Leaf' },
    { char: '🍁', category: 'animals', name: 'Maple Leaf' },
    { char: '🍄', category: 'animals', name: 'Mushroom' },
    { char: '🌾', category: 'animals', name: 'Sheaf of Rice' },
    { char: '💐', category: 'animals', name: 'Bouquet' },
    { char: '🌷', category: 'animals', name: 'Tulip' },
    { char: '🌹', category: 'animals', name: 'Rose' },
    { char: '🥀', category: 'animals', name: 'Wilted Flower' },
    { char: '🌻', category: 'animals', name: 'Sunflower' },
    { char: '🌼', category: 'animals', name: 'Blossom' },
    { char: '🏵️', category: 'animals', name: 'Rosette' },
    { char: '🌸', category: 'animals', name: 'Cherry Blossom' },
    { char: '🌺', category: 'animals', name: 'Hibiscus' },
    { char: '🪾', category: 'animals', name: 'Empty Nest' },
    { char: '🌎', category: 'animals', name: 'Earth Americas' },
    { char: '🌍', category: 'animals', name: 'Earth Europe-Africa' },
    { char: '🌏', category: 'animals', name: 'Earth Asia-Australia' },
    { char: '🌕', category: 'animals', name: 'Full Moon' },
    { char: '🌖', category: 'animals', name: 'Waning Gibbous Moon' },
    { char: '🌗', category: 'animals', name: 'Last Quarter Moon' },
    { char: '🌘', category: 'animals', name: 'Waning Crescent Moon' },
    { char: '🌑', category: 'animals', name: 'New Moon' },
    { char: '🌒', category: 'animals', name: 'Waxing Crescent Moon' },
    { char: '🌓', category: 'animals', name: 'First Quarter Moon' },
    { char: '🌔', category: 'animals', name: 'Waxing Gibbous Moon' },
    { char: '🌚', category: 'animals', name: 'New Moon Face' },
    { char: '🌝', category: 'animals', name: 'Full Moon Face' },
    { char: '🌞', category: 'animals', name: 'Sun with Face' },
    { char: '🌛', category: 'animals', name: 'First Quarter Moon Face' },
    { char: '🌜', category: 'animals', name: 'Last Quarter Moon Face' },
    { char: '🌙', category: 'animals', name: 'Crescent Moon' },
    { char: '💫', category: 'animals', name: 'Dizzy' },
    { char: '⭐️', category: 'animals', name: 'Star' },
    { char: '🌟', category: 'animals', name: 'Glowing Star' },
    { char: '✨', category: 'animals', name: 'Sparkles' },
    { char: '⚡️', category: 'animals', name: 'High Voltage' },
    { char: '🔥', category: 'animals', name: 'Fire' },
    { char: '💥', category: 'animals', name: 'Collision' },
    { char: '☄️', category: 'animals', name: 'Comet' },
    { char: '🛸', category: 'animals', name: 'Flying Saucer' },
    { char: '☀️', category: 'animals', name: 'Sun' },
    { char: '🌤️', category: 'animals', name: 'Sun Behind Small Cloud' },
    { char: '⛅️', category: 'animals', name: 'Sun Behind Cloud' },
    { char: '🌥️', category: 'animals', name: 'Sun Behind Large Cloud' },
    { char: '🌦️', category: 'animals', name: 'Sun Behind Rain Cloud' },
    { char: '🌈', category: 'animals', name: 'Rainbow' },
    { char: '☁️', category: 'animals', name: 'Cloud' },
    { char: '🌧️', category: 'animals', name: 'Cloud with Rain' },
    { char: '⛈️', category: 'animals', name: 'Cloud with Lightning and Rain' },
    { char: '🌩️', category: 'animals', name: 'Cloud with Lightning' },
    { char: '🌨️', category: 'animals', name: 'Cloud with Snow' },
    { char: '☃️', category: 'animals', name: 'Snowman' },
    { char: '⛄️', category: 'animals', name: 'Snowman Without Snow' },
    { char: '❄️', category: 'animals', name: 'Snowflake' },
    { char: '🌬️', category: 'animals', name: 'Wind Face' },
    { char: '💨', category: 'animals', name: 'Dashing Away' },
    { char: '🌪️', category: 'animals', name: 'Tornado' },
    { char: '🌫️', category: 'animals', name: 'Fog' },
    { char: '🌊', category: 'animals', name: 'Water Wave' },
    { char: '💧', category: 'animals', name: 'Droplet' },
    { char: '💦', category: 'animals', name: 'Sweat Droplets' },
    { char: '☔️', category: 'animals', name: 'Umbrella with Rain Drops' },
    { char: '☔', category: 'animals', name: 'Umbrella with Rain Drops' },

    // Food & Drink

    { char: '🍏', category: 'food', name: 'Green Apple' },
    { char: '🍎', category: 'food', name: 'Red Apple' },
    { char: '🍐', category: 'food', name: 'Pear' },
    { char: '🍊', category: 'food', name: 'Tangerine' },
    { char: '🍋', category: 'food', name: 'Lemon' },
    { char: '🍌', category: 'food', name: 'Banana' },
    { char: '🍉', category: 'food', name: 'Watermelon' },
    { char: '🍇', category: 'food', name: 'Grapes' },
    { char: '🍓', category: 'food', name: 'Strawberry' },
    { char: '🍈', category: 'food', name: 'Melon' },
    { char: '🍒', category: 'food', name: 'Cherries' },
    { char: '🍑', category: 'food', name: 'Peach' },
    { char: '🍍', category: 'food', name: 'Pineapple' },
    { char: '🥝', category: 'food', name: 'Kiwi Fruit' },
    { char: '🥭', category: 'food', name: 'Mango' },
    { char: '🥑', category: 'food', name: 'Avocado' },
    { char: '🍅', category: 'food', name: 'Tomato' },
    { char: '🍆', category: 'food', name: 'Eggplant' },
    { char: '🥒', category: 'food', name: 'Cucumber' },
    { char: '🥕', category: 'food', name: 'Carrot' },
    { char: '🥥', category: 'food', name: 'Coconut' },
    { char: '🥦', category: 'food', name: 'Broccoli' },
    { char: '🥬', category: 'food', name: 'Leafy Green' },
    { char: '🌽', category: 'food', name: 'Corn' },
    { char: '🌶️', category: 'food', name: 'Hot Pepper' },
    { char: '🥔', category: 'food', name: 'Potato' },
    { char: '🍠', category: 'food', name: 'Roasted Sweet Potato' },
    { char: '🌰', category: 'food', name: 'Chestnut' },
    { char: '🫜', category: 'food', name: 'Flatbread' },
    { char: '🥜', category: 'food', name: 'Peanuts' },
    { char: '🍯', category: 'food', name: 'Honey Pot' },
    { char: '🥐', category: 'food', name: 'Croissant' },
    { char: '🍞', category: 'food', name: 'Bread' },
    { char: '🥖', category: 'food', name: 'Baguette Bread' },
    { char: '🥨', category: 'food', name: 'Pretzel' },
    { char: '🥯', category: 'food', name: 'Bagel' },
    { char: '🧀', category: 'food', name: 'Cheese Wedge' },
    { char: '🥚', category: 'food', name: 'Egg' },
    { char: '🍳', category: 'food', name: 'Cooking' },
    { char: '🥓', category: 'food', name: 'Bacon' },
    { char: '🧄', category: 'food', name: 'Garlic' },
    { char: '🧅', category: 'food', name: 'Onion' },
    { char: '🥞', category: 'food', name: 'Pancakes' },
    { char: '🧇', category: 'food', name: 'Waffle' },
    { char: '🍤', category: 'food', name: 'Fried Shrimp' },
    { char: '🍗', category: 'food', name: 'Poultry Leg' },
    { char: '🍖', category: 'food', name: 'Meat on Bone' },
    { char: '🥩', category: 'food', name: 'Cut of Meat' },
    { char: '🥪', category: 'food', name: 'Sandwich' },
    { char: '🥣', category: 'food', name: 'Bowl with Spoon' },
    { char: '🍕', category: 'food', name: 'Pizza' },
    { char: '🌭', category: 'food', name: 'Hot Dog' },
    { char: '🍔', category: 'food', name: 'Hamburger' },
    { char: '🍟', category: 'food', name: 'French Fries' },
    { char: '🥙', category: 'food', name: 'Stuffed Flatbread' },
    { char: '🌮', category: 'food', name: 'Taco' },
    { char: '🌯', category: 'food', name: 'Burrito' },
    { char: '🥗', category: 'food', name: 'Green Salad' },
    { char: '🥘', category: 'food', name: 'Shallow Pan of Food' },
    { char: '🍝', category: 'food', name: 'Spaghetti' },
    { char: '🍜', category: 'food', name: 'Steaming Bowl' },
    { char: '🥫', category: 'food', name: 'Canned Food' },
    { char: '🥟', category: 'food', name: 'Dumpling' },
    { char: '🥠', category: 'food', name: 'Fortune Cookie' },
    { char: '🥡', category: 'food', name: 'Takeout Box' },
    { char: '🥧', category: 'food', name: 'Pie' },
    { char: '🥢', category: 'food', name: 'Chopsticks' },
    { char: '🦪', category: 'food', name: 'Oyster' },
    { char: '🍲', category: 'food', name: 'Pot of Food' },
    { char: '🍥', category: 'food', name: 'Fish Cake with Swirl' },
    { char: '🍣', category: 'food', name: 'Sushi' },
    { char: '🍱', category: 'food', name: 'Bento Box' },
    { char: '🍛', category: 'food', name: 'Curry Rice' },
    { char: '🍚', category: 'food', name: 'Cooked Rice' },
    { char: '🧆', category: 'food', name: 'Falafel' },
    { char: '🍙', category: 'food', name: 'Rice Ball' },
    { char: '🍘', category: 'food', name: 'Rice Cracker' },
    { char: '🍢', category: 'food', name: 'Oden' },
    { char: '🍡', category: 'food', name: 'Dango' },
    { char: '🍧', category: 'food', name: 'Shaved Ice' },
    { char: '🍨', category: 'food', name: 'Ice Cream' },
    { char: '🍦', category: 'food', name: 'Soft Ice Cream' },
    { char: '🍰', category: 'food', name: 'Shortcake' },
    { char: '🎂', category: 'food', name: 'Birthday Cake' },
    { char: '🍮', category: 'food', name: 'Custard' },
    { char: '🍭', category: 'food', name: 'Lollipop' },
    { char: '🍬', category: 'food', name: 'Candy' },
    { char: '🍫', category: 'food', name: 'Chocolate Bar' },
    { char: '🍿', category: 'food', name: 'Popcorn' },
    { char: '🍩', category: 'food', name: 'Doughnut' },
    { char: '🍪', category: 'food', name: 'Cookie' },
    { char: '🥮', category: 'food', name: 'Moon Cake' },
    { char: '🧁', category: 'food', name: 'Cupcake' },
    { char: '🥛', category: 'food', name: 'Glass of Milk' },
    { char: '🥤', category: 'food', name: 'Cup with Straw' },
    { char: '🧈', category: 'food', name: 'Butter' },
    { char: '🍼', category: 'food', name: 'Baby Bottle' },
    { char: '☕️', category: 'food', name: 'Hot Beverage' },
    { char: '🍵', category: 'food', name: 'Teacup Without Handle' },
    { char: '🍶', category: 'food', name: 'Sake' },
    { char: '🍺', category: 'food', name: 'Beer Mug' },
    { char: '🍻', category: 'food', name: 'Clinking Beer Mugs' },
    { char: '🥂', category: 'food', name: 'Clinking Glasses' },
    { char: '🍷', category: 'food', name: 'Wine Glass' },
    { char: '🥃', category: 'food', name: 'Tumbler Glass' },
    { char: '🍸', category: 'food', name: 'Cocktail Glass' },
    { char: '🍹', category: 'food', name: 'Tropical Drink' },
    { char: '🍾', category: 'food', name: 'Bottle with Popping Cork' },
    { char: '🧉', category: 'food', name: 'Mate' },
    { char: '🧃', category: 'food', name: 'Beverage Box' },
    { char: '🧊', category: 'food', name: 'Ice Cube' },
    { char: '🧂', category: 'food', name: 'Salt' },
    { char: '🥄', category: 'food', name: 'Spoon' },
    { char: '🍴', category: 'food', name: 'Fork and Knife' },
    { char: '🍽️', category: 'food', name: 'Fork and Knife with Plate' },

    // Activities & Sports

    { char: '⚽️', category: 'activity', name: 'Soccer Ball' },
    { char: '🏀', category: 'activity', name: 'Basketball' },
    { char: '🏈', category: 'activity', name: 'American Football' },
    { char: '⚾️', category: 'activity', name: 'Baseball' },
    { char: '🎾', category: 'activity', name: 'Tennis' },
    { char: '🏐', category: 'activity', name: 'Volleyball' },
    { char: '🏉', category: 'activity', name: 'Rugby Football' },
    { char: '🎱', category: 'activity', name: 'Pool 8 Ball' },
    { char: '🏓', category: 'activity', name: 'Ping Pong' },
    { char: '🏸', category: 'activity', name: 'Badminton' },
    { char: '🥏', category: 'activity', name: 'Flying Disc' },
    { char: '🥅', category: 'activity', name: 'Goal Net' },
    { char: '🏒', category: 'activity', name: 'Ice Hockey' },
    { char: '🏑', category: 'activity', name: 'Field Hockey' },
    { char: '🏏', category: 'activity', name: 'Cricket' },
    { char: '⛳️', category: 'activity', name: 'Flag in Hole' },
    { char: '🏹', category: 'activity', name: 'Bow and Arrow' },
    { char: '🎣', category: 'activity', name: 'Fishing Pole' },
    { char: '🥊', category: 'activity', name: 'Boxing Glove' },
    { char: '🥋', category: 'activity', name: 'Martial Arts Uniform' },
    { char: '🛹', category: 'activity', name: 'Skateboard' },
    { char: '⛸️', category: 'activity', name: 'Ice Skate' },
    { char: '🎿', category: 'activity', name: 'Skis' },
    { char: '⛷️', category: 'activity', name: 'Skier' },
    { char: '🏂', category: 'activity', name: 'Snowboarder' },
    { char: '🤳', category: 'activity', name: 'Selfie' },
    { char: '🏋️‍♀️', category: 'activity', name: 'Woman Lifting Weights' },
    { char: '🏋️', category: 'activity', name: 'Person Lifting Weights' },
    { char: '🤺', category: 'activity', name: 'Fencer' },
    { char: '🤼‍♀️', category: 'activity', name: 'Women Wrestling' },
    { char: '🤼‍♂️', category: 'activity', name: 'Men Wrestling' },
    { char: '🤸‍♀️', category: 'activity', name: 'Woman Cartwheeling' },
    { char: '🤸‍♂️', category: 'activity', name: 'Man Cartwheeling' },
    { char: '⛹️‍♀️', category: 'activity', name: 'Woman Bouncing Ball' },
    { char: '⛹️', category: 'activity', name: 'Person Bouncing Ball' },
    { char: '🤾‍♀️', category: 'activity', name: 'Woman Playing Handball' },
    { char: '🤾‍♂️', category: 'activity', name: 'Man Playing Handball' },
    { char: '🏌️‍♀️', category: 'activity', name: 'Woman Golfing' },
    { char: '🏌️', category: 'activity', name: 'Person Golfing' },
    { char: '🧗‍♂️', category: 'activity', name: 'Man Climbing' },
    { char: '🧗‍♀️', category: 'activity', name: 'Woman Climbing' },
    { char: '🧘‍♀️', category: 'activity', name: 'Woman in Lotus Position' },
    { char: '🏄‍♀️', category: 'activity', name: 'Woman Surfing' },
    { char: '🏄', category: 'activity', name: 'Person Surfing' },
    { char: '🏊‍♀️', category: 'activity', name: 'Woman Swimming' },
    { char: '🏊', category: 'activity', name: 'Person Swimming' },
    { char: '🤽‍♀️', category: 'activity', name: 'Woman Water Polo' },
    { char: '🤽‍♂️', category: 'activity', name: 'Man Water Polo' },
    { char: '🚣‍♀️', category: 'activity', name: 'Woman Rowing Boat' },
    { char: '🚣', category: 'activity', name: 'Person Rowing Boat' },
    { char: '🤿', category: 'activity', name: 'Diving Mask' },
    { char: '🏇', category: 'activity', name: 'Horse Racing' },
    { char: '🚴‍♀️', category: 'activity', name: 'Woman Biking' },
    { char: '🚴', category: 'activity', name: 'Person Biking' },
    { char: '🚵‍♀️', category: 'activity', name: 'Woman Mountain Biking' },
    { char: '🚵', category: 'activity', name: 'Person Mountain Biking' },
    { char: '🎽', category: 'activity', name: 'Running Shirt' },
    { char: '🏅', category: 'activity', name: 'Sports Medal' },
    { char: '🎖️', category: 'activity', name: 'Military Medal' },
    { char: '🥇', category: 'activity', name: 'Gold Medal' },
    { char: '🥈', category: 'activity', name: 'Silver Medal' },
    { char: '🥉', category: 'activity', name: 'Bronze Medal' },
    { char: '🏆', category: 'activity', name: 'Trophy' },
    { char: '🎗️', category: 'activity', name: 'Reminder Ribbon' },
    { char: '🎫', category: 'activity', name: 'Ticket' },
    { char: '🎟️', category: 'activity', name: 'Admission Tickets' },
    { char: '🎪', category: 'activity', name: 'Circus Tent' },
    { char: '🤹‍♀️', category: 'activity', name: 'Woman Juggling' },
    { char: '🤹‍♂️', category: 'activity', name: 'Man Juggling' },
    { char: '🎭', category: 'activity', name: 'Performing Arts' },
    { char: '🎨', category: 'activity', name: 'Artist Palette' },
    { char: '🎬', category: 'activity', name: 'Clapper Board' },
    { char: '🎤', category: 'activity', name: 'Microphone' },
    { char: '🎧', category: 'activity', name: 'Headphone' },
    { char: '🎼', category: 'activity', name: 'Musical Score' },
    { char: '🎹', category: 'activity', name: 'Musical Keyboard' },
    { char: '🥁', category: 'activity', name: 'Drum' },
    { char: '🛷', category: 'activity', name: 'Sled' },
    { char: '🥌', category: 'activity', name: 'Curling Stone' },
    { char: '🎷', category: 'activity', name: 'Saxophone' },
    { char: '🎺', category: 'activity', name: 'Trumpet' },
    { char: '🎸', category: 'activity', name: 'Guitar' },
    { char: '🎻', category: 'activity', name: 'Violin' },
    { char: '🪕', category: 'activity', name: 'Banjo' },
    { char: '🎲', category: 'activity', name: 'Game Die' },
    { char: '🎯', category: 'activity', name: 'Direct Hit' },
    { char: '🎳', category: 'activity', name: 'Bowling' },
    { char: '🪀', category: 'activity', name: 'Yo-Yo' },
    { char: '🪁', category: 'activity', name: 'Kite' },
    { char: '🎮', category: 'activity', name: 'Video Game' },
    { char: '🎰', category: 'activity', name: 'Slot Machine' },
    { char: '🪉', category: 'activity', name: 'Musical Notes' },

    // Travel & Places

    { char: '🚗', category: 'travel', name: 'Car' },
    { char: '🚕', category: 'travel', name: 'Taxi' },
    { char: '🚙', category: 'travel', name: 'SUV' },
    { char: '🚌', category: 'travel', name: 'Bus' },
    { char: '🚎', category: 'travel', name: 'Trolleybus' },
    { char: '🏎️', category: 'travel', name: 'Racing Car' },
    { char: '🚓', category: 'travel', name: 'Police Car' },
    { char: '🚑', category: 'travel', name: 'Ambulance' },
    { char: '🚒', category: 'travel', name: 'Fire Engine' },
    { char: '🚐', category: 'travel', name: 'Minibus' },
    { char: '🚚', category: 'travel', name: 'Delivery Truck' },
    { char: '🚛', category: 'travel', name: 'Articulated Lorry' },
    { char: '🚜', category: 'travel', name: 'Tractor' },
    { char: '🛴', category: 'travel', name: 'Kick Scooter' },
    { char: '🚲', category: 'travel', name: 'Bicycle' },
    { char: '🛵', category: 'travel', name: 'Motor Scooter' },
    { char: '🏍️', category: 'travel', name: 'Motorcycle' },
    { char: '🛺', category: 'travel', name: 'Auto Rickshaw' },
    { char: '🚨', category: 'travel', name: 'Police Car Light' },
    { char: '🚔', category: 'travel', name: 'Oncoming Police Car' },
    { char: '🚍', category: 'travel', name: 'Oncoming Bus' },
    { char: '🚘', category: 'travel', name: 'Oncoming Car' },
    { char: '🚖', category: 'travel', name: 'Oncoming Taxi' },
    { char: '🚡', category: 'travel', name: 'Aerial Tramway' },
    { char: '🚠', category: 'travel', name: 'Mountain Cableway' },
    { char: '🚟', category: 'travel', name: 'Suspension Railway' },
    { char: '🚃', category: 'travel', name: 'Railway Car' },
    { char: '🚋', category: 'travel', name: 'Tram Car' },
    { char: '🚞', category: 'travel', name: 'Mountain Railway' },
    { char: '🚝', category: 'travel', name: 'Monorail' },
    { char: '🚄', category: 'travel', name: 'High-Speed Train' },
    { char: '🚅', category: 'travel', name: 'Bullet Train' },
    { char: '🚈', category: 'travel', name: 'Light Rail' },
    { char: '🚂', category: 'travel', name: 'Locomotive' },
    { char: '🚆', category: 'travel', name: 'Train' },
    { char: '🚇', category: 'travel', name: 'Metro' },
    { char: '🚊', category: 'travel', name: 'Tram' },
    { char: '🚉', category: 'travel', name: 'Station' },
    { char: '🚁', category: 'travel', name: 'Helicopter' },
    { char: '🛩️', category: 'travel', name: 'Small Airplane' },
    { char: '✈️', category: 'travel', name: 'Airplane' },
    { char: '🛫', category: 'travel', name: 'Airplane Departure' },
    { char: '🛬', category: 'travel', name: 'Airplane Arrival' },
    { char: '🪂', category: 'travel', name: 'Parachute' },
    { char: '🚀', category: 'travel', name: 'Rocket' },
    { char: '🛰️', category: 'travel', name: 'Satellite' },
    { char: '🛸', category: 'travel', name: 'Flying Saucer' },
    { char: '💺', category: 'travel', name: 'Seat' },
    { char: '🛶', category: 'travel', name: 'Canoe' },
    { char: '⛵️', category: 'travel', name: 'Sailboat' },
    { char: '🛥️', category: 'travel', name: 'Motor Boat' },
    { char: '🚤', category: 'travel', name: 'Speedboat' },
    { char: '🛳️', category: 'travel', name: 'Passenger Ship' },
    { char: '⛴️', category: 'travel', name: 'Ferry' },
    { char: '🚢', category: 'travel', name: 'Ship' },
    { char: '⚓️', category: 'travel', name: 'Anchor' },
    { char: '🚧', category: 'travel', name: 'Construction' },
    { char: '⛽️', category: 'travel', name: 'Fuel Pump' },
    { char: '🚏', category: 'travel', name: 'Bus Stop' },
    { char: '🚦', category: 'travel', name: 'Vertical Traffic Light' },
    { char: '🚥', category: 'travel', name: 'Horizontal Traffic Light' },
    { char: '🗺️', category: 'travel', name: 'World Map' },
    { char: '🗿', category: 'travel', name: 'Moai' },
    { char: '🗽', category: 'travel', name: 'Statue of Liberty' },
    { char: '⛲️', category: 'travel', name: 'Fountain' },
    { char: '🗼', category: 'travel', name: 'Tokyo Tower' },
    { char: '🏰', category: 'travel', name: 'Castle' },
    { char: '🏯', category: 'travel', name: 'Japanese Castle' },
    { char: '🏟️', category: 'travel', name: 'Stadium' },
    { char: '🎡', category: 'travel', name: 'Ferris Wheel' },
    { char: '🎢', category: 'travel', name: 'Roller Coaster' },
    { char: '🎠', category: 'travel', name: 'Carousel Horse' },
    { char: '⛱️', category: 'travel', name: 'Umbrella on Ground' },
    { char: '🏖️', category: 'travel', name: 'Beach with Umbrella' },
    { char: '🏝️', category: 'travel', name: 'Desert Island' },
    { char: '⛰️', category: 'travel', name: 'Mountain' },
    { char: '🏔️', category: 'travel', name: 'Snow-Capped Mountain' },
    { char: '🗻', category: 'travel', name: 'Mount Fuji' },
    { char: '🌋', category: 'travel', name: 'Volcano' },
    { char: '🏜️', category: 'travel', name: 'Desert' },
    { char: '🏕️', category: 'travel', name: 'Camping' },
    { char: '⛺️', category: 'travel', name: 'Tent' },
    { char: '⛳', category: 'travel', name: 'Flag in Hole' },
    { char: '🛤️', category: 'travel', name: 'Railway Track' },
    { char: '🛣️', category: 'travel', name: 'Motorway' },
    { char: '🏗️', category: 'travel', name: 'Building Construction' },
    { char: '🏭', category: 'travel', name: 'Factory' },
    { char: '🏠', category: 'travel', name: 'House' },
    { char: '🏡', category: 'travel', name: 'House with Garden' },
    { char: '🏘️', category: 'travel', name: 'Houses' },
    { char: '🏚️', category: 'travel', name: 'Derelict House' },
    { char: '🏢', category: 'travel', name: 'Office Building' },
    { char: '🏬', category: 'travel', name: 'Department Store' },
    { char: '🏣', category: 'travel', name: 'Japanese Post Office' },
    { char: '🏤', category: 'travel', name: 'Post Office' },
    { char: '🏥', category: 'travel', name: 'Hospital' },
    { char: '🏦', category: 'travel', name: 'Bank' },
    { char: '🏨', category: 'travel', name: 'Hotel' },
    { char: '🏪', category: 'travel', name: 'Convenience Store' },
    { char: '🏫', category: 'travel', name: 'School' },
    { char: '🏩', category: 'travel', name: 'Love Hotel' },
    { char: '💒', category: 'travel', name: 'Wedding' },
    { char: '🏛️', category: 'travel', name: 'Classical Building' },
    { char: '⛪️', category: 'travel', name: 'Church' },
    { char: '🕌', category: 'travel', name: 'Mosque' },
    { char: '🕍', category: 'travel', name: 'Synagogue' },
    { char: '🛕', category: 'travel', name: 'Hindu Temple' },
    { char: '🕋', category: 'travel', name: 'Kaaba' },
    { char: '⛩️', category: 'travel', name: 'Shinto Shrine' },
    { char: '🗾', category: 'travel', name: 'Map of Japan' },
    { char: '🎑', category: 'travel', name: 'Moon Viewing Ceremony' },
    { char: '🏞️', category: 'travel', name: 'National Park' },
    { char: '🌅', category: 'travel', name: 'Sunrise' },
    { char: '🌄', category: 'travel', name: 'Sunrise Over Mountains' },
    { char: '🌠', category: 'travel', name: 'Shooting Star' },
    { char: '🎇', category: 'travel', name: 'Sparkler' },
    { char: '🎆', category: 'travel', name: 'Fireworks' },
    { char: '🌇', category: 'travel', name: 'Sunset' },
    { char: '🌆', category: 'travel', name: 'Cityscape at Dusk' },
    { char: '🏙️', category: 'travel', name: 'Cityscape' },
    { char: '🌃', category: 'travel', name: 'Night with Stars' },
    { char: '🌌', category: 'travel', name: 'Milky Way' },
    { char: '🪐', category: 'travel', name: 'Ringed Planet' },
    { char: '🌉', category: 'travel', name: 'Bridge at Night' },
    { char: '🌁', category: 'travel', name: 'Foggy' },

    // Objects

    { char: '💍', category: 'objects', name: 'Ring' },
    { char: '📱', category: 'objects', name: 'Mobile Phone' },
    { char: '📲', category: 'objects', name: 'Mobile Phone with Arrow' },
    { char: '💻', category: 'objects', name: 'Laptop' },
    { char: '⌨️', category: 'objects', name: 'Keyboard' },
    { char: '🖥️', category: 'objects', name: 'Desktop Computer' },
    { char: '🖨️', category: 'objects', name: 'Printer' },
    { char: '🖱️', category: 'objects', name: 'Computer Mouse' },
    { char: '🖲️', category: 'objects', name: 'Trackball' },
    { char: '🕹️', category: 'objects', name: 'Joystick' },
    { char: '🗜️', category: 'objects', name: 'Clamp' },
    { char: '💽', category: 'objects', name: 'Computer Disk' },
    { char: '💾', category: 'objects', name: 'Floppy Disk' },
    { char: '💿', category: 'objects', name: 'Optical Disk' },
    { char: '📀', category: 'objects', name: 'DVD' },
    { char: '📼', category: 'objects', name: 'Videocassette' },
    { char: '📷', category: 'objects', name: 'Camera' },
    { char: '📸', category: 'objects', name: 'Camera with Flash' },
    { char: '📹', category: 'objects', name: 'Video Camera' },
    { char: '🎥', category: 'objects', name: 'Movie Camera' },
    { char: '📽️', category: 'objects', name: 'Film Projector' },
    { char: '🎞️', category: 'objects', name: 'Film Frames' },
    { char: '📞', category: 'objects', name: 'Telephone Receiver' },
    { char: '☎️', category: 'objects', name: 'Telephone' },
    { char: '⚖️', category: 'objects', name: 'Balance Scale' },
    { char: '📟', category: 'objects', name: 'Pager' },
    { char: '📠', category: 'objects', name: 'Fax Machine' },
    { char: '📺', category: 'objects', name: 'Television' },
    { char: '📻', category: 'objects', name: 'Radio' },
    { char: '🎙️', category: 'objects', name: 'Studio Microphone' },
    { char: '🎚️', category: 'objects', name: 'Level Slider' },
    { char: '🎛️', category: 'objects', name: 'Control Knobs' },
    { char: '⏱️', category: 'objects', name: 'Stopwatch' },
    { char: '⏲️', category: 'objects', name: 'Timer Clock' },
    { char: '⏰', category: 'objects', name: 'Alarm Clock' },
    { char: '🕰️', category: 'objects', name: 'Mantelpiece Clock' },
    { char: '⌛️', category: 'objects', name: 'Hourglass Done' },
    { char: '⏳', category: 'objects', name: 'Hourglass Not Done' },
    { char: '🧭', category: 'objects', name: 'Compass' },
    { char: '📡', category: 'objects', name: 'Satellite Antenna' },
    { char: '🔋', category: 'objects', name: 'Battery' },
    { char: '🔌', category: 'objects', name: 'Electric Plug' },
    { char: '💡', category: 'objects', name: 'Light Bulb' },
    { char: '🔦', category: 'objects', name: 'Flashlight' },
    { char: '🕯️', category: 'objects', name: 'Candle' },
    { char: '🗑️', category: 'objects', name: 'Wastebasket' },
    { char: '🛢️', category: 'objects', name: 'Oil Drum' },
    { char: '💸', category: 'objects', name: 'Money with Wings' },
    { char: '💵', category: 'objects', name: 'Dollar Banknote' },
    { char: '💴', category: 'objects', name: 'Yen Banknote' },
    { char: '💶', category: 'objects', name: 'Euro Banknote' },
    { char: '💷', category: 'objects', name: 'Pound Banknote' },
    { char: '💰', category: 'objects', name: 'Money Bag' },
    { char: '💳', category: 'objects', name: 'Credit Card' },
    { char: '💎', category: 'objects', name: 'Gem Stone' },
    { char: '🧿', category: 'objects', name: 'Nazar Amulet' },
    { char: '⚖️', category: 'objects', name: 'Balance Scale' },
    { char: '🔧', category: 'objects', name: 'Wrench' },
    { char: '🔨', category: 'objects', name: 'Hammer' },
    { char: '⚒️', category: 'objects', name: 'Hammer and Pick' },
    { char: '🛠️', category: 'objects', name: 'Hammer and Wrench' },
    { char: '⛏️', category: 'objects', name: 'Pick' },
    { char: '🪓', category: 'objects', name: 'Axe' },
    { char: '🪏', category: 'objects', name: 'Shovel' },
    { char: '🧯', category: 'objects', name: 'Fire Extinguisher' },
    { char: '🧹', category: 'objects', name: 'Broom' },
    { char: '🧽', category: 'objects', name: 'Sponge' },
    { char: '🧼', category: 'objects', name: 'Soap' },
    { char: '🧺', category: 'objects', name: 'Basket' },
    { char: '🔩', category: 'objects', name: 'Nut and Bolt' },
    { char: '⚙️', category: 'objects', name: 'Gear' },
    { char: '⛓️', category: 'objects', name: 'Chains' },
    { char: '🔫', category: 'objects', name: 'Water Pistol' },
    { char: '🪁', category: 'objects', name: 'Kite' },
    { char: '💣', category: 'objects', name: 'Bomb' },
    { char: '🧨', category: 'objects', name: 'Firecracker' },
    { char: '🪒', category: 'objects', name: 'Razor' },
    { char: '🔪', category: 'objects', name: 'Kitchen Knife' },
    { char: '🗡️', category: 'objects', name: 'Dagger' },
    { char: '⚔️', category: 'objects', name: 'Crossed Swords' },
    { char: '🛡️', category: 'objects', name: 'Shield' },
    { char: '🎖️', category: 'objects', name: 'Military Medal' },
    { char: '🚬', category: 'objects', name: 'Cigarette' },
    { char: '⚰️', category: 'objects', name: 'Coffin' },
    { char: '⚱️', category: 'objects', name: 'Funeral Urn' },
    { char: '🏺', category: 'objects', name: 'Amphora' },
    { char: '🪦', category: 'objects', name: 'Headstone' },
    { char: '🪔', category: 'objects', name: 'Diya Lamp' },
    { char: '🔮', category: 'objects', name: 'Crystal Ball' },
    { char: '📿', category: 'objects', name: 'Prayer Beads' },
    { char: '💈', category: 'objects', name: 'Barber Pole' },
    { char: '⚗️', category: 'objects', name: 'Alembic' },
    { char: '🔭', category: 'objects', name: 'Telescope' },
    { char: '🔬', category: 'objects', name: 'Microscope' },
    { char: '🕳️', category: 'objects', name: 'Hole' },
    { char: '🦯', category: 'objects', name: 'White Cane' },
    { char: '🩺', category: 'objects', name: 'Stethoscope' },
    { char: '💊', category: 'objects', name: 'Pill' },
    { char: '💉', category: 'objects', name: 'Syringe' },
    { char: '🩸', category: 'objects', name: 'Drop of Blood' },
    { char: '🩹', category: 'objects', name: 'Adhesive Bandage' },
    { char: '🦠', category: 'objects', name: 'Microbe' },
    { char: '🧴', category: 'objects', name: 'Lotion Bottle' },
    { char: '🧫', category: 'objects', name: 'Petri Dish' },
    { char: '🧬', category: 'objects', name: 'DNA' },
    { char: '🌡️', category: 'objects', name: 'Thermometer' },
    { char: '🚽', category: 'objects', name: 'Toilet' },
    { char: '🧻', category: 'objects', name: 'Roll of Paper' },
    { char: '🚰', category: 'objects', name: 'Potable Water' },
    { char: '🚿', category: 'objects', name: 'Shower' },
    { char: '🛁', category: 'objects', name: 'Bathtub' },
    { char: '🛀', category: 'objects', name: 'Person Taking Bath' },
    { char: '🛎️', category: 'objects', name: 'Bellhop Bell' },
    { char: '🔑', category: 'objects', name: 'Key' },
    { char: '🗝️', category: 'objects', name: 'Old Key' },
    { char: '🚪', category: 'objects', name: 'Door' },
    { char: '🛋️', category: 'objects', name: 'Couch and Lamp' },
    { char: '🛏️', category: 'objects', name: 'Bed' },
    { char: '🛌', category: 'objects', name: 'Person in Bed' },
    { char: '🧤', category: 'objects', name: 'Gloves' },
    { char: '🧥', category: 'objects', name: 'Coat' },
    { char: '🧦', category: 'objects', name: 'Socks' },
    { char: '🧢', category: 'objects', name: 'Billed Cap' },
    { char: '🪑', category: 'objects', name: 'Chair' },
    { char: '🖼️', category: 'objects', name: 'Framed Picture' },
    { char: '🛍️', category: 'objects', name: 'Shopping Bags' },
    { char: '🛒', category: 'objects', name: 'Shopping Cart' },
    { char: '🎁', category: 'objects', name: 'Wrapped Gift' },
    { char: '🎈', category: 'objects', name: 'Balloon' },
    { char: '🎏', category: 'objects', name: 'Carp Streamer' },
    { char: '🎀', category: 'objects', name: 'Ribbon' },
    { char: '🧣', category: 'objects', name: 'Scarf' },
    { char: '🎊', category: 'objects', name: 'Confetti Ball' },
    { char: '🎉', category: 'objects', name: 'Party Popper' },
    { char: '🎎', category: 'objects', name: 'Japanese Dolls' },
    { char: '🏮', category: 'objects', name: 'Red Paper Lantern' },
    { char: '🎐', category: 'objects', name: 'Wind Chime' },
    { char: '✉️', category: 'objects', name: 'Envelope' },
    { char: '📩', category: 'objects', name: 'Envelope with Arrow' },
    { char: '📨', category: 'objects', name: 'Incoming Envelope' },
    { char: '📧', category: 'objects', name: 'E-Mail' },
    { char: '💌', category: 'objects', name: 'Love Letter' },
    { char: '📥', category: 'objects', name: 'Inbox Tray' },
    { char: '📤', category: 'objects', name: 'Outbox Tray' },
    { char: '📦', category: 'objects', name: 'Package' },
    { char: '🏷️', category: 'objects', name: 'Label' },
    { char: '📪', category: 'objects', name: 'Closed Mailbox with Lowered Flag' },
    { char: '📫', category: 'objects', name: 'Closed Mailbox with Raised Flag' },
    { char: '📬', category: 'objects', name: 'Open Mailbox with Raised Flag' },
    { char: '📭', category: 'objects', name: 'Open Mailbox with Lowered Flag' },
    { char: '📮', category: 'objects', name: 'Postbox' },
    { char: '📯', category: 'objects', name: 'Postal Horn' },
    { char: '📜', category: 'objects', name: 'Scroll' },
    { char: '📃', category: 'objects', name: 'Page with Curl' },
    { char: '📄', category: 'objects', name: 'Page Facing Up' },
    { char: '📑', category: 'objects', name: 'Bookmark Tabs' },
    { char: '📊', category: 'objects', name: 'Bar Chart' },
    { char: '📈', category: 'objects', name: 'Chart Increasing' },
    { char: '📉', category: 'objects', name: 'Chart Decreasing' },
    { char: '🗒️', category: 'objects', name: 'Spiral Notepad' },
    { char: '🗓️', category: 'objects', name: 'Spiral Calendar' },
    { char: '📆', category: 'objects', name: 'Tear-Off Calendar' },
    { char: '📅', category: 'objects', name: 'Calendar' },
    { char: '📇', category: 'objects', name: 'Card Index' },
    { char: '🗃️', category: 'objects', name: 'Card File Box' },
    { char: '🗳️', category: 'objects', name: 'Ballot Box' },
    { char: '🗄️', category: 'objects', name: 'File Cabinet' },
    { char: '📋', category: 'objects', name: 'Clipboard' },
    { char: '📁', category: 'objects', name: 'File Folder' },
    { char: '📂', category: 'objects', name: 'Open File Folder' },
    { char: '🗂️', category: 'objects', name: 'Card Index Dividers' },
    { char: '🗞️', category: 'objects', name: 'Rolled-Up Newspaper' },
    { char: '📰', category: 'objects', name: 'Newspaper' },
    { char: '📓', category: 'objects', name: 'Notebook' },
    { char: '📔', category: 'objects', name: 'Notebook with Decorative Cover' },
    { char: '📒', category: 'objects', name: 'Ledger' },
    { char: '📕', category: 'objects', name: 'Closed Book' },
    { char: '📗', category: 'objects', name: 'Green Book' },
    { char: '📘', category: 'objects', name: 'Blue Book' },
    { char: '📙', category: 'objects', name: 'Orange Book' },
    { char: '📚', category: 'objects', name: 'Books' },
    { char: '📖', category: 'objects', name: 'Open Book' },
    { char: '🧧', category: 'objects', name: 'Red Envelope' },
    { char: '🔖', category: 'objects', name: 'Bookmark' },
    { char: '🔗', category: 'objects', name: 'Link' },
    { char: '📎', category: 'objects', name: 'Paperclip' },
    { char: '🖇️', category: 'objects', name: 'Linked Paperclips' },
    { char: '🧲', category: 'objects', name: 'Magnet' },
    { char: '📐', category: 'objects', name: 'Triangular Ruler' },
    { char: '📏', category: 'objects', name: 'Straight Ruler' },
    { char: '📌', category: 'objects', name: 'Pushpin' },
    { char: '📍', category: 'objects', name: 'Round Pushpin' },
    { char: '🎌', category: 'objects', name: 'Crossed Flags' },
    { char: '🏳️', category: 'objects', name: 'White Flag' },
    { char: '🏴', category: 'objects', name: 'Black Flag' },
    { char: '🏁', category: 'objects', name: 'Chequered Flag' },
    { char: '🏳️‍🌈', category: 'objects', name: 'Rainbow Flag' },
    { char: '✂️', category: 'objects', name: 'Scissors' },
    { char: '🎨', category: 'objects', name: 'Artist Palette' },
    { char: '✏️', category: 'objects', name: 'Pencil' },
    { char: '🖊️', category: 'objects', name: 'Pen' },
    { char: '🖋️', category: 'objects', name: 'Fountain Pen' },
    { char: '✒️', category: 'objects', name: 'Black Nib' },
    { char: '🖌️', category: 'objects', name: 'Paintbrush' },
    { char: '🖍️', category: 'objects', name: 'Crayon' },
    { char: '📝', category: 'objects', name: 'Memo' },
    { char: '🔍', category: 'objects', name: 'Magnifying Glass Tilted Left' },
    { char: '🔎', category: 'objects', name: 'Magnifying Glass Tilted Right' },
    { char: '🔏', category: 'objects', name: 'Lock with Ink Pen' },
    { char: '🔐', category: 'objects', name: 'Closed Lock with Key' },
    { char: '🔒', category: 'objects', name: 'Locked' },
    { char: '🔓', category: 'objects', name: 'Unlocked' },
    { char: '💄', category: 'objects', name: 'Lipstick' },
    { char: '👚', category: 'objects', name: 'Woman’s Clothes' },
    { char: '👕', category: 'objects', name: 'T-Shirt' },
    { char: '👖', category: 'objects', name: 'Jeans' },
    { char: '👔', category: 'objects', name: 'Necktie' },
    { char: '👗', category: 'objects', name: 'Dress' },
    { char: '👙', category: 'objects', name: 'Bikini' },
    { char: '👘', category: 'objects', name: 'Kimono' },
    { char: '👠', category: 'objects', name: 'High-Heeled Shoe' },
    { char: '👡', category: 'objects', name: 'Woman’s Sandal' },
    { char: '👢', category: 'objects', name: 'Woman’s Boot' },
    { char: '👞', category: 'objects', name: 'Man’s Shoe' },
    { char: '👟', category: 'objects', name: 'Running Shoe' },
    { char: '👒', category: 'objects', name: 'Woman’s Hat' },
    { char: '🎩', category: 'objects', name: 'Top Hat' },
    { char: '🎓', category: 'objects', name: 'Graduation Cap' },
    { char: '👑', category: 'objects', name: 'Crown' },
    { char: '⛑️', category: 'objects', name: 'Rescue Worker’s Helmet' },
    { char: '🎒', category: 'objects', name: 'School Backpack' },
    { char: '🧳', category: 'objects', name: 'Luggage' },
    { char: '👝', category: 'objects', name: 'Clutch Bag' },
    { char: '👛', category: 'objects', name: 'Purse' },
    { char: '👜', category: 'objects', name: 'Handbag' },
    { char: '💼', category: 'objects', name: 'Briefcase' },
    { char: '👓', category: 'objects', name: 'Glasses' },
    { char: '🕶️', category: 'objects', name: 'Sunglasses' },
    { char: '🌂', category: 'objects', name: 'Closed Umbrella' },
    { char: '☂️', category: 'objects', name: 'Umbrella' },
    { char: '🪶', category: 'objects', name: 'Feather' },
    { char: '🧷', category: 'objects', name: 'Safety Pin' },
    { char: '🫆', category: 'objects', name: 'Tongs' },

    // Symbols

    { char: '❤️', category: 'symbols', name: 'Red Heart' },
    { char: '💛', category: 'symbols', name: 'Yellow Heart' },
    { char: '💚', category: 'symbols', name: 'Green Heart' },
    { char: '💙', category: 'symbols', name: 'Blue Heart' },
    { char: '💜', category: 'symbols', name: 'Purple Heart' },
    { char: '🖤', category: 'symbols', name: 'Black Heart' },
    { char: '🤎', category: 'symbols', name: 'Brown Heart' },
    { char: '🤍', category: 'symbols', name: 'White Heart' },
    { char: '🧡', category: 'symbols', name: 'Orange Heart' },
    { char: '💔', category: 'symbols', name: 'Broken Heart' },
    { char: '❣️', category: 'symbols', name: 'Heart Exclamation' },
    { char: '💕', category: 'symbols', name: 'Two Hearts' },
    { char: '💞', category: 'symbols', name: 'Revolving Hearts' },
    { char: '💓', category: 'symbols', name: 'Beating Heart' },
    { char: '💗', category: 'symbols', name: 'Growing Heart' },
    { char: '💖', category: 'symbols', name: 'Sparkling Heart' },
    { char: '💘', category: 'symbols', name: 'Heart with Arrow' },
    { char: '💝', category: 'symbols', name: 'Heart with Ribbon' },
    { char: '💋', category: 'symbols', name: 'Kiss Mark' },
    { char: '💌', category: 'symbols', name: 'Love Letter' },
    { char: '💟', category: 'symbols', name: 'Heart Decoration' },
    { char: '❣️', category: 'symbols', name: 'Heart Exclamation' },
    { char: '💟', category: 'symbols', name: 'Heart Decoration' },
    { char: '♾️', category: 'symbols', name: 'Infinity' },
    { char: '☮️', category: 'symbols', name: 'Peace Symbol' },
    { char: '✝️', category: 'symbols', name: 'Latin Cross' },
    { char: '☪️', category: 'symbols', name: 'Star and Crescent' },
    { char: '🕉️', category: 'symbols', name: 'Om' },
    { char: '☸️', category: 'symbols', name: 'Wheel of Dharma' },
    { char: '✡️', category: 'symbols', name: 'Star of David' },
    { char: '🔯', category: 'symbols', name: 'Six-Pointed Star' },
    { char: '🕎', category: 'symbols', name: 'Menorah' },
    { char: '☯️', category: 'symbols', name: 'Yin Yang' },
    { char: '☦️', category: 'symbols', name: 'Orthodox Cross' },
    { char: '🛐', category: 'symbols', name: 'Place of Worship' },
    { char: '⛎', category: 'symbols', name: 'Ophiuchus' },
    { char: '♈️', category: 'symbols', name: 'Aries' },
    { char: '♉️', category: 'symbols', name: 'Taurus' },
    { char: '♊️', category: 'symbols', name: 'Gemini' },
    { char: '♋️', category: 'symbols', name: 'Cancer' },
    { char: '♌️', category: 'symbols', name: 'Leo' },
    { char: '♍️', category: 'symbols', name: 'Virgo' },
    { char: '♎️', category: 'symbols', name: 'Libra' },
    { char: '♏️', category: 'symbols', name: 'Scorpio' },
    { char: '♐️', category: 'symbols', name: 'Sagittarius' },
    { char: '♑️', category: 'symbols', name: 'Capricorn' },
    { char: '♒️', category: 'symbols', name: 'Aquarius' },
    { char: '♓️', category: 'symbols', name: 'Pisces' },
    { char: '🆔', category: 'symbols', name: 'ID Button' },
    { char: '⚛️', category: 'symbols', name: 'Atom Symbol' },
    { char: '🈳', category: 'symbols', name: 'Vacancy Button' },
    { char: '🉑', category: 'symbols', name: 'Accept Button' },
    { char: '☢️', category: 'symbols', name: 'Radioactive' },
    { char: '☣️', category: 'symbols', name: 'Biohazard' },
    { char: '📴', category: 'symbols', name: 'Mobile Phone Off' },
    { char: '📳', category: 'symbols', name: 'Vibration Mode' },
    { char: '🈶', category: 'symbols', name: 'Not Free Button' },
    { char: '🈚️', category: 'symbols', name: 'Free Button' },
    { char: '🈸', category: 'symbols', name: 'Application Button' },
    { char: '🈺', category: 'symbols', name: 'Open for Business Button' },
    { char: '🈷️', category: 'symbols', name: 'Monthly Amount Button' },
    { char: '⏏️', category: 'symbols', name: 'Eject Button' },
    { char: '✴️', category: 'symbols', name: 'Eight-Pointed Star' },
    { char: '🆚', category: 'symbols', name: 'VS Button' },
    { char: '🉐', category: 'symbols', name: 'Bargain Button' },
    { char: '㊙️', category: 'symbols', name: 'Secret Button' },
    { char: '㊗️', category: 'symbols', name: 'Congratulations Button' },
    { char: '🈴', category: 'symbols', name: 'Passing Grade Button' },
    { char: '🈵', category: 'symbols', name: 'No Vacancy Button' },
    { char: '🈹', category: 'symbols', name: 'Discount Button' },
    { char: '🈲', category: 'symbols', name: 'Prohibited Button' },
    { char: '🅰️', category: 'symbols', name: 'A Button (Blood Type)' },
    { char: '🅱️', category: 'symbols', name: 'B Button (Blood Type)' },
    { char: '🆎', category: 'symbols', name: 'AB Button (Blood Type)' },
    { char: '🆑', category: 'symbols', name: 'CL Button' },
    { char: '🅾️', category: 'symbols', name: 'O Button (Blood Type)' },
    { char: '🆘', category: 'symbols', name: 'SOS Button' },
    { char: '🚼', category: 'symbols', name: 'Baby Symbol' },
    { char: '❌', category: 'symbols', name: 'Cross Mark' },
    { char: '⭕️', category: 'symbols', name: 'Heavy Large Circle' },
    { char: '🛑', category: 'symbols', name: 'Stop Sign' },
    { char: '⛔️', category: 'symbols', name: 'No Entry' },
    { char: '📛', category: 'symbols', name: 'Name Badge' },
    { char: '🚫', category: 'symbols', name: 'Prohibited' },
    { char: '💯', category: 'symbols', name: 'Hundred Points' },
    { char: '💮', category: 'symbols', name: 'White Flower' },
    { char: '💢', category: 'symbols', name: 'Anger Symbol' },
    { char: '♨️', category: 'symbols', name: 'Hot Springs' },
    { char: '🚷', category: 'symbols', name: 'No Pedestrians' },
    { char: '🚯', category: 'symbols', name: 'No Littering' },
    { char: '🚳', category: 'symbols', name: 'No Bicycles' },
    { char: '🚱', category: 'symbols', name: 'Non-Potable Water' },
    { char: '🔞', category: 'symbols', name: 'No One Under 18' },
    { char: '📵', category: 'symbols', name: 'No Mobile Phones' },
    { char: '🚭', category: 'symbols', name: 'No Smoking' },
    { char: '❗️', category: 'symbols', name: 'Red Exclamation Mark' },
    { char: '❕', category: 'symbols', name: 'White Exclamation Mark' },
    { char: '❓', category: 'symbols', name: 'Red Question Mark' },
    { char: '❔', category: 'symbols', name: 'White Question Mark' },
    { char: '‼️', category: 'symbols', name: 'Double Exclamation Mark' },
    { char: '⁉️', category: 'symbols', name: 'Exclamation Question Mark' },
    { char: '🈯', category: 'symbols', name: 'Reserved (Japanese)' },
    { char: '🈚', category: 'symbols', name: 'Free of Charge (Japanese)' },
    { char: '🔅', category: 'symbols', name: 'Low Brightness' },
    { char: '🔆', category: 'symbols', name: 'High Brightness' },
    { char: '〽️', category: 'symbols', name: 'Part Alternation Mark' },
    { char: '⚠️', category: 'symbols', name: 'Warning' },
    { char: '🚸', category: 'symbols', name: 'Children Crossing' },
    { char: '🔱', category: 'symbols', name: 'Trident Emblem' },
    { char: '⚜️', category: 'symbols', name: 'Fleur-de-lis' },
    { char: '🔰', category: 'symbols', name: 'Japanese Symbol for Beginner' },
    { char: '♻️', category: 'symbols', name: 'Recycling Symbol' },
    { char: '✅', category: 'symbols', name: 'Check Mark Button' },
    { char: '🈯️', category: 'symbols', name: 'Reserved Button' },
    { char: '💹', category: 'symbols', name: 'Chart Increasing with Yen' },
    { char: '❇️', category: 'symbols', name: 'Sparkle' },
    { char: '✳️', category: 'symbols', name: 'Eight-Spoked Asterisk' },
    { char: '❎', category: 'symbols', name: 'Cross Mark Button' },
    { char: '🌐', category: 'symbols', name: 'Globe with Meridians' },
    { char: '💠', category: 'symbols', name: 'Diamond with a Dot' },
    { char: 'Ⓜ️', category: 'symbols', name: 'Circled M' },
    { char: '🌀', category: 'symbols', name: 'Cyclone' },
    { char: '💤', category: 'symbols', name: 'Zzz' },
    { char: '🏧', category: 'symbols', name: 'ATM Sign' },
    { char: '🚾', category: 'symbols', name: 'Water Closet' },
    { char: '♿️', category: 'symbols', name: 'Wheelchair Symbol' },
    { char: '🅿️', category: 'symbols', name: 'P Button' },
    { char: '🈂️', category: 'symbols', name: 'Japanese Here Button' },
    { char: '🛂', category: 'symbols', name: 'Customs' },
    { char: '🛃', category: 'symbols', name: 'Baggage Claim' },
    { char: '🛄', category: 'symbols', name: 'Luggage Claim' },
    { char: '🛅', category: 'symbols', name: 'Left Luggage' },
    { char: '🚹', category: 'symbols', name: 'Men’s Room' },
    { char: '🚺', category: 'symbols', name: 'Women’s Room' },
    { char: '🚻', category: 'symbols', name: 'Restroom' },
    { char: '🚮', category: 'symbols', name: 'Litter in Bin Sign' },
    { char: '➿', category: 'symbols', name: 'Double Curly Loop' },
    { char: '🎦', category: 'symbols', name: 'Cinema' },
    { char: '📶', category: 'symbols', name: 'Antenna Bars' },
    { char: '🈁', category: 'symbols', name: 'Japanese Here Button' },
    { char: '🔣', category: 'symbols', name: 'Input Symbols' },
    { char: 'ℹ️', category: 'symbols', name: 'Information' },
    { char: '🔤', category: 'symbols', name: 'Input Latin Letters' },
    { char: '🔡', category: 'symbols', name: 'Input Latin Lowercase' },
    { char: '🔠', category: 'symbols', name: 'Input Latin Uppercase' },
    { char: '🆖', category: 'symbols', name: 'NG Button' },
    { char: '🆗', category: 'symbols', name: 'OK Button' },
    { char: '🆙', category: 'symbols', name: 'UP! Button' },
    { char: '🆒', category: 'symbols', name: 'Cool Button' },
    { char: '🆕', category: 'symbols', name: 'New Button' },
    { char: '🆓', category: 'symbols', name: 'Free Button' },
    { char: '0️⃣', category: 'symbols', name: 'Keycap 0' },
    { char: '1️⃣', category: 'symbols', name: 'Keycap 1' },
    { char: '2️⃣', category: 'symbols', name: 'Keycap 2' },
    { char: '3️⃣', category: 'symbols', name: 'Keycap 3' },
    { char: '4️⃣', category: 'symbols', name: 'Keycap 4' },
    { char: '5️⃣', category: 'symbols', name: 'Keycap 5' },
    { char: '6️⃣', category: 'symbols', name: 'Keycap 6' },
    { char: '7️⃣', category: 'symbols', name: 'Keycap 7' },
    { char: '8️⃣', category: 'symbols', name: 'Keycap 8' },
    { char: '9️⃣', category: 'symbols', name: 'Keycap 9' },
    { char: '🔟', category: 'symbols', name: 'Keycap 10' },
    { char: '🔢', category: 'symbols', name: 'Input Numbers' },
    { char: '#️⃣', category: 'symbols', name: 'Keycap #' },
    { char: '*️⃣', category: 'symbols', name: 'Keycap *' },
    { char: '▶️', category: 'symbols', name: 'Play Button' },
    { char: '⏸️', category: 'symbols', name: 'Pause Button' },
    { char: '⏯️', category: 'symbols', name: 'Play/Pause Button' },
    { char: '⏹️', category: 'symbols', name: 'Stop Button' },
    { char: '⏺️', category: 'symbols', name: 'Record Button' },
    { char: '⏭️', category: 'symbols', name: 'Next Track Button' },
    { char: '⏮️', category: 'symbols', name: 'Last Track Button' },
    { char: '⏩', category: 'symbols', name: 'Fast-Forward Button' },
    { char: '⏪', category: 'symbols', name: 'Fast Reverse Button' },
    { char: '⏫', category: 'symbols', name: 'Fast Up Button' },
    { char: '⏬', category: 'symbols', name: 'Fast Down Button' },
    { char: '◀️', category: 'symbols', name: 'Reverse Button' },
    { char: '🔼', category: 'symbols', name: 'Up Button' },
    { char: '🔽', category: 'symbols', name: 'Down Button' },
    { char: '➡️', category: 'symbols', name: 'Right Arrow' },
    { char: '⬅️', category: 'symbols', name: 'Left Arrow' },
    { char: '⬆️', category: 'symbols', name: 'Up Arrow' },
    { char: '⬇️', category: 'symbols', name: 'Down Arrow' },
    { char: '↗️', category: 'symbols', name: 'Up-Right Arrow' },
    { char: '↘️', category: 'symbols', name: 'Down-Right Arrow' },
    { char: '↙️', category: 'symbols', name: 'Down-Left Arrow' },
    { char: '↖️', category: 'symbols', name: 'Up-Left Arrow' },
    { char: '↪️', category: 'symbols', name: 'Right Arrow Curving Left' },
    { char: '↩️', category: 'symbols', name: 'Left Arrow Curving Right' },
    { char: '⤴️', category: 'symbols', name: 'Right Arrow Curving Up' },
    { char: '⤵️', category: 'symbols', name: 'Right Arrow Curving Down' },
    { char: '🔀', category: 'symbols', name: 'Shuffle Tracks Button' },
    { char: '🔁', category: 'symbols', name: 'Repeat Button' },
    { char: '🔂', category: 'symbols', name: 'Repeat Single Button' },
    { char: '🔄', category: 'symbols', name: 'Counterclockwise Arrows Button' },
    { char: '🔃', category: 'symbols', name: 'Clockwise Vertical Arrows' },
    { char: '🔚', category: 'symbols', name: 'End Arrow' },
    { char: '🔙', category: 'symbols', name: 'Back Arrow' },
    { char: '🔛', category: 'symbols', name: 'On! Arrow' },
    { char: '🔝', category: 'symbols', name: 'Top Arrow' },
    { char: '🔜', category: 'symbols', name: 'Soon Arrow' },
    { char: '☑️', category: 'symbols', name: 'Check Box with Check' },
    { char: '↕️', category: 'symbols', name: 'Up-Down Arrow' },
    { char: '↔️', category: 'symbols', name: 'Left-Right Arrow' },
    { char: '🎵', category: 'symbols', name: 'Musical Note' },
    { char: '🎶', category: 'symbols', name: 'Musical Notes' },
    { char: '➕', category: 'symbols', name: 'Plus' },
    { char: '➖', category: 'symbols', name: 'Minus' },
    { char: '➗', category: 'symbols', name: 'Divide' },
    { char: '✖️', category: 'symbols', name: 'Multiply' },
    { char: '💲', category: 'symbols', name: 'Heavy Dollar Sign' },
    { char: '💱', category: 'symbols', name: 'Currency Exchange' },
    { char: '™️', category: 'symbols', name: 'Trade Mark' },
    { char: '©️', category: 'symbols', name: 'Copyright' },
    { char: '®️', category: 'symbols', name: 'Registered' },
    { char: '〰️', category: 'symbols', name: 'Wavy Dash' },
    { char: '➰', category: 'symbols', name: 'Curly Loop' },
    { char: '✔️', category: 'symbols', name: 'Check Mark' },
    { char: '🔘', category: 'symbols', name: 'Radio Button' },
    { char: '⚫️', category: 'symbols', name: 'Black Circle' },
    { char: '⚪️', category: 'symbols', name: 'White Circle' },
    { char: '🔴', category: 'symbols', name: 'Red Circle' },
    { char: '🔵', category: 'symbols', name: 'Blue Circle' },
    { char: '🟣', category: 'symbols', name: 'Purple Circle' },
    { char: '🟠', category: 'symbols', name: 'Orange Circle' },
    { char: '🟡', category: 'symbols', name: 'Yellow Circle' },
    { char: '🟢', category: 'symbols', name: 'Green Circle' },
    { char: '🟤', category: 'symbols', name: 'Brown Circle' },
    { char: '🔺', category: 'symbols', name: 'Red Triangle Pointed Up' },
    { char: '🔻', category: 'symbols', name: 'Red Triangle Pointed Down' },
    { char: '🔸', category: 'symbols', name: 'Small Orange Diamond' },
    { char: '🔹', category: 'symbols', name: 'Small Blue Diamond' },
    { char: '🔶', category: 'symbols', name: 'Large Orange Diamond' },
    { char: '🔷', category: 'symbols', name: 'Large Blue Diamond' },
    { char: '🔳', category: 'symbols', name: 'White Square Button' },
    { char: '🔲', category: 'symbols', name: 'Black Square Button' },
    { char: '▪️', category: 'symbols', name: 'Black Small Square' },
    { char: '▫️', category: 'symbols', name: 'White Small Square' },
    { char: '◾️', category: 'symbols', name: 'Black Medium-Small Square' },
    { char: '◽️', category: 'symbols', name: 'White Medium-Small Square' },
    { char: '◼️', category: 'symbols', name: 'Black Medium Square' },
    { char: '◻️', category: 'symbols', name: 'White Medium Square' },
    { char: '⬛️', category: 'symbols', name: 'Black Large Square' },
    { char: '⬜️', category: 'symbols', name: 'White Large Square' },
    { char: '🟥', category: 'symbols', name: 'Red Square' },
    { char: '🟧', category: 'symbols', name: 'Orange Square' },
    { char: '🟨', category: 'symbols', name: 'Yellow Square' },
    { char: '🟩', category: 'symbols', name: 'Green Square' },
    { char: '🟦', category: 'symbols', name: 'Blue Square' },
    { char: '🟪', category: 'symbols', name: 'Purple Square' },
    { char: '🟫', category: 'symbols', name: 'Brown Square' },
    { char: '🔈', category: 'symbols', name: 'Speaker Low Volume' },
    { char: '🔇', category: 'symbols', name: 'Muted Speaker' },
    { char: '🔉', category: 'symbols', name: 'Speaker Medium Volume' },
    { char: '🔊', category: 'symbols', name: 'Speaker High Volume' },
    { char: '🔔', category: 'symbols', name: 'Bell' },
    { char: '🔕', category: 'symbols', name: 'Bell with Slash' },
    { char: '📣', category: 'symbols', name: 'Megaphone' },
    { char: '📢', category: 'symbols', name: 'Loudspeaker' },
    { char: '👁️‍🗨️', category: 'symbols', name: 'Eye in Speech Bubble' },
    { char: '💬', category: 'symbols', name: 'Speech Balloon' },
    { char: '💭', category: 'symbols', name: 'Thought Balloon' },
    { char: '🗯️', category: 'symbols', name: 'Right Anger Bubble' },
    { char: '♠️', category: 'symbols', name: 'Spade Suit' },
    { char: '♣️', category: 'symbols', name: 'Club Suit' },
    { char: '♥️', category: 'symbols', name: 'Heart Suit' },
    { char: '♦️', category: 'symbols', name: 'Diamond Suit' },
    { char: '🃏', category: 'symbols', name: 'Joker' },
    { char: '🎴', category: 'symbols', name: 'Flower Playing Cards' },
    { char: '🀄️', category: 'symbols', name: 'Mahjong Red Dragon' },

    { char: '🇦', category: 'symbols', name: 'A' },
    { char: '🇧', category: 'symbols', name: 'B' },
    { char: '🇨', category: 'symbols', name: 'C' },
    { char: '🇩', category: 'symbols', name: 'D' },
    { char: '🇪', category: 'symbols', name: 'E' },
    { char: '🇫', category: 'symbols', name: 'F' },
    { char: '🇬', category: 'symbols', name: 'G' },
    { char: '🇭', category: 'symbols', name: 'H' },
    { char: '🇮', category: 'symbols', name: 'I' },
    { char: '🇯', category: 'symbols', name: 'J' },
    { char: '🇰', category: 'symbols', name: 'K' },
    { char: '🇱', category: 'symbols', name: 'L' },
    { char: '🇲', category: 'symbols', name: 'M' },
    { char: '🇳', category: 'symbols', name: 'N' },
    { char: '🇴', category: 'symbols', name: 'O' },
    { char: '🇵', category: 'symbols', name: 'P' },
    { char: '🇶', category: 'symbols', name: 'Q' },
    { char: '🇷', category: 'symbols', name: 'R' },
    { char: '🇸', category: 'symbols', name: 'S' },
    { char: '🇹', category: 'symbols', name: 'T' },
    { char: '🇺', category: 'symbols', name: 'U' },
    { char: '🇻', category: 'symbols', name: 'V' },
    { char: '🇼', category: 'symbols', name: 'W' },
    { char: '🇽', category: 'symbols', name: 'X' },
    { char: '🇾', category: 'symbols', name: 'Y' },
    { char: '🇿', category: 'symbols', name: 'Z' },

    { char: '⌚', category: 'symbols', name: 'Watch' },
    { char: '🕐', category: 'symbols', name: 'One O’Clock' },
    { char: '🕑', category: 'symbols', name: 'Two O’Clock' },
    { char: '🕒', category: 'symbols', name: 'Three O’Clock' },
    { char: '🕓', category: 'symbols', name: 'Four O’Clock' },
    { char: '🕔', category: 'symbols', name: 'Five O’Clock' },
    { char: '🕕', category: 'symbols', name: 'Six O’Clock' },
    { char: '🕖', category: 'symbols', name: 'Seven O’Clock' },
    { char: '🕗', category: 'symbols', name: 'Eight O’Clock' },
    { char: '🕘', category: 'symbols', name: 'Nine O’Clock' },
    { char: '🕙', category: 'symbols', name: 'Ten O’Clock' },
    { char: '🕚', category: 'symbols', name: 'Eleven O’Clock' },
    { char: '🕛', category: 'symbols', name: 'Twelve O’Clock' },
    { char: '🕜', category: 'symbols', name: 'One-Thirty' },
    { char: '🕝', category: 'symbols', name: 'Two-Thirty' },
    { char: '🕞', category: 'symbols', name: 'Three-Thirty' },
    { char: '🕟', category: 'symbols', name: 'Four-Thirty' },
    { char: '🕠', category: 'symbols', name: 'Five-Thirty' },
    { char: '🕡', category: 'symbols', name: 'Six-Thirty' },
    { char: '🕢', category: 'symbols', name: 'Seven-Thirty' },
    { char: '🕣', category: 'symbols', name: 'Eight-Thirty' },
    { char: '🕤', category: 'symbols', name: 'Nine-Thirty' },
    { char: '🕥', category: 'symbols', name: 'Ten-Thirty' },
    { char: '🕦', category: 'symbols', name: 'Eleven-Thirty' },
    { char: '🕧', category: 'symbols', name: 'Twelve-Thirty' },

    // Flags

    { char: '🏳️', category: 'flags', name: 'White Flag' },
    { char: '🏴', category: 'flags', name: 'Black Flag' },
    { char: '🏁', category: 'flags', name: 'Chequered Flag' },
    { char: '🚩', category: 'flags', name: 'Triangular Flag' },
    { char: '🏳️‍🌈', category: 'flags', name: 'Rainbow Flag' },
    { char: '🏴‍☠️', category: 'flags', name: 'Pirate Flag' },
    { char: '🎌', category: 'flags', name: 'Crossed Flags' },
    { char: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', category: 'flags', name: 'England Flag' },
    { char: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', category: 'flags', name: 'Scotland Flag' },
    { char: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', category: 'flags', name: 'Wales Flag' },

    // Country Flags (Länderflaggen)

    { char: '🇦🇨', category: 'flags', name: 'Ascension Island' },
    { char: '🇦🇩', category: 'flags', name: 'Andorra' },
    { char: '🇦🇪', category: 'flags', name: 'United Arab Emirates' },
    { char: '🇦🇫', category: 'flags', name: 'Afghanistan' },
    { char: '🇦🇬', category: 'flags', name: 'Antigua & Barbuda' },
    { char: '🇦🇮', category: 'flags', name: 'Anguilla' },
    { char: '🇦🇱', category: 'flags', name: 'Albania' },
    { char: '🇦🇲', category: 'flags', name: 'Armenia' },
    { char: '🇦🇴', category: 'flags', name: 'Angola' },
    { char: '🇦🇶', category: 'flags', name: 'Antarctica' },
    { char: '🇦🇷', category: 'flags', name: 'Argentina' },
    { char: '🇦🇸', category: 'flags', name: 'American Samoa' },
    { char: '🇦🇹', category: 'flags', name: 'Austria' },
    { char: '🇦🇺', category: 'flags', name: 'Australia' },
    { char: '🇦🇼', category: 'flags', name: 'Aruba' },
    { char: '🇦🇽', category: 'flags', name: 'Åland Islands' },
    { char: '🇦🇿', category: 'flags', name: 'Azerbaijan' },
    { char: '🇧🇦', category: 'flags', name: 'Bosnia & Herzegovina' },
    { char: '🇧🇧', category: 'flags', name: 'Barbados' },
    { char: '🇧🇩', category: 'flags', name: 'Bangladesh' },
    { char: '🇧🇪', category: 'flags', name: 'Belgium' },
    { char: '🇧🇫', category: 'flags', name: 'Burkina Faso' },
    { char: '🇧🇬', category: 'flags', name: 'Bulgaria' },
    { char: '🇧🇭', category: 'flags', name: 'Bahrain' },
    { char: '🇧🇮', category: 'flags', name: 'Burundi' },
    { char: '🇧🇯', category: 'flags', name: 'Benin' },
    { char: '🇧🇱', category: 'flags', name: 'St. Barthélemy' },
    { char: '🇧🇲', category: 'flags', name: 'Bermuda' },
    { char: '🇧🇳', category: 'flags', name: 'Brunei' },
    { char: '🇧🇴', category: 'flags', name: 'Bolivia' },
    { char: '🇧🇶', category: 'flags', name: 'Caribbean Netherlands' },
    { char: '🇧🇷', category: 'flags', name: 'Brazil' },
    { char: '🇧🇸', category: 'flags', name: 'Bahamas' },
    { char: '🇧🇹', category: 'flags', name: 'Bhutan' },
    { char: '🇧🇻', category: 'flags', name: 'Bouvet Island' },
    { char: '🇧🇼', category: 'flags', name: 'Botswana' },
    { char: '🇧🇾', category: 'flags', name: 'Belarus' },
    { char: '🇧🇿', category: 'flags', name: 'Belize' },
    { char: '🇨🇦', category: 'flags', name: 'Canada' },
    { char: '🇨🇨', category: 'flags', name: 'Cocos (Keeling) Islands' },
    { char: '🇨🇩', category: 'flags', name: 'Congo - Kinshasa' },
    { char: '🇨🇫', category: 'flags', name: 'Central African Republic' },
    { char: '🇨🇬', category: 'flags', name: 'Congo - Brazzaville' },
    { char: '🇨🇭', category: 'flags', name: 'Switzerland' },
    { char: '🇨🇮', category: 'flags', name: 'Côte d’Ivoire' },
    { char: '🇨🇰', category: 'flags', name: 'Cook Islands' },
    { char: '🇨🇱', category: 'flags', name: 'Chile' },
    { char: '🇨🇲', category: 'flags', name: 'Cameroon' },
    { char: '🇨🇳', category: 'flags', name: 'China' },
    { char: '🇨🇴', category: 'flags', name: 'Colombia' },
    { char: '🇨🇵', category: 'flags', name: 'Clipperton Island' },
    { char: '🇨🇶', category: 'flags', name: 'Sark' },
    { char: '🇨🇷', category: 'flags', name: 'Costa Rica' },
    { char: '🇨🇺', category: 'flags', name: 'Cuba' },
    { char: '🇨🇻', category: 'flags', name: 'Cape Verde' },
    { char: '🇨🇼', category: 'flags', name: 'Curaçao' },
    { char: '🇨🇽', category: 'flags', name: 'Christmas Island' },
    { char: '🇨🇾', category: 'flags', name: 'Cyprus' },
    { char: '🇨🇿', category: 'flags', name: 'Czechia' },
    { char: '🇩🇪', category: 'flags', name: 'Germany' },
    { char: '🇩🇬', category: 'flags', name: 'Diego Garcia' },
    { char: '🇩🇯', category: 'flags', name: 'Djibouti' },
    { char: '🇩🇰', category: 'flags', name: 'Denmark' },
    { char: '🇩🇲', category: 'flags', name: 'Dominica' },
    { char: '🇩🇴', category: 'flags', name: 'Dominican Republic' },
    { char: '🇩🇿', category: 'flags', name: 'Algeria' },
    { char: '🇪🇦', category: 'flags', name: 'Ceuta & Melilla' },
    { char: '🇪🇨', category: 'flags', name: 'Ecuador' },
    { char: '🇪🇪', category: 'flags', name: 'Estonia' },
    { char: '🇪🇬', category: 'flags', name: 'Egypt' },
    { char: '🇪🇭', category: 'flags', name: 'Western Sahara' },
    { char: '🇪🇷', category: 'flags', name: 'Eritrea' },
    { char: '🇪🇸', category: 'flags', name: 'Spain' },
    { char: '🇪🇹', category: 'flags', name: 'Ethiopia' },
    { char: '🇪🇺', category: 'flags', name: 'European Union' },
    { char: '🇫🇮', category: 'flags', name: 'Finland' },
    { char: '🇫🇯', category: 'flags', name: 'Fiji' },
    { char: '🇫🇰', category: 'flags', name: 'Falkland Islands' },
    { char: '🇫🇲', category: 'flags', name: 'Micronesia' },
    { char: '🇫🇴', category: 'flags', name: 'Faroe Islands' },
    { char: '🇫🇷', category: 'flags', name: 'France' },
    { char: '🇬🇦', category: 'flags', name: 'Gabon' },
    { char: '🇬🇧', category: 'flags', name: 'United Kingdom' },
    { char: '🇬🇩', category: 'flags', name: 'Grenada' },
    { char: '🇬🇪', category: 'flags', name: 'Georgia' },
    { char: '🇬🇫', category: 'flags', name: 'French Guiana' },
    { char: '🇬🇬', category: 'flags', name: 'Guernsey' },
    { char: '🇬🇭', category: 'flags', name: 'Ghana' },
    { char: '🇬🇮', category: 'flags', name: 'Gibraltar' },
    { char: '🇬🇱', category: 'flags', name: 'Greenland' },
    { char: '🇬🇲', category: 'flags', name: 'Gambia' },
    { char: '🇬🇳', category: 'flags', name: 'Guinea' },
    { char: '🇬🇵', category: 'flags', name: 'Guadeloupe' },
    { char: '🇬🇶', category: 'flags', name: 'Equatorial Guinea' },
    { char: '🇬🇷', category: 'flags', name: 'Greece' },
    { char: '🇬🇸', category: 'flags', name: 'South Georgia & South Sandwich Islands' },
    { char: '🇬🇹', category: 'flags', name: 'Guatemala' },
    { char: '🇬🇺', category: 'flags', name: 'Guam' },
    { char: '🇬🇼', category: 'flags', name: 'Guinea-Bissau' },
    { char: '🇬🇾', category: 'flags', name: 'Guyana' },
    { char: '🇭🇰', category: 'flags', name: 'Hong Kong SAR China' },
    { char: '🇭🇲', category: 'flags', name: 'Heard & McDonald Islands' },
    { char: '🇭🇳', category: 'flags', name: 'Honduras' },
    { char: '🇭🇷', category: 'flags', name: 'Croatia' },
    { char: '🇭🇹', category: 'flags', name: 'Haiti' },
    { char: '🇭🇺', category: 'flags', name: 'Hungary' },
    { char: '🇮🇨', category: 'flags', name: 'Canary Islands' },
    { char: '🇮🇩', category: 'flags', name: 'Indonesia' },
    { char: '🇮🇪', category: 'flags', name: 'Ireland' },
    { char: '🇮🇱', category: 'flags', name: 'Israel' },
    { char: '🇮🇲', category: 'flags', name: 'Isle of Man' },
    { char: '🇮🇳', category: 'flags', name: 'India' },
    { char: '🇮🇴', category: 'flags', name: 'British Indian Ocean Territory' },
    { char: '🇮🇶', category: 'flags', name: 'Iraq' },
    { char: '🇮🇷', category: 'flags', name: 'Iran' },
    { char: '🇮🇸', category: 'flags', name: 'Iceland' },
    { char: '🇮🇹', category: 'flags', name: 'Italy' },
    { char: '🇯🇪', category: 'flags', name: 'Jersey' },
    { char: '🇯🇲', category: 'flags', name: 'Jamaica' },
    { char: '🇯🇴', category: 'flags', name: 'Jordan' },
    { char: '🇯🇵', category: 'flags', name: 'Japan' },
    { char: '🇰🇪', category: 'flags', name: 'Kenya' },
    { char: '🇰🇬', category: 'flags', name: 'Kyrgyzstan' },
    { char: '🇰🇭', category: 'flags', name: 'Cambodia' },
    { char: '🇰🇮', category: 'flags', name: 'Kiribati' },
    { char: '🇰🇲', category: 'flags', name: 'Comoros' },
    { char: '🇰🇳', category: 'flags', name: 'St. Kitts & Nevis' },
    { char: '🇰🇵', category: 'flags', name: 'North Korea' },
    { char: '🇰🇷', category: 'flags', name: 'South Korea' },
    { char: '🇰🇼', category: 'flags', name: 'Kuwait' },
    { char: '🇰🇾', category: 'flags', name: 'Cayman Islands' },
    { char: '🇰🇿', category: 'flags', name: 'Kazakhstan' },
    { char: '🇱🇦', category: 'flags', name: 'Laos' },
    { char: '🇱🇧', category: 'flags', name: 'Lebanon' },
    { char: '🇱🇨', category: 'flags', name: 'St. Lucia' },
    { char: '🇱🇮', category: 'flags', name: 'Liechtenstein' },
    { char: '🇱🇰', category: 'flags', name: 'Sri Lanka' },
    { char: '🇱🇷', category: 'flags', name: 'Liberia' },
    { char: '🇱🇸', category: 'flags', name: 'Lesotho' },
    { char: '🇱🇹', category: 'flags', name: 'Lithuania' },
    { char: '🇱🇺', category: 'flags', name: 'Luxembourg' },
    { char: '🇱🇻', category: 'flags', name: 'Latvia' },
    { char: '🇱🇾', category: 'flags', name: 'Libya' },
    { char: '🇲🇦', category: 'flags', name: 'Morocco' },
    { char: '🇲🇨', category: 'flags', name: 'Monaco' },
    { char: '🇲🇩', category: 'flags', name: 'Moldova' },
    { char: '🇲🇪', category: 'flags', name: 'Montenegro' },
    { char: '🇲🇫', category: 'flags', name: 'St. Martin' },
    { char: '🇹🇼', category: 'flags', name: 'Taiwan' },
    { char: '🇲🇬', category: 'flags', name: 'Madagascar' },
    { char: '🇲🇭', category: 'flags', name: 'Marshall Islands' },
    { char: '🇲🇰', category: 'flags', name: 'North Macedonia' },
    { char: '🇲🇱', category: 'flags', name: 'Mali' },
    { char: '🇲🇲', category: 'flags', name: 'Myanmar (Burma)' },
    { char: '🇲🇳', category: 'flags', name: 'Mongolia' },
    { char: '🇲🇴', category: 'flags', name: 'Macao SAR China' },
    { char: '🇲🇵', category: 'flags', name: 'Northern Mariana Islands' },
    { char: '🇲🇶', category: 'flags', name: 'Martinique' },
    { char: '🇲🇷', category: 'flags', name: 'Mauritania' },
    { char: '🇲🇸', category: 'flags', name: 'Montserrat' },
    { char: '🇲🇹', category: 'flags', name: 'Malta' },
    { char: '🇲🇺', category: 'flags', name: 'Mauritius' },
    { char: '🇲🇻', category: 'flags', name: 'Maldives' },
    { char: '🇲🇼', category: 'flags', name: 'Malawi' },
    { char: '🇲🇽', category: 'flags', name: 'Mexico' },
    { char: '🇲🇾', category: 'flags', name: 'Malaysia' },
    { char: '🇲🇿', category: 'flags', name: 'Mozambique' },
    { char: '🇳🇦', category: 'flags', name: 'Namibia' },
    { char: '🇳🇨', category: 'flags', name: 'New Caledonia' },
    { char: '🇳🇪', category: 'flags', name: 'Niger' },
    { char: '🇳🇫', category: 'flags', name: 'Norfolk Island' },
    { char: '🇳🇬', category: 'flags', name: 'Nigeria' },
    { char: '🇳🇮', category: 'flags', name: 'Nicaragua' },
    { char: '🇳🇱', category: 'flags', name: 'Netherlands' },
    { char: '🇳🇴', category: 'flags', name: 'Norway' },
    { char: '🇳🇵', category: 'flags', name: 'Nepal' },
    { char: '🇳🇷', category: 'flags', name: 'Nauru' },
    { char: '🇳🇺', category: 'flags', name: 'Niue' },
    { char: '🇳🇿', category: 'flags', name: 'New Zealand' },
    { char: '🇴🇲', category: 'flags', name: 'Oman' },
    { char: '🇵🇦', category: 'flags', name: 'Panama' },
    { char: '🇵🇪', category: 'flags', name: 'Peru' },
    { char: '🇵🇫', category: 'flags', name: 'French Polynesia' },
    { char: '🇵🇬', category: 'flags', name: 'Papua New Guinea' },
    { char: '🇵🇭', category: 'flags', name: 'Philippines' },
    { char: '🇵🇰', category: 'flags', name: 'Pakistan' },
    { char: '🇵🇱', category: 'flags', name: 'Poland' },
    { char: '🇵🇲', category: 'flags', name: 'St. Pierre & Miquelon' },
    { char: '🇵🇳', category: 'flags', name: 'Pitcairn Islands' },
    { char: '🇵🇷', category: 'flags', name: 'Puerto Rico' },
    { char: '🇵🇸', category: 'flags', name: 'Palestinian Territories' },
    { char: '🇵🇹', category: 'flags', name: 'Portugal' },
    { char: '🇵🇼', category: 'flags', name: 'Palau' },
    { char: '🇵🇾', category: 'flags', name: 'Paraguay' },
    { char: '🇶🇦', category: 'flags', name: 'Qatar' },
    { char: '🇷🇪', category: 'flags', name: 'Réunion' },
    { char: '🇷🇴', category: 'flags', name: 'Romania' },
    { char: '🇷🇸', category: 'flags', name: 'Serbia' },
    { char: '🇷🇺', category: 'flags', name: 'Russia' },
    { char: '🇷🇼', category: 'flags', name: 'Rwanda' },
    { char: '🇸🇦', category: 'flags', name: 'Saudi Arabia' },
    { char: '🇸🇧', category: 'flags', name: 'Solomon Islands' },
    { char: '🇸🇨', category: 'flags', name: 'Seychelles' },
    { char: '🇸🇩', category: 'flags', name: 'Sudan' },
    { char: '🇸🇪', category: 'flags', name: 'Sweden' },
    { char: '🇸🇬', category: 'flags', name: 'Singapore' },
    { char: '🇸🇭', category: 'flags', name: 'St. Helena' },
    { char: '🇸🇮', category: 'flags', name: 'Slovenia' },
    { char: '🇸🇯', category: 'flags', name: 'Svalbard & Jan Mayen' },
    { char: '🇸🇰', category: 'flags', name: 'Slovakia' },
    { char: '🇸🇱', category: 'flags', name: 'Sierra Leone' },
    { char: '🇸🇲', category: 'flags', name: 'San Marino' },
    { char: '🇸🇳', category: 'flags', name: 'Senegal' },
    { char: '🇸🇴', category: 'flags', name: 'Somalia' },
    { char: '🇸🇷', category: 'flags', name: 'Suriname' },
    { char: '🇸🇸', category: 'flags', name: 'South Sudan' },
    { char: '🇸🇹', category: 'flags', name: 'São Tomé & Príncipe' },
    { char: '🇸🇻', category: 'flags', name: 'El Salvador' },
    { char: '🇸🇽', category: 'flags', name: 'Sint Maarten' },
    { char: '🇸🇾', category: 'flags', name: 'Syria' },
    { char: '🇸🇿', category: 'flags', name: 'Eswatini' },
    { char: '🇹🇦', category: 'flags', name: 'Tristan da Cunha' },
    { char: '🇹🇨', category: 'flags', name: 'Turks & Caicos Islands' },
    { char: '🇹🇩', category: 'flags', name: 'Chad' },
    { char: '🇹🇫', category: 'flags', name: 'French Southern Territories' },
    { char: '🇹🇬', category: 'flags', name: 'Togo' },
    { char: '🇹🇭', category: 'flags', name: 'Thailand' },
    { char: '🇹🇯', category: 'flags', name: 'Tajikistan' },
    { char: '🇹🇰', category: 'flags', name: 'Tokelau' },
    { char: '🇹🇱', category: 'flags', name: 'Timor-Leste' },
    { char: '🇹🇲', category: 'flags', name: 'Turkmenistan' },
    { char: '🇹🇳', category: 'flags', name: 'Tunisia' },
    { char: '🇹🇴', category: 'flags', name: 'Tonga' },
    { char: '🇹🇷', category: 'flags', name: 'Turkey' },
    { char: '🇹🇹', category: 'flags', name: 'Trinidad & Tobago' },
    { char: '🇹🇻', category: 'flags', name: 'Tuvalu' },
    { char: '🇹🇿', category: 'flags', name: 'Tanzania' },
    { char: '🇺🇦', category: 'flags', name: 'Ukraine' },
    { char: '🇺🇬', category: 'flags', name: 'Uganda' },
    { char: '🇺🇲', category: 'flags', name: 'U.S. Outlying Islands' },
    { char: '🇺🇳', category: 'flags', name: 'United Nations' },
    { char: '🇺🇸', category: 'flags', name: 'United States' },
    { char: '🇺🇾', category: 'flags', name: 'Uruguay' },
    { char: '🇺🇿', category: 'flags', name: 'Uzbekistan' },
    { char: '🇻🇦', category: 'flags', name: 'Vatican City' },
    { char: '🇻🇨', category: 'flags', name: 'St. Vincent & Grenadines' },
    { char: '🇻🇪', category: 'flags', name: 'Venezuela' },
    { char: '🇻🇬', category: 'flags', name: 'British Virgin Islands' },
    { char: '🇻🇮', category: 'flags', name: 'U.S. Virgin Islands' },
    { char: '🇻🇳', category: 'flags', name: 'Vietnam' },
    { char: '🇻🇺', category: 'flags', name: 'Vanuatu' },
    { char: '🇼🇫', category: 'flags', name: 'Wallis & Futuna' },
    { char: '🇼🇸', category: 'flags', name: 'Samoa' },
    { char: '🇽🇰', category: 'flags', name: 'Kosovo' },
    { char: '🇾🇪', category: 'flags', name: 'Yemen' },
    { char: '🇾🇹', category: 'flags', name: 'Mayotte' },
    { char: '🇿🇦', category: 'flags', name: 'South Africa' },
    { char: '🇿🇲', category: 'flags', name: 'Zambia' },
    { char: '🇿🇼', category: 'flags', name: 'Zimbabwe' },

        // Dekorative Symbole
    { char: '㋡', category: 'decorative', name: 'Circled Katakana Tu' },
    { char: '®', category: 'decorative', name: 'Registered' },
    { char: '©', category: 'decorative', name: 'Copyright' },
    { char: '™', category: 'decorative', name: 'Trademark' },
    { char: '«', category: 'decorative', name: 'Left Double Angle Quote' },
    { char: '»', category: 'decorative', name: 'Right Double Angle Quote' },
    { char: '№', category: 'decorative', name: 'Numero Sign' },
    { char: 'ღ', category: 'decorative', name: 'Georgian Letter Ghan' },
    { char: '♡', category: 'decorative', name: 'White Heart Suit' },
    { char: 'წ', category: 'decorative', name: 'Georgian Letter Cil' },
    { char: '❥', category: 'decorative', name: 'Rotated Heavy Black Heart Bullet' },
    { char: '❣', category: 'decorative', name: 'Heavy Heart Exclamation' },
    { char: '۝', category: 'decorative', name: 'Arabic End of Ayah' },
    { char: '۞', category: 'decorative', name: 'Arabic Start of Rub El Hizb' },
    { char: '۩', category: 'decorative', name: 'Arabic Place of Sajdah' },
    { char: '♂', category: 'decorative', name: 'Male Sign' },
    { char: '♀', category: 'decorative', name: 'Female Sign' },
    { char: '∆', category: 'decorative', name: 'Increment' },
    { char: '∇', category: 'decorative', name: 'Nabla' },
    { char: '〓', category: 'decorative', name: 'Geta Mark' },
    { char: '☼', category: 'decorative', name: 'White Sun with Rays' },
    { char: '☂', category: 'decorative', name: 'Umbrella' },
    { char: '♪', category: 'decorative', name: 'Eighth Note' },
    { char: '♫', category: 'decorative', name: 'Beamed Eighth Notes' },
    { char: '✝', category: 'decorative', name: 'Latin Cross' },
    { char: '✪', category: 'decorative', name: 'Circled White Star' },
    { char: '✱', category: 'decorative', name: 'Heavy Asterisk' },
    { char: '✿', category: 'decorative', name: 'Black Florette' },
    { char: '❀', category: 'decorative', name: 'White Florette' },
    { char: '屮', category: 'decorative', name: 'Arabic Ligature Seen with Jeem' },
    { char: '✎', category: 'decorative', name: 'Lower Right Pencil' },
    { char: '░', category: 'decorative', name: 'Light Shade' },
    { char: '▒', category: 'decorative', name: 'Medium Shade' },
    { char: '▓', category: 'decorative', name: 'Dark Shade' },
    { char: '█', category: 'decorative', name: 'Full Block' },
    { char: '▌', category: 'decorative', name: 'Left Half Block' },
    { char: '❘', category: 'decorative', name: 'Light Vertical Bar' },
    { char: '中', category: 'decorative', name: 'CJK Middle' },
    { char: '食', category: 'decorative', name: 'CJK Eat' },
    { char: '҈', category: 'decorative', name: 'Combining Cyrillic Titlo' },
    { char: 'ｼ', category: 'decorative', name: 'Halfwidth Katakana Si' },
    { char: 'ㇱ', category: 'decorative', name: 'Katakana Letter Si' },
    { char: '☋', category: 'decorative', name: 'Descending Node' },
    { char: '︵', category: 'decorative', name: 'Presentation Form for Vertical Left Parenthesis' },
    { char: '︶', category: 'decorative', name: 'Presentation Form for Vertical Right Parenthesis' },
    { char: '︽', category: 'decorative', name: 'Presentation Form for Vertical Left Double Angle Bracket' },
    { char: '︾', category: 'decorative', name: 'Presentation Form for Vertical Right Double Angle Bracket' },
    { char: '︿', category: 'decorative', name: 'Presentation Form for Vertical Left Corner Bracket' },
    { char: '﹀', category: 'decorative', name: 'Presentation Form for Vertical Right Corner Bracket' },
    { char: '〘', category: 'decorative', name: 'Left White Tortoise Shell Bracket' },
    { char: '〙', category: 'decorative', name: 'Right White Tortoise Shell Bracket' },
    { char: '〚', category: 'decorative', name: 'Left White Square Bracket' },
    { char: '〛', category: 'decorative', name: 'Right White Square Bracket' },
    { char: '《', category: 'decorative', name: 'Left Double Angle Bracket' },
    { char: '》', category: 'decorative', name: 'Right Double Angle Bracket' },
    { char: '｟', category: 'decorative', name: 'Fullwidth Left White Parenthesis' },
    { char: '｠', category: 'decorative', name: 'Fullwidth Right White Parenthesis' },
    { char: '【', category: 'decorative', name: 'Left Black Lenticular Bracket' },
    { char: '】', category: 'decorative', name: 'Right Black Lenticular Bracket' },
    { char: '〔', category: 'decorative', name: 'Left Tortoise Shell Bracket' },
    { char: '〕', category: 'decorative', name: 'Right Tortoise Shell Bracket' },
    { char: '〖', category: 'decorative', name: 'Left White Lenticular Bracket' },
    { char: '〗', category: 'decorative', name: 'Right White Lenticular Bracket' },
    { char: '〄', category: 'decorative', name: 'Japanese Industrial Standard Symbol' },
    { char: '々', category: 'decorative', name: 'CJK Iteration Mark' },
    { char: '➨', category: 'decorative', name: 'Heavy Concave-Pointed Black Rightwards Arrow' },
    { char: '➲', category: 'decorative', name: 'Circled Heavy White Rightwards Arrow' },
    { char: '➜', category: 'decorative', name: 'Heavy Round-Tipped Rightwards Arrow' },
    { char: '➢', category: 'decorative', name: 'Three-D Top-Lighted Rightwards Arrowhead' },
    { char: '『', category: 'decorative', name: 'Left White Corner Bracket' },
    { char: '』', category: 'decorative', name: 'Right White Corner Bracket' },
    { char: '〠', category: 'decorative', name: 'Postal Mark Face' },
    { char: '〣', category: 'decorative', name: 'Hangzhou Numeral Three' },
    { char: '✽', category: 'decorative', name: 'Heavy Teardrop-Spoked Asterisk' },
    { char: '✻', category: 'decorative', name: 'Heavy Eight Teardrop-Spoked Propeller Asterisk' },
    { char: '✸', category: 'decorative', name: 'Heavy Eight Pointed Rectilinear Black Star' },
    { char: '✡', category: 'decorative', name: 'Star of David' },
    { char: '♞', category: 'decorative', name: 'Black Chess Knight' },
    { char: '♘', category: 'decorative', name: 'White Chess Knight' },
    { char: '♜', category: 'decorative', name: 'Black Chess Rook' },
    { char: '♖', category: 'decorative', name: 'White Chess Rook' },
    { char: '♛', category: 'decorative', name: 'Black Chess Queen' },
    { char: '♕', category: 'decorative', name: 'White Chess Queen' },
    { char: '➀', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit One' },
    { char: '➁', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Two' },
    { char: '➂', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Three' },
    { char: '➃', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Four' },
    { char: '➄', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Five' },
    { char: '➅', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Six' },
    { char: '➆', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Seven' },
    { char: '➇', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Eight' },
    { char: '➈', category: 'decorative', name: 'Dingbat Circled Sans-Serif Digit Nine' },
    { char: '➊', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit One' },
    { char: '➋', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Two' },
    { char: '➌', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Three' },
    { char: '➍', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Four' },
    { char: '➎', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Five' },
    { char: '➏', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Six' },
    { char: '➐', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Seven' },
    { char: '➑', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Eight' },
    { char: '➒', category: 'decorative', name: 'Dingbat Negative Circled Sans-Serif Digit Nine' },
    { char: '☃', category: 'decorative', name: 'Snowman' },
    { char: '☄', category: 'decorative', name: 'Comet' },
    { char: '☎', category: 'decorative', name: 'Black Telephone' },
    { char: '☑', category: 'decorative', name: 'Ballot Box with Check' },
    { char: '☒', category: 'decorative', name: 'Ballot Box with X' },
    { char: '☠', category: 'decorative', name: 'Skull and Crossbones' },
    { char: '☢', category: 'decorative', name: 'Radioactive Sign' },
    { char: '☣', category: 'decorative', name: 'Biohazard Sign' },
    { char: '☨', category: 'decorative', name: 'Cross of Lorraine' },
    { char: '☩', category: 'decorative', name: 'Cross of Jerusalem' },
    { char: '☪', category: 'decorative', name: 'Star and Crescent' },
    { char: '☫', category: 'decorative', name: 'Farsi Symbol' },
    { char: '☬', category: 'decorative', name: 'Adi Shakti' },
    { char: '☭', category: 'decorative', name: 'Hammer and Sickle' },
    { char: '☮', category: 'decorative', name: 'Peace Symbol' },
    { char: '☯', category: 'decorative', name: 'Yin Yang' },
    { char: '✓', category: 'decorative', name: 'Check Mark' },
    { char: '✖', category: 'decorative', name: 'Heavy Multiplication X' },
    { char: '✗', category: 'decorative', name: 'Ballot X' },
    { char: '✜', category: 'decorative', name: 'Heavy Open Centre Cross' },
    { char: '✯', category: 'decorative', name: 'Pinwheel Star' },
    { char: '✰', category: 'decorative', name: 'Shadowed White Star' },
    { char: '✲', category: 'decorative', name: 'Black Centre White Star' },
    { char: '✴', category: 'decorative', name: 'Eight Pointed Black Star' },
    { char: '✵', category: 'decorative', name: 'Eight Pointed Pinwheel Star' },
    { char: '✶', category: 'decorative', name: 'Six Pointed Black Star' },
    { char: '❁', category: 'decorative', name: 'Eight Petalled Outlined Black Florette' },
    { char: '❂', category: 'decorative', name: 'Eight Pointed Star with Open Centre' },
    { char: '❃', category: 'decorative', name: 'Heavy Chevron Snowflake' },
    { char: '❅', category: 'decorative', name: 'Tight Trifoliate Snowflake' },
    { char: '❆', category: 'decorative', name: 'Heavy Chevron Snowflake' },
    { char: '❇', category: 'decorative', name: 'Sparkle' },
    { char: '❈', category: 'decorative', name: 'Heavy Sparkle' },
    { char: '❊', category: 'decorative', name: 'Heavy Eight Teardrop-Spoked Propeller Asterisk' },
    { char: '❋', category: 'decorative', name: 'Heavy Eight Pointed Rectilinear Black Star' },
    { char: '❢', category: 'decorative', name: 'Heavy Heart Exclamation Mark Ornament' },
    { char: '❦', category: 'decorative', name: 'Floral Heart' },
    { char: '჻', category: 'decorative', name: 'Georgian Paragraph Separator' },
    { char: '⁂', category: 'decorative', name: 'Asterism' },
    { char: '҂', category: 'decorative', name: 'Cyrillic Thousands Sign' },
    { char: '‰', category: 'decorative', name: 'Per Mille Sign' },
    { char: '♅', category: 'decorative', name: 'Uranus' },
    { char: '♆', category: 'decorative', name: 'Neptune' },

    // Pfeile (arrows)
    { char: '⇄', category: 'arrows', name: 'Rightwards Arrow Over Leftwards Arrow' },
    { char: '⇅', category: 'arrows', name: 'Upwards Arrow Leftwards of Downwards Arrow' },
    { char: '⇆', category: 'arrows', name: 'Leftwards Arrow Over Rightwards Arrow' },
    { char: '↺', category: 'arrows', name: 'Anticlockwise Open Circle Arrow' },
    { char: '↻', category: 'arrows', name: 'Clockwise Open Circle Arrow' },
    { char: '↣', category: 'arrows', name: 'Rightwards Arrow with Tail' },
    { char: '↤', category: 'arrows', name: 'Leftwards Arrow with Tail' },
    { char: '↥', category: 'arrows', name: 'Upwards Arrow with Tail' },
    { char: '↦', category: 'arrows', name: 'Rightwards Arrow from Bar' },
    { char: '↧', category: 'arrows', name: 'Downwards Arrow from Bar' },
    { char: '↰', category: 'arrows', name: 'Upwards Arrow with Tip Leftwards' },
    { char: '↱', category: 'arrows', name: 'Upwards Arrow with Tip Rightwards' },
    { char: '↲', category: 'arrows', name: 'Downwards Arrow with Tip Leftwards' },
    { char: '↳', category: 'arrows', name: 'Downwards Arrow with Tip Rightwards' },
    { char: '↴', category: 'arrows', name: 'Rightwards Arrow with Corner Downwards' },
    { char: '↵', category: 'arrows', name: 'Downwards Arrow with Corner Leftwards' },

    // Formen (shapes)
    { char: '◣', category: 'shapes', name: 'Black Lower Right Triangle' },
    { char: '◢', category: 'shapes', name: 'Black Lower Left Triangle' },
    { char: '◤', category: 'shapes', name: 'Black Upper Left Triangle' },
    { char: '◥', category: 'shapes', name: 'Black Upper Right Triangle' },
    { char: '◄', category: 'shapes', name: 'Black Left-Pointing Pointer' },
    { char: '►', category: 'shapes', name: 'Black Right-Pointing Pointer' },
    { char: '▼', category: 'shapes', name: 'Black Down-Pointing Triangle' },
    { char: '◄', category: 'shapes', name: 'Black Left-Pointing Pointer' },

    // Besondere Symbole (special)
    { char: '✔', category: 'special', name: 'Check Mark' },
    { char: '✘', category: 'special', name: 'Cross Mark' },
    { char: '⚠', category: 'special', name: 'Warning' },
    { char: '⚒', category: 'special', name: 'Hammer and Pick' },
    { char: '⚔', category: 'special', name: 'Crossed Swords' }, 
    { char: '🛡', category: 'special', name: 'Shield' },
    { char: '⚙', category: 'special', name: 'Gear' },

];

// Beispiel Texte
const exampleTexts = {
    de: {
        welcome: '§c❤ §6Willkommen §eauf §aunserem §bServer! §d❤',
        warning: '§4⚠ §cWarnung: §6§lKein §e§lGriefing §a§lerlaubt! §4⚠',
        rainbow: '§4R §6A §eI §aN §bB §dO §5W',
        secret: '§kGeheime §rNachricht §khier!'
    },
    en: {
        welcome: '§c❤ §6Welcome §eto §aour §bServer! §d❤',
        warning: '§4⚠ §cWarning: §6§lNo §e§lGriefing §a§lAllowed! §4⚠',
        rainbow: '§4R §6A §eI §aN §bB §dO §5W',
        secret: '§kSecret §rMessage §kHere!'
    }
};

// Banner Templates (Platzhalter {text} wird ersetzt)
const bannerTemplates = [
    { name: { de: 'Kein Banner', en: 'No Banner' }, template: "{text}" },
    { name: "▃▅▆▇", template: "▃▅▅▆▆▇▇ {text} ▇▇▆▆▅▅▃" },
    { name: "╔═╝Text╚═╗", template: "╔═╝{text}╚═╗" },
    { name: "⅛¼⅜", template: "⅛¼⅜½⅝¾⅞ {text} ⅞¾⅝½⅜¼⅛" },
    { name: "·¯¯¯·", template: "·¯¯¯¯¯¯¯¯¯¯¯¯¯  {text}  ¯¯¯¯¯¯¯¯¯¯¯¯¯·" },
    { name: "㋛ Smiley", template: "㋞ ㋛ ㋡  ♒ {text} ♒  ㋡ ㋛ ㋞" },
    { name: "(☀∫☀)", template: "(☀∫☀) {text} (☀∫☀)" },
    { name: { de: '⿱⿰ Blöcke', en: '⿱⿰ Blocks' }, template: "⿱⿰⿱⿰⿱⿰ {text} ⿱⿰⿱⿰⿱⿰" },
    { name: "◊◊◊≡", template: "◊◊◊◊≡  {text}  ≡◊◊◊◊" },
    { name: "父ж＊", template: "父ж＊ж父ж＊ {text} ＊ж父ж＊ж父" },
    { name: "►►♥", template: "►►►♥ {text} ♥◄◄◄" },
    { name: "Ξ※◎☆", template: "Ξ※◎☆★☆◎※Ξ  {text}  Ξ※◎☆★☆◎※Ξ" },
    { name: "▃▅▒▒▒", template: "▃▅▅▒▒▒ {text} ▒▒▒▅▅▄" },
    { name: "● (シ) ●", template: "● (シ) ● {text} ● (心) ●" },
    { name: "︿﹀︽︾", template: "︿﹀︽︾△︾︽  {text}  ︽︾△︾︽﹀︿" },
    { name: "╰╯╭╮", template: "╰╯╭╮╰╯╭╮╰╯  {text}  ╰╯╭╮╰╯╭╮╰╯" },
    { name: "ᄽ♥ᄿ", template: "ᄽ♥ᄿ  {text}  ᄽ♥ᄿ" },
    { name: "╠╬╬╬╬", template: "╠╬╬╬╬  {text}  ╬╬╬╬╣" },
    { name: "○╮╰❤╯╭○", template: "○╮╰❤╯╭○  {text}  ○╮╰☆╯╭○" },
    { name: "ஜஜஜ", template: "ஜஜஜ    {text}    ஜஜஜ" },
    { name: "llll•★•", template: "llll•★• {text} •★•lll" },
    { name: "₪۩۞۩₪", template: "₪۩۞۩₪ {text} ₪۩۞۩₪" },
    { name: "▀▄▀▄▀▄", template: "▀▄▀▄▀▄ {text} ▄▀▄▀▄▀" },
    { name: "..oo°°", template: "..oo°°{text}°°oo.." },
    { name: "*****", template: "***** {text} *****" }
];

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

function getLocalizedValue(value, fallback = '') {
    if (value && typeof value === 'object') {
        return value.de || value.en || fallback;
    }
    return value || fallback;
}

function getCurrentExampleTexts() {
    return exampleTexts.de;
}

function resolveEditionValue(value, edition) {
    if (value && typeof value === 'object') {
        return value[edition] || value.je || value.be || Object.values(value)[0];
    }
    return value;
}

function formatEditionValue(value) {
    if (value && typeof value === 'object') {
        const je = value.je || '-';
        const be = value.be || '-';
        return `JE ${je} / BE ${be}`;
    }
    return value || '-';
}

function getAnsiForCode(code) {
    const ansiMap = {
        '&0': '\\e[0;30m',
        '&1': '\\e[0;34m',
        '&2': '\\e[0;32m',
        '&3': '\\e[0;36m',
        '&4': '\\e[0;31m',
        '&5': '\\e[0;35m',
        '&6': '\\e[0;33m',
        '&7': '\\e[0;37m',
        '&8': '\\e[0;90m',
        '&9': '\\e[0;94m',
        '&a': '\\e[0;92m',
        '&b': '\\e[0;96m',
        '&c': '\\e[0;91m',
        '&d': '\\e[0;95m',
        '&e': '\\e[0;93m',
        '&f': '\\e[0;97m'
    };
    return ansiMap[code.toLowerCase()] || '-';
}

function getEditionLabel(edition) {
    if (edition === 'je') return t('color_badge_je');
    if (edition === 'be') return t('color_badge_be');
    return t('color_badge_both');
}

function colorVisibleForEdition(color, edition) {
    if (edition === 'je') return color.edition === 'both' || color.edition === 'je';
    return color.edition === 'both' || color.edition === 'be';
}

function getColorClassForCode(code, edition) {
    const c = code.toLowerCase();
    const jeColors = '0123456789abcdef';
    const jeFormats = 'klmnor';
    const beColors = '0123456789abcdefghijmnpqstuvw';
    const beFormats = 'klor';

    if (edition === 'je') {
        if (jeColors.includes(c) || jeFormats.includes(c)) return `mc-${c}`;
        return null;
    }

    if (edition === 'be') {
        if (beColors.includes(c)) {
            if (c === 'm') return 'mc-be-m';
            if (c === 'n') return 'mc-be-n';
            return `mc-${c}`;
        }
        if (beFormats.includes(c)) return `mc-${c}`;
        return null;
    }

    return null;
}

function setEditionMode(edition) {
    currentEdition = edition === 'be' ? 'be' : 'je';
    localStorage.setItem('mc-craft-color-edition', currentEdition);
    editionButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.edition === currentEdition);
    });
    loadColors();
    loadFormats();
    renderColorReferenceList();
    updateMotdPreviewVisibility();
    updatePreview();
}

function initEditionSwitcher() {
    editionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setEditionMode(btn.dataset.edition);
            playClickSound();
        });
    });
    setEditionMode(currentEdition);
}

function updateMotdPreviewVisibility() {
    if (!motdLivePreviewJe || !motdLivePreviewBe) return;
    const showJe = currentEdition === 'je';
    motdLivePreviewJe.closest('.motd-preview-panel')?.classList.toggle('is-hidden', !showJe);
    motdLivePreviewBe.closest('.motd-preview-panel')?.classList.toggle('is-hidden', showJe);
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getBannerLabel(banner) {
    return getLocalizedValue(banner.name, 'Banner');
}

function populateBannerSelect() {
    const select = document.getElementById('bannerSelect');
    if (!select) return;
    const previousValue = select.value || '0';
    select.innerHTML = '';

    bannerTemplates.forEach((b, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = index === 0 ? t('banner_none') : getBannerLabel(b);
        select.appendChild(option);
    });

    select.value = String(previousValue);
    if (!select.value) select.value = '0';
}

function applyBanner(text) {
    const select = document.getElementById('bannerSelect');
    if (!select) return text;
    const idx = Number(select.value || 0);
    const template = bannerTemplates[idx]?.template || '{text}';
    return template.replace('{text}', text);
}

// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initSoundToggle();
    initDynamicUI();
    populateBannerSelect();
    initConverter();
    initSymbols();
    initExamples();
    initEventListeners();
    initPageAnalytics();
});

// ===== AUDIO (gleich wie in text-converter.js) =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
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



    // Banner-Auswahl-Texte an Sprache anpassen
    populateBannerSelect();

    // Dynamisch erzeugte UI neu rendern, damit keine alte Sprache sichtbar bleibt
    loadColors();
    loadFormats();
    loadSymbols();
    renderColorReferenceList();
    setEditionMode(currentEdition);
    updateExamplePreviews();
    updatePreview();
    updateMotdOutputs();

}

// ===== LOADER (angepasst) =====
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
        t('loader_text1_color'),
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
                    showToast(
                        t('toast_welcome_title'),
                        t('toast_welcome_message'),
                        'success'
                    );
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

// ===== THEME SYSTEM =====
function initTheme() {
    applyTheme(currentTheme);
    updateActiveThemeButtons();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-color-theme', theme);
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
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-${getToastIcon(type)}"></i></div>
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
    }, 7000); // ⬅️ 7 Sekunden
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'info': return 'info-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'check-circle';
    }
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// ===== CONVERTER FUNKTIONEN (Original, mit übersetzten Toasts) =====
function initConverter() {
    loadColors();
    loadFormats();
    initEditionSwitcher();
    initMotdCopyButtons();
    initTextInput();
    const bannerSelect = document.getElementById('bannerSelect');
    if (bannerSelect) {
        bannerSelect.addEventListener('change', () => {
            updatePreview();
            playClickSound();
        });
    }
    if (motdCenterLinesCheckbox) {
        motdCenterLinesCheckbox.addEventListener('change', () => {
            motdCenterLines = motdCenterLinesCheckbox.checked;
            updateMotdOutputs();
            playClickSound();
        });
    }
    updateExamplePreviews();
    updatePreview();
    updateMotdOutputs();
}

function loadColors() {
    colorGrid.innerHTML = '';
    minecraftColors.forEach(color => {
        if (!colorVisibleForEdition(color, currentEdition)) return;
        const colorBtn = document.createElement('button');
        colorBtn.className = `color-btn ${color.class}`;
        colorBtn.dataset.code = color.code;
        const colorName = getLocalizedValue(color.name, color.code);
        const conflictNote = color.conflict ? ` ${t('color_conflict_note')}` : '';
        const previewHex = resolveEditionValue(color.hex, currentEdition);
        const previewBorder = String(previewHex).toLowerCase() === '#ffffff' ? 'border-color: rgba(0, 0, 0, 0.2);' : '';
        colorBtn.title = `${colorName} • ${previewHex} • ${getEditionLabel(color.edition)}${conflictNote}`;
        colorBtn.innerHTML = `
            <div class="color-preview" style="background:${previewHex}; ${previewBorder}"></div>
            <span>${color.code}</span>
            <small class="edition-badge edition-${color.edition || 'both'}">${getEditionLabel(color.edition)}</small>
        `;
        colorBtn.addEventListener('click', () => {
            insertAtCursor(color.code);
            updatePreview();
            playClickSound();
        });
        colorGrid.appendChild(colorBtn);
    });
}

function loadFormats() {
    formatGrid.innerHTML = '';
    minecraftFormats.forEach(format => {
        if (currentEdition === 'be' && (format.code === '&m' || format.code === '&n')) return;
        const formatBtn = document.createElement('button');
        formatBtn.className = 'format-btn';
        formatBtn.dataset.code = format.code;
        const formatName = getLocalizedValue(format.name, format.code);
        const formatDescription = getLocalizedValue(format.description, format.code);
        formatBtn.title = formatDescription;
        formatBtn.innerHTML = `
            <i class="${format.icon}"></i>
            <span>${formatName} (${format.code})</span>
        `;
        formatBtn.addEventListener('click', () => {
            insertAtCursor(format.code);
            updatePreview();
            playClickSound();
        });
        formatGrid.appendChild(formatBtn);
    });
}

function initTextInput() {
    textInput.addEventListener('input', () => {
        updatePreview();
        updateCharCount();
    });
    textInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            applyFormatting();
        }
    });
    updateCharCount();
}

function updateCharCount() {
    const count = textInput.value.length;
    charCount.textContent = count;
    if (count > 1000) {
        charCount.style.color = 'var(--danger)';
    } else if (count > 500) {
        charCount.style.color = 'var(--warning)';
    } else {
        charCount.style.color = 'var(--text-muted)';
    }
}

function insertAtCursor(text) {
    const startPos = textInput.selectionStart;
    const endPos = textInput.selectionEnd;
    textInput.value = textInput.value.substring(0, startPos) + text + textInput.value.substring(endPos, textInput.value.length);
    textInput.selectionStart = textInput.selectionEnd = startPos + text.length;
    textInput.focus();
    updatePreview();
    updateCharCount();
}

function updatePreview() {
    const text = applyBanner(textInput.value);
    if (!text.trim()) {
        preview.textContent = t('color_preview_placeholder');
        updateMotdOutputs();
        return;
    }

    preview.innerHTML = renderMotdPreviewHtml(text, currentEdition);
    updateMotdOutputs();
}

function applyFormatting() {
    updatePreview();
    showToast(
        t('toast_apply_title'),
        t('toast_apply_message'),
        'success'
    );
    playClickSound();
}

function clearAll() {
    textInput.value = '';
    updatePreview();
    updateCharCount();
    textInput.focus();
    showToast(
        t('toast_clear_title'),
        t('toast_clear_message'),
        'info'
    );
    playClickSound();
}

function insertExample() {
    const examples = Object.values(getCurrentExampleTexts());
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    textInput.value = randomExample;
    updatePreview();
    updateCharCount();
    showToast(
        t('toast_example_title'),
        t('toast_example_message'),
        'info'
    );
    playClickSound();
}

function copyFormatted() {
    const text = applyBanner(textInput.value);
    if (!text.trim()) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_text'),
            'error'
        );
        return;
    }
    copyToClipboard(text);
    showToast(
        t('toast_copy_title'),
        t('toast_copy_formatted'),
        'success'
    );
    highlightButton(copyFormattedBtn);
}

function copyCodes() {
    const text = applyBanner(textInput.value);
    if (!text.trim()) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_text'),
            'error'
        );
        return;
    }
    copyToClipboard(text);
    showToast(
        t('toast_copy_title'),
        t('toast_copy_codes'),
        'success'
    );
    highlightButton(copyCodesBtn);
}

function copyMinecraftCodes() {
    const text = applyBanner(textInput.value);
    if (!text.trim()) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_text'),
            'error'
        );
        return;
    }
    const mcText = text.replace(/&/g, '§');
    copyToClipboard(mcText);
    showToast(
        t('toast_copy_title'),
        t('toast_copy_minecraft'),
        'success'
    );
    highlightButton(copyMinecraftCodesBtn);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function highlightButton(button) {
    button.classList.add('copy-success');
    setTimeout(() => button.classList.remove('copy-success'), 2000);
    playClickSound();
}

function initMotdCopyButtons() {
    document.querySelectorAll('.motd-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.copyTarget;
            const target = document.getElementById(targetId);
            if (!target) return;
            const value = target.value || target.textContent || '';
            if (!value.trim()) {
                showToast(t('toast_error_title'), t('toast_error_no_text'), 'error');
                return;
            }
            copyToClipboard(value);
            showToast(t('toast_copy_title'), t('toast_copy_codes'), 'success');
            highlightButton(btn);
        });
    });
}

// ===== SYMBOLS =====
function initSymbols() {
    loadSymbols();
    initSymbolFilters();
    renderColorReferenceList();
}

function loadSymbols() {
    symbolsGrid.innerHTML = '';
    symbolsData.forEach(symbol => {
        const symbolElement = document.createElement('div');
        symbolElement.className = 'symbol-item';
        symbolElement.dataset.category = symbol.category;
        symbolElement.innerHTML = `
            <div class="symbol-char">${symbol.char}</div>
            <div class="symbol-name">${symbol.name}</div>
            <div class="symbol-action">
                <button class="symbol-insert-btn" title="${t('symbol_insert_title')}"><i class="fas fa-plus"></i></button>
                <button class="symbol-copy-btn" title="${t('symbol_copy_title')}"><i class="fas fa-copy"></i></button>
            </div>
        `;
        const insertBtn = symbolElement.querySelector('.symbol-insert-btn');
        insertBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            insertAtCursor(symbol.char);
            showToast(
                t('toast_symbol_insert'),
                `${symbol.name} ${t('toast_symbol_insert_message') || 'wurde eingefügt'}`,
                'info'
            );
        });
        const copyBtn = symbolElement.querySelector('.symbol-copy-btn');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(symbol.char);
            showToast(
                t('toast_symbol_copy'),
                `${symbol.char} ${t('toast_symbol_copy_message') || 'wurde kopiert'}`,
                'success'
            );
        });
        symbolElement.addEventListener('click', (e) => {
            if (!e.target.closest('.symbol-action')) {
                insertAtCursor(symbol.char);
                showToast(
                    t('toast_symbol_insert'),
                    `${symbol.name} ${t('toast_symbol_insert_message') || 'wurde eingefügt'}`,
                    'info'
                );
            }
        });
        symbolsGrid.appendChild(symbolElement);
    });
}

function renderMotdPreviewHtml(text, edition) {
    const normalized = text.replace(/&/g, '§');
    let html = '<span class="mc-r">';

    for (let i = 0; i < normalized.length; i++) {
        const ch = normalized[i];
        if (ch === '§' && i + 1 < normalized.length) {
            const code = normalized[i + 1];
            const cssClass = getColorClassForCode(code, edition);
            if (cssClass) {
                html += `</span><span class="${cssClass}">`;
                i++;
                continue;
            }
            html += `§${escapeHtml(code)}`;
            i++;
            continue;
        }
        html += escapeHtml(ch);
    }

    html += '</span>';
    return html;
}

function stripMinecraftCodes(text) {
    return text.replace(/[&§][0-9a-fk-or]/gi, '');
}

function updateMotdOutputs() {
    if (!motdLivePreviewJe || !motdLivePreviewBe || !motdVanilla || !motdSpigot || !motdBungee || !motdServerListPlus || !motdBedrock) {
        return;
    }

    const sourceText = applyBanner(textInput.value);
    if (!sourceText.trim()) {
        motdLivePreviewJe.textContent = t('color_preview_placeholder');
        motdLivePreviewBe.textContent = t('color_preview_placeholder');
        motdVanilla.value = 'motd=';
        motdSpigot.value = 'motd=';
        motdBungee.value = 'motd: ""';
        motdServerListPlus.value = '- |-';
        motdBedrock.value = 'motd=';
        motdLivePreviewJe.classList.remove('motd-center');
        motdLivePreviewBe.classList.remove('motd-center');
        return;
    }

    motdLivePreviewJe.innerHTML = renderMotdPreviewHtml(sourceText, 'je');
    motdLivePreviewBe.innerHTML = renderMotdPreviewHtml(sourceText, 'be');
    motdLivePreviewJe.classList.toggle('motd-center', motdCenterLines);
    motdLivePreviewBe.classList.toggle('motd-center', motdCenterLines);

    const escapedUnicodeSection = sourceText
        .replace(/&/g, '\\u00A7')
        .replace(/\r?\n/g, '\\n');

    const linePrefix = motdCenterLines ? '  ' : '';
    const serverListPlusBlock = sourceText
        .split(/\r?\n/)
        .map(line => `${linePrefix}${line}`)
        .join('\n');

    const bedrockInput = sourceText.replace(/\\n/g, '\n').replace(/&/g, '§');
    const lines = bedrockInput.split(/\r?\n/).filter(line => line.trim().length > 0);
    const bedrockMotd = lines[0] || '';

    motdVanilla.value = `motd=${escapedUnicodeSection}`;
    motdSpigot.value = `motd=${escapedUnicodeSection}`;
    motdBungee.value = `motd: "${sourceText.replace(/\r?\n/g, '\\n')}"`;
    motdServerListPlus.value = `- |-\n${serverListPlusBlock}`;
    motdBedrock.value = `motd=${bedrockMotd}`;
}

function renderColorReferenceList() {
    if (!colorReferenceBody) return;
    colorReferenceBody.innerHTML = '';

    minecraftColors.forEach(color => {
        if (!colorVisibleForEdition(color, currentEdition)) return;
        const tr = document.createElement('tr');
        const note = color.conflict ? t('color_reference_conflict') : '-';
        const displayHex = formatEditionValue(color.hex);
        const displayBgHex = formatEditionValue(color.bgHex);
        const swatchHex = resolveEditionValue(color.hex, currentEdition) || resolveEditionValue(color.hex, 'je');
        const ansi = getAnsiForCode(color.code);
        tr.innerHTML = `
            <td>${color.code}</td>
            <td>${getLocalizedValue(color.name, color.code)}</td>
            <td><span class="ref-swatch" style="background:${swatchHex}"></span>${displayHex}</td>
            <td>${displayBgHex}</td>
            <td>${ansi}</td>
            <td>${getEditionLabel(color.edition)}</td>
            <td>${note}</td>
        `;
        colorReferenceBody.appendChild(tr);
    });
}

function initSymbolFilters() {
    const filterButtons = document.querySelectorAll('.symbol-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterSymbols(category);
            playClickSound();
        });
    });
}

function filterSymbols(category) {
    const symbols = document.querySelectorAll('.symbol-item');
    symbols.forEach(symbol => {
        if (category === 'all' || symbol.dataset.category === category) {
            symbol.style.display = 'flex';
        } else {
            symbol.style.display = 'none';
        }
    });
}

// ===== EXAMPLES =====
function initExamples() {
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const exampleType = this.dataset.example;
            const exampleText = getCurrentExampleTexts()[exampleType];
            if (exampleText) {
                textInput.value = exampleText;
                updatePreview();
                updateCharCount();
                showToast(
                    t('toast_example_loaded'),
                    t('toast_example_loaded_message'),
                    'info'
                );
                playClickSound();
                card.classList.add('converting');
                setTimeout(() => card.classList.remove('converting'), 500);
            }
        });
    });
}

function updateExamplePreviews() {
    const localizedExamples = getCurrentExampleTexts();
    document.querySelectorAll('.example-card').forEach(card => {
        const exampleType = card.dataset.example;
        const previewEl = card.querySelector('.example-preview');
        if (!previewEl) return;
        const sample = localizedExamples[exampleType];
        if (sample) previewEl.textContent = sample;
    });
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    applyBtn.addEventListener('click', applyFormatting);
    clearBtn.addEventListener('click', clearAll);
    insertExampleBtn.addEventListener('click', insertExample);
    copyFormattedBtn.addEventListener('click', copyFormatted);
    copyCodesBtn.addEventListener('click', copyCodes);
    copyMinecraftCodesBtn.addEventListener('click', copyMinecraftCodes);
}

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Color Text Converter geladen');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
}

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('show')) closeMobileMenu();
        if (themeDropdown.classList.contains('show')) themeDropdown.classList.remove('show');
    }
    if ((e.key === ' ' || e.key === 'Enter') && e.target === themeBtn) {
        e.preventDefault();
        themeDropdown.classList.toggle('show');
    }
    if (e.ctrlKey && e.key === 'c' && document.activeElement !== textInput) {
        copyFormatted();
        e.preventDefault();
    }
});

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .color-btn, .format-btn, .symbol-filter-btn'
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
        t('toast_error_message') || 'Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.',
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => showToast(
    t('toast_online_title'),
    t('toast_online_message'),
    'success'
));
window.addEventListener('offline', () => showToast(
    t('toast_offline_title'),
    t('toast_offline_message'),
    'warning'
));
