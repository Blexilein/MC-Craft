// day-night-cycle.js

// ===== KONFIGURATION =====

// ===== ÜBERSETZUNGEN (erweitert) =====
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
    hero_badge: "V 1.0.0 is here",
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
    day_night_title: "Minecraft Day-Night Cycle",
    day_night_title1: "MC-Craft | Day-Night Cycle",
    day_night_desc: "Set the Minecraft time and watch the clock hand.",
    day_night_cta: "Go to Clock",
    day_night_mobs: "Mobs Guide",
    clock_title: "Minecraft Clock",
    clock_subtitle: "Use the slider or enter a tick value.",
    hero_grid_time: "Simulate Time",
    hero_grid_command: "Copy Command",
    hero_grid_slider: "Slider & Input",
    hero_grid_cycle: "Day & Night",
    time_slider_label: "Time (Ticks):",
    time_input_label: "Value:",
    copy_success: "Command copied!",
    copy_error: "Copy failed",
    toast_welcome_title: "Day-Night Cycle Loaded!",
    toast_welcome_message: "Set the clock and copy the command.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    loader_text1_day_night: "Day-Night Cycle is loading...",
    loader_text2: "Loading history...",
    loader_text3: "Preparing mission...",
    loader_text4: "Loading features...",
    loader_text5: "Almost there..."
};

// ===== DOM ELEMENTE =====
const canvas = document.getElementById('handCanvas');
const svgImg = document.getElementById('clockFace');
const slider = document.getElementById('timeSlider');
const numberInput = document.getElementById('timeNumber');
const commandCode = document.getElementById('commandCode');
const copyBtn = document.getElementById('copyCommandBtn');

let ctx = canvas.getContext('2d');
let currentTime = 0; // Ticks 0–24000

// ===== HILFSFUNKTIONEN =====
// ===== ZEIGER ZEICHNEN (korrigierte Winkellogik) =====
function drawHand() {
    // Canvas-Größe an das tatsächliche SVG anpassen
    const rect = svgImg.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4; // Zeigerlänge

    // Winkel: 0 Ticks = 6 Uhr (unten) → Winkel 180° (Pi)
    // 24000 Ticks = 6 Uhr nächster Tag → auch 180°
    // Fortschritt über 24000 → Winkel = (ticks / 24000) * 360°
    // Um Nullstellung auf 6 Uhr zu setzen: addiere 180°
    const angle = (currentTime / 24000) * 2 * Math.PI + Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.lineWidth = 4;
    ctx.stroke();

    // Mittelpunkt
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    ctx.fill();
}

// ===== ZEIT AKTUALISIEREN =====
function updateTime(value) {
    currentTime = Math.min(24000, Math.max(0, value));
    slider.value = currentTime;
    numberInput.value = currentTime;
    commandCode.textContent = `/time set ${currentTime}`;
    drawHand();
}

// ===== EVENT HANDLER =====
function handleSliderChange(e) {
    updateTime(parseInt(e.target.value));
}
function handleNumberChange(e) {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    val = Math.min(24000, Math.max(0, val));
    updateTime(val);
}
function copyCommand() {
    const text = commandCode.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast(t('copy_success'), '', 'success');
    }).catch(() => {
        showToast(t('copy_error'), '', 'error');
    });
}

// ===== SOUND TOGGLE =====

// ===== AUDIO =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    currentTheme = theme;
    drawHand(); // Zeiger neu zeichnen (Farben aktualisieren)
}

// ===== MOBILE MENU =====

// ===== SCROLL EFFECTS =====

// ===== FOOTER YEAR =====

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    // Canvas‑Größe anpassen, wenn SVG geladen ist oder Fenster neu skaliert wird
    function resizeAndDraw() {
        drawHand();
    }
    if (svgImg.complete) {
        resizeAndDraw();
    } else {
        svgImg.addEventListener('load', resizeAndDraw);
    }
    window.addEventListener('resize', resizeAndDraw);

    slider.addEventListener('input', handleSliderChange);
    numberInput.addEventListener('input', handleNumberChange);
    copyBtn.addEventListener('click', copyCommand);

    updateTime(0);
});
