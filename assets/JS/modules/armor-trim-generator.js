const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_loaded_title: 'Bereit',
        toast_loaded_message: 'Stell dir deine Rüstung zusammen.',
        toast_error_title: 'Fehler',
        toast_data_failed: 'Die Besatz-Daten konnten nicht geladen werden.',
        toast_copied_title: 'Kopiert',
        toast_command_copied: 'Befehl kopiert.',
        toast_commands_copied: 'Alle Befehle kopiert.',
        toast_copy_failed: 'Kopieren hat nicht geklappt.',
        toast_saved_title: 'Gespeichert',
        toast_screenshot: 'Bild heruntergeladen.',
        loading: 'Rüstung wird geladen …',
        no_webgl: 'Dein Browser unterstützt kein WebGL – die 3D-Vorschau ist hier nicht möglich.',
        slot_all: 'Alle Teile',
        slot_helmet: 'Helm',
        slot_chestplate: 'Brustpanzer',
        slot_leggings: 'Hose',
        slot_boots: 'Stiefel',
        armor_none: 'Keine',
        armor_leather: 'Leder',
        armor_chainmail: 'Kette',
        armor_copper: 'Kupfer',
        armor_iron: 'Eisen',
        armor_golden: 'Gold',
        armor_diamond: 'Diamant',
        armor_netherite: 'Netherit',
        armor_turtle: 'Schildkröte',
        pattern_none: 'Kein Besatz',
        turtle_only_helmet: 'Den Schildkrötenpanzer gibt es nur als Helm.',
        summary_empty: 'nicht angelegt',
        summary_plain: 'ohne Besatz',
        cmd_give: '/give – {slot}',
        cmd_stand: 'Rüstungsständer mit allem',
        cmd_none: 'Leg mindestens ein Rüstungsteil an.',
        chance: '{p} pro Truhe',
        chance_brush: '{p} pro Fund',
        chance_drop: '{p} Drop-Chance',
        chance_vault: '{p} pro Tresor',
        copy_recipe: 'Kopieren: 7 Diamanten + Vorlage + {material} → 2 Vorlagen',
        show_recipe: 'Rezept ansehen',
        apply_pattern: 'Übernehmen',
        leather_color: 'Lederfarbe',
        reset_color: 'Standardfarbe',
        skin_steve: 'Steve',
        skin_alex: 'Alex'
    },
    en: {
        toast_loaded_title: 'Ready',
        toast_loaded_message: 'Put together your armor.',
        toast_error_title: 'Error',
        toast_data_failed: 'The trim data could not be loaded.',
        toast_copied_title: 'Copied',
        toast_command_copied: 'Command copied.',
        toast_commands_copied: 'All commands copied.',
        toast_copy_failed: 'Copying did not work.',
        toast_saved_title: 'Saved',
        toast_screenshot: 'Image downloaded.',
        loading: 'Loading armor …',
        no_webgl: 'Your browser does not support WebGL – the 3D preview is not available here.',
        slot_all: 'All pieces',
        slot_helmet: 'Helmet',
        slot_chestplate: 'Chestplate',
        slot_leggings: 'Leggings',
        slot_boots: 'Boots',
        armor_none: 'None',
        armor_leather: 'Leather',
        armor_chainmail: 'Chainmail',
        armor_copper: 'Copper',
        armor_iron: 'Iron',
        armor_golden: 'Gold',
        armor_diamond: 'Diamond',
        armor_netherite: 'Netherite',
        armor_turtle: 'Turtle',
        pattern_none: 'No trim',
        turtle_only_helmet: 'The turtle shell only exists as a helmet.',
        summary_empty: 'not worn',
        summary_plain: 'no trim',
        cmd_give: '/give – {slot}',
        cmd_stand: 'Armor stand with everything',
        cmd_none: 'Put on at least one armor piece.',
        chance: '{p} per chest',
        chance_brush: '{p} per find',
        chance_drop: '{p} drop chance',
        chance_vault: '{p} per vault',
        copy_recipe: 'Copy: 7 diamonds + template + {material} → 2 templates',
        show_recipe: 'View recipe',
        apply_pattern: 'Apply',
        leather_color: 'Leather color',
        reset_color: 'Default color',
        skin_steve: 'Steve',
        skin_alex: 'Alex'
    }
};

(() => {
    const DATA_URL = '/assets/JS/armor-trims/trims.json?v=20260916b';
    const THREE_URL = '/assets/JS/vendor/three.module.min.js';
    const L = lang === 'en' ? 1 : 0;
    const SLOTS = ['helmet', 'chestplate', 'leggings', 'boots'];
    const EQUIP_KEYS = { helmet: 'head', chestplate: 'chest', leggings: 'legs', boots: 'feet' };
    const RECIPES_PAGE = lang === 'en' ? '/blog/en/crafting-recipes.html' : '/blog/de/crafting-rezepte.html';

    let data = null;
    const state = {
        target: 'all',
        skin: 'steve',
        rotate: false,
        slots: Object.fromEntries(SLOTS.map((s) => [s, { armor: 'diamond', pattern: 'sentry', material: 'gold', color: null }]))
    };
    const el = {};
    const images = new Map();
    const canvases = new Map();

    const byId = (id) => document.getElementById(id);
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const armorById = (id) => data.armors.find((a) => a.id === id);
    const patternById = (id) => data.patterns.find((p) => p.id === id);
    const materialById = (id) => data.materials.find((m) => m.id === id);
    const itemName = (id) => (data.items[id] ? data.items[id][L] : id);
    const pixelClass = (src) => (src && src.includes('/textures/') ? ' class="is-pixel"' : '');

    // ---------- textures ----------

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

    // Leather dye as a multiply tint, drawn with canvas blending only: reading pixels back
    // is unreliable in browsers that add noise against fingerprinting (Brave).
    async function tinted(src, hex) {
        const key = 'tint|' + src + '|' + hex;
        if (!canvases.has(key)) {
            canvases.set(key, (async () => {
                const img = await loadImage(src);
                const c = document.createElement('canvas');
                c.width = img.naturalWidth;
                c.height = img.naturalHeight;
                const g = c.getContext('2d');
                g.drawImage(img, 0, 0);
                g.globalCompositeOperation = 'multiply';
                g.fillStyle = hex;
                g.fillRect(0, 0, c.width, c.height);
                g.globalCompositeOperation = 'destination-in';
                g.drawImage(img, 0, 0);
                return c;
            })());
        }
        return canvases.get(key);
    }

    // Pre-coloured trims from the build script's sprite sheets.
    async function trimSprite(patternId, layer, palette) {
        const sheet = data.trim_sheets;
        const [w, h] = sheet.size;
        const col = data.patterns.findIndex((p) => p.id === patternId);
        const row = sheet.layers.indexOf(layer);
        return { img: await loadImage(sheet.files[palette]), sx: col * w, sy: row * h, w, h };
    }

    async function itemTrimSprite(slot, palette) {
        const sheet = data.item_sheet;
        return { img: await loadImage(sheet.file), sx: sheet.palettes.indexOf(palette) * 16, sy: sheet.slots.indexOf(slot) * 16, w: 16, h: 16 };
    }

    function drawSprite(g, s) {
        g.drawImage(s.img, s.sx, s.sy, s.w, s.h, 0, 0, s.w, s.h);
    }

    function paletteFor(armor, materialId) {
        return armor.overrides[materialId] || materialById(materialId).palette;
    }

    // One piece's worn texture (64×32): armor layers, then the trim on top.
    async function pieceTexture(slot, layer) {
        const cfg = state.slots[slot];
        const armor = armorById(cfg.armor);
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 32;
        const g = canvas.getContext('2d');
        if (!armor || !armor.layers[layer]) return canvas;
        for (const part of armor.layers[layer]) {
            g.drawImage(part.dye ? await tinted(part.texture, cfg.color || part.dye) : await loadImage(part.texture), 0, 0);
        }
        if (patternById(cfg.pattern)) drawSprite(g, await trimSprite(cfg.pattern, layer, paletteFor(armor, cfg.material)));
        return canvas;
    }

    // Inventory icon (16×16) of a piece with its trim.
    async function itemIcon(slot, cfg = state.slots[slot]) {
        const armor = armorById(cfg.armor);
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 16;
        const g = canvas.getContext('2d');
        const piece = armor && armor.slots[slot];
        if (!piece) return canvas;
        const dye = armor.layers.humanoid && armor.layers.humanoid[0].dye;
        for (const [i, src] of piece.textures.entries()) {
            g.drawImage(i === 0 && dye ? await tinted(src, cfg.color || dye) : await loadImage(src), 0, 0);
        }
        if (patternById(cfg.pattern)) drawSprite(g, await itemTrimSprite(slot, paletteFor(armor, cfg.material)));
        return canvas;
    }

    // ---------- 3D preview ----------

    const view = { THREE: null, renderer: null, scene: null, camera: null, player: null, parts: {}, yaw: 0, pitch: 0.08, dist: 56, raf: 0, last: 0 };

    // Minecraft box UVs (skinview3d layout): face order +x, -x, +y, -y, +z, -z.
    function boxGeometry(w, h, d, u, v, texW, texH, inflate, mirror) {
        const { BoxGeometry } = view.THREE;
        const geo = new BoxGeometry(w + inflate * 2, h + inflate * 2, d + inflate * 2);
        // A hair inside each face, so nearest sampling never picks the neighbouring texel (thin lines at edges).
        const e = 0.01;
        const face = (x1, y1, x2, y2) => {
            [x1, x2, y1, y2] = [x1 + e, x2 - e, y1 + e, y2 - e];
            if (mirror) [x1, x2] = [x2, x1];
            return [[x1 / texW, 1 - y2 / texH], [x2 / texW, 1 - y2 / texH], [x2 / texW, 1 - y1 / texH], [x1 / texW, 1 - y1 / texH]];
        };
        const top = face(u + d, v, u + w + d, v + d);
        const bottom = face(u + w + d, v, u + w * 2 + d, v + d);
        let left = face(u, v + d, u + d, v + d + h);
        const front = face(u + d, v + d, u + w + d, v + d + h);
        let right = face(u + w + d, v + d, u + w + d * 2, v + h + d);
        const back = face(u + w + d * 2, v + d, u + w * 2 + d * 2, v + h + d);
        if (mirror) [left, right] = [right, left];
        const q = (f) => [f[3], f[2], f[0], f[1]];
        const order = [q(right), q(left), q(top), [bottom[0], bottom[1], bottom[3], bottom[2]], q(front), q(back)];
        const uv = [];
        order.forEach((f) => f.forEach(([x, y]) => uv.push(x, y)));
        geo.setAttribute('uv', new view.THREE.Float32BufferAttribute(uv, 2));
        return geo;
    }

    function texture(canvas) {
        const t = new view.THREE.CanvasTexture(canvas);
        t.magFilter = view.THREE.NearestFilter;
        t.minFilter = view.THREE.NearestFilter;
        t.colorSpace = view.THREE.SRGBColorSpace;
        t.generateMipmaps = false;
        return t;
    }

    function material(tex) {
        return new view.THREE.MeshLambertMaterial({ map: tex, alphaTest: 0.5, side: view.THREE.FrontSide });
    }

    // [part, size, centre, skin uv, overlay uv, overlay inflate, mirror for armor]
    function rigFor(slim) {
        const arm = slim ? 3 : 4;
        const armX = slim ? 5.5 : 6;
        return {
            head: { size: [8, 8, 8], pos: [0, 28, 0], skin: [0, 0], overlay: [32, 0], inflate: 0.5 },
            body: { size: [8, 12, 4], pos: [0, 18, 0], skin: [16, 16], overlay: [16, 32], inflate: 0.25 },
            rightArm: { size: [arm, 12, 4], pos: [-armX, 18, 0], skin: [40, 16], overlay: [40, 32], inflate: 0.25, pivot: [-armX, 22, 0], tilt: 0.06 },
            leftArm: { size: [arm, 12, 4], pos: [armX, 18, 0], skin: [32, 48], overlay: [48, 48], inflate: 0.25, pivot: [armX, 22, 0], tilt: -0.06 },
            rightLeg: { size: [4, 12, 4], pos: [-1.9, 6, 0], skin: [0, 16], overlay: [0, 32], inflate: 0.25 },
            leftLeg: { size: [4, 12, 4], pos: [1.9, 6, 0], skin: [16, 48], overlay: [0, 48], inflate: 0.25 }
        };
    }

    // Armor boxes per piece: [part, layer, uv, inflate, mirror]; armor arms are always 4 wide.
    const ARMOR_BOXES = {
        helmet: [['head', 'humanoid', [0, 0], 1, false, [8, 8, 8]]],
        chestplate: [['body', 'humanoid', [16, 16], 1, false, [8, 12, 4]], ['rightArm', 'humanoid', [40, 16], 1, false, [4, 12, 4]], ['leftArm', 'humanoid', [40, 16], 1, true, [4, 12, 4]]],
        leggings: [['body', 'humanoid_leggings', [16, 16], 0.5, false, [8, 12, 4]], ['rightLeg', 'humanoid_leggings', [0, 16], 0.5, false, [4, 12, 4]], ['leftLeg', 'humanoid_leggings', [0, 16], 0.5, true, [4, 12, 4]]],
        boots: [['rightLeg', 'humanoid', [0, 16], 1, false, [4, 12, 4]], ['leftLeg', 'humanoid', [0, 16], 1, true, [4, 12, 4]]]
    };

    async function buildPlayer() {
        const THREE = view.THREE;
        if (view.player) {
            view.scene.remove(view.player);
            view.player.traverse((o) => {
                if (o.geometry) o.geometry.dispose();
                if (o.material) {
                    if (o.material.map) o.material.map.dispose();
                    o.material.dispose();
                }
            });
        }
        const slim = state.skin === 'alex';
        const rig = rigFor(slim);
        const skinImg = await loadImage(data.skins[state.skin]);
        const skinCanvas = document.createElement('canvas');
        skinCanvas.width = skinCanvas.height = 64;
        skinCanvas.getContext('2d').drawImage(skinImg, 0, 0);
        const skinMat = material(texture(skinCanvas));
        const player = new THREE.Group();
        const groups = {};
        Object.entries(rig).forEach(([name, part]) => {
            const group = new THREE.Group();
            const pivot = part.pivot || part.pos;
            group.position.set(...pivot);
            if (part.tilt) group.rotation.z = part.tilt;
            const offset = part.pos.map((v, i) => v - pivot[i]);
            const base = new THREE.Mesh(boxGeometry(...part.size, ...part.skin, 64, 64, 0, false), skinMat);
            base.position.set(...offset);
            const over = new THREE.Mesh(boxGeometry(...part.size, ...part.overlay, 64, 64, part.inflate, false), skinMat);
            over.position.set(...offset);
            group.add(base, over);
            group.userData.offset = offset;
            groups[name] = group;
            player.add(group);
        });
        const textures = {};
        for (const slot of SLOTS) {
            if (!armorById(state.slots[slot].armor)) continue;
            for (const [partName, layer, uv, inflate, mirror, size] of ARMOR_BOXES[slot]) {
                const key = slot + '|' + layer;
                if (!textures[key]) textures[key] = material(texture(await pieceTexture(slot, layer)));
                const armorSize = partName.endsWith('Arm') ? [4, 12, 4] : size;
                const mesh = new THREE.Mesh(boxGeometry(...armorSize, ...uv, 64, 32, inflate, mirror), textures[key]);
                const group = groups[partName];
                const offset = [...group.userData.offset];
                if (partName.endsWith('Arm') && slim) offset[0] += partName === 'rightArm' ? -0.5 : 0.5;
                mesh.position.set(...offset);
                group.add(mesh);
            }
        }
        player.position.y = -16;
        view.player = player;
        view.scene.add(player);
        requestFrame();
    }

    function updateCamera() {
        const { camera } = view;
        const cp = Math.cos(view.pitch);
        camera.position.set(Math.sin(view.yaw) * cp * view.dist, Math.sin(view.pitch) * view.dist, Math.cos(view.yaw) * cp * view.dist);
        camera.lookAt(0, 0, 0);
    }

    function frame(time) {
        view.raf = 0;
        if (!view.renderer) return;
        const canvas = view.renderer.domElement;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (canvas.width !== Math.round(w * view.renderer.getPixelRatio()) || canvas.height !== Math.round(h * view.renderer.getPixelRatio())) {
            view.renderer.setSize(w, h, false);
            view.camera.aspect = w / Math.max(1, h);
            view.camera.updateProjectionMatrix();
        }
        if (state.rotate) {
            view.yaw += Math.min(time - (view.last || time), 50) * 0.0006;
            requestFrame();
        }
        view.last = time;
        updateCamera();
        view.renderer.render(view.scene, view.camera);
    }

    function requestFrame() {
        if (!view.raf) view.raf = requestAnimationFrame(frame);
    }

    async function initView() {
        view.THREE = await import(THREE_URL);
        const THREE = view.THREE;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: el.canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
        } catch (_) {
            throw new Error('no-webgl');
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 1.9));
        const sun = new THREE.DirectionalLight(0xffffff, 1.3);
        sun.position.set(30, 60, 50);
        scene.add(sun);
        const fill = new THREE.DirectionalLight(0xffffff, 0.5);
        fill.position.set(-40, 20, -30);
        scene.add(fill);
        Object.assign(view, { renderer, scene, camera: new THREE.PerspectiveCamera(40, 1, 1, 1000) });
        bindOrbit();
        new ResizeObserver(requestFrame).observe(el.canvas);
        await buildPlayer();
    }

    function bindOrbit() {
        const canvas = el.canvas;
        let drag = null;
        canvas.addEventListener('pointerdown', (e) => {
            canvas.setPointerCapture(e.pointerId);
            drag = { x: e.clientX, y: e.clientY };
        });
        canvas.addEventListener('pointermove', (e) => {
            if (!drag) return;
            view.yaw -= (e.clientX - drag.x) * 0.01;
            view.pitch = Math.max(-1.2, Math.min(1.2, view.pitch + (e.clientY - drag.y) * 0.01));
            drag = { x: e.clientX, y: e.clientY };
            requestFrame();
        });
        const stop = () => { drag = null; };
        canvas.addEventListener('pointerup', stop);
        canvas.addEventListener('pointercancel', stop);
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            view.dist = Math.max(28, Math.min(110, view.dist * Math.exp(e.deltaY * 0.001)));
            requestFrame();
        }, { passive: false });
    }

    // ---------- UI ----------

    function targets() {
        return state.target === 'all' ? SLOTS : [state.target];
    }

    function current() {
        return state.slots[targets()[0]];
    }

    function renderTargets() {
        el.targets.innerHTML = ['all', ...SLOTS].map((slot) => {
            const cfg = slot === 'all' ? null : state.slots[slot];
            const summary = !cfg ? '' : !armorById(cfg.armor) ? t('summary_empty')
                : patternById(cfg.pattern) ? `${patternById(cfg.pattern).name[L].replace(/-?Rüstungsbesatz$| Armor Trim$/, '')} · ${materialById(cfg.material).name[L].replace(/ Material$/, '')}` : t('summary_plain');
            const on = state.target === slot;
            return `<button type="button" class="at-target${on ? ' active' : ''}" data-target="${slot}" aria-pressed="${on}">
                ${slot === 'all' ? '<span class="at-target-icon"><i class="fas fa-layer-group" aria-hidden="true"></i></span>' : `<canvas class="at-target-icon is-pixel" width="16" height="16" data-icon="${slot}" aria-hidden="true"></canvas>`}
                <span class="at-target-text"><strong>${escapeHtml(t('slot_' + slot))}</strong>${summary ? `<small>${escapeHtml(summary)}</small>` : ''}</span>
            </button>`;
        }).join('');
        el.targets.querySelectorAll('canvas[data-icon]').forEach(async (c) => {
            const icon = await itemIcon(c.dataset.icon);
            c.getContext('2d').clearRect(0, 0, 16, 16);
            c.getContext('2d').drawImage(icon, 0, 0);
        });
    }

    function renderArmors() {
        const cfg = current();
        const chestIcon = (a) => {
            const piece = a.slots.chestplate || a.slots.helmet;
            const src = data.items[piece.item][2];
            return `<img src="${escapeHtml(src)}" alt=""${pixelClass(src)}>`;
        };
        el.armors.innerHTML = [`<button type="button" class="at-chip${!armorById(cfg.armor) ? ' active' : ''}" data-armor="none"><span class="at-chip-icon"><i class="fas fa-ban" aria-hidden="true"></i></span><span>${escapeHtml(t('armor_none'))}</span></button>`]
            .concat(data.armors.map((a) => {
                const disabled = state.target !== 'helmet' && state.target !== 'all' && !a.slots[state.target];
                return `<button type="button" class="at-chip${cfg.armor === a.id ? ' active' : ''}" data-armor="${a.id}"${disabled ? ' disabled' : ''} title="${escapeHtml(a.id === 'turtle' ? t('turtle_only_helmet') : '')}">
                    <span class="at-chip-icon">${chestIcon(a)}</span><span>${escapeHtml(t('armor_' + a.id))}</span></button>`;
            })).join('');
        const leather = targets().some((s) => state.slots[s].armor === 'leather');
        el.colorRow.hidden = !leather;
        if (leather) el.color.value = cfg.color || armorById('leather').layers.humanoid[0].dye;
    }

    function renderPatterns() {
        const cfg = current();
        el.patterns.innerHTML = [`<button type="button" class="at-pattern${!patternById(cfg.pattern) ? ' active' : ''}" data-pattern="none"><span class="at-pattern-icon"><i class="fas fa-ban" aria-hidden="true"></i></span><span>${escapeHtml(t('pattern_none'))}</span></button>`]
            .concat(data.patterns.map((p) => {
                const src = data.items[p.template][2];
                return `<button type="button" class="at-pattern${cfg.pattern === p.id ? ' active' : ''}" data-pattern="${p.id}">
                    <span class="at-pattern-icon"><img src="${escapeHtml(src)}" alt=""${pixelClass(src)}></span>
                    <span>${escapeHtml(p.name[L].replace(/-?Rüstungsbesatz$| Armor Trim$/, ''))}</span></button>`;
            })).join('');
    }

    function renderMaterials() {
        const cfg = current();
        el.materials.innerHTML = data.materials.map((m) => {
            const src = data.items[m.item][2];
            return `<button type="button" class="at-material${cfg.material === m.id ? ' active' : ''}" data-material="${m.id}" style="--swatch:${m.color}" title="${escapeHtml(itemName(m.item))}">
                <span class="at-material-icon"><img src="${escapeHtml(src)}" alt=""${pixelClass(src)}></span>
                <span>${escapeHtml(m.name[L].replace(/ Material$/, ''))}</span></button>`;
        }).join('');
    }

    async function renderItems() {
        const cards = await Promise.all(SLOTS.map(async (slot) => {
            const cfg = state.slots[slot];
            const armor = armorById(cfg.armor);
            const pattern = patternById(cfg.pattern);
            const piece = armor && armor.slots[slot];
            return { slot, name: piece ? itemName(piece.item) : t('summary_empty'), pattern, material: materialById(cfg.material), icon: piece ? await itemIcon(slot) : null };
        }));
        el.items.innerHTML = '';
        cards.forEach((c) => {
            const card = document.createElement('div');
            card.className = 'at-item' + (c.icon ? '' : ' is-empty');
            const slot = document.createElement('span');
            slot.className = 'at-item-slot';
            if (c.icon) {
                c.icon.className = 'is-pixel';
                slot.appendChild(c.icon);
            }
            card.appendChild(slot);
            card.insertAdjacentHTML('beforeend', `<span class="at-item-text"><strong>${escapeHtml(c.name)}</strong>
                ${c.icon && c.pattern ? `<small class="at-item-trim" style="--swatch:${c.material.color}">${escapeHtml(c.pattern.name[L])}</small><small>${escapeHtml(c.material.name[L])}</small>` : ''}</span>`);
            el.items.appendChild(card);
        });
    }

    // ---------- commands ----------

    function components(slot) {
        const cfg = state.slots[slot];
        const armor = armorById(cfg.armor);
        const parts = {};
        if (patternById(cfg.pattern)) parts.trim = `{pattern:"minecraft:${cfg.pattern}",material:"minecraft:${cfg.material}"}`;
        const dye = armor.layers.humanoid && armor.layers.humanoid[0].dye;
        if (dye && cfg.color && cfg.color.toUpperCase() !== dye.toUpperCase()) parts.dyed_color = String(parseInt(cfg.color.slice(1), 16));
        return parts;
    }

    function buildCommands() {
        const who = (el.who.value || '@p').trim();
        const worn = SLOTS.filter((s) => armorById(state.slots[s].armor) && armorById(state.slots[s].armor).slots[s]);
        const list = worn.map((slot) => {
            const item = armorById(state.slots[slot].armor).slots[slot].item;
            const parts = components(slot);
            const comp = Object.entries(parts).map(([k, v]) => `${k}=${v}`).join(',');
            return { label: t('cmd_give', { slot: t('slot_' + slot) }), cmd: `/give ${who} ${item}${comp ? `[${comp}]` : ''}` };
        });
        if (worn.length) {
            const equipment = worn.map((slot) => {
                const item = armorById(state.slots[slot].armor).slots[slot].item;
                const parts = components(slot);
                const comp = Object.entries(parts).map(([k, v]) => `"minecraft:${k}":${v}`).join(',');
                return `${EQUIP_KEYS[slot]}:{id:"minecraft:${item}"${comp ? `,components:{${comp}}` : ''}}`;
            }).join(',');
            list.push({ label: t('cmd_stand'), cmd: `/summon armor_stand ~ ~ ~ {ShowArms:1b,equipment:{${equipment}}}`, wide: true });
        }
        return list;
    }

    function renderCommands() {
        const list = buildCommands();
        el.commands.innerHTML = list.length ? list.map((c, i) => `
            <div class="at-cmd${c.wide ? ' at-cmd--wide' : ''}">
                <span class="at-cmd-label">${escapeHtml(c.label)}</span>
                <div class="at-cmd-row"><code>${escapeHtml(c.cmd)}</code>
                <button type="button" class="at-copy" data-cmd="${i}" aria-label="${escapeHtml(t('toast_command_copied'))}"><i class="fas fa-copy" aria-hidden="true"></i></button></div>
            </div>`).join('') : `<p class="at-empty">${escapeHtml(t('cmd_none'))}</p>`;
        el.commands._list = list;
        el.copyAll.disabled = !list.length;
    }

    // ---------- gallery ----------

    function chanceText(source) {
        const p = (source.chance * 100).toLocaleString(lang, { maximumFractionDigits: 1 }) + ' %';
        if (source.table.startsWith('archaeology/')) return t('chance_brush', { p });
        if (source.table.startsWith('entities/')) return t('chance_drop', { p });
        if (source.table.includes('trial_chambers')) return t('chance_vault', { p });
        return t('chance', { p });
    }

    // Front and back of a full netherite set with the pattern (dark armor shows every trim), cut from the worn textures.
    async function frontView(pattern, materialId) {
        const armor = armorById('netherite');
        const pal = paletteFor(armor, materialId);
        const layers = {};
        for (const layer of ['humanoid', 'humanoid_leggings']) {
            const c = document.createElement('canvas');
            c.width = 64;
            c.height = 32;
            const g = c.getContext('2d');
            g.drawImage(await loadImage(armor.layers[layer][0].texture), 0, 0);
            drawSprite(g, await trimSprite(pattern.id, layer, pal));
            layers[layer] = c;
        }
        const out = document.createElement('canvas');
        out.width = 34;
        out.height = 32;
        const g = out.getContext('2d');
        const part = (src, sx, sy, w, h, dx, dy, flip) => {
            g.save();
            if (flip) {
                g.translate(dx + w, dy);
                g.scale(-1, 1);
                g.drawImage(src, sx, sy, w, h, 0, 0, w, h);
            } else {
                g.drawImage(src, sx, sy, w, h, dx, dy, w, h);
            }
            g.restore();
        };
        const hum = layers.humanoid;
        const leg = layers.humanoid_leggings;
        // [face x offsets in the texture] for front, then back (seen from behind, so arms and legs swap sides).
        const views = [
            { x: 0, head: 8, body: 20, arm: 44, leg: 4, back: false },
            { x: 18, head: 24, body: 32, arm: 52, leg: 12, back: true }
        ];
        views.forEach((v) => {
            const [armR, armL] = v.back ? [12, 0] : [0, 12];
            const [legR, legL] = v.back ? [8, 4] : [4, 8];
            for (const layer of [leg, hum]) {
                part(layer, v.leg, 20, 4, 12, v.x + legR, 20);
                part(layer, v.leg, 20, 4, 12, v.x + legL, 20, true);
                part(layer, v.body, 20, 8, 12, v.x + 4, 8);
            }
            part(hum, v.arm, 20, 4, 12, v.x + armR, 8);
            part(hum, v.arm, 20, 4, 12, v.x + armL, 8, true);
            part(hum, v.head, 8, 8, 8, v.x + 4, 0);
        });
        return out;
    }

    async function renderGallery() {
        const materialId = current().material;
        const cards = await Promise.all(data.patterns.map(async (p) => ({ p, view: await frontView(p, materialId) })));
        el.gallery.innerHTML = '';
        cards.forEach(({ p, view: front }) => {
            const card = document.createElement('article');
            card.className = 'at-card';
            const copyMat = itemName(p.copy_material);
            const tpl = data.items[p.template][2];
            card.innerHTML = `
                <div class="at-card-view"></div>
                <div class="at-card-body">
                    <h3><img src="${escapeHtml(tpl)}" alt=""${pixelClass(tpl)}> ${escapeHtml(p.name[L])}</h3>
                    <ul class="at-sources">${p.sources.map((s) => `<li><i class="fas fa-location-dot" aria-hidden="true"></i><span>${escapeHtml(s.name[L])}<em>${escapeHtml(chanceText(s))}</em></span></li>`).join('')}</ul>
                    <p class="at-copy-recipe">${escapeHtml(t('copy_recipe', { material: copyMat }))}</p>
                    <div class="at-card-actions">
                        <a class="at-link" href="${RECIPES_PAGE}#item=${encodeURIComponent(p.template)}"><i class="fas fa-book-open" aria-hidden="true"></i> ${escapeHtml(t('show_recipe'))}</a>
                        <button type="button" class="at-apply" data-pattern="${p.id}"><i class="fas fa-check" aria-hidden="true"></i> ${escapeHtml(t('apply_pattern'))}</button>
                    </div>
                </div>`;
            front.className = 'is-pixel';
            card.querySelector('.at-card-view').appendChild(front);
            el.gallery.appendChild(card);
        });
    }

    // ---------- state changes ----------

    let galleryMaterial = null;

    async function refresh(opts = {}) {
        renderTargets();
        renderArmors();
        renderPatterns();
        renderMaterials();
        renderCommands();
        await renderItems();
        if (opts.model !== false && view.renderer) await buildPlayer();
        if (galleryMaterial !== current().material) {
            galleryMaterial = current().material;
            renderGallery();
        }
    }

    function apply(changes) {
        targets().forEach((slot) => {
            const next = Object.assign({}, state.slots[slot], changes);
            const armor = armorById(next.armor);
            if (changes.armor && armor && !armor.slots[slot]) return;
            state.slots[slot] = next;
        });
        refresh();
    }

    async function copyText(text, message) {
        try {
            await navigator.clipboard.writeText(text);
            showToast(t('toast_copied_title'), message, 'success');
        } catch (_) {
            showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
        }
    }

    function bind() {
        el.targets.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-target]');
            if (!btn) return;
            state.target = btn.dataset.target;
            refresh({ model: false });
        });
        el.armors.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-armor]');
            if (btn && !btn.disabled) apply({ armor: btn.dataset.armor });
        });
        el.patterns.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-pattern]');
            if (btn) apply({ pattern: btn.dataset.pattern });
        });
        el.materials.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-material]');
            if (btn) apply({ material: btn.dataset.material });
        });
        el.gallery.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-pattern]');
            if (!btn) return;
            apply({ pattern: btn.dataset.pattern });
            el.stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        let colorTimer = 0;
        el.color.addEventListener('input', () => {
            clearTimeout(colorTimer);
            colorTimer = setTimeout(() => {
                targets().forEach((slot) => {
                    if (state.slots[slot].armor === 'leather') state.slots[slot].color = el.color.value.toUpperCase();
                });
                refresh();
            }, 80);
        });
        el.resetColor.addEventListener('click', () => {
            targets().forEach((slot) => { state.slots[slot].color = null; });
            refresh();
        });
        el.who.addEventListener('input', renderCommands);
        el.commands.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cmd]');
            if (btn) copyText(el.commands._list[Number(btn.dataset.cmd)].cmd, t('toast_command_copied'));
        });
        el.copyAll.addEventListener('click', () => copyText(el.commands._list.map((c) => c.cmd).join('\n'), t('toast_commands_copied')));
        el.rotate.addEventListener('click', () => {
            state.rotate = !state.rotate;
            el.rotate.classList.toggle('active', state.rotate);
            el.rotate.setAttribute('aria-pressed', String(state.rotate));
            requestFrame();
        });
        el.skins.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-skin]');
            if (!btn || btn.dataset.skin === state.skin) return;
            state.skin = btn.dataset.skin;
            el.skins.querySelectorAll('[data-skin]').forEach((b) => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-pressed', String(b === btn));
            });
            buildPlayer();
        });
        el.screenshot.addEventListener('click', () => {
            if (!view.renderer) return;
            frame(performance.now());
            el.canvas.toBlob((blob) => {
                if (!blob) return;
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'armor-trim.png';
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(a.href), 1000);
                showToast(t('toast_saved_title'), t('toast_screenshot'), 'success');
            }, 'image/png');
        });
    }

    function collectElements() {
        Object.assign(el, {
            app: byId('trimApp'),
            stage: byId('atStage'),
            canvas: byId('atCanvas'),
            status: byId('atStatus'),
            items: byId('atItems'),
            targets: byId('atTargets'),
            armors: byId('atArmors'),
            patterns: byId('atPatterns'),
            materials: byId('atMaterials'),
            colorRow: byId('atColorRow'),
            color: byId('atColor'),
            resetColor: byId('atResetColor'),
            who: byId('atWho'),
            commands: byId('atCommands'),
            copyAll: byId('atCopyAll'),
            gallery: byId('atGallery'),
            rotate: byId('atRotate'),
            skins: byId('atSkins'),
            screenshot: byId('atScreenshot')
        });
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
            console.error('Trim data failed:', err);
            el.status.textContent = t('toast_data_failed');
            showToast(t('toast_error_title'), t('toast_data_failed'), 'error');
            return;
        }
        bind();
        el.rotate.classList.toggle('active', state.rotate);
        el.rotate.setAttribute('aria-pressed', String(state.rotate));
        await refresh({ model: false });
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
