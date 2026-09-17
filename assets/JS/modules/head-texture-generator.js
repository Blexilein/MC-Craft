// head-texture-generator.js

// Texte dieser Seite
const I18N = {
    de: {
        toast_welcome_title: 'Head Texture Generator geladen!',
        toast_welcome_message: 'Wähle eine Textur und kopiere deinen /give-Befehl.',
        search_items: 'Items suchen: Name oder ID ...',
        search_blocks: 'Blöcke suchen: Name oder ID ...',
        search_entities: 'Mobs suchen: Name oder ID ...',
        search_villagers: 'Villager suchen ...',
        search_players: 'Skins suchen ...',
        all_categories: 'Alle Kategorien',
        loading: 'Lade Daten ...',
        stats: '{available} verfügbar · {unavailable} ohne nutzbaren Texturpfad',
        results: '{n} Treffer',
        show_unavailable: 'Nicht verfügbare anzeigen ({n})',
        anim_stop: 'Animation stoppen',
        anim_start: 'Animation starten',
        select: 'Auswählen',
        selected: 'Ausgewählt',
        unavailable: 'Nicht verfügbar',
        reason_no_path: 'Aus den vorhandenen Daten lässt sich kein eindeutiger Minecraft-Texturpfad ermitteln.',
        reason_unofficial: 'Die hinterlegte Textur gibt es im offiziellen Minecraft nicht.',
        reason_no_texture: 'Für diesen Mob ist keine Textur in der Datenbank hinterlegt.',
        reason_not_listed: 'Diese Textur fehlt in den lokalen Projektdateien.',
        newer_badge: 'Neuer als 1.21.9',
        newer_hint: 'Diese Textur gibt es erst in Versionen nach 1.21.9 (geprüft bis {latest}).',
        no_results_title: 'Keine Texturen gefunden',
        no_results_text: 'Versuche einen anderen Suchbegriff oder eine andere Kategorie.',
        data_error: 'Die Texturdaten konnten nicht geladen werden. Bitte lade die Seite neu.',
        texture_unavailable: 'Diese Textur ist derzeit nicht verfügbar.',
        face_default: 'Standard',
        face_side: 'Seite',
        face_top: 'Oben',
        face_bottom: 'Unten',
        face_front: 'Vorne',
        face_back: 'Hinten',
        face_end: 'Ende',
        custom_name: 'Eigener Texturpfad',
        custom_empty: 'Bitte gib einen Texturpfad ein.',
        custom_invalid: 'Ungültige Zeichen. Erlaubt sind a–z, 0–9 sowie _ - . und /.',
        custom_known: 'Bekannte Vanilla-Textur.',
        custom_unknown: 'Diesen Pfad kennt MC-Craft nicht. Prüfe die Schreibweise – der Befehl wird trotzdem erstellt.',
        custom_normalized: 'Normalisiert zu {path}.',
        target_invalid: 'Spielername: 3–16 Zeichen, nur Buchstaben, Zahlen und _.',
        count_invalid: 'Anzahl: eine ganze Zahl von 1 bis 64.',
        copied_title: 'Kopiert',
        copied: 'Befehl wurde kopiert.',
        copy_failed_title: 'Fehler',
        copy_failed: 'Kopieren fehlgeschlagen.',
        preview_alt: 'Original-Textur: {name}',
        villager_base: 'Dorfbewohner (Basis)',
        villager_base_cat: 'Basis',
        villager_profession: 'Beruf',
        villager_type: 'Biom-Typ',
        prof_armorer: 'Rüstungsschmied',
        prof_butcher: 'Fleischer',
        prof_cartographer: 'Kartograf',
        prof_cleric: 'Geistlicher',
        prof_farmer: 'Bauer',
        prof_fisherman: 'Fischer',
        prof_fletcher: 'Pfeilmacher',
        prof_leatherworker: 'Gerber',
        prof_librarian: 'Bibliothekar',
        prof_mason: 'Maurer',
        prof_nitwit: 'Nichtsnutz',
        prof_shepherd: 'Schäfer',
        prof_toolsmith: 'Werkzeugschmied',
        prof_weaponsmith: 'Waffenschmied',
        type_desert: 'Wüste',
        type_jungle: 'Dschungel',
        type_plains: 'Ebene',
        type_savanna: 'Savanne',
        type_snow: 'Schnee',
        type_swamp: 'Sumpf',
        type_taiga: 'Taiga',
        player_wide: 'Breites Modell (wide)',
        player_slim: 'Schmales Modell (slim)',
        mob_type_boss: 'Boss',
        mob_type_hostile: 'Feindlich',
        mob_type_neutral: 'Neutral',
        mob_type_passive: 'Friedlich',
        mob_type_player: 'Spieler',
        mob_type_unused: 'Ungenutzt',
        mob_type_jockey: 'Jockey'
    },
    en: {
        toast_welcome_title: 'Head Texture Generator loaded!',
        toast_welcome_message: 'Pick a texture and copy your /give command.',
        search_items: 'Search items: name or ID ...',
        search_blocks: 'Search blocks: name or ID ...',
        search_entities: 'Search mobs: name or ID ...',
        search_villagers: 'Search villagers ...',
        search_players: 'Search skins ...',
        all_categories: 'All categories',
        loading: 'Loading data ...',
        stats: '{available} available · {unavailable} without a usable texture path',
        results: '{n} results',
        show_unavailable: 'Show unavailable ({n})',
        anim_stop: 'Stop animation',
        anim_start: 'Start animation',
        select: 'Select',
        selected: 'Selected',
        unavailable: 'Unavailable',
        reason_no_path: 'No unambiguous Minecraft texture path can be derived from the existing data.',
        reason_unofficial: 'The stored texture does not exist in official Minecraft.',
        reason_no_texture: 'No texture is stored for this mob in the database.',
        reason_not_listed: 'This texture is missing from the local project files.',
        newer_badge: 'Newer than 1.21.9',
        newer_hint: 'This texture only exists in versions after 1.21.9 (checked up to {latest}).',
        no_results_title: 'No textures found',
        no_results_text: 'Try another search term or category.',
        data_error: 'The texture data could not be loaded. Please reload the page.',
        texture_unavailable: 'This texture is currently unavailable.',
        face_default: 'Default',
        face_side: 'Side',
        face_top: 'Top',
        face_bottom: 'Bottom',
        face_front: 'Front',
        face_back: 'Back',
        face_end: 'End',
        custom_name: 'Custom texture path',
        custom_empty: 'Please enter a texture path.',
        custom_invalid: 'Invalid characters. Allowed are a–z, 0–9 and _ - . /.',
        custom_known: 'Known vanilla texture.',
        custom_unknown: 'MC-Craft does not know this path. Check the spelling – the command is created anyway.',
        custom_normalized: 'Normalized to {path}.',
        target_invalid: 'Player name: 3–16 characters, letters, numbers and _ only.',
        count_invalid: 'Count: a whole number from 1 to 64.',
        copied_title: 'Copied',
        copied: 'Command copied.',
        copy_failed_title: 'Error',
        copy_failed: 'Copying failed.',
        preview_alt: 'Original texture: {name}',
        villager_base: 'Villager (base)',
        villager_base_cat: 'Base',
        villager_profession: 'Profession',
        villager_type: 'Biome type',
        prof_armorer: 'Armorer',
        prof_butcher: 'Butcher',
        prof_cartographer: 'Cartographer',
        prof_cleric: 'Cleric',
        prof_farmer: 'Farmer',
        prof_fisherman: 'Fisherman',
        prof_fletcher: 'Fletcher',
        prof_leatherworker: 'Leatherworker',
        prof_librarian: 'Librarian',
        prof_mason: 'Mason',
        prof_nitwit: 'Nitwit',
        prof_shepherd: 'Shepherd',
        prof_toolsmith: 'Toolsmith',
        prof_weaponsmith: 'Weaponsmith',
        type_desert: 'Desert',
        type_jungle: 'Jungle',
        type_plains: 'Plains',
        type_savanna: 'Savanna',
        type_snow: 'Snow',
        type_swamp: 'Swamp',
        type_taiga: 'Taiga',
        player_wide: 'Wide model',
        player_slim: 'Slim model',
        mob_type_boss: 'Boss',
        mob_type_hostile: 'Hostile',
        mob_type_neutral: 'Neutral',
        mob_type_passive: 'Passive',
        mob_type_player: 'Player',
        mob_type_unused: 'Unused',
        mob_type_jockey: 'Jockey'
    }
};

(function () {
    'use strict';

    const lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    // Reuse this script's ?v= so the JSON files follow the same cache busting.
    const versionQuery = (document.currentScript && document.currentScript.src.split('?')[1]) || '';
    const versioned = (url) => (versionQuery ? url + '?' + versionQuery : url);

    // The same files items.js and mobs.js load - the data itself is not copied.
    const ITEM_FILES = ['building', 'color', 'nature', 'utility', 'redstone', 'tools', 'combat', 'food', 'materials', 'spawneggs', 'gamemod'];
    const MOB_FILES = ['Boss_mobs', 'Hostile_mobs', 'Jockeys_mobs', 'Neutral_mobs', 'Passive_mobs', 'Player', 'Unused_mobs'];
    const MANIFEST_URL = '/assets/img/textures/manifest.json';
    const SKINVIEW_URL = '/assets/JS/vendor/skinview3d.bundle.js';
    const TEXTURE_ROOT = '/assets/img/textures/';
    const MOB_TEXTURE_ROOT = '/assets/img/texture/mobs/';

    // Vanilla lists that no MC-Craft database covers; every path is still checked
    // against the manifest before it can be selected.
    const PROFESSIONS = ['armorer', 'butcher', 'cartographer', 'cleric', 'farmer', 'fisherman', 'fletcher', 'leatherworker', 'librarian', 'mason', 'nitwit', 'shepherd', 'toolsmith', 'weaponsmith'];
    const BIOMES = ['desert', 'jungle', 'plains', 'savanna', 'snow', 'swamp', 'taiga'];
    const PLAYER_SKINS = ['steve', 'alex', 'ari', 'efe', 'kai', 'makena', 'noor', 'sunny', 'zuri'];
    const FACE_SUFFIXES = ['', '_side', '_top', '_bottom', '_front', '_back', '_end'];
    const PAGE_SIZE = 60;
    const PREVIEW_SIZE = 180;

    const el = {};
    const state = {
        tab: 'items',
        manifest: null,
        files: {},
        latest: '',
        dataError: false,
        lists: {},
        pending: {},
        view: [],
        shown: PAGE_SIZE,
        query: '',
        category: 'all',
        selected: null,
        face: 0,
        command: '',
        autoRotate: !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    };

    function warn(message, detail) {
        console.warn('[Head Texture Generator] ' + message, detail === undefined ? '' : detail);
    }

    function hasText(key) {
        return I18N[lang] && I18N[lang][key] !== undefined;
    }

    // ===== DATA =====
    async function fetchJson(url) {
        const res = await fetch(versioned(url));
        if (!res.ok) throw new Error(res.status + ' ' + url);
        return res.json();
    }

    function textureRef(path) {
        const value = state.manifest ? state.manifest[path] : undefined;
        if (value === undefined) return null;
        const flag = Array.isArray(value) ? value[0] : value;
        return {
            path,
            newer: flag === 1,
            file: Array.isArray(value) ? value[1] : TEXTURE_ROOT + path + '.png'
        };
    }

    function pathFromFile(file) {
        if (typeof file !== 'string' || !file.endsWith('.png')) return null;
        if (file.startsWith(TEXTURE_ROOT)) return file.slice(TEXTURE_ROOT.length, -4);
        // Local mob folders often differ from Minecraft's; the manifest maps those
        // files to the official texture with identical pixels.
        if (file.startsWith(MOB_TEXTURE_ROOT)) return state.files[file] || 'entity/' + file.slice(MOB_TEXTURE_ROOT.length, -4);
        return null;
    }

    // Mob texture lists often start with a baby, eye-layer or equipment texture.
    // The texture named like the mob comes first, then adults, then layers.
    function faceRank(path, mobName) {
        const file = path.split('/').pop();
        if (file === mobName) return 0;
        if (/(^|\/)equipment\//.test(path)) return 4;
        if (/_(eyes|overlay|outer_layer|ropes|fangs|spark|beam|spit|fireball|stinger|wind)$/.test(file)) return 3;
        if (/(^|[/_])baby([/_]|$)/.test(path)) return 2;
        return 1;
    }

    function faceLabel(suffix) {
        return t('face_' + (suffix ? suffix.slice(1) : 'default'));
    }

    // 1. The texture entry of the database, if it points at a Minecraft texture file.
    // 2. Otherwise the local texture named after the Java ID (block faces included).
    // 3. Otherwise the database picture, if the manifest found it to be a (scaled)
    //    copy of an official texture (items/Light_15.png = item/light_15).
    // Nothing else is derived: stairs, slabs or fences reuse another block's texture
    // in Minecraft and no project data records which one, so they stay unavailable.
    function resolveDbTextures(entry, isBlock) {
        const faces = [];
        let fromDb = false;
        (Array.isArray(entry.texture) ? entry.texture : []).forEach((tex) => {
            const path = pathFromFile(tex && tex.file);
            if (!path) return;
            fromDb = true;
            const ref = textureRef(path);
            if (ref && !faces.some((f) => f.path === ref.path)) faces.push(Object.assign(ref, { label: faceLabel('') }));
        });
        if (!fromDb) {
            const name = String(entry.java_item_id || entry.id || '').split(':').pop();
            if (name && isBlock) {
                FACE_SUFFIXES.forEach((suffix) => {
                    const ref = textureRef('block/' + name + suffix);
                    if (ref) faces.push(Object.assign(ref, { label: faceLabel(suffix) }));
                });
            }
            if (name && !faces.length) {
                const ref = textureRef('item/' + name);
                if (ref) faces.push(Object.assign(ref, { label: faceLabel('') }));
            }
        }
        if (!faces.length) {
            (Array.isArray(entry.texture) ? entry.texture : []).forEach((tex) => {
                const path = tex && state.files[tex.file];
                const ref = path && textureRef(path);
                if (ref && !faces.some((f) => f.path === ref.path)) faces.push(Object.assign(ref, { label: faceLabel('') }));
            });
        }
        return { faces, reason: faces.length ? '' : (fromDb ? 'reason_unofficial' : 'reason_no_path') };
    }

    function searchText(parts) {
        return parts.flat().filter((p) => typeof p === 'string' && p).join(' ').toLowerCase();
    }

    function dbEntry(entry, isBlock) {
        const resolved = resolveDbTextures(entry, isBlock);
        const id = String(entry.id || '');
        return {
            name: entry.name || id,
            id,
            category: entry.category || '',
            icon: entry.icon || '',
            faces: resolved.faces,
            reason: resolved.reason,
            search: searchText([entry.name, id, id.replace(/^minecraft:/, ''), entry.java_item_id, entry.aliases])
        };
    }

    function loadItems() {
        if (!state.pending.items) {
            state.pending.items = state.pending.manifest
                .then(() => Promise.allSettled(ITEM_FILES.map((f) => fetchJson('/assets/JS/items/' + lang + '_' + f + '.json'))))
                .then((results) => {
                    const items = [];
                    const blocks = [];
                    results.forEach((r, i) => {
                        if (r.status !== 'fulfilled' || !Array.isArray(r.value)) {
                            warn('Item file could not be loaded: ' + lang + '_' + ITEM_FILES[i] + '.json', r.reason);
                            return;
                        }
                        r.value.forEach((entry) => {
                            const isBlock = String(entry.type || '').toLowerCase() === 'block';
                            (isBlock ? blocks : items).push(dbEntry(entry, isBlock));
                        });
                    });
                    state.lists.items = items;
                    state.lists.blocks = blocks;
                });
        }
        return state.pending.items;
    }

    function mobCategory(type) {
        const key = 'mob_type_' + String(type || '').toLowerCase();
        return hasText(key) ? t(key) : String(type || '');
    }

    function loadMobs() {
        if (!state.pending.mobs) {
            state.pending.mobs = state.pending.manifest
                .then(() => Promise.allSettled(MOB_FILES.map((f) => fetchJson('/assets/JS/mobs/' + lang + '_' + f + '.json'))))
                .then((results) => {
                    const list = [];
                    results.forEach((r, i) => {
                        if (r.status !== 'fulfilled' || !Array.isArray(r.value)) {
                            warn('Mob file could not be loaded: ' + lang + '_' + MOB_FILES[i] + '.json', r.reason);
                            return;
                        }
                        r.value.forEach((mob) => {
                            const textures = Array.isArray(mob.texture) ? mob.texture : [];
                            const faces = [];
                            textures.forEach((tex) => {
                                const path = pathFromFile(tex && tex.file);
                                const ref = path && textureRef(path);
                                if (ref && !faces.some((f) => f.path === ref.path)) faces.push(Object.assign(ref, { label: (tex.name || '') || faceLabel('') }));
                            });
                            const id = String(mob.id || '');
                            const mobName = id.split(':').pop();
                            faces.sort((a, b) => faceRank(a.path, mobName) - faceRank(b.path, mobName));
                            list.push({
                                name: mob.name || id,
                                id,
                                category: mobCategory(mob.type),
                                icon: mob.icon || '',
                                faces,
                                reason: faces.length ? '' : (textures.length ? 'reason_unofficial' : 'reason_no_texture'),
                                search: searchText([mob.name, id, id.replace(/^minecraft:/, '')])
                            });
                        });
                    });
                    state.lists.entities = list;
                });
        }
        return state.pending.mobs;
    }

    function staticEntry(path, name, category) {
        const ref = textureRef(path);
        return {
            name,
            id: path,
            category,
            icon: '',
            faces: ref ? [Object.assign(ref, { label: faceLabel('') })] : [],
            reason: ref ? '' : 'reason_not_listed',
            search: searchText([name, path])
        };
    }

    function buildStaticLists() {
        const villagers = [staticEntry('entity/villager/villager', t('villager_base'), t('villager_base_cat'))];
        PROFESSIONS.forEach((p) => villagers.push(staticEntry('entity/villager/profession/' + p, t('prof_' + p), t('villager_profession'))));
        BIOMES.forEach((b) => villagers.push(staticEntry('entity/villager/type/' + b, t('type_' + b), t('villager_type'))));
        state.lists.villagers = villagers;

        const players = [];
        ['wide', 'slim'].forEach((model) => {
            PLAYER_SKINS.forEach((skin) => {
                const name = skin.charAt(0).toUpperCase() + skin.slice(1) + ' (' + model + ')';
                players.push(staticEntry('entity/player/' + model + '/' + skin, name, t('player_' + model)));
            });
        });
        state.lists.players = players;
    }

    function ensureList(tab) {
        if (tab === 'items' || tab === 'blocks') return loadItems();
        if (tab === 'entities') return loadMobs();
        return state.pending.manifest;
    }

    // ===== BROWSER =====
    function setTab(tab) {
        state.tab = tab;
        el.tabs.forEach((btn) => {
            const on = btn.dataset.tab === tab;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        const custom = tab === 'custom';
        el.listView.hidden = custom;
        el.customView.hidden = !custom;
        if (custom) {
            updateCustom();
            return;
        }
        state.query = '';
        state.category = 'all';
        el.search.value = '';
        el.search.placeholder = t('search_' + tab);
        fillCategories();
        applyFilter();
        ensureList(tab).then(() => {
            if (state.tab !== tab) return;
            fillCategories();
            applyFilter();
        });
    }

    function fillCategories() {
        const list = state.lists[state.tab] || [];
        const seen = [];
        list.forEach((e) => { if (e.category && seen.indexOf(e.category) === -1) seen.push(e.category); });
        el.category.textContent = '';
        const all = document.createElement('option');
        all.value = 'all';
        all.textContent = t('all_categories');
        el.category.appendChild(all);
        seen.forEach((c) => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            el.category.appendChild(opt);
        });
        el.category.value = state.category;
        el.category.hidden = seen.length < 2;
    }

    function applyFilter() {
        const list = state.lists[state.tab] || [];
        const q = state.query;
        const cat = state.category;
        const withUnavailable = el.showUnavailable.checked;
        state.view = list.filter((e) =>
            (withUnavailable || e.faces.length) &&
            (cat === 'all' || e.category === cat) &&
            (!q || e.search.indexOf(q) !== -1));
        if (q) {
            // "diamond" should list the diamond before diamond_axe & co.
            const rank = (e) => {
                const id = e.id.toLowerCase();
                const bare = id.replace(/^minecraft:/, '');
                const name = e.name.toLowerCase();
                if (id === q || bare === q || name === q) return 0;
                if (id.startsWith(q) || bare.startsWith(q) || name.startsWith(q)) return 1;
                return 2;
            };
            state.view = state.view
                .map((e, i) => [rank(e), i, e])
                .sort((a, b) => a[0] - b[0] || a[1] - b[1])
                .map((row) => row[2]);
        }
        state.shown = PAGE_SIZE;
        el.grid.scrollTop = 0;
        renderGrid(false);
    }

    function noResults() {
        const box = document.createElement('div');
        box.className = 'no-results';
        const icon = document.createElement('i');
        icon.className = 'fas fa-search';
        icon.setAttribute('aria-hidden', 'true');
        const title = document.createElement('h3');
        title.textContent = state.dataError ? t('texture_unavailable') : t('no_results_title');
        const text = document.createElement('p');
        text.textContent = state.dataError ? t('data_error') : t('no_results_text');
        box.append(icon, title, text);
        return box;
    }

    function renderCard(entry, index) {
        const available = entry.faces.length > 0;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'htg-card';
        card.dataset.index = String(index);
        card.disabled = !available;
        card.setAttribute('aria-pressed', entry === state.selected ? 'true' : 'false');
        if (!available) card.title = t(entry.reason);

        const tex = document.createElement('span');
        tex.className = 'htg-card-tex';
        const src = available ? entry.faces[0].file : entry.icon;
        if (src) {
            const img = document.createElement('img');
            img.alt = '';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.width = 44;
            img.height = 44;
            if (!available) img.className = 'is-icon';
            img.addEventListener('error', () => img.remove(), { once: true });
            img.src = src;
            tex.appendChild(img);
        }

        const name = document.createElement('span');
        name.className = 'htg-card-name';
        name.textContent = entry.name;

        const id = document.createElement('span');
        id.className = 'htg-card-id';
        id.textContent = entry.id;

        card.append(tex, name, id);

        if (entry.category) {
            const cat = document.createElement('span');
            cat.className = 'htg-card-cat';
            cat.textContent = entry.category;
            card.appendChild(cat);
        }

        const foot = document.createElement('span');
        foot.className = 'htg-card-foot';
        if (available) {
            if (entry.faces.some((f) => f.newer)) {
                const badge = document.createElement('span');
                badge.className = 'htg-badge htg-badge-newer';
                badge.textContent = t('newer_badge');
                foot.appendChild(badge);
            }
            const action = document.createElement('span');
            action.className = 'htg-card-select';
            action.textContent = entry === state.selected ? t('selected') : t('select');
            foot.appendChild(action);
        } else {
            const badge = document.createElement('span');
            badge.className = 'htg-badge htg-badge-off';
            badge.textContent = t('unavailable');
            foot.appendChild(badge);
        }
        card.appendChild(foot);
        return card;
    }

    function renderGrid(append) {
        const list = state.lists[state.tab];
        if (!append) el.grid.textContent = '';
        if (!list) {
            el.stats.textContent = state.dataError ? t('data_error') : t('loading');
            el.unavailableWrap.hidden = true;
            return;
        }

        const available = list.reduce((n, e) => n + (e.faces.length ? 1 : 0), 0);
        const unavailable = list.length - available;
        let stats = state.dataError ? t('data_error') : t('stats', { available, unavailable });
        if (state.query || state.category !== 'all') stats += ' · ' + t('results', { n: state.view.length });
        el.stats.textContent = stats;
        el.unavailableWrap.hidden = unavailable === 0;
        el.unavailableLabel.textContent = t('show_unavailable', { n: unavailable });

        if (!state.view.length) {
            if (!append) el.grid.appendChild(noResults());
            return;
        }

        const start = append ? el.grid.children.length : 0;
        const end = Math.min(state.shown, state.view.length);
        const frag = document.createDocumentFragment();
        for (let i = start; i < end; i++) frag.appendChild(renderCard(state.view[i], i));
        el.grid.appendChild(frag);

        // Too few cards to scroll yet (tall screens): keep filling the list box.
        if (end < state.view.length && el.grid.clientHeight > 0 && el.grid.scrollHeight <= el.grid.clientHeight + 200) {
            state.shown += PAGE_SIZE;
            renderGrid(true);
        }
    }

    function markSelectedCard() {
        el.grid.querySelectorAll('.htg-card[aria-pressed="true"]').forEach((card) => {
            card.setAttribute('aria-pressed', 'false');
            const action = card.querySelector('.htg-card-select');
            if (action) action.textContent = t('select');
        });
        const index = state.view.indexOf(state.selected);
        const card = index === -1 ? null : el.grid.querySelector('.htg-card[data-index="' + index + '"]');
        if (!card) return;
        card.setAttribute('aria-pressed', 'true');
        const action = card.querySelector('.htg-card-select');
        if (action) action.textContent = t('selected');
    }

    function selectEntry(entry) {
        if (!entry || !entry.faces.length) return;
        state.selected = entry;
        state.face = 0;
        markSelectedCard();
        renderSelection();
        // On one-column layouts the panel sits below the whole grid.
        if (window.matchMedia('(max-width: 992px)').matches) {
            el.panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ===== CUSTOM PATH =====
    function normalizePath(raw) {
        let path = String(raw || '').replace(/\\/g, '/').replace(/\s+/g, '');
        path = path.replace(/^minecraft:/i, '').replace(/^\/+/, '');
        path = path.replace(/^(?:.*\/)?assets\/minecraft\/textures\//i, '').replace(/^textures\//i, '');
        while (/\.png$/i.test(path)) path = path.slice(0, -4);
        return path.replace(/\/{2,}/g, '/').replace(/\/+$/, '').toLowerCase();
    }

    function updateCustom() {
        const raw = el.customPath.value.trim();
        const path = normalizePath(raw);
        let message = '';
        let valid = false;
        if (!raw) {
            message = t('custom_empty');
        } else if (!/^[a-z0-9_.-]+(?:\/[a-z0-9_.-]+)*$/.test(path)) {
            message = t('custom_invalid');
        } else {
            valid = true;
            const ref = textureRef(path);
            message = (path !== raw ? t('custom_normalized', { path }) + ' ' : '') + (ref ? t('custom_known') : t('custom_unknown'));
            state.selected = {
                name: t('custom_name'),
                id: path,
                custom: true,
                faces: [ref ? Object.assign(ref, { label: faceLabel('') }) : { path, file: null, newer: false, label: faceLabel('') }]
            };
            state.face = 0;
        }
        if (!valid && state.selected && state.selected.custom) state.selected = null;
        el.customStatus.textContent = message;
        el.customStatus.classList.toggle('is-error', !valid && !!raw);
        renderSelection();
    }

    // ===== SELECTION & PREVIEW =====
    function currentFace() {
        const entry = state.selected;
        return (entry && entry.faces[state.face]) || null;
    }

    function renderSelection() {
        const entry = state.selected;
        const face = currentFace();
        el.empty.hidden = !!entry;
        el.selection.hidden = !entry;
        if (entry) {
            el.name.textContent = entry.name;
            el.path.textContent = face ? face.path : '';
            el.faceField.hidden = entry.faces.length < 2;
            if (entry.faces.length > 1) {
                el.face.textContent = '';
                entry.faces.forEach((f, i) => {
                    const opt = document.createElement('option');
                    opt.value = String(i);
                    opt.textContent = f.label + ' – ' + f.path;
                    el.face.appendChild(opt);
                });
                el.face.value = String(state.face);
            }
            el.newer.hidden = !(face && face.newer);
            if (face && face.newer) el.newer.textContent = t('newer_hint', { latest: state.latest });
            showPreview(entry, face);
        }
        updateCommand();
    }

    let previewToken = 0;
    function showPreview(entry, face) {
        const token = ++previewToken;
        el.previewError.hidden = true;
        if (!face || !face.file) {
            el.preview.hidden = true;
            return;
        }
        const img = new Image();
        img.onload = () => {
            if (token !== previewToken) return;
            el.preview.hidden = false;
            el.texture.src = face.file;
            el.texture.alt = t('preview_alt', { name: entry.name });
            ensureViewer().then((viewer) => {
                if (viewer && token === previewToken) viewer.loadSkin(toSkinCanvas(img));
            });
        };
        img.onerror = () => {
            if (token !== previewToken) return;
            warn('Texture could not be loaded: ' + face.file);
            el.preview.hidden = true;
            el.previewError.hidden = false;
        };
        img.src = face.file;
    }

    // A player head samples its UVs as if the texture were a 64x64 skin, so a
    // 16x16 texture ends up stretched. Doing the same here keeps the preview
    // honest - odd-looking results are what the game shows too.
    function toSkinCanvas(img) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, 64, 64);
        return canvas;
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load ' + src));
            document.head.appendChild(script);
        });
    }

    // skinview3d already ships for the skin pages; it is only fetched here once
    // the first texture is selected.
    let viewerPromise = null;
    let viewerInstance = null;
    function ensureViewer() {
        if (viewerPromise) return viewerPromise;
        viewerPromise = (window.skinview3d ? Promise.resolve() : loadScript(versioned(SKINVIEW_URL)))
            .then(() => {
                const viewer = new window.skinview3d.SkinViewer({ canvas: el.viewer, width: PREVIEW_SIZE, height: PREVIEW_SIZE });
                const player = viewer.playerObject;
                ['body', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'].forEach((part) => {
                    if (player.skin[part]) player.skin[part].visible = false;
                });
                if (player.cape) player.cape.visible = false;
                if (player.elytra) player.elytra.visible = false;
                // Minecraft draws transparent head pixels see-through; skinview3d's
                // opaque base layer would show them black. Same settings as its outer layer.
                const inner = player.skin.head.innerLayer;
                if (inner && inner.material) {
                    inner.material.transparent = true;
                    inner.material.alphaTest = 1e-5;
                    inner.material.side = 2; // THREE.DoubleSide
                    inner.material.needsUpdate = true;
                }
                const head = viewer.camera.position.clone();
                player.skin.head.getWorldPosition(head);
                head.y += 4; // the head group sits on the neck; its cube is 8 px tall
                viewer.controls.target.copy(head);
                viewer.camera.position.set(head.x + 13, head.y + 8, head.z + 18);
                viewer.controls.enableZoom = false;
                viewer.controls.enablePan = false;
                viewer.controls.update();
                viewer.autoRotate = state.autoRotate;
                viewer.autoRotateSpeed = 1.2;
                viewerInstance = viewer;
                return viewer;
            })
            .catch((err) => {
                warn('3D preview unavailable', err);
                el.viewerWrap.hidden = true;
                return null;
            });
        return viewerPromise;
    }

    function updateAnimButton() {
        const icon = el.animBtn.querySelector('i');
        const label = el.animBtn.querySelector('span');
        if (icon) icon.className = 'fas ' + (state.autoRotate ? 'fa-pause' : 'fa-play');
        if (label) label.textContent = state.autoRotate ? t('anim_stop') : t('anim_start');
    }

    // ===== COMMAND =====
    function updateCommand() {
        const face = currentFace();
        const errors = [];
        let target = el.target.value;
        el.targetNameField.hidden = target !== 'custom';
        if (target === 'custom') {
            const name = el.targetName.value.trim();
            if (/^[A-Za-z0-9_]{3,16}$/.test(name)) target = name;
            else errors.push(t('target_invalid'));
        }
        const count = Number(el.count.value);
        if (!Number.isInteger(count) || count < 1 || count > 64) errors.push(t('count_invalid'));
        el.error.hidden = !errors.length;
        el.error.textContent = errors.join(' ');

        let command = '';
        if (face && !errors.length) {
            const fields = ['texture:"' + face.path + '"'];
            // model is only written when the texture is a slim skin or the user asks for it.
            const model = el.model.value === 'auto' ? (face.path.indexOf('/slim/') !== -1 ? 'slim' : '') : el.model.value;
            if (model) fields.push('model:"' + model + '"');
            command = '/give ' + target + ' minecraft:player_head[minecraft:profile={' + fields.join(',') + '}]' + (count > 1 ? ' ' + count : '');
        }
        state.command = command;
        el.command.textContent = command || '–';
        el.copy.disabled = !command;
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

    // ===== INIT =====
    function init() {
        el.grid = document.getElementById('htgGrid');
        if (!el.grid) return;
        el.tabs = Array.from(document.querySelectorAll('.htg-tab'));
        el.listView = document.getElementById('htgListView');
        el.customView = document.getElementById('htgCustomView');
        el.search = document.getElementById('htgSearch');
        el.category = document.getElementById('htgCategory');
        el.stats = document.getElementById('htgStats');
        el.showUnavailable = document.getElementById('htgShowUnavailable');
        el.unavailableWrap = document.getElementById('htgUnavailableWrap');
        el.unavailableLabel = document.getElementById('htgUnavailableLabel');
        el.animBtn = document.getElementById('htgAnimBtn');
        el.customPath = document.getElementById('htgCustomPath');
        el.customStatus = document.getElementById('htgCustomStatus');
        el.panel = document.getElementById('htgPanel');
        el.empty = document.getElementById('htgEmpty');
        el.selection = document.getElementById('htgSelection');
        el.preview = document.getElementById('htgPreview');
        el.viewerWrap = document.getElementById('htgViewerWrap');
        el.viewer = document.getElementById('htgViewer');
        el.texture = document.getElementById('htgTexture');
        el.previewError = document.getElementById('htgPreviewError');
        el.name = document.getElementById('htgName');
        el.path = document.getElementById('htgPath');
        el.newer = document.getElementById('htgNewer');
        el.faceField = document.getElementById('htgFaceField');
        el.face = document.getElementById('htgFace');
        el.target = document.getElementById('htgTarget');
        el.targetNameField = document.getElementById('htgTargetNameField');
        el.targetName = document.getElementById('htgTargetName');
        el.count = document.getElementById('htgCount');
        el.model = document.getElementById('htgModel');
        el.error = document.getElementById('htgError');
        el.command = document.getElementById('htgCommand');
        el.copy = document.getElementById('htgCopy');

        el.tabs.forEach((btn) => btn.addEventListener('click', () => setTab(btn.dataset.tab)));

        let searchTimer = null;
        el.search.addEventListener('input', () => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                state.query = el.search.value.trim().toLowerCase();
                applyFilter();
            }, 150);
        });
        el.category.addEventListener('change', () => {
            state.category = el.category.value;
            applyFilter();
        });
        el.showUnavailable.addEventListener('change', applyFilter);
        // The list is its own scroll box; the next cards arrive before its end.
        el.grid.addEventListener('scroll', () => {
            if (state.shown >= state.view.length) return;
            if (el.grid.scrollTop + el.grid.clientHeight >= el.grid.scrollHeight - 400) {
                state.shown += PAGE_SIZE;
                renderGrid(true);
            }
        }, { passive: true });
        el.animBtn.addEventListener('click', () => {
            state.autoRotate = !state.autoRotate;
            if (viewerInstance) viewerInstance.autoRotate = state.autoRotate;
            updateAnimButton();
        });
        updateAnimButton();
        el.grid.addEventListener('click', (e) => {
            const card = e.target.closest('.htg-card');
            if (card && !card.disabled) selectEntry(state.view[Number(card.dataset.index)]);
        });

        el.customPath.addEventListener('input', updateCustom);
        el.face.addEventListener('change', () => {
            state.face = Number(el.face.value) || 0;
            renderSelection();
        });
        [el.target, el.model].forEach((input) => input.addEventListener('change', updateCommand));
        [el.targetName, el.count].forEach((input) => input.addEventListener('input', updateCommand));
        el.copy.addEventListener('click', () => copyCommand(state.command));

        const examples = document.getElementById('examples');
        if (examples) {
            examples.addEventListener('click', (e) => {
                const btn = e.target.closest('.copy-btn');
                const code = btn && btn.parentElement.querySelector('code');
                if (code) copyCommand(code.textContent.trim());
            });
        }

        state.pending.manifest = fetchJson(MANIFEST_URL)
            .then((data) => {
                state.manifest = (data && data.textures) || {};
                state.files = (data && data.files) || {};
                state.latest = (data && data.checked && data.checked.latest) || '';
            })
            .catch((err) => {
                state.manifest = {};
                state.dataError = true;
                warn('Texture manifest could not be loaded', err);
            })
            .then(buildStaticLists);

        setTab('items');
        updateCommand();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
