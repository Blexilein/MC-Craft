// Datenschutz Page JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Übersetzungen – alle für die Datenschutz-Seite benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_datenschutz: "MC-Craft | Datenschutzerklärung",
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
    datenschutz_hero_title: "Datenschutz<span class=\"highlight\">erklärung</span>",
    hero_badge: "V 1.0.0 ist da",
    datenschutz_hero_desc: "Deine Privatsphäre ist uns wichtig. Hier erfährst du, wie wir mit deinen Daten umgehen und was deine Rechte sind.",
    datenschutz_btn_read: "Datenschutz lesen",
    datenschutz_btn_impressum: "Zum Impressum",
    datenschutz_grid_privacy: "Datenschutz",
    datenschutz_grid_rights: "Deine Rechte",
    datenschutz_grid_contact: "Kontakt",
    datenschutz_grid_legal: "Rechtliches",
    datenschutz_section_title: "Unsere <span class=\"highlight\">Datenschutz</span>richtlinien",
    datenschutz_section_subtitle: "Stand: 24. August 2026",
    datenschutz_card1_title: "1. Allgemeine Hinweise",
    datenschutz_card1_desc: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren personenbezogenen Daten umgehen, wenn Sie unsere Website nutzen.",
    datenschutz_card1_note: "Unsere Dienste richten sich an ein allgemeines Publikum rund um das Thema Minecraft, sammeln aber keine altersspezifischen Daten. Personen unter 16 Jahren sollten Einwilligungen zu optionalen externen Inhalten (siehe Punkt 3 und 6) nur mit Zustimmung ihrer Eltern oder Erziehungsberechtigten erteilen.",
    datenschutz_card2_title: "2. Verantwortlicher",
    datenschutz_card2_desc: "<strong>MC-Craft</strong><br>Betrieben von: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Deutschland<br><br>E-Mail: <a href=\"mailto:privacy@mc-craft.com\">privacy@mc-craft.com</a>",
    datenschutz_cardlegal_title: "3. Rechtsgrundlagen der Verarbeitung",
    datenschutz_cardlegal_desc: "Wir verarbeiten personenbezogene Daten ausschließlich auf Grundlage der folgenden gesetzlichen Erlaubnistatbestände:",
    datenschutz_cardlegal_li1: "<strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse):</strong> für automatisch erhobene Server-Log-Daten (siehe Punkt 4) sowie für technisch notwendige lokale Speicherung, z.B. Sprach-, Theme- und Soundeinstellung (siehe Punkt 5) – unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Website.",
    datenschutz_cardlegal_li2: "<strong>Art. 6 Abs. 1 lit. a DSGVO i.V.m. § 25 Abs. 1 TDDDG (Einwilligung):</strong> für die einzige nicht technisch notwendige externe Ressource (optionale Schriftart, siehe Punkt 6), die nur nach deiner ausdrücklichen Zustimmung im Cookie-Banner geladen wird.",
    datenschutz_cardlegal_li3: "<strong>§ 25 Abs. 2 Nr. 2 TDDDG:</strong> für lokale Speicherung, die unbedingt erforderlich ist, um einen von dir ausdrücklich gewünschten Dienst bereitzustellen (z.B. deine gespeicherte Sprachauswahl) – hierfür ist keine gesonderte Einwilligung erforderlich.",
    datenschutz_cardlegal_note: "Eine Weitergabe deiner Daten an Dritte zu Werbezwecken findet nicht statt. Die unter Punkt 6 beschriebenen direkten Verbindungen zu Mojang/Microsoft entstehen ausschließlich durch deine aktive Nutzung eines Tools und liegen außerhalb unseres Einflussbereichs.",
    datenschutz_card3_title: "4. Hosting und Server-Log-Dateien",
    datenschutz_card3_desc: "Bei jedem Zugriff auf unsere Website werden automatisch Verbindungsdaten gespeichert:",
    datenschutz_card3_li1: "IP-Adresse",
    datenschutz_card3_li2: "Datum und Uhrzeit des Zugriffs",
    datenschutz_card3_li3: "Verwendeter Browser und Betriebssystem",
    datenschutz_card3_li4: "Name der abgerufenen Datei",
    datenschutz_card3_hosting1: "Diese Website wird über <strong>Cloudflare Pages</strong> bereitgestellt, einen Dienst der Cloudflare, Inc. (USA). Die oben genannten Verbindungsdaten – insbesondere IP-Adresse und HTTP-Anfragedaten – werden dabei durch Cloudflare verarbeitet, um die Website sicher und zuverlässig auszuliefern (Content Delivery, DDoS-Schutz, technischer Betrieb).",
    datenschutz_card3_hosting2: "Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website). Empfänger der Daten ist Cloudflare als unser Hosting- und Content-Delivery-Anbieter. Da Cloudflare ein weltweites Netzwerk betreibt, kann es dabei zu einer Übermittlung in Drittländer außerhalb der EU/des EWR, unter anderem in die USA, kommen; Cloudflare stützt sich hierfür auf die EU-Standardvertragsklauseln (Art. 46 DSGVO) als geeignete Garantien.",
    datenschutz_card3_note: "Diese Daten werden ausschließlich zu technischen Zwecken – zur Sicherstellung eines störungsfreien Betriebs, zur Systemsicherheit sowie zur Optimierung unseres Angebots – erfasst und nicht mit anderen Datenquellen zusammengeführt. Die Speicherdauer richtet sich nach den Standard-Aufbewahrungsfristen unseres Hosting-Anbieters Cloudflare für Verbindungs- und Log-Daten; sicherheitsrelevante Vorfälle können eine längere Aufbewahrung zu Beweiszwecken erfordern.",
    datenschutz_card4_title: "5. Cookies & lokale Speicherung",
    datenschutz_card4_desc: "Wir setzen keine klassischen Server-Cookies zur Wiedererkennung ein. Stattdessen speichert dein Browser einige Einstellungen ausschließlich lokal auf deinem eigenen Gerät (localStorage) – diese Daten werden nie an uns übertragen:",
    datenschutz_card4_li1: "<code>mc-craft-lang</code> – gewählte Sprache (Deutsch/Englisch)",
    datenschutz_card4_li2: "<code>mc-craft-theme</code> – gewähltes Farbthema (Overworld/Nether/End)",
    datenschutz_card4_li3: "<code>mc-craft-sound</code> – ob Soundeffekte an oder aus sind",
    datenschutz_card4_li4: "<code>mc-craft-color-edition</code>, <code>mc-craft-color-theme</code> – deine Einstellungen im Farbtext-Konverter",
    datenschutz_card4_li5: "<code>mc-craft-terms-accepted</code>, <code>mc-craft-terms-accepted-date</code> – ob und wann du die Nutzungsbedingungen bestätigt hast",
    datenschutz_card4_li6: "<code>mc-craft-cookie-consent</code> – deine Entscheidung im Cookie-Banner selbst",
    datenschutz_card4_note: "Beim ersten Besuch zeigen wir dir ein Cookie-Banner. Lehnst du \"externe Inhalte\" ab, wird die einzige davon betroffene Ressource (eine optionale Schriftart auf der Advancement-Generator-Seite, siehe Punkt 6) tatsächlich nicht geladen – nicht nur das Banner ausgeblendet. Du kannst deine Entscheidung jederzeit über den Cookie-Button unten links auf jeder Seite ändern. Zusätzlich kannst du Speicherung generell in deinen Browser-Einstellungen deaktivieren.",
    datenschutz_card5_title: "6. Externe Dienste, Schriftarten & APIs",
    datenschutz_card5_desc1: "<strong>Selbst gehostet:</strong> Schriftarten (Chakra Petch, Space Grotesk – Google Fonts, SIL Open Font License), die Icon-Bibliothek Font Awesome sowie die 3D-Bibliotheken three.js und SkinView3D liegen auf unserem eigenen Server. Dein Browser lädt sie nicht direkt von Google, Font Awesome oder deren jeweiligen externen CDNs, sondern über die Hosting-Infrastruktur von MC-Craft. Informationen zur dabei eingesetzten Cloudflare-Infrastruktur findest du in Punkt 4 (Hosting und Server-Log-Dateien).",
    datenschutz_card5_desc2: "<strong>Einzige noch optionale externe Ressource:</strong> Auf der Advancement-Generator-Seite laden wir für das Vorschaubild optional eine Pixel-Schriftart von fonts.cdnfonts.com nach – dabei wird deine IP-Adresse an diesen Anbieter übertragen. Das passiert ausschließlich, wenn du im Cookie-Banner \"Alle akzeptieren\" wählst. Bei Ablehnung nutzt das Vorschaubild eine Ersatzschrift.",
    datenschutz_card5_desc3: "<strong>Externe APIs bei aktiver Tool-Nutzung:</strong> Einige Tools fragen bei Bedarf direkt von deinem Browser aus offizielle Minecraft-/Mojang-Dienste ab. Dabei werden nur die von dir eingegebenen Werte (z.B. ein Minecraft-Nutzername oder eine Server-IP) direkt an den jeweiligen Anbieter gesendet – nicht an uns:",
    datenschutz_card5_li1: "<strong>Server Status:</strong> <code>api.mcsrvstat.us</code>",
    datenschutz_card5_li2: "<strong>Skin Lookup:</strong> <code>playerdb.co</code>, <code>api.mojang.com</code>, <code>sessionserver.mojang.com</code>, <code>textures.minecraft.net</code>",
    datenschutz_card5_li3: "<strong>Minecraft API Status:</strong> <code>status.mojang.com</code>, <code>api.mojang.com</code>, <code>api.minecraftservices.com</code>, <code>session.minecraft.net</code>, <code>authserver.mojang.com</code>, <code>account.mojang.com</code>, <code>auth.mojang.com</code>",
    datenschutz_card5_li4: "<strong>Minecraft Versionen:</strong> <code>launchermeta.mojang.com</code>, <code>piston-meta.mojang.com</code>, <code>piston-data.mojang.com</code>, <code>launchercontent.mojang.com</code>, <code>libraries.minecraft.net</code>, <code>resources.download.minecraft.net</code>, <code>www.minecraft.net</code>",
    datenschutz_card5_li5: "<strong>Cape-Galerie / Skin-Bibliothek / Skin Editor:</strong> <code>textures.minecraft.net</code>, <code>skins.minecraft.net</code>",
    datenschutz_card5_note: "Diese Anfragen laufen direkt zwischen deinem Browser und Mojang/Microsoft bzw. dem jeweiligen Dienst – unser Server sieht diese Daten nicht und speichert sie nicht. Es handelt sich um offizielle bzw. öffentliche Minecraft-Dienste, keine Werbe- oder Tracking-Anbieter.",
    datenschutz_card6_title: "7. Datensicherheit",
    datenschutz_card6_desc: "Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten vor Verlust, Manipulation oder unberechtigtem Zugriff zu schützen.",
    datenschutz_card6_note: "Wir geben deine Daten nicht zu Werbe- oder Analysezwecken an Dritte weiter. Die in Punkt 6 beschriebenen direkten Verbindungen zu Mojang-/Microsoft-Diensten entstehen ausschließlich durch deine aktive Nutzung eines Tools und liegen außerhalb unseres Einflussbereichs. Sobald die Website produktiv über HTTPS bereitgestellt wird, erfolgt die Datenübertragung zwischen deinem Browser und unserem Server verschlüsselt (SSL/TLS).",
    datenschutz_card7_title: "8. Analyse-Tools",
    datenschutz_card7_desc: "<strong>Wichtig:</strong> Wir verwenden <strong>keine</strong> Tracking- oder Analyse-Tools wie Google Analytics. Dein Besuch bleibt privat.",
    datenschutz_card8_title: "9. Deine Rechte",
    datenschutz_card8_desc: "Du hast das Recht auf:",
    datenschutz_card8_li1: "Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)",
    datenschutz_card8_li2: "Berichtigung falscher Daten (Art. 16 DSGVO)",
    datenschutz_card8_li3: "Löschung deiner Daten (Art. 17 DSGVO)",
    datenschutz_card8_li4: "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
    datenschutz_card8_li5: "Datenübertragbarkeit (Art. 20 DSGVO)",
    datenschutz_card8_li6: "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
    datenschutz_card8_li7: "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
    datenschutz_card8_li8: "Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)",
    datenschutz_card8_note: "Wir sind bemüht, Anfragen zu den oben genannten Rechten innerhalb eines Monats gemäß Art. 12 Abs. 3 DSGVO zu beantworten. Wende dich hierfür einfach an unsere unten stehende Kontakt-E-Mail.",
    datenschutz_card9_title: "10. Kontakt",
    datenschutz_card9_desc: "Bei Fragen zum Datenschutz kontaktiere uns:",
    datenschutz_hinweis_title: "Wichtig zu wissen",
    datenschutz_hinweis_desc: "Diese Datenschutzerklärung kann geändert werden, um sie an neue gesetzliche Vorgaben anzupassen. Die jeweils aktuelle Version findest du auf dieser Seite.",
    datenschutz_cta_title: "Fragen zum Datenschutz?",
    datenschutz_cta_desc: "Wir helfen dir gerne weiter. Kontaktiere uns bei Fragen oder Anliegen.",
    datenschutz_cta_btn_email: "E-Mail schreiben",
    datenschutz_cta_btn_impressum: "Impressum",
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
    toast_welcome_title: "Datenschutz geladen!",
    toast_welcome_message: "Deine Privatsphäre ist uns wichtig.",
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
    loader_text1_datenschutz: "Datenschutzerklärung wird geladen...",
    loader_text2: "Rechtliche Informationen werden geladen...",
    loader_text3: "Fast fertig...",
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
    initDatenschutzCards();
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
        t('loader_text1_datenschutz'),
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

// ===== DATENSCHUTZ CARDS ANIMATION =====
function initDatenschutzCards() {
    const datenschutzCards = document.querySelectorAll('.datenschutz-card');
    
    datenschutzCards.forEach((card, index) => {
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

// ===== TOAST =====
function showToast(title, message, type = 'default') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'info') icon = 'fas fa-shield-alt';
    
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
    console.log('MC-Craft Datenschutz-Seite geladen');
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
