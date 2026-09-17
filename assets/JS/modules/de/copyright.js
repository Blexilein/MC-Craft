// Copyright Page JavaScript 

// ===== KONFIGURATION =====

// Übersetzungen – alle für die Copyright-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_copyright: "MC-Craft | Copyright Information",
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
    copyright_hero_title: "Copyright <span class=\"highlight\">Information</span>",
    hero_badge: "V 1.0.0 ist da",
    copyright_hero_desc: "Rechtliche Hinweise und Lizenzinformationen für MC-Craft. Alle wichtigen Informationen zu Urheberrechten und Nutzungsbedingungen.",
    copyright_hero_btn_legal: "Rechtliche Hinweise",
    copyright_hero_btn_quick: "Schnellzugriff",
    copyright_grid_copyright: "Copyright",
    copyright_grid_legal: "Rechtliches",
    copyright_grid_privacy: "Datenschutz",
    copyright_grid_licenses: "Lizenzen",
    copyright_section_title: "<span class=\"highlight\">Rechtliche</span> Informationen",
    copyright_section_subtitle: "Alle wichtigen rechtlichen Hinweise und Lizenzinformationen im Überblick",
    copyright_card1_title: "Minecraft Copyright",
    copyright_card1_line1: "<strong>Minecraft™</strong> ist eine eingetragene Marke von <strong>Mojang Studios</strong>. Alle Rechte vorbehalten.",
    copyright_card1_line2: "Diese Website verwendet Assets und Konzepte aus Minecraft unter Einhaltung der <a href=\"https://www.minecraft.net/de-de/terms\" target=\"_blank\" class=\"legal-link\">Mojang-Richtlinien</a>.",
    copyright_card1_line3: "MC-Craft ist eine unabhängige Fan-Website und steht in keiner Verbindung zu Mojang Studios oder Microsoft.",
    copyright_card1_line4: "Zur Klarstellung: Unser eigener Quellcode, eigene Texte, Grafiken sowie unser Logo und Design sind ausschließlich unser Eigentum (siehe Website-Lizenz). Minecraft-Texturen, -Sounds, -Namen, -Marken und -Modelle bleiben hingegen Eigentum von Mojang Studios und Microsoft und unterliegen deren eigenen Nutzungsbedingungen.",
    copyright_card1_line5: "Dieser Disclaimer allein bedeutet nicht automatisch, dass jede Verwendung solcher Minecraft-/Mojang-Inhalte zulässig ist – maßgeblich sind stets die offiziellen <a href=\"https://www.minecraft.net/de-de/terms\" target=\"_blank\" class=\"legal-link\">Minecraft-Nutzungsbedingungen</a>.",
    copyright_card2_title: "Website-Lizenz",
    copyright_card2_line1: "<strong>Copyright © 2026 MC-Craft.</strong> Alle Rechte vorbehalten, soweit nachstehend nichts anderes angegeben ist.",
    copyright_card2_line2: "Auch der von uns selbst entwickelte Quellcode (HTML, CSS, JavaScript) steht unter keiner freien Lizenz (siehe <a href=\"https://github.com/Blexilein/MC-Craft/blob/main/LICENSE\" target=\"_blank\" class=\"legal-link\">LICENSE</a>). Er darf ohne schriftliche Genehmigung nicht kopiert, verändert, weitergegeben oder selbst gehostet werden; das Ansehen auf GitHub ist erlaubt.",
    copyright_card2_line3: "Dasselbe gilt für Texte, den Namen „MC-Craft“, das Logo sowie eigene Grafiken und sonstige redaktionelle Inhalte. Eine Nutzung, Vervielfältigung oder Veränderung ist nur mit ausdrücklicher schriftlicher Genehmigung des Rechteinhabers erlaubt (Anfragen an contact@mc-craft.com).",
    copyright_card2_line4: "Nicht offiziell mit Mojang oder Microsoft verbunden.",
    copyright_card3_title: "Datenschutz",
    copyright_card3_line1: "Wir speichern keine persönlichen Daten ohne Zustimmung. Alle Tools arbeiten clientseitig im Browser.",
    copyright_card3_line2: "Für detaillierte Informationen siehe unsere vollständige <a href=\"/blog/datenschutz.html\" class=\"legal-link\">Datenschutzerklärung</a>.",
    copyright_card3_line3: "Wir setzen auf Datensparsamkeit und Transparenz bei der Datenverarbeitung.",
    copyright_card4_title: "Nutzungsbedingungen",
    copyright_card4_line1: "Die Nutzung dieser Website unterliegt unseren <a href=\"/blog/nutzungsbedingungen.html\" class=\"legal-link\">Nutzungsbedingungen</a>.",
    copyright_card4_line2: "Alle Tools werden kostenlos zur Verfügung gestellt. Es wird keine Garantie für Funktionalität oder Verfügbarkeit übernommen.",
    copyright_card4_line3: "Missbrauch der Website oder der Tools ist nicht gestattet.",
    copyright_card5_title: "Haftungsausschluss",
    copyright_card5_line1: "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
    copyright_card5_line2: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
    copyright_card6_title: "Kontakt & Impressum",
    copyright_card6_line1: "Für rechtliche Anfragen kontaktieren Sie uns bitte über unser <a href=\"/blog/impressum.html\" class=\"legal-link\">Impressum</a>.",
    copyright_card6_line2: "Für Support-Anfragen nutzen Sie bitte unsere <a href=\"/blog/e-mails.html\" class=\"legal-link\">E-Mail</a>- oder <a href=\"/blog/support.html\" class=\"legal-link\">Support</a>-Seite.",
    copyright_card7_title: "Verwendete Bibliotheken & Lizenzen",
    copyright_card7_line1: "MC-Craft nutzt folgende Open-Source-Bibliotheken, die wir zur Wahrung deiner Privatsphäre selbst hosten (siehe unsere <a href=\"/blog/datenschutz.html\" class=\"legal-link\">Datenschutzerklärung</a>):",
    copyright_card7_li1: "<strong>Font Awesome Free</strong> – Icons: CC BY 4.0 License, Schriftarten: SIL OFL 1.1, Code: MIT License",
    copyright_card7_li2: "<strong>Google Fonts</strong> (Chakra Petch, Space Grotesk) – SIL Open Font License 1.1",
    copyright_card7_li3: "<strong>three.js</strong> – MIT License",
    copyright_card7_li4: "<strong>SkinView3D</strong> – MIT License",
    copyright_card7_li5: "<strong>QRCode.js</strong> (davidshimjs) – MIT License",
    copyright_card7_line2: "Die jeweiligen Urheberrechte und Lizenzbedingungen der genannten Bibliotheken bleiben unberührt und gelten zusätzlich zu unseren eigenen Inhalten.",
    copyright_quicklinks_title: "Schnellzugriff zu rechtlichen Dokumenten",
    copyright_quicklink_impressum: "Impressum",
    copyright_quicklink_privacy: "Datenschutz",
    copyright_quicklink_terms: "Nutzungsbedingungen",
    copyright_quicklink_email: "E-Mail Kontakt",
    copyright_quicklink_support: "Support",
    copyright_quicklink_bug: "Bug melden",
    copyright_notice_title: "Wichtiger Hinweis",
    copyright_notice_text: "Diese Website ist ein Fanprojekt und nicht offiziell mit Mojang Studios oder Microsoft verbunden. Minecraft ist eine Marke von Mojang Studios. Alle hier angebotenen Tools sind kostenlos und dienen lediglich der Unterstützung der Minecraft-Community.",
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
    toast_welcome_title: "Copyright-Seite geladen!",
    toast_welcome_message: "Alle rechtlichen Informationen im Überblick",
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
    loader_text1_copyright: "MC-Craft Copyright wird geladen...",
    loader_text2: "Rechtliche Informationen werden abgerufen...",
    loader_text3: "Lizenzinformationen werden geladen...",
    loader_text4: "Fast fertig...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

const quickLinks = document.querySelectorAll('.quick-link');

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initQuickLinks();
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
    console.log('MC-Craft Copyright-Seite geladen');
}

// ===== QUICK LINKS =====
function initQuickLinks() {
    quickLinks.forEach(link => {
        link.addEventListener('click', () => {
            playClickSound();
        });
    });
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== STYLE FÜR LEGAL-LINKS (aus Original) =====
const style = document.createElement('style');
style.textContent = `
    .legal-link {
        color: var(--primary);
        text-decoration: none;
        font-weight: 500;
        transition: all var(--transition-fast);
        position: relative;
        padding: 2px 4px;
        border-radius: 3px;
    }
    
    .legal-link:hover {
        text-decoration: underline;
        background-color: rgba(0, 168, 107, 0.1);
    }
    
    .legal-card {
        transition: all var(--transition-normal);
    }
    
    .legal-card:hover {
        border-color: var(--primary);
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .quick-link {
        transition: all var(--transition-normal);
    }
    
    .quick-link:hover {
        background-color: rgba(0, 168, 107, 0.1);
        border-color: var(--primary);
        color: var(--primary);
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
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
