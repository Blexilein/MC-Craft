const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_loaded_title: 'Bereit',
        toast_loaded_message: 'Alle Rezepte sind geladen.',
        toast_error_title: 'Fehler',
        toast_data_failed: 'Die Rezepte konnten nicht geladen werden.',
        toast_copied_title: 'Kopiert',
        toast_command_copied: 'Befehl kopiert.',
        toast_link_copied: 'Link zum Rezept kopiert.',
        toast_copy_failed: 'Kopieren hat nicht geklappt.',
        state_loading: 'Rezepte werden geladen …',
        state_failed: 'Die Rezepte konnten nicht geladen werden.',
        state_empty: 'Nichts gefunden. Versuch einen anderen Namen oder Filter.',
        meta: 'Stand: Minecraft {version} · {recipes} Rezepte · {items} Items',
        count_items: '{n} Items',
        tab_all: 'Alle',
        tab_crafting: 'Werkbank',
        tab_cooking: 'Öfen',
        tab_stonecutter: 'Steinsäge',
        tab_smithing: 'Schmiedetisch',
        tab_brewing: 'Braustand',
        cat_all: 'Alle',
        cat_building: 'Bauen',
        cat_redstone: 'Redstone',
        cat_equipment: 'Ausrüstung',
        cat_misc: 'Sonstiges',
        cat_food: 'Nahrung',
        cat_blocks: 'Blöcke',
        mode_craft: 'Herstellbar',
        mode_use: 'Als Zutat',
        type_crafting_shaped: 'Geformt',
        type_crafting_shapeless: 'Formlos',
        type_crafting_transmute: 'Umwandeln',
        type_crafting_dye: 'Färben',
        type_crafting_imbue: 'Tränken',
        type_special: 'Spezialrezept',
        type_smelting: 'Schmelzen',
        type_blasting: 'Schmelzen',
        type_smoking: 'Räuchern',
        type_campfire_cooking: 'Garen',
        type_stonecutting: 'Zuschneiden',
        type_smithing_transform: 'Aufwerten',
        type_smithing_trim: 'Verzieren',
        type_brewing: 'Brauen',
        shapeless_hint: 'Formlos – die Zutaten dürfen beliebig im Raster liegen.',
        detail_placeholder: 'Wähle links ein Item aus, um seine Rezepte zu sehen.',
        detail_craft: 'Herstellung',
        detail_use: 'Verwendet für',
        detail_no_recipe: 'Für dieses Item gibt es kein Rezept – es wird gefunden, abgebaut, erhandelt oder gezüchtet.',
        detail_no_use: 'Dieses Item ist in keinem Rezept eine Zutat.',
        detail_link: 'Link kopieren',
        detail_back: 'Zurück',
        tooltip_tag: 'Beliebig aus #{tag} ({n})',
        tooltip_trim: 'mit {trim}',
        no_effects: 'Wirkungslos',
        slot_template: 'Schmiedevorlage',
        slot_base: 'Gegenstand',
        slot_addition: 'Material',
        slot_reagent: 'Zutat',
        slot_bottle: 'Flasche',
        cooking_time: '{s} s',
        note_cooking: 'Dauer {s} Sekunden · {xp} Erfahrung',
        note_campfire: 'Dauer {s} Sekunden · ohne Brennstoff, ohne Erfahrung',
        note_brewing: 'Im Braustand mit Lohenstaub als Brennstoff – bis zu drei Flaschen auf einmal.',
        note_smithing_transform: 'Verzauberungen, Name und Haltbarkeit bleiben erhalten.',
        note_smithing_trim: 'Das Material bestimmt die Farbe des Besatzes. Die Vorlage wird verbraucht.',
        note_crafting_transmute: 'Nur die Farbe ändert sich – Inhalt und Eigenschaften bleiben erhalten.',
        note_map_cloning: 'Kopiert eine Karte: Jede weitere leere Karte ergibt eine zusätzliche Kopie (bis zu 8).',
        note_crafting_dye: 'Mehrere Farbstoffe auf einmal ergeben eine Mischfarbe.',
        note_crafting_imbue: 'Die Pfeile übernehmen die Wirkung des Verweiltranks mit einem Achtel der Dauer.',
        note_crafting_decorated_pot: 'Jede Seite nimmt einen Ziegel oder eine Töpferscherbe – Scherben bestimmen das Motiv ihrer Seite.',
        note_crafting_special_bannerduplicate: 'Kopiert das Muster auf ein leeres Banner derselben Farbe. Das Vorlagen-Banner bleibt erhalten.',
        note_crafting_special_bookcloning: 'Ein beschriebenes Buch plus 1–8 Bücher mit Feder ergibt ebenso viele Kopien. Die Kopie einer Kopie lässt sich nicht weiter kopieren.',
        note_crafting_special_firework_rocket: '1–3 Schwarzpulver bestimmen die Flugdauer. Bis zu 7 Feuerwerkssterne legen die Explosion fest.',
        note_crafting_special_firework_star: 'Mindestens ein Farbstoff. Optional: {shape} für die Form, {trail} für eine Spur, {twinkle} für Funkeln.',
        note_crafting_special_firework_star_fade: 'Die Farbstoffe legen die Farben fest, in die die Explosion übergeht.',
        note_crafting_special_mapextending: 'Vergrößert eine Karte um eine Zoomstufe (höchstens vier Stufen).',
        note_crafting_special_repairitem: 'Zwei beschädigte Gegenstände derselben Art ergeben einen reparierten mit 5 % Bonus-Haltbarkeit. Verzauberungen gehen verloren – nur Flüche bleiben.',
        note_crafting_special_shielddecoration: 'Überträgt das Banner-Muster auf den Schild. Ein Schild lässt sich nur einmal verzieren.',
        note_locked: 'Spezialrezept – funktioniert immer und muss nicht freigeschaltet werden.',
        note_locked_brewing: 'Braurezepte stehen nicht im Rezeptbuch und müssen nicht freigeschaltet werden.',
        any_head: 'ein Kopf',
        cmd_unlock: 'Rezept freischalten',
        copy_command: 'Befehl kopieren'
    },
    en: {
        toast_loaded_title: 'Ready',
        toast_loaded_message: 'All recipes are loaded.',
        toast_error_title: 'Error',
        toast_data_failed: 'The recipes could not be loaded.',
        toast_copied_title: 'Copied',
        toast_command_copied: 'Command copied.',
        toast_link_copied: 'Recipe link copied.',
        toast_copy_failed: 'Copying did not work.',
        state_loading: 'Loading recipes …',
        state_failed: 'The recipes could not be loaded.',
        state_empty: 'Nothing found. Try another name or filter.',
        meta: 'Minecraft {version} · {recipes} recipes · {items} items',
        count_items: '{n} items',
        tab_all: 'All',
        tab_crafting: 'Crafting Table',
        tab_cooking: 'Furnaces',
        tab_stonecutter: 'Stonecutter',
        tab_smithing: 'Smithing Table',
        tab_brewing: 'Brewing Stand',
        cat_all: 'All',
        cat_building: 'Building',
        cat_redstone: 'Redstone',
        cat_equipment: 'Equipment',
        cat_misc: 'Miscellaneous',
        cat_food: 'Food',
        cat_blocks: 'Blocks',
        mode_craft: 'Craftable',
        mode_use: 'As ingredient',
        type_crafting_shaped: 'Shaped',
        type_crafting_shapeless: 'Shapeless',
        type_crafting_transmute: 'Transmute',
        type_crafting_dye: 'Dyeing',
        type_crafting_imbue: 'Imbuing',
        type_special: 'Special recipe',
        type_smelting: 'Smelting',
        type_blasting: 'Blasting',
        type_smoking: 'Smoking',
        type_campfire_cooking: 'Campfire cooking',
        type_stonecutting: 'Stonecutting',
        type_smithing_transform: 'Upgrade',
        type_smithing_trim: 'Trim',
        type_brewing: 'Brewing',
        shapeless_hint: 'Shapeless – the ingredients can go anywhere in the grid.',
        detail_placeholder: 'Pick an item on the left to see its recipes.',
        detail_craft: 'Crafting',
        detail_use: 'Used for',
        detail_no_recipe: 'This item has no recipe – it is found, mined, traded or bred.',
        detail_no_use: 'This item is not an ingredient in any recipe.',
        detail_link: 'Copy link',
        detail_back: 'Back',
        tooltip_tag: 'Any of #{tag} ({n})',
        tooltip_trim: 'with {trim}',
        no_effects: 'No Effects',
        slot_template: 'Smithing template',
        slot_base: 'Item',
        slot_addition: 'Material',
        slot_reagent: 'Ingredient',
        slot_bottle: 'Bottle',
        cooking_time: '{s} s',
        note_cooking: 'Takes {s} seconds · {xp} experience',
        note_campfire: 'Takes {s} seconds · no fuel, no experience',
        note_brewing: 'In a brewing stand with blaze powder as fuel – up to three bottles at once.',
        note_smithing_transform: 'Enchantments, name and durability are kept.',
        note_smithing_trim: 'The material sets the colour of the trim. The template is used up.',
        note_crafting_transmute: 'Only the colour changes – contents and properties are kept.',
        note_map_cloning: 'Copies a map: every extra empty map makes one more copy (up to 8).',
        note_crafting_dye: 'Several dyes at once give a mixed colour.',
        note_crafting_imbue: 'The arrows take on the effect of the lingering potion at one eighth of its duration.',
        note_crafting_decorated_pot: 'Each side takes a brick or a pottery sherd – sherds set the picture on their side.',
        note_crafting_special_bannerduplicate: 'Copies the pattern onto a blank banner of the same colour. The patterned banner is kept.',
        note_crafting_special_bookcloning: 'A written book plus 1–8 books and quills gives as many copies. A copy of a copy cannot be copied again.',
        note_crafting_special_firework_rocket: '1–3 gunpowder set the flight duration. Up to 7 firework stars set the explosion.',
        note_crafting_special_firework_star: 'At least one dye. Optional: {shape} for the shape, {trail} for a trail, {twinkle} for a twinkle.',
        note_crafting_special_firework_star_fade: 'The dyes set the colours the explosion fades to.',
        note_crafting_special_mapextending: 'Zooms a map out by one level (four levels at most).',
        note_crafting_special_repairitem: 'Two damaged items of the same kind make one repaired item with 5 % bonus durability. Enchantments are lost – only curses stay.',
        note_crafting_special_shielddecoration: 'Puts the banner pattern on the shield. A shield can only be decorated once.',
        note_locked: 'Special recipe – always works and never needs unlocking.',
        note_locked_brewing: 'Brewing recipes are not in the recipe book and never need unlocking.',
        any_head: 'a head',
        cmd_unlock: 'Unlock recipe',
        copy_command: 'Copy command'
    }
};

(() => {
    const DATA_URL = '/assets/JS/recipes/recipes.json?v=20260916b';
    const TEX = '/assets/img/textures/item/';
    const ENT = '/assets/img/textures/entity/';
    const L = lang === 'en' ? 1 : 0;
    const TABS = ['all', 'crafting', 'cooking', 'stonecutter', 'smithing', 'brewing'];
    const CATEGORIES = { crafting: ['building', 'redstone', 'equipment', 'misc'], cooking: ['food', 'blocks', 'misc'] };
    const POTION_ITEMS = ['potion', 'splash_potion', 'lingering_potion', 'tipped_arrow'];
    const BASE_POTION_COLOR = '#385DC6';
    // Special recipes and brewing are not in the recipe book (Recipe.isSpecial), so /recipe cannot unlock them.
    const LOCKED = /^(crafting_special_|crafting_decorated_pot$|brewing$)/;
    const CYCLE_MS = 1000;
    const MOBILE = window.matchMedia('(max-width: 960px)');

    let data = null;
    const state = { tab: 'all', category: 'all', mode: 'craft', query: '', key: null };
    const producers = new Map();
    const users = new Map();
    const tileTabs = { craft: new Map(), use: new Map() };
    let craftKeys = [];
    let useKeys = [];
    const tiles = new Map();
    let cycling = [];
    let tick = 0;
    let paused = false;
    // Position in this page's own history entries, for the back button.
    let depth = 0;
    const el = {};

    const byId = (id) => document.getElementById(id);
    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const baseOf = (ref) => ref.split('@')[0];
    const potionOf = (ref) => (ref.includes('@') ? ref.split('@')[1] : null);
    const isRepair = (r) => r.type === 'crafting_special_repairitem';
    const pixelClass = (src) => (src.includes('/textures/') ? ' is-pixel' : '');

    // ---------- data helpers ----------

    // Concrete refs a recipe slot stands for.
    function alternatives(ref) {
        if (ref == null) return [];
        if (Array.isArray(ref)) return ref;
        if (ref[0] === '#') return data.tags[ref.slice(1)] || [];
        if (ref.endsWith('@*')) return data.effect_potions.map((p) => baseOf(ref) + '@' + p);
        return [ref];
    }

    function outKeys(r) {
        const ref = r.out[0];
        if (ref[0] === '#') return alternatives(ref);
        return [ref.endsWith('@*') ? baseOf(ref) : ref];
    }

    function inputs(r) {
        const refs = r.in.filter((x) => x != null);
        if (r.extras) Object.values(r.extras).forEach((v) => (Array.isArray(v) ? refs.push(...v) : refs.push(v)));
        return refs;
    }

    function orderIndex(ref) {
        const base = data.order.get(baseOf(ref)) ?? 1e6;
        const potion = potionOf(ref);
        return base + (potion && potion !== '*' ? (data.potionOrder.get(potion) + 1) / 1000 : 0);
    }

    function itemName(ref) {
        const id = baseOf(ref);
        const potion = potionOf(ref);
        if (potion && potion !== '*' && data.potions[potion]) return data.potions[potion].names[id][L];
        if (data.templates[id]) return data.templates[id][L];
        return data.items[id] ? data.items[id][L] : id;
    }

    function formatTicks(ticks) {
        const s = Math.floor(ticks / 20);
        return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    function potionLines(ref) {
        const potion = potionOf(ref);
        if (!potion || potion === '*' || !data.potions[potion]) return [];
        const info = data.potions[potion];
        if (!info.effects.length) return [t('no_effects')];
        const item = baseOf(ref);
        const scale = item === 'lingering_potion' ? 0.25 : item === 'tipped_arrow' ? 0.125 : 1;
        return info.effects.map(([effect, ticks, amp]) => {
            let line = data.effects[effect][L];
            if (amp) line += ' ' + data.potency[lang][amp];
            // Instant effects have a duration of one tick and show none.
            if (ticks > 20) line += ' (' + formatTicks(ticks * scale) + ')';
            return line;
        });
    }

    // ---------- icons ----------

    const images = new Map();
    const tinted = new Map();

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

    // A texture region multiplied by a colour, like the game's tint. Canvas blending only:
    // browsers with fingerprinting protection (Brave) alter pixels that are read back.
    function tintRegion(img, sx, sy, w, h, color) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const g = canvas.getContext('2d');
        g.drawImage(img, sx, sy, w, h, 0, 0, w, h);
        g.globalCompositeOperation = 'multiply';
        g.fillStyle = color;
        g.fillRect(0, 0, w, h);
        g.globalCompositeOperation = 'destination-in';
        g.drawImage(img, sx, sy, w, h, 0, 0, w, h);
        return canvas;
    }

    function drawnIcon(key, size, draw) {
        if (!tinted.has(key)) {
            tinted.set(key, (async () => {
                const canvas = document.createElement('canvas');
                canvas.width = canvas.height = size;
                const g = canvas.getContext('2d');
                g.imageSmoothingEnabled = false;
                await draw(g);
                return canvas.toDataURL();
            })());
        }
        return tinted.get(key);
    }

    // Potion items: layer0 tinted with the potion colour, layer1 on top (item model).
    function potionIcon(item, color) {
        return drawnIcon(item + color, 16, async (g) => {
            const layers = item === 'tipped_arrow'
                ? [TEX + 'tipped_arrow_head.png', TEX + 'tipped_arrow_base.png']
                : [TEX + 'potion_overlay.png', TEX + item + '.png'];
            const [under, over] = await Promise.all(layers.map(loadImage));
            g.drawImage(tintRegion(under, 0, 0, 16, 16, color), 0, 0);
            g.drawImage(over, 0, 0);
        });
    }

    // Banners and the shield are 3D in the game: their front faces, cut from the entity textures.
    function specialIcon(id, spec) {
        return drawnIcon('special:' + id, 44, async (g) => {
            if (spec.kind === 'shield') {
                const tex = await loadImage(ENT + 'shield/shield_base_nopattern.png');
                // ShieldModel plate: 12×22, front face at (1,1); drawn twice as big.
                g.drawImage(tex, 1, 1, 12, 22, 10, 0, 24, 44);
                return;
            }
            const [base, cloth] = await Promise.all([ENT + 'banner/banner_base.png', ENT + 'banner/base.png'].map(loadImage));
            // BannerModel: pole 2×42 at (46,2), bar 20×2 at (2,44); BannerFlagModel: flag 20×40 at (1,1).
            g.drawImage(base, 46, 2, 2, 42, 21, 2, 2, 42);
            g.drawImage(base, 2, 44, 20, 2, 12, 0, 20, 2);
            g.drawImage(tintRegion(cloth, 1, 1, 20, 40, spec.color), 12, 2);
        });
    }

    function setIcon(img, ref) {
        const id = baseOf(ref);
        const potion = potionOf(ref);
        img.dataset.ref = ref;
        if (potion && POTION_ITEMS.includes(id)) {
            img.classList.add('is-pixel');
            const color = potion === '*' || !data.potions[potion] ? BASE_POTION_COLOR : data.potions[potion].color;
            potionIcon(id, color).then((url) => {
                if (img.dataset.ref === ref) img.src = url;
            }).catch(() => {});
            return;
        }
        const spec = data.specials[id];
        if (spec) {
            img.classList.add('is-pixel');
            specialIcon(id, spec).then((url) => {
                if (img.dataset.ref === ref) img.src = url;
            }).catch(() => {});
            return;
        }
        const src = data.items[id] ? data.items[id][2] : '';
        img.classList.toggle('is-pixel', src.includes('/textures/'));
        if (img.getAttribute('src') !== src) img.src = src;
    }

    function iconImg(ref, lazy) {
        const img = document.createElement('img');
        img.alt = '';
        img.decoding = 'async';
        img.draggable = false;
        if (lazy) img.loading = 'lazy';
        setIcon(img, ref);
        return img;
    }

    // ---------- indexes ----------

    function buildIndexes() {
        data.order = new Map(Object.keys(data.items).map((id, i) => [id, i]));
        data.potionOrder = new Map(Object.keys(data.potions).map((p, i) => [p, i]));
        const addTab = (map, key, r) => {
            if (!map.has(key)) map.set(key, new Set());
            const set = map.get(key);
            set.add(r.tab);
            set.add(r.tab + ':' + (r.category || 'misc'));
        };
        data.recipes.forEach((r) => {
            outKeys(r).forEach((key) => {
                if (!producers.has(key)) producers.set(key, []);
                producers.get(key).push(r);
                if (!isRepair(r)) addTab(tileTabs.craft, key, r);
            });
            new Set(inputs(r).flatMap(alternatives)).forEach((ref) => {
                if (!users.has(ref)) users.set(ref, []);
                users.get(ref).push(r);
                addTab(tileTabs.use, ref, r);
            });
        });
        const sort = (keys) => keys.sort((a, b) => orderIndex(a) - orderIndex(b));
        craftKeys = sort([...tileTabs.craft.keys()]);
        useKeys = sort([...tileTabs.use.keys()]);
    }

    function recipeCount(tab) {
        return tab === 'all' ? data.recipes.length : data.recipes.filter((r) => r.tab === tab).length;
    }

    // ---------- tooltip ----------

    function tooltipFor(target) {
        const ref = target.dataset.ref;
        if (!ref) return null;
        const lines = [`<strong class="rc-tip-name">${escapeHtml(itemName(ref))}</strong>`];
        const id = baseOf(ref);
        if (data.templates[id]) lines.push(`<span class="rc-tip-sub">${escapeHtml(data.items[id][L])}</span>`);
        potionLines(ref).forEach((line) => lines.push(`<span class="rc-tip-effect">${escapeHtml(line)}</span>`));
        if (target.dataset.trim) lines.push(`<span class="rc-tip-sub">${escapeHtml(t('tooltip_trim', { trim: data.trims[target.dataset.trim][L] }))}</span>`);
        if (target.dataset.tag) {
            const tag = target.dataset.tag;
            lines.push(`<span class="rc-tip-tag">${escapeHtml(t('tooltip_tag', { tag, n: data.tags[tag].length }))}</span>`);
        }
        lines.push(`<span class="rc-tip-id">minecraft:${escapeHtml(id)}</span>`);
        return lines.join('');
    }

    function placeTooltip(x, y) {
        const tip = el.tooltip;
        const pad = 14;
        const w = tip.offsetWidth;
        const h = tip.offsetHeight;
        let left = x + pad;
        let top = y + pad;
        if (left + w > window.innerWidth - 8) left = Math.max(8, x - w - pad);
        if (top + h > window.innerHeight - 8) top = Math.max(8, y - h - pad);
        tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    }

    function showTooltip(target, x, y) {
        const html = tooltipFor(target);
        if (!html) return;
        el.tooltip.innerHTML = html;
        el.tooltip.hidden = false;
        if (x == null) {
            const rect = target.getBoundingClientRect();
            x = rect.right - 10;
            y = rect.bottom - 10;
        }
        placeTooltip(x, y);
    }

    function hideTooltip() {
        el.tooltip.hidden = true;
    }

    function bindTooltip(root) {
        let current = null;
        root.addEventListener('pointerover', (e) => {
            if (e.pointerType === 'touch') return;
            const target = e.target.closest('[data-ref]:not(img)');
            if (!target || !root.contains(target)) return;
            current = target;
            paused = target.classList.contains('rc-slot');
            showTooltip(target, e.clientX, e.clientY);
        });
        root.addEventListener('pointermove', (e) => {
            if (current && !el.tooltip.hidden) placeTooltip(e.clientX, e.clientY);
        });
        root.addEventListener('pointerout', (e) => {
            if (!current || current.contains(e.relatedTarget)) return;
            current = null;
            paused = false;
            hideTooltip();
        });
        root.addEventListener('focusin', (e) => {
            const target = e.target.closest('[data-ref]');
            if (target && e.target.matches(':focus-visible')) showTooltip(target);
        });
        root.addEventListener('focusout', hideTooltip);
    }

    // ---------- slots ----------

    function updateSlot(slot) {
        const alts = slot._alts;
        const ref = alts[tick % alts.length];
        slot.dataset.ref = ref;
        setIcon(slot._img, ref);
        slot.setAttribute('aria-label', itemName(ref));
    }

    // pin: {source ref: concrete ref} keeps e.g. both repair slots on the selected item.
    function makeSlot(ref, opts = {}) {
        if (ref == null) {
            const empty = document.createElement('span');
            empty.className = 'rc-slot is-empty' + (opts.big ? ' rc-slot--big' : '');
            empty.setAttribute('aria-hidden', 'true');
            return empty;
        }
        const key = Array.isArray(ref) ? null : ref;
        let alts = opts.pin && key && opts.pin[key] ? [opts.pin[key]] : alternatives(ref);
        if (!alts.length) alts = [String(ref)];
        const slot = document.createElement('button');
        slot.type = 'button';
        slot.className = 'rc-slot' + (opts.big ? ' rc-slot--big' : '');
        if (key && key[0] === '#' && alts.length > 1) slot.dataset.tag = key.slice(1);
        if (opts.trim) slot.dataset.trim = opts.trim;
        slot._alts = alts;
        slot._img = iconImg(alts[0]);
        slot.appendChild(slot._img);
        if (opts.count > 1) {
            const count = document.createElement('span');
            count.className = 'rc-count';
            count.textContent = opts.count;
            slot.appendChild(count);
        }
        if (opts.hint) slot.title = opts.hint;
        updateSlot(slot);
        if (alts.length > 1) cycling.push(slot);
        return slot;
    }

    function arrow(label) {
        const wrap = document.createElement('span');
        wrap.className = 'rc-arrow';
        wrap.innerHTML = '<i class="fas fa-arrow-right-long" aria-hidden="true"></i>' +
            (label ? `<span class="rc-arrow-label">${escapeHtml(label)}</span>` : '');
        return wrap;
    }

    function plus() {
        const span = document.createElement('span');
        span.className = 'rc-plus';
        span.innerHTML = '<i class="fas fa-plus" aria-hidden="true"></i>';
        return span;
    }

    // ---------- recipe cards ----------

    function typeLabel(r) {
        return /^crafting_special_|^crafting_decorated_pot$/.test(r.type) ? t('type_special') : t('type_' + r.type);
    }

    function recipeLayout(r, pin) {
        const box = document.createElement('div');
        box.className = 'rc-layout rc-layout--' + r.tab;
        const result = (ref, extra) => makeSlot(ref, Object.assign({ big: true, count: r.out[1], pin }, extra));
        if (r.tab === 'crafting') {
            const grid = document.createElement('div');
            grid.className = 'rc-grid3';
            const cells = new Array(9).fill(null);
            if (r.w) {
                r.in.forEach((ref, i) => {
                    cells[Math.floor(i / r.w) * 3 + (i % r.w)] = ref;
                });
            } else {
                r.in.forEach((ref, i) => {
                    cells[i] = ref;
                });
            }
            cells.forEach((ref) => grid.appendChild(makeSlot(ref, { pin })));
            box.appendChild(grid);
            const arr = arrow();
            if (!r.w) {
                arr.insertAdjacentHTML('beforeend', `<i class="fas fa-shuffle rc-shapeless" title="${escapeHtml(t('shapeless_hint'))}" aria-label="${escapeHtml(t('shapeless_hint'))}"></i>`);
            }
            box.appendChild(arr);
            box.appendChild(result(r.out[0]));
        } else if (r.tab === 'cooking') {
            const stack = document.createElement('div');
            stack.className = 'rc-furnace';
            stack.appendChild(makeSlot(r.in[0], { pin }));
            stack.insertAdjacentHTML('beforeend', '<span class="rc-flame"><i class="fas fa-fire" aria-hidden="true"></i></span>');
            box.appendChild(stack);
            box.appendChild(arrow(t('cooking_time', { s: r.time / 20 })));
            box.appendChild(result(r.out[0]));
        } else if (r.tab === 'stonecutter') {
            box.appendChild(makeSlot(r.in[0], { pin }));
            box.appendChild(arrow());
            box.appendChild(result(r.out[0]));
        } else if (r.tab === 'smithing') {
            const row = document.createElement('div');
            row.className = 'rc-row';
            row.appendChild(makeSlot(r.in[0], { pin, hint: t('slot_template') }));
            row.appendChild(makeSlot(r.in[1], { pin, hint: t('slot_base') }));
            row.appendChild(makeSlot(r.in[2], { pin, hint: t('slot_addition') }));
            box.appendChild(row);
            box.appendChild(arrow());
            // A trim keeps the item: the result shows the same armour as the base slot.
            box.appendChild(r.trim ? result(r.in[1], { count: 1, trim: r.trim }) : result(r.out[0]));
        } else if (r.tab === 'brewing') {
            box.appendChild(makeSlot(r.in[0], { pin, hint: t('slot_bottle') }));
            box.appendChild(plus());
            box.appendChild(makeSlot(r.in[1], { pin, hint: t('slot_reagent') }));
            box.appendChild(arrow());
            box.appendChild(result(r.out[0]));
        }
        return box;
    }

    function recipeNote(r) {
        if (r.tab === 'cooking') {
            const s = r.time / 20;
            return r.type === 'campfire_cooking' ? t('note_campfire', { s }) : t('note_cooking', { s, xp: r.xp.toLocaleString(lang) });
        }
        if (r.group === 'map_cloning') return t('note_map_cloning');
        if (r.type === 'crafting_special_firework_star') {
            const first = (ref) => (ref === '#skulls' ? t('any_head') : itemName(alternatives(ref)[0]));
            return t('note_crafting_special_firework_star', {
                shape: r.extras.shape.map(first).join(', '), trail: first(r.extras.trail), twinkle: first(r.extras.twinkle)
            });
        }
        return I18N[lang]['note_' + r.type] ? t('note_' + r.type) : '';
    }

    function recipeCard(r, key) {
        const card = document.createElement('article');
        card.className = 'rc-card';
        const station = data.stations[r.station];
        const cats = CATEGORIES[r.tab];
        const category = cats ? r.category || 'misc' : null;
        card.innerHTML = `
            <header class="rc-card-head">
                <img class="rc-station${pixelClass(station[2])}" src="${escapeHtml(station[2])}" alt="" loading="lazy">
                <span class="rc-card-title"><strong>${escapeHtml(station[L])}</strong><span>${escapeHtml(typeLabel(r))}</span></span>
                ${category ? `<span class="rc-chip">${escapeHtml(t('cat_' + category))}</span>` : ''}
            </header>`;
        // Tag outputs (repair, map cloning) show the selected item in every matching slot.
        const pin = r.out[0][0] === '#' && key ? { [r.out[0]]: key } : null;
        card.appendChild(recipeLayout(r, pin));
        const note = recipeNote(r);
        if (note) card.insertAdjacentHTML('beforeend', `<p class="rc-note">${escapeHtml(note)}</p>`);
        const foot = document.createElement('footer');
        foot.className = 'rc-card-foot';
        if (LOCKED.test(r.type)) {
            foot.innerHTML = `<span class="rc-locked"><i class="fas fa-infinity" aria-hidden="true"></i> ${escapeHtml(t(r.tab === 'brewing' ? 'note_locked_brewing' : 'note_locked'))}</span>`;
        } else {
            const cmd = `/recipe give @s minecraft:${r.id}`;
            foot.innerHTML = `
                <span class="rc-cmd-label">${escapeHtml(t('cmd_unlock'))}</span>
                <code class="rc-cmd">${escapeHtml(cmd)}</code><button type="button" class="rc-copy" data-copy="${escapeHtml(cmd)}" aria-label="${escapeHtml(t('copy_command'))}" title="${escapeHtml(t('copy_command'))}"><i class="fas fa-copy" aria-hidden="true"></i></button>`;
        }
        card.appendChild(foot);
        return card;
    }

    // ---------- detail ----------

    function matchesFilter(r) {
        if (state.tab !== 'all' && r.tab !== state.tab) return false;
        return state.category === 'all' || (r.category || 'misc') === state.category;
    }

    function sortByFilter(list) {
        return list.slice().sort((a, b) => Number(matchesFilter(b)) - Number(matchesFilter(a)));
    }

    function useSection(key) {
        const section = document.createElement('section');
        section.className = 'rc-detail-section';
        const list = users.get(key) || [];
        const results = [];
        const seen = new Set();
        sortByFilter(list).forEach((r) => {
            // Repair and map cloning pass the item through: they only make the item itself.
            const passThrough = r.out[0][0] === '#' && alternatives(r.out[0]).includes(key);
            outKeys(r).forEach((k) => {
                if (passThrough && k !== key) return;
                if (!seen.has(k)) {
                    seen.add(k);
                    results.push(k);
                }
            });
        });
        section.innerHTML = `<h3 class="rc-detail-heading"><i class="fas fa-diagram-project" aria-hidden="true"></i> ${escapeHtml(t('detail_use'))} <span class="rc-badge">${results.length}</span></h3>`;
        if (!results.length) {
            section.insertAdjacentHTML('beforeend', `<p class="rc-empty">${escapeHtml(t('detail_no_use'))}</p>`);
            return section;
        }
        const grid = document.createElement('div');
        grid.className = 'rc-uses';
        results.forEach((k) => grid.appendChild(makeTile(k, true)));
        section.appendChild(grid);
        return section;
    }

    function craftSection(key) {
        const section = document.createElement('section');
        section.className = 'rc-detail-section';
        const list = sortByFilter(producers.get(key) || []);
        section.innerHTML = `<h3 class="rc-detail-heading"><i class="fas fa-hammer" aria-hidden="true"></i> ${escapeHtml(t('detail_craft'))} <span class="rc-badge">${list.length}</span></h3>`;
        if (!list.length) {
            section.insertAdjacentHTML('beforeend', `<p class="rc-empty">${escapeHtml(t('detail_no_recipe'))}</p>`);
            return section;
        }
        const cards = document.createElement('div');
        cards.className = 'rc-cards';
        list.forEach((r) => cards.appendChild(recipeCard(r, key)));
        section.appendChild(cards);
        return section;
    }

    function renderDetail() {
        cycling = [];
        hideTooltip();
        const key = state.key;
        if (!key) {
            el.detail.innerHTML = `<p class="rc-placeholder"><i class="fas fa-hand-pointer" aria-hidden="true"></i> ${escapeHtml(t('detail_placeholder'))}</p>`;
            return;
        }
        const head = document.createElement('div');
        head.className = 'rc-detail-head';
        const hero = makeSlot(key, { big: true });
        hero.classList.add('rc-slot--hero');
        hero.tabIndex = -1;
        head.appendChild(hero);
        const id = baseOf(key);
        const sub = [data.templates[id] ? data.items[id][L] : '', 'minecraft:' + id].filter(Boolean).join(' · ');
        head.insertAdjacentHTML('beforeend', `
            <div class="rc-detail-title">
                <h2 id="recipeDetailTitle">${escapeHtml(itemName(key))}</h2>
                <p>${escapeHtml(sub)}</p>
                ${potionLines(key).map((line) => `<p class="rc-detail-effect">${escapeHtml(line)}</p>`).join('')}
            </div>
            <div class="rc-detail-actions">
                <button type="button" class="rc-icon-btn" id="recipeBackBtn" title="${escapeHtml(t('detail_back'))}" aria-label="${escapeHtml(t('detail_back'))}"><i class="fas fa-arrow-left" aria-hidden="true"></i></button>
                <button type="button" class="rc-icon-btn" id="recipeLinkBtn" title="${escapeHtml(t('detail_link'))}" aria-label="${escapeHtml(t('detail_link'))}"><i class="fas fa-link" aria-hidden="true"></i></button>
            </div>`);
        const sections = [craftSection(key), useSection(key)];
        if (state.mode === 'use') sections.reverse();
        el.detail.replaceChildren(head, ...sections);
        el.detail.scrollTop = 0;
        byId('recipeBackBtn').hidden = depth < 1;
    }

    // ---------- tiles ----------

    function makeTile(key, small) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rc-tile' + (small ? ' rc-tile--small' : '');
        btn.dataset.ref = key;
        btn.dataset.key = key;
        btn.setAttribute('aria-label', itemName(key));
        btn.appendChild(iconImg(key, true));
        return btn;
    }

    function tileFor(key) {
        if (!tiles.has(key)) tiles.set(key, makeTile(key));
        return tiles.get(key);
    }

    function visibleKeys() {
        const keys = state.mode === 'craft' ? craftKeys : useKeys;
        const tabs = tileTabs[state.mode];
        const filter = state.tab === 'all' ? null : state.category === 'all' ? state.tab : state.tab + ':' + state.category;
        const q = state.query.trim().toLowerCase();
        return keys.filter((key) => {
            if (filter && !tabs.get(key).has(filter)) return false;
            if (!q) return true;
            const id = baseOf(key);
            return itemName(key).toLowerCase().includes(q) || id.includes(q.replace(/\s+/g, '_')) ||
                (data.templates[id] && data.items[id][L].toLowerCase().includes(q));
        });
    }

    function renderGrid() {
        const keys = visibleKeys();
        el.count.textContent = t('count_items', { n: keys.length.toLocaleString(lang) });
        if (!keys.length) {
            el.grid.innerHTML = `<p class="rc-state">${escapeHtml(t('state_empty'))}</p>`;
            return;
        }
        el.grid.replaceChildren(...keys.map(tileFor));
        markActive();
    }

    function markActive() {
        tiles.forEach((tile, key) => {
            const on = key === state.key;
            tile.classList.toggle('active', on);
            if (on) tile.setAttribute('aria-current', 'true');
            else tile.removeAttribute('aria-current');
        });
    }

    // ---------- filters ----------

    function renderTabs() {
        const stationIcon = (tab) => data.stations[{ crafting: 'crafting_table', cooking: 'furnace', stonecutter: 'stonecutter', smithing: 'smithing_table', brewing: 'brewing_stand' }[tab]][2];
        el.tabs.innerHTML = TABS.map((tab) => `
            <button type="button" class="rc-tab${tab === state.tab ? ' active' : ''}" data-tab="${tab}" aria-pressed="${tab === state.tab}">
                ${tab === 'all' ? '<i class="fas fa-layer-group" aria-hidden="true"></i>' : `<img class="${pixelClass(stationIcon(tab)).trim()}" src="${escapeHtml(stationIcon(tab))}" alt="">`}
                <span>${escapeHtml(t('tab_' + tab))}</span>
                <span class="rc-tab-count">${recipeCount(tab).toLocaleString(lang)}</span>
            </button>`).join('');
    }

    function renderCategories() {
        const cats = CATEGORIES[state.tab];
        el.categories.hidden = !cats;
        if (!cats) return;
        el.categories.innerHTML = ['all', ...cats].map((cat) => `
            <button type="button" class="rc-cat${cat === state.category ? ' active' : ''}" data-cat="${cat}" aria-pressed="${cat === state.category}">${escapeHtml(t('cat_' + cat))}</button>`).join('');
    }

    function renderModes() {
        el.modes.querySelectorAll('[data-mode]').forEach((btn) => {
            const on = btn.dataset.mode === state.mode;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });
    }

    // ---------- selection & history ----------

    function hashKey() {
        const m = location.hash.match(/^#item=(.+)$/);
        if (!m) return null;
        const key = decodeURIComponent(m[1]);
        return producers.has(key) || users.has(key) ? key : null;
    }

    function select(key, opts = {}) {
        if (!key || !(producers.has(key) || users.has(key))) return;
        state.key = key;
        if (opts.push !== false) {
            const url = '#item=' + encodeURIComponent(key);
            if (location.hash !== url) history.pushState({ rc: key, depth: ++depth }, '', url);
        }
        markActive();
        renderDetail();
        if (opts.scroll && MOBILE.matches) el.detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    async function copyText(text, message) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (_) {
            const area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            const ok = document.execCommand('copy');
            area.remove();
            if (!ok) {
                showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
                return;
            }
        }
        showToast(t('toast_copied_title'), message, 'success');
    }

    // ---------- events ----------

    function bind() {
        let searchTimer = 0;
        el.search.addEventListener('input', () => {
            clearTimeout(searchTimer);
            el.clear.hidden = !el.search.value;
            searchTimer = setTimeout(() => {
                state.query = el.search.value;
                renderGrid();
            }, 120);
        });
        el.clear.addEventListener('click', () => {
            el.search.value = '';
            el.clear.hidden = true;
            state.query = '';
            renderGrid();
            el.search.focus();
        });
        el.tabs.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-tab]');
            if (!btn || btn.dataset.tab === state.tab) return;
            state.tab = btn.dataset.tab;
            state.category = 'all';
            renderTabs();
            renderCategories();
            renderGrid();
            if (state.key) renderDetail();
        });
        el.categories.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-cat]');
            if (!btn || btn.dataset.cat === state.category) return;
            state.category = btn.dataset.cat;
            renderCategories();
            renderGrid();
            if (state.key) renderDetail();
        });
        el.modes.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-mode]');
            if (!btn || btn.dataset.mode === state.mode) return;
            state.mode = btn.dataset.mode;
            renderModes();
            renderGrid();
            if (state.key) renderDetail();
        });
        el.grid.addEventListener('click', (e) => {
            const tile = e.target.closest('[data-key]');
            if (tile) select(tile.dataset.key, { scroll: true });
        });
        el.detail.addEventListener('click', (e) => {
            const copy = e.target.closest('[data-copy]');
            if (copy) {
                copyText(copy.dataset.copy, t('toast_command_copied'));
                return;
            }
            if (e.target.closest('#recipeLinkBtn')) {
                copyText(location.href, t('toast_link_copied'));
                return;
            }
            if (e.target.closest('#recipeBackBtn')) {
                history.back();
                return;
            }
            const target = e.target.closest('.rc-tile, .rc-slot:not(.rc-slot--hero)');
            if (target && target.dataset.ref && target.dataset.ref !== state.key) {
                select(target.dataset.ref);
                el.detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        window.addEventListener('popstate', () => {
            depth = history.state?.depth || 0;
            const key = hashKey();
            if (key) select(key, { push: false });
        });
        bindTooltip(el.app);
        setInterval(() => {
            if (paused || document.hidden || !cycling.length) return;
            tick++;
            cycling.forEach(updateSlot);
        }, CYCLE_MS);
    }

    function collectElements() {
        Object.assign(el, {
            app: byId('recipeApp'),
            search: byId('recipeSearch'),
            clear: byId('recipeSearchClear'),
            tabs: byId('recipeTabs'),
            categories: byId('recipeCategories'),
            modes: byId('recipeModes'),
            grid: byId('recipeGrid'),
            count: byId('recipeCount'),
            detail: byId('recipeDetail'),
            meta: byId('recipeMeta'),
            tooltip: byId('recipeTooltip')
        });
    }

    async function init() {
        collectElements();
        if (!el.app) return;
        el.grid.innerHTML = `<p class="rc-state">${escapeHtml(t('state_loading'))}</p>`;
        try {
            const res = await fetch(DATA_URL, { cache: 'no-cache' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        } catch (err) {
            console.error('Recipe data failed:', err);
            el.grid.innerHTML = `<p class="rc-state">${escapeHtml(t('state_failed'))}</p>`;
            showToast(t('toast_error_title'), t('toast_data_failed'), 'error');
            return;
        }
        buildIndexes();
        el.meta.textContent = t('meta', {
            version: data.version,
            recipes: data.recipes.length.toLocaleString(lang),
            items: Object.keys(data.items).length.toLocaleString(lang)
        });
        renderTabs();
        renderCategories();
        renderModes();
        renderGrid();
        bind();
        const key = hashKey();
        if (key) {
            history.replaceState({ rc: key, depth: 0 }, '', location.hash);
            select(key, { push: false });
        } else {
            select('crafting_table', { push: false });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
