// Support Page JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_support: "MC-Craft | Support",
    site_title_short: "MC-Craft",
    site_title_support_email: "MC-Craft | E-Mails",
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
    support_hero_title: "MC-Craft <span class=\"highlight\">Support</span>",
    hero_badge: "V 1.0.0 ist da",
    support_hero_desc: "Hilfe und Support für alle MC-Craft Tools. Unser Team steht dir zur Verfügung, um Probleme zu lösen und Fragen zu beantworten.",
    support_hero_btn_discord: "Discord Support",
    support_hero_btn_email: "E-Mail Seite",
    support_grid_discord: "Discord",
    support_grid_email: "E-Mail",
    support_grid_live: "Live Support",
    support_grid_faq: "FAQ",
    email_page_title: "E-Mails <span class=\"highlight\">Kontakt</span>",
    email_page_desc: "Nutze den direkten E-Mail-Kontakt für Bugreports, geschäftliche Anfragen und ausführliche Support-Nachrichten.",
    email_page_btn_contact: "Kontakt anzeigen",
    email_page_btn_back: "Zur Support-Seite",
    email_page_grid1: "Anfragen",
    email_page_grid2: "Bugreports",
    email_page_grid3: "Business",
    email_page_grid4: "Antwortzeit",
    email_page_note: "Wenn es dringend ist, nutze zusätzlich unseren Discord-Support für schnellere Rückmeldungen.",
    email_page_btn_discord: "Discord öffnen",
    email_info_title: "Allgemeine Anfragen",
    email_info_desc: "Allgemeine Fragen zu MC-Craft, Rückmeldungen und erste Kontaktaufnahmen.",
    email_contact_title: "Kontakt",
    email_contact_desc: "Allgemeine Kontaktanfragen rund um MC-Craft, Rückmeldungen und Hinweise.",
    email_support_title: "Support",
    email_support_desc: "Fragen zur Nutzung, Hilfe bei Tools und technische Unterstützung.",
    email_bug_title: "Bug Reports",
    email_bug_desc: "Fehler, Darstellungsprobleme oder unerwartetes Verhalten der Website.",
    email_business_title: "Business & Kooperation",
    email_business_desc: "Kooperationen, Partnerschaften, Presse oder geschäftliche Anfragen.",
    email_privacy_title: "Datenschutz",
    email_privacy_desc: "Anfragen zu Datenschutz, personenbezogenen Daten oder Auskunftsersuchen.",
    email_security_title: "Security",
    email_security_desc: "Meldung von Sicherheitslücken oder sensiblen technischen Problemen.",
    // Discord Section
    support_discord_title: "Discord <span class=\"highlight\">Support</span>",
    support_discord_subtitle: "Schnelle Hilfe und Community-Support über unseren Discord-Server",
    support_discord_widget_title: "MC-Craft Community Discord",
    support_discord_btn: "Discord beitreten",
    support_card1_title: "Schnelle Hilfe",
    support_card1_desc: "Erhalte sofortige Hilfe von unserer Community und dem Support-Team. Durchschnittliche Antwortzeit: 15 Minuten.",
    support_card2_title: "Aktive Community",
    support_card2_desc: "Über 1.000 aktive Mitglieder helfen sich gegenseitig bei Fragen zu Minecraft und unseren Tools.",
    support_card3_title: "Entwickler-Kontakt",
    support_card3_desc: "Sprich direkt mit den Entwicklern von MC-Craft und gib Feedback zu neuen Features.",
    support_card4_title: "Updates & News",
    support_card4_desc: "Bleibe über alle Updates, neue Tools und kommende Features informiert.",
    // Features
    support_features_title: "Warum <span class=\"highlight\">Discord?</span>",
    support_features_subtitle: "Die besten Gründe für unseren Discord-Support",
    support_feature1_title: "Live-Chat",
    support_feature1_desc: "Echtzeit-Unterstützung durch unser Team",
    support_feature2_title: "Tutorials",
    support_feature2_desc: "Ausführliche Anleitungen für alle Tools",
    support_feature3_title: "Sicherheit",
    support_feature3_desc: "Moderierte und sichere Umgebung",
    support_feature4_title: "Tipps & Tricks",
    support_feature4_desc: "Lerne von erfahrenen Minecraft-Spielern",
    // Email Section
    support_email_title: "E-Mails <span class=\"highlight\">Kontakt</span>",
    support_email_subtitle: "Formeller Support für komplexe Anfragen",
    support_email_card_title: "Direkter Kontakt",
    support_email_card_desc: "Für detaillierte Anfragen, Fehlerberichte oder geschäftliche Anliegen nutze unseren E-Mail-Support.",
    support_email_btn: "E-Mail senden",
    // FAQ
    support_faq_title: "Häufige <span class=\"highlight\">Fragen</span>",
    support_faq_subtitle: "Antworten auf häufig gestellte Fragen",
    support_faq_q1: "Wie schnell erhalte ich Hilfe über Discord?",
    support_faq_a1: "Unser Support-Team ist werktags von 10:00 bis 18:00 Uhr aktiv. Die durchschnittliche Antwortzeit beträgt 15-30 Minuten.",
    support_faq_q2: "Kann ich auch auf Englisch um Hilfe bitten?",
    support_faq_a2: "Ja, unser Team spricht sowohl Deutsch als auch Englisch. Du kannst deine Anfrage in beiden Sprachen stellen.",
    support_faq_q3: "Wie melde ich einen Bug?",
    support_faq_a3: "Bugs kannst du entweder über Discord im #bug-reports Channel oder über E-Mail an support@mc-craft.com melden. Bitte beschreibe den Bug so detailliert wie möglich.",
    support_faq_q4: "Kann ich neue Features vorschlagen?",
    support_faq_a4: "Ja! Wir freuen uns über Feature-Vorschläge. Nutze dafür den #suggestions Channel auf Discord oder schreibe uns eine E-Mail.",
    support_faq_cta: "Weitere Fragen? Besuche unsere <a href=\"/blog/faq.html\">FAQ-Seite</a> oder kontaktiere uns direkt.",
    support_faq_link: "FAQ-Seite",
    // CTA
    support_cta_title: "Benötigst du Hilfe?",
    support_cta_desc: "Unser Support-Team steht dir gerne zur Verfügung. Zögere nicht, uns bei Problemen oder Fragen zu kontaktieren.",
    support_cta_btn: "Discord beitreten",
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
    toast_welcome_title: "Support-Seite geladen!",
    toast_welcome_message: "Wir helfen dir gerne weiter!",
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
    loader_text1_support: "MC-Craft Support wird geladen...",
    loader_text2: "Discord-Widget wird vorbereitet...",
    loader_text3: "E-Mail Support wird geladen...",
    loader_text4: "FAQ wird geladen...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

const faqItems = document.querySelectorAll('.faq-item');

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initSupportCards();
    initFAQ();
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
    console.log('MC-Craft Support-Seite geladen');
}

// ===== SUPPORT CARDS INTERACTIVITY =====
function initSupportCards() {
    const supportCards = document.querySelectorAll('.support-card, .email-card, .feature-item');
    
    supportCards.forEach((card, index) => {
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

// ===== FAQ SYSTEM =====
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
            playClickSound();
        });
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
