(function () {
    'use strict';

    var HEADS_URL = '/assets/JS/heads/mhf-heads.json';

    var heads = [];
    var currentCategory = 'all';
    var currentSyntax = 'modern';
    var currentQuery = '';
    var soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
    var currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
    var levelUpSound = null;

    var headsGrid = document.getElementById('headsGrid');
    var headCountEl = document.getElementById('headCount');
    var headSearchInput = document.getElementById('headSearch');
    var categoryTabs = document.getElementById('categoryTabs');
    var syntaxToggle = document.getElementById('syntaxToggle');

    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var closeBtn = document.getElementById('closeBtn');
    var mobileNav = document.getElementById('mobileNav');
    var themeBtn = document.getElementById('themeBtn');
    var themeDropdown = document.getElementById('themeDropdown');
    var soundBtn = document.getElementById('soundBtn');
    var soundIcon = document.getElementById('soundIcon');
    var mobileSoundBtn = document.getElementById('mobileSoundBtn');
    var mobileSoundIcon = document.getElementById('mobileSoundIcon');
    var backToTop = document.getElementById('backToTop');
    var header = document.querySelector('.header');

    var CATEGORY_LABELS = {
        creature: 'Kreatur',
        block: 'Block',
        symbol: 'Symbol',
        logo: 'Logo'
    };

    var THEME_NAMES = { overworld: 'Overworld', nether: 'Nether', end: 'The End' };

    var toastContainer = document.getElementById('toastContainer');

    function showToast(title, message, type) {
        type = type || 'success';
        if (!toastContainer) return;
        var toast = document.createElement('div');
        toast.className = 'toast' + (type === 'error' ? ' error-toast' : '');
        var icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-triangle';
        else if (type === 'info') icon = 'fa-info-circle';
        toast.innerHTML =
            '<div class="toast-icon"><i class="fas ' + icon + '"></i></div>' +
            '<div class="toast-content">' +
                '<div class="toast-title"></div>' +
                '<div class="toast-message"></div>' +
            '</div>';
        toast.querySelector('.toast-title').textContent = title;
        toast.querySelector('.toast-message').textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(function () { toast.classList.add('show'); }, 100);
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }
    window.showToast = showToast;

    function buildCommand(id, syntax) {
        if (syntax === 'ancient') {
            return '/give @p minecraft:skull 1 3 {SkullOwner:"' + id + '"}';
        }
        if (syntax === 'legacy') {
            return '/give @p minecraft:player_head{SkullOwner:"' + id + '"}';
        }
        return '/give @p minecraft:player_head[profile="' + id + '"]';
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
            if (typeof window.showToast === 'function') {
                window.showToast('In Zwischenablage kopiert', 'Erfolg', 'success');
            }
        }).catch(function () {
            if (typeof window.showToast === 'function') {
                window.showToast('Kopieren fehlgeschlagen', 'Fehler', 'error');
            }
        });
    }

    function headMatchesQuery(head, query) {
        if (!query) return true;
        var q = query.toLowerCase();
        return head.id.toLowerCase().indexOf(q) !== -1 ||
            head.nameDe.toLowerCase().indexOf(q) !== -1;
    }

    function renderHeadCard(head) {
        var card = document.createElement('div');
        card.className = 'head-card';

        var icon = document.createElement('div');
        icon.className = 'head-icon';
        if (head.icon) {
            icon.style.backgroundImage = 'url(' + head.icon + ')';
        } else {
            var i = document.createElement('i');
            var prefix = head.iconStyle || (head.category === 'logo' ? 'fab' : 'fas');
            i.className = prefix + ' ' + (head.faIcon || 'fa-cube');
            icon.appendChild(i);
        }
        card.appendChild(icon);

        var name = document.createElement('div');
        name.className = 'head-name';
        name.textContent = head.nameDe;
        card.appendChild(name);

        var id = document.createElement('div');
        id.className = 'head-id';
        id.textContent = head.id;
        card.appendChild(id);

        var badge = document.createElement('div');
        badge.className = 'head-category-badge';
        badge.textContent = CATEGORY_LABELS[head.category] || head.category;
        card.appendChild(badge);

        if (head.noteDe) {
            var note = document.createElement('div');
            note.className = 'head-note';
            note.textContent = head.noteDe;
            card.appendChild(note);
        }

        var box = document.createElement('div');
        box.className = 'head-command-box';
        var code = document.createElement('code');
        code.textContent = buildCommand(head.id, currentSyntax);
        var btn = document.createElement('button');
        btn.className = 'head-copy-btn';
        btn.setAttribute('aria-label', 'Befehl kopieren');
        btn.innerHTML = '<i class="fas fa-copy"></i>';
        btn.addEventListener('click', function () {
            copyToClipboard(code.textContent);
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(function () {
                btn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
        box.appendChild(code);
        box.appendChild(btn);
        card.appendChild(box);

        return card;
    }

    function renderHeadsGrid() {
        if (!headsGrid) return;
        headsGrid.innerHTML = '';

        var filtered = heads.filter(function (h) {
            var categoryOk = currentCategory === 'all' || h.category === currentCategory;
            return categoryOk && headMatchesQuery(h, currentQuery);
        });

        if (filtered.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'no-results';
            empty.textContent = 'Keine Köpfe gefunden.';
            headsGrid.appendChild(empty);
        } else {
            var fragment = document.createDocumentFragment();
            filtered.forEach(function (h) {
                fragment.appendChild(renderHeadCard(h));
            });
            headsGrid.appendChild(fragment);
        }

        if (headCountEl) {
            headCountEl.textContent = filtered.length + ' Köpfe';
        }
    }

    function setCategory(category) {
        currentCategory = category;
        if (categoryTabs) {
            categoryTabs.querySelectorAll('.filter-tab').forEach(function (b) {
                b.classList.toggle('active', b.dataset.category === category);
            });
        }
        renderHeadsGrid();
    }

    function initFilters() {
        if (categoryTabs) {
            categoryTabs.addEventListener('click', function (e) {
                var btn = e.target.closest('.filter-tab');
                if (!btn) return;
                setCategory(btn.dataset.category);
            });
        }

        if (headSearchInput) {
            headSearchInput.addEventListener('input', function () {
                currentQuery = headSearchInput.value.trim();
                renderHeadsGrid();
            });
        }

        if (syntaxToggle) {
            syntaxToggle.addEventListener('click', function (e) {
                var btn = e.target.closest('.syntax-toggle-btn');
                if (!btn) return;
                syntaxToggle.querySelectorAll('.syntax-toggle-btn').forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                currentSyntax = btn.dataset.syntax;
                renderHeadsGrid();
            });
        }

        var logoShortcut = document.getElementById('heroLogoShortcut');
        if (logoShortcut) {
            logoShortcut.addEventListener('click', function () {
                setCategory('logo');
            });
        }
    }

    // ===== AUDIO =====
    function initAudio() {
        try {
            levelUpSound = new Audio('/assets/audio/levelup.ogg');
            levelUpSound.volume = 0.3;
            levelUpSound.preload = 'auto';
        } catch (e) { /* ignore */ }
    }

    function playLevelUpSound() {
        if (!soundEnabled || !levelUpSound) return;
        try {
            levelUpSound.currentTime = 0;
            levelUpSound.play().catch(function () {});
        } catch (e) { /* ignore */ }
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
        } catch (e) { /* ignore */ }
    }

    // ===== SOUND TOGGLE =====
    function updateSoundIcon() {
        var src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
        if (soundIcon) soundIcon.src = src;
        if (mobileSoundIcon) mobileSoundIcon.src = src;
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('mc-craft-sound', soundEnabled);
        updateSoundIcon();
        playClickSound();
        showToast('Sound', soundEnabled ? 'Sound an' : 'Sound aus');
    }

    function initSoundToggle() {
        updateSoundIcon();
        if (soundBtn) soundBtn.addEventListener('click', toggleSound);
        if (mobileSoundBtn) mobileSoundBtn.addEventListener('click', toggleSound);
    }

    // ===== THEME SYSTEM =====
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('mc-craft-theme', theme);
        currentTheme = theme;
    }

    function updateActiveThemeButtons() {
        document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
            option.classList.toggle('active', option.dataset.theme === currentTheme);
        });
    }

    function initThemeSwitcher() {
        applyTheme(currentTheme);
        updateActiveThemeButtons();
        if (themeBtn) {
            themeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                themeDropdown.classList.toggle('show');
                playClickSound();
            });
        }
        document.addEventListener('click', function (e) {
            if (themeDropdown && !e.target.closest('.theme-switcher')) {
                themeDropdown.classList.remove('show');
            }
        });
        document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
            option.addEventListener('click', function () {
                var theme = option.dataset.theme;
                applyTheme(theme);
                updateActiveThemeButtons();
                if (themeDropdown) themeDropdown.classList.remove('show');
                playClickSound();
                showToast('Theme geändert', 'Zu ' + (THEME_NAMES[theme] || theme) + ' gewechselt');
            });
        });
    }

    // ===== MOBILE MENU =====
    function closeMobileMenu() {
        if (mobileNav) mobileNav.classList.remove('show');
        document.body.style.overflow = '';
        playClickSound();
    }

    function initMobileMenu() {
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function () {
                mobileNav.classList.add('show');
                document.body.style.overflow = 'hidden';
                playClickSound();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
        if (mobileNav) {
            mobileNav.addEventListener('click', function (e) {
                if (e.target === mobileNav) closeMobileMenu();
            });
            document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    }

    // ===== SCROLL EFFECTS =====
    function initScrollEffects() {
        window.addEventListener('scroll', function () {
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);
            if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
        });
        if (backToTop) {
            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                playClickSound();
            });
        }
    }

    var LOADER_TEXTS = [
        'Kopf-Datenbank wird geladen...',
        'MHF-Köpfe werden eingelesen...',
        'Blöcke und Symbole laden...',
        'Logo-Köpfe werden vorbereitet...',
        'Fast fertig...'
    ];

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

    function runLoaderAnimation() {
        waitForSplashGone(function () {
                            playLevelUpSound();
                            showToast('Kopf-Datenbank geladen!', '70 Köpfe bereit');
                        });
    }

    function init() {
        initFilters();
        fetch(HEADS_URL).then(function (r) { return r.json(); }).then(function (data) {
            heads = data;
            renderHeadsGrid();
        }).catch(function (err) {
            console.error('Kopf-Datenbank konnte nicht geladen werden:', err);
            if (headsGrid) {
                headsGrid.innerHTML = '<div class="no-results">Daten konnten nicht geladen werden.</div>';
            }
        });
        runLoaderAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
