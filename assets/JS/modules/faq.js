// FAQ Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die FAQ-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title_faq: "MC-Craft | Häufig gestellte Fragen",
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
        nav_beacon_mixer: "Beacon Farbmischer",
        nav_day_night_cycle: "Tag-Nacht-Zyklus",
        nav_end_poem: "End Poem",
        nav_capes: "Cape-Datenbank",
        nav_skins: "Skin-Bibliothek",
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
        faq_hero_title: "Häufig gestellte <span class=\"highlight\">Fragen</span>",
        hero_badge: "V 1.0.0 ist da",
        faq_hero_desc: "Finde schnell Antworten auf deine Fragen zu MC-Craft. Unsere umfassende FAQ-Sammlung hilft dir bei allen Themen rund um unsere Tools.",
        faq_hero_btn_faq: "FAQ entdecken",
        faq_hero_btn_contact: "Kontakt aufnehmen",
        faq_grid_faq: "FAQ",
        faq_grid_tips: "Tipps",
        faq_grid_support: "Support",
        faq_grid_guides: "Anleitungen",
        // FAQ Section
        faq_section_title: "<span class=\"highlight\">FAQ</span> - Häufige Fragen",
        faq_section_subtitle: "Antworten auf die am häufigsten gestellten Fragen zu MC-Craft",
        faq_search_placeholder: "Stelle deine Frage oder suche nach einem Begriff...",
        faq_search_btn: "Suchen",
        faq_search_hint: "Tipp: Gib ein Stichwort ein oder klicke auf eine Frage für die Antwort",
        // Kategorien
        faq_category_all: "Alle Fragen",
        faq_category_general: "Allgemein",
        faq_category_tools: "Tools",
        faq_category_technical: "Technisch",
        faq_category_general_title: "Allgemeine Fragen",
        faq_category_tools_title: "Tools & Funktionen",
        faq_category_technical_title: "Technische Fragen",
        // Fragen & Antworten
        faq_q1_title: "Was ist MC-Craft?",
        faq_q1_subtitle: "Alles über unsere Plattform und ihre Ziele",
        faq_q1_answer: "MC-Craft ist eine umfassende Plattform für Minecraft-Spieler, die verschiedene Tools und Informationen bietet. Dazu gehören Textkonverter für Minecraft-Formatierungen, detaillierte Informationen zu Items und Mobs, Skin-Lookup-Funktionen und Server-Status-Checks. Unsere Plattform ist komplett kostenlos und wird kontinuierlich erweitert.",
        faq_q2_title: "Ist MC-Craft kostenlos?",
        faq_q2_subtitle: "Informationen zu Kosten und Nutzung",
        faq_q2_answer: "Ja, MC-Craft ist komplett kostenlos! Wir glauben, dass alle Minecraft-Spieler Zugang zu nützlichen Tools und Informationen haben sollten, ohne dafür bezahlen zu müssen. Es gibt keine versteckten Kosten oder Abonnements.",
        faq_q3_title: "Brauche ich ein Konto, um MC-Craft zu nutzen?",
        faq_q3_subtitle: "Informationen zur Anmeldung",
        faq_q3_answer: "Nein, für die meisten Funktionen von MC-Craft benötigst du kein Benutzerkonto. Alle Tools können sofort und ohne Anmeldung genutzt werden. Wir speichern keine persönlichen Daten, es sei denn, du nutzt bestimmte Funktionen, die das erfordern.",
        faq_q4_title: "Wie funktioniert der Text-Konverter?",
        faq_q4_subtitle: "Anleitung zur Nutzung des Text-Konverters",
        faq_q4_answer: "Der Text-Konverter wandelt normalen Text in das Minecraft-Standard-Galaktische-Alphabet um. Gib einfach deinen gewünschten Text in das Eingabefeld ein, und der Konverter erzeugt sofort die entsprechende Minecraft-Formatierung.",
        faq_q5_title: "Kann ich farbigen Text mit dem Konverter erstellen?",
        faq_q5_subtitle: "Farbtext und Formatierungsoptionen",
        faq_q5_answer: "Ja, unser Color Text Konverter ermöglicht das Erstellen von farbigem Text für Minecraft. Du kannst verschiedene Farbcodes und Formatierungsoptionen (fett, kursiv, durchgestrichen) auswählen, um deinen Text individuell zu gestalten.",
        faq_q6_title: "Wie kann ich einen Minecraft-Skin nachschlagen?",
        faq_q6_subtitle: "Skin Lookup Funktionalität",
        faq_q6_answer: "Um einen Skin nachzuschlagen, gib einfach den Benutzernamen des Spielers in das Suchfeld auf der Skin-Lookup-Seite ein. Das Tool sucht dann in der Minecraft-Datenbank nach dem Skin, der UUID und eventuell verfügbaren Capes.",
        faq_q9_title: "Was finde ich in der Items-Datenbank?",
        faq_q9_subtitle: "Item-Infos und Eigenschaften nachschlagen",
        faq_q9_answer: "Die Items-Datenbank listet alle Minecraft-Items nach Kategorien (Baumaterialien, Werkzeuge, Nahrung, Redstone u.v.m.) mit Bild, ID, Eigenschaften und Beschreibung. Nutze die Suche oder die Kategorie-Filter, um schnell das gesuchte Item zu finden.",
        faq_q10_title: "Was zeigt mir die Mobs-Datenbank?",
        faq_q10_subtitle: "Kreaturen, Werte und Drops",
        faq_q10_answer: "In der Mobs-Datenbank findest du alle Minecraft-Kreaturen mit Lebenspunkten, Verhalten, Spawn-Bedingungen und Drops – sortiert nach Kategorien wie Passiv, Neutral, Feindlich und Boss-Mobs.",
        faq_q11_title: "Wie funktioniert der Server-Status-Check?",
        faq_q11_subtitle: "Minecraft-Server live überprüfen",
        faq_q11_answer: "Gib die Adresse eines Minecraft-Servers ein, und das Tool zeigt dir in Echtzeit, ob der Server online ist, wie viele Spieler gerade aktiv sind, die aktuelle Version und weitere Informationen.",
        faq_q12_title: "Was zeigt die Minecraft API Status-Seite?",
        faq_q12_subtitle: "Verfügbarkeit der offiziellen Mojang-Dienste",
        faq_q12_answer: "Diese Seite prüft live den Status der wichtigsten offiziellen Mojang-/Microsoft-Dienste (z.B. Login-Server, Session-Server, Minecraft.net) und zeigt dir sofort, ob es aktuell Probleme oder Ausfälle gibt.",
        faq_q13_title: "Wie funktioniert der Skin Editor?",
        faq_q13_subtitle: "Minecraft-Skins direkt im Browser bearbeiten",
        faq_q13_answer: "Mit dem Skin Editor kannst du einen bestehenden Skin laden oder eine neue Vorlage erstellen und ihn direkt im Browser in einer 3D-Vorschau pixelweise bearbeiten – ganz ohne zusätzliche Software.",
        faq_q14_title: "Was macht der Tag-Nacht-Zyklus-Simulator?",
        faq_q14_subtitle: "Minecraft-Tageszeiten visualisieren",
        faq_q14_answer: "Dieses Tool simuliert visuell den Tag-Nacht-Zyklus von Minecraft, damit du z.B. nachvollziehen kannst, wann Monster spawnen können oder wie lange ein In-Game-Tag in Echtzeit dauert.",
        faq_q15_title: "Was ist die End Poem-Seite?",
        faq_q15_subtitle: "Der Abspann-Text von Minecraft",
        faq_q15_answer: "Hier findest du das bekannte \"End Poem\" – den Text, der nach dem Besiegen des Enderdrachen im Abspann erscheint – in Ruhe zum Nachlesen.",
        faq_q16_title: "Was ist die Cape-Datenbank?",
        faq_q16_subtitle: "Alle Minecraft-Umhänge im Überblick",
        faq_q16_answer: "Die Cape-Galerie zeigt dir alle bekannten Minecraft-Umhänge (Capes) – von offiziellen Mojang-Capes über Event-Capes bis zu besonderen Community-Capes – inklusive Bild und Herkunft.",
        faq_q17_title: "Was bietet die Minecraft-Versionsübersicht?",
        faq_q17_subtitle: "Alle Releases im Überblick",
        faq_q17_answer: "Diese Seite listet alle Minecraft-Versionen von den ersten Alpha-Builds bis zum aktuellen Release, inklusive Veröffentlichungsdatum und Versionstyp (Release, Snapshot, Beta).",
        faq_q18_title: "Was ist die Skin-Bibliothek?",
        faq_q18_subtitle: "Skins ansehen und als Inspiration nutzen",
        faq_q18_answer: "In der Skin-Galerie findest du eine Sammlung bekannter und beliebter Minecraft-Skins zur Ansicht und als Inspiration für deinen eigenen Skin.",
        faq_q19_title: "Wofür ist der Beacon Color Mixer?",
        faq_q19_subtitle: "Beacon-Farben berechnen",
        faq_q19_answer: "Der Beacon Color Mixer berechnet, welche Kombination an gefärbtem Glas du über einem Beacon stapeln musst, um genau die gewünschte Lichtfarbe zu erhalten.",
        faq_q20_title: "Wie funktioniert der QR-Code-Generator?",
        faq_q20_subtitle: "QR-Codes z.B. für Server-IPs erstellen",
        faq_q20_answer: "Gib einen beliebigen Text oder Link ein (z.B. deine Server-IP), und das Tool erzeugt sofort einen QR-Code zum Herunterladen – praktisch zum schnellen Teilen mit Freunden.",
        faq_q21_title: "Was macht der Advancement Generator?",
        faq_q21_subtitle: "Eigene Fortschritts-Benachrichtigungen erstellen",
        faq_q21_answer: "Mit dem Advancement Generator kannst du eigene, individuelle Minecraft-Fortschritts-Benachrichtigungen (Advancement-Toasts) gestalten und als Bild herunterladen – z.B. für Videos oder Thumbnails.",
        faq_q7_title: "Funktioniert MC-Craft auf mobilen Geräten?",
        faq_q7_subtitle: "Responsive Design und mobile Nutzung",
        faq_q7_answer: "Ja, MC-Craft ist vollständig responsive und funktioniert auf Smartphones, Tablets und Desktop-Computern. Die Benutzeroberfläche passt sich automatisch an die Bildschirmgröße an, sodass du alle Funktionen auch unterwegs nutzen kannst.",
        faq_q8_title: "Welche Browser werden unterstützt?",
        faq_q8_subtitle: "Browser-Kompatibilität",
        faq_q8_answer: "MC-Craft unterstützt alle modernen Browser, darunter Chrome (empfohlen), Brave, Firefox, Safari und Edge. Für ältere Browser (Internet Explorer) wird MC-Craft möglicherweise nicht korrekt funktionieren.",
        // No Results
        faq_no_results_title: "Keine Ergebnisse gefunden",
        faq_no_results_desc: "Versuche es mit anderen Suchbegriffen oder stelle uns deine Frage direkt.",
        faq_no_results_btn: "Frage stellen",
        // CTA
        faq_cta_title: "Frage nicht gefunden?",
        faq_cta_desc: "Du hast eine spezifische Frage, die hier nicht beantwortet wird? Kontaktiere unser Support-Team direkt - wir helfen dir gerne weiter!",
        faq_cta_btn_contact: "Kontakt aufnehmen",
        faq_cta_btn_support: "Support kontaktieren",
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
        toast_welcome_title: "FAQ-Seite geladen!",
        toast_welcome_message: "Finde Antworten auf deine Fragen!",
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
        // Such-Ergebnis Toast
        faq_search_results: "{count} Ergebnis|{count} Ergebnisse|{count} Ergebnisse",
        faq_filter_all: "Zeige alle Fragen",
        faq_category_filtered: "Gefiltert",
        // Loader
        loader_text1_faq: "MC-Craft FAQ wird geladen...",
        loader_text2: "Fragen werden abgerufen...",
        loader_text3: "Suchfunktion wird vorbereitet...",
        loader_text4: "Kategorien werden geladen...",
        loader_text5: "Fast fertig..."
    },
    en: {
        site_title_faq: "MC-Craft | Frequently Asked Questions",
        site_title_short: "MC-Craft",
        nav_home: "Home",
        nav_text_converter: "Text Converter",
        nav_color_text: "Color Text",
        nav_items: "Items Database",
        nav_mobs: "Mobs Database",
        nav_server_status: "Server Status",
        nav_skin_lookup: "Skin Lookup",
        nav_skin_editor: "Skin Editor",
        nav_day_night_cycle: "Day-Night Cycle",
        nav_end_poem: "End Poem",
        nav_capes: "Capes Database",
        nav_skins: "Skin Library",
        nav_beacon_mixer: "Beacon Color Mixer",
        tools_dropdown: "Tools",
        discover_dropdown: "Discover",
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Choose Theme:",
        sound_toggle: "Sound",
        language: "Language",
        faq_hero_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
        hero_badge: "V 1.0.0 is here",
        faq_hero_desc: "Quickly find answers to your questions about MC-Craft. Our comprehensive FAQ collection helps you with all topics related to our tools.",
        faq_hero_btn_faq: "Discover FAQ",
        faq_hero_btn_contact: "Contact Us",
        faq_grid_faq: "FAQ",
        faq_grid_tips: "Tips",
        faq_grid_support: "Support",
        faq_grid_guides: "Guides",
        faq_section_title: "<span class=\"highlight\">FAQ</span> - Frequently Asked Questions",
        faq_section_subtitle: "Answers to the most frequently asked questions about MC-Craft",
        faq_search_placeholder: "Ask your question or search for a term...",
        faq_search_btn: "Search",
        faq_search_hint: "Tip: Enter a keyword or click on a question for the answer",
        faq_category_all: "All Questions",
        faq_category_general: "General",
        faq_category_tools: "Tools",
        faq_category_technical: "Technical",
        faq_category_general_title: "General Questions",
        faq_category_tools_title: "Tools & Features",
        faq_category_technical_title: "Technical Questions",
        faq_q1_title: "What is MC-Craft?",
        faq_q1_subtitle: "All about our platform and its goals",
        faq_q1_answer: "MC-Craft is a comprehensive platform for Minecraft players offering various tools and information. These include text converters for Minecraft formatting, detailed information on items and mobs, skin lookup functions, and server status checks. Our platform is completely free and continuously expanded.",
        faq_q2_title: "Is MC-Craft free?",
        faq_q2_subtitle: "Information about costs and usage",
        faq_q2_answer: "Yes, MC-Craft is completely free! We believe all Minecraft players should have access to useful tools and information without having to pay. There are no hidden costs or subscriptions.",
        faq_q3_title: "Do I need an account to use MC-Craft?",
        faq_q3_subtitle: "Information about registration",
        faq_q3_answer: "No, you do not need a user account for most functions of MC-Craft. All tools can be used immediately without registration. We do not store any personal data unless you use certain functions that require it.",
        faq_q4_title: "How does the Text Converter work?",
        faq_q4_subtitle: "Instructions for using the Text Converter",
        faq_q4_answer: "The Text Converter converts normal text into the Minecraft Standard Galactic Alphabet. Simply enter your desired text into the input field, and the converter immediately generates the corresponding Minecraft formatting.",
        faq_q5_title: "Can I create colored text with the converter?",
        faq_q5_subtitle: "Color text and formatting options",
        faq_q5_answer: "Yes, our Color Text Converter allows you to create colored text for Minecraft. You can select different color codes and formatting options (bold, italic, strikethrough) to customize your text.",
        faq_q6_title: "How can I look up a Minecraft skin?",
        faq_q6_subtitle: "Skin Lookup functionality",
        faq_q6_answer: "To look up a skin, simply enter the player's username into the search field on the Skin Lookup page. The tool then searches the Minecraft database for the skin, UUID, and any available capes.",
        faq_q9_title: "What can I find in the Items Database?",
        faq_q9_subtitle: "Look up item info and properties",
        faq_q9_answer: "The Items Database lists every Minecraft item by category (building materials, tools, food, redstone, and more) with an image, ID, properties, and description. Use the search or category filters to quickly find the item you're looking for.",
        faq_q10_title: "What does the Mobs Database show me?",
        faq_q10_subtitle: "Creatures, stats, and drops",
        faq_q10_answer: "The Mobs Database lists every Minecraft creature with health points, behavior, spawn conditions, and drops – sorted into categories like Passive, Neutral, Hostile, and Boss mobs.",
        faq_q11_title: "How does the Server Status check work?",
        faq_q11_subtitle: "Check a Minecraft server live",
        faq_q11_answer: "Enter a Minecraft server's address and the tool shows you in real time whether the server is online, how many players are currently active, the current version, and more.",
        faq_q12_title: "What does the Minecraft API Status page show?",
        faq_q12_subtitle: "Availability of the official Mojang services",
        faq_q12_answer: "This page checks the live status of the most important official Mojang/Microsoft services (e.g. login server, session server, Minecraft.net) and instantly shows you whether there are any current issues or outages.",
        faq_q13_title: "How does the Skin Editor work?",
        faq_q13_subtitle: "Edit Minecraft skins directly in your browser",
        faq_q13_answer: "With the Skin Editor you can load an existing skin or start a new template and edit it pixel by pixel directly in your browser with a 3D preview – no extra software needed.",
        faq_q14_title: "What does the Day-Night Cycle simulator do?",
        faq_q14_subtitle: "Visualize Minecraft's time of day",
        faq_q14_answer: "This tool visually simulates Minecraft's day-night cycle, so you can see, for example, when monsters can spawn or how long an in-game day takes in real time.",
        faq_q15_title: "What is the End Poem page?",
        faq_q15_subtitle: "Minecraft's ending credits text",
        faq_q15_answer: "Here you can find the famous \"End Poem\" – the text that appears in the credits after defeating the Ender Dragon – to read at your own pace.",
        faq_q16_title: "What is the Capes Database?",
        faq_q16_subtitle: "All Minecraft capes at a glance",
        faq_q16_answer: "The Cape Gallery shows you every known Minecraft cape – from official Mojang capes to event capes and special community capes – including an image and its origin.",
        faq_q17_title: "What does the Minecraft version overview offer?",
        faq_q17_subtitle: "All releases at a glance",
        faq_q17_answer: "This page lists every Minecraft version from the earliest Alpha builds to the current release, including release date and version type (Release, Snapshot, Beta).",
        faq_q18_title: "What is the Skin Library?",
        faq_q18_subtitle: "Browse skins for inspiration",
        faq_q18_answer: "The Skin Gallery contains a collection of well-known and popular Minecraft skins to browse and use as inspiration for your own skin.",
        faq_q19_title: "What is the Beacon Color Mixer for?",
        faq_q19_subtitle: "Calculate beacon colors",
        faq_q19_answer: "The Beacon Color Mixer calculates which combination of stained glass you need to stack above a beacon to get exactly the light color you want.",
        faq_q20_title: "How does the QR Code Generator work?",
        faq_q20_subtitle: "Create QR codes e.g. for server IPs",
        faq_q20_answer: "Enter any text or link (e.g. your server IP) and the tool instantly generates a QR code you can download – handy for quickly sharing with friends.",
        faq_q21_title: "What does the Advancement Generator do?",
        faq_q21_subtitle: "Create your own advancement notifications",
        faq_q21_answer: "With the Advancement Generator you can design your own custom Minecraft advancement toast notifications and download them as an image – e.g. for videos or thumbnails.",
        faq_q7_title: "Does MC-Craft work on mobile devices?",
        faq_q7_subtitle: "Responsive design and mobile usage",
        faq_q7_answer: "Yes, MC-Craft is fully responsive and works on smartphones, tablets, and desktop computers. The interface automatically adapts to the screen size, so you can use all functions on the go.",
        faq_q8_title: "Which browsers are supported?",
        faq_q8_subtitle: "Browser compatibility",
        faq_q8_answer: "MC-Craft supports all modern browsers, including Chrome (recommended), Brave, Firefox, Safari, and Edge. For older browsers (Internet Explorer), MC-Craft may not function correctly.",
        faq_no_results_title: "No results found",
        faq_no_results_desc: "Try different search terms or ask us your question directly.",
        faq_no_results_btn: "Ask a question",
        faq_cta_title: "Question not found?",
        faq_cta_desc: "Do you have a specific question that isn't answered here? Contact our support team directly - we'll be happy to help!",
        faq_cta_btn_contact: "Contact Us",
        faq_cta_btn_support: "Contact Support",
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
        toast_welcome_title: "FAQ page loaded!",
        toast_welcome_message: "Find answers to your questions!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound on",
        toast_sound_off: "Sound off",
        toast_language_title: "Language",
        toast_language_de: "German",
        toast_language_en: "English",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme changed",
        toast_theme_to: "Switched to {theme}",
        toast_error_title: "Oops!",
        toast_error_message: "A small error occurred. The page continues to work.",
        toast_online_title: "Connection restored",
        toast_online_message: "You are back online!",
        toast_offline_title: "Offline mode",
        toast_offline_message: "Some features may not be available.",
        faq_search_results: "{count} result|{count} results|{count} results",
        faq_filter_all: "Showing all questions",
        faq_category_filtered: "Filtered",
        loader_text1_faq: "MC-Craft FAQ is loading...",
        loader_text2: "Retrieving questions...",
        loader_text3: "Preparing search function...",
        loader_text4: "Loading categories...",
        loader_text5: "Almost done..."
    }
};

// DOM Elements
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');
const faqSearch = document.getElementById('faqSearch');
const searchBtn = document.getElementById('searchBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');
const noResults = document.getElementById('noResults');

// Sound-Elemente
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// Sprach-Elemente
const langBtn = document.getElementById('langBtn');
const langFlag = document.getElementById('langFlag');
const mobileLangBtn = document.getElementById('mobileLangBtn');
const mobileLangFlag = document.getElementById('mobileLangFlag');

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

// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initPageAnalytics();
    initSoundToggle();
    initLanguageToggle();
    updateLanguage();
    initFAQFunctionality();
    initFAQSearch();
    initFAQCategories();
});

// ===== AUDIO =====
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
        getTranslation('toast_sound_title'),
        getTranslation(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'),
        'info'
    );
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
    showToast(
        getTranslation('toast_language_title'),
        getTranslation(currentLang === 'de' ? 'toast_language_de' : 'toast_language_en'),
        'info'
    );
}

function updateLanguage() {
    // Flaggen aktualisieren
    const flagSrc = currentLang === 'de' ? '/assets/img/backgrounds/de.svg' : '/assets/img/backgrounds/en.svg';
    if (langFlag) langFlag.src = flagSrc;
    if (mobileLangFlag) mobileLangFlag.src = flagSrc;

    // Alle Elemente mit data-i18n übersetzen
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (!translation) return;

        // Wenn das Element nur Text enthält oder die Übersetzung HTML-Tags hat
        if (el.children.length === 0 || translation.includes('<')) {
            el.innerHTML = translation;
        } else {
            // Nur den letzten Textknoten aktualisieren (nach dem <span>)
            const textNode = el.childNodes[el.childNodes.length - 1];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = ' ' + translation; // Leerzeichen ggf. anpassen
            }
        }
    });

    // Placeholder übersetzen (data-i18n-placeholder)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            el.placeholder = translation;
        }
    });

    // Seitentitel
    document.title = getTranslation('site_title_faq');
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
        getTranslation('loader_text1_faq'),
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
    showToast(
        getTranslation('toast_welcome_title'),
        getTranslation('toast_welcome_message'),
        'info'
    );
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
            showToast(
                getTranslation('toast_theme_changed'),
                getTranslation('toast_theme_to', { theme: getThemeName(theme) }),
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
function showToast(title, message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    playClickSound();
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft FAQ-Seite geladen');
}

// ===== FAQ FUNCTIONALITY =====
function initFAQFunctionality() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
            
            playClickSound();
            
            // Scroll to item if it was closed and is being opened
            if (!isActive) {
                setTimeout(() => {
                    const headerHeight = header.offsetHeight;
                    const itemPosition = item.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: itemPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

// ===== FAQ SEARCH FUNCTIONALITY =====
function initFAQSearch() {
    if (!faqSearch || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    
    faqSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    let searchTimeout;
    faqSearch.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    function performSearch() {
        const searchTerm = faqSearch.value.trim().toLowerCase();
        let hasResults = false;
        let visibleCount = 0;
        
        if (searchTerm === '') {
            // Reset to show all items
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('highlight');
                
                // Remove highlight from text (reset to original content)
                const question = item.querySelector('.faq-question h4');
                const answer = item.querySelector('.faq-answer p');
                
                if (question) {
                    const key = question.getAttribute('data-i18n');
                    if (key) question.innerHTML = getTranslation(key);
                }
                if (answer) {
                    const key = answer.getAttribute('data-i18n');
                    if (key) answer.innerHTML = getTranslation(key);
                }
            });
            
            noResults.style.display = 'none';
            updateCategoryVisibility();
            return;
        }
        
        // Search through all FAQ items
        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-question h4');
            const answerEl = item.querySelector('.faq-answer p');
            
            if (!questionEl || !answerEl) return;
            
            // Use the translation keys to get current language text for search
            const qKey = questionEl.getAttribute('data-i18n');
            const aKey = answerEl.getAttribute('data-i18n');
            const questionText = qKey ? getTranslation(qKey).toLowerCase() : questionEl.textContent.toLowerCase();
            const answerText = aKey ? getTranslation(aKey).toLowerCase() : answerEl.textContent.toLowerCase();
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('highlight');
                hasResults = true;
                visibleCount++;
                
                // Highlight the search term
                highlightText(questionEl, searchTerm);
                highlightText(answerEl, searchTerm);
                
                // Open the item to show the answer
                item.classList.add('active');
            } else {
                item.style.display = 'none';
                item.classList.remove('highlight');
                item.classList.remove('active');
            }
        });
        
        if (hasResults) {
            noResults.style.display = 'none';
            const msg = getTranslation('faq_search_results').split('|');
            let resultText = '';
            if (visibleCount === 1) resultText = msg[0].replace('{count}', visibleCount);
            else if (visibleCount >= 2 && visibleCount <= 4) resultText = msg[1].replace('{count}', visibleCount);
            else resultText = msg[2].replace('{count}', visibleCount);
            
            showToast(getTranslation('faq_search_btn'), resultText, 'success');
        } else {
            noResults.style.display = 'block';
        }
        
        updateCategoryVisibility();
        playClickSound();
    }
    
    function highlightText(element, searchTerm) {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    function updateCategoryVisibility() {
        document.querySelectorAll('.faq-category').forEach(category => {
            const items = category.querySelectorAll('.faq-item');
            const visibleItems = Array.from(items).filter(item => 
                item.style.display !== 'none'
            );
            category.style.display = visibleItems.length === 0 ? 'none' : 'block';
        });
    }
}

// ===== FAQ CATEGORIES FILTER =====
function initFAQCategories() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.classList.remove('active'); // Close all items when filtering
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateCategoryVisibilityAfterFilter(category);
            playClickSound();
            
            // Show notification
            if (category === 'all') {
                showToast(getTranslation('faq_category_all'), getTranslation('faq_filter_all'), 'info');
            } else {
                const catName = getCategoryName(category);
                showToast(getTranslation('faq_category_filtered'), `${getTranslation('faq_category_filtered')}: ${catName}`, 'info');
            }
        });
    });
    
    function updateCategoryVisibilityAfterFilter(category) {
        document.querySelectorAll('.faq-category').forEach(cat => {
            if (category === 'all') {
                cat.style.display = 'block';
            } else if (cat.id === `category-${category}`) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
    
    function getCategoryName(category) {
        switch(category) {
            case 'general': return getTranslation('faq_category_general');
            case 'tools': return getTranslation('faq_category_tools');
            case 'technical': return getTranslation('faq_category_technical');
            default: return category;
        }
    }
}

// ===== WINDOW RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('show')) closeMobileMenu();
        if (themeDropdown.classList.contains('show')) themeDropdown.classList.remove('show');
    }
    if ((e.key === ' ' || e.key === 'Enter') && e.target === themeBtn) {
        e.preventDefault();
        themeDropdown.classList.toggle('show');
    }
});

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .category-btn, .search-btn, .faq-question'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

// ===== STYLE FÜR SUCH-HIGHLIGHT =====
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: rgba(255, 215, 0, 0.3);
        color: #d8721e;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .faq-item.highlight {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(0, 168, 107, 0.2);
    }
`;
document.head.appendChild(style);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    showToast(
        getTranslation('toast_error_title'),
        getTranslation('toast_error_message'),
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    showToast(getTranslation('toast_online_title'), getTranslation('toast_online_message'), 'success');
});
window.addEventListener('offline', () => {
    showToast(getTranslation('toast_offline_title'), getTranslation('toast_offline_message'), 'warning');
});

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
