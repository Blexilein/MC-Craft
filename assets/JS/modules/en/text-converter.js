// Main JavaScript

// ===== KONFIGURATION =====

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

// Sound-Elemente

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

// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initPageAnalytics();
    initConverterEvents();
    populateBannerSelect();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

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

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

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

// ===== OFFLINE SUPPORT =====

// Buttons name their function in data-action; inline onclick is blocked by the site's CSP.
const TEXT_ACTIONS = { convertToMinecraft, convertToNormal, clearText, copyMinecraftText, copyNormalText };
document.querySelectorAll('[data-action]').forEach((btn) => {
    const action = TEXT_ACTIONS[btn.dataset.action];
    if (action) btn.addEventListener('click', () => action());
});
