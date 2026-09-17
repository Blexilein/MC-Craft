// 404.js (Deutsch)

// ===== KONFIGURATION =====

// ===== TEXTE (nur Deutsch) =====
const T = {
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
};

// ===== DOM ELEMENTE =====

// ===== AUDIO (Klick-Sound) =====

// ===== SOUND TOGGLE =====

// ===== HILFSFUNKTIONEN =====
// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== SCROLL EFFECTS =====

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== INIT =====

// Back link: goes back in the history when there is one, otherwise it is a normal link to the homepage.
const historyBackBtn = document.getElementById('historyBackBtn');
if (historyBackBtn) {
    historyBackBtn.addEventListener('click', (e) => {
        if (history.length > 1) {
            e.preventDefault();
            history.back();
        }
    });
}
