// Main JavaScript File for MC-Craft (Deutsch)
// By Blexilein

// ===== Sound-Toggle =====

// Texte dieser Seite (nur Deutsch)
const T = {
    loader_text1: "MC-Craft wird geladen...",
    loader_text2: "Items werden geladen...",
    loader_text3: "Textkonverter initialisiert...",
    loader_text4: "Mobs werden generiert...",
    loader_text5: "Server Status geprüft...",
    loader_text6: "Skin Editor vorbereitet...",
    loader_text7: "Fast fertig...",
    theme_overworld: "Overworld",
    theme_nether: "Nether",
    theme_end: "The End",
    toast_welcome_title: "MC-Craft geladen!",
    toast_welcome_message: "Viel Spaß mit unseren Minecraft-Tools!",
    toast_sound_title: "Sound",
    toast_sound_on: "Sound an",
    toast_sound_off: "Sound aus",
    toast_theme_changed: "Theme geändert",
    toast_theme_to: "Zu {theme} gewechselt",
    toast_error_title: "Oops!",
    toast_error_message: "Ein kleiner Fehler ist aufgetreten. Die Seite funktioniert weiterhin.",
    toast_online_title: "Verbindung wiederhergestellt",
    toast_online_message: "Du bist wieder online!",
    toast_offline_title: "Offline Modus",
    toast_offline_message: "Einige Funktionen sind möglicherweise nicht verfügbar."
};

// DOM Elements

// Sound Elements

// ===== HILFSFUNKTIONEN =====
// ===== INITIALISIERUNG =====
window.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initToolCards();
    initPageAnalytics();
});

// ===== AUDIO =====

// ===== SOUND TOGGLE =====

// ===== LOADER =====

// ===== THEME SYSTEM =====

// ===== MOBILE MENU =====
// Selector for everything inside the drawer that can hold focus, used to keep
// Tab inside the panel while it is open.

// ===== THEME SWITCHER =====

// ===== HEADER DROPDOWNS =====
// The menus open on hover and on :focus-within in CSS. These handlers add the
// missing pieces: a click/tap toggle, an aria-expanded value that matches what
// is on screen, and Escape to dismiss.

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        updateActiveNavLink();
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playClickSound();
    });
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight, behavior: 'smooth' });
                playClickSound();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
                if (!counter.dataset.animated) {
                    animateCounter(counter, target);
                    counter.dataset.animated = true;
                }
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5, rootMargin: '50px' });
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = Math.floor(duration / 100);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            if (target === 1000) element.textContent = '1K+';
            else if (target === 90) element.textContent = '90+';
            else if (target === 100) element.textContent = '100%';
            else if (target === 24) element.textContent = '24/7';
            else element.textContent = target;
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== TOOL CARDS =====
// The hover lift and the entrance animation are both CSS now. This function used
// to write inline `transform`/`opacity` on every card, which fought the shared
// `riseFadeIn` animation in site-modern-v1.css - an animation declaration
// outranks inline styles, so the JS reveal never actually showed anything and
// the inline hover transform was overridden the moment the animation settled.
function initToolCards() {
    document.querySelectorAll('.tool-card .tool-link').forEach(link => {
        link.addEventListener('click', playClickSound);
    });
}

// ===== TOAST =====

// ===== FOOTER YEAR =====

// ===== ANALYTICS =====
function initPageAnalytics() {
    console.log('MC-Craft Seite geladen');
    document.querySelectorAll('.tool-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.textContent.trim() || this.querySelector('span')?.textContent || 'Unbekanntes Tool';
            console.log(`Tool geöffnet: ${toolName}`);
        });
    });
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

