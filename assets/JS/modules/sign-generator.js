const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

const I18N = {
    de: {
        toast_loaded_title: 'Bereit',
        toast_loaded_message: 'Schild-Generator geladen.',
        toast_error_title: 'Fehler',
        toast_data_failed: 'Die Schild-Daten konnten nicht geladen werden.',
        toast_saved_title: 'Gespeichert',
        toast_downloaded: 'PNG heruntergeladen.',
        toast_copied_title: 'Kopiert',
        toast_image_copied: 'Bild in die Zwischenablage kopiert.',
        toast_command_copied: '{cmd}-Befehl kopiert.',
        toast_copy_failed: 'Kopieren hat nicht geklappt.',
        toast_info_title: 'Info',
        toast_side_cleared: '{side} geleert.',
        toast_example: 'Beispieltext eingesetzt.',
        toast_waxed_for_commands: 'Klick-Befehle funktionieren nur auf gewachsten Schildern – „Gewachst“ ist jetzt an.',
        state_loading: 'Holzarten werden geladen …',
        state_failed: 'Die Schild-Daten konnten nicht geladen werden.',
        side_front: 'Vorderseite',
        side_back: 'Rückseite',
        kind_standing: 'Standschild',
        kind_wall: 'Wandschild',
        kind_hanging: 'Hängeschild',
        kind_wall_hanging: 'Wand-Hängeschild',
        line_label: 'Zeile {n}',
        line_placeholder: 'Text für Zeile {n}',
        line_color: 'Farbe von Zeile {n}',
        line_custom_color: 'Eigene Farbe für Zeile {n}',
        line_styles: 'Formatierung von Zeile {n}',
        line_width: '{used} / {max} px',
        line_cut: 'Zu breit – im Spiel fehlt: „{rest}“',
        color_dye: 'Farbe des Farbstoffs',
        color_custom: 'Eigene Farbe …',
        dye_custom: 'Eigene Farbe',
        dye_custom_hint: 'Ein Schild speichert nur einen der 16 Farbstoffe. Die eigene Farbe steht deshalb in jeder Zeile ohne eigene Farbe und erscheint in voller Helligkeit. Für den Leuchtrand nimmt das Spiel den ähnlichsten Farbstoff ({dye}).',
        style_bold: 'Fett',
        style_italic: 'Kursiv',
        style_underlined: 'Unterstrichen',
        style_strikethrough: 'Durchgestrichen',
        style_obfuscated: 'Verschleiert (wechselnde Zeichen)',
        click_summary: 'Befehl beim Anklicken',
        click_label: 'Befehl für Zeile {n}',
        click_placeholder: '/say Hallo!',
        rotation_option: '{n} – Vorderseite nach {dir}',
        facing_option: 'Vorderseite nach {dir}',
        size_info: 'PNG: {w} × {h} px',
        preview_label: 'Vorschau: {wood}, {side}',
        cmd_chars: '{n} Zeichen',
        cmd_too_long: '{n} Zeichen – zu lang für den Chat (max. 256). Nutze einen Befehlsblock.',
        wood_since: '{wood} gibt es erst ab Minecraft {version}. In älteren Versionen funktionieren die Befehle damit nicht.'
    },
    en: {
        toast_loaded_title: 'Ready',
        toast_loaded_message: 'Sign generator loaded.',
        toast_error_title: 'Error',
        toast_data_failed: 'The sign data could not be loaded.',
        toast_saved_title: 'Saved',
        toast_downloaded: 'PNG downloaded.',
        toast_copied_title: 'Copied',
        toast_image_copied: 'Image copied to the clipboard.',
        toast_command_copied: '{cmd} command copied.',
        toast_copy_failed: 'Copying did not work.',
        toast_info_title: 'Info',
        toast_side_cleared: '{side} cleared.',
        toast_example: 'Example text inserted.',
        toast_waxed_for_commands: 'Click commands only work on waxed signs – “Waxed” is now on.',
        state_loading: 'Loading wood types …',
        state_failed: 'The sign data could not be loaded.',
        side_front: 'Front',
        side_back: 'Back',
        kind_standing: 'Standing sign',
        kind_wall: 'Wall sign',
        kind_hanging: 'Hanging sign',
        kind_wall_hanging: 'Wall hanging sign',
        line_label: 'Line {n}',
        line_placeholder: 'Text for line {n}',
        line_color: 'Colour of line {n}',
        line_custom_color: 'Custom colour for line {n}',
        line_styles: 'Formatting of line {n}',
        line_width: '{used} / {max} px',
        line_cut: 'Too wide – missing in game: “{rest}”',
        color_dye: 'Dye colour',
        color_custom: 'Custom colour …',
        dye_custom: 'Custom colour',
        dye_custom_hint: 'A sign only stores one of the 16 dyes. The custom colour is therefore written into every line without its own colour and shows at full brightness. For the glow outline the game uses the closest dye ({dye}).',
        style_bold: 'Bold',
        style_italic: 'Italic',
        style_underlined: 'Underlined',
        style_strikethrough: 'Strikethrough',
        style_obfuscated: 'Obfuscated (changing characters)',
        click_summary: 'Command on click',
        click_label: 'Command for line {n}',
        click_placeholder: '/say Hello!',
        rotation_option: '{n} – front faces {dir}',
        facing_option: 'Front faces {dir}',
        size_info: 'PNG: {w} × {h} px',
        preview_label: 'Preview: {wood}, {side}',
        cmd_chars: '{n} characters',
        cmd_too_long: '{n} characters – too long for chat (max. 256). Use a command block.',
        wood_since: '{wood} only exists from Minecraft {version}. The commands will not work with it in older versions.'
    }
};

(function () {
    const DATA_URL = '/assets/JS/signs/signs.json';
    const CHAT_LIMIT = 256;
    const STYLES = ['bold', 'italic', 'underlined', 'strikethrough', 'obfuscated'];
    const STYLE_ICONS = { bold: 'fa-bold', italic: 'fa-italic', underlined: 'fa-underline', strikethrough: 'fa-strikethrough', obfuscated: 'fa-shuffle' };
    // Chat colours (ChatFormatting), unchanged since Java Beta.
    const TEXT_COLORS = {
        black: '#000000', dark_blue: '#0000AA', dark_green: '#00AA00', dark_aqua: '#00AAAA',
        dark_red: '#AA0000', dark_purple: '#AA00AA', gold: '#FFAA00', gray: '#AAAAAA',
        dark_gray: '#555555', blue: '#5555FF', green: '#55FF55', aqua: '#55FFFF',
        red: '#FF5555', light_purple: '#FF55FF', yellow: '#FFFF55', white: '#FFFFFF'
    };
    const TEXT_COLOR_NAMES = {
        de: {
            black: 'Schwarz', dark_blue: 'Dunkelblau', dark_green: 'Dunkelgrün', dark_aqua: 'Dunkeltürkis',
            dark_red: 'Dunkelrot', dark_purple: 'Dunkelviolett', gold: 'Gold', gray: 'Grau',
            dark_gray: 'Dunkelgrau', blue: 'Blau', green: 'Grün', aqua: 'Türkis',
            red: 'Rot', light_purple: 'Hellviolett', yellow: 'Gelb', white: 'Weiß'
        },
        en: {
            black: 'Black', dark_blue: 'Dark Blue', dark_green: 'Dark Green', dark_aqua: 'Dark Aqua',
            dark_red: 'Dark Red', dark_purple: 'Dark Purple', gold: 'Gold', gray: 'Gray',
            dark_gray: 'Dark Gray', blue: 'Blue', green: 'Green', aqua: 'Aqua',
            red: 'Red', light_purple: 'Light Purple', yellow: 'Yellow', white: 'White'
        }
    };
    // rotation 0 = front faces south, then clockwise in 22.5° steps.
    const DIRECTIONS = {
        de: ['Süden', 'Süd-Südwesten', 'Südwesten', 'West-Südwesten', 'Westen', 'West-Nordwesten', 'Nordwesten', 'Nord-Nordwesten',
            'Norden', 'Nord-Nordosten', 'Nordosten', 'Ost-Nordosten', 'Osten', 'Ost-Südosten', 'Südosten', 'Süd-Südosten'],
        en: ['south', 'south-southwest', 'southwest', 'west-southwest', 'west', 'west-northwest', 'northwest', 'north-northwest',
            'north', 'north-northeast', 'northeast', 'east-northeast', 'east', 'east-southeast', 'southeast', 'south-southeast']
    };
    const FACINGS = { south: 0, west: 4, north: 8, east: 12 };
    // snbt: text components as SNBT (1.21.5+) instead of JSON strings; components: item components (1.20.5+).
    // signComponents (26.3+): sign text and wax are item components, and click commands
    // need allow_op_features on the sign.
    const VERSIONS = {
        v263: { from: [26, 3], snbt: true, components: true, signComponents: true },
        modern: { from: [1, 21, 5], snbt: true, components: true },
        components: { from: [1, 20, 5], snbt: false, components: true },
        legacy: { from: [1, 20], snbt: false, components: false }
    };
    // Woods newer than the oldest supported version.
    const WOOD_SINCE = { pale_oak: [1, 21, 4], poplar: [26, 3] };
    const EXAMPLE = {
        de: [
            { text: '★ MC-Craft ★', color: 'gold', bold: true },
            { text: 'Willkommen' },
            { text: 'Viel Spaß!' },
            { text: 'mc-craft.com', color: 'dark_gray', italic: true }
        ],
        en: [
            { text: '★ MC-Craft ★', color: 'gold', bold: true },
            { text: 'Welcome' },
            { text: 'Have fun!' },
            { text: 'mc-craft.com', color: 'dark_gray', italic: true }
        ]
    };
    const OUTLINE = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    const state = {
        kind: 'standing',
        wood: 'oak',
        side: 'front',
        attached: false,
        rotation: 0,
        facing: 'south',
        waxed: false,
        version: 'v263',
        pos: '~ ~ ~',
        target: '@p',
        view: 'side',
        scale: 4,
        sides: { front: newSide(), back: newSide() }
    };
    const font = { glyphs: new Map(), byAdvance: new Map(), sheets: new Map(), tinted: new Map(), fallback: null };
    const textures = new Map();
    const el = {};
    let data = null;
    let ctx = null;
    let animTimer = 0;

    function newLine(values) {
        return Object.assign({ text: '', color: '', bold: false, italic: false, underlined: false, strikethrough: false, obfuscated: false, command: '' }, values);
    }

    function newSide(lines) {
        return { dye: 'black', customColor: '#E07B39', glow: false, lines: [0, 1, 2, 3].map((i) => newLine(lines && lines[i])) };
    }

    function currentSide() {
        return state.sides[state.side];
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Image failed: ' + src));
            img.src = src;
        });
    }

    function hexToRgb(hex) {
        const n = parseInt(hex.slice(1), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function rgbToHex(rgb) {
        return '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
    }

    function darkColor(hex) {
        return rgbToHex(hexToRgb(hex).map((v) => Math.floor(v * data.dark_factor)));
    }

    function versionAtLeast(a, b) {
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            const diff = (a[i] || 0) - (b[i] || 0);
            if (diff) return diff > 0;
        }
        return true;
    }

    // ===== BITMAP FONT (same rules as Minecraft's BitmapProvider) =====
    async function loadFont(providers) {
        for (const p of providers) {
            if (p.type === 'space') {
                Object.entries(p.advances).forEach(([ch, advance]) => {
                    if (!font.glyphs.has(ch)) font.glyphs.set(ch, { advance });
                });
                continue;
            }
            const img = await loadImage(p.file);
            const sheet = document.createElement('canvas');
            sheet.width = img.width;
            sheet.height = img.height;
            const sheetCtx = sheet.getContext('2d', { willReadFrequently: true });
            sheetCtx.drawImage(img, 0, 0);
            const pixels = sheetCtx.getImageData(0, 0, img.width, img.height).data;
            font.sheets.set(p.file, sheet);

            const rows = p.chars.map((row) => Array.from(row));
            const cellW = img.width / rows[0].length;
            const cellH = img.height / rows.length;
            const scale = p.height / cellH;
            rows.forEach((row, r) => row.forEach((ch, c) => {
                if (ch === '\u0000' || font.glyphs.has(ch)) return;
                const sx = c * cellW;
                const sy = r * cellH;
                // Width = rightmost column with a visible pixel.
                let width = 0;
                for (let x = cellW - 1; x >= 0 && !width; x--) {
                    for (let y = 0; y < cellH; y++) {
                        if (pixels[((sy + y) * img.width + sx + x) * 4 + 3]) {
                            width = x + 1;
                            break;
                        }
                    }
                }
                const glyph = { sheet: p.file, sx, sy, w: cellW, h: cellH, scale, top: 7 - p.ascent, advance: Math.floor(0.5 + width * scale) + 1 };
                font.glyphs.set(ch, glyph);
                if (ch !== ' ') {
                    if (!font.byAdvance.has(glyph.advance)) font.byAdvance.set(glyph.advance, []);
                    font.byAdvance.get(glyph.advance).push(glyph);
                }
            }));
        }
        font.fallback = font.glyphs.get('?');
    }

    function glyphFor(ch) {
        return font.glyphs.get(ch) || font.fallback;
    }

    function advanceOf(ch, bold) {
        return glyphFor(ch).advance + (bold ? 1 : 0);
    }

    function textWidth(chars, bold) {
        return chars.reduce((sum, ch) => sum + advanceOf(ch, bold), 0);
    }

    // The part of a line the game shows: the first line of its word wrap.
    function visibleText(line, maxWidth) {
        const chars = Array.from(line.text);
        let width = 0;
        let lastSpace = -1;
        let seenWidth = false;
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === ' ') lastSpace = i;
            const advance = advanceOf(chars[i], line.bold);
            width += advance;
            if (seenWidth && width > maxWidth) {
                const cut = lastSpace !== -1 ? lastSpace : i;
                return { shown: chars.slice(0, cut), rest: chars.slice(cut).join('').trim() };
            }
            seenWidth = seenWidth || advance !== 0;
        }
        return { shown: chars, rest: '' };
    }

    function tintedSheet(file, color) {
        const key = file + color;
        let sheet = font.tinted.get(key);
        if (!sheet) {
            const source = font.sheets.get(file);
            sheet = document.createElement('canvas');
            sheet.width = source.width;
            sheet.height = source.height;
            const c = sheet.getContext('2d');
            c.drawImage(source, 0, 0);
            c.globalCompositeOperation = 'source-in';
            c.fillStyle = color;
            c.fillRect(0, 0, sheet.width, sheet.height);
            font.tinted.set(key, sheet);
        }
        return sheet;
    }

    function drawGlyph(g, x, y, S, color, italic) {
        const sheet = tintedSheet(g.sheet, color);
        const w = g.w * g.scale * S;
        const h = g.h * g.scale * S;
        if (italic) {
            // Minecraft leans glyphs: +1 px at the line top, 0.25 px less per pixel down.
            ctx.setTransform(1, 0, -0.25, 1, x + S + 0.25 * y, 0);
            ctx.drawImage(sheet, g.sx, g.sy, g.w, g.h, 0, y + g.top * S, w, h);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
            ctx.drawImage(sheet, g.sx, g.sy, g.w, g.h, x, y + g.top * S, w, h);
        }
    }

    // One line at (x, y) = its top left in canvas pixels; S canvas pixels per text pixel.
    function drawLine(line, chars, x, y, S, color, outline) {
        const offsets = outline ? OUTLINE : [[0, 0]];
        const paint = outline || color;
        let cx = 0;
        chars.forEach((ch) => {
            let g = glyphFor(ch);
            if (line.obfuscated && ch !== ' ' && g.sheet) {
                const pool = font.byAdvance.get(g.advance);
                if (pool) g = pool[Math.floor(Math.random() * pool.length)];
            }
            const advance = g.advance + (line.bold ? 1 : 0);
            offsets.forEach(([dx, dy]) => {
                const gx = x + (cx + dx) * S;
                const gy = y + dy * S;
                if (g.sheet) {
                    drawGlyph(g, gx, gy, S, paint, line.italic);
                    if (line.bold) drawGlyph(g, gx + S, gy, S, paint, line.italic);
                }
                ctx.fillStyle = paint;
                if (line.strikethrough) ctx.fillRect(gx - S, gy + 3.5 * S, (advance + 1) * S, S);
                if (line.underlined) ctx.fillRect(gx - S, gy + 8 * S, (advance + 1) * S, S);
            });
            cx += advance;
        });
    }

    function displayColor(value) {
        if (!value) return '';
        return value.charAt(0) === '#' ? value.toUpperCase() : TEXT_COLORS[value];
    }

    function nearestDye(hex) {
        const rgb = hexToRgb(hex);
        let best = data.dyes[0];
        let bestDistance = Infinity;
        data.dyes.forEach((dye) => {
            const distance = hexToRgb(dye.text).reduce((sum, v, i) => sum + (v - rgb[i]) ** 2, 0);
            if (distance < bestDistance) {
                best = dye;
                bestDistance = distance;
            }
        });
        return best;
    }

    // The dye stored on the sign; a custom colour keeps the closest dye (used for the glow outline).
    function signDye(side) {
        if (side.dye === 'custom') return nearestDye(side.customColor);
        return data.dyes.find((d) => d.id === side.dye) || data.dyes[data.dyes.length - 1];
    }

    // A custom side colour goes into every line that has no colour of its own.
    function effectiveColor(line, side) {
        return line.color || (side.dye === 'custom' && line.text ? side.customColor : '');
    }

    // Same colours as AbstractSignRenderer: dye x 0.4 without glow ink; with it the dye
    // colour plus an 8-way outline in the darkened colour (black gets a light outline).
    // Colours set on a line are not darkened.
    function drawSignText(side, kind, cx, cy, S) {
        const dye = signDye(side);
        const base = side.glow ? dye.text : darkColor(dye.text);
        const outline = side.glow ? (dye.id === 'black' ? data.glow_black_outline : darkColor(dye.text)) : null;
        const lineHeight = kind.line_height;
        const top = Math.floor(4 * lineHeight / 2);
        side.lines.forEach((line, i) => {
            const chars = visibleText(line, kind.max_width).shown;
            const x = cx - textWidth(chars, line.bold) / 2 * S;
            const y = cy + (i * lineHeight - top) * S;
            const color = displayColor(effectiveColor(line, side)) || base;
            if (outline) drawLine(line, chars, x, y, S, color, outline);
            drawLine(line, chars, x, y, S, color, null);
        });
    }

    // ===== SIGN MODEL (front view of the block model) =====
    function kindKey() {
        return state.kind === 'hanging' && state.attached ? 'hanging_attached' : state.kind;
    }

    function kindData() {
        return data.kinds[kindKey()];
    }

    function isHanging() {
        return state.kind === 'hanging' || state.kind === 'wall_hanging';
    }

    function woodData() {
        return data.woods.find((w) => w.id === state.wood) || data.woods[0];
    }

    function woodTexture() {
        const wood = woodData();
        return isHanging() ? wood.hanging_texture : wood.texture;
    }

    function projectPart(part, back) {
        let x0 = part.from[0];
        let x1 = part.to[0];
        if (part.angle) {
            // Chains are crossed quads; project them onto the front plane.
            const a = part.angle * Math.PI / 180;
            const [ox, , oz] = part.origin;
            const px = (x, z) => ox + (x - ox) * Math.cos(a) + (z - oz) * Math.sin(a);
            const p0 = px(part.from[0], part.from[2]);
            const p1 = px(part.to[0], part.to[2]);
            x0 = Math.min(p0, p1);
            x1 = Math.max(p0, p1);
        }
        if (back) [x0, x1] = [16 - x1, 16 - x0];
        return { x0, x1, y0: part.from[1], y1: part.to[1], z: (part.from[2] + part.to[2]) / 2 };
    }

    function sideLayout(side) {
        const kind = kindData();
        const back = side === 'back';
        const faces = kind.parts
            .map((part) => ({ uv: back ? part.back : part.front, rect: projectPart(part, back) }))
            .filter((f) => f.uv)
            // Far faces first.
            .sort((a, b) => (back ? b.rect.z - a.rect.z : a.rect.z - b.rect.z));
        const board = projectPart(kind.parts[kind.board], back);
        return {
            side,
            kind,
            faces,
            board,
            minX: Math.min(...faces.map((f) => f.rect.x0)),
            maxX: Math.max(...faces.map((f) => f.rect.x1)),
            minY: Math.min(...faces.map((f) => f.rect.y0)),
            maxY: Math.max(...faces.map((f) => f.rect.y1))
        };
    }

    function drawFace(img, uv, dx, dy, dw, dh) {
        const k = img.width / 16;
        const [u0, v0, u1, v1] = uv.map((v) => v * k);
        const sw = Math.abs(u1 - u0);
        const sh = Math.abs(v1 - v0);
        if (!sw || !sh || dw <= 0 || dh <= 0) return;
        ctx.save();
        ctx.translate(dx + (u1 < u0 ? dw : 0), dy + (v1 < v0 ? dh : 0));
        ctx.scale(u1 < u0 ? -1 : 1, v1 < v0 ? -1 : 1);
        ctx.drawImage(img, Math.min(u0, u1), Math.min(v0, v1), sw, sh, 0, 0, dw, dh);
        ctx.restore();
    }

    function drawSide(layout, ox, oy, S) {
        const unit = layout.kind.text_per_unit * S;
        const img = textures.get(woodTexture());
        const px = (x) => Math.round(ox + (x - layout.minX) * unit);
        const py = (y) => Math.round(oy + (layout.maxY - y) * unit);
        if (img) {
            layout.faces.forEach((f) => {
                drawFace(img, f.uv, px(f.rect.x0), py(f.rect.y1), px(f.rect.x1) - px(f.rect.x0), py(f.rect.y0) - py(f.rect.y1));
            });
        }
        const cx = ox + ((layout.board.x0 + layout.board.x1) / 2 - layout.minX) * unit;
        const cy = oy + (layout.maxY - (layout.board.y0 + layout.board.y1) / 2) * unit;
        drawSignText(state.sides[layout.side], layout.kind, cx, cy, S);
    }

    function render() {
        if (!data || !ctx) return;
        const S = state.scale;
        const layouts = (state.view === 'both' ? ['front', 'back'] : [state.side]).map(sideLayout);
        const sizes = layouts.map((l) => ({
            w: Math.round((l.maxX - l.minX) * l.kind.text_per_unit * S),
            h: Math.round((l.maxY - l.minY) * l.kind.text_per_unit * S)
        }));
        const gap = layouts.length > 1 ? 16 * S : 0;
        el.canvas.width = sizes.reduce((sum, s) => sum + s.w, 0) + gap * (layouts.length - 1);
        el.canvas.height = Math.max(...sizes.map((s) => s.h));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, el.canvas.width, el.canvas.height);
        ctx.imageSmoothingEnabled = false;
        let x = 0;
        layouts.forEach((layout, i) => {
            drawSide(layout, x, el.canvas.height - sizes[i].h, S);
            x += sizes[i].w + gap;
        });
        el.sizeInfo.textContent = t('size_info', { w: el.canvas.width, h: el.canvas.height });
        const wood = woodData();
        el.canvas.setAttribute('aria-label', t('preview_label', {
            wood: (isHanging() ? wood.hanging_name : wood.name)[lang],
            side: state.view === 'both' ? `${t('side_front')} + ${t('side_back')}` : t('side_' + state.side)
        }));
    }

    function updateAnimation() {
        const sides = state.view === 'both' ? ['front', 'back'] : [state.side];
        const needed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
            sides.some((s) => state.sides[s].lines.some((l) => l.obfuscated && l.text.trim()));
        if (needed && !animTimer) animTimer = setInterval(render, 80);
        if (!needed && animTimer) {
            clearInterval(animTimer);
            animTimer = 0;
        }
    }

    // ===== COMMANDS =====
    function snbtString(value) {
        return '"' + value.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }

    function snbtSingle(value) {
        return "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    }

    function isStyled(line) {
        return Boolean(line.color || line.command.trim() || STYLES.some((k) => line[k]));
    }

    function componentValue(line, snbt) {
        const command = line.command.trim();
        const color = line.color.charAt(0) === '#' ? line.color.toUpperCase() : line.color;
        if (snbt) {
            if (!isStyled(line)) return snbtString(line.text);
            const parts = ['text:' + snbtString(line.text)];
            if (color) parts.push('color:' + snbtString(color));
            STYLES.forEach((k) => { if (line[k]) parts.push(k + ':true'); });
            if (command) parts.push('click_event:{action:"run_command",command:' + snbtString(command) + '}');
            return '{' + parts.join(',') + '}';
        }
        if (!isStyled(line)) return snbtSingle(JSON.stringify(line.text));
        const json = { text: line.text };
        if (color) json.color = color;
        STYLES.forEach((k) => { if (line[k]) json[k] = true; });
        if (command) json.clickEvent = { action: 'run_command', value: command };
        return snbtSingle(JSON.stringify(json));
    }

    function sideIsEmpty(side) {
        return signDye(side).id === 'black' && !side.glow && side.lines.every((l) => !l.text && !isStyled(l));
    }

    function sideNbt(side, snbt) {
        const parts = [];
        const dye = signDye(side).id;
        if (dye !== 'black') parts.push('color:' + snbtString(dye));
        if (side.glow) parts.push('has_glowing_text:1b');
        const lines = side.lines.map((l) => Object.assign({}, l, { color: effectiveColor(l, side) }));
        parts.push('messages:[' + lines.map((l) => componentValue(l, snbt)).join(',') + ']');
        return '{' + parts.join(',') + '}';
    }

    function hasClickCommands() {
        return ['front', 'back'].some((s) => state.sides[s].lines.some((l) => l.command.trim()));
    }

    // full: also the defaults, so /data merge replaces what the sign had before.
    // opFeatures: 26.3 only runs click commands on signs with allow_op_features.
    function blockEntityNbt(snbt, full, opFeatures) {
        const parts = ['front_text:' + sideNbt(state.sides.front, snbt)];
        if (full || !sideIsEmpty(state.sides.back)) parts.push('back_text:' + sideNbt(state.sides.back, snbt));
        if (full || state.waxed) parts.push('is_waxed:' + (state.waxed ? '1b' : '0b'));
        if (opFeatures) parts.push('allow_op_features:1b');
        return parts.join(',');
    }

    // Default states (rotation 0, facing north, not attached) are left out to keep commands short.
    function blockState() {
        const props = [];
        if (state.kind === 'hanging' && state.attached) props.push('attached=true');
        if (state.kind === 'standing' || state.kind === 'hanging') {
            if (state.rotation) props.push(`rotation=${state.rotation}`);
        } else if (state.facing !== 'north') {
            props.push(`facing=${state.facing}`);
        }
        return props.length ? `[${props.join(',')}]` : '';
    }

    function cleanArg(value, fallback) {
        return value.trim().replace(/\s+/g, ' ') || fallback;
    }

    function buildCommands() {
        const version = VERSIONS[state.version];
        const wood = woodData();
        const kind = kindData();
        const pos = cleanArg(state.pos, '~ ~ ~');
        const target = cleanArg(state.target, '@p');
        // Ids without "minecraft:" - the default namespace - so more fits into the 256 chat characters.
        const item = `${wood.id}${isHanging() ? '_hanging_sign' : '_sign'}`;
        const entity = kind.entity.replace('minecraft:', '');
        const opFeatures = Boolean(version.signComponents) && hasClickCommands();
        const nbt = blockEntityNbt(version.snbt, false, opFeatures);
        let give;
        if (version.signComponents) {
            // Placing the item applies these components over block_entity_data, so the text must live here.
            const parts = ['sign_text_front=' + sideNbt(state.sides.front, true)];
            if (!sideIsEmpty(state.sides.back)) parts.push('sign_text_back=' + sideNbt(state.sides.back, true));
            if (state.waxed) parts.push('waxed={}');
            if (opFeatures) parts.push(`block_entity_data={id:"${entity}",allow_op_features:1b}`);
            give = `/give ${target} ${item}[${parts.join(',')}]`;
        } else if (version.components) {
            give = `/give ${target} ${item}[block_entity_data={id:"${entity}",${nbt}}]`;
        } else {
            give = `/give ${target} ${item}{BlockEntityTag:{${nbt}}}`;
        }
        return {
            setblock: `/setblock ${pos} ${wood.id}${kind.block}${blockState()}{${nbt}}`,
            give,
            data: `/data merge block ${pos} {${blockEntityNbt(version.snbt, true, opFeatures)}}`
        };
    }

    function updateCommands() {
        if (!data) return;
        const commands = buildCommands();
        let anyTooLong = false;
        Object.entries(commands).forEach(([key, command]) => {
            el.cmd[key].textContent = command;
            const info = el.cmdInfo[key];
            const tooLong = command.length > CHAT_LIMIT;
            anyTooLong = anyTooLong || tooLong;
            info.textContent = t(tooLong ? 'cmd_too_long' : 'cmd_chars', { n: command.length });
            info.classList.toggle('is-warning', tooLong);
        });
        // Show the command block guide once, the first time a command gets too long for chat.
        if (anyTooLong && el.cmdGuide && !el.cmdGuide.dataset.shown) {
            el.cmdGuide.dataset.shown = '1';
            el.cmdGuide.open = true;
        }
        syncPosPresets();
        const since = WOOD_SINCE[state.wood];
        const tooOld = since && !versionAtLeast(VERSIONS[state.version].from, since);
        el.versionNotice.hidden = !tooOld;
        if (tooOld) {
            const wood = woodData();
            el.versionNotice.textContent = t('wood_since', { wood: (isHanging() ? wood.hanging_name : wood.name)[lang], version: since.join('.') });
        }
    }

    function syncPosPresets() {
        const pos = cleanArg(state.pos, '~ ~ ~');
        document.querySelectorAll('.pos-preset').forEach((btn) => {
            const on = btn.dataset.pos === pos;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });
    }

    function refresh() {
        render();
        updateCommands();
        updateAnimation();
    }

    // ===== UI =====
    function renderWoodGrid() {
        el.woodGrid.innerHTML = data.woods.map((wood) => {
            const name = (isHanging() ? wood.hanging_name : wood.name)[lang];
            const icon = isHanging() ? wood.hanging_icon : wood.icon;
            const active = wood.id === state.wood;
            return `<button type="button" class="wood-btn${active ? ' active' : ''}" data-wood="${wood.id}" aria-pressed="${active}" title="${escapeHtml(name)}">
                <img src="${icon}" alt="" width="32" height="32" loading="lazy">
                <span>${escapeHtml(name)}</span>
            </button>`;
        }).join('');
    }

    function colorOptions() {
        const names = TEXT_COLOR_NAMES[lang];
        return `<option value="">${escapeHtml(t('color_dye'))}</option>` +
            Object.keys(TEXT_COLORS).map((id) => `<option value="${id}">${escapeHtml(names[id])}</option>`).join('') +
            `<option value="custom">${escapeHtml(t('color_custom'))}</option>`;
    }

    function renderLineEditor() {
        const options = colorOptions();
        el.linesEditor.innerHTML = [0, 1, 2, 3].map((i) => {
            const n = i + 1;
            const styles = STYLES.map((k) => `<button type="button" class="style-toggle" data-style="${k}" aria-pressed="false" title="${escapeHtml(t('style_' + k))}" aria-label="${escapeHtml(t('style_' + k))}"><i class="fas ${STYLE_ICONS[k]}" aria-hidden="true"></i></button>`).join('');
            return `<div class="line-row" data-line="${i}">
                <div class="line-head">
                    <label for="lineText${i}">${escapeHtml(t('line_label', { n }))}</label>
                    <span class="line-width" id="lineWidth${i}"></span>
                </div>
                <input type="text" class="line-input" id="lineText${i}" maxlength="200" spellcheck="false" autocomplete="off" placeholder="${escapeHtml(t('line_placeholder', { n }))}">
                <p class="line-cut" id="lineCut${i}" hidden></p>
                <div class="line-tools">
                    <select class="line-color" aria-label="${escapeHtml(t('line_color', { n }))}">${options}</select>
                    <input type="color" class="line-custom" value="#FFAA00" aria-label="${escapeHtml(t('line_custom_color', { n }))}" hidden>
                    <div class="style-toggles" role="group" aria-label="${escapeHtml(t('line_styles', { n }))}">${styles}</div>
                </div>
                <details class="line-command">
                    <summary><i class="fas fa-computer-mouse" aria-hidden="true"></i> ${escapeHtml(t('click_summary'))}</summary>
                    <input type="text" class="line-cmd" maxlength="250" spellcheck="false" autocomplete="off" aria-label="${escapeHtml(t('click_label', { n }))}" placeholder="${escapeHtml(t('click_placeholder'))}">
                </details>
            </div>`;
        }).join('');
    }

    function renderDyeGrid() {
        el.dyeGrid.innerHTML = data.dyes.map((dye) => `<button type="button" class="dye-btn" data-dye="${dye.id}" aria-pressed="false" title="${escapeHtml(dye.name[lang])}" aria-label="${escapeHtml(dye.name[lang])}" style="--dye:${dye.text}"></button>`).join('') +
            `<label class="dye-custom" for="dyeCustomInput">
                <input type="color" id="dyeCustomInput" value="#e07b39">
                <span>${escapeHtml(t('dye_custom'))}</span>
            </label>`;
        el.dyeGrid.insertAdjacentHTML('afterend', '<p class="field-hint dye-custom-hint" id="dyeCustomHint" hidden></p>');
        el.dyeCustom = el.dyeGrid.querySelector('.dye-custom');
        el.dyeCustomInput = document.getElementById('dyeCustomInput');
        el.dyeCustomHint = document.getElementById('dyeCustomHint');
    }

    function syncDyeUi() {
        const side = currentSide();
        el.dyeGrid.querySelectorAll('.dye-btn').forEach((btn) => {
            const on = btn.dataset.dye === side.dye;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });
        const custom = side.dye === 'custom';
        el.dyeCustom.classList.toggle('active', custom);
        if (el.dyeCustomInput.value.toUpperCase() !== side.customColor) el.dyeCustomInput.value = side.customColor.toLowerCase();
        el.dyeCustomHint.hidden = !custom;
        if (custom) el.dyeCustomHint.textContent = t('dye_custom_hint', { dye: signDye(side).name[lang] });
    }

    function renderPlacementOptions() {
        el.rotationSelect.innerHTML = DIRECTIONS[lang].map((dir, n) => `<option value="${n}">${escapeHtml(t('rotation_option', { n, dir }))}</option>`).join('');
        el.facingSelect.innerHTML = Object.entries(FACINGS).map(([id, n]) => `<option value="${id}">${escapeHtml(t('facing_option', { dir: DIRECTIONS[lang][n] }))}</option>`).join('');
    }

    function updateLineWidths() {
        const kind = kindData();
        currentSide().lines.forEach((line, i) => {
            const used = textWidth(Array.from(line.text), line.bold);
            const widthEl = document.getElementById('lineWidth' + i);
            const cutEl = document.getElementById('lineCut' + i);
            widthEl.textContent = t('line_width', { used, max: kind.max_width });
            const rest = visibleText(line, kind.max_width).rest;
            widthEl.classList.toggle('is-over', Boolean(rest));
            cutEl.hidden = !rest;
            if (rest) cutEl.textContent = t('line_cut', { rest });
        });
    }

    function syncSideUi() {
        const side = currentSide();
        el.sideTabs.forEach((tab) => {
            const active = tab.dataset.side === state.side;
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-pressed', String(active));
        });
        el.linesEditor.querySelectorAll('.line-row').forEach((row) => {
            const line = side.lines[Number(row.dataset.line)];
            row.querySelector('.line-input').value = line.text;
            const custom = line.color.charAt(0) === '#';
            row.querySelector('.line-color').value = custom ? 'custom' : line.color;
            const picker = row.querySelector('.line-custom');
            picker.hidden = !custom;
            if (custom) picker.value = line.color.toLowerCase();
            row.querySelectorAll('.style-toggle').forEach((btn) => {
                const on = line[btn.dataset.style];
                btn.classList.toggle('active', on);
                btn.setAttribute('aria-pressed', String(on));
            });
            row.querySelector('.line-cmd').value = line.command;
            if (line.command) row.querySelector('.line-command').open = true;
        });
        syncDyeUi();
        el.glowToggle.checked = side.glow;
        updateLineWidths();
    }

    function syncKindUi() {
        el.kindGrid.querySelectorAll('.kind-btn').forEach((btn) => {
            const on = btn.dataset.kind === state.kind;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });
        const rotates = state.kind === 'standing' || state.kind === 'hanging';
        el.rotationField.hidden = !rotates;
        el.facingField.hidden = rotates;
        el.attachedRow.hidden = state.kind !== 'hanging';
        renderWoodGrid();
    }

    function lineFromEvent(target) {
        const row = target.closest('.line-row');
        return row ? { row, line: currentSide().lines[Number(row.dataset.line)] } : null;
    }

    function bindLineEditor() {
        el.linesEditor.addEventListener('input', (e) => {
            const hit = lineFromEvent(e.target);
            if (!hit) return;
            if (e.target.classList.contains('line-input')) hit.line.text = e.target.value;
            else if (e.target.classList.contains('line-cmd')) {
                hit.line.command = e.target.value;
                // Minecraft only runs click commands on waxed signs.
                if (hit.line.command.trim() && !state.waxed) {
                    state.waxed = true;
                    el.waxedToggle.checked = true;
                    showToast(t('toast_info_title'), t('toast_waxed_for_commands'), 'info');
                }
            }
            else if (e.target.classList.contains('line-custom')) hit.line.color = e.target.value.toUpperCase();
            else return;
            updateLineWidths();
            refresh();
        });
        el.linesEditor.addEventListener('change', (e) => {
            const hit = lineFromEvent(e.target);
            if (!hit || !e.target.classList.contains('line-color')) return;
            const picker = hit.row.querySelector('.line-custom');
            picker.hidden = e.target.value !== 'custom';
            hit.line.color = e.target.value === 'custom' ? picker.value.toUpperCase() : e.target.value;
            playClickSound();
            refresh();
        });
        el.linesEditor.addEventListener('click', (e) => {
            const btn = e.target.closest('.style-toggle');
            const hit = btn && lineFromEvent(btn);
            if (!hit) return;
            const key = btn.dataset.style;
            hit.line[key] = !hit.line[key];
            btn.classList.toggle('active', hit.line[key]);
            btn.setAttribute('aria-pressed', String(hit.line[key]));
            updateLineWidths();
            refresh();
        });
    }

    async function copyText(text, label) {
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
        showToast(t('toast_copied_title'), t('toast_command_copied', { cmd: label }), 'success');
    }

    function canvasBlob() {
        return new Promise((resolve) => el.canvas.toBlob(resolve, 'image/png'));
    }

    async function downloadPng() {
        render();
        const blob = await canvasBlob();
        if (!blob) {
            showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
            return;
        }
        const kind = kindData();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `minecraft-${state.wood}${kind.block}${state.view === 'both' ? '' : '-' + state.side}.png`.replace(/_/g, '-');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast(t('toast_saved_title'), t('toast_downloaded'), 'success');
    }

    async function copyImage() {
        try {
            render();
            const blob = await canvasBlob();
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            showToast(t('toast_copied_title'), t('toast_image_copied'), 'success');
        } catch (_) {
            showToast(t('toast_error_title'), t('toast_copy_failed'), 'error');
        }
    }

    function bindControls() {
        el.kindGrid.addEventListener('click', async (e) => {
            const btn = e.target.closest('.kind-btn');
            if (!btn || btn.dataset.kind === state.kind) return;
            state.kind = btn.dataset.kind;
            syncKindUi();
            updateLineWidths();
            updateCommands();
            await loadWoodTextures();
            refresh();
        });
        el.woodGrid.addEventListener('click', async (e) => {
            const btn = e.target.closest('.wood-btn');
            if (!btn) return;
            state.wood = btn.dataset.wood;
            el.woodGrid.querySelectorAll('.wood-btn').forEach((b) => {
                const on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-pressed', String(on));
            });
            updateCommands();
            await loadWoodTextures();
            refresh();
        });
        el.sideTabs.forEach((tab) => tab.addEventListener('click', () => {
            state.side = tab.dataset.side;
            syncSideUi();
            refresh();
        }));
        el.dyeGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.dye-btn');
            if (!btn) return;
            currentSide().dye = btn.dataset.dye;
            syncDyeUi();
            refresh();
        });
        el.dyeCustomInput.addEventListener('input', () => {
            const side = currentSide();
            side.dye = 'custom';
            side.customColor = el.dyeCustomInput.value.toUpperCase();
            syncDyeUi();
            refresh();
        });
        el.dyeCustom.addEventListener('click', () => {
            if (currentSide().dye === 'custom') return;
            currentSide().dye = 'custom';
            playClickSound();
            syncDyeUi();
            refresh();
        });
        el.glowToggle.addEventListener('change', () => {
            currentSide().glow = el.glowToggle.checked;
            playClickSound();
            refresh();
        });
        el.clearSideBtn.addEventListener('click', () => {
            state.sides[state.side] = newSide();
            syncSideUi();
            refresh();
            showToast(t('toast_info_title'), t('toast_side_cleared', { side: t('side_' + state.side) }), 'info');
        });
        el.exampleBtn.addEventListener('click', () => {
            const side = currentSide();
            side.lines = [0, 1, 2, 3].map((i) => newLine(EXAMPLE[lang][i]));
            syncSideUi();
            refresh();
            showToast(t('toast_info_title'), t('toast_example'), 'info');
        });
        el.rotationSelect.addEventListener('change', () => {
            state.rotation = Number(el.rotationSelect.value);
            playClickSound();
            updateCommands();
        });
        el.facingSelect.addEventListener('change', () => {
            state.facing = el.facingSelect.value;
            playClickSound();
            updateCommands();
        });
        el.attachedToggle.addEventListener('change', () => {
            state.attached = el.attachedToggle.checked;
            playClickSound();
            updateLineWidths();
            refresh();
        });
        el.waxedToggle.addEventListener('change', () => {
            state.waxed = el.waxedToggle.checked;
            playClickSound();
            updateCommands();
        });
        el.viewSelect.addEventListener('change', () => {
            state.view = el.viewSelect.value;
            playClickSound();
            refresh();
        });
        el.scaleSelect.addEventListener('change', () => {
            state.scale = Number(el.scaleSelect.value) || 4;
            playClickSound();
            render();
        });
        el.versionSelect.addEventListener('change', () => {
            state.version = el.versionSelect.value;
            playClickSound();
            updateCommands();
        });
        el.posInput.addEventListener('input', () => {
            state.pos = el.posInput.value;
            updateCommands();
        });
        document.querySelectorAll('.pos-preset').forEach((btn) => btn.addEventListener('click', () => {
            state.pos = btn.dataset.pos;
            el.posInput.value = btn.dataset.pos;
            updateCommands();
        }));
        el.targetInput.addEventListener('input', () => {
            state.target = el.targetInput.value;
            updateCommands();
        });
        document.querySelectorAll('[data-copy-cmd]').forEach((btn) => btn.addEventListener('click', () => {
            const key = btn.dataset.copyCmd;
            copyText(el.cmd[key].textContent, '/' + key);
        }));
        el.downloadBtn.addEventListener('click', downloadPng);
        el.copyImageBtn.addEventListener('click', copyImage);
    }

    // Both textures of the wood, so switching the sign kind needs no reload.
    async function loadWoodTextures() {
        const wood = woodData();
        await Promise.all([wood.texture, wood.hanging_texture].filter((src) => !textures.has(src)).map(async (src) => {
            try {
                textures.set(src, await loadImage(src));
            } catch (err) {
                console.error(err);
            }
        }));
    }

    function collectElements() {
        const byId = (id) => document.getElementById(id);
        Object.assign(el, {
            kindGrid: byId('kindGrid'),
            woodGrid: byId('woodGrid'),
            sideTabs: Array.from(document.querySelectorAll('#sideTabs .side-tab')),
            linesEditor: byId('linesEditor'),
            dyeGrid: byId('dyeGrid'),
            glowToggle: byId('glowToggle'),
            clearSideBtn: byId('clearSideBtn'),
            exampleBtn: byId('exampleBtn'),
            rotationField: byId('rotationField'),
            rotationSelect: byId('rotationSelect'),
            facingField: byId('facingField'),
            facingSelect: byId('facingSelect'),
            attachedRow: byId('attachedRow'),
            attachedToggle: byId('attachedToggle'),
            waxedToggle: byId('waxedToggle'),
            canvas: byId('signCanvas'),
            sizeInfo: byId('sizeInfo'),
            viewSelect: byId('viewSelect'),
            scaleSelect: byId('scaleSelect'),
            downloadBtn: byId('downloadBtn'),
            copyImageBtn: byId('copyImageBtn'),
            versionSelect: byId('versionSelect'),
            versionNotice: byId('versionNotice'),
            posInput: byId('posInput'),
            cmdGuide: byId('cmdblockGuide'),
            targetInput: byId('targetInput'),
            cmd: { setblock: byId('cmdSetblock'), give: byId('cmdGive'), data: byId('cmdData') },
            cmdInfo: { setblock: byId('cmdSetblockInfo'), give: byId('cmdGiveInfo'), data: byId('cmdDataInfo') }
        });
    }

    async function init() {
        collectElements();
        if (!el.canvas || !el.woodGrid) return;
        ctx = el.canvas.getContext('2d');
        el.woodGrid.innerHTML = `<p class="grid-state">${escapeHtml(t('state_loading'))}</p>`;
        try {
            const res = await fetch(DATA_URL, { cache: 'no-cache' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
            await loadFont(data.font);
        } catch (err) {
            console.error('Sign data failed:', err);
            data = null;
            el.woodGrid.innerHTML = `<p class="grid-state">${escapeHtml(t('state_failed'))}</p>`;
            showToast(t('toast_error_title'), t('toast_data_failed'), 'error');
            return;
        }
        state.sides.front = newSide(EXAMPLE[lang]);
        renderLineEditor();
        renderDyeGrid();
        renderPlacementOptions();
        el.rotationSelect.value = String(state.rotation);
        el.facingSelect.value = state.facing;
        el.versionSelect.value = state.version;
        el.scaleSelect.value = String(state.scale);
        el.viewSelect.value = state.view;
        el.posInput.value = state.pos;
        el.targetInput.value = state.target;
        syncKindUi();
        syncSideUi();
        bindLineEditor();
        bindControls();
        await loadWoodTextures();
        refresh();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
