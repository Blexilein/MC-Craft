// About Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_about: "MC-Craft | Über uns",
    site_title_short: "MC-Craft",
    // Navigation
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

    // Dropdowns
    tools_dropdown: "Werkzeuge",
    discover_dropdown: "Entdecken",
    // Theme
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Theme auswählen:",
    // Sound & Language
    sound_toggle: "Sound",
    language: "Sprache",
    // Hero
    about_hero_title: "Über <span class=\"highlight\">MC-Craft</span>",
    hero_badge: "V 1.0.0 ist da",
    about_hero_desc: "Deine ultimative Ressource für Minecraft-Tools und Community. Entdecke die Geschichte, Mission und Werte hinter MC-Craft.",
    about_hero_btn_mission: "Unsere Mission",
    about_hero_btn_features: "Funktionen",
    about_grid_founded: "Gegründet 2026",
    about_grid_tools: "16 Tools",
    about_grid_free: "100% Kostenlos",
    about_grid_community: "Community",
    // History Section
    about_history_title: "Unsere <span class=\"highlight\">Geschichte</span>",
    about_history_subtitle: "Wie alles begann und wohin wir gehen",
    about_who_title: "Wer wir sind",
    about_badge_founded: "Gegründet 2026",
    about_who_desc1: 'MC-Craft wurde 2026 von mir "Blexilein" gegründet mit der Vision, hochwertige Minecraft-Tools für die Community kostenlos zur Verfügung zu stellen.',
    about_who_desc2: "Unser Team besteht aus Minecraft-Enthusiasten, Entwicklern und Designern, die alle eine gemeinsame Leidenschaft teilen: Minecraft und seine unglaubliche Community.",
    about_mission_title: "Unsere Mission",
    about_badge_vision: "Vision",
    about_badge_goals: "Ziele",
    about_mission_desc: "Wir bei MC-Craft glauben, dass Minecraft mehr als nur ein Spiel ist - es ist eine Plattform für Kreativität, Lernen und Gemeinschaft.",
    about_mission_item1: "Hochwertige Tools kostenlos zur Verfügung stellen",
    about_mission_item2: "Die Minecraft-Community unterstützen und verbinden",
    about_mission_item3: "Eine vertrauenswürdige Ressource für alle Minecraft-Themen sein",
    about_offer_title: "Was wir anbieten",
    about_badge_tools: "Tools",
    about_badge_resources: "Ressourcen",
    about_offer_desc: "MC-Craft bietet inzwischen 16 kostenlose Tools und Ressourcen für Minecraft-Spieler, darunter:",
    about_offer_tool1_title: "Text Konverter",
    about_offer_tool1_desc: "- Erstelle stylischen Chat-Text und Formatierungscodes für deinen Server",
    about_offer_tool2_title: "Skin Lookup",
    about_offer_tool2_desc: "- Finde Skin, UUID und Capes zu jedem Minecraft-Account",
    about_offer_tool3_title: "Items Datenbank",
    about_offer_tool3_desc: "- Umfassende Informationen zu allen Items und Materialien",
    about_offer_tool4_title: "Mobs Datenbank",
    about_offer_tool4_desc: "- Werte, Verhalten und Loot zu allen Kreaturen",
    about_offer_tool5_title: "Und viele weitere",
    about_offer_tool5_desc: "- von Server-Status über Skin Editor bis Advancement Generator. <a href=\"/index.html#tools\">Alle 16 Tools entdecken</a>",
    // Features
    about_features_title: "Warum <span class=\"highlight\">MC-Craft?</span>",
    about_features_subtitle: "Was uns einzigartig macht",
    about_feature1_title: "Leistungsstarke Tools",
    about_feature1_desc: "Unsere Tools werden regelmäßig aktualisiert und verbessert, um dir das beste Minecraft-Erlebnis zu bieten.",
    about_feature2_title: "Community-Fokus",
    about_feature2_desc: "Wir hören unserer Community zu und entwickeln Tools basierend auf euren Bedürfnissen und Wünschen.",
    about_feature3_title: "Sicher & Vertrauenswürdig",
    about_feature3_desc: "Deine Daten sind bei uns sicher. Wir respektieren deine Privatsphäre und schützen deine Informationen.",
    about_feature4_title: "Immer aktuell",
    about_feature4_desc: "Wir halten alle Tools und Informationen mit den neuesten Minecraft-Updates synchron.",
    about_feature5_title: "Transparent",
    about_feature5_desc: "Unser Quellcode ist auf GitHub einsehbar – Fehler und Ideen kannst du uns jederzeit melden.",
    about_feature6_title: "Ausgezeichneter Support",
    about_feature6_desc: "Unser Support-Team hilft dir bei Fragen und Problemen rund um unsere Tools.",
    // Values
    about_values_title: "Unsere <span class=\"highlight\">Werte</span>",
    about_values_subtitle: "Die Prinzipien, nach denen wir arbeiten",
    about_value1_title: "Transparenz",
    about_value1_desc: "Wir sind offen und ehrlich über unsere Arbeit und Ziele.",
    about_value2_title: "Leidenschaft",
    about_value2_desc: "Minecraft ist unsere Leidenschaft, und das zeigt sich in unserer Arbeit.",
    about_value3_title: "Community",
    about_value3_desc: "Die Community steht bei uns an erster Stelle.",
    about_value4_title: "Innovation",
    about_value4_desc: "Wir suchen ständig nach neuen Wegen, um Minecraft-Tools zu verbessern.",
    // CTA
    about_cta_title: "Bereit loszulegen?",
    about_cta_desc: "Entdecke unsere Sammlung von Minecraft-Tools und werde Teil unserer wachsenden Community.",
    about_cta_btn_home: "Zur Startseite",
    about_cta_btn_tools: "Tools entdecken",
    // Footer
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
    // Toast-Benachrichtigungen
    toast_welcome_title: "Über uns Seite geladen!",
    toast_welcome_message: "Erfahre mehr über MC-Craft!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_error_title: "Oops!",
    toast_error_message: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
    // Loader
    loader_text1_about: "MC-Craft Über uns wird geladen...",
    loader_text2: "Geschichte wird geladen...",
    loader_text3: "Mission wird vorbereitet...",
    loader_text4: "Funktionen werden geladen...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initAboutCards();
    initFeatureCards();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft About-Seite geladen');
}

// ===== ABOUT CARDS INTERACTIVITY =====
function initAboutCards() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach((card, index) => {
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        // Staggered animation on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add animation to value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== FEATURE CARDS INTERACTIVITY =====
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
