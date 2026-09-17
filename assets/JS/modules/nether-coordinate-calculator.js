// nether-coordinate-calculator.js

const I18N = {
    de: {
        toast_welcome_title: 'Nether Koordinaten Rechner geladen!',
        toast_welcome_message: 'Gib Koordinaten auf einer Seite ein – die andere rechnet automatisch mit.',
        copied_title: 'Kopiert!',
        copied: 'Befehl wurde in die Zwischenablage kopiert.',
        copy_failed_title: 'Kopieren fehlgeschlagen',
        copy_failed: 'Bitte den Befehl manuell markieren und kopieren.'
    },
    en: {
        toast_welcome_title: 'Nether Coordinate Calculator loaded!',
        toast_welcome_message: 'Enter coordinates on either side – the other one updates automatically.',
        copied_title: 'Copied!',
        copied: 'Command copied to clipboard.',
        copy_failed_title: 'Copy failed',
        copy_failed: 'Please select and copy the command manually.'
    }
};

(function () {
    'use strict';

    const el = {};

    function round(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    function readAxis(input) {
        const value = parseFloat(input.value);
        return Number.isFinite(value) ? value : 0;
    }

    function writeAxis(input, value) {
        input.value = round(value);
    }

    function updateCommands() {
        const owX = readAxis(el.owX);
        const owY = readAxis(el.owY);
        const owZ = readAxis(el.owZ);
        const nX = readAxis(el.nX);
        const nY = readAxis(el.nY);
        const nZ = readAxis(el.nZ);

        el.owCommand.textContent =
            `/execute in minecraft:overworld run tp @s ${owX} ${owY} ${owZ}`;
        el.nCommand.textContent =
            `/execute in minecraft:the_nether run tp @s ${nX} ${nY} ${nZ}`;
    }

    function syncFromOverworld() {
        writeAxis(el.nX, readAxis(el.owX) / 8);
        writeAxis(el.nY, readAxis(el.owY));
        writeAxis(el.nZ, readAxis(el.owZ) / 8);
        updateCommands();
    }

    function syncFromNether() {
        writeAxis(el.owX, readAxis(el.nX) * 8);
        writeAxis(el.owY, readAxis(el.nY));
        writeAxis(el.owZ, readAxis(el.nZ) * 8);
        updateCommands();
    }

    function legacyCopy(text) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        area.remove();
        return ok;
    }

    function copyCommand(text) {
        if (!text) return;
        const toast = (ok) => {
            if (typeof showToast !== 'function') return;
            if (ok) showToast(t('copied_title'), t('copied'), 'success');
            else showToast(t('copy_failed_title'), t('copy_failed'), 'error');
        };
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => toast(true), () => toast(legacyCopy(text)));
        } else {
            toast(legacyCopy(text));
        }
    }

    function init() {
        el.owX = document.getElementById('nccOwX');
        el.owY = document.getElementById('nccOwY');
        el.owZ = document.getElementById('nccOwZ');
        el.nX = document.getElementById('nccNX');
        el.nY = document.getElementById('nccNY');
        el.nZ = document.getElementById('nccNZ');
        if (!el.owX || !el.nX) return;

        el.owCommand = document.getElementById('nccOwCommand');
        el.nCommand = document.getElementById('nccNCommand');
        el.owCopyBtn = document.getElementById('nccOwCopy');
        el.nCopyBtn = document.getElementById('nccNCopy');

        [el.owX, el.owY, el.owZ].forEach((input) => {
            input.addEventListener('input', syncFromOverworld);
        });
        [el.nX, el.nY, el.nZ].forEach((input) => {
            input.addEventListener('input', syncFromNether);
        });

        if (el.owCopyBtn) {
            el.owCopyBtn.addEventListener('click', () => copyCommand(el.owCommand.textContent));
        }
        if (el.nCopyBtn) {
            el.nCopyBtn.addEventListener('click', () => copyCommand(el.nCommand.textContent));
        }

        // Seed a working example so the command boxes never start empty.
        syncFromOverworld();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
