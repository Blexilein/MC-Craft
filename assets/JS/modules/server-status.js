// Server Status JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Server-Status-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title_serverstatus: "MC-Craft | Server Status",
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
        serverstatus_hero_title: "Minecraft <span class=\"highlight\">Server Status</span>",
        hero_badge: "V 1.0.0 ist da",
        serverstatus_hero_desc: "Prüfe den Status von Java- und Bedrock-Servern in Echtzeit. Sieh dir Spieleranzahl, MOTD, Version und mehr an – alles in einem modernen Design.",
        serverstatus_btn_check: "Server prüfen",
        serverstatus_btn_examples: "Beispiel-Server",
        serverstatus_grid_java_bedrock: "Java & Bedrock",
        serverstatus_grid_realtime: "Echtzeit",
        serverstatus_grid_players: "Spieler-Info",
        serverstatus_grid_stats: "Detaillierte Stats",
        // Section
        serverstatus_section_title: "Server <span class=\"highlight\">Status prüfen</span>",
        serverstatus_section_subtitle: "Gib eine Server-IP ein oder wähle einen Beispiel-Server",
        serverstatus_tab_java: "Java Edition",
        serverstatus_tab_bedrock: "Bedrock Edition",
        serverstatus_input_placeholder: "z.B. mc.craft.net",
        serverstatus_btn_status: "Status prüfen",
        serverstatus_example_mccraft: "MC Craft",
        // Status Card
        serverstatus_online: "Online",
        serverstatus_offline: "Offline",
        serverstatus_players: "Spieler:",
        serverstatus_info_ip: "Adresse",
        serverstatus_info_server_ip: "IP",
        serverstatus_info_port: "Port",
        serverstatus_info_version: "Version",
        serverstatus_info_protocol: "Protokoll",
        serverstatus_info_players: "Spieler",
        serverstatus_info_gamemode: "Gamemode",
        serverstatus_info_serverid: "Server ID",
        serverstatus_info_map: "Map",
        // Loading
        serverstatus_loading_title: "Server wird geprüft",
        serverstatus_loading_connecting: "Verbinde mit dem Server...",
        serverstatus_loading_hint: "Tipp: Große Server können etwas länger zum Laden benötigen",
        serverstatus_loading_search: "Suchen",
        serverstatus_loading_connect: "Verbinden",
        serverstatus_loading_data: "Daten laden",
        serverstatus_loading_done: "Fertig",
        serverstatus_loading_server: "Server:",
        serverstatus_loading_type: "Typ:",
        // CTA
        serverstatus_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
        serverstatus_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
        serverstatus_cta_btn_text: "Text Konverter",
        serverstatus_cta_btn_all: "Alle Tools ansehen",
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
        // Loader
        loader_text1_serverstatus: "MC-Craft Server Status wird geladen...",
        loader_text2: "Server-API wird initialisiert...",
        loader_text3: "Ladeanimation vorbereiten...",
        loader_text4: "Fast fertig...",
        loader_text5: "Fast fertig...",
        // Toast-Benachrichtigungen
        toast_welcome_title: "Server Status geladen!",
        toast_welcome_message: "Prüfe jetzt den Status deiner Minecraft-Server!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound an",
        toast_sound_off: "Sound aus",
        toast_language_title: "Sprache",
        toast_language_de: "Deutsch",
        toast_language_en: "English",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme geändert",
        toast_theme_to: "Zu {theme} gewechselt",
        toast_error_title: "Fehler",
        toast_error_message: "Ein Fehler ist aufgetreten.",
        toast_success: "Erfolg",
        toast_rate_limit: "Zu viele Anfragen",
        toast_online_title: "Verbindung wiederhergestellt",
        toast_online_message: "Du bist wieder online!",
        toast_offline_title: "Offline Modus",
        toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
        // Spezifische Fehlermeldungen
        serverstatus_error_no_ip: "Bitte gib eine Server-IP ein",
        serverstatus_error_api: "Server-API nicht erreichbar. Bitte später erneut versuchen.",
        serverstatus_error_http: "HTTP-Fehler {code}: {status}",
        serverstatus_error_network: "Netzwerkfehler: {error}",
        serverstatus_offline_message: "Server nicht erreichbar",
        serverstatus_hint: "Hinweis",
        common_na: "N/A"
    },
    en: {
        site_title_serverstatus: "MC-Craft | Server Status",
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
        serverstatus_hero_title: "Minecraft <span class=\"highlight\">Server Status</span>",
        hero_badge: "V 1.0.0 is here",
        serverstatus_hero_desc: "Check the status of Java and Bedrock servers in real time. View player count, MOTD, version and more – all in a modern design.",
        serverstatus_btn_check: "Check Server",
        serverstatus_btn_examples: "Example Servers",
        serverstatus_grid_java_bedrock: "Java & Bedrock",
        serverstatus_grid_realtime: "Real-time",
        serverstatus_grid_players: "Player Info",
        serverstatus_grid_stats: "Detailed Stats",
        serverstatus_section_title: "Server <span class=\"highlight\">Status Check</span>",
        serverstatus_section_subtitle: "Enter a server IP or select an example server",
        serverstatus_tab_java: "Java Edition",
        serverstatus_tab_bedrock: "Bedrock Edition",
        serverstatus_input_placeholder: "e.g. mc.craft.net",
        serverstatus_btn_status: "Check Status",
        serverstatus_example_mccraft: "MC Craft",
        serverstatus_online: "Online",
        serverstatus_offline: "Offline",
        serverstatus_players: "Players:",
        serverstatus_info_ip: "Address",
        serverstatus_info_server_ip: "IP",
        serverstatus_info_port: "Port",
        serverstatus_info_version: "Version",
        serverstatus_info_protocol: "Protocol",
        serverstatus_info_players: "Players",
        serverstatus_info_gamemode: "Gamemode",
        serverstatus_info_serverid: "Server ID",
        serverstatus_info_map: "Map",
        serverstatus_loading_title: "Checking server",
        serverstatus_loading_connecting: "Connecting to server...",
        serverstatus_loading_hint: "Tip: Large servers may take a little longer to load",
        serverstatus_loading_search: "Search",
        serverstatus_loading_connect: "Connect",
        serverstatus_loading_data: "Load data",
        serverstatus_loading_done: "Done",
        serverstatus_loading_server: "Server:",
        serverstatus_loading_type: "Type:",
        serverstatus_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
        serverstatus_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
        serverstatus_cta_btn_text: "Text Converter",
        serverstatus_cta_btn_all: "View all tools",
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
        loader_text1_serverstatus: "MC-Craft Server Status is loading...",
        loader_text2: "Initializing server API...",
        loader_text3: "Preparing loading animation...",
        loader_text4: "Almost done...",
        loader_text5: "Almost done...",
        toast_welcome_title: "Server Status loaded!",
        toast_welcome_message: "Check the status of your Minecraft servers now!",
        toast_sound_title: "Sound",
        toast_sound_on: "Sound on",
        toast_sound_off: "Sound off",
        toast_language_title: "Language",
        toast_language_de: "German",
        toast_language_en: "English",
        toast_theme_title: "Theme",
        toast_theme_changed: "Theme changed",
        toast_theme_to: "Switched to {theme}",
        toast_error_title: "Error",
        toast_error_message: "An error occurred.",
        toast_success: "Success",
        toast_rate_limit: "Too many requests",
        toast_online_title: "Connection restored",
        toast_online_message: "You are back online!",
        toast_offline_title: "Offline mode",
        toast_offline_message: "Some functions may not be available.",
        serverstatus_error_no_ip: "Please enter a server IP",
        serverstatus_error_api: "Server API unreachable. Please try again later.",
        serverstatus_error_http: "HTTP error {code}: {status}",
        serverstatus_error_network: "Network error: {error}",
        serverstatus_offline_message: "Server not reachable",
        serverstatus_hint: "Notice",
        common_na: "N/A"
    }
};

// ===== GLOBALE VARIABLEN =====
let currentApi = 'java';

// ===== DOM ELEMENTE =====
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// Server Status spezifische Elemente
const javaTab = document.getElementById('javaTab');
const bedrockTab = document.getElementById('bedrockTab');
const serverIp = document.getElementById('serverIp');
const checkBtn = document.getElementById('checkBtn');
const statusCard = document.getElementById('statusCard');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const exampleServers = document.querySelectorAll('.example-server');

// Server Info Elements
const serverIcon = document.getElementById('serverIcon');
const serverName = document.getElementById('serverName');
const serverMotd = document.getElementById('serverMotd');
const serverStatusBadge = document.getElementById('serverStatusBadge');
const serverInfo = document.getElementById('serverInfo');
const playersSection = document.getElementById('playersSection');
const playersCount = document.getElementById('playersCount');
const playersList = document.getElementById('playersList');

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
    initServerStatus();
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
        levelUpSound.addEventListener('error', () => {
            console.log('Sounddatei nicht gefunden');
        });
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
    document.title = getTranslation('site_title_serverstatus');
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
        getTranslation('loader_text1_serverstatus'),
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
    if (type === 'info') icon = 'fas fa-server';
    
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

// ===== SERVER STATUS FUNKTIONALITÄT (mit verbesserter Fehlerbehandlung) =====
function initServerStatus() {
    // Tab-Wechsel
    javaTab.addEventListener('click', () => {
        currentApi = 'java';
        javaTab.classList.add('active');
        bedrockTab.classList.remove('active');
        serverIp.placeholder = getTranslation('serverstatus_input_placeholder');
        playClickSound();
    });
    
    bedrockTab.addEventListener('click', () => {
        currentApi = 'bedrock';
        bedrockTab.classList.add('active');
        javaTab.classList.remove('active');
        serverIp.placeholder = getTranslation('serverstatus_input_placeholder');
        playClickSound();
    });
    
    // Status prüfen
    checkBtn.addEventListener('click', checkServerStatus);
    serverIp.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkServerStatus();
        }
    });
    
    // Beispiel-Server
    exampleServers.forEach(server => {
        server.addEventListener('click', () => {
            serverIp.value = server.getAttribute('data-ip');
            checkServerStatus();
            playClickSound();
        });
    });
}

function checkServerStatus() {
    const ip = serverIp.value.trim();
    if (!ip) {
        showError(getTranslation('serverstatus_error_no_ip'));
        return;
    }
    
    // Minecraft XP-Balken Ladeanimation
    loadingIndicator.classList.add('active');
    loadingIndicator.innerHTML = `
        <div class="minecraft-xp-loading">
            <div class="loading-header">
                <div class="minecraft-icon">
                    <i class="fas fa-server"></i>
                </div>
                <div class="loading-text">
                    <h3>${getTranslation('serverstatus_loading_title')}</h3>
                    <p>${getTranslation('serverstatus_loading_connecting')}</p>
                </div>
            </div>
            
            <div class="xp-container">
                <div class="xp-bar">
                    <div class="xp-fill" id="xpFill"></div>
                </div>
                <div class="xp-labels">
                    <span>${getTranslation('serverstatus_loading_search')}</span>
                    <span>${getTranslation('serverstatus_loading_connect')}</span>
                    <span>${getTranslation('serverstatus_loading_data')}</span>
                    <span>${getTranslation('serverstatus_loading_done')}</span>
                </div>
            </div>
            
            <div class="server-info-loading">
                <div class="info-item">
                    <i class="fas fa-globe"></i>
                    <span>${getTranslation('serverstatus_loading_server')} ${ip}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-plug"></i>
                    <span>${getTranslation('serverstatus_loading_type')} ${currentApi === 'java' ? getTranslation('serverstatus_tab_java') : getTranslation('serverstatus_tab_bedrock')}</span>
                </div>
            </div>
            
            <div class="minecraft-hint">
                <i class="fas fa-lightbulb"></i>
                ${getTranslation('serverstatus_loading_hint')}
            </div>
        </div>
    `;
    
    errorMessage.classList.remove('active');
    statusCard.classList.remove('active');
    
    // Starte die XP-Balken Animation
    const xpFill = document.getElementById('xpFill');
    let progress = 0;
    const animationInterval = setInterval(() => {
        progress += 0.5;
        xpFill.style.width = `${Math.min(progress, 90)}%`;
        
        if (progress < 30) {
            xpFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (progress < 60) {
            xpFill.style.background = 'linear-gradient(90deg, #2196F3, #03A9F4)';
        } else {
            xpFill.style.background = 'linear-gradient(90deg, #9C27B0, #E91E63)';
        }
    }, 20);
    
    loadingIndicator.animationInterval = animationInterval;
    
    const apiUrl = currentApi === 'java' 
        ? `https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}` 
        : `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(ip)}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(getTranslation('serverstatus_error_http', { code: response.status, status: response.statusText }));
            }
            return response.json();
        })
        .then(data => {
            clearInterval(animationInterval);
            xpFill.style.width = '100%';
            xpFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
            
            setTimeout(() => {
                loadingIndicator.classList.remove('active');
                if (data.online) {
                    displayServerInfo(data, ip);
                } else {
                    showOffline(ip);
                }
            }, 500);
        })
        .catch(error => {
            clearInterval(animationInterval);
            loadingIndicator.classList.remove('active');
            console.error('API Error:', error);
            
            // Netzwerkfehler erkennen (z.B. wenn fetch komplett fehlschlägt)
            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                showError(getTranslation('serverstatus_error_network', { error: error.message }));
            } else {
                showError(error.message);
            }
        });
}

function displayServerInfo(data, ip) {
    statusCard.classList.add('active');
    
    if (currentApi === 'java' && data.icon) {
        serverIcon.src = data.icon;
        serverIcon.style.display = 'block';
        serverIcon.onerror = function() {
            serverIcon.style.display = 'none';
        };
    } else {
        serverIcon.style.display = 'none';
    }
    
    serverName.textContent = ip;
    if (data.motd?.clean) {
        serverMotd.textContent = data.motd.clean.join(' ');
    } else {
        serverMotd.textContent = '-';
    }
    
    serverStatusBadge.className = 'server-status status-online';
    serverStatusBadge.textContent = getTranslation('serverstatus_online');
    
    let infoHTML = '';
    
    if (currentApi === 'java') {
        infoHTML = `
            <div class="info-item">
                <div class="info-label"><i class="fas fa-server"></i> ${getTranslation('serverstatus_info_ip')}</div>
                <div class="info-value">${ip}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-network-wired"></i> ${getTranslation('serverstatus_info_server_ip')}</div>
                <div class="info-value">${data.ip || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-plug"></i> ${getTranslation('serverstatus_info_port')}</div>
                <div class="info-value">${data.port || '25565'}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-code-branch"></i> ${getTranslation('serverstatus_info_version')}</div>
                <div class="info-value">${data.version || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-project-diagram"></i> ${getTranslation('serverstatus_info_protocol')}</div>
                <div class="info-value">${data.protocol?.name || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-users"></i> ${getTranslation('serverstatus_info_players')}</div>
                <div class="info-value">${data.players?.online || 0} / ${data.players?.max || 0}</div>
            </div>
        `;
    } else {
        infoHTML = `
            <div class="info-item">
                <div class="info-label"><i class="fas fa-server"></i> ${getTranslation('serverstatus_info_ip')}</div>
                <div class="info-value">${ip}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-gamepad"></i> ${getTranslation('serverstatus_info_gamemode')}</div>
                <div class="info-value">${data.gamemode || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-plug"></i> ${getTranslation('serverstatus_info_port')}</div>
                <div class="info-value">${data.port || '19132'}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-id-card"></i> ${getTranslation('serverstatus_info_serverid')}</div>
                <div class="info-value">${data.serverid || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-map"></i> ${getTranslation('serverstatus_info_map')}</div>
                <div class="info-value">${data.map?.clean || getTranslation('common_na')}</div>
            </div>
            <div class="info-item">
                <div class="info-label"><i class="fas fa-users"></i> ${getTranslation('serverstatus_info_players')}</div>
                <div class="info-value">${data.players?.online || 0} / ${data.players?.max || 0}</div>
            </div>
        `;
    }
    
    serverInfo.innerHTML = infoHTML;
    
    playersCount.textContent = `${data.players?.online || 0}/${data.players?.max || 0}`;
    
    if (data.players?.list && data.players.list.length > 0) {
        playersList.innerHTML = '';
        data.players.list.forEach(player => {
            const playerElement = document.createElement('span');
            playerElement.className = 'player-badge';
            playerElement.textContent = player;
            playersList.appendChild(playerElement);
        });
        playersSection.style.display = 'block';
    } else {
        playersSection.style.display = 'none';
    }
    
    setTimeout(() => {
        statusCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
    
    showToast(getTranslation('toast_success'), `${ip} ${getTranslation('serverstatus_online')}`, 'success');
}

function showOffline(ip) {
    statusCard.classList.add('active');
    
    serverIcon.style.display = 'none';
    serverName.textContent = ip;
    serverMotd.textContent = getTranslation('serverstatus_offline');
    
    serverStatusBadge.className = 'server-status status-offline';
    serverStatusBadge.textContent = getTranslation('serverstatus_offline');
    
    serverInfo.innerHTML = `
        <div class="info-item">
            <div class="info-label"><i class="fas fa-server"></i> ${getTranslation('serverstatus_info_ip')}</div>
            <div class="info-value">${ip}</div>
        </div>
        <div class="info-item">
            <div class="info-label"><i class="fas fa-exclamation-triangle"></i> ${getTranslation('serverstatus_hint')}</div>
            <div class="info-value">${getTranslation('serverstatus_offline_message')}</div>
        </div>
    `;
    
    playersSection.style.display = 'none';
    
    showToast(getTranslation('toast_error_title'), `${ip} ${getTranslation('serverstatus_offline')}`, 'error');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('active');
    playClickSound();
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .example-server, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
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

// ===== BILDER PRELOADING =====
window.addEventListener('load', () => {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif',
        '/assets/img/favicon/mc-craft.png'
    ];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
