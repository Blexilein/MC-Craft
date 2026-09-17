// Changelog Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_changelog: "MC-Craft | Changelog",
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
    changelog_hero_title: "MC-Craft <span class=\"highlight\">Changelog</span>",
    hero_badge: "V 1.0.0 ist da",
    changelog_hero_desc: "Alle Updates, Änderungen und neuen Features von MC-Craft. Hier findest du alle Versionen und was sich geändert hat.",
    changelog_btn_latest: "Version 1.0 ansehen",
    changelog_btn_history: "Mehr erfahren",
    changelog_grid_updates: "Updates",
    changelog_grid_bugfixes: "Bugfixes",
    changelog_grid_features: "Neue Features",
    changelog_grid_improvements: "Verbesserungen",
    // Latest version
    changelog_latest_title: "Aktuelle <span class=\"highlight\">Version</span>",
    changelog_latest_subtitle: "Alle finalen Änderungen zur offiziellen Version 1.0.0",
    changelog_v150_version: "v1.0.0",
    changelog_v150_date: "22. August 2026",
    changelog_v150_title: "Release 1.0.0: Modernes Rework & Stabiler Launch",
    changelog_category_new: "Neue Features",
    change_type_new: "NEU",
    changelog_v150_feature1: "Neues, einheitliches Designsystem auf allen Seiten",
    changelog_v150_feature2: "Vollständig responsives Layout für Smartphone, Tablet und Desktop",
    changelog_v150_feature3: "Verbesserte Navigation mit konsistenten Pfaden und Bedienelementen",
    changelog_v150_feature4: "Überarbeitete deutsche und englische UI-Texte",
    changelog_category_improved: "Verbesserungen",
    change_type_improved: "VERBESSERT",
    changelog_v150_improvement1: "Bessere Abstände, Typografie und Kontraste für höhere Lesbarkeit",
    changelog_v150_improvement2: "Touch-Ziele und Fokuszustände für bessere Bedienbarkeit",
    changelog_v150_improvement3: "Optimierte Bild- und Inhaltsdarstellung auf kleinen Displays",
    changelog_v150_improvement4: "Schnellere, konsistentere Seitenwahrnehmung durch globale UI-Basis",
    changelog_category_fixed: "Bugfixes",
    change_type_fixed: "GEFIXT",
    changelog_v150_fixed1: "Inkonsistente Links zum Skin-Editor korrigiert",
    changelog_v150_fixed2: "Versionsangaben auf allen Seiten auf 1.0.0 vereinheitlicht",
    changelog_v150_fixed3: "Diverse sprachliche Inkonsistenzen in der Oberfläche bereinigt",
    changelog_v150_fixed4: "Mobile Navigation in der Basis robuster abgestimmt",
    changelog_v150_notes_title: "Anmerkungen",
    changelog_v150_notes: "Version 1.0.0 ist die konsolidierte, modernisierte Basis von MC-Craft: responsiv, einheitlich, stabil und klar strukturiert.",
    // Version history
    changelog_history_title: "Versions<span class=\"highlight\">verlauf</span>",
    changelog_history_subtitle: "Alle bisherigen Versionen von MC-Craft",
    // Future updates
    changelog_future_title: "Geplante <span class=\"highlight\">Updates</span>",
    changelog_future_subtitle: "Was kommt als nächstes?",
    changelog_future_card1_title: "AI Integration",
    changelog_future_card1_desc: "KI-gestützte Tools für Minecraft-Builder",
    changelog_future_card1_status: "In Planung",
    changelog_future_card2_title: "Community Features",
    changelog_future_card2_desc: "User-Accounts und Community-Bereich",
    changelog_future_card2_status: "Geplant",
    changelog_future_card3_title: "Mobile App",
    changelog_future_card3_desc: "Native iOS & Android App",
    changelog_future_card3_status: "Geplant",
    changelog_future_card4_title: "Mehrsprachigkeit",
    changelog_future_card4_desc: "Unterstützung für Englisch & weitere Sprachen",
    changelog_future_card4_status: "In Arbeit",
    // CTA
    changelog_cta_title: "Bleib auf dem Laufenden!",
    changelog_cta_desc: "Verpasse keine Updates! Folge uns für die neuesten Nachrichten und kommende Features.",
    changelog_cta_btn_discord: "Discord Community",
    changelog_cta_btn_home: "Zur Startseite",
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
    toast_welcome_title: "Changelog geladen!",
    toast_welcome_message: "Entdecke die neuesten Updates von MC-Craft.",
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
    loader_text1_changelog: "Changelog wird geladen...",
    loader_text2: "Versionsgeschichte wird geladen...",
    loader_text3: "Updates werden analysiert...",
    loader_text4: "Fast fertig...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initChangelogAnimations();
    initPageAnalytics();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Audio konnte nicht initialisiert werden:', error);
        initWebAudioFallback();
    }
}

function initWebAudioFallback() {
    if (window.AudioContext || window.webkitAudioContext) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.start();
            setTimeout(() => oscillator.stop(), 200);
        } catch (error) {
            console.log('Web Audio API Fallback fehlgeschlagen:', error);
        }
    }
}

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== CHANGELOG ANIMATIONS (Original) =====
function initChangelogAnimations() {
    // Version Cards Animation
    const versionCards = document.querySelectorAll('.version-card');
    
    versionCards.forEach((card, index) => {
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
    
    // Timeline Items Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Upcoming Cards Animation
    const upcomingCards = document.querySelectorAll('.upcoming-card');
    
    upcomingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Changelog-Seite geladen');
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== STYLE FÜR TIMELINE VISIBLE (aus Original) =====
const style = document.createElement('style');
style.textContent = `
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    .timeline-item:nth-child(even).visible {
        transform: translateX(0) !important;
    }
    
    .version-card, .upcoming-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
