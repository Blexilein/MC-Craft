// Main JavaScript

// ===== KONFIGURATION =====

// Übersetzungen – alle für den Text-Konverter benötigten Schlüssel (inkl. Toast-Texte)
const T = {
    site_title_textconverter: "MC-Craft | Text Konverter",
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
    textconverter_hero_title: "Minecraft <span class=\"highlight\">Text Konverter</span>",
    hero_badge: "V 1.0.0 ist da",
    textconverter_hero_desc: "Konvertiere zwischen normalem Text und dem Minecraft-Standard-Galakti-Alphabet für deine Projekte. Perfekt für deine Minecraft-Server, Builds und Kreativprojekte.",
    textconverter_hero_btn_converter: "Zum Konverter",
    textconverter_hero_btn_color: "Farbtext-Konverter",
    textconverter_grid1: "Text Konvertierung",
    textconverter_grid2: "Bidirektional",
    textconverter_grid3: "Echtzeit",
    textconverter_grid4: "Alphabet-Tabelle",
    textconverter_section_title: "Text <span class=\"highlight\">Konverter</span>",
    textconverter_section_subtitle: "Wandle deinen Text in das Minecraft-Alphabet um und zurück",
    textconverter_label_normal: "Normaler Text",
    textconverter_placeholder_normal: "Gib hier deinen normalen Text ein...",
    textconverter_label_minecraft: "Minecraft Text",
    textconverter_placeholder_minecraft: "Hier erscheint der Minecraft-Text...",
    textconverter_btn_to_minecraft: "Zu Minecraft konvertieren",
    textconverter_btn_to_normal: "Zu Normaltext konvertieren",
    textconverter_btn_clear: "Löschen",
    textconverter_btn_copy_minecraft: "Minecraft Text kopieren",
    textconverter_btn_copy_normal: "Normaltext kopieren",
    banner_style: "Banner Stil",
    banner_none: "Kein Banner",
    textconverter_ref_title: "Minecraft Alphabet",
    textconverter_ref_highlight: "Referenz",
    textconverter_ref_subtitle: "Standard-Galakti-Alphabet aus Minecraft",
    textconverter_table_normal: "Normal",
    textconverter_table_minecraft: "Minecraft",
    textconverter_tips_title: "Tipps & Tricks",
    textconverter_tip1: "Der Konverter arbeitet nur mit Großbuchstaben (A-Z)",
    textconverter_tip2: "Sonderzeichen und Zahlen bleiben unverändert",
    textconverter_tip3: "Für farbigen Text nutze den <a href=\"/blog/color-text.html\">Farbtext-Konverter</a>",
    textconverter_tip4: "Kopiere den Minecraft-Text für deine Server-MOTDs, Schilder oder Chat-Nachrichten",
    textconverter_cta_title: "Mehr Minecraft <span class=\"highlight\">Tools</span> entdecken?",
    textconverter_cta_desc: "MC-Craft bietet dir viele weitere nützliche Tools für dein Minecraft-Abenteuer.",
    textconverter_cta_btn_color: "Farbtext-Konverter",
    textconverter_cta_btn_all: "Alle Tools ansehen",
    footer_description: "Kostenlose Minecraft-Tools für die Community. Entwickelt von Spielern für Spieler.",
    footer_tools: "Tools",
    footer_more_tools: "Mehr Tools",
    footer_legal: "Rechtliches",
    footer_about: "Über Uns",
    footer_support: "Support",
    footer_impressum: "Impressum",
    footer_privacy: "Datenschutz",
    capes_db_title: "Cape-Datenbank",
    skins_library_title: "Skin-Bibliothek",
    footer_terms: "Nutzungsbedingungen",
    footer_copyright: "Copyright",
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
    toast_welcome_title: "Text Konverter geladen!",
    toast_welcome_message: "Konvertiere jetzt deinen Text in Minecraft-Schrift!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_title: "Theme",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_error_title: "Fehler",
    toast_error_message: "Ein Fehler ist aufgetreten.",
    toast_success_title: "Erfolg",
    toast_copy_success: "wurde kopiert!",
    toast_copy_error: "Text konnte nicht kopiert werden.",
    toast_convert_success_title: "Text konvertiert",
    toast_convert_success_message: "Text erfolgreich in Minecraft-Schrift umgewandelt!",
    toast_convert_normal_success: "Minecraft-Schrift erfolgreich zurück konvertiert!",
    toast_clear_title: "Text gelöscht",
    toast_clear_message: "Alle Textfelder wurden geleert.",
    toast_error_no_minecraft: "Kein Minecraft-Text zum Kopieren vorhanden.",
    toast_error_no_normal: "Kein Normaltext zum Kopieren vorhanden.",
    toast_copy_minecraft_success: "Minecraft-Text in Zwischenablage kopiert!",
    toast_copy_normal_success: "Normaltext in Zwischenablage kopiert!",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar.",
    loader_text1_textconverter: "Text Konverter wird geladen...",
    loader_text2: "Alphabet wird initialisiert...",
    loader_text3: "Konverter vorbereitet...",
    loader_text4: "Sound-System wird geladen...",
    loader_text5: "Fast fertig..."
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
    { name: "⿱⿰ Blöcke", template: "⿱⿰⿱⿰⿱⿰ {text} ⿱⿰⿱⿰⿱⿰" },
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
    console.log('MC-Craft Text Converter geladen');
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
