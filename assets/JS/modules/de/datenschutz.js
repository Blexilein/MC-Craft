// Datenschutz Page JavaScript

// ===== KONFIGURATION =====

// Übersetzungen – alle für die Datenschutz-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_datenschutz: "MC-Craft | Datenschutzerklärung",
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
    datenschutz_hero_title: "Datenschutz<span class=\"highlight\">erklärung</span>",
    hero_badge: "V 1.0.0 ist da",
    datenschutz_hero_desc: "Deine Privatsphäre ist uns wichtig. Hier erfährst du, wie wir mit deinen Daten umgehen und was deine Rechte sind.",
    datenschutz_btn_read: "Datenschutz lesen",
    datenschutz_btn_impressum: "Zum Impressum",
    datenschutz_grid_privacy: "Datenschutz",
    datenschutz_grid_rights: "Deine Rechte",
    datenschutz_grid_contact: "Kontakt",
    datenschutz_grid_legal: "Rechtliches",
    datenschutz_section_title: "Unsere <span class=\"highlight\">Datenschutz</span>richtlinien",
    datenschutz_section_subtitle: "Stand: 24. August 2026",
    datenschutz_card1_title: "1. Allgemeine Hinweise",
    datenschutz_card1_desc: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren personenbezogenen Daten umgehen, wenn Sie unsere Website nutzen.",
    datenschutz_card1_note: "Unsere Dienste richten sich an ein allgemeines Publikum rund um das Thema Minecraft, sammeln aber keine altersspezifischen Daten. Personen unter 16 Jahren sollten Einwilligungen zu optionalen externen Inhalten (siehe Punkt 3 und 6) nur mit Zustimmung ihrer Eltern oder Erziehungsberechtigten erteilen.",
    datenschutz_card2_title: "2. Verantwortlicher",
    datenschutz_card2_desc: "<strong>MC-Craft</strong><br>Betrieben von: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Deutschland<br><br>E-Mail: <a href=\"mailto:privacy@mc-craft.com\">privacy@mc-craft.com</a>",
    datenschutz_cardlegal_title: "3. Rechtsgrundlagen der Verarbeitung",
    datenschutz_cardlegal_desc: "Wir verarbeiten personenbezogene Daten ausschließlich auf Grundlage der folgenden gesetzlichen Erlaubnistatbestände:",
    datenschutz_cardlegal_li1: "<strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse):</strong> für automatisch erhobene Server-Log-Daten (siehe Punkt 4) sowie für technisch notwendige lokale Speicherung, z.B. Sprach-, Theme- und Soundeinstellung (siehe Punkt 5) – unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Website.",
    datenschutz_cardlegal_li1b: "<strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse):</strong> für die Verarbeitung deiner Eingaben (z.B. Spielername, UUID oder Server-Adresse) durch unsere eigene MC-Craft API (siehe Punkt 6) – unser berechtigtes Interesse liegt in der technischen Bereitstellung der Tools, ohne dass dein Browser dafür direkt mit Drittanbietern verbinden muss.",
    datenschutz_cardlegal_li2: "<strong>Art. 6 Abs. 1 lit. a DSGVO i.V.m. § 25 Abs. 1 TDDDG (Einwilligung):</strong> für die einzige nicht technisch notwendige externe Ressource (optionale Schriftart, siehe Punkt 6), die nur nach deiner ausdrücklichen Zustimmung im Cookie-Banner geladen wird.",
    datenschutz_cardlegal_li3: "<strong>§ 25 Abs. 2 Nr. 2 TDDDG:</strong> für lokale Speicherung, die unbedingt erforderlich ist, um einen von dir ausdrücklich gewünschten Dienst bereitzustellen (z.B. deine gespeicherte Sprachauswahl) – hierfür ist keine gesonderte Einwilligung erforderlich.",
    datenschutz_cardlegal_note: "Eine Weitergabe deiner Daten an Dritte zu Werbezwecken findet nicht statt. Die unter Punkt 6 beschriebenen direkten Verbindungen zu Mojang/Microsoft betreffen nur noch das Laden von Skin- und Cape-Bilddateien und entstehen ausschließlich durch deine aktive Nutzung eines Tools.",
    datenschutz_card3_title: "4. Hosting und Server-Log-Dateien",
    datenschutz_card3_desc: "Bei jedem Zugriff auf unsere Website werden automatisch Verbindungsdaten gespeichert:",
    datenschutz_card3_li1: "IP-Adresse",
    datenschutz_card3_li2: "Datum und Uhrzeit des Zugriffs",
    datenschutz_card3_li3: "Verwendeter Browser und Betriebssystem",
    datenschutz_card3_li4: "Name der abgerufenen Datei",
    datenschutz_card3_hosting1: "Diese Website wird über <strong>Cloudflare Pages</strong> bereitgestellt, einen Dienst der Cloudflare, Inc. (USA). Die oben genannten Verbindungsdaten – insbesondere IP-Adresse und HTTP-Anfragedaten – werden dabei durch Cloudflare verarbeitet, um die Website sicher und zuverlässig auszuliefern (Content Delivery, DDoS-Schutz, technischer Betrieb).",
    datenschutz_card3_hosting2: "Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website). Empfänger der Daten ist Cloudflare als unser Hosting- und Content-Delivery-Anbieter. Da Cloudflare ein weltweites Netzwerk betreibt, kann es dabei zu einer Übermittlung in Drittländer außerhalb der EU/des EWR, unter anderem in die USA, kommen; Cloudflare stützt sich hierfür auf die EU-Standardvertragsklauseln (Art. 46 DSGVO) als geeignete Garantien.",
    datenschutz_card3_note: "Diese Daten werden ausschließlich zu technischen Zwecken – zur Sicherstellung eines störungsfreien Betriebs, zur Systemsicherheit sowie zur Optimierung unseres Angebots – erfasst und nicht mit anderen Datenquellen zusammengeführt. Die Speicherdauer richtet sich nach den Standard-Aufbewahrungsfristen unseres Hosting-Anbieters Cloudflare für Verbindungs- und Log-Daten; sicherheitsrelevante Vorfälle können eine längere Aufbewahrung zu Beweiszwecken erfordern.",
    datenschutz_card4_title: "5. Cookies & lokale Speicherung",
    datenschutz_card4_desc: "Wir setzen keine klassischen Server-Cookies zur Wiedererkennung ein. Stattdessen speichert dein Browser einige Einstellungen ausschließlich lokal auf deinem eigenen Gerät (localStorage) – diese Daten werden nie an uns übertragen:",
    datenschutz_card4_li1: "<code>mc-craft-skin-poser</code> (IndexedDB) – Bilder, die du im Skin-Poser unter „Meine Renders“ speicherst; nur wenn du selbst speicherst, löschbar direkt in der Galerie",
    datenschutz_card4_li2: "<code>mc-craft-theme</code> – gewähltes Farbthema (Overworld/Nether/End)",
    datenschutz_card4_li3: "<code>mc-craft-sound</code> – ob Soundeffekte an oder aus sind",
    datenschutz_card4_li4: "<code>mc-craft-color-edition</code> – gewählte Edition (Java/Bedrock) im Farbtext-Konverter",
    datenschutz_card4_li5: "<code>mc-craft-terms-accepted</code>, <code>mc-craft-terms-accepted-date</code> – ob und wann du die Nutzungsbedingungen bestätigt hast",
    datenschutz_card4_li6: "<code>mc-craft-cookie-consent</code> – deine Entscheidung im Cookie-Banner selbst",
    datenschutz_card4_note: "Beim ersten Besuch zeigen wir dir ein Cookie-Banner. Lehnst du \"externe Inhalte\" ab, werden die davon betroffenen Inhalte (eine optionale Schriftart auf der Advancement-Generator-Seite und das Discord-Widget, siehe Punkt 6) tatsächlich nicht geladen – nicht nur das Banner ausgeblendet. Das Discord-Widget kannst du stattdessen auch einmalig per Klick laden. Du kannst deine Entscheidung jederzeit über den Cookie-Button unten links auf jeder Seite ändern. Zusätzlich kannst du Speicherung generell in deinen Browser-Einstellungen deaktivieren.",
    datenschutz_card5_title: "6. Externe Dienste, Schriftarten & APIs",
    datenschutz_card5_desc1: "<strong>Selbst gehostet:</strong> Schriftarten (Chakra Petch, Space Grotesk – Google Fonts, SIL Open Font License), die Icon-Bibliothek Font Awesome, die 3D-Bibliotheken three.js und SkinView3D, die Bibliotheken für die 3D-Mob-Modelle (Bridge Model Viewer, Wintersky, MoLang), gif.js für GIF-Exporte, UPNG.js für APNG-Exporte sowie deepslate für den Schematic-Viewer liegen auf unserem eigenen Server. Dein Browser lädt sie nicht direkt von Google, Font Awesome oder deren jeweiligen externen CDNs, sondern über die Hosting-Infrastruktur von MC-Craft. Informationen zur dabei eingesetzten Cloudflare-Infrastruktur findest du in Punkt 4 (Hosting und Server-Log-Dateien).",
    datenschutz_card5_desc2: "<strong>Optionale externe Inhalte:</strong> Auf der Advancement-Generator-Seite laden wir für das Vorschaubild optional eine Pixel-Schriftart von <code>fonts.cdnfonts.com</code> nach. Auf den Seiten Support, Bug melden und E-Mails zeigen wir das Widget unseres Discord-Servers von <code>discord.com</code> an; Discord kann dabei eigene Cookies setzen, es gilt die Datenschutzerklärung von Discord. In beiden Fällen wird deine IP-Adresse an den jeweiligen Anbieter übertragen. Beides passiert nur, wenn du im Cookie-Banner \"Alle akzeptieren\" wählst – das Discord-Widget kannst du alternativ einmalig per Klick laden. Bei Ablehnung nutzt das Vorschaubild eine Ersatzschrift und statt des Widgets erscheint ein Hinweis.",
    datenschutz_card5_desc3: "<strong>Eigene MC-Craft API:</strong> Die Tools Server Status, Skin Lookup, Skin Editor, Skin-Poser, Minecraft Versionen und Minecraft API Status senden deine Eingabe (z.B. ein Minecraft-Nutzername/UUID oder eine Server-Adresse) bei aktiver Nutzung an unsere eigene Programmierschnittstelle unter <code>api.mc-craft.com</code>. Diese läuft – wie unsere Website selbst – auf der Cloudflare-Infrastruktur (Cloudflare Workers, siehe Punkt 4) und fragt im Hintergrund die jeweiligen offiziellen Minecraft-/Mojang-Dienste ab, damit dein Browser nicht mehr direkt mit diesen Drittanbietern verbinden muss. In Skin Lookup, Skin Editor und Skin-Poser liefert unsere API auch die Skin-Textur selbst aus (Quelle: <code>textures.minecraft.net</code>), sodass dein Browser dafür ebenfalls nicht mehr direkt mit Mojang verbindet. Deine Eingabe wird dabei nur zur Beantwortung der jeweiligen Anfrage verarbeitet und nicht dauerhaft gespeichert oder protokolliert.",
    datenschutz_card5_desc4: "<strong>Weiterhin direkt vom Browser geladen:</strong> Die Standard-Skins (Steve/Alex) und Cape-Bilder in Skin Lookup, Skin Editor und Skin-Poser werden direkt von deinem Browser abgerufen, da es sich um reine Bildressourcen handelt. Die Cape-Datenbank und die Skin-Bibliothek nutzen dagegen nur Bilder von unserem eigenen Server:",
    datenschutz_card5_li1: "<strong>Standard-Skins und Cape-Bilder (Skin Lookup, Skin Editor, Skin-Poser):</strong> <code>textures.minecraft.net</code>",
    datenschutz_card5_note: "Diese Bild-Anfragen laufen direkt zwischen deinem Browser und Mojang – unser Server sieht diese Daten nicht und speichert sie nicht. Es handelt sich um offizielle bzw. öffentliche Minecraft-Dienste, keine Werbe- oder Tracking-Anbieter.",
    datenschutz_card6_title: "7. Datensicherheit",
    datenschutz_card6_desc: "Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor Verlust, Manipulation oder unberechtigtem Zugriff zu schützen.",
    datenschutz_card6_note: "Wir geben deine Daten nicht zu Werbe- oder Analysezwecken an Dritte weiter. Die in Punkt 6 beschriebenen direkten Verbindungen zu Mojang-/Microsoft-Diensten entstehen ausschließlich durch deine aktive Nutzung eines Tools und liegen außerhalb unseres Einflussbereichs. Sobald die Website produktiv über HTTPS bereitgestellt wird, erfolgt die Datenübertragung zwischen deinem Browser und unserem Server verschlüsselt (SSL/TLS).",
    datenschutz_card7_title: "8. Analyse-Tools",
    datenschutz_card7_desc: "<strong>Wichtig:</strong> Wir verwenden <strong>keine</strong> Tracking- oder Analyse-Tools wie Google Analytics. Dein Besuch bleibt privat.",
    datenschutz_card8_title: "9. Deine Rechte",
    datenschutz_card8_desc: "Du hast das Recht auf:",
    datenschutz_card8_li1: "Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)",
    datenschutz_card8_li2: "Berichtigung falscher Daten (Art. 16 DSGVO)",
    datenschutz_card8_li3: "Löschung deiner Daten (Art. 17 DSGVO)",
    datenschutz_card8_li4: "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    datenschutz_card8_li5: "Datenübertragbarkeit (Art. 20 DSGVO)",
    datenschutz_card8_li6: "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    datenschutz_card8_li7: "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
    datenschutz_card8_li8: "Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)",
    datenschutz_card8_note: "Wir sind bemüht, Anfragen zu den oben genannten Rechten innerhalb eines Monats gemäß Art. 12 Abs. 3 DSGVO zu beantworten. Wende dich hierfür einfach an unsere unten stehende Kontakt-E-Mail.",
    datenschutz_card9_title: "10. Kontakt",
    datenschutz_card9_desc: "Bei Fragen zum Datenschutz kontaktiere uns:",
    datenschutz_hinweis_title: "Wichtig zu wissen",
    datenschutz_hinweis_desc: "Diese Datenschutzerklärung kann geändert werden, um sie an neue gesetzliche Vorgaben anzupassen. Die jeweils aktuelle Version findest du auf dieser Seite.",
    datenschutz_cta_title: "Fragen zum Datenschutz?",
    datenschutz_cta_desc: "Wir helfen dir gerne weiter. Kontaktiere uns bei Fragen oder Anliegen.",
    datenschutz_cta_btn_email: "E-Mail schreiben",
    datenschutz_cta_btn_impressum: "Impressum",
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
    toast_welcome_title: "Datenschutz geladen!",
    toast_welcome_message: "Deine Privatsphäre ist uns wichtig.",
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
    loader_text1_datenschutz: "Datenschutzerklärung wird geladen...",
    loader_text2: "Rechtliche Informationen werden geladen...",
    loader_text3: "Fast fertig...",
    loader_text4: "Fast fertig...",
    loader_text5: "Fast fertig..."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initDatenschutzCards();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== DATENSCHUTZ CARDS ANIMATION =====
function initDatenschutzCards() {
    const datenschutzCards = document.querySelectorAll('.datenschutz-card');
    
    datenschutzCards.forEach((card, index) => {
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

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Datenschutz-Seite geladen');
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
