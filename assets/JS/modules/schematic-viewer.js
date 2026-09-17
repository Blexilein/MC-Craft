const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_loaded_title: 'Bereit',
        toast_loaded_message: 'Lade eine Schematic hoch oder probier ein Beispiel.',
        toast_error_title: 'Fehler',
        toast_file_title: 'Geladen',
        toast_file_loaded: '{name} wird in 3D angezeigt.',
        toast_copied_title: 'Kopiert',
        toast_list_copied: 'Materialliste kopiert.',
        toast_copy_failed: 'Kopieren hat nicht geklappt.',
        toast_saved_title: 'Gespeichert',
        toast_screenshot: 'Screenshot heruntergeladen.',
        toast_csv: 'Materialliste als CSV heruntergeladen.',
        engine_loading: '3D-Ansicht wird geladen …',
        engine_failed: 'Die 3D-Ansicht konnte nicht geladen werden.',
        no_webgl: 'Dein Browser unterstützt kein WebGL – die 3D-Ansicht ist hier nicht möglich.',
        stage_empty: 'Zieh eine .schem-, .schematic-, .litematic- oder .nbt-Datei hierher.',
        reading: '{name} wird gelesen …',
        building: '{count} Blöcke werden aufgebaut …',
        too_many: 'Diese Struktur hat {count} sichtbare Blöcke – zu viele für die 3D-Ansicht im Browser (höchstens {max}).',
        info_format: 'Format',
        info_size: 'Größe',
        info_blocks: 'Blöcke',
        info_types: 'Blockarten',
        size_value: '{w} × {h} × {l}',
        layer_label: 'Ebene {current} von {total}',
        materials_empty: 'Noch keine Struktur geladen.',
        materials_count: '{n} Sorten',
        stacks: '{stacks} St. + {rest}',
        stacks_even: '{stacks} St.',
        unknown_block: 'Unbekannter Block',
        tooltip_pos: 'Position {x} / {y} / {z}',
        csv_head: 'Item;Anzahl;ID',
        error_UNSUPPORTED_INPUT: 'Diese Datei kann nicht gelesen werden.',
        error_EMPTY_FILE: 'Die Datei ist leer.',
        error_GZIP_UNSUPPORTED: 'Dein Browser unterstützt keine GZip-Dekomprimierung. Bitte aktualisiere deinen Browser.',
        error_DECOMPRESS_FAILED: 'Die Datei konnte nicht entpackt werden – ist es wirklich eine Minecraft-Struktur-Datei?',
        error_NBT_PARSE_FAILED: 'Die Datei enthält kein gültiges NBT – ist es wirklich eine Minecraft-Struktur-Datei?',
        error_UNKNOWN_FORMAT: 'Das Dateiformat konnte nicht erkannt werden (kein .schematic, .schem, .litematic oder .nbt).',
        error_UNSUPPORTED_SCHEM_VERSION: 'Diese .schem-Version wird nicht unterstützt.',
        error_MISSING_BLOCKS_DATA: 'Der Datei fehlen die Block-Daten.',
        error_LEGACY_TABLE_LOAD_FAILED: 'Die Tabelle für alte Block-IDs konnte nicht geladen werden.',
        error_VOLUME_TOO_LARGE: 'Die Struktur ist zu groß für die Ansicht im Browser.',
        error_VARINT_TOO_LONG: 'Die Datei enthält ungültige Daten (Varint zu lang).',
        error_UNKNOWN: 'Ein unerwarteter Fehler ist aufgetreten.'
    },
    en: {
        toast_loaded_title: 'Ready',
        toast_loaded_message: 'Upload a schematic or try an example.',
        toast_error_title: 'Error',
        toast_file_title: 'Loaded',
        toast_file_loaded: 'Showing {name} in 3D.',
        toast_copied_title: 'Copied',
        toast_list_copied: 'Material list copied.',
        toast_copy_failed: 'Copying did not work.',
        toast_saved_title: 'Saved',
        toast_screenshot: 'Screenshot downloaded.',
        toast_csv: 'Material list downloaded as CSV.',
        engine_loading: 'Loading the 3D view …',
        engine_failed: 'The 3D view could not be loaded.',
        no_webgl: 'Your browser does not support WebGL – the 3D view is not available here.',
        stage_empty: 'Drop a .schem, .schematic, .litematic or .nbt file here.',
        reading: 'Reading {name} …',
        building: 'Building {count} blocks …',
        too_many: 'This structure has {count} visible blocks – too many for the 3D view in a browser (at most {max}).',
        info_format: 'Format',
        info_size: 'Size',
        info_blocks: 'Blocks',
        info_types: 'Block types',
        size_value: '{w} × {h} × {l}',
        layer_label: 'Layer {current} of {total}',
        materials_empty: 'No structure loaded yet.',
        materials_count: '{n} kinds',
        stacks: '{stacks} st. + {rest}',
        stacks_even: '{stacks} st.',
        unknown_block: 'Unknown block',
        tooltip_pos: 'Position {x} / {y} / {z}',
        csv_head: 'Item,Count,ID',
        error_UNSUPPORTED_INPUT: "This file can't be read.",
        error_EMPTY_FILE: 'The file is empty.',
        error_GZIP_UNSUPPORTED: "Your browser doesn't support GZip decompression. Please update your browser.",
        error_DECOMPRESS_FAILED: 'The file could not be decompressed – is this really a Minecraft structure file?',
        error_NBT_PARSE_FAILED: "The file doesn't contain valid NBT data – is this really a Minecraft structure file?",
        error_UNKNOWN_FORMAT: 'The file format could not be recognized (not .schematic, .schem, .litematic, or .nbt).',
        error_UNSUPPORTED_SCHEM_VERSION: 'This .schem version is not supported.',
        error_MISSING_BLOCKS_DATA: 'The file is missing its block data.',
        error_LEGACY_TABLE_LOAD_FAILED: 'The table for old block IDs could not be loaded.',
        error_VOLUME_TOO_LARGE: 'This structure is too large for the browser view.',
        error_VARINT_TOO_LONG: 'The file contains invalid data (varint too long).',
        error_UNKNOWN: 'An unexpected error occurred.'
    }
};

(() => {
    const DATA_URL = '/assets/JS/schematic/blocks.json?v=20260916b';
    const LIB_URL = '/assets/JS/vendor/deepslate/deepslate.esm.js?v=20260916b';
    const L = lang === 'en' ? 1 : 0;
    const FORMAT_LABELS = { schematic: '.schematic', schem: '.schem', litematic: '.litematic', nbt: '.nbt' };
    // Never drawn: air and the structure-void marker.
    const HIDDEN = new Set(['air', 'cave_air', 'void_air', 'structure_void']);
    const MAX_BLOCKS = 1000000;
    const CHUNK = 16;
    const FOV = 70 * Math.PI / 180;
    // Blocks that make up one item together, or several items at once.
    const HALF_BLOCKS = /_door$|^(tall_grass|large_fern|sunflower|lilac|rose_bush|peony|pitcher_plant|tall_seagrass|small_dripleaf)$/;

    let ds = null;
    let data = null;
    let resources = null;
    let gl = null;
    let renderer = null;
    let enginePromise = null;
    const el = {};
    const cam = { yaw: -Math.PI / 4, pitch: Math.PI / 6, dist: 20, target: [0, 0, 0], auto: false };
    const scene = {
        size: null, palette: [], grid: null, nbt: new Map(),
        name: '', format: '', maxY: 0, single: false, grid3d: true, hover: null
    };
    let frameQueued = false;
    let lastFrame = 0;

    const byId = (id) => document.getElementById(id);
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const short = (id) => String(id).replace(/^minecraft:/, '');
    const num = (n) => n.toLocaleString(lang);
    const tick = () => new Promise((resolve) => setTimeout(resolve, 30));

    // ---------- engine ----------

    function hexToRgb(hex) {
        return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    }

    // The image goes to WebGL as is; reading canvas pixels back is unreliable in Brave.
    async function loadAtlas(src) {
        const img = new Image();
        img.src = src;
        await img.decode();
        return img;
    }

    function ensureEngine() {
        if (enginePromise) return enginePromise;
        enginePromise = (async () => {
            gl = el.canvas.getContext('webgl', { alpha: true, antialias: true, preserveDrawingBuffer: true });
            if (!gl) throw new Error('no-webgl');
            const [lib, json] = await Promise.all([
                import(LIB_URL),
                fetch(DATA_URL, { cache: 'no-cache' }).then((res) => {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
            ]);
            ds = lib;
            data = json;
            const atlas = new ds.TextureAtlas(await loadAtlas(data.atlas.file + '?v=20260916b'), data.atlas.uv);
            const definitions = {};
            Object.entries(data.blockstates).forEach(([id, def]) => {
                definitions['minecraft:' + id] = ds.BlockDefinition.fromJson(def);
            });
            const models = {};
            Object.entries(data.models).forEach(([id, model]) => {
                models[id] = ds.BlockModel.fromJson(model);
            });
            const flagCache = new Map();
            resources = {
                getBlockDefinition: (id) => definitions[id.toString()],
                getBlockModel: (id) => models[id.toString()],
                getTextureUV: (id) => atlas.getTextureUV(id),
                getTextureAtlas: () => atlas.getTextureAtlas(),
                getPixelSize: () => atlas.getPixelSize(),
                getBlockFlags: (id) => {
                    const key = id.path;
                    if (!flagCache.has(key)) {
                        const f = data.flags[key] || 0;
                        flagCache.set(key, { opaque: !!(f & 1), semi_transparent: !!(f & 2), self_culling: !!(f & 4) });
                    }
                    return flagCache.get(key);
                },
                getBlockProperties: () => null,
                getDefaultBlockProperties: () => null
            };
            Object.values(models).forEach((model) => model.flatten(resources));
            Object.entries(data.tints || {}).forEach(([block, hex]) => {
                const rgb = hexToRgb(hex);
                ds.BlockColors[block] = () => rgb;
            });
            renderExamples();
            return true;
        })();
        return enginePromise;
    }

    // ---------- structure ----------

    function stateFromString(text) {
        const parsed = window.StructureConverter._internals.parseBlockStateString(text);
        return { name: short(parsed.name), properties: parsed.properties || {} };
    }

    // Duck-typed NBT for deepslate's banner renderer: getList('patterns') -> [{getString(key)}].
    function bannerNbt(extra) {
        const tag = extra && extra.get('patterns');
        if (!tag || !tag.value || !Array.isArray(tag.value.items)) return undefined;
        const patterns = tag.value.items.map((map) => ({
            getString: (key) => {
                const v = map.get(key);
                return v && typeof v.value === 'string' ? v.value : '';
            }
        }));
        return { getList: () => patterns };
    }

    function prepareScene(model) {
        const { width: w, height: h, length: l } = model;
        const palette = [];
        const paletteIndex = new Map();
        const addState = (name, properties) => {
            const key = name + JSON.stringify(properties);
            if (!paletteIndex.has(key)) {
                paletteIndex.set(key, palette.length);
                palette.push({ name, properties });
            }
            return paletteIndex.get(key);
        };
        const mapped = model.palette.map((p) => addState(short(p.name), p.properties || {}));
        const entities = new Map();
        (model.blockEntities || []).forEach((be) => entities.set(be.x + '|' + be.y + '|' + be.z, be));

        const grid = new Int32Array(w * h * l);
        const nbt = new Map();
        const used = new Set();
        let count = 0;
        for (let y = 0; y < h; y++) {
            for (let z = 0; z < l; z++) {
                for (let x = 0; x < w; x++) {
                    const idx = x + z * w + y * w * l;
                    let p = mapped[model.blocks[idx]];
                    let state = palette[p];
                    if (state.name === 'jigsaw') {
                        // Generated structures replace jigsaw blocks with their final state.
                        const be = entities.get(x + '|' + y + '|' + z);
                        const final = be && be.extra && be.extra.get('final_state');
                        if (final && typeof final.value === 'string') {
                            const s = stateFromString(final.value);
                            p = addState(s.name, s.properties);
                            state = palette[p];
                        }
                    }
                    if (HIDDEN.has(state.name)) continue;
                    grid[idx] = p + 1;
                    used.add(p);
                    count++;
                    if (/banner$/.test(state.name)) {
                        const be = entities.get(x + '|' + y + '|' + z);
                        const banner = be && bannerNbt(be.extra);
                        if (banner) nbt.set(idx, banner);
                    }
                }
            }
        }
        return { size: [w, h, l], palette, grid, nbt, count, types: used.size };
    }

    function buildStructure() {
        const [w, h, l] = scene.size;
        const blocks = [];
        const top = scene.maxY;
        const bottom = scene.single ? top - 1 : 0;
        for (let y = bottom; y < top; y++) {
            for (let z = 0; z < l; z++) {
                for (let x = 0; x < w; x++) {
                    const idx = x + z * w + y * w * l;
                    const p = scene.grid[idx];
                    if (p) blocks.push({ pos: [x, y, z], state: p - 1, nbt: scene.nbt.get(idx) });
                }
            }
        }
        return new ds.Structure(scene.size, scene.dsPalette, blocks);
    }

    function isVisible(x, y, z) {
        const [w, h, l] = scene.size;
        if (x < 0 || y < 0 || z < 0 || x >= w || y >= h || z >= l) return 0;
        if (y >= scene.maxY || (scene.single && y !== scene.maxY - 1)) return 0;
        return scene.grid[x + z * w + y * w * l];
    }

    // ---------- materials ----------

    function countFor(state) {
        const p = state.properties;
        if (HALF_BLOCKS.test(state.name) && p.half === 'upper') return 0;
        if (/_bed$/.test(state.name) && p.part === 'head') return 0;
        if ((state.name === 'water' || state.name === 'lava') && p.level && p.level !== '0') return 0;
        if (p.type === 'double' && /_slab$/.test(state.name)) return 2;
        const amount = p.candles || p.pickles || p.eggs || p.layers || p.flower_amount || p.segment_amount;
        return amount ? parseInt(amount, 10) || 1 : 1;
    }

    function materials() {
        const perPalette = new Map();
        scene.grid.forEach((p) => {
            if (p) perPalette.set(p - 1, (perPalette.get(p - 1) || 0) + 1);
        });
        const totals = new Map();
        perPalette.forEach((n, p) => {
            const state = scene.palette[p];
            const amount = countFor(state) * n;
            if (!amount) return;
            const block = data.blocks[state.name];
            const key = block && block[2] ? block[2] : state.name;
            totals.set(key, (totals.get(key) || 0) + amount);
        });
        return [...totals.entries()]
            .map(([id, count]) => {
                const item = data.items[id];
                const block = data.blocks[id];
                return { id, count, name: item ? item[L] : block ? block[L] : id, icon: item ? item[2] : null };
            })
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, lang));
    }

    function renderMaterials() {
        const list = scene.materials || [];
        el.materialsCount.textContent = list.length ? t('materials_count', { n: num(list.length) }) : '';
        el.copyList.disabled = el.csvList.disabled = !list.length;
        if (!list.length) {
            el.materials.innerHTML = `<li class="sv-empty">${escapeHtml(t('materials_empty'))}</li>`;
            return;
        }
        el.materials.innerHTML = list.map((m) => {
            const stacks = Math.floor(m.count / 64);
            const rest = m.count % 64;
            const stackText = stacks ? (rest ? t('stacks', { stacks: num(stacks), rest: num(rest) }) : t('stacks_even', { stacks: num(stacks) })) : '';
            const icon = m.icon
                ? `<img src="${escapeHtml(m.icon)}" alt="" loading="lazy"${m.icon.includes('/textures/') ? ' class="is-pixel"' : ''}>`
                : '<i class="fas fa-cube" aria-hidden="true"></i>';
            return `<li class="sv-material" title="minecraft:${escapeHtml(m.id)}">
                <span class="sv-material-icon">${icon}</span>
                <span class="sv-material-name">${escapeHtml(m.name)}</span>
                <span class="sv-material-count"><strong>${num(m.count)}</strong>${stackText ? `<small>${escapeHtml(stackText)}</small>` : ''}</span>
            </li>`;
        }).join('');
    }

    // ---------- camera & drawing ----------

    function viewMatrix() {
        const { mat4 } = ds;
        const m = mat4.create();
        mat4.translate(m, m, [0, 0, -cam.dist]);
        mat4.rotateX(m, m, cam.pitch);
        mat4.rotateY(m, m, cam.yaw);
        mat4.translate(m, m, cam.target.map((v) => -v));
        return m;
    }

    function fitCamera() {
        const [w, h, l] = scene.size;
        const radius = Math.max(2, Math.hypot(w, h, l) / 2);
        cam.target = [w / 2, h / 2, l / 2];
        cam.dist = radius / Math.sin(FOV / 2) * 1.02;
        cam.yaw = -Math.PI / 4;
        cam.pitch = Math.PI / 6;
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.max(1, Math.round(el.canvas.clientWidth * dpr));
        const h = Math.max(1, Math.round(el.canvas.clientHeight * dpr));
        if (el.canvas.width !== w || el.canvas.height !== h) {
            el.canvas.width = w;
            el.canvas.height = h;
        }
        renderer.setViewport(0, 0, w, h);
        // deepslate's far plane is 500 blocks; big builds need more.
        const far = Math.max(500, cam.dist * 4);
        ds.mat4.perspective(renderer.projMatrix, FOV, el.canvas.clientWidth / Math.max(1, el.canvas.clientHeight), 0.1, far);
    }

    function draw(time) {
        frameQueued = false;
        if (!renderer) return;
        if (cam.auto) {
            cam.yaw += Math.min(time - lastFrame, 50) * 0.0004;
            requestDraw();
        }
        lastFrame = time;
        resize();
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const view = viewMatrix();
        renderer.drawStructure(view);
        if (scene.grid3d) renderer.drawGrid(view);
        if (scene.hover) renderer.drawOutline(view, scene.hover);
    }

    function requestDraw() {
        if (frameQueued) return;
        frameQueued = true;
        requestAnimationFrame(draw);
    }

    // Voxel ray march (Amanatides & Woo) from the mouse into the grid.
    function pick(clientX, clientY) {
        const rect = el.canvas.getBoundingClientRect();
        const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ny = 1 - ((clientY - rect.top) / rect.height) * 2;
        const { mat4, vec3 } = ds;
        const inv = mat4.create();
        mat4.multiply(inv, renderer.projMatrix, viewMatrix());
        if (!mat4.invert(inv, inv)) return null;
        const unproject = (z) => {
            const v = [nx, ny, z, 1];
            const out = [0, 0, 0, 0];
            for (let r = 0; r < 4; r++) out[r] = inv[r] * v[0] + inv[4 + r] * v[1] + inv[8 + r] * v[2] + inv[12 + r] * v[3];
            return [out[0] / out[3], out[1] / out[3], out[2] / out[3]];
        };
        const origin = unproject(-1);
        const dir = vec3.normalize([0, 0, 0], vec3.subtract([0, 0, 0], unproject(1), origin));
        const [w, h, l] = scene.size;
        // Enter the bounding box first.
        let tMin = 0;
        let tMax = Infinity;
        const bounds = [w, h, l];
        for (let a = 0; a < 3; a++) {
            if (Math.abs(dir[a]) < 1e-9) {
                if (origin[a] < 0 || origin[a] > bounds[a]) return null;
                continue;
            }
            let t1 = (0 - origin[a]) / dir[a];
            let t2 = (bounds[a] - origin[a]) / dir[a];
            if (t1 > t2) [t1, t2] = [t2, t1];
            tMin = Math.max(tMin, t1);
            tMax = Math.min(tMax, t2);
            if (tMin > tMax) return null;
        }
        const start = origin.map((o, a) => o + dir[a] * (tMin + 1e-4));
        const cell = start.map((v, a) => Math.min(bounds[a] - 1, Math.max(0, Math.floor(v))));
        const step = dir.map((d) => (d > 0 ? 1 : -1));
        const tDelta = dir.map((d) => (Math.abs(d) < 1e-9 ? Infinity : Math.abs(1 / d)));
        const tNext = dir.map((d, a) => {
            if (Math.abs(d) < 1e-9) return Infinity;
            const edge = d > 0 ? cell[a] + 1 : cell[a];
            return (edge - start[a]) / d;
        });
        for (let i = 0; i < w + h + l + 3; i++) {
            if (isVisible(cell[0], cell[1], cell[2])) return cell.slice();
            const a = tNext[0] < tNext[1] ? (tNext[0] < tNext[2] ? 0 : 2) : (tNext[1] < tNext[2] ? 1 : 2);
            cell[a] += step[a];
            if (cell[a] < 0 || cell[a] >= bounds[a]) return null;
            tNext[a] += tDelta[a];
        }
        return null;
    }

    function showTooltip(pos, clientX, clientY) {
        if (!pos) {
            el.tooltip.hidden = true;
            return;
        }
        const state = scene.palette[isVisible(...pos) - 1];
        const block = data.blocks[state.name];
        const props = Object.entries(state.properties).map(([k, v]) => `${k}=${v}`).join(', ');
        el.tooltip.innerHTML = `<strong>${escapeHtml(block ? block[L] : t('unknown_block'))}</strong>
            <span class="sv-tip-id">minecraft:${escapeHtml(state.name)}</span>
            ${props ? `<span class="sv-tip-props">${escapeHtml(props)}</span>` : ''}
            <span class="sv-tip-pos">${escapeHtml(t('tooltip_pos', { x: pos[0], y: pos[1], z: pos[2] }))}</span>`;
        el.tooltip.hidden = false;
        const rect = el.stage.getBoundingClientRect();
        const tw = el.tooltip.offsetWidth;
        const th = el.tooltip.offsetHeight;
        let left = clientX - rect.left + 14;
        let top = clientY - rect.top + 14;
        if (left + tw > rect.width - 6) left = Math.max(6, clientX - rect.left - tw - 14);
        if (top + th > rect.height - 6) top = Math.max(6, clientY - rect.top - th - 14);
        el.tooltip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    }

    // ---------- layers ----------

    function setLayer(value, single) {
        const oldTop = scene.maxY;
        const oldSingle = scene.single;
        scene.maxY = value;
        scene.single = single;
        el.layerLabel.textContent = t('layer_label', { current: num(value), total: num(scene.size[1]) });
        if (!renderer) return;
        const structure = buildStructure();
        // Only the chunks between the old and new visible range change.
        const lows = [oldSingle ? oldTop - 1 : 0, single ? value - 1 : 0];
        const from = Math.floor(Math.max(0, Math.min(oldTop, value, ...lows)) / CHUNK);
        const to = Math.floor(Math.max(oldTop, value) / CHUNK);
        const chunks = [];
        const [w, , l] = scene.size;
        for (let cy = from; cy <= to; cy++) {
            for (let cx = 0; cx * CHUNK < w; cx++) {
                for (let cz = 0; cz * CHUNK < l; cz++) chunks.push([cx, cy, cz]);
            }
        }
        renderer.structure = structure;
        renderer.chunkBuilder.structure = structure;
        renderer.updateStructureBuffers(chunks);
        scene.hover = null;
        requestDraw();
    }

    // ---------- loading ----------

    function setStatus(text, busy) {
        el.status.hidden = !text;
        el.statusText.textContent = text || '';
        el.status.classList.toggle('is-busy', !!busy);
    }

    function showError(err) {
        const code = err && err.code;
        const message = err && err.message === 'no-webgl' ? t('no_webgl')
            : code && I18N[lang]['error_' + code] ? t('error_' + code)
            : err && err.userMessage ? err.userMessage : t('error_UNKNOWN');
        console.error(err);
        setStatus(message, false);
        showToast(t('toast_error_title'), message, 'error');
    }

    async function openStructure(source, name) {
        try {
            setStatus(t('reading', { name }), true);
            await ensureEngine();
            const { model, detected } = await window.StructureConverter.parse(source);
            const prepared = prepareScene(model);
            if (prepared.count > MAX_BLOCKS) {
                const err = new Error('too-many');
                err.userMessage = t('too_many', { count: num(prepared.count), max: num(MAX_BLOCKS) });
                throw err;
            }
            setStatus(t('building', { count: num(prepared.count) }), true);
            await tick();
            Object.assign(scene, prepared, { name, format: detected, maxY: prepared.size[1], single: false, hover: null });
            scene.dsPalette = scene.palette.map((s) => new ds.BlockState('minecraft:' + s.name, { ...s.properties }));
            scene.materials = materials();
            const structure = buildStructure();
            if (renderer) {
                renderer.setStructure(structure);
            } else {
                renderer = new ds.StructureRenderer(gl, structure, resources, { chunkSize: CHUNK, useInvisibleBlockBuffer: false });
                // Sharp pixels up close, no mipmap bleeding between atlas tiles.
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            }
            fitCamera();
            updateInfo(prepared);
            el.layer.max = String(prepared.size[1]);
            el.layer.value = String(prepared.size[1]);
            el.singleLayer.checked = false;
            el.layerLabel.textContent = t('layer_label', { current: num(prepared.size[1]), total: num(prepared.size[1]) });
            renderMaterials();
            el.stage.classList.add('has-structure');
            el.controls.forEach((c) => { c.disabled = false; });
            setStatus('', false);
            requestDraw();
            showToast(t('toast_file_title'), t('toast_file_loaded', { name }), 'success');
        } catch (err) {
            showError(err);
        }
    }

    function updateInfo({ count, types }) {
        const [w, h, l] = scene.size;
        el.fileName.textContent = scene.name;
        el.info.innerHTML = [
            [t('info_format'), FORMAT_LABELS[scene.format] || scene.format],
            [t('info_size'), t('size_value', { w: num(w), h: num(h), l: num(l) })],
            [t('info_blocks'), num(count)],
            [t('info_types'), num(types)]
        ].map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('');
    }

    function renderExamples() {
        el.examples.innerHTML = data.examples.map((ex, i) => `
            <button type="button" class="sv-example" data-example="${i}"><i class="fas fa-cube" aria-hidden="true"></i> <span>${escapeHtml(ex.name[L])}</span></button>`).join('');
    }

    // ---------- export ----------

    function download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function baseName() {
        return (scene.name || 'schematic').replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '_');
    }

    function screenshot() {
        draw(performance.now());
        el.canvas.toBlob((blob) => {
            if (!blob) return;
            download(blob, baseName() + '.png');
            showToast(t('toast_saved_title'), t('toast_screenshot'), 'success');
        }, 'image/png');
    }

    async function copyList() {
        const text = scene.materials.map((m) => `${m.name}: ${m.count}`).join('\n');
        try {
            await navigator.clipboard.writeText(text);
            showToast(t('toast_copied_title'), t('toast_list_copied'), 'success');
        } catch (_) {
            showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
        }
    }

    function csvList() {
        const sep = lang === 'de' ? ';' : ',';
        const quote = (v) => (/[";,\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : v);
        const rows = [t('csv_head')].concat(scene.materials.map((m) => [quote(m.name), m.count, 'minecraft:' + m.id].join(sep)));
        download(new Blob(['﻿' + rows.join('\n')], { type: 'text/csv;charset=utf-8' }), baseName() + '-materials.csv');
        showToast(t('toast_saved_title'), t('toast_csv'), 'success');
    }

    // ---------- input ----------

    function bindCamera() {
        const pointers = new Map();
        let pinch = null;
        const canvas = el.canvas;
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        canvas.addEventListener('pointerdown', (e) => {
            if (!renderer) return;
            canvas.setPointerCapture(e.pointerId);
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, button: e.button, shift: e.shiftKey });
            if (pointers.size === 2) {
                const [a, b] = [...pointers.values()];
                pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), dist: cam.dist, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
            }
        });
        canvas.addEventListener('pointermove', (e) => {
            if (!renderer) return;
            const p = pointers.get(e.pointerId);
            if (!p) {
                if (e.pointerType === 'mouse') {
                    const hit = pick(e.clientX, e.clientY);
                    const changed = String(hit) !== String(scene.hover);
                    scene.hover = hit;
                    showTooltip(hit, e.clientX, e.clientY);
                    if (changed) requestDraw();
                }
                return;
            }
            const dx = e.clientX - p.x;
            const dy = e.clientY - p.y;
            if (pointers.size === 2 && pinch) {
                p.x = e.clientX;
                p.y = e.clientY;
                const [a, b] = [...pointers.values()];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                cam.dist = Math.max(1, pinch.dist * pinch.d / Math.max(1, d));
                const cx = (a.x + b.x) / 2;
                const cy = (a.y + b.y) / 2;
                pan(cx - pinch.cx, cy - pinch.cy);
                pinch.cx = cx;
                pinch.cy = cy;
            } else if (p.button === 2 || p.button === 1 || p.shift) {
                pan(dx, dy);
            } else {
                cam.yaw += dx * 0.008;
                cam.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, cam.pitch + dy * 0.008));
            }
            p.x = e.clientX;
            p.y = e.clientY;
            scene.hover = null;
            el.tooltip.hidden = true;
            requestDraw();
        });
        const end = (e) => {
            pointers.delete(e.pointerId);
            if (pointers.size < 2) pinch = null;
        };
        canvas.addEventListener('pointerup', end);
        canvas.addEventListener('pointercancel', end);
        canvas.addEventListener('pointerleave', () => {
            if (scene.hover) {
                scene.hover = null;
                requestDraw();
            }
            el.tooltip.hidden = true;
        });
        canvas.addEventListener('wheel', (e) => {
            if (!renderer) return;
            e.preventDefault();
            cam.dist = Math.max(1, cam.dist * Math.exp(e.deltaY * 0.0012));
            requestDraw();
        }, { passive: false });
        canvas.addEventListener('keydown', (e) => {
            if (!renderer) return;
            const keys = { ArrowLeft: () => { cam.yaw -= 0.1; }, ArrowRight: () => { cam.yaw += 0.1; },
                ArrowUp: () => { cam.pitch = Math.min(Math.PI / 2 - 0.01, cam.pitch + 0.1); },
                ArrowDown: () => { cam.pitch = Math.max(-Math.PI / 2 + 0.01, cam.pitch - 0.1); },
                '+': () => { cam.dist = Math.max(1, cam.dist * 0.9); }, '-': () => { cam.dist *= 1.1; } };
            if (!keys[e.key]) return;
            e.preventDefault();
            keys[e.key]();
            requestDraw();
        });
        new ResizeObserver(() => requestDraw()).observe(el.stage);
    }

    function pan(dx, dy) {
        // Move the orbit centre along the screen axes, scaled to the distance.
        const scale = cam.dist * 2 * Math.tan(FOV / 2) / Math.max(1, el.canvas.clientHeight);
        const cy = Math.cos(cam.yaw);
        const sy = Math.sin(cam.yaw);
        const sp = Math.sin(cam.pitch);
        const cp = Math.cos(cam.pitch);
        const right = [cy, 0, sy];
        const up = [sy * sp, cp, -cy * sp];
        for (let a = 0; a < 3; a++) cam.target[a] += (-dx * right[a] + dy * up[a]) * scale;
    }

    function bind() {
        const pickFile = (file) => {
            if (file) openStructure(file, file.name);
        };
        el.fileInput.addEventListener('change', () => {
            pickFile(el.fileInput.files[0]);
            el.fileInput.value = '';
        });
        el.dropzone.addEventListener('click', () => el.fileInput.click());
        el.dropzone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.fileInput.click();
            }
        });
        [el.dropzone, el.stage].forEach((zone) => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('is-dragover');
            });
            zone.addEventListener('dragleave', () => zone.classList.remove('is-dragover'));
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('is-dragover');
                pickFile(e.dataTransfer.files[0]);
            });
        });
        el.examples.addEventListener('click', async (e) => {
            const btn = e.target.closest('[data-example]');
            if (!btn) return;
            const ex = data.examples[Number(btn.dataset.example)];
            try {
                const res = await fetch(ex.file);
                if (!res.ok) throw new Error('HTTP ' + res.status);
                openStructure(new Uint8Array(await res.arrayBuffer()), ex.name[L] + '.nbt');
            } catch (err) {
                showError(err);
            }
        });
        let layerTimer = 0;
        const layerChanged = () => {
            clearTimeout(layerTimer);
            el.layerLabel.textContent = t('layer_label', { current: num(Number(el.layer.value)), total: num(scene.size ? scene.size[1] : 0) });
            layerTimer = setTimeout(() => setLayer(Number(el.layer.value), el.singleLayer.checked), 60);
        };
        el.layer.addEventListener('input', layerChanged);
        el.singleLayer.addEventListener('change', layerChanged);
        el.resetView.addEventListener('click', () => {
            fitCamera();
            requestDraw();
        });
        el.autoRotate.addEventListener('click', () => {
            cam.auto = !cam.auto;
            el.autoRotate.setAttribute('aria-pressed', String(cam.auto));
            el.autoRotate.classList.toggle('active', cam.auto);
            requestDraw();
        });
        el.gridToggle.addEventListener('click', () => {
            scene.grid3d = !scene.grid3d;
            el.gridToggle.setAttribute('aria-pressed', String(scene.grid3d));
            el.gridToggle.classList.toggle('active', scene.grid3d);
            requestDraw();
        });
        el.screenshot.addEventListener('click', screenshot);
        el.copyList.addEventListener('click', copyList);
        el.csvList.addEventListener('click', csvList);
        bindCamera();
    }

    function collectElements() {
        Object.assign(el, {
            app: byId('schematicApp'),
            dropzone: byId('svDropzone'),
            fileInput: byId('svFile'),
            examples: byId('svExamples'),
            stage: byId('svStage'),
            canvas: byId('svCanvas'),
            status: byId('svStatus'),
            statusText: byId('svStatusText'),
            tooltip: byId('svTooltip'),
            fileName: byId('svFileName'),
            info: byId('svInfo'),
            layer: byId('svLayer'),
            layerLabel: byId('svLayerLabel'),
            singleLayer: byId('svSingleLayer'),
            resetView: byId('svResetView'),
            autoRotate: byId('svAutoRotate'),
            gridToggle: byId('svGrid'),
            screenshot: byId('svScreenshot'),
            materials: byId('svMaterials'),
            materialsCount: byId('svMaterialsCount'),
            copyList: byId('svCopyList'),
            csvList: byId('svCsvList')
        });
        el.controls = [el.layer, el.singleLayer, el.resetView, el.autoRotate, el.gridToggle, el.screenshot];
    }

    async function init() {
        collectElements();
        if (!el.app || !window.StructureConverter) return;
        bind();
        renderMaterials();
        el.controls.forEach((c) => { c.disabled = true; });
        setStatus(t('engine_loading'), true);
        try {
            await ensureEngine();
            setStatus(t('stage_empty'), false);
        } catch (err) {
            enginePromise = null;
            if (err && err.message === 'no-webgl') showError(err);
            else {
                console.error(err);
                setStatus(t('engine_failed'), false);
                showToast(t('toast_error_title'), t('engine_failed'), 'error');
            }
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
