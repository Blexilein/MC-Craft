// Map Art Generator page (English) — UI glue only.
// Pixel-matching/height logic lives in the shared assets/JS/map-art/core.js
// (run inside a Web Worker), download logic reuses window.StructureConverter.
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

const T = {
    loader_text: "Loading Map Art Generator...",
    loader_text2: "Initializing block database...",
    loader_text3: "Almost done...",
    toast_loaded_title: "Ready!",
    toast_loaded_message: "Upload an image to get started.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_theme_title: "Theme",
    toast_theme_to: "Switched to {theme}",
    status_idle: "No image loaded yet.",
    status_reading: "Reading image...",
    status_ready: "Ready to generate.",
    status_computing: "Computing blocks... (may take a moment for large maps)",
    status_done: "Done! {count} blocks, height {height}. Ready as {format} for download.",
    toast_generated_title: "Done!",
    toast_generated_message: "{count} blocks computed.",
    toast_error_title: "Error",
    error_UNSUPPORTED_INPUT: "This image file can't be read.",
    error_IMAGE_DECODE_FAILED: "The image could not be read – is it really an image file (PNG/JPG/WebP)?",
    error_BLOCK_COLORS_LOAD_FAILED: "The block color table could not be loaded. Please open this page via a server (not as a local file).",
    error_VOLUME_TOO_LARGE: "The result would be too large for this browser generator. Please choose a smaller map size.",
    error_NO_BLOCKS_SELECTED: "Please check at least one block in the block selection.",
    error_MAPDAT_NEEDS_ZIP: "A single .dat file only works at exactly a 1×1 map size. For larger maps, please use the ZIP download instead.",
    error_UNKNOWN: "An unexpected error occurred.",
    picker_summary: "{selected} of {total} blocks selected",
    toast_zip_title: "ZIP created!",
    toast_zip_message: "{count} map files in the ZIP."
};

function t(key, params = {}) {
    let text = T[key] || key;
    Object.entries(params).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
    return text;
}

const FORMAT_LABELS = { schematic: '.schematic', schem: '.schem', litematic: '.litematic', nbt: '.nbt', mapdat: '.dat (Minecraft map)' };
const ITEM_CATEGORY_FILES = ['building', 'color', 'gamemod', 'nature', 'redstone', 'spawneggs', 'utility'];
// block.category comes from the (German-only) items database; order + translate for display here.
const CATEGORY_ORDER = [
    'Natur', 'Baublöcke', 'Funktionsblöcke', 'Redstone-Blöcke',
    'Wolle', 'Teppich', 'Glas', 'Beton', 'Beton-Pulver', 'Terrakotta', 'Glasierte Terrakotta', 'Muschelkiste', 'Kissen',
    'Spawner', 'Spielmodus & Technik'
];
const CATEGORY_LABELS_EN = {
    'Natur': 'Nature', 'Baublöcke': 'Building Blocks', 'Funktionsblöcke': 'Functional Blocks',
    'Redstone-Blöcke': 'Redstone Blocks',
    'Wolle': 'Wool', 'Teppich': 'Carpet', 'Glas': 'Glass', 'Beton': 'Concrete',
    'Beton-Pulver': 'Concrete Powder', 'Terrakotta': 'Terracotta', 'Glasierte Terrakotta': 'Glazed Terracotta',
    'Muschelkiste': 'Shulker Box', 'Kissen': 'Cushion',
    'Spawner': 'Spawner', 'Spielmodus & Technik': 'Game Mode & Technical'
};
// "Farbige Blöcke" lumps every dyed material family together; split it by
// material so wool/carpet/glass/etc. each get their own picker category.
const COLOR_MATERIAL_SPLIT = [
    ['_wool', 'Wolle'], ['_carpet', 'Teppich'],
    ['_concrete_powder', 'Beton-Pulver'], ['_concrete', 'Beton'],
    ['_glazed_terracotta', 'Glasierte Terrakotta'], ['_terracotta', 'Terrakotta'],
    ['_stained_glass', 'Glas'], ['_shulker_box', 'Muschelkiste'], ['_cushion', 'Kissen']
];
function refineCategory(block) {
    const base = block.category || 'Other';
    if (base === 'Spawn-Eier') return 'Spawner';
    if (base !== 'Farbige Blöcke') return base;
    const name = block.id.split(':')[1] || '';
    for (const [suffix, label] of COLOR_MATERIAL_SPLIT) {
        if (name.endsWith(suffix)) return label;
    }
    if (name === 'glass') return 'Glas';
    if (name === 'terracotta') return 'Terrakotta';
    if (name === 'shulker_box') return 'Muschelkiste';
    return base;
}

// Official Mojang map-color names (internal MapColor enum), IDs 1-61,
// verified against minecraft.wiki/w/Map_item_format.
const MAP_COLOR_NAMES = {
    1: 'Grass', 2: 'Sand', 3: 'Wool', 4: 'Fire', 5: 'Ice', 6: 'Metal', 7: 'Plant', 8: 'Snow',
    9: 'Clay', 10: 'Dirt', 11: 'Stone', 12: 'Water', 13: 'Wood', 14: 'Quartz',
    15: 'Orange', 16: 'Magenta', 17: 'Light Blue', 18: 'Yellow', 19: 'Light Green', 20: 'Pink',
    21: 'Gray', 22: 'Light Gray', 23: 'Cyan', 24: 'Purple', 25: 'Blue', 26: 'Brown', 27: 'Green', 28: 'Red', 29: 'Black',
    30: 'Gold', 31: 'Diamond', 32: 'Lapis', 33: 'Emerald', 34: 'Podzol', 35: 'Nether',
    36: 'White Terracotta', 37: 'Orange Terracotta', 38: 'Magenta Terracotta', 39: 'Light Blue Terracotta',
    40: 'Yellow Terracotta', 41: 'Light Green Terracotta', 42: 'Pink Terracotta', 43: 'Gray Terracotta',
    44: 'Light Gray Terracotta', 45: 'Cyan Terracotta', 46: 'Purple Terracotta', 47: 'Blue Terracotta',
    48: 'Brown Terracotta', 49: 'Green Terracotta', 50: 'Red Terracotta', 51: 'Black Terracotta',
    52: 'Crimson Nylium', 53: 'Crimson Stem', 54: 'Crimson Hyphae', 55: 'Warped Nylium',
    56: 'Warped Stem', 57: 'Warped Hyphae', 58: 'Warped Wart Block',
    59: 'Deepslate', 60: 'Raw Iron', 61: 'Glow Lichen'
};
const SHADE_INFO = [
    { id: 0, mult: 180, label: 'Level 0' },
    { id: 1, mult: 220, label: 'Level 1' },
    { id: 2, mult: 255, label: 'Level 2 (normal)' },
    { id: 3, mult: 135, label: 'Level 3' }
];

function toHex(n) {
    return Math.round(n).toString(16).padStart(2, '0');
}
function shadeHex(base, mult) {
    return '#' + toHex(base.r * mult / 255) + toHex(base.g * mult / 255) + toHex(base.b * mult / 255);
}

function buildOfficialColorsTable() {
    const container = document.getElementById('officialColorsTable');
    if (!container || !window.MapArtGenerator) return;
    const rows = window.MapArtGenerator.OFFICIAL_MAP_COLORS.map((c) => {
        const cells = SHADE_INFO.map((s) => {
            const hex = shadeHex(c, s.mult);
            return `<td><span class="ma-swatch" style="background:${hex}" title="${s.label}"></span><code>${hex}</code></td>`;
        }).join('');
        return `<tr><td>${c.id}</td><td>${MAP_COLOR_NAMES[c.id] || '—'}</td>${cells}</tr>`;
    }).join('');
    container.innerHTML =
        '<table class="ma-color-table"><thead><tr>' +
        '<th>ID</th><th>Name</th>' + SHADE_INFO.map((s) => `<th>${s.label}<br><span class="ma-hint">×${s.mult}/255</span></th>`).join('') +
        '</tr></thead><tbody>' + rows + '</tbody></table>';
}

function renderBlockColorTable(blocks, query) {
    const container = document.getElementById('blockColorTable');
    if (!container) return;
    const q = (query || '').trim().toLowerCase();
    const filtered = q
        ? blocks.filter((b) => b.nameEn.toLowerCase().includes(q) || b.id.toLowerCase().includes(q))
        : blocks;

    const byCategory = new Map();
    filtered.forEach((b) => {
        const cat = refineCategory(b);
        if (!byCategory.has(cat)) byCategory.set(cat, []);
        byCategory.get(cat).push(b);
    });
    const orderedCats = [...byCategory.keys()].sort((a, b) => {
        const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p class="ma-hint">No blocks found.</p>';
        return;
    }

    container.innerHTML = orderedCats.map((cat) => {
        const items = byCategory.get(cat).sort((a, b) => a.nameEn.localeCompare(b.nameEn, 'en'));
        const rows = items.map((b) => {
            const hex = '#' + toHex(b.r) + toHex(b.g) + toHex(b.b);
            return `<tr><td><img src="${b.icon}" alt="" loading="lazy" width="28" height="28"></td>` +
                `<td>${b.nameEn}</td><td><span class="ma-swatch" style="background:${hex}"></span><code>${hex}</code></td>` +
                `<td>${b.r}, ${b.g}, ${b.b}</td></tr>`;
        }).join('');
        return `<h4 class="ma-block-color-cat">${CATEGORY_LABELS_EN[cat] || cat} <span class="ma-hint">(${items.length})</span></h4>` +
            '<table class="ma-color-table ma-block-color-table"><thead><tr><th></th><th>Name</th><th>Hex</th><th>RGB</th></tr></thead>' +
            `<tbody>${rows}</tbody></table>`;
    }).join('');
}

async function initColorReference() {
    buildOfficialColorsTable();
    const colors = await ensureBlockColors();
    const blocks = [...colors.values()];
    renderBlockColorTable(blocks, '');
    const searchInput = document.getElementById('blockColorSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => renderBlockColorTable(blocks, searchInput.value));
    }
}

// order values match tools/generate_map_art_colors.py's version_order() tiers
const VERSION_PRESETS = [
    { value: '0', label: 'Classic' },
    { value: '1999', label: 'Alpha' },
    { value: '2999', label: 'Beta' },
    { value: '13600', label: '1.6' },
    { value: '13700', label: '1.7' },
    { value: '13800', label: '1.8 (e.g. 1.8.9)' },
    { value: '13900', label: '1.9' },
    { value: '14100', label: '1.11' },
    { value: '14200', label: '1.12' },
    { value: '14300', label: '1.13' },
    { value: '14400', label: '1.14' },
    { value: '14600', label: '1.16' },
    { value: '14700', label: '1.17' },
    { value: '14900', label: '1.19' },
    { value: '15000', label: '1.20' },
    { value: '15100', label: '1.21' },
    { value: '999999', label: 'Current (no restriction)' }
];

const toastContainer = document.getElementById('toastContainer');
const loader = document.getElementById('loader');
const header = document.querySelector('.header');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadFilename = document.getElementById('uploadFilename');
const gridSizeXInput = document.getElementById('gridSizeX');
const gridSizeYInput = document.getElementById('gridSizeY');
const gridSizePx = document.getElementById('gridSizePx');
const buildModeSelect = document.getElementById('buildMode');
const ditherToggle = document.getElementById('ditherToggle');
const contrastRange = document.getElementById('contrastRange');
const contrastValue = document.getElementById('contrastValue');
const blockSelectionModeSelect = document.getElementById('blockSelectionMode');
const blockPicker = document.getElementById('blockPicker');
const versionCutoffSelect = document.getElementById('versionCutoff');
const applyVersionCutoffBtn = document.getElementById('applyVersionCutoff');
const pickerSummary = document.getElementById('pickerSummary');
const selectAllBlocksBtn = document.getElementById('selectAllBlocks');
const selectNoneBlocksBtn = document.getElementById('selectNoneBlocks');
const pickerList = document.getElementById('pickerList');
const pickerSearch = document.getElementById('pickerSearch');
const targetFormatSelect = document.getElementById('targetFormat');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const downloadZipBtn = document.getElementById('downloadZipBtn');
const maStatus = document.getElementById('maStatus');
const previewWrap = document.getElementById('previewWrap');
const originalPreview = document.getElementById('originalPreview');
const previewCanvas = document.getElementById('previewCanvas');
const previewMeta = document.getElementById('previewMeta');
const materialsList = document.getElementById('materialsList');

let currentFile = null;
let currentOriginalUrl = null;
let currentModel = null;
let currentMapDatColors = null; // Uint8Array(cols*rows), independent of currentModel
let currentCols = 0;
let currentRows = 0;
let convertedResult = null;
let currentTotalBlocks = 0;
let blockColorsById = null; // Map<id, {r,g,b,icon,category,versionOrder}>
let blockNameById = null;   // Map<id, displayName>
let worker = null;
let blockSelected = null;   // Map<id, boolean>, built lazily on first "custom" switch
let pickerBuilt = false;

/* --------------------------------- Toast --------------------------------- */
function showToast(title, message, type = 'info') {
    if (!toastContainer) return;
    let cls = '', icon = 'fa-check';
    if (type === 'error') { cls = 'error-toast'; icon = 'fa-exclamation-triangle'; }
    else if (type === 'warning') { cls = 'warning-toast'; icon = 'fa-triangle-exclamation'; }
    const toast = document.createElement('div');
    toast.className = `toast ${cls}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 80);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}

/* --------------------------------- Sound -------------------------------- */
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.25;
        levelUpSound.preload = 'auto';
    } catch (_) {}
}
function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    levelUpSound.currentTime = 0;
    levelUpSound.volume = 0.25;
    levelUpSound.play().catch(() => {});
}
function playClickSound() {
    if (!soundEnabled) return;
    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const last = window.__mcCraftLastClickSoundAt || 0;
    if (now - last < 120) return;
    window.__mcCraftLastClickSoundAt = now;
    try {
        const audioCtx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => { window.__mcCraftLastClickSoundAt = 0; playClickSound(); }).catch(() => {});
            return;
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        setTimeout(() => osc.stop(), 100);
    } catch (e) {}
}
function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    ['soundIcon', 'mobileSoundIcon'].forEach((id) => {
        const icon = document.getElementById(id);
        if (icon) icon.src = src;
    });
}
function initSound() {
    const toggleSound = () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('mc-craft-sound', String(soundEnabled));
        updateSoundIcon();
        playClickSound();
        showToast(t('toast_sound_title'), soundEnabled ? t('toast_sound_on') : t('toast_sound_off'));
    };
    ['soundBtn', 'mobileSoundBtn'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', toggleSound);
    });
}

/* --------------------------------- Theme -------------------------------- */
function getThemeName(theme) {
    if (theme === 'nether') return t('theme_nether');
    if (theme === 'end') return t('theme_end');
    return t('theme_overworld');
}
function initTheme() {
    const theme = localStorage.getItem('mc-craft-theme') || 'overworld';
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mc-craft-theme', theme);
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    showToast(t('toast_theme_title'), t('toast_theme_to', { theme: getThemeName(theme) }));
}
function initThemeSwitcher() {
    if (themeBtn && themeDropdown) {
        themeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            themeDropdown.classList.toggle('show');
            playClickSound();
        });
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.theme-switcher')) themeDropdown.classList.remove('show');
        });
        document.querySelectorAll('.theme-option').forEach((option) => {
            option.addEventListener('click', () => {
                setTheme(option.dataset.theme);
                themeDropdown.classList.remove('show');
                playClickSound();
            });
        });
    }
    document.querySelectorAll('.theme-option-btn').forEach((option) => {
        option.addEventListener('click', () => { setTheme(option.dataset.theme); playClickSound(); });
    });
}

/* ------------------------------ Mobile menu ------------------------------ */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeBtn = document.getElementById('closeBtn');
    if (!mobileMenuBtn || !mobileNav || !closeBtn) return;
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('show');
        document.body.style.overflow = 'hidden';
        playClickSound();
    });
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        document.body.style.overflow = '';
        playClickSound();
    });
    mobileNav.addEventListener('click', (event) => {
        if (event.target === mobileNav) {
            mobileNav.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    mobileNav.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('show');
            document.body.style.overflow = '';
        });
    });
}

function initTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop && !header) return;
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 30);
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 400);
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
}

/* --------------------------------- Loader --------------------------------- */
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
    if (!loader) return;
    let progress = 0;
    const loadingText = loader.querySelector('.loading-text');
    const texts = [t('loader_text'), t('loader_text2'), t('loader_text3')];
    let index = 0;
    const progressInterval = window.setInterval(() => {
        progress += 25;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            window.clearInterval(progressInterval);
            window.setTimeout(() => {
                loader.classList.add('hidden');
                window.setTimeout(() => {
                    loader.style.display = 'none';
                    showToast(t('toast_loaded_title'), t('toast_loaded_message'));
                    playLevelUpSound();
                }, 150);
            }, 300);
            return;
        }
        if (loadingText && index < texts.length - 1) {
            index += 1;
            loadingText.textContent = texts[index];
        }
    }, 120);
}

function initFooterYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = String(new Date().getFullYear());
}

/* ------------------------------ Generator UI ------------------------------ */
function setStatus(msg) { if (maStatus) maStatus.textContent = msg; }

function handleError(err) {
    console.error(err);
    const code = err && (err.code || (err.message === 'MAP_ART_VOLUME_TOO_LARGE' ? 'VOLUME_TOO_LARGE' : null));
    const message = code ? (T['error_' + code] || T.error_UNKNOWN) : T.error_UNKNOWN;
    setStatus(message);
    showToast(t('toast_error_title'), message, 'error');
}

function populateTargetFormats() {
    // Keep whatever format the user had picked across re-generations (e.g.
    // changing grid size/mode and clicking Generate again) instead of always
    // resetting back to litematic.
    const previous = targetFormatSelect.value;
    targetFormatSelect.innerHTML = '';
    Object.keys(window.StructureConverter.FORMATS).forEach((fmt) => {
        const opt = document.createElement('option');
        opt.value = fmt;
        opt.textContent = FORMAT_LABELS[fmt];
        targetFormatSelect.appendChild(opt);
    });
    const mapDatOpt = document.createElement('option');
    mapDatOpt.value = 'mapdat';
    mapDatOpt.textContent = FORMAT_LABELS.mapdat;
    targetFormatSelect.appendChild(mapDatOpt);
    targetFormatSelect.value = previous || 'litematic';
    targetFormatSelect.disabled = false;
}

async function loadBlockNameLookup() {
    if (blockNameById) return blockNameById;
    blockNameById = new Map();
    await Promise.all(ITEM_CATEGORY_FILES.map(async (cat) => {
        try {
            const resp = await fetch(`/assets/JS/items/en_${cat}.json`);
            if (!resp.ok) return;
            const data = await resp.json();
            for (const entry of data) {
                if (entry && entry.id && entry.name && !blockNameById.has(entry.id)) {
                    blockNameById.set(entry.id, entry.name);
                }
            }
        } catch (_) {}
    }));
    return blockNameById;
}

async function ensureBlockColors() {
    if (blockColorsById) return blockColorsById;
    const blocks = await window.MapArtGenerator.loadBlockColors();
    blockColorsById = new Map(blocks.map((b) => [b.id, b]));
    return blockColorsById;
}

function updatePickerSummary() {
    const total = blockSelected.size;
    let selected = 0;
    blockSelected.forEach((v) => { if (v) selected++; });
    pickerSummary.textContent = t('picker_summary', { selected, total });
}

async function buildBlockPicker() {
    if (pickerBuilt) return;
    pickerBuilt = true;
    const [colors, names] = await Promise.all([ensureBlockColors(), loadBlockNameLookup()]);

    blockSelected = new Map();
    const byCategory = new Map();
    for (const block of colors.values()) {
        blockSelected.set(block.id, true);
        const cat = refineCategory(block);
        if (!byCategory.has(cat)) byCategory.set(cat, []);
        byCategory.get(cat).push(block);
    }

    VERSION_PRESETS.forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.value;
        opt.textContent = p.label;
        if (p.label.startsWith('Current')) opt.selected = true;
        versionCutoffSelect.appendChild(opt);
    });

    pickerList.innerHTML = '';
    const orderedCategories = Array.from(byCategory.keys()).sort((a, b) => {
        const ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
        return (ia === -1 ? CATEGORY_ORDER.length : ia) - (ib === -1 ? CATEGORY_ORDER.length : ib);
    });
    for (const cat of orderedCategories) {
        const blocks = byCategory.get(cat);
        blocks.sort((a, b) => (names.get(a.id) || a.id).localeCompare(names.get(b.id) || b.id));
        const catDiv = document.createElement('div');
        catDiv.className = 'ma-picker-category';
        const head = document.createElement('div');
        head.className = 'ma-picker-category-head';
        head.innerHTML = `<input type="checkbox" class="ma-picker-cat-toggle" checked title="Select/deselect the whole category"><span>${CATEGORY_LABELS_EN[cat] || cat}</span> <span class="ma-picker-cat-count">(${blocks.length})</span> <i class="fas fa-chevron-down"></i>`;
        const catCheckbox = head.querySelector('.ma-picker-cat-toggle');
        catCheckbox.addEventListener('click', (e) => e.stopPropagation());
        catCheckbox.addEventListener('change', () => {
            const checked = catCheckbox.checked;
            catCheckbox.indeterminate = false;
            body.querySelectorAll('.ma-picker-tile').forEach((tile) => {
                blockSelected.set(tile.dataset.id, checked);
                tile.classList.toggle('selected', checked);
                tile.classList.toggle('excluded', !checked);
            });
            updatePickerSummary();
        });
        head.addEventListener('click', () => catDiv.classList.toggle('collapsed'));
        catDiv.appendChild(head);

        const body = document.createElement('div');
        body.className = 'ma-picker-category-body';
        for (const block of blocks) {
            const name = names.get(block.id) || block.id.replace('minecraft:', '');
            const tile = document.createElement('div');
            tile.className = 'ma-picker-tile selected';
            tile.dataset.id = block.id;
            tile.dataset.name = name.toLowerCase();
            tile.title = name;
            tile.innerHTML = `<img src="${block.icon}" alt="" loading="lazy"><i class="fas fa-ban ma-picker-tile-ban"></i>`;
            tile.addEventListener('click', () => {
                const nowSelected = !blockSelected.get(block.id);
                blockSelected.set(block.id, nowSelected);
                tile.classList.toggle('selected', nowSelected);
                tile.classList.toggle('excluded', !nowSelected);
                syncCategoryCheckboxes();
                updatePickerSummary();
            });
            body.appendChild(tile);
        }
        catDiv.appendChild(body);
        pickerList.appendChild(catDiv);
    }
    updatePickerSummary();
}

function syncCategoryCheckboxes() {
    pickerList.querySelectorAll('.ma-picker-category').forEach((catDiv) => {
        const checkbox = catDiv.querySelector('.ma-picker-cat-toggle');
        const tiles = catDiv.querySelectorAll('.ma-picker-tile');
        const selectedCount = Array.from(tiles).filter((t) => blockSelected.get(t.dataset.id)).length;
        checkbox.checked = selectedCount === tiles.length;
        checkbox.indeterminate = selectedCount > 0 && selectedCount < tiles.length;
    });
}

function setAllTiles(selected) {
    blockSelected.forEach((_, id) => blockSelected.set(id, selected));
    pickerList.querySelectorAll('.ma-picker-tile').forEach((tile) => {
        tile.classList.toggle('selected', selected);
        tile.classList.toggle('excluded', !selected);
    });
    syncCategoryCheckboxes();
    updatePickerSummary();
}

function applyVersionCutoff() {
    const threshold = Number(versionCutoffSelect.value);
    const colors = blockColorsById;
    pickerList.querySelectorAll('.ma-picker-tile').forEach((tile) => {
        const id = tile.dataset.id;
        const info = colors.get(id);
        const allowed = info ? info.versionOrder <= threshold : true;
        tile.classList.toggle('selected', allowed);
        tile.classList.toggle('excluded', !allowed);
        blockSelected.set(id, allowed);
    });
    syncCategoryCheckboxes();
    updatePickerSummary();
    playClickSound();
}

function filterPickerBySearch(query) {
    const q = query.trim().toLowerCase();
    pickerList.querySelectorAll('.ma-picker-category').forEach((catDiv) => {
        let anyVisible = false;
        catDiv.querySelectorAll('.ma-picker-tile').forEach((tile) => {
            const match = !q || tile.dataset.name.includes(q);
            tile.classList.toggle('search-hidden', !match);
            if (match) anyVisible = true;
        });
        catDiv.classList.toggle('search-hidden', !anyVisible);
        if (q && anyVisible) catDiv.classList.remove('collapsed');
    });
}

function getSelectedBlockIds() {
    if (blockSelectionModeSelect.value !== 'custom' || !blockSelected) return null;
    const ids = [];
    blockSelected.forEach((checked, id) => { if (checked) ids.push(id); });
    return ids;
}

function initBlockPicker() {
    blockSelectionModeSelect.addEventListener('change', async () => {
        const custom = blockSelectionModeSelect.value === 'custom';
        if (custom) await buildBlockPicker();
        blockPicker.classList.toggle('show', custom);
        playClickSound();
    });
    selectAllBlocksBtn.addEventListener('click', () => { setAllTiles(true); playClickSound(); });
    selectNoneBlocksBtn.addEventListener('click', () => { setAllTiles(false); playClickSound(); });
    applyVersionCutoffBtn.addEventListener('click', applyVersionCutoff);
    pickerSearch.addEventListener('input', () => filterPickerBySearch(pickerSearch.value));
}

function getWorker() {
    if (!worker) worker = new Worker('/assets/JS/map-art/worker.js');
    return worker;
}

function renderPreview(previewRGBA, cols, rows) {
    previewCanvas.width = cols;
    previewCanvas.height = rows;
    const ctx = previewCanvas.getContext('2d');
    ctx.putImageData(new ImageData(previewRGBA, cols, rows), 0, 0);
    previewWrap.classList.add('show');
}

async function renderMaterials(materialCountsEntries) {
    const names = await loadBlockNameLookup();
    const colors = await ensureBlockColors();
    const sorted = materialCountsEntries.slice().sort((a, b) => b[1] - a[1]);
    materialsList.innerHTML = '';
    for (const [blockId, count] of sorted) {
        const info = colors.get(blockId);
        const name = names.get(blockId) || blockId.replace('minecraft:', '');
        const row = document.createElement('div');
        row.className = 'ma-material-row';
        row.innerHTML = `
            ${info ? `<img class="ma-material-icon" src="${info.icon}" alt="" loading="lazy">` : ''}
            <span class="ma-material-name">${name}</span>
            <span class="ma-material-count">${count.toLocaleString('en-US')}</span>
        `;
        materialsList.appendChild(row);
    }
    materialsList.classList.add('show');
}

function totalBlockCount(materialCountsEntries) {
    return materialCountsEntries.reduce((sum, [, c]) => sum + c, 0);
}

async function handleGenerate() {
    if (!currentFile) return;
    playClickSound();
    convertBtn.disabled = true;
    downloadBtn.disabled = true;
    setStatus(t('status_computing'));
    materialsList.classList.remove('show');
    previewWrap.classList.remove('show');

    const [cols, rows] = getGridPixelSize();
    const mode = buildModeSelect.value;
    const allowedIds = getSelectedBlockIds();
    if (allowedIds && allowedIds.length === 0) {
        convertBtn.disabled = false;
        const err = new Error('no blocks selected');
        err.code = 'NO_BLOCKS_SELECTED';
        handleError(err);
        return;
    }

    try {
        const bitmap = await createImageBitmap(currentFile);
        const w = getWorker();
        const result = await new Promise((resolve, reject) => {
            w.onmessage = (e) => resolve(e.data);
            w.onerror = (e) => reject(new Error(e.message || 'worker error'));
            w.postMessage({ bitmap, cols, rows, mode, allowedIds, dither: ditherToggle.checked, contrast: Number(contrastRange.value) }, [bitmap]);
        });
        if (!result.ok) {
            const err = new Error(result.message);
            err.code = result.code;
            throw err;
        }
        currentModel = result.model;
        currentMapDatColors = result.mapDatColors;
        currentCols = result.cols;
        currentRows = result.rows;
        convertedResult = null;
        downloadBtn.disabled = true;
        downloadZipBtn.disabled = false;

        renderPreview(result.previewRGBA, result.cols, result.rows);
        await renderMaterials(result.materialCounts);
        currentTotalBlocks = totalBlockCount(result.materialCounts);
        previewMeta.textContent = `${result.cols} × ${result.rows} pixels · Height: ${result.heightRange} blocks · ${currentTotalBlocks.toLocaleString('en-US')} blocks total`;

        populateTargetFormats();
        convertBtn.disabled = false;
        showToast(t('toast_generated_title'), t('toast_generated_message', { count: currentTotalBlocks.toLocaleString('en-US') }));
        playLevelUpSound();
        setStatus(t('status_ready'));
        prepareDownload();
    } catch (err) {
        convertBtn.disabled = false;
        handleError(err);
    }
}

function downloadBlob(bytes, filename) {
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function baseFilename() {
    // Fixed, branded name instead of reusing the uploaded image's (often ugly,
    // auto-generated) filename for the downloaded structure/ZIP.
    return 'MC-Craft-Mapart';
}

async function prepareDownload() {
    if (!currentModel || !targetFormatSelect.value) return;
    const fmt = targetFormatSelect.value;
    try {
        if (fmt === 'mapdat') {
            if (currentCols !== 128 || currentRows !== 128) {
                convertedResult = null;
                downloadBtn.disabled = true;
                setStatus(t('error_MAPDAT_NEEDS_ZIP'));
                return;
            }
            const bytes = await window.MapArtGenerator.buildMapDatFile(currentMapDatColors, {});
            convertedResult = { bytes };
        } else {
            convertedResult = await window.StructureConverter.write(currentModel, fmt);
        }
        downloadBtn.disabled = false;
        setStatus(t('status_done', {
            count: currentTotalBlocks.toLocaleString('en-US'),
            height: currentModel.height,
            format: FORMAT_LABELS[fmt]
        }));
    } catch (err) {
        handleError(err);
    }
}

function handleDownloadClick() {
    if (!convertedResult) return;
    const fmt = targetFormatSelect.value;
    const ext = fmt === 'mapdat' ? '.dat' : window.StructureConverter.FORMATS[fmt].ext;
    downloadBlob(convertedResult.bytes, baseFilename() + ext);
    playClickSound();
}

async function handleZipDownload() {
    if (!currentModel && !currentMapDatColors) return;
    playClickSound();
    downloadZipBtn.disabled = true;
    try {
        const fmt = targetFormatSelect.value;
        let entries;
        if (fmt === 'mapdat') {
            const tiles = MapArtGenerator.splitIntoMapTiles(currentMapDatColors, currentCols, currentRows);
            entries = await Promise.all(tiles.map(async (tile) => ({
                name: `map${tile.index}.dat`,
                bytes: await window.MapArtGenerator.buildMapDatFile(tile.colorIds, {})
            })));
        } else {
            const tiles = window.MapArtGenerator.splitModelIntoMapTiles(currentModel, currentCols, currentRows);
            entries = await Promise.all(tiles.map(async (tile) => {
                const result = await window.StructureConverter.write(tile.model, fmt);
                return { name: `map${tile.index}${window.StructureConverter.FORMATS[fmt].ext}`, bytes: result.bytes };
            }));
        }
        const zipBytes = window.MapArtGenerator.buildZip(entries);
        downloadBlob(zipBytes, baseFilename() + '-maps.zip');
        showToast(t('toast_zip_title'), t('toast_zip_message', { count: entries.length }));
    } catch (err) {
        handleError(err);
    } finally {
        downloadZipBtn.disabled = false;
    }
}

function getGridPixelSize() {
    const clamp = (v) => Math.min(50, Math.max(1, Math.round(Number(v)) || 1));
    const x = clamp(gridSizeXInput.value);
    const y = clamp(gridSizeYInput.value);
    return [x * 128, y * 128];
}

function updateGridSizeDisplay() {
    const [cols, rows] = getGridPixelSize();
    gridSizePx.textContent = `${cols}×${rows} px`;
}

function initGridSize() {
    [gridSizeXInput, gridSizeYInput].forEach((input) => {
        input.addEventListener('input', updateGridSizeDisplay);
        input.addEventListener('change', updateGridSizeDisplay);
    });
    updateGridSizeDisplay();
}

function initContrast() {
    contrastRange.addEventListener('input', () => {
        contrastValue.textContent = contrastRange.value;
    });
}

function handleFile(file) {
    currentFile = file;
    uploadFilename.textContent = file.name;
    convertedResult = null;
    currentModel = null;
    currentMapDatColors = null;
    downloadBtn.disabled = true;
    downloadZipBtn.disabled = true;
    convertBtn.disabled = false;
    setStatus(t('status_ready'));

    if (currentOriginalUrl) URL.revokeObjectURL(currentOriginalUrl);
    currentOriginalUrl = URL.createObjectURL(file);
    originalPreview.src = currentOriginalUrl;
    previewWrap.classList.add('show');

    playClickSound();
}

function initUpload() {
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) handleFile(fileInput.files[0]);
    });
    convertBtn.addEventListener('click', handleGenerate);
    downloadBtn.addEventListener('click', handleDownloadClick);
    downloadZipBtn.addEventListener('click', handleZipDownload);
    targetFormatSelect.addEventListener('change', () => { if (currentModel) prepareDownload(); });
}

/* --------------------------------- Init --------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    initFooterYear();
    initAudio();
    initTheme();
    initThemeSwitcher();
    initMobileMenu();
    initTopButton();
    initSound();
    updateSoundIcon();
    initUpload();
    initBlockPicker();
    initGridSize();
    initContrast();
    initColorReference();
    initLoader();
});