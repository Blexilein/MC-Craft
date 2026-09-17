// coming-soon.js

// ===== CONFIGURATION =====

// Text strings for this page (English only)
const T = {
    toast_welcome_title: "Planned features loaded!",
    toast_welcome_message: "See what we are working on next!",
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
    features_summary: "{done} of {total} done",
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

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

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

// ===== PROGRESS =====
// Percentage from the done and planned cards.
function initFeatureProgress() {
    const done = document.querySelectorAll('.feature-card.done').length;
    const total = done + document.querySelectorAll('.feature-card.planned').length;
    if (!total) return;
    const pct = Math.round(done / total * 100);
    const bar = document.querySelector('.progress-bar-outer');
    const pctEl = document.getElementById('progressPct');
    const summary = document.getElementById('featureSummary');
    if (bar) {
        bar.setAttribute('aria-valuenow', pct);
        bar.querySelector('.progress-bar-inner')?.style.setProperty('--target-width', pct + '%');
    }
    if (pctEl) pctEl.textContent = pct + '%';
    if (summary) summary.textContent = T.features_summary.replace('{done}', done).replace('{total}', total);
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

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initFeatureProgress();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initNotify();
});