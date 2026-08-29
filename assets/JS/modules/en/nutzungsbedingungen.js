// Terms of Use Page JavaScript

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;
// Translations (English only)
const T = {
    site_title_terms: "MC-Craft | Terms of Use",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Converter",
    nav_color_text: "Color Text",
    nav_items: "Items Database",
    nav_mobs: "Mobs Database",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_beacon_mixer: "Beacon Color Mixer",
    nav_day_night_cycle: "Day-Night Cycle",
    nav_end_poem: "End Poem",
    nav_capes: "Capes Database",
    nav_skins: "Skin Library",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    terms_hero_badge: "Legal",
    terms_hero_title: "Terms of <span class=\"highlight\">Use</span>",
    hero_badge: "V 1.0.0 is here",
    terms_hero_desc: "General terms and conditions for using MC-Craft. Please read these terms carefully.",
    terms_btn_read: "Read Terms",
    terms_btn_privacy: "Privacy Policy",
    terms_grid_legal: "Legally safe",
    terms_grid_privacy: "Privacy",
    terms_grid_transparent: "Transparent",
    terms_grid_fair: "Fair and clear",
    terms_section_title: "General <span class=\"highlight\">Terms and Conditions</span>",
    terms_section_subtitle: "Conditions for using our services",
    terms_toc_title: "Table of Contents",
    terms_toc_link1: "1. Scope",
    terms_toc_link2: "2. Services",
    terms_toc_link3: "3. Right of Use",
    terms_toc_link4: "4. Copyright",
    terms_toc_link5: "5. Limitation of Liability",
    terms_toc_link6: "6. External Links",
    terms_toc_link7: "7. Privacy",
    terms_toc_link8: "8. Changes",
    terms_toc_link9: "9. Final Provisions",
    terms_toc_link10: "10. Contact",
    terms_card1_title: "Scope",
    terms_card1_p1: "These terms of use govern the legal framework for using the MC-Craft website and all related services and offers.",
    terms_card1_p2: "By using our website, you expressly agree to these terms of use. If you do not agree to these terms, you may not use our website.",
    terms_card1_note: "These terms apply to all visitors and users of our platform.",
    terms_card1_note_minors: "Since our services are also of interest to a younger audience, we ask users under 16 to use our offerings only with the consent of a parent or legal guardian.",
    terms_card2_title: "Services",
    terms_card2_p1: "MC-Craft currently offers the following free tools:",
    terms_card2_li1: "Text converter for Minecraft formatting codes",
    terms_card2_li2: "Color text converter",
    terms_card2_li3: "Items database",
    terms_card2_li4: "Mobs database",
    terms_card2_li5: "Server status checks",
    terms_card2_li6: "Minecraft API status",
    terms_card2_li7: "Skin lookup",
    terms_card2_li8: "Skin editor",
    terms_card2_li9: "Day-night cycle simulator",
    terms_card2_li10: "End poem",
    terms_card2_li11: "Capes database (cape gallery)",
    terms_card2_li12: "Minecraft version overview",
    terms_card2_li13: "Skin library (skin gallery)",
    terms_card2_li14: "Beacon color mixer",
    terms_card2_li15: "QR code generator",
    terms_card2_li16: "Advancement generator",
    terms_card2_p2: "All services are offered free of charge and 'as is'. There is no claim to availability, functionality or error-free operation of the services.",
    terms_card2_p3: "We reserve the right to change, extend, temporarily suspend or permanently discontinue individual tools at any time, without this giving rise to any claims against us. Current changes are documented in the <a href=\"/blog/changelog.html\" class=\"highlight-link\">changelog</a>.",
    terms_card3_title: "Right of Use",
    terms_card3_p1: "We grant you a limited, non-exclusive, non-transferable right to use our website and services for personal, non-commercial use.",
    terms_card3_forbidden_title: "The following actions are prohibited:",
    terms_card3_li1: "Automated queries of our services (scraping, crawling)",
    terms_card3_li2: "Use of our services for commercial purposes without permission",
    terms_card3_li3: "Circumventing security measures",
    terms_card3_li4: "Misuse that affects other users",
    terms_card3_li5: "Using our services for illegal purposes",
    terms_card4_title: "Copyright and Intellectual Property",
    terms_card4_p1: "All content, designs, graphics and software on MC-Craft are protected by copyright and remain our property or the property of our licensors.",
    terms_card4_p2: "The Minecraft brands and assets are the property of Mojang Studios and Microsoft. MC-Craft is an independent fan project and is not affiliated with these companies.",
    terms_card4_you_may: "You may:",
    terms_card4_may_li1: "Download content for personal use",
    terms_card4_may_li2: "Use text converter results in Minecraft",
    terms_card4_may_li3: "Reference information for non-commercial purposes",
    terms_card4_you_may_not: "You may not:",
    terms_card4_may_not_li1: "Copy content without permission",
    terms_card4_may_not_li2: "Embed our services on other websites",
    terms_card4_may_not_li3: "Use our trademarks or logos without permission",
    terms_card5_title: "Limitation of Liability",
    terms_card5_not_liable: "We are not liable for:",
    terms_card5_li1: "Accuracy, completeness or timeliness of the information provided",
    terms_card5_li2: "Damages caused by the use or unavailability of our services",
    terms_card5_li3: "Viruses or other harmful components",
    terms_card5_li4: "Acts of third parties who use or misuse our services",
    terms_card5_note: "Liability for intent and gross negligence, as well as any liability that is mandatory under statutory law – in particular for damages arising from injury to life, body, or health, and under product liability law – remains unaffected by the limitations of liability set out above.",
    terms_card6_title: "External Links",
    terms_card6_p1: "Our website may contain links to external third-party websites. We have no control over the content of these websites and assume no liability for them.",
    terms_card6_p2: "The respective provider or operator of the pages is always responsible for the content of the linked pages.",
    terms_card7_title: "Privacy",
    terms_card7_p1: "Your privacy is important to us. We collect and use personal data only within the framework of the legal provisions.",
    terms_card7_p2: "For details on data processing, see our <a href=\"/blog/datenschutz.html\" class=\"highlight-link\">Privacy Policy</a>.",
    terms_card8_title: "Changes to Terms of Use",
    terms_card8_p1: "We reserve the right to change or supplement these terms of use at any time. Changes will be published on this page.",
    terms_card8_p2: "Please check this page regularly for the current version of these terms of use whenever changes are made.",
    terms_card8_note: "Current changes are documented in the <a href=\"/blog/changelog.html\" class=\"highlight-link\">Changelog</a>.",
    terms_card9_title: "Final Provisions",
    terms_card9_governing_law: "German law applies to the exclusion of the UN Convention on Contracts for the International Sale of Goods.",
    terms_card9_place: "Place of performance and jurisdiction is, if legally permissible, our registered office.",
    terms_card9_severability: "If individual provisions of these terms of use are ineffective, the validity of the remaining provisions remains unaffected.",
    terms_card10_title: "Contact",
    terms_card10_p1: "If you have any questions about these terms of use, please contact us at:",
    terms_card10_last_update: "Last updated:",
    terms_card10_note: "These terms of use constitute the entire agreement between you and MC-Craft and supersede all prior agreements.",
    terms_accept_title: "Declaration of Consent",
    terms_accept_desc: "By using our services, you confirm that you have read, understood and accepted these terms of use.",
    terms_accept_btn: "I understand the terms",
    terms_accept_back: "Back to homepage",
    terms_accepted_btn: "Terms already accepted",
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
    toast_welcome_title: "Terms of Use loaded!",
    toast_welcome_message: "Please read these terms carefully.",
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
    toast_accept_title: "Consent confirmed",
    toast_accept_message: "Thank you for your understanding!",
    toast_already_accepted: "Already accepted",
    toast_accepted_on: "Accepted on",
    loader_text1_terms: "Terms of Use are loading...",
    loader_text2: "Preparing legal documents...",
    loader_text3: "Reading terms...",
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
const acceptBtn = document.getElementById('acceptBtn');
const tocLinks = document.querySelectorAll('.toc-link');

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
            console.log('Sound file not found, trying default path...');
            levelUpSound = new Audio('/assets/audio/levelup.ogg');
            levelUpSound.volume = 0.3;
        });
    } catch (error) {
        console.log('Failed to initialize audio:', error);
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
            console.log('Web Audio API fallback failed:', error);
        }
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

// ===== ACCEPT BUTTON (adjusted for translation) =====
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
                `${t('toast_accepted_on')} ${date.toLocaleDateString('en-US')}`,
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
    console.log('MC-Craft Terms of Use page loaded');
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

// ===== CLICK SOUND FOR ALL INTERACTIVE ELEMENTS =====
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
