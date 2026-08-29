// History Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Texte dieser Seite (nur Deutsch)
const T = {
    // Allgemein
    site_title_history: "MC-Craft | Unsere Geschichte",
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
    hero_badge: "Unsere Geschichte",
    hero_title: "Die Reise von <span class=\"highlight\">MC-Craft</span>",
    hero_badge1: "V 1.0.0 ist da",
    hero_desc: "Von der ersten Idee bis zum stabilen Release 1.0.0: transparent, ehrlich und fokussiert auf Nutzwert.",
    hero_btn_timeline: "Entwicklung ansehen",
    hero_btn_home: "E-Mail Kontakt",
    hero_grid_founded: "Gestartet 2026",
    hero_grid_community: "Für die Community",
    hero_grid_tools: "16 Tools",
    hero_grid_madeby: "Von Spielern gemacht",
    // Timeline
    timeline_section_title: "Unsere <span class=\"highlight\">Zeitreise</span>",
    timeline_section_subtitle: "Die wichtigsten Schritte bis zur Version 1.0.0",
    timeline_item1_date: "März 2026",
    timeline_item1_title: "Die Geburtsstunde",
    timeline_item1_desc: "Alles begann mit dem Ziel, verlässliche Minecraft-Tools ohne unnötige Komplexität bereitzustellen.",
    timeline_item1_list1: "Projektstart und erste Architektur",
    timeline_item1_list2: "Prototypen für Text- und Farbtools",
    timeline_item1_list3: "Erstes internes Test-Setup",
    timeline_item2_date: "2026",
    timeline_item2_title: "Community-Wachstum",
    timeline_item2_desc: "Mit dem Feedback aus der Community wurde aus einem Prototyp eine echte Plattform.",
    timeline_item2_list1: "Ausbau der wichtigsten Tools",
    timeline_item2_list2: "Einheitliche Navigation und Seitenstruktur",
    timeline_item2_list3: "Mehrsprachigkeit (DE/EN) integriert",
    timeline_item2_list4: "Mobile-first Verbesserungen umgesetzt",
    timeline_item3_date: "Version 1.0.0",
    timeline_item3_title: "Stabiler Release",
    timeline_item3_desc: "Mit Version 1.0.0 wurde MC-Craft als konsolidierte, moderne Plattform veröffentlicht.",
    timeline_item3_list1: "Versionierung auf 1.0.0 vereinheitlicht",
    timeline_item3_list2: "Design und Responsiveness modernisiert",
    timeline_item3_list3: "Texte und Übersetzungen verbessert",
    timeline_item3_list4: "Stabilitäts- und Qualitätsfixes abgeschlossen",
    timeline_item4_date: "Dezember 2026",
    timeline_item4_title: "Anerkennung & Ausbau",
    timeline_item4_desc: "MC-Craft wurde in mehreren Minecraft-Communities als beste Tool-Sammlung empfohlen. Wir erweiterten unsere Plattform um neue innovative Tools.",
    timeline_item4_list1: "Empfehlung in großen Minecraft-Communities",
    timeline_item4_list2: "Items Datenbank mit 1.000+ Einträgen",
    timeline_item4_list3: "Kompletter Mobs Guide",
    timeline_item4_list4: "API für Entwickler hinzugefügt",
    timeline_item5_date: "Heute",
    timeline_item5_title: "Die Gegenwart",
    timeline_item5_desc: "Was als kleines Projekt begann, ist heute eine lebendige Plattform mit einer treuen Community. Wir sind stolz darauf, Spielern auf der ganzen Welt zu helfen und das Minecraft-Erlebnis zu verbessern.",
    timeline_item5_list1: "Über 15 nützliche Tools für Spieler und Serverbetreiber",
    timeline_item5_list2: "Aktive Community mit täglichen Interaktionen",
    timeline_item5_list3: "Monatlich über 500.000 zufriedene Nutzer",
    timeline_item5_list4: "Kontinuierliche Verbesserungen basierend auf Feedback",
    history_release_title: "Was Version <span class=\"highlight\">1.0.0</span> ausmacht ✨",
    history_release_desc: "Die 1.0.0 steht für eine konsolidierte Plattform: einheitliches Design, bessere mobile Nutzung, klare Navigation und saubere Übersetzungen in Deutsch und Englisch.",
    history_release_item1_title: "Responsives Rework",
    history_release_item1_desc: "Alle Kernseiten wurden für Smartphone, Tablet und Desktop optimiert.",
    history_release_item2_title: "Bessere Übersetzungen",
    history_release_item2_desc: "Texte wurden sprachlich vereinheitlicht und professioneller formuliert.",
    history_release_item3_title: "Konsistente Navigation",
    history_release_item3_desc: "Verlinkungen und Menüs wurden bereinigt und zuverlässig gemacht.",
    history_release_item4_title: "Stabiler Stand",
    history_release_item4_desc: "Die Plattform ist auf einen stabilen, wartbaren 1.0-Baseline-Stand gebracht.",
    history_release_message: "Fragen zu dieser Entwicklung? Schreib uns direkt per E-Mail oder über Discord.",
    history_release_btn_email: "E-Mail Support",
    // Stats
    stats_section_title: "In <span class=\"highlight\">Zahlen</span>",
    stats_section_subtitle: "Das haben wir bisher erreicht",
    stats_tools: "Verschiedene Tools",
    stats_mobs: "Mobs in Datenbank",
    stats_items: "Items in Datenbank",
    stats_online: "Online",
    // Team
    team_section_title: "Hinter <span class=\"highlight\">MC-Craft</span>",
    team_section_subtitle: "Das Team, das alles möglich macht",
    team_member1_name: "Mohamad Laith",
    team_member1_role: "Gründer & Lead Developer",
    team_member1_bio: "Minecraft-Enthusiast seit 2012. Bringt die Vision und technische Expertise.",
    team_member2_name: "Alex",
    team_member2_role: "Full-Stack Developer",
    team_member2_bio: "Verantwortlich für Backend-APIs und Datenbank-Integrationen.",
    team_member3_name: "Sarah",
    team_member3_role: "UI/UX Designerin",
    team_member3_bio: "Gestaltet die benutzerfreundlichen Interfaces und Theme-Systeme.",
    team_member4_name: "Community Team",
    team_member4_role: "Support & Feedback",
    team_member4_bio: "Unser engagiertes Team, das täglich mit der Community interagiert.",
    // Future
    future_title: "Die <span class=\"highlight\">Zukunft</span> von MC-Craft",
    future_desc: "Unsere Reise ist noch lange nicht zu Ende! Wir arbeiten bereits an aufregenden neuen Funktionen:",
    future_feature1_title: "Minecraft Server Dashboard",
    future_feature1_desc: "Umfassende Server-Statistiken und Management-Tools",
    future_feature2_title: "3D-Skin Editor",
    future_feature2_desc: "Erstelle und bearbeite Skins in einer 3D-Vorschau",
    future_feature3_title: "Redstone Akademie",
    future_feature3_desc: "Lernplattform für Redstone-Schaltungen",
    future_feature4_title: "Community-Marktplatz",
    future_feature4_desc: "Teile und entdecke benutzerdefinierte Inhalte",
    future_message: "Unser Ziel bleibt es, die beste Ressource für Minecraft-Spieler zu sein - jetzt und in Zukunft!",
    future_btn_tools: "Alle Tools entdecken",
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
    toast_welcome_title: "Geschichte-Seite geladen!",
    toast_welcome_message: "Erlebe die Reise von MC-Craft!",
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
    loader_text1_history: "MC-Craft Geschichte wird geladen...",
    loader_text2: "Zeitreise vorbereiten...",
    loader_text3: "Meilensteine sammeln...",
    loader_text4: "Timeline wird erstellt...",
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
    initCounters();
    initTimelineAnimation();
    initFooterYear();
    initPageAnalytics();
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
        t('loader_text1_history'),
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
                if (link.getAttribute('href') === `#${sectionId}` || 
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}` ||
                   (sectionId === 'home' && link.getAttribute('href') === 'history.html')) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== TIMELINE ANIMATION =====
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        observer.observe(item);
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
}

// ===== ANIMATED COUNTERS =====
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
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
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
            
            // Special formatting for specific numbers
            if (target === 7) element.textContent = '7';
            else if (target === 90) element.textContent = '90+';
            else if (target === 1000) element.textContent = '1k';
            else if (target === 24) element.textContent = '24/7';
            else element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== TOAST =====
function showToast(title, message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'info') icon = 'fas fa-history';
    
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
    console.log('MC-Craft Geschichte-Seite geladen');
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn, .theme-option-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

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
window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
