// ===== BEACON REVERSE FARBMISCHER =====

// ---------- Sound & Sprache ----------

// ---------- VOLLSTÄNDIGE ÜBERSETZUNGEN----------
const T = {
    site_title: "MC-Craft | Beacon Color Mixer",
    site_title_short: "MC-Craft",
    loader_text: "Loading Beacon Color Mixer...",
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
    discover_dropdown: "Explore",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    hero_badge: "V 1.0.0 IS HERE",
    hero_title: "BEACON <span class=\"highlight\">COLOR MIXER</span> REVERSE",
    hero_desc: "CHOOSE YOUR TARGET COLOR – WE SHOW YOU WHICH GLASS BLOCKS TO PLACE ABOVE THE BEACON",
    hero_btn: "To the Mixer",
    hero_grid1: "COLOR PICKER",
    hero_grid2: "GLASS COMBO",
    hero_grid3: "INSTANT RESULT",
    hero_grid4: "1‑10 BLOCKS",
    mixer_title: "Beacon <span class=\"highlight\">Color Mixer</span> Reverse",
    mixer_subtitle: "Choose any color and get the perfect glass combination",
    picker_label: "Choose target color:",
    combination_title: "Required Glass Blocks",
    achieved_label: "Achieved color:",
    tips_title: "How it works",
    tip1: "Pick your target color using the color picker or enter a HEX value.",
    tip2: "The tool calculates the best combination of 1‑10 stained glass blocks.",
    tip3: "Place the shown blocks in this order (bottom to top) above the beacon.",
    tip4: "The beacon beam will then be colored exactly as shown in the preview.",
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
    color_white: "White",
    color_orange: "Orange",
    color_magenta: "Magenta",
    color_light_blue: "Light Blue",
    color_yellow: "Yellow",
    color_lime: "Lime",
    color_pink: "Pink",
    color_gray: "Gray",
    color_light_gray: "Light Gray",
    color_cyan: "Cyan",
    color_purple: "Purple",
    color_blue: "Blue",
    color_brown: "Brown",
    color_green: "Green",
    color_red: "Red",
    color_black: "Black",
    toast_welcome_title: "Beacon Mixer loaded!",
    toast_welcome_message: "Pick a color and find the perfect glass combination.",
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
    toast_offline_message: "Some features may not be available."
};

// ---------- Audio (exakt wie homepage.js) ----------

// ---------- UI Update ----------

// ---------- Toast (wie Homepage) ----------

// ---------- Farbmischer Logik ----------
const glassColors = [
  { name: 'White',      key: 'white',      hex: '#F9FFFE', rgb: [249,255,254], file: '/assets/img/becon/Invicon_White_Stained_Glass_Pane.png' },
  { name: 'Orange',     key: 'orange',     hex: '#F9801D', rgb: [249,128,29],  file: '/assets/img/becon/Invicon_Orange_Stained_Glass_Pane.png' },
  { name: 'Magenta',    key: 'magenta',    hex: '#C74EBD', rgb: [199,78,189],  file: '/assets/img/becon/Invicon_Magenta_Stained_Glass_Pane.png' },
  { name: 'Light Blue', key: 'light_blue', hex: '#3AB3DA', rgb: [58,179,218],  file: '/assets/img/becon/Invicon_Light_Blue_Stained_Glass_Pane.png' },
  { name: 'Yellow',     key: 'yellow',     hex: '#FED83D', rgb: [254,216,61],  file: '/assets/img/becon/Invicon_Yellow_Stained_Glass_Pane.png' },
  { name: 'Lime',       key: 'lime',       hex: '#80C71F', rgb: [128,199,31],  file: '/assets/img/becon/Invicon_Lime_Stained_Glass_Pane.png' },
  { name: 'Pink',       key: 'pink',       hex: '#F38BAA', rgb: [243,139,170], file: '/assets/img/becon/Invicon_Pink_Stained_Glass_Pane.png' },
  { name: 'Gray',       key: 'gray',       hex: '#474F52', rgb: [71,79,82],    file: '/assets/img/becon/Invicon_Gray_Stained_Glass_Pane.png' },
  { name: 'Light Gray', key: 'light_gray', hex: '#9D9D97', rgb: [157,157,151], file: '/assets/img/becon/Invicon_Light_Gray_Stained_Glass_Pane.png' },
  { name: 'Cyan',       key: 'cyan',       hex: '#169C9C', rgb: [22,156,156],  file: '/assets/img/becon/Invicon_Cyan_Stained_Glass_Pane.png' },
  { name: 'Purple',     key: 'purple',     hex: '#8932B8', rgb: [137,50,184],  file: '/assets/img/becon/Invicon_Purple_Stained_Glass_Pane.png' },
  { name: 'Blue',       key: 'blue',       hex: '#3C44AA', rgb: [60,68,170],   file: '/assets/img/becon/Invicon_Blue_Stained_Glass_Pane.png' },
  { name: 'Brown',      key: 'brown',      hex: '#835432', rgb: [131,84,50],   file: '/assets/img/becon/Invicon_Brown_Stained_Glass_Pane.png' },
  { name: 'Green',      key: 'green',      hex: '#5E7C16', rgb: [94,124,22],   file: '/assets/img/becon/Invicon_Green_Stained_Glass_Pane.png' },
  { name: 'Red',        key: 'red',        hex: '#B02E26', rgb: [176,46,38],   file: '/assets/img/becon/Invicon_Red_Stained_Glass_Pane.png' },
  { name: 'Black',      key: 'black',      hex: '#1D1D21', rgb: [29,29,33],    file: '/assets/img/becon/Invicon_Black_Stained_Glass_Pane.png' },
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
      stack.innerHTML = '<p class="no-glass">No glass needed – beam stays white.</p>';
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
