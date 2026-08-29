// Nutzungsbedingungen Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;
// Übersetzungen – alle für die Nutzungsbedingungen-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_terms: "MC-Craft | Nutzungsbedingungen",
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
    terms_hero_badge: "Rechtliches",
    terms_hero_title: "Nutzungs<span class=\"highlight\">bedingungen</span>",
    hero_badge: "V 1.0.0 ist da",
    terms_hero_desc: "Allgemeine Geschäftsbedingungen für die Nutzung von MC-Craft. Bitte lesen Sie diese Bedingungen sorgfältig durch.",
    terms_btn_read: "Bedingungen lesen",
    terms_btn_privacy: "Datenschutz",
    terms_grid_legal: "Rechtlich sicher",
    terms_grid_privacy: "Datenschutz",
    terms_grid_transparent: "Transparent",
    terms_grid_fair: "Fair und klar",
    terms_section_title: "Allgemeine <span class=\"highlight\">Geschäftsbedingungen</span>",
    terms_section_subtitle: "Bedingungen für die Nutzung unserer Dienste",
    terms_toc_title: "Inhaltsverzeichnis",
    terms_toc_link1: "1. Geltungsbereich",
    terms_toc_link2: "2. Dienste und Leistungen",
    terms_toc_link3: "3. Nutzungsrecht",
    terms_toc_link4: "4. Urheberrecht",
    terms_toc_link5: "5. Haftungsbeschränkung",
    terms_toc_link6: "6. Externe Links",
    terms_toc_link7: "7. Datenschutz",
    terms_toc_link8: "8. Änderungen",
    terms_toc_link9: "9. Schlussbestimmungen",
    terms_toc_link10: "10. Kontakt",
    terms_card1_title: "Geltungsbereich",
    terms_card1_p1: "Diese Nutzungsbedingungen regeln die rechtlichen Rahmenbedingungen für die Nutzung der Webseite MC-Craft sowie aller damit verbundenen Dienste und Angebote.",
    terms_card1_p2: "Mit der Nutzung unserer Webseite erklären Sie sich mit diesen Nutzungsbedingungen ausdrücklich einverstanden. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, dürfen Sie unsere Webseite nicht nutzen.",
    terms_card1_note: "Diese Bedingungen gelten für alle Besucher und Nutzer unserer Plattform.",
    terms_card1_note_minors: "Da sich unsere Dienste thematisch auch an ein jüngeres Publikum richten, bitten wir Nutzer:innen unter 16 Jahren, unsere Angebote nur mit Zustimmung ihrer Eltern oder Erziehungsberechtigten zu nutzen.",
    terms_card2_title: "Dienste und Leistungen",
    terms_card2_p1: "MC-Craft bietet aktuell folgende kostenlose Tools an:",
    terms_card2_li1: "Text-Konverter für Minecraft-Formatierungscodes",
    terms_card2_li2: "Farbtext-Konverter",
    terms_card2_li3: "Items-Datenbank",
    terms_card2_li4: "Mobs-Datenbank",
    terms_card2_li5: "Server-Status-Checks",
    terms_card2_li6: "Minecraft API Status",
    terms_card2_li7: "Skin Lookup",
    terms_card2_li8: "Skin Editor",
    terms_card2_li9: "Tag-Nacht-Zyklus-Simulator",
    terms_card2_li10: "End Poem",
    terms_card2_li11: "Cape-Datenbank (Cape-Galerie)",
    terms_card2_li12: "Minecraft-Versionsübersicht",
    terms_card2_li13: "Skin-Bibliothek (Skin-Galerie)",
    terms_card2_li14: "Beacon Color Mixer",
    terms_card2_li15: "QR-Code-Generator",
    terms_card2_li16: "Advancement-Generator",
    terms_card2_p2: "Alle Dienste werden kostenlos und 'as is' (wie vorhanden) angeboten. Es besteht kein Anspruch auf Verfügbarkeit, Funktionalität oder Fehlerfreiheit der Dienste.",
    terms_card2_p3: "Wir behalten uns vor, einzelne Tools jederzeit zu ändern, zu erweitern, vorübergehend auszusetzen oder dauerhaft einzustellen, ohne dass hieraus Ansprüche gegen uns entstehen. Aktuelle Änderungen werden im <a href=\"/blog/changelog.html\" class=\"highlight-link\">Changelog</a> dokumentiert.",
    terms_card3_title: "Nutzungsrecht",
    terms_card3_p1: "Wir gewähren Ihnen ein beschränktes, nicht exklusives, nicht übertragbares Recht, unsere Webseite und Dienste für den persönlichen, nicht-kommerziellen Gebrauch zu nutzen.",
    terms_card3_forbidden_title: "Folgende Handlungen sind untersagt:",
    terms_card3_li1: "Die automatisierte Abfrage unserer Dienste (Scraping, Crawling)",
    terms_card3_li2: "Die Nutzung unserer Dienste für kommerzielle Zwecke ohne Genehmigung",
    terms_card3_li3: "Das Umgehen von Sicherheitsvorkehrungen",
    terms_card3_li4: "Die missbräuchliche Nutzung, die andere Nutzer beeinträchtigt",
    terms_card3_li5: "Die Verwendung unserer Dienste für illegale Zwecke",
    terms_card4_title: "Urheberrecht und geistiges Eigentum",
    terms_card4_p1: "Alle Inhalte, Designs, Grafiken und Software auf MC-Craft sind urheberrechtlich geschützt und bleiben unser Eigentum oder das Eigentum unserer Lizenzgeber.",
    terms_card4_p2: "Die Minecraft-Marken und -Assets sind Eigentum von Mojang Studios und Microsoft. MC-Craft ist ein unabhängiges Fan-Projekt und nicht mit diesen Unternehmen verbunden.",
    terms_card4_you_may: "Sie dürfen:",
    terms_card4_may_li1: "Inhalte für den persönlichen Gebrauch herunterladen",
    terms_card4_may_li2: "Text-Konverter-Ergebnisse in Minecraft verwenden",
    terms_card4_may_li3: "Informationen für nicht-kommerzielle Zwecke referenzieren",
    terms_card4_you_may_not: "Sie dürfen nicht:",
    terms_card4_may_not_li1: "Inhalte ohne Genehmigung vervielfältigen",
    terms_card4_may_not_li2: "Unsere Dienste auf anderen Webseiten einbetten",
    terms_card4_may_not_li3: "Unsere Marken oder Logos ohne Genehmigung verwenden",
    terms_card5_title: "Haftungsbeschränkung",
    terms_card5_not_liable: "Wir haften nicht für:",
    terms_card5_li1: "Korrektheit, Vollständigkeit oder Aktualität der bereitgestellten Informationen",
    terms_card5_li2: "Schäden durch die Nutzung oder Nichtverfügbarkeit unserer Dienste",
    terms_card5_li3: "Viren oder andere schädliche Komponenten",
    terms_card5_li4: "Handlungen Dritter, die unsere Dienste nutzen oder missbrauchen",
    terms_card5_note: "Die Haftung für Vorsatz und grobe Fahrlässigkeit sowie jede gesetzlich zwingende Haftung – insbesondere für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz – bleibt von den vorstehenden Haftungsbeschränkungen unberührt.",
    terms_card6_title: "Externe Links",
    terms_card6_p1: "Unsere Webseite kann Links zu externen Webseiten Dritter enthalten. Wir haben keine Kontrolle über den Inhalt dieser Webseiten und übernehmen keine Haftung für diese.",
    terms_card6_p2: "Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
    terms_card7_title: "Datenschutz",
    terms_card7_p1: "Ihre Privatsphäre ist uns wichtig. Wir erfassen und verwenden personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen.",
    terms_card7_p2: "Details zur Datenverarbeitung finden Sie in unserer <a href=\"/blog/datenschutz.html\" class=\"highlight-link\">Datenschutzerklärung</a>.",
    terms_card8_title: "Änderungen der Nutzungsbedingungen",
    terms_card8_p1: "Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern oder zu ergänzen. Änderungen werden auf dieser Seite veröffentlicht.",
    terms_card8_p2: "Bitte informieren Sie sich bei Änderungen regelmäßig über die jeweils aktuelle Fassung dieser Nutzungsbedingungen auf dieser Seite.",
    terms_card8_note: "Aktuelle Änderungen werden im <a href=\"/blog/changelog.html\" class=\"highlight-link\">Changelog</a> dokumentiert.",
    terms_card9_title: "Schlussbestimmungen",
    terms_card9_governing_law: "Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.",
    terms_card9_place: "Erfüllungsort und Gerichtsstand ist, sofern gesetzlich zulässig, unser Geschäftssitz.",
    terms_card9_severability: "Sofern einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein sollten, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
    terms_card10_title: "Kontakt",
    terms_card10_p1: "Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns unter:",
    terms_card10_last_update: "Letzte Aktualisierung:",
    terms_card10_note: "Diese Nutzungsbedingungen stellen die vollständige Vereinbarung zwischen Ihnen und MC-Craft dar und ersetzen alle vorherigen Vereinbarungen.",
    terms_accept_title: "Einverständniserklärung",
    terms_accept_desc: "Mit der Nutzung unserer Dienste bestätigen Sie, dass Sie diese Nutzungsbedingungen gelesen, verstanden und akzeptiert haben.",
    terms_accept_btn: "Bedingungen verstanden",
    terms_accept_back: "Zurück zur Startseite",
    terms_accepted_btn: "Bedingungen bereits akzeptiert",
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
    toast_welcome_title: "Nutzungsbedingungen geladen!",
    toast_welcome_message: "Bitte lesen Sie diese Bedingungen sorgfältig.",
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
    toast_accept_title: "Einverständnis bestätigt",
    toast_accept_message: "Vielen Dank für Ihr Verständnis!",
    toast_already_accepted: "Bereits akzeptiert",
    toast_accepted_on: "Akzeptiert am",
    loader_text1_terms: "Nutzungsbedingungen werden geladen...",
    loader_text2: "Rechtliche Dokumente vorbereiten...",
    loader_text3: "Bedingungen einlesen...",
    loader_text4: "Fast fertig...",
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
const acceptBtn = document.getElementById('acceptBtn');
const tocLinks = document.querySelectorAll('.toc-link');

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
    initTermsNavigation();
    initAcceptButton();
    initFooterYear();
    initPageAnalytics();
    initSupportCards();
    initSoundToggle();
    checkTermsAcceptance();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => {
            console.log('Sounddatei nicht gefunden, versuche Standard-Pfad...');
            levelUpSound = new Audio('/assets/audio/levelup.ogg');
            levelUpSound.volume = 0.3;
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
        t('loader_text1_terms'),
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
        highlightCurrentSection();
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

// ===== TERMS NAVIGATION (Original) =====
function initTermsNavigation() {
    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('.terms-card');
    const scrollPos = window.scrollY + 150;
    let currentSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ACCEPT BUTTON (angepasst für Übersetzung) =====
function initAcceptButton() {
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('mc-craft-terms-accepted', 'true');
            localStorage.setItem('mc-craft-terms-accepted-date', new Date().toISOString());
            
            showToast(
                t('toast_accept_title'),
                t('toast_accept_message'),
                'success'
            );
            
            acceptBtn.innerHTML = '<i class="fas fa-check-circle"></i> ' + t('terms_accepted_btn');
            acceptBtn.disabled = true;
            acceptBtn.classList.remove('btn-primary');
            acceptBtn.classList.add('btn-outline');
            
            playClickSound();
        });
    }
}

function checkTermsAcceptance() {
    const accepted = localStorage.getItem('mc-craft-terms-accepted');
    if (accepted === 'true' && acceptBtn) {
        acceptBtn.innerHTML = '<i class="fas fa-check-circle"></i> ' + t('terms_accepted_btn');
        acceptBtn.disabled = true;
        acceptBtn.classList.remove('btn-primary');
        acceptBtn.classList.add('btn-outline');
        
        const acceptedDate = localStorage.getItem('mc-craft-terms-accepted-date');
        if (acceptedDate) {
            const date = new Date(acceptedDate);
            showToast(
                t('toast_already_accepted'),
                `${t('toast_accepted_on')} ${date.toLocaleDateString('de-DE')}`,
                'info'
            );
        }
    }
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
    if (type === 'info') icon = 'fas fa-file-contract';
    
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
    console.log('MC-Craft Nutzungsbedingungen-Seite geladen');
}

// ===== SUPPORT CARDS INTERACTIVITY (Original) =====
function initSupportCards() {
    const supportCards = document.querySelectorAll('.terms-card, .grid-item, .toc-card');
    
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
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .toc-link, .terms-card-header, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
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
