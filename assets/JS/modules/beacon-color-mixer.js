// ===== BEACON REVERSE FARBMISCHER =====

// ---------- Sound & Sprache ----------
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentLang = localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

// ---------- VOLLSTÄNDIGE ÜBERSETZUNGEN----------
const translations = {
  de: {
    // Allgemein
    site_title: "MC-Craft | Beacon Color Mixer",
    site_title_short: "MC-Craft",
    // Loader
    loader_text: "Beacon Color Mixer wird geladen...",
    // Navigation
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
    // Hero
    hero_badge: "V 1.0.0 IST DA",
    hero_title: "BEACON <span class=\"highlight\">FARBMISCHER</span> REVERSE",
    hero_desc: "WÄHLE DEINE WUNSCHFARBE – WIR ZEIGEN DIR, WELCHE GLASBLÖCKE DU ÜBER DEM BEACON PLATZIEREN MUSST",
    hero_btn: "Zum Farbmischer",
    hero_grid1: "COLOR PICKER",
    hero_grid2: "GLAS‑KOMBINATION",
    hero_grid3: "SOFORT ERGEBNIS",
    hero_grid4: "1‑10 BLÖCKE",
    // Mixer
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
    // Footer
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
    // Farbnamen
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
    // Toast-Benachrichtigungen
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
  },
  en: {
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
  }
};

function t(key, params = {}) {
  let text = translations[currentLang]?.[key] || translations['de'][key] || key;
  Object.entries(params).forEach(([k, v]) => text = text.replace(`{${k}}`, v));
  return text;
}

// ---------- Audio (exakt wie homepage.js) ----------
function initAudio() {
  try {
    levelUpSound = new Audio('/assets/audio/levelup.ogg');
    levelUpSound.volume = 0.3;
    levelUpSound.preload = 'auto';
  } catch (e) {}
}

function playLevelUpSound() {
  if (!soundEnabled || !levelUpSound) return;
  levelUpSound.currentTime = 0;
  levelUpSound.play().catch(() => {});
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

// ---------- UI Update ----------
function updateLanguageUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text && !el.children.length) el.textContent = text;
    else if (text) el.innerHTML = text;
  });
  document.title = t('site_title');
}

function updateSoundIcon() {
  const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
  ['soundIcon', 'mobileSoundIcon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  });
}

function updateFlagIcon() {
  const src = currentLang === 'de' ? '/assets/img/backgrounds/de.svg' : '/assets/img/backgrounds/en.svg';
  ['langFlag', 'mobileLangFlag'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = src;
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

// ---------- Toast (wie Homepage) ----------
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-check'}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  container.appendChild(toast);
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
        div.innerHTML = `<span class="pos-number">${i+1}</span><img src="${color.file}" alt="${color.name}" onerror="this.style.display='none'"><span class="glass-label">${color.name}</span>`;
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
  initAudio();
  rebuildGlassNames();
  updateLanguageUI();
  updateSoundIcon();
  updateFlagIcon();

  // Loader
  (() => {
    const loader = document.getElementById('loader');
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
    const interval = setInterval(() => {
      progress += 20;
      updateLoaderProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (loader) { loader.classList.add('hidden'); setTimeout(() => loader.style.display = 'none', 500); }
          playLevelUpSound();
          showToast(t('toast_welcome_title'), t('toast_welcome_message'));
        }, 300);
      }
    }, 120);
  })();

  // Theme
  const savedTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.querySelectorAll('.theme-option, .theme-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('mc-craft-theme', theme);
      document.getElementById('themeDropdown')?.classList.remove('show');
      showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }));
    });
  });
  document.getElementById('themeBtn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('themeDropdown')?.classList.toggle('show');
  });

  // Mobile Menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('mobileNav')?.classList.add('show');
  });
  document.getElementById('closeBtn')?.addEventListener('click', () => {
    document.getElementById('mobileNav')?.classList.remove('show');
  });

  // Sound Toggle
  function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('mc-craft-sound', soundEnabled);
    updateSoundIcon();
    playClickSound();
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'));
  }
  document.getElementById('soundBtn')?.addEventListener('click', toggleSound);
  document.getElementById('mobileSoundBtn')?.addEventListener('click', toggleSound);

  // Language Toggle
  function toggleLang() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    localStorage.setItem('mc-craft-lang', currentLang);
    updateLanguageUI();
    updateFlagIcon();
    rebuildGlassNames();
    const colorPicker = document.getElementById('targetColor');
    if (colorPicker) updateResult(colorPicker.value);
    showToast(t('toast_language_title'), currentLang === 'de' ? t('toast_language_de') : t('toast_language_en'));
  }
  document.getElementById('langBtn')?.addEventListener('click', toggleLang);
  document.getElementById('mobileLangBtn')?.addEventListener('click', toggleLang);

  // Klick-Sound auf allen interaktiven Elementen
  document.querySelectorAll('button, .btn, .nav-link, .theme-option, .tool-link, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn')
    .forEach(el => el.addEventListener('click', () => setTimeout(playClickSound, 50)));

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

  // Back to Top
  window.addEventListener('scroll', () => { document.getElementById('backToTop')?.classList.toggle('show', window.scrollY > 300); });
  document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fehler & Online/Offline Events
  window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    showToast(t('toast_error_title'), t('toast_error_message'), 'error');
  });
  window.addEventListener('online', () => showToast(t('toast_online_title'), t('toast_online_message')));
  window.addEventListener('offline', () => showToast(t('toast_offline_title'), t('toast_offline_message')));
});
