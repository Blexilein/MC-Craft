const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_loaded_title: 'Bereit',
        toast_loaded_message: 'Stell dir dein Feuerwerk zusammen.',
        toast_error_title: 'Fehler',
        toast_data_failed: 'Die Feuerwerk-Daten konnten nicht geladen werden.',
        toast_copied_title: 'Kopiert',
        toast_command_copied: 'Befehl kopiert.',
        toast_commands_copied: 'Alle Befehle kopiert.',
        toast_link_copied: 'Link zu deinem Feuerwerk kopiert.',
        toast_copy_failed: 'Kopieren hat nicht geklappt.',
        toast_saved_title: 'Gespeichert',
        toast_screenshot: 'Bild heruntergeladen.',
        toast_import_title: 'Importiert',
        toast_import_ok: 'Feuerwerk aus dem Befehl übernommen.',
        toast_import_failed: 'In dem Text wurde kein Feuerwerk gefunden.',
        toast_preset_title: 'Vorlage',
        loading: 'Feuerwerk wird vorbereitet …',
        no_webgl: 'Dein Browser unterstützt kein WebGL – die Vorschau ist hier nicht möglich.',
        star_n: 'Stern {n}',
        stars_one: '1 Stern',
        stars_many: '{n} Sterne',
        stars_none: 'Keine Sterne – die Rakete fliegt nur. Ideal zum Fliegen mit Elytren.',
        edit_star: 'Stern {n} bearbeiten',
        move_up: 'Nach oben',
        move_down: 'Nach unten',
        duplicate: 'Duplizieren',
        remove: 'Entfernen',
        remove_color: '{name} entfernen',
        add_color: '{name} hinzufügen',
        colors_empty: 'Noch keine Farbe – ohne Farbe explodiert der Stern schwarz.',
        fade_empty: 'Ohne Übergang behalten die Funken ihre Farbe.',
        shape_plain: 'ohne Zutat',
        flight_n: 'Flugdauer {n}',
        custom_color: 'Eigene Farbe',
        copy: 'Kopieren',
        stat_time: 'Flugzeit',
        stat_height: 'Explosionshöhe',
        stat_damage: 'Schaden',
        stat_sparks: 'Funken',
        range_seconds: '{a}–{b} s',
        range_blocks: '{a}–{b} Blöcke',
        damage_value: '{p} ({h} Herzen)',
        damage_none: 'keiner',
        sparks_value: '≈ {n}',
        note_sparks: 'Minecraft zeigt höchstens 16.384 Partikel gleichzeitig – ältere verschwinden dann früher.',
        note_preview: 'Die Vorschau fliegt höchstens mit Flugdauer 3.',
        craft_star: 'Stern {n}',
        craft_stars: 'Sterne {list}',
        craft_fade: 'Übergang für {name}',
        craft_rocket: 'Rakete',
        craft_times: '{n}× craften',
        craft_ok: 'Alles lässt sich an der Werkbank craften.',
        craft_warn_title: 'Nur per Befehl möglich:',
        craft_all_recipes: 'Alle Rezepte',
        warn_flight: 'Flugdauer {n} – an der Werkbank gehen nur 1 bis 3 Schwarzpulver.',
        warn_rocket_slots: 'Papier, {fuel} Schwarzpulver und {stars} Sterne passen nicht in die 9 Felder der Werkbank.',
        warn_no_color: '{name} hat keine Farbe – zum Craften brauchst du mindestens einen Farbstoff.',
        warn_star_slots: '{name} braucht {n} Felder – die Werkbank hat nur 9.',
        warn_fade_slots: 'Der Übergang von {name} hat {n} Farben – neben dem Stern passen höchstens 8.',
        warn_custom: '{name} nutzt eigene Farben, die es als Farbstoff nicht gibt.',
        cmd_give_rocket: '/give – Rakete',
        cmd_give_star: '/give – {name}',
        cmd_summon: '/summon – zündet sofort, explodiert nach {s} s',
        cmd_more_stars: '… und {n} weitere Sterne',
        cmd_note_new: 'Für Minecraft Java 1.20.5 und neuer (26.x). Befehle im Chat brauchen Cheats oder OP-Rechte.',
        cmd_note_legacy: 'Für Minecraft Java 1.13 bis 1.20.4 (altes NBT-Format).',
        cmd_note_legacy_flight: 'Im alten Format geht die Flugdauer nur bis 127.',
        preset_new_year: 'Silvester',
        preset_gold_rain: 'Goldregen',
        preset_creeper: 'Creeper',
        preset_starry: 'Sternenhimmel',
        preset_rainbow: 'Regenbogen',
        preset_fountain: 'Fontäne',
        preset_elytra: 'Elytra-Rakete',
        preset_random: 'Zufall',
        shape_desc_small_ball: 'Die Grundform ohne Zutat: eine kleine Kugel aus 98 Funken.',
        shape_desc_large_ball: 'Mit Feuerkugel: eine große Kugel aus 386 Funken – dazu ein lauterer Knall.',
        shape_desc_star: 'Mit Goldklumpen: ein fünfzackiger Stern aus 121 Funken, dreifach gedreht.',
        shape_desc_creeper: 'Mit einem Kopf, z. B. einem Creeperkopf: ein Creeper-Gesicht aus 265 Funken.',
        shape_desc_burst: 'Mit Feder: 70 Funken schießen wie eine Fontäne nach oben.',
        shape_try: 'Ausprobieren',
        shape_sparks: '{n} Funken',
        shape_radius: 'ca. {n} Blöcke Radius',
        shape_any_head: 'Jeder Kopf geht: {list}',
        sound_on: 'Ton an',
        sound_off: 'Ton aus'
    },
    en: {
        toast_loaded_title: 'Ready',
        toast_loaded_message: 'Put together your firework.',
        toast_error_title: 'Error',
        toast_data_failed: 'The firework data could not be loaded.',
        toast_copied_title: 'Copied',
        toast_command_copied: 'Command copied.',
        toast_commands_copied: 'All commands copied.',
        toast_link_copied: 'Link to your firework copied.',
        toast_copy_failed: 'Copying did not work.',
        toast_saved_title: 'Saved',
        toast_screenshot: 'Image downloaded.',
        toast_import_title: 'Imported',
        toast_import_ok: 'Firework taken over from the command.',
        toast_import_failed: 'No firework was found in that text.',
        toast_preset_title: 'Preset',
        loading: 'Preparing fireworks …',
        no_webgl: 'Your browser does not support WebGL – the preview is not available here.',
        star_n: 'Star {n}',
        stars_one: '1 star',
        stars_many: '{n} stars',
        stars_none: 'No stars – the rocket only flies. Perfect for flying with elytra.',
        edit_star: 'Edit star {n}',
        move_up: 'Move up',
        move_down: 'Move down',
        duplicate: 'Duplicate',
        remove: 'Remove',
        remove_color: 'Remove {name}',
        add_color: 'Add {name}',
        colors_empty: 'No colour yet – without a colour the star explodes black.',
        fade_empty: 'Without a fade the sparks keep their colour.',
        shape_plain: 'no ingredient',
        flight_n: 'Flight duration {n}',
        custom_color: 'Custom colour',
        copy: 'Copy',
        stat_time: 'Flight time',
        stat_height: 'Explosion height',
        stat_damage: 'Damage',
        stat_sparks: 'Sparks',
        range_seconds: '{a}–{b} s',
        range_blocks: '{a}–{b} blocks',
        damage_value: '{p} ({h} hearts)',
        damage_none: 'none',
        sparks_value: '≈ {n}',
        note_sparks: 'Minecraft shows at most 16,384 particles at once – older ones then disappear early.',
        note_preview: 'The preview flies with a flight duration of 3 at most.',
        craft_star: 'Star {n}',
        craft_stars: 'Stars {list}',
        craft_fade: 'Fade for {name}',
        craft_rocket: 'Rocket',
        craft_times: 'craft {n}×',
        craft_ok: 'Everything can be crafted at a crafting table.',
        craft_warn_title: 'Only possible with commands:',
        craft_all_recipes: 'All recipes',
        warn_flight: 'Flight duration {n} – a crafting table only takes 1 to 3 gunpowder.',
        warn_rocket_slots: 'Paper, {fuel} gunpowder and {stars} stars do not fit into the 9 slots of a crafting table.',
        warn_no_color: '{name} has no colour – crafting needs at least one dye.',
        warn_star_slots: '{name} needs {n} slots – a crafting table only has 9.',
        warn_fade_slots: 'The fade of {name} has {n} colours – at most 8 fit next to the star.',
        warn_custom: '{name} uses custom colours that no dye has.',
        cmd_give_rocket: '/give – rocket',
        cmd_give_star: '/give – {name}',
        cmd_summon: '/summon – launches at once, explodes after {s} s',
        cmd_more_stars: '… and {n} more stars',
        cmd_note_new: 'For Minecraft Java 1.20.5 and later (26.x). Commands in chat need cheats or operator rights.',
        cmd_note_legacy: 'For Minecraft Java 1.13 to 1.20.4 (old NBT format).',
        cmd_note_legacy_flight: 'The old format only allows a flight duration up to 127.',
        preset_new_year: 'New Year',
        preset_gold_rain: 'Golden rain',
        preset_creeper: 'Creeper',
        preset_starry: 'Starry sky',
        preset_rainbow: 'Rainbow',
        preset_fountain: 'Fountain',
        preset_elytra: 'Elytra rocket',
        preset_random: 'Random',
        shape_desc_small_ball: 'The basic shape without an ingredient: a small ball of 98 sparks.',
        shape_desc_large_ball: 'With a fire charge: a large ball of 386 sparks – and a louder bang.',
        shape_desc_star: 'With a gold nugget: a five-pointed star of 121 sparks, turned three times.',
        shape_desc_creeper: 'With a head, e.g. a creeper head: a creeper face of 265 sparks.',
        shape_desc_burst: 'With a feather: 70 sparks shoot upwards like a fountain.',
        shape_try: 'Try it',
        shape_sparks: '{n} sparks',
        shape_radius: 'about {n} blocks radius',
        shape_any_head: 'Any head works: {list}',
        sound_on: 'Sound on',
        sound_off: 'Sound off'
    }
};

(() => {
    const DATA_URL = '/assets/JS/fireworks/fireworks.json?v=20260917a';
    const L = lang === 'en' ? 1 : 0;
    const RECIPES_PAGE = lang === 'en' ? '/blog/en/crafting-recipes.html' : '/blog/de/crafting-rezepte.html';
    const TICK_MS = 50;
    const MAX_PARTICLES = 16384; // ParticleGroup queue size in 26.3
    const MAX_STARS = 256; // Fireworks: explosions list limit
    const MAX_COLORS = 64;
    const MAX_STAR_COMMANDS = 12;
    const PREVIEW_MAX_FLIGHT = 3;
    const GROUND = 64;
    const EYE = 1.62;
    const SKY = { zenith: [0.012, 0.016, 0.045], horizon: [0.06, 0.08, 0.15], below: [0.06, 0.08, 0.15] };
    const GROUND_LIGHT = [0.3, 0.33, 0.46];
    const SHAPE_PARTICLES = { small_ball: 98, large_ball: 386, star: 121, creeper: 265, burst: 70 };
    const SHAPE_RADIUS = { small_ball: 2.8, large_ball: 5.6, star: 5.6, creeper: 3.9, burst: 3 };
    const TRAIL_FACTOR = 13.5; // a trailing spark leaves about 12-13 more
    // FireworkParticles.Starter
    const STAR_COORDS = [[0, 1], [0.3455, 0.309], [0.9511, 0.309], [0.3795918367346939, -0.12653061224489795], [0.6122448979591837, -0.8040816326530612], [0, -0.35918367346938773]];
    const CREEPER_COORDS = [[0, 0.2], [0.2, 0.2], [0.2, 0.6], [0.6, 0.6], [0.6, 0.2], [0.2, 0.2], [0.2, 0], [0.4, 0], [0.4, -0.6], [0.2, -0.6], [0.2, -0.4], [0, -0.4]];
    const PRESETS = [
        { id: 'new_year', icon: 'fa-champagne-glasses', flight: 2, stars: [
            { shape: 'large_ball', colors: ['red', 'yellow'], fade: ['white'], trail: true },
            { shape: 'small_ball', colors: ['white'], twinkle: true },
            { shape: 'burst', colors: ['lime', 'cyan'], fade: ['white'], trail: true }] },
        { id: 'gold_rain', icon: 'fa-coins', flight: 2, stars: [{ shape: 'large_ball', colors: ['yellow', 'orange'], fade: ['yellow'], trail: true, twinkle: true }] },
        { id: 'creeper', icon: 'fa-skull', flight: 1, stars: [{ shape: 'creeper', colors: ['lime', 'green'] }] },
        { id: 'starry', icon: 'fa-star', flight: 2, stars: [{ shape: 'star', colors: ['light_blue', 'white'], fade: ['blue'], twinkle: true }] },
        { id: 'rainbow', icon: 'fa-rainbow', flight: 1, stars: [{ shape: 'small_ball', colors: ['red', 'orange', 'yellow', 'lime', 'light_blue', 'blue', 'purple'], trail: true }] },
        { id: 'fountain', icon: 'fa-fire', flight: 1, stars: [{ shape: 'burst', colors: ['white', 'yellow'], fade: ['orange'], trail: true }] },
        { id: 'elytra', icon: 'fa-plane', flight: 3, stars: [] }
    ];

    let data = null;
    const dyeByColor = new Map();
    const state = { flight: 2, stars: [], selected: 0, format: 'new' };
    const el = {};
    const images = new Map();
    const starIcons = new Map();

    const byId = (id) => document.getElementById(id);
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const hex = (c) => '#' + c.toString(16).padStart(6, '0').toUpperCase();
    const fromHex = (s) => parseInt(String(s).replace('#', ''), 16) & 0xFFFFFF;
    const item = (id) => data.items[id] || [id, id, null];
    const itemName = (id) => item(id)[L];
    const text = (key) => data.texts[key][L];
    const fmt = (n, digits = 0) => n.toLocaleString(lang === 'en' ? 'en-US' : 'de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const dyeColor = (id) => fromHex(data.dyes.find((d) => d.id === id).color);
    const colorName = (c) => (dyeByColor.has(c) ? dyeByColor.get(c).name[L] : text('custom'));
    const shapeById = (id) => data.shapes.find((s) => s.id === id) || data.shapes[0];
    const starLabel = (i) => t('star_n', { n: i + 1 });
    const current = () => state.stars[state.selected];
    const starKey = (s) => JSON.stringify([s.shape, s.colors, s.fade, s.trail, s.twinkle]);
    const copyStar = (s) => ({ shape: s.shape, colors: s.colors.slice(), fade: s.fade.slice(), trail: s.trail, twinkle: s.twinkle });

    function normalizeStar(o) {
        const ints = (a) => (Array.isArray(a) ? a : []).map(Number).filter(Number.isFinite).map((c) => c & 0xFFFFFF).slice(0, MAX_COLORS);
        return {
            shape: data.shapes.some((s) => s.id === o.shape) ? o.shape : 'small_ball',
            colors: ints(o.colors),
            fade: ints(o.fade),
            trail: !!o.trail,
            twinkle: !!o.twinkle
        };
    }

    function presetDesign(preset) {
        return {
            flight: preset.flight,
            stars: preset.stars.map((s) => normalizeStar({
                shape: s.shape, trail: s.trail, twinkle: s.twinkle,
                colors: s.colors.map(dyeColor), fade: (s.fade || []).map(dyeColor)
            }))
        };
    }

    function randomDesign() {
        const pick = (a) => a[Math.floor(Math.random() * a.length)];
        const dyes = (max) => Array.from({ length: 1 + Math.floor(Math.random() * max) }, () => fromHex(pick(data.dyes).color));
        return {
            flight: 1 + Math.floor(Math.random() * 3),
            stars: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => ({
                shape: pick(data.shapes).id,
                colors: dyes(3),
                fade: Math.random() < 0.5 ? dyes(2) : [],
                trail: Math.random() < 0.4,
                twinkle: Math.random() < 0.4
            }))
        };
    }

    // ---------- icons ----------

    function loadImage(src) {
        if (!images.has(src)) {
            images.set(src, new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            }));
        }
        return images.get(src);
    }

    // Item tint of a firework star (client/color/item/Firework): the average of its colours.
    function starTint(colors) {
        if (!colors.length) return fromHex(data.textures.star_default);
        if (colors.length === 1) return colors[0];
        let r = 0;
        let g = 0;
        let b = 0;
        colors.forEach((c) => { r += c >> 16 & 255; g += c >> 8 & 255; b += c & 255; });
        const n = colors.length;
        return (Math.floor(r / n) << 16) | (Math.floor(g / n) << 8) | Math.floor(b / n);
    }

    // Tinted with canvas blending only - pixel read-back is unreliable in Brave.
    function starCanvas(colors) {
        const tint = starTint(colors);
        if (!starIcons.has(tint)) {
            starIcons.set(tint, (async () => {
                const [base, overlay] = await Promise.all([loadImage(data.textures.star), loadImage(data.textures.star_overlay)]);
                const layer = document.createElement('canvas');
                layer.width = layer.height = 16;
                const lg = layer.getContext('2d');
                lg.drawImage(overlay, 0, 0);
                lg.globalCompositeOperation = 'multiply';
                lg.fillStyle = hex(tint);
                lg.fillRect(0, 0, 16, 16);
                lg.globalCompositeOperation = 'destination-in';
                lg.drawImage(overlay, 0, 0);
                const c = document.createElement('canvas');
                c.width = c.height = 16;
                const g = c.getContext('2d');
                g.drawImage(base, 0, 0);
                g.drawImage(layer, 0, 0);
                return c;
            })());
        }
        return starIcons.get(tint);
    }

    async function hydrateStarIcons(root) {
        const nodes = [...root.querySelectorAll('[data-star-icon]')];
        await Promise.all(nodes.map(async (node) => {
            const colors = node.dataset.starIcon ? node.dataset.starIcon.split(',').map(Number) : [];
            const src = await starCanvas(colors);
            const c = document.createElement('canvas');
            c.width = c.height = 16;
            c.className = 'is-pixel';
            c.getContext('2d').drawImage(src, 0, 0);
            node.replaceChildren(c);
        }));
    }

    function itemImg(id) {
        const icon = item(id)[2];
        if (!icon) return '';
        return `<img src="${escapeHtml(icon)}" alt=""${icon.includes('/textures/') ? ' class="is-pixel"' : ''} loading="lazy">`;
    }

    const starIconHtml = (colors) => `<span class="fw-star-icon" data-star-icon="${colors.join(',')}"></span>`;
    const dot = (c) => `<span class="fw-dot" style="--c:${hex(c)}" title="${escapeHtml(colorName(c))}"></span>`;

    // ---------- editor ----------

    function renderPresets() {
        el.presets.innerHTML = PRESETS.map((p) => `
            <button type="button" class="fw-preset" data-preset="${p.id}"><i class="fas ${p.icon}" aria-hidden="true"></i> <span>${escapeHtml(t('preset_' + p.id))}</span></button>`).join('') + `
            <button type="button" class="fw-preset" data-preset="random"><i class="fas fa-dice" aria-hidden="true"></i> <span>${escapeHtml(t('preset_random'))}</span></button>`;
    }

    function renderFlight() {
        el.flight.innerHTML = [1, 2, 3].map((n) => `
            <button type="button" class="fw-flight-btn${state.flight === n ? ' active' : ''}" data-flight="${n}" aria-pressed="${state.flight === n}">
                <span class="fw-flight-icons">${itemImg(data.recipe.fuel).repeat(n)}</span>
                <span>${escapeHtml(t('flight_n', { n }))}</span>
            </button>`).join('');
        const custom = state.flight < 1 || state.flight > data.recipe.max_fuel;
        el.flightCustom.classList.toggle('active', custom);
        if (document.activeElement !== el.flightInput) el.flightInput.value = state.flight;
    }

    function renderStars() {
        const n = state.stars.length;
        el.starCount.textContent = n === 1 ? t('stars_one') : t('stars_many', { n: fmt(n) });
        const trail = itemImg(data.recipe.trail);
        const twinkle = itemImg(data.recipe.twinkle);
        el.stars.innerHTML = n ? state.stars.map((s, i) => `
            <div class="fw-star${i === state.selected ? ' active' : ''}">
                <button type="button" class="fw-star-main" data-select="${i}" aria-pressed="${i === state.selected}">
                    ${starIconHtml(s.colors)}
                    <span class="fw-star-text">
                        <strong>${escapeHtml(starLabel(i))} · ${escapeHtml(shapeById(s.shape).name[L])}</strong>
                        <span class="fw-dots">${s.colors.map(dot).join('')}${s.fade.length ? '<i class="fas fa-arrow-right" aria-hidden="true"></i>' + s.fade.map(dot).join('') : ''}${s.trail ? trail : ''}${s.twinkle ? twinkle : ''}</span>
                    </span>
                </button>
                <div class="fw-star-tools">
                    <button type="button" data-move="-1" data-i="${i}" title="${escapeHtml(t('move_up'))}" aria-label="${escapeHtml(t('move_up'))}"${i === 0 ? ' disabled' : ''}><i class="fas fa-arrow-up" aria-hidden="true"></i></button>
                    <button type="button" data-move="1" data-i="${i}" title="${escapeHtml(t('move_down'))}" aria-label="${escapeHtml(t('move_down'))}"${i === n - 1 ? ' disabled' : ''}><i class="fas fa-arrow-down" aria-hidden="true"></i></button>
                    <button type="button" data-dup="${i}" title="${escapeHtml(t('duplicate'))}" aria-label="${escapeHtml(t('duplicate'))}"${n >= MAX_STARS ? ' disabled' : ''}><i class="fas fa-clone" aria-hidden="true"></i></button>
                    <button type="button" data-del="${i}" title="${escapeHtml(t('remove'))}" aria-label="${escapeHtml(t('remove'))}"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>`).join('') : `<p class="fw-empty">${escapeHtml(t('stars_none'))}</p>`;
        el.addStar.disabled = n >= MAX_STARS;
        hydrateStarIcons(el.stars);
    }

    function renderPicked(box, list, target, emptyText) {
        box.innerHTML = list.length ? list.map((c, i) => `
            <button type="button" class="fw-chip" data-target="${target}" data-remove="${i}" style="--c:${hex(c)}" title="${escapeHtml(hex(c))}" aria-label="${escapeHtml(t('remove_color', { name: colorName(c) }))}">
                <span class="fw-chip-swatch"></span><span>${escapeHtml(colorName(c))}</span><i class="fas fa-xmark" aria-hidden="true"></i>
            </button>`).join('') : `<p class="fw-empty">${escapeHtml(emptyText)}</p>`;
    }

    function renderPalettes() {
        const html = data.dyes.map((d) => `
            <button type="button" class="fw-swatch" data-dye="${d.id}" style="--c:${d.color}" title="${escapeHtml(d.name[L])}" aria-label="${escapeHtml(t('add_color', { name: d.name[L] }))}">${itemImg(d.item)}</button>`).join('');
        el.palette.innerHTML = html;
        el.fadePalette.innerHTML = html;
    }

    function renderEditor() {
        const s = current();
        el.editor.hidden = !s;
        if (!s) return;
        el.editorTitle.textContent = t('edit_star', { n: state.selected + 1 });
        el.shapes.innerHTML = data.shapes.map((sh) => `
            <button type="button" class="fw-option${s.shape === sh.id ? ' active' : ''}" data-shape="${sh.id}" aria-pressed="${s.shape === sh.id}">
                <span class="fw-option-icon">${sh.item ? itemImg(sh.item) : '<i class="fas fa-circle-dot" aria-hidden="true"></i>'}</span>
                <span class="fw-option-text"><strong>${escapeHtml(sh.name[L])}</strong><small>${escapeHtml(sh.item ? itemName(sh.item) : t('shape_plain'))}</small></span>
            </button>`).join('');
        renderPicked(el.colors, s.colors, 'colors', t('colors_empty'));
        renderPicked(el.fade, s.fade, 'fade', t('fade_empty'));
        el.effects.innerHTML = [['trail', data.recipe.trail], ['twinkle', data.recipe.twinkle]].map(([key, it]) => `
            <button type="button" class="fw-option${s[key] ? ' active' : ''}" data-effect="${key}" aria-pressed="${s[key]}">
                <span class="fw-option-icon">${itemImg(it)}</span>
                <span class="fw-option-text"><strong>${escapeHtml(text(key))}</strong><small>${escapeHtml(itemName(it))}</small></span>
                <i class="fas ${s[key] ? 'fa-toggle-on' : 'fa-toggle-off'} fw-toggle" aria-hidden="true"></i>
            </button>`).join('');
    }

    // ---------- summary ----------

    // FireworkRocketEntity: lifetime = 10 * (1 + flight) + rand(6) + rand(7), it explodes one tick later;
    // the upward speed starts at 0.05 and gains 0.04 per tick.
    function flightInfo(f) {
        const lo = 10 * (1 + f) + 1;
        const hi = lo + 11;
        const height = (n) => 0.05 * n + 0.02 * n * (n + 1);
        return { ticks: [lo, hi], height: [height(lo), height(hi)] };
    }

    const sparkCount = () => state.stars.reduce((sum, s) => sum + SHAPE_PARTICLES[s.shape] * (s.trail ? TRAIL_FACTOR : 1), 0);

    function renderSummary() {
        const f = flightInfo(state.flight);
        const n = state.stars.length;
        const dmg = n ? 5 + 2 * n : 0;
        const sparks = Math.round(sparkCount());
        el.stats.innerHTML = [
            ['fa-clock', t('stat_time'), t('range_seconds', { a: fmt(f.ticks[0] / 20, 2), b: fmt(f.ticks[1] / 20, 2) })],
            ['fa-arrows-up-down', t('stat_height'), t('range_blocks', { a: fmt(f.height[0], 1), b: fmt(f.height[1], 1) })],
            ['fa-heart', t('stat_damage'), dmg ? t('damage_value', { p: dmg, h: fmt(dmg / 2, 1) }) : t('damage_none')],
            ['fa-star-of-life', t('stat_sparks'), n ? t('sparks_value', { n: fmt(sparks) }) : '–']
        ].map(([icon, label, value]) => `<div class="fw-stat"><dt><i class="fas ${icon}" aria-hidden="true"></i> ${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
        const notes = [];
        if (state.flight > PREVIEW_MAX_FLIGHT) notes.push(t('note_preview'));
        if (sparks > MAX_PARTICLES) notes.push(t('note_sparks'));
        el.statNote.textContent = notes.join(' ');
        el.statNote.hidden = !notes.length;
        renderTooltip();
    }

    // Item tooltip as Fireworks.addToTooltip builds it: equal stars in a row are grouped.
    function renderTooltip() {
        const line = (s, indent) => `<span class="fw-tt-line${indent ? ' is-indent' : ''}">${escapeHtml(s)}</span>`;
        const lines = [`<span class="fw-tt-name">${escapeHtml(itemName(data.recipe.rocket))}</span>`];
        if (state.flight > 0) lines.push(line(text('flight').replace('%s', state.flight)));
        const groups = [];
        state.stars.forEach((s) => {
            const last = groups[groups.length - 1];
            if (last && last.key === starKey(s)) last.count++;
            else groups.push({ key: starKey(s), star: s, count: 1 });
        });
        groups.forEach(({ star, count }) => {
            const shape = shapeById(star.shape).name[L];
            let i = 0;
            lines.push(line(count === 1 ? shape : text('multiple').replace(/%s/g, () => (i++ === 0 ? count : shape))));
            if (star.colors.length) lines.push(line(star.colors.map(colorName).join(', '), true));
            if (star.fade.length) lines.push(line(text('fade_to') + ' ' + star.fade.map(colorName).join(', '), true));
            if (star.trail) lines.push(line(text('trail'), true));
            if (star.twinkle) lines.push(line(text('twinkle'), true));
        });
        el.tooltip.innerHTML = lines.join('');
    }

    // ---------- crafting ----------

    const colorCell = (c) => (dyeByColor.has(c) ? { item: dyeByColor.get(c).item } : { custom: c });

    function cellName(cell) {
        if (cell.item) return itemName(cell.item);
        if (cell.star) return itemName(data.recipe.star);
        return t('custom_color') + ' ' + hex(cell.custom);
    }

    function cellInner(cell) {
        if (cell.item) return itemImg(cell.item);
        if (cell.star) return starIconHtml(cell.star);
        return `<span class="fw-custom-cell" style="--c:${hex(cell.custom)}">?</span>`;
    }

    function craftCard(title, cells, result, count, times) {
        const slots = Array.from({ length: data.recipe.grid }, (_, i) => {
            const cell = cells[i];
            return cell
                ? `<span class="fw-slot" role="img" title="${escapeHtml(cellName(cell))}" aria-label="${escapeHtml(cellName(cell))}">${cellInner(cell)}</span>`
                : '<span class="fw-slot is-empty"></span>';
        }).join('');
        return `
            <li class="fw-craft-step">
                <h3>${escapeHtml(title)}${times > 1 ? ` <span class="fw-times">${escapeHtml(t('craft_times', { n: times }))}</span>` : ''}</h3>
                <div class="fw-recipe">
                    <div class="fw-grid3">${slots}</div>
                    <i class="fas fa-arrow-right fw-arrow" aria-hidden="true"></i>
                    <span class="fw-slot fw-slot--big" role="img" title="${escapeHtml(cellName(result))}" aria-label="${escapeHtml(cellName(result))}">${cellInner(result)}${count > 1 ? `<span class="fw-count">${count}</span>` : ''}</span>
                </div>
            </li>`;
    }

    function renderCraft() {
        const r = data.recipe;
        const warnings = [];
        const cards = [];
        const groups = [];
        state.stars.forEach((s, i) => {
            const key = starKey(s);
            const group = groups.find((g) => g.key === key);
            if (group) group.indices.push(i);
            else groups.push({ key, star: s, indices: [i] });
        });
        groups.forEach(({ star, indices }) => {
            const name = indices.length > 1
                ? t('craft_stars', { list: indices.map((i) => i + 1).join(', ') })
                : t('craft_star', { n: indices[0] + 1 });
            const shape = shapeById(star.shape);
            if ([...star.colors, ...star.fade].some((c) => !dyeByColor.has(c))) warnings.push(t('warn_custom', { name }));
            if (!star.colors.length) warnings.push(t('warn_no_color', { name }));
            const cells = [{ item: r.fuel }];
            if (shape.item) cells.push({ item: shape.item });
            if (star.trail) cells.push({ item: r.trail });
            if (star.twinkle) cells.push({ item: r.twinkle });
            star.colors.forEach((c) => cells.push(colorCell(c)));
            if (cells.length > r.grid) warnings.push(t('warn_star_slots', { name, n: cells.length }));
            cards.push(craftCard(name + ' · ' + shape.name[L], cells, { star: star.colors }, 1, indices.length));
            if (star.fade.length) {
                if (star.fade.length > r.grid - 1) warnings.push(t('warn_fade_slots', { name, n: star.fade.length }));
                cards.push(craftCard(t('craft_fade', { name }), [{ star: star.colors }, ...star.fade.map(colorCell)], { star: star.colors }, 1, indices.length));
            }
        });
        const craftable = state.flight >= 1 && state.flight <= r.max_fuel;
        if (!craftable) warnings.push(t('warn_flight', { n: state.flight }));
        else if (1 + state.flight + state.stars.length > r.grid) warnings.push(t('warn_rocket_slots', { fuel: state.flight, stars: state.stars.length }));
        const rocket = [{ item: r.shell }];
        for (let i = clamp(state.flight, 1, r.max_fuel); i > 0; i--) rocket.push({ item: r.fuel });
        state.stars.forEach((s) => rocket.push({ star: s.colors }));
        cards.push(craftCard(t('craft_rocket'), rocket, { item: r.rocket }, r.rocket_count, 1));

        el.craft.innerHTML = `
            <div class="fw-craft-status ${warnings.length ? 'is-warn' : 'is-ok'}">
                ${warnings.length
                    ? `<strong><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> ${escapeHtml(t('craft_warn_title'))}</strong><ul>${warnings.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}</ul>`
                    : `<strong><i class="fas fa-circle-check" aria-hidden="true"></i> ${escapeHtml(t('craft_ok'))}</strong>`}
            </div>
            <ol class="fw-craft-steps">${cards.join('')}</ol>`;
        hydrateStarIcons(el.craft);
    }

    // ---------- commands ----------

    function explosionSnbt(s, legacy) {
        const list = (a) => `[I;${a.join(',')}]`;
        const shape = shapeById(s.shape);
        const parts = [legacy ? `Type:${shape.type}b` : `shape:"${shape.id}"`];
        if (s.colors.length) parts.push((legacy ? 'Colors:' : 'colors:') + list(s.colors));
        if (s.fade.length) parts.push((legacy ? 'FadeColors:' : 'fade_colors:') + list(s.fade));
        if (s.trail) parts.push(legacy ? 'Trail:1b' : 'has_trail:true');
        if (s.twinkle) parts.push(legacy ? 'Flicker:1b' : 'has_twinkle:true');
        return `{${parts.join(',')}}`;
    }

    function fireworksSnbt(legacy) {
        const ex = state.stars.map((s) => explosionSnbt(s, legacy)).join(',');
        if (legacy) return `{Flight:${Math.min(state.flight, 127)}b${ex ? `,Explosions:[${ex}]` : ''}}`;
        return `{flight_duration:${state.flight}${ex ? `,explosions:[${ex}]` : ''}}`;
    }

    function commands() {
        const legacy = state.format === 'legacy';
        const who = el.who.value.trim() || '@p';
        const count = clamp(Math.floor(Number(el.count.value)) || 1, 1, 99);
        const n = count > 1 ? ' ' + count : '';
        const fw = fireworksSnbt(legacy);
        // A summoned rocket has no random fuse, so LifeTime gets the average one.
        const life = 10 * (1 + state.flight) + 5;
        const out = [
            { label: t('cmd_give_rocket'), wide: true, cmd: legacy ? `/give ${who} firework_rocket{Fireworks:${fw}}${n}` : `/give ${who} firework_rocket[fireworks=${fw}]${n}` },
            {
                label: t('cmd_summon', { s: fmt((life + 1) / 20, 2) }),
                wide: true,
                cmd: legacy
                    ? `/summon firework_rocket ~ ~1 ~ {LifeTime:${life},FireworksItem:{id:"minecraft:firework_rocket",Count:1b,tag:{Fireworks:${fw}}}}`
                    : `/summon firework_rocket ~ ~1 ~ {LifeTime:${life},FireworksItem:{id:"minecraft:firework_rocket",count:1,components:{"minecraft:fireworks":${fw}}}}`
            }
        ];
        const seen = new Set();
        let hidden = 0;
        state.stars.forEach((s, i) => {
            const key = starKey(s);
            if (seen.has(key)) return;
            seen.add(key);
            if (seen.size > MAX_STAR_COMMANDS) {
                hidden++;
                return;
            }
            const ex = explosionSnbt(s, legacy);
            out.push({ label: t('cmd_give_star', { name: starLabel(i) }), cmd: legacy ? `/give ${who} firework_star{Explosion:${ex}}${n}` : `/give ${who} firework_star[firework_explosion=${ex}]${n}` });
        });
        return { list: out, hidden };
    }

    function renderCommands() {
        const legacy = state.format === 'legacy';
        const { list, hidden } = commands();
        el.commands._list = list;
        el.commands.innerHTML = list.map((c, i) => `
            <div class="fw-cmd${c.wide ? ' fw-cmd--wide' : ''}">
                <span class="fw-cmd-label">${escapeHtml(c.label)}</span>
                <div class="fw-cmd-row">
                    <code>${escapeHtml(c.cmd)}</code>
                    <button type="button" class="fw-copy" data-cmd="${i}" title="${escapeHtml(t('copy'))}" aria-label="${escapeHtml(t('copy'))}"><i class="fas fa-copy" aria-hidden="true"></i></button>
                </div>
            </div>`).join('') + (hidden ? `<p class="fw-empty fw-cmd--wide">${escapeHtml(t('cmd_more_stars', { n: hidden }))}</p>` : '');
        el.note.textContent = (legacy ? t('cmd_note_legacy') : t('cmd_note_new')) + (legacy && state.flight > 127 ? ' ' + t('cmd_note_legacy_flight') : '');
        el.format.querySelectorAll('[data-format]').forEach((b) => {
            b.classList.toggle('active', b.dataset.format === state.format);
            b.setAttribute('aria-pressed', String(b.dataset.format === state.format));
        });
    }

    // ---------- share link and import ----------

    function encodeState() {
        const six = (c) => c.toString(16).padStart(6, '0');
        const compact = { f: state.flight, s: state.stars.map((s) => [s.shape, s.colors.map(six).join('.'), s.fade.map(six).join('.'), (s.trail ? 1 : 0) | (s.twinkle ? 2 : 0)]) };
        return btoa(JSON.stringify(compact)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function decodeState(str) {
        try {
            const json = JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
            const split = (s) => (typeof s === 'string' && s ? s.split('.').map((h) => parseInt(h, 16)).filter(Number.isFinite) : []);
            return {
                flight: clamp(Math.floor(Number(json.f)) || 0, 0, data.limits.flight),
                stars: (Array.isArray(json.s) ? json.s : []).slice(0, MAX_STARS).map((x) => normalizeStar({
                    shape: x[0], colors: split(x[1]), fade: split(x[2]), trail: x[3] & 1, twinkle: x[3] & 2
                }))
            };
        } catch (_) {
            return null;
        }
    }

    let hashTimer = 0;
    function scheduleHash() {
        clearTimeout(hashTimer);
        hashTimer = setTimeout(() => history.replaceState(null, '', '#fw=' + encodeState()), 300);
    }

    // Small SNBT reader: compounds, lists, typed arrays, strings, numbers with suffixes, booleans.
    function parseSnbt(src, start) {
        let i = start;
        const fail = () => { throw new Error('SNBT ' + i); };
        const ws = () => { while (i < src.length && /\s/.test(src[i])) i++; };
        const bare = () => {
            const m = /^[A-Za-z0-9_\-.+]+/.exec(src.slice(i, i + 64));
            if (!m) return '';
            i += m[0].length;
            return m[0];
        };
        const str = () => {
            const q = src[i++];
            let out = '';
            while (i < src.length && src[i] !== q) {
                if (src[i] === '\\') i++;
                out += src[i++];
            }
            if (src[i] !== q) fail();
            i++;
            return out;
        };
        const value = () => {
            ws();
            const c = src[i];
            if (c === '{') {
                i++;
                const obj = {};
                ws();
                if (src[i] === '}') { i++; return obj; }
                for (;;) {
                    ws();
                    const key = src[i] === '"' || src[i] === "'" ? str() : bare();
                    ws();
                    if (!key || src[i] !== ':') fail();
                    i++;
                    obj[key] = value();
                    ws();
                    if (src[i] === ',') { i++; continue; }
                    if (src[i] === '}') { i++; return obj; }
                    fail();
                }
            }
            if (c === '[') {
                i++;
                const typed = /^\s*[BIL]\s*;/.exec(src.slice(i, i + 8));
                if (typed) i += typed[0].length;
                const arr = [];
                ws();
                if (src[i] === ']') { i++; return arr; }
                for (;;) {
                    arr.push(value());
                    ws();
                    if (src[i] === ',') { i++; continue; }
                    if (src[i] === ']') { i++; return arr; }
                    fail();
                }
            }
            if (c === '"' || c === "'") return str();
            const token = bare();
            if (!token) fail();
            if (token === 'true' || token === 'false') return token === 'true';
            const num = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)[bslfd]?$/i.exec(token);
            if (num) return Number(num[1]);
            const hexNum = /^([-+]?)0x([0-9a-f]+)(?:[su]?[bsil])?$/i.exec(token);
            if (hexNum) return (hexNum[1] === '-' ? -1 : 1) * parseInt(hexNum[2], 16);
            return token;
        };
        return value();
    }

    const flag = (v) => v === true || (typeof v === 'number' && v !== 0);

    function explosionFrom(o) {
        const e = o && typeof o === 'object' ? o : {};
        let shape = e.shape ?? e.Type;
        if (typeof shape === 'number') shape = (data.shapes.find((s) => s.type === shape) || {}).id;
        else if (typeof shape === 'string') shape = shape.replace(/^minecraft:/, '');
        return normalizeStar({
            shape,
            colors: e.colors ?? e.Colors,
            fade: e.fade_colors ?? e.FadeColors,
            trail: flag(e.has_trail ?? e.Trail),
            twinkle: flag(e.has_twinkle ?? e.Flicker)
        });
    }

    function importText(raw) {
        const src = raw.trim();
        const at = (re) => {
            const m = re.exec(src);
            if (!m) return undefined;
            try { return parseSnbt(src, m.index + m[0].length); } catch (_) { return undefined; }
        };
        let rocket = at(/(?:minecraft:)?fireworks"?\s*[=:]\s*/) ?? at(/\bFireworks\s*:\s*/);
        let star = rocket === undefined ? at(/(?:minecraft:)?firework_explosion"?\s*[=:]\s*/) ?? at(/\bExplosion\s*:\s*/) : undefined;
        if (rocket === undefined && star === undefined && src.startsWith('{')) {
            try {
                const obj = parseSnbt(src, 0);
                if (['flight_duration', 'explosions', 'Flight', 'Explosions'].some((k) => k in obj)) rocket = obj;
                else if (['shape', 'Type'].some((k) => k in obj)) star = obj;
            } catch (_) { /* not SNBT */ }
        }
        if (rocket && typeof rocket === 'object') {
            let flight = Math.floor(Number(rocket.flight_duration ?? rocket.Flight ?? 0)) || 0;
            if (flight < 0) flight &= 255;
            const list = rocket.explosions ?? rocket.Explosions;
            return { flight: clamp(flight, 0, data.limits.flight), stars: (Array.isArray(list) ? list : []).slice(0, MAX_STARS).map(explosionFrom) };
        }
        if (star && typeof star === 'object') return { flight: state.flight, stars: [explosionFrom(star)] };
        return null;
    }

    // ---------- simulation (FireworkRocketEntity, FireworkParticles) ----------

    const sim = { rocket: null, starters: [], particles: [], pending: [], pendingStarters: [], idle: 0, focusY: null };
    const rand = Math.random;
    const nextInt = (n) => Math.floor(rand() * n);
    const triangle = (mean, spread) => mean + spread * (rand() - rand());
    function gaussian() {
        let u = 0;
        while (u === 0) u = rand();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
    }
    const rgb = (c) => [(c >> 16 & 255) / 255, (c >> 8 & 255) / 255, (c & 255) / 255];

    function spark(x, y, z, xd, yd, zd) {
        const p = {
            kind: 0, x, y, z, xo: x, yo: y, zo: z, xd, yd, zd,
            age: 0, lifetime: 48 + nextInt(12),
            size: 0.1 * (rand() * 0.5 + 0.5) * 2 * 0.75,
            r: 1, g: 1, b: 1, a: 0.99,
            fade: null, trail: false, twinkle: false, stopped: false, onGround: false, removed: false
        };
        sim.pending.push(p);
        return p;
    }

    function flash(x, y, z, color) {
        const [r, g, b] = rgb(color);
        sim.pending.push({ kind: 1, x, y, z, xo: x, yo: y, zo: z, age: 0, lifetime: 4, r, g, b, removed: false });
    }

    // Particle.move: the ground (y = 0) is the only thing to collide with.
    function move(p) {
        if (p.stopped) return;
        const origYa = p.yd;
        let ya = origYa;
        if (ya < 0 && p.y >= 0 && p.y + ya < 0 && p.xd * p.xd + ya * ya + p.zd * p.zd < 100
            && Math.abs(p.x) <= GROUND + 0.5 && Math.abs(p.z) <= GROUND + 0.5) ya = -p.y;
        p.x += p.xd;
        p.y += ya;
        p.z += p.zd;
        if (Math.abs(origYa) >= 1e-5 && Math.abs(ya) < 1e-5) p.stopped = true;
        p.onGround = origYa !== ya && origYa < 0;
    }

    function tickSpark(p) {
        p.xo = p.x;
        p.yo = p.y;
        p.zo = p.z;
        if (p.age++ >= p.lifetime) {
            p.removed = true;
            return;
        }
        p.yd -= 0.04 * 0.1;
        move(p);
        p.xd *= 0.91;
        p.yd *= 0.91;
        p.zd *= 0.91;
        if (p.onGround) {
            p.xd *= 0.7;
            p.zd *= 0.7;
        }
        const half = Math.floor(p.lifetime / 2);
        if (p.age > half) {
            p.a = 1 - (p.age - half) / p.lifetime;
            if (p.fade) {
                p.r += (p.fade[0] - p.r) * 0.2;
                p.g += (p.fade[1] - p.g) * 0.2;
                p.b += (p.fade[2] - p.b) * 0.2;
            }
        }
        // Trail sparks copy the colour but never the fade (SparkParticle's own hasFade is never set).
        if (p.trail && p.age < half && (p.age + p.lifetime) % 2 === 0) {
            const c = spark(p.x, p.y, p.z, 0, 0, 0);
            c.r = p.r;
            c.g = p.g;
            c.b = p.b;
            c.age = Math.floor(c.lifetime / 2);
            c.twinkle = p.twinkle;
        }
    }

    function tickFlash(p) {
        if (p.age++ >= p.lifetime) p.removed = true;
    }

    function starSpark(s, xd, yd, zd, e, colors) {
        const p = spark(s.x, s.y, s.z, xd, yd, zd);
        p.trail = e.trail;
        p.twinkle = e.twinkle;
        [p.r, p.g, p.b] = rgb(colors[nextInt(colors.length)]);
        if (e.fade.length) p.fade = rgb(e.fade[nextInt(e.fade.length)]);
    }

    function ball(s, speed, steps, e, colors) {
        for (let yStep = -steps; yStep <= steps; yStep++) {
            for (let xStep = -steps; xStep <= steps; xStep++) {
                for (let zStep = -steps; zStep <= steps; zStep++) {
                    const xa = xStep + (rand() - rand()) * 0.5;
                    const ya = yStep + (rand() - rand()) * 0.5;
                    const za = zStep + (rand() - rand()) * 0.5;
                    const len = Math.sqrt(xa * xa + ya * ya + za * za) / speed + gaussian() * 0.05;
                    starSpark(s, xa / len, ya / len, za / len, e, colors);
                    if (yStep !== -steps && yStep !== steps && xStep !== -steps && xStep !== steps) zStep += steps * 2 - 1;
                }
            }
        }
    }

    function outline(s, speed, coords, e, colors, flat) {
        const [sx, sy] = coords[0];
        starSpark(s, sx * speed, sy * speed, 0, e, colors);
        const base = rand() * Math.PI;
        const mod = flat ? 0.034 : 0.34;
        for (let step = 0; step < 3; step++) {
            const angle = base + step * Math.PI * mod;
            let ox = sx;
            let oy = sy;
            for (let c = 1; c < coords.length; c++) {
                const [tx, ty] = coords[c];
                for (let sub = 0.25; sub <= 1; sub += 0.25) {
                    let xa = (ox + sub * (tx - ox)) * speed;
                    const ya = (oy + sub * (ty - oy)) * speed;
                    const za = xa * Math.sin(angle);
                    xa *= Math.cos(angle);
                    for (let flip = -1; flip <= 1; flip += 2) starSpark(s, xa * flip, ya, za * flip, e, colors);
                }
                ox = tx;
                oy = ty;
            }
        }
    }

    function burst(s, e, colors) {
        const bx = gaussian() * 0.05;
        const bz = gaussian() * 0.05;
        for (let i = 0; i < 70; i++) {
            const xa = s.xd * 0.5 + gaussian() * 0.15 + bx;
            const za = s.zd * 0.5 + gaussian() * 0.15 + bz;
            const ya = s.yd * 0.5 + rand() * 0.5;
            starSpark(s, xa, ya, za, e, colors);
        }
    }

    function tickStarter(s) {
        if (s.life === 0) {
            const large = s.explosions.length >= 3 || s.explosions.some((e) => e.shape === 'large_ball');
            playSound((large ? 'large_blast' : 'blast') + (farAway(s) ? '_far' : ''), s, 20, 0.95 + rand() * 0.1, 'sub_blast');
        }
        if (s.life % 2 === 0 && s.life / 2 < s.explosions.length) {
            const e = s.explosions[s.life / 2];
            const colors = e.colors.length ? e.colors : [dyeColor('black')];
            if (e.shape === 'small_ball') ball(s, 0.25, 2, e, colors);
            else if (e.shape === 'large_ball') ball(s, 0.5, 4, e, colors);
            else if (e.shape === 'star') outline(s, 0.5, STAR_COORDS, e, colors, false);
            else if (e.shape === 'creeper') outline(s, 0.5, CREEPER_COORDS, e, colors, true);
            else burst(s, e, colors);
            flash(s.x, s.y, s.z, colors[0]);
        }
        s.life++;
        if (s.life > s.lifetime) {
            if (s.twinkle) playSound(farAway(s) ? 'twinkle_far' : 'twinkle', s, 20, 0.9 + rand() * 0.15, 'sub_twinkle');
            s.removed = true;
        }
    }

    // ClientLevel.createFireworks
    function explode(x, y, z, xd, yd, zd, explosions) {
        sim.focusY = y;
        if (!explosions.length) {
            for (let i = nextInt(3) + 2; i > 0; i--) {
                const p = spark(x, y, z, gaussian() * 0.05, 0.005, gaussian() * 0.05);
                p.r = p.g = p.b = 0.6;
            }
            return;
        }
        const twinkle = explosions.some((e) => e.twinkle);
        sim.pendingStarters.push({ x, y, z, xd, yd, zd, explosions, life: 0, lifetime: explosions.length * 2 - 1 + (twinkle ? 15 : 0), twinkle, removed: false });
    }

    function tickRocket(r) {
        r.xo = r.x;
        r.yo = r.y;
        r.zo = r.z;
        r.xd *= 1.15;
        r.zd *= 1.15;
        r.yd += 0.04;
        r.x += r.xd;
        r.y += r.yd;
        r.z += r.zd;
        if (r.life === 0) playSound('launch', r, 3, 1, 'sub_launch');
        r.life++;
        spark(r.x, r.y, r.z, gaussian() * 0.05, -r.yd * 0.5, gaussian() * 0.05);
        if (r.life > r.lifetime) {
            explode(r.x, r.y, r.z, r.xd, r.yd, r.zd, r.explosions);
            sim.rocket = null;
        }
    }

    function tick() {
        if (sim.rocket) tickRocket(sim.rocket);
        sim.starters.forEach(tickStarter);
        sim.starters = sim.starters.filter((s) => !s.removed);
        for (const p of sim.particles) {
            if (p.kind) tickFlash(p);
            else tickSpark(p);
        }
        sim.particles = sim.particles.filter((p) => !p.removed);
        if (sim.pendingStarters.length) {
            sim.starters.push(...sim.pendingStarters);
            sim.pendingStarters = [];
        }
        if (sim.pending.length) {
            for (const p of sim.pending) sim.particles.push(p);
            sim.pending = [];
            if (sim.particles.length > MAX_PARTICLES) sim.particles.splice(0, sim.particles.length - MAX_PARTICLES);
        }
    }

    const busy = () => !!(sim.rocket || sim.starters.length || sim.pendingStarters.length || sim.particles.length || sim.pending.length);
    const design = () => state.stars.map(copyStar);

    function launch() {
        const flight = Math.min(state.flight, PREVIEW_MAX_FLIGHT);
        sim.rocket = {
            x: 0, y: 0.15, z: 0, xo: 0, yo: 0.15, zo: 0,
            xd: triangle(0, 0.002297), yd: 0.05, zd: triangle(0, 0.002297),
            life: 0, lifetime: 10 * (1 + flight) + nextInt(6) + nextInt(7),
            explosions: design()
        };
        sim.idle = 0;
        requestFrame();
    }

    // Explosion without the flight, at the average height and speed of the chosen flight.
    function burstNow() {
        const f = flightInfo(Math.min(state.flight, PREVIEW_MAX_FLIGHT));
        const n = (f.ticks[0] + f.ticks[1]) / 2;
        explode(0, 0.15 + 0.05 * n + 0.02 * n * (n + 1), 0, 0, 0.05 + 0.04 * n, 0, design());
        sim.idle = 0;
        requestFrame();
    }

    // ---------- sound ----------

    const soundOn = () => typeof soundEnabled === 'undefined' || soundEnabled;
    const farAway = (s) => distSq(s) >= 256;
    function distSq(s) {
        const e = view.eye || [0, 0, 0];
        return (s.x - e[0]) ** 2 + (s.y - e[1]) ** 2 + (s.z - e[2]) ** 2;
    }

    function playSound(key, pos, volume, pitch, subtitle) {
        showSubtitle(subtitle);
        if (!soundOn() || !data.sounds[key]) return;
        const files = data.sounds[key];
        // Linear falloff over 16 blocks per volume unit, like the game's sound engine.
        const gain = Math.max(0, 1 - Math.sqrt(distSq(pos)) / (16 * Math.max(volume, 1))) * Math.min(volume, 1);
        if (gain <= 0) return;
        const a = new Audio(files[nextInt(files.length)]);
        a.volume = clamp(gain * 0.5, 0, 1);
        a.preservesPitch = false;
        a.playbackRate = clamp(pitch, 0.5, 2);
        a.play().catch(() => {});
    }

    const subtitles = new Map();
    function showSubtitle(key) {
        if (!el.subtitles) return;
        const label = text(key);
        let node = subtitles.get(key);
        if (!node) {
            node = document.createElement('span');
            node.textContent = label;
            subtitles.set(key, node);
        }
        el.subtitles.appendChild(node);
        clearTimeout(node._timer);
        node.classList.add('show');
        node._timer = setTimeout(() => {
            node.classList.remove('show');
            node._timer = setTimeout(() => node.remove(), 400);
        }, 2600);
    }

    // ---------- renderer ----------

    const view = { gl: null, eye: null, visible: true, raf: 0, last: 0, acc: 0, yaw: 0, pitch: 0.12, dist: 24, lookY: null, mode: 'overview', auto: true, slow: false };
    const FLOATS = 9; // x y z u v r g b a
    const MAX_QUADS = 16384; // 65536 vertices, the limit of 16-bit indices

    const VERT = `
        attribute vec3 aPos;
        attribute vec2 aUv;
        attribute vec4 aColor;
        uniform mat4 uProj;
        uniform mat4 uView;
        varying vec2 vUv;
        varying vec4 vColor;
        varying float vRadius;
        void main() {
            vUv = aUv;
            vColor = aColor;
            vRadius = length(aPos.xz);
            gl_Position = uProj * uView * vec4(aPos, 1.0);
        }`;
    const FRAG = `
        precision mediump float;
        uniform sampler2D uTex;
        uniform float uCut;
        uniform vec3 uFog;
        uniform vec3 uFogColor;
        varying vec2 vUv;
        varying vec4 vColor;
        varying float vRadius;
        void main() {
            vec4 c = texture2D(uTex, vUv) * vColor;
            if (c.a < uCut) discard;
            float f = uFog.z * clamp((vRadius - uFog.x) / (uFog.y - uFog.x), 0.0, 1.0);
            gl_FragColor = vec4(mix(c.rgb, uFogColor, f), c.a);
        }`;

    function perspective(fovy, aspect, near, far) {
        const f = 1 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);
        return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
    }

    function lookAt(eye, center) {
        let fx = center[0] - eye[0];
        let fy = center[1] - eye[1];
        let fz = center[2] - eye[2];
        let l = Math.hypot(fx, fy, fz) || 1;
        fx /= l; fy /= l; fz /= l;
        let rx = -fz;
        let rz = fx;
        l = Math.hypot(rx, rz);
        if (l < 1e-6) { rx = 1; rz = 0; l = 1; }
        rx /= l; rz /= l;
        const ux = -rz * fy;
        const uy = rz * fx - rx * fz;
        const uz = rx * fy;
        return {
            matrix: new Float32Array([
                rx, ux, -fx, 0,
                0, uy, -fy, 0,
                rz, uz, -fz, 0,
                -(rx * eye[0] + rz * eye[2]), -(ux * eye[0] + uy * eye[1] + uz * eye[2]), fx * eye[0] + fy * eye[1] + fz * eye[2], 1
            ]),
            right: [rx, 0, rz],
            up: [ux, uy, uz]
        };
    }

    function quad(out, cx, cy, cz, ax, ay, az, bx, by, bz, uv, color) {
        // corners: center -a -b, +a -b, +a +b, -a +b; uv = [u0, v0, u1, v1] with v0 at the top (+b)
        const [u0, v0, u1, v1] = uv;
        const [r, g, b, a] = color;
        out.push(
            cx - ax - bx, cy - ay - by, cz - az - bz, u0, v1, r, g, b, a,
            cx + ax - bx, cy + ay - by, cz + az - bz, u1, v1, r, g, b, a,
            cx + ax + bx, cy + ay + by, cz + az + bz, u1, v0, r, g, b, a,
            cx - ax + bx, cy - ay + by, cz - az + bz, u0, v0, r, g, b, a
        );
    }

    function mix(a, b, f) {
        return a.map((v, i) => v + (b[i] - v) * f);
    }

    function skyColor(y) {
        if (y < 0) return mix(SKY.horizon, SKY.below, clamp(-y * 5, 0, 1));
        const f = clamp(y / 0.55, 0, 1);
        return mix(SKY.horizon, SKY.zenith, f * f * (3 - 2 * f));
    }

    function skyMesh() {
        const v = [];
        const idx = [];
        const rings = 24;
        const segs = 32;
        for (let i = 0; i <= rings; i++) {
            const elev = -Math.PI / 2 + Math.PI * i / rings;
            const y = Math.sin(elev);
            const c = Math.cos(elev);
            const [r, g, b] = skyColor(y);
            for (let j = 0; j <= segs; j++) {
                const az = 2 * Math.PI * j / segs;
                v.push(c * Math.cos(az) * 60, y * 60, c * Math.sin(az) * 60, 0.5, 0.5, r, g, b, 1);
            }
        }
        for (let i = 0; i < rings; i++) {
            for (let j = 0; j < segs; j++) {
                const a = i * (segs + 1) + j;
                const b = a + segs + 1;
                idx.push(a, b, a + 1, b, b + 1, a + 1);
            }
        }
        return { v, idx };
    }

    // 1500 candidate stars at radius 100 scaled into the dome, like the game's star field.
    function starMesh() {
        const v = [];
        let seed = 10842;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        for (let i = 0; i < 1500; i++) {
            let x = rnd() * 2 - 1;
            let y = rnd() * 2 - 1;
            let z = rnd() * 2 - 1;
            const size = (0.15 + rnd() * 0.1) * 0.5;
            const len = x * x + y * y + z * z;
            if (len >= 1 || len <= 0.01) continue;
            const l = 1 / Math.sqrt(len);
            x *= l; y *= l; z *= l;
            if (y < 0.02) continue;
            const tl = Math.hypot(z, x) || 1;
            const t1 = [z / tl, 0, -x / tl];
            const t2 = [y * t1[2] - z * t1[1], z * t1[0] - x * t1[2], x * t1[1] - y * t1[0]];
            const bright = 0.35 + 0.35 * Math.min(1, y * 4);
            quad(v, x * 50, y * 50, z * 50, t1[0] * size, 0, t1[2] * size, t2[0] * size, t2[1] * size, t2[2] * size, [0, 0, 1, 1], [1, 1, 1, bright]);
        }
        return v;
    }

    function moonMesh() {
        const v = [];
        const d = [0.42, 0.5, 0.76];
        const l = Math.hypot(...d);
        const [x, y, z] = d.map((c) => c / l);
        const tl = Math.hypot(z, x);
        const t1 = [z / tl, 0, -x / tl];
        const t2 = [y * t1[2] - z * t1[1], z * t1[0] - x * t1[2], x * t1[1] - y * t1[0]];
        const s = 9;
        quad(v, x * 50, y * 50, z * 50, t1[0] * s, 0, t1[2] * s, t2[0] * s, t2[1] * s, t2[2] * s, [0, 0, 1, 1], [1, 1, 1, 1]);
        return v;
    }

    function groundMesh() {
        const v = [];
        const uv = [0, 0, 16 / 48, 1];
        const c = [...GROUND_LIGHT, 1];
        for (let x = -GROUND; x <= GROUND; x++) {
            for (let z = -GROUND; z <= GROUND; z++) {
                if (x * x + z * z > (GROUND + 1) * (GROUND + 1)) continue;
                quad(v, x, 0, z, 0.5, 0, 0, 0, 0, 0.5, uv, c);
            }
        }
        return v;
    }

    function makeTexture(gl, source) {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        if (source) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return tex;
    }

    function makeMesh(gl, verts, indices, dynamic) {
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, verts instanceof Float32Array ? verts : new Float32Array(verts), dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
        let ibo = view.quadIndex;
        let count = verts.length / FLOATS / 4 * 6;
        if (indices) {
            ibo = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
            count = indices.length;
        }
        return { vbo, ibo, count };
    }

    function compile(gl) {
        const shader = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
            return s;
        };
        const p = gl.createProgram();
        gl.attachShader(p, shader(gl.VERTEX_SHADER, VERT));
        gl.attachShader(p, shader(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
        const loc = {};
        ['aPos', 'aUv', 'aColor'].forEach((n) => { loc[n] = gl.getAttribLocation(p, n); });
        ['uProj', 'uView', 'uTex', 'uCut', 'uFog', 'uFogColor'].forEach((n) => { loc[n] = gl.getUniformLocation(p, n); });
        return { p, loc };
    }

    async function initView() {
        const gl = el.canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
        if (!gl) throw new Error('no webgl');
        view.gl = gl;
        view.prog = compile(gl);
        const idx = new Uint16Array(MAX_QUADS * 6);
        for (let q = 0; q < MAX_QUADS; q++) {
            const o = q * 4;
            idx.set([o, o + 1, o + 2, o, o + 2, o + 3], q * 6);
        }
        view.quadIndex = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, view.quadIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
        const tx = data.textures;
        const [particles, ground, moon, rocket] = await Promise.all([tx.particles, tx.ground, tx.moon, tx.rocket].map(loadImage));
        view.tex = {
            white: makeTexture(gl, null),
            particles: makeTexture(gl, particles),
            ground: makeTexture(gl, ground),
            moon: makeTexture(gl, moon),
            rocket: makeTexture(gl, rocket)
        };
        const sky = skyMesh();
        view.sky = makeMesh(gl, sky.v, sky.idx);
        view.stars = makeMesh(gl, starMesh());
        view.moon = makeMesh(gl, moonMesh());
        view.ground = makeMesh(gl, groundMesh());
        view.pdata = new Float32Array(MAX_QUADS * 4 * FLOATS);
        view.particles = makeMesh(gl, view.pdata, null, true);
        view.rdata = new Float32Array(4 * FLOATS);
        view.rocket = makeMesh(gl, view.rdata, null, true);
        gl.disable(gl.CULL_FACE);
        view.last = performance.now();
        requestFrame();
    }

    function expectedHeight() {
        const f = flightInfo(Math.min(state.flight, PREVIEW_MAX_FLIGHT));
        return 0.15 + (f.height[0] + f.height[1]) / 2;
    }

    function camera(pt, dt) {
        const r = sim.rocket;
        let target = expectedHeight();
        if (r) target = Math.max(4, r.yo + (r.y - r.yo) * pt) * 0.55 + target * 0.45;
        else if (busy() && sim.focusY !== null) target = sim.focusY;
        if (view.lookY === null) view.lookY = target;
        view.lookY += (target - view.lookY) * (1 - Math.exp(-dt / 220));
        let eye;
        if (view.mode === 'player') {
            eye = [-Math.sin(view.yaw) * view.dist, EYE, -Math.cos(view.yaw) * view.dist];
        } else {
            const cp = Math.cos(view.pitch);
            eye = [-Math.sin(view.yaw) * cp * view.dist, view.lookY - Math.sin(view.pitch) * view.dist, -Math.cos(view.yaw) * cp * view.dist];
            eye[1] = Math.max(eye[1], EYE);
        }
        view.eye = eye;
        return lookAt(eye, [0, view.lookY, 0]);
    }

    function bindMesh(mesh) {
        const { gl, prog } = view;
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vbo);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.ibo);
        gl.vertexAttribPointer(prog.loc.aPos, 3, gl.FLOAT, false, FLOATS * 4, 0);
        gl.vertexAttribPointer(prog.loc.aUv, 2, gl.FLOAT, false, FLOATS * 4, 12);
        gl.vertexAttribPointer(prog.loc.aColor, 4, gl.FLOAT, false, FLOATS * 4, 20);
    }

    function drawMesh(mesh, tex, count = mesh.count) {
        const { gl } = view;
        if (!count) return;
        bindMesh(mesh);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    }

    // Billboards facing the camera like SingleQuadParticle; sprite from SpriteSet.get(age, lifetime).
    function fillParticles(pt, right, up) {
        const out = view.pdata;
        const order = data.textures.spark_order;
        let o = 0;
        let n = 0;
        const put = (x, y, z, s, u0, v0, u1, v1, r, g, b, a) => {
            const ax = right[0] * s;
            const az = right[2] * s;
            const bx = up[0] * s;
            const by = up[1] * s;
            const bz = up[2] * s;
            out.set([
                x - ax - bx, y - by, z - az - bz, u0, v1, r, g, b, a,
                x + ax - bx, y - by, z + az - bz, u1, v1, r, g, b, a,
                x + ax + bx, y + by, z + az + bz, u1, v0, r, g, b, a,
                x - ax + bx, y + by, z - az + bz, u0, v0, r, g, b, a
            ], o);
            o += FLOATS * 4;
            n++;
        };
        for (const p of sim.particles) {
            if (n >= MAX_QUADS) break;
            const x = p.xo + (p.x - p.xo) * pt;
            const y = p.yo + (p.y - p.yo) * pt;
            const z = p.zo + (p.z - p.zo) * pt;
            if (p.kind === 1) {
                // FireworkParticles.OverlayParticle
                const age = p.age + pt - 1;
                const size = Math.abs(7.1 * Math.sin(age * 0.25 * Math.PI));
                put(x, y, z, size, 0, 8 / 40, 32 / 64, 1, p.r, p.g, p.b, 0.6 - age * 0.25 * 0.5);
                continue;
            }
            // SparkParticle.extract: twinkling sparks blink after the first third of their life.
            if (p.twinkle && p.age >= Math.floor(p.lifetime / 3) && Math.floor((p.age + p.lifetime) / 3) % 2 !== 0) continue;
            const frame = order[Math.min(order.length - 1, Math.floor(p.age * (order.length - 1) / p.lifetime))];
            put(x, y, z, p.size, frame * 8 / 64, 0, (frame * 8 + 8) / 64, 8 / 40, p.r, p.g, p.b, p.a);
        }
        return n;
    }

    function draw(pt, dt) {
        const { gl, prog } = view;
        const w = Math.max(1, Math.round(el.canvas.clientWidth * Math.min(2, window.devicePixelRatio || 1)));
        const h = Math.max(1, Math.round(el.canvas.clientHeight * Math.min(2, window.devicePixelRatio || 1)));
        if (el.canvas.width !== w || el.canvas.height !== h) {
            el.canvas.width = w;
            el.canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
        gl.clearColor(...SKY.horizon, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const cam = camera(pt, dt);
        gl.useProgram(prog.p);
        [prog.loc.aPos, prog.loc.aUv, prog.loc.aColor].forEach((a) => gl.enableVertexAttribArray(a));
        gl.uniformMatrix4fv(prog.loc.uProj, false, perspective(70 * Math.PI / 180, w / h, 0.05, 1000));
        gl.uniform1i(prog.loc.uTex, 0);
        gl.uniform3fv(prog.loc.uFogColor, SKY.horizon);
        gl.uniform3f(prog.loc.uFog, 0, 1, 0);
        gl.uniform1f(prog.loc.uCut, 0);

        // Sky, stars and moon move with the view only.
        const rot = cam.matrix.slice();
        rot[12] = rot[13] = rot[14] = 0;
        gl.uniformMatrix4fv(prog.loc.uView, false, rot);
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.disable(gl.BLEND);
        drawMesh(view.sky, view.tex.white);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        drawMesh(view.stars, view.tex.white);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        drawMesh(view.moon, view.tex.moon);

        gl.uniformMatrix4fv(prog.loc.uView, false, cam.matrix);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.disable(gl.BLEND);
        gl.uniform3f(prog.loc.uFog, 18, GROUND - 4, 1);
        drawMesh(view.ground, view.tex.ground);
        gl.uniform3f(prog.loc.uFog, 0, 1, 0);
        gl.uniform1f(prog.loc.uCut, 0.1);

        const r = sim.rocket;
        if (r) {
            view.rdata.fill(0);
            const s = 0.25;
            const x = r.xo + (r.x - r.xo) * pt;
            const y = r.yo + (r.y - r.yo) * pt;
            const z = r.zo + (r.z - r.zo) * pt;
            const tmp = [];
            quad(tmp, x, y, z, cam.right[0] * s, 0, cam.right[2] * s, cam.up[0] * s, cam.up[1] * s, cam.up[2] * s, [0, 0, 1, 1], [0.85, 0.85, 0.85, 1]);
            view.rdata.set(tmp);
            gl.bindBuffer(gl.ARRAY_BUFFER, view.rocket.vbo);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view.rdata);
            drawMesh(view.rocket, view.tex.rocket, 6);
        }

        const n = fillParticles(pt, cam.right, cam.up);
        if (n) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.depthMask(false);
            gl.bindBuffer(gl.ARRAY_BUFFER, view.particles.vbo);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view.pdata.subarray(0, n * 4 * FLOATS));
            drawMesh(view.particles, view.tex.particles, n * 6);
            gl.depthMask(true);
        }
    }

    function frame(now) {
        view.raf = 0;
        const tickMs = TICK_MS * (view.slow ? 4 : 1);
        const dt = Math.min(250, now - view.last);
        view.last = now;
        view.acc += dt;
        while (view.acc >= tickMs) {
            view.acc -= tickMs;
            tick();
            if (busy()) sim.idle = 0;
            else sim.idle += tickMs;
        }
        if (view.auto && !busy() && sim.idle >= 700) launch();
        draw(view.acc / tickMs, dt);
        requestFrame();
    }

    function requestFrame() {
        if (!view.gl || view.raf || !view.visible || document.hidden) return;
        view.raf = requestAnimationFrame(frame);
    }

    function wakeUp() {
        view.last = performance.now();
        requestFrame();
    }

    function bindStage() {
        const c = el.canvas;
        let drag = null;
        c.addEventListener('pointerdown', (e) => {
            drag = { x: e.clientX, y: e.clientY, moved: 0 };
            c.setPointerCapture(e.pointerId);
        });
        c.addEventListener('pointermove', (e) => {
            if (!drag) return;
            const dx = e.clientX - drag.x;
            const dy = e.clientY - drag.y;
            drag.x = e.clientX;
            drag.y = e.clientY;
            drag.moved += Math.abs(dx) + Math.abs(dy);
            view.yaw -= dx * 0.008;
            view.pitch = clamp(view.pitch + dy * 0.006, -0.35, 1.2);
        });
        const end = () => {
            if (drag && drag.moved < 6) launch();
            drag = null;
        };
        c.addEventListener('pointerup', end);
        c.addEventListener('pointercancel', () => { drag = null; });
        c.addEventListener('wheel', (e) => {
            e.preventDefault();
            view.dist = clamp(view.dist * Math.exp(e.deltaY * 0.001), 12, 90);
        }, { passive: false });
        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                view.visible = entries[0].isIntersecting;
                if (view.visible) wakeUp();
            }).observe(el.stage);
        }
        document.addEventListener('visibilitychange', () => { if (!document.hidden) wakeUp(); });
    }

    // ---------- shape gallery ----------

    function renderGallery() {
        el.gallery.innerHTML = data.shapes.map((sh) => {
            const heads = sh.options ? `<p class="fw-shape-card-note">${escapeHtml(t('shape_any_head', { list: sh.options.map(itemName).join(', ') }))}</p>` : '';
            return `
                <article class="fw-shape-card">
                    <div class="fw-shape-card-head">
                        <span class="fw-slot fw-slot--big">${sh.item ? itemImg(sh.item) : `<img src="${escapeHtml(data.items[data.recipe.fuel][2])}" alt="" class="is-pixel">`}</span>
                        <div>
                            <h3>${escapeHtml(sh.name[L])}</h3>
                            <small>${escapeHtml(sh.item ? itemName(sh.item) : t('shape_plain'))}</small>
                        </div>
                    </div>
                    <p>${escapeHtml(t('shape_desc_' + sh.id))}</p>
                    ${heads}
                    <ul class="fw-shape-facts">
                        <li><i class="fas fa-star-of-life" aria-hidden="true"></i> ${escapeHtml(t('shape_sparks', { n: fmt(SHAPE_PARTICLES[sh.id]) }))}</li>
                        <li><i class="fas fa-ruler-horizontal" aria-hidden="true"></i> ${escapeHtml(t('shape_radius', { n: fmt(SHAPE_RADIUS[sh.id], 1) }))}</li>
                    </ul>
                    <button type="button" class="fw-btn" data-try="${sh.id}"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> <span>${escapeHtml(t('shape_try'))}</span></button>
                </article>`;
        }).join('');
    }

    // ---------- state changes ----------

    function refresh() {
        state.selected = clamp(state.selected, 0, Math.max(0, state.stars.length - 1));
        renderFlight();
        renderStars();
        renderEditor();
        renderSummary();
        renderCraft();
        renderCommands();
        scheduleHash();
    }

    function applyDesign(d, fire = true) {
        state.flight = d.flight;
        state.stars = d.stars.slice(0, MAX_STARS);
        state.selected = 0;
        refresh();
        if (fire && view.gl) launch();
    }

    function addColor(target, color) {
        const s = current();
        if (!s || s[target].length >= MAX_COLORS) return;
        s[target].push(color);
        refresh();
    }

    function toggle(btn, on) {
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', String(on));
    }

    function renderSoundButton() {
        const on = soundOn();
        el.sound.innerHTML = `<i class="fas ${on ? 'fa-volume-high' : 'fa-volume-xmark'}" aria-hidden="true"></i> <span>${escapeHtml(t(on ? 'sound_on' : 'sound_off'))}</span>`;
        toggle(el.sound, on);
    }

    async function copyText(value, message) {
        try {
            await navigator.clipboard.writeText(value);
            showToast(t('toast_copied_title'), message, 'success');
        } catch (_) {
            showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
        }
    }

    function bind() {
        el.presets.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-preset]');
            if (!btn) return;
            const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
            applyDesign(preset ? presetDesign(preset) : randomDesign());
            showToast(t('toast_preset_title'), t('preset_' + btn.dataset.preset), 'info');
        });
        el.flight.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-flight]');
            if (!btn) return;
            state.flight = Number(btn.dataset.flight);
            refresh();
        });
        el.flightInput.addEventListener('input', () => {
            const v = Math.floor(Number(el.flightInput.value));
            if (!Number.isFinite(v)) return;
            state.flight = clamp(v, 0, data.limits.flight);
            refresh();
        });
        el.flightInput.addEventListener('change', () => { el.flightInput.value = state.flight; });
        el.stars.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || btn.disabled) return;
            const d = btn.dataset;
            if (d.select !== undefined) {
                state.selected = Number(d.select);
                renderStars();
                renderEditor();
                return;
            }
            if (d.move !== undefined) {
                const i = Number(d.i);
                const j = i + Number(d.move);
                [state.stars[i], state.stars[j]] = [state.stars[j], state.stars[i]];
                state.selected = j;
            } else if (d.dup !== undefined) {
                const i = Number(d.dup);
                state.stars.splice(i + 1, 0, copyStar(state.stars[i]));
                state.selected = i + 1;
            } else if (d.del !== undefined) {
                const i = Number(d.del);
                state.stars.splice(i, 1);
                if (state.selected >= i) state.selected = Math.max(0, state.selected - 1);
            }
            refresh();
        });
        el.addStar.addEventListener('click', () => {
            if (state.stars.length >= MAX_STARS) return;
            const base = current();
            state.stars.push(base ? copyStar(base) : normalizeStar({ shape: 'large_ball', colors: [dyeColor('red')] }));
            state.selected = state.stars.length - 1;
            refresh();
        });
        el.shapes.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-shape]');
            if (!btn || !current()) return;
            current().shape = btn.dataset.shape;
            refresh();
        });
        el.effects.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-effect]');
            if (!btn || !current()) return;
            current()[btn.dataset.effect] = !current()[btn.dataset.effect];
            refresh();
        });
        [[el.palette, 'colors'], [el.fadePalette, 'fade']].forEach(([box, target]) => {
            box.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-dye]');
                if (btn) addColor(target, dyeColor(btn.dataset.dye));
            });
        });
        [el.colors, el.fade].forEach((box) => {
            box.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-remove]');
                if (!btn || !current()) return;
                current()[btn.dataset.target].splice(Number(btn.dataset.remove), 1);
                refresh();
            });
        });
        el.app.querySelectorAll('[data-add-custom]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const input = byId(btn.dataset.input);
                addColor(btn.dataset.addCustom, fromHex(input.value));
            });
        });
        el.launch.addEventListener('click', launch);
        el.burst.addEventListener('click', burstNow);
        el.auto.addEventListener('click', () => {
            view.auto = !view.auto;
            toggle(el.auto, view.auto);
            sim.idle = 0;
        });
        el.slow.addEventListener('click', () => {
            view.slow = !view.slow;
            toggle(el.slow, view.slow);
        });
        el.views.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-view]');
            if (!btn) return;
            view.mode = btn.dataset.view;
            el.views.querySelectorAll('[data-view]').forEach((b) => toggle(b, b === btn));
        });
        el.sound.addEventListener('click', () => {
            if (typeof toggleSound === 'function') toggleSound();
            renderSoundButton();
        });
        ['soundBtn', 'mobileSoundBtn'].forEach((id) => {
            const btn = byId(id);
            if (btn) btn.addEventListener('click', () => setTimeout(renderSoundButton, 0));
        });
        el.screenshot.addEventListener('click', () => {
            if (!view.gl) return;
            draw(view.acc / TICK_MS, 0);
            el.canvas.toBlob((blob) => {
                if (!blob) return;
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'firework.png';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(a.href), 1000);
                showToast(t('toast_saved_title'), t('toast_screenshot'), 'success');
            }, 'image/png');
        });
        el.who.addEventListener('input', renderCommands);
        el.count.addEventListener('input', renderCommands);
        el.format.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-format]');
            if (!btn) return;
            state.format = btn.dataset.format;
            renderCommands();
        });
        el.commands.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cmd]');
            if (btn) copyText(el.commands._list[Number(btn.dataset.cmd)].cmd, t('toast_command_copied'));
        });
        el.copyAll.addEventListener('click', () => copyText(el.commands._list.map((c) => c.cmd).join('\n'), t('toast_commands_copied')));
        el.share.addEventListener('click', () => {
            clearTimeout(hashTimer);
            history.replaceState(null, '', '#fw=' + encodeState());
            copyText(location.href, t('toast_link_copied'));
        });
        el.importBtn.addEventListener('click', () => {
            const d = importText(el.importText.value);
            if (!d) {
                showToast(t('toast_error_title'), t('toast_import_failed'), 'error');
                return;
            }
            applyDesign(d);
            showToast(t('toast_import_title'), t('toast_import_ok'), 'success');
        });
        el.gallery.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-try]');
            if (!btn) return;
            if (!current()) {
                state.stars.push(normalizeStar({ shape: btn.dataset.try, colors: [dyeColor('red')] }));
                state.selected = 0;
            } else {
                current().shape = btn.dataset.try;
            }
            refresh();
            el.stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (view.gl) burstNow();
        });
    }

    function collectElements() {
        const ids = {
            app: 'fireworkApp', presets: 'fwPresets', stage: 'fwStage', canvas: 'fwCanvas', status: 'fwStatus', subtitles: 'fwSubtitles',
            launch: 'fwLaunch', burst: 'fwBurst', auto: 'fwAuto', slow: 'fwSlow', views: 'fwViews', sound: 'fwSound', screenshot: 'fwScreenshot',
            tooltip: 'fwTooltip', stats: 'fwStats', statNote: 'fwStatNote',
            flight: 'fwFlight', flightCustom: 'fwFlightCustom', flightInput: 'fwFlightInput',
            starCount: 'fwStarCount', stars: 'fwStars', addStar: 'fwAddStar',
            editor: 'fwEditor', editorTitle: 'fwEditorTitle', shapes: 'fwShapes', colors: 'fwColors', palette: 'fwPalette',
            fade: 'fwFade', fadePalette: 'fwFadePalette', effects: 'fwEffects',
            craft: 'fwCraft', who: 'fwWho', count: 'fwCount', format: 'fwFormat', copyAll: 'fwCopyAll', share: 'fwShare',
            commands: 'fwCommands', note: 'fwNote', importText: 'fwImportText', importBtn: 'fwImport', gallery: 'fwShapeGallery'
        };
        Object.entries(ids).forEach(([key, id]) => { el[key] = byId(id); });
    }

    async function init() {
        collectElements();
        if (!el.app) return;
        el.status.textContent = t('loading');
        try {
            const res = await fetch(DATA_URL, { cache: 'no-cache' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        } catch (err) {
            console.error('Firework data failed:', err);
            el.status.textContent = t('toast_data_failed');
            showToast(t('toast_error_title'), t('toast_data_failed'), 'error');
            return;
        }
        data.dyes.forEach((d) => dyeByColor.set(fromHex(d.color), d));
        const shared = location.hash.startsWith('#fw=') ? decodeState(location.hash.slice(4)) : null;
        const start = shared || presetDesign(PRESETS[0]);
        state.flight = start.flight;
        state.stars = start.stars;
        renderPresets();
        renderPalettes();
        renderGallery();
        renderSoundButton();
        bind();
        bindStage();
        toggle(el.auto, view.auto);
        toggle(el.slow, view.slow);
        refresh();
        try {
            await initView();
            el.status.hidden = true;
        } catch (err) {
            console.error(err);
            el.status.textContent = t('no_webgl');
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
