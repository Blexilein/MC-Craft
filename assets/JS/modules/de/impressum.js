// Impressum Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Impressum-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_impressum: "MC-Craft | Impressum",
    site_title_short: "MC-Craft",
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
    tools_dropdown: "Werkzeuge",
    discover_dropdown: "Entdecken",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Theme auswählen:",
    sound_toggle: "Sound",
    language: "Sprache",
    impressum_badge: "Rechtliches",
    impressum_hero_title: "Impressum & <span class=\"highlight\">Kontakt</span>",
    hero_badge: "V 1.0.0 ist da",
    impressum_hero_desc: "Rechtliche Informationen und Kontaktdaten von MC-Craft. Wir sind für Sie da!",
    impressum_btn_read: "Impressum lesen",
    impressum_btn_privacy: "Zum Datenschutz",
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
    impressum_card2_note: "Bitte haben Sie Verständnis, dass wir keine telefonische Unterstützung anbieten können. Für Anfragen nutzen Sie bitte ausschließlich die oben genannten E-Mail-Adressen. Datenschutzrechtliche Betroffenenanfragen bearbeiten wir innerhalb der gesetzlichen Fristen gemäß DSGVO.",
    impressum_card3_title: "Haftungsausschluss",
    impressum_card3_sub1: "Haftung für Inhalte",
    impressum_card3_text1: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen sowie nach der Verordnung (EU) 2022/2065 (Digital Services Act) bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
    impressum_card3_sub2: "Haftung für Links",
    impressum_card3_text2: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung jedoch nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
    impressum_card3_sub3: "Urheberrecht",
    impressum_card3_text3: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    impressum_card4_title: "Datenschutz",
    impressum_card4_text1: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.",
    impressum_card4_text2: "Weitere Informationen zum Datenschutz finden Sie in unserer <a href=\"/blog/datenschutz.html\">Datenschutzerklärung</a>.",
    impressum_card4_text3: "Weitere Informationen zu unseren Nutzungsbedingungen finden Sie in unseren <a href=\"/blog/nutzungsbedingungen.html\">Nutzungsbedingungen</a>.",
    impressum_card4_text4: "Weitere Informationen zu unserem Copyright finden Sie in unserer <a href=\"/blog/copyright.html\">Copyright</a>-Seite.",
    impressum_card5_title: "Verwendete Technologien",
    impressum_card5_text: "MC-Craft verwendet folgende Technologien und Dienste:",
    impressum_card5_li1: "HTML5, CSS3, JavaScript für die Frontend-Entwicklung",
    impressum_card5_li2: "Font Awesome für Icons (selbst gehostet)",
    impressum_card5_li3: "Google Fonts (Chakra Petch, Space Grotesk – selbst gehostet, keine direkte Verbindung zu Google)",
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
    impressum_cta_title: "Haben Sie Fragen?",
    impressum_cta_desc: "Bei rechtlichen Fragen oder anderen Anliegen stehen wir Ihnen gerne zur Verfügung.",
    impressum_cta_btn_email: "E-Mail schreiben",
    impressum_cta_btn_privacy: "Datenschutz ansehen",
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
    loader_text1_impressum: "Impressum wird geladen...",
    loader_text2: "Rechtliche Informationen werden geladen...",
    loader_text3: "Kontaktdaten werden geladen...",
    loader_text4: "Haftungsausschluss wird geladen...",
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
    initImpressumCards();
    initFooterYear();
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
        t('loader_text1_impressum'),
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
