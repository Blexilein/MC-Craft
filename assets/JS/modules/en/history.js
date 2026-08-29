// History Page JavaScript

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Text strings for this page (English only)
const T = {
    site_title_history: "MC-Craft | Our History",
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
    hero_badge: "Our Story",
    hero_title: "The Journey of <span class=\"highlight\">MC-Craft</span>",
    hero_badge1: "V 1.0.0 is here",
    hero_desc: "From the first idea to the stable 1.0.0 release: transparent, practical, and focused on real usefulness.",
    hero_btn_timeline: "View Development",
    hero_btn_home: "Email Contact",
    hero_grid_founded: "Launched 2026",
    hero_grid_community: "For the Community",
    hero_grid_tools: "16 Tools",
    hero_grid_madeby: "Made by Players",
    timeline_section_title: "Our <span class=\"highlight\">Timeline</span>",
    timeline_section_subtitle: "The key steps toward version 1.0.0",
    timeline_item1_date: "March 2026",
    timeline_item1_title: "The Birth",
    timeline_item1_desc: "It started with one goal: deliver reliable Minecraft tools without unnecessary complexity.",
    timeline_item1_list1: "Project kickoff and initial architecture",
    timeline_item1_list2: "Prototypes for text and color tools",
    timeline_item1_list3: "First internal test setup",
    timeline_item2_date: "2026",
    timeline_item2_title: "Community Growth",
    timeline_item2_desc: "Community feedback helped transform a prototype into a real platform.",
    timeline_item2_list1: "Expansion of core tools",
    timeline_item2_list2: "Unified navigation and page structure",
    timeline_item2_list3: "DE/EN language support integrated",
    timeline_item2_list4: "Mobile-first improvements delivered",
    timeline_item3_date: "Version 1.0.0",
    timeline_item3_title: "Stable Release",
    timeline_item3_desc: "With version 1.0.0, MC-Craft launched as a consolidated and modern platform.",
    timeline_item3_list1: "Version labels standardized to 1.0.0",
    timeline_item3_list2: "Design and responsiveness modernized",
    timeline_item3_list3: "Copy and translations refined",
    timeline_item3_list4: "Stability and quality fixes completed",
    timeline_item4_date: "December 2026",
    timeline_item4_title: "Recognition & Expansion",
    timeline_item4_desc: "MC-Craft was recommended in several Minecraft communities as the best tool collection. We expanded our platform with new innovative tools.",
    timeline_item4_list1: "Recommendation in major Minecraft communities",
    timeline_item4_list2: "Items database with 1,000+ entries",
    timeline_item4_list3: "Complete Mobs Guide",
    timeline_item4_list4: "Added API for developers",
    timeline_item5_date: "Today",
    timeline_item5_title: "The Present",
    timeline_item5_desc: "What started as a small project is now a vibrant platform with a loyal community. We are proud to help players around the world and enhance the Minecraft experience.",
    timeline_item5_list1: "Over 15 useful tools for players and server operators",
    timeline_item5_list2: "Active community with daily interactions",
    timeline_item5_list3: "Over 500,000 satisfied users monthly",
    timeline_item5_list4: "Continuous improvements based on feedback",
    history_release_title: "What Defines Version <span class=\"highlight\">1.0.0</span> ✨",
    history_release_desc: "Version 1.0.0 represents a consolidated platform: unified design, better mobile usability, clear navigation, and cleaner German/English translations.",
    history_release_item1_title: "Responsive Rework",
    history_release_item1_desc: "All core pages were optimized for smartphone, tablet, and desktop.",
    history_release_item2_title: "Improved Translations",
    history_release_item2_desc: "UI text was standardized and rewritten for better language quality.",
    history_release_item3_title: "Consistent Navigation",
    history_release_item3_desc: "Links and menus were cleaned up and made reliable.",
    history_release_item4_title: "Stable Baseline",
    history_release_item4_desc: "The platform now runs on a stable, maintainable 1.0 baseline.",
    history_release_message: "Questions about this development? Contact us directly by email or Discord.",
    history_release_btn_email: "Email Support",
    stats_section_title: "In <span class=\"highlight\">Numbers</span>",
    stats_section_subtitle: "What we have achieved so far",
    stats_tools: "Different Tools",
    stats_mobs: "Mobs in Database",
    stats_items: "Items in Database",
    stats_online: "Online",
    team_section_title: "Behind <span class=\"highlight\">MC-Craft</span>",
    team_section_subtitle: "The team that makes it all possible",
    team_member1_name: "Mohamad Laith",
    team_member1_role: "Founder & Lead Developer",
    team_member1_bio: "Minecraft enthusiast since 2012. Brings the vision and technical expertise.",
    team_member2_name: "Alex",
    team_member2_role: "Full-Stack Developer",
    team_member2_bio: "Responsible for backend APIs and database integrations.",
    team_member3_name: "Sarah",
    team_member3_role: "UI/UX Designer",
    team_member3_bio: "Designs the user-friendly interfaces and theme systems.",
    team_member4_name: "Community Team",
    team_member4_role: "Support & Feedback",
    team_member4_bio: "Our dedicated team interacting daily with the community.",
    future_title: "The <span class=\"highlight\">Future</span> of MC-Craft",
    future_desc: "Our journey is far from over! We are already working on exciting new features:",
    future_feature1_title: "Minecraft Server Dashboard",
    future_feature1_desc: "Comprehensive server statistics and management tools",
    future_feature2_title: "3D Skin Editor",
    future_feature2_desc: "Create and edit skins in a 3D preview",
    future_feature3_title: "Redstone Academy",
    future_feature3_desc: "Learning platform for redstone circuits",
    future_feature4_title: "Community Marketplace",
    future_feature4_desc: "Share and discover custom content",
    future_message: "Our goal remains to be the best resource for Minecraft players - now and in the future!",
    future_btn_tools: "Discover all tools",
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
    toast_welcome_title: "History page loaded!",
    toast_welcome_message: "Experience the journey of MC-Craft!",
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
    loader_text1_history: "MC-Craft History is loading...",
    loader_text2: "Preparing time travel...",
    loader_text3: "Gathering milestones...",
    loader_text4: "Creating timeline...",
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

// ===== LOADER (customized) =====
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
    console.log('MC-Craft History page loaded');
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
