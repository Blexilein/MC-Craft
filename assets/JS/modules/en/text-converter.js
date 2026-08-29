// Main JavaScript

// ===== KONFIGURATION =====
let soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
let currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
let levelUpSound = null;
// Übersetzungen – alle für den Text-Konverter benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_textconverter: "MC-Craft | Text Converter",
    site_title_short: "MC-Craft",
    nav_home: "Home",
    nav_text_converter: "Text Converter",
    nav_color_text: "Color Text",
    nav_items: "Items Database",
    nav_mobs: "Mobs Database",
    nav_server_status: "Server Status",
    nav_skin_lookup: "Skin Lookup",
    nav_skin_editor: "Skin Editor",
    nav_beacon_mixer: "Beacon Color Mixer",
    nav_day_night_cycle: "Day-Night Cycle",
    nav_end_poem: "End Poem",
    nav_capes: "Capes Database",
    nav_skins: "Skin Library",
    tools_dropdown: "Tools",
    discover_dropdown: "Discover",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    theme_select: "Choose Theme:",
    sound_toggle: "Sound",
    language: "Language",
    textconverter_hero_title: "Minecraft <span class=\"highlight\">Text Converter</span>",
    hero_badge: "V 1.0.0 is here",
    textconverter_hero_desc: "Convert between normal text and Minecraft's Standard Galactic Alphabet for your projects. Perfect for your Minecraft servers, builds and creative projects.",
    textconverter_hero_btn_converter: "Go to Converter",
    textconverter_hero_btn_color: "Color Text Converter",
    textconverter_grid1: "Text Conversion",
    textconverter_grid2: "Bidirectional",
    textconverter_grid3: "Real-time",
    textconverter_grid4: "Alphabet Table",
    textconverter_section_title: "Text <span class=\"highlight\">Converter</span>",
    textconverter_section_subtitle: "Convert your text to the Minecraft alphabet and back",
    textconverter_label_normal: "Normal Text",
    textconverter_placeholder_normal: "Enter your normal text here...",
    textconverter_label_minecraft: "Minecraft Text",
    textconverter_placeholder_minecraft: "Minecraft text appears here...",
    textconverter_btn_to_minecraft: "Convert to Minecraft",
    textconverter_btn_to_normal: "Convert to Normal",
    textconverter_btn_clear: "Clear",
    textconverter_btn_copy_minecraft: "Copy Minecraft Text",
    textconverter_btn_copy_normal: "Copy Normal Text",
    banner_style: "Banner Style",
    banner_none: "No Banner",
    textconverter_ref_title: "Minecraft Alphabet",
    textconverter_ref_highlight: "Reference",
    textconverter_ref_subtitle: "Standard Galactic Alphabet from Minecraft",
    textconverter_table_normal: "Normal",
    textconverter_table_minecraft: "Minecraft",
    textconverter_tips_title: "Tips & Tricks",
    textconverter_tip1: "The converter works only with uppercase letters (A-Z)",
    textconverter_tip2: "Special characters and numbers remain unchanged",
    textconverter_tip3: "For colored text use the <a href=\"/blog/color-text.html\">Color Text Converter</a>",
    textconverter_tip4: "Copy the Minecraft text for your server MOTDs, signs or chat messages",
    textconverter_cta_title: "Discover more Minecraft <span class=\"highlight\">Tools</span>?",
    textconverter_cta_desc: "MC-Craft offers many more useful tools for your Minecraft adventure.",
    textconverter_cta_btn_color: "Color Text Converter",
    textconverter_cta_btn_all: "View all tools",
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
    footer_history: "MC-Craft History",
    capes_db_title: "Capes Database",
    skins_library_title: "Skin Library",
    footer_team: "Our Team",
    footer_about_us: "About us",
    footer_faq: "FAQ & Help",
    footer_bug: "Report Bug",
    footer_support_contact: "Support Contact",
    footer_rights: "All rights reserved.",
    footer_disclaimer: "Minecraft is a trademark of Mojang Studios. This site is not officially affiliated with Mojang or Microsoft.",
    footer_version: "Version 1.0.0",
    footer_changelog: "Changelog",
    toast_welcome_title: "Text Converter loaded!",
    toast_welcome_message: "Convert your text to Minecraft font now!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    toast_language_title: "Language",
    toast_language_de: "German",
    toast_language_en: "English",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
    toast_error_title: "Error",
    toast_error_message: "An error occurred.",
    toast_success_title: "Success",
    toast_copy_success: "copied!",
    toast_copy_error: "Could not copy text.",
    toast_convert_success_title: "Text converted",
    toast_convert_success_message: "Text successfully converted to Minecraft font!",
    toast_convert_normal_success: "Minecraft font successfully converted back!",
    toast_clear_title: "Text cleared",
    toast_clear_message: "All text fields have been cleared.",
    toast_error_no_minecraft: "No Minecraft text to copy.",
    toast_error_no_normal: "No normal text to copy.",
    toast_copy_minecraft_success: "Minecraft text copied to clipboard!",
    toast_copy_normal_success: "Normal text copied to clipboard!",
    toast_online_title: "Connection restored",
    toast_online_message: "You are back online!",
    toast_offline_title: "Offline mode",
    toast_offline_message: "Some functions may not be available.",
    loader_text1_textconverter: "Text Converter is loading...",
    loader_text2: "Initializing alphabet...",
    loader_text3: "Preparing converter...",
    loader_text4: "Loading sound system...",
    loader_text5: "Almost done..."
};

// DOM Elements
const loader = document.getElementById('loader');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const toastContainer = document.getElementById('toastContainer');

// Sound-Elemente
const soundBtn = document.getElementById('soundBtn');
const soundIcon = document.getElementById('soundIcon');
const mobileSoundBtn = document.getElementById('mobileSoundBtn');
const mobileSoundIcon = document.getElementById('mobileSoundIcon');

// Sprach-Elemente

// Minecraft Alphabet
const minecraftAlphabet = {
    'A': 'ᔑ', 'B': 'ʖ', 'C': 'ᓵ', 'D': '↸', 'E': 'ᒷ', 
    'F': '⎓', 'G': '⊣', 'H': '⍑', 'I': '╎', 'J': '⋮', 
    'K': 'ꖌ', 'L': 'ꖎ', 'M': 'ᒲ', 'N': 'リ', 'O': '𝙹', 
    'P': '!¡', 'Q': 'ᑑ', 'R': '∷', 'S': 'ᓭ', 'T': 'ℸ', 
    'U': '⚍', 'V': '⍊', 'W': '∴', 'X': '⁠̇/', 'Y': '॥', 'Z': '⨅'
};

const reverseAlphabet = {
    'ᔑ': 'A', 'ʖ': 'B', 'ᓵ': 'C', '↸': 'D', 'ᒷ': 'E', 
    '⎓': 'F', '⊣': 'G', '⍑': 'H', '╎': 'I', '⋮': 'J', 
    'ꖌ': 'K', 'ꖎ': 'L', 'ᒲ': 'M', 'リ': 'N', '𝙹': 'O', 
    '!¡': 'P', 'ᑑ': 'Q', '∷': 'R', 'ᓭ': 'S', 'ℸ': 'T', 
    '⚍': 'U', '⍊': 'V', '∴': 'W', '⁠̇/': 'X', '॥': 'Y', '⨅': 'Z'
};

// ===== HILFSFUNKTION =====
function t(key, placeholders = {}) {
    let text = T[key] || key;
    for (const [placeholder, value] of Object.entries(placeholders)) {
        text = text.replace(`{${placeholder}}`, value);
    }
    return text;
}

// Banner Templates (Platzhalter {text} wird ersetzt)
const bannerTemplates = [
    { name: "Kein Banner", template: "{text}" },
    { name: "▃▅▆▇", template: "▃▅▅▆▆▇▇ {text} ▇▇▆▆▅▅▃" },
    { name: "╔═╝Text╚═╗", template: "╔═╝{text}╚═╗" },
    { name: "⅛¼⅜", template: "⅛¼⅜½⅝¾⅞ {text} ⅞¾⅝½⅜¼⅛" },
    { name: "·¯¯¯·", template: "·¯¯¯¯¯¯¯¯¯¯¯¯¯  {text}  ¯¯¯¯¯¯¯¯¯¯¯¯¯·" },
    { name: "㋛ Smiley", template: "㋞ ㋛ ㋡  ♒ {text} ♒  ㋡ ㋛ ㋞" },
    { name: "(☀∫☀)", template: "(☀∫☀) {text} (☀∫☀)" },
    { name: "⿱⿰ Blocks", template: "⿱⿰⿱⿰⿱⿰ {text} ⿱⿰⿱⿰⿱⿰" },
    { name: "◊◊◊≡", template: "◊◊◊◊≡  {text}  ≡◊◊◊◊" },
    { name: "父ж＊", template: "父ж＊ж父ж＊ {text} ＊ж父ж＊ж父" },
    { name: "►►♥", template: "►►►♥ {text} ♥◄◄◄" },
    { name: "Ξ※◎☆", template: "Ξ※◎☆★☆◎※Ξ  {text}  Ξ※◎☆★☆◎※Ξ" },
    { name: "▃▅▒▒▒", template: "▃▅▅▒▒▒ {text} ▒▒▒▅▅▄" },
    { name: "● (シ) ●", template: "● (シ) ● {text} ● (心) ●" },
    { name: "︿﹀︽︾", template: "︿﹀︽︾△︾︽  {text}  ︽︾△︾︽﹀︿" },
    { name: "╰╯╭╮", template: "╰╯╭╮╰╯╭╮╰╯  {text}  ╰╯╭╮╰╯╭╮╰╯" },
    { name: "(こ╭╮こ)ミ", template: "(こ╭╮こ)ミ  {text}  (彳╭╮彳)ミ" },
    { name: "ᄽ♥ᄿ", template: "ᄽ♥ᄿ  {text}  ᄽ♥ᄿ" },
    { name: "╠╬╬╬╬", template: "╠╬╬╬╬  {text}  ╬╬╬╬╣" },
    { name: "○╮╰❤╯╭○", template: "○╮╰❤╯╭○  {text}  ○╮╰☆╯╭○" },
    { name: "ஜஜஜ", template: "ஜஜஜ    {text}    ஜஜஜ" },
    { name: "llll•★•", template: "llll•★• {text} •★•lll" },
    { name: "₪۩۞۩₪", template: "₪۩۞۩₪ {text} ₪۩۞۩₪" },
    { name: "▀▄▀▄▀▄", template: "▀▄▀▄▀▄ {text} ▄▀▄▀▄▀" },
    { name: ".ιllιllι.", template: ".ιllιllι.  {text} .ιllιllι." },
    { name: "▉|[« ♥ »]|", template: "▉|[« ♥ »]| {text} |[« ♥ »]|▉" },
    { name: "[※] (✷)", template: "[※] (✷)  {text}  (✷) [※]" },
    { name: "●●●●●●", template: "●●●●●● {text} ●●●●●●" },
    { name: "^-♥-♡--^", template: "^-♥-♡--^[ {text} ]^--♡-♥-^" },
    { name: "|||||•✿•", template: "|||||•✿• {text} •✿•|||||" },
    { name: "Ҳ̸ҲҲ̸", template: "ҲҲ̸ҲҲ̸ҲҲ̸Ҳ  {text}  Ҳ̸ҲҲ̸ҲҲ̸ҲҲ" },
    { name: "|·.·´¯`·>»", template: "|·.·´¯`·>»  {text}  «<·´¯`·.·|" },
    { name: "▄▄▄▄▄▄▄", template: "▄▄▄▄▄▄▄  {text}  ▄▄▄▄▄▄▄" },
    { name: "̲̅[̲̅ Text ]̲̅", template: "[̲̅ {text} ]̲̅" },
    { name: "..:»» ««:..", template: "..:»»  {text} ««:.." },
    { name: "{-}{|}{-}", template: "{-}{|}{-} {text} {-}{|}{-}" },
    { name: "<<< >>>", template: "<<<<<<<<< {text}  >>>>>>>>>" },
    { name: "~!¡~sexy~!¡~", template: "~!¡~ {text} ~!¡~" },
    { name: "..oo°°", template: "..oo°°{text}°°oo.." },
    { name: "(-^-)", template: "(-^-){text}(-^-)" },
    { name: ">><><><", template: ">>> <><><>[ {text} ]<><><> <<<" },
    { name: "'-<<--<@", template: "'-<<--<@  {text}  @>-->>-'" },
    { name: "¬¬¬¬¬", template: "¬¬¬¬¬¬¬¬¬¬ {text} ¬¬¬¬¬¬¬¬¬¬" },
    { name: "{{{{", template: "{{{{{{{{{ {text} }}}}}}}}}" },
    { name: "»»»»««««", template: "»»»»»»{text}««««««" },
    { name: "/// \\\\\\\\", template: "\\\\\\\\ {text} ///" },
    { name: "/\\/\\/\\", template: "/\\/\\/\\ {text} /\\/\\/\\" },
    { name: "·*“““““", template: "·*“““““““““““  {text}  ““““““““““““*·" },
    { name: "%|%%|%", template: "%|%%|%%|%% {text} %%|%%|%%" },
    { name: "<><><> ..::", template: "<><><><><><><><><>  ..:: [{text}] ::..  <><><><><><><><><>" },
    { name: "#*#*#", template: "#*#*# {text} #*#*#" },
    { name: "(((----->", template: "(((----->  {text}   <-----)))" },
    { name: "ææææææ", template: "ææææææ{text}ææææææ" },
    { name: "<> <> <>", template: "<> <> <> {text} <> <> <>" },
    { name: "||||||", template: "||||||   {text}   ||||||" },
    { name: "*****", template: "***** {text} *****" },
    { name: "() () ()", template: "() () () {text} () () ()" },
    { name: "(((((())))))", template: "(((((( {text} ))))))" },
    { name: "[[[ ]]]", template: "[[[[[[ {text} ] ]]]]]" },
    { name: "[M][o][n]", template: "[M][o][n][ ][t][e][x][t][e] → {text}" },
    { name: ".oO-Oo.", template: ".oO-Oo. {text} .oO-Oo." },
    { name: "[*~_~*] »»", template: "[*~_~*] »»  {text}  «« [*~_~*]" },
    { name: "<>    <>", template: "<>    <>  {text}  <>    <>" },
    { name: "♥》★《♥", template: "♥》★《♥ {text} ♥》★《♥" },
    { name: "回回回Ξ", template: "回回回回回Ξ  {text}  Ξ回回回回回" },
    { name: "˙·ღ✿", template: "˙·ღ✿*´·.·´ {text} `·.·`*✿ღ·˙" },
    { name: "ღ♥´`*·", template: "ღ♥´`*·.¸ღ {text} ღ¸.·*´`♥ღ" },
    { name: "ӝ̸Ӄ̸Ӄ̸ӝ", template: "ӝ̸Ӄ̸Ӄ̸ӝ {text} ӝ̸Ӄ̸Ӄ̸ӝ" },
    { name: "v^v^v^", template: "v^v^v^ {text} ^v^v^v" },
    { name: "·ï¡÷¡ï·", template: "·ï¡÷¡ï··!¦[· {text} ·]¦!··ï¡÷¡ï·" },
    { name: ".·*ღ´¯`*·.", template: ".·*ღ´¯`*·.¸¸ღ*·. {text} .·*ღ¸¸.·*´¯`ღ*·." },
    { name: "ღ:ღ-±·.·♂♀", template: "ღ:ღ-±·.·♂♀ {text} ♀♂·.·±-ღ:ღ" },
    { name: "<∑¯¯¯¯", template: "<∑¯¯¯¯{text}¯¯¯¯()" },
];

function populateBannerSelect() {
    const select = document.getElementById('bannerSelect');
    if (!select) return;
    const previousValue = select.value || '0';
    select.innerHTML = '';
    bannerTemplates.forEach((b, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = index === 0 ? t('banner_none') : b.name;
        select.appendChild(option);
    });
    // Auswahl erhalten, sonst Standard auf "Kein Banner/No Banner"
    select.value = String(previousValue);
    if (!select.value) select.value = '0';
}

function applyBanner(text) {
    const select = document.getElementById('bannerSelect');
    if (!select) return text;
    const template = bannerTemplates[select.value].template;
    return template.replace('{text}', text);
}

function getThemeName(theme) {
    switch(theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
        default: return 'Overworld';
    }
}

// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initLoader();
    initTheme();
    initMobileMenu();
    initThemeSwitcher();
    initScrollEffects();
    initFooterYear();
    initPageAnalytics();
    initSoundToggle();
    initConverterEvents();
    populateBannerSelect();
});

// ===== AUDIO =====
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Failed to initialize audio:', error);
    }
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try {
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(error => {
            console.log('Autoplay blockiert:', error);
            const enableSound = () => {
                levelUpSound.play().catch(() => {});
                document.removeEventListener('click', enableSound);
                document.removeEventListener('keydown', enableSound);
            };
            document.addEventListener('click', enableSound, { once: true });
            document.addEventListener('keydown', enableSound, { once: true });
        });
    } catch (error) {
        console.log('Sound-Fehler:', error);
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
    showToast(
        t('toast_sound_title'),
        t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off')
    );
}

function updateSoundIcon() {
    const src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

// ===== LOADER =====
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

    let progress = 0;
    const loadingText = document.querySelector('.loading-text');
    const texts = [
        t('loader_text1_textconverter'),
        t('loader_text2'),
        t('loader_text3'),
        t('loader_text4'),
        t('loader_text5')
    ];
    let index = 0;

    const progressInterval = setInterval(() => {
        progress += 20;
        updateLoaderProgress(progress);
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    playLevelUpSound();
                    showWelcomeToast();
                }, 150);
                setTimeout(() => loader.style.display = 'none', 500);
            }, 300);
        } else {
            if (index < texts.length - 1) {
                index++;
                loadingText.textContent = texts[index];
            }
        }
    }, 120);
}

function showWelcomeToast() {
    showToast(
        t('toast_welcome_title'),
        t('toast_welcome_message')
    );
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
    updateThemeButtonIcon();
}

function updateThemeButtonIcon() {
    const icon = themeBtn.querySelector('i');
    icon.className = 'fa-solid fa-palette';
}

function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
    document.querySelectorAll('.theme-option-btn').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
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

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('show');
        playClickSound();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-switcher')) {
            themeDropdown.classList.remove('show');
        }
    });
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            themeDropdown.classList.remove('show');
            playClickSound();
            showToast(
                t('toast_theme_changed'),
                t('toast_theme_to', { theme: getThemeName(theme) })
            );
        });
    });
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

// ===== TOAST =====
function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas fa-check"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    toastContainer.appendChild(toast);
    playClickSound();
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 7000); // ⬅️ 7 Sekunden
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

// ===== FOOTER YEAR =====
function initFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

// ===== ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Text Converter loaded');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
}

// ===== CONVERTER FUNCTIONS =====
function initConverterEvents() {
    // Optional: Auto-convert on input
    const normalText = document.getElementById('normal-text');
    const minecraftText = document.getElementById('minecraft-text');
    
    // Add sound to converter buttons
    document.querySelectorAll('.converter-controls .btn, .converter-actions .btn').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });
}

function convertToMinecraft() {
    const normalText = document.getElementById('normal-text');
    const minecraftText = document.getElementById('minecraft-text');
    
    if (!normalText || !minecraftText) return;
    
    const text = normalText.value.toUpperCase();
    let result = '';
    
    for (let char of text) {
        result += minecraftAlphabet[char] || char;
    }

    // Banner anwenden
    result = applyBanner(result);
    minecraftText.value = result;
    
    // Visual feedback
    normalText.classList.add('converting');
    setTimeout(() => normalText.classList.remove('converting'), 500);
    
    showToast(
        t('toast_convert_success_title'),
        t('toast_convert_success_message')
    );
    playClickSound();
}

function convertToNormal() {
    const normalText = document.getElementById('normal-text');
    const minecraftText = document.getElementById('minecraft-text');
    
    if (!normalText || !minecraftText) return;
    
    const text = minecraftText.value;
    let result = '';
    let i = 0;
    
    while (i < text.length) {
        let found = false;
        // Check for special sequences first
        for (let seq of ['!¡', '⁠̇/']) {
            if (text.startsWith(seq, i)) {
                result += reverseAlphabet[seq] || seq;
                i += seq.length;
                found = true;
                break;
            }
        }
        if (found) continue;
        
        // Check single characters
        result += reverseAlphabet[text[i]] || text[i];
        i++;
    }
    
    normalText.value = result;
    
    // Visual feedback
    minecraftText.classList.add('converting');
    setTimeout(() => minecraftText.classList.remove('converting'), 500);
    
    showToast(
        t('toast_convert_success_title'),
        t('toast_convert_normal_success')
    );
    playClickSound();
}

function clearText() {
    const normalText = document.getElementById('normal-text');
    const minecraftText = document.getElementById('minecraft-text');
    
    if (normalText) normalText.value = '';
    if (minecraftText) minecraftText.value = '';
    
    showToast(
        t('toast_clear_title'),
        t('toast_clear_message')
    );
    playClickSound();
}

function copyMinecraftText() {
    const minecraftText = document.getElementById('minecraft-text');
    
    if (!minecraftText || !minecraftText.value.trim()) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_minecraft')
        );
        return;
    }
    
    navigator.clipboard.writeText(minecraftText.value)
        .then(() => {
            showToast(
                t('toast_success_title'),
                t('toast_copy_minecraft_success')
            );
            const copyBtn = document.querySelector('.converter-actions .btn:nth-child(1)');
            if (copyBtn) {
                copyBtn.classList.add('copy-success');
                setTimeout(() => copyBtn.classList.remove('copy-success'), 2000);
            }
        })
        .catch(err => {
            console.error('Fehler beim Kopieren:', err);
            showToast(
                t('toast_error_title'),
                t('toast_copy_error')
            );
        });
    playClickSound();
}

function copyNormalText() {
    const normalText = document.getElementById('normal-text');
    
    if (!normalText || !normalText.value.trim()) {
        showToast(
            t('toast_error_title'),
            t('toast_error_no_normal')
        );
        return;
    }
    
    navigator.clipboard.writeText(normalText.value)
        .then(() => {
            showToast(
                t('toast_success_title'),
                t('toast_copy_normal_success')
            );
            const copyBtn = document.querySelector('.converter-actions .btn:nth-child(2)');
            if (copyBtn) {
                copyBtn.classList.add('copy-success');
                setTimeout(() => copyBtn.classList.remove('copy-success'), 2000);
            }
        })
        .catch(err => {
            console.error('Fehler beim Kopieren:', err);
            showToast(
                t('toast_error_title'),
                t('toast_copy_error')
            );
        });
    playClickSound();
}

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
            closeMobileMenu();
        }
    }, 250);
});

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('show')) closeMobileMenu();
        if (themeDropdown.classList.contains('show')) themeDropdown.classList.remove('show');
    }
    if ((e.key === ' ' || e.key === 'Enter') && e.target === themeBtn) {
        e.preventDefault();
        themeDropdown.classList.toggle('show');
    }
});

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll(
        'button, .btn, .nav-link, .theme-option, .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn'
    );
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => setTimeout(playClickSound, 50));
    });
});

// ===== VISUAL FEEDBACK =====
function addSoundVisualFeedback() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes soundPulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 168, 107, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(0, 168, 107, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 168, 107, 0); }
        }
        .sound-pulse { animation: soundPulse 1s ease; }
    `;
    document.head.appendChild(style);
}
window.addEventListener('load', addSoundVisualFeedback);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    const errorToast = document.createElement('div');
    errorToast.className = 'toast error-toast';
    errorToast.innerHTML = `
        <div class="toast-icon" style="background: #FF6B6B;"><i class="fas fa-exclamation-triangle"></i></div>
        <div class="toast-content">
            <div class="toast-title">${t('toast_error_title')}</div>
            <div class="toast-message">${t('toast_error_message')}</div>
        </div>
    `;
    toastContainer.appendChild(errorToast);
    setTimeout(() => errorToast.classList.add('show'), 100);
    setTimeout(() => {
        errorToast.classList.remove('show');
        setTimeout(() => errorToast.remove(), 300);
    }, 5000);
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('online', () => showToast(
    t('toast_online_title'),
    t('toast_online_message')
));
window.addEventListener('offline', () => showToast(
    t('toast_offline_title'),
    t('toast_offline_message')
));

// Export functions for HTML onclick
window.convertToMinecraft = convertToMinecraft;
window.convertToNormal = convertToNormal;
window.clearText = clearText;
window.copyMinecraftText = copyMinecraftText;
window.copyNormalText = copyNormalText;
