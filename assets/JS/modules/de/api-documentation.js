// API-Dokumentation Seite JavaScript

// ===== KONFIGURATION =====

// Texte dieser Seite (nur Deutsch)
const T = {
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_welcome_title: "API-Dokumentation geladen!",
    toast_welcome_message: "Alle Endpunkte der MC-Craft API auf einen Blick.",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_copied_title: "Kopiert!",
    toast_copied_message: "In die Zwischenablage kopiert.",
    toast_copy_failed_title: "Kopieren fehlgeschlagen",
    toast_copy_failed_message: "Bitte den Text manuell markieren und kopieren.",
    toast_error_title: "Oops!",
    toast_error_message: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar."
};

// DOM Elements

// Sound-Elemente

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initDocsSidebar();
    initCopyButtons();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====

// ===== THEME SWITCHER =====

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

    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

// ===== DOCS SIDEBAR (Inhaltsverzeichnis + Scroll-Spy) =====
function initDocsSidebar() {
    const sidebar = document.getElementById('docsSidebar');
    const toggle = document.getElementById('docsSidebarToggle');
    const navLinks = Array.from(document.querySelectorAll('.docs-nav-link'));
    const blocks = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (toggle && sidebar) {
        sidebar.classList.add('collapsed');
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            playClickSound();
        });
    }

    if (!blocks.length) return;

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    });

    blocks.forEach(block => observer.observe(block));
}

// ===== COPY BUTTONS =====
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => handleCopyClick(btn));
    });
}

function handleCopyClick(btn) {
    const targetId = btn.dataset.copyTarget;
    let text = '';

    if (targetId) {
        const el = document.getElementById(targetId);
        if (el) text = el.textContent;
    } else {
        const codeBlock = btn.closest('.code-block, .code-block-inline');
        const codeEl = codeBlock ? codeBlock.querySelector('code') : null;
        if (codeEl) text = codeEl.textContent;
    }

    if (!text) return;

    copyToClipboard(text).then(() => {
        const icon = btn.querySelector('i');
        btn.classList.add('copied');
        if (icon) icon.className = 'fas fa-check';
        playClickSound();
        showToast(t('toast_copied_title'), t('toast_copied_message'), 'success');
        setTimeout(() => {
            btn.classList.remove('copied');
            if (icon) icon.className = 'fas fa-copy';
        }, 1800);
    }).catch(() => {
        showToast(t('toast_copy_failed_title'), t('toast_copy_failed_message'), 'warning');
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== PAGE ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft API-Dokumentation geladen');
}

// ===== WINDOW RESIZE HANDLER =====

// ===== KLICK-SOUND FÜR ALLE INTERAKTIVEN ELEMENTE =====

// ===== ERROR HANDLING =====

// ===== OFFLINE SUPPORT =====

// ===== EXPORT FUNCTIONS FOR HTML =====
window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClickSound();
};
