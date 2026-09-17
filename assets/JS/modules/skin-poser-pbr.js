import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

// Real PBR material system for the Look panel, layered on top of skin-poser.js.
// skinview3d.bundle.js bundles three.js internally without exposing it as a global, so
// skin-poser.js's own applyLook() can only mutate the MeshStandardMaterial instances
// skinview3d already created (tint + light-intensity tricks, no real reflections). This
// module vendors a separate, real three.js copy as ES modules (r170 - newer than
// skinview3d's own bundled r156, since NeutralToneMapping/AgXToneMapping need r162+;
// this copy never talks to skinview3d's internal one directly, it only builds plain
// objects that get assigned onto skinview3d's renderer/meshes via duck-typed
// properties, so version mismatch between the two copies is not a problem). Builds a
// RoomEnvironment reflection map, and swaps the player's materials to real
// MeshPhysicalMaterial (clearcoat/ior/reflectivity) or MeshBasicMaterial (Flat/
// Embossed), using the exact parameters from the reference site's own LOOKS table.
var LOOK_PHYSICAL = {
    soft:     { type: 'physical', roughness: 0.7,  metalness: 0,   envMapIntensity: 0.6,  clearcoat: 0.0, clearcoatRoughness: 0.1,  ior: 1.5,  reflectivity: 0.5, tone: 'neutral', exposure: 1.0 },
    glossy:   { type: 'physical', roughness: 0.35, metalness: 0,   envMapIntensity: 0.45, clearcoat: 1.0, clearcoatRoughness: 0.1,  ior: 1.5,  reflectivity: 0.5, tone: 'neutral', exposure: 1.1 },
    clay:     { type: 'physical', roughness: 0.95, metalness: 0,   envMapIntensity: 0.30, clearcoat: 0.0, clearcoatRoughness: 0.1,  ior: 1.45, reflectivity: 0.4, tone: 'agx',     exposure: 1.0 },
    plastic:  { type: 'physical', roughness: 0.5,  metalness: 0,   envMapIntensity: 0.50, clearcoat: 0.5, clearcoatRoughness: 0.25, ior: 2.5,  reflectivity: 0.8, tone: 'neutral', exposure: 1.0 },
    matte:    { type: 'physical', roughness: 1.0,  metalness: 0,   envMapIntensity: 0.75, clearcoat: 0.0, clearcoatRoughness: 0.1,  ior: 1.5,  reflectivity: 0.5, tone: 'neutral', exposure: 1.0 },
    metallic: { type: 'physical', roughness: 0.25, metalness: 0.7, envMapIntensity: 1.20, clearcoat: 0.3, clearcoatRoughness: 0.1,  ior: 1.5,  reflectivity: 0.5, tone: 'neutral', exposure: 1.0 },
    embossed: { type: 'basic', tone: 'neutral', exposure: 1.0 },
    flat:     { type: 'basic', tone: 'neutral', exposure: 1.0 }
};
var TONE_MAP = { neutral: THREE.NeutralToneMapping, agx: THREE.AgXToneMapping };

// The reference site's own 3-point rig per look (key/fill/rim, from real positions -
// not just camera-aligned) is what actually makes "soft"/"glossy"/etc. read as sculpted
// figures instead of a flat wash. skinview3d's own globalLight/cameraLight (still
// user-adjustable via the Lighting tab) stay in place but get dialed down elsewhere so
// they don't wash this rig out.
var LOOK_LIGHTING = {
    soft:     { key: { color: 0xfff4ea, intensity: 0.85, position: [3, 6, 4] },   fill: { color: 0xeef2ff, intensity: 0.45, position: [-4, 2, 3] },   rim: { color: 0xcfe5ff, intensity: 0.55, position: [-4, 4.5, -4.5] } },
    glossy:   { key: { color: 0xfff1e0, intensity: 1.1, position: [3, 6, 4] },    fill: { color: 0xdce8ff, intensity: 0.36, position: [-4, 2, 3] },   rim: { color: 0xcfe5ff, intensity: 1.05, position: [-4, 4.5, -4.5] } },
    clay:     { key: { color: 0xfff3e6, intensity: 0.7, position: [2.5, 5, 4] },  fill: { color: 0xf0f0ff, intensity: 0.5, position: [-4, 2, 3] },    rim: { color: 0xffffff, intensity: 0.0, position: [-4, 4.5, -4.5] } },
    plastic:  { key: { color: 0xffffff, intensity: 0.95, position: [3, 6, 4] },  fill: { color: 0xffffff, intensity: 0.2, position: [-3, 1, -2] },   rim: { color: 0xffffff, intensity: 0.45, position: [-4, 4.5, -4.5] } },
    matte:    { key: { color: 0xffffff, intensity: 0.95, position: [3, 6, 4] },  fill: { color: 0xffffff, intensity: 0.2, position: [-3, 1, -2] },   rim: { color: 0xffffff, intensity: 0.0, position: [-4, 4.5, -4.5] } },
    metallic: { key: { color: 0xffffff, intensity: 0.95, position: [3, 6, 4] },  fill: { color: 0xffffff, intensity: 0.2, position: [-3, 1, -2] },   rim: { color: 0xffffff, intensity: 0.8, position: [-4, 4.5, -4.5] } },
    embossed: { key: { color: 0xffffff, intensity: 0.95, position: [3, 6, 4] },  fill: { color: 0xffffff, intensity: 0.2, position: [-3, 1, -2] },   rim: { color: 0xffffff, intensity: 0.0, position: [-4, 4.5, -4.5] } },
    flat:     { key: { color: 0xffffff, intensity: 0.95, position: [3, 6, 4] },  fill: { color: 0xffffff, intensity: 0.2, position: [-3, 1, -2] },   rim: { color: 0xffffff, intensity: 0.0, position: [-4, 4.5, -4.5] } }
};

function waitForViewer() {
    return new Promise(function (resolve) {
        (function poll() {
            // Wait for the actual skin TEXTURE, not just the viewer/mesh objects: those
            // exist synchronously right after SkinViewer construction, but the initial
            // skin PNG loads asynchronously and only attaches to material.map once
            // decoded. Building material twins before that snapshots a null map forever
            // (materials are copied once here, not kept in sync with skinview3d's own).
            var v = window.__skinPoserViewer;
            var headMesh = v && v.playerObject && v.playerObject.skin && v.playerObject.skin.head && v.playerObject.skin.head.children[0];
            if (v && v.renderer && headMesh && headMesh.material && headMesh.material.map) {
                resolve(v);
            } else {
                setTimeout(poll, 100);
            }
        })();
    });
}

waitForViewer().then(function (viewer) {
    var renderer = viewer.renderer;
    var scene = viewer.scene;

    var pmrem = new THREE.PMREMGenerator(renderer);
    var envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // Real 3-point rig (key/fill/rim), positions fixed in world space so they light the
    // subject from genuinely different angles - this is what gives the material presets
    // actual sculpted shading instead of the flat wash a single camera-aligned light
    // produces, whatever roughness/clearcoat values are dialed in.
    var keyLight = new THREE.DirectionalLight(0xffffff, 0);
    var fillLight = new THREE.DirectionalLight(0xffffff, 0);
    var rimLight = new THREE.DirectionalLight(0xffffff, 0);
    [keyLight, fillLight, rimLight].forEach(function (light) {
        scene.add(light);
        scene.add(light.target);
    });

    // LOOK_LIGHTING's [x,y,z] entries were tuned as small unit-scale offsets, but the
    // actual player model spans roughly a dozen world units - placed literally, the
    // lights ended up grazing (almost inside) the model instead of standing off from
    // it. A directional light's effect on shading only depends on direction, not
    // distance, so this keeps every look's exact angle but re-scales it to a distance
    // and target that are actually outside the model - which the shadow camera (a real
    // orthographic camera, unlike plain lighting) needs to render shadows correctly.
    var currentLookName = 'soft';
    var modelCenter = new THREE.Vector3(0, 0, 0);
    var modelRadius = 10;
    var lightDistance = 30;

    function applyLookLighting(name) {
        currentLookName = name;
        var rig = LOOK_LIGHTING[name] || LOOK_LIGHTING.soft;
        // With self-shadowing on, the fill light's whole job (softening the key
        // light's shadow side) actively fights the point of the feature - dial it
        // back and punch up the key light so the cast shadow the user turned on is
        // actually visible instead of washed out by its own rig.
        var contrastKey = shadingEnabled ? 1.35 : 1;
        var contrastFill = shadingEnabled ? 0.55 : 1;
        [[keyLight, rig.key, contrastKey], [fillLight, rig.fill, contrastFill], [rimLight, rig.rim, 1]].forEach(function (pair) {
            var light = pair[0], cfg = pair[1], mul = pair[2];
            light.color.set(cfg.color);
            light.intensity = cfg.intensity * mul;
            var dir = new THREE.Vector3(cfg.position[0], cfg.position[1], cfg.position[2]).normalize();
            light.position.copy(modelCenter).addScaledVector(dir, lightDistance);
            light.target.position.copy(modelCenter);
        });
    }

    var originalByMesh = new Map();
    var physicalByOriginal = new Map();
    var basicByOriginal = new Map();

    function collectMeshes() {
        var meshes = [];
        viewer.playerObject.traverse(function (node) {
            if (node.isMesh && node.material && !node.userData.isOutlineMesh) meshes.push(node);
        });
        return meshes;
    }

    function buildTwin(Ctor, src) {
        return new Ctor({
            map: src.map || null,
            color: src.color ? src.color.clone() : new THREE.Color(0xffffff),
            transparent: !!src.transparent,
            alphaTest: src.alphaTest || 0,
            side: src.side,
            opacity: typeof src.opacity === 'number' ? src.opacity : 1
        });
    }

    // skinview3d keeps a small set of PERMANENT material objects (skin's layer1/layer2
    // (+ biased) materials, cape's/elytra's/ears' own .material) and reloading a
    // skin/cape/ears mutates .map on those same objects in place - it never reassigns
    // mesh.material itself. So the correct "native" source for a mesh is whatever its
    // material was the FIRST time we ever saw it (before we swap mesh.material to one
    // of our own twins), remembered permanently - not mesh.material at call time,
    // which after the first swap is one of our own twins and would otherwise never
    // reflect a later reload (this was the cause of a real bug: a cape loaded after
    // the Look system had already run once always rendered blank/white).
    function ensureTwins() {
        collectMeshes().forEach(function (mesh) {
            var native = originalByMesh.get(mesh);
            if (!native) {
                native = mesh.material;
                originalByMesh.set(mesh, native);
            }
            if (!physicalByOriginal.has(native)) {
                physicalByOriginal.set(native, buildTwin(THREE.MeshPhysicalMaterial, native));
                basicByOriginal.set(native, buildTwin(THREE.MeshBasicMaterial, native));
            } else {
                [physicalByOriginal.get(native), basicByOriginal.get(native)].forEach(function (twin) {
                    if (twin.map !== native.map) {
                        twin.map = native.map;
                        twin.needsUpdate = true;
                    }
                });
            }
        });
    }

    window.applyPhysicalLook = function (name) {
        var preset = LOOK_PHYSICAL[name];
        if (!preset) return;
        ensureTwins();
        applyLookLighting(name);
        renderer.toneMapping = TONE_MAP[preset.tone] || THREE.NeutralToneMapping;
        renderer.toneMappingExposure = preset.exposure;
        collectMeshes().forEach(function (mesh) {
            var src = originalByMesh.get(mesh);
            if (!src) return;
            if (preset.type === 'basic') {
                mesh.material = basicByOriginal.get(src);
            } else {
                var phys = physicalByOriginal.get(src);
                phys.roughness = preset.roughness;
                phys.metalness = preset.metalness;
                phys.envMapIntensity = preset.envMapIntensity;
                phys.clearcoat = preset.clearcoat;
                phys.clearcoatRoughness = preset.clearcoatRoughness;
                phys.ior = preset.ior;
                phys.reflectivity = preset.reflectivity;
                phys.needsUpdate = true;
                mesh.material = phys;
            }
        });
    };

    window.applyPhysicalTransparency = function (on) {
        collectMeshes().forEach(function (mesh) {
            var src = originalByMesh.get(mesh);
            if (!src) return;
            [physicalByOriginal.get(src), basicByOriginal.get(src)].forEach(function (mat) {
                if (!mat) return;
                mat.transparent = on ? true : !!src.transparent;
                mat.opacity = on ? 0.55 : (typeof src.opacity === 'number' ? src.opacity : 1);
                mat.needsUpdate = true;
            });
        });
    };

    // No visible floor plane - the user found the matte disc read as an unwanted
    // "ground shadow" that was covering up the real self-shadowing on the figure
    // itself. Bounds are still computed (needed to size the shadow camera frustum and
    // to place the optional ground-shadow decal), just nothing opaque gets added.
    var shadowMesh = null;
    var shadowCamSize = 3;
    var shadowIntensityPct = 50;
    var shadingEnabled = false;

    function addFloor() {
        // Bound only the named limb groups, not the whole playerObject: that also
        // catches unrelated anchors (cape/nametag pivots etc.) that sit far outside the
        // actual body and would drag the computed floor well below the real feet.
        var limbNames = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        var box = new THREE.Box3();
        limbNames.forEach(function (name) {
            var part = viewer.playerObject.skin && viewer.playerObject.skin[name];
            if (part) box.expandByObject(part);
        });
        var center = box.getCenter(new THREE.Vector3());
        var size = box.getSize(new THREE.Vector3());
        var shadowRadius = Math.max(size.x, size.z) * 0.85;
        var floorY = box.min.y;
        shadowCamSize = Math.max(size.x, size.y, size.z) * 0.75;

        // Now that the model's real world-space size is known, re-derive the light rig
        // in that scale (see applyLookLighting) and re-apply the currently active look
        // so key/fill/rim actually stand off from the figure instead of grazing it.
        modelCenter.copy(center);
        modelRadius = size.length() * 0.5;
        lightDistance = modelRadius * 4;
        applyLookLighting(currentLookName);

        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        var ctx = canvas.getContext('2d');
        var gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, 'rgba(0,0,0,0.45)');
        gradient.addColorStop(0.7, 'rgba(0,0,0,0.22)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        var texture = new THREE.CanvasTexture(canvas);
        var shadowGeometry = new THREE.CircleGeometry(shadowRadius, 32);
        var shadowMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            toneMapped: false,
            opacity: shadowIntensityPct / 100
        });
        shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.set(center.x, floorY + 0.05, center.z);
        shadowMesh.renderOrder = -1;
        var groundShadowCheckbox = document.getElementById('groundShadowCheckbox');
        shadowMesh.visible = !groundShadowCheckbox || groundShadowCheckbox.checked;
        scene.add(shadowMesh);

        applyShadingState();
    }

    function applyShadingState() {
        renderer.shadowMap.enabled = shadingEnabled;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        keyLight.castShadow = shadingEnabled;
        if (shadingEnabled) {
            keyLight.shadow.mapSize.set(1024, 1024);
            // near/far bracket the actual light-to-model distance (with margin), not a
            // hardcoded 0.1-20 range - that range was tuned for a unit-scale rig and
            // clipped the real, much larger model almost entirely out of the shadow
            // camera's view once the light was correctly moved outside the figure.
            keyLight.shadow.camera.near = Math.max(0.1, lightDistance - modelRadius * 2);
            keyLight.shadow.camera.far = lightDistance + modelRadius * 2;
            keyLight.shadow.camera.left = -shadowCamSize;
            keyLight.shadow.camera.right = shadowCamSize;
            keyLight.shadow.camera.top = shadowCamSize;
            keyLight.shadow.camera.bottom = -shadowCamSize;
            keyLight.shadow.bias = -0.002;
            keyLight.shadow.camera.updateProjectionMatrix();
        }
        collectMeshes().forEach(function (mesh) {
            mesh.castShadow = shadingEnabled;
            mesh.receiveShadow = shadingEnabled;
        });
    }

    // Real self-shadowing (the figure casting/receiving shadows on itself), the ground
    // contact-shadow decal's visibility, and its darkness - the three controls the
    // reference site's Lighting tab exposes under "Shadows", now wired to real geometry
    // instead of being cosmetic no-ops.
    window.setShading = function (enabled) {
        shadingEnabled = !!enabled;
        applyShadingState();
        applyLookLighting(currentLookName);
    };

    window.setGroundShadowVisible = function (visible) {
        if (shadowMesh) shadowMesh.visible = !!visible;
    };

    window.setShadowIntensity = function (pct) {
        shadowIntensityPct = Math.max(0, Math.min(100, pct));
        if (shadowMesh) {
            shadowMesh.material.opacity = shadowIntensityPct / 100;
            shadowMesh.material.needsUpdate = true;
        }
    };

    window.__skinPoserPBRReady = true;
    var lookSelect = document.getElementById('lookSelect');
    var initialLook = (lookSelect && lookSelect.value) || 'soft';
    // Route through the classic script's applyLook() wrapper, not the raw function
    // here directly: that wrapper also dials the old flat light down once PBR is
    // live, which only needs to happen once but has to happen from SOMEWHERE.
    if (window.__mcCraftApplyLook) {
        window.__mcCraftApplyLook(initialLook);
    } else {
        window.applyPhysicalLook(initialLook);
    }

    var shadingCheckbox = document.getElementById('shadingCheckbox');
    shadingEnabled = !!(shadingCheckbox && shadingCheckbox.checked);
    var shadowIntensityRange = document.getElementById('shadowIntensityRange');
    shadowIntensityPct = shadowIntensityRange ? parseInt(shadowIntensityRange.value, 10) : 50;

    setTimeout(addFloor, 300);
}).catch(function (err) {
    console.error(lang === 'de' ? 'Skin-Poser PBR-Layer konnte nicht geladen werden, Fallback bleibt aktiv:' : 'Skin Poser PBR layer failed to load, fallback stays active:', err);
});
