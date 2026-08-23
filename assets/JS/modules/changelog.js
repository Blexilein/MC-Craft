// Changelog Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Changelog-Seite benötigten Schlüssel (inkl. Toast-Texte)
const translations = {
    de: {
        // Allgemein
        site_title_changelog: "MC-Craft | Changelog",
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
        changelog_hero_title: "MC-Craft <span class=\"highlight\">Changelog</span>",
        hero_badge: "V 1.0.0 ist da",
        changelog_hero_desc: "Alle Updates, Änderungen und neuen Features von MC-Craft. Hier findest du alle Versionen und was sich geändert hat.",
        changelog_btn_latest: "Version 1.0 ansehen",
        changelog_btn_history: "Mehr erfahren",
        changelog_grid_updates: "Updates",
        changelog_grid_bugfixes: "Bugfixes",
        changelog_grid_features: "Neue Features",
        changelog_grid_improvements: "Verbesserungen",
        // Latest version
        changelog_latest_title: "Aktuelle <span class=\"highlight\">Version</span>",
        changelog_latest_subtitle: "Alle finalen Änderungen zur offiziellen Version 1.0.0",
        changelog_v150_version: "v1.0.0",
        changelog_v150_date: "22. August 2026",
        changelog_v150_title: "Release 1.0.0: Modernes Rework & Stabiler Launch",
        changelog_category_new: "Neue Features",
        change_type_new: "NEU",
        changelog_v150_feature1: "Neues, einheitliches Designsystem auf allen Seiten",
        changelog_v150_feature2: "Vollständig responsives Layout für Smartphone, Tablet und Desktop",
        changelog_v150_feature3: "Verbesserte Navigation mit konsistenten Pfaden und Bedienelementen",
        changelog_v150_feature4: "Überarbeitete deutsche und englische UI-Texte",
        changelog_category_improved: "Verbesserungen",
        change_type_improved: "VERBESSERT",
        changelog_v150_improvement1: "Bessere Abstände, Typografie und Kontraste für höhere Lesbarkeit",
        changelog_v150_improvement2: "Touch-Ziele und Fokuszustände für bessere Bedienbarkeit",
        changelog_v150_improvement3: "Optimierte Bild- und Inhaltsdarstellung auf kleinen Displays",
        changelog_v150_improvement4: "Schnellere, konsistentere Seitenwahrnehmung durch globale UI-Basis",
        changelog_category_fixed: "Bugfixes",
        change_type_fixed: "GEFIXT",
        changelog_v150_fixed1: "Inkonsistente Links zum Skin-Editor korrigiert",
        changelog_v150_fixed2: "Versionsangaben auf allen Seiten auf 1.0.0 vereinheitlicht",
        changelog_v150_fixed3: "Diverse sprachliche Inkonsistenzen in der Oberfläche bereinigt",
        changelog_v150_fixed4: "Mobile Navigation in der Basis robuster abgestimmt",
        changelog_v150_notes_title: "Anmerkungen",
        changelog_v150_notes: "Version 1.0.0 ist die konsolidierte, modernisierte Basis von MC-Craft: responsiv, einheitlich, stabil und klar strukturiert.",
        // Version history
        changelog_history_title: "Versions<span class=\"highlight\">verlauf</span>",
        changelog_history_subtitle: "Alle bisherigen Versionen von MC-Craft",
        // Future updates
        changelog_future_title: "Geplante <span class=\"highlight\">Updates</span>",
        changelog_future_subtitle: "Was kommt als nächstes?",
        changelog_future_card1_title: "AI Integration",
        changelog_future_card1_desc: "KI-gestützte Tools für Minecraft-Builder",
        changelog_future_card1_status: "In Planung",
        changelog_future_card2_title: "Community Features",
        changelog_future_card2_desc: "User-Accounts und Community-Bereich",
        changelog_future_card2_status: "Geplant",
        changelog_future_card3_title: "Mobile App",
        changelog_future_card3_desc: "Native iOS & Android App",
        changelog_future_card3_status: "Geplant",
        changelog_future_card4_title: "Mehrsprachigkeit",
        changelog_future_card4_desc: "Unterstützung für Englisch & weitere Sprachen",
        changelog_future_card4_status: "In Arbeit",
        // CTA
        changelog_cta_title: "Bleib auf dem Laufenden!",
        changelog_cta_desc: "Verpasse keine Updates! Folge uns für die neuesten Nachrichten und kommende Features.",
        changelog_cta_btn_discord: "Discord Community",
        changelog_cta_btn_home: "Zur Startseite",
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
        toast_welcome_title: "Changelog geladen!",
        toast_welcome_message: "Entdecke die neuesten Updates von MC-Craft.",
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
        loader_text1_changelog: "Changelog wird geladen...",
        loader_text2: "Versionsgeschichte wird geladen...",
        loader_text3: "Updates werden analysiert...",
        loader_text4: "Fast fertig...",
        loader_text5: "Fast fertig..."
    },
    en: {
        site_title_changelog: "MC-Craft | Changelog",
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
        changelog_hero_title: "MC-Craft <span class=\"highlight\">Changelog</span>",
        hero_badge: "V 1.0.0 is here",
        changelog_hero_desc: "All updates, changes and new features of MC-Craft. Here you can find all versions and what has changed.",
        changelog_btn_latest: "View Version 1.0",
        changelog_btn_history: "Learn More",
        changelog_grid_updates: "Updates",
        changelog_grid_bugfixes: "Bugfixes",
        changelog_grid_features: "New Features",
        changelog_grid_improvements: "Improvements",
        changelog_latest_title: "Current <span class=\"highlight\">Version</span>",
        changelog_latest_subtitle: "All final changes for the official 1.0.0 release",
        changelog_v150_version: "v1.0.0",
        changelog_v150_date: "August 22, 2026",
        changelog_v150_title: "Release 1.0.0: Modern Rework & Stable Launch",
        changelog_category_new: "New Features",
        change_type_new: "NEW",
        changelog_v150_feature1: "A unified modern design system across all pages",
        changelog_v150_feature2: "Fully responsive layout for smartphones, tablets, and desktops",
        changelog_v150_feature3: "Improved navigation with consistent paths and controls",
        changelog_v150_feature4: "Refined German and English UI copy",
        changelog_category_improved: "Improvements",
        change_type_improved: "IMPROVED",
        changelog_v150_improvement1: "Better spacing, typography, and contrast for readability",
        changelog_v150_improvement2: "Improved touch targets and focus states",
        changelog_v150_improvement3: "Optimized image and content behavior on small screens",
        changelog_v150_improvement4: "Faster and more consistent page experience through a shared UI base",
        changelog_category_fixed: "Bugfixes",
        change_type_fixed: "FIXED",
        changelog_v150_fixed1: "Fixed inconsistent links to the Skin Editor",
        changelog_v150_fixed2: "Standardized version labels to 1.0.0 on all pages",
        changelog_v150_fixed3: "Cleaned up UI language inconsistencies",
        changelog_v150_fixed4: "Hardened baseline mobile navigation behavior",
        changelog_v150_notes_title: "Notes",
        changelog_v150_notes: "Version 1.0.0 is MC-Craft's consolidated modern baseline: responsive, consistent, stable, and clearly structured.",
        changelog_history_title: "Version <span class=\"highlight\">History</span>",
        changelog_history_subtitle: "All previous versions of MC-Craft",
        changelog_v140_version: "v1.4.0",
        changelog_v140_date: "February 15, 2025",
        changelog_v140_title: "Responsive Design Update",
        changelog_v140_feature1: "Complete mobile optimization",
        changelog_v140_feature2: "Touch-friendly buttons",
        changelog_v140_improvement1: "Performance on mobile devices",
        changelog_v140_fixed1: "Layout issues on tablets",
        changelog_v130_version: "v1.3.0",
        changelog_v130_date: "January 30, 2025",
        changelog_v130_title: "UI/UX Overhaul",
        changelog_v130_feature1: "Modern design system",
        changelog_v130_feature2: "Improved dark mode",
        changelog_v130_improvement1: "Color palette & typography",
        changelog_v130_improvement2: "User friendliness",
        changelog_v120_version: "v1.2.0",
        changelog_v120_date: "January 10, 2025",
        changelog_v120_title: "Tools Update",
        changelog_v120_feature1: "Added Skin Editor",
        changelog_v120_feature2: "Server Status Checker",
        changelog_v120_improvement1: "Text Converter performance",
        changelog_v120_fixed1: "Color text generator bugs",
        changelog_v110_version: "v1.1.0",
        changelog_v110_date: "December 20, 2024",
        changelog_v110_title: "Database Update",
        changelog_v110_feature1: "Items database",
        changelog_v110_feature2: "Mobs Guide",
        changelog_v110_feature3: "Skin Lookup Tool",
        changelog_v110_improvement1: "Database performance",
        changelog_v100_version: "v1.0.0",
        changelog_v100_date: "December 1, 2024",
        changelog_v100_title: "Initial Release",
        changelog_v100_feature1: "MC-Craft website launch",
        changelog_v100_feature2: "Text Converter Tool",
        changelog_v100_feature3: "Color Text Generator",
        changelog_v100_feature4: "Basic structure",
        changelog_future_title: "Planned <span class=\"highlight\">Updates</span>",
        changelog_future_subtitle: "What's coming next?",
        changelog_future_card1_title: "AI Integration",
        changelog_future_card1_desc: "AI-powered tools for Minecraft builders",
        changelog_future_card1_status: "Planning",
        changelog_future_card2_title: "Community Features",
        changelog_future_card2_desc: "User accounts and community area",
        changelog_future_card2_status: "Planned",
        changelog_future_card3_title: "Mobile App",
        changelog_future_card3_desc: "Native iOS & Android App",
        changelog_future_card3_status: "Planned",
        changelog_future_card4_title: "Multilingualism",
        changelog_future_card4_desc: "Support for English & other languages",
        changelog_future_card4_status: "In progress",
        changelog_cta_title: "Stay up to date!",
        changelog_cta_desc: "Don't miss any updates! Follow us for the latest news and upcoming features.",
        changelog_cta_btn_discord: "Discord Community",
        changelog_cta_btn_home: "Back to homepage",
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
        toast_welcome_title: "Changelog loaded!",
        toast_welcome_message: "Discover the latest updates of MC-Craft.",
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
        loader_text1_changelog: "Changelog is loading...",
        loader_text2: "Loading version history...",
        loader_text3: "Analyzing updates...",
        loader_text4: "Almost done...",
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
    initFooterYear();
    initChangelogAnimations();
    initPageAnalytics();
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

    // Seitentitel
    document.title = getTranslation('site_title_changelog');
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
        getTranslation('loader_text1_changelog'),
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
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

// ===== CHANGELOG ANIMATIONS (Original) =====
function initChangelogAnimations() {
    // Version Cards Animation
    const versionCards = document.querySelectorAll('.version-card');
    
    versionCards.forEach((card, index) => {
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
    
    // Timeline Items Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Upcoming Cards Animation
    const upcomingCards = document.querySelectorAll('.upcoming-card');
    
    upcomingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
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
    if (type === 'info') icon = 'fas fa-rocket';
    
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

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Changelog-Seite geladen');
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

// ===== STYLE FÜR TIMELINE VISIBLE (aus Original) =====
const style = document.createElement('style');
style.textContent = `
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    .timeline-item:nth-child(even).visible {
        transform: translateX(0) !important;
    }
    
    .version-card, .upcoming-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
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
