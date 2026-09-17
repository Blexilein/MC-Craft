// MC-Craft - shared site logic
// By Blexilein

/* ===== SHARED STATE ===== */
var soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
var currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
var levelUpSound = null;

/* ===== SHARED DOM REFERENCES =====
   Looked up once. Not every page has every one of these, so all uses below are
   guarded - the page copies assumed they always existed and threw on the pages
   that do not have, say, a theme button. */
var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var closeBtn = document.getElementById('closeBtn');
var mobileNav = document.getElementById('mobileNav');
var mobileNavOverlay = document.getElementById('mobileNavOverlay');
var themeBtn = document.getElementById('themeBtn');
var themeDropdown = document.getElementById('themeDropdown');
var backToTop = document.getElementById('backToTop');
var header = document.querySelector('.header');
var toastContainer = document.getElementById('toastContainer');
var soundBtn = document.getElementById('soundBtn');
var soundIcon = document.getElementById('soundIcon');
var mobileSoundBtn = document.getElementById('mobileSoundBtn');
var mobileSoundIcon = document.getElementById('mobileSoundIcon');

/* ===== LANGUAGE ===== */
var mcLang = (document.documentElement.getAttribute('lang') || 'de').toLowerCase().indexOf('en') === 0 ? 'en' : 'de';

// Strings the shared UI needs. A page's own T overrides any of these.
var MC_TEXT = {
    de: {
        theme_overworld: 'Overworld',
        theme_nether: 'Nether',
        theme_end: 'The End',
        toast_welcome_title: 'MC-Craft geladen!',
        toast_welcome_message: 'Viel Spaß mit unseren Minecraft-Tools!',
        toast_sound_title: 'Sound',
        toast_sound_on: 'Sound an',
        toast_sound_off: 'Sound aus',
        toast_theme_changed: 'Theme geändert',
        toast_theme_to: 'Zu {theme} gewechselt',
        toast_error_title: 'Oops!',
        toast_error_message: 'Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.',
        toast_online_title: 'Verbindung wiederhergestellt',
        toast_online_message: 'Du bist wieder online!',
        toast_offline_title: 'Offline Modus',
        toast_offline_message: 'Einige Funktionen sind möglicherweise nicht verfügbar.',
        menu_open: 'Menü öffnen',
        menu_close: 'Menü schließen'
    },
    en: {
        theme_overworld: 'Overworld',
        theme_nether: 'Nether',
        theme_end: 'The End',
        toast_welcome_title: 'MC-Craft loaded!',
        toast_welcome_message: 'Have fun with our Minecraft tools!',
        toast_sound_title: 'Sound',
        toast_sound_on: 'Sound on',
        toast_sound_off: 'Sound off',
        toast_theme_changed: 'Theme changed',
        toast_theme_to: 'Switched to {theme}',
        toast_error_title: 'Oops!',
        toast_error_message: 'A small error occurred. The page still works.',
        toast_online_title: 'Connection restored',
        toast_online_message: 'You are back online!',
        toast_offline_title: 'Offline mode',
        toast_offline_message: 'Some features may not be available.',
        menu_open: 'Open menu',
        menu_close: 'Close menu'
    }
};

/* ===== TRANSLATION =====
   Page-specific strings win over the shared MC_TEXT table. Pages come in two
   shapes and t() has to read both:
     - single-language modules (assets/JS/modules/de|en/*.js) declare  const T = { key: 'text' }
     - bilingual modules       (assets/JS/modules/*.js)        declare  const I18N = { de: {...}, en: {...} }
   Reading only T is what made bilingual pages print raw keys such as
   'toast_skin_loaded'. */
var MC_MISSING_TEXT = {};

function mcPageText(key) {
    // try/catch as well as typeof: T and I18N are optional page globals declared
    // with const, so a t() call made before the page module has run would hit the
    // temporal dead zone, where even typeof throws.
    try {
        if (typeof T !== 'undefined' && T && T[key] !== undefined) return T[key];
    } catch (e) { /* page module not evaluated yet */ }
    try {
        if (typeof I18N !== 'undefined' && I18N) {
            var table = I18N[mcLang] || I18N[mcLang === 'de' ? 'en' : 'de'];
            if (table && table[key] !== undefined) return table[key];
        }
    } catch (e) { /* page module not evaluated yet */ }
    return undefined;
}

// Last resort so a visitor never sees a raw key like 'skinlookup_rotate_on'.
function mcHumanizeKey(key) {
    var words = String(key)
        .replace(/^(toast|nav|btn|label|msg|title|hero|loader)_/, '')
        .replace(/[_-]+/g, ' ')
        .trim();
    if (!words) return '';
    return words.charAt(0).toUpperCase() + words.slice(1);
}

function t(key, placeholders) {
    var text = mcPageText(key);
    if (text === undefined && MC_TEXT[mcLang]) text = MC_TEXT[mcLang][key];
    if (text === undefined) {
        if (!MC_MISSING_TEXT[key]) {
            MC_MISSING_TEXT[key] = true;                 // warn once per key, not per call
            console.warn('Missing translation: ' + key + ' [' + mcLang + ']');
        }
        text = mcHumanizeKey(key);
    }
    if (placeholders) {
        Object.keys(placeholders).forEach(function (k) {
            text = String(text).replace('{' + k + '}', placeholders[k]);
        });
    }
    return text;
}

function getThemeName(theme) {
    switch (theme) {
        case 'overworld': return t('theme_overworld');
        case 'nether': return t('theme_nether');
        case 'end': return t('theme_end');
        default: return 'Overworld';
    }
}

/* ===== AUDIO ===== */
function initAudio() {
    try {
        levelUpSound = new Audio('/assets/audio/levelup.ogg');
        levelUpSound.volume = 0.3;
        levelUpSound.preload = 'auto';
    } catch (error) {
        console.log('Audio could not be initialised:', error);
    }
}

// The splash overlay from mc-preferences.js covers the page for about a second;
// the welcome toast and level-up sound wait for it to go rather than firing
// behind it.
function waitForSplashGone(callback) {
    if (!document.getElementById('mcSplashOverlay')) {
        callback();
        return;
    }
    var observer = new MutationObserver(function () {
        if (!document.getElementById('mcSplashOverlay')) {
            observer.disconnect();
            callback();
        }
    });
    observer.observe(document.body, { childList: true });
}

function playLevelUpSound() {
    if (!soundEnabled || !levelUpSound) return;
    try {
        levelUpSound.currentTime = 0;
        levelUpSound.play().catch(function () {
            // Autoplay is blocked until the visitor interacts with the page.
            var enableSound = function () {
                levelUpSound.play().catch(function () {});
                document.removeEventListener('click', enableSound);
                document.removeEventListener('keydown', enableSound);
            };
            document.addEventListener('click', enableSound, { once: true });
            document.addEventListener('keydown', enableSound, { once: true });
        });
    } catch (error) {
        console.log('Sound error:', error);
    }
}

function playClickSound() {
    if (!soundEnabled) return;

    var now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    var last = window.__mcCraftLastClickSoundAt || 0;
    if (now - last < 120) return;
    window.__mcCraftLastClickSoundAt = now;

    try {
        var ctx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());

        if (ctx.state === 'suspended') {
            ctx.resume().then(function () {
                window.__mcCraftLastClickSoundAt = 0;
                playClickSound();
            }).catch(function () {});
            return;
        }

        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start();
        setTimeout(function () { osc.stop(); }, 100);
    } catch (e) {}
}

/* ===== SOUND TOGGLE ===== */
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
    showToast(t('toast_sound_title'), t(soundEnabled ? 'toast_sound_on' : 'toast_sound_off'), 'info');
}

function updateSoundIcon() {
    var src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
    if (soundIcon) soundIcon.src = src;
    if (mobileSoundIcon) mobileSoundIcon.src = src;
}

/* ===== LOADER =====
   The splash overlay in mc-preferences.js is the only loading screen; pages
   carry no separate .loader markup. */
function initLoader() {
    waitForSplashGone(function () {
        playLevelUpSound();
        showWelcomeToast();
    });
}

var mcWelcomeShown = false;
function showWelcomeToast() {
    // Two rules, both learned the hard way:
    // 1. Several pages call this again once their data has loaded. The greeting
    //    is a once-per-page-load event, so the guard lives here rather than in
    //    every caller - that is what produced two identical toasts on
    //    items/mobs/capes.
    if (mcWelcomeShown) return;
    // 2. The greeting always comes from the page itself. Some pages name the keys
    //    toast_welcome_*, others toast_loaded_* - both count. A page that defines
    //    neither (the two 404s, and pages that already announce themselves in
    //    their own words, like the heads database and the skin poser) gets none,
    //    rather than a generic one on top of the message it already shows.
    var titleKey = mcPageText('toast_welcome_title') !== undefined ? 'toast_welcome_title'
                 : mcPageText('toast_loaded_title') !== undefined ? 'toast_loaded_title'
                 : null;
    if (!titleKey) return;
    var messageKey = titleKey === 'toast_welcome_title' ? 'toast_welcome_message' : 'toast_loaded_message';
    mcWelcomeShown = true;
    showToast(t(titleKey), t(messageKey), 'info');
}

/* ===== THEME ===== */
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
    if (!themeBtn) return;
    var icon = themeBtn.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-palette';
}

function updateActiveThemeButtons() {
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
}

function setThemeDropdown(open) {
    if (!themeDropdown) return;
    themeDropdown.classList.toggle('show', open);
    if (themeBtn) themeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function initThemeSwitcher() {
    if (themeBtn && themeDropdown) {
        themeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            setThemeDropdown(!themeDropdown.classList.contains('show'));
            playClickSound();
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.theme-switcher')) setThemeDropdown(false);
        });
    }
    document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
        option.addEventListener('click', function () {
            var theme = option.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButtons();
            setThemeDropdown(false);
            playClickSound();
            showToast(t('toast_theme_changed'), t('toast_theme_to', { theme: getThemeName(theme) }), 'info');
        });
    });
}

/* ===== MOBILE DRAWER =====
   The drawer is only moved off-screen when closed, so its links stay in the tab
   order. `inert` takes them out of both the tab order and the accessibility
   tree; aria-hidden over focusable content would be an ARIA violation. */
var MOBILE_NAV_FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

    // The drawer is a narrow panel, so a tap on the page behind it never reaches
    // it; the overlay is what "outside" actually is. Pages without an overlay
    // element keep working, they just have no click-outside target.
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Keep Tab inside the drawer while it is open.
    mobileNav.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab' || !mobileNav.classList.contains('show')) return;
        var items = Array.prototype.slice.call(mobileNav.querySelectorAll(MOBILE_NAV_FOCUSABLE))
            .filter(function (el) { return el.offsetParent !== null; });
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}

function openMobileMenu() {
    if (!mobileNav) return;
    mobileNav.classList.add('show');
    mobileNav.removeAttribute('inert');
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', t('menu_close'));
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.hidden = false;
        // Next frame, so the element is laid out before the opacity transition
        // starts - toggling `hidden` and the class together skips the fade.
        requestAnimationFrame(function () { mobileNavOverlay.classList.add('show'); });
    }
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
    playClickSound();
}

function closeMobileMenu() {
    if (!mobileNav || !mobileNav.classList.contains('show')) return;
    mobileNav.classList.remove('show');
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', t('menu_open'));
    }

    // Only pull focus back to the toggle if it is currently inside the drawer -
    // closing on resize should not yank it from somewhere else.
    if (mobileNav.contains(document.activeElement) && mobileMenuBtn) mobileMenuBtn.focus();

    if (mobileNavOverlay) mobileNavOverlay.classList.remove('show');
    document.body.style.overflow = '';

    // `inert` is applied on a later task, not inline: one caller is the click
    // handler on a .mobile-nav-link, and marking that link's own subtree inert
    // while the click is still being processed risks suppressing the navigation
    // it was supposed to trigger. Deferring also lets the slide-out finish.
    setTimeout(function () {
        if (mobileNav.classList.contains('show')) return; // reopened meanwhile
        mobileNav.setAttribute('inert', '');
        if (mobileNavOverlay) mobileNavOverlay.hidden = true;
    }, 300);

    playClickSound();
}

/* ===== HEADER DROPDOWNS =====
   The menus open on hover and on :focus-within in CSS. These handlers add the
   missing pieces: a click/tap toggle, an aria-expanded value that matches what
   is on screen, and Escape to dismiss. */
function initNavDropdowns() {
    var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.dropdown'));
    if (!dropdowns.length) return;

    function close(dropdown) {
        var btn = dropdown.querySelector('.dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    dropdowns.forEach(function (dropdown) {
        var btn = dropdown.querySelector('.dropdown-btn');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = btn.getAttribute('aria-expanded') === 'true';
            // The menu also opens on :hover, and mouseenter sets the attribute.
            // Without this check a mouse click on an already-hovered button read
            // "open" and collapsed it, so the CSS kept the menu visible while
            // aria-expanded said false. Only a toggle without hover collapses.
            var hovered = dropdown.matches(':hover');
            dropdowns.forEach(close);
            btn.setAttribute('aria-expanded', (open && !hovered) ? 'false' : 'true');
        });
        dropdown.addEventListener('mouseenter', function () { btn.setAttribute('aria-expanded', 'true'); });
        dropdown.addEventListener('mouseleave', function () { close(dropdown); });
        dropdown.addEventListener('focusin', function () { btn.setAttribute('aria-expanded', 'true'); });
        dropdown.addEventListener('focusout', function (e) {
            if (!dropdown.contains(e.relatedTarget)) close(dropdown);
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) dropdowns.forEach(close);
    });
}

/* ===== SCROLL EFFECTS ===== */
function initScrollEffects() {
    if (header || backToTop) {
        window.addEventListener('scroll', function () {
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);
            if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
        }, { passive: true });
    }
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playClickSound();
        });
    }
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var headerHeight = header ? header.offsetHeight : 0;
            // Page position, not offsetTop: targets inside a positioned section would land too high.
            var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
            playClickSound();
        });
    });
}

/* ===== TOASTS ===== */
function showToast(title, message, type) {
    if (!toastContainer) return;
    var toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' error-toast' : '');

    var icon = 'fas fa-info-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';
    if (type === 'warning') icon = 'fas fa-exclamation-circle';
    if (type === 'success') icon = 'fas fa-check-circle';

    toast.innerHTML =
        '<div class="toast-icon"><i class="' + icon + '"></i></div>' +
        '<div class="toast-content">' +
        '<div class="toast-title"></div>' +
        '<div class="toast-message"></div>' +
        '</div>';
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-message').textContent = message;

    toastContainer.appendChild(toast);
    playClickSound();
    setTimeout(function () { toast.classList.add('show'); }, 100);
    setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () { toast.remove(); }, 300);
    }, 5000);
    toast.addEventListener('click', function () {
        toast.classList.remove('show');
        setTimeout(function () { toast.remove(); }, 300);
    });
}

/* ===== FOOTER ===== */
function initFooterYear() {
    var yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
}

/* ===== SHARED INIT =====
   Page modules add their own DOMContentLoaded listener for page logic. */
window.addEventListener('DOMContentLoaded', function () {
    initAudio();
    initLoader();
    initTheme();
    initSoundToggle();
    initMobileMenu();
    initThemeSwitcher();
    initNavDropdowns();
    initScrollEffects();
    initFooterYear();

    initClickSound();
});

/* ===== CLICK FEEDBACK =====
   One delegated listener rather than one per element: it also covers buttons a
   page builds later (the skin and chibi editors rebuild their toolbars), and it
   cannot double up the way per-element binding did on pages that bound the same
   selectors again. */
function initClickSound() {
    var selector = 'button, .btn, .nav-link, .theme-option, .theme-option-btn, .tool-link,' +
        ' .mobile-nav-link, .sound-btn, .lang-btn, .mobile-sound-btn, .mobile-lang-btn, .dropdown-btn';
    document.addEventListener('click', function (e) {
        var target = e.target.closest ? e.target.closest(selector) : null;
        if (!target || target.disabled) return;
        // These already play the sound themselves, from toggleSound / the theme
        // switcher / the back-to-top handler. Without the guard they play twice.
        if (target === soundBtn || target === mobileSoundBtn || target === themeBtn || target === backToTop) return;
        if (target.classList.contains('theme-option') || target.classList.contains('theme-option-btn')) return;
        setTimeout(playClickSound, 50);
    });
}

/* ===== KEYBOARD ===== */
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (mobileNav && mobileNav.classList.contains('show')) closeMobileMenu();
    if (themeDropdown && themeDropdown.classList.contains('show')) setThemeDropdown(false);
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        var btn = dropdown.querySelector('.dropdown-btn');
        if (!btn) return;
        if (dropdown.contains(document.activeElement)) btn.focus();
        btn.setAttribute('aria-expanded', 'false');
    });
});

/* ===== RESIZE =====
   site-modern-v1.css hides the desktop navigation up to 1024px, so closing the
   drawer above 768px used to strand tablet users with no menu at all. */
var mcResizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(mcResizeTimeout);
    mcResizeTimeout = setTimeout(function () {
        if (window.innerWidth > 1024 && mobileNav && mobileNav.classList.contains('show')) closeMobileMenu();
    }, 250);
});

/* ===== ERROR HANDLING =====
   Every page module carried this; it surfaces an unexpected script error to the
   visitor instead of failing silently. */
window.addEventListener('error', function (e) {
    var message = String(e.message || '');
    // Browsers report a ResizeObserver that needed a second pass as an "error".
    // It is harmless and says nothing is broken - never alarm the visitor with it.
    if (message.indexOf('ResizeObserver loop') !== -1) return;
    // Only errors thrown by MC-Craft's own scripts. DevTools and browser
    // extensions inject scripts into the page too (e.g. the web-vitals live
    // metrics); their errors already appear in the console as Uncaught and are
    // not the visitor's concern.
    var file = String(e.filename || '');
    if (file.indexOf(location.origin + '/') !== 0) return;
    console.error('JavaScript Error:', message);
    showToast(t('toast_error_title'), t('toast_error_message'), 'error');
});

/* ===== CONNECTION STATUS ===== */
window.addEventListener('online', function () {
    showToast(t('toast_online_title'), t('toast_online_message'), 'success');
});
window.addEventListener('offline', function () {
    showToast(t('toast_offline_title'), t('toast_offline_message'), 'warning');
});