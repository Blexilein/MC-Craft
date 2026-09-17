// Team Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_team: "MC-Craft | Unser Team",
    site_title_short: "MC-Craft",
    // Loader
    loader_text1_team: "MC-Craft Team wird geladen...",
    loader_text2: "Team-Informationen werden abgerufen...",
    loader_text3: "Design wird vorbereitet...",
    loader_text4: "Sound-System wird geladen...",
    loader_text5: "Fast fertig...",
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
    team_hero_title: "Unser <span class=\"highlight\">Team</span>",
    hero_badge: "V 1.0.0 ist da",
    team_hero_desc: "Die kreativen Köpfe hinter MC-Craft. Lerne die Entwickler und Designer kennen, die unsere Minecraft-Tools mit Leidenschaft und Fachwissen entwickeln.",
    team_hero_btn_team: "Team entdecken",
    team_hero_btn_about: "Über MC-Craft",
    team_grid_development: "Entwicklung",
    team_grid_design: "Design",
    team_grid_support: "Support",
    team_grid_passion: "Leidenschaft",
    // Team Section
    team_section_title: "Das <span class=\"highlight\">MC-Craft</span> Team",
    team_section_subtitle: "Entwickler, Designer und Community-Manager, die unsere Tools möglich machen",
    // Team Member 1
    team_member1_name: "Blexilein",
    team_member1_role: "Gründer & Lead-Entwickler",
    team_member1_desc: "Blexilein ist der Gründer von MC-Craft und verantwortlich für die technische Umsetzung. Mit über 10 Jahren Erfahrung in Minecraft-Modding bringt er das nötige Know-how mit.",
    team_badge_developer: "Entwickler",
    team_badge_tech: "Technik",
    skill_js: "JavaScript",
    skill_html_css: "HTML/CSS",
    skill_mc_api: "Minecraft API",
    skill_nodejs: "Node.js",
    // Stats
    team_stat_years: "5+",
    team_stat_years_label: "Jahre Minecraft Erfahrung",
    team_stat_tools: "16",
    team_stat_tools_label: "Minecraft Tools",
    team_stat_members: "1",
    team_stat_members_label: "Team Mitglieder",
    team_stat_passion: "100%",
    team_stat_passion_label: "Leidenschaft",
    // Team CTA
    team_cta_title: "Du willst mitmachen?",
    team_cta_desc: "Wir suchen immer nach talentierten Minecraft-Enthusiasten, die uns helfen, bessere Tools für die Community zu entwickeln.",
    team_cta_btn: "Kontakt aufnehmen",
    // Allgemeine CTA
    team_cta_general_title: "Mehr über <span class=\"highlight\">MC-Craft</span> erfahren?",
    team_cta_general_desc: "Entdecke unsere Geschichte, unsere Mission und wie alles begann.",
    team_cta_general_btn_history: "Unsere Geschichte",
    team_cta_general_btn_about: "Über uns",
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
    toast_welcome_title: "Team-Seite geladen!",
    toast_welcome_message: "Lerne unser Team kennen!",
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
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initTeamCards();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER (angepasst für Übersetzung) =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Team-Seite geladen');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
}

// ===== TEAM CARDS INTERACTIVITY =====
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        const socialLinks = card.querySelectorAll('.social-link');
        socialLinks.forEach(link => link.addEventListener('click', playClickSound));
    });
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== LOADING PROGRESS ANIMATION =====
function enhanceLoadingAnimation() {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        const texts = [
            t('loader_text1_team'),
            t('loader_text2'),
            t('loader_text3'),
            t('loader_text4'),
            t('loader_text5')
        ];
        let index = 0;
        const textInterval = setInterval(() => {
            if (index < texts.length - 1) {
                index++;
                loadingText.textContent = texts[index];
            } else {
                clearInterval(textInterval);
            }
        }, 300);
    }
}
window.addEventListener('load', enhanceLoadingAnimation);

// ===== PERFORMANCE OPTIMIZATION =====
function preloadImages() {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif',
        '/assets/img/backgrounds/Blexilein_helm.png',
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`${src} preloaded`);
        img.onerror = () => console.log(`${src} failed to load`);
    });
}
window.addEventListener('load', preloadImages);

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// Export functions for HTML onclick
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
