(function () {
    'use strict';

    var STORAGE_KEY = 'mc-craft-cookie-consent';
    var EXTERNAL_FONT_CSS = 'https://fonts.cdnfonts.com/css/minecraft-4';
    var EXTERNAL_FONT_MARK = 'minecraft-font';

    var SITE_VERSION = '1.1.1';

    var GUARDED_KEYS = ['mc-craft-theme', 'mc-craft-sound', 'mc-craft-color-edition', 'mc-craft-color-theme'];

    function readConsentLevel() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            return parsed && parsed.decided ? parsed.level : null;
        } catch (e) {
            return null;
        }
    }

    (function installStorageGuard() {
        var nativeSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function (key, value) {
            if (GUARDED_KEYS.indexOf(key) !== -1 && readConsentLevel() === 'reject') {
                return; // Alle ablehnen: notwendige Praeferenz-Keys werden gar nicht erst geschrieben
            }
            return nativeSetItem.call(this, key, value);
        };
    })();

    function detectLang() {
        return (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0 ? 'en' : 'de';
    }

    var currentLang = detectLang();

    // Splash-screen artwork video, shown uncropped (object-fit:contain) inside
    // the framed art box. If it fails to load, the box falls back to the
    // "drop artwork here" placeholder text the original DesignSync mockups used.
    var SPLASH_ART_SRC = '/assets/img/splash/minecraft.mp4';

    // ===== LOADING SPLASH =====
    // Ported from the 2 DesignSync mockups (MC-Craft-Launcher-Splash[.html] /
    // -2.html): same layout/animations (grid drift, glow-pulse frame, sweep
    // highlight, scanlines, popping corner brackets, flickering title, blinking
    // dots), but recolored to the site's own --primary/--secondary/--accent
    // theme vars (so it matches Overworld/Nether/End like every other page)
    // instead of the mockups' standalone cyan/green-orange-purple, and using
    // the site's self-hosted fonts instead of a new external Google Fonts
    // dependency. Runs on every page (this file is loaded site-wide). The two
    // mockups become "single" (one glow color) and "tri" (3-color cycling
    // glow) variants, picked at random on each load. The mockups had no real
    // progress readout (just a decorative looping bar) — percentage here is a
    // smooth animated approach to 90% that only completes once the real
    // `load` event fires, so it reflects actual page readiness.
    function injectSplashStyles() {
        if (document.getElementById('mcSplashStyle')) return;
        var style = document.createElement('style');
        style.id = 'mcSplashStyle';
        style.textContent =
            '.mc-splash-overlay{position:fixed;inset:0;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
                'overflow:hidden;background:var(--bg-primary,#0F172A);color:var(--text-primary,#F8FAFC);' +
                'font-family:var(--ui-font,"Space Grotesk",sans-serif);padding:60px 26px 64px;box-sizing:border-box;' +
                'opacity:1;transition:opacity .5s ease;' +
                '--mc-c1:var(--primary);--mc-c2:var(--primary);--mc-c3:var(--primary);}' +
            '.mc-splash-overlay.mc-splash-tri{--mc-c2:var(--secondary,#3b82f6);--mc-c3:var(--accent,#FF6B6B);}' +
            '.mc-splash-overlay.mc-splash-hide{opacity:0;pointer-events:none;}' +
            '.mc-splash-grid{position:absolute;inset:0;pointer-events:none;' +
                'background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);' +
                'background-size:56px 56px;animation:mcSplashGridDrift 9s linear infinite;}' +
            '@keyframes mcSplashGridDrift{from{background-position:0 0;}to{background-position:0 56px;}}' +
            '.mc-splash-glow{position:absolute;inset:0;pointer-events:none;' +
                'background:radial-gradient(45% 45% at 30% 40%,color-mix(in srgb,var(--mc-c1) 12%,transparent),transparent 70%),' +
                'radial-gradient(45% 45% at 50% 55%,color-mix(in srgb,var(--mc-c2) 10%,transparent),transparent 70%),' +
                'radial-gradient(45% 45% at 70% 40%,color-mix(in srgb,var(--mc-c3) 12%,transparent),transparent 70%);}' +
            '.mc-splash-inner{position:relative;display:flex;flex-direction:column;align-items:center;gap:clamp(20px,4.5vh,40px);' +
                'animation:mcSplashIn .5s cubic-bezier(.2,.8,.25,1) both;}' +
            '@keyframes mcSplashIn{from{opacity:0;transform:translateY(12px) scale(.985);}to{opacity:1;transform:none;}}' +
            '.mc-splash-art-wrap{position:relative;width:min(720px,84vw,66vh);}' +
            '.mc-splash-art-box{position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--bg-secondary,#1E293B);' +
                'animation:mcSplashGlow 2.8s ease-in-out infinite;}' +
            '@keyframes mcSplashGlow{' +
                '0%,100%{box-shadow:0 0 0 2px var(--mc-c1),0 0 18px -2px var(--mc-c1),inset 0 0 24px -14px var(--mc-c1);}' +
                '33%{box-shadow:0 0 0 2px var(--mc-c2),0 0 30px 0 var(--mc-c2),inset 0 0 28px -12px var(--mc-c2);}' +
                '66%{box-shadow:0 0 0 2px var(--mc-c3),0 0 30px 0 var(--mc-c3),inset 0 0 28px -12px var(--mc-c3);}}' +
            '.mc-splash-art{width:100%;height:100%;object-fit:contain;box-sizing:border-box;display:block;}' +
            '.mc-splash-art-placeholder{display:none;position:absolute;inset:0;align-items:center;justify-content:center;text-align:center;' +
                'padding:16px;box-sizing:border-box;font-size:12px;letter-spacing:.5px;color:var(--text-muted,rgba(248,250,252,.35));}' +
            '.mc-splash-art-missing .mc-splash-art{display:none;}' +
            '.mc-splash-art-missing .mc-splash-art-placeholder{display:flex;}' +
            '.mc-splash-sweep{position:absolute;inset:0;pointer-events:none;height:22%;' +
                'background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--mc-c1) 35%,transparent),transparent);' +
                'animation:mcSplashSweep 3.6s linear infinite;mix-blend-mode:screen;}' +
            '@keyframes mcSplashSweep{0%{transform:translateY(-120%);opacity:0;}12%{opacity:.55;}88%{opacity:.55;}100%{transform:translateY(520%);opacity:0;}}' +
            '.mc-splash-scan{position:absolute;inset:0;pointer-events:none;' +
                'background:repeating-linear-gradient(0deg,rgba(0,0,0,.16) 0 1px,transparent 1px 3px);}' +
            '.mc-splash-corner{position:absolute;width:30px;height:30px;animation:mcSplashBracket 2.8s ease-in-out infinite;}' +
            '.mc-splash-corner.tl{top:-5px;left:-5px;border-top:4px solid var(--mc-c1);border-left:4px solid var(--mc-c1);}' +
            '.mc-splash-corner.tr{top:-5px;right:-5px;border-top:4px solid var(--mc-c2);border-right:4px solid var(--mc-c2);animation-delay:.35s;}' +
            '.mc-splash-corner.bl{bottom:-5px;left:-5px;border-bottom:4px solid var(--mc-c3);border-left:4px solid var(--mc-c3);animation-delay:.7s;}' +
            '.mc-splash-corner.br{bottom:-5px;right:-5px;border-bottom:4px solid var(--mc-c1);border-right:4px solid var(--mc-c1);animation-delay:1.05s;}' +
            '@keyframes mcSplashBracket{0%,100%{opacity:.75;transform:none;}50%{opacity:1;transform:scale(1.06);}}' +
            '.mc-splash-title-row{display:flex;align-items:flex-end;gap:18px;}' +
            '.mc-splash-title{font-family:var(--title-font,"Chakra Petch",sans-serif);font-weight:700;letter-spacing:2px;' +
                'font-size:clamp(22px,3.6vh,34px);text-shadow:0 3px 0 rgba(0,0,0,.4);' +
                'animation:mcSplashFlicker 5s linear infinite,mcSplashHue 6.6s steps(1,end) infinite;}' +
            '@keyframes mcSplashFlicker{0%,92%,100%{opacity:1;}94%{opacity:.55;}96%{opacity:1;}98%{opacity:.7;}}' +
            '@keyframes mcSplashHue{0%,28%{color:var(--mc-c1);}33%,61%{color:var(--mc-c2);}66%,94%{color:var(--mc-c3);}100%{color:var(--mc-c1);}}' +
            '.mc-splash-dots{display:flex;gap:8px;padding-bottom:7px;}' +
            '.mc-splash-dots i{width:11px;height:11px;background:var(--mc-c1);display:block;opacity:.18;' +
                'animation:mcSplashBlink 1.2s steps(1,end) infinite;}' +
            '.mc-splash-dots i:nth-child(2){background:var(--mc-c2);animation-delay:.2s;}' +
            '.mc-splash-dots i:nth-child(3){background:var(--mc-c3);animation-delay:.4s;}' +
            '@keyframes mcSplashBlink{0%,100%{opacity:.18;transform:translateY(0);}40%{opacity:1;transform:translateY(-4px);}}' +
            '.mc-splash-bar{width:min(360px,66vw);height:12px;border:2px solid rgba(255,255,255,.14);background:var(--bg-secondary,#1E293B);overflow:hidden;}' +
            '.mc-splash-bar-fill{height:100%;width:0%;transition:width .25s ease-out;' +
                'background:repeating-linear-gradient(90deg,var(--mc-c1) 0 10px,color-mix(in srgb,var(--mc-c1) 55%,transparent) 10px 20px);' +
                'background-size:200% 100%;animation:mcSplashBarSlide 1.6s linear infinite;}' +
            '.mc-splash-tri .mc-splash-bar-fill{background:repeating-linear-gradient(90deg,var(--mc-c1) 0 16px,var(--mc-c2) 16px 32px,var(--mc-c3) 32px 48px);' +
                'background-size:200% 100%;}' +
            '@keyframes mcSplashBarSlide{from{background-position:0 0;}to{background-position:120px 0;}}' +
            '.mc-splash-status{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--text-secondary,rgba(248,250,252,.5));text-align:center;}' +
            '.mc-splash-percent{font-family:var(--title-font,"Chakra Petch",sans-serif);font-weight:600;font-size:13px;color:var(--text-secondary,rgba(248,250,252,.6));}' +
            '.mc-splash-version{position:absolute;left:26px;bottom:22px;font-size:20px;letter-spacing:1px;color:var(--text-muted,rgba(248,250,252,.3));}' +
            '.mc-splash-mark{position:absolute;right:26px;bottom:22px;font-family:var(--title-font,"Chakra Petch",sans-serif);' +
                'font-size:20px;letter-spacing:1px;color:var(--text-muted,rgba(248,250,252,.22));}' +
            '@media (prefers-reduced-motion: reduce){' +
                '.mc-splash-grid,.mc-splash-art-box,.mc-splash-sweep,.mc-splash-corner,.mc-splash-title,.mc-splash-dots i,.mc-splash-bar-fill{animation:none!important;}}';
        document.head.appendChild(style);
    }

    function runSplash() {
        if (document.getElementById('mcSplashOverlay') || !document.body) return;
        injectSplashStyles();

        var variant = Math.random() < 0.5 ? 'single' : 'tri';
        var statusLines = currentLang === 'de'
            ? ['Ressourcen werden geladen', 'Assets werden geprüft', 'Welt wird vorbereitet', 'Fast fertig']
            : ['Loading resources', 'Checking assets', 'Preparing world', 'Almost done'];

        var overlay = document.createElement('div');
        overlay.id = 'mcSplashOverlay';
        overlay.className = 'mc-splash-overlay mc-splash-' + variant;
        overlay.innerHTML =
            '<div class="mc-splash-grid"></div>' +
            '<div class="mc-splash-glow"></div>' +
            '<div class="mc-splash-inner">' +
                '<div class="mc-splash-art-wrap">' +
                    '<div class="mc-splash-art-box">' +
                        '<video class="mc-splash-art" id="mcSplashArt" src="' + SPLASH_ART_SRC + '" autoplay muted loop playsinline></video>' +
                        '<div class="mc-splash-art-placeholder">' + (currentLang === 'de' ? 'Splash-Artwork hier ablegen' : 'Drop splash artwork here') + '</div>' +
                        '<div class="mc-splash-sweep"></div>' +
                        '<div class="mc-splash-scan"></div>' +
                    '</div>' +
                    '<span class="mc-splash-corner tl"></span><span class="mc-splash-corner tr"></span>' +
                    '<span class="mc-splash-corner bl"></span><span class="mc-splash-corner br"></span>' +
                '</div>' +
                '<div class="mc-splash-title-row">' +
                    '<span class="mc-splash-title">' + (currentLang === 'de' ? 'LADEN' : 'LOADING') + '</span>' +
                    '<span class="mc-splash-dots"><i></i><i></i><i></i></span>' +
                '</div>' +
                '<div class="mc-splash-bar"><div class="mc-splash-bar-fill" id="mcSplashBarFill"></div></div>' +
                '<div class="mc-splash-status" id="mcSplashStatus">' + statusLines[0] + '</div>' +
                '<div class="mc-splash-percent" id="mcSplashPercent">0%</div>' +
            '</div>' +
            '<div class="mc-splash-version">v' + SITE_VERSION + '</div>' +
            '<div class="mc-splash-mark">MC-CRAFT</div>';
        document.body.appendChild(overlay);
        document.documentElement.classList.add('mc-splash-lock');
        if (!document.getElementById('mcSplashLockStyle')) {
            var lockStyle = document.createElement('style');
            lockStyle.id = 'mcSplashLockStyle';
            lockStyle.textContent = '.mc-splash-lock{overflow:hidden;}';
            document.head.appendChild(lockStyle);
        }

        var artVideo = document.getElementById('mcSplashArt');
        if (artVideo) {
            artVideo.addEventListener('error', function () {
                overlay.classList.add('mc-splash-art-missing');
            }, { once: true });
        }

        var percentEl = document.getElementById('mcSplashPercent');
        var fillEl = document.getElementById('mcSplashBarFill');
        var statusEl = document.getElementById('mcSplashStatus');
        var startTime = Date.now();
        // Real page-load speed alone made this play out in a single frame (jumping
        // straight to "Fertig"/100% without ever showing the status carousel or a
        // counting percentage) — MIN_PLAY_MS is a floor so the animation is always
        // actually visible; real (slower) loads still wait past it for the true
        // `load` event instead of lying about being done.
        var MIN_PLAY_MS = 3200;
        var pct = 0;
        var loaded = document.readyState === 'complete';
        var statusIdx = 0;

        var statusTimer = setInterval(function () {
            statusIdx = (statusIdx + 1) % statusLines.length;
            if (statusEl) statusEl.textContent = statusLines[statusIdx];
        }, MIN_PLAY_MS / statusLines.length);

        function setPct(p) {
            pct = p;
            if (percentEl) percentEl.textContent = Math.round(p) + '%';
            if (fillEl) fillEl.style.width = p + '%';
        }

        function finish() {
            clearInterval(statusTimer);
            setPct(100);
            if (statusEl) statusEl.textContent = currentLang === 'de' ? 'Fertig' : 'Done';
            setTimeout(function () {
                overlay.classList.add('mc-splash-hide');
                document.documentElement.classList.remove('mc-splash-lock');
                setTimeout(function () { overlay.remove(); }, 550);
            }, 400);
        }

        function tick() {
            var elapsed = Date.now() - startTime;
            var timeShare = Math.min(1, elapsed / MIN_PLAY_MS); // 0..1 over the minimum play time
            var cap = loaded ? 100 : 97; // hold just short of 100 until the real `load` event fires
            var target = Math.min(cap, timeShare * 100);
            setPct(Math.max(pct, target));
            if (timeShare >= 1 && loaded) { finish(); return; }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        if (!loaded) {
            window.addEventListener('load', function () { loaded = true; }, { once: true });
        }
    }

    runSplash();

    var TEXT = {
        de: {
            title: 'Cookies & Datenschutz',
            intro: 'Wir respektieren deine Privatsphäre. Wähle, was gespeichert werden darf:',
            necessaryLabel: 'Technisch notwendig',
            necessaryDesc: 'Theme- und Sound-Einstellung – wird nur gespeichert, wenn du "Nur notwendige" oder "Alle akzeptieren" wählst.',
            optionalLabel: 'Optional',
            optionalDesc: 'Eine externe Schriftart von fonts.cdnfonts.com für die Vorschau im Advancement-Generator – dabei wird deine IP-Adresse an diesen Anbieter übertragen. Wird nur bei "Alle akzeptieren" geladen.',
            linkText: 'Vollständige Liste aller externen Dienste in unserer',
            linkLabel: 'Datenschutzerklärung',
            detailsBtn: 'Cookies im Detail anzeigen',
            detailsBtnHide: 'Cookies im Detail ausblenden',
            tableName: 'Name',
            tablePurpose: 'Zweck',
            tableType: 'Typ',
            tableDuration: 'Speicherdauer',
            typeNecessary: 'Notwendig',
            typeOptional: 'Optional',
            accept: 'Alle akzeptieren',
            necessaryBtn: 'Nur notwendige',
            reject: 'Alle ablehnen',
            settingsLabel: 'Cookie-Einstellungen',
            rejectNote: 'Bei "Alle ablehnen" speichern wir nur diese eine Entscheidung selbst (damit dir dieses Fenster nicht bei jedem Besuch erneut angezeigt wird). Alles andere – auch Theme und Sound – wird nicht gespeichert und geht bei einem Neuladen verloren.',
            statusAll: 'Cookies: Alle akzeptiert',
            statusNecessary: 'Cookies: Nur notwendige',
            statusReject: 'Cookies: Abgelehnt',
            toastAllTitle: 'Alle Cookies akzeptiert',
            toastAllMsg: 'Notwendige Einstellungen und die externe Schriftart werden gespeichert bzw. geladen.',
            toastNecessaryTitle: 'Nur notwendige Cookies',
            toastNecessaryMsg: 'Theme und Sound werden gespeichert, die externe Schriftart bleibt blockiert.',
            toastRejectTitle: 'Alle Cookies abgelehnt',
            toastRejectMsg: 'Es wird nichts gespeichert außer dieser Entscheidung selbst.'
        },
        en: {
            title: 'Cookies & Privacy',
            intro: 'We respect your privacy. Choose what may be stored:',
            necessaryLabel: 'Technically necessary',
            necessaryDesc: 'Theme and sound setting – only stored if you choose "Necessary only" or "Accept all".',
            optionalLabel: 'Optional',
            optionalDesc: 'An external font from fonts.cdnfonts.com for the preview in the Advancement Generator – this transmits your IP address to that provider. Only loaded on "Accept all".',
            linkText: 'Full list of every external service in our',
            linkLabel: 'privacy policy',
            detailsBtn: 'Show cookies in detail',
            detailsBtnHide: 'Hide cookie details',
            tableName: 'Name',
            tablePurpose: 'Purpose',
            tableType: 'Type',
            tableDuration: 'Storage duration',
            typeNecessary: 'Necessary',
            typeOptional: 'Optional',
            accept: 'Accept all',
            necessaryBtn: 'Necessary only',
            reject: 'Reject all',
            settingsLabel: 'Cookie settings',
            rejectNote: 'With "Reject all", we only store this one decision itself (so this window doesn\'t reappear on every visit). Everything else – including theme and sound – is not stored and is lost on reload.',
            statusAll: 'Cookies: All accepted',
            statusNecessary: 'Cookies: Necessary only',
            statusReject: 'Cookies: Rejected',
            toastAllTitle: 'All cookies accepted',
            toastAllMsg: 'Necessary preferences and the external font will be saved / loaded.',
            toastNecessaryTitle: 'Necessary cookies only',
            toastNecessaryMsg: 'Theme and sound will be saved; the external font stays blocked.',
            toastRejectTitle: 'All cookies rejected',
            toastRejectMsg: 'Nothing is stored except this decision itself.'
        }
    };

    var COOKIE_TABLE = [
        {
            name: 'mc-craft-theme',
            purpose: { de: 'Gewähltes Farbthema (Overworld/Nether/End)', en: 'Chosen color theme (Overworld/Nether/End)' },
            necessary: true
        },
        {
            name: 'mc-craft-sound',
            purpose: { de: 'Ob Soundeffekte an oder aus sind', en: 'Whether sound effects are on or off' },
            necessary: true
        },
        {
            name: 'mc-craft-color-edition, mc-craft-color-theme',
            purpose: { de: 'Deine Einstellungen im Farbtext-Konverter', en: 'Your settings in the color text converter' },
            necessary: true
        },
        {
            name: 'mc-craft-terms-accepted, mc-craft-terms-accepted-date',
            purpose: { de: 'Ob und wann du die Nutzungsbedingungen bestätigt hast', en: 'Whether and when you accepted the terms of use' },
            necessary: true
        },
        {
            name: 'mc-craft-cookie-consent',
            purpose: { de: 'Deine Entscheidung in diesem Cookie-Hinweis selbst', en: 'Your decision in this cookie notice itself' },
            necessary: true
        },
        {
            name: 'fonts.cdnfonts.com',
            purpose: { de: 'Externe Pixel-Schriftart fürs Advancement-Generator-Vorschaubild', en: 'External pixel font for the Advancement Generator preview image' },
            necessary: false
        }
    ];

    function t(key) {
        return (TEXT[currentLang] || TEXT.de)[key];
    }

    function buildTableHtml() {
        var rows = COOKIE_TABLE.map(function (row) {
            var typeLabel = row.necessary ? t('typeNecessary') : t('typeOptional');
            var typeClass = row.necessary ? 'mc-pref-type-necessary' : 'mc-pref-type-optional';
            var duration = currentLang === 'de'
                ? 'Lokal gespeichert, bis gelöscht'
                : 'Stored locally until deleted';
            return '<tr>' +
                '<td><code>' + row.name + '</code></td>' +
                '<td>' + row.purpose[currentLang === 'de' ? 'de' : 'en'] + '</td>' +
                '<td><span class="' + typeClass + '">' + typeLabel + '</span></td>' +
                '<td>' + duration + '</td>' +
            '</tr>';
        }).join('');

        return '<div class="mc-pref-table-wrap" id="mcPrefTableWrap" hidden>' +
            '<table class="mc-pref-table">' +
                '<thead><tr>' +
                    '<th>' + t('tableName') + '</th>' +
                    '<th>' + t('tablePurpose') + '</th>' +
                    '<th>' + t('tableType') + '</th>' +
                    '<th>' + t('tableDuration') + '</th>' +
                '</tr></thead>' +
                '<tbody>' + rows + '</tbody>' +
            '</table>' +
        '</div>';
    }

    function getStoredConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function storeConsent(level) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                decided: true,
                level: level,
                date: new Date().toISOString()
            }));
        } catch (e) {}
    }

    function applyConsent(level) {
        window.mcCraftConsent = { decided: true, level: level, external: level === 'all' };
        document.dispatchEvent(new CustomEvent('mc-craft-consent-changed', { detail: { level: level } }));

        var existingLink = document.querySelector('link[data-consent-gated="' + EXTERNAL_FONT_MARK + '"]');
        if (level === 'all') {
            if (!existingLink) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = EXTERNAL_FONT_CSS;
                link.setAttribute('data-consent-gated', EXTERNAL_FONT_MARK);
                document.head.appendChild(link);
            }
        } else if (existingLink) {
            existingLink.remove();
        }

        // Schreibzugriffe blockieren.
        if (level === 'reject') {
            var nativeRemoveItem = Object.getPrototypeOf(localStorage).removeItem;
            GUARDED_KEYS.forEach(function (key) {
                nativeRemoveItem.call(localStorage, key);
            });
        }

        updateToggleButton();
    }

    function notifyChoice(level) {
        var titleKey = level === 'all' ? 'toastAllTitle' : level === 'necessary' ? 'toastNecessaryTitle' : 'toastRejectTitle';
        var msgKey = level === 'all' ? 'toastAllMsg' : level === 'necessary' ? 'toastNecessaryMsg' : 'toastRejectMsg';
        var title = t(titleKey);
        var message = t(msgKey);
        if (typeof window.showToast === 'function') {
            try {
                window.showToast(title, message, 'success');
                return;
            } catch (e) {}
        }

        // Fallback, falls eine Seite (noch) kein eigenes Toast-System hat.
        var toast = document.createElement('div');
        toast.className = 'mc-pref-fallback-toast';
        toast.innerHTML = '<strong>' + title + '</strong><p>' + message + '</p>';
        document.body.appendChild(toast);
        setTimeout(function () { toast.classList.add('show'); }, 20);
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 300);
        }, 5000);
    }

    function removeOverlay() {
        var existing = document.getElementById('mcPrefOverlay');
        if (existing) existing.remove();
    }

    function buildOverlay() {
        removeOverlay();
        var alreadyDecided = !!(getStoredConsent() && getStoredConsent().decided);

        var overlay = document.createElement('div');
        overlay.id = 'mcPrefOverlay';
        overlay.className = 'mc-pref-overlay';

        var panel = document.createElement('div');
        panel.className = 'mc-pref-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', t('title'));
        panel.innerHTML =
            (alreadyDecided ? '<button type="button" class="mc-pref-close-btn" id="mcPrefCloseBtn" aria-label="' + (currentLang === 'de' ? 'Schließen' : 'Close') + '">&times;</button>' : '') +
            '<h3 class="mc-pref-title">' + t('title') + '</h3>' +
            '<p class="mc-pref-intro">' + t('intro') + '</p>' +
            '<div class="mc-pref-row mc-pref-row-ok">' +
                '<i class="fas fa-check-circle"></i>' +
                '<div>' +
                    '<strong>' + t('necessaryLabel') + '</strong>' +
                    '<p>' + t('necessaryDesc') + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="mc-pref-row mc-pref-row-opt">' +
                '<i class="fas fa-toggle-on"></i>' +
                '<div>' +
                    '<strong>' + t('optionalLabel') + '</strong>' +
                    '<p>' + t('optionalDesc') + '</p>' +
                '</div>' +
            '</div>' +
            '<button type="button" class="mc-pref-details-btn" id="mcPrefDetailsBtn">' +
                '<i class="fas fa-list"></i> ' + t('detailsBtn') +
            '</button>' +
            buildTableHtml() +
            '<p class="mc-pref-link">' + t('linkText') + ' <a href="' + (currentLang === 'de' ? '/blog/de/datenschutz.html' : '/blog/en/datenschutz.html') + '">' + t('linkLabel') + '</a>.</p>' +
            '<p class="mc-pref-reject-note">' + t('rejectNote') + '</p>' +
            '<div class="mc-pref-actions">' +
                '<button type="button" class="btn btn-outline" id="mcPrefRejectBtn">' + t('reject') + '</button>' +
                '<button type="button" class="btn btn-outline" id="mcPrefNecessaryBtn">' + t('necessaryBtn') + '</button>' +
                '<button type="button" class="btn btn-primary" id="mcPrefAcceptBtn">' + t('accept') + '</button>' +
            '</div>';

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        var closeBtn = document.getElementById('mcPrefCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', removeOverlay);
        }

        document.getElementById('mcPrefDetailsBtn').addEventListener('click', function () {
            var wrap = document.getElementById('mcPrefTableWrap');
            var btn = document.getElementById('mcPrefDetailsBtn');
            var isHidden = wrap.hasAttribute('hidden');
            if (isHidden) {
                wrap.removeAttribute('hidden');
                btn.innerHTML = '<i class="fas fa-list"></i> ' + t('detailsBtnHide');
            } else {
                wrap.setAttribute('hidden', '');
                btn.innerHTML = '<i class="fas fa-list"></i> ' + t('detailsBtn');
            }
        });

        function choose(level) {
            storeConsent(level);
            applyConsent(level);
            removeOverlay();
            notifyChoice(level);
        }

        document.getElementById('mcPrefAcceptBtn').addEventListener('click', function () { choose('all'); });
        document.getElementById('mcPrefNecessaryBtn').addEventListener('click', function () { choose('necessary'); });
        document.getElementById('mcPrefRejectBtn').addEventListener('click', function () { choose('reject'); });
    }

    function buildToggleButton() {
        if (document.getElementById('mcPrefToggleBtn')) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'mcPrefToggleBtn';
        btn.className = 'mc-pref-toggle-btn';
        btn.addEventListener('click', buildOverlay);
        var footerMeta = document.querySelector('.footer-meta');
        if (footerMeta) {
            footerMeta.appendChild(btn);
        } else {
            document.body.appendChild(btn);
        }
        updateToggleButton();
    }

    function updateToggleButton() {
        var btn = document.getElementById('mcPrefToggleBtn');
        if (!btn) return;
        var level = readConsentLevel();
        var label = level === 'all' ? t('statusAll')
            : level === 'necessary' ? t('statusNecessary')
            : level === 'reject' ? t('statusReject')
            : t('settingsLabel');
        btn.innerHTML = '🍪 ' + label;
        btn.setAttribute('aria-label', t('settingsLabel'));
        btn.title = t('settingsLabel');
    }

    // ===== VERSION-BADGE ANIMATION =====
    function injectVersionBadgeStyles() {
        if (document.getElementById('mcVersionBadgeStyle')) return;
        var style = document.createElement('style');
        style.id = 'mcVersionBadgeStyle';
        style.textContent =
            '.mc-version-badge-anim {' +
                'position: relative;' +
                'overflow: hidden;' +
            '}' +
            '.mc-version-badge-anim::after {' +
                'content: "";' +
                'position: absolute;' +
                'top: 0; left: -150%;' +
                'width: 60%; height: 100%;' +
                'background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.55), transparent);' +
                'transform: skewX(-20deg);' +
                'animation: mcVersionGlint 3.2s ease-in-out infinite;' +
                'pointer-events: none;' +
            '}' +
            '@keyframes mcVersionGlint {' +
                '0% { left: -150%; }' +
                '55% { left: 150%; }' +
                '100% { left: 150%; }' +
            '}' +
            '@media (prefers-reduced-motion: reduce) {' +
                '.mc-version-badge-anim::after { animation: none; }' +
            '}';
        document.head.appendChild(style);
    }

    function enhanceVersionBadge() {
        var badge = document.querySelector('.footer-meta .version');
        if (badge) badge.classList.add('mc-version-badge-anim');
    }

    function applySiteVersion() {
        var badge = document.querySelector('.footer-meta .version');
        if (!badge) return;
        badge.textContent = 'Version ' + SITE_VERSION;
        badge.removeAttribute('data-i18n');
    }

    var HERO_VERSION_PATTERN = /^\s*V\s*\d+(?:\.\d+){1,2}\s+(?:ist da|is here)\s*$/i;

    function findHeroVersionBadges() {
        var tagged = document.querySelectorAll('[data-mc-version-badge]');
        if (tagged.length) return tagged;

        var found = [];
        document.querySelectorAll('.hero-badge').forEach(function (el) {
            if (HERO_VERSION_PATTERN.test(el.textContent)) {
                el.setAttribute('data-mc-version-badge', '');
                found.push(el);
            }
        });
        return found;
    }

    function applyHeroVersionBadge() {
        var label = currentLang === 'de' ? ('V ' + SITE_VERSION + ' ist da') : ('V ' + SITE_VERSION + ' is here');
        findHeroVersionBadges().forEach(function (el) {
            var dot = el.querySelector('.hero-badge-dot');
            if (dot) {
                var textNode = el.childNodes[el.childNodes.length - 1];
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                    textNode.textContent = ' ' + label;
                } else {
                    el.appendChild(document.createTextNode(' ' + label));
                }
            } else {
                el.textContent = label;
            }
            el.removeAttribute('data-i18n');
        });
    }

    function refreshLanguage() {
        currentLang = detectLang();
        if (document.getElementById('mcPrefOverlay')) {
            buildOverlay();
        }
        updateToggleButton();
        applyHeroVersionBadge();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var stored = getStoredConsent();
        if (stored && stored.decided) {
            applyConsent(stored.level);
        } else {
            window.mcCraftConsent = { decided: false, level: null, external: false };
            buildOverlay();
        }
        buildToggleButton();
        applySiteVersion();
        applyHeroVersionBadge();
        injectVersionBadgeStyles();
        enhanceVersionBadge();
        setTimeout(refreshLanguage, 300);
    });
})();