// minecraft-command-generator.js

const I18N = {
    de: {
        toast_welcome_title: 'Minecraft Befehl Generator geladen!',
        toast_welcome_message: 'Wähle einen Befehlstyp und fülle die Felder aus – der Befehl entsteht live.',
        copied_title: 'Kopiert!',
        copied: 'Befehl wurde in die Zwischenablage kopiert.',
        copy_failed_title: 'Kopieren fehlgeschlagen',
        copy_failed: 'Bitte den Befehl manuell markieren und kopieren.',
        target_self: '@s – ich selbst',
        target_nearest: '@p – nächster Spieler',
        target_random: '@r – zufälliger Spieler',
        target_all_players: '@a – alle Spieler',
        target_all_entities: '@e – alle Entitäten',
        target_custom: 'Eigener Name …',
        default_item_name: 'Diamant',
        default_mob_name: 'Zombie',
        picker_all: 'Alle',
        picker_loading: 'Wird geladen …',
        picker_empty: 'Keine Treffer für diese Suche.',
        enchant_list_empty: 'Noch keine Verzauberung hinzugefügt – das Item wird ohne Verzauberung gegeben.',
        enchant_remove_label: 'Entfernen'
    },
    en: {
        toast_welcome_title: 'Minecraft Command Generator loaded!',
        toast_welcome_message: 'Pick a command type and fill in the fields – the command builds live.',
        copied_title: 'Copied!',
        copied: 'Command copied to clipboard.',
        copy_failed_title: 'Copy failed',
        copy_failed: 'Please select and copy the command manually.',
        target_self: '@s – myself',
        target_nearest: '@p – nearest player',
        target_random: '@r – random player',
        target_all_players: '@a – all players',
        target_all_entities: '@e – all entities',
        target_custom: 'Custom name …',
        default_item_name: 'Diamond',
        default_mob_name: 'Zombie',
        picker_all: 'All',
        picker_loading: 'Loading …',
        picker_empty: 'No matches for this search.',
        enchant_list_empty: 'No enchantment added yet – the item will be given without one.',
        enchant_remove_label: 'Remove'
    }
};

(function () {
    'use strict';

    const el = {};
    let pickers = [];
    const state = {
        tab: 'give',
        itemEntries: [],
        mobEntries: [],
        lastItemId: 'minecraft:diamond',
        lastMobId: 'minecraft:zombie',
        lastEnchantItemId: 'minecraft:diamond_sword',
        enchantList: []
    };

    const ITEM_FILES = [
        { category: 'building', file: 'building.json' },
        { category: 'color', file: 'color.json' },
        { category: 'nature', file: 'nature.json' },
        { category: 'utility', file: 'utility.json' },
        { category: 'redstone', file: 'redstone.json' },
        { category: 'tools', file: 'tools.json' },
        { category: 'combat', file: 'combat.json' },
        { category: 'food', file: 'food.json' },
        { category: 'materials', file: 'materials.json' },
        { category: 'spawn', file: 'spawneggs.json' },
        { category: 'gamemode', file: 'gamemod.json' }
    ];

    const MOB_FILES = [
        { category: 'passive', file: 'Passive_mobs.json' },
        { category: 'neutral', file: 'Neutral_mobs.json' },
        { category: 'hostile', file: 'Hostile_mobs.json' },
        { category: 'boss', file: 'Boss_mobs.json' },
        { category: 'jockey', file: 'Jockeys_mobs.json' },
        { category: 'player', file: 'Player.json' },
        { category: 'summonable', file: 'Unused_mobs.json' }
    ];

    const ITEM_CATEGORY_LABELS = {
        building: { de: 'Baublöcke', en: 'Building Blocks' },
        color: { de: 'Farbige Blöcke', en: 'Colored Blocks' },
        nature: { de: 'Naturblöcke', en: 'Nature Blocks' },
        utility: { de: 'Gebrauchsblöcke', en: 'Utility Blocks' },
        redstone: { de: 'Redstone', en: 'Redstone' },
        tools: { de: 'Werkzeuge', en: 'Tools' },
        combat: { de: 'Kampf', en: 'Combat' },
        food: { de: 'Nahrung', en: 'Food' },
        materials: { de: 'Wertstoffe', en: 'Materials' },
        spawn: { de: 'Spawner Eier', en: 'Spawn Eggs' },
        gamemode: { de: 'Operator Items', en: 'Operator Items' }
    };

    const MOB_CATEGORY_LABELS = {
        passive: { de: 'Passiv', en: 'Passive' },
        neutral: { de: 'Neutral', en: 'Neutral' },
        hostile: { de: 'Feindlich', en: 'Hostile' },
        boss: { de: 'Bosse', en: 'Bosses' },
        jockey: { de: 'Jockeys', en: 'Jockeys' },
        summonable: { de: 'Beschwörbar', en: 'Summonable' },
        player: { de: 'Spieler', en: 'Player' }
    };

    const EFFECTS = [
        'speed', 'slowness', 'haste', 'mining_fatigue', 'strength', 'instant_health', 'instant_damage',
        'jump_boost', 'nausea', 'regeneration', 'resistance', 'fire_resistance', 'water_breathing',
        'invisibility', 'blindness', 'night_vision', 'hunger', 'weakness', 'poison', 'wither',
        'health_boost', 'absorption', 'saturation', 'glowing', 'levitation', 'luck', 'unluck',
        'slow_falling', 'conduit_power', 'dolphins_grace', 'bad_omen', 'hero_of_the_village', 'darkness'
    ];

    const ENCHANTMENTS = [
        'protection', 'fire_protection', 'feather_falling', 'blast_protection', 'projectile_protection',
        'respiration', 'aqua_affinity', 'thorns', 'depth_strider', 'frost_walker', 'binding_curse',
        'soul_speed', 'swift_sneak', 'sharpness', 'smite', 'bane_of_arthropods', 'knockback', 'fire_aspect',
        'looting', 'sweeping_edge', 'efficiency', 'silk_touch', 'unbreaking', 'fortune', 'power', 'punch',
        'flame', 'infinity', 'luck_of_the_sea', 'lure', 'loyalty', 'impaling', 'riptide', 'channeling',
        'multishot', 'quick_charge', 'piercing', 'mending', 'vanishing_curse'
    ];

    async function loadJsonArray(url) {
        try {
            const res = await fetch(`${url}?v=${Date.now()}`);
            const data = res.ok ? await res.json() : [];
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.error('Failed to load:', url, err);
            return [];
        }
    }

    async function loadCatalogs() {
        const lang = mcLang;
        const itemLists = await Promise.all(
            ITEM_FILES.map((f) => loadJsonArray(`/assets/JS/items/${lang}_${f.file}`).then((list) => ({ list, category: f.category })))
        );
        itemLists.forEach(({ list, category }) => {
            list.forEach((entry) => {
                const id = String(entry && entry.id || '').trim();
                const name = String(entry && entry.name || '').trim();
                const icon = String(entry && entry.icon || '').trim();
                if (!id || !name) return;
                state.itemEntries.push({ id, name, icon, category });
            });
        });

        const mobLists = await Promise.all(
            MOB_FILES.map((f) => loadJsonArray(`/assets/JS/mobs/${lang}_${f.file}`).then((list) => ({ list, category: f.category })))
        );
        mobLists.forEach(({ list, category }) => {
            list.forEach((entry) => {
                const id = String(entry && entry.id || '').trim();
                const name = String(entry && entry.name || '').trim();
                const icon = String(entry && entry.icon || '').trim();
                if (!id || !name) return;
                state.mobEntries.push({ id, name, icon, category });
            });
        });

        pickers.forEach((picker) => picker.refresh());
        updateCommand();
    }

    function categoryLabel(labels, key) {
        const entry = labels[key];
        if (!entry) return key;
        return entry[mcLang] || entry.de;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function targetValue(selectId, customId) {
        const sel = document.getElementById(selectId);
        if (!sel) return '@s';
        if (sel.value === 'custom') {
            const custom = document.getElementById(customId);
            const value = custom ? custom.value.trim() : '';
            return value || '@s';
        }
        return sel.value;
    }

    function coord(id, fallback) {
        const input = document.getElementById(id);
        const value = input ? input.value.trim() : '';
        return value || fallback;
    }

    function num(id, fallback) {
        const input = document.getElementById(id);
        const value = parseInt(input && input.value, 10);
        return Number.isFinite(value) ? value : fallback;
    }

    // ===== COMMAND BUILDERS =====
    function buildGive() {
        const target = targetValue('mcgGiveTarget', 'mcgGiveTargetCustom');
        const count = Math.min(Math.max(num('mcgGiveCount', 1), 1), 64);
        return `/give ${target} ${state.lastItemId} ${count}`;
    }

    function buildSummon() {
        const x = coord('mcgSummonX', '~');
        const y = coord('mcgSummonY', '~');
        const z = coord('mcgSummonZ', '~');
        const name = document.getElementById('mcgSummonName').value.trim();
        const nbt = name ? ` {CustomName:'"${name.replace(/"/g, '\\"')}"',CustomNameVisible:1b}` : '';
        return `/summon ${state.lastMobId} ${x} ${y} ${z}${nbt}`;
    }

    function buildEffect() {
        const target = targetValue('mcgEffectTarget', 'mcgEffectTargetCustom');
        const effect = document.getElementById('mcgEffectType').value;
        const infinite = document.getElementById('mcgEffectInfinite').checked;
        const duration = infinite ? 'infinite' : Math.min(Math.max(num('mcgEffectDuration', 30), 1), 1000000);
        const amplifier = Math.min(Math.max(num('mcgEffectAmplifier', 0), 0), 255);
        const hide = document.getElementById('mcgEffectHide').checked;
        return `/effect give ${target} minecraft:${effect} ${duration} ${amplifier}${hide ? ' true' : ''}`;
    }

    function buildEnchant() {
        // The enchantments component can carry several enchantments at once,
        // so the whole added list is written into one command instead of
        // forcing one /give per enchantment (which would just overwrite the
        // item's enchantments each time).
        const target = targetValue('mcgEnchantTarget', 'mcgEnchantTargetCustom');
        if (!state.enchantList.length) {
            return `/give ${target} ${state.lastEnchantItemId} 1`;
        }
        const pairs = state.enchantList.map((entry) => `${entry.key}:${entry.level}`).join(',');
        return `/give ${target} ${state.lastEnchantItemId}[minecraft:enchantments={${pairs}}] 1`;
    }

    function buildTeleport() {
        const target = targetValue('mcgTpTarget', 'mcgTpTargetCustom');
        const mode = document.querySelector('input[name="mcgTpMode"]:checked');
        const modeValue = mode ? mode.value : 'coords';
        if (modeValue === 'player') {
            const dest = document.getElementById('mcgTpPlayer').value.trim() || 'Notch';
            return `/teleport ${target} ${dest}`;
        }
        const x = coord('mcgTpX', '~');
        const y = coord('mcgTpY', '~');
        const z = coord('mcgTpZ', '~');
        return `/teleport ${target} ${x} ${y} ${z}`;
    }

    function buildGamemode() {
        const mode = document.getElementById('mcgGmMode').value;
        const target = targetValue('mcgGmTarget', 'mcgGmTargetCustom');
        return target === '@s' ? `/gamemode ${mode}` : `/gamemode ${mode} ${target}`;
    }

    function buildWeather() {
        const type = document.getElementById('mcgWeatherType').value;
        const durationInput = document.getElementById('mcgWeatherDuration');
        const duration = durationInput ? durationInput.value.trim() : '';
        return duration ? `/weather ${type} ${duration}` : `/weather ${type}`;
    }

    function buildTime() {
        const mode = document.getElementById('mcgTimeMode').value;
        if (mode === 'custom') {
            const value = Math.max(num('mcgTimeCustom', 0), 0);
            return `/time set ${value}`;
        }
        return `/time set ${mode}`;
    }

    const BUILDERS = {
        give: buildGive,
        summon: buildSummon,
        effect: buildEffect,
        enchant: buildEnchant,
        teleport: buildTeleport,
        gamemode: buildGamemode,
        weather: buildWeather,
        time: buildTime
    };

    function updateCommand() {
        const builder = BUILDERS[state.tab];
        if (!builder || !el.command) return;
        try {
            el.command.textContent = builder();
        } catch (err) {
            console.error('Command build failed:', err);
        }
    }

    // ===== TABS =====
    function setTab(tab) {
        if (!BUILDERS[tab]) return;
        state.tab = tab;
        el.tabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab));
        el.panels.forEach((panel) => {
            panel.hidden = panel.dataset.panel !== tab;
        });
        updateCommand();
    }

    // ===== CUSTOM TARGET REVEAL =====
    function initTargetToggle(selectId, wrapId) {
        const select = document.getElementById(selectId);
        const wrap = document.getElementById(wrapId);
        if (!select || !wrap) return;
        const sync = () => { wrap.hidden = select.value !== 'custom'; };
        select.addEventListener('change', sync);
        sync();
    }

    // ===== TELEPORT MODE TOGGLE =====
    function initTeleportMode() {
        const radios = document.querySelectorAll('input[name="mcgTpMode"]');
        const coordsWrap = document.getElementById('mcgTpCoordsWrap');
        const playerWrap = document.getElementById('mcgTpPlayerWrap');
        if (!radios.length || !coordsWrap || !playerWrap) return;
        const sync = () => {
            const mode = document.querySelector('input[name="mcgTpMode"]:checked').value;
            coordsWrap.hidden = mode !== 'coords';
            playerWrap.hidden = mode !== 'player';
        };
        radios.forEach((r) => r.addEventListener('change', sync));
        sync();
    }

    // ===== TIME PRESETS =====
    function initTimePresets() {
        const presets = Array.from(document.querySelectorAll('.mcg-preset[data-time]'));
        const select = document.getElementById('mcgTimeMode');
        const customWrap = document.getElementById('mcgTimeCustomWrap');
        if (!presets.length || !select) return;
        presets.forEach((btn) => {
            btn.addEventListener('click', () => {
                select.value = btn.dataset.time;
                presets.forEach((b) => b.classList.toggle('active', b === btn));
                if (customWrap) customWrap.hidden = select.value !== 'custom';
                updateCommand();
            });
        });
        select.addEventListener('change', () => {
            presets.forEach((b) => b.classList.toggle('active', b.dataset.time === select.value));
            if (customWrap) customWrap.hidden = select.value !== 'custom';
        });
    }

    // ===== EFFECT DURATION TOGGLE =====
    function initEffectInfinite() {
        const checkbox = document.getElementById('mcgEffectInfinite');
        const durationField = document.getElementById('mcgEffectDurationField');
        if (!checkbox || !durationField) return;
        const sync = () => { durationField.hidden = checkbox.checked; };
        checkbox.addEventListener('change', sync);
        sync();
    }

    // ===== ENCHANTMENT LIST (Enchant tab) =====
    // Lets several enchantments build up into one /give command instead of
    // each Add overwriting the previous one, matching how a real enchanted
    // item can carry more than one enchantment at once.
    function renderEnchantList() {
        const list = document.getElementById('mcgEnchantList');
        if (!list) return;

        if (!state.enchantList.length) {
            list.innerHTML = `<p class="mcg-enchant-empty">${escapeHtml(t('enchant_list_empty'))}</p>`;
            return;
        }

        list.innerHTML = state.enchantList.map((entry, index) => `
            <span class="mcg-enchant-chip">
                ${escapeHtml(entry.label)} ${entry.level}
                <button type="button" class="mcg-enchant-remove" data-index="${index}" aria-label="${escapeHtml(t('enchant_remove_label'))}">
                    <i class="fas fa-xmark"></i>
                </button>
            </span>
        `).join('');
    }

    function addEnchant() {
        const select = document.getElementById('mcgEnchantType');
        if (!select || !select.value) return;
        const key = select.value;
        const label = select.options[select.selectedIndex] ? select.options[select.selectedIndex].textContent : key;
        const level = Math.min(Math.max(num('mcgEnchantLevel', 1), 1), 255);

        // Re-adding an enchantment that's already in the list updates its
        // level in place instead of creating a duplicate entry - an item
        // can't carry the same enchantment twice anyway.
        const existingIndex = state.enchantList.findIndex((entry) => entry.key === key);
        if (existingIndex >= 0) state.enchantList[existingIndex] = { key, label, level };
        else state.enchantList.push({ key, label, level });

        renderEnchantList();
        updateCommand();
    }

    function initEnchantList() {
        const addBtn = document.getElementById('mcgEnchantAdd');
        const list = document.getElementById('mcgEnchantList');
        if (!addBtn || !list) return;

        addBtn.addEventListener('click', addEnchant);
        list.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.mcg-enchant-remove');
            if (!removeBtn) return;
            state.enchantList.splice(Number(removeBtn.dataset.index), 1);
            renderEnchantList();
            updateCommand();
        });

        renderEnchantList();
    }

    // ===== ICON-GRID PICKER (item/mob picker) =====
    function createPicker(opts) {
        const search = document.getElementById(opts.searchId);
        const tabs = document.getElementById(opts.tabsId);
        const grid = document.getElementById(opts.gridId);
        if (!search || !tabs || !grid) return null;

        let category = 'all';
        let selectedId = opts.initialId;

        function renderTabs() {
            const entries = opts.getEntries();
            tabs.innerHTML = '';

            const allBtn = document.createElement('button');
            allBtn.type = 'button';
            allBtn.className = `mcg-picker-tab${category === 'all' ? ' active' : ''}`;
            allBtn.dataset.category = 'all';
            allBtn.textContent = `${t('picker_all')} (${entries.length})`;
            tabs.appendChild(allBtn);

            opts.categoryOrder.forEach((key) => {
                const count = entries.filter((entry) => entry.category === key).length;
                if (!count) return;
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `mcg-picker-tab${category === key ? ' active' : ''}`;
                btn.dataset.category = key;
                btn.textContent = `${categoryLabel(opts.categoryLabels, key)} (${count})`;
                tabs.appendChild(btn);
            });

            tabs.querySelectorAll('.mcg-picker-tab').forEach((btn) => {
                btn.addEventListener('click', () => {
                    category = btn.dataset.category;
                    tabs.querySelectorAll('.mcg-picker-tab').forEach((b) => b.classList.toggle('active', b === btn));
                    renderGrid();
                });
            });
        }

        function renderGrid() {
            const entries = opts.getEntries();
            grid.innerHTML = '';

            if (!entries.length) {
                grid.innerHTML = `<p class="mcg-picker-state">${escapeHtml(t('picker_loading'))}</p>`;
                return;
            }

            const query = search.value.trim().toLowerCase();
            let filtered = category === 'all' ? entries : entries.filter((entry) => entry.category === category);
            if (query) filtered = filtered.filter((entry) => entry.name.toLowerCase().includes(query));

            if (!filtered.length) {
                grid.innerHTML = `<p class="mcg-picker-state">${escapeHtml(t('picker_empty'))}</p>`;
                return;
            }

            filtered.forEach((entry) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `mcg-picker-item${entry.id === selectedId ? ' active' : ''}`;
                btn.dataset.id = entry.id;
                btn.title = entry.name;

                const img = document.createElement('img');
                img.src = entry.icon;
                img.alt = '';
                img.loading = 'lazy';
                img.addEventListener('error', () => { img.style.visibility = 'hidden'; });

                const label = document.createElement('span');
                label.textContent = entry.name;

                btn.appendChild(img);
                btn.appendChild(label);
                btn.addEventListener('click', () => {
                    selectedId = entry.id;
                    grid.querySelectorAll('.mcg-picker-item').forEach((b) => b.classList.toggle('active', b === btn));
                    opts.onSelect(entry);
                    updateCommand();
                });

                grid.appendChild(btn);
            });
        }

        search.addEventListener('input', renderGrid);

        return {
            refresh() {
                renderTabs();
                renderGrid();
            }
        };
    }

    // ===== COPY =====
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

    function copyCommand() {
        const text = el.command ? el.command.textContent : '';
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
        el.tabs = Array.from(document.querySelectorAll('.mcg-tab'));
        el.panels = Array.from(document.querySelectorAll('.mcg-panel'));
        el.command = document.getElementById('mcgCommand');
        el.copyBtn = document.getElementById('mcgCopy');
        el.wrap = document.querySelector('.mcg-panel-wrap');
        if (!el.wrap || !el.command) return;

        el.tabs.forEach((btn) => btn.addEventListener('click', () => setTab(btn.dataset.tab)));

        ['mcgGiveTarget', 'mcgEffectTarget', 'mcgEnchantTarget', 'mcgTpTarget', 'mcgGmTarget'].forEach((id) => {
            initTargetToggle(id, id + 'CustomWrap');
        });
        initTeleportMode();
        initTimePresets();
        initEffectInfinite();
        initEnchantList();
        const itemCategoryOrder = ITEM_FILES.map((f) => f.category);
        const mobCategoryOrder = MOB_FILES.map((f) => f.category);
        pickers = [
            createPicker({
                searchId: 'mcgGiveItemSearch', tabsId: 'mcgGiveItemTabs', gridId: 'mcgGiveItemGrid',
                getEntries: () => state.itemEntries, categoryOrder: itemCategoryOrder, categoryLabels: ITEM_CATEGORY_LABELS,
                initialId: state.lastItemId, onSelect: (entry) => { state.lastItemId = entry.id; }
            }),
            createPicker({
                searchId: 'mcgSummonMobSearch', tabsId: 'mcgSummonMobTabs', gridId: 'mcgSummonMobGrid',
                getEntries: () => state.mobEntries, categoryOrder: mobCategoryOrder, categoryLabels: MOB_CATEGORY_LABELS,
                initialId: state.lastMobId, onSelect: (entry) => { state.lastMobId = entry.id; }
            }),
            createPicker({
                searchId: 'mcgEnchantItemSearch', tabsId: 'mcgEnchantItemTabs', gridId: 'mcgEnchantItemGrid',
                getEntries: () => state.itemEntries, categoryOrder: itemCategoryOrder, categoryLabels: ITEM_CATEGORY_LABELS,
                initialId: state.lastEnchantItemId, onSelect: (entry) => { state.lastEnchantItemId = entry.id; }
            })
        ].filter(Boolean);

        // One delegated listener covers every field in every panel.
        el.wrap.addEventListener('input', updateCommand);
        el.wrap.addEventListener('change', updateCommand);

        if (el.copyBtn) el.copyBtn.addEventListener('click', copyCommand);

        setTab('give');
        loadCatalogs();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
