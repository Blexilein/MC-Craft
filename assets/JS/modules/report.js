// Bug Report Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Bug-Report-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title_bugreport: "MC-Craft | Bug Report über Discord",
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
        bugreport_hero_title: "Bug <span class=\"highlight\">Report</span>",
        hero_badge: "V 1.0.0 ist da",
        bugreport_hero_desc: "Hast du einen Fehler entdeckt? Melde ihn direkt auf unserem Discord-Server! So bekommst du schnellste Hilfe von unserer Community und den Entwicklern.",
        bugreport_hero_btn_discord: "Discord öffnen",
        bugreport_hero_btn_support: "Allgemeiner Support",
        bugreport_grid_discord: "Schnelle Hilfe",
        bugreport_grid_bug: "Bug melden",
        bugreport_grid_quick: "Sofortige Antwort",
        bugreport_grid_community: "Community Support",
        // Discord Section
        bugreport_discord_title: "Bug Report auf <span class=\"highlight\">Discord</span>",
        bugreport_discord_subtitle: "Trete unserem Server bei und melde deinen Bug im #bug-report Channel",
        bugreport_widget_title: "MC-Craft Bug Report Discord",
        bugreport_widget_btn: "Discord Server betreten",
        bugreport_widget_hint: "Nach dem Beitritt gehe zum Channel #bug-report",
        bugreport_card1_title: "Schnelle Hilfe",
        bugreport_card1_desc: "Unser Team antwortet meist innerhalb von 15-30 Minuten. Perfekt für kritische Bugs und dringende Probleme.",
        bugreport_card2_title: "Community Support",
        bugreport_card2_desc: "Andere Benutzer können bestätigen, ob sie das gleiche Problem haben und helfen bei der Fehlerbeschreibung.",
        bugreport_card3_title: "Direkter Kontakt",
        bugreport_card3_desc: "Sprich direkt mit den Entwicklern. Wir können Screenshots sofort besprechen und Lösungen finden.",
        bugreport_card4_title: "Live Updates",
        bugreport_card4_desc: "Verfolge den Fortschritt deines Bug-Reports in Echtzeit und erhalte sofort Feedback zu deinem Problem.",
        // Features
        bugreport_features_title: "So meldest du <span class=\"highlight\">einen Bug</span>",
        bugreport_features_subtitle: "4 einfache Schritte zur perfekten Bug-Meldung",
        bugreport_step1_title: "1. Discord beitreten",
        bugreport_step1_desc: "Klicke auf \"Discord Server betreten\" und trete unserem Server bei",
        bugreport_step2_title: "2. Channel finden",
        bugreport_step2_desc: "Navigiere zum Channel <strong>#bug-report</strong> oder <strong>#support</strong>",
        bugreport_step3_title: "3. Bug beschreiben",
        bugreport_step3_desc: "Poste eine detaillierte Beschreibung deines Problems",
        bugreport_step4_title: "4. Screenshots teilen",
        bugreport_step4_desc: "Lade Screenshots hoch, die den Bug deutlich zeigen",
        // E-Mail Section
        bugreport_email_title: "Formeller <span class=\"highlight\">Bug-Report</span>",
        bugreport_email_subtitle: "Für detaillierte Bug-Beschreibungen und Screenshots",
        bugreport_email_card_title: "E-Mail Bug-Report",
        bugreport_email_card_desc: "Für komplexe Bugs mit vielen Screenshots oder detaillierten Anleitungen kannst du uns auch eine E-Mail senden.",
        bugreport_email_btn: "E-Mail senden",
        // FAQ
        bugreport_faq_title: "Häufige <span class=\"highlight\">Fragen</span>",
        bugreport_faq_subtitle: "Alles, was du über Bug-Reports wissen musst",
        bugreport_faq_q1: "Wie lange dauert eine Antwort auf Discord?",
        bugreport_faq_a1: "Normalerweise innerhalb von <strong>15-60 Minuten</strong> während unserer Supportzeiten (Mo-Fr 10:00-18:00 Uhr). An Wochenenden kann es etwas länger dauern.",
        bugreport_faq_q2: "Was passiert nachdem ich einen Bug gemeldet habe?",
        bugreport_faq_a2: "1. Unser Team prüft deinen Report\n2. Bug wird kategorisiert und priorisiert\n3. Entwicklung zur Behebung beginnt\n4. Du erhältst Updates im Discord-Channel",
        bugreport_faq_q3: "Kann ich mehrere Bugs auf einmal melden?",
        bugreport_faq_a3: "Am besten meldest du jeden Bug in einer separaten Nachricht. Das hilft uns bei der Nachverfolgung und schnelleren Behebung.",
        bugreport_faq_q4: "Welche Informationen sollte ich bereithalten?",
        bugreport_faq_a4: "• Welches Tool betroffen ist\n• Genauer Fehlerbeschreibung\n• Screenshots oder Videos\n• Browser und Betriebssystem\n• Schritte zum Reproduzieren",
        bugreport_faq_cta: "Weitere Fragen? Besuche unsere <a href=\"/blog/faq.html\">FAQ-Seite</a> oder kontaktiere uns direkt.",
        bugreport_faq_link: "FAQ-Seite",
        // CTA
        bugreport_cta_title: "Bereit, deinen Bug zu melden?",
        bugreport_cta_desc: "Je schneller du meldest, desto schneller können wir helfen! Nutze Discord für sofortige Unterstützung.",
        bugreport_cta_btn_discord: "Discord beitreten",
        bugreport_cta_btn_email: "Per E-Mail melden",
        bugreport_cta_tip: "Tipp:",
        bugreport_cta_tip_text: "Mache Screenshots bevor du den Bug meldest!",
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
        toast_welcome_title: "Bug Report geladen!",
        toast_welcome_message: "Melde Bugs jetzt über Discord!",
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
        toast_error_message: "Ein kleiner Fehler ist aufgetreten. Melde diesen Bug bitte auf Discord.",
        toast_online_title: "Verbindung wiederhergestellt",
        toast_online_message: "Du bist wieder online!",
        toast_offline_title: "Offline Modus",
        toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
        toast_discord_ready: "Klicke um unserem Discord Server beizutreten!",
        toast_discord_redirect: "Du wirst zu unserem Discord Server weitergeleitet...",
        toast_discord_redirect_message: "Du wirst zu unserem Server weitergeleitet...",
        toast_email_opening: "E-Mail wird geöffnet",
        toast_email_copied: "E-Mail kopiert",
        // Loader
        loader_text1_bugreport: "Bug Report wird geladen...",
        loader_text2: "Discord-Widget wird vorbereitet...",
        loader_text3: "Support-Karten werden geladen...",
        loader_text4: "FAQ wird vorbereitet...",
        loader_text5: "Fast fertig..."
    },
    en: {
        site_title_bugreport: "MC-Craft | Bug Report via Discord",
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
        bugreport_hero_title: "Bug <span class=\"highlight\">Report</span>",
        hero_badge: "V 1.0.0 is here",
        bugreport_hero_desc: "Did you find a bug? Report it directly on our Discord server! This way you get the fastest help from our community and developers.",
        bugreport_hero_btn_discord: "Open Discord",
        bugreport_hero_btn_support: "General Support",
        bugreport_grid_discord: "Fast Help",
        bugreport_grid_bug: "Report Bug",
        bugreport_grid_quick: "Immediate Response",
        bugreport_grid_community: "Community Support",
        bugreport_discord_title: "Bug Report on <span class=\"highlight\">Discord</span>",
        bugreport_discord_subtitle: "Join our server and report your bug in the #bug-report channel",
        bugreport_widget_title: "MC-Craft Bug Report Discord",
        bugreport_widget_btn: "Join Discord Server",
        bugreport_widget_hint: "After joining, go to channel #bug-report",
        bugreport_card1_title: "Fast Help",
        bugreport_card1_desc: "Our team usually responds within 15-30 minutes. Perfect for critical bugs and urgent problems.",
        bugreport_card2_title: "Community Support",
        bugreport_card2_desc: "Other users can confirm if they have the same issue and help with the error description.",
        bugreport_card3_title: "Direct Contact",
        bugreport_card3_desc: "Talk directly to the developers. We can discuss screenshots immediately and find solutions.",
        bugreport_card4_title: "Live Updates",
        bugreport_card4_desc: "Track the progress of your bug report in real time and get immediate feedback on your issue.",
        bugreport_features_title: "How to report <span class=\"highlight\">a bug</span>",
        bugreport_features_subtitle: "4 simple steps to the perfect bug report",
        bugreport_step1_title: "1. Join Discord",
        bugreport_step1_desc: "Click on \"Join Discord Server\" and join our server",
        bugreport_step2_title: "2. Find channel",
        bugreport_step2_desc: "Navigate to channel <strong>#bug-report</strong> or <strong>#support</strong>",
        bugreport_step3_title: "3. Describe bug",
        bugreport_step3_desc: "Post a detailed description of your problem",
        bugreport_step4_title: "4. Share screenshots",
        bugreport_step4_desc: "Upload screenshots that clearly show the bug",
        bugreport_email_title: "Formal <span class=\"highlight\">Bug Report</span>",
        bugreport_email_subtitle: "For detailed bug descriptions and screenshots",
        bugreport_email_card_title: "Email Bug Report",
        bugreport_email_card_desc: "For complex bugs with many screenshots or detailed instructions, you can also send us an email.",
        bugreport_email_btn: "Send Email",
        bugreport_faq_title: "Frequently Asked <span class=\"highlight\">Questions</span>",
        bugreport_faq_subtitle: "Everything you need to know about bug reports",
        bugreport_faq_q1: "How long does a response on Discord take?",
        bugreport_faq_a1: "Usually within <strong>15-60 minutes</strong> during our support hours (Mon-Fri 10:00-18:00). On weekends it may take a little longer.",
        bugreport_faq_q2: "What happens after I report a bug?",
        bugreport_faq_a2: "1. Our team checks your report\n2. Bug is categorized and prioritized\n3. Development to fix begins\n4. You receive updates in the Discord channel",
        bugreport_faq_q3: "Can I report multiple bugs at once?",
        bugreport_faq_a3: "It's best to report each bug in a separate message. This helps us track and fix them faster.",
        bugreport_faq_q4: "What information should I have ready?",
        bugreport_faq_a4: "• Which tool is affected\n• Detailed error description\n• Screenshots or videos\n• Browser and operating system\n• Steps to reproduce",
        bugreport_faq_cta: "More questions? Visit our <a href=\"/blog/faq.html\">FAQ page</a> or contact us directly.",
        bugreport_faq_link: "FAQ page",
        bugreport_cta_title: "Ready to report your bug?",
        bugreport_cta_desc: "The sooner you report, the sooner we can help! Use Discord for immediate support.",
        bugreport_cta_btn_discord: "Join Discord",
        bugreport_cta_btn_email: "Report via Email",
        bugreport_cta_tip: "Tip:",
        bugreport_cta_tip_text: "Take screenshots before reporting the bug!",
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
        toast_welcome_title: "Bug Report loaded!",
        toast_welcome_message: "Report bugs now via Discord!",
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
        toast_error_message: "A small error occurred. Please report this bug on Discord.",
        toast_online_title: "Connection restored",
        toast_online_message: "You are back online!",
        toast_offline_title: "Offline mode",
        toast_offline_message: "Some features may not be available.",
        toast_discord_ready: "Click to join our Discord server!",
        toast_discord_redirect: "You are being redirected to our Discord server...",
        toast_discord_redirect_message: "You are being redirected to our server...",
        toast_email_opening: "Opening email",
        toast_email_copied: "Email copied",
        loader_text1_bugreport: "Bug Report is loading...",
        loader_text2: "Preparing Discord widget...",
        loader_text3: "Loading support cards...",
        loader_text4: "Preparing FAQ...",
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
const supportCards = document.querySelectorAll('.support-card');
const featureItems = document.querySelectorAll('.feature-item');
const emailCard = document.querySelector('.email-card');

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
    initFeatureItems();
    initEmailCard();
    initFAQ();
    initDiscordWidget();
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
    document.title = getTranslation('site_title_bugreport');
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
        getTranslation('loader_text1_bugreport'),
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
    }, 7000);
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
    console.log('MC-Craft Bug Report Seite geladen');
}

// ===== SUPPORT CARDS INTERACTIVITY (Original) =====
function initSupportCards() {
    supportCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FEATURE ITEMS INTERACTIVITY (Original) =====
function initFeatureItems() {
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// ===== EMAIL CARD INTERACTIVITY (Original) =====
function initEmailCard() {
    if (emailCard) {
        emailCard.style.opacity = '0';
        emailCard.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            emailCard.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            emailCard.style.opacity = '1';
            emailCard.style.transform = 'scale(1)';
        }, 500);
    }
}

// ===== FAQ SYSTEM (Original) =====
function initFAQ() {
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 300);
        
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

// ===== DISCORD WIDGET (Original) =====
function initDiscordWidget() {
    const discordWidget = document.querySelector('.discord-widget iframe');
    if (discordWidget) {
        discordWidget.addEventListener('load', () => {
            console.log('Discord Widget geladen');
            showToast(
                getTranslation('toast_discord_ready') || 'Discord Widget bereit',
            //  getTranslation('toast_discord_ready_message') || 'Klicke um unserem Server beizutreten!',
                'info'
            );
        });
    }
    
    const discordButtons = document.querySelectorAll('a[href*="discord"], .btn-discord');
    discordButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Discord Link geklickt');
            showToast(
                getTranslation('toast_discord_redirect') || 'Discord öffnen',
                getTranslation('toast_discord_redirect_message') || 'Du wirst zu unserem Server weitergeleitet...',
                'info'
            );
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

// ===== PERFORMANCE OPTIMIZATION (Original) =====
function preloadImages() {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif',
        '/assets/img/favicon/mc-craft.png'
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
window.openDiscordQuick = function() {
    playClickSound();
    showToast(
        getTranslation('toast_discord_redirect'),
        getTranslation('toast_discord_redirect_message'),
        'info'
    );
    setTimeout(() => {
        window.open('https://discord.gg/eVVpQD75w4', '_blank');
    }, 500);
};

window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};

window.playBugSound = function() {
    playClickSound();
};

window.playSuccessSound = function() {
    playClickSound();
    setTimeout(playClickSound, 120);
};
