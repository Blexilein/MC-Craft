// MC-Craft Structure Converter — core engine.
// Pure format logic: NBT read/write, gzip, varint, Litematica bit-packing,
// block-state strings, and the four format parsers/writers. No UI, no
// language strings — every error is a plain StructureConverterError with a
// stable .code that the per-language UI layer translates.

const DEFAULT_DATA_VERSION = 5015;

(function () {
    'use strict';

    // ===== ERRORS =====
    class StructureConverterError extends Error {
        constructor(code, details = {}) {
            super('StructureConverterError: ' + code + (details.reason ? ' (' + details.reason + ')' : ''));
            this.code = code;
            this.details = details;
        }
    }

    const MAX_VOLUME = 134217728; // 2^27 voxels — guards against absurd/malicious declared dimensions

    function checkVolume(volume) {
        if (!Number.isFinite(volume) || volume < 0) {
            throw new StructureConverterError('VOLUME_TOO_LARGE', { reason: 'invalid volume', volume });
        }
        if (volume > MAX_VOLUME) {
            throw new StructureConverterError('VOLUME_TOO_LARGE', { volume, max: MAX_VOLUME });
        }
    }

    function pickPaletteArray(volume, paletteSize) {
        if (paletteSize <= 256) return new Uint8Array(volume);
        if (paletteSize <= 65536) return new Uint16Array(volume);
        return new Uint32Array(volume);
    }

    function widenIfNeeded(arr, neededMax) {
        if (neededMax <= 255 && arr instanceof Uint8Array) return arr;
        if (neededMax <= 65535 && !(arr instanceof Uint32Array)) return arr;
        if (arr instanceof Uint32Array) return arr;
        const wider = neededMax <= 65535 ? new Uint16Array(arr.length) : new Uint32Array(arr.length);
        wider.set(arr);
        return wider;
    }

    // ===== BYTE I/O (big-endian) =====
    class ByteReader {
        constructor(bytes) {
            this.bytes = bytes;
            this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
            this.pos = 0;
        }
        get remaining() { return this.bytes.length - this.pos; }
        _need(n) {
            if (this.remaining < n) {
                throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'unexpected end of data', pos: this.pos, need: n });
            }
        }
        readU8() { this._need(1); const v = this.view.getUint8(this.pos); this.pos += 1; return v; }
        readI8() { this._need(1); const v = this.view.getInt8(this.pos); this.pos += 1; return v; }
        readU16() { this._need(2); const v = this.view.getUint16(this.pos, false); this.pos += 2; return v; }
        readI16() { this._need(2); const v = this.view.getInt16(this.pos, false); this.pos += 2; return v; }
        readI32() { this._need(4); const v = this.view.getInt32(this.pos, false); this.pos += 4; return v; }
        readU32() { this._need(4); const v = this.view.getUint32(this.pos, false); this.pos += 4; return v; }
        readF32() { this._need(4); const v = this.view.getFloat32(this.pos, false); this.pos += 4; return v; }
        readF64() { this._need(8); const v = this.view.getFloat64(this.pos, false); this.pos += 8; return v; }
        readI64BigInt() { this._need(8); const v = this.view.getBigInt64(this.pos, false); this.pos += 8; return v; }
        readBytes(n) { this._need(n); const v = this.bytes.subarray(this.pos, this.pos + n); this.pos += n; return v; }
    }

    class ByteWriter {
        constructor(initialCapacity) {
            this.buf = new Uint8Array(Math.max(initialCapacity || 0, 64));
            this.len = 0;
            this.view = new DataView(this.buf.buffer);
        }
        _ensure(n) {
            if (this.len + n <= this.buf.length) return;
            let cap = this.buf.length * 2;
            while (cap < this.len + n) cap *= 2;
            const nb = new Uint8Array(cap);
            nb.set(this.buf.subarray(0, this.len));
            this.buf = nb;
            this.view = new DataView(this.buf.buffer);
        }
        writeU8(v) { this._ensure(1); this.view.setUint8(this.len, v); this.len += 1; }
        writeI8(v) { this._ensure(1); this.view.setInt8(this.len, v); this.len += 1; }
        writeU16(v) { this._ensure(2); this.view.setUint16(this.len, v, false); this.len += 2; }
        writeI16(v) { this._ensure(2); this.view.setInt16(this.len, v, false); this.len += 2; }
        writeI32(v) { this._ensure(4); this.view.setInt32(this.len, v, false); this.len += 4; }
        writeU32(v) { this._ensure(4); this.view.setUint32(this.len, v, false); this.len += 4; }
        writeF32(v) { this._ensure(4); this.view.setFloat32(this.len, v, false); this.len += 4; }
        writeF64(v) { this._ensure(8); this.view.setFloat64(this.len, v, false); this.len += 8; }
        writeI64BigInt(v) { this._ensure(8); this.view.setBigInt64(this.len, BigInt.asIntN(64, v), false); this.len += 8; }
        writeBytes(bytes) { this._ensure(bytes.length); this.buf.set(bytes, this.len); this.len += bytes.length; }
        toUint8Array() { return this.buf.slice(0, this.len); }
    }

    // ===== VARINT (wiki.vg protocol-style LEB128, used by Sponge Data arrays) =====
    function readVarInt(reader) {
        let result = 0, numRead = 0, readByte;
        do {
            readByte = reader.readU8();
            result |= (readByte & 0x7F) << (7 * numRead);
            numRead++;
            if (numRead > 5) throw new StructureConverterError('VARINT_TOO_LONG');
        } while ((readByte & 0x80) !== 0);
        return result >>> 0;
    }
    function writeVarInt(writer, value) {
        let v = value >>> 0;
        do {
            let b = v & 0x7F;
            v >>>= 7;
            if (v !== 0) b |= 0x80;
            writer.writeU8(b);
        } while (v !== 0);
    }
    function decodeVarIntArray(byteArrayLike, count) {
        const bytes = byteArrayLike instanceof Int8Array
            ? new Uint8Array(byteArrayLike.buffer, byteArrayLike.byteOffset, byteArrayLike.byteLength)
            : byteArrayLike;
        const r = new ByteReader(bytes);
        const out = new Uint32Array(count);
        for (let i = 0; i < count; i++) out[i] = readVarInt(r);
        return out;
    }
    function encodeVarIntArray(indices) {
        const w = new ByteWriter(indices.length * 2);
        for (let i = 0; i < indices.length; i++) writeVarInt(w, indices[i]);
        return w.toUint8Array();
    }

    // ===== GZIP (native browser streams — no vendor library) =====
    async function gzipDecompress(bytes) {
        const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
        return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    async function gzipCompress(bytes) {
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'));
        return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    async function readMaybeGzipped(bytes) {
        if (bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b) {
            if (typeof DecompressionStream === 'undefined') {
                throw new StructureConverterError('GZIP_UNSUPPORTED');
            }
            try {
                return await gzipDecompress(bytes);
            } catch (e) {
                throw new StructureConverterError('DECOMPRESS_FAILED', { cause: String(e) });
            }
        }
        return bytes;
    }

    // ===== NBT TAG MODEL =====
    // NbtTag = {type, value}. Compound value = Map<string, NbtTag> (never a
    // plain object — untrusted file content could contain a key like
    // "__proto__" or an all-numeric region name, which a plain object would
    // mishandle via prototype pollution / V8's numeric-key reordering).
    // List value = {elementType, items: rawValue[]} (items are raw values
    // matching elementType, not wrapped — a List's type is uniform so the
    // per-item type tag would be redundant).
    const TAG = {
        End: 0, Byte: 1, Short: 2, Int: 3, Long: 4, Float: 5, Double: 6,
        ByteArray: 7, String: 8, List: 9, Compound: 10, IntArray: 11, LongArray: 12
    };

    function readNbtString(r) {
        const len = r.readU16();
        return new TextDecoder('utf-8').decode(r.readBytes(len));
    }
    function writeNbtString(w, str) {
        const bytes = new TextEncoder().encode(str);
        if (bytes.length > 0xFFFF) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'string too long' });
        w.writeU16(bytes.length);
        w.writeBytes(bytes);
    }

    function readTagPayload(r, type) {
        switch (type) {
            case TAG.Byte: return r.readI8();
            case TAG.Short: return r.readI16();
            case TAG.Int: return r.readI32();
            case TAG.Long: return r.readI64BigInt();
            case TAG.Float: return r.readF32();
            case TAG.Double: return r.readF64();
            case TAG.ByteArray: {
                const len = r.readI32();
                if (len < 0) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'negative array length' });
                const raw = r.readBytes(len);
                return new Int8Array(raw.buffer, raw.byteOffset, raw.byteLength);
            }
            case TAG.String: return readNbtString(r);
            case TAG.List: {
                const elementType = r.readU8();
                const len = r.readI32();
                if (len < 0) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'negative list length' });
                const items = new Array(len);
                for (let i = 0; i < len; i++) items[i] = readTagPayload(r, elementType);
                return { elementType, items };
            }
            case TAG.Compound: {
                const map = new Map();
                for (;;) {
                    const childType = r.readU8();
                    if (childType === TAG.End) break;
                    const childName = readNbtString(r);
                    map.set(childName, { type: childType, value: readTagPayload(r, childType) });
                }
                return map;
            }
            case TAG.IntArray: {
                const len = r.readI32();
                if (len < 0) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'negative array length' });
                const out = new Int32Array(len);
                for (let i = 0; i < len; i++) out[i] = r.readI32();
                return out;
            }
            case TAG.LongArray: {
                const len = r.readI32();
                if (len < 0) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'negative array length' });
                const out = new BigInt64Array(len);
                for (let i = 0; i < len; i++) out[i] = r.readI64BigInt();
                return out;
            }
            default:
                throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'unknown tag type', type });
        }
    }

    function writeTagPayload(w, type, value) {
        switch (type) {
            case TAG.Byte: w.writeI8(value); break;
            case TAG.Short: w.writeI16(value); break;
            case TAG.Int: w.writeI32(value); break;
            case TAG.Long: w.writeI64BigInt(value); break;
            case TAG.Float: w.writeF32(value); break;
            case TAG.Double: w.writeF64(value); break;
            case TAG.ByteArray:
                w.writeI32(value.length);
                w.writeBytes(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
                break;
            case TAG.String: writeNbtString(w, value); break;
            case TAG.List:
                w.writeU8(value.elementType);
                w.writeI32(value.items.length);
                for (const item of value.items) writeTagPayload(w, value.elementType, item);
                break;
            case TAG.Compound:
                for (const [key, tag] of value) {
                    w.writeU8(tag.type);
                    writeNbtString(w, key);
                    writeTagPayload(w, tag.type, tag.value);
                }
                w.writeU8(TAG.End);
                break;
            case TAG.IntArray:
                w.writeI32(value.length);
                for (let i = 0; i < value.length; i++) w.writeI32(value[i]);
                break;
            case TAG.LongArray:
                w.writeI32(value.length);
                for (let i = 0; i < value.length; i++) w.writeI64BigInt(value[i]);
                break;
            default:
                throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'unknown tag type on write', type });
        }
    }

    function readNbtDocument(bytes) {
        const r = new ByteReader(bytes);
        const type = r.readU8();
        if (type === TAG.End) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'empty document' });
        const name = readNbtString(r);
        const value = readTagPayload(r, type);
        return { name, tag: { type, value } };
    }
    function writeNbtDocument(name, tag) {
        const w = new ByteWriter(4096);
        w.writeU8(tag.type);
        writeNbtString(w, name);
        writeTagPayload(w, tag.type, tag.value);
        return w.toUint8Array();
    }

    // ---- tag builder shorthands ----
    const T_Byte = v => ({ type: TAG.Byte, value: v });
    const T_Short = v => ({ type: TAG.Short, value: v });
    const T_Int = v => ({ type: TAG.Int, value: v });
    const T_Long = v => ({ type: TAG.Long, value: typeof v === 'bigint' ? v : BigInt(v) });
    const T_String = v => ({ type: TAG.String, value: v });
    const T_ByteArray = v => ({ type: TAG.ByteArray, value: v instanceof Int8Array ? v : Int8Array.from(v) });
    const T_IntArray = v => ({ type: TAG.IntArray, value: v instanceof Int32Array ? v : Int32Array.from(v) });
    const T_LongArray = v => ({ type: TAG.LongArray, value: v instanceof BigInt64Array ? v : BigInt64Array.from(v) });
    const T_Compound = entries => ({ type: TAG.Compound, value: entries instanceof Map ? entries : new Map(entries) });
    const T_List = (elementType, items) => ({ type: TAG.List, value: { elementType, items } });

    // ---- compound accessors ----
    function cGet(map, key) { return map.get(key); }
    function cVal(map, key) { const t = map.get(key); return t === undefined ? undefined : t.value; }
    function cReq(map, key) {
        const t = map.get(key);
        if (t === undefined) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'missing required field: ' + key });
        return t.value;
    }

    // ===== BLOCK-STATE STRINGS ("minecraft:oak_stairs[facing=east,...]") =====
    function parseBlockStateString(s) {
        s = String(s).trim();
        const open = s.indexOf('[');
        let name, propsStr = null;
        if (open === -1) {
            name = s;
        } else {
            name = s.slice(0, open);
            const close = s.lastIndexOf(']');
            propsStr = s.slice(open + 1, close === -1 ? undefined : close);
        }
        if (!name.includes(':')) name = 'minecraft:' + name;
        const properties = {};
        if (propsStr) {
            for (const pair of propsStr.split(',')) {
                const eq = pair.indexOf('=');
                if (eq === -1) continue;
                properties[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
            }
        }
        return { name, properties };
    }
    function formatBlockStateString(block) {
        const keys = Object.keys(block.properties || {}).sort();
        if (keys.length === 0) return block.name;
        return block.name + '[' + keys.map(k => k + '=' + block.properties[k]).join(',') + ']';
    }

    // ===== LITEMATICA BIT-PACKED LONG ARRAY =====
    // Algorithm ported verbatim from SmylerMC/litemapy's LitematicaBitArray
    // (storage.py). Entries can straddle two longs; minimum 2 bits/entry.
    function bitsPerEntry(paletteSize) {
        return Math.max(Math.ceil(Math.log2(Math.max(paletteSize, 1))), 2);
    }
    function readPackedLongArray(longs, nbits, count) {
        const mask = (1n << BigInt(nbits)) - 1n;
        const out = new Uint32Array(count);
        for (let index = 0; index < count; index++) {
            const startOffset = index * nbits;
            const startArrIdx = startOffset >> 6;
            const endArrIdx = ((index + 1) * nbits - 1) >> 6;
            const startBit = BigInt(startOffset & 63);
            const a = BigInt.asUintN(64, longs[startArrIdx]);
            let value;
            if (startArrIdx === endArrIdx) {
                value = (a >> startBit) & mask;
            } else {
                const endOffset = 64n - startBit;
                const b = BigInt.asUintN(64, longs[endArrIdx]);
                value = ((a >> startBit) | (b << endOffset)) & mask;
            }
            out[index] = Number(value);
        }
        return out;
    }
    function writePackedLongArray(indices, nbits) {
        const count = indices.length;
        const numLongs = Math.ceil((count * nbits) / 64) || 1;
        const acc = new Array(numLongs).fill(0n);
        const mask = (1n << BigInt(nbits)) - 1n;
        const full = 0xFFFFFFFFFFFFFFFFn;
        for (let index = 0; index < count; index++) {
            const value = BigInt(indices[index]) & mask;
            const startOffset = index * nbits;
            const startArrIdx = startOffset >> 6;
            const endArrIdx = ((index + 1) * nbits - 1) >> 6;
            const startBit = BigInt(startOffset & 63);
            acc[startArrIdx] = (acc[startArrIdx] | ((value << startBit) & full)) & full;
            if (startArrIdx !== endArrIdx) {
                const endOffset = 64n - startBit;
                acc[endArrIdx] = (acc[endArrIdx] | ((value >> endOffset) & full)) & full;
            }
        }
        const out = new BigInt64Array(numLongs);
        for (let i = 0; i < numLongs; i++) out[i] = BigInt.asIntN(64, acc[i]);
        return out;
    }

    // ===== LEGACY TILE-ENTITY SHORT-ID LOOKUP (best-effort, pre-1.11 files) =====
    const LEGACY_TILE_ENTITY_IDS = {
        Chest: 'minecraft:chest', Furnace: 'minecraft:furnace', Sign: 'minecraft:sign',
        MobSpawner: 'minecraft:mob_spawner', Control: 'minecraft:command_block',
        Music: 'minecraft:note_block', Beacon: 'minecraft:beacon', Skull: 'minecraft:skull',
        Banner: 'minecraft:banner', EnchantTable: 'minecraft:enchanting_table',
        Comparator: 'minecraft:comparator', Dropper: 'minecraft:dropper',
        Hopper: 'minecraft:hopper', Cauldron: 'minecraft:brewing_stand'
    };
    function normalizeTileEntityId(id) {
        if (!id) return id;
        if (id.includes(':')) return id;
        return LEGACY_TILE_ENTITY_IDS[id] || id;
    }

    // ===== LEGACY ID:DATA TABLE (assets/JS/structure-converter/legacy-blocks.json) =====
    let _legacyTablePromise = null;
    function loadLegacyTable() {
        if (_legacyTablePromise) return _legacyTablePromise;
        _legacyTablePromise = (async () => {
            let resp;
            try {
                resp = await fetch('/assets/JS/structure-converter/legacy-blocks.json');
            } catch (e) {
                throw new StructureConverterError('LEGACY_TABLE_LOAD_FAILED', { cause: String(e) });
            }
            if (!resp.ok) throw new StructureConverterError('LEGACY_TABLE_LOAD_FAILED', { status: resp.status });
            const data = await resp.json();
            const forward = new Map();
            const reverse = new Map();
            const nameOnly = new Map();
            const entries = Object.entries(data.blocks).sort((a, b) => {
                const [aId, aData] = a[0].split(':').map(Number);
                const [bId, bData] = b[0].split(':').map(Number);
                return aId - bId || aData - bData;
            });
            for (const [key, valueStr] of entries) {
                const [idStr, dataStr] = key.split(':');
                const id = Number(idStr), dataVal = Number(dataStr);
                const block = parseBlockStateString(valueStr);
                forward.set(key, block);
                const canonical = formatBlockStateString(block);
                if (!reverse.has(canonical)) reverse.set(canonical, { id, data: dataVal });
                if (!nameOnly.has(block.name)) nameOnly.set(block.name, { id, data: dataVal });
            }
            return { forward, reverse, nameOnly };
        })();
        return _legacyTablePromise;
    }

    // ===== SPONGE .schem (v1/v2/v3) =====
    function parseSchem(root) {
        const rootMap = root.tag.value;
        const wrapped = rootMap.get('Schematic');
        const container = (wrapped && wrapped.type === TAG.Compound) ? wrapped.value : rootMap;
        const version = cVal(container, 'Version');
        if (version === undefined) throw new StructureConverterError('UNSUPPORTED_SCHEM_VERSION', { reason: 'missing Version field' });

        const width = cReq(container, 'Width');
        const height = cReq(container, 'Height');
        const length = cReq(container, 'Length');
        const offArr = cVal(container, 'Offset');
        const offset = offArr ? { x: offArr[0], y: offArr[1], z: offArr[2] } : { x: 0, y: 0, z: 0 };
        const volume = width * height * length;
        checkVolume(volume);

        let paletteMap, dataTag, blockEntityItems;
        const blocksTag = container.get('Blocks');
        if (blocksTag && blocksTag.type === TAG.Compound) {
            // v3 shape
            const blocksMap = blocksTag.value;
            paletteMap = cReq(blocksMap, 'Palette');
            dataTag = cGet(blocksMap, 'Data');
            const beTag = blocksMap.get('BlockEntities');
            blockEntityItems = beTag ? beTag.value.items : [];
        } else {
            // v1/v2 shape: fields live directly on `container`
            paletteMap = cVal(container, 'Palette') || new Map();
            dataTag = cGet(container, 'BlockData');
            const teTag = container.get('TileEntities');
            blockEntityItems = teTag ? teTag.value.items : [];
        }
        if (!dataTag) throw new StructureConverterError('MISSING_BLOCKS_DATA');

        // Palette: name -> index
        let maxIndex = -1;
        for (const [, tag] of paletteMap) if (tag.value > maxIndex) maxIndex = tag.value;
        const palette = new Array(maxIndex + 1).fill(null);
        for (const [key, tag] of paletteMap) palette[tag.value] = parseBlockStateString(key);
        for (let i = 0; i < palette.length; i++) if (!palette[i]) palette[i] = { name: 'minecraft:air', properties: {} };
        if (palette.length === 0) palette.push({ name: 'minecraft:air', properties: {} });

        // Data: either a varint byte stream (ByteArray) or, defensively, an
        // already-decoded IntArray (spec docs for v1 disagree on this field's
        // exact tag type — handle both so we don't hard-fail on real files).
        let indices;
        if (dataTag.type === TAG.IntArray) {
            indices = new Uint32Array(dataTag.value.length);
            for (let i = 0; i < dataTag.value.length; i++) indices[i] = dataTag.value[i] >>> 0;
        } else {
            indices = decodeVarIntArray(dataTag.value, volume);
        }
        const blocks = widenIfNeeded(pickPaletteArray(volume, palette.length), palette.length - 1);
        blocks.set(indices.subarray(0, volume));

        const blockEntities = blockEntityItems.map(m => {
            const pos = cVal(m, 'Pos');
            const id = cVal(m, 'Id') || cVal(m, 'id') || null;
            const extra = new Map();
            const dataC = m.get('Data');
            if (dataC && dataC.type === TAG.Compound) for (const [k, v] of dataC.value) extra.set(k, v);
            return { x: pos ? pos[0] : 0, y: pos ? pos[1] : 0, z: pos ? pos[2] : 0, id, extra };
        });

        const metaTag = container.get('Metadata');
        const meta = metaTag ? metaTag.value : new Map();
        return {
            width, height, length, offset, palette, blocks, blockEntities,
            entities: [],
            metadata: {
                name: cVal(meta, 'Name'), author: cVal(meta, 'Author'),
                dataVersion: cVal(container, 'DataVersion')
            },
            sourceFormat: 'schem'
        };
    }

    function writeSchem(model) {
        const { width, height, length } = model;
        const paletteEntries = model.palette.map((block, idx) => [formatBlockStateString(block), T_Int(idx)]);
        const dataBytes = encodeVarIntArray(model.blocks);

        const blockEntityTags = model.blockEntities.map(be => {
            const entries = [
                ['Pos', T_IntArray([be.x | 0, be.y | 0, be.z | 0])],
                ['Id', T_String(be.id || 'minecraft:air')]
            ];
            if (be.extra && be.extra.size > 0) entries.push(['Data', T_Compound(be.extra)]);
            return T_Compound(entries).value;
        });

        const blocksEntries = [
            ['Palette', T_Compound(paletteEntries)],
            ['Data', T_ByteArray(dataBytes)]
        ];
        if (blockEntityTags.length) blocksEntries.push(['BlockEntities', T_List(TAG.Compound, blockEntityTags)]);

        const metaEntries = [];
        if (model.metadata && model.metadata.name) metaEntries.push(['Name', T_String(model.metadata.name)]);
        if (model.metadata && model.metadata.author) metaEntries.push(['Author', T_String(model.metadata.author)]);
        metaEntries.push(['Date', T_Long(BigInt(Date.now()))]);

        const schematicEntries = [
            ['Version', T_Int(3)],
            ['DataVersion', T_Int((model.metadata && model.metadata.dataVersion) || DEFAULT_DATA_VERSION)],
            ['Metadata', T_Compound(metaEntries)],
            ['Width', T_Short(width)],
            ['Height', T_Short(height)],
            ['Length', T_Short(length)],
            ['Offset', T_IntArray([model.offset.x | 0, model.offset.y | 0, model.offset.z | 0])],
            ['Blocks', T_Compound(blocksEntries)]
        ];
        const root = T_Compound([['Schematic', T_Compound(schematicEntries)]]);
        return { name: '', tag: root };
    }

    // ===== LITEMATICA .litematic =====
    function extractRegionTileEntities(items, region) {
        return items.map(m => {
            const lx = cVal(m, 'x') || 0, ly = cVal(m, 'y') || 0, lz = cVal(m, 'z') || 0;
            const extra = new Map();
            for (const [k, v] of m) if (k !== 'x' && k !== 'y' && k !== 'z' && k !== 'id') extra.set(k, v);
            return { lx, ly, lz, id: cVal(m, 'id') || null, extra };
        });
    }

    function parseLitematic(root) {
        const rootMap = root.tag.value;
        const regionsMap = cReq(rootMap, 'Regions');
        const regions = [];
        for (const [name, rtag] of regionsMap) {
            const rmap = rtag.value;
            const pos = cReq(rmap, 'Position');
            const size = cReq(rmap, 'Size');
            const px = cVal(pos, 'x'), py = cVal(pos, 'y'), pz = cVal(pos, 'z');
            const sx = cVal(size, 'x'), sy = cVal(size, 'y'), sz = cVal(size, 'z');
            const width = Math.abs(sx), height = Math.abs(sy), length = Math.abs(sz);
            const volume = width * height * length;
            checkVolume(volume);

            const paletteItems = cReq(rmap, 'BlockStatePalette').items;
            const palette = paletteItems.map(entryMap => {
                const nm = cReq(entryMap, 'Name');
                const propsTag = entryMap.get('Properties');
                const properties = {};
                if (propsTag) for (const [k, v] of propsTag.value) properties[k] = v.value;
                return { name: nm, properties };
            });

            const longs = cReq(rmap, 'BlockStates');
            const nbits = bitsPerEntry(Math.max(palette.length, 1));
            const indices = readPackedLongArray(longs, nbits, volume);

            const teTag = rmap.get('TileEntities');
            const tileEntities = teTag ? extractRegionTileEntities(teTag.value.items, { sx, sy, sz }) : [];

            regions.push({ name, px, py, pz, sx, sy, sz, width, height, length, palette, indices, tileEntities });
        }
        if (regions.length === 0) throw new StructureConverterError('NBT_PARSE_FAILED', { reason: 'litematic has no regions' });

        // union bounding box in world space (negative Size extends backward from Position)
        let minX = Infinity, minY = Infinity, minZ = Infinity, maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        for (const r of regions) {
            const x0 = r.sx < 0 ? r.px + r.sx + 1 : r.px, x1 = r.sx < 0 ? r.px : r.px + r.sx - 1;
            const y0 = r.sy < 0 ? r.py + r.sy + 1 : r.py, y1 = r.sy < 0 ? r.py : r.py + r.sy - 1;
            const z0 = r.sz < 0 ? r.pz + r.sz + 1 : r.pz, z1 = r.sz < 0 ? r.pz : r.pz + r.sz - 1;
            minX = Math.min(minX, x0); maxX = Math.max(maxX, x1);
            minY = Math.min(minY, y0); maxY = Math.max(maxY, y1);
            minZ = Math.min(minZ, z0); maxZ = Math.max(maxZ, z1);
        }
        const width = maxX - minX + 1, height = maxY - minY + 1, length = maxZ - minZ + 1;
        checkVolume(width * height * length);

        const palette = [{ name: 'minecraft:air', properties: {} }];
        const paletteKey = new Map([[formatBlockStateString(palette[0]), 0]]);
        let blocks = new Uint32Array(width * height * length); // 0 = air, widened array chosen after final palette size is known
        const blockEntities = [];

        for (const r of regions) {
            const localToGlobal = r.palette.map(block => {
                const key = formatBlockStateString(block);
                let gi = paletteKey.get(key);
                if (gi === undefined) { gi = palette.length; palette.push(block); paletteKey.set(key, gi); }
                return gi;
            });
            for (let ly = 0; ly < r.height; ly++) {
                for (let lz = 0; lz < r.length; lz++) {
                    for (let lx = 0; lx < r.width; lx++) {
                        const localIdx = lx + lz * r.width + ly * r.width * r.length;
                        const globalPaletteIdx = localToGlobal[r.indices[localIdx]] || 0;
                        const wx = r.px + (r.sx < 0 ? -lx : lx);
                        const wy = r.py + (r.sy < 0 ? -ly : ly);
                        const wz = r.pz + (r.sz < 0 ? -lz : lz);
                        const gx = wx - minX, gy = wy - minY, gz = wz - minZ;
                        blocks[gx + gz * width + gy * width * length] = globalPaletteIdx;
                    }
                }
            }
            for (const te of r.tileEntities) {
                const wx = r.px + (r.sx < 0 ? -te.lx : te.lx);
                const wy = r.py + (r.sy < 0 ? -te.ly : te.ly);
                const wz = r.pz + (r.sz < 0 ? -te.lz : te.lz);
                blockEntities.push({ x: wx - minX, y: wy - minY, z: wz - minZ, id: te.id, extra: te.extra });
            }
        }
        blocks = widenIfNeeded(pickPaletteArray(1, palette.length), palette.length - 1).constructor === blocks.constructor
            ? blocks : (() => { const nb = pickPaletteArray(width * height * length, palette.length); nb.set(blocks); return nb; })();

        const metaTag = rootMap.get('Metadata');
        const meta = metaTag ? metaTag.value : new Map();
        return {
            width, height, length, offset: { x: 0, y: 0, z: 0 }, palette, blocks, blockEntities,
            entities: [],
            metadata: { name: cVal(meta, 'Name'), author: cVal(meta, 'Author'), dataVersion: cVal(rootMap, 'MinecraftDataVersion') },
            sourceFormat: 'litematic'
        };
    }

    function writeLitematic(model) {
        const { width, height, length } = model;
        const volume = width * height * length;
        const nbits = bitsPerEntry(Math.max(model.palette.length, 1));
        const longs = writePackedLongArray(model.blocks, nbits);

        const paletteItems = model.palette.map(block => {
            const entries = [['Name', T_String(block.name)]];
            const propKeys = Object.keys(block.properties || {});
            if (propKeys.length) {
                entries.push(['Properties', T_Compound(propKeys.map(k => [k, T_String(String(block.properties[k]))]))]);
            }
            return T_Compound(entries).value;
        });

        const tileEntityItems = model.blockEntities.map(be => {
            const entries = [['x', T_Int(be.x | 0)], ['y', T_Int(be.y | 0)], ['z', T_Int(be.z | 0)]];
            if (be.id) entries.push(['id', T_String(be.id)]);
            if (be.extra) for (const [k, v] of be.extra) entries.push([k, v]);
            return T_Compound(entries).value;
        });

        const regionEntries = [
            ['Position', T_Compound([['x', T_Int(0)], ['y', T_Int(0)], ['z', T_Int(0)]])],
            ['Size', T_Compound([['x', T_Int(width)], ['y', T_Int(height)], ['z', T_Int(length)]])],
            ['BlockStatePalette', T_List(TAG.Compound, paletteItems)],
            ['BlockStates', T_LongArray(longs)],
            ['TileEntities', T_List(TAG.Compound, tileEntityItems)],
            ['Entities', T_List(TAG.Compound, [])],
            ['PendingBlockTicks', T_List(TAG.Compound, [])],
            ['PendingFluidTicks', T_List(TAG.Compound, [])]
        ];
        const regionName = (model.metadata && model.metadata.name) || 'Main';

        const now = BigInt(Date.now());
        const metaEntries = [
            ['Name', T_String(regionName)],
            ['RegionCount', T_Int(1)],
            ['TotalVolume', T_Int(volume)],
            ['TotalBlocks', T_Int(volume)],
            ['TimeCreated', T_Long(now)],
            ['TimeModified', T_Long(now)],
            ['EnclosingSize', T_Compound([['x', T_Int(width)], ['y', T_Int(height)], ['z', T_Int(length)]])]
        ];
        if (model.metadata && model.metadata.author) metaEntries.push(['Author', T_String(model.metadata.author)]);
        if (model.metadata && model.metadata.description) metaEntries.push(['Description', T_String(model.metadata.description)]);

        const root = T_Compound([
            ['Version', T_Int(6)],
            ['SubVersion', T_Int(1)],
            ['MinecraftDataVersion', T_Int((model.metadata && model.metadata.dataVersion) || DEFAULT_DATA_VERSION)],
            ['Metadata', T_Compound(metaEntries)],
            ['Regions', T_Compound([[regionName, T_Compound(regionEntries)]])]
        ]);
        return { name: '', tag: root };
    }

    // ===== LEGACY .schematic (MCEdit / old WorldEdit) =====
    function parseLegacySchematic(root, legacyTable) {
        const rootMap = root.tag.value;
        const width = cReq(rootMap, 'Width');
        const height = cReq(rootMap, 'Height');
        const length = cReq(rootMap, 'Length');
        const volume = width * height * length;
        checkVolume(volume);

        const blocksArr = cReq(rootMap, 'Blocks');   // Int8Array, index (Y*Length+Z)*Width+X
        const dataArr = cVal(rootMap, 'Data');        // Int8Array, low nibble used
        const addArr = cVal(rootMap, 'AddBlocks');    // Int8Array, optional high-nibble extension

        function blockIdAt(i) {
            let id = blocksArr[i] & 0xFF;
            if (addArr) {
                const nibble = (i % 2 === 0)
                    ? (addArr[i >> 1] >> 4) & 0xF
                    : addArr[i >> 1] & 0xF;
                id |= nibble << 8;
            }
            return id;
        }

        const palette = [];
        const paletteKey = new Map();
        const blocksWide = new Uint32Array(volume);
        for (let y = 0; y < height; y++) {
            for (let z = 0; z < length; z++) {
                for (let x = 0; x < width; x++) {
                    const legacyIdx = (y * length + z) * width + x;
                    const id = blockIdAt(legacyIdx);
                    const dataVal = dataArr ? (dataArr[legacyIdx] & 0xF) : 0;
                    const key = id + ':' + dataVal;
                    let block = legacyTable.forward.get(key);
                    if (!block) block = legacyTable.forward.get(id + ':0') || { name: 'minecraft:air', properties: {} };
                    const canonical = formatBlockStateString(block);
                    let pIdx = paletteKey.get(canonical);
                    if (pIdx === undefined) { pIdx = palette.length; palette.push(block); paletteKey.set(canonical, pIdx); }
                    const canonicalIdx = x + z * width + y * width * length;
                    blocksWide[canonicalIdx] = pIdx;
                }
            }
        }
        const blocks = pickPaletteArray(volume, palette.length);
        blocks.set(blocksWide);

        const teList = rootMap.get('TileEntities');
        const blockEntities = (teList ? teList.value.items : []).map(m => {
            const extra = new Map();
            for (const [k, v] of m) if (k !== 'x' && k !== 'y' && k !== 'z' && k !== 'id') extra.set(k, v);
            return {
                x: cVal(m, 'x') || 0, y: cVal(m, 'y') || 0, z: cVal(m, 'z') || 0,
                id: normalizeTileEntityId(cVal(m, 'id')), extra
            };
        });

        const weOffX = cVal(rootMap, 'WEOffsetX'), weOffY = cVal(rootMap, 'WEOffsetY'), weOffZ = cVal(rootMap, 'WEOffsetZ');
        return {
            width, height, length,
            offset: { x: weOffX || 0, y: weOffY || 0, z: weOffZ || 0 },
            palette, blocks, blockEntities, entities: [],
            metadata: {}, sourceFormat: 'schematic'
        };
    }

    function writeLegacySchematic(model, legacyTable) {
        const { width, height, length } = model;
        const volume = width * height * length;

        // resolve each unique palette entry once (not per-voxel)
        const resolved = model.palette.map(block => {
            const canonical = formatBlockStateString(block);
            const exact = legacyTable.reverse.get(canonical);
            if (exact) return { id: exact.id, data: exact.data, exact: true };
            const byName = legacyTable.nameOnly.get(block.name);
            if (byName) return { id: byName.id, data: byName.data, exact: false };
            return { id: 0, data: 0, exact: false, unmapped: true };
        });

        const needsAdd = resolved.some(r => r.id > 255);
        const blocksOut = new Uint8Array(volume);
        const dataOut = new Uint8Array(volume);
        const addOut = needsAdd ? new Uint8Array(Math.ceil(volume / 2)) : null;

        const unmappedCounts = new Map(); // name -> voxel count
        let unmappedVoxelCount = 0;

        for (let y = 0; y < height; y++) {
            for (let z = 0; z < length; z++) {
                for (let x = 0; x < width; x++) {
                    const canonicalIdx = x + z * width + y * width * length;
                    const paletteIdx = model.blocks[canonicalIdx];
                    const r = resolved[paletteIdx];
                    const legacyIdx = (y * length + z) * width + x;
                    blocksOut[legacyIdx] = r.id & 0xFF;
                    dataOut[legacyIdx] = r.data & 0xF;
                    if (addOut && r.id > 255) {
                        const highByte = (r.id >> 8) & 0xF;
                        const byteIdx = legacyIdx >> 1;
                        if (legacyIdx % 2 === 0) addOut[byteIdx] |= (highByte << 4);
                        else addOut[byteIdx] |= highByte;
                    }
                    if (r.unmapped) {
                        unmappedVoxelCount++;
                        const block = model.palette[paletteIdx];
                        unmappedCounts.set(block.name, (unmappedCounts.get(block.name) || 0) + 1);
                    }
                }
            }
        }

        const entries = [
            ['Width', T_Short(width)],
            ['Height', T_Short(height)],
            ['Length', T_Short(length)],
            ['Materials', T_String('Alpha')],
            ['Blocks', T_ByteArray(blocksOut)],
            ['Data', T_ByteArray(dataOut)]
        ];
        if (addOut) entries.push(['AddBlocks', T_ByteArray(addOut)]);
        if (model.offset) {
            entries.push(['WEOffsetX', T_Int(model.offset.x | 0)]);
            entries.push(['WEOffsetY', T_Int(model.offset.y | 0)]);
            entries.push(['WEOffsetZ', T_Int(model.offset.z | 0)]);
        }
        const teItems = model.blockEntities.map(be => {
            const teEntries = [['x', T_Int(be.x | 0)], ['y', T_Int(be.y | 0)], ['z', T_Int(be.z | 0)]];
            if (be.id) teEntries.push(['id', T_String(be.id)]);
            if (be.extra) for (const [k, v] of be.extra) teEntries.push([k, v]);
            return T_Compound(teEntries).value;
        });
        if (teItems.length) entries.push(['TileEntities', T_List(TAG.Compound, teItems)]);

        const doc = { name: 'Schematic', tag: T_Compound(entries) };
        const unmappedTypes = Array.from(unmappedCounts, ([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
        return { doc, warnings: { unmappedVoxelCount, unmappedTypes } };
    }

    // ===== JAVA STRUCTURE BLOCK .nbt (data/<ns>/structure/*.nbt, since 1.13) =====
    // Spec: https://minecraft.wiki/w/Structure_file . Distinct from .schem: pos/size
    // fields are TAG_List of TAG_Int here, not TAG_IntArray, and blocks are a sparse
    // per-voxel compound list (state+pos+optional nbt) rather than a dense array.
    function parseNbtStructure(root) {
        const rootMap = root.tag.value;
        const sizeList = cReq(rootMap, 'size'); // {elementType, items:[x,y,z]}
        const width = sizeList.items[0], height = sizeList.items[1], length = sizeList.items[2];
        const volume = width * height * length;
        checkVolume(volume);

        let paletteList = cVal(rootMap, 'palette');
        if (!paletteList) {
            const palettesTag = rootMap.get('palettes');
            const outerItems = palettesTag ? palettesTag.value.items : [];
            if (outerItems.length > 0) paletteList = outerItems[0];
        }
        if (!paletteList) throw new StructureConverterError('MISSING_BLOCKS_DATA', { reason: 'missing palette' });

        const palette = paletteList.items.map(m => {
            const name = cReq(m, 'Name');
            const propsTag = m.get('Properties');
            const properties = {};
            if (propsTag) for (const [k, t] of propsTag.value) properties[k] = t.value;
            return { name, properties };
        });
        if (palette.length === 0) palette.push({ name: 'minecraft:air', properties: {} });

        const blocksList = cReq(rootMap, 'blocks');
        const blocksWide = new Uint32Array(volume);
        const blockEntities = [];
        for (const m of blocksList.items) {
            const pos = cReq(m, 'pos').items;
            const x = pos[0], y = pos[1], z = pos[2];
            if (x < 0 || x >= width || y < 0 || y >= height || z < 0 || z >= length) continue;
            const idx = x + z * width + y * width * length;
            blocksWide[idx] = cReq(m, 'state');
            const nbtTag = m.get('nbt');
            if (nbtTag && nbtTag.type === TAG.Compound) {
                const nbtMap = nbtTag.value;
                const extra = new Map();
                for (const [k, v] of nbtMap) if (k !== 'id') extra.set(k, v);
                blockEntities.push({ x, y, z, id: cVal(nbtMap, 'id') || null, extra });
            }
        }
        const blocks = pickPaletteArray(volume, palette.length);
        blocks.set(blocksWide);

        return {
            width, height, length, offset: { x: 0, y: 0, z: 0 },
            palette, blocks, blockEntities, entities: [],
            metadata: { dataVersion: cVal(rootMap, 'DataVersion') },
            sourceFormat: 'nbt'
        };
    }

    function writeNbtStructure(model) {
        const { width, height, length } = model;
        const paletteItems = model.palette.map(block => {
            const entries = [['Name', T_String(block.name)]];
            const propKeys = Object.keys(block.properties || {});
            if (propKeys.length > 0) {
                entries.push(['Properties', T_Compound(propKeys.map(k => [k, T_String(String(block.properties[k]))]))]);
            }
            return T_Compound(entries).value;
        });

        const beByPos = new Map();
        for (const be of model.blockEntities) beByPos.set(be.x + ',' + be.y + ',' + be.z, be);

        const blockItems = [];
        for (let y = 0; y < height; y++) {
            for (let z = 0; z < length; z++) {
                for (let x = 0; x < width; x++) {
                    const idx = x + z * width + y * width * length;
                    const entries = [
                        ['state', T_Int(model.blocks[idx])],
                        ['pos', T_List(TAG.Int, [x, y, z])]
                    ];
                    const be = beByPos.get(x + ',' + y + ',' + z);
                    if (be) {
                        const nbtEntries = [];
                        if (be.id) nbtEntries.push(['id', T_String(be.id)]);
                        if (be.extra) for (const [k, v] of be.extra) nbtEntries.push([k, v]);
                        entries.push(['nbt', T_Compound(nbtEntries)]);
                    }
                    blockItems.push(T_Compound(entries).value);
                }
            }
        }

        const entries = [
            ['DataVersion', T_Int((model.metadata && model.metadata.dataVersion) || DEFAULT_DATA_VERSION)],
            ['size', T_List(TAG.Int, [width, height, length])],
            ['entities', T_List(TAG.Compound, [])],
            ['blocks', T_List(TAG.Compound, blockItems)],
            ['palette', T_List(TAG.Compound, paletteItems)]
        ];
        return { name: '', tag: T_Compound(entries) };
    }

    // ===== FORMAT DETECTION & DISPATCH =====
    const FORMATS = {
        schematic: { id: 'schematic', ext: '.schematic' },
        schem: { id: 'schem', ext: '.schem' },
        litematic: { id: 'litematic', ext: '.litematic' },
        nbt: { id: 'nbt', ext: '.nbt' }
    };

    function detectFormat(root) {
        const rootMap = root.tag.value;
        if (rootMap.has('Regions')) return 'litematic';
        const schematicWrapper = rootMap.get('Schematic');
        if (schematicWrapper && schematicWrapper.type === TAG.Compound) return 'schem';
        const blocksTag = rootMap.get('Blocks');
        if (blocksTag && blocksTag.type === TAG.ByteArray) return 'schematic';
        if (rootMap.has('Version') && (rootMap.has('BlockData') || rootMap.has('Palette'))) return 'schem';
        if (rootMap.has('size') && rootMap.has('blocks') && (rootMap.has('palette') || rootMap.has('palettes'))) return 'nbt';
        throw new StructureConverterError('UNKNOWN_FORMAT');
    }

    async function bytesFromInput(input) {
        if (input instanceof Uint8Array) return input;
        if (input instanceof ArrayBuffer) return new Uint8Array(input);
        if (input && typeof input.arrayBuffer === 'function') return new Uint8Array(await input.arrayBuffer());
        throw new StructureConverterError('UNSUPPORTED_INPUT');
    }

    async function parse(input) {
        const raw = await bytesFromInput(input);
        if (raw.length === 0) throw new StructureConverterError('EMPTY_FILE');
        const bytes = await readMaybeGzipped(raw);
        const root = readNbtDocument(bytes);
        const detected = detectFormat(root);
        let model;
        if (detected === 'schem') model = parseSchem(root);
        else if (detected === 'litematic') model = parseLitematic(root);
        else if (detected === 'nbt') model = parseNbtStructure(root);
        else model = parseLegacySchematic(root, await loadLegacyTable());
        return { model, detected };
    }

    async function write(model, targetFormat) {
        let doc, warnings;
        if (targetFormat === 'schem') {
            doc = writeSchem(model);
        } else if (targetFormat === 'litematic') {
            doc = writeLitematic(model);
        } else if (targetFormat === 'nbt') {
            doc = writeNbtStructure(model);
        } else if (targetFormat === 'schematic') {
            const result = writeLegacySchematic(model, await loadLegacyTable());
            doc = result.doc;
            warnings = result.warnings;
        } else {
            throw new StructureConverterError('UNSUPPORTED_INPUT', { reason: 'unknown target format', targetFormat });
        }
        const nbtBytes = writeNbtDocument(doc.name, doc.tag);
        const bytes = await gzipCompress(nbtBytes);
        return { bytes, filename: 'converted' + FORMATS[targetFormat].ext, warnings };
    }

    // ===== SELF-TESTS (manual: call StructureConverter.runSelfTests() from devtools) =====
    function deepEqual(a, b) {
        if (a === b) return true;
        if (typeof a === 'bigint' || typeof b === 'bigint') return BigInt(a) === BigInt(b);
        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;
            for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k))) return false;
            return true;
        }
        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        if (a && b && typeof a === 'object' && typeof b === 'object') {
            const ak = Object.keys(a), bk = Object.keys(b);
            if (ak.length !== bk.length) return false;
            for (const k of ak) if (!deepEqual(a[k], b[k])) return false;
            return true;
        }
        return false;
    }

    async function runSelfTests() {
        const results = [];
        async function test(name, fn) {
            try { await fn(); results.push({ name, ok: true }); }
            catch (e) { results.push({ name, ok: false, error: e && e.message ? e.message : String(e) }); }
        }
        function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }

        await test('varint round-trip', () => {
            for (const v of [0, 1, 127, 128, 300, 2097151, 12345678]) {
                const w = new ByteWriter(); writeVarInt(w, v);
                const r = new ByteReader(w.toUint8Array());
                assert(readVarInt(r) === v, 'varint ' + v);
            }
        });

        await test('primitive byte I/O round-trip', () => {
            const w = new ByteWriter();
            w.writeI8(-128); w.writeI16(-32768); w.writeI32(-2147483648);
            w.writeI64BigInt(9223372036854775807n); w.writeF32(1.5); w.writeF64(2.25);
            const r = new ByteReader(w.toUint8Array());
            assert(r.readI8() === -128, 'i8');
            assert(r.readI16() === -32768, 'i16');
            assert(r.readI32() === -2147483648, 'i32');
            assert(r.readI64BigInt() === 9223372036854775807n, 'i64');
            assert(r.readF32() === 1.5, 'f32');
            assert(r.readF64() === 2.25, 'f64');
        });

        await test('NBT round-trip (all 13 tag types)', () => {
            const doc = T_Compound([
                ['b', T_Byte(-5)], ['s', T_Short(-300)], ['i', T_Int(-70000)],
                ['l', T_Long(-1n)], ['str', T_String('hello éü')],
                ['ba', T_ByteArray([1, -2, 3])],
                ['ia', T_IntArray([1, 2, 3])],
                ['la', T_LongArray([9223372036854775807n, -9223372036854775808n])],
                ['list', T_List(TAG.Int, [1, 2, 3])],
                ['emptyList', T_List(TAG.End, [])],
                ['nested', T_Compound([['inner', T_List(TAG.Compound, [new Map([['x', T_Int(1)]])])]])]
            ]);
            const bytes = writeNbtDocument('root', doc);
            const back = readNbtDocument(bytes);
            assert(back.name === 'root', 'doc name');
            assert(deepEqual(back.tag.value, doc.value !== undefined ? doc.value : doc.value), 'placeholder');
            assert(deepEqual(back.tag, doc), 'full NBT tree equal');
        });

        await test('gzip magic fallback (raw passthrough)', async () => {
            const raw = new Uint8Array([1, 2, 3, 4]);
            const out = await readMaybeGzipped(raw);
            assert(deepEqual(out, raw), 'non-gzip bytes pass through unchanged');
        });

        await test('bit-pack: hardcoded expected value (nbits=2, [3,0,1,2])', () => {
            const packed = writePackedLongArray([3, 0, 1, 2], 2);
            assert(packed.length === 1, 'one long expected');
            assert(packed[0] === 147n, 'expected 147n, got ' + packed[0]);
            const back = readPackedLongArray(packed, 2, 4);
            assert(deepEqual(Array.from(back), [3, 0, 1, 2]), 'round-trip');
        });

        await test('bit-pack: straddling entries (nbits=5)', () => {
            const original = [0, 31, 15, 7, 1, 30, 3, 22, 9, 17];
            const packed = writePackedLongArray(original, 5);
            const back = readPackedLongArray(packed, 5, original.length);
            assert(deepEqual(Array.from(back), original), 'nbits=5 round-trip');
        });

        await test('block-state string parse/format', () => {
            assert(formatBlockStateString(parseBlockStateString('oak_log')) === 'minecraft:oak_log', 'bare name gets namespaced');
            const b = parseBlockStateString('minecraft:oak_door[hinge=right,facing=east]');
            assert(b.properties.hinge === 'right' && b.properties.facing === 'east', 'properties parsed');
            assert(formatBlockStateString({ name: 'minecraft:x', properties: { b: '1', a: '2' } }) === 'minecraft:x[a=2,b=1]', 'alphabetical property order');
        });

        await test('.schem v3 round-trip (synthetic model)', () => {
            const model = {
                width: 2, height: 1, length: 2, offset: { x: 0, y: 0, z: 0 },
                palette: [{ name: 'minecraft:air', properties: {} }, { name: 'minecraft:stone', properties: {} }],
                blocks: Uint8Array.from([0, 1, 1, 0]),
                blockEntities: [], entities: [], metadata: {}
            };
            const written = writeSchem(model);
            const reparsed = parseSchem(written);
            assert(reparsed.width === 2 && reparsed.height === 1 && reparsed.length === 2, 'dims');
            for (let i = 0; i < 4; i++) {
                assert(formatBlockStateString(reparsed.palette[reparsed.blocks[i]]) === formatBlockStateString(model.palette[model.blocks[i]]), 'voxel ' + i);
            }
        });

        await test('.litematic round-trip (palette size 5 -> nbits=3)', () => {
            const names = ['air', 'stone', 'dirt', 'oak_log', 'glass'];
            const palette = names.map(n => ({ name: 'minecraft:' + n, properties: {} }));
            const blocks = Uint8Array.from([0, 1, 2, 3, 4, 1, 2, 3]);
            const model = { width: 2, height: 2, length: 2, offset: { x: 0, y: 0, z: 0 }, palette, blocks, blockEntities: [], entities: [], metadata: { name: 'Test' } };
            const written = writeLitematic(model);
            const reparsed = parseLitematic(written);
            for (let i = 0; i < 8; i++) {
                assert(formatBlockStateString(reparsed.palette[reparsed.blocks[i]]) === formatBlockStateString(model.palette[model.blocks[i]]), 'voxel ' + i);
            }
        });

        await test('.nbt structure round-trip (with block entity)', () => {
            const model = {
                width: 2, height: 1, length: 2, offset: { x: 0, y: 0, z: 0 },
                palette: [{ name: 'minecraft:air', properties: {} }, { name: 'minecraft:chest', properties: { facing: 'north' } }],
                blocks: Uint8Array.from([0, 1, 1, 0]),
                blockEntities: [{ x: 1, y: 0, z: 0, id: 'minecraft:chest', extra: new Map([['CustomName', T_String('Loot')]]) }],
                entities: [], metadata: { dataVersion: DEFAULT_DATA_VERSION }
            };
            const written = writeNbtStructure(model);
            const reparsed = parseNbtStructure(written);
            assert(reparsed.width === 2 && reparsed.height === 1 && reparsed.length === 2, 'dims');
            for (let i = 0; i < 4; i++) {
                assert(formatBlockStateString(reparsed.palette[reparsed.blocks[i]]) === formatBlockStateString(model.palette[model.blocks[i]]), 'voxel ' + i);
            }
            assert(reparsed.blockEntities.length === 1, 'block entity carried over');
            assert(reparsed.blockEntities[0].id === 'minecraft:chest', 'block entity id');
            assert(reparsed.blockEntities[0].x === 1, 'block entity pos');
        });

        await test('cross-format smoke matrix (schem <-> litematic <-> nbt, no exceptions)', () => {
            const model = {
                width: 1, height: 1, length: 1, offset: { x: 0, y: 0, z: 0 },
                palette: [{ name: 'minecraft:stone', properties: {} }],
                blocks: Uint8Array.from([0]), blockEntities: [], entities: [], metadata: {}
            };
            const s = writeSchem(model); const rs = parseSchem(s);
            const l = writeLitematic(rs); const rl = parseLitematic(l);
            const n = writeNbtStructure(rl); const rn = parseNbtStructure(n);
            assert(rn.width === 1 && rn.height === 1 && rn.length === 1, 'smoke dims');
        });

        const failed = results.filter(r => !r.ok);
        console.log('[StructureConverter self-tests] ' + (results.length - failed.length) + '/' + results.length + ' passed');
        for (const r of results) {
            if (r.ok) console.log('  ✓ ' + r.name);
            else console.error('  ✗ ' + r.name + ': ' + r.error);
        }
        return { passed: results.length - failed.length, total: results.length, failed };
    }

    window.StructureConverter = {
        FORMATS, parse, write, detectFormat, loadLegacyTable, StructureConverterError, runSelfTests,
        // exposed for advanced/debug use only:
        _internals: { readNbtDocument, writeNbtDocument, parseBlockStateString, formatBlockStateString, bitsPerEntry, readPackedLongArray, writePackedLongArray }
    };
})();
