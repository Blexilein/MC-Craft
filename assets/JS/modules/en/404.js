// 404.js (English)

// ===== CONFIGURATION =====

// ===== TEXT STRINGS (English only) =====
const T = {
    toast_sound_title: "Sound",
    toast_sound_on: "Sound on",
    toast_sound_off: "Sound off",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_theme_changed: "Theme changed",
    toast_theme_to: "Switched to {theme}",
};

// ===== DOM ELEMENTE =====

// ===== AUDIO (Klick-Sound) =====

// ===== SOUND TOGGLE =====

// ===== HELPER FUNCTIONS =====
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
