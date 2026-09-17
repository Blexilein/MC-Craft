// coming-soon.js

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    toast_welcome_title: "Geplante Funktionen geladen!",
    toast_welcome_message: "Sieh dir an, woran wir gerade arbeiten!",
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
    coming_soon_title: "Coming Soon",
    coming_soon_subtitle: "Etwas Großes entsteht gerade",
    countdown_label: "Noch verbleibende Zeit",
    days: "Tage",
    hours: "Stunden",
    minutes: "Minuten",
    seconds: "Sekunden",
    features_summary: "{done} von {total} erledigt",
    progress_label: "Entwicklungsfortschritt",
    features_title: "Was kommt",
    feature_mobs: "Mobs Datenbank",
    feature_mobs_desc: "98+ Mobs  mit Details",
    feature_themes: "3 Themes",
    feature_themes_desc: "Overworld, Nether, End",
    feature_lang: "DE / EN",
    feature_lang_desc: "Zwei Sprachen",
    feature_items: "Items",
    feature_items_desc: "Komplette Item DB",
    feature_sounds: "Mob Sounds",
    feature_sounds_desc: "Alle Sounds abspielen",
    feature_biome: "Biome Map",
    feature_biome_desc: "Interaktive Karte",
    feature_enchantment_planner: "Verzauberungsplaner",
    feature_enchantment_planner_desc: "Verzauberungen planen und XP sparen",
    feature_nether_calculator: "Nether-Koordinaten-Rechner",
    feature_nether_calculator_desc: "Oberwelt und Nether umrechnen",
    feature_stack_calculator: "Stack-Rechner",
    feature_stack_calculator_desc: "Stacks und Shulker berechnen",
    feature_command_generator: "Befehlsgenerator",
    feature_command_generator_desc: "Minecraft-Befehle einfach erstellen",
    notify_label: "Benachrichtigung erhalten",
    notify_placeholder: "deine@email.de",
    notify_btn: "ANMELDEN",
    notify_success: "✓ Du wirst benachrichtigt!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_language_title: "Sprache",
    toast_language_de: "Deutsch",
    toast_language_en: "Englisch",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_copy_success: "Erfolg",
    toast_copy_error: "Fehler",
    toast_success: "Erfolg",
    toast_info: "Info",
    toast_error: "Fehler"
};

// ===== DOM ELEMENTE =====

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#00A86B','#00C47A','#334155','#6C63FF','#94A3B8'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${Math.random() * 10 + 8}s;
            border-radius: ${Math.random() > 0.5 ? '2px' : '50%'};
        `;
        container.appendChild(p);
    }
}

// INFO: ===== COUNTDOWN =====
// INFO: let targetDate = new Date();
// INFO: targetDate.setDate(targetDate.getDate() + 30); // 30 Tage ab heute
// HACK: Jahr, Monat (0‑11 Für den Monat), Tag 
// NOTE: 0  = Januar
// NOTE: 1  = Februar
// NOTE: 2  = März
// NOTE: 3  = April
// NOTE: 4  = Mai
// NOTE: 5  = Juni
// NOTE: 6  = Juli
// NOTE: 7  = August
// NOTE: 8  = September
// NOTE: 9  = Oktober
// NOTE: 10 = November
// NOTE: 11 = Dezember
let targetDate = new Date(2026, 9, 30); 
targetDate.setHours(0, 0, 0, 0);

function pad(n) { return String(n).padStart(2, '0'); }
function updateCountdown() {
    const now = new Date();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (!el) return;
        const newVal = pad(val);
        if (el.textContent !== newVal) {
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
            el.textContent = newVal;
        }
    };
    setVal('days', days);
    setVal('hours', hours);
    setVal('minutes', mins);
    setVal('seconds', secs);
}

// ===== FORTSCHRITT =====
// Prozent aus den fertigen und geplanten Karten.
function initFeatureProgress() {
    const done = document.querySelectorAll('.feature-card.done').length;
    const total = done + document.querySelectorAll('.feature-card.planned').length;
    if (!total) return;
    const pct = Math.round(done / total * 100);
    const bar = document.querySelector('.progress-bar-outer');
    const pctEl = document.getElementById('progressPct');
    const summary = document.getElementById('featureSummary');
    if (bar) {
        bar.setAttribute('aria-valuenow', pct);
        bar.querySelector('.progress-bar-inner')?.style.setProperty('--target-width', pct + '%');
    }
    if (pctEl) pctEl.textContent = pct + '%';
    if (summary) summary.textContent = T.features_summary.replace('{done}', done).replace('{total}', total);
}

// ===== NOTIFY =====
function initNotify() {
    const btn = document.getElementById('notifyBtn');
    const input = document.getElementById('emailInput');
    const successMsg = document.getElementById('notifySuccess');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const email = input.value.trim();
        if (!email || !email.includes('@')) {
            showToast(t('toast_error'), 'Bitte eine gültige E‑Mail eingeben.', 'error');
            input.style.borderColor = '#FF6B6B';
            setTimeout(() => input.style.borderColor = '', 1500);
            return;
        }
        // Hier könnte eine API‑Anfrage erfolgen – wir simulieren Erfolg
        showToast(t('toast_success'), t('notify_success'));
        if (successMsg) {
            successMsg.textContent = t('notify_success');
            successMsg.style.display = 'block';
            setTimeout(() => successMsg.style.display = 'none', 3000);
        }
        input.value = '';
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btn.click();
    });
}

// ===== FOOTER YEAR =====

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initFeatureProgress();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initNotify();
});