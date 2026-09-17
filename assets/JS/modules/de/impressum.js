// Impressum Page JavaScript

// ===== KONFIGURATION =====

// Übersetzungen – alle für die Impressum-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_impressum: "MC-Craft | Impressum",
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
    impressum_badge: "Rechtliches",
    impressum_hero_title: "Impressum & <span class=\"highlight\">Kontakt</span>",
    hero_badge: "V 1.0.0 ist da",
    impressum_hero_desc: "Rechtliche Informationen und Kontaktdaten von MC-Craft. Wir sind für Sie da!",
    impressum_btn_read: "Impressum lesen",
    impressum_btn_privacy: "Zum Datenschutz",
    impressum_card1_title: "Angaben gemäß § 5 DDG",
    impressum_card1_line1: "<strong>MC-Craft</strong><br>Betrieben von: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Deutschland",
    impressum_card1_line2: "<strong>Umsatzsteuer-ID:</strong> Nicht vorhanden. MC-Craft wird privat und nicht gewerblich betrieben und erzielt keine Einnahmen.",
    impressum_card2_title: "Kontakt",
    impressum_contact_general: "Allgemeine Anfragen:",
    impressum_contact_contact: "Kontakt:",
    impressum_contact_support: "Support:",
    impressum_contact_bug: "Bug melden:",
    impressum_contact_business: "Business & Kooperationen:",
    impressum_contact_privacy: "Datenschutz:",
    impressum_contact_security: "Security:",
    impressum_card2_note: "Bitte haben Sie Verständnis, dass wir keine telefonische Unterstützung anbieten können. Für Anfragen nutzen Sie bitte ausschließlich die oben genannten E-Mail-Adressen. Datenschutzrechtliche Betroffenenanfragen bearbeiten wir innerhalb der gesetzlichen Fristen gemäß DSGVO.",
    impressum_card3_title: "Haftungsausschluss",
    impressum_card3_sub1: "Haftung für Inhalte",
    impressum_card3_text1: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen sowie nach der Verordnung (EU) 2022/2065 (Digital Services Act) bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    impressum_card3_sub2: "Haftung für Links",
    impressum_card3_text2: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung jedoch nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    impressum_card3_sub3: "Urheberrecht",
    impressum_card3_text3: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    impressum_card4_title: "Datenschutz",
    impressum_card4_text1: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.",
    impressum_card4_text2: "Weitere Informationen zum Datenschutz finden Sie in unserer <a href=\"/blog/datenschutz.html\">Datenschutzerklärung</a>.",
    impressum_card4_text3: "Weitere Informationen zu unseren Nutzungsbedingungen finden Sie in unseren <a href=\"/blog/nutzungsbedingungen.html\">Nutzungsbedingungen</a>.",
    impressum_card4_text4: "Weitere Informationen zu unserem Copyright finden Sie in unserer <a href=\"/blog/copyright.html\">Copyright</a>-Seite.",
    impressum_card5_title: "Verwendete Technologien",
    impressum_card5_text: "MC-Craft verwendet folgende Technologien und Dienste:",
    impressum_card5_li1: "HTML5, CSS3, JavaScript für die Frontend-Entwicklung",
    impressum_card5_li2: "Font Awesome für Icons (selbst gehostet)",
    impressum_card5_li3: "Google Fonts (Chakra Petch, Space Grotesk – selbst gehostet, keine direkte Verbindung zu Google)",
    impressum_card5_li4: "Eigene MC-Craft API (api.mc-craft.com), die im Hintergrund offizielle Minecraft-/Mojang-Dienste für Skin-Abfragen, Server-Status und mehr abfragt",
    impressum_card5_li5: "Responsive Design für mobile Geräte",
    impressum_card5_li6: "LocalStorage für Spracheinstellung, Theme, Sound und weitere Präferenzen",
    impressum_card5_li7: "Cookie-Banner zur Steuerung optionaler externer Inhalte",
    impressum_card5_link: "Eine vollständige Liste aller extern kontaktierten Dienste findest du in unserer <a href=\"/blog/datenschutz.html\">Datenschutzerklärung</a>.",
    impressum_card6_title: "Hinweis zu Minecraft-Marken",
    impressum_card6_text1: "MC-Craft ist ein Fan-Projekt und nicht mit Mojang Studios oder Microsoft verbunden. Minecraft ist eine eingetragene Marke von Mojang Studios. Alle Rechte an Minecraft und damit verbundenen Marken liegen bei Mojang Studios und Microsoft.",
    impressum_card6_text2: "Diese Website und ihre Dienste stehen in keiner Verbindung zu Mojang Studios oder Microsoft. Wir respektieren die Rechte der Markeninhaber und stellen lediglich Tools und Informationen für die Minecraft-Community bereit.",
    impressum_card6_text3: "Für die offiziellen Minecraft-Nutzungsbedingungen, Datenschutzrichtlinien und Community-Richtlinien besuchen Sie bitte die offizielle Mojang-Website:",
    impressum_card6_text4: "Weitere Informationen zu den Minecraft Nutzungsbedingungen finden Sie hier",
    impressum_card6_text5: "Weitere Informationen zur Minecraft Datenschutzrichtlinie finden Sie hier",
    impressum_card6_text6: "Weitere Informationen zu den Minecraft Community-Richtlinien finden Sie hier",
    impressum_card6_note_title: "Wichtig:",
    impressum_card6_note_text: "Diese Seite ist ein Fan-Projekt und hat keine offizielle Verbindung zu Mojang oder Microsoft.",
    impressum_cta_title: "Haben Sie Fragen?",
    impressum_cta_desc: "Bei rechtlichen Fragen oder anderen Anliegen stehen wir Ihnen gerne zur Verfügung.",
    impressum_cta_btn_email: "E-Mail schreiben",
    impressum_cta_btn_privacy: "Datenschutz ansehen",
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
    toast_welcome_title: "Impressum-Seite geladen!",
    toast_welcome_message: "Rechtliche Informationen werden angezeigt!",
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
    loader_text1_impressum: "Impressum wird geladen...",
    loader_text2: "Rechtliche Informationen werden geladen...",
    loader_text3: "Kontaktdaten werden geladen...",
    loader_text4: "Haftungsausschluss wird geladen...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initImpressumCards();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== IMPRESSUM CARDS ANIMATION (Original) =====
function initImpressumCards() {
    const impressumCards = document.querySelectorAll('.impressum-card');
    
    // Add hover effect
    impressumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add entrance animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    impressumCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== STYLE FÜR LEGAL-LINKS (aus Original) =====
const style = document.createElement('style');
style.textContent = `
    .impressum-card {
        transition: all var(--transition-normal);
    }
    
    .impressum-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }
    
    .btn-primary:hover, .btn-secondary:hover, .btn-outline:hover {
        transform: translateY(-2px);
    }
    
    .social-link:hover {
        transform: translateY(-2px);
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
