// MC-Craft Map-Art-Generator — core engine.
// Pure logic: block-color palette, nearest-color matching, staircased height
// bookkeeping, and StructureConverter-compatible model construction. No UI,
// no language strings. Runs on the main thread or inside worker.js.

(function (global) {
    'use strict';

    const MAX_VOLUME = 134217728; // 2^27 voxels, same safety cap as structure-converter
    const DEFAULT_DATA_VERSION = 5015; // kept in sync with structure-converter/core.js
    const SHADES = [
        { key: 'down', mult: 135, shadeId: 3 },
        { key: 'same', mult: 255, shadeId: 2 },
        { key: 'up', mult: 220, shadeId: 1 },
        { key: 'extra', mult: 180, shadeId: 0 } // not reachable via natural height diff
    ];
    const SHADE_DELTA = { down: -1, same: 0, up: 1, extra: 0 };
    const SHADE_BY_KEY = Object.fromEntries(SHADES.map(s => [s.key, s]));

    const SHADE_MODES = {
        flat: { keys: ['same'] },
        staircased: { keys: ['down', 'same', 'up'] },
        'staircased-unobtainable': { keys: ['extra', 'down', 'same', 'up'] },
        'full-dark': { keys: ['down'], forced: true },
        'full-light': { keys: ['same'], forced: true }
    };
    function shadeModeOf(mode) { return SHADE_MODES[mode] || SHADE_MODES.staircased; }

    // kept separate from the block-render-derived palette in block-colors.json.
    const OFFICIAL_MAP_COLORS = [
        [1, 127, 178, 56], [2, 247, 233, 163], [3, 199, 199, 199], [4, 255, 0, 0],
        [5, 160, 160, 255], [6, 167, 167, 167], [7, 0, 124, 0], [8, 255, 255, 255],
        [9, 164, 168, 184], [10, 151, 109, 77], [11, 112, 112, 112], [12, 64, 64, 255],
        [13, 143, 119, 72], [14, 255, 252, 245], [15, 216, 127, 51], [16, 178, 76, 216],
        [17, 102, 153, 216], [18, 229, 229, 51], [19, 127, 204, 25], [20, 242, 127, 165],
        [21, 76, 76, 76], [22, 153, 153, 153], [23, 76, 127, 153], [24, 127, 63, 178],
        [25, 51, 76, 178], [26, 102, 76, 51], [27, 102, 127, 51], [28, 153, 51, 51],
        [29, 25, 25, 25], [30, 250, 238, 77], [31, 92, 219, 213], [32, 74, 128, 255],
        [33, 0, 217, 58], [34, 129, 86, 49], [35, 112, 2, 0], [36, 209, 177, 161],
        [37, 159, 82, 36], [38, 149, 87, 108], [39, 112, 108, 138], [40, 186, 133, 36],
        [41, 103, 117, 53], [42, 160, 77, 78], [43, 57, 41, 35], [44, 135, 107, 98],
        [45, 87, 92, 92], [46, 122, 73, 88], [47, 76, 62, 92], [48, 76, 50, 35],
        [49, 76, 82, 42], [50, 142, 60, 46], [51, 37, 22, 16], [52, 189, 48, 49],
        [53, 148, 63, 97], [54, 92, 25, 29], [55, 22, 126, 134], [56, 58, 142, 140],
        [57, 86, 44, 62], [58, 20, 180, 133], [59, 100, 100, 100], [60, 216, 175, 147],
        [61, 127, 167, 150]
    ].map(([id, r, g, b]) => ({ id, r, g, b }));

    let _blockColorsPromise = null;
    function loadBlockColors() {
        if (_blockColorsPromise) return _blockColorsPromise;
        _blockColorsPromise = fetch('/assets/JS/map-art/block-colors.json')
            .then(resp => {
                if (!resp.ok) throw new Error('failed to load block-colors.json: ' + resp.status);
                return resp.json();
            });
        return _blockColorsPromise;
    }

    // blocks: [{id, r, g, b}, ...]. mode: one of the SHADE_MODES keys. Returns a
    // flat candidate list for nearest-color search: [{r,g,b, blockIdx, shadeKey}, ...].
    function buildCandidatePalette(blocks, mode) {
        const shades = shadeModeOf(mode).keys.map(k => SHADE_BY_KEY[k]);
        const candidates = [];
        for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
            const b = blocks[blockIdx];
            for (const shade of shades) {
                candidates.push({
                    r: Math.round(b.r * shade.mult / 255),
                    g: Math.round(b.g * shade.mult / 255),
                    b: Math.round(b.b * shade.mult / 255),
                    blockIdx,
                    shadeKey: shade.key
                });
            }
        }
        return candidates;
    }

    // Same idea as buildCandidatePalette but against the 61 official Mojang base
    // colors instead of the block palette — used for the map.dat output path.
    function buildMapDatCandidatePalette(mode) {
        const shades = shadeModeOf(mode).keys.map(k => SHADE_BY_KEY[k]);
        const candidates = [];
        for (let colorIdx = 0; colorIdx < OFFICIAL_MAP_COLORS.length; colorIdx++) {
            const c = OFFICIAL_MAP_COLORS[colorIdx];
            for (const shade of shades) {
                candidates.push({
                    r: Math.round(c.r * shade.mult / 255),
                    g: Math.round(c.g * shade.mult / 255),
                    b: Math.round(c.b * shade.mult / 255),
                    colorId: c.id,
                    shadeId: shade.shadeId,
                    shadeKey: shade.key
                });
            }
        }
        return candidates;
    }

    // "redmean" weighted color distance (a well-known low-cost approximation of
    // perceptual color difference, used by e.g. ImageMagick's -fuzz) instead of
    // plain RGB Euclidean distance. Plain Euclidean distance systematically
    // prefers brighter-but-wrong-hue candidates over darker-but-correct-hue
    // ones — e.g. a pure red (255,0,0) target would pick a duller orange block
    // over a dark red block purely because the orange is numerically "closer"
    // in raw RGB terms. Weighting green heaviest (human eyes are most
    // green-sensitive) and adjusting red/blue weight by average redness fixes
    // exactly that kind of hue mismatch.
    function colorDistance(r1, g1, b1, r2, g2, b2) {
        const rmean = (r1 + r2) / 2;
        const dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
        return (2 + rmean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rmean) / 256) * db * db;
    }
    function nearestCandidateIndex(r, g, b, candidates) {
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < candidates.length; i++) {
            const c = candidates[i];
            const dist = colorDistance(r, g, b, c.r, c.g, c.b);
            if (dist < bestDist) { bestDist = dist; best = i; }
        }
        return best;
    }

    // Downscales an ImageBitmap to a cols x rows grid via canvas averaging
    // (drawImage with smoothing does a reasonable box-filter-like downscale).
    // Works both on the main thread (OffscreenCanvas) and inside a Worker.
    function downscaleToGrid(bitmap, cols, rows) {
        const canvas = new OffscreenCanvas(cols, rows);
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bitmap, 0, 0, cols, rows);
        return ctx.getImageData(0, 0, cols, rows).data; // Uint8ClampedArray, RGBA
    }

    // Standard contrast adjustment (per-channel, around the 128 midpoint).
    // The downscale step above blends colors across hard edges (e.g. white
    // text on a red background), which pulls the resulting pixels toward a
    // muddy in-between gray that then matches the wrong block. No block
    // palette or dithering fix can undo that blending after the fact — it has
    // to be pushed back apart *before* color matching. The underlying formula
    // has a singularity at c=259 (factor -> Infinity) and *inverts* colors
    // past it (factor goes negative), so the internal value is hard-capped at
    // 250 — already a near-total black/white-style threshold (factor ~57) —
    // regardless of how high the caller passes; the UI slider can go higher
    // than that for headroom, it just plateaus. One mathematical limit no
    // contrast value can ever fix: a channel sitting exactly at 128 is the
    // pivot itself and never moves — only a pixel that blended to *exactly*
    // 50/50 hits that, which is rare but not impossible in practice.
    // Mutates pixels in place.
    function applyContrast(pixels, contrast) {
        if (!contrast) return pixels;
        const c = Math.max(-100, Math.min(250, contrast));
        const factor = (259 * (c + 255)) / (255 * (259 - c));
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = factor * (pixels[i] - 128) + 128;
            pixels[i + 1] = factor * (pixels[i + 1] - 128) + 128;
            pixels[i + 2] = factor * (pixels[i + 2] - 128) + 128;
        }
        return pixels;
    }

    // Floyd-Steinberg error-diffusion buffer: reduces the harsh, blocky look of
    // a small nearest-color palette by spreading each pixel's quantization
    // error onto not-yet-processed neighbors (right 7/16, bottom-left 3/16,
    // bottom 5/16, bottom-right 1/16). Requires raster (row-major) processing
    // order so "not yet processed" is well-defined. Values are kept as floats
    // (can temporarily exceed 0-255) until read back and clamped per-pixel.
    function createDitherBuffer(pixels, cols, rows) {
        const n = cols * rows;
        const workR = new Float32Array(n), workG = new Float32Array(n), workB = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            workR[i] = pixels[i * 4]; workG[i] = pixels[i * 4 + 1]; workB[i] = pixels[i * 4 + 2];
        }
        function diffuse(x, z, er, eg, eb, factor) {
            if (x < 0 || x >= cols || z < 0 || z >= rows) return;
            const i = z * cols + x;
            workR[i] += er * factor; workG[i] += eg * factor; workB[i] += eb * factor;
        }
        return {
            read(x, z) {
                const i = z * cols + x;
                return [
                    Math.min(255, Math.max(0, workR[i])),
                    Math.min(255, Math.max(0, workG[i])),
                    Math.min(255, Math.max(0, workB[i]))
                ];
            },
            spread(x, z, r, g, b, chosenR, chosenG, chosenB) {
                const er = r - chosenR, eg = g - chosenG, eb = b - chosenB;
                diffuse(x + 1, z, er, eg, eb, 7 / 16);
                diffuse(x - 1, z + 1, er, eg, eb, 3 / 16);
                diffuse(x, z + 1, er, eg, eb, 5 / 16);
                diffuse(x + 1, z + 1, er, eg, eb, 1 / 16);
            }
        };
    }

    // Core algorithm. pixels: Uint8ClampedArray RGBA of length cols*rows*4
    // (row-major, row 0 = image top = world-north). mode: one of SHADE_MODES.
    // dither: apply Floyd-Steinberg error diffusion (see createDitherBuffer).
    // Returns { model, materialCounts: Map<blockId,count>, previewRGBA, maxHeightRange }
    // where `model` is directly consumable by window.StructureConverter.write().
    function buildModel(blocks, pixels, cols, rows, mode, dither) {
        const modeInfo = shadeModeOf(mode);
        const candidates = buildCandidatePalette(blocks, mode);
        const sameCandidates = modeInfo.forced ? candidates : candidates.filter(c => c.shadeKey === 'same');

        const chosenBlockIdx = new Int32Array(cols * rows);
        const previewRGBA = new Uint8ClampedArray(cols * rows * 4);
        const heights = new Int32Array(cols * rows);
        let globalMin = 0, globalMax = 0;

        // Height only depends on the pixel directly above in the SAME column
        // (never on other columns or on dithering order), so raster (row-major)
        // scanning — required for correct error diffusion — stays compatible
        // with the height rule as long as each column's running height is
        // tracked independently here instead of in a single loop-local var.
        const dbuf = dither ? createDitherBuffer(pixels, cols, rows) : null;
        const prevHeightByColumn = new Int32Array(cols);
        for (let z = 0; z < rows; z++) {
            for (let x = 0; x < cols; x++) {
                const p = (z * cols + x) * 4;
                const [r, g, b] = dbuf ? dbuf.read(x, z) : [pixels[p], pixels[p + 1], pixels[p + 2]];
                const baseline = z === 0 || modeInfo.forced;
                const pool = baseline ? sameCandidates : candidates;
                const idx = nearestCandidateIndex(r, g, b, pool);
                const cand = pool[idx];
                const height = baseline ? 0 : prevHeightByColumn[x] + SHADE_DELTA[cand.shadeKey];
                const cell = z * cols + x;
                chosenBlockIdx[cell] = cand.blockIdx;
                previewRGBA[cell * 4] = cand.r;
                previewRGBA[cell * 4 + 1] = cand.g;
                previewRGBA[cell * 4 + 2] = cand.b;
                previewRGBA[cell * 4 + 3] = 255;
                heights[cell] = height;
                if (height < globalMin) globalMin = height;
                if (height > globalMax) globalMax = height;
                prevHeightByColumn[x] = height;
                if (dbuf) dbuf.spread(x, z, r, g, b, cand.r, cand.g, cand.b);
            }
        }

        const heightRange = globalMax - globalMin + 1;
        const volume = cols * rows * heightRange;
        if (volume > MAX_VOLUME) {
            const err = new Error('MAP_ART_VOLUME_TOO_LARGE');
            err.code = 'VOLUME_TOO_LARGE';
            err.details = { volume, max: MAX_VOLUME };
            throw err;
        }

        // Build a compact palette of only the blocks actually used, air at index 0.
        const paletteIndexOf = new Map();
        const palette = [{ name: 'minecraft:air', properties: {} }];
        paletteIndexOf.set(-1, 0);
        const usedBlockPaletteIdx = new Int32Array(blocks.length).fill(-1);

        const width = cols, length = rows, height = heightRange;
        const blocksArr = height * width * length <= 65536
            ? new Uint16Array(width * height * length)
            : new Uint32Array(width * height * length);

        const materialCounts = new Map();

        for (let x = 0; x < cols; x++) {
            for (let z = 0; z < rows; z++) {
                const cell = z * cols + x;
                const blockIdx = chosenBlockIdx[cell];
                let pIdx = usedBlockPaletteIdx[blockIdx];
                if (pIdx === -1) {
                    pIdx = palette.length;
                    palette.push({ name: blocks[blockIdx].id, properties: {} });
                    usedBlockPaletteIdx[blockIdx] = pIdx;
                }
                const topY = heights[cell] - globalMin;
                for (let y = 0; y <= topY; y++) {
                    const voxelIdx = x + z * width + y * width * length;
                    blocksArr[voxelIdx] = pIdx;
                }
                const blockId = blocks[blockIdx].id;
                materialCounts.set(blockId, (materialCounts.get(blockId) || 0) + (topY + 1));
            }
        }

        const model = {
            width, height, length,
            offset: { x: 0, y: 0, z: 0 },
            palette, blocks: blocksArr,
            blockEntities: [], entities: [],
            metadata: { name: 'MapArt' }
        };

        return { model, materialCounts, previewRGBA, heightRange };
    }

    // Same per-pixel shade-selection rules as buildModel, but against the official
    // 61-color Mojang palette and producing raw map.dat colorID bytes directly — no
    // 3D expansion needed since a map.dat pixel is used as-is, not built from blocks.
    // Returns { colorIds: Uint8Array(cols*rows), previewRGBA }.
    function buildMapDatColors(pixels, cols, rows, mode, dither) {
        const modeInfo = shadeModeOf(mode);
        const candidates = buildMapDatCandidatePalette(mode);
        const sameCandidates = modeInfo.forced ? candidates : candidates.filter(c => c.shadeKey === 'same');

        const colorIds = new Uint8Array(cols * rows);
        const previewRGBA = new Uint8ClampedArray(cols * rows * 4);

        const dbuf = dither ? createDitherBuffer(pixels, cols, rows) : null;
        for (let z = 0; z < rows; z++) {
            for (let x = 0; x < cols; x++) {
                const p = (z * cols + x) * 4;
                const [r, g, b] = dbuf ? dbuf.read(x, z) : [pixels[p], pixels[p + 1], pixels[p + 2]];
                const baseline = z === 0 || modeInfo.forced;
                const pool = baseline ? sameCandidates : candidates;
                const idx = nearestCandidateIndex(r, g, b, pool);
                const cand = pool[idx];
                const cell = z * cols + x;
                colorIds[cell] = cand.colorId * 4 + cand.shadeId;
                previewRGBA[cell * 4] = cand.r;
                previewRGBA[cell * 4 + 1] = cand.g;
                previewRGBA[cell * 4 + 2] = cand.b;
                previewRGBA[cell * 4 + 3] = 255;
                if (dbuf) dbuf.spread(x, z, r, g, b, cand.r, cand.g, cand.b);
            }
        }
        return { colorIds, previewRGBA };
    }

    // ===== map.dat NBT writer (self-contained: map.dat's schema is tiny and fixed,
    // so this doesn't need the general NBT tag system from structure-converter/core.js) =====
    function gzipCompressLocal(bytes) {
        const cs = new CompressionStream('gzip');
        const writer = cs.writable.getWriter();
        writer.write(bytes);
        writer.close();
        return new Response(cs.readable).arrayBuffer().then(buf => new Uint8Array(buf));
    }

    class NbtByteWriter {
        constructor() { this.chunks = []; this.len = 0; }
        u8(v) { this.chunks.push(Uint8Array.of(v & 0xFF)); this.len += 1; return this; }
        i16(v) { const b = new Uint8Array(2); new DataView(b.buffer).setInt16(0, v, false); this.chunks.push(b); this.len += 2; return this; }
        i32(v) { const b = new Uint8Array(4); new DataView(b.buffer).setInt32(0, v, false); this.chunks.push(b); this.len += 4; return this; }
        bytes(arr) { this.chunks.push(arr instanceof Uint8Array ? arr : new Uint8Array(arr)); this.len += arr.length; return this; }
        str(s) { const enc = new TextEncoder().encode(s); this.i16(enc.length); this.bytes(enc); return this; }
        toUint8Array() {
            const out = new Uint8Array(this.len);
            let off = 0;
            for (const c of this.chunks) { out.set(c, off); off += c.length; }
            return out;
        }
    }
    const NBT_TAG = { End: 0, Byte: 1, Short: 2, Int: 3, String: 8, List: 9, Compound: 10, ByteArray: 7 };

    // opts: { dimension?, xCenter?, zCenter?, locked? }. colorIds: Uint8Array(width*height).
    function writeMapDatNbt(colorIds, width, height, opts) {
        opts = opts || {};
        const w = new NbtByteWriter();
        w.u8(NBT_TAG.Compound).str(''); // unnamed root compound

        w.u8(NBT_TAG.Compound).str('data');
        w.u8(NBT_TAG.Byte).str('scale').u8(0);
        w.u8(NBT_TAG.String).str('dimension').str(opts.dimension || 'minecraft:overworld');
        w.u8(NBT_TAG.Byte).str('trackingPosition').u8(0);
        w.u8(NBT_TAG.Byte).str('unlimitedTracking').u8(0);
        w.u8(NBT_TAG.Byte).str('locked').u8(opts.locked === false ? 0 : 1);
        w.u8(NBT_TAG.Int).str('xCenter').i32(opts.xCenter || 0);
        w.u8(NBT_TAG.Int).str('zCenter').i32(opts.zCenter || 0);
        w.u8(NBT_TAG.List).str('banners').u8(NBT_TAG.End).i32(0);
        w.u8(NBT_TAG.List).str('frames').u8(NBT_TAG.End).i32(0);
        w.u8(NBT_TAG.ByteArray).str('colors').i32(colorIds.length).bytes(colorIds);
        w.u8(NBT_TAG.End); // end 'data' compound

        w.u8(NBT_TAG.Int).str('DataVersion').i32(opts.dataVersion || DEFAULT_DATA_VERSION);
        w.u8(NBT_TAG.End); // end root compound

        return w.toUint8Array();
    }

    // width/height default to 128 (a single vanilla map item); larger grids must be
    // split into 128x128 tiles first (see splitIntoMapTiles) — a map.dat's colors
    // array is always exactly 16384 bytes for one physical map.
    async function buildMapDatFile(colorIds, opts) {
        const nbtBytes = writeMapDatNbt(colorIds, 128, 128, opts);
        return gzipCompressLocal(nbtBytes);
    }

    // Splits a cols x rows colorIds array (or block-model previewRGBA-shaped data)
    // into 128x128 tiles, row-major, tile 1 = top-left (matches how the map is laid
    // out when framed on a wall reading left-to-right, top-to-bottom).
    function splitIntoMapTiles(colorIds, cols, rows) {
        const tilesX = Math.ceil(cols / 128), tilesY = Math.ceil(rows / 128);
        const tiles = [];
        for (let ty = 0; ty < tilesY; ty++) {
            for (let tx = 0; tx < tilesX; tx++) {
                const tile = new Uint8Array(128 * 128);
                for (let y = 0; y < 128; y++) {
                    for (let x = 0; x < 128; x++) {
                        const srcX = tx * 128 + x, srcY = ty * 128 + y;
                        tile[y * 128 + x] = (srcX < cols && srcY < rows) ? colorIds[srcY * cols + srcX] : 0;
                    }
                }
                tiles.push({ index: ty * tilesX + tx + 1, tx, ty, colorIds: tile });
            }
        }
        return tiles;
    }

    // Same idea as splitIntoMapTiles but for a full block model (as built by
    // buildModel): slices out each 128x128 column range with its own compact
    // palette, so per-tile structure files stay small and self-contained.
    function splitModelIntoMapTiles(model, cols, rows) {
        const tilesX = Math.ceil(cols / 128), tilesY = Math.ceil(rows / 128);
        const { width, height, length, blocks, palette } = model;
        const tiles = [];
        for (let ty = 0; ty < tilesY; ty++) {
            for (let tx = 0; tx < tilesX; tx++) {
                const tilePaletteIndexOf = new Map([[0, 0]]);
                const tilePalette = [palette[0]];
                const tileBlocks = (height * 128 * 128 <= 65536 ? new Uint16Array(128 * height * 128) : new Uint32Array(128 * height * 128));
                for (let y = 0; y < height; y++) {
                    for (let z = 0; z < 128; z++) {
                        const srcZ = ty * 128 + z;
                        if (srcZ >= length) continue;
                        for (let x = 0; x < 128; x++) {
                            const srcX = tx * 128 + x;
                            if (srcX >= width) continue;
                            const pIdxFull = blocks[srcX + srcZ * width + y * width * length];
                            if (pIdxFull === 0) continue; // air; tileBlocks already zero-initialized
                            let localP = tilePaletteIndexOf.get(pIdxFull);
                            if (localP === undefined) {
                                localP = tilePalette.length;
                                tilePalette.push(palette[pIdxFull]);
                                tilePaletteIndexOf.set(pIdxFull, localP);
                            }
                            tileBlocks[x + z * 128 + y * 128 * 128] = localP;
                        }
                    }
                }
                tiles.push({
                    index: ty * tilesX + tx + 1, tx, ty,
                    model: {
                        width: 128, height, length: 128, offset: { x: 0, y: 0, z: 0 },
                        palette: tilePalette, blocks: tileBlocks,
                        blockEntities: [], entities: [], metadata: model.metadata
                    }
                });
            }
        }
        return tiles;
    }

    // ===== minimal ZIP writer (STORED/uncompressed entries only) =====
    let _crc32Table = null;
    function crc32(bytes) {
        if (!_crc32Table) {
            _crc32Table = new Uint32Array(256);
            for (let n = 0; n < 256; n++) {
                let c = n;
                for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
                _crc32Table[n] = c >>> 0;
            }
        }
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < bytes.length; i++) crc = _crc32Table[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    // entries: [{name, bytes: Uint8Array}]. Returns a Uint8Array of a valid ZIP
    // archive (method 0 = stored, no compression — keeps this self-contained
    // without a deflate implementation; files are already gzip-compressed NBT,
    // so re-compressing them again would barely help anyway).
    function buildZip(entries) {
        const localParts = [], centralParts = [];
        let offset = 0;
        const w32 = (v) => { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, v, true); return b; };
        const w16 = (v) => { const b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, v, true); return b; };

        for (const entry of entries) {
            const nameBytes = new TextEncoder().encode(entry.name);
            const crc = crc32(entry.bytes);
            const size = entry.bytes.length;

            const local = [
                w32(0x04034b50), w16(20), w16(0), w16(0), w16(0), w16(0),
                w32(crc), w32(size), w32(size), w16(nameBytes.length), w16(0),
                nameBytes, entry.bytes
            ];
            const localLen = local.reduce((s, p) => s + p.length, 0);
            localParts.push(...local);

            const central = [
                w32(0x02014b50), w16(20), w16(20), w16(0), w16(0), w16(0), w16(0),
                w32(crc), w32(size), w32(size), w16(nameBytes.length), w16(0), w16(0),
                w16(0), w16(0), w32(0), w32(offset), nameBytes
            ];
            centralParts.push(...central);
            offset += localLen;
        }

        const centralStart = offset;
        const centralLen = centralParts.reduce((s, p) => s + p.length, 0);
        const end = [
            w32(0x06054b50), w16(0), w16(0), w16(entries.length), w16(entries.length),
            w32(centralLen), w32(centralStart), w16(0)
        ];

        const totalLen = localParts.reduce((s, p) => s + p.length, 0) + centralLen + end.reduce((s, p) => s + p.length, 0);
        const out = new Uint8Array(totalLen);
        let pos = 0;
        for (const p of [...localParts, ...centralParts, ...end]) { out.set(p, pos); pos += p.length; }
        return out;
    }

    // ===== SELF-TESTS (manual: call MapArtGenerator.runSelfTests() from devtools) =====
    async function runSelfTests() {
        const results = [];
        async function test(name, fn) {
            try { await fn(); results.push({ name, ok: true }); }
            catch (e) { results.push({ name, ok: false, error: e.message }); }
        }
        function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }

        await test('shade multipliers match wiki-verified formula', () => {
            const blocks = [{ id: 'minecraft:test', r: 200, g: 100, b: 50 }];
            const cands = buildCandidatePalette(blocks, 'staircased');
            assert(cands.length === 3, 'one candidate per shade');
            const down = cands.find(c => c.shadeKey === 'down');
            const same = cands.find(c => c.shadeKey === 'same');
            const up = cands.find(c => c.shadeKey === 'up');
            assert(down.r === Math.round(200 * 135 / 255), 'down shade r');
            assert(same.r === 200, 'same shade is full color');
            assert(up.r === Math.round(200 * 220 / 255), 'up shade r');
        });

        await test('applyContrast: 0 is a no-op, positive contrast pushes an edge-blend gray back apart', () => {
            const untouched = new Uint8ClampedArray([200, 40, 40, 255, 128, 128, 128, 255]);
            applyContrast(untouched, 0);
            assert(untouched[0] === 200 && untouched[4] === 128, 'contrast 0 must not change pixels');

            // a pixel that got blended mostly-white-with-some-red by downscaling
            // looks like (255,160,160) — positive contrast should push channels
            // further from the 128 pivot in whichever direction they already lean
            // (160 is above the pivot, so it moves further up, toward 255), which
            // sharpens the white/red transition instead of leaving it a soft gray.
            const blended = new Uint8ClampedArray([255, 160, 160, 255]);
            applyContrast(blended, 80);
            assert(blended[1] > 160, 'positive contrast should push channels further from the 128 pivot, got ' + blended[1]);
            assert(blended[0] === 255, 'a channel already at the extreme (255) stays at the extreme');
        });

        await test('flat mode only produces the "same" shade', () => {
            const blocks = [{ id: 'minecraft:a', r: 10, g: 10, b: 10 }, { id: 'minecraft:b', r: 200, g: 200, b: 200 }];
            const cands = buildCandidatePalette(blocks, 'flat');
            assert(cands.length === 2, 'one candidate per block in flat mode');
            assert(cands.every(c => c.shadeKey === 'same'), 'flat mode never uses down/up shades');
        });

        await test('nearestCandidateIndex picks exact match', () => {
            const cands = [{ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }, { r: 100, g: 150, b: 200 }];
            assert(nearestCandidateIndex(100, 150, 200, cands) === 2, 'exact match wins');
            assert(nearestCandidateIndex(10, 10, 10, cands) === 0, 'closest to black');
        });

        await test('buildModel: flat 2x1 image, two distinct blocks, single layer', () => {
            const blocks = [{ id: 'minecraft:black_wool', r: 20, g: 20, b: 20 }, { id: 'minecraft:white_wool', r: 240, g: 240, b: 240 }];
            // 2 cols, 1 row: pixel(0,0)=black, pixel(1,0)=white
            const pixels = new Uint8ClampedArray([20, 20, 20, 255, 240, 240, 240, 255]);
            const { model, materialCounts, heightRange } = buildModel(blocks, pixels, 2, 1, 'flat');
            assert(heightRange === 1, 'flat mode + single row -> exactly one Y layer');
            assert(model.width === 2 && model.length === 1 && model.height === 1, 'model dims');
            assert(materialCounts.get('minecraft:black_wool') === 1, 'one black wool voxel');
            assert(materialCounts.get('minecraft:white_wool') === 1, 'one white wool voxel');
        });

        await test('buildModel: staircased single column, forced up/down transitions', () => {
            // One block whose base color only matches well via specific shades at
            // each row; use 3 rows designed so down/same/up are each optimal once.
            const blocks = [{ id: 'minecraft:stone', r: 200, g: 200, b: 200 }];
            const down = Math.round(200 * 135 / 255), same = 200, up = Math.round(200 * 220 / 255);
            // row0 forced 'same' (no north neighbor); row1 target close to 'down'; row2 target close to 'up'
            const pixels = new Uint8ClampedArray([
                same, same, same, 255,
                down, down, down, 255,
                up, up, up, 255
            ]);
            const { heightRange, model } = buildModel(blocks, pixels, 1, 3, 'staircased');
            // row0 height=0, row1 height=-1 (down), row2 height=0 (up from -1)
            assert(heightRange === 2, 'height spans exactly 2 (min -1, max 0)');
            assert(model.width === 1 && model.length === 3, 'model dims for staircased column');
        });

        await test('buildModel throws VOLUME_TOO_LARGE when staircasing runs away', () => {
            // Every row after row 0 targets the "up"-shaded color, so height
            // grows by +1 every row -> height range ~= rows, and volume =
            // cols * rows * heightRange blows past the safety cap.
            const blocks = [{ id: 'minecraft:stone', r: 200, g: 200, b: 200 }];
            const up = Math.round(200 * 220 / 255);
            const cols = 140, rows = 1000;
            const pixels = new Uint8ClampedArray(cols * rows * 4);
            for (let z = 0; z < rows; z++) {
                for (let x = 0; x < cols; x++) {
                    const p = (z * cols + x) * 4;
                    const v = z === 0 ? 200 : up;
                    pixels[p] = v; pixels[p + 1] = v; pixels[p + 2] = v; pixels[p + 3] = 255;
                }
            }
            let threw = false;
            try { buildModel(blocks, pixels, cols, rows, 'staircased'); }
            catch (e) { threw = e.code === 'VOLUME_TOO_LARGE'; }
            assert(threw, 'expected VOLUME_TOO_LARGE when the staircase runs away');
        });

        await test('map.dat shadeId table matches wiki-verified shadeId->multiplier mapping', () => {
            // Verified: shadeId 0->180, 1->220, 2->255, 3->135. Cross-checked against
            // the independently-verified height rule (shorter->135, equal->255, taller->220).
            assert(SHADE_BY_KEY.down.shadeId === 3 && SHADE_BY_KEY.down.mult === 135, 'down -> shadeId 3 (135)');
            assert(SHADE_BY_KEY.same.shadeId === 2 && SHADE_BY_KEY.same.mult === 255, 'same -> shadeId 2 (255)');
            assert(SHADE_BY_KEY.up.shadeId === 1 && SHADE_BY_KEY.up.mult === 220, 'up -> shadeId 1 (220)');
            assert(SHADE_BY_KEY.extra.shadeId === 0 && SHADE_BY_KEY.extra.mult === 180, 'extra -> shadeId 0 (180)');
        });

        await test('OFFICIAL_MAP_COLORS has exactly 61 entries with ids 1..61', () => {
            assert(OFFICIAL_MAP_COLORS.length === 61, 'expected 61 official colors (id 0/NONE excluded)');
            const ids = OFFICIAL_MAP_COLORS.map(c => c.id).sort((a, b) => a - b);
            for (let i = 0; i < 61; i++) assert(ids[i] === i + 1, 'ids must be a contiguous 1..61 run');
        });

        await test('buildMapDatColors: colorID = baseColorId*4 + shadeId, matches nearest official color', () => {
            // Row 0 is always baseline ('same', shadeId 2, full brightness) regardless of mode.
            const grass = OFFICIAL_MAP_COLORS.find(c => c.id === 1); // GRASS, 127,178,56
            const pixels = new Uint8ClampedArray([grass.r, grass.g, grass.b, 255]);
            const { colorIds } = buildMapDatColors(pixels, 1, 1, 'staircased');
            assert(colorIds[0] === 1 * 4 + 2, 'expected exact GRASS/full-brightness colorID, got ' + colorIds[0]);
        });

        await test('crc32 matches the standard test vector ("123456789" -> 0xCBF43926)', () => {
            const bytes = new TextEncoder().encode('123456789');
            assert(crc32(bytes) === 0xCBF43926, 'crc32 mismatch: ' + crc32(bytes).toString(16));
        });

        await test('buildZip round-trips file names and bytes (minimal local-header reader)', () => {
            const entries = [
                { name: 'karte1.txt', bytes: new TextEncoder().encode('hello map 1') },
                { name: 'karte2.txt', bytes: new TextEncoder().encode('a different, longer payload for map 2') }
            ];
            const zip = buildZip(entries);
            // Minimal reader: walk sequential local file headers (PK\x03\x04), stop at
            // the central directory (PK\x01\x02). Enough to verify our own writer.
            const dv = new DataView(zip.buffer, zip.byteOffset, zip.byteLength);
            let pos = 0, i = 0;
            while (dv.getUint32(pos, true) === 0x04034b50) {
                const nameLen = dv.getUint16(pos + 26, true);
                const size = dv.getUint32(pos + 18, true);
                const name = new TextDecoder().decode(zip.subarray(pos + 30, pos + 30 + nameLen));
                const data = zip.subarray(pos + 30 + nameLen, pos + 30 + nameLen + size);
                assert(name === entries[i].name, 'name mismatch at entry ' + i);
                assert(data.length === entries[i].bytes.length && data.every((v, j) => v === entries[i].bytes[j]), 'byte mismatch at entry ' + i);
                pos += 30 + nameLen + size;
                i++;
            }
            assert(i === entries.length, 'expected to read back ' + entries.length + ' entries, got ' + i);
        });

        await test('writeMapDatNbt + gzip round-trip produces a well-formed, correctly-sized file', async () => {
            const colorIds = new Uint8Array(16384);
            colorIds.fill(1 * 4 + 2); // uniform GRASS, full brightness
            const nbtBytes = writeMapDatNbt(colorIds, 128, 128, {});
            const gz = await gzipCompressLocal(nbtBytes);
            assert(gz[0] === 0x1f && gz[1] === 0x8b, 'expected gzip magic bytes');
            // decompress and confirm we get the exact NBT bytes back
            const ds = new DecompressionStream('gzip');
            const wtr = ds.writable.getWriter();
            wtr.write(gz); wtr.close();
            const roundTripped = new Uint8Array(await new Response(ds.readable).arrayBuffer());
            assert(roundTripped.length === nbtBytes.length, 'decompressed length mismatch');
            assert(roundTripped.every((v, i) => v === nbtBytes[i]), 'decompressed bytes differ from original NBT');
            // spot-check the colors ByteArray tag is present with the right declared length (16384)
            const needle = new TextEncoder().encode('colors');
            let found = -1;
            for (let k = 0; k + needle.length <= nbtBytes.length; k++) {
                if (nbtBytes[k] === needle[0] && needle.every((b, j) => nbtBytes[k + j] === b)) { found = k; break; }
            }
            assert(found >= 0, '"colors" tag name not found in output');
            const lenPos = found + needle.length;
            const declaredLen = new DataView(nbtBytes.buffer, nbtBytes.byteOffset).getInt32(lenPos, false);
            assert(declaredLen === 16384, 'colors ByteArray length must be 16384, got ' + declaredLen);
        });

        await test('splitIntoMapTiles: 256x128 grid splits into exactly 2 numbered 128x128 tiles', () => {
            const cols = 256, rows = 128;
            const colorIds = new Uint8Array(cols * rows);
            for (let z = 0; z < rows; z++) for (let x = 0; x < cols; x++) colorIds[z * cols + x] = x < 128 ? 5 : 9;
            const tiles = splitIntoMapTiles(colorIds, cols, rows);
            assert(tiles.length === 2, 'expected 2 tiles, got ' + tiles.length);
            assert(tiles[0].index === 1 && tiles[1].index === 2, 'tiles must be numbered 1, 2, ...');
            assert(tiles[0].colorIds[0] === 5 && tiles[0].colorIds.every(v => v === 5), 'tile 1 should be all left-half color');
            assert(tiles[1].colorIds[0] === 9 && tiles[1].colorIds.every(v => v === 9), 'tile 2 should be all right-half color');
        });

        await test('splitModelIntoMapTiles: 256-wide model splits into 2 tiles with correct per-tile palettes', () => {
            const blocks = [
                { id: 'minecraft:a', r: 200, g: 200, b: 200 }, { id: 'minecraft:b', r: 10, g: 10, b: 10 }
            ];
            const cols = 256, rows = 128;
            const pixels = new Uint8ClampedArray(cols * rows * 4);
            for (let z = 0; z < rows; z++) {
                for (let x = 0; x < cols; x++) {
                    const p = (z * cols + x) * 4;
                    const v = x < 128 ? 200 : 10;
                    pixels[p] = v; pixels[p + 1] = v; pixels[p + 2] = v; pixels[p + 3] = 255;
                }
            }
            const { model } = buildModel(blocks, pixels, cols, rows, 'flat');
            const tiles = splitModelIntoMapTiles(model, cols, rows);
            assert(tiles.length === 2, 'expected 2 tiles');
            assert(tiles[0].model.width === 128 && tiles[0].model.length === 128, 'tile dims must be 128x128');
            const tile0Names = tiles[0].model.palette.map(p => p.name);
            const tile1Names = tiles[1].model.palette.map(p => p.name);
            assert(tile0Names.includes('minecraft:a') && !tile0Names.includes('minecraft:b'), 'tile 1 should only reference block a');
            assert(tile1Names.includes('minecraft:b') && !tile1Names.includes('minecraft:a'), 'tile 2 should only reference block b');
        });

        await test('shade-mode variants: full-dark and full-light force a single flat shade', () => {
            const blocks = [{ id: 'minecraft:a', r: 200, g: 200, b: 200 }, { id: 'minecraft:b', r: 10, g: 10, b: 10 }];
            const pixels = new Uint8ClampedArray([200, 200, 200, 255, 10, 10, 10, 255, 200, 200, 200, 255, 10, 10, 10, 255]);
            const darkResult = buildModel(blocks, pixels, 2, 2, 'full-dark');
            const lightResult = buildModel(blocks, pixels, 2, 2, 'full-light');
            assert(darkResult.heightRange === 1, 'full-dark must stay a single flat layer');
            assert(lightResult.heightRange === 1, 'full-light must stay a single flat layer');
        });

        await test('dithering mixes both palette colors for an in-between shade (vs. one flat pick without it)', () => {
            // Only black and white available; a uniform mid-gray image can't be
            // matched exactly by either -> without dithering every pixel picks
            // the same nearest color (solid block of one color). With Floyd-
            // Steinberg dithering, the diffused error should push roughly half
            // the pixels to the other color, visually approximating gray.
            const blocks = [{ id: 'minecraft:black', r: 0, g: 0, b: 0 }, { id: 'minecraft:white', r: 255, g: 255, b: 255 }];
            const cols = 16, rowCount = 16;
            const pixels = new Uint8ClampedArray(cols * rowCount * 4);
            for (let i = 0; i < cols * rowCount; i++) { pixels[i * 4] = 128; pixels[i * 4 + 1] = 128; pixels[i * 4 + 2] = 128; pixels[i * 4 + 3] = 255; }

            const plain = buildModel(blocks, pixels, cols, rowCount, 'flat', false);
            const dithered = buildModel(blocks, pixels, cols, rowCount, 'flat', true);
            const countBlack = (materialCounts) => materialCounts.get('minecraft:black') || 0;
            const countWhite = (materialCounts) => materialCounts.get('minecraft:white') || 0;

            assert(countBlack(plain.materialCounts) === 0 || countWhite(plain.materialCounts) === 0,
                'without dithering, a uniform gray image should resolve to a single solid color');
            const blackD = countBlack(dithered.materialCounts), whiteD = countWhite(dithered.materialCounts);
            assert(blackD > 0 && whiteD > 0, 'with dithering, both black and white should appear');
            const ratio = Math.min(blackD, whiteD) / Math.max(blackD, whiteD);
            assert(ratio > 0.3, 'dithered black/white split should be roughly balanced for mid-gray, got ratio ' + ratio);
        });

        await test('redmean distance picks a duller correct-hue red over a brighter wrong-hue orange', () => {
            // Reproduces a real reported bug: with plain RGB Euclidean distance,
            // a muted "redstone_block"-like red loses to a brighter orange for a
            // pure red (255,0,0) target purely on raw brightness, not hue.
            const blocks = [
                { id: 'minecraft:orange_block', r: 209, g: 90, b: 1 },   // numerically closer in plain Euclidean distance
                { id: 'minecraft:red_block', r: 148, g: 20, b: 3 }        // correct hue, should win with redmean
            ];
            const idx = nearestCandidateIndex(255, 0, 0, buildCandidatePalette(blocks, 'flat'));
            assert(buildCandidatePalette(blocks, 'flat')[idx].blockIdx === 1, 'expected the red block to win for a pure red target, not the orange one');
        });

        const failed = results.filter(r => !r.ok);
        console.log('[MapArtGenerator self-tests] ' + (results.length - failed.length) + '/' + results.length + ' passed');
        for (const r of results) {
            if (r.ok) console.log('  ✓ ' + r.name);
            else console.error('  ✗ ' + r.name + ': ' + r.error);
        }
        return { total: results.length, passed: results.length - failed.length, failed: failed.map(f => f.name) };
    }

    global.MapArtGenerator = {
        loadBlockColors, buildCandidatePalette, nearestCandidateIndex, downscaleToGrid, applyContrast, buildModel, runSelfTests,
        SHADE_MODES, OFFICIAL_MAP_COLORS, buildMapDatCandidatePalette, buildMapDatColors,
        writeMapDatNbt, buildMapDatFile, splitIntoMapTiles, splitModelIntoMapTiles, buildZip, crc32
    };
})(typeof self !== 'undefined' ? self : this);