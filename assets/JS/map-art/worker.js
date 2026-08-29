// Web Worker wrapper around core.js — keeps the UI thread responsive while
// the (potentially large) nearest-color search and voxel fill run.
importScripts('/assets/JS/map-art/core.js');

self.onmessage = async (e) => {
    const { bitmap, cols, rows, mode, allowedIds, dither, contrast } = e.data;
    try {
        let blocks = await MapArtGenerator.loadBlockColors();
        if (allowedIds && allowedIds.length) {
            const allowed = new Set(allowedIds);
            blocks = blocks.filter((b) => allowed.has(b.id));
        } else {
            // Default "all blocks" mode: skip GM/technical-only blocks (barrier,
            // light, command blocks, ...) whose reference images are flat debug
            // icons rather than real shaded block renders. Their icon colors can
            // be more saturated than any real block, so they can win nearest-
            // color matches purely on brightness even though the block itself
            // is normally invisible/inaccessible in survival. Still fully
            // available in "custom selection" mode for anyone who wants them.
            blocks = blocks.filter((b) => b.category !== 'Spielmodus & Technik');
        }
        if (blocks.length === 0) {
            const err = new Error('No blocks selected');
            err.code = 'NO_BLOCKS_SELECTED';
            throw err;
        }
        const pixels = MapArtGenerator.downscaleToGrid(bitmap, cols, rows);
        MapArtGenerator.applyContrast(pixels, contrast);
        const { model, materialCounts, previewRGBA, heightRange } = MapArtGenerator.buildModel(blocks, pixels, cols, rows, mode, dither);
        const { colorIds: mapDatColors } = MapArtGenerator.buildMapDatColors(pixels, cols, rows, mode, dither);
        self.postMessage({
            ok: true,
            model: {
                width: model.width, height: model.height, length: model.length,
                offset: model.offset, palette: model.palette,
                blocks: model.blocks, blockEntities: model.blockEntities,
                entities: model.entities, metadata: model.metadata
            },
            materialCounts: Array.from(materialCounts.entries()),
            previewRGBA, mapDatColors, cols, rows, heightRange
        });
    } catch (err) {
        self.postMessage({ ok: false, code: err.code || 'UNKNOWN', message: err.message });
    }
};
