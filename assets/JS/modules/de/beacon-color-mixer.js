// ===== BEACON REVERSE FARBMISCHER =====

// ---------- Sound & Sprache ----------

// ---------- VOLLSTÄNDIGE ÜBERSETZUNGEN----------
const T = {
    site_title: "MC-Craft | Beacon Color Mixer",
    site_title_short: "MC-Craft",
    loader_text: "Beacon Color Mixer wird geladen...",
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
    hero_badge: "V 1.0.0 IST DA",
    hero_title: "BEACON <span class=\"highlight\">FARBMISCHER</span> REVERSE",
    hero_desc: "WÄHLE DEINE WUNSCHFARBE – WIR ZEIGEN DIR, WELCHE GLASBLÖCKE DU ÜBER DEM BEACON PLATZIEREN MUSST",
    hero_btn: "Zum Farbmischer",
    hero_grid1: "COLOR PICKER",
    hero_grid2: "GLAS‑KOMBINATION",
    hero_grid3: "SOFORT ERGEBNIS",
    hero_grid4: "1‑10 BLÖCKE",
    mixer_title: "Beacon <span class=\"highlight\">Farbmischer</span> Reverse",
    mixer_subtitle: "Wähle eine beliebige Farbe und erhalte die perfekte Glas‑Kombination",
    picker_label: "Wunschfarbe wählen:",
    combination_title: "Benötigte Glasblöcke",
    achieved_label: "Erreichter Farbton:",
    tips_title: "So funktioniert's",
    tip1: "Wähle deine Zielfarbe mit dem Color‑Picker oder gib einen HEX‑Wert ein.",
    tip2: "Das Tool berechnet die beste Kombination aus 1‑10 gefärbten Glasblöcken.",
    tip3: "Platziere die angezeigten Blöcke in dieser Reihenfolge (von unten nach oben) über dem Beacon.",
    tip4: "Der Beacon‑Strahl färbt sich dann exakt wie in der Vorschau.",
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
    color_white: "Weiß",
    color_orange: "Orange",
    color_magenta: "Magenta",
    color_light_blue: "Hellblau",
    color_yellow: "Gelb",
    color_lime: "Hellgrün",
    color_pink: "Rosa",
    color_gray: "Grau",
    color_light_gray: "Hellgrau",
    color_cyan: "Cyan",
    color_purple: "Violett",
    color_blue: "Blau",
    color_brown: "Braun",
    color_green: "Grün",
    color_red: "Rot",
    color_black: "Schwarz",
    toast_welcome_title: "Beacon Mixer geladen!",
    toast_welcome_message: "Wähle eine Farbe und finde die perfekte Glas‑Kombination.",
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
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar."
};

// ---------- Audio (exakt wie homepage.js) ----------

// ---------- UI Update ----------

// ---------- Toast (wie Homepage) ----------

// ---------- Farbmischer Logik ----------
const glassColors = [
  { name: 'Weiß',      key: 'white',      hex: '#F9FFFE', rgb: [249,255,254], file: '/assets/img/becon/Invicon_White_Stained_Glass_Pane.png' },
  { name: 'Orange',    key: 'orange',     hex: '#F9801D', rgb: [249,128,29],  file: '/assets/img/becon/Invicon_Orange_Stained_Glass_Pane.png' },
  { name: 'Magenta',   key: 'magenta',    hex: '#C74EBD', rgb: [199,78,189],  file: '/assets/img/becon/Invicon_Magenta_Stained_Glass_Pane.png' },
  { name: 'Hellblau',  key: 'light_blue', hex: '#3AB3DA', rgb: [58,179,218],  file: '/assets/img/becon/Invicon_Light_Blue_Stained_Glass_Pane.png' },
  { name: 'Gelb',      key: 'yellow',     hex: '#FED83D', rgb: [254,216,61],  file: '/assets/img/becon/Invicon_Yellow_Stained_Glass_Pane.png' },
  { name: 'Hellgrün',  key: 'lime',       hex: '#80C71F', rgb: [128,199,31],  file: '/assets/img/becon/Invicon_Lime_Stained_Glass_Pane.png' },
  { name: 'Rosa',      key: 'pink',       hex: '#F38BAA', rgb: [243,139,170], file: '/assets/img/becon/Invicon_Pink_Stained_Glass_Pane.png' },
  { name: 'Grau',      key: 'gray',       hex: '#474F52', rgb: [71,79,82],    file: '/assets/img/becon/Invicon_Gray_Stained_Glass_Pane.png' },
  { name: 'Hellgrau',  key: 'light_gray', hex: '#9D9D97', rgb: [157,157,151], file: '/assets/img/becon/Invicon_Light_Gray_Stained_Glass_Pane.png' },
  { name: 'Cyan',      key: 'cyan',       hex: '#169C9C', rgb: [22,156,156],  file: '/assets/img/becon/Invicon_Cyan_Stained_Glass_Pane.png' },
  { name: 'Violett',   key: 'purple',     hex: '#8932B8', rgb: [137,50,184],  file: '/assets/img/becon/Invicon_Purple_Stained_Glass_Pane.png' },
  { name: 'Blau',      key: 'blue',       hex: '#3C44AA', rgb: [60,68,170],   file: '/assets/img/becon/Invicon_Blue_Stained_Glass_Pane.png' },
  { name: 'Braun',     key: 'brown',      hex: '#835432', rgb: [131,84,50],   file: '/assets/img/becon/Invicon_Brown_Stained_Glass_Pane.png' },
  { name: 'Grün',      key: 'green',      hex: '#5E7C16', rgb: [94,124,22],   file: '/assets/img/becon/Invicon_Green_Stained_Glass_Pane.png' },
  { name: 'Rot',       key: 'red',        hex: '#B02E26', rgb: [176,46,38],   file: '/assets/img/becon/Invicon_Red_Stained_Glass_Pane.png' },
  { name: 'Schwarz',   key: 'black',      hex: '#1D1D21', rgb: [29,29,33],    file: '/assets/img/becon/Invicon_Black_Stained_Glass_Pane.png' },
];

function rebuildGlassNames() {
  glassColors.forEach(c => c.name = t('color_' + c.key));
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)] : [255,255,255];
}

function rgbToHex(r,g,b) {
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

function colorDistance(c1, c2) {
  return Math.sqrt((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2);
}

function getCombinations(arrSize, k) {
  const result = [];
  const combine = (start, current) => {
    if (current.length === k) { result.push([...current]); return; }
    for (let i = start; i < arrSize; i++) { current.push(i); combine(i + 1, current); current.pop(); }
  };
  combine(0, []);
  return result;
}

function findBestCombination(targetRgb) {
  let best = { combination: [], distance: Infinity, avg: [255,255,255] };
  for (let k = 1; k <= 10; k++) {
    const combos = getCombinations(glassColors.length, k);
    for (let indices of combos) {
      const subset = indices.map(i => glassColors[i]);
      const count = subset.length;
      const sum = subset.reduce((acc, c) => [acc[0]+c.rgb[0], acc[1]+c.rgb[1], acc[2]+c.rgb[2]], [0,0,0]);
      const avg = sum.map(v => Math.round(v / count));
      const dist = colorDistance(avg, targetRgb);
      if (dist < best.distance) best = { combination: subset, distance: dist, avg };
    }
  }
  return best;
}

function updateResult(targetHex) {
  const targetRgb = hexToRgb(targetHex);
  const { combination, avg } = findBestCombination(targetRgb);

  const stack = document.getElementById('glassStack');
  if (stack) {
    stack.innerHTML = '';
    if (combination.length === 0) {
      stack.innerHTML = '<p class="no-glass">Kein Glas nötig – Strahl bleibt weiß.</p>';
    } else {
      combination.forEach((color, i) => {
        const div = document.createElement('div');
        div.className = 'glass-stack-item';
        div.innerHTML = `<span class="pos-number">${i+1}</span><img src="${color.file}" alt="${color.name}"><span class="glass-label">${color.name}</span>`;
        div.querySelector('img').addEventListener('error', (e) => { e.target.style.display = 'none'; }, { once: true });
        stack.appendChild(div);
      });
    }
  }

  const avgHex = rgbToHex(avg[0], avg[1], avg[2]);
  const beamTint = document.getElementById('beamTint');
  if (beamTint) beamTint.style.backgroundColor = avgHex;

  const achievedHex = document.getElementById('achievedHex');
  if (achievedHex) achievedHex.textContent = avgHex.toUpperCase();

  const swatch = document.getElementById('achievedSwatch');
  if (swatch) swatch.style.backgroundColor = avgHex;
}

// ---------- Initialisierung ----------
document.addEventListener('DOMContentLoaded', () => {
  rebuildGlassNames();
  updateSoundIcon();

  waitForSplashGone(() => {
    playLevelUpSound();
    showWelcomeToast();   // routed through main.js so it can only fire once
  });

  // Theme switcher, mobile drawer, sound toggle and the click sound are wired by
  // main.js. The copy that used to live here added a SECOND click handler to
  // #themeBtn and #soundBtn, so each click toggled twice and cancelled itself out.

  // Color Picker
  const colorPicker = document.getElementById('targetColor');
  const hexInput = document.getElementById('hexInput');
  function handleColorChange(hex) { updateResult(hex); if (hexInput) hexInput.value = hex; }
  if (colorPicker) { colorPicker.addEventListener('input', e => handleColorChange(e.target.value)); handleColorChange('#FFFFFF'); }
  if (hexInput) {
    hexInput.addEventListener('change', () => {
      let val = hexInput.value.trim();
      if (/^[a-fA-F0-9]{6}$/.test(val)) { val = '#' + val; colorPicker.value = val; handleColorChange(val); }
    });
  }

  // Back to Top is handled by initScrollEffects() in main.js.

  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fehler & Online/Offline Events
  
  
  
});
