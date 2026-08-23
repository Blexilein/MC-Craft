// Support Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Support-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
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
    },
    en: {
        site_title_support: "MC-Craft | Support",
        site_title_short: "MC-Craft",
        site_title_support_email: "MC-Craft | E-Mails",
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
        support_hero_title: "MC-Craft <span class=\"highlight\">Support</span>",
        hero_badge: "V 1.0.0 is here",
        support_hero_desc: "Help and support for all MC-Craft tools. Our team is available to solve problems and answer questions.",
        support_hero_btn_discord: "Discord Support",
        support_hero_btn_email: "Email Page",
        support_grid_discord: "Discord",
        support_grid_email: "Email",
        support_grid_live: "Live Support",
        support_grid_faq: "FAQ",
        email_page_title: "E-Mails <span class=\"highlight\">Contact</span>",
        email_page_desc: "Use direct email contact for bug reports, business requests, and detailed support messages.",
        email_page_btn_contact: "Show Contact",
        email_page_btn_back: "Back to Support",
        email_page_grid1: "Requests",
        email_page_grid2: "Bug Reports",
        email_page_grid3: "Business",
        email_page_grid4: "Response Time",
        email_page_note: "If your case is urgent, use our Discord support as well for faster responses.",
        email_page_btn_discord: "Open Discord",
        email_info_title: "General Inquiries",
        email_info_desc: "General questions about MC-Craft, feedback, and first contact requests.",
        email_contact_title: "Contact",
        email_contact_desc: "General contact requests about MC-Craft, feedback, and notes.",
        email_support_title: "Support",
        email_support_desc: "Questions about usage, help with tools, and technical support.",
        email_bug_title: "Bug Reports",
        email_bug_desc: "Errors, display issues, or unexpected behavior on the website.",
        email_business_title: "Business & Partnerships",
        email_business_desc: "Collaborations, partnerships, press, or business inquiries.",
        email_privacy_title: "Privacy",
        email_privacy_desc: "Requests related to privacy, personal data, or information access.",
        email_security_title: "Security",
        email_security_desc: "Report vulnerabilities or sensitive technical security issues.",
        support_discord_title: "Discord <span class=\"highlight\">Support</span>",
        support_discord_subtitle: "Quick help and community support via our Discord server",
        support_discord_widget_title: "MC-Craft Community Discord",
        support_discord_btn: "Join Discord",
        support_card1_title: "Fast Help",
        support_card1_desc: "Get immediate help from our community and support team. Average response time: 15 minutes.",
        support_card2_title: "Active Community",
        support_card2_desc: "Over 1,000 active members help each other with questions about Minecraft and our tools.",
        support_card3_title: "Developer Contact",
        support_card3_desc: "Talk directly to MC-Craft developers and give feedback on new features.",
        support_card4_title: "Updates & News",
        support_card4_desc: "Stay informed about all updates, new tools and upcoming features.",
        support_features_title: "Why <span class=\"highlight\">Discord?</span>",
        support_features_subtitle: "The best reasons for our Discord support",
        support_feature1_title: "Live Chat",
        support_feature1_desc: "Real-time support from our team",
        support_feature2_title: "Tutorials",
        support_feature2_desc: "Detailed guides for all tools",
        support_feature3_title: "Security",
        support_feature3_desc: "Moderated and safe environment",
        support_feature4_title: "Tips & Tricks",
        support_feature4_desc: "Learn from experienced Minecraft players",
        support_email_title: "E-Mails <span class=\"highlight\">Contact</span>",
        support_email_subtitle: "Formal support for complex inquiries",
        support_email_card_title: "Direct Contact",
        support_email_card_desc: "For detailed inquiries, bug reports or business matters, use our email support.",
        support_email_btn: "Send Email",
        support_faq_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
        support_faq_subtitle: "Answers to frequently asked questions",
        support_faq_q1: "How quickly will I get help on Discord?",
        support_faq_a1: "Our support team is active weekdays from 10:00 AM to 6:00 PM. Average response time is 15-30 minutes.",
        support_faq_q2: "Can I ask for help in English?",
        support_faq_a2: "Yes, our team speaks both German and English. You can make your request in either language.",
        support_faq_q3: "How do I report a bug?",
        support_faq_a3: "You can report bugs either on Discord in the #bug-reports channel or by email to support@mc-craft.com. Please describe the bug in as much detail as possible.",
        support_faq_q4: "Can I suggest new features?",
        support_faq_a4: "Yes! We welcome feature suggestions. Use the #suggestions channel on Discord or email us.",
        support_faq_cta: "More questions? Visit our <a href=\"/blog/faq.html\">FAQ page</a> or contact us directly.",
        support_faq_link: "FAQ page",
        support_cta_title: "Need help?",
        support_cta_desc: "Our support team is happy to assist you. Don't hesitate to contact us with any problems or questions.",
        support_cta_btn: "Join Discord",
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
        toast_welcome_title: "Support page loaded!",
        toast_welcome_message: "We're happy to help!",
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
        loader_text1_support: "MC-Craft Support is loading...",
        loader_text2: "Preparing Discord widget...",
        loader_text3: "Loading email support...",
        loader_text4: "Loading FAQ...",
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
const faqItems = document.querySelectorAll('.faq-item');

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
    initSupportCards();
    initFAQ();
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

    // Seitentitel: verwende den data-i18n-Key aus dem <title>-Tag der aktuellen Seite
    const pageTitleEl = document.querySelector('title[data-i18n]');
    const pageTitleKey = pageTitleEl?.getAttribute('data-i18n');
    document.title = pageTitleKey ? getTranslation(pageTitleKey) : getTranslation('site_title_support');
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
        getTranslation('loader_text1_support'),
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
    if (type === 'bug') icon = 'fas fa-bug';
    if (type === 'info') icon = 'fab fa-discord';
    
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .faq-question'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

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
