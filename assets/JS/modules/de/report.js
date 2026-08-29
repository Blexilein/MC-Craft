// Bug Report Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Texte dieser Seite (nur Deutsch)
const T = {
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
    initSoundToggle();
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
        t('toast_sound_title'),
        t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'),
        'info'
    );
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
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
        t('loader_text1_bugreport'),
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
        t('toast_welcome_message'),
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
                t('toast_theme_changed'),
                t('toast_theme_to', { theme: getThemeName(theme) }),
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
                t('toast_discord_ready') || 'Discord Widget bereit',
            //  t('toast_discord_ready_message') || 'Klicke um unserem Server beizutreten!',
                'info'
            );
        });
    }
    
    const discordButtons = document.querySelectorAll('a[href*="discord"], .btn-discord');
    discordButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Discord Link geklickt');
            showToast(
                t('toast_discord_redirect') || 'Discord öffnen',
                t('toast_discord_redirect_message') || 'Du wirst zu unserem Server weitergeleitet...',
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
        t('toast_error_title'),
        t('toast_error_message'),
        'error'
    );
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => {
    showToast(t('toast_online_title'), t('toast_online_message'), 'success');
});
window.addEventListener('offline', () => {
    showToast(t('toast_offline_title'), t('toast_offline_message'), 'warning');
});

// ===== EXPORT FUNCTIONS FOR HTML =====
window.openDiscordQuick = function() {
    playClickSound();
    showToast(
        t('toast_discord_redirect'),
        t('toast_discord_redirect_message'),
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
