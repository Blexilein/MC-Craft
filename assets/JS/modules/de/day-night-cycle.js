// day-night-cycle.js

// ===== KONFIGURATION =====

// ===== ÜBERSETZUNGEN (erweitert) =====
const T = {
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
    hero_badge: "V 1.0.0 ist da",
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
    day_night_title: "Minecraft Tag-Nacht-Zyklus",
    day_night_title1: "MC-Craft | Tag-Nacht-Zyklus",
    day_night_desc: "Stelle die Minecraft‑Zeit ein und beobachte den Zeiger auf der Uhr.",
    day_night_cta: "Zur Uhr",
    day_night_mobs: "Mobs Guide",
    clock_title: "Minecraft‑Uhr",
    clock_subtitle: "Ziehe am Schieberegler oder gib einen Tick‑Wert ein.",
    hero_grid_time: "Zeit simulieren",
    hero_grid_command: "Befehl kopieren",
    hero_grid_slider: "Slider & Input",
    hero_grid_cycle: "Tag & Nacht",
    time_slider_label: "Zeit (Ticks):",
    time_input_label: "Wert:",
    copy_success: "Befehl kopiert!",
    copy_error: "Fehler beim Kopieren",
    toast_welcome_title: "Tag-Nacht-Zyklus geladen!",
    toast_welcome_message: "Stelle die Uhr ein und kopiere den Befehl.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    loader_text1_day_night: "Tag-Nacht-Zyklus wird geladen...",
    loader_text2: "Geschichte wird geladen...",
    loader_text3: "Mission wird vorbereitet...",
    loader_text4: "Funktionen werden geladen...",
    loader_text5: "Fast fertig..."
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
