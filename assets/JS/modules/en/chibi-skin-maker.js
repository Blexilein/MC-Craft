function setVisible(el, on) {
  if (!el) return;
  el.hidden = !on;
}

function setRowEnabled(row, on) {
  if (!row) return;
  row.classList.toggle('is-disabled', !on);
  for (const input of row.querySelectorAll('input, select, button')) input.disabled = !on;
}

function setBusy(btn, label) {
  if (!btn || btn._busy) return;
  btn._busy = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = label;
}

function clearBusy(btn) {
  if (!btn || !btn._busy) return;
  btn.innerHTML = btn._busy;
  btn._busy = null;
  btn.disabled = false;
}

const T = {
    // General
    site_title_changelog: "MC-Craft | Chibi Skin",
    site_title_short: "MC-Craft",
    // Navigation
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
    // Dropdowns
    tools_dropdown: "Tools",
    discover_dropdown: "Explore",
    // Theme
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Select theme:",
    // Sound & Language
    sound_toggle: "Sound",
    language: "Language",
    // Footer
    footer_description: "Free Minecraft tools for the community. Built by players, for players.",
    footer_tools: "Tools",
    footer_more_tools: "More Tools",
    footer_legal: "Legal",
    footer_about: "About Us",
    footer_support: "Support",
    footer_impressum: "Impressum",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_copyright: "Copyright",
    capes_db_title: "Capes Database",
    skins_library_title: "Skin Library",
    footer_history: "MC-Craft History",
    footer_team: "Our Team",
    footer_about_us: "About us",
    footer_faq: "FAQ & Help",
    footer_bug: "Report a Bug",
    footer_support_contact: "Support Contact",
    footer_rights: "All rights reserved.",
    footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not affiliated with Mojang or Microsoft.",
    footer_version: "Version 1.0.0",
    footer_changelog: "Changelog",
    // Toast notifications
    toast_welcome_title: "Chibi Skin loaded!",
    toast_welcome_message: "Discover the Chibi Skin Maker from MC-Craft.",
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
    toast_error_message: "A small error occurred. The page still works.",
    toast_online_title: "Connection restored",
    toast_online_message: "You're back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some features may not be available.",
    // Loader
    loader_text1_chibi: "Chibi Skin Maker is loading...",
    loader_text2: "Preparing skin renderer...",
    loader_text3: "Loading chibi models...",
    loader_text4: "Preparing tools...",
    loader_text5: "Almost there..."
};

    var soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
    var currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
    var levelUpSound = null;

    var currentSkinImg = null;
    var currentSkinUrl = null;
    var currentModel = 'default';
    var currentPose = 'tpose';
    var currentAngle = 'front';

    var THEME_NAMES = { overworld: 'Overworld', nether: 'Nether', end: 'The End' };

    // ===== DOM REFERENCES =====
    var toastContainer = document.getElementById('toastContainer');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var closeBtn = document.getElementById('closeBtn');
    var mobileNav = document.getElementById('mobileNav');
    var themeBtn = document.getElementById('themeBtn');
    var themeDropdown = document.getElementById('themeDropdown');
    var soundBtn = document.getElementById('soundBtn');
    var soundIcon = document.getElementById('soundIcon');
    var mobileSoundBtn = document.getElementById('mobileSoundBtn');
    var mobileSoundIcon = document.getElementById('mobileSoundIcon');
    var backToTop = document.getElementById('backToTop');
    var header = document.querySelector('.header');

    // Old/optional references: null is allowed.
    var uploadDropzone = document.getElementById('skinDropzone');
    var skinFileInput = document.getElementById('skinFileInput');
    var usernameInput = document.getElementById('usernameInput');
    var lookupBtn = document.getElementById('lookupBtn');
    var modelSelect = document.getElementById('modelSelect');
    var posePresetRow = document.getElementById('posePresetRow');
    var anglePresetRow = document.getElementById('anglePresetRow');
    var downloadViewBtn = document.getElementById('downloadViewBtn');
    var saveViewBtn = document.getElementById('saveViewBtn');
    var downloadGifBtn = document.getElementById('downloadGifBtn');
    var clearSkinBtn = document.getElementById('clearSkinBtn');

// ===== HILFSFUNKTIONEN =====
// ===== TOAST =====
function showToast(title, message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error-toast' : ''}`;

    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-triangle';
    else if (type === 'warning') icon = 'fa-exclamation-circle';
    else if (type === 'info') icon = 'fa-info-circle';

    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title"></div>
            <div class="toast-message"></div>
        </div>
    `;

    const titleEl = toast.querySelector('.toast-title');
    const messageEl = toast.querySelector('.toast-message');
    if (titleEl) titleEl.textContent = title == null ? '' : String(title);
    if (messageEl) messageEl.textContent = message == null ? '' : String(message);

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    const removeToast = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    };

    const timer = setTimeout(removeToast, 5000);
    toast.addEventListener('click', () => {
        clearTimeout(timer);
        removeToast();
    }, { once: true });
}
window.showToast = showToast;

// ===== AUDIO =====

function playClickSound() {
    if (!soundEnabled) return;
    if (!(window.AudioContext || window.webkitAudioContext)) return;

    const now = (typeof performance !== 'undefined' && performance.now)
        ? performance.now()
        : Date.now();
    const last = window.__mcCraftLastClickSoundAt || 0;
    if (now - last < 120) return;
    window.__mcCraftLastClickSoundAt = now;

    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new AudioCtx());

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
        osc.stop(ctx.currentTime + 0.1);
    } catch (_) {
        // Sound must never break the page.
    }
}

// ===== SOUND TOGGLE =====

// ===== THEME SYSTEM =====
function applyTheme(theme) {
    const safeTheme = ['overworld', 'nether', 'end'].includes(theme) ? theme : 'overworld';
    document.documentElement.setAttribute('data-theme', safeTheme);
    localStorage.setItem('mc-craft-theme', safeTheme);
    currentTheme = safeTheme;
}

// ===== MOBILE MENU =====

// ===== LOADER =====

function finishPageLoading() {
    waitForSplashGone(() => {
        playLevelUpSound();
        showWelcomeToast();
    });
}

function initLoader() {
    finishPageLoading();
}

// ===== FOOTER YEAR =====

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const updateScrollState = () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
}

const CHIBI_SPRITE = { w: 24, h: 33 };
const CHIBI_SIDE_SHADE = 0.84;

const CHIBI_PARTS = {
  lArmSideHid: { base: [32, 52, 4, 12], over: [48, 52, 4, 12], dest: [16, 17, 3, 10], side: true },
  bodySideHid: { base: [16, 20, 4, 12], over: [16, 36, 4, 12], dest: [5, 17, 4, 10], side: true },
  lLegSideHid: { base: [16, 52, 4, 12], over: [0, 52, 4, 12], dest: [10, 27, 4, 6], side: true },
  rLegSide:  { base: [0, 20, 4, 12],  over: [0, 36, 4, 12],  dest: [5, 27, 4, 6], side: true },
  rLegFront: { base: [4, 20, 4, 12],  over: [4, 36, 4, 12],  dest: [9, 27, 5, 6] },
  lLegFront: { base: [20, 52, 4, 12], over: [4, 52, 4, 12],  dest: [14, 27, 5, 6] },
  bodySide:  { base: [16, 20, 4, 12], over: [16, 36, 4, 12], dest: [8, 17, 1, 10], side: true },
  bodyFront: { base: [20, 20, 8, 12], over: [20, 36, 8, 12], dest: [9, 17, 10, 10] },
  rArmSide:  { base: [40, 20, 4, 12], over: [40, 36, 4, 12], dest: [2, 17, 3, 10], side: true },
  rArmFront: { base: [44, 20, 4, 12], over: [44, 36, 4, 12], dest: [5, 17, 3, 10], wideDest: [5, 17, 4, 10], arm: true },
  lArmFront: { base: [36, 52, 4, 12], over: [52, 52, 4, 12], dest: [19, 17, 3, 10], wideDest: [19, 17, 4, 10], arm: true },
  headSide:  { src: [0, 8, 8, 8],  dest: [1, 1, 6, 16], side: true },
  headFront: { src: [8, 8, 8, 8],  dest: [7, 1, 16, 16] },
  hatSide:   { src: [32, 8, 8, 8], dest: [0, 0, 6, 18], hat: true, side: true },
  hatFront:  { src: [40, 8, 8, 8], dest: [6, 0, 18, 18], hat: true },
};

const CHIBI_ORDER = ['lArmSideHid','bodySideHid','lLegSideHid','rLegSide','rLegFront','lLegFront','bodySide','bodyFront','rArmSide','rArmFront','lArmFront','headSide','headFront','hatSide','hatFront'];

const CHIBI_PARTS_LEFT = {
  rArmSideHid: { base: [48, 20, 4, 12], over: [48, 36, 4, 12], dest: [5, 17, 3, 10], side: true, slimShiftX: true, mirrorMap: true },
  bodySideHid: { base: [28, 20, 4, 12], over: [28, 36, 4, 12], dest: [15, 17, 4, 10], side: true },
  rLegSideHid: { base: [8, 20, 4, 12], over: [8, 36, 4, 12], dest: [10, 27, 4, 6], side: true },
  rLegFront: { base: [4, 20, 4, 12],  over: [4, 36, 4, 12],  dest: [5, 27, 5, 6] },
  lLegFront: { base: [20, 52, 4, 12], over: [4, 52, 4, 12],  dest: [10, 27, 5, 6] },
  lLegSide:  { base: [24, 52, 4, 12], over: [8, 52, 4, 12],  dest: [15, 27, 4, 6], side: true },
  bodyFront: { base: [20, 20, 8, 12], over: [20, 36, 8, 12], dest: [5, 17, 10, 10] },
  bodySide:  { base: [28, 20, 4, 12], over: [28, 36, 4, 12], dest: [15, 17, 1, 10], side: true, mirrorMap: true },
  rArmFront: { base: [44, 20, 4, 12], over: [44, 36, 4, 12], dest: [2, 17, 3, 10], wideDest: [1, 17, 4, 10], arm: true },
  lArmFront: { base: [36, 52, 4, 12], over: [52, 52, 4, 12], dest: [16, 17, 3, 10], wideDest: [15, 17, 4, 10], arm: true },
  lArmSide:  { base: [40, 52, 4, 12], over: [56, 52, 4, 12], dest: [19, 17, 3, 10], side: true, slimShiftX: true, mirrorMap: true },
  headFront: { src: [8, 8, 8, 8],   dest: [1, 1, 16, 16] },
  headSide:  { src: [16, 8, 8, 8],  dest: [17, 1, 6, 16], side: true },
  hatFront:  { src: [40, 8, 8, 8],  dest: [0, 0, 18, 18], hat: true },
  hatSide:   { src: [48, 8, 8, 8],  dest: [18, 0, 6, 18], hat: true, side: true },
};

const CHIBI_ORDER_LEFT = ['rArmSideHid','bodySideHid','rLegSideHid','rLegFront','lLegFront','lLegSide','bodySide','bodyFront','rArmFront','lArmFront','lArmSide','headSide','headFront','hatSide','hatFront'];

const CHIBI_PARTS_FLAT = {
  rLegFront:  { src: [4, 20, 4, 12],  dest: [6, 27, 4, 6] },
  lLegFront:  { src: [20, 52, 4, 12], dest: [10, 27, 4, 6] },
  rPantFront: { src: [4, 36, 4, 12],  dest: [6, 27, 4, 6], clothing: true },
  lPantFront: { src: [4, 52, 4, 12],  dest: [10, 27, 4, 6], clothing: true },
  bodyFront:  { src: [20, 20, 8, 12], dest: [6, 17, 8, 10] },
  jacketFront:{ src: [20, 36, 8, 12], dest: [6, 17, 8, 10], clothing: true },
  rArmFront:  { src: [44, 20, 4, 12], dest: [2, 17, 4, 10], arm: true },
  lArmFront:  { src: [36, 52, 4, 12], dest: [14, 17, 4, 10], arm: true },
  rSlvFront:  { src: [44, 36, 4, 12], dest: [2, 17, 4, 10], arm: true, clothing: true },
  lSlvFront:  { src: [52, 52, 4, 12], dest: [14, 17, 4, 10], arm: true, clothing: true },
  headFront:  { src: [8, 8, 8, 8],  dest: [2, 1, 16, 16] },
  hatFront:   { src: [40, 8, 8, 8], dest: [1, 0, 18, 18], hat: true },
};

const CHIBI_ORDER_FLAT = ['rLegFront','lLegFront','rPantFront','lPantFront','bodyFront','jacketFront','rArmFront','lArmFront','rSlvFront','lSlvFront','headFront','hatFront'];

const CHIBI_PARTS_BACK = {
  rLegBack:  { src: [12, 20, 4, 12], dest: [10, 27, 4, 6] },
  lLegBack:  { src: [28, 52, 4, 12], dest: [6, 27, 4, 6] },
  rPantBack: { src: [12, 36, 4, 12], dest: [10, 27, 4, 6], clothing: true },
  lPantBack: { src: [12, 52, 4, 12], dest: [6, 27, 4, 6], clothing: true },
  bodyBack:  { src: [32, 20, 8, 12], dest: [6, 17, 8, 10] },
  jacketBack:{ src: [32, 36, 8, 12], dest: [6, 17, 8, 10], clothing: true },
  rArmBack:  { src: [52, 20, 4, 12], dest: [14, 17, 4, 10], arm: true, slimShiftX: true },
  lArmBack:  { src: [44, 52, 4, 12], dest: [2, 17, 4, 10], arm: true, slimShiftX: true },
  rSlvBack:  { src: [52, 36, 4, 12], dest: [14, 17, 4, 10], arm: true, slimShiftX: true, clothing: true },
  lSlvBack:  { src: [60, 52, 4, 12], dest: [2, 17, 4, 10], arm: true, slimShiftX: true, clothing: true },
  headBack:  { src: [24, 8, 8, 8],  dest: [2, 1, 16, 16] },
  hatBack:   { src: [56, 8, 8, 8],  dest: [1, 0, 18, 18], hat: true },
};

const CHIBI_ORDER_BACK = ['rLegBack','lLegBack','rPantBack','lPantBack','bodyBack','jacketBack','rArmBack','lArmBack','rSlvBack','lSlvBack','headBack','hatBack'];

const CHIBI_BAND_YMAP = [0, 1, 2, 3, 4, 6, 8, 9, 10, 11];
const CHIBI_FAR_SHADE = 0.86;

const CHIBI_PARTS_TOP = CHIBI_PARTS_FLAT;
const CHIBI_PARTS_BOTTOM = CHIBI_PARTS_BACK;
const CHIBI_ORDER_TOP = CHIBI_ORDER_FLAT;
const CHIBI_ORDER_BOTTOM = CHIBI_ORDER_BACK;

const CHIBI_PARTS_SIDE_LEFT = CHIBI_PARTS_LEFT;
const CHIBI_PARTS_SIDE_RIGHT = CHIBI_PARTS;
const CHIBI_ORDER_SIDE_LEFT = CHIBI_ORDER_LEFT;
const CHIBI_ORDER_SIDE_RIGHT = CHIBI_ORDER;
const CHIBI_PARTS_BACK_LEFT = CHIBI_PARTS_BACK;
const CHIBI_PARTS_BACK_RIGHT = CHIBI_PARTS_BACK;
const CHIBI_ORDER_BACK_LEFT = CHIBI_ORDER_BACK;
const CHIBI_ORDER_BACK_RIGHT = CHIBI_ORDER_BACK;

const CHIBI_VIEWS = {
  '34-right':     { side: false, flat: false, facing: 'right', vs: 'front' },
  '34-left':      { side: false, flat: false, facing: 'left',  vs: 'front' },
  'front':        { side: false, flat: true,  vs: 'front' },
  'back':         { side: false, flat: true,  vs: 'back' },
  'side-right':   { side: true,  facing: 'right' },
  'side-left':    { side: true,  facing: 'left' },
  'back34-right': { side: false, flat: false, facing: 'right', vs: 'back' },
  'back34-left':  { side: false, flat: false, facing: 'left',  vs: 'back' },
  'top':          { vert: 'top' },
  'bottom':       { vert: 'bottom' },
};

const CHIBI_POSES = {
  tpose: {},
  sitting: {
    leftLeg: { rotationDeg: -85 },
    rightLeg: { rotationDeg: -85 }
  },
  salute: {
    rightArm: { rotationDeg: -110, offsetY: -1 }
  },
  armsback: {
    zOrderArmsBehind: true,
    leftArm: { rotationDeg: 15, offsetX: 1 },
    rightArm: { rotationDeg: -15, offsetX: -1 }
  },
  jump: {
    leftArm: { rotationDeg: -35 },
    rightArm: { rotationDeg: 35 },
    leftLeg: { rotationDeg: -20 },
    rightLeg: { rotationDeg: 20 }
  },
  zombie: {
    leftArm: { rotationDeg: 100 },
    rightArm: { rotationDeg: -100 }
  },
  aiming: {
    rightArm: { rotationDeg: -95 },
    leftArm: { rotationDeg: -35 }
  },
  cheering: {
    leftArm: { rotationDeg: 125 },
    rightArm: { rotationDeg: -125 }
  },
  mining: {
    rightArm: { rotationDeg: -55 }
  },
  waving: {
    leftArm: { rotationDeg: -55 },
    rightArm: { rotationDeg: 55 }
  },
  handshake: {
    leftArm: { rotationDeg: 95, offsetX: 2 },
    rightArm: { rotationDeg: -95, offsetX: -2 }
  },
  dab: {
    leftArm: { rotationDeg: 110 },
    rightArm: { rotationDeg: -110 }
  },
  crouch: {
    leftLeg: { rotationDeg: 45 },
    rightLeg: { rotationDeg: 45 }
  },
  quadruped: {
    leftArm: { rotationDeg: 60 },
    rightArm: { rotationDeg: -60 },
    leftLeg: { rotationDeg: 50 },
    rightLeg: { rotationDeg: -50 }
  },
  pleading: {
    leftArm: { rotationDeg: 35 },
    rightArm: { rotationDeg: -35 }
  }
};

const CHIBI_ANIM_GROUPS = {
  head: ['head', 'hat'],
  body: ['body', 'jacket', 'belt'],
  lArm: ['lArm', 'lSlv'],
  rArm: ['rArm', 'rSlv'],
  lLeg: ['lLeg', 'lPant'],
  rLeg: ['rLeg', 'rPant'],
};

const CHIBI_ANIM_ALIASES = {
  wave: 'wave', nod: 'nod', shake: 'shake', cheer: 'cheer', skip: 'skip', bounce: 'bounce',
  dance: 'dance', shiver: 'shiver', turn: 'turn', spin: 'spin', stab: 'stab', death: 'death',
  prowl: 'prowl', crawl: 'crawl', gallop: 'gallop', pounce: 'pounce', idle: 'idle',
  walk: 'walk', run: 'run', jump: 'jump', joy: 'joy', surprise: 'surprise', bow: 'bow',
  sulk: 'sulk', clap: 'clap'
};

const CHIBI_ANIMS = {
  none: { label: 'None', frames: [{ d: 0, pose: 'none', livePose: 'none' }] },
  idle: { label: 'Idle', frames: [
    { d: 420, pose: 'none', livePose: 'none', dy: 0 },
    { d: 420, pose: 'none', livePose: 'none', dy: 1 },
  ] },
  walk: { label: 'Walk', frames: [
    { d: 130, pose: 'tpose', livePose: 'tpose', dx: -1 },
    { d: 130, pose: 'none', livePose: 'none', dx: 1 },
  ] },
  run: { label: 'Run', frames: [
    { d: 85, pose: 'tpose', livePose: 'tpose', dx: -1, dy: 0 },
    { d: 85, pose: 'crouch', livePose: 'crouch', dx: 1, dy: -1 },
  ] },
  skip: { label: 'Skip', frames: [
    { d: 100, pose: 'none', livePose: 'none', dy: 0 },
    { d: 120, pose: 'jump', livePose: 'joy@up', dy: -3 },
    { d: 100, pose: 'none', livePose: 'none', dy: 0 },
  ] },
  jump: { label: 'Jump', frames: [
    { d: 90, pose: 'crouch', livePose: 'crouch', dy: 1 },
    { d: 130, pose: 'jump', livePose: 'tpose', dy: -4 },
    { d: 90, pose: 'none', livePose: 'none', dy: 0 },
  ] },
  wave: { label: 'Wave', frames: [
    { d: 150, pose: 'waving', livePose: 'waving' },
    { d: 150, pose: 'none', livePose: 'none' },
  ] },
  nod: { label: 'Nod', frames: [
    { d: 130, pose: 'none', livePose: 'none' },
    { d: 130, pose: 'salute', livePose: 'nod@dip' },
    { d: 130, pose: 'none', livePose: 'none' },
  ] },
  shake: { label: 'Shake head', frames: [
    { d: 105, pose: 'none', livePose: 'shake@left' },
    { d: 105, pose: 'none', livePose: 'shake@right' },
    { d: 105, pose: 'none', livePose: 'none' },
  ] },
  clap: { label: 'Clap', frames: [
    { d: 120, pose: 'none', livePose: 'none' },
    { d: 120, pose: 'waving', livePose: 'clap@hands' },
  ] },
  cheer: { label: 'Cheer', frames: [
    { d: 150, pose: 'cheering', livePose: 'joy@up', dy: -1 },
    { d: 150, pose: 'armsback', livePose: 'joy@settle', dy: 0 },
  ] },
  sulk: { label: 'Sulk', frames: [
    { d: 180, pose: 'pleading', livePose: 'pleading' },
    { d: 180, pose: 'crouch', livePose: 'crouch' },
  ] },
  joy: { label: 'Joy', frames: [
    { d: 130, pose: 'cheering', livePose: 'joy@up', dy: -2 },
    { d: 130, pose: 'armsback', livePose: 'joy@settle', dy: 0 },
  ] },
  surprise: { label: 'Surprise', frames: [
    { d: 150, pose: 'aiming', livePose: 'surprise@up' },
    { d: 150, pose: 'none', livePose: 'surprise@settle' },
  ] },
  bow: { label: 'Bow', frames: [
    { d: 150, pose: 'sitting', livePose: 'bow@mid' },
    { d: 180, pose: 'armsback', livePose: 'bow@deep' },
  ] },
  bounce: { label: 'Bounce', frames: [
    { d: 100, pose: 'none', livePose: 'none', dy: 0 },
    { d: 100, pose: 'jump', livePose: 'joy@up', dy: -3 },
  ] },
  dance: { label: 'Dance', frames: [
    { d: 120, pose: 'waving', livePose: 'waving', dx: -1 },
    { d: 120, pose: 'dab', livePose: 'dab', dx: 1 },
    { d: 120, pose: 'cheering', livePose: 'joy@up', dy: -1 },
  ] },
  shiver: { label: 'Shiver', frames: [
    { d: 70, pose: 'zombie', livePose: 'zombie', dx: -1 },
    { d: 70, pose: 'zombie', livePose: 'zombie', dx: 1 },
  ] },
  turn: { label: 'Turn', frames: [
    { d: 120, pose: 'none', livePose: 'none', view: '34-right' },
    { d: 120, pose: 'none', livePose: 'none', view: 'side-right' },
    { d: 120, pose: 'none', livePose: 'none', view: 'back34-right' },
    { d: 120, pose: 'none', livePose: 'none', view: 'side-left' },
  ] },
  spin: { label: 'Spin', frames: [
    { d: 90, pose: 'tpose', livePose: 'tpose', view: '34-right' },
    { d: 90, pose: 'tpose', livePose: 'tpose', view: 'side-right' },
    { d: 90, pose: 'tpose', livePose: 'tpose', view: 'back34-right' },
    { d: 90, pose: 'tpose', livePose: 'tpose', view: 'side-left' },
  ] },
  stab: { label: 'Stab', frames: [
    { d: 130, pose: 'mining', livePose: 'stab@ready' },
    { d: 110, pose: 'mining', livePose: 'stab@raise' },
    { d: 90, pose: 'zombie', livePose: 'stab@strike' },
    { d: 110, pose: 'zombie', livePose: 'stab@swing' },
  ] },
  death: { label: 'Death', frames: [
    { d: 180, pose: 'zombie', livePose: 'zombie' },
    { d: 420, pose: 'sitting', livePose: 'death@down' },
  ] },
  prowl: { label: 'Prowl', frames: [
    { d: 150, pose: 'crouch', livePose: 'crouch', dx: -1 },
    { d: 150, pose: 'sitting', livePose: 'sitting', dx: 1 },
  ] },
  crawl: { label: 'Crawl', frames: [
    { d: 150, pose: 'quadruped', livePose: 'quadruped', dx: -1 },
    { d: 150, pose: 'crouch', livePose: 'crouch', dx: 1 },
  ] },
  gallop: { label: 'Gallop', frames: [
    { d: 95, pose: 'quadruped', livePose: 'quadruped', dx: -1, dy: 0 },
    { d: 95, pose: 'quadruped', livePose: 'quadruped', dx: 1, dy: -1 },
  ] },
  pounce: { label: 'Pounce', frames: [
    { d: 110, pose: 'crouch', livePose: 'crouch', dy: 1 },
    { d: 130, pose: 'jump', livePose: 'tpose', dy: -4 },
    { d: 120, pose: 'quadruped', livePose: 'quadruped', dy: 0 },
  ] },
};

const ML_ANIM_KEYS = [...new Set(['none', ...Object.keys(CHIBI_ANIMS)])];

const ML_SPRITE = { w: 36, h: 42 };
const ML_ANIM_ROOM = 0;
const ML_LAYOUT_W = 35;
const ML_SIDE_SHADE = 0.67;
const ML_FAR_SHADE = 0.808;
const ML_AO_SHADE = 0.82;
const ML_EDGE_V = 0.46;
const ML_EDGE_S = 1.45;
const ML_EDGE_S_ADD = 0.28;

const ML_PROP_SPRITES = {
  swordUp: {
    pal: ['#444444', '#ffffff', '#bebebe', '#181818', '#d8d8d8', '#969696', '#6b6b6b', '#493615', '#896727', '#684e1e'],
    rows: [
      '....1....',
      '...121...',
      '..12324..',
      '..12324..',
      '..12324..',
      '..12354..',
      '..15354..',
      '..45354..',
      '..45354..',
      '..45354..',
      '..45654..',
      '..45654..',
      '..45654..',
      '114575444',
      '177671114',
      '.1167144.',
      '...184...',
      '....9....',
      '...1a1...',
      '...174...',
      '...444...',
    ],
  },
  swordRight: {
    pal: ['#444444', '#6b6b6b', '#181818', '#969696', '#d8d8d8', '#ffffff', '#684e1e', '#896727', '#493615', '#bebebe'],
    rows: [
      '......11.............',
      '.....121.............',
      '.11..12333333311111..',
      '31211445555555566661.',
      '32789222444aaaaaaaa61',
      '33213115555555556661.',
      '.33..31333333333333..',
      '.....313.............',
      '......33.............',
    ],
  },
  swordDiag: {
    pal: ['#444444', '#ffffff', '#181818', '#bebebe', '#d8d8d8', '#6b6b6b', '#969696', '#493615', '#896727', '#684e1e', '#281e0b'],
    rows: [
      '............111',
      '...........1223',
      '..........12423',
      '.........12423.',
      '........12453..',
      '.......12453...',
      '......12453....',
      '..11.15453.....',
      '..1635753......',
      '..177653.......',
      '...1613........',
      '..893113.......',
      '11ab.333.......',
      '163............',
      '333............',
    ],
  },
};

const ML_PROP_CACHE = new Map();
function mlPropCanvas(name, flipX, flipY, K) {
  const S = ML_PROP_SPRITES[name];
  if (!S) return null;
  const ck = name + (flipX ? 'X' : '') + (flipY ? 'Y' : '') + '@' + K;
  const hit = ML_PROP_CACHE.get(ck);
  if (hit) return hit;
  const w = S.rows[0].length, h = S.rows.length;
  const cv = document.createElement('canvas');
  cv.width = w * K; cv.height = h * K;
  const c = cv.getContext('2d'); c.imageSmoothingEnabled = false;
  for (let y = 0; y < h; y++) {
    const row = S.rows[y];
    for (let x = 0; x < w; x++) {
      const ch = row[x];
      if (ch === '.') continue;
      c.fillStyle = S.pal[parseInt(ch, 36) - 1];
      c.fillRect((flipX ? w - 1 - x : x) * K, (flipY ? h - 1 - y : y) * K, K, K);
    }
  }
  const rec = { cv, w, h };
  ML_PROP_CACHE.set(ck, rec);
  return rec;
}

const ML_BOXES = {
  head: { base: [0, 0],   over: null,      w: 8, h: 8,  d: 8 },
  hat:  { base: [32, 0],  over: null,      w: 8, h: 8,  d: 8 },
  body: { base: [16, 16], over: [16, 32],  w: 8, h: 12, d: 4 },
  rArm: { base: [40, 16], over: [40, 32],  w: 4, h: 12, d: 4 },
  lArm: { base: [32, 48], over: [48, 48],  w: 4, h: 12, d: 4 },
  rLeg: { base: [0, 16],  over: [0, 32],   w: 4, h: 12, d: 4 },
  lLeg: { base: [16, 48], over: [0, 48],   w: 4, h: 12, d: 4 },
};

function mlFace(boxKey, face, layer) {
  const B = ML_BOXES[boxKey], o = layer === 'over' ? B.over : B.base;
  if (!o) return null;
  const [u, v] = o, { w, h, d } = B;
  switch (face) {
    case 'top':    return [u + d, v, w, d];
    case 'bottom': return [u + d + w, v, w, d];
    case 'right':  return [u, v + d, d, h];
    case 'front':  return [u + d, v + d, w, h];
    case 'left':   return [u + d + w, v + d, d, h];
    case 'back':   return [u + d + w + d, v + d, w, h];
    default: return null;
  }
}

const ML_SLIM_NARROW = new Set(['front', 'back', 'top', 'bottom']);
const ML_SLIM_SHIFT = new Set(['bottom', 'left', 'back']);

const ML_PARTS = {
  lLegSide:  { box: 'lLeg', face: 'right', dest: [17, 33, 4, 6], block: [2, 2], ymap: [2, 6, 10], side: true, shade: ML_FAR_SHADE },
  lLegFront: { box: 'lLeg', face: 'front', dest: [21, 33, 6, 6], block: [2, 2], ymap: [2, 6, 10], shade: ML_FAR_SHADE },
  rLegSide:  { box: 'rLeg', face: 'right', dest: [9, 33, 4, 6], block: [2, 2], ymap: [2, 6, 10], side: true },
  rLegFront: { box: 'rLeg', face: 'front', dest: [13, 33, 6, 6], block: [2, 2], ymap: [2, 6, 10] },
  lArmSide:  { box: 'lArm', face: 'right', dest: [22, 25, 4, 6], block: [2, 2], side: true, shade: ML_FAR_SHADE },
  lArmFront: { box: 'lArm', face: 'front', dest: [26, 25, 6, 6], block: [2, 2], shade: ML_FAR_SHADE },
  bodySide:  { box: 'body', face: 'right', dest: [9, 26, 4, 6], block: [2, 2], ymap: [2, 6, 10], side: true },
  bodyFront: { box: 'body', face: 'front', dest: [13, 26, 14, 6], block: [2, 2], ymap: [2, 6, 10] },
  headSide:  { box: 'head', face: 'right', dest: [1, 1, 9, 24], block: [3, 3], side: true },
  headFront: { box: 'head', face: 'front', dest: [10, 1, 24, 24], block: [3, 3] },
  hatSide:   { box: 'hat', face: 'right', dest: [0, 0, 9, 26], hat: true, side: true },
  hatFront:  { box: 'hat', face: 'front', dest: [9, 0, 26, 26], hat: true },
  rArmSide:  { box: 'rArm', face: 'right', dest: [3, 25, 4, 6], block: [2, 2], side: true },
  rArmFront: { box: 'rArm', face: 'front', dest: [7, 25, 6, 6], block: [2, 2], arm: true },
  bodyBent: { box: 'body', face: 'front', dest: [13, 28, 14, 4], block: [2, 2], group: 'body', shade: 0.92 },
  headTiltTop:   { box: 'head', face: 'top',   dest: [10, 1, 24, 9],  block: [3, 3], group: 'head', side: true },
  headTiltFront: { box: 'head', face: 'front', dest: [10, 10, 24, 15], block: [3, 3], group: 'head', shade: 0.93 },
  hatTiltTop:    { box: 'hat',  face: 'top',   dest: [9, 0, 26, 10], hat: true, group: 'head', side: true },
  hatTiltFront:  { box: 'hat',  face: 'front', dest: [9, 10, 26, 16], hat: true, group: 'head', shade: 0.93 },
  rArmPalm:  { box: 'rArm', face: 'bottom', dest: [7, 33, 6, 4], block: [2, 2], group: 'rArm' },
  lArmPalm:  { box: 'lArm', face: 'bottom', dest: [26, 33, 6, 4], block: [2, 2], group: 'lArm', shade: ML_FAR_SHADE },
  rLegSole:  { box: 'rLeg', face: 'bottom', sub: [0, 0, 3, 3], dest: [13, 39, 6, 6], block: [2, 2], group: 'rLeg' },
  rLegTop:   { box: 'rLeg', face: 'top', dest: [13, 33, 6, 6], block: [2, 2], group: 'rLeg' },
  lLegSole:  { box: 'lLeg', face: 'bottom', sub: [1, 0, 3, 3], dest: [21, 39, 6, 6], block: [2, 2], group: 'lLeg', shade: ML_FAR_SHADE },
};

for (const p of Object.values(ML_PARTS)) {
  const B = ML_BOXES[p.box];
  const cut = (r) => (p.sub && r) ? [r[0] + p.sub[0], r[1] + p.sub[1], p.sub[2], p.sub[3]] : r;
  const base = cut(mlFace(p.box, p.face, 'base'));
  if (B.over) { p.base = base; p.over = cut(mlFace(p.box, p.face, 'over')); } else { p.src = base; }
  const isArm = p.box === 'rArm' || p.box === 'lArm';
  if (isArm && ML_SLIM_NARROW.has(p.face)) p.arm = true;
  if (isArm && ML_SLIM_SHIFT.has(p.face)) p.slimShiftX = true;
}

const ML_GROUPS = [
  { key: 'lArm', parts: ['lArmSide', 'lArmFront'], joint: 1 },
  { key: 'lLeg', parts: ['lLegSide', 'lLegFront'], joint: 2 },
  { key: 'rLeg', parts: ['rLegSide', 'rLegFront'], joint: 2 },
  { key: 'body', parts: ['bodySide', 'bodyFront'], joint: 1 },
  { key: 'head', parts: ['headSide', 'headFront', 'hatSide', 'hatFront'], joint: 0 },
  { key: 'rArm', parts: ['rArmSide', 'rArmFront'], joint: 1 },
];

const ML_CAMERAS = {
  'front-right': { faces: null, mirror: false, swapLimb: false },
  'front-left': { faces: { right: 'left', left: 'right' }, mirror: true, swapLimb: true },
  'back34-right': { faces: { front: 'back', back: 'front' }, mirror: true, swapLimb: false, armUnderHead: true },
  'back34-left': { faces: { front: 'back', back: 'front', right: 'left', left: 'right' }, mirror: false, swapLimb: true, armUnderHead: true },
  'front-flat': { faces: null, mirror: false, swapLimb: false, dropSide: true, evenLit: true, armsLevel: true, nudge: { lArm: 2, rArm: -1, head: -2, hat: -2 }, xjoint: { lArm: 1, rArm: -1 } },
  'back-flat': { faces: { front: 'back', back: 'front' }, mirror: true, swapLimb: false, dropSide: true, armUnderHead: true, evenLit: true, armsLevel: true, nudge: { lArm: 2, rArm: -1, head: -2, hat: -2 }, xjoint: { lArm: 1, rArm: -1 } },
  'side-right': { faces: null, mirror: false, swapLimb: false, table: 'profile' },
  'side-left': { faces: { right: 'left', left: 'right' }, mirror: true, swapLimb: true, table: 'profile' },
  'top': { faces: null, mirror: false, swapLimb: false, table: 'plan', noAo: true },
  'bottom': { faces: { top: 'bottom', bottom: 'top', front: 'back', back: 'front', right: 'left', left: 'right' }, mirror: true, swapLimb: true, table: 'plan', flipDepth: true, noAo: true, underLit: true },
};

const ML_LR_SWAP = { rArm: 'lArm', lArm: 'rArm', rLeg: 'lLeg', lLeg: 'rLeg' };

const ML_PROFILE_PARTS = {
  lLegProf: { box: 'lLeg', face: 'right', dest: [10, 33, 6, 6], block: [2, 2], ymap: [2, 6, 10], shade: ML_FAR_SHADE },
  rLegProf: { box: 'rLeg', face: 'right', dest: [10, 33, 6, 6], block: [2, 2], ymap: [2, 6, 10] },
  lArmProf: { box: 'lArm', face: 'right', dest: [10, 26, 6, 6], block: [2, 2], shade: ML_FAR_SHADE },
  bodyProf: { box: 'body', face: 'right', dest: [10, 26, 6, 6], block: [2, 2], ymap: [2, 6, 10] },
  rArmProf: { box: 'rArm', face: 'right', dest: [10, 26, 6, 6], block: [2, 2] },
  headProf: { box: 'head', face: 'right', dest: [1, 1, 24, 24], block: [3, 3] },
  hatProf:  { box: 'hat',  face: 'right', dest: [0, 0, 26, 26], hat: true },
};

const ML_PROFILE_GROUPS = [
  { key: 'lLeg', parts: ['lLegProf'], joint: 2 },
  { key: 'rLeg', parts: ['rLegProf'], joint: 2 },
  { key: 'lArm', parts: ['lArmProf'], joint: 1 },
  { key: 'body', parts: ['bodyProf'], joint: 1 },
  { key: 'rArm', parts: ['rArmProf'], joint: 1 },
  { key: 'head', parts: ['headProf', 'hatProf'], joint: 0 },
];

for (const p of Object.values(ML_PROFILE_PARTS)) {
  const B = ML_BOXES[p.box];
  const cut = (r) => (p.sub && r) ? [r[0] + p.sub[0], r[1] + p.sub[1], p.sub[2], p.sub[3]] : r;
  const base = cut(mlFace(p.box, p.face, 'base'));
  if (B.over) { p.base = base; p.over = cut(mlFace(p.box, p.face, 'over')); } else { p.src = base; }
  const isArm = p.box === 'rArm' || p.box === 'lArm';
  if (isArm && ML_SLIM_NARROW.has(p.face)) p.arm = true;
  if (isArm && ML_SLIM_SHIFT.has(p.face)) p.slimShiftX = true;
}

const ML_PLAN_PARTS = {
  bodyPlan: { box: 'body', face: 'top', dest: [13, 17, 14, 6], block: [2, 2], shade: ML_FAR_SHADE },
  rArmPlan: { box: 'rArm', face: 'top', dest: [6, 17, 6, 6], block: [2, 2], shade: ML_FAR_SHADE, xjoint: -1 },
  lArmPlan: { box: 'lArm', face: 'top', dest: [28, 17, 6, 6], block: [2, 2], shade: ML_FAR_SHADE, xjoint: 1 },
  rLegPlan: { box: 'rLeg', face: 'top', dest: [13, 17, 6, 6], block: [2, 2], shade: ML_FAR_SHADE },
  lLegPlan: { box: 'lLeg', face: 'top', dest: [21, 17, 6, 6], block: [2, 2], shade: ML_FAR_SHADE },
  headPlan: { box: 'head', face: 'top', dest: [8, 8, 24, 24], block: [3, 3] },
  hatPlan:  { box: 'hat',  face: 'top', dest: [7, 7, 26, 26], hat: true },
};

const ML_PLAN_GROUPS = [
  { key: 'lLeg', parts: ['lLegPlan'], joint: 0 },
  { key: 'rLeg', parts: ['rLegPlan'], joint: 0 },
  { key: 'body', parts: ['bodyPlan'], joint: 0 },
  { key: 'lArm', parts: ['lArmPlan'], joint: 0 },
  { key: 'rArm', parts: ['rArmPlan'], joint: 0 },
  { key: 'head', parts: ['headPlan', 'hatPlan'], joint: 0 },
];

for (const p of Object.values(ML_PLAN_PARTS)) {
  const B = ML_BOXES[p.box];
  const cut = (r) => (p.sub && r) ? [r[0] + p.sub[0], r[1] + p.sub[1], p.sub[2], p.sub[3]] : r;
  const base = cut(mlFace(p.box, p.face, 'base'));
  if (B.over) { p.base = base; p.over = cut(mlFace(p.box, p.face, 'over')); } else { p.src = base; }
  const isArm = p.box === 'rArm' || p.box === 'lArm';
  if (isArm && ML_SLIM_NARROW.has(p.face)) p.arm = true;
  if (isArm && ML_SLIM_SHIFT.has(p.face)) p.slimShiftX = true;
}

const ML_TABLES = {
  profile: { parts: ML_PROFILE_PARTS, groups: ML_PROFILE_GROUPS, suffix: '@side' },
  plan: { parts: ML_PLAN_PARTS, groups: ML_PLAN_GROUPS, suffix: '@plan' },
};

const mlSwapSide = (k) => {
  for (const a of Object.keys(ML_LR_SWAP)) if (k && k.startsWith(a)) return ML_LR_SWAP[a] + k.slice(a.length);
  return k;
};

function mlRects(p) {
  const B = ML_BOXES[p.box];
  const cut = (r) => (p.sub && r) ? [r[0] + p.sub[0], r[1] + p.sub[1], p.sub[2], p.sub[3]] : r;
  const base = cut(mlFace(p.box, p.face, 'base'));
  if (B.over) { p.base = base; p.over = cut(mlFace(p.box, p.face, 'over')); delete p.src; }
  else { p.src = base; delete p.base; delete p.over; }
  const isArm = p.box === 'rArm' || p.box === 'lArm';
  p.arm = isArm && ML_SLIM_NARROW.has(p.face);
  p.slimShiftX = isArm && ML_SLIM_SHIFT.has(p.face);
  return p;
}

function mlCameraTable(parts, groups, camKey) {
  const cam = ML_CAMERAS[camKey] || ML_CAMERAS['front-right'];
  if (!cam.mirror && !cam.faces && !cam.swapLimb && !cam.dropSide) return { parts, groups };
  const out = {};
  for (const [k, p] of Object.entries(parts)) {
    if (cam.dropSide && !p.keepSide && (p.face === 'right' || p.face === 'left')) continue;
    const q = { ...p };
    if (cam.swapLimb) {
      q.box = ML_LR_SWAP[q.box] || q.box;
      if (q.group) q.group = mlSwapSide(q.group);
    }
    if (cam.evenLit && q.shade === ML_FAR_SHADE && !q.keepShade) q.shade = undefined;
    if (cam.underLit) q.shade = q.shade ? undefined : ML_FAR_SHADE;
    if (cam.nudge && cam.nudge[q.box] && !q.placed) q.dest = [q.dest[0] + cam.nudge[q.box], q.dest[1], q.dest[2], q.dest[3]];
    if (cam.dropSide && q.flat) q.dest = [q.dest[0] + q.flat, q.dest[1], q.dest[2], q.dest[3]];
    if (cam.xjoint && cam.xjoint[q.box] && !q.placed) q.xjoint = (q.xjoint || 0) + cam.xjoint[q.box];
    const doMirror = q.pin ? camKey.endsWith('-left') : cam.mirror;
    if (doMirror) {
      const d = q.dest;
      q.dest = [ML_LAYOUT_W - d[0] - d[2], d[1], d[2], d[3]];
      if (q.xjoint) q.xjoint = -q.xjoint;
      if (q.sub) {
        const f = mlFace(q.box, q.face, 'base');
        if (f) q.sub = [f[2] - q.sub[0] - q.sub[2], q.sub[1], q.sub[2], q.sub[3]];
      }
      if (q.rot) { q.rot = q.rot === 90 ? 270 : q.rot === 270 ? 90 : q.rot; q.mirrorX = !q.mirrorX; }
    }
    if (cam.faces && cam.faces[q.face]) q.face = cam.faces[q.face];
    out[cam.swapLimb ? mlSwapSide(k) : k] = mlRects(q);
  }
  const gs = groups.map((g) => ({
    key: cam.swapLimb ? mlSwapSide(g.key) : g.key,
    parts: g.parts.map((k) => (cam.swapLimb ? mlSwapSide(k) : k)),
    joint: g.joint,
    overHead: g.overHead,
    armsBehind: g.armsBehind,
  }));
  if (cam.armsLevel) {
    const hi = gs.findIndex((g) => g.key === 'head');
    const arms = gs.filter((g) => (g.key === 'lArm' || g.key === 'rArm') && !g.overHead && !g.armsBehind);
    if (hi >= 0 && arms.length) {
      const rest = gs.filter((g) => !arms.includes(g));
      const at = rest.findIndex((g) => g.key === 'head');
      gs.length = 0;
      gs.push(...rest.slice(0, at), ...arms, ...rest.slice(at));
    }
  }
  if (cam.flipDepth) gs.reverse();
  if (cam.armUnderHead) {
    const near = (camKey.endsWith('-left') ? 'l' : 'r') + 'Arm';
    const ai = gs.findIndex((g) => g.key === near), hi = gs.findIndex((g) => g.key === 'head');
    if (ai > hi && hi >= 0 && !gs[ai].overHead) gs.splice(hi, 0, gs.splice(ai, 1)[0]);
  }
  return { parts: out, groups: gs };
}

const ML_POSES = {
  'nod@dip': {
    placeParts: {
      headTiltTop:   [8, 1, 0],
      headTiltFront: [8, 10, 0],
      hatTiltTop:    [7, 0, 0],
      hatTiltFront:  [7, 10, 0],
    },
  },
  'shake@right': {
    pad: [0, 2, 0, 0],
    placeParts: {
      headSide:  [3, 1, 0, { keepSide: true }],
      headFront: [12, 1, 0],
      hatSide:   [2, 0, 0, { keepSide: true }],
      hatFront:  [11, 0, 0],
    },
  },
  'shake@left': {
    pad: [0, 2, 0, 0],
    placeParts: {
      headFront: [3, 1, 0],
      headSide:  [27, 1, 0, { face: 'left', keepSide: true }],
      hatFront:  [2, 0, 0],
      hatSide:   [28, 0, 0, { face: 'left', keepSide: true }],
    },
  },
  'joy@up': {
    placeParts: {
      rArmFront: [6, 21, 180, { xjoint: -1 }],
      lArmFront: [28, 21, 180, { xjoint: 1 }],
    },
  },
  'joy@settle': {
    placeParts: {
      rArmFront: [6, 22, 180, { xjoint: -1 }],
      lArmFront: [28, 22, 180, { xjoint: 1 }],
    },
  },
  'death@down': {
    pad: [10, 10, 0, 0],
    order: ['lArm', 'lLeg', 'rLeg', 'rArm', 'body', 'head'],
    placeParts: {
      bodyFront: [12, 32, 0, { size: [14, 6] }],
      rArmFront: [-6, 27, 90],
      rLegFront: [-6, 33, 90],
      lArmFront: [35, 27, 270],
      lLegFront: [35, 33, 270],
      headSide:  [1, 15, 0],
      headFront: [10, 15, 0],
      hatSide:   [0, 14, 0],
      hatFront:  [9, 14, 0],
    },
    flat: {
      pad: [0, 10, 0, 0],
      order: ['lArm', 'lLeg', 'rLeg', 'rArm', 'body', 'head'],
      placeParts: {
        bodyFront: [10, 32, 0, { size: [14, 6] }],
        rArmFront: [1, 27, 90],
        rLegFront: [1, 33, 90],
        lArmFront: [33, 27, 270],
        lLegFront: [33, 33, 270],
        headFront: [8, 15, 0],
        hatFront:  [7, 14, 0],
      },
    },
    side: {
      pad: [10, 2, 0, 0],
      order: ['body', 'head', 'lLeg', 'lArm', 'rLeg', 'rArm'],
      overHead: ['lArm', 'lLeg', 'rArm', 'rLeg'],
      placeParts: {
        bodyProf: [12, 32, 0, { size: [6, 6] }],
        rArmProf: [10, 26, 0, { face: 'bottom' }],
        lArmProf: [10, 26, 0, { face: 'bottom' }],
        rLegProf: [10, 32, 0, { face: 'bottom' }],
        lLegProf: [10, 32, 0, { face: 'bottom' }],
        headProf: [1, 15, 0],
        hatProf:  [0, 14, 0],
      },
    },
    plan: {
      pad: [8, 8, 0, 0],
      order: ['rLeg', 'lLeg', 'rArm', 'lArm', 'body', 'head'],
      placeParts: {
        bodyPlan: [13, 17, 0],
        rArmPlan: [-1, 17, 0, { face: 'right', size: [12, 6] }],
        lArmPlan: [29, 17, 0, { face: 'right', size: [12, 6] }],
        rLegPlan: [-1, 17, 0, { face: 'right', size: [12, 6] }],
        lLegPlan: [29, 17, 0, { face: 'right', size: [12, 6] }],
        headPlan: [8, 8, 270],
        hatPlan:  [7, 7, 270],
      },
    },
  },
  'stab@ready': {
    flat: {
      placeParts: {
        lArmFront: [26, 25, 270, { side: true, xjoint: 1 }],
        lArmPalm: [32, 25, 270, { size: [6, 6], xjoint: 1 }],
      },
      props: [{ sprite: 'swordUp', group: 'lArm', dest: [31, 10] }],
    },
    pad: [0, 8, 0, 0],
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      lArmFront: [28, 25, 270, { side: true, xjoint: 1 }],
      lArmPalm:  [34, 25, 270, { size: [6, 6], xjoint: 1 }],
    },
    props: [{ sprite: 'swordUp', group: 'lArm', dest: [33, 10] }],
    side: {
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmProf: [16, 26, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordUp', group: 'lArm', dest: [21, 11] }],
    },
    plan: {
      pad: [0, 30, 0, 0],
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmPlan: [28, 17, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [36, 14] }],
    },
  },
  'stab@raise': {
    flat: {
      placeParts: {
        lArmSide: [29, 10, 0],
        lArmFront: [33, 10, 180],
      },
      props: [{ sprite: 'swordDiag', group: 'lArm', dest: [33, -3] }],
    },
    back: {
      props: [{ sprite: 'swordDiag', group: 'lArm', dest: [23, -3], flipX: true }],
    },
    pad: [0, 16, 0, 0],
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      lArmSide:  [31, 10, 0],
      lArmFront: [35, 10, 180],
    },
    props: [{ sprite: 'swordDiag', group: 'lArm', dest: [35, -3] }],
    side: {
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmProf: [16, 20, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordDiag', group: 'lArm', dest: [22, 6] }],
    },
    plan: {
      pad: [0, 30, 0, 0],
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmPlan: [28, 17, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [36, 14] }],
    },
  },
  'stab@strike': {
    flat: {
      placeParts: {
        lArmSide: [33, 15, 0, { face: 'top' }],
        lArmFront: [37, 15, 270],
      },
      props: [{ sprite: 'swordDiag', group: 'lArm', dest: [40, 18], flipY: true }],
    },
    back: {
      pad: [0, 0, 0, 0],
      placeParts: {
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
      },
    },
    pad: [0, 23, 0, 0],
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      lArmSide:  [35, 15, 0, { face: 'top' }],
      lArmFront: [39, 15, 270],
    },
    props: [{ sprite: 'swordDiag', group: 'lArm', dest: [42, 18], flipY: true }],
    side: {
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmProf: [19, 26, 270, { face: 'front', size: [14, 6] }],
      },
      props: [{ sprite: 'swordDiag', group: 'lArm', dest: [30, 26], flipY: true }],
    },
    plan: {
      pad: [0, 30, 0, 0],
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmPlan: [30, 17, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [38, 14] }],
    },
  },
  'stab@swing': {
    flat: {
      placeParts: {
        lArmSide: [30, 12, 0, { face: 'top' }],
        lArmFront: [34, 12, 270],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [34, 10] }],
    },
    back: {
      pad: [0, 0, 0, 0],
      placeParts: {
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
      },
    },
    pad: [0, 23, 0, 0],
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      lArmSide:  [32, 12, 0, { face: 'top' }],
      lArmFront: [36, 12, 270],
    },
    props: [{ sprite: 'swordRight', group: 'lArm', dest: [36, 10] }],
    side: {
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmProf: [16, 26, 270, { face: 'front', size: [14, 6] }],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [24, 23] }],
    },
    plan: {
      pad: [0, 30, 0, 0],
      order: ['lLeg', 'rLeg', 'body', 'rArm', 'lArm', 'head'],
      placeParts: {
        lArmPlan: [30, 17, 270, { face: 'front', size: [12, 6] }],
      },
      props: [{ sprite: 'swordRight', group: 'lArm', dest: [38, 14] }],
    },
  },
  'surprise@up': {
    pad: [0, 1, 0, 0],
    placeParts: {
      rArmFront: [4, 23, 0],
      lArmFront: [30, 23, 0],
    },
  },
  'surprise@settle': {
    placeParts: {
      rArmFront: [5, 24, 0],
      lArmFront: [29, 24, 0],
    },
  },
  'bow@mid': {
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      bodyBent:      [13, 27, 0, { size: [14, 5] }],
      headTiltTop:   [8, 4, 0, { size: [24, 6] }],
      headTiltFront: [8, 10, 0, { size: [24, 16], block: [3, 2] }],
      hatTiltTop:    [7, 3, 0, { size: [26, 7] }],
      hatTiltFront:  [7, 10, 0, { size: [26, 17] }],
    },
  },
  'bow@deep': {
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    placeParts: {
      bodyBent:      [13, 28, 0, { size: [14, 4] }],
      headTiltTop:   [8, 7, 0, { size: [24, 8] }],
      headTiltFront: [8, 15, 0, { size: [24, 12], block: [3, 2] }],
      hatTiltTop:    [7, 6, 0, { size: [26, 9] }],
      hatTiltFront:  [7, 15, 0, { size: [26, 13] }],
    },
  },
  'clap@hands': {
    pad: [0, 0, 0, 0],
    placeParts: {
      rArmFront: [13, 25, 270],
      lArmFront: [21, 25, 90, { mirrorX: true }],
    },
  },
  none: {
    back: {
      placeParts: {
        rArmSide:  [0, 25, 0, { xjoint: -1 }],
        rArmFront: [4, 25, 0, { flat: 2, xjoint: -1 }],
      },
    },
  },
  waving: {
    pad: [0, 0, 0, 0],
    overHead: ['rArm'],
    placeParts: {
      rArmSide:  [2, 21, 180, { xjoint: -1 }],
      rArmFront: [6, 21, 180, { xjoint: -1 }],
    },
    back: {
      pad: [4, 0, 0, 0],
      overHead: [],
      placeParts: {
        rArmSide:  [-2, 21, 180, { xjoint: -1 }],
        rArmFront: [2, 21, 180, { xjoint: -1 }],
      },
    },
    flatBack: {
      pad: [0, 0, 0, 0],
      placeParts: {
        rArmFront: [6, 23, 180, { xjoint: -1 }],
      },
    },
    side: {
      overHead: ['rArm'],
      placeParts: { rArmProf: [14, 20, 0, { ymap: [10, 6, 2] }] },
    },
    plan: {
      placeParts: { rArmPlan: [6, 17, 0, { face: 'bottom', mirrorX: true }] },
    },
  },
  handshake: {
    order: ['lArm', 'lLeg', 'rLeg', 'body', 'rArm', 'head'],
    pad: [0, 8, 0, 0],
    placeParts: {
      lArmFront: [28, 25, 270, { side: true, xjoint: 1 }],
      lArmPalm:  [34, 25, 270, { xjoint: 1 }],
    },
    flat: {
      pad: [0, 0, 0, 0],
      placeParts: {
        lArmPalm: [28, 25, 0, { size: [6, 6], xjoint: 1 }],
      },
    },
    side: {
      placeParts: { lArmProf: [16, 26, 270] },
    },
    plan: {
      placeParts: { lArmPlan: [28, 23, 0, { face: 'back' }] },
    },
    back: {
      pad: [0, 0, 0, 0],
      placeParts: {
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
      },
    },
  },
  zombie: {
    pad: [0, 8, 0, 0],
    placeParts: {
      rArmFront: [7, 25, 270, { side: true }],
      rArmPalm:  [13, 25, 270],
      lArmFront: [25, 25, 270, { side: true }],
      lArmPalm:  [31, 25, 270],
    },
    flat: {
      pad: [0, 0, 0, 0],
      placeParts: {
        rArmPalm: [6, 25, 0, { size: [6, 6], xjoint: -1 }],
        lArmPalm: [28, 25, 0, { size: [6, 6], xjoint: 1 }],
      },
    },
    side: {
      placeParts: {
        rArmProf: [16, 26, 270],
        lArmProf: [16, 26, 270],
      },
    },
    plan: {
      placeParts: {
        rArmPlan: [6, 23, 0, { face: 'back' }],
        lArmPlan: [28, 23, 0, { face: 'back' }],
      },
    },
    back: {
      pad: [4, 0, 0, 0],
      placeParts: {
        rArmSide:  [-1, 25, 90, { size: [6, 6] }],
        rArmFront: [5, 25, 0, { size: [6, 6], face: 'top', flat: 1, xjoint: -1 }],
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
      },
    },
  },
  tpose: {
    pad: [0, 0, 0, 0],
    placeParts: {
      rArmPalm:  [2, 25, 90, { side: true }],
      rArmFront: [6, 25, 90],
      lArmFront: [28, 25, 270, { xjoint: 1 }],
    },
    flat: {
      placeParts: {
        rArmFront: [6, 25, 90, { xjoint: -1 }],
        lArmFront: [28, 25, 270, { xjoint: 1 }],
      },
    },
    side: {
      placeParts: {
        rArmProf: [10, 26, 0, { face: 'bottom' }],
        lArmProf: [10, 26, 0, { face: 'bottom' }],
      },
    },
    plan: {
      placeParts: {
        rArmPlan: [6, 17, 90, { face: 'right' }],
        lArmPlan: [28, 17, 270, { face: 'left' }],
      },
    },
  },
  dab: {
    pad: [0, 0, 0, 0],
    placeParts: {
      rArmFront: [7, 25, 270, { side: true }],
      rArmPalm:  [13, 25, 270],
      lArmFront: [28, 25, 270, { xjoint: 1 }],
    },
    flat: {
      pad: [0, 0, 0, 0],
      placeParts: {
        rArmPalm:  [6, 25, 0, { size: [6, 6], xjoint: -1 }],
        lArmFront: [28, 25, 270, { xjoint: 1 }],
      },
    },
    side: {
      placeParts: {
        rArmProf: [16, 26, 270],
        lArmProf: [10, 26, 0, { face: 'bottom' }],
      },
    },
    plan: {
      placeParts: {
        rArmPlan: [6, 23, 0, { face: 'back' }],
        lArmPlan: [28, 17, 270, { face: 'left' }],
      },
    },
    back: {
      pad: [4, 0, 0, 0],
      placeParts: {
        rArmSide:  [-1, 25, 90, { size: [6, 6] }],
        rArmFront: [5, 25, 0, { size: [6, 6], face: 'top', flat: 1, xjoint: -1 }],
        lArmFront: [28, 25, 270, { xjoint: 1 }],
      },
    },
  },
  sitting: {
    pad: [0, 0, 0, 0],
    order: ['lArm', 'body', 'lLeg', 'rLeg', 'rArm', 'head'],
    placeParts: {
      lLegSole:  [22, 32, 270, { xjoint: 1 }],
      rLegSide:  [9, 32, 270, { size: [6, 6] }],
      rLegSole:  [15, 32, 270],
    },
    flat: {
      placeParts: {
        rLegSole: [13, 32, 0, { size: [6, 6] }],
        lLegSole: [21, 32, 0, { size: [6, 6] }],
      },
    },
    flatBack: {
      placeParts: {
        rLegSole: [13, 32, 0, { size: [6, 6], face: 'top' }],
        lLegSole: [21, 32, 0, { size: [6, 6], face: 'top' }],
      },
    },
    side: {
      placeParts: {
        lLegProf: [13, 33, 270],
        rLegProf: [13, 33, 270],
      },
    },
    plan: {
      placeParts: {
        rLegPlan: [13, 23, 0, { face: 'back' }],
        lLegPlan: [21, 23, 0, { face: 'back' }],
      },
    },
    back: {
      pad: [0, 0, 0, 0],
      placeParts: {
        lLegFront: [8, 32, 0, { size: [6, 6], face: 'top', pin: true }],
        lLegSide:  [14, 32, 270, { size: [6, 6], pin: true }],
        rLegFront: [16, 32, 0, { size: [6, 6], face: 'top', pin: true }],
        rLegSide:  [22, 32, 270, { size: [4, 6], pin: true }],
        rLegSole:  [26, 32, 0, { size: [2, 6], pin: true }],
      },
    },
  },
  pleading: {
    pad: [0, 8, 0, 0],
    order: ['lLeg', 'rLeg', 'body', 'lArm', 'rArm', 'head'],
    placeParts: {
      rLegSide: [7, 32, 90, { size: [6, 6], xjoint: -1 }],
      rLegTop:  [13, 32, 0, { xjoint: -1 }],
      lLegSole: [20, 32, 0, { face: 'top' }],
      lArmFront: [17, 25, 270, { side: true }],
      lArmPalm:  [26, 25, 270, { size: [6, 6] }],
      rArmFront: [13, 25, 270, { side: true }],
      rArmPalm:  [19, 25, 270, { size: [6, 6] }],
    },
    flat: {
      pad: [0, 0, 0, 0],
      placeParts: {
        rLegTop:  [13, 32, 0],
        lLegSole: [21, 32, 0, { size: [6, 6], face: 'top' }],
        rArmPalm: [13, 25, 0, { size: [6, 6] }],
        lArmPalm: [21, 25, 0, { size: [6, 6] }],
      },
    },
    flatBack: {
      pad: [0, 0, 0, 0],
      order: ['lArm', 'rArm', 'body', 'head', 'lLeg', 'rLeg'],
      armsBehind: ['lArm', 'rArm'],
      placeParts: {
        rLegSole: [13, 32, 0, { size: [6, 6] }],
        lLegSole: [21, 32, 0, { size: [6, 6] }],
        rArmPalm: [13, 25, 0, { size: [6, 6] }],
        lArmPalm: [21, 25, 0, { size: [6, 6] }],
      },
    },
    back: {
      pad: [4, 0, 0, 0],
      order: ['lArm', 'rArm', 'body', 'head', 'lLeg', 'rLeg'],
      placeParts: {
        rLegSole: [17, 32, 0, { size: [6, 6] }],
        lLegSole: [25, 32, 0, { size: [6, 6] }],
        rLegSide: [11, 32, 270, { size: [6, 6] }],
        lArmFront: [2, 25, 90, { side: true }],
        rArmFront: [2, 25, 90, { side: true }],
      },
    },
    side: {
      order: ['lLeg', 'rLeg', 'lArm', 'rArm', 'body', 'head'],
      placeParts: {
        rLegProf: [8, 33, 90],
        lLegProf: [8, 33, 90],
        rArmProf: [17, 26, 270],
        lArmProf: [17, 26, 270],
      },
    },
    plan: {
      placeParts: {
        rLegPlan: [13, 15, 0, { face: 'back', ymap: [10, 6, 2] }],
        lLegPlan: [21, 15, 0, { face: 'back', ymap: [10, 6, 2] }],
        rArmPlan: [13, 24, 0, { face: 'back' }],
        lArmPlan: [21, 24, 0, { face: 'back' }],
      },
    },
  },
  crouch: {
    pad: [2, 8, 0, 0],
    order: ['lArm', 'rLeg', 'body', 'head', 'lLeg', 'rArm'],
    place: { lLeg: [20, 30, 0] },
    placeParts: {
      lArmFront: [28, 25, 270, { side: true, xjoint: 1 }],
      lArmPalm:  [34, 25, 270, { xjoint: 1 }],
      rLegSide:  [7, 30, 90, { size: [6, 6], xjoint: -1 }],
      rLegTop:   [13, 30, 0, { xjoint: -1 }],
    },
    flat: {
      placeParts: {
        lArmPalm:  [28, 25, 0, { size: [6, 6], xjoint: 1 }],
        rLegTop:   [13, 30, 0],
        lLegFront: [21, 30, 0],
      },
    },
    flatBack: {
      order: ['lArm', 'lLeg', 'body', 'head', 'rLeg', 'rArm'],
      placeParts: {
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
        rLegSole:  [13, 30, 0, { size: [6, 6] }],
        lLegFront: [21, 30, 0],
      },
    },
    side: {
      placeParts: {
        lArmProf: [16, 26, 270],
        rLegProf: [4, 30, 90],
        lLegProf: [16, 30, 0],
      },
    },
    plan: {
      placeParts: {
        lArmPlan: [28, 23, 0, { face: 'back' }],
        rLegPlan: [13, 11, 0, { face: 'back', ymap: [10, 6, 2] }],
        lLegPlan: [21, 23, 0],
      },
    },
    back: {
      order: ['lLeg', 'lArm', 'body', 'head', 'rArm', 'rLeg'],
      pad: [2, 2, 0, 0],
      placeParts: {
        lArmFront: [26, 25, 0, { size: [6, 6], face: 'top', flat: 2, xjoint: 1 }],
        rLegSole:  [4, 30, 0, { pin: true }],
        rLegSide:  [10, 30, 90, { size: [4, 6], pin: true }],
        lLegFront: [19, 33, 0, { size: [6, 3], pin: true }],
        lLegSide:  [25, 32, 0, { size: [4, 4], pin: true }],
      },
    },
  },
  quadruped: {
    pad: [18, 0, 0, 0],
    order: ['lLeg', 'rLeg', 'body', 'lArm', 'rArm', 'head'],
    placeParts: {
      bodyFront: [-10, 19, 90, { face: 'right', size: [14, 6], side: true, keepSide: true }],
      bodySide:  [4, 19, 0, { face: 'top', size: [14, 6], side: false }],
      headSide:  [1, 1, 0],
      headFront: [10, 1, 0],
      hatSide:   [0, 0, 0],
      hatFront:  [9, 0, 0],
      lArmSide:  [10, 26, 0, { xjoint: 1 }],
      lArmFront: [14, 26, 0, { xjoint: 1 }],
      rArmSide:  [4, 26, 0, { xjoint: -1 }],
      rArmFront: [8, 26, 0, { xjoint: -1 }],
      lLegSide:  [-6, 26, 0, { xjoint: 1 }],
      lLegFront: [-2, 26, 0, { xjoint: 1 }],
      rLegSide:  [-12, 26, 0, { xjoint: -1 }],
      rLegFront: [-8, 26, 0, { xjoint: -1 }],
    },
    back: {
      pad: [0, 18, 0, 0],
      order: ['head', 'rArm', 'lArm', 'body', 'rLeg', 'lLeg'],
      placeParts: {
        headSide:  [8, 1, 0],
        headFront: [17, 1, 0],
        hatSide:   [7, 0, 0],
        hatFront:  [16, 0, 0],
        bodyFront: [38, 19, 0, { face: 'bottom', size: [14, 6], side: false }],
        bodySide:  [24, 19, 270, { size: [14, 6] }],
        rArmSide:  [28, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE }],
        rArmFront: [32, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE }],
        lArmSide:  [22, 26, 0, { xjoint: 1, shade: undefined }],
        lArmFront: [26, 26, 0, { xjoint: 1, shade: undefined }],
        lLegSide:  [38, 26, 0, { xjoint: 1, shade: undefined }],
        lLegFront: [42, 26, 0, { xjoint: 1, shade: undefined }],
        rLegSide:  [44, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE }],
        rLegFront: [48, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE }],
      },
    },
    flat: {
      pad: [0, 0, 0, 0],
      order: ['lLeg', 'rLeg', 'lArm', 'rArm', 'head'],
      placeParts: {
        headFront: [8, 1, 0],
        hatFront:  [7, 0, 0],
        rLegFront: [13, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE, keepShade: true }],
        lLegFront: [21, 26, 0, { xjoint: 1, shade: ML_FAR_SHADE, keepShade: true }],
        rArmFront: [13, 26, 0, { xjoint: -1 }],
        lArmFront: [21, 26, 0, { xjoint: 1 }],
      },
    },
    flatBack: {
      pad: [0, 0, 0, 0],
      order: ['head', 'lArm', 'rArm', 'body', 'lLeg', 'rLeg'],
      placeParts: {
        headFront: [8, 1, 0],
        hatFront:  [7, 0, 0],
        rArmFront: [13, 26, 0, { xjoint: -1, shade: ML_FAR_SHADE, keepShade: true }],
        lArmFront: [21, 26, 0, { xjoint: 1, shade: ML_FAR_SHADE, keepShade: true }],
        bodyFront: [13, 20, 0, { face: 'bottom', size: [14, 6], keepSide: true }],
        rLegFront: [13, 26, 0, { xjoint: -1 }],
        lLegFront: [21, 26, 0, { xjoint: 1 }],
      },
    },
    side: {
      pad: [16, 0, 0, 0],
      order: ['lArm', 'lLeg', 'rLeg', 'rArm', 'body', 'head'],
      placeParts: {
        bodyProf: [-14, 19, 90, { size: [14, 6] }],
        headProf: [1, 1, 0],
        hatProf:  [0, 0, 0],
        rArmProf: [2, 26, 0],
        lArmProf: [5, 26, 0],
        rLegProf: [-14, 26, 0],
        lLegProf: [-11, 26, 0],
      },
    },
    plan: {
      pad: [15, 0, 0, 0],
      order: ['lArm', 'lLeg', 'rLeg', 'rArm', 'body', 'head'],
      placeParts: {
        bodyPlan: [-10, 14, 90, { face: 'back', size: [14, 14] }],
        headPlan: [5, 8, 270],
        hatPlan:  [4, 7, 270],
        rArmPlan: [5, 14, 0, { xjoint: -1 }],
        lArmPlan: [5, 22, 0, { xjoint: 1 }],
        rLegPlan: [-13, 14, 0, { xjoint: -1 }],
        lLegPlan: [-13, 22, 0, { xjoint: 1 }],
      },
    },
  },
};

function mlPlaceGroup(keys, place, omit) {
  const [ax, ay, rot] = place;
  let gx = Infinity, gy = Infinity, gx1 = -Infinity, gy1 = -Infinity;
  for (const k of keys) {
    const d = ML_PARTS[k].dest;
    if (d[0] < gx) gx = d[0];
    if (d[1] < gy) gy = d[1];
    if (d[0] + d[2] > gx1) gx1 = d[0] + d[2];
    if (d[1] + d[3] > gy1) gy1 = d[1] + d[3];
  }
  const gw = gx1 - gx, gh = gy1 - gy;
  const out = {};
  for (const k of keys) {
    if (omit && omit.includes(k)) continue;
    const p = ML_PARTS[k], d = p.dest;
    const rx = d[0] - gx, ry = d[1] - gy, pw = d[2], ph = d[3];
    let nx, ny, nw, nh;
    if (rot === 90) { nx = gh - ry - ph; ny = rx; nw = ph; nh = pw; }
    else if (rot === 270) { nx = ry; ny = gw - rx - pw; nw = ph; nh = pw; }
    else if (rot === 180) { nx = gw - rx - pw; ny = gh - ry - ph; nw = pw; nh = ph; }
    else { nx = rx; ny = ry; nw = pw; nh = ph; }
    const turned = rot === 90 || rot === 270;
    const q = { ...p, dest: [ax + nx, ay + ny, nw, nh], rot };
    if (turned && p.block) q.block = [p.block[1], p.block[0]];
    if (turned) delete q.ymap;
    out[k + '@' + rot] = q;
  }
  return out;
}

function mlPlacePart(key, place, TAB) {
  const p = (TAB || ML_PARTS)[key], [ax, ay, rot, flags] = place;
  const turned = rot === 90 || rot === 270;
  const q = { ...p, dest: [ax, ay, turned ? p.dest[3] : p.dest[2], turned ? p.dest[2] : p.dest[3]], rot, placed: true };
  if (turned && p.block) q.block = [p.block[1], p.block[0]];
  if (turned) delete q.ymap;
  if (flags) {
    const { size, ...rest } = flags;
    Object.assign(q, rest);
    if (size) { q.dest[2] = size[0]; q.dest[3] = size[1]; }
  }
  return mlRects(q);
}

const ML_VARIANT_FIELDS = ['pad', 'order', 'overHead', 'armsBehind', 'place', 'placeParts'];
function mlInherit(base, block) {
  const out = {};
  for (const f of ML_VARIANT_FIELDS) out[f] = base[f];
  return { ...out, ...block };
}
for (const P of Object.values(ML_POSES)) {
  if (P.back) P.back = mlInherit(P, P.back);
  if (P.flat) P.flat = mlInherit(P, P.flat);
  if (P.flatBack) P.flatBack = mlInherit(P.back || P.flat || P, P.flatBack);
}

const ML_POSE_VARIANTS = [];
for (const [name, P] of Object.entries(ML_POSES)) {
  if (P.back) ML_POSE_VARIANTS.push([name + '@back', P.back]);
  if (P.flat) ML_POSE_VARIANTS.push([name + '@flat', P.flat]);
  if (P.flatBack) ML_POSE_VARIANTS.push([name + '@flatback', P.flatBack]);
  ML_POSE_VARIANTS.push([name + '@side', { ...(P.side || {}), table: 'profile' }]);
  ML_POSE_VARIANTS.push([name + '@plan', { ...(P.plan || {}), table: 'plan' }]);
}
for (const [k, v] of ML_POSE_VARIANTS) ML_POSES[k] = v;

for (const P of Object.values(ML_POSES)) {
  P.parts = {}; P.groupParts = {};
  const T = ML_TABLES[P.table];
  const TAB = T ? T.parts : ML_PARTS;
  const GRP = T ? T.groups : ML_GROUPS;
  for (const [key, place] of Object.entries(P.place || {})) {
    const base = GRP.find((g) => g.key === key);
    if (!base) continue;
    const placed = mlPlaceGroup(base.parts, place, P.omit);
    Object.assign(P.parts, placed);
    P.groupParts[key] = Object.keys(placed);
  }
  const rebuilt = new Set();
  for (const [key, place] of Object.entries(P.placeParts || {})) {
    const part = TAB[key];
    if (!part) continue;
    const placed = mlPlacePart(key, place, TAB);
    const own = GRP.find((g) => g.key === part.group || g.parts.includes(key));
    if (!own) continue;
    if (!rebuilt.has(own.key)) { P.groupParts[own.key] = []; rebuilt.add(own.key); }
    const id = key + '@p';
    P.parts[id] = placed;
    const join = placed.group && placed.group !== own.key
      ? GRP.find((g) => g.key === placed.group) : null;
    if (!join) { P.groupParts[own.key].push(id); continue; }
    if (!P.groupParts[join.key]) P.groupParts[join.key] = [...join.parts];
    P.groupParts[join.key].push(id);
  }
}

const ML_POSE_KEYS = [...new Set(['none', ...Object.keys(ML_POSES)])].filter((k) => !k.includes('@'));
const CHIBI_POSE_KEYS = [...new Set(['none', ...Object.keys(CHIBI_POSES)])].filter((k) => !k.includes('@'));

function mlPoseKeyFor(pose, camKey) {
  if (!pose || pose === 'none') return 'none';
  const key = String(pose);
  if (ML_POSES[key]) return key;
  if (camKey) {
    const side = camKey.includes('left') ? 'left' : camKey.includes('right') ? 'right' : null;
    if (side) {
      const withSide = `${key}@${side}`;
      if (ML_POSES[withSide]) return withSide;
    }
  }
  return key;
}

function mlPartsFor(poseKey) {
  const pose = poseKey && poseKey !== 'none' ? ML_POSES[poseKey] : null;
  if (!pose) return ML_PARTS;
  return { ...ML_PARTS, ...(pose.parts || {}) };
}

function mlGroupsFor(poseKey) {
  const pose = poseKey && poseKey !== 'none' ? ML_POSES[poseKey] : null;
  if (!pose) return ML_GROUPS;
  const groups = ML_GROUPS.map((g) => ({ ...g, parts: [...g.parts] }));
  const idx = new Map(groups.map((g) => [g.key, g]));
  for (const [groupKey, groupParts] of Object.entries(pose.groupParts || {})) {
    const g = idx.get(groupKey);
    if (g) g.parts = [...groupParts];
  }
  if (Array.isArray(pose.order)) {
    const seen = new Set();
    const ordered = [];
    for (const key of pose.order) {
      const g = idx.get(key);
      if (!g || seen.has(g.key)) continue;
      seen.add(g.key);
      ordered.push(g);
    }
    for (const g of groups) {
      if (!seen.has(g.key)) ordered.push(g);
    }
    return ordered;
  }
  for (const g of groups) {
    if (Array.isArray(pose.overHead) && pose.overHead.includes(g.key)) g.overHead = true;
    if (Array.isArray(pose.armsBehind) && pose.armsBehind.includes(g.key)) g.armsBehind = true;
  }
  return groups;
}

function mlPropsFor(pose, camKey) {
  if (!pose || pose === 'none') return [];
  const props = Array.isArray(pose.props) ? pose.props : [];
  if (props.length) return props.map((p) => ({ ...p }));
  const out = [];
  for (const [name, value] of Object.entries(pose.placeParts || {})) {
    const dest = Array.isArray(value) ? value : value && value.dest;
    if (!dest || !Array.isArray(dest)) continue;
    out.push({ key: name, dest: [dest[0], dest[1], dest[2] || 0, dest[3] || 0], sprite: null, group: name.startsWith('rArm') ? 'rArm' : name.startsWith('lArm') ? 'lArm' : null });
  }
  return out;
}
const ML_VIEW_KEYS = ['34-right', '34-left', 'back34-right', 'back34-left', 'front', 'back', 'side-right', 'side-left', 'top', 'bottom'];

function mlEdgeColor(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) { const v = Math.round(mx * ML_EDGE_V); return [v, v, v]; }
  let h = mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60;
  const s = Math.min(1, (d / mx) * ML_EDGE_S + ML_EDGE_S_ADD);
  const v = (mx / 255) * ML_EDGE_V;
  const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
  const t = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((t[0] + m) * 255), Math.round((t[1] + m) * 255), Math.round((t[2] + m) * 255)];
}

function symNearest(src, dest) {
  const m = new Array(dest);
  for (let i = 0; i < (dest >> 1); i++) {
    const tx = Math.min(src - 1, Math.floor((i + 0.5) * src / dest));
    m[i] = tx; m[dest - 1 - i] = src - 1 - tx;
  }
  if (dest & 1) { const mid = dest >> 1; m[mid] = Math.min(src - 1, Math.floor((mid + 0.5) * src / dest)); }
  return m;
}

function nearestMap(src, dest) {
  const m = new Array(dest);
  for (let i = 0; i < dest; i++) m[i] = Math.min(src - 1, Math.floor((i + 0.5) * src / dest));
  return m;
}

const DEFAULT_LOOK = 'soft';

const WEBM_MIME = 'video/webm;codecs=vp9';
const WEBM_MAX_MS = 3000;
const WEBM_MAX_BYTES = 256 * 1024;
const WEBM_BITRATE = 550000;
const ANIM_MAX_BYTES = 256 * 1024 * 1024;
const WEBM_PROBE_MAX_MS = 2500;
const WEBM_PROBE_MIN_BYTES = 600;
const WEBM_MAX_SIDE = 2048;
const ANIM_FORMATS = {
  gif: { label: 'GIF', ext: 'gif', note: '' },
  apng: {
    label: 'APNG', ext: 'png',
    note: 'Signal and LINE stickers, and Discord at 320 x 320. Smaller than GIF, with soft edges.',
  },
  webm: {
    label: 'WebM', ext: 'webm',
    note: 'Telegram video sticker: 512 px on one side, under 256 KB, up to 3 seconds.',
  },
};

class ChibiSkinMaker {
  constructor() {
    this.currentModelType = 'steve';
    this.bodyTypeMode = 'auto';
    this.chibiStyle = 'classic';
    this._mlScale = 1;
    this.mlDetail = 'blocky';
    this.currentMaterial = DEFAULT_LOOK;
    this.textureFilterPixelated = true;
    this.barebones = false;
    this.barebonesThreshold = 30;
    this.flatProfile = false;
    this.sideProfile = false;
    this.vertView = 'none';
    this.portraitView = false;
    this.layerShadow = false;
    this.upsideDown = false;
    this.facing = 'right';
    this.viewSide = 'front';
    // The view the editor opens with - 3/4 right with these defaults. The camera
    // panel's Reset returns here; it used to jump to the flat front view.
    this.defaultViewKey = this._viewKey();
    this.pose = 'none';
    this.headOverlay = 'on';
    this.bodyOverlay = 'on';
    this.shading = 'on';
    this.shadingStrength = 53;
    this.partVisibility = {};
    this.currentSkinImage = null;
    this._pristineSkinImage = null;
    this._skinFileBlob = null;
    this._pendingSkinFile = null;
    this._skinVerbatim = false;
    this.skinName = null;
    this.bgColor = '#4a4a4a';
    this.bgTransparent = true;
    this.bgShape = 'none';
    this.bgAspect = '1:1';
    this.gifSpeedValue = 1;
    this.animFormat = 'gif';
    this.bgImage = null;
    this._bgImageURI = null;
    this.viewZoom = 0;
    this.viewPanX = 0;
    this.viewPanY = 0;
    this.fillFrame = false;
    this.charZoom = 1;
    this.charX = 0;
    this.charY = 0;
    this.anim = 'none';
    this._animFrames = null;
    this._animIdx = 0;
    this._animPrev = 0;
    this._animRAF = 0;
    this._animParts = null;
    this._animUnder = null;
    this._animOver = null;
    this._animPadX = 0;
    this._animPadY = 0;
    this._animNoCrop = false;
    this._animHeadSwap = null;
    this._animShadeRow = false;
    this.bgVignette = false;
    this.undoStack = [];
    this.redoStack = [];
    this._preActionState = null;
    this._undoLock = false;
    this._loading = false;
    this.halfHeightUVs = false;
    this.outlineEnabled = false;
    this.outlineWidth = 0;
    this._outlineByStyle = { classic: 0, live: 1 };
    // Factory copy - setStyle() overwrites _outlineByStyle with whatever the
    // visitor last set, and "reset everything" needs the original per style.
    this._outlineDefaultByStyle = { ...this._outlineByStyle };
    this._outlineAutoByStyle = { classic: false, live: true };
    this.outlinePerPart = false;
    this._outlinePerPartByStyle = { classic: false, live: true };
    this.outlineSharp = false;
    this.outlineColor = '#000000';
    this.outlineAuto = true;
    this.farLegShade = true;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init(), { once: true });
    } else {
      this.init();
    }
  }

  async init() {
    window.__csm = this;
    this.getElements();
    this.setupScene();
    this.setupEventListeners();
    await this.loadModel('steve');
    this._readStyleFromURL();
    // The style the page opened with (?style=live, or the classic default).
    // "Reset everything" returns to it instead of the config defaults.
    this.initialStyle = this.chibiStyle;
    // The markup marks "front" as active, but the editor opens 3/4 right. Only
    // the live style re-synced the buttons (via setStyle), so the classic page
    // showed "front" highlighted over a 3/4 render.
    this._syncViewButtons();
    this.updatePresetActive();
    this.updateBackground();
    if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, this._bgPaints());
  }

  _applyOutlineWidth(w) {
    this.outlineWidth = Math.max(0, Math.min(10, w || 0));
    this.outlineEnabled = this.outlineWidth > 0;
    setVisible(this.outlineSettingsRow, this.outlineEnabled);
    this._refreshSkinTexture();
  }

  async resetAll() {
    this.removeSkin();
    // Back to how the page opened: same style, 3/4 right. Applying the bare
    // config defaults switched a live-style page to classic + front and left
    // ?style=live in the URL, so the editor and the address bar disagreed.
    // CONFIG_DEFAULTS is style-independent (outline width 0), but the live style
    // opens with a 1px outline - without it the reset image lacked the outline.
    const style = this.initialStyle || 'classic';
    await this.applyConfig({
      style,
      view: this.defaultViewKey,
      outline: { width: this._outlineDefaultByStyle[style] || 0 },
    });
    this._writeStyleToURL();
    this.undoStack = [];
    this.redoStack = [];
    this.updateUndoButtons();
  }

  get visibilityCheckboxes() {
    return document.querySelectorAll('#visibility-section input[data-part]');
  }

  getElements() {
    this.viewerContainer = document.getElementById('viewerContainer');
    this.viewerLoading = document.getElementById('viewerLoading');
    this.modelToggle = document.getElementById('modelToggle');
    this.usernameInput = document.getElementById('usernameInput');
    this.loadSkinBtn = document.getElementById('loadSkinBtn');
    this.dropOverlay = document.getElementById('dropOverlay');
    this.skinFileInput = document.getElementById('skinFileInput');
    this.skinStatusText = document.getElementById('skinStatusText');
    this.filterToggleBtn = document.getElementById('filterToggleBtn');
    this.removeSkinBtn = document.getElementById('removeSkinBtn');
    this.downloadSkinBtn = document.getElementById('downloadSkinBtn');
    this.skinError = document.getElementById('skinError');
    this.halfHeightUVsToggle = document.getElementById('halfHeightUVs');
    this.bgColorPicker = document.getElementById('bgColorPicker');
    this.bgTransparentCheckbox = document.getElementById('bgTransparent');
    this.bgVignetteCheckbox = document.getElementById('bgVignette');
    this.bgVignetteRow = document.getElementById('bgVignetteRow');
    this.bgPresets = document.getElementById('bgPresets');
    this.materialSelect = document.getElementById('materialSelect');
    this.barebonesToggle = document.getElementById('barebonesToggle');
    this.barebonesStrength = document.getElementById('barebonesStrength');
    this.barebonesStrengthValue = document.getElementById('barebonesStrengthValue');
    this.shadingSlider = document.getElementById('shadingStrength');
    this.shadingSliderValue = document.getElementById('shadingStrengthValue');
    this.barebonesStrengthRow = document.getElementById('barebonesStrengthRow');
    this.vpStage = document.getElementById('vpStage');
    this.historyChip = document.getElementById('historyChip');
    this.toolStatus = document.getElementById('toolStatus');
    this.exportBtn = document.getElementById('exportBtn');
    this.configBtn = document.getElementById('configBtn');
    this.undoBtn = document.getElementById('undoBtn');
    this.redoBtn = document.getElementById('redoBtn');
    this.exportSizeSelect = document.getElementById('exportSizeSelect');
    this.gifInfo = document.getElementById('gifInfo');
    this.bgShapeBtns = [...document.querySelectorAll('#bgShapeBtns [data-shape]')];
    this.bgImageInput = document.getElementById('bgImageInput');
    this.bgImageTile = document.getElementById('bgImageTile');
    this.bgAspectSelect = document.getElementById('bgAspect');
    this.bgAspectRow = document.getElementById('bgAspectRow');
    this.fillFrameRow = document.getElementById('fillFrameRow');
    this.fillFrameInput = document.getElementById('fillFrame');
    this.exportDims = document.getElementById('exportDims');
    this.copyPngBtn = document.getElementById('copyPngBtn');
    this.downloadPngBtn = document.getElementById('downloadPngBtn');
    this.downloadGifBtn = document.getElementById('downloadGifBtn');
    this.animFormatBtns = Array.from(document.querySelectorAll('[data-anim-format]'));
    this.gifSpeed = document.getElementById('gifSpeed');
    this.downloadSheetBtn = document.getElementById('downloadSheetBtn');
    this.sheetInfo = document.getElementById('sheetInfo');
    this.outlineSettingsRow = document.getElementById('outlineSettingsRow');
    this.outlineWidthSlider = document.getElementById('outlineWidth');
    this.outlineSharpToggle = document.getElementById('outlineSharp');
    this.outlineAutoToggle = document.getElementById('outlineAuto');
    this.outlinePerPartToggle = document.getElementById('outlinePerPart');
    this.farLegShadeToggle = document.getElementById('farLegShade');
    this.outlineColorPicker = document.getElementById('outlineColor');
    this.outlineColorHexInput = document.getElementById('outlineColorHex');
    this.resetAllBtn = document.getElementById('resetAllBtn');
  }

  setupScene() {
    const container = this.viewerContainer;
    const canvas = document.createElement('canvas');
    canvas.className = 'view-canvas';
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    this.viewCanvas = canvas;
    this.ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (this._draw) this._draw();
    };
    resizeCanvas();
    // Deferred to the next frame. Resizing the canvas and redrawing inside the
    // observer callback triggered layout again in the same pass, which the
    // browser reports as "ResizeObserver loop completed with undelivered
    // notifications" - and main.js turned that into an error toast.
    let resizeFrame = 0;
    this.resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resizeCanvas);
    });
    this.resizeObserver.observe(container);
    setVisible(this.viewerLoading, false);
  }

  setupEventListeners() {
    this.modelToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.toggle-btn');
      if (btn) this._setBodyType(btn.dataset.model);
    });

    this.viewButtons = Array.from(document.querySelectorAll('#viewButtons [data-view]'));
    for (const btn of this.viewButtons) {
      btn.addEventListener('click', () => this.setView(btn.dataset.view));
    }
    const resetViewBtn = document.getElementById('resetViewBtn');
    if (resetViewBtn) resetViewBtn.addEventListener('click', () => this.setView(this.defaultViewKey));
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && ((e.code === 'KeyZ' && e.shiftKey) || e.code === 'KeyY')) {
        e.preventDefault();
        this.redo();
        return;
      }
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      const viewMap = {
        'Numpad1': '34-right',     'Digit1': '34-right',
        'Numpad2': 'front',        'Digit2': 'front',
        'Numpad3': '34-left',      'Digit3': '34-left',
        'Numpad4': 'side-right',   'Digit4': 'side-right',
        'Numpad5': 'back',         'Digit5': 'back',
        'Numpad6': 'side-left',    'Digit6': 'side-left',
        'Numpad7': 'back34-right', 'Digit7': 'back34-right',
        'Numpad8': 'back34-left',  'Digit8': 'back34-left',
        'Numpad9': 'top',          'Digit9': 'top',
        'Numpad0': 'bottom',       'Digit0': 'bottom',
      };
      const view = viewMap[e.code];
      if (view) {
        e.preventDefault();
        this.setView(view);
      }
    });

    this.setupPanels();
    this.setupModals();
    this.setupConfigModal();
    this.setupPreviewPane();
    this.setupValueScrubbing();
    this.undoBtn.addEventListener('click', () => this.undo());
    this.redoBtn.addEventListener('click', () => this.redo());

    this.materialSelect.addEventListener('change', (e) => { this.pushUndo(); this.setMaterial(e.target.value); });

    this._trackContinuousInput(this.outlineWidthSlider);
    this.outlineWidthSlider.addEventListener('input', (e) => {
      this._applyOutlineWidth(parseInt(e.target.value, 10));
    });
    this.outlineSharpToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.outlineSharp = e.target.checked;
      this._refreshSkinTexture();
    });
    if (this.farLegShadeToggle) this.farLegShadeToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.farLegShade = e.target.checked;
      this._refreshSkinTexture();
      this.setStatus(this.farLegShade ? 'Back leg is shaded.' : 'Back leg is lit like the front one.');
    });
    if (this.outlinePerPartToggle) this.outlinePerPartToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.outlinePerPart = e.target.checked;
      this._outlinePerPartByStyle[this.chibiStyle] = this.outlinePerPart;
      this._syncStyleButtons();
      this._refreshSkinTexture();
      this.setStatus(this.outlinePerPart ? 'Outline around each part.' : 'Outline around the whole figure.');
    });
    if (this.outlineAutoToggle) this.outlineAutoToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.outlineAuto = e.target.checked;
      this._syncOutlineColorRow();
      this._refreshSkinTexture();
      this.setStatus(this.outlineAuto ? 'Outline color follows the artwork.' : 'Outline color: custom.');
    });
    const claimColor = () => {
      if (this.chibiStyle !== 'live' || !this.outlineAuto) return;
      this.outlineAuto = false;
      if (this.outlineAutoToggle) this.outlineAutoToggle.checked = false;
    };
    this._trackContinuousInput(this.outlineColorPicker);
    this.outlineColorPicker.addEventListener('input', (e) => {
      this.outlineColor = e.target.value;
      claimColor();
      this.outlineColorHexInput.value = e.target.value.substring(1);
      this._refreshSkinTexture();
    });
    this._trackContinuousInput(this.outlineColorHexInput);
    this.outlineColorHexInput.addEventListener('input', (e) => {
      const hex = e.target.value.replace('#', '');
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        this.outlineColor = '#' + hex.toLowerCase();
        claimColor();
        this.outlineColorPicker.value = this.outlineColor;
        this._refreshSkinTexture();
      }
    });

    document.getElementById('visibility-section').addEventListener('change', (e) => {
      const part = e.target.dataset.part;
      if (part) { this.pushUndo(); this.setPartVisibility(part, e.target.checked); }
    });

    this.loadSkinBtn.addEventListener('click', () => this.loadSkinFromUsername());
    this.usernameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.loadSkinFromUsername();
    });

    this.skinFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this.loadSkinFromFile(file);
      }
      e.target.value = '';
    });

    let dragDepth = 0;
    const stage = this.vpStage || this.viewerContainer;
    stage.addEventListener('dragenter', (e) => {
      if (!e.dataTransfer || ![...e.dataTransfer.types].includes('Files')) return;
      e.preventDefault();
      dragDepth++;
      setVisible(this.dropOverlay, true);
    });
    stage.addEventListener('dragover', (e) => { e.preventDefault(); });
    stage.addEventListener('dragleave', () => {
      dragDepth = Math.max(0, dragDepth - 1);
      if (dragDepth === 0) setVisible(this.dropOverlay, false);
    });
    stage.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragDepth = 0;
      setVisible(this.dropOverlay, false);
      this.handleDroppedFile(e);
    });

    this.filterToggleBtn.addEventListener('change', (e) => {
      this.pushUndo();
      this.textureFilterPixelated = e.target.checked;
      this._refreshSkinTexture();
    });

    this.barebonesToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.barebones = e.target.checked;
      this._syncBarebonesRow(this.barebones);
      this._refreshSkinTexture();
    });
    this._trackContinuousInput(this.barebonesStrength);
    this.barebonesStrength.addEventListener('input', (e) => {
      this.barebonesThreshold = parseInt(e.target.value, 10);
      this.barebonesStrengthValue.textContent = e.target.value;
      if (this.barebones) this._refreshSkinTexture();
    });

    if (this.shadingSlider) {
      this._trackContinuousInput(this.shadingSlider);
      this.shadingSlider.addEventListener('input', (e) => {
        this.shadingStrength = parseInt(e.target.value, 10);
        if (this.shadingSliderValue) this.shadingSliderValue.textContent = e.target.value;
        this._refreshSkinTexture();
      });
    }

    this.removeSkinBtn.addEventListener('click', () => {
      if (this.currentSkinImage) { this.pushUndo(); this.removeSkin(); }
    });
    this.downloadSkinBtn.addEventListener('click', () => this.downloadSkin());

    this.halfHeightUVsToggle.addEventListener('change', (e) => {
      this.pushUndo();
      this.halfHeightUVs = e.target.checked;
      this.applyHalfHeightUVs();
    });

    this._trackContinuousInput(this.bgColorPicker);
    this.bgColorPicker.addEventListener('input', (e) => {
      this.bgColor = e.target.value;
      if (this.bgImage) { this.bgImage = null; this._bgImageURI = null; this._syncBgImageTile(); }
      if (this.bgTransparent) {
        this.bgTransparent = false;
        this.bgTransparentCheckbox.checked = false;
        setRowEnabled(this.bgVignetteRow, true);
      }
      this.updatePresetActive(e.target.value);
      this.updateBackground();
    });

    this.bgTransparentCheckbox.addEventListener('change', (e) => {
      this.pushUndo();
      this.bgTransparent = e.target.checked;
      setRowEnabled(this.bgVignetteRow, this._bgPaints());
      this.updatePresetActive();
      this.updateBackground();
    });

    this.bgVignetteCheckbox.addEventListener('change', (e) => {
      this.pushUndo();
      this.bgVignette = e.target.checked;
      this.updateBackground();
    });

    this.bgPresets.addEventListener('click', (e) => {
      const preset = e.target.closest('.bg-preset');
      if (!preset) return;
      this.pushUndo();
      this.bgColor = preset.dataset.color;
      if (this.bgImage) { this.bgImage = null; this._bgImageURI = null; this._syncBgImageTile(); }
      this.bgColorPicker.value = this.bgColor;
      this.bgTransparentCheckbox.checked = false;
      this.bgTransparent = false;
      setRowEnabled(this.bgVignetteRow, true);
      this.updatePresetActive(this.bgColor);
      this.updateBackground();
    });

    if (this.exportSizeSelect) this.exportSizeSelect.addEventListener('change', (e) => {
      this.setExportSize(parseInt(e.target.value, 10));
    });
    if (this.bgAspectSelect) this.bgAspectSelect.addEventListener('change', (e) => this.setAspect(e.target.value));
    if (this.fillFrameInput) this.fillFrameInput.addEventListener('change', () => this.setFillFrame(this.fillFrameInput.checked));
    if (this.gifSpeed) this.gifSpeed.addEventListener('change', (e) => this.setGifSpeed(parseFloat(e.target.value)));
    for (const b of this.gifSpeedBtns || []) {
      b.addEventListener('click', () => this.setGifSpeed(parseFloat(b.dataset.speed)));
    }
    this.exportBtn.addEventListener('click', () => {
      this._populateExportSizes(); this._updateExportDims(); this._updateGifInfo(); this._updateSheetInfo();
      setTimeout(() => this._probeWebmAlpha(), 350);
    });

    if (this.downloadPngBtn) this.downloadPngBtn.addEventListener('click', () => this.exportPNG());
    if (this.copyPngBtn) this.copyPngBtn.addEventListener('click', () => this.copyPNG());
    this._populateExportSizes();
    this._updateExportDims();
    for (const btn of this.bgShapeBtns) {
      btn.addEventListener('click', () => this.setFormat(btn.dataset.shape));
    }
    if (this.bgImageInput) this.bgImageInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        this.pushUndo();
        await this._applyBgImageURI(reader.result);
        this.setStatus('Background image set - transparency disabled.');
      };
      reader.readAsDataURL(file);
    });

    this.viewerContainer.addEventListener('wheel', (e) => {
      if (!this._chibiCanvas) return;
      e.preventDefault();
      const step = e.deltaY < 0 ? 1 : -1;
      if ((this.bgShape || 'none') !== 'none') {
        const raw = this._badgeScale(this._fitScale());
        const next = Math.max(1, Math.min(60, Number.isInteger(raw)
          ? raw + step
          : (step > 0 ? Math.ceil(raw) : Math.floor(raw))));
        this._takeOverFromFill();
        const auto = this._fitScale();
        this.charZoom = next === auto ? 1 : next / auto;
        this._draw();
        this.setStatus('Figur ' + next + 'x' + (next === auto ? ' (fit)' : '') + ' - drag to move, double-click to reset.');
        return;
      }
      const auto = this._viewBaseScale();
      const current = this._viewScale();
      const next = Math.max(0.25, Math.min(60, Math.round((current + step) * 4) / 4));
      this.viewZoom = (Math.abs(next - auto) < 0.125 && !this.viewPanX && !this.viewPanY) ? 0 : next;
      if (!this.viewZoom) { this.viewPanX = 0; this.viewPanY = 0; }
      this._draw();
      this.setStatus('Zoom ' + next.toFixed(next % 1 ? 2 : 0) + 'x - double-click to reset.');
    }, { passive: false });
    this.viewerContainer.addEventListener('dblclick', () => {
      const comp = this.charZoom !== 1 || this.charX !== 0 || this.charY !== 0;
      if (!this.viewZoom && !this.viewPanX && !this.viewPanY && !comp) return;
      this.viewZoom = 0; this.viewPanX = 0; this.viewPanY = 0;
      this.charZoom = 1; this.charX = 0; this.charY = 0;
      this._draw();
      this.setStatus('Zoom and position reset.');
    });
    let panFrom = null;
    const livePointers = new Map();
    let pinch = null;
    const pinchDist = () => {
      const [a, b] = [...livePointers.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const beginPinch = () => {
      if (livePointers.size !== 2) return;
      panFrom = null;
      const badge = (this.bgShape || 'none') !== 'none';
      if (badge) this._takeOverFromFill();
      pinch = { d0: pinchDist(), badge, z0: badge ? (this.charZoom || 1) : this._viewScale() };
    };
    const movePinch = () => {
      if (!pinch || livePointers.size !== 2 || !this._chibiCanvas) return;
      const d = pinchDist();
      if (!pinch.d0 || !d) return;
      const fit = this._fitScale();
      const want = pinch.z0 * (d / pinch.d0);
      if (pinch.badge) {
        const eff = Math.max(1, Math.min(60, Math.round(fit * want)));
        this.charZoom = eff === fit ? 1 : eff / fit;
        this.setStatus('Figur ' + eff + 'x' + (eff === fit ? ' (fit)' : '') + ' - drag to move, double-click to reset.');
      } else {
        const auto = this._viewBaseScale();
        const eff = Math.max(0.25, Math.min(60, Math.round(want * 4) / 4));
        this.viewZoom = (Math.abs(eff - auto) < 0.125 && !this.viewPanX && !this.viewPanY) ? 0 : eff;
        if (!this.viewZoom) { this.viewPanX = 0; this.viewPanY = 0; }
        this.setStatus('Zoom ' + eff.toFixed(eff % 1 ? 2 : 0) + 'x - double-click to reset.');
      }
      this._draw();
    };
    this.viewerContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    this.viewerContainer.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.button !== 2) return;
      livePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (livePointers.size >= 2) { beginPinch(); return; }
      const char = (this.bgShape || 'none') !== 'none';
      panFrom = {
        x: e.clientX, y: e.clientY,
        px: char ? this.charX : this.viewPanX,
        py: char ? this.charY : this.viewPanY,
        char,
      };
      try { this.viewerContainer.setPointerCapture(e.pointerId); } catch (_) {}
    });
    this.viewerContainer.addEventListener('pointermove', (e) => {
      if (livePointers.has(e.pointerId)) livePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (livePointers.size >= 2) { movePinch(); return; }
      if (!panFrom) return;
      if (panFrom.char) {
        const scale = this._badgeScale(this._fitScale());
        const frame = this._frameSize(this.viewCanvas.width, this.viewCanvas.height);
        const cv = this._chibiCanvas;
        const lim = (span, sprite) => Math.max(1, Math.round((span / scale + sprite) / 2 - sprite * 0.25));
        const limX = lim(frame.w, cv ? cv.width : 0);
        const limY = lim(frame.h, cv ? cv.height : 0);
        this.charX = Math.max(-limX, Math.min(limX, Math.round(panFrom.px + (e.clientX - panFrom.x) / scale)));
        this.charY = Math.max(-limY, Math.min(limY, Math.round(panFrom.py + (e.clientY - panFrom.y) / scale)));
      } else {
        this.viewPanX = panFrom.px + (e.clientX - panFrom.x);
        this.viewPanY = panFrom.py + (e.clientY - panFrom.y);
      }
      this._draw();
    });
    for (const ev of ['pointerup', 'pointercancel', 'pointerleave']) {
      this.viewerContainer.addEventListener(ev, (e) => {
        panFrom = null;
        livePointers.delete(e.pointerId);
        if (livePointers.size < 2) pinch = null;
        if (e.pointerId !== undefined) { try { this.viewerContainer.releasePointerCapture(e.pointerId); } catch (_) {} }
      });
    }
    this.downloadGifBtn.addEventListener('click', () => this.exportAnimation());
    for (const b of this.animFormatBtns || []) {
      b.addEventListener('click', () => this.setAnimFormat(b.dataset.animFormat));
    }
    if (this.downloadSheetBtn) this.downloadSheetBtn.addEventListener('click', () => this.exportSheet());
    const uploadZone = document.getElementById('uploadDropZone');
    if (uploadZone) {
      uploadZone.addEventListener('click', () => this.skinFileInput.click());
      uploadZone.addEventListener('dragover', (e) => {
        if (!e.dataTransfer || ![...e.dataTransfer.types].includes('Files')) return;
        e.preventDefault();
        uploadZone.classList.add('drag-over');
      });
      uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove('drag-over');
        this.handleDroppedFile(e);
      });
    }
    this.resetAllBtn.addEventListener('click', () => {
      this.openDialog(document.getElementById('confirmOverlay'), this.resetAllBtn);
    });
    const confirmOk = document.getElementById('confirmOk');
    if (confirmOk) confirmOk.addEventListener('click', () => {
      this.closeDialog();
      this.resetAll();
      this.setStatus('Everything reset.');
    });

    this.layerShadowInput = document.getElementById('layerShadow');
    if (this.layerShadowInput) this.layerShadowInput.addEventListener('change', () => this.setLayerShadow(this.layerShadowInput.checked));
    this.bustButtons = Array.from(document.querySelectorAll('[data-bust]'));
    for (const btn of this.bustButtons) btn.addEventListener('click', () => this.setBust(btn.dataset.bust));
    this.poseButtons = Array.from(document.querySelectorAll('[data-pose]'));
    for (const btn of this.poseButtons) {
      btn.addEventListener('click', () => this.setPose(btn.dataset.pose));
    }
    const resetPose2 = document.getElementById('resetPoseBtn2');
    if (resetPose2) resetPose2.addEventListener('click', () => this.setPose('none'));
    this.animButtons = Array.from(document.querySelectorAll('[data-anim]'));
    for (const btn of this.animButtons) {
      btn.addEventListener('click', () => this.setAnim(btn.dataset.anim));
    }
    const resetAnim = document.getElementById('resetAnimBtn');
    if (resetAnim) resetAnim.addEventListener('click', () => this.setAnim('none'));

    this.detailButtons = Array.from(document.querySelectorAll('#detailToggle [data-detail]'));
    this.detailRow = document.getElementById('detailRow');
    for (const btn of this.detailButtons) btn.addEventListener('click', () => this.setDetail(btn.dataset.detail));
    this.styleButtons = Array.from(document.querySelectorAll('#styleToggle [data-style]'));
    this.styleLiveHint = document.getElementById('styleLiveHint');
    for (const btn of this.styleButtons) btn.addEventListener('click', () => this.setStyle(btn.dataset.style));
    for (const b of [...this.viewButtons, ...this.poseButtons, ...this.animButtons]) {
      if (b.title) b.dataset.baseTitle = b.title;
    }
    this._syncStyleButtons();
    if (this.outlineWidthSlider) this.outlineWidthSlider.value = String(this.outlineWidth);
    if (this.outlineSharpToggle) this.outlineSharpToggle.checked = !!this.outlineSharp;
    if (this.shadingSlider) this.shadingSlider.value = String(this.shadingStrength);
    if (this.barebonesStrength) this.barebonesStrength.value = String(this.barebonesThreshold);
    setVisible(this.outlineSettingsRow, this.outlineEnabled);
    const resetBg = document.getElementById('resetBgBtn');
    if (resetBg) resetBg.addEventListener('click', () => this.resetBackground());

    const showAllBtn = document.getElementById('showAllPartsBtn');
    if (showAllBtn) showAllBtn.addEventListener('click', () => {
      const hidden = [...this.visibilityCheckboxes].filter(cb => !cb.checked);
      if (!hidden.length) return;
      this.pushUndo();
      for (const cb of hidden) {
        cb.checked = true;
        this.setPartVisibility(cb.dataset.part, true);
      }
    });

    for (const step of document.querySelectorAll('.quantity-btn[data-for]')) {
      const nudge = () => {
        const input = document.getElementById(step.dataset.for);
        if (!input || input.disabled) return;
        const by = parseFloat(step.dataset.step) || 1;
        let next = Math.round(((parseFloat(input.value) || 0) + by) * 100) / 100;
        if (input.min !== '') next = Math.max(parseFloat(input.min), next);
        if (input.max !== '') next = Math.min(parseFloat(input.max), next);
        input.value = next;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      };
      let timer = null, repeat = null, armed = false;
      step.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const input = document.getElementById(step.dataset.for);
        if (input && !input.disabled && !this._preActionState) {
          this._preActionState = this.captureFullState();
          armed = true;
        }
        nudge();
        timer = setTimeout(() => { repeat = setInterval(nudge, 120); }, 400);
      });
      const stop = () => {
        clearTimeout(timer); clearInterval(repeat); timer = repeat = null;
        if (armed && this._preActionState) {
          this.pushUndo(this._preActionState);
          this._preActionState = null;
        }
        armed = false;
      };
      step.addEventListener('pointerup', stop);
      step.addEventListener('pointerleave', stop);
      step.addEventListener('pointercancel', stop);
    }
  }

  updatePresetActive(color = this.bgColor) {
    const painting = !this.bgTransparent || this.bgShape === 'circle';
    const inUse = painting && !this.bgImage;
    this.bgPresets.querySelectorAll('.bg-preset').forEach(p => {
      p.classList.toggle('active', inUse && p.dataset.color === String(color).toLowerCase());
    });
    if (this.bgImageTile) this.bgImageTile.classList.toggle('active', painting && !!this.bgImage);
  }

  updateBackground() {
    const el = this.viewerContainer;
    if (!el) return;
    if (this.bgTransparent || (this.bgShape || 'none') !== 'none' || this.bgImage) {
      el.style.background = 'repeating-conic-gradient(#808080 0% 25%, #a0a0a0 0% 50%) 0 0 / 20px 20px';
    } else if (this.bgVignette) {
      el.style.background = `radial-gradient(ellipse at center, ${this.bgColor} 40%, ${this._shadeHex(this.bgColor, 0.55)} 135%)`;
    } else {
      el.style.background = this.bgColor;
    }
    this._draw();
  }

  _shadeHex(hex, mul) {
    const n = parseInt((hex || '#4a4a4a').slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v * mul)));
    return '#' + [f((n >> 16) & 255), f((n >> 8) & 255), f(n & 255)].map(v => v.toString(16).padStart(2, '0')).join('');
  }

  async loadModel(type, { clearUndo = true, preservePose = true } = {}) {
    this._loading = true;
    this.currentModelType = type;
    if (clearUndo) {
      this.undoStack = [];
      this.redoStack = [];
      this.updateUndoButtons();
    }
    await this._loadDefaultSkin(type);
    setVisible(this.viewerLoading, false);
    this._loading = false;
  }

async loadSkinFromUsername() {
    const username = this.usernameInput.value.trim();
    if (!username) return;

    this.hideError();
    setBusy(this.loadSkinBtn, 'Lade...');
    const preState = this.captureFullState();

    try {
        const player = await MCCraftAPI.getPlayer(username);

        if (!player || !player.skinUrl) {
            throw new Error('Player or skin not found.');
        }

        // Skin laden
        const resp = await fetch(player.skinUrl, {
            headers: {
                'Accept': 'image/png,image/*'
            },
            cache: 'no-store'
        });

        if (!resp.ok) {
            throw new Error('Skin could not be loaded.');
        }

        const blob = await resp.blob();

        const dataUri = await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(
                new Error('Skin could not be read.')
            );

            reader.readAsDataURL(blob);
        });

        const img = new Image();

        await new Promise((resolve, reject) => {
            img.onload = resolve;

            img.onerror = () => reject(
                new Error('Skin could not be loaded.')
            );

            img.src = dataUri;
        });

        if (!this._validSkinSize(img)) {
            throw new Error(
                `The API returned an invalid skin image (${img.width}x${img.height}).`
            );
        }

        this.pushUndo(preState);

        this.applySkinTexture(img);
        this.skinName = player.username || username;
        if (
            this.bodyTypeMode === 'auto' &&
            (player.modelType === 'slim' ||
             player.modelType === 'alex' ||
             player.isSlim === true)
        ) {
            if (this.currentModelType !== 'alex') {
                await this.loadModel('alex', {
                    clearUndo: false
                });

                this.applySkinTexture(img);
            }
        } else if (
            this.bodyTypeMode === 'auto' &&
            (player.modelType === 'classic' ||
             player.modelType === 'steve' ||
             player.isSlim === false)
        ) {
            if (this.currentModelType !== 'steve') {
                await this.loadModel('steve', {
                    clearUndo: false
                });

                this.applySkinTexture(img);
            }
        } else {
            await this._syncBodyType(
                this._pristineSkinImage || img
            );
        }

        this._syncBodyTypeButtons();

        this.showSkinStatus(
            `${player.username || username} (${img.width}x${img.height})`
        );

        this.setStatus(
            'Loaded: ' +
            (player.username || username) +
            ' via the MC-Craft API.'
        );

    } catch (err) {
        console.error('MC-Craft Skin API error:', err);

        let message = 'Skin could not be loaded.';

        if (
            err &&
            (
                err.code === 'PLAYER_NOT_FOUND' ||
                err.status === 404
            )
        ) {
            message = 'This Minecraft player was not found.';
        } else if (err && err.code === 'TIMEOUT') {
            message = 'The MC-Craft API is responding too slowly right now.';
        } else if (err && err.code === 'NETWORK_ERROR') {
            message = 'The MC-Craft API is currently unreachable.';
        } else if (err && err.message) {
            message = err.message;
        }

        this.showError(message);

    } finally {
        clearBusy(this.loadSkinBtn);
    }
}

  static get MIRROR_PROBE_BOXES() {
    return [[0, 0, 8, 8], [24, 0, 16, 8], [56, 0, 8, 8], [0, 16, 4, 4], [12, 16, 4, 4],
            [0, 32, 4, 4], [12, 32, 4, 4], [0, 48, 4, 4], [12, 48, 4, 4], [28, 48, 4, 4]];
  }

  _detectMirroredSheet(image) {
    const w = image.width || image.naturalWidth, h = image.height || image.naturalHeight;
    if (!w || !h || w !== h || w % 64 !== 0) return false;
    const hd = w / 64;
    const cvs = document.createElement('canvas'); cvs.width = w; cvs.height = h;
    const cx = cvs.getContext('2d', { willReadFrequently: true });
    cx.drawImage(image, 0, 0);
    const d = cx.getImageData(0, 0, w, h).data;
    const ink = (mirror) => {
      let n = 0;
      for (const [bx, by, bw, bh] of ChibiSkinMaker.MIRROR_PROBE_BOXES) {
        for (let y = by * hd; y < (by + bh) * hd; y++) {
          const sy = mirror ? (h - 1 - y) : y;
          for (let x = bx * hd; x < (bx + bw) * hd; x++) if (d[(sy * w + x) * 4 + 3] >= 128) n++;
        }
      }
      return n;
    };
    const asIs = ink(false);
    if (asIs === 0) return false;
    return ink(true) * 4 < asIs;
  }

  _flipImageV(image) {
    const w = image.width || image.naturalWidth, h = image.height || image.naturalHeight;
    const cvs = document.createElement('canvas'); cvs.width = w; cvs.height = h;
    const cx = cvs.getContext('2d');
    cx.imageSmoothingEnabled = false;
    cx.translate(0, h); cx.scale(1, -1);
    cx.drawImage(image, 0, 0);
    return cvs;
  }

  _detectSlim(image) {
    const w = image.width || image.naturalWidth;
    const h = image.height || image.naturalHeight;
    if (!w) return null;
    if (h * 2 === w) return false;
    const s = w / 64;
    if (s < 1 || s % 1 !== 0) return null;

    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(image, 0, 0);

    const gutters = [[50, 16, 2, 4], [54, 20, 2, 12], [42, 48, 2, 4], [46, 52, 2, 12]];
    for (const [x, y, gw, gh] of gutters) {
      if ((y + gh) * s > h) return null;
      const d = g.getImageData(x * s, y * s, gw * s, gh * s).data;
      for (let i = 3; i < d.length; i += 4) {
        if (d[i] > 16) return false;
      }
    }
    return true;
  }

  async _setBodyType(mode) {
    if (!mode || !ChibiSkinMaker.BODY_TYPES.includes(mode)) return;

    if (this._busyBodyType) {
      this._pendingBodyType = mode;
      return;
    }
    if (mode === this.bodyTypeMode) {
      this._syncBodyTypeButtons();
      return;
    }

    this._busyBodyType = true;
    this.pushUndo();
    try {
      let next = mode;
      while (next && next !== this.bodyTypeMode) {
        this._pendingBodyType = null;
        await this._applyBodyType(next);
        next = this._pendingBodyType;
      }
    } finally {
      this._busyBodyType = false;
      this._pendingBodyType = null;
      this._syncBodyTypeButtons();
    }
  }

  async _applyBodyType(mode) {
    this.bodyTypeMode = mode;
    this._syncBodyTypeButtons();

    if (mode === 'auto') {
      const detectSrc = this._pristineSkinImage || this.currentSkinImage;
      const resolved = detectSrc ? await this._syncBodyType(detectSrc) : null;
      this._syncBodyTypeButtons();
      this.setStatus(resolved
        ? 'Auto: ' + (resolved === 'alex' ? 'slim arms detected, Alex.' : 'wide arms detected, Steve.')
        : (this.currentSkinImage ? 'Auto: keeping ' + this.currentModelType + '.' : 'Auto: body type follows the skin.'));
      return;
    }

    await this.loadModel(mode, { clearUndo: false });
    this._refreshSkinTexture();
    this.setStatus('Body type set to ' + (mode === 'alex' ? 'Alex' : 'Steve') + '.');
  }

  _syncBodyTypeButtons() {
    for (const b of this.modelToggle.querySelectorAll('.toggle-btn')) {
      const m = b.dataset.model;
      b.classList.toggle('active', m === this.bodyTypeMode);
      b.classList.toggle('is-resolved', this.bodyTypeMode === 'auto' && m === this.currentModelType);
    }
  }

  async _syncBodyType(image) {
    if (this.bodyTypeMode !== 'auto') return null;
    const slim = this._detectSlim(image);
    if (slim === null) return null;
    const type = slim ? 'alex' : 'steve';
    if (type === this.currentModelType) { this._syncBodyTypeButtons(); return null; }

    await this.loadModel(type, { clearUndo: false });
    this._syncBodyTypeButtons();
    if (this.currentSkinImage) this.applySkinTexture(this.currentSkinImage);
    return type;
  }

  handleDroppedFile(e) {
    const file = e.dataTransfer && e.dataTransfer.files[0];
    if (!file) return;
    if (file.type === 'image/png' || /\.png$/i.test(file.name)) {
      this.loadSkinFromFile(file);
    } else {
      this.showError('Please drop a skin PNG.');
    }
  }

  _validSkinSize(img) {
    const w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
    const ratio = w / h;
    return (ratio === 1 || ratio === 2) && w >= 64 && (w & (w - 1)) === 0;
  }

  loadSkinFromFile(file) {
    this.hideError();
    const preState = this.captureFullState();
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        if (ratio !== 1 && ratio !== 2) {
          this.showError('Skin must be square (64x64, 128x128, ...) or a legacy 2:1 sheet (64x32, 128x64, ...).');
          return;
        }
        if (img.width < 64 || (img.width & (img.width - 1)) !== 0) {
          this.showError('Skin width must be a power of two: 64, 128, 256, 512 ...');
          return;
        }
        this.pushUndo(preState);
        this._pendingSkinFile = file;
        this.applySkinTexture(img);
        this.skinName = file.name.replace(/\.png$/i, '');
        this._syncBodyType(this._pristineSkinImage || img).then((switched) => {
          this.showSkinStatus(`${file.name} (${img.width}x${img.height})`);
          this.setStatus(switched === 'alex'
            ? 'Schmale Arme erkannt, auf Alex umgeschaltet.'
            : 'Loaded: ' + file.name + '.');
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  downloadSkin() {
    const src = this.currentSkinImage || this._defaultSkinImage;
    if (!src) return;
    if (this._skinFileBlob && this._skinVerbatim) {
      const asIs = document.createElement('a');
      asIs.download = `${this.skinName || 'skin'}.png`;
      asIs.href = URL.createObjectURL(this._skinFileBlob);
      asIs.click();
      URL.revokeObjectURL(asIs.href);
      this._flashBtn(this.downloadSkinBtn, 'Saved!', true);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = src.width || src.naturalWidth;
    canvas.height = src.height || src.naturalHeight;
    if (!canvas.width || !canvas.height) return;
    canvas.getContext('2d').drawImage(src, 0, 0);
    const name = this.currentSkinImage
      ? `${this.skinName || 'skin'}.png`
      : `${String(this.currentModelType || 'steve').replace(/[^a-z0-9-]/gi, '') || 'steve'}.png`;
    canvas.toBlob((blob) => {
      if (!blob) { this._flashBtn(this.downloadSkinBtn, 'Error', false); return; }
      const link = document.createElement('a');
      link.download = name;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      this._flashBtn(this.downloadSkinBtn, 'Saved!', true);
    }, 'image/png');
  }

  removeSkin() {
    this.currentSkinImage = null;
    this._pristineSkinImage = null;
    this._skinFileBlob = null;
    this._skinVerbatim = false;
    this._skinDataUri = null;
    this.skinName = null;
    this.clearSkinStatus();
    setVisible(this.skinError, false);
    this._refreshSkinTexture();
  }

  applySkinTexture(image) {
    if (image !== this.currentSkinImage) {
      const flipped = this._detectMirroredSheet(image);
      this.upsideDown = flipped;
      if (flipped) image = this._flipImageV(image);
      this._pristineSkinImage = image;
      this._skinFileBlob = this._pendingSkinFile || null;
      this._pendingSkinFile = null;
      this._skinVerbatim = !flipped;
    }

    let source = image;

    if (image.width / image.height === 2) {
      source = this.convertLegacySkin(image);
      this._skinVerbatim = false;
    }

    const canvas = document.createElement('canvas');
    canvas.width = source.width || source.naturalWidth;
    canvas.height = source.height || source.naturalHeight;
    canvas.getContext('2d').drawImage(source, 0, 0);
    try {
      this._skinDataUri = canvas.toDataURL('image/png');
      this._skinWidth = canvas.width;
      this._skinHeight = canvas.height;
    } catch { this._skinDataUri = null; }

    this.currentSkinImage = source;
    this._refreshSkinTexture();
  }

  _syncBarebonesRow(on) {
    setVisible(this.barebonesStrengthRow, on);
    setRowEnabled(this.barebonesStrengthRow, on);
  }

  async _loadDefaultSkin(type) {
    try {
      this._defaultSkinCache = this._defaultSkinCache || {};
      const normalizedType = String(type || 'steve').toLowerCase();
      const localSkinMap = {
        steve: '/assets/img/skins/Steve_classic_texture.png',
        alex: '/assets/img/skins/Alex_slim_texture.png',
        default: '/assets/img/skins/default_steve.png',
      };
      const localSkinPath = localSkinMap[normalizedType] || localSkinMap.steve;

      if (!this._defaultSkinCache[normalizedType]) {
        this._defaultSkinCache[normalizedType] = await this._loadImage(localSkinPath);
      }
      this._defaultSkinImage = this._defaultSkinCache[normalizedType];
    } catch {
      this._defaultSkinImage = null;
    }
    this._refreshSkinTexture();
  }

  _applyMaterialTone(c, cv) {
    const M = {
      glossy:   { sat: 1.18, con: 1.06, bri: 3, top: 1.22 },
      clay:     { sat: 0.76, con: 0.93, bri: 6 },
      plastic:  { sat: 1.10, con: 1.14, bri: 0 },
      matte:    { sat: 0.88, con: 0.91, bri: 2 },
      metallic: { sat: 0.34, con: 1.22, bri: 0 },
      embossed: { sat: 0.96, con: 1.05, bri: 0, rim: 0.74 },
    }[this.currentMaterial];
    if (!M) return;
    const id = c.getImageData(0, 0, cv.width, cv.height), D = id.data, W = cv.width, H = cv.height;
    const alphaAt = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? 0 : D[(y * W + x) * 4 + 3];
    for (let i = 0; i < D.length; i += 4) {
      if (D[i + 3] === 0) continue;
      let r = D[i], g = D[i + 1], b = D[i + 2];
      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      r = l + (r - l) * M.sat; g = l + (g - l) * M.sat; b = l + (b - l) * M.sat;
      D[i] = (r - 128) * M.con + 128 + M.bri;
      D[i + 1] = (g - 128) * M.con + 128 + M.bri;
      D[i + 2] = (b - 128) * M.con + 128 + M.bri;
    }
    if (M.top || M.rim) {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (D[i + 3] === 0) continue;
        if (M.top && !alphaAt(x, y - 1)) { D[i] *= M.top; D[i + 1] *= M.top; D[i + 2] *= M.top; }
        else if (M.rim && (!alphaAt(x - 1, y) || !alphaAt(x + 1, y) || !alphaAt(x, y - 1) || !alphaAt(x, y + 1))) {
          D[i] *= M.rim; D[i + 1] *= M.rim; D[i + 2] *= M.rim;
        }
      }
    }
    c.putImageData(id, 0, 0);
  }

  _partNames(key) {
    if (key.startsWith('hat')) return ['Hut-Schicht', null];
    if (key.startsWith('head')) return ['Kopf', null];
    if (key.startsWith('jacket')) return ['Körper-Schicht', null];
    if (key.startsWith('body')) return ['Körper', 'Körper-Schicht'];
    if (key.startsWith('rSlv')) return ['Rechter Arm Schicht', null];
    if (key.startsWith('lSlv')) return ['Linker Arm Schicht', null];
    if (key.startsWith('rArm')) return ['Rechter Arm', 'Rechter Arm Schicht'];
    if (key.startsWith('lArm')) return ['Linker Arm', 'Linker Arm Schicht'];
    if (key.startsWith('rPant')) return ['Rechtes Bein Schicht', null];
    if (key.startsWith('lPant')) return ['Linkes Bein Schicht', null];
    if (key.startsWith('rLeg')) return ['Rechtes Bein', 'Rechtes Bein Schicht'];
    if (key.startsWith('lLeg')) return ['Linkes Bein', 'Linkes Bein Schicht'];
    return [null, null];
  }

  _shadeMul(base) {
    if (this.shading === 'off') return 1;
    const s = Number.isFinite(this.shadingStrength) ? this.shadingStrength : 50;
    if (s <= 0) return 1;
    if (s <= 50) return 1 - (1 - base) * (s / 50);
    if (s >= 100) return 0;
    return base * (1 - (s - 50) / 50);
  }

  _viewKey() {
    if (this.vertView === 'top' || this.vertView === 'bottom') return this.vertView;
    if (this.sideProfile) return this.facing === 'left' ? 'side-left' : 'side-right';
    if (this.flatProfile) return this.viewSide === 'back' ? 'back' : 'front';
    const l = this.facing === 'left';
    return this.viewSide === 'back' ? (l ? 'back34-left' : 'back34-right') : (l ? '34-left' : '34-right');
  }

  setView(key) {
    if (this.chibiStyle === 'live' && !ML_VIEW_KEYS.includes(key)) return;
    if (key === this._viewKey()) { this._syncViewButtons(); return; }
    const V = CHIBI_VIEWS[key];
    if (!V) return;
    this.pushUndo();
    this.vertView = V.vert || 'none';
    if (V.side !== undefined) this.sideProfile = !!V.side;
    if (V.flat !== undefined) this.flatProfile = V.flat;
    if (V.facing) this.facing = V.facing;
    if (V.vs) this.viewSide = V.vs;
    this._refreshSkinTexture();
    this._syncViewButtons();
    const btn = (this.viewButtons || []).find((b) => b.dataset.view === key);
    this.setStatus('View: ' + (btn ? btn.textContent : key) + '.');
  }

  _syncViewButtons() {
    const key = this._viewKey();
    for (const b of this.viewButtons || []) {
      const on = b.dataset.view === key;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
  }

  setPose(key) {
    if (key !== 'none' && this.chibiStyle !== 'live') this.setStyle('live');
    if (this.chibiStyle === 'live' && !ML_POSE_KEYS.includes(key)) return;
    if (this.chibiStyle !== 'live' && key !== 'none' && !CHIBI_POSES[key]) return;
    if (key === this.pose) { this._syncPoseButtons(); return; }
    this.pushUndo();
    this.pose = key;
    if (key !== 'none' && this.anim !== 'none') { this.anim = 'none'; this._syncAnimButtons(); }
    this._refreshSkinTexture();
    this._syncPoseButtons();
    const btn = (this.poseButtons || []).find((b) => b.dataset.pose === key);
    this.setStatus('Pose: ' + (btn ? btn.textContent : key) + '.');
  }

  setDetail(key) {
    const next = ChibiSkinMaker.ML_DETAILS.includes(key) ? key : 'blocky';
    if (next === this.mlDetail) { this._syncDetailButtons(); return; }
    this.pushUndo();
    this.mlDetail = next;
    this._syncDetailButtons();
    this._refreshSkinTexture();
    this.setStatus('Resolution: ' + (next === 'fine' ? 'high-res' : 'native') + '.');
  }

  _syncDetailButtons() {
    const src = this.currentSkinImage || this._defaultSkinImage;
    const hd = src ? Math.max(1, Math.round((src.width || src.naturalWidth || 64) / 64)) : 1;
    for (const b of this.detailButtons || []) {
      const off = hd > 1 && b.dataset.detail === 'blocky';
      const on = !off && b.dataset.detail === (hd > 1 ? 'fine' : this.mlDetail);
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
      b.disabled = off;
      b.classList.toggle('is-unavailable', off);
      b.title = off ? 'Native is the 64x64 look; this skin is HD, so it renders in high-res instead.'
        : b.dataset.detail === 'blocky'
          ? 'The reference look: one face pixel is 3x3'
          : 'One pixel per skin texel, HD skins are rendered larger';
    }
    setVisible(this.detailRow, this.chibiStyle === 'live');
  }

  _bustCuts() {
    if (this.chibiStyle !== 'live') return ChibiSkinMaker.BUST_CUT;
    const k = this._mlScale || 1;
    if (k === 1) return ChibiSkinMaker.ML_BUST_CUT;
    const out = {};
    for (const key of Object.keys(ChibiSkinMaker.ML_BUST_CUT)) out[key] = ChibiSkinMaker.ML_BUST_CUT[key] * k;
    return out;
  }

  setStyle(key) {
    const next = ChibiSkinMaker.STYLES.includes(key) ? key : 'classic';
    if (next === this.chibiStyle) { this._syncStyleButtons(); return; }
    this.pushUndo();
    this._outlineByStyle[this.chibiStyle] = this.outlineWidth;
    this._outlineAutoByStyle[this.chibiStyle] = this.outlineAuto;
    this._outlinePerPartByStyle[this.chibiStyle] = this.outlinePerPart;
    this.chibiStyle = next;
    this._applyOutlineWidth(this._outlineByStyle[next] || 0);
    this.outlineAuto = !!this._outlineAutoByStyle[next];
    this.outlinePerPart = !!this._outlinePerPartByStyle[next];
    if (this.outlinePerPartToggle) this.outlinePerPartToggle.checked = this.outlinePerPart;
    if (this.outlineWidthSlider) this.outlineWidthSlider.value = String(this.outlineWidth);
    if (next === 'live') {
      if (!ML_POSE_KEYS.includes(this.pose)) this.pose = 'none';
      if (!ML_ANIM_KEYS.includes(this.anim)) { this.anim = 'none'; this._animFrames = null; }
      if (!ML_VIEW_KEYS.includes(this._viewKey())) {
        this.vertView = 'none'; this.sideProfile = false; this.flatProfile = false;
      }
    }
    this._syncStyleButtons();
    this._syncPoseButtons();
    this._syncViewButtons();
    this._syncAnimButtons();
    this._writeStyleToURL();
    this._refreshSkinTexture();
    this.setStatus('Style: ' + (next === 'live' ? 'Minecraft Live' : 'Classic') + '.');
  }

  _readStyleFromURL() {
    let key = null;
    try { key = new URLSearchParams(window.location.search).get('style'); } catch { return; }
    if (!key) return;
    key = String(key).toLowerCase();
    if (!ChibiSkinMaker.STYLES.includes(key) || key === this.chibiStyle) return;
    this.setStyle(key);
    if (this.undoStack && this.undoStack.length) this.undoStack.pop();
    this.updateUndoButtons();
  }

  _writeStyleToURL() {
    try {
      const url = new URL(window.location.href);
      if (this.chibiStyle === 'classic') url.searchParams.delete('style');
      else url.searchParams.set('style', this.chibiStyle);
      window.history.replaceState({}, '', url);
    } catch { /* ignore */ }
  }

  _syncStyleButtons() {
    const live = this.chibiStyle === 'live';
    if (this.outlineAutoToggle) this.outlineAutoToggle.checked = this.outlineAuto;
    if (this.outlinePerPartToggle) this.outlinePerPartToggle.checked = this.outlinePerPart;
    this._syncOutlineColorRow();
    for (const [el, rowId, why, dead] of [
      [this.outlineSharpToggle, 'outlineSharpRow', 'Der Minecraft-Live-Stil zeichnet jedes Teil mit seiner eigenen Linie.', live && this.outlinePerPart],
      [this.layerShadowInput, 'layerShadowRow', 'Der Minecraft-Live-Stil zeichnet keinen Schatten der zweiten Ebene.', live],
    ]) {
      if (!el) continue;
      el.disabled = !!dead;
      const row = document.getElementById(rowId);
      if (row) { row.title = dead ? why : ''; row.classList.toggle('is-disabled', !!dead); }
    }
    if (this.farLegShadeToggle) this.farLegShadeToggle.checked = this.farLegShade;
    for (const b of this.styleButtons || []) {
      const on = b.dataset.style === this.chibiStyle;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
    const gate = (btns, liveAllowed, classicAllowed = null) => {
      const allowed = live ? liveAllowed : classicAllowed;
      for (const b of btns || []) {
        const off = !!allowed && !allowed.includes(b.dataset.pose || b.dataset.view || b.dataset.anim);
        b.disabled = off;
        b.classList.toggle('is-unavailable', off);
        if (off) b.title = live ? 'The Minecraft Live style does not draw this yet.'
          : 'The classic style does not draw this yet.';
        else if (b.dataset.baseTitle) b.title = b.dataset.baseTitle;
        else b.removeAttribute('title');
      }
    };
    gate(this.poseButtons, ML_POSE_KEYS, CHIBI_POSE_KEYS);
    gate(this.animButtons, ML_ANIM_KEYS);
    gate(this.viewButtons, ML_VIEW_KEYS);
    setVisible(this.styleLiveHint, live);
    this._syncDetailButtons();
  }

  _syncOutlineColorRow() {
    const row = document.getElementById('outlineColorEntry');
    if (row) setVisible(row, !this.outlineAuto);
  }

  setBust(key) {
    const want = ChibiSkinMaker.BUST_CUT[key] !== undefined ? key : false;
    const next = want;
    if (next === this.portraitView) { this._syncPoseButtons(); return; }
    this.pushUndo();
    this.portraitView = next;
    this._refreshSkinTexture();
    this._syncPoseButtons();
    this._syncViewButtons();
    this.setStatus('Bust: ' + (next ? (ChibiSkinMaker.BUST_LABEL[next] || next) : 'full body') + '.');
  }

  setLayerShadow(on) {
    const next = !!on;
    if (next === this.layerShadow) return;
    this.pushUndo();
    this.layerShadow = next;
    if (this.layerShadowInput) this.layerShadowInput.checked = next;
    this._refreshSkinTexture();
    this.setStatus('Layer shadow: ' + (next ? 'on' : 'off') + '.');
  }

  _syncPoseButtons() {
    for (const b of this.bustButtons || []) {
      const on = (b.dataset.bust === 'none') ? !this.portraitView : (b.dataset.bust === this.portraitView);
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
    for (const b of this.poseButtons || []) {
      const on = b.dataset.pose === this.pose;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
  }

  _refreshSkinTexture() {
    if (!this.ctx) return;
    const src = this.currentSkinImage || this._defaultSkinImage;
    if (!src) { this._chibiCanvas = null; this._draw(); return; }
    const skin = this._skinToCanvas(src);
    const hasAnim = !!this.anim && this.anim !== 'none' && CHIBI_ANIMS[this.anim];
    if (hasAnim) {
      this._animFrames = this._bakeAnim(skin);
      this._animIdx = 0; this._animPrev = 0;
      this._chibiCanvas = this._animFrames[0].cv;
      this._animEnsureLoop();
    } else {
      this._animFrames = null;
      this._chibiCanvas = this._composeChibi(skin);
    }
    this._draw();
    this._syncBgShapeButtons();
    this._syncDetailButtons();
    if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, this._bgPaints());
  }

  _bakeAnim(skin, clip = null, rawBox = false) {
    const A = (clip && typeof clip === 'object') ? clip : (clip && clip !== 'none') ? CHIBI_ANIMS[clip || this.anim] : CHIBI_ANIMS[this.anim];
    if (!A || !Array.isArray(A.frames) || !A.frames.length) {
      const cv = this._composeChibi(skin);
      return rawBox ? { frames: [{ cv, delay: 0 }], minX: 0, minY: 0, W: cv.width, H: cv.height } : [{ cv, delay: 0 }];
    }
    const saved = {
      pose: this.pose, portraitView: this.portraitView, vertView: this.vertView,
      sideProfile: this.sideProfile, flatProfile: this.flatProfile,
      facing: this.facing, viewSide: this.viewSide,
    };
    const raw = [];
    try {
      for (const f of A.frames) {
        this.pose = (this.chibiStyle === 'live' && f.livePose) || f.pose || 'none';
        if (f.view) {
          const V = CHIBI_VIEWS[f.view];
          this.portraitView = V.portrait || false;
          this.vertView = V.vert || 'none';
          this.sideProfile = !!V.side;
          this.flatProfile = !!V.flat;
          if (V.facing) this.facing = V.facing;
          this.viewSide = V.vs || 'front';
        }
        if (typeof f.headSwap === 'string') {
          const fam = f.headSwap === '34-left'
            ? { parts: CHIBI_PARTS_LEFT, order: CHIBI_ORDER_LEFT }
            : { parts: CHIBI_PARTS, order: CHIBI_ORDER };
          const hkeys = fam.order.filter((k) => k.startsWith('head') || k.startsWith('hat'));
          const hparts = {}; for (const k of hkeys) hparts[k] = fam.parts[k];
          this._animHeadSwap = { parts: hparts, order: hkeys };
        } else {
          this._animHeadSwap = f.headSwap || null;
        }
        const live = this.chibiStyle === 'live';
        this._animParts = live ? (f.liveParts || (f.livePose ? null : f.parts)) : (f.parts || null);
        if (f.vertParts !== undefined && this.vertView && this.vertView !== 'none') this._animParts = f.vertParts;
        const backCam = this.viewSide === 'back' && !this.sideProfile
          && !(this.vertView && this.vertView !== 'none');
        if (f.backParts !== undefined && backCam) this._animParts = f.backParts;
        this._animUnder = f.under || null;
        this._animOver = f.over || null;
        this._animPadX = A.padX || 0;
        this._animPadY = A.padY || 0;
        this._animShadeRow = !!A.shadeRow;
        this._animNoCrop = true;
        const cvF = this._composeChibi(skin);
        const vertCam = this.vertView && this.vertView !== 'none';
        raw.push({ cv: cvF, shift: this._lastComposeShift, dx: f.dx || 0,
          dy: (vertCam && f.vertDy !== undefined) ? f.vertDy : (f.dy || 0),
          ax: (live && f.liveAx !== undefined) ? f.liveAx : f.ax,
          delay: (live && f.liveD !== undefined) ? f.liveD : f.d });
      }
    } finally {
      this._animParts = null; this._animUnder = null; this._animOver = null; this._animPadX = 0; this._animPadY = 0; this._animNoCrop = false; this._animHeadSwap = null; this._animShadeRow = false;
      Object.assign(this, saved);
    }
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const xOf = (r) => (r.ax !== undefined ? -r.ax
      : (A.anchor === 'center' ? -r.cv.width / 2 : -r.shift)) + r.dx;
    for (const r of raw) {
      minX = Math.min(minX, xOf(r)); maxX = Math.max(maxX, xOf(r) + r.cv.width);
      minY = Math.min(minY, r.dy); maxY = Math.max(maxY, r.dy + r.cv.height);
    }
    minX = Math.floor(minX); minY = Math.floor(minY);
    const W = Math.ceil(maxX) - minX, H = Math.ceil(maxY) - minY;
    const boxed = raw.map((r) => {
      const b = document.createElement('canvas'); b.width = W; b.height = H;
      const bc = b.getContext('2d'); bc.imageSmoothingEnabled = false;
      bc.drawImage(r.cv, Math.round(xOf(r) - minX), Math.round(r.dy - minY));
      return { cv: b, delay: r.delay };
    });
    if (rawBox) return { frames: boxed, minX, minY, W, H };
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (const fr of boxed) {
      const d = fr.cv.getContext('2d').getImageData(0, 0, W, H).data;
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 0) {
        if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
      }
    }
    if (x1 < 0) return boxed;
    return boxed.map((fr) => {
      const t = document.createElement('canvas'); t.width = x1 - x0 + 1; t.height = y1 - y0 + 1;
      const tc = t.getContext('2d'); tc.imageSmoothingEnabled = false;
      tc.drawImage(fr.cv, x0, y0, t.width, t.height, 0, 0, t.width, t.height);
      return { cv: t, delay: fr.delay };
    });
  }

  _animEnsureLoop() {
    if (this._animRAF || this._animHold) return;
    const tick = (t) => {
      if (!this._animFrames || !CHIBI_ANIMS[this.anim] || this._animHold) { this._animRAF = 0; return; }
      this._animRAF = requestAnimationFrame(tick);
      if (!this._animPrev) { this._animPrev = t; return; }
      const speed = this.gifSpeedValue || 1;
      const cur = this._animFrames[this._animIdx % this._animFrames.length];
      if (t - this._animPrev >= cur.delay / speed) {
        this._animPrev = t;
        this._animIdx = (this._animIdx + 1) % this._animFrames.length;
        this._chibiCanvas = this._animFrames[this._animIdx].cv;
        this._draw();
      }
    };
    this._animRAF = requestAnimationFrame(tick);
  }

  setAnim(key) {
    if (key !== 'none' && this.chibiStyle !== 'live') this.setStyle('live');
    if (this.chibiStyle === 'live' && !ML_ANIM_KEYS.includes(key)) return;
    if (key !== 'none' && !CHIBI_ANIMS[key]) return;
    if (key === this.anim) { this._syncAnimButtons(); return; }
    this.pushUndo();
    this.anim = key;
    if (key !== 'none' && this.pose !== 'none') { this.pose = 'none'; this._syncPoseButtons(); }
    this._refreshSkinTexture();
    this._syncAnimButtons();
    this._updateGifInfo();
    this.setStatus(key === 'none' ? 'Animation off.' : 'Animation: ' + CHIBI_ANIMS[key].label + ' - export it via the GIF panel.');
  }

  _syncAnimButtons() {
    for (const b of this.animButtons || []) {
      const on = b.dataset.anim === this.anim;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    }
  }

  _skinToCanvas(src) {
    const w = src.width || src.naturalWidth, h = src.height || src.naturalHeight;
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const c = cv.getContext('2d', { willReadFrequently: true }); c.imageSmoothingEnabled = false; c.drawImage(src, 0, 0);
    return this.barebones ? this._barebonesCanvas(cv) : cv;
  }

  _composeLive(skin) {
    const hd = Math.max(1, Math.round((skin.width || 64) / 64));
    const detail = hd > 1 ? 'fine' : this.mlDetail;
    const K = detail === 'fine' ? hd : 1;
    this._mlScale = K;
    const PROUD = K;
    const OFF = PROUD + K + (this._animNoCrop ? ML_ANIM_ROOM * K : 0);
    const back = this.viewSide === 'back';
    const camKey = (this.vertView === 'top' || this.vertView === 'bottom') ? this.vertView
      : this.sideProfile ? (this.facing === 'left' ? 'side-left' : 'side-right')
      : this.flatProfile ? (back ? 'back-flat' : 'front-flat')
      : (back ? 'back34-' : 'front-') + (this.facing === 'left' ? 'left' : 'right');
    const poseKey = mlPoseKeyFor(this.pose, camKey);
    const pose = ML_POSES[poseKey] || null;
    const cam = mlCameraTable(mlPartsFor(poseKey), mlGroupsFor(poseKey), camKey);
    const parts = cam.parts;
    const poseFellBack = !!(ML_POSES[this.pose] && ML_POSES[this.pose].placeParts
      && (!pose || !pose.placeParts));
    const props = poseFellBack ? [] : mlPropsFor(pose, camKey);
    let groups = cam.groups;
    if (!(ML_CAMERAS[camKey] || {}).table
      && ((this._animUnder && this._animUnder.length) || (this._animOver && this._animOver.length))) {
      const swap = (ML_CAMERAS[camKey] || {}).swapLimb;
      const name = (k) => (swap ? mlSwapSide(k) : k);
      const under = new Set((this._animUnder || []).map(name));
      const over = new Set((this._animOver || []).map(name));
      const moved = groups.filter((g) => under.has(g.key) || over.has(g.key));
      const rest = groups.filter((g) => !moved.includes(g));
      const at = rest.findIndex((g) => g.key === 'head');
      if (moved.length && at >= 0) {
        const bodyAt = groups.findIndex((g) => g.key === 'body');
        const overs = moved.filter((g) => over.has(g.key))
          .map((g) => ({ ...g, clipBody: bodyAt >= 0 && groups.indexOf(g) < bodyAt }));
        groups = [...rest.slice(0, at), ...moved.filter((g) => under.has(g.key)), rest[at], ...overs,
          ...rest.slice(at + 1)];
      }
    }
    const wantBodyMask = groups.some((g) => g.clipBody);
    let bodyMask = null;
    let pd = (pose && pose.pad) || [0, 0, 0, 0];
    if ((ML_CAMERAS[camKey] || {}).mirror) pd = [pd[1], pd[0], pd[2], pd[3]];
    const padL = pd[0] * K, padR = pd[1] * K, padT = pd[2] * K, padB = pd[3] * K;
    this._lastComposeShift = padL;
    let jslide = 0;
    let aox = 0, aoy = 0, aShade = 1;
    const waveKey = (ML_CAMERAS[camKey] || {}).swapLimb ? 'lArm' : 'rArm';
    const stabKey = (ML_CAMERAS[camKey] || {}).swapLimb ? 'rArm' : 'lArm';
    const dOf = (p) => [p.dest[0] * K + OFF + padL + (INK - K) * (p.xjoint || 0) + aox,
      p.dest[1] * K + OFF + padT + jslide + aoy, p.dest[2] * K, p.dest[3] * K];
    const slim = this.currentModelType === 'alex';
    const cv = document.createElement('canvas');
    cv.width = ML_SPRITE.w * K + OFF * 2 + padL + padR;
    cv.height = ML_SPRITE.h * K + OFF * 2 + padT + padB;
    const c = cv.getContext('2d', { willReadFrequently: true }); c.imageSmoothingEnabled = false;
    const sctx = skin.getContext('2d');
    const isVis = (n) => n == null || this.partVisibility[n] !== false;
    const unlit = this.currentMaterial === 'flat';
    const aoOn = this.shading !== 'off' && this.shadingStrength > 0 && !unlit && !(ML_CAMERAS[camKey] || {}).noAo;
    const aoMul = this._shadeMul(ML_AO_SHADE);
    const isPlan = (ML_CAMERAS[camKey] || {}).table === 'plan';
    const INK = this._perPartOutline() ? Math.max(0, Math.min(10, this.outlineWidth | 0)) * K : 0;
    const flatInk = this.outlineAuto ? null : (() => {
      const h = String(this.outlineColor || '#000000').replace('#', '');
      const n = parseInt(h.length === 3 ? h.replace(/./g, (ch) => ch + ch) : h.padEnd(6, '0'), 16) || 0;
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    })();
    const bust = this.portraitView;
    const baseCut = this._bustCuts()[bust] || 0;
    const cut = baseCut ? baseCut + OFF + padT : 0;
    const headOnly = bust === 'head';

    for (const group of groups) {
      if (headOnly && group.key !== 'head') continue;
      jslide = (INK - K) * (group.joint || 0);
      const aoOwn = !poseFellBack && this._animParts && this._animParts[group.key];
      const aoStab = !poseFellBack && this._animParts && group.key === stabKey && this._animParts.stabArm;
      const ao = aoOwn
        || (!poseFellBack && this._animParts && group.key === waveKey ? this._animParts.waveArm : null)
        || aoStab || null;
      aox = ao ? ao[0] * K * ((aoStab && ao === aoStab && cam.mirror) ? -1 : 1) : 0;
      aoy = ao ? ao[1] * K : 0;
      aShade = (ao && ao[2] && !unlit) ? this._shadeMul(ao[2]) : 1;
      const live = [];
      for (const key of group.parts) {
        const p = parts[key];
        if (!p) continue;
        if (group.clipBody && (p.face === 'right' || p.face === 'left')) continue;
        if (p.hat && this.headOverlay === 'off') continue;
        if (p.clothing && this.bodyOverlay === 'off') continue;
        const [baseName, overName] = this._partNames(key);
        const baseVis = isVis(baseName);
        const overVis = !!(p.base && p.over) && isVis(overName) && this.bodyOverlay !== 'off';
        if (p.base && p.over ? (!baseVis && !overVis) : !baseVis) continue;
        live.push({ key, p, baseVis, overVis });
      }
      if (!live.length) continue;

      const gprops = props.length ? props.filter((q) => q.group === group.key) : [];
      const propRects = [];
      for (const q of gprops) {
        const r = mlPropCanvas(q.sprite, q.flipX, q.flipY, K);
        if (!r) continue;
        propRects.push({ cv: r.cv,
          x: q.dest[0] * K + OFF + padL + aox,
          y: q.dest[1] * K + OFF + padT + jslide + aoy });
      }

      let gx0 = Infinity, gy0 = Infinity, gx1 = -Infinity, gy1 = -Infinity;
      for (const { p } of live) {
        const d = dOf(p);
        if (d[0] < gx0) gx0 = d[0];
        if (d[1] < gy0) gy0 = d[1];
        if (d[0] + d[2] > gx1) gx1 = d[0] + d[2];
        if (d[1] + d[3] > gy1) gy1 = d[1] + d[3];
      }
      for (const q of propRects) {
        if (q.x < gx0) gx0 = q.x;
        if (q.y < gy0) gy0 = q.y;
        if (q.x + q.cv.width > gx1) gx1 = q.x + q.cv.width;
        if (q.y + q.cv.height > gy1) gy1 = q.y + q.cv.height;
      }
      const pad = Math.max(K, INK);
      const gw = gx1 - gx0 + 2 * pad, gh = gy1 - gy0 + 2 * pad;
      const gcv = document.createElement('canvas'); gcv.width = gw; gcv.height = gh;
      const gc = gcv.getContext('2d', { willReadFrequently: true }); gc.imageSmoothingEnabled = false;

      for (const { p, baseVis, overVis } of live) {
        const d = dOf(p);
        let shade = aShade;
        if (!unlit) {
          if (p.side) shade *= this._shadeMul(ML_SIDE_SHADE);
          const farLegDim = p.shade === ML_FAR_SHADE && (p.box === 'lLeg' || p.box === 'rLeg') && !isPlan;
          if (p.shade && !(farLegDim && !this.farLegShade)) shade *= this._shadeMul(p.shade);
        }
        const out = this._sampleBlit(sctx, p, hd, slim, baseVis, overVis, d[2], d[3]);
        if (shade < 1) {
          for (let i = 0; i < out.data.length; i += 4) {
            out.data[i] *= shade; out.data[i + 1] *= shade; out.data[i + 2] *= shade;
          }
        }
        const t = document.createElement('canvas'); t.width = d[2]; t.height = d[3];
        t.getContext('2d').putImageData(out, 0, 0);
        gc.drawImage(t, d[0] - gx0 + pad, d[1] - gy0 + pad);
      }

      const gd = gc.getImageData(0, 0, gw, gh), G = gd.data;
      const ink = new ImageData(gw, gh), IK = ink.data;
      if (INK > 0)
      for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4;
        if (G[i + 3] >= 128) continue;
        let si = -1;
        for (let r = 1; r <= INK && si < 0; r++) {
          const ring = [[-r, 0], [r, 0], [0, -r], [0, r]];
          for (let d = 1; d <= r; d++) ring.push([-r, -d], [-r, d], [r, -d], [r, d], [-d, -r], [d, -r], [-d, r], [d, r]);
          for (const [dx, dy] of ring) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
            const j = (ny * gw + nx) * 4;
            if (G[j + 3] >= 128) { si = j; break; }
          }
        }
        if (si < 0) continue;
        const e = flatInk || mlEdgeColor(G[si], G[si + 1], G[si + 2]);
        IK[i] = e[0]; IK[i + 1] = e[1]; IK[i + 2] = e[2]; IK[i + 3] = 255;
      }
      const icv = document.createElement('canvas'); icv.width = gw; icv.height = gh;
      const ic = icv.getContext('2d'); ic.imageSmoothingEnabled = false;
      ic.putImageData(ink, 0, 0);
      ic.drawImage(gcv, 0, 0);
      for (const q of propRects) ic.drawImage(q.cv, q.x - gx0 + pad, q.y - gy0 + pad);
      if (group.clipBody && bodyMask) {
        const gi = ic.getImageData(0, 0, gw, gh), GD = gi.data;
        for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
          const ax = x + gx0 - pad, ay = y + gy0 - pad;
          if (ax < 0 || ay < 0 || ax >= cv.width || ay >= cv.height) continue;
          if (bodyMask[ay * cv.width + ax]) GD[(y * gw + x) * 4 + 3] = 0;
        }
        ic.putImageData(gi, 0, 0);
      }
      c.drawImage(icv, gx0 - pad, gy0 - pad);
      if (wantBodyMask && group.key === 'body') {
        bodyMask = bodyMask || new Uint8Array(cv.width * cv.height);
        const gi = ic.getImageData(0, 0, gw, gh).data;
        for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
          if (gi[(y * gw + x) * 4 + 3] < 128) continue;
          const ax = x + gx0 - pad, ay = y + gy0 - pad;
          if (ax >= 0 && ay >= 0 && ax < cv.width && ay < cv.height) bodyMask[ay * cv.width + ax] = 1;
        }
      }

      if (aoOn && (group.key === 'head' || group.key === 'body')) {
        const gi = ic.getImageData(0, 0, gw, gh).data;
        const bottom = new Int16Array(cv.width).fill(-1);
        for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
          if (gi[(y * gw + x) * 4 + 3] < 128) continue;
          const ax = x + gx0 - pad, ay = y + gy0 - pad;
          if (ax >= 0 && ax < cv.width && ay > bottom[ax]) bottom[ax] = ay;
        }
        const AO = c.getImageData(0, 0, cv.width, cv.height), DA = AO.data;
        for (let x = 0; x < cv.width; x++) {
          const bx = bottom[x];
          if (bx < 0) continue;
          for (let y = bx + 1; y <= bx + K && y < cv.height; y++) {
            const i = (y * cv.width + x) * 4;
            if (DA[i + 3] === 0) continue;
            DA[i] *= aoMul; DA[i + 1] *= aoMul; DA[i + 2] *= aoMul;
          }
        }
        c.putImageData(AO, 0, 0);
      }
    }

    if (cut > 0 && cv.height > cut) c.clearRect(0, cut, cv.width, cv.height - cut);
    return this._finishSprite(c, cv);
  }

  _sampleBlit(sctx, p, hd, slim, baseVis, overVis, dw, dh) {
    const s = ((slim && p.slimBase) || p.base || p.src).slice();
    if (p.arm && slim) s[2] = 3;
    if (p.slimShiftX && slim) s[0] -= 1;
    if (this.halfHeightUVs && s[3] === 12) s[3] = 8;
    const srcW = s[2] * hd, srcH = s[3] * hd;
    const sd = baseVis ? sctx.getImageData(s[0] * hd, s[1] * hd, srcW, srcH) : new ImageData(srcW, srcH);
    if (overVis) {
      const ov = ((slim && p.slimOver) || p.over).slice();
      if (p.arm && slim) ov[2] = 3;
      if (p.slimShiftX && slim) ov[0] -= 1;
      if (this.halfHeightUVs && ov[3] === 12) ov[3] = 8;
      const od = sctx.getImageData(ov[0] * hd, ov[1] * hd, srcW, srcH);
      for (let i = 0; i < sd.data.length; i += 4) if (od.data[i + 3] >= 128) {
        sd.data[i] = od.data[i]; sd.data[i + 1] = od.data[i + 1]; sd.data[i + 2] = od.data[i + 2];
        sd.data[i + 3] = Math.max(sd.data[i + 3], od.data[i + 3]);
      }
    }
    const out = new ImageData(dw, dh);
    const blocky = this.chibiStyle === 'live' && this.mlDetail !== 'fine' && hd === 1 && p.block;
    const bx = blocky ? p.block[0] : 1, by = blocky ? p.block[1] : 1;
    const cw = Math.max(1, Math.round(dw / bx)), ch = Math.max(1, Math.round(dh / by));
    const rot = p.rot || 0, turned = rot === 90 || rot === 270;
    const uw = turned ? ch : cw, uh = turned ? cw : ch;
    const xc = symNearest(srcW, uw);
    const yc = (p.ymap && p.ymap.length === uh)
      ? p.ymap.map((t) => Math.min(srcH - 1, Math.round(t * srcH / 12)))
      : nearestMap(srcH, uh);
    for (let dy = 0; dy < dh; dy++) {
      const cy = Math.min(ch - 1, (dy / by) | 0);
      for (let dx = 0; dx < dw; dx++) {
        const cx = Math.min(cw - 1, (dx / bx) | 0);
        let ux, uy;
        if (rot === 180) { ux = cw - 1 - cx; uy = ch - 1 - cy; }
        else if (rot === 90) { ux = cy; uy = uh - 1 - cx; }
        else if (rot === 270) { ux = uw - 1 - cy; uy = cx; }
        else { ux = cx; uy = cy; }
        if (p.mirrorX) ux = uw - 1 - ux;
        const si = (yc[uy] * srcW + xc[ux]) * 4, oi = (dy * dw + dx) * 4;
        out.data[oi] = sd.data[si]; out.data[oi + 1] = sd.data[si + 1];
        out.data[oi + 2] = sd.data[si + 2]; out.data[oi + 3] = sd.data[si + 3];
      }
    }
    return out;
  }

  _composeChibi(skin) {
    if (this.chibiStyle === 'live') return this._composeLive(skin);
    const hd = Math.max(1, Math.round((skin.width || 64) / 64));
    const slim = this.currentModelType === 'alex';
    const cv = document.createElement('canvas');
    cv.width = CHIBI_SPRITE.w; cv.height = CHIBI_SPRITE.h;
    const c = cv.getContext('2d'); c.imageSmoothingEnabled = false;
    const bust = this.portraitView;
    const cut = this._bustCuts()[bust] || 0;
    const portrait = cut > 0;
    const headOnly = bust === 'head';
    const leftF = this.facing === 'left';
    const back = this.viewSide === 'back';
    const flat = this.flatProfile;
    const side = this.sideProfile;
    const vert = this.vertView === 'top' || this.vertView === 'bottom';
    let parts, order;
    if (vert) {
      parts = this.vertView === 'top' ? CHIBI_PARTS_TOP : CHIBI_PARTS_BOTTOM;
      order = this.vertView === 'top' ? CHIBI_ORDER_TOP : CHIBI_ORDER_BOTTOM;
    } else if (side) {
      parts = leftF ? CHIBI_PARTS_SIDE_LEFT : CHIBI_PARTS_SIDE_RIGHT;
      order = leftF ? CHIBI_ORDER_SIDE_LEFT : CHIBI_ORDER_SIDE_RIGHT;
    } else if (flat) {
      parts = back ? CHIBI_PARTS_BACK : CHIBI_PARTS_FLAT;
      order = back ? CHIBI_ORDER_BACK : CHIBI_ORDER_FLAT;
    } else if (back) {
      parts = leftF ? CHIBI_PARTS_BACK_LEFT : CHIBI_PARTS_BACK_RIGHT;
      order = leftF ? CHIBI_ORDER_BACK_LEFT : CHIBI_ORDER_BACK_RIGHT;
    } else {
      parts = leftF ? CHIBI_PARTS_LEFT : CHIBI_PARTS;
      order = leftF ? CHIBI_ORDER_LEFT : CHIBI_ORDER;
    }
    const stripsRight = !flat && !side && !vert && (leftF !== back);
    let poseTab = null;
    if (CHIBI_POSES[this.pose]) {
      const P = CHIBI_POSES[this.pose];
      if (vert) poseTab = this.vertView === 'top' ? P.top : P.bottom;
      else if (side) poseTab = leftF ? P.sideLeft : P.sideRight;
      else if (flat) poseTab = back ? P.flatBack : P.flat;
      else if (back) poseTab = leftF ? P.backLeft : P.backRight;
      else poseTab = leftF ? P.left : P.right;
    }
    const poseFellBack = this.pose !== 'none' && !!CHIBI_POSES[this.pose] && !poseTab;
    if (poseTab) {
      const isHead = (k) => { const n = this._partNames(k)[0]; return n === 'Kopf' || n === 'Hut-Schicht'; };
      const headKeys = order.filter(isHead);
      const keep = {};
      for (const k of headKeys) keep[k] = parts[k];
      if (poseTab.headDx || poseTab.headDy) for (const k of headKeys) {
        const h = keep[k]; if (!h) continue;
        const hdx = poseTab.headDx || 0, hdy = poseTab.headDy || 0;
        const mv = (d) => d && [d[0] + hdx, d[1] + hdy, d[2], d[3]];
        keep[k] = { ...h, dest: mv(h.dest) };
        if (h.wideDest) keep[k].wideDest = mv(h.wideDest);
      }
      parts = { ...keep, ...poseTab.parts };
      order = isHead(order[0]) ? [...headKeys, ...poseTab.order] : [...poseTab.order, ...headKeys];
      if (poseTab.over) order = [...order, ...poseTab.over];
      cv.width = poseTab.canvasW;
      c.imageSmoothingEnabled = false;
    }
    if (this._animHeadSwap) {
      const dropPre = this._animHeadSwap.drop || ['Kopf', 'Hut-Schicht'];
      order = order.filter((k) => !dropPre.some((pre) => k.startsWith(pre)));
      parts = { ...parts, ...this._animHeadSwap.parts };
      order = [...order, ...this._animHeadSwap.order];
    }
    const xShift = (poseTab ? poseTab.shift : 0) + (this._animPadX || 0);
    const padT = this._animPadY || 0;
    this._lastComposeShift = xShift;
    const poseProps = (poseTab && poseTab.props) || [];
    const drawProp = (q) => {
      const r = mlPropCanvas(q.sprite, q.flipX, q.flipY, 1);
      if (!r) return;
      const g = (this._animParts && q.group) ? this._animParts[q.group] : null;
      const gx = (g && q.group === 'stabArm' && poseTab && poseTab.mirrored) ? -g[0] : (g ? g[0] : 0);
      c.drawImage(r.cv, q.dest[0] + xShift + gx, q.dest[1] + (g ? g[1] : 0) + padT);
    };
    const headBottomCol = new Int16Array(cv.width + (this._animPadX || 0) * 2 + 8).fill(-1);
    const maskW = cv.width + (this._animPadX || 0) * 2 + 8, maskH = cv.height + padT + 8;
    const overMask = this.layerShadow ? new Uint8Array(maskW * maskH) : null;
    if (this._animPadX) cv.width += this._animPadX * 2;
    if (padT) cv.height += padT;
    const sctx = skin.getContext('2d');
    const isVis = (n) => n == null || this.partVisibility[n] !== false;
    const unlit = this.currentMaterial === 'flat';

    const inkW = Math.max(0, Math.min(10, this.outlineWidth | 0));
    const perPartInk = this._perPartOutline() && inkW > 0;
    const inkKeyOf = (k) => {
      const n = this._partNames(k)[0];
      if (!n) return 'other';
      return n === 'Hut-Schicht' ? 'Kopf' : n.replace(' Schicht', '');
    };
    const inkIdx = {}, inkLast = {};
    let inkTick = 0;
    const inkOff = {};
    if (perPartInk) {
      const box = {};
      for (const key of order) {
        const q = parts[key]; if (!q || !q.dest) continue;
        if (/Hid/.test(key)) continue;
        const k = inkKeyOf(key);
        const dd = (this.currentModelType !== 'alex' && q.wideDest) ? q.wideDest : q.dest;
        const bx = box[k] || (box[k] = [Infinity, Infinity, -Infinity, -Infinity]);
        bx[0] = Math.min(bx[0], dd[0]); bx[1] = Math.min(bx[1], dd[1]);
        bx[2] = Math.max(bx[2], dd[0] + dd[2] - 1); bx[3] = Math.max(bx[3], dd[1] + dd[3] - 1);
      }
      const keys = Object.keys(box);
      const band = {}; let bi = 0, bottom = -Infinity;
      for (const k of keys) if (k === 'Kopf') band[k] = 0;
      for (const k of keys.filter((k2) => k2 !== 'Kopf').sort((a, b) => box[a][1] - box[b][1])) {
        if (box[k][1] > bottom) { bi++; bottom = box[k][3]; } else bottom = Math.max(bottom, box[k][3]);
        band[k] = bi;
      }
      if (poseTab && poseTab.headInline && bi >= 1 && band.Kopf === 0) band.Kopf = 1;
      let maxCol = 0;
      const col = {};
      for (let bnd = 0; bnd <= bi; bnd++) {
        let ci = -1, right = -Infinity;
        for (const k of keys.filter((k2) => band[k2] === bnd).sort((x, y) => box[x][0] - box[y][0])) {
          if (box[k][0] >= right) { ci++; right = box[k][2]; } else right = Math.max(right, box[k][2]);
          col[k] = ci; if (ci > maxCol) maxCol = ci;
        }
      }
      const rows = {};
      for (const k of keys) (rows[band[k]] = rows[band[k]] || []).push(k);
      const dx = {};
      for (const r of Object.keys(rows)) {
        const ks = rows[r];
        let o0 = Infinity, o1 = -Infinity, n0 = Infinity, n1 = -Infinity;
        for (const k of ks) {
          const c0 = inkW * (col[k] || 0);
          o0 = Math.min(o0, box[k][0]); o1 = Math.max(o1, box[k][2]);
          n0 = Math.min(n0, box[k][0] + c0); n1 = Math.max(n1, box[k][2] + c0);
        }
        const shift = Math.round(((o0 + o1) - (n0 + n1)) / 2);
        for (const k of ks) dx[k] = inkW * (col[k] || 0) + shift;
      }
      let padL = 0, right = 0;
      for (const k of keys) { padL = Math.min(padL, dx[k]); right = Math.max(right, box[k][2] + dx[k]); }
      padL = -Math.min(0, padL);
      for (const k of keys) inkOff[k] = [dx[k] + padL, inkW * (band[k] || 0)];
      const growX = Math.max(0, right + padL - (cv.width - 1)), growY = inkW * bi;
      if (growX || growY) {
        cv.width += growX; cv.height += growY;
        c.imageSmoothingEnabled = false;
      }
    }
    const offOf = (limb) => inkOff[limb] || [0, 0];
    const hiddenCovered = (() => {
      if (!perPartInk) return null;
      const out = new Set();
      for (let i = 0; i < order.length; i++) {
        const key = order[i], q = parts[key];
        if (!q || !q.dest || !/Hid/.test(key)) continue;
        const [hx, hy, hw, hh] = q.dest;
        const cov = new Uint8Array(hw * hh);
        for (let j = i + 1; j < order.length; j++) {
          const o = parts[order[j]]; if (!o || !o.dest) continue;
          if (!isVis(this._partNames(order[j])[0])) continue;
          const [ox2, oy2, ow2, oh2] = o.dest;
          for (let yy = Math.max(hy, oy2); yy < Math.min(hy + hh, oy2 + oh2); yy++)
            for (let xx = Math.max(hx, ox2); xx < Math.min(hx + hw, ox2 + ow2); xx++)
              cov[(yy - hy) * hw + (xx - hx)] = 1;
        }
        if (cov.every((v) => v === 1)) out.add(key);
      }
      return out;
    })();
    const owner = perPartInk ? new Int16Array(cv.width * cv.height).fill(-1) : null;
    for (const key of order) {
      const p = parts[key];
      if (p.hat && this.headOverlay === 'off') continue;
      if (p.clothing && this.bodyOverlay === 'off') continue;
      if (perPartInk && hiddenCovered && hiddenCovered.has(key)) continue;
      const [baseName, overName] = this._partNames(key);
      if (headOnly && baseName !== 'Kopf' && baseName !== 'Hut-Schicht') continue;
      const baseVis = isVis(baseName);
      const overVis = !!(p.base && p.over) && isVis(overName) && this.bodyOverlay !== 'off';
      if (p.base && p.over ? (!baseVis && !overVis) : !baseVis) continue;
      const s = ((slim && p.slimBase) || p.base || p.src).slice();
      if (p.arm && slim) s[2] = 3;
      if (p.slimShiftX && slim) s[0] -= 1;
      if (this.halfHeightUVs && s[3] === 12) s[3] = 8;
      const d = (!slim && p.wideDest) ? p.wideDest : p.dest;
      const rot = p.rot || 0;
      const farLegDim = p.shade === CHIBI_FAR_SHADE && (key.startsWith('rLeg') || key.startsWith('lLeg'));
      const pShade = (farLegDim && !this.farLegShade) ? 0 : p.shade;
      let shade = unlit ? 1 : (pShade ? this._shadeMul(pShade) : (p.side ? this._shadeMul(CHIBI_SIDE_SHADE) : 1));
      let aox = 0, aoy = 0;
      if (this._animParts && !poseFellBack) {
        for (const g in this._animParts) {
          if (CHIBI_ANIM_GROUPS[g].some((pre) => key.startsWith(pre))) {
            aox = this._animParts[g][0]; aoy = this._animParts[g][1];
            if (g === 'stabArm' && poseTab && poseTab.mirrored) aox = -aox;
            if (this._animParts[g][2] && !unlit) shade *= this._shadeMul(this._animParts[g][2]);
            break;
          }
        }
      }
      const t = document.createElement('canvas'); t.width = d[2]; t.height = d[3];
      const tc = t.getContext('2d');
      const srcW = s[2] * hd, srcH = s[3] * hd;
      const sd = baseVis ? sctx.getImageData(s[0] * hd, s[1] * hd, srcW, srcH) : new ImageData(srcW, srcH);
      let srcIsOver = null;
      if (overVis) {
        const ov = ((slim && p.slimOver) || p.over).slice(); if (p.arm && slim) ov[2] = 3;
        if (p.slimShiftX && slim) ov[0] -= 1;
        if (this.halfHeightUVs && ov[3] === 12) ov[3] = 8;
        const od = sctx.getImageData(ov[0] * hd, ov[1] * hd, srcW, srcH);
        if (this.layerShadow) srcIsOver = new Uint8Array(srcW * srcH);
        for (let i = 0; i < sd.data.length; i += 4) if (od.data[i + 3] >= 128) {
          sd.data[i] = od.data[i]; sd.data[i + 1] = od.data[i + 1]; sd.data[i + 2] = od.data[i + 2];
          sd.data[i + 3] = Math.max(sd.data[i + 3], od.data[i + 3]);
          if (srcIsOver) srcIsOver[i >> 2] = 1;
        }
      }
      const out = tc.createImageData(d[2], d[3]);
      const uw = (rot === 90 || rot === 270) ? d[3] : d[2];
      const uh = (rot === 90 || rot === 270) ? d[2] : d[3];
      let xc = symNearest(srcW, uw);
      const yc = (s[3] === 12 && uh === 10)
        ? CHIBI_BAND_YMAP.map(t => Math.min(srcH - 1, t * hd + (hd >> 1)))
        : nearestMap(srcH, uh);
      if (p.mirrorMap) { const m = xc; xc = new Array(uw); for (let i = 0; i < uw; i++) xc[i] = srcW - 1 - m[uw - 1 - i]; }
      if (p.mirrorX) xc = xc.slice().reverse();
      for (let dy = 0; dy < d[3]; dy++) {
        for (let dx = 0; dx < d[2]; dx++) {
          let ux, uy;
          if (rot === 180) { ux = d[2] - 1 - dx; uy = d[3] - 1 - dy; }
          else if (rot === 90) { ux = dy; uy = uh - 1 - dx; }
          else if (rot === 270) { ux = uw - 1 - dy; uy = dx; }
          else { ux = dx; uy = dy; }
          const si = (yc[uy] * srcW + xc[ux]) * 4, oi = (dy * d[2] + dx) * 4;
          out.data[oi] = sd.data[si]; out.data[oi + 1] = sd.data[si + 1];
          out.data[oi + 2] = sd.data[si + 2]; out.data[oi + 3] = sd.data[si + 3];
          if (overMask && sd.data[si + 3] >= 128) {
            const mx = d[0] + xShift + aox + dx, my = d[1] + aoy + dy;
            if (mx >= 0 && mx < maskW && my >= 0 && my < maskH) {
              overMask[my * maskW + mx] = (p.hat || (srcIsOver && srcIsOver[si >> 2])) ? 2 : 1;
            }
          }
        }
      }
      if (key.startsWith('head') || key.startsWith('hat')) {
        const cx = d[0] + xShift + aox, cy = d[1] + aoy;
        for (let rx = 0; rx < d[2]; rx++) {
          const ax = cx + rx; if (ax < 0 || ax >= headBottomCol.length) continue;
          for (let ry = d[3] - 1; ry >= 0; ry--) {
            if (out.data[(ry * d[2] + rx) * 4 + 3] >= 128) {
              if (cy + ry > headBottomCol[ax]) headBottomCol[ax] = cy + ry;
              break;
            }
          }
        }
      }
      tc.putImageData(out, 0, 0);
      tc.globalCompositeOperation = 'source-atop';
      tc.fillStyle = 'rgba(0,0,0,' + (1 - shade).toFixed(3) + ')';
      tc.fillRect(0, 0, d[2], d[3]);
      if (p.aoTop && !unlit) {
        tc.fillStyle = 'rgba(0,0,0,' + (1 - this._shadeMul(p.aoTop)).toFixed(3) + ')';
        tc.fillRect(0, 0, d[2], 1);
      }
      const jo = perPartInk ? offOf(inkKeyOf(key)) : [0, 0];
      const px0 = d[0] + xShift + aox + jo[0], py0 = d[1] + aoy + jo[1] + padT;
      c.drawImage(t, px0, py0);
      if (perPartInk) {
        const gk = inkKeyOf(key);
        if (inkIdx[gk] === undefined) inkIdx[gk] = Object.keys(inkIdx).length;
        inkLast[gk] = ++inkTick;
        const gi = inkIdx[gk];
        for (let yy = 0; yy < d[3]; yy++) {
          const ty = py0 + yy; if (ty < 0 || ty >= cv.height) continue;
          for (let xx = 0; xx < d[2]; xx++) {
            const tx = px0 + xx; if (tx < 0 || tx >= cv.width) continue;
            if (out.data[(yy * d[2] + xx) * 4 + 3] >= 128) owner[ty * cv.width + tx] = gi;
          }
        }
      }
      for (const q of poseProps) if (q.after === key) drawProp(q);
    }
    for (const q of poseProps) if (!q.after) drawProp(q);
    if (overMask && !unlit) {
      const m = this._shadeMul(0.82);
      if (m < 1) {
        const IM = c.getImageData(0, 0, cv.width, cv.height), D = IM.data;
        for (let y = 0; y < cv.height; y++) {
          for (let x = 0; x < cv.width; x++) {
            if (overMask[y * maskW + x] !== 1) continue;
            if (y === 0 || overMask[(y - 1) * maskW + x] !== 2) continue;
            const i = (y * cv.width + x) * 4;
            if (D[i + 3] === 0) continue;
            D[i] *= m; D[i + 1] *= m; D[i + 2] *= m;
          }
        }
        c.putImageData(IM, 0, 0);
      }
    }
    const aoShoulder = !poseTab || this.pose === 'waving' || this.pose === 'tpose' || this.pose === 'sitting' || this.pose === 'dab'
      || this.pose === 'handshake' || this.pose === 'crouch' || (back && this.pose === 'zombie');
    const aoCrease = !poseTab || this.pose === 'sitting'
      || this.pose === 'tpose' || this.pose === 'handshake' || this.pose === 'waving';
    const aoFarLeg = this.farLegShade && (!poseTab || this.pose === 'zombie' || this.pose === 'handshake' || this.pose === 'waving' || this.pose === 'tpose' || this.pose === 'dab');
    const litHeadOn = flat && !back && !this._animShadeRow;
    const shoulderRow = !vert && !headOnly && !litHeadOn
      && ((flat || side) ? true : aoShoulder);
    const aoRects = !flat && !side && !vert && !headOnly;
    if (this.shading !== 'off' && this.shadingStrength > 0 && !unlit
        && (shoulderRow || (aoRects && (aoCrease || aoFarLeg)))) {
      const AO = c.getImageData(0, 0, cv.width, cv.height), DA = AO.data, WA = cv.width;
      const HA = cv.height;
      const darken = (x0, y0, x1, y1, m) => {
        y0 += padT; y1 += padT;
        for (let y = Math.max(0, y0); y <= Math.min(HA - 1, y1); y++) for (let x = Math.max(0, x0); x <= Math.min(WA - 1, x1); x++) {
          const i = (y * WA + x) * 4; if (DA[i + 3] === 0) continue;
          DA[i] = DA[i] * m; DA[i + 1] = DA[i + 1] * m; DA[i + 2] = DA[i + 2] * m;
        }
      };
      const sx = xShift;
      const hbCol = (x) => ((x >= 0 && x < headBottomCol.length) ? headBottomCol[x] : -1);
      const animOff = (g) => {
        const a = !poseFellBack && this._animParts && this._animParts[g];
        return a ? [a[0] || 0, a[1] || 0] : [0, 0];
      };
      if (shoulderRow) {
        const hj = perPartInk ? offOf('Kopf') : [0, 0];
        const hx0 = ((flat || side) ? 1 : 0) + hj[0], hx1 = ((flat || side) ? 18 : 23) + hj[0];
        const [ox, oy] = animOff('Kopf');
        const tally = new Map();
        for (let x = hx0 + sx + ox; x <= hx1 + sx + ox; x++) {
          const hb = hbCol(x);
          if (hb >= 0) tally.set(hb, (tally.get(hb) || 0) + 1);
        }
        let best = -1, bestN = 0;
        for (const [row, n] of tally) if (n > bestN || (n === bestN && row > best)) { best = row; bestN = n; }
        const baseY = best >= 0 ? best + 1 : 17 + oy;
        const m = this._shadeMul(0.88);
        for (let x = hx0 + sx + ox; x <= hx1 + sx + ox; x++) {
          const hb = hbCol(x);
          const y = hb >= 0 ? Math.max(baseY, hb + 1) : baseY;
          darken(x, y, x, y, m);
        }
      }
      if (aoRects && aoCrease) {
        const cy1 = (poseTab && this.pose === 'sitting') ? 24 : 26;
        const aj = perPartInk ? offOf(stripsRight ? 'Rechter Arm' : 'Linker Arm') : [0, 0];
        const [ox, oy0] = animOff(stripsRight ? 'rArm' : 'lArm');
        const oy = oy0 + aj[1];
        const cx = (stripsRight ? 4 : 19) + sx + ox + aj[0];
        const hb = hbCol(cx);
        darken(cx, Math.max(18 + oy, hb + 1), cx, cy1 + oy, this._shadeMul(0.86));
      }
      if (aoRects && aoFarLeg) {
        const lj = perPartInk ? offOf(stripsRight ? 'Rechtes Bein' : 'Linkes Bein') : [0, 0];
        const [ox, oy0] = animOff(stripsRight ? 'rLeg' : 'lLeg');
        const oy = oy0 + lj[1], lx = sx + ox + lj[0];
        if (stripsRight) darken(5 + lx, 27 + oy, 9 + lx, 32 + oy, this._shadeMul(0.86));
        else darken(14 + lx, 27 + oy, 18 + lx, 32 + oy, this._shadeMul(0.86));
      }
      if (aoRects && !back && this.pose === 'dab') {
        const m = this._shadeMul(0.78);
        if (leftF) { darken(6 + sx, 17, 6 + sx, 20, m); darken(7 + sx, 21, 16 + sx, 21, m); }
        else       { darken(17 + sx, 17, 17 + sx, 20, m); darken(7 + sx, 21, 16 + sx, 21, m); }
      }
      if (aoRects && this.pose === 'sitting') {
        const m = this._shadeMul(0.82);
        if (stripsRight) darken(15 + sx, 27, 22 + sx, 27, m);
        else             darken(1 + sx, 27, 8 + sx, 27, m);
      }
      c.putImageData(AO, 0, 0);
    }
    if (cut > 0 && cv.height > cut + padT) c.clearRect(0, cut + padT, cv.width, cv.height - cut - padT);
    if (perPartInk) {
      const seq = Object.keys(inkIdx).sort((a, b) => inkLast[a] - inkLast[b]);
      this._inkHeadSpan = null;
      const srcIm = c.getImageData(0, 0, cv.width, cv.height).data;
      const pcv = document.createElement('canvas');
      pcv.width = cv.width + inkW * 2; pcv.height = cv.height + inkW * 2;
      const pc2 = pcv.getContext('2d', { willReadFrequently: true });
      pc2.imageSmoothingEnabled = false;
      const layer = (test) => {
        const lcv = document.createElement('canvas');
        lcv.width = cv.width; lcv.height = cv.height;
        const lc = lcv.getContext('2d', { willReadFrequently: true });
        const im = lc.createImageData(cv.width, cv.height);
        let any = false;
        for (let k = 0, n = owner.length; k < n; k++) {
          if (!test(owner[k])) continue;
          const o = k * 4;
          if (srcIm[o + 3] < 8) continue;
          im.data[o] = srcIm[o]; im.data[o + 1] = srcIm[o + 1];
          im.data[o + 2] = srcIm[o + 2]; im.data[o + 3] = srcIm[o + 3];
          any = true;
        }
        if (!any) return null;
        lc.putImageData(im, 0, 0);
        return lcv;
      };
      if (inkIdx['Kopf'] !== undefined) {
        const hg = inkIdx['Kopf'];
        let h0 = Infinity, h1 = -Infinity;
        for (let k = 0, n = owner.length; k < n; k++) {
          if (owner[k] !== hg || srcIm[k * 4 + 3] < 8) continue;
          const x = k % cv.width;
          if (x < h0) h0 = x;
          if (x > h1) h1 = x;
        }
        if (h1 >= h0) this._inkHeadSpan = [h0 + inkW - inkW, h1 + inkW + inkW];
      }
      for (const gk of seq) {
        const gi = inkIdx[gk];
        const lcv = layer((v) => v === gi);
        if (lcv) pc2.drawImage(this._ringCanvas(lcv, inkW), 0, 0);
      }
      const rest = layer((v) => v === -1);
      if (rest) pc2.drawImage(rest, inkW, inkW);
      return this._finishSprite(pc2, pcv);
    }
    return this._finishSprite(c, cv);
  }

  _finishSprite(c, cv) {
    this._applyMaterialTone(c, cv);
    let fc = c, fcv = cv;
    const ow = this._perPartOutline() ? 0 : Math.max(0, Math.min(10, this.outlineWidth | 0));
    if (ow > 0) {
      const pad = this._ringCanvas(cv, ow);
      fc = pad.getContext('2d', { willReadFrequently: true }); fcv = pad;
    }
    if (this._animNoCrop) return this._flipIfUpsideDown(fcv);
    const id = fc.getImageData(0, 0, fcv.width, fcv.height).data;
    let x0 = fcv.width, y0 = fcv.height, x1 = -1, y1 = -1;
    for (let y = 0; y < fcv.height; y++) for (let x = 0; x < fcv.width; x++) if (id[(y * fcv.width + x) * 4 + 3] > 0) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
    if (x1 < 0) return fcv;
    let cx0 = x0, cx1 = x1;
    const hs = this._inkHeadSpan;
    this._inkHeadSpan = null;
    if (hs) {
      const hc = (hs[0] + hs[1]) / 2;
      const off = hc - (cx0 + cx1) / 2;
      if (Math.abs(off % 1) === 0.5) { if (off > 0) cx1 += 1; else cx0 -= 1; }
    }
    const cr = document.createElement('canvas'); cr.width = cx1 - cx0 + 1; cr.height = y1 - y0 + 1;
    cr.getContext('2d').drawImage(fcv, cx0, y0, cr.width, cr.height, 0, 0, cr.width, cr.height);
    return this._flipIfUpsideDown(cr);
  }

  _ringCanvas(srcCv, ow, inkOnly = false) {
    const sc = srcCv.getContext('2d', { willReadFrequently: true });
    const pad = document.createElement('canvas');
    pad.width = srcCv.width + ow * 2; pad.height = srcCv.height + ow * 2;
    const pc = pad.getContext('2d', { willReadFrequently: true });
    pc.imageSmoothingEnabled = false;
    const src = sc.getImageData(0, 0, srcCv.width, srcCv.height).data;
    const buf = pc.createImageData(pad.width, pad.height);
    const oc = this.outlineColor || '#000000';
    const orr = parseInt(oc.slice(1, 3), 16), org = parseInt(oc.slice(3, 5), 16), orb = parseInt(oc.slice(5, 7), 16);
    const auto = !!this.outlineAuto;
    const inside = (dx, dy) => this.outlineSharp
      ? Math.max(Math.abs(dx), Math.abs(dy)) <= ow
      : dx * dx + dy * dy <= ow * ow + 1;
    for (let y = 0; y < srcCv.height; y++) for (let x = 0; x < srcCv.width; x++) {
      if (src[(y * srcCv.width + x) * 4 + 3] < 128) continue;
      for (let dy = -ow; dy <= ow; dy++) for (let dx = -ow; dx <= ow; dx++) {
        if (!inside(dx, dy)) continue;
        const i = ((y + ow + dy) * pad.width + (x + ow + dx)) * 4;
        buf.data[i + 3] = 255;
        if (!auto) { buf.data[i] = orr; buf.data[i + 1] = org; buf.data[i + 2] = orb; }
      }
    }
    if (auto) {
      for (let py = 0; py < pad.height; py++) for (let px = 0; px < pad.width; px++) {
        const i = (py * pad.width + px) * 4;
        if (buf.data[i + 3] < 128) continue;
        const sx = px - ow, sy = py - ow;
        if (sx >= 0 && sy >= 0 && sx < srcCv.width && sy < srcCv.height
          && src[(sy * srcCv.width + sx) * 4 + 3] >= 128) continue;
        let si = -1;
        for (let r = 1; r <= ow && si < 0; r++) {
          const ring = [[-r, 0], [r, 0], [0, -r], [0, r]];
          for (let d = 1; d <= r; d++) ring.push([-r, -d], [-r, d], [r, -d], [r, d], [-d, -r], [d, -r], [-d, r], [d, r]);
          for (const [dx, dy] of ring) {
            const nx = sx + dx, ny = sy + dy;
            if (nx < 0 || ny < 0 || nx >= srcCv.width || ny >= srcCv.height) continue;
            const j = (ny * srcCv.width + nx) * 4;
            if (src[j + 3] >= 128) { si = j; break; }
          }
        }
        if (si < 0) { buf.data[i] = orr; buf.data[i + 1] = org; buf.data[i + 2] = orb; continue; }
        const e = mlEdgeColor(src[si], src[si + 1], src[si + 2]);
        buf.data[i] = e[0]; buf.data[i + 1] = e[1]; buf.data[i + 2] = e[2];
      }
    }
    pc.putImageData(buf, 0, 0);
    if (!inkOnly) pc.drawImage(srcCv, ow, ow);
    return pad;
  }

  _perPartOutline() {
    return !!this.outlinePerPart;
  }

  _flipIfUpsideDown(cv) {
    if (!this.upsideDown || !cv) return cv;
    const f = document.createElement('canvas');
    f.width = cv.width; f.height = cv.height;
    const fx = f.getContext('2d');
    fx.imageSmoothingEnabled = false;
    fx.translate(0, f.height); fx.scale(1, -1);
    fx.drawImage(cv, 0, 0);
    return f;
  }

  _draw() {
    const ctx = this.ctx, cv = this.viewCanvas; if (!ctx || !cv) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    const chibi = this._chibiCanvas; if (!chibi) return;
    const shape = this.bgShape || 'none';
    let frame = null;
    let scale, cx, cy;
    if (shape !== 'none') {
      const f = this._frameSize(cv.width, cv.height);
      const bx = Math.round((cv.width - f.w) / 2), by = Math.round((cv.height - f.h) / 2);
      ctx.imageSmoothingEnabled = true;
      this._paintBadge(ctx, bx, by, f.w, f.h, shape);
      frame = { x: bx, y: by, w: f.w, h: f.h };
      scale = this._badgeScale(this._fitScale());
      cx = bx + f.w / 2 + (this.charX || 0) * scale;
      cy = by + f.h / 2 + (this.charY || 0) * scale;
    } else {
      scale = this._viewScale();
      const dwf = chibi.width * scale, dhf = chibi.height * scale;
      const maxX = Math.max(0, (cv.width + dwf) / 2 - 40), maxY = Math.max(0, (cv.height + dhf) / 2 - 40);
      this.viewPanX = Math.max(-maxX, Math.min(maxX, this.viewPanX));
      this.viewPanY = Math.max(-maxY, Math.min(maxY, this.viewPanY));
      cx = cv.width / 2 + this.viewPanX;
      cy = cv.height / 2 + this.viewPanY;
      if (this.bgImage && !this.bgTransparent) {
        const fx = Math.round(cx - dwf / 2), fy = Math.round(cy - dhf / 2);
        ctx.save();
        ctx.translate(fx, fy);
        ctx.imageSmoothingEnabled = true;
        this._paintExportBackground(ctx, Math.round(dwf), Math.round(dhf), false);
        ctx.restore();
      }
    }
    const dw = chibi.width * scale, dh = chibi.height * scale;
    ctx.imageSmoothingEnabled = !this.textureFilterPixelated;
    const sx0 = Math.round(cx - dw / 2), sy0 = Math.round(cy - dh / 2);
    ctx.drawImage(chibi, sx0, sy0, dw, dh);
    if (!frame) frame = { x: sx0, y: sy0, w: dw, h: dh };
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillRect(0, 0, cv.width, frame.y);
    ctx.fillRect(0, frame.y + frame.h, cv.width, cv.height - frame.y - frame.h);
    ctx.fillRect(0, frame.y, frame.x, frame.h);
    ctx.fillRect(frame.x + frame.w, frame.y, cv.width - frame.x - frame.w, frame.h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 5]);
    ctx.strokeRect(frame.x - 0.5, frame.y - 0.5, frame.w + 1, frame.h + 1);
    ctx.restore();
  }

  _barebonesCanvas(base) {
    const cv = document.createElement('canvas');
    cv.width = base.width;
    cv.height = base.height;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(base, 0, 0);
    const id = ctx.getImageData(0, 0, cv.width, cv.height);
    const data = id.data;
    const T = this.barebonesThreshold / 100;
    const T2 = T * T;
    const SN = 0.12;
    const hsv = (r, g, b) => {
      r /= 255; g /= 255; b /= 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
      let h = 0;
      if (d) {
        if (mx === r) h = ((g - b) / d) % 6;
        else if (mx === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60; if (h < 0) h += 360;
      }
      return { h, s: mx ? d / mx : 0, v: mx };
    };
    const dist2 = (A, B) => {
      const a = hsv(A.r, A.g, A.b), b = hsv(B.r, B.g, B.b);
      const an = a.s < SN, bn = b.s < SN;
      if (an !== bn) return 9;
      const dv = a.v - b.v;
      if (an && bn) return (0.7 * dv) * (0.7 * dv);
      let dh = Math.abs(a.h - b.h); if (dh > 180) dh = 360 - dh; dh /= 180;
      const ds = a.s - b.s;
      return 6.0 * dh * dh + 0.35 * ds * ds + 2.0 * dv * dv;
    };
    const freq = new Map();
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] <= 128) continue;
      const key = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
      freq.set(key, (freq.get(key) || 0) + 1);
    }
    const colors = [...freq.entries()]
      .map(([k, f]) => ({ r: (k >> 16) & 255, g: (k >> 8) & 255, b: k & 255, f }))
      .sort((a, b) => b.f - a.f);
    const keepers = [];
    const map = new Map();
    for (const c of colors) {
      let best = null, bd = Infinity;
      for (const k of keepers) { const d = dist2(c, k); if (d < bd) { bd = d; best = k; } }
      const key = (c.r << 16) | (c.g << 8) | c.b;
      if (best && bd <= T2) { map.set(key, best); }
      else { const nk = { r: c.r, g: c.g, b: c.b }; keepers.push(nk); map.set(key, nk); }
    }
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] <= 128) continue;
      const k = map.get((data[i] << 16) | (data[i + 1] << 8) | data[i + 2]);
      if (k) { data[i] = k.r; data[i + 1] = k.g; data[i + 2] = k.b; }
    }
    ctx.putImageData(id, 0, 0);
    return cv;
  }

  applyHalfHeightUVs() {
    this._refreshSkinTexture();
  }

  setPartVisibility(partName, visible) {
    if (visible) delete this.partVisibility[partName];
    else this.partVisibility[partName] = false;
    this._refreshSkinTexture();
  }

  syncVisibilityCheckboxes() {
    for (const cb of this.visibilityCheckboxes) {
      cb.checked = this.partVisibility[cb.dataset.part] !== false;
    }
  }

  convertLegacySkin(image) {
    const srcW = image.width || image.naturalWidth;
    const s = srcW / 64;
    const canvas = document.createElement('canvas');
    canvas.width = srcW;
    canvas.height = srcW;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(image, 0, 0);
    const copyFlipped = (srcX, srcY, w, h, dstX, dstY) => {
      const x = srcX * s, y = srcY * s, W = w * s, H = h * s;
      const src = ctx.getImageData(x, y, W, H);
      const dst = ctx.createImageData(W, H);
      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const si = (py * W + px) * 4;
          const di = (py * W + (W - 1 - px)) * 4;
          dst.data[di] = src.data[si];
          dst.data[di + 1] = src.data[si + 1];
          dst.data[di + 2] = src.data[si + 2];
          dst.data[di + 3] = src.data[si + 3];
        }
      }
      ctx.putImageData(dst, dstX * s, dstY * s);
    };
    copyFlipped(4, 16, 4, 4, 20, 48);
    copyFlipped(8, 16, 4, 4, 24, 48);
    copyFlipped(0, 20, 4, 12, 24, 52);
    copyFlipped(4, 20, 4, 12, 20, 52);
    copyFlipped(8, 20, 4, 12, 16, 52);
    copyFlipped(12, 20, 4, 12, 28, 52);
    copyFlipped(44, 16, 4, 4, 36, 48);
    copyFlipped(48, 16, 4, 4, 40, 48);
    copyFlipped(40, 20, 4, 12, 40, 52);
    copyFlipped(44, 20, 4, 12, 36, 52);
    copyFlipped(48, 20, 4, 12, 32, 52);
    copyFlipped(52, 20, 4, 12, 44, 52);
    return canvas;
  }

  showSkinStatus(text) {
    this.skinStatusText.textContent = text;
    if (this.removeSkinBtn) this.removeSkinBtn.disabled = false;
    setVisible(this.skinError, false);
  }

  clearSkinStatus() {
    this.skinStatusText.textContent = this.currentModelType === 'alex' ? 'Alex (default)' : 'Steve (default)';
    if (this.removeSkinBtn) this.removeSkinBtn.disabled = true;
  }

  showError(message) {
    setVisible(this.skinError, true);
    this.skinError.textContent = message;
  }

  hideError() {
    setVisible(this.skinError, false);
  }

  setMaterial(type) {
    this.currentMaterial = type;
    this.materialSelect.value = type;
    this._refreshSkinTexture();
  }

  setupValueScrubbing() {
    const SCRUB_THRESHOLD = 24;
    const PX_PER_STEP = 24;
    const COARSE_MULT = 10;

    const inputs = Array.from(document.querySelectorAll('.quantity-control input[type="number"]'))
      .filter((inp) => !inp.readOnly);

    for (const input of inputs) {
      input.classList.add('scrubbable');
      input.title = 'Drag left/right to adjust';

      const stepAttr = parseFloat(input.step);
      const step = (isFinite(stepAttr) && stepAttr > 0) ? stepAttr : 1;
      const minAttr = parseFloat(input.min);
      const maxAttr = parseFloat(input.max);
      const min = isFinite(minAttr) ? minAttr : -Infinity;
      const max = isFinite(maxAttr) ? maxAttr : Infinity;

      let active = false;
      let scrubbing = false;
      let suppressClick = false;
      let startX = 0;
      let startVal = 0;
      let pointerId = null;

      input.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        if (e.pointerType === 'touch') return;
        if (input.disabled) return;
        if (document.activeElement === input) return;
        suppressClick = false;
        active = true;
        scrubbing = false;
        startX = e.clientX;
        startVal = parseFloat(input.value);
        if (!isFinite(startVal)) startVal = 0;
        pointerId = e.pointerId;
      });

      input.addEventListener('pointermove', (e) => {
        if (!active) return;
        const dx = e.clientX - startX;
        if (!scrubbing) {
          if (Math.abs(dx) < SCRUB_THRESHOLD) return;
          scrubbing = true;
          document.body.classList.add('scrubbing-value');
          if (document.activeElement === input) input.blur();
          try { input.setPointerCapture(pointerId); } catch (_) {}
        }
        e.preventDefault();
        const mult = e.shiftKey ? COARSE_MULT : 1;
        const over = Math.max(0, Math.abs(dx) - SCRUB_THRESHOLD);
        const deltaSteps = Math.sign(dx) * Math.round(over / PX_PER_STEP) * mult;
        let next = startVal + deltaSteps * step;
        next = Math.max(min, Math.min(max, next));
        if (String(input.value) !== String(next)) {
          input.value = next;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });

      const endScrub = () => {
        if (!active) return;
        active = false;
        try { if (pointerId !== null) input.releasePointerCapture(pointerId); } catch (_) {}
        pointerId = null;
        if (scrubbing) {
          scrubbing = false;
          document.body.classList.remove('scrubbing-value');
          input.dispatchEvent(new Event('change', { bubbles: true }));
          suppressClick = true;
        }
      };
      input.addEventListener('pointerup', endScrub);
      input.addEventListener('pointercancel', endScrub);
      input.addEventListener('lostpointercapture', () => {
        if (active) {
          active = false;
          scrubbing = false;
          pointerId = null;
          document.body.classList.remove('scrubbing-value');
        }
      });
      input.addEventListener('click', (ev) => {
        if (suppressClick) {
          ev.preventDefault();
          ev.stopPropagation();
          suppressClick = false;
        }
      }, true);
    }
  }

  setupPanels() {
    this.optionsTitle = document.getElementById('optionsTitle');
    this.layerRows = [...document.querySelectorAll('.mv-layer-row[data-panel]')];
    this.optionPanels = [...document.querySelectorAll('.mv-panel')];
    const titles = {
      skin: 'Skin', look: 'Look', pose: 'Pose', anim: 'Animation',
      camera: 'Camera', parts: 'Parts',
    };
    this.showOptionsPanel = (key) => {
      for (const p of this.optionPanels) setVisible(p, p.dataset.options === key);
      const rowKey = key;
      for (const r of this.layerRows) r.classList.toggle('is-active', r.dataset.panel === rowKey);
      const active = this.layerRows.find((r) => r.dataset.panel === rowKey);
      const strip = active && active.parentElement;
      if (strip && strip.scrollWidth > strip.clientWidth + 1) {
        const sRect = strip.getBoundingClientRect();
        const aRect = active.getBoundingClientRect();
        const target = strip.scrollLeft + (aRect.left - sRect.left) - (sRect.width - aRect.width) / 2;
        strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
      }
      if (this.optionsTitle) this.optionsTitle.textContent = titles[key] || key;
    };
    for (const r of this.layerRows) {
      r.addEventListener('click', () => this.showOptionsPanel(r.dataset.panel));
    }
    this.showOptionsPanel('skin');
  }

  setupModals() {
    this.openDialogEl = null;
    for (const id of ['exportOverlay', 'confirmOverlay', 'configOverlay', 'supportOverlay']) {
      const el = document.getElementById(id);
      if (el) document.body.appendChild(el);
    }
    const bind = (overlay, opener, closers) => {
      if (!overlay) return;
      if (opener) opener.addEventListener('click', () => this.openDialog(overlay, opener));
      for (const c of closers) { const el = document.getElementById(c); if (el) el.addEventListener('click', () => this.closeDialog()); }
      overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeDialog(); });
    };
    bind(document.getElementById('exportOverlay'), this.exportBtn, ['exportClose']);
    bind(document.getElementById('confirmOverlay'), null, ['confirmClose', 'confirmCancel']);
    bind(document.getElementById('configOverlay'), this.configBtn, ['configClose']);
    bind(document.getElementById('supportOverlay'), null, ['supportClose', 'supportDismiss']);
    for (const el of document.querySelectorAll('#supportOverlay .support-btn')) {
      el.addEventListener('click', () => setTimeout(() => this.closeDialog(), 120));
    }

    document.addEventListener('keydown', (e) => {
      if (!this.openDialogEl) return;
      if (e.key === 'Escape') { e.preventDefault(); this.closeDialog(); return; }
      if (e.key !== 'Tab') return;
      const f = this.openDialogEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const list = [...f].filter(el => !el.disabled && el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }, true);
  }

  setupPreviewPane() {
    const card = document.getElementById('previewCard');
    const pinBtn = document.getElementById('pinPreviewBtn');
    if (!card || !pinBtn) return;

    let isPinEnabled = false;
    let placeholder = null;
    let pinDragged = false;
    let gestureActive = false;

    const unfloat = () => {
      card.style.left = card.style.top = card.style.width = card.style.height = '';
      card.classList.remove('user-resized');
    };

    const updatePinPosition = () => {
      if (!isPinEnabled || gestureActive) return;
      const rect = placeholder ? placeholder.getBoundingClientRect() : card.getBoundingClientRect();
      if (rect.top <= 80) {
        if (!card.classList.contains('pinned')) {
          const r = placeholder ? placeholder.getBoundingClientRect() : card.getBoundingClientRect();
          if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.className = 'preview-dock-zone';
            placeholder.textContent = 'Drop here to dock';
            placeholder.style.width = '100%';
            placeholder.style.minWidth = '0';
            placeholder.style.height = r.height + 'px';
            placeholder.setAttribute('aria-hidden', 'true');
            card.parentNode.insertBefore(placeholder, card);
          }
          card.style.width = r.width + 'px';
          card.style.left = r.left + 'px';
          card.style.height = r.height + 'px';
          card.classList.add('pinned');
        }
      } else if (card.classList.contains('pinned') && !pinDragged) {
        card.classList.remove('pinned');
        unfloat();
        if (placeholder) { placeholder.remove(); placeholder = null; }
      }
    };

    const reclampFloating = () => {
      if (!card.classList.contains('pinned') || !pinDragged || gestureActive) return;
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      const main = card.closest('.main-content') || document.querySelector('.main-content');
      let cL = 8, cR = vw - 8;
      if (main) {
        const mr = main.getBoundingClientRect();
        const ms = getComputedStyle(main);
        cL = mr.left + parseFloat(ms.paddingLeft);
        cR = mr.right - parseFloat(ms.paddingRight);
      }
      const rect = card.getBoundingClientRect();
      const nav = document.querySelector('.navbar');
      const minTop = (nav ? nav.getBoundingClientRect().bottom : 70) + 8;
      const maxW = Math.max(64, cR - cL);
      const w = Math.min(rect.width, maxW);
      const maxH = Math.max(60, vh - minTop - 8);
      const h = Math.min(rect.height, maxH);
      card.style.width = w + 'px';
      if (rect.height > maxH) card.style.height = h + 'px';
      card.style.left = Math.max(cL, Math.min(Math.max(cL, cR - w), rect.left)) + 'px';
      card.style.top = Math.max(minTop, Math.min(Math.max(minTop, vh - h - 8), rect.top)) + 'px';
    };

    const handleResize = () => {
      if (!isPinEnabled || gestureActive) return;
      if (placeholder && !pinDragged) {
        const rect = placeholder.getBoundingClientRect();
        card.style.width = rect.width + 'px';
        card.style.left = rect.left + 'px';
        card.style.height = rect.height + 'px';
      } else {
        reclampFloating();
      }
    };

    pinBtn.addEventListener('click', () => {
      isPinEnabled = !isPinEnabled;
      if (isPinEnabled) {
        pinBtn.classList.add('active');
        pinBtn.setAttribute('title', 'Unpin preview');
        pinBtn.setAttribute('aria-label', 'Unpin preview');
        window.addEventListener('scroll', updatePinPosition);
        window.addEventListener('resize', handleResize);
        updatePinPosition();
      } else {
        pinBtn.classList.remove('active');
        pinBtn.setAttribute('title', 'Pin preview');
        pinBtn.setAttribute('aria-label', 'Pin preview');
        window.removeEventListener('scroll', updatePinPosition);
        window.removeEventListener('resize', handleResize);
        card.classList.remove('pinned');
        unfloat();
        pinDragged = false;
        if (placeholder) { placeholder.remove(); placeholder = null; }
      }
    });

    const rHandle = document.getElementById('previewResizeHandle');
    const stage = document.getElementById('vpStage');
    if (rHandle) {
      let resizing = false, resized = false, pinnedAtStart = false;
      let startX = 0, startY = 0, startW = 0, startH = 0, minW = 0, minH = 0, maxW = 0, maxH = 0;

      rHandle.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resizing = true;
        resized = false;
        gestureActive = true;
        pinnedAtStart = card.classList.contains('pinned');
        startX = e.clientX;
        startY = e.clientY;
        startW = card.offsetWidth;
        startH = pinnedAtStart ? card.offsetHeight : ((stage && stage.getBoundingClientRect().height) || card.offsetHeight);

        if (pinnedAtStart) {
          const r = card.getBoundingClientRect();
          const main = card.closest('.main-content') || document.querySelector('.main-content');
          let contentRight = document.documentElement.clientWidth - 8;
          if (main) {
            const mr = main.getBoundingClientRect();
            contentRight = mr.right - parseFloat(getComputedStyle(main).paddingRight);
          }
          minW = Math.min(320, startW);
          minH = Math.min(280, startH);
          maxW = Math.max(startW, contentRight - r.left);
          maxH = Math.max(minH, document.documentElement.clientHeight - r.top - 8);
        } else {
          minH = 320;
          maxH = Math.max(minH, Math.min(900, document.documentElement.clientHeight * 0.82));
        }

        try { rHandle.setPointerCapture(e.pointerId); } catch (_) {}
        document.body.classList.add('preview-resizing');
      });

      rHandle.addEventListener('pointermove', (e) => {
        if (!resizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!resized && (Math.abs(dx) + Math.abs(dy)) < 3) return;
        resized = true;
        card.classList.add('user-resized');

        if (pinnedAtStart) {
          pinDragged = true;
          card.style.width = Math.max(minW, Math.min(maxW, startW + dx)) + 'px';
          card.style.height = Math.max(minH, Math.min(maxH, startH + dy)) + 'px';
        } else if (stage) {
          const nextH = Math.max(minH, Math.min(maxH, startH + dy));
          card.style.setProperty('--preview-stage-height', Math.round(nextH) + 'px');
        }
      });

      const endResize = (e) => {
        if (!resizing) return;
        resizing = false;
        gestureActive = false;
        try { rHandle.releasePointerCapture(e.pointerId); } catch (_) {}
        document.body.classList.remove('preview-resizing');
        window.dispatchEvent(new Event('resize'));
        if (card.classList.contains('pinned')) window.dispatchEvent(new Event('scroll'));
      };
      rHandle.addEventListener('pointerup', endResize);
      rHandle.addEventListener('pointercancel', endResize);

      rHandle.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        card.classList.remove('user-resized');
        card.style.removeProperty('--preview-stage-height');
        if (card.classList.contains('pinned')) {
          pinDragged = false;
          card.style.width = '';
          card.style.height = '';
          card.style.top = '';
          card.style.left = '';
        }
        window.dispatchEvent(new Event('resize'));
      });
    }

    const dHandle = document.getElementById('previewDragHandle');
    if (dHandle) {
      let dragging = false, moved = false, overDock = false;
      let originX = 0, originY = 0, startLeft = 0, startTop = 0;
      let minTop = 8, boundLeft = 8, boundRight = 0;

      dHandle.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        if (!card.classList.contains('pinned')) return;
        e.preventDefault();
        e.stopPropagation();
        dragging = true;
        moved = false;
        gestureActive = true;
        originX = e.clientX;
        originY = e.clientY;
        const r = card.getBoundingClientRect();
        startLeft = r.left;
        startTop = r.top;
        const nav = document.querySelector('.navbar');
        minTop = (nav ? nav.getBoundingClientRect().bottom : 70) + 8;
        const main = card.closest('.main-content') || document.querySelector('.main-content');
        if (main) {
          const mr = main.getBoundingClientRect();
          const ms = getComputedStyle(main);
          boundLeft = mr.left + parseFloat(ms.paddingLeft);
          boundRight = mr.right - parseFloat(ms.paddingRight);
        } else {
          boundLeft = 8;
          boundRight = document.documentElement.clientWidth - 8;
        }
        try { dHandle.setPointerCapture(e.pointerId); } catch (_) {}
      });

      dHandle.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - originX;
        const dy = e.clientY - originY;
        if (!moved) {
          if (Math.abs(dx) + Math.abs(dy) < 4) return;
          moved = true;
          pinDragged = true;
          document.body.classList.add('preview-dragging');
        }
        const vh = document.documentElement.clientHeight;
        const w = card.offsetWidth, h = card.offsetHeight;
        const maxLeft = Math.max(boundLeft, boundRight - w);
        card.style.left = Math.max(boundLeft, Math.min(maxLeft, startLeft + dx)) + 'px';
        card.style.top = Math.max(minTop, Math.min(Math.max(minTop, vh - h - 8), startTop + dy)) + 'px';
        if (placeholder) {
          const z = placeholder.getBoundingClientRect();
          overDock = z.height > 0 && e.clientX >= z.left && e.clientX <= z.right
            && e.clientY >= z.top && e.clientY <= z.bottom;
          placeholder.classList.toggle('dock-active', overDock);
          card.classList.toggle('docking', overDock);
        }
      });

      const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        gestureActive = false;
        try { dHandle.releasePointerCapture(e.pointerId); } catch (_) {}
        document.body.classList.remove('preview-dragging');
        card.classList.remove('docking');
        if (placeholder) placeholder.classList.remove('dock-active');
        if (overDock) {
          overDock = false;
          if (card.classList.contains('pinned')) pinBtn.click();
          return;
        }
        if (card.classList.contains('pinned')) window.dispatchEvent(new Event('scroll'));
      };
      dHandle.addEventListener('pointerup', endDrag);
      dHandle.addEventListener('pointercancel', endDrag);

      dHandle.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pinDragged = false;
        card.style.top = '';
        window.dispatchEvent(new Event('resize'));
      });
    }
  }

  _afterExport() {
    const overlay = document.getElementById('supportOverlay');
    if (!overlay) return;
    setTimeout(() => {
      if (this.openDialogEl && this.openDialogEl.id === 'exportOverlay') this.closeDialog();
      if (!this.openDialogEl) this.openDialog(overlay, this.exportBtn);
    }, 260);
  }

  openDialog(overlay, opener) {
    if (!overlay || this.openDialogEl) return;
    if (overlay.id === 'exportOverlay') this._animHold = true;
    overlay._opener = opener || document.activeElement;
    const root = document.documentElement;
    const sbw = window.innerWidth - root.clientWidth;
    overlay._prevOverflow = root.style.overflow;
    overlay._prevPad = root.style.paddingRight;
    root.style.overflow = 'hidden';
    if (sbw > 0) root.style.paddingRight = ((parseFloat(getComputedStyle(root).paddingRight) || 0) + sbw) + 'px';
    setVisible(overlay, true);
    this.openDialogEl = overlay;
    for (const el of document.body.children) {
      if (el !== overlay && !el.hasAttribute('inert')) { el.setAttribute('inert', ''); el._inertedByUs = true; }
    }
    const first = overlay.querySelector('button, input, select');
    if (first) first.focus();
  }

  closeDialog() {
    if (this._animHold) { this._animHold = false; this._animEnsureLoop(); }
    const overlay = this.openDialogEl;
    if (!overlay) return;
    setVisible(overlay, false);
    this.openDialogEl = null;
    for (const el of document.body.children) {
      if (el._inertedByUs) { el.removeAttribute('inert'); el._inertedByUs = false; }
    }
    const root = document.documentElement;
    root.style.overflow = overlay._prevOverflow || '';
    root.style.paddingRight = overlay._prevPad || '';
    if (overlay._opener && overlay._opener.focus) overlay._opener.focus();
  }

  setStatus(msg) {
    if (this.toolStatus) this.toolStatus.textContent = msg || '';
  }

  captureFullState() {
    return {
      modelType: this.currentModelType,
      bodyTypeMode: this.bodyTypeMode,
      chibiStyle: this.chibiStyle,
      mlDetail: this.mlDetail,
      skinName: this.skinName,
      skinDataUri: this._skinDataUri,
      skinWidth: this._skinWidth,
      skinHeight: this._skinHeight,
      currentSkinImage: this.currentSkinImage,
      material: this.currentMaterial,
      bgColor: this.bgColor,
      bgTransparent: this.bgTransparent,
      bgVignette: this.bgVignette,
      bgShape: this.bgShape,
      bgAspect: this.bgAspect,
      fillFrame: this.fillFrame,
      bgImageURI: this._bgImageURI,
      outlineWidth: this.outlineWidth,
      outlineByStyle: { ...this._outlineByStyle },
      outlineAutoByStyle: { ...this._outlineAutoByStyle },
      outlinePerPart: this.outlinePerPart,
      outlinePerPartByStyle: { ...this._outlinePerPartByStyle },
      outlineSharp: this.outlineSharp,
      outlineColor: this.outlineColor,
      outlineAuto: this.outlineAuto,
      farLegShade: this.farLegShade,
      textureFilterPixelated: this.textureFilterPixelated,
      barebones: this.barebones,
      barebonesThreshold: this.barebonesThreshold,
      halfHeightUVs: this.halfHeightUVs,
      flatProfile: this.flatProfile,
      sideProfile: this.sideProfile,
      vertView: this.vertView,
      portraitView: this.portraitView,
      layerShadow: this.layerShadow,
      upsideDown: this.upsideDown,
      facing: this.facing,
      viewSide: this.viewSide,
      pose: this.pose,
      anim: this.anim,
      headOverlay: this.headOverlay,
      bodyOverlay: this.bodyOverlay,
      shading: this.shading,
      shadingStrength: this.shadingStrength,
      visibility: this._captureVisibility(),
    };
  }

  _captureVisibility() {
    return { ...this.partVisibility };
  }

  async restoreFullState(state) {
    if (state.bodyTypeMode) this.bodyTypeMode = state.bodyTypeMode;
    if (state.chibiStyle !== undefined) {
      this.chibiStyle = ChibiSkinMaker.STYLES.includes(state.chibiStyle) ? state.chibiStyle : 'classic';
    }
    if (state.mlDetail !== undefined) {
      this.mlDetail = ChibiSkinMaker.ML_DETAILS.includes(state.mlDetail) ? state.mlDetail : 'blocky';
    }
    if (state.modelType && state.modelType !== this.currentModelType) {
      this.currentSkinImage = null;
      await this.loadModel(state.modelType, { clearUndo: false, preservePose: false });
    }
    this._syncBodyTypeButtons();

    this.skinName = state.skinName;
    this._skinDataUri = state.skinDataUri;
    this._skinWidth = state.skinWidth;
    this._skinHeight = state.skinHeight;
    this._skinFileBlob = null;
    this._skinVerbatim = false;
    this.currentSkinImage = state.currentSkinImage || null;
    if (state.skinName) {
      const dims = state.skinWidth ? ` (${state.skinWidth}x${state.skinHeight})` : '';
      this.showSkinStatus(`${state.skinName}${dims}`);
    } else {
      this.clearSkinStatus();
    }

    if (state.flatProfile !== undefined) this.flatProfile = state.flatProfile;
    if (state.sideProfile !== undefined) this.sideProfile = state.sideProfile;
    if (state.vertView !== undefined) this.vertView = state.vertView;
    if (state.portraitView !== undefined) this.portraitView = state.portraitView;
    if (state.layerShadow !== undefined) { this.layerShadow = !!state.layerShadow; if (this.layerShadowInput) this.layerShadowInput.checked = this.layerShadow; }
    if (state.upsideDown !== undefined) this.upsideDown = !!state.upsideDown;
    if (state.facing !== undefined) this.facing = state.facing;
    if (state.viewSide !== undefined) this.viewSide = state.viewSide;
    if (state.flatView !== undefined) this.viewSide = state.flatView;
    if (state.pose !== undefined) { this.pose = state.pose; this._syncPoseButtons(); }
    if (state.anim !== undefined) {
      const a = CHIBI_ANIM_ALIASES[state.anim] || state.anim;
      this.anim = CHIBI_ANIMS[a] ? a : 'none';
      this._syncAnimButtons();
    }
    if (state.headOverlay !== undefined) this.headOverlay = state.headOverlay;
    if (state.bodyOverlay !== undefined) this.bodyOverlay = state.bodyOverlay;
    if (state.shading !== undefined) this.shading = state.shading;
    if (state.shadingStrength !== undefined) {
      this.shadingStrength = state.shadingStrength;
      if (this.shadingSlider) this.shadingSlider.value = String(state.shadingStrength);
      if (this.shadingSliderValue) this.shadingSliderValue.textContent = String(state.shadingStrength);
    }
    if (state.visibility && typeof state.visibility === 'object' && !Array.isArray(state.visibility)) {
      this.partVisibility = { ...state.visibility };
      this.syncVisibilityCheckboxes();
    }
    this._syncViewButtons();
    this._syncStyleButtons();

    this.barebones = !!state.barebones;
    if (this.barebonesToggle) this.barebonesToggle.checked = this.barebones;
    if (state.barebonesThreshold !== undefined) {
      this.barebonesThreshold = state.barebonesThreshold;
      if (this.barebonesStrength) this.barebonesStrength.value = state.barebonesThreshold;
      if (this.barebonesStrengthValue) this.barebonesStrengthValue.textContent = String(state.barebonesThreshold);
    }
    this._syncBarebonesRow(this.barebones);

    if (state.material !== undefined) {
      this.currentMaterial = state.material;
      if (this.materialSelect) this.materialSelect.value = state.material;
    }
    if (state.bgColor !== undefined) {
      this.bgColor = state.bgColor;
      if (this.bgColorPicker) this.bgColorPicker.value = state.bgColor;
    }
    if (state.bgTransparent !== undefined) {
      this.bgTransparent = state.bgTransparent;
      if (this.bgTransparentCheckbox) this.bgTransparentCheckbox.checked = !!state.bgTransparent;
    }
    if (state.bgVignette !== undefined) {
      this.bgVignette = !!state.bgVignette;
      if (this.bgVignetteCheckbox) this.bgVignetteCheckbox.checked = !!state.bgVignette;
    }
    if (state.bgShape !== undefined) {
      this.bgShape = ['square', 'circle'].includes(state.bgShape) ? state.bgShape : 'none';
      this._syncBgShapeButtons();
      this._populateExportSizes();
      if (this.bgAspectRow) setVisible(this.bgAspectRow, this.bgShape === 'square');
      this._syncFillFrame();
    }
    if (state.bgAspect !== undefined) {
      this.bgAspect = state.bgAspect;
      this._syncAspectButtons();
    }
    if (state.fillFrame !== undefined) {
      this.fillFrame = !!state.fillFrame;
      this._syncFillFrame();
    }
    this._syncBgShapeButtons();
    if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, this._bgPaints());
    if (state.bgImageURI !== undefined) await this._applyBgImageURI(state.bgImageURI);
    if (state.charZoom !== undefined) this.charZoom = state.charZoom;
    if (state.charX !== undefined) this.charX = state.charX;
    if (state.charY !== undefined) this.charY = state.charY;
    this.updatePresetActive();
    this.updateBackground();
    if (state.outlineWidth !== undefined) {
      this.outlineWidth = Math.max(0, Math.min(10, Number(state.outlineWidth) || 0));
      this.outlineEnabled = this.outlineWidth > 0;
      if (this.outlineWidthSlider) this.outlineWidthSlider.value = this.outlineWidth;
      if (this.outlineSettingsRow) setVisible(this.outlineSettingsRow, this.outlineEnabled);
    }
    if (state.outlineByStyle && typeof state.outlineByStyle === 'object') {
      this._outlineByStyle = { classic: 0, live: 1, ...state.outlineByStyle };
      this._outlineAutoByStyle = { classic: false, live: true, ...state.outlineAutoByStyle };
      this._outlinePerPartByStyle = { classic: false, live: true, ...state.outlinePerPartByStyle };
    }
    if (state.outlinePerPart !== undefined) {
      this.outlinePerPart = !!state.outlinePerPart;
      if (this.outlinePerPartToggle) this.outlinePerPartToggle.checked = this.outlinePerPart;
    }
    if (state.outlineSharp !== undefined) {
      this.outlineSharp = !!state.outlineSharp;
      if (this.outlineSharpToggle) this.outlineSharpToggle.checked = this.outlineSharp;
    }
    if (state.outlineColor !== undefined) {
      this.outlineColor = state.outlineColor;
      if (this.outlineColorPicker) this.outlineColorPicker.value = state.outlineColor;
      if (this.outlineColorHexInput) this.outlineColorHexInput.value = String(state.outlineColor).replace('#', '');
    }
    if (state.farLegShade !== undefined) {
      this.farLegShade = !!state.farLegShade;
      if (this.farLegShadeToggle) this.farLegShadeToggle.checked = this.farLegShade;
    }
    if (state.outlineAuto !== undefined) {
      this.outlineAuto = !!state.outlineAuto;
      if (this.outlineAutoToggle) this.outlineAutoToggle.checked = this.outlineAuto;
      this._syncOutlineColorRow();
    }
    if (state.textureFilterPixelated !== undefined) {
      this.textureFilterPixelated = state.textureFilterPixelated;
      if (this.filterToggleBtn) this.filterToggleBtn.checked = !!state.textureFilterPixelated;
    }
    if (state.halfHeightUVs !== undefined) {
      this.halfHeightUVs = state.halfHeightUVs;
      if (this.halfHeightUVsToggle) this.halfHeightUVsToggle.checked = !!state.halfHeightUVs;
    }

    this._refreshSkinTexture();
  }

  pushUndo(preState = null) {
    const state = preState || this.captureFullState();
    this.undoStack.push(state);
    if (this.undoStack.length > 50) this.undoStack.shift();
    this.redoStack.length = 0;
    this.updateUndoButtons();
  }

  async undo() {
    if (this._undoLock || this._loading || this.undoStack.length === 0) return;
    this._undoLock = true;
    try {
      this.redoStack.push(this.captureFullState());
      await this.restoreFullState(this.undoStack.pop());
      this.updateUndoButtons();
    } finally {
      this._undoLock = false;
    }
  }

  async redo() {
    if (this._undoLock || this._loading || this.redoStack.length === 0) return;
    this._undoLock = true;
    try {
      this.undoStack.push(this.captureFullState());
      await this.restoreFullState(this.redoStack.pop());
      this.updateUndoButtons();
    } finally {
      this._undoLock = false;
    }
  }

  updateUndoButtons() {
    this.undoBtn.disabled = this.undoStack.length === 0;
    this.redoBtn.disabled = this.redoStack.length === 0;
    if (this.historyChip) {
      this.historyChip.classList.toggle('has-history', this.undoStack.length > 0 || this.redoStack.length > 0);
    }
  }

  serializeConfig() {
    return {
      version: ChibiSkinMaker.CONFIG_VERSION,
      tool: 'minecraft-chibi-skin-maker',
      model: { bodyType: this.bodyTypeMode, resolved: this.currentModelType },
      style: this.chibiStyle,
      detail: this.mlDetail,
      skin: this._skinDataUri
        ? { name: this.skinName || null, width: this._skinWidth || null, height: this._skinHeight || null, dataUri: this._skinDataUri }
        : null,
      view: this._viewKey(),
      bust: this.portraitView || null,
      upsideDown: this.upsideDown,
      facing: this.facing,
      pose: this.pose,
      anim: this.anim,
      chibi: { headOverlay: this.headOverlay, bodyOverlay: this.bodyOverlay, shading: this.shading, shadingStrength: this.shadingStrength, layerShadow: this.layerShadow },
      material: this.currentMaterial,
      background: { color: this.bgColor, transparent: !!this.bgTransparent, vignette: !!this.bgVignette, shape: this.bgShape || 'none', aspect: this.bgAspect || '1:1', image: this._bgImageURI || null, charZoom: Math.round((this.charZoom || 1) * 1000) / 1000, charX: Math.round(this.charX || 0), charY: Math.round(this.charY || 0), fillFrame: !!this.fillFrame },
      outline: { width: this.outlineWidth, sharp: !!this.outlineSharp, color: this.outlineColor, auto: this.outlineAuto, perPart: this.outlinePerPart },
      farLegShade: this.farLegShade,
      texture: { pixelated: !!this.textureFilterPixelated, barebones: !!this.barebones, barebonesThreshold: this.barebonesThreshold, halfHeightUVs: !!this.halfHeightUVs },
      export: { size: this.exportSize || null, gifSpeed: this.gifSpeedValue || 1,
               animFormat: this.animFormat || 'gif' },
      visibility: this._captureVisibility(),
    };
  }

  _formatConfigJSON(value, indent = '') {
    const next = indent + '  ';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      if (value.every(v => v === null || typeof v !== 'object')) {
        return '[ ' + value.map(v => JSON.stringify(v)).join(', ') + ' ]';
      }
      const items = value.map(v => next + this._formatConfigJSON(v, next));
      return '[\n' + items.join(',\n') + '\n' + indent + ']';
    }
    if (value && typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) return '{}';
      const items = keys.map(k => next + JSON.stringify(k) + ': ' + this._formatConfigJSON(value[k], next));
      return '{\n' + items.join(',\n') + '\n' + indent + '}';
    }
    return JSON.stringify(value);
  }

  async applyConfig(input) {
    if (this._configApplying) return;
    this._configApplying = true;
    const preState = this.captureFullState();
    try {
      const c = this._configMerge(ChibiSkinMaker.CONFIG_DEFAULTS, this._migrateConfig({ ...(input || {}) }));

      const style = ChibiSkinMaker.STYLES.includes(c.style) ? c.style : 'classic';
      const live = style === 'live';
      const vkey = (live && !ML_VIEW_KEYS.includes(c.view)) ? 'front' : c.view;
      const v = CHIBI_VIEWS[vkey] || CHIBI_VIEWS.front;
      const onOff = (x) => (x === 'off' ? 'off' : 'on');
      const state = {
        modelType: c.model.resolved === 'alex' ? 'alex' : 'steve',
        chibiStyle: style,
        mlDetail: ChibiSkinMaker.ML_DETAILS.includes(c.detail) ? c.detail : 'blocky',
        bodyTypeMode: ChibiSkinMaker.BODY_TYPES.includes(c.model.bodyType) ? c.model.bodyType : 'auto',
        sideProfile: !!v.side,
        vertView: v.vert || 'none',
        upsideDown: !!c.upsideDown,
        portraitView: ChibiSkinMaker.BUST_CUT[c.bust] !== undefined ? c.bust
          : (ChibiSkinMaker.BUST_CUT[c.view] !== undefined ? c.view : false),
        flatProfile: v.flat !== undefined ? v.flat : false,
        facing: v.facing || (c.facing === 'left' ? 'left' : 'right'),
        viewSide: v.vs || 'front',
        pose: live ? (ML_POSE_KEYS.includes(c.pose) ? c.pose : 'none')
          : (CHIBI_POSES[c.pose] ? c.pose : 'none'),
        anim: (() => {
          const k = CHIBI_ANIM_ALIASES[c.anim] || c.anim;
          if (!CHIBI_ANIMS[k]) return 'none';
          return (live && !ML_ANIM_KEYS.includes(k)) ? 'none' : k;
        })(),
        headOverlay: onOff(c.chibi.headOverlay),
        bodyOverlay: onOff(c.chibi.bodyOverlay),
        shading: onOff(c.chibi.shading),
        shadingStrength: Math.max(0, Math.min(100, Number.isFinite(Number(c.chibi.shadingStrength)) ? Number(c.chibi.shadingStrength) : 50)),
        layerShadow: !!c.chibi.layerShadow,
        material: c.material,
        bgColor: c.background.color,
        bgTransparent: !!c.background.transparent,
        bgVignette: !!c.background.vignette,
        bgShape: ['square', 'circle'].includes(c.background.shape) ? c.background.shape : 'none',
        bgAspect: ChibiSkinMaker.ASPECTS.includes(c.background.aspect) ? c.background.aspect : '1:1',
        bgImageURI: typeof c.background.image === 'string' && c.background.image.startsWith('data:image/') ? c.background.image : null,
        charZoom: (Number.isFinite(Number(c.background.charZoom)) && Number(c.background.charZoom) > 0)
          ? Math.max(0.1, Math.min(10, Number(c.background.charZoom))) : 1,
        charX: Math.max(-64, Math.min(64, Math.round(Number(c.background.charX) || 0))),
        charY: Math.max(-64, Math.min(64, Math.round(Number(c.background.charY) || 0))),
        fillFrame: !!c.background.fillFrame,
        outlineWidth: Math.max(0, Number(c.outline.width) || 0),
        outlineSharp: !!c.outline.sharp,
        outlineColor: c.outline.color,
        outlineAuto: c.outline.auto === undefined ? true : !!c.outline.auto,
        outlinePerPart: c.outline.perPart === undefined ? (c.style === 'live') : !!c.outline.perPart,
        farLegShade: c.farLegShade === undefined ? true : !!c.farLegShade,
        textureFilterPixelated: !!c.texture.pixelated,
        barebones: !!c.texture.barebones,
        barebonesThreshold: Math.max(12, Math.min(55, Number(c.texture.barebonesThreshold) || 30)),
        halfHeightUVs: !!c.texture.halfHeightUVs,
        visibility: (c.visibility && typeof c.visibility === 'object' && !Array.isArray(c.visibility)) ? c.visibility : {},
      };

      if (c.skin && c.skin.dataUri) {
        this.textureFilterPixelated = state.textureFilterPixelated;
        this.barebones = state.barebones;
        this.barebonesThreshold = state.barebonesThreshold;
        const img = await this._loadImage(c.skin.dataUri);
        if (!this._validSkinSize(img)) throw new Error(`The skin in the config has invalid dimensions (${img.width}x${img.height}).`);
        this.applySkinTexture(img);
        state.currentSkinImage = this.currentSkinImage;
        state.skinName = c.skin.name || null;
        state.skinDataUri = this._skinDataUri;
        state.skinWidth = this._skinWidth;
        state.skinHeight = this._skinHeight;
      } else {
        state.currentSkinImage = null;
        state.skinName = null;
        state.skinDataUri = null;
        state.skinWidth = null;
        state.skinHeight = null;
      }

      await this.restoreFullState(state);

      if (c.export && typeof c.export === 'object') {
        if (Number.isFinite(Number(c.export.size))) this.setExportSize(Number(c.export.size));
        if (Number.isFinite(Number(c.export.gifSpeed))) this.setGifSpeed(Number(c.export.gifSpeed));
        const wantFmt = c.export.animFormat;
        const tile = (this.animFormatBtns || []).find((b) => b.dataset.animFormat === wantFmt);
        if (tile && !tile.hidden) this.setAnimFormat(wantFmt);
        else if (wantFmt) this._pendingAnimFormat = wantFmt;
      }

      this.pushUndo(preState);
    } catch (err) {
      await this.restoreFullState(preState);
      throw err;
    } finally {
      this._configApplying = false;
    }
  }

  _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image could not be decoded'));
      img.src = src;
    });
  }

  _migrateConfig(cfg) {
    if (!cfg || typeof cfg !== 'object') return cfg;
    if ((Number(cfg.version) || 1) < 2) {
      delete cfg.shadows; delete cfg.lights; delete cfg.camera; delete cfg.visibility; delete cfg.pose;
      cfg.version = 2;
      cfg.tool = 'minecraft-chibi-skin-maker';
    }
    if ((Number(cfg.version) || 1) < 3) {
      if (cfg.style !== 'live' && cfg.outline && typeof cfg.outline === 'object') {
        cfg.outline = { ...cfg.outline, auto: false };
      }
      cfg.version = 3;
    }
    return cfg;
  }

  _configClone(v) {
    if (Array.isArray(v)) return v.map(x => this._configClone(x));
    if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = this._configClone(v[k]); return o; }
    return v;
  }

  _configMerge(base, src) {
    if (base && typeof base === 'object' && !Array.isArray(base)) {
      const out = {};
      for (const k of Object.keys(base)) out[k] = this._configClone(base[k]);
      if (src && typeof src === 'object' && !Array.isArray(src)) {
        for (const k of Object.keys(src)) out[k] = this._configMerge(base[k], src[k]);
      }
      return out;
    }
    if (Array.isArray(base)) return Array.isArray(src) ? src.map(x => this._configClone(x)) : this._configClone(base);
    if (src === undefined) return this._configClone(base);
    if (base === undefined) return (src && typeof src === 'object') ? this._configClone(src) : src;
    return (src && typeof src === 'object') ? this._configClone(base) : src;
  }

  setupConfigModal() {
    const overlay = document.getElementById('configOverlay');
    if (!overlay) return;
    const dropZone = document.getElementById('configDropZone');
    const fileInput = document.getElementById('configFile');
    const exportText = document.getElementById('configExport');
    const copyBtn = document.getElementById('configCopy');
    const downloadBtn = document.getElementById('configDownload');
    const statusEl = document.getElementById('configStatus');

    const setStatus = (msg, kind) => { if (statusEl) { statusEl.textContent = msg || ''; statusEl.className = 'config-status' + (kind ? ' ' + kind : ''); } };
    const refreshExport = () => { if (exportText) exportText.value = this._formatConfigJSON(this.serializeConfig()); };

    const readFile = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => importText(e.target.result, file.name);
      reader.onerror = () => setStatus('The file could not be read.', 'error');
      reader.readAsText(file);
    };
    const importText = async (text, name) => {
      if (this._configCloseTimer) { clearTimeout(this._configCloseTimer); this._configCloseTimer = null; }
      let cfg;
      try { cfg = JSON.parse(text); } catch { setStatus('The file is not valid JSON.', 'error'); return; }
      if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) { setStatus('A config must be a JSON object.', 'error'); return; }
      try {
        setStatus('Applying...', '');
        await this.applyConfig(cfg);
        refreshExport();
        setStatus('Loaded ' + (name || 'Config'), 'success');
        this._configCloseTimer = setTimeout(() => { if (this.openDialogEl === overlay) this.closeDialog(); }, 700);
      } catch (err) { console.error('Config import failed:', err); setStatus('This config could not be applied.', 'error'); }
    };

    if (this.configBtn) this.configBtn.addEventListener('click', () => { refreshExport(); setStatus(''); });

    if (dropZone) {
      dropZone.addEventListener('click', () => fileInput && fileInput.click());
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
      dropZone.addEventListener('dragleave', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault(); dropZone.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files);
        const f = files.find(x => x.type === 'application/json' || x.name.toLowerCase().endsWith('.json')) || files[0];
        if (f) readFile(f);
      });
    }
    if (fileInput) fileInput.addEventListener('change', (e) => { const f = e.target.files[0]; if (f) readFile(f); fileInput.value = ''; });
    ['dragover', 'drop'].forEach(ev => overlay.addEventListener(ev, (e) => e.preventDefault()));

    if (copyBtn) copyBtn.addEventListener('click', async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(exportText.value); ok = true; }
      catch { try { exportText.select(); ok = document.execCommand('copy'); } catch { ok = false; } }
      this._flashConfigBtn(copyBtn, ok ? 'Copied!' : 'Failed', ok);
    });
    if (downloadBtn) downloadBtn.addEventListener('click', () => {
      const base = (this.skinName || this.currentModelType || 'chibi').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'chibi';
      const blob = new Blob([exportText.value], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${base}-chibi-config.json`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this._flashConfigBtn(downloadBtn, 'Saved!', true);
    });
  }

  _flashBtn(btn, label, ok) {
    if (!btn) return;
    if (btn._flashTimer) clearTimeout(btn._flashTimer);
    const span = btn.querySelector('span');
    const icon = !span && btn.querySelector('svg');
    if (icon) {
      if (btn._origHTML == null) btn._origHTML = btn.innerHTML;
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        + (ok ? '<path d="M20 6 9 17l-5-5"/>' : '<path d="M18 6 6 18M6 6l12 12"/>') + '</svg>';
    } else {
      const target = span || btn;
      if (target.dataset.origLabel == null) target.dataset.origLabel = target.textContent;
      target.textContent = label;
    }
    btn.style.borderColor = ok ? '#4CAF50' : '#f44336';
    btn.style.color = ok ? '#4CAF50' : '#f44336';
    btn._flashTimer = setTimeout(() => {
      if (icon) { if (btn._origHTML != null) btn.innerHTML = btn._origHTML; }
      else { const t = btn.querySelector('span') || btn; t.textContent = t.dataset.origLabel; }
      btn.style.borderColor = ''; btn.style.color = '';
      btn._flashTimer = null;
    }, 1200);
  }
  _flashConfigBtn(btn, label, ok) { this._flashBtn(btn, label, ok); }

  _trackContinuousInput(el) {
    const arm = () => { if (!this._preActionState) this._preActionState = this.captureFullState(); };
    let changed = false;

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      changed = false;
      arm();
    });
    el.addEventListener('focus', () => { changed = false; arm(); });
    el.addEventListener('change', () => {
      changed = true;
      if (this._preActionState) {
        this.pushUndo(this._preActionState);
        this._preActionState = null;
      }
    });
    el.addEventListener('blur', () => {
      if (!changed) this._preActionState = null;
    });
  }

  setFormat(shape) {
    if (!['none', 'square', 'circle'].includes(shape)) shape = 'none';
    if (shape === (this.bgShape || 'none')) { this._syncBgShapeButtons(); return; }
    this.pushUndo();
    const wasFramed = (this.bgShape || 'none') !== 'none';
    this.bgShape = shape;
    this._afterFormatChange(wasFramed !== (shape !== 'none'));
  }

  _afterFormatChange(familyChanged = true) {
    this.updatePresetActive();
    this.updateBackground();
    if (this.bgAspectRow) setVisible(this.bgAspectRow, (this.bgShape || 'none') === 'square');
    this._syncFillFrame();
    if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, this._bgPaints());
    if (familyChanged) this.exportSize = this._defaultSizeFor(this.bgShape);
    this._draw();
    this._populateExportSizes();
    this._updateExportDims();
    this._updateGifInfo();
    this._syncBgShapeButtons();
    this.setStatus((this.bgShape || 'none') === 'none' ? 'Pixel-Art: das Sprite selbst.'
      : (this.bgShape === 'circle' ? 'Runder Avatar.' : 'Profilbild, ' + (this.bgAspect || '1:1') + '.'));
  }

  resetBackground() {
    const d = ChibiSkinMaker.CONFIG_DEFAULTS.background;
    const isDefault = this.bgColor === d.color && !!this.bgTransparent === d.transparent
      && !!this.bgVignette === d.vignette && (this.bgShape || 'none') === d.shape
      && (this.bgAspect || '1:1') === d.aspect
      && !this.bgImage && this.charZoom === 1 && !this.charX && !this.charY;
    if (isDefault) { this.setStatus('Background is already at its defaults.'); return; }
    this.pushUndo();
    this.bgColor = d.color;
    this.bgTransparent = d.transparent;
    this.bgVignette = d.vignette;
    this.bgShape = d.shape;
    this.bgImage = null; this._bgImageURI = null;
    this.bgAspect = d.aspect;
    this._syncAspectButtons();
    if (this.bgAspectRow) setVisible(this.bgAspectRow, false);
    this.fillFrame = false;
    this._syncFillFrame();
    this._syncBgImageTile();
    this.charZoom = 1; this.charX = 0; this.charY = 0;
    if (this.bgColorPicker) this.bgColorPicker.value = d.color;
    if (this.updatePresetActive) this.updatePresetActive(d.color);
    if (this.bgTransparentCheckbox) this.bgTransparentCheckbox.checked = d.transparent;
    if (this.bgVignetteCheckbox) this.bgVignetteCheckbox.checked = d.vignette;
    if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, this._bgPaints());
    this._syncBgShapeButtons();
    this._populateExportSizes();
    this.updateBackground();
    this.setStatus('Background reset.');
  }

  async _applyBgImageURI(uri) {
    if (!uri) {
      this.bgImage = null; this._bgImageURI = null;
    } else if (uri !== this._bgImageURI) {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = uri; }).catch(() => null);
      if (!img.naturalWidth) { this.setStatus('That file could not be read as an image.'); return; }
      this.bgImage = img; this._bgImageURI = uri;
      if (this.bgTransparent) {
        this.bgTransparent = false;
        if (this.bgTransparentCheckbox) this.bgTransparentCheckbox.checked = false;
        if (this.bgVignetteRow) setRowEnabled(this.bgVignetteRow, true);
      }
    }
    this._syncBgImageTile();
    this.updatePresetActive();
    this.updateBackground();
  }

  _syncBgImageTile() {
    if (!this.bgImageTile) return;
    this.bgImageTile.style.backgroundImage = this._bgImageURI ? 'url("' + this._bgImageURI + '")' : '';
    this.bgImageTile.classList.toggle('has-image', !!this.bgImage);
    this.bgImageTile.title = this.bgImage ? 'Change the background image' : 'Use an image background';
  }

  _syncBgShapeButtons() {
    const shape = this.bgShape || 'none';

    for (const b of this.bgShapeBtns || []) {
      const on = b.dataset.shape === shape;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
      const px = b.querySelector('.vp-format-px');
      if (!px) continue;
      const s = b.dataset.shape;
      const size = on ? (this.exportSize || this._defaultSizeFor(s)) : this._defaultSizeFor(s);
      const d = this._exportDims(s === 'none' ? 'sprite' : s, size);
      px.textContent = (d.w && d.h) ? (d.w + ' \u00d7 ' + d.h) : '\u2014';
    }

  }

  _bgPaints() {
    return !this.bgTransparent || (this.bgShape || 'none') === 'circle';
  }
  _defaultSizeFor(shape) {
    return (shape || 'none') === 'none' ? 1 : 1024;
  }

  _exportSizes() {
    if ((this.bgShape || 'none') !== 'none') {
      return { quick: [512, 1024], more: [128, 256, 320, 2048, 4096] };
    }
    return { quick: [1], more: [2, 4, 8, 16, 32] };
  }
  setExportSize(size) {
    if (!Number.isFinite(size) || size < 1) return;
    this.exportSize = size;
    this._syncExportSizeButtons();
    this._syncBgShapeButtons();
    this._updateExportDims();
    this._updateGifInfo();
  }

  setFillFrame(on) {
    const next = !!on;
    if (next === this.fillFrame) { this._syncFillFrame(); return; }
    this.pushUndo();
    this.fillFrame = next;
    this._syncFillFrame();
    this._draw();
    this._updateExportDims();
    this._updateGifInfo();
  }

  _syncFillFrame() {
    if (this.fillFrameInput) this.fillFrameInput.checked = !!this.fillFrame;
    if (this.fillFrameRow) setVisible(this.fillFrameRow, (this.bgShape || 'none') !== 'none');
  }

  setAspect(aspect) {
    if (!ChibiSkinMaker.ASPECTS.includes(aspect) || aspect === this.bgAspect) { this._syncAspectButtons(); return; }
    this.pushUndo();
    this.bgAspect = aspect;
    this._syncAspectButtons();
    this._draw();
    this._populateExportSizes();
    this._updateExportDims();
    this._updateGifInfo();
    this._syncBgShapeButtons();
    this.setStatus('Aspect ratio: ' + aspect + '.');
  }

  _syncAspectButtons() {
    if (this.bgAspectSelect) this.bgAspectSelect.value = this.bgAspect || '1:1';
  }

  setGifSpeed(speed) {
    if (!Number.isFinite(speed) || speed <= 0) return;
    this.gifSpeedValue = speed;
    this._syncGifSpeedButtons();
    this._updateGifInfo();
    this._animEnsureLoop();
  }

  _syncGifSpeedButtons() {
    if (this.gifSpeed) this.gifSpeed.value = String(this.gifSpeedValue || 1);
  }

  setAnimFormat(format) {
    if (!ANIM_FORMATS[format]) return;
    this.animFormat = format;
    this._syncAnimFormatButtons();
    this._updateGifInfo();
  }

  _syncAnimFormatButtons() {
    for (const b of this.animFormatBtns || []) {
      const on = b.dataset.animFormat === this.animFormat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  async _probeWebmAlpha() {
    if (this._webmProbed) return;
    this._webmProbed = true;
    const tile = (this.animFormatBtns || []).find((b) => b.dataset.animFormat === 'webm');
    if (!tile) return;
    try {
      if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported(WEBM_MIME)) return;
      const cv = document.createElement('canvas');
      cv.width = cv.height = 64;
      const cx = cv.getContext('2d');
      const stream = cv.captureStream(30);
      const rec = new MediaRecorder(stream, { mimeType: WEBM_MIME, videoBitsPerSecond: 200000 });
      const chunks = [];
      rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      const stopped = new Promise((res) => { rec.onstop = res; });
      rec.start(150);
      const deadline = performance.now() + WEBM_PROBE_MAX_MS;
      let frames = 0;
      let bytes = 0;
      while (performance.now() < deadline && bytes < WEBM_PROBE_MIN_BYTES) {
        cx.clearRect(0, 0, 64, 64); 
        cx.fillStyle = '#e03030';
        cx.fillRect((frames * 4) % 40, 16, 24, 24);
        frames++;
        await new Promise((r) => requestAnimationFrame(r));
        bytes = chunks.reduce((a, c) => a + c.size, 0);
      }
      rec.requestData();
      rec.stop();
      await stopped;
      for (const t of stream.getTracks()) t.stop();
      const u8 = new Uint8Array(await new Blob(chunks).arrayBuffer());
      let alphaBlocks = 0;
      for (let i = 0; i < u8.length - 1; i++) {
        if (u8[i] === 0x75 && u8[i + 1] === 0xA1) alphaBlocks++;
      }
      this._webmProbeInfo = { bytes: u8.byteLength, chunks: chunks.length, alphaBlocks, frames };
      if (alphaBlocks > 0) {
        tile.hidden = false;
        if (this._pendingAnimFormat === 'webm') this.setAnimFormat('webm');
      }
      this._pendingAnimFormat = null;
    } catch (e) {
    }
  }

  _syncExportSizeButtons() {
    if (this.exportSizeSelect) this.exportSizeSelect.value = String(this.exportSize);
  }

  _populateExportSizes() {
    const { quick, more } = this._exportSizes();
    const all = [...quick, ...more].sort((a, b) => a - b);
    const valid = new Set(all);
    if (!valid.has(this.exportSize)) this.exportSize = this._defaultSizeFor(this.bgShape);
    if (this.exportSizeSelect) {
      const layout = (this.bgShape || 'none') === 'none' ? 'sprite' : this.bgShape;
      this.exportSizeSelect.innerHTML = '';
      for (const value of all) {
        const d = this._exportDims(layout, value);
        const o = document.createElement('option');
        o.value = value;
        const sticker = d.w === 320 && d.h === 320;
        o.textContent = d.w + ' × ' + d.h +
          (value === 1 ? '  ·  native' : sticker ? '  ·  Discord sticker' : '');
        this.exportSizeSelect.appendChild(o);
      }
    }
    this._syncExportSizeButtons();
    this._syncAspectButtons();
  }

  _exportDims(layout, size) {
    const sprite = this._chibiCanvas;
    if (layout === 'sprite') {
      return { w: (sprite ? sprite.width : 0) * size, h: (sprite ? sprite.height : 0) * size };
    }
    const a = layout === 'circle' ? 1 : this._frameAspect();
    return {
      w: a >= 1 ? size : Math.round(size * a),
      h: a >= 1 ? Math.round(size / a) : size,
    };
  }

  _buildExportCanvas(layout, size, spriteSrc = null) {
    const sprite = spriteSrc || this._chibiCanvas;
    if (!sprite) return null;
    const out = document.createElement('canvas');
    const c = out.getContext('2d');
    if (layout === 'sprite') {
      out.width = sprite.width * size;
      out.height = sprite.height * size;
      if (!this.bgTransparent) this._paintExportBackground(c, out.width, out.height, false);
      c.imageSmoothingEnabled = false;
      c.drawImage(sprite, 0, 0, out.width, out.height);
      return out;
    }
    const dims = this._exportDims(layout, size);
    out.width = dims.w; out.height = dims.h;
    const fill = this._badgeFill(layout);
    const cuts = this._bustCuts();
    const fitH = this.portraitView ? Math.max(sprite.height, cuts[this.portraitView] || cuts.portrait) : sprite.height;
    const auto = this._badgeAuto(Math.min(dims.w / sprite.width, dims.h / fitH) * fill);
    const scale = this._badgeScale(auto);
    this._paintBadge(c, 0, 0, dims.w, dims.h, layout);
    c.imageSmoothingEnabled = false;
    const w = sprite.width * scale, h = sprite.height * scale;
    const ccx = dims.w / 2 + (this.charX || 0) * scale, ccy = dims.h / 2 + (this.charY || 0) * scale;
    c.drawImage(sprite, Math.round(ccx - w / 2), Math.round(ccy - h / 2), w, h);
    return out;
  }
  _badgeFill(shape) {
    if (this.fillFrame) return 1;
    return shape === 'circle' ? 0.68 : 0.9;
  }
  _fitScale() {
    const src = this._chibiCanvas;
    const cv = this.viewCanvas;
    if (!src || !cv) return 1;
    const fit = Math.min(cv.width / (src.width || 1), cv.height / (src.height || 1));
    return Math.max(0.1, fit * 0.85);
  }
  _viewBaseScale() {
    const src = this._chibiCanvas;
    const cv = this.viewCanvas;
    if (!src || !cv) return 1;
    const fit = Math.min(cv.width / (src.width || 1), cv.height / (src.height || 1));
    return Math.max(0.1, fit * 0.9);
  }
  _viewScale() {
    const base = this._viewBaseScale();
    return this.viewZoom > 0 ? Math.max(0.1, Math.min(60, this.viewZoom)) : base;
  }
  _badgeScale(fit) {
    if (this.fillFrame) return Math.max(0.01, fit);
    const zoomed = fit * (this.charZoom || 1);
    if (fit < 1) return Math.max(0.01, zoomed);
    return Math.max(1, Math.round(zoomed));
  }
  _badgeAuto(raw) {
    if (this.fillFrame) return Math.max(0.01, raw);
    if (raw >= 1) return Math.floor(raw);
    return 1 / Math.ceil(1 / raw);
  }
  _takeOverFromFill() {
    if (!this.fillFrame) return;
    const filled = this._badgeScale(this._fitScale());
    this.fillFrame = false;
    this._syncFillFrame();
    const auto = this._fitScale();
    this.charZoom = (filled === auto) ? 1 : filled / auto;
  }
  _frameAspect() {
    if ((this.bgShape || 'none') !== 'square') return 1;
    const [aw, ah] = String(this.bgAspect || '1:1').split(':').map(Number);
    return (aw > 0 && ah > 0) ? aw / ah : 1;
  }
  _frameSize(cvW, cvH) {
    const a = this._frameAspect();
    const h = Math.round(Math.min(cvH, cvW / a) * 0.92);
    return { w: Math.round(h * a), h };
  }
  _paintBadge(c, x, y, w, h, shape) {
    if (this.bgTransparent) return;
    if (shape === 'circle') {
      const d = Math.min(w, h);
      c.save();
      c.beginPath();
      c.arc(x + w / 2, y + h / 2, d / 2, 0, Math.PI * 2);
      c.clip();
      c.translate(x, y);
      this._paintExportBackground(c, w, h, true);
      c.restore();
    } else if (!this.bgTransparent) {
      c.save();
      c.translate(x, y);
      this._paintExportBackground(c, w, h, false);
      c.restore();
    }
  }
  _paintExportBackground(c, w, h, force) {
    if (this.bgTransparent && !force) return;
    if (this.bgImage) {
      const iw = this.bgImage.naturalWidth, ih = this.bgImage.naturalHeight;
      const k = Math.max(w / iw, h / ih);
      const dw = iw * k, dh = ih * k;
      c.save();
      c.beginPath(); c.rect(0, 0, w, h); c.clip();
      c.fillStyle = this.bgColor;
      c.fillRect(0, 0, w, h);
      c.drawImage(this.bgImage, (w - dw) / 2, (h - dh) / 2, dw, dh);
      c.restore();
      if (this.bgVignette) {
        const cx = w / 2, cy = h / 2;
        const R = Math.hypot(cx, cy) * 1.35;
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(0.3, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,0.45)');
        c.fillStyle = g;
        c.fillRect(0, 0, w, h);
      }
      return;
    }
    c.fillStyle = this.bgColor;
    c.fillRect(0, 0, w, h);
    if (this.bgVignette) {
      const cx = w / 2, cy = h / 2;
      const R = Math.hypot(cx, cy) * 1.35;
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, R);
      g.addColorStop(0, this.bgColor);
      g.addColorStop(0.3, this.bgColor);
      g.addColorStop(1, this._shadeHex(this.bgColor, 0.55));
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
    }
  }

  _exportSelection() {
    const layout = (this.bgShape || 'none') === 'none' ? 'sprite' : this.bgShape;
    const v = parseInt(this.exportSize, 10);
    const size = Number.isFinite(v) && v >= 1 ? v : (layout === 'sprite' ? 16 : 1024);
    return { layout, size };
  }

  _exportName(layout, size, ext) {
    const base = (this.skinName || this.currentModelType || 'chibi')
      .replace(/\.(png|jpe?g|webp|gif)$/i, '').replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '') || 'chibi';
    const d = this._exportDims(layout, size);
    const tag = layout === 'sprite' ? (size > 1 ? '-x' + size : '')
      : (layout === 'circle' ? '-circle-' + size : (d.w === d.h ? '-' + size : '-' + d.w + 'x' + d.h));
    return 'chibi-' + base + tag + '.' + ext;
  }

  _updateExportDims() {
    const cv = this._chibiCanvas;
    if (!this.exportDims || !cv) return;
    const { layout, size } = this._exportSelection();
    const lead = layout === 'sprite' ? 'Pixel art'
      : (layout === 'circle' ? 'Round avatar' : ChibiSkinMaker.ASPECT_NAMES[this.bgAspect || '1:1']);
    if (layout === 'sprite') {
      this.exportDims.textContent = lead + ' · ' + (cv.width * size) + ' × '
        + (cv.height * size) + ' px · never resampled.';
      return;
    }
    const fill = this._badgeFill(layout);
    const cuts = this._bustCuts();
    const fitH = this.portraitView ? Math.max(cv.height, cuts[this.portraitView] || cuts.portrait) : cv.height;
    const d = this._exportDims(layout, size);
    const auto = this._badgeAuto(Math.min(d.w / cv.width, d.h / fitH) * fill);
    const k = this._badgeScale(auto);
    this.exportDims.textContent = lead + ' · ' + d.w + ' × ' + d.h + ' px · character at '
      + (Number.isInteger(k) ? k : k.toFixed(2)) + 'x'
      + (this.fillFrame ? ', filling the frame.' : ', scroll or pinch to resize it.');
  }

  _updateGifInfo() {
    const anim = CHIBI_ANIMS[this.anim];
    if (this.downloadGifBtn) this.downloadGifBtn.disabled = false;
    const fmt = ANIM_FORMATS[this.animFormat] || ANIM_FORMATS.gif;
    if (this.downloadGifBtn && !this.downloadGifBtn._busy) {
      this.downloadGifBtn.textContent = 'Download ' + fmt.label;
      if (this.downloadGifBtn.dataset.origLabel != null) {
        this.downloadGifBtn.dataset.origLabel = this.downloadGifBtn.textContent;
      }
    }
    if (!this.gifInfo) return;
    const { layout, size } = this._exportSelection();
    const d = this._exportDims(layout, size);
    const px = ' \u00b7 ' + d.w + ' \u00d7 ' + d.h + ' px.';
    let note = fmt.note ? ' ' + fmt.note : '';
    let warn = false;
    if (this.animFormat === 'webm' && Math.max(d.w, d.h) > WEBM_MAX_SIDE) {
      note = ' WebM cannot record above ' + WEBM_MAX_SIDE + ' px. Pick a smaller size - Telegram stickers are 512.';
      if (this.downloadGifBtn) this.downloadGifBtn.disabled = true;
      warn = true;
    }
    this.gifInfo.classList.toggle('vp-hint-warn', warn);
    if (!anim) {
      this.gifInfo.textContent = 'No animation \u00b7 a single still frame' + px + note;
      return;
    }
    const speed = this.gifSpeedValue || 1;
    const count = (this._animFrames || anim.frames).length;
    const total = anim.frames.reduce((a, f) => a + f.d, 0) / speed;
    this.gifInfo.textContent = anim.label + ' \u00b7 ' + count + ' frames \u00b7 '
      + (total / 1000).toFixed(1) + 's per loop' + px + note;
  }
  exportPNG() {
    const { layout, size } = this._exportSelection();
    const cv = this._buildExportCanvas(layout, size);
    if (!cv) return;
    const name = this._exportName(layout, size, 'png');
    cv.toBlob((blob) => {
      if (!blob) { this.setStatus('Could not encode the PNG.'); this._flashBtn(this.downloadPngBtn, 'Failed', false); return; }
      const link = document.createElement('a');
      link.download = name;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      this.setStatus('PNG saved (' + cv.width + ' x ' + cv.height + ').');
      this._flashBtn(this.downloadPngBtn, 'Saved!', true);
      this._afterExport();
    }, 'image/png');
  }

  async copyPNG() {
    const { layout, size } = this._exportSelection();
    const cv = this._buildExportCanvas(layout, size);
    if (!cv) return;
    try {
      const png = new Promise((res) => cv.toBlob(res, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
      this.setStatus('PNG copied to the clipboard (' + cv.width + ' x ' + cv.height + ').');
      this._flashBtn(this.copyPngBtn, 'Copied!', true);
      this._afterExport();
    } catch (e) {
      this.setStatus('Copy failed - your browser may not allow image clipboard access.');
      this._flashBtn(this.copyPngBtn, 'Failed', false);
    }
  }

  async exportGIF() {
    const anim = CHIBI_ANIMS[this.anim];
    const frames = (anim && this._animFrames)
      ? this._animFrames
      : (this._chibiCanvas ? [{ cv: this._chibiCanvas, delay: 200 }] : null);
    if (!frames) {
      this.setStatus('Load a skin first.');
      return;
    }
    if (typeof window.GIF !== 'function') {
      this.setStatus('GIF export failed - local gif.js is not loaded.');
      return;
    }

    setBusy(this.downloadGifBtn, 'Encoding...');
    try {
      const { layout, size } = this._exportSelection();
      const speed = this.gifSpeedValue || 1;
      const prepared = [];
      let w = 0, h = 0;

      // gif.js 0.2.0 marks as transparent whichever palette entry comes closest to
      // one RGB key. With its NeuQuant palette that entry could be a skin colour:
      // the key stayed visible as bright green and a dark tone vanished instead.
      // Chibi frames rarely use more than 255 colours, so gif.js gets an exact
      // palette that holds the key once, and only frames with see-through pixels
      // ask for transparency (a solid background used to lose a colour too).
      const KEY = 0x01ff02;
      const kr = (KEY >> 16) & 255, kg = (KEY >> 8) & 255, kb = KEY & 255;
      const colors = new Set();

      for (const f of frames) {
        const src = this._buildExportCanvas(layout, size, f.cv);
        w = src.width; h = src.height;
        const tmp = document.createElement('canvas');
        tmp.width = w; tmp.height = h;
        const tc = tmp.getContext('2d', { willReadFrequently: true });
        tc.imageSmoothingEnabled = false;
        tc.drawImage(src, 0, 0);
        const img = tc.getImageData(0, 0, w, h), px = img.data;
        let keyed = false;
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] < 128) {
            px[i] = kr; px[i + 1] = kg; px[i + 2] = kb;
            keyed = true;
          } else if (px[i] === kr && px[i + 1] === kg && px[i + 2] === kb) {
            px[i + 1] = kg - 1; // a real pixel in the key colour must stay visible
          }
          px[i + 3] = 255;
          colors.add((px[i] << 16) | (px[i + 1] << 8) | px[i + 2]);
        }
        tc.putImageData(img, 0, 0);
        prepared.push({ ctx: tc, keyed, delay: Math.max(20, Math.round(f.delay / speed)) });
      }

      // Too many colours for an exact palette (a background image or vignette with
      // see-through corners): posterize the opaque pixels until they fit.
      const anyKeyed = prepared.some((f) => f.keyed);
      for (let bits = 1; anyKeyed && colors.size > 256 && bits <= 6; bits++) {
        colors.clear();
        for (const f of prepared) {
          const img = f.ctx.getImageData(0, 0, w, h), px = img.data;
          for (let i = 0; i < px.length; i += 4) {
            if (!(px[i] === kr && px[i + 1] === kg && px[i + 2] === kb)) {
              for (let c = i; c < i + 3; c++) px[c] = ((px[c] >> bits) << bits) | (1 << (bits - 1));
            }
            colors.add((px[i] << 16) | (px[i + 1] << 8) | px[i + 2]);
          }
          f.ctx.putImageData(img, 0, 0);
        }
      }
      let palette = false;
      if (colors.size <= 256) {
        palette = [];
        for (const c of colors) palette.push((c >> 16) & 255, (c >> 8) & 255, c & 255);
      }

      const gif = new window.GIF({
        workers: Math.min(2, Math.max(1, prepared.length)),
        quality: 6,
        repeat: 0,
        width: w,
        height: h,
        globalPalette: palette,
        workerScript: '/assets/JS/vendor/gif/gif.worker.js',
      });
      for (const f of prepared) {
        gif.setOption('transparent', f.keyed ? KEY : null);
        gif.addFrame(f.ctx, { copy: true, delay: f.delay });
      }

      const blob = await new Promise((resolve, reject) => {
        let done = false;
        const finish = (b) => { if (!done) { done = true; resolve(b); } };
        gif.on('finished', finish);
        gif.on('abort', () => { if (!done) { done = true; reject(new Error('GIF encoding aborted')); } });
        try { gif.render(); } catch (e) { reject(e); }
      });

      const link = document.createElement('a');
      link.download = this._exportName(layout, size, 'gif').replace(/\.gif$/, (anim ? '-' + this.anim : '') + '.gif');
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      this.setStatus('GIF saved (' + w + ' x ' + h + ', ' + frames.length + (frames.length === 1 ? ' frame).' : ' frames).'));
      this._gifSavedFlash = true;
    } catch (e) {
      this.setStatus('GIF export failed - ' + ((e && e.message) || 'unknown error') + '.');
    } finally {
      clearBusy(this.downloadGifBtn);
      if (this._gifSavedFlash) { this._gifSavedFlash = false; this._flashBtn(this.downloadGifBtn, 'Saved!', true); this._afterExport(); }
    }
  }

  exportAnimation() {
    if (this.animFormat === 'apng') return this.exportAPNG();
    if (this.animFormat === 'webm') return this.exportWEBM();
    return this.exportGIF();
  }

  _animExportFrames() {
    const anim = CHIBI_ANIMS[this.anim];
    if (anim && this._animFrames) return this._animFrames;
    return this._chibiCanvas ? [{ cv: this._chibiCanvas, delay: 200 }] : null;
  }

  _animTooBig(layout, size, frameCount) {
    const d = this._exportDims(layout, size);
    const bytes = d.w * d.h * 4 * Math.max(1, frameCount);
    if (bytes <= ANIM_MAX_BYTES) return null;
    return 'That is too large to encode as an animation (' + d.w + ' x ' + d.h + ', '
      + frameCount + ' frames). Pick 1024 or smaller - Discord stickers are 320, Signal and Telegram 512.';
  }

  _animExportName(layout, size, ext) {
    const anim = CHIBI_ANIMS[this.anim];
    const re = new RegExp('\\.' + ext + '$');
    return this._exportName(layout, size, ext).replace(re, (anim ? '-' + this.anim : '') + '.' + ext);
  }

  async exportAPNG() {
    const frames = this._animExportFrames();
    if (!frames) { this.setStatus('Load a skin first.'); return; }
    setBusy(this.downloadGifBtn, 'Encoding...');
    let saved = false;
    try {
      const mod = await import('/assets/JS/vendor/upng/upng.esm.js');
      const UPNG = mod.default || mod;
      const { layout, size } = this._exportSelection();
      const tooBig = this._animTooBig(layout, size, frames.length);
      if (tooBig) { this.setStatus(tooBig); return; }
      const speed = this.gifSpeedValue || 1;
      const bufs = [];
      const delays = [];
      let w = 0, h = 0;
      for (const f of frames) {
        const cv = this._buildExportCanvas(layout, size, f.cv);
        w = cv.width; h = cv.height;
        bufs.push(cv.getContext('2d').getImageData(0, 0, w, h).data.buffer);
        delays.push(Math.max(10, Math.round(f.delay / speed)));
        await new Promise((r) => requestAnimationFrame(r));
      }
      const bytes = UPNG.encode(bufs, w, h, 0, delays);
      const blob = new Blob([bytes], { type: 'image/png' });
      const link = document.createElement('a');
      link.download = this._animExportName(layout, size, 'png');
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      this.setStatus('APNG saved (' + w + ' x ' + h + ', ' + frames.length
        + (frames.length === 1 ? ' frame, ' : ' frames, ') + this._kb(blob.size) + ').');
      saved = true;
    } catch (e) {
      const loading = /import|fetch|network|module|dynamically/i.test(String((e && e.message) || ''));
      this.setStatus(loading
        ? 'APNG export failed - the encoder could not load. Check your connection.'
        : 'APNG export failed - ' + ((e && e.message) || 'unknown error') + '.');
    } finally {
      clearBusy(this.downloadGifBtn);
      if (saved) { this._flashBtn(this.downloadGifBtn, 'Saved!', true); this._afterExport(); }
    }
  }

  async exportWEBM() {
    const frames = this._animExportFrames();
    if (!frames) { this.setStatus('Load a skin first.'); return; }
    setBusy(this.downloadGifBtn, 'Recording...');
    let saved = false;
    try {
      const { layout, size } = this._exportSelection();
      const tooBig = this._animTooBig(layout, size, frames.length);
      if (tooBig) { this.setStatus(tooBig); return; }
      const dims = this._exportDims(layout, size);
      if (Math.max(dims.w, dims.h) > WEBM_MAX_SIDE) {
        this.setStatus('WebM cannot record at ' + dims.w + ' x ' + dims.h
          + ' - pick ' + WEBM_MAX_SIDE + ' or smaller. Telegram stickers are 512.');
        this._flashBtn(this.downloadGifBtn, 'Too large', false);
        return;
      }
      const speed = this.gifSpeedValue || 1;
      const built = frames.map((f) => ({ cv: this._buildExportCanvas(layout, size, f.cv), delay: f.delay }));
      const w = built[0].cv.width, h = built[0].cv.height;
      const stage = document.createElement('canvas');
      stage.width = w; stage.height = h;
      const sx = stage.getContext('2d');
      sx.imageSmoothingEnabled = false;

      const stream = stage.captureStream(30);
      const rec = new MediaRecorder(stream, { mimeType: WEBM_MIME, videoBitsPerSecond: WEBM_BITRATE });
      const chunks = [];
      rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      const stopped = new Promise((res) => { rec.onstop = res; });
      rec.start();
      const oneLoop = built.reduce((a, f) => a + f.delay / speed, 0);
      const budget = WEBM_MAX_MS - 250;
      const loops = Math.max(1, Math.min(4, Math.floor(budget / Math.max(1, oneLoop))));
      const stopAt = performance.now() + budget;
      let truncated = false;
      outer: for (let i = 0; i < loops; i++) {
        for (const f of built) {
          if (performance.now() >= stopAt) { truncated = true; break outer; }
          sx.clearRect(0, 0, w, h);
          sx.drawImage(f.cv, 0, 0);
          await new Promise((r) => setTimeout(r, Math.max(20, Math.round(f.delay / speed))));
        }
      }
      rec.stop();
      await stopped;
      for (const t of stream.getTracks()) t.stop();

      const blob = new Blob(chunks, { type: 'video/webm' });
      const head = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
      const isWebm = blob.size > 1024
        && head[0] === 0x1A && head[1] === 0x45 && head[2] === 0xDF && head[3] === 0xA3;
      if (!isWebm) {
        this.setStatus('WebM export failed - the recorder produced no video at ' + w + ' x ' + h
          + '. Try a smaller size.');
        return;
      }
      const link = document.createElement('a');
      link.download = this._animExportName(layout, size, 'webm');
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      const over = blob.size > WEBM_MAX_BYTES
        ? ' Over Telegram\'s 256 KB limit - try a smaller size or fewer frames.' : '';
      const cut = truncated ? ' Trimmed to the 3 second Telegram limit.' : '';
      this.setStatus('WebM saved (' + w + ' x ' + h + ', ' + this._kb(blob.size) + ').' + cut + over);
      saved = true;
    } catch (e) {
      this.setStatus('WebM export failed - ' + ((e && e.message) || 'unknown error') + '.');
    } finally {
      clearBusy(this.downloadGifBtn);
      if (saved) { this._flashBtn(this.downloadGifBtn, 'Saved!', true); this._afterExport(); }
    }
  }

  _kb(bytes) {
    return bytes >= 1024 * 1024
      ? (bytes / 1024 / 1024).toFixed(1) + ' MB'
      : Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }

  _sheetClips() {
    const live = this.chibiStyle === 'live';
    const keys = Object.keys(CHIBI_ANIMS).filter((k) => !live || ML_ANIM_KEYS.includes(k));
    return [{ name: 'pose-' + this.pose, kind: 'pose', def: { frames: [{ d: 0, pose: this.pose }] } }]
      .concat(keys.map((k) => ({ name: k, kind: 'anim', def: CHIBI_ANIMS[k] })));
  }

  async _bakeSheet(yieldToPaint = true) {
    const skin = this._skinToCanvas(this.currentSkinImage || this._defaultSkinImage);
    const clips = this._sheetClips();
    const baked = [];
    for (let i = 0; i < clips.length; i++) {
      const c = clips[i];
      if (yieldToPaint) await new Promise((r) => requestAnimationFrame(r));
      const r = this._bakeAnim(skin, c.def, true);
      if (r && r.frames && r.frames.length) baked.push({ ...c, ...r });
    }
    if (!baked.length) return null;
    const gMinX = Math.min(...baked.map((b) => b.minX));
    const gMinY = Math.min(...baked.map((b) => b.minY));
    const gMaxX = Math.max(...baked.map((b) => b.minX + b.W));
    const gMaxY = Math.max(...baked.map((b) => b.minY + b.H));
    const gW = gMaxX - gMinX, gH = gMaxY - gMinY;
    const probe = document.createElement('canvas');
    probe.width = gW; probe.height = gH;
    const pc = probe.getContext('2d', { willReadFrequently: true });
    pc.imageSmoothingEnabled = false;
    for (const b of baked) for (const f of b.frames) pc.drawImage(f.cv, b.minX - gMinX, b.minY - gMinY);
    const d = pc.getImageData(0, 0, gW, gH).data;
    let x0 = gW, y0 = gH, x1 = -1, y1 = -1;
    for (let y = 0; y < gH; y++) for (let x = 0; x < gW; x++) if (d[(y * gW + x) * 4 + 3] > 0) {
      if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y;
    }
    if (x1 < 0) return null;
    const cellW = x1 - x0 + 1, cellH = y1 - y0 + 1;
    const cols = Math.max(...baked.map((b) => b.frames.length));
    const rows = baked.length;
    const sheet = document.createElement('canvas');
    sheet.width = cellW * cols; sheet.height = cellH * rows;
    const sc = sheet.getContext('2d');
    sc.imageSmoothingEnabled = false;
    const meta = [];
    baked.forEach((b, row) => {
      b.frames.forEach((f, col) => {
        sc.drawImage(f.cv, b.minX - gMinX - x0 + col * cellW, b.minY - gMinY - y0 + row * cellH);
      });
      const views = new Set((b.def.frames || []).map((f) => f.view).filter(Boolean));
      meta.push({
        name: b.name, kind: b.kind, row, frames: b.frames.length,
        delaysMs: b.frames.map((f) => f.delay || 0),
        camera: views.size === 0 ? this._viewKey() : (views.size === 1 ? [...views][0] : 'cycles'),
      });
    });
    return { canvas: sheet, cellW, cellH, cols, rows, clips: meta };
  }

  _sheetName() {
    return this._exportName('sprite', 1, 'zip').replace(/\.zip$/, '-spritesheet.zip').replace(/-x1-/, '-');
  }

  async exportSheet() {
    if (this._sheetBusy) return;
    this._sheetBusy = true;
    this._sheetSavedFlash = false;
    setBusy(this.downloadSheetBtn, 'Baking...');
    try {
      const built = await this._bakeSheet();
      if (!built) throw new Error('nothing to draw');
      const png = await new Promise((res) => built.canvas.toBlob(res, 'image/png'));
      const base = this._sheetName().replace(/\.zip$/, '');
      const sidecar = {
        image: base + '.png',
        style: this.chibiStyle,
        camera: this._viewKey(),
        cell: { w: built.cellW, h: built.cellH },
        columns: built.cols,
        rows: built.rows,
        padding: 0,
        note: 'Every cell shares one origin, so a clip can be swapped mid-animation without the figure jumping. Rows shorter than `columns` are transparent-padded; `frames` is the authority.',
        clips: built.clips,
      };
      const enc = new TextEncoder();
      const zip = McCraftZip.zipStore([
        { name: base + '.png', data: new Uint8Array(await png.arrayBuffer()) },
        { name: base + '.json', data: enc.encode(JSON.stringify(sidecar, null, 2)) },
      ]);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zip);
      link.download = base + '.zip';
      link.click();
      URL.revokeObjectURL(link.href);
      this.setStatus('Spritesheet saved (' + built.canvas.width + ' x ' + built.canvas.height
        + ' px, ' + built.cols + ' x ' + built.rows + ' cells of ' + built.cellW + ' x ' + built.cellH
        + ', ' + built.rows + ' clips). The .json lists the rows and frame timings.');
      this._sheetSavedFlash = true;
    } catch (e) {
      this.setStatus('Spritesheet export failed - ' + ((e && e.message) || 'unknown error') + '.');
    } finally {
      this._sheetBusy = false;
      clearBusy(this.downloadSheetBtn);
      if (this._sheetSavedFlash) { this._sheetSavedFlash = false; this._flashBtn(this.downloadSheetBtn, 'Saved!', true); this._afterExport(); }
    }
  }

  _updateSheetInfo() {
    if (!this.sheetInfo) return;
    const n = this._sheetClips().length;
    const style = this.chibiStyle === 'live' ? 'Minecraft Live' : 'Classic';
    this.sheetInfo.textContent = style + ' · ' + this._viewLabel() + ' · ' + n
      + ' clips in one grid, native pixels, transparent · one .zip with a PNG and a JSON.';
  }

  _viewLabel() {
    const b = (this.viewButtons || []).find((x) => x.dataset.view === this._viewKey());
    return (b && (b.dataset.baseTitle || b.textContent || '').trim()) || this._viewKey();
  }
}

ChibiSkinMaker.BODY_TYPES = ['auto', 'steve', 'alex'];
ChibiSkinMaker.ASPECTS = ['1:1', '4:3', '16:9', '4:5', '9:16'];
ChibiSkinMaker.ASPECT_NAMES = {
  '1:1': 'Profile picture', '4:3': 'Classic 4:3', '16:9': 'Wide 16:9',
  '4:5': 'Post 4:5', '9:16': 'Story 9:16',
};

ChibiSkinMaker.CONFIG_VERSION = 3;
ChibiSkinMaker.BUST_CUT = { torso: 27, portrait: 22, head: 17 };
ChibiSkinMaker.BUST_LABEL = { torso: 'half body', portrait: 'portrait bust', head: 'head bust' };
ChibiSkinMaker.ML_BUST_CUT = { torso: 33, portrait: 30, head: 27 };
ChibiSkinMaker.STYLES = ['classic', 'live'];
ChibiSkinMaker.ML_DETAILS = ['blocky', 'fine'];

ChibiSkinMaker.CONFIG_DEFAULTS = {
  version: 2,
  tool: 'minecraft-chibi-skin-maker',
  model: { bodyType: 'auto', resolved: 'steve' },
  style: 'classic',
  detail: 'blocky',
  skin: { name: null, width: null, height: null, dataUri: null },
  view: 'front',
  bust: null,
  upsideDown: false,
  pose: 'none',
  anim: 'none',
  chibi: { headOverlay: 'on', bodyOverlay: 'on', shading: 'on', shadingStrength: 53, layerShadow: false },
  material: 'soft',
  background: { color: '#4a4a4a', transparent: true, vignette: false, shape: 'none', aspect: '1:1', image: null, charZoom: 1, charX: 0, charY: 0, fillFrame: false },
  outline: { width: 0, sharp: false, color: '#000000' },
  texture: { pixelated: true, barebones: false, barebonesThreshold: 30, halfHeightUVs: false },
  visibility: {},
};

new ChibiSkinMaker();

// ===== GLOBALER KLICK-SOUND =====
// initGlobalClickSounds() moved to main.js (initClickSound) - it is the same
// delegated implementation and applies to every page now.

// ===== ONLINE / OFFLINE TOASTS =====
function initConnectionToasts() {
    

    
}

// ===== SEITEN-INIT =====
function initPageUI() {
    initConnectionToasts();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageUI, { once: true });
} else {
    initPageUI();
}