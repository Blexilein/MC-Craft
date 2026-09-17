// mob-3d-viewer.js
// Lazy-loaded 3D mob preview for the Mobs Database's "3D-Modell" tab.
// Only fetched the first time that tab is actually opened - the import map
// for its dependencies is declared in the page head, but nothing here
// downloads (~1.3MB of three.js + friends) until this module is imported.
import * as THREE from 'three';

const MANIFEST_URL = '/assets/JS/vendor/mob3d/manifest.json';
const MODEL_VIEWER_URL = '/assets/JS/vendor/mob3d/model-viewer.es.js';
const MODELS_BASE = '/assets/JS/vendor/mob3d/models/';
const TEXTURES_BASE = '/assets/img/mobs3d/';
const POSES_BASE = '/assets/JS/vendor/mob3d/poses/';

let manifestPromise = null;
let viewerModulePromise = null;
let current = null; // { viewer, equipment }
let renderToken = 0;
const rawGeoFilePromises = new Map(); // geoFile -> parsed raw JSON, never mutated
const imagePromises = new Map();

function loadRawGeoFile(geoFile) {
    if (!rawGeoFilePromises.has(geoFile)) {
        rawGeoFilePromises.set(geoFile, fetch(`${MODELS_BASE}${geoFile}`, { cache: 'no-cache' }).then((r) => r.json()));
    }
    return rawGeoFilePromises.get(geoFile);
}

// Raw bedrock-samples files come in two shapes: modern ("minecraft:geometry":
// [{description, bones}]) or legacy ({"<id>[:<parent>]": {texturewidth, bones}}).
// Returns a deep copy - the cached raw file must never be mutated.
function extractEntry(rawFile, geoId) {
    if (Array.isArray(rawFile['minecraft:geometry'])) {
        const entry = rawFile['minecraft:geometry'].find(
            (e) => e.description && e.description.identifier.split(':', 1)[0] === geoId
        );
        if (!entry) return null;
        return { description: { ...entry.description }, bones: structuredClone(entry.bones || []) };
    }
    for (const [key, value] of Object.entries(rawFile)) {
        if (key === 'format_version' || !value || !value.bones) continue;
        if (key.split(':', 1)[0] !== geoId) continue;
        const description = {};
        if (value.texturewidth) description.texture_width = value.texturewidth;
        if (value.textureheight) description.texture_height = value.textureheight;
        return { description, bones: structuredClone(value.bones) };
    }
    return null;
}

// Legacy "child:parent" inheritance - a child bone with a parent's name adds
// its cubes to that bone (sheep wool over the sheared body, witch hat/wart
// over the villager), anything else is a new bone.
function mergeInherited(parentBones, childBones) {
    const byName = new Map(parentBones.map((b) => [b.name, b]));
    childBones.forEach((bone) => {
        const existing = byName.get(bone.name);
        if (!existing) {
            parentBones.push(bone);
            byName.set(bone.name, bone);
            return;
        }
        Object.entries(bone).forEach(([k, v]) => { if (k !== 'cubes') existing[k] = v; });
        existing.cubes = [...(existing.cubes || []), ...(bone.cubes || [])];
    });
    return parentBones;
}

// bind_pose_rotation rotates the bone's own cubes around the bone pivot
// without cascading to child bones, so it's applied per cube.
function applyBindPoseRotation(bones) {
    bones.forEach((bone) => {
        const bpr = bone.bind_pose_rotation;
        if (!bpr) return;
        (bone.cubes || []).forEach((cube) => {
            const base = cube.rotation || [0, 0, 0];
            cube.rotation = [base[0] + bpr[0], base[1] + bpr[1], base[2] + bpr[2]];
            if (!cube.pivot) cube.pivot = bone.pivot || [0, 0, 0];
        });
    });
}

// Per the geometry spec a rotated cube without a pivot turns around its own
// center; the viewer library falls back to the bone pivot instead.
function fixCubePivots(bones) {
    bones.forEach((bone) => {
        (bone.cubes || []).forEach((cube) => {
            if (!cube.rotation || cube.pivot) return;
            const o = cube.origin || [0, 0, 0];
            const s = cube.size || [0, 0, 0];
            cube.pivot = [o[0] + s[0] / 2, o[1] + s[1] / 2, o[2] + s[2] / 2];
        });
    });
}

const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

function shiftBone(bone, delta) {
    bone.pivot = add3(bone.pivot || [0, 0, 0], delta);
    (bone.cubes || []).forEach((cube) => {
        cube.origin = add3(cube.origin || [0, 0, 0], delta);
        if (cube.pivot) cube.pivot = add3(cube.pivot, delta);
    });
}

function copyBone(bone, name, delta) {
    const out = structuredClone(bone);
    out.name = name;
    shiftBone(out, delta);
    return out;
}

// The dragon's geometry only holds the pieces the engine assembles itself:
// one neck cube reused 5x for the neck and 12x for the tail, leg/wing tips
// in their parent's local space, and right-side parts to be mirrored. This
// rebuilds that like the Java DragonModel does, at rest.
function fixDragonRig(bones) {
    const by = new Map(bones.map((b) => [b.name, b]));
    [['wingtip', 'wing'], ['rearlegtip', 'rearleg'], ['rearfoot', 'rearlegtip'],
        ['frontlegtip', 'frontleg'], ['frontfoot', 'frontlegtip']].forEach(([child, parent]) => {
        const c = by.get(child);
        const p = by.get(parent);
        if (!c || !p) return;
        shiftBone(c, [p.pivot[0], p.pivot[1] - 24, p.pivot[2]]);
        c.parent = parent;
    });
    const rest = {
        wing: [-4.3, 0, 5.73], wingtip: [0, 0, -60.6],
        rearleg: [57.4, 0, 0], rearlegtip: [28.75, 0, 0], rearfoot: [43.1, 0, 0],
        frontleg: [74.6, 0, 0], frontlegtip: [-28.75, 0, 0], frontfoot: [43.1, 0, 0]
    };
    const sides = Object.keys(rest);
    const mirrored = [];
    sides.forEach((name) => {
        const left = by.get(name);
        if (!left) return;
        left.rotation = rest[name];
        const right = structuredClone(left);
        right.name = `${name}1`;
        if (right.parent) right.parent = `${right.parent}1`;
        right.pivot = [-left.pivot[0], left.pivot[1], left.pivot[2]];
        right.rotation = [rest[name][0], -rest[name][1], -rest[name][2]];
        (right.cubes || []).forEach((cube) => {
            cube.origin = [-(cube.origin[0] + cube.size[0]), cube.origin[1], cube.origin[2]];
            if (cube.pivot) cube.pivot = [-cube.pivot[0], cube.pivot[1], cube.pivot[2]];
            cube.mirror = !(cube.mirror ?? left.mirror ?? false);
        });
        mirrored.push(right);
    });
    const neck = by.get('neck');
    const segments = [];
    if (neck) {
        let y = 20;
        let z = -12;
        for (let k = 0; k < 5; k += 1) {
            segments.push(copyBone(neck, `neck${k + 1}`, [0, -y, z]));
            const a = 0.15 * Math.cos(k * 0.45);
            y += Math.sin(a) * 10;
            z -= Math.cos(a) * 10;
        }
        ['head', 'jaw'].forEach((name) => { if (by.get(name)) shiftBone(by.get(name), [0, -y, z]); });
        y = 10;
        z = 60;
        for (let k = 0; k < 12; k += 1) {
            segments.push(copyBone(neck, `tail${k + 1}`, [0, -y, z]));
            const a = -0.08 * Math.cos(k * 0.45);
            y += Math.sin(a) * 10;
            z += Math.cos(a) * 10;
        }
    }
    const dropped = new Set(['neck', ...sides.map((n) => `${n}1`)]);
    return [...bones.filter((b) => !dropped.has(b.name)), ...segments, ...mirrored];
}

// spec: a manifest entry or variant ({geoFile, geoId, geoParents?, bindFix?})
async function loadGeometry(spec) {
    const chain = [...(spec.geoParents || []), { geoFile: spec.geoFile, geoId: spec.geoId }];
    let description = {};
    let bones = null;
    for (const link of chain) {
        const entry = extractEntry(await loadRawGeoFile(link.geoFile), link.geoId);
        if (!entry) throw new Error(`geometry "${link.geoId}" not found in ${link.geoFile}`);
        description = { ...description, ...entry.description };
        bones = bones ? mergeInherited(bones, entry.bones) : entry.bones;
    }
    const fix = spec.bindFix || {};
    bones.forEach((bone) => {
        if (fix[bone.name] && !bone.bind_pose_rotation) bone.bind_pose_rotation = fix[bone.name];
    });
    if (spec.geoId === 'geometry.dragon') bones = fixDragonRig(bones);
    applyBindPoseRotation(bones);
    fixCubePivots(bones);
    description.identifier = spec.geoId;
    description.texture_width = description.texture_width ?? 64;
    description.texture_height = description.texture_height ?? 64;
    return { description, bones };
}

let decodeGl = null;

// Exact, non-premultiplied RGBA of a texture. A 2D canvas stores colour
// premultiplied, which wrecks the RGB Mojang keeps in near-transparent
// pixels (sheep face and legs at alpha 3, spider eyes) - WebGL doesn't.
function decodeTexture(asset) {
    if (!imagePromises.has(asset)) {
        imagePromises.set(asset, (async () => {
            const blob = await fetch(`${TEXTURES_BASE}${asset}.png`).then((r) => r.blob());
            const bmp = await createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' });
            if (!decodeGl || decodeGl.isContextLost()) decodeGl = document.createElement('canvas').getContext('webgl');
            const gl = decodeGl;
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp);
            const fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            const data = new Uint8Array(bmp.width * bmp.height * 4);
            gl.readPixels(0, 0, bmp.width, bmp.height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(fb);
            gl.deleteTexture(tex);
            const out = { data, w: bmp.width, h: bmp.height };
            bmp.close();
            return out;
        })());
    }
    return imagePromises.get(asset);
}

function toCanvas(pixels, w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').putImageData(new ImageData(pixels, w, h), 0, 0);
    return canvas;
}

// Stacks texture layers (zombie villager skin + biome + profession, llama +
// decor, copper golem + eyes) and resolves Bedrock's alpha tricks: with
// emissiveAlpha (spider, enderman, phantom, blaze...) partial alpha means
// glow, with opaqueAlpha (sheep) it's only the wool-tint mask - either way
// those pixels are really opaque.
async function buildTexture(layers, emissiveAlpha, opaqueAlpha) {
    if (layers.length === 1 && !emissiveAlpha && !opaqueAlpha && !layers[0].emissive) {
        return { url: `${TEXTURES_BASE}${layers[0].asset}.png`, emissive: null, opaque: false };
    }
    const decoded = await Promise.all(layers.map((l) => decodeTexture(l.asset)));
    const { w, h } = decoded[0];
    const px = new Uint8ClampedArray(w * h * 4);
    const glow = new Uint8ClampedArray(w * h * 4);
    for (let i = 3; i < glow.length; i += 4) glow[i] = 255;
    let hasGlow = false;
    layers.forEach((layer, n) => {
        const src = decoded[n];
        if (src.w !== w || src.h !== h) return;
        for (let i = 0; i < px.length; i += 4) {
            const sa = src.data[i + 3] / 255;
            if (sa === 0) continue;
            const da = px[i + 3] / 255;
            const oa = sa + da * (1 - sa);
            for (let c = 0; c < 3; c += 1) {
                px[i + c] = (src.data[i + c] * sa + px[i + c] * da * (1 - sa)) / oa;
            }
            px[i + 3] = oa * 255;
            if (layer.emissive) {
                glow[i] = src.data[i];
                glow[i + 1] = src.data[i + 1];
                glow[i + 2] = src.data[i + 2];
                hasGlow = true;
            }
        }
    });
    if (emissiveAlpha || opaqueAlpha) {
        let visible = 0;
        let partial = 0;
        for (let i = 3; i < px.length; i += 4) {
            if (px[i] > 0) visible += 1;
            if (px[i] > 0 && px[i] < 255) partial += 1;
        }
        // Only small regions (eyes) glow; an all-"emissive" skin (blaze, magma
        // cube, glow squid) just means fullbright, which the lighting gives.
        const glowPixels = emissiveAlpha && partial < visible * 0.3;
        for (let i = 0; i < px.length; i += 4) {
            if (px[i + 3] === 0 || px[i + 3] === 255) continue;
            if (glowPixels) {
                glow[i] = px[i];
                glow[i + 1] = px[i + 1];
                glow[i + 2] = px[i + 2];
                hasGlow = true;
            }
            px[i + 3] = 255;
        }
    }
    return {
        url: toCanvas(px, w, h).toDataURL('image/png'),
        emissive: hasGlow ? toCanvas(glow, w, h) : null,
        opaque: emissiveAlpha || opaqueAlpha
    };
}

// The library inflates a cube by scaling its group around the pivot - fine
// for plain cubes (group origin = cube corner) but rotated cubes sit offset
// from their pivot and drift away (sheep wool). Scale the mesh instead.
function fixInflatedCubes(model) {
    model.getGroup().traverse((o) => {
        if (!o.name || !o.name.includes('#cube.') || !o.children[0]) return;
        if (o.scale.x === 1 && o.scale.y === 1 && o.scale.z === 1) return;
        o.children[0].scale.copy(o.scale);
        o.scale.set(1, 1, 1);
    });
}

function applyMaterial(model, texture, overlay) {
    const materials = new Set();
    model.getGroup().traverse((o) => {
        if (!o.isMesh) return;
        materials.add(o.material);
        if (overlay) o.renderOrder = 1;
    });
    let glowMap = null;
    if (texture.emissive) {
        glowMap = new THREE.CanvasTexture(texture.emissive);
        glowMap.magFilter = THREE.NearestFilter;
        glowMap.minFilter = THREE.NearestFilter;
        glowMap.generateMipmaps = false;
    }
    materials.forEach((m) => {
        if (glowMap) {
            m.emissive = new THREE.Color(0xffffff);
            m.emissiveMap = glowMap;
        }
        if (texture.opaque) {
            m.transparent = false;
            m.alphaTest = 0.5;
        }
        if (overlay) {
            m.transparent = true;
            m.depthWrite = false;
            m.alphaTest = 0.01;
            m.side = THREE.DoubleSide;
            m.opacity = 0.65;
        }
        m.needsUpdate = true;
    });
}

// Render-controller part_visibility (resolved at build time): evoker and
// vindicator cross their arms, llama chests and the armadillo's rolled-up
// shell stay hidden, etc. Later rules win, "*" is a wildcard.
function applyVisibility(model, rules) {
    if (!rules) return;
    const compiled = rules.map(([pattern, visible]) => [
        new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`, 'i'),
        visible
    ]);
    model.getBoneMap().forEach((_, name) => {
        let visible = true;
        compiled.forEach(([re, v]) => { if (re.test(name)) visible = v; });
        if (!visible) model.hideBone(name);
    });
}

// Tack baked into rideable mobs' base geometry (camel's "saddle" bone,
// horse's "Saddle"/"Bridle"/"ReinsL"/"ReinsR") - grouped so e.g. both rein
// straps toggle together as one "Reins" control.
const EQUIPMENT_GROUPS = [
    { key: 'saddle', match: (n) => /saddle/i.test(n) },
    { key: 'bridle', match: (n) => /bridle/i.test(n) },
    { key: 'reins', match: (n) => /rein/i.test(n) },
    { key: 'bags', match: (n) => /bag/i.test(n) }
];
// Persists across a variant switch (same mob, new texture) but is reset on
// a fresh mob load - see the assetOverride check in renderMob3D.
let hiddenEquipmentKeys = new Set();
let autoRotate = true;

function loadManifest() {
    if (!manifestPromise) {
        manifestPromise = fetch(MANIFEST_URL, { cache: 'no-cache' }).then((r) => r.json());
    }
    return manifestPromise;
}

function loadViewerModule() {
    if (!viewerModulePromise) {
        viewerModulePromise = import(MODEL_VIEWER_URL);
    }
    return viewerModulePromise;
}

function getBoundingSphere(viewer) {
    const group = viewer.getModel().getGroup();
    group.updateMatrixWorld(true);
    const box = new THREE.Box3();
    group.traverseVisible((o) => { if (o.isMesh) box.expandByObject(o); });
    if (box.isEmpty()) box.setFromObject(group);
    return box.getBoundingSphere(new THREE.Sphere());
}

function frameModel(viewer, sphere) {
    const fovRad = (viewer.camera.fov * Math.PI) / 180;
    const distance = (sphere.radius / Math.sin(fovRad / 2)) * 1.35;
    const direction = new THREE.Vector3(1, 0.65, 1).normalize();

    viewer.camera.position.copy(sphere.center).addScaledVector(direction, distance);
    viewer.camera.lookAt(sphere.center);
    viewer.controls.target.copy(sphere.center);
    viewer.controls.update();
}

// Minecraft's own two-light diffuse rig (DiffuseLighting.java) - the library
// only adds one flat AmbientLight.
function applyMinecraftLighting(viewer, sphere) {
    const ambient = viewer.scene.children.find((o) => o.isAmbientLight);
    if (ambient) ambient.intensity = 0.85;
    const addDirectional = (dir, intensity) => {
        const light = new THREE.DirectionalLight(0xffffff, intensity);
        light.position.copy(sphere.center).addScaledVector(dir, Math.max(sphere.radius, 1) * 5);
        light.target.position.copy(sphere.center);
        viewer.scene.add(light);
        viewer.scene.add(light.target);
    };
    addDirectional(new THREE.Vector3(0.2, 1, -0.7).normalize(), 0.45);
    addDirectional(new THREE.Vector3(-0.2, 1, 0.7).normalize(), 0.25);
}

// MoLang "this" = the channel's bind value: the bone's own rotation for
// rotation, its offset from the parent pivot (root bones: from [0,24,0],
// the legacy model origin) for position, 1 for scale. The library adds
// animation values on top of the bind pose, so "X - this" lands on X.
function bindValues(bones) {
    const byName = new Map(bones.map((b) => [b.name.toLowerCase(), b]));
    const info = new Map();
    bones.forEach((b) => {
        const pivot = b.pivot || [0, 0, 0];
        const parent = b.parent && byName.get(b.parent.toLowerCase());
        const ref = parent ? parent.pivot || [0, 0, 0] : [0, 24, 0];
        info.set(b.name.toLowerCase(), {
            rotation: b.rotation || [0, 0, 0],
            position: [pivot[0] - ref[0], pivot[1] - ref[1], pivot[2] - ref[2]],
            scale: [1, 1, 1]
        });
    });
    return info;
}

// Queries the preview can't know default to 0; these few would then leave
// a visibly wrong rest pose (wild wolf tail: Java's pi/5).
const QUERY_DEFAULTS = { tail_angle: 0.628 };

function resolveThis(channel, values, queries) {
    const sub = (v, i) => (typeof v === 'string'
        ? v.replace(/\bthis\b/gi, `(${values[i]})`)
            .replace(/\b(?:query|q)\.([a-z_]+)\b/gi, (m, n) => (n.toLowerCase() in queries ? `(${queries[n.toLowerCase()]})` : m))
        : v);
    if (Array.isArray(channel)) return channel.map(sub);
    if (typeof channel === 'string') return sub(channel, 0);
    return channel;
}

async function applyDefaultPose(model, poseKey, bones, isBaby) {
    if (!poseKey) return [];
    let pose;
    try {
        pose = await fetch(`${POSES_BASE}${poseKey}.pose.json`, { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : null));
    } catch (err) {
        return [];
    }
    if (!pose || !pose.animations) return [];
    // Channel keys aren't always cased like the geometry's bone names
    // ("backlegl" vs "backLegL") and the library matches exactly.
    const boneNames = new Map();
    model.getBoneMap().forEach((_, name) => boneNames.set(name.toLowerCase(), name));
    const binds = bindValues(bones);
    const queries = { ...QUERY_DEFAULTS, is_baby: isBaby ? 1 : 0 };
    const played = [];
    Object.entries(pose.animations).forEach(([identifier, data]) => {
        const remapped = {};
        Object.entries((data && data.bones) || {}).forEach(([boneName, channels]) => {
            const bind = binds.get(boneName.toLowerCase());
            const out = {};
            Object.entries(channels).forEach(([key, channel]) => {
                out[key] = bind && bind[key] ? resolveThis(channel, bind[key], queries) : channel;
            });
            remapped[boneNames.get(boneName.toLowerCase()) ?? boneName] = out;
        });
        try {
            model.animator.addAnimation(identifier, { ...data, bones: remapped });
            model.animator.play(identifier);
            played.push(identifier);
        } catch (err) {
            console.warn(`mob-3d-viewer: failed to play pose animation "${identifier}"`, err);
        }
    });
    return played;
}

function findEquipmentGroups(model) {
    const bones = model.bones || [];
    const groups = [];
    EQUIPMENT_GROUPS.forEach(({ key, match }) => {
        const matched = bones.filter(match);
        if (matched.length) groups.push({ key, bones: matched });
    });
    return groups;
}

// Slime's outer shell and the sulfur cube's translucent skin are separate
// render passes in Bedrock - drawn as an extra, depth-write-free model.
async function addExtraLayers(viewer, mod, entry, poseKey, isBaby) {
    for (const layer of entry.extraLayers || []) {
        const geo = await loadGeometry(layer);
        const layerModel = new mod.Model(geo, `${TEXTURES_BASE}${layer.asset}.png`);
        await layerModel.create();
        if (layer.bones) {
            layerModel.getBoneMap().forEach((_, name) => { if (!layer.bones.includes(name)) layerModel.hideBone(name); });
        }
        fixInflatedCubes(layerModel);
        applyMaterial(layerModel, { emissive: null, opaque: false }, true);
        await applyDefaultPose(layerModel, poseKey, geo.bones, isBaby);
        layerModel.tick();
        viewer.scene.add(layerModel.getGroup());
    }
}

function silenceViewer(viewer) {
    viewer.render = () => {};
    viewer.requestRendering = () => {};
}

export function disposeMob3D() {
    renderToken += 1;
    if (current) {
        try { current.viewer.controls.autoRotate = false; } catch (err) { /* already gone */ }
        try { silenceViewer(current.viewer); } catch (err) { /* already gone */ }
        try { current.viewer.dispose(); } catch (err) { /* already gone */ }
        // dispose() keeps the WebGL context alive; browsers cap them (~16).
        try { current.viewer.renderer.forceContextLoss(); } catch (err) { /* already gone */ }
        current = null;
    }
}

// Shows/hides one equipment group (by key from the last renderMob3D result)
// on the currently displayed model, and remembers the choice for the next
// variant switch of the same mob.
export function setEquipmentVisible(key, visible) {
    if (visible) hiddenEquipmentKeys.delete(key);
    else hiddenEquipmentKeys.add(key);
    if (!current) return;
    const group = current.equipment.find((g) => g.key === key);
    if (!group) return;
    const model = current.viewer.getModel();
    group.bones.forEach((name) => (visible ? model.showBone(name) : model.hideBone(name)));
    current.viewer.requestRendering();
}

// Pause/resume the auto-rotation; sticks for every mob opened afterwards.
export function setAutoRotate(on) {
    autoRotate = on;
    if (!current) return;
    current.viewer.controls.autoRotate = on;
    current.viewer.requestRendering();
}

export async function renderMob3D(mobId, canvas, assetOverride) {
    disposeMob3D();
    const isFreshMob = !assetOverride;
    const token = renderToken;
    const stale = () => ({ ok: false, reason: 'stale' });

    let manifest, mod;
    try {
        [manifest, mod] = await Promise.all([loadManifest(), loadViewerModule()]);
    } catch (err) {
        console.error('mob-3d-viewer: failed to load dependencies', err);
        return token === renderToken ? { ok: false, reason: 'load_failed' } : stale();
    }
    if (token !== renderToken) return stale();

    const entry = manifest[mobId];
    if (!entry || !entry.asset) {
        return { ok: false, reason: entry ? entry.reason : 'not_found' };
    }
    const variant = assetOverride && (entry.variants || []).find((v) => v.asset === assetOverride);
    const spec = variant || entry;
    const assetKey = spec.asset;
    const isBaby = !!spec.baby;
    const poseKey = variant && 'pose' in variant ? variant.pose : entry.pose;

    let geoJson, texture;
    try {
        [geoJson, texture] = await Promise.all([
            loadGeometry(spec),
            buildTexture(spec.layers || [{ asset: spec.asset }], !!entry.emissiveAlpha, !!entry.opaqueAlpha)
        ]);
    } catch (err) {
        console.error('mob-3d-viewer: failed to load geometry/texture', err);
        return token === renderToken ? { ok: false, reason: 'load_failed' } : stale();
    }
    if (token !== renderToken) return stale();

    try {
        // Viewer sizes itself from options.width/height, not the canvas's own CSS size.
        // clientWidth ignores the modal's opening transform, unlike getBoundingClientRect.
        const parent = canvas.parentElement;
        const size = Math.max(1, Math.round(parent.clientWidth || parent.clientHeight || 400));
        // Fresh canvas per render (see silenceViewer()) - drops old OrbitControls
        // listeners and guarantees a clean WebGL context.
        const freshCanvas = canvas.cloneNode(false);
        canvas.replaceWith(freshCanvas);
        canvas = freshCanvas;
        const viewer = new mod.StandaloneModelViewer(canvas, geoJson, texture.url, {
            antialias: true, width: size, height: size
        });
        await viewer.loadedModel;
        if (token !== renderToken) {
            silenceViewer(viewer);
            viewer.dispose();
            return stale();
        }
        const model = viewer.getModel();
        fixInflatedCubes(model);
        applyMaterial(model, texture, false);
        applyVisibility(model, entry.visibility);
        const bindSphere = getBoundingSphere(viewer);
        const poseAnimations = await applyDefaultPose(model, poseKey, geoJson.bones, isBaby);
        // A pose can throw or come out broken (NaN / exploded / collapsed) -
        // fall back to the bind pose rather than show that.
        let sphere;
        let poseFailed = false;
        try {
            model.tick();
            sphere = getBoundingSphere(viewer);
            poseFailed =
                poseAnimations.length &&
                (!Number.isFinite(sphere.radius) ||
                    !Number.isFinite(sphere.center.x + sphere.center.y + sphere.center.z) ||
                    sphere.radius > Math.max(bindSphere.radius, 1) * 2.5 ||
                    sphere.radius < Math.max(bindSphere.radius, 1) * 0.3);
        } catch (err) {
            console.warn('mob-3d-viewer: pose animation failed to apply, using bind pose', err);
            poseFailed = true;
        }
        if (token !== renderToken) {
            silenceViewer(viewer);
            viewer.dispose();
            return stale();
        }
        if (poseFailed) {
            poseAnimations.forEach((id) => { try { model.animator.pause(id); } catch (err) { /* ignore */ } });
            // tick() only resets rotation/position, never scale.
            try {
                model.getBoneMap().forEach((bone) => bone.scale.set(1, 1, 1));
                model.tick();
            } catch (err) { /* nothing left to fail on */ }
            sphere = bindSphere;
        }
        try {
            await addExtraLayers(viewer, mod, entry, poseFailed ? null : poseKey, isBaby);
        } catch (err) {
            console.warn('mob-3d-viewer: extra render layer failed', err);
        }
        if (token !== renderToken) {
            silenceViewer(viewer);
            viewer.dispose();
            return stale();
        }
        frameModel(viewer, sphere);
        applyMinecraftLighting(viewer, sphere);
        viewer.controls.autoRotate = autoRotate;
        viewer.controls.autoRotateSpeed = 2.2;

        const equipment = findEquipmentGroups(model);
        // A wild/unridden mob never wears tack - default every group to hidden
        // on a fresh load; a variant switch keeps whatever the user chose.
        if (isFreshMob) hiddenEquipmentKeys = new Set(equipment.map((g) => g.key));
        equipment.forEach((group) => {
            if (hiddenEquipmentKeys.has(group.key)) {
                group.bones.forEach((name) => model.hideBone(name));
            }
        });

        viewer.requestRendering();
        current = { viewer, equipment };
        // The library only keeps rendering while an animation ticks, so a
        // mob without a pose would never auto-rotate - drive it ourselves.
        if (!model.shouldTick) {
            const spin = () => {
                if (!current || current.viewer !== viewer) return;
                if (autoRotate) viewer.requestRendering();
                requestAnimationFrame(spin);
            };
            requestAnimationFrame(spin);
        }
        return {
            ok: true,
            entry,
            assetKey,
            canvas, // the cloned element that replaced the caller's - use this one from here on
            equipment: equipment.map((g) => ({ key: g.key, visible: !hiddenEquipmentKeys.has(g.key) }))
        };
    } catch (err) {
        console.error('mob-3d-viewer: failed to render model', err);
        return { ok: false, reason: 'load_failed' };
    }
}
