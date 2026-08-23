(function () {
    'use strict';

    var STORAGE_KEY = 'mc-craft-cookie-consent';
    var EXTERNAL_FONT_CSS = 'https://fonts.cdnfonts.com/css/minecraft-4';
    var EXTERNAL_FONT_MARK = 'minecraft-font';

    // Diese Praeferenz-Keys werden von JEDER Seite geschrieben, sobald der
    // Besucher Sprache/Theme/Sound/Farbtext-Einstellungen aendert - unabhaengig
    // von diesem Modul. Bei "Alle ablehnen" werden genau diese Schreibzugriffe
    // unten aktiv blockiert (echte Sperre, kein Kosmetik-Label).
    var GUARDED_KEYS = ['mc-craft-lang', 'mc-craft-theme', 'mc-craft-sound', 'mc-craft-color-edition', 'mc-craft-color-theme'];

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

    // Muss VOR jedem anderen Skript auf der Seite laufen (dieses <script>-Tag
    // steht immer vor dem eigentlichen Seiten-Skript), damit die Sperre schon
    // aktiv ist, bevor irgendein anderes Skript versucht, etwas zu speichern.
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
        return localStorage.getItem('mc-craft-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en');
    }

    var currentLang = detectLang();

    var TEXT = {
        de: {
            title: 'Cookies & Datenschutz',
            intro: 'Wir respektieren deine Privatsphäre. Wähle, was gespeichert werden darf:',
            necessaryLabel: 'Technisch notwendig',
            necessaryDesc: 'Sprache, Theme und Sound-Einstellung – wird nur gespeichert, wenn du "Nur notwendige" oder "Alle akzeptieren" wählst.',
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
            rejectNote: 'Bei "Alle ablehnen" speichern wir nur diese eine Entscheidung selbst (damit dir dieses Fenster nicht bei jedem Besuch erneut angezeigt wird). Alles andere – auch Sprache, Theme und Sound – wird nicht gespeichert und geht bei einem Neuladen verloren.',
            statusAll: 'Cookies: Alle akzeptiert',
            statusNecessary: 'Cookies: Nur notwendige',
            statusReject: 'Cookies: Abgelehnt',
            toastAllTitle: 'Alle Cookies akzeptiert',
            toastAllMsg: 'Notwendige Einstellungen und die externe Schriftart werden gespeichert bzw. geladen.',
            toastNecessaryTitle: 'Nur notwendige Cookies',
            toastNecessaryMsg: 'Sprache, Theme und Sound werden gespeichert, die externe Schriftart bleibt blockiert.',
            toastRejectTitle: 'Alle Cookies abgelehnt',
            toastRejectMsg: 'Es wird nichts gespeichert außer dieser Entscheidung selbst.'
        },
        en: {
            title: 'Cookies & Privacy',
            intro: 'We respect your privacy. Choose what may be stored:',
            necessaryLabel: 'Technically necessary',
            necessaryDesc: 'Language, theme, and sound setting – only stored if you choose "Necessary only" or "Accept all".',
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
            rejectNote: 'With "Reject all", we only store this one decision itself (so this window doesn\'t reappear on every visit). Everything else – including language, theme, and sound – is not stored and is lost on reload.',
            statusAll: 'Cookies: All accepted',
            statusNecessary: 'Cookies: Necessary only',
            statusReject: 'Cookies: Rejected',
            toastAllTitle: 'All cookies accepted',
            toastAllMsg: 'Necessary preferences and the external font will be saved / loaded.',
            toastNecessaryTitle: 'Necessary cookies only',
            toastNecessaryMsg: 'Language, theme, and sound will be saved; the external font stays blocked.',
            toastRejectTitle: 'All cookies rejected',
            toastRejectMsg: 'Nothing is stored except this decision itself.'
        }
    };

    // MC-Craft setzt keine klassischen HTTP-Cookies, sondern speichert alles
    // im localStorage des Browsers. Diese Tabelle ist die vollstaendige,
    // ehrliche Liste - deckt sich mit Punkt 4/5 der Datenschutzerklaerung.
    var COOKIE_TABLE = [
        {
            name: 'mc-craft-lang',
            purpose: { de: 'Gewählte Sprache (Deutsch/Englisch)', en: 'Chosen language (German/English)' },
            necessary: true
        },
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

    // level: 'reject' | 'necessary' | 'all'.
    // STORAGE_KEY ist absichtlich nicht Teil von GUARDED_KEYS, wird also vom
    // Guard oben nie blockiert - sonst koennten wir uns "Alle ablehnen" gar
    // nicht erst merken und der Hinweis wuerde bei jedem Aufruf neu erscheinen.
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

        // "Alle ablehnen": bereits vorhandene notwendige Praeferenzen aus
        // frueheren Besuchen ebenfalls entfernen, nicht nur zukuenftige
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

        // Nutzt das vorhandene Toast-System der jeweiligen Seite (jede
        // Seite definiert global function showToast(title, message, type)).
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
        // X zum Schliessen gibt es nur, wenn schon eine Entscheidung besteht
        // (man das Fenster also nur zum Nachschauen/Aendern erneut geoeffnet
        // hat). Beim allerersten Besuch ohne Entscheidung bleibt eine
        // bewusste Wahl erforderlich.
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
            '<p class="mc-pref-link">' + t('linkText') + ' <a href="/blog/datenschutz.html">' + t('linkLabel') + '</a>.</p>' +
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

        // Steht im Footer neben Version/Changelog statt als schwebender
        // Button ueber dem restlichen Seiteninhalt.
        var footerMeta = document.querySelector('.footer-meta');
        if (footerMeta) {
            footerMeta.appendChild(btn);
        } else {
            document.body.appendChild(btn);
        }
        updateToggleButton();
    }

    // Zeigt im Footer-Button immer die AKTUELLE Entscheidung an, nicht nur
    // einen generischen "Einstellungen"-Text - damit jederzeit sichtbar ist,
    // welche Wahl gerade aktiv ist.
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

    function refreshLanguage() {
        currentLang = detectLang();
        if (document.getElementById('mcPrefOverlay')) {
            buildOverlay();
        }
        updateToggleButton();
    }

    // Reagiert auf den Sprachumschalter der Seite (kein eigenes Event dafür
    // vorhanden, daher: nach jedem Klick auf den Sprach-Button kurz warten,
    // bis das Seiten-Script mc-craft-lang aktualisiert hat, dann neu lesen
    // und den Banner ggf. mit der neuen Sprache neu aufbauen).
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#langBtn, #mobileLangBtn')) {
            setTimeout(refreshLanguage, 50);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var stored = getStoredConsent();
        if (stored && stored.decided) {
            applyConsent(stored.level);
        } else {
            window.mcCraftConsent = { decided: false, level: null, external: false };
            buildOverlay();
        }
        buildToggleButton();

        // Manche Seiten-Skripte normalisieren/schreiben mc-craft-lang erst in
        // ihrer eigenen Initialisierung kurz NACH diesem Modul - einmal kurz
        // nachpruefen, damit Button/Panel nicht mit der falschen Sprache
        // haengen bleiben.
        setTimeout(refreshLanguage, 300);
    });
})();
