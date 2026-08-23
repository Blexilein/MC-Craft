// Impressum Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Impressum-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title_impressum: "MC-Craft | Impressum",
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
        impressum_badge: "Rechtliches",
        impressum_hero_title: "Impressum & <span class=\"highlight\">Kontakt</span>",
        hero_badge: "V 1.0.0 ist da",
        impressum_hero_desc: "Rechtliche Informationen und Kontaktdaten von MC-Craft. Wir sind für Sie da!",
        impressum_btn_read: "Impressum lesen",
        impressum_btn_privacy: "Zum Datenschutz",
        // Karten
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
        impressum_card2_note: "Bitte haben Sie Verständnis, dass wir keine telefonische Unterstützung anbieten können. Für Anfragen nutzen Sie bitte ausschließlich die oben genannten E-Mail-Adressen. Wir sind gemäß Art. 12 DSGVO bemüht, Anfragen innerhalb eines Monats zu beantworten.",
        impressum_card3_title: "Haftungsausschluss",
        impressum_card3_sub1: "Haftung für Inhalte",
        impressum_card3_text1: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
        impressum_card3_sub2: "Haftung für Links",
        impressum_card3_text2: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung jedoch nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
        impressum_card3_sub3: "Urheberrecht",
        impressum_card3_text3: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
        impressum_card4_title: "Datenschutz",
        impressum_card4_text1: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.",
        impressum_card4_text2: 'Weitere Informationen zum Datenschutz finden Sie in unserer <a href="/blog/datenschutz.html">Datenschutzerklärung</a>.',
        impressum_card4_text3: 'Weitere Informationen zu unseren Nutzungsbedingungen finden Sie in unseren <a href="/blog/nutzungsbedingungen.html">Nutzungsbedingungen</a>.',
        impressum_card4_text4: 'Weitere Informationen zu unserem Copyright finden Sie in unserer <a href="/blog/copyright.html">Copyright</a>-Seite.',
        impressum_card5_title: "Verwendete Technologien",
        impressum_card5_text: "MC-Craft verwendet folgende Technologien und Dienste:",
        impressum_card5_li1: "HTML5, CSS3, JavaScript für die Frontend-Entwicklung",
        impressum_card5_li2: "Font Awesome für Icons (selbst gehostet, keine Anfrage an Cloudflare)",
        impressum_card5_li3: "Google Fonts für Schriftarten (selbst gehostet, keine Anfrage an Google)",
        impressum_card5_li4: "Offizielle Minecraft-/Mojang-APIs für Skin-Abfragen, Server-Status und mehr",
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
        // CTA
        impressum_cta_title: "Haben Sie Fragen?",
        impressum_cta_desc: "Bei rechtlichen Fragen oder anderen Anliegen stehen wir Ihnen gerne zur Verfügung.",
        impressum_cta_btn_email: "E-Mail schreiben",
        impressum_cta_btn_privacy: "Datenschutz ansehen",
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
        // Loader
        loader_text1_impressum: "Impressum wird geladen...",
        loader_text2: "Rechtliche Informationen werden geladen...",
        loader_text3: "Kontaktdaten werden geladen...",
        loader_text4: "Haftungsausschluss wird geladen...",
        loader_text5: "Fast fertig..."
    },
    en: {
        site_title_impressum: "MC-Craft | Imprint",
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
        impressum_badge: "Legal",
        impressum_hero_title: "Imprint & <span class=\"highlight\">Contact</span>",
        hero_badge: "V 1.0.0 is here",
        impressum_hero_desc: "Legal information and contact details of MC-Craft. We are here for you!",
        impressum_btn_read: "Read Imprint",
        impressum_btn_privacy: "To Privacy Policy",
        impressum_card1_title: "Information according to § 5 DDG",
        impressum_card1_line1: "<strong>MC-Craft</strong><br>Operated by: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Germany",
        impressum_card1_line2: "<strong>VAT ID:</strong> Not applicable. MC-Craft is run privately, on a non-commercial basis, and generates no revenue.",
        impressum_card2_title: "Contact",
        impressum_contact_general: "General inquiries:",
        impressum_contact_contact: "Contact:",
        impressum_contact_support: "Support:",
        impressum_contact_bug: "Report a bug:",
        impressum_contact_business: "Business & partnerships:",
        impressum_contact_privacy: "Privacy:",
        impressum_contact_security: "Security:",
        impressum_card2_note: "Please understand that we cannot offer telephone support. For inquiries, please use exclusively the email addresses mentioned above. In accordance with Art. 12 GDPR, we aim to respond to inquiries within one month.",
        impressum_card3_title: "Disclaimer",
        impressum_card3_sub1: "Liability for content",
        impressum_card3_text1: "As a service provider, we are responsible for our own content on these pages under general laws pursuant to § 7 para.1 DDG (Digital Services Act, Germany's implementation of the EU Digital Services Act, which replaced the former TMG in 2024). According to §§ 8 to 10 DDG, we as a service provider are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. Any liability in this respect is only possible from the point in time at which a specific legal infringement becomes known. Upon becoming aware of any such infringements, we will remove the relevant content immediately.",
        impressum_card3_sub2: "Liability for links",
        impressum_card3_text2: "Our offer contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any liability for this external content. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. A permanent review of the linked pages' content without concrete evidence of a violation is unreasonable. Upon becoming aware of any legal violations, we will remove such links immediately.",
        impressum_card3_sub3: "Copyright",
        impressum_card3_text3: "The content and works created by the site operators on these pages are subject to German copyright law. Third-party contributions are identified as such. Duplication, processing, distribution, and any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator.",
        impressum_card4_title: "Privacy",
        impressum_card4_text1: "The use of our website is generally possible without providing personal data. As far as personal data (e.g., name, address, or email addresses) is collected on our pages, this is always done on a voluntary basis as far as possible.",
        impressum_card4_text2: 'For more information on data protection, see our <a href="/blog/datenschutz.html">Privacy Policy</a>.',
        impressum_card4_text3: 'For more information on our terms of use, see our <a href="/blog/nutzungsbedingungen.html">Terms of Use</a>.',
        impressum_card4_text4: 'For more information on our copyright, see our <a href="/blog/copyright.html">Copyright</a> page.',
        impressum_card5_title: "Technologies Used",
        impressum_card5_text: "MC-Craft uses the following technologies and services:",
        impressum_card5_li1: "HTML5, CSS3, JavaScript for frontend development",
        impressum_card5_li2: "Font Awesome for icons (self-hosted, no request to Cloudflare)",
        impressum_card5_li3: "Google Fonts for fonts (self-hosted, no request to Google)",
        impressum_card5_li4: "Official Minecraft/Mojang APIs for skin lookups, server status, and more",
        impressum_card5_li5: "Responsive design for mobile devices",
        impressum_card5_li6: "LocalStorage for language, theme, sound and other preferences",
        impressum_card5_li7: "Cookie banner to control optional external content",
        impressum_card5_link: "A full list of every externally contacted service is in our <a href=\"/blog/datenschutz.html\">privacy policy</a>.",
        impressum_card6_title: "Note on Minecraft trademarks",
        impressum_card6_text1: "MC-Craft is a fan project and is not affiliated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Studios. All rights to Minecraft and related trademarks belong to Mojang Studios and Microsoft.",
        impressum_card6_text2: "This website and its services are in no way associated with Mojang Studios or Microsoft. We respect the rights of the trademark owners and merely provide tools and information for the Minecraft community.",
        impressum_card6_text3: "For the official Minecraft terms of use, privacy policy, and community guidelines, please visit the official Mojang website:",
        impressum_card6_text4: "For more information on Minecraft terms of use, see",
        impressum_card6_text5: "For more information on Minecraft privacy policy, see",
        impressum_card6_text6: "For more information on Minecraft community guidelines, see",
        impressum_card6_note_title: "Important:",
        impressum_card6_note_text: "This site is a fan project and has no official connection to Mojang or Microsoft.",
        impressum_cta_title: "Do you have questions?",
        impressum_cta_desc: "For legal questions or other concerns, we are happy to help.",
        impressum_cta_btn_email: "Write an email",
        impressum_cta_btn_privacy: "View Privacy Policy",
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
        toast_welcome_title: "Imprint page loaded!",
        toast_welcome_message: "Legal information is displayed!",
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
        loader_text1_impressum: "Imprint is loading...",
        loader_text2: "Loading legal information...",
        loader_text3: "Loading contact details...",
        loader_text4: "Loading disclaimer...",
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
    initImpressumCards();
    initFooterYear();
    initSoundToggle();
    initLanguageToggle();
    updateLanguage();
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

    // Seitentitel
    document.title = getTranslation('site_title_impressum');
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
        getTranslation('loader_text1_impressum'),
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
function showToast(title, message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'bug') icon = 'fas fa-bug';
    if (type === 'info') icon = 'fas fa-gavel'; // für rechtliche Hinweise
    
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
    }, 7000); // ⬅️ 7 Sekunden
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

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
