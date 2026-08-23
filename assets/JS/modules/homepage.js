// Main JavaScript File for MC-Craft
// By Blexilein

// ===== ERWEITERUNG: Sound- und Sprach-Toggle =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle vorhandenen und neuen Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title: "MC-Craft | Minecraft Tools",
        site_title_short: "MC-Craft",
        // Loader
        loader_text1: "MC-Craft wird geladen...",
        loader_text2: "Items werden geladen...",
        loader_text3: "Textkonverter initialisiert...",
        loader_text4: "Mobs werden generiert...",
        loader_text5: "Server Status geprüft...",
        loader_text6: "Skin Editor vorbereitet...",
        loader_text7: "Fast fertig...",
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
        nav_versions: "Minecraft Versionen",
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
        hero_badge: "V 1.0.0 ist da",
        hero_title: "Deine <span class=\"highlight\">Minecraft</span> <span class=\"highlight\">Tools</span> Plattform",
        hero_description: "Alles, was du für dein nächstes Abenteuer brauchst. Kostenlos, schnell und immer verfügbar.",
        hero_btn_converter: "Text Konverter → ",
        hero_btn_all_tools: "Alle Tools",
        hero_grid_text_tools: "Text Tools",
        hero_grid_items_db: "Items DB",
        hero_grid_server_check: "Server Check",
        hero_grid_skin_lookup: "Skin Suche",
        // Features
        features_title: "Unsere <span class=\"highlight\">Tools</span>",
        features_subtitle: "Alles was du für dein Minecraft-Abenteuer brauchst",
        // Tool Cards
        tool1_title: "Text Konverter",
        tool1_desc: "Konvertiere normalen Text in Minecraft-Standard-Galakti-Alphabet für deine Projekte.",
        tool2_title: "Farbtext-Konverter",
        tool2_desc: "Erstelle farbigen Text für deinen Server-MOTD oder Chat mit einfachen Farbcodes.",
        tool_beacon_title: "Beacon Farb-Mixer",
        tool_beacon_desc: "Mische eine Wunschfarbe und finde die richtige Glas-Kombination für deinen Beacon-Strahl.",
        tool_mob_qr_title: "QR Generator",
        tool_mob_qr_desc: "Erstelle scanbare QR-Codes mit Minecraft-Gesichtern, ganzen Mob-Körpern, Items oder Blöcken.",
        tool3_title: "Items Datenbank",
        tool3_desc: "Finde alle Minecraft-Items mit detaillierten Informationen (Nur Java Edition).",
        tool4_title: "Mobs Guide",
        tool4_desc: "Alle Minecraft-Mobs mit Eigenschaften, Verhalten und Drops auf einen Blick (Nur Java Edition).",
        tool5_title: "Tag-Nacht-Zyklus",
        tool5_desc: "Stelle die Minecraft‑Zeit ein und verstehe den Tag-Nacht-Zyklus und wie er dein Spielerlebnis beeinflusst.",
        tool6_title: "Server Status",
        tool6_desc: "Prüfe den Status von Minecraft-Servern (Java & Bedrock Edition) in Echtzeit.",
        tool7_title: "Skin Lookup",
        tool7_desc: "Finde Minecraft-Skins, UUIDs und Cape-Informationen von Spielern (Nur Java Edition).",
        tool8_title: "Skin Editor (Alpha V 0.8.0)",
        tool8_desc: "Bearbeite und erstelle deine eigenen Minecraft-Skins im Browser (Nur Java Edition).",
        tool_versions_title: "Minecraft Versionen",
        tool_versions_desc: "Durchsuche Stable Releases, Snapshot Preview, Beta und Alpha in einer Uebersicht ohne Download-Labels.",
        tool_api_title: 'Minecraft API Status',
        tool_api_desc: 'Prüfe den aktuellen Status der offiziellen Minecraft- und Mojang-Dienste.',
        tool_adv_title: 'Advancement Generator',
        tool_adv_desc: 'Erstelle eigene Achievement- und Advancement-Bilder mit Icon, zwei Textzeilen und freien Farben als PNG.',
        tool_open: "Tool öffnen",
        // Capes & Skins & End Poem
        capes_title: "Minecraft <span class=\"highlight\">Capes & Skins & End Poem</span>",
        capes_subtitle: "Offizielle Minecraft-Capes und Skin-Sammlungen",
        capes_db_title: "Cape-Datenbank",
        capes_db_desc: "Alle offiziellen Minecraft-Capes: Minecon, Migrator, Realms & mehr mit Details.",
        capes_discover: "Capes Entdecken",
        skins_library_title: "Skin-Bibliothek",
        skins_library_desc: "Alle offiziellen Minecraft Skins.",
        skins_discover: "Skins Entdecken",
        end_poem_title: "End Poem",
        end_poem_desc: "Erlebe das berühmte End Poem aus Minecraft interaktiv. Das Gedicht erscheint nach dem Besiegen des Enderdrachen.",
        end_poem_discover: "End Poem Entdecken",
        // Coming Soon Vorschau
        roadmap_eyebrow: "Demnächst bei MC-Craft",
        roadmap_title: "Neue Tools sind unterwegs",
        roadmap_description: "Diese Funktionen sind bereits für kommende Updates geplant.",
        roadmap_button: "Alle geplanten Funktionen",
        roadmap_enchantment: "Verzauberungsplaner",
        roadmap_nether: "Nether-Koordinaten-Rechner",
        roadmap_stack: "Stack-Rechner",
        roadmap_commands: "Befehlsgenerator",
        roadmap_status_planned: "In Planung",
        // Stats
        stats_items: "Items in der Datenbank",
        stats_mobs: "Verschiedene Mobs in der Datenbank",
        stats_free: "Kostenlos",
        stats_online: "Online",
        // CTA
        cta_title: "Bereit für dein nächstes Abenteuer?",
        cta_desc: "Starte jetzt mit unseren Tools und verbessere dein Minecraft-Erlebnis.",
        cta_start: "Jetzt starten",
        cta_view_all: "Alle Tools ansehen",
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
        toast_welcome_title: "MC-Craft geladen!",
        toast_welcome_message: "Viel Spaß mit unseren Minecraft-Tools!",
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
        toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar."
    },
    en: {
        // Allgemein
        site_title: "MC-Craft | Minecraft Tools",
        site_title_short: "MC-Craft",
        // Loader
        loader_text1: "MC-Craft is loading...",
        loader_text2: "Loading items...",
        loader_text3: "Initializing text converter...",
        loader_text4: "Generating mobs...",
        loader_text5: "Checking server status...",
        loader_text6: "Preparing skin editor...",
        loader_text7: "Almost done...",
        // Navigation
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
        nav_versions: "Minecraft Versions",
        nav_skins: "Skin Library",
        // Dropdowns
        tools_dropdown: "Tools",
        discover_dropdown: "Explore",
        // Theme
        theme_overworld: "Overworld",
        theme_nether: "Nether",
        theme_end: "The End",
        theme_select: "Choose Theme:",
        // Sound & Language
        sound_toggle: "Sound",
        language: "Language",
        // Hero
        hero_badge: "V 1.0.0 is here",
        hero_title: "Your <span class=\"highlight\">Minecraft</span> <span class=\"highlight\">Tools</span> Platform",
        hero_description: "Everything you need for your next adventure. Free, fast and always available.",
        hero_btn_converter: "Text Converter → ",
        hero_btn_all_tools: "All Tools",
        hero_grid_text_tools: "Text Tools",
        hero_grid_items_db: "Items DB",
        hero_grid_server_check: "Server Check",
        hero_grid_skin_lookup: "Skin Finder",
        // Features
        features_title: "Our <span class=\"highlight\">Tools</span>",
        features_subtitle: "Everything you need for your Minecraft adventure",
        // Tool Cards
        tool1_title: "Text Converter",
        tool1_desc: "Convert normal text into Minecraft's Standard Galactic Alphabet for your projects.",
        tool2_title: "Color Text Converter",
        tool2_desc: "Create colored text for your server MOTD or chat using simple color codes.",
        tool_beacon_title: "Beacon Color Mixer",
        tool_beacon_desc: "Pick a target color and get the right glass combination for your beacon beam.",
        tool_mob_qr_title: "QR Generator",
        tool_mob_qr_desc: "Create scannable QR codes with Minecraft faces, full mob bodies, items or blocks.",
        tool3_title: "Items Database",
        tool3_desc: "Find all Minecraft items with detailed information (Java Edition only).",
        tool4_title: "Mobs Guide",
        tool4_desc: "All Minecraft mobs with properties, behavior and drops at a glance (Java Edition only).",
        tool5_title: "Day-Night Cycle",
        tool5_desc: "Set the Minecraft time and understand the day-night cycle and how it affects your gameplay.",
        tool6_title: "Server Status",
        tool6_desc: "Check the status of Minecraft servers (Java & Bedrock Edition) in real time.",
        tool7_title: "Skin Lookup",
        tool7_desc: "Find Minecraft skins, UUIDs and cape information of players (Java Edition only).",
        tool8_title: "Skin Editor (Alpha V 0.8.0)",
        tool8_desc: "Edit and create your own Minecraft skins in the browser (Java Edition only).",
        tool_versions_title: "Minecraft Versions",
        tool_versions_desc: "Browse stable releases, snapshot preview, beta, and alpha in one view without download labels.",
        tool_api_title: 'Minecraft API Status',
        tool_api_desc: 'Check the current status of the official Minecraft and Mojang services.',
        tool_adv_title: 'Advancement Generator',
        tool_adv_desc: 'Create your own achievement and advancement images with icon, two text lines and custom colors as PNG.',
        tool_open: "Open Tool",
        // Capes & Skins & End Poem
        capes_title: "Minecraft <span class=\"highlight\">Capes & Skins & End Poem</span>",
        capes_subtitle: "Official Minecraft capes and skin collections",
        capes_db_title: "Capes Database",
        capes_db_desc: "All official Minecraft capes: Minecon, Migrator, Realms & more with details.",
        capes_discover: "Discover Capes",
        skins_library_title: "Skin Library",
        skins_library_desc: "All official Minecraft skins.",
        skins_discover: "Discover Skins",
        end_poem_title: "End Poem",
        end_poem_desc: "Experience the famous End Poem from Minecraft interactively. The poem appears after defeating the Ender Dragon.",
        end_poem_discover: "Discover End Poem",
        // Coming Soon preview
        roadmap_eyebrow: "Coming soon to MC-Craft",
        roadmap_title: "New tools are on the way",
        roadmap_description: "These features are already planned for future updates.",
        roadmap_button: "View all planned features",
        roadmap_enchantment: "Enchantment Planner",
        roadmap_nether: "Nether Coordinate Calculator",
        roadmap_stack: "Stack Calculator",
        roadmap_commands: "Command Generator",
        roadmap_status_planned: "Planned",
        // Stats
        stats_items: "Items in database",
        stats_mobs: "Different mobs in database",
        stats_free: "Free",
        stats_online: "Online",
        // CTA
        cta_title: "Ready for your next adventure?",
        cta_desc: "Start now with our tools and enhance your Minecraft experience.",
        cta_start: "Start now",
        cta_view_all: "View all tools",
        // Footer
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
        footer_history: "MC-Craft History",
        footer_team: "Our Team",
        nav_beacon_mixer: "Beacon Color Mixer",
        footer_about_us: "About us",
        footer_faq: "FAQ & Help",
        footer_bug: "Report Bug",
        footer_support_contact: "Support Contact",
        footer_rights: "All rights reserved.",
        footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not officially affiliated with Mojang or Microsoft.",
        footer_version: "Version 1.0.0",
        footer_changelog: "Changelog",
        // Toast notifications
        toast_welcome_title: "MC-Craft loaded!",
        toast_welcome_message: "Enjoy our Minecraft tools!",
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
        toast_offline_message: "Some features may not be available."
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

// NEUE Elements für Sound & Sprache
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
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
    initCounters();
    initToolCards();
    initFooterYear();
    initPageAnalytics();
    initSoundToggle();
    initLanguageToggle();
    updateLanguage(); // setzt gespeicherte Sprache
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
        getTranslation(soundEnabled ? 'toast_sound_on' : 'toast_sound_off')
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
        getTranslation(currentLang === 'de' ? 'toast_language_de' : 'toast_language_en')
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

        // Bei HTML in der Übersetzung das komplette Markup ersetzen.
        if (translation.includes('<')) {
            el.innerHTML = translation;
            return;
        }

        // Reiner Textknoten: einfacher Direkt-Ersatz.
        if (el.children.length === 0) {
            el.textContent = translation;
            return;
        }

        // Elemente mit <br> (z. B. Hero-Text) komplett ersetzen, damit kein Resttext stehen bleibt.
        if (el.querySelector('br')) {
            el.textContent = translation;
            return;
        }

        // Für Icon/Span-Layouts nur direkten Text ersetzen und so Icons erhalten.
        const directTextNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        directTextNodes.forEach(node => {
            el.removeChild(node);
        });
        el.appendChild(document.createTextNode(' ' + translation));
    });

    // Seitentitel
    document.title = getTranslation('site_title');
}

// ===== LOADER (angepasst für Übersetzung) =====
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
        getTranslation('loader_text1'),
        getTranslation('loader_text2'),
        getTranslation('loader_text3'),
        getTranslation('loader_text4'),
        getTranslation('loader_text5'),
        getTranslation('loader_text6'),
        getTranslation('loader_text7')
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
        getTranslation('toast_welcome_message')
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
        if (option.dataset.theme === currentTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    document.querySelectorAll('.theme-option-btn').forEach(option => {
        if (option.dataset.theme === currentTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
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
        if (e.target === mobileNav) {
            closeMobileMenu();
        }
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
                getTranslation('toast_theme_to', { theme: getThemeName(theme) })
            );
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        updateActiveNavLink();
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

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
                if (!counter.dataset.animated) {
                    animateCounter(counter, target);
                    counter.dataset.animated = true;
                }
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5, rootMargin: '50px' });
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = Math.floor(duration / 100);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            if (target === 1000) element.textContent = '1K+';
            else if (target === 90) element.textContent = '90+';
            else if (target === 100) element.textContent = '100%';
            else if (target === 24) element.textContent = '24/7';
            else element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== TOOL CARDS =====
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        const toolLink = card.querySelector('.tool-link');
        if (toolLink) toolLink.addEventListener('click', playClickSound);
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    toolCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===== TOAST =====
function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-check'}"></i></div>
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

// ===== ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Seite geladen');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Unbekanntes Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
}

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== KEYBOARD =====
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
        'button, .btn, .nav-link, .theme-option, .tool-link, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

// ===== VISUAL FEEDBACK =====
function addSoundVisualFeedback() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes soundPulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 168, 107, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(0, 168, 107, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 168, 107, 0); }
        }
        .sound-pulse { animation: soundPulse 1s ease; }
    `;
    document.head.appendChild(style);
}
window.addEventListener('load', addSoundVisualFeedback);

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
window.addEventListener('online', () => showToast(getTranslation('toast_online_title'), getTranslation('toast_online_message')));
window.addEventListener('offline', () => showToast(getTranslation('toast_offline_title'), getTranslation('toast_offline_message')));