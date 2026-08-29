// Privacy Policy Page JavaScript

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Translations (English only)
const T = {
    site_title_datenschutz: "MC-Craft | Privacy Policy",
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
    datenschutz_hero_title: "Privacy <span class=\"highlight\">Policy</span>",
    hero_badge: "V 1.0.0 is here",
    datenschutz_hero_desc: "Your privacy is important to us. Here you can find out how we handle your data and what your rights are.",
    datenschutz_btn_read: "Read Privacy Policy",
    datenschutz_btn_impressum: "To Imprint",
    datenschutz_grid_privacy: "Privacy",
    datenschutz_grid_rights: "Your Rights",
    datenschutz_grid_contact: "Contact",
    datenschutz_grid_legal: "Legal",
    datenschutz_section_title: "Our <span class=\"highlight\">Privacy</span> Policy",
    datenschutz_section_subtitle: "Status: August 24, 2026",
    datenschutz_card1_title: "1. General Information",
    datenschutz_card1_desc: "We take the protection of your personal data very seriously. This privacy policy informs you about how we handle your personal data when you use our website.",
    datenschutz_card1_note: "Our services address a general audience interested in Minecraft and do not collect any age-specific data. People under 16 should only give consent to optional external content (see points 3 and 6) with the approval of a parent or legal guardian.",
    datenschutz_card2_title: "2. Responsible Party",
    datenschutz_card2_desc: "<strong>MC-Craft</strong><br>Operated by: Mohamad Laith (Blexilein)<br>64297 Darmstadt<br>Germany<br><br>Email: <a href=\"mailto:privacy@mc-craft.com\">privacy@mc-craft.com</a>",
    datenschutz_cardlegal_title: "3. Legal Basis for Processing",
    datenschutz_cardlegal_desc: "We process personal data solely on the basis of the following legal grounds:",
    datenschutz_cardlegal_li1: "<strong>Art. 6(1)(f) GDPR (legitimate interest):</strong> for automatically collected server log data (see point 4) and for technically necessary local storage, e.g. language, theme and sound settings (see point 5) – our legitimate interest lies in the secure and stable operation of the website.",
    datenschutz_cardlegal_li2: "<strong>Art. 6(1)(a) GDPR in conjunction with § 25(1) TDDDG (consent):</strong> for the one non-technically-necessary external resource (optional font, see point 6), which is only loaded after your explicit consent in the cookie banner.",
    datenschutz_cardlegal_li3: "<strong>§ 25(2) no. 2 TDDDG:</strong> for local storage that is strictly necessary to provide a service you explicitly requested (e.g. your saved language selection) – no separate consent is required for this.",
    datenschutz_cardlegal_note: "We do not pass your data on to third parties for advertising purposes. The direct connections to Mojang/Microsoft described in point 6 arise solely from your active use of a tool and are outside our control.",
    datenschutz_card3_title: "4. Hosting and Server Log Files",
    datenschutz_card3_desc: "With each access to our website, connection data is automatically stored:",
    datenschutz_card3_li1: "IP address",
    datenschutz_card3_li2: "Date and time of access",
    datenschutz_card3_li3: "Browser and operating system used",
    datenschutz_card3_li4: "Name of the retrieved file",
    datenschutz_card3_hosting1: "This website is provided via <strong>Cloudflare Pages</strong>, a service of Cloudflare, Inc. (USA). The connection data listed above – in particular the IP address and HTTP request data – is processed by Cloudflare in order to deliver the website securely and reliably (content delivery, DDoS protection, technical operation).",
    datenschutz_card3_hosting2: "The legal basis for this is Art. 6(1)(f) GDPR (legitimate interest in a secure and stable operation of the website). The recipient of the data is Cloudflare as our hosting and content delivery provider. Because Cloudflare operates a global network, this can involve a transfer to third countries outside the EU/EEA, including the USA; Cloudflare relies on the EU Standard Contractual Clauses (Art. 46 GDPR) as an appropriate safeguard for this.",
    datenschutz_card3_note: "This data is collected purely for technical purposes – to ensure smooth operation, system security, and to optimize our offering – and is not combined with other data sources. The retention period follows the standard retention periods of our hosting provider Cloudflare for connection and log data; security-relevant incidents may require longer retention for evidentiary purposes.",
    datenschutz_card4_title: "5. Cookies & Local Storage",
    datenschutz_card4_desc: "We do not use classic server-side cookies for tracking. Instead your browser stores a few settings purely locally on your own device (localStorage) – this data is never sent to us:",
    datenschutz_card4_li1: "<code>mc-craft-lang</code> – chosen language (German/English)",
    datenschutz_card4_li2: "<code>mc-craft-theme</code> – chosen color theme (Overworld/Nether/End)",
    datenschutz_card4_li3: "<code>mc-craft-sound</code> – whether sound effects are on or off",
    datenschutz_card4_li4: "<code>mc-craft-color-edition</code>, <code>mc-craft-color-theme</code> – your settings in the color text converter",
    datenschutz_card4_li5: "<code>mc-craft-terms-accepted</code>, <code>mc-craft-terms-accepted-date</code> – whether and when you accepted the terms of use",
    datenschutz_card4_li6: "<code>mc-craft-cookie-consent</code> – your own cookie banner decision",
    datenschutz_card4_note: "On your first visit we show a cookie banner. If you reject \"external content\", the one resource this actually affects (an optional font on the Advancement Generator page, see point 6) really is not loaded – not just the banner hidden. You can change your decision at any time via the cookie button in the bottom-left corner of every page. You can also disable storage entirely in your browser settings.",
    datenschutz_card5_title: "6. External Services, Fonts & APIs",
    datenschutz_card5_desc1: "<strong>Self-hosted:</strong> Fonts (Chakra Petch, Space Grotesk – Google Fonts, SIL Open Font License), the Font Awesome icon library, and the three.js/SkinView3D 3D libraries are served from our own server. Your browser does not load them directly from Google, Font Awesome, or their respective external CDNs, but via MC-Craft's hosting infrastructure. Information about the Cloudflare infrastructure used for this is available in point 4 (Hosting and Server Log Files).",
    datenschutz_card5_desc2: "<strong>The one remaining optional external resource:</strong> on the Advancement Generator page we optionally load a pixel font from fonts.cdnfonts.com for the preview image – this transmits your IP address to that provider. This only happens if you choose \"Accept all\" in the cookie banner. If you reject it, the preview uses a fallback font instead.",
    datenschutz_card5_desc3: "<strong>External APIs when actively using a tool:</strong> some tools query official Minecraft/Mojang services directly from your browser when needed. Only the values you enter yourself (e.g. a Minecraft username or a server IP) are sent directly to the respective provider – not to us:",
    datenschutz_card5_li1: "<strong>Server Status:</strong> <code>api.mcsrvstat.us</code>",
    datenschutz_card5_li2: "<strong>Skin Lookup:</strong> <code>playerdb.co</code>, <code>api.mojang.com</code>, <code>sessionserver.mojang.com</code>, <code>textures.minecraft.net</code>",
    datenschutz_card5_li3: "<strong>Minecraft API Status:</strong> <code>status.mojang.com</code>, <code>api.mojang.com</code>, <code>api.minecraftservices.com</code>, <code>session.minecraft.net</code>, <code>authserver.mojang.com</code>, <code>account.mojang.com</code>, <code>auth.mojang.com</code>",
    datenschutz_card5_li4: "<strong>Minecraft Versions:</strong> <code>launchermeta.mojang.com</code>, <code>piston-meta.mojang.com</code>, <code>piston-data.mojang.com</code>, <code>launchercontent.mojang.com</code>, <code>libraries.minecraft.net</code>, <code>resources.download.minecraft.net</code>, <code>www.minecraft.net</code>",
    datenschutz_card5_li5: "<strong>Cape Gallery / Skin Library / Skin Editor:</strong> <code>textures.minecraft.net</code>, <code>skins.minecraft.net</code>",
    datenschutz_card5_note: "These requests run directly between your browser and Mojang/Microsoft or the respective service – our server never sees or stores this data. These are official/public Minecraft services, not advertising or tracking providers.",
    datenschutz_card6_title: "7. Data Security",
    datenschutz_card6_desc: "We use technical and organizational security measures to protect your data against loss, manipulation or unauthorized access.",
    datenschutz_card6_note: "We do not share your data with third parties for advertising or analytics purposes. The direct connections to Mojang/Microsoft services described in point 6 arise solely from your active use of a tool and are outside our control. Once the website is live over HTTPS, data transmission between your browser and our server is encrypted (SSL/TLS).",
    datenschutz_card7_title: "8. Analysis Tools",
    datenschutz_card7_desc: "<strong>Important:</strong> We do <strong>not</strong> use any tracking or analysis tools like Google Analytics. Your visit remains private.",
    datenschutz_card8_title: "9. Your Rights",
    datenschutz_card8_desc: "You have the right to:",
    datenschutz_card8_li1: "Information about your stored data (Art. 15 GDPR)",
    datenschutz_card8_li2: "Correction of incorrect data (Art. 16 GDPR)",
    datenschutz_card8_li3: "Deletion of your data (Art. 17 GDPR)",
    datenschutz_card8_li4: "Restriction of processing (Art. 18 GDPR)",
    datenschutz_card8_li5: "Data portability (Art. 20 GDPR)",
    datenschutz_card8_li6: "Objection to processing (Art. 21 GDPR)",
    datenschutz_card8_li7: "Withdrawing any consent given, with effect for the future (Art. 7(3) GDPR)",
    datenschutz_card8_li8: "Lodging a complaint with a data protection supervisory authority (Art. 77 GDPR)",
    datenschutz_card8_note: "We aim to respond to requests regarding the rights listed above within one month, in accordance with Art. 12(3) GDPR. Simply reach out via the contact email below.",
    datenschutz_card9_title: "10. Contact",
    datenschutz_card9_desc: "If you have any questions about data protection, contact us:",
    datenschutz_hinweis_title: "Important to know",
    datenschutz_hinweis_desc: "This privacy policy may be changed to adapt it to new legal requirements. The current version can be found on this page.",
    datenschutz_cta_title: "Questions about privacy?",
    datenschutz_cta_desc: "We are happy to help you. Contact us with any questions or concerns.",
    datenschutz_cta_btn_email: "Write email",
    datenschutz_cta_btn_impressum: "Imprint",
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
    toast_welcome_title: "Privacy Policy loaded!",
    toast_welcome_message: "Your privacy is important to us.",
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
    loader_text1_datenschutz: "Privacy Policy is loading...",
    loader_text2: "Loading legal information...",
    loader_text3: "Almost done...",
    loader_text4: "Almost done...",
    loader_text5: "Almost done..."
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

// Sound Elements
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// ===== HELPER FUNCTIONS =====
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

// ===== INITIALIZATION =====
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
        console.log('Failed to initialize audio:', error);
    }
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try {
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(error => {
            console.log('Autoplay blocked:', error);
            const enableSound = () => {
                levelUpSound.play().catch(() => {});
                document.removeEventListener('click', enableSound);
                document.removeEventListener('keydown', enableSound);
            };
            document.addEventListener('click', enableSound, { once: true });
            document.addEventListener('keydown', enableSound, { once: true });
        });
    } catch (error) {
        console.log('Sound error:', error);
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

// ===== LOADER (adjusted) =====
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

// ===== PRIVACY CARDS ANIMATION =====
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
    console.log('MC-Craft Privacy Policy page loaded');
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

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====
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
