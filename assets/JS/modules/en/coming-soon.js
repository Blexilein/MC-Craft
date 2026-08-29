// coming-soon.js

// ===== CONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// Text strings for this page (English only)
const T = {
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
    coming_soon_title: "Coming Soon",
    coming_soon_subtitle: "Something big is coming",
    countdown_label: "Time remaining",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    progress_label: "Development progress",
    features_title: "What's coming",
    feature_mobs: "Mobs Database",
    feature_mobs_desc: "98+ Mobs with details",
    feature_themes: "3 Themes",
    feature_themes_desc: "Overworld, Nether, End",
    feature_lang: "DE / EN",
    feature_lang_desc: "Two languages",
    feature_items: "Items",
    feature_items_desc: "Complete Item DB",
    feature_sounds: "Mob Sounds",
    feature_sounds_desc: "Play all sounds",
    feature_biome: "Biome Map",
    feature_biome_desc: "Interactive map",
    feature_enchantment_planner: "Enchantment Planner",
    feature_enchantment_planner_desc: "Plan enchantments and save XP",
    feature_nether_calculator: "Nether Coordinate Calculator",
    feature_nether_calculator_desc: "Convert Overworld and Nether coordinates",
    feature_stack_calculator: "Stack Calculator",
    feature_stack_calculator_desc: "Calculate stacks and shulker boxes",
    feature_command_generator: "Command Generator",
    feature_command_generator_desc: "Create Minecraft commands easily",
    notify_label: "Get notified",
    notify_placeholder: "your@email.com",
    notify_btn: "NOTIFY ME",
    notify_success: "✓ You will be notified!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_copy_success: "Success",
    toast_copy_error: "Error",
    toast_success: "Success",
    toast_info: "Info",
    toast_error: "Error"
};

// ===== DOM ELEMENTS =====
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
        levelUpSound.addEventListener('error', () => console.log('Sound file not found'));
    } catch (error) {
        console.log('Failed to initialize audio:', error);
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
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
}
function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [p, v] of Object.entries(placeholders)) text = text.replace(`{${p}}`, v);
    return text;
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
}
function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
}
function initThemeSwitcher() {
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
        playClickSound();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) themeDropdown.classList.remove('show');
    });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            themeDropdown.classList.remove('show');
            playClickSound();
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }));
        });
    });
}
function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
        default: return 'Overworld';
    }
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
}

// ===== TOAST =====
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-triangle';
    else if (type === 'info') icon = 'fa-info-circle';
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
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

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#00A86B','#00C47A','#334155','#6C63FF','#94A3B8'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${Math.random() * 10 + 8}s;
            border-radius: ${Math.random() > 0.5 ? '2px' : '50%'};
        `;
        container.appendChild(p);
    }
}

// INFO: ===== COUNTDOWN =====
// INFO: let targetDate = new Date();
// INFO: targetDate.setDate(targetDate.getDate() + 30); // 30 days from today
// HACK: Year, Month (0-11 for the month), Day
// NOTE: 0  = January
// NOTE: 1  = February
// NOTE: 2  = March
// NOTE: 3  = April
// NOTE: 4  = May
// NOTE: 5  = June
// NOTE: 6  = July
// NOTE: 7  = August
// NOTE: 8  = September
// NOTE: 9  = October
// NOTE: 10 = November
// NOTE: 11 = December
let targetDate = new Date(2026, 9, 30); 
targetDate.setHours(0, 0, 0, 0);

function pad(n) { return String(n).padStart(2, '0'); }
function updateCountdown() {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (!el) return;
        const newVal = pad(val);
        if (el.textContent !== newVal) {
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
            el.textContent = newVal;
        }
    };
    setVal('days', days);
    setVal('hours', hours);
    setVal('minutes', mins);
    setVal('seconds', secs);
}

// ===== NOTIFY =====
function initNotify() {
    const btn = document.getElementById('notifyBtn');
    const input = document.getElementById('emailInput');
    const successMsg = document.getElementById('notifySuccess');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const email = input.value.trim();
        if (!email || !email.includes('@')) {
            showToast(t('toast_error'), 'Please enter a valid email address.', 'error');
            input.style.borderColor = '#FF6B6B';
            setTimeout(() => input.style.borderColor = '', 1500);
            return;
        }
        // An API request could happen here - we simulate success
        showToast(t('toast_success'), t('notify_success'));
        if (successMsg) {
            successMsg.textContent = t('notify_success');
            successMsg.style.display = 'block';
            setTimeout(() => successMsg.style.display = 'none', 3000);
        }
        input.value = '';
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initSoundToggle();
    initParticles();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initNotify();
});