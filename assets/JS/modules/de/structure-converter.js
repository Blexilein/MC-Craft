// Structure Converter page (Deutsch) — UI glue only.
// All format logic (NBT, gzip, bit-packing, ...) lives in the shared,
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;

const T = {
    loader_text: "Struktur-Konverter wird geladen...",
    loader_text2: "NBT-Engine wird initialisiert...",
    loader_text3: "Fast fertig...",
    toast_loaded_title: "Bereit!",
    toast_loaded_message: "Lade eine .schematic-, .schem-, .litematic- oder .nbt-Datei hoch.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_theme_title: "Theme",
    toast_theme_to: "Zu {theme} gewechselt",
    status_idle: "Noch keine Datei geladen.",
    status_detecting: "Datei wird gelesen...",
    status_ready: "Bereit zum Konvertieren.",
    status_converting: "Konvertiere...",
    status_done: "Fertig! Ergebnis als {format} bereit zum Download.",
    toast_detected_title: "Format erkannt",
    toast_detected_message: "{format} erfolgreich gelesen.",
    toast_converted_title: "Konvertiert!",
    toast_converted_message: "Die Datei ist bereit zum Download.",
    toast_warning_title: "Konvertiert (mit Hinweis)",
    toast_warning_message: "{count} Blöcke konnten nicht exakt übertragen werden.",
    warning_summary: "{count} Blöcke ({types} Blockarten) wurden durch Luft ersetzt",
    toast_error_title: "Fehler",
    error_UNSUPPORTED_INPUT: "Diese Datei kann nicht gelesen werden.",
    error_EMPTY_FILE: "Die Datei ist leer.",
    error_GZIP_UNSUPPORTED: "Dein Browser unterstützt keine GZip-Dekomprimierung. Bitte aktualisiere deinen Browser.",
    error_DECOMPRESS_FAILED: "Die Datei konnte nicht entpackt werden – ist es wirklich eine Minecraft-Struktur-Datei?",
    error_NBT_PARSE_FAILED: "Die Datei enthält kein gültiges NBT – ist es wirklich eine Minecraft-Struktur-Datei?",
    error_UNKNOWN_FORMAT: "Das Dateiformat konnte nicht erkannt werden (kein .schematic, .schem, .litematic oder .nbt).",
    error_UNSUPPORTED_SCHEM_VERSION: "Diese .schem-Version wird nicht unterstützt.",
    error_MISSING_BLOCKS_DATA: "Der Datei fehlen die Block-Daten.",
    error_LEGACY_TABLE_LOAD_FAILED: "Die Legacy-Block-Tabelle konnte nicht geladen werden. Bitte Seite über einen Server (nicht als lokale Datei) öffnen.",
    error_VOLUME_TOO_LARGE: "Die Struktur ist zu groß für diesen Browser-Konverter.",
    error_VARINT_TOO_LONG: "Die Datei enthält ungültige Daten (Varint zu lang).",
    error_UNKNOWN: "Ein unerwarteter Fehler ist aufgetreten."
};

function t(key, params = {}) {
    let text = T[key] || key;
    Object.entries(params).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
    return text;
}

const FORMAT_LABELS = { schematic: '.schematic', schem: '.schem', litematic: '.litematic', nbt: '.nbt' };

const toastContainer = document.getElementById('toastContainer');
const loader = document.getElementById('loader');
const header = document.querySelector('.header');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadFilename = document.getElementById('uploadFilename');
const scDetected = document.getElementById('scDetected');
const detFormat = document.getElementById('detFormat');
const detDims = document.getElementById('detDims');
const detPalette = document.getElementById('detPalette');
const detEntities = document.getElementById('detEntities');
const targetFormatSelect = document.getElementById('targetFormat');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const scStatus = document.getElementById('scStatus');
const scWarningBanner = document.getElementById('scWarningBanner');
const scWarningSummary = document.getElementById('scWarningSummary');
const scWarningList = document.getElementById('scWarningList');
const scWarningHead = document.getElementById('scWarningHead');

let currentFile = null;
let currentModel = null;
let detectedFormat = null;
let convertedResult = null;

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

/* ------------------------------ Converter UI ------------------------------ */
function setStatus(msg) { if (scStatus) scStatus.textContent = msg; }

function resetResult() {
    convertedResult = null;
    if (downloadBtn) downloadBtn.disabled = true;
    if (scWarningBanner) scWarningBanner.classList.remove('show', 'expanded');
}

function showDetected(model, detected) {
    scDetected.classList.add('show');
    detFormat.textContent = FORMAT_LABELS[detected] || detected;
    detDims.textContent = `${model.width} × ${model.height} × ${model.length}`;
    detPalette.textContent = String(model.palette.length);
    detEntities.textContent = String(model.blockEntities.length);
}

function populateTargetFormats(exclude) {
    targetFormatSelect.innerHTML = '';
    Object.keys(window.StructureConverter.FORMATS).forEach((fmt) => {
        if (fmt === exclude) return;
        const opt = document.createElement('option');
        opt.value = fmt;
        opt.textContent = FORMAT_LABELS[fmt];
        targetFormatSelect.appendChild(opt);
    });
    targetFormatSelect.disabled = false;
}

function handleError(err) {
    console.error(err);
    const code = err && err.code;
    const message = code ? (T['error_' + code] || T.error_UNKNOWN) : T.error_UNKNOWN;
    setStatus(message);
    showToast(t('toast_error_title'), message, 'error');
}

async function handleFile(file) {
    currentFile = file;
    uploadFilename.textContent = file.name;
    resetResult();
    setStatus(t('status_detecting'));
    convertBtn.disabled = true;
    try {
        const { model, detected } = await window.StructureConverter.parse(file);
        currentModel = model;
        detectedFormat = detected;
        showDetected(model, detected);
        populateTargetFormats(detected);
        convertBtn.disabled = false;
        playClickSound();
        showToast(t('toast_detected_title'), t('toast_detected_message', { format: FORMAT_LABELS[detected] }));
        setStatus(t('status_ready'));
    } catch (err) {
        handleError(err);
    }
}

function showWarnings(warnings) {
    scWarningBanner.classList.add('show');
    scWarningSummary.textContent = t('warning_summary', { count: warnings.unmappedVoxelCount, types: warnings.unmappedTypes.length });
    scWarningList.innerHTML = '';
    warnings.unmappedTypes.forEach((u) => {
        const li = document.createElement('li');
        li.textContent = `${u.name} (${u.count})`;
        scWarningList.appendChild(li);
    });
}

async function handleConvert() {
    if (!currentModel || !targetFormatSelect.value) return;
    playClickSound();
    setStatus(t('status_converting'));
    try {
        const result = await window.StructureConverter.write(currentModel, targetFormatSelect.value);
        convertedResult = result;
        downloadBtn.disabled = false;
        if (result.warnings && result.warnings.unmappedVoxelCount > 0) {
            showWarnings(result.warnings);
            showToast(t('toast_warning_title'), t('toast_warning_message', { count: result.warnings.unmappedVoxelCount }), 'warning');
        } else {
            showToast(t('toast_converted_title'), t('toast_converted_message'));
            playLevelUpSound();
        }
        setStatus(t('status_done', { format: FORMAT_LABELS[targetFormatSelect.value] }));
    } catch (err) {
        handleError(err);
    }
}

function handleDownloadClick() {
    if (!convertedResult) return;
    const blob = new Blob([convertedResult.bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const base = currentFile ? currentFile.name.replace(/\.[^.]+$/, '') : 'structure';
    a.download = base + window.StructureConverter.FORMATS[targetFormatSelect.value].ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
    convertBtn.addEventListener('click', handleConvert);
    downloadBtn.addEventListener('click', handleDownloadClick);
    scWarningHead.addEventListener('click', () => scWarningBanner.classList.toggle('expanded'));
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
    initLoader();
});
