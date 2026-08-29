// Team Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_team: "MC-Craft | Unser Team",
    site_title_short: "MC-Craft",
    // Loader
    loader_text1_team: "MC-Craft Team wird geladen...",
    loader_text2: "Team-Informationen werden abgerufen...",
    loader_text3: "Design wird vorbereitet...",
    loader_text4: "Sound-System wird geladen...",
    loader_text5: "Fast fertig...",
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
    team_hero_title: "Unser <span class=\"highlight\">Team</span>",
    hero_badge: "V 1.0.0 ist da",
    team_hero_desc: "Die kreativen Köpfe hinter MC-Craft. Lerne die Entwickler und Designer kennen, die unsere Minecraft-Tools mit Leidenschaft und Fachwissen entwickeln.",
    team_hero_btn_team: "Team entdecken",
    team_hero_btn_about: "Über MC-Craft",
    team_grid_development: "Entwicklung",
    team_grid_design: "Design",
    team_grid_support: "Support",
    team_grid_passion: "Leidenschaft",
    // Team Section
    team_section_title: "Das <span class=\"highlight\">MC-Craft</span> Team",
    team_section_subtitle: "Entwickler, Designer und Community-Manager, die unsere Tools möglich machen",
    // Team Member 1
    team_member1_name: "Blexilein",
    team_member1_role: "Gründer & Lead-Entwickler",
    team_member1_desc: "Blexilein ist der Gründer von MC-Craft und verantwortlich für die technische Umsetzung. Mit über 10 Jahren Erfahrung in Minecraft-Modding bringt er das nötige Know-how mit.",
    team_badge_developer: "Entwickler",
    team_badge_tech: "Technik",
    skill_js: "JavaScript",
    skill_html_css: "HTML/CSS",
    skill_mc_api: "Minecraft API",
    skill_nodejs: "Node.js",
    // Stats
    team_stat_years: "5+",
    team_stat_years_label: "Jahre Minecraft Erfahrung",
    team_stat_tools: "16",
    team_stat_tools_label: "Minecraft Tools",
    team_stat_members: "1",
    team_stat_members_label: "Team Mitglieder",
    team_stat_passion: "100%",
    team_stat_passion_label: "Leidenschaft",
    // Team CTA
    team_cta_title: "Du willst mitmachen?",
    team_cta_desc: "Wir suchen immer nach talentierten Minecraft-Enthusiasten, die uns helfen, bessere Tools für die Community zu entwickeln.",
    team_cta_btn: "Kontakt aufnehmen",
    // Allgemeine CTA
    team_cta_general_title: "Mehr über <span class=\"highlight\">MC-Craft</span> erfahren?",
    team_cta_general_desc: "Entdecke unsere Geschichte, unsere Mission und wie alles begann.",
    team_cta_general_btn_history: "Unsere Geschichte",
    team_cta_general_btn_about: "Über uns",
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
    toast_welcome_title: "Team-Seite geladen!",
    toast_welcome_message: "Lerne unser Team kennen!",
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

// ===== HILFSFUNKTIONEN =====
function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [placeholder, value] of Object.entries(placeholders)) {
        text = text.replace(`{${placeholder}}`, value);
    }
    return text;
}

function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
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
    initTeamCards();
    initSoundToggle();
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
        t('toast_sound_title'),
        t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off')
    );
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
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
        t('loader_text1_team'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
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
        t('toast_welcome_title'),
        t('toast_welcome_message')
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
                t('toast_theme_changed'),
                t('toast_theme_to', { theme: getThemeName(theme) })
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
    console.log('MC-Craft Team-Seite geladen');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
}

// ===== TEAM CARDS INTERACTIVITY =====
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        const socialLinks = card.querySelectorAll('.social-link');
        socialLinks.forEach(link => link.addEventListener('click', playClickSound));
    });
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

// ===== LOADING PROGRESS ANIMATION =====
function enhanceLoadingAnimation() {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        const texts = [
            t('loader_text1_team'),
            t('loader_text2'),
            t('loader_text3'),
            t('loader_text4'),
            t('loader_text5')
        ];
        let index = 0;
        const textInterval = setInterval(() => {
            if (index < texts.length - 1) {
                index++;
                loadingText.textContent = texts[index];
            } else {
                clearInterval(textInterval);
            }
        }, 300);
    }
}
window.addEventListener('load', enhanceLoadingAnimation);

// ===== PERFORMANCE OPTIMIZATION =====
function preloadImages() {
    const images = [
        '/assets/img/icons/grassblock.gif',
        '/assets/img/icons/Lava.gif',
        '/assets/img/icons/crystal.gif',
        '/assets/img/favicon/mc-craft.png',
        '/assets/img/backgrounds/Blexilein_helm.png',
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
        t('toast_error_title'),
        t('toast_error_message'),
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => showToast(t('toast_online_title'), t('toast_online_message')));
window.addEventListener('offline', () => showToast(t('toast_offline_title'), t('toast_offline_message')));

// Export functions for HTML onclick
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
