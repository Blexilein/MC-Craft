(function () {
    'use strict';

    var lang = document.documentElement.lang === 'en' ? 'en' : 'de';

    var STEVE_SKIN_URL = 'https://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b';
    var ALEX_SKIN_URL = 'https://textures.minecraft.net/texture/3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3';

    var LIMBS = ['model', 'head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    var POSABLE_LIMBS = LIMBS.filter(function (l) { return l !== 'model'; });
    var LIMB_LABELS = lang === 'de' ? {
        model: 'Modell', head: 'Kopf', body: 'Körper', leftArm: 'Linker Arm',
        rightArm: 'Rechter Arm', leftLeg: 'Linkes Bein', rightLeg: 'Rechtes Bein'
    } : {
        model: 'Model', head: 'Head', body: 'Body', leftArm: 'Left Arm',
        rightArm: 'Right Arm', leftLeg: 'Left Leg', rightLeg: 'Right Leg'
    };

    var STATIC_POSES = {
        tpose: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: 0 }, body: { x: 0, y: 0, z: 0 },
            leftArm: { x: 0, y: 0, z: 90 }, rightArm: { x: 0, y: 0, z: -90 },
            leftLeg: { x: 0, y: 0, z: 0 }, rightLeg: { x: 0, y: 0, z: 0 }
        },
        sitting: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: 0 }, body: { x: 0, y: 0, z: 0 },
            leftArm: { x: -15, y: 0, z: 0 }, rightArm: { x: -15, y: 0, z: 0 },
            leftLeg: { x: -90, y: 0, z: 4 }, rightLeg: { x: -90, y: 0, z: -4 }
        },
        salute: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: 0 }, body: { x: 0, y: 0, z: 0 },
            leftArm: { x: 0, y: 0, z: 0 }, rightArm: { x: -70, y: 0, z: -15 },
            leftLeg: { x: 0, y: 0, z: 0 }, rightLeg: { x: 0, y: 0, z: 0 }
        },
        armsback: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: 0 }, body: { x: 0, y: 0, z: 0 },
            leftArm: { x: 30, y: 0, z: 5 }, rightArm: { x: 30, y: 0, z: -5 },
            leftLeg: { x: 0, y: 0, z: 0 }, rightLeg: { x: 0, y: 0, z: 0 }
        },
        jump: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: 0 }, body: { x: 0, y: 0, z: 0 },
            leftArm: { x: 0, y: 0, z: 150 }, rightArm: { x: 0, y: 0, z: -150 },
            leftLeg: { x: 0, y: 0, z: 20 }, rightLeg: { x: 0, y: 0, z: -20 }
        },
        zombie: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: 0, z: -1 }, body: { x: 5, y: 0, z: 0 },
            leftArm: { x: -69, y: 0, z: 6 }, rightArm: { x: -69, y: 0, z: -6 },
            leftLeg: { x: 11, y: 0, z: 3 }, rightLeg: { x: -15, y: 0, z: -3 }
        },
        aiming: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 0, y: -26, z: 0 }, body: { x: 0, y: -18, z: 0 },
            leftArm: { x: -32, y: -18, z: -74 }, rightArm: { x: -76, y: -32, z: -52 },
            leftLeg: { x: 13, y: 0, z: 8 }, rightLeg: { x: -15, y: 0, z: -8 }
        },
        cheering: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 5, y: 0, z: 0 }, body: { x: -5, y: 0, z: 0 },
            leftArm: { x: 11, y: 0, z: 104 }, rightArm: { x: 11, y: 0, z: -104 },
            leftLeg: { x: 0, y: 0, z: 10 }, rightLeg: { x: 0, y: 0, z: -10 }
        },
        mining: {
            model: { x: 0, y: 0, z: 0 }, head: { x: 9, y: -2, z: 0 }, body: { x: 11, y: -10, z: 0 },
            leftArm: { x: 35, y: -10, z: 8 }, rightArm: { x: -89, y: -18, z: -16 },
            leftLeg: { x: 14, y: 0, z: 7 }, rightLeg: { x: -16, y: 0, z: -7 }
        }
    };

    var ANIMATION_POSES = {
        idle: 'IdleAnimation',
        walk: 'WalkingAnimation',
        run: 'RunningAnimation',
        crouch: 'CrouchAnimation',
        swim: 'SwimAnimation',
        wave: 'WaveAnimation',
        fly: 'FlyingAnimation'
    };

    var POSE_LABELS = {
        idle: 'Idle', walk: 'Gehen', run: 'Rennen', crouch: 'Ducken', swim: 'Schwimmen',
        wave: 'Winken', fly: 'Fliegen', tpose: 'T-Pose', sitting: 'Sitzen',
        salute: 'Salutieren', armsback: 'Arme hinterm Rücken', jump: 'Sprung',
        zombie: 'Zombie', aiming: 'Zielen', cheering: 'Jubeln', mining: 'Abbauen'
    };

    var ANGLE_LABELS = {
        front: 'Vorne', threequarter: '3/4 rechts', side: 'Seite rechts', threequarterBack: '3/4 hinten rechts',
        back: 'Hinten', threequarterBackLeft: '3/4 hinten links', sideLeft: 'Seite links', threequarterLeft: '3/4 links',
        face: 'Gesicht'
    };
    // skinview3d's default player model faces -Z, i.e. AWAY from the camera
    // (which sits at +Z) at rotation.y=0 - so "front" needs the half-turn,
    // not "back". The rest is an even 45°-step turntable around that.
    var ANGLE_ROTATION_Y = {
        back: 0,
        threequarterBack: Math.PI / 4,
        side: Math.PI / 2,
        threequarter: 3 * Math.PI / 4,
        front: Math.PI,
        threequarterLeft: 5 * Math.PI / 4,
        sideLeft: 3 * Math.PI / 2,
        threequarterBackLeft: 7 * Math.PI / 4,
        face: Math.PI
    };

    var viewer = null;
    var soundEnabled = localStorage.getItem('mc-craft-sound') !== 'false';
    var currentTheme = localStorage.getItem('mc-craft-theme') || 'overworld';
    var levelUpSound = null;
    
    var currentSkinUrl = STEVE_SKIN_URL;
    var currentCapeUrl = null;
    var currentModel = 'auto-detect';
    var backEquipmentMode = 'cape';
    var capeVisible = true;
    var secondLayerVisible = true;
    var headOnlyMode = false;
    var earsOn = false;
    var transparentBg = false;
    var currentLook = 'soft';
    var outlineWidth = 0;
    var dissolveEdgesEnabled = false;
    var lookTransparent = false;
    var lookVignette = false;
    var currentAngle = 'front';
    var limbRotations = {};
    LIMBS.forEach(function (l) { limbRotations[l] = { x: 0, y: 0, z: 0 }; });
    var limbPositionOffsets = {};
    var limbScales = {};
    var limbDefaultPositions = {};
    POSABLE_LIMBS.forEach(function (l) { limbPositionOffsets[l] = { x: 0, y: 0, z: 0 }; limbScales[l] = 1; });

    var THEME_NAMES = { overworld: 'Overworld', nether: 'Nether', end: 'The End' };

    // ===== DOM REFERENCES =====
    var toastContainer = document.getElementById('toastContainer');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var closeBtn = document.getElementById('closeBtn');
    var mobileNav = document.getElementById('mobileNav');
    var themeBtn = document.getElementById('themeBtn');
    var themeDropdown = document.getElementById('themeDropdown');
    var soundBtn = document.getElementById('soundBtn');
    var soundIcon = document.getElementById('soundIcon');
    var mobileSoundBtn = document.getElementById('mobileSoundBtn');
    var mobileSoundIcon = document.getElementById('mobileSoundIcon');
    var backToTop = document.getElementById('backToTop');
    var header = document.querySelector('.header');

    var canvasWrapper = document.getElementById('poserCanvasWrapper');
    var uploadDropzone = document.getElementById('skinDropzone');
    var skinFileInput = document.getElementById('skinFileInput');
    var usernameInput = document.getElementById('usernameInput');
    var lookupBtn = document.getElementById('lookupBtn');
    var modelSelect = document.getElementById('modelSelect');
    var capeDropzone = document.getElementById('capeDropzone');
    var capeFileInput = document.getElementById('capeFileInput');
    var capeUrlInput = document.getElementById('capeUrlInput');
    var capeLoadBtn = document.getElementById('capeLoadBtn');
    var backEquipmentToggle = document.getElementById('backEquipmentToggle');
    var capeVisibleBtn = document.getElementById('capeVisibleBtn');
    var earsToggleBtn = document.getElementById('earsToggleBtn');

    var bgColorInput = document.getElementById('bgColorInput');
    var bgColor2Input = document.getElementById('bgColor2Input');
    var bgTransparentBtn = document.getElementById('bgTransparentBtn');
    var lightIntensity2Range = document.getElementById('lightIntensity2Range');
    var lightColorInput = document.getElementById('lightColorInput');
    var panoramaDropzone = document.getElementById('panoramaDropzone');
    var panoramaFileInput = document.getElementById('panoramaFileInput');
    var nametagInput = document.getElementById('nametagInput');
    var earsColorInput = document.getElementById('earsColorInput');
    var earsColorResetBtn = document.getElementById('earsColorResetBtn');
    var layerToggleBtn = document.getElementById('layerToggleBtn');
    var autoRotateBtn = document.getElementById('autoRotateBtn');
    var headOnlyBtn = document.getElementById('headOnlyBtn');
    var lockRotationBtn = document.getElementById('lockRotationBtn');
    var zoomRange = document.getElementById('zoomRange');
    var anglePresetRow = document.getElementById('anglePresetRow');
    var framingPresetRow = document.getElementById('framingPresetRow');
    var cameraReadout = document.getElementById('cameraReadout');
    var lightIntensityRange = document.getElementById('lightIntensityRange');
    var lightIntensityValue = document.getElementById('lightIntensityValue');
    var lightIntensity2Value = document.getElementById('lightIntensity2Value');
    var sunPositionPad = document.getElementById('sunPositionPad');
    var sunPositionDot = document.getElementById('sunPositionDot');
    var lightHeightRange = document.getElementById('lightHeightRange');
    var lightHeightValue = document.getElementById('lightHeightValue');
    var shadingCheckbox = document.getElementById('shadingCheckbox');
    var groundShadowCheckbox = document.getElementById('groundShadowCheckbox');
    var dissolveEdgesCheckbox = document.getElementById('dissolveEdgesCheckbox');
    var shadowIntensityRange = document.getElementById('shadowIntensityRange');
    var shadowIntensityValue = document.getElementById('shadowIntensityValue');

    var lookSelect = document.getElementById('lookSelect');
    var outlineWidthRange = document.getElementById('outlineWidthRange');
    var outlineWidthValue = document.getElementById('outlineWidthValue');
    var lookTransparentCheckbox = document.getElementById('lookTransparentCheckbox');
    var lookVignetteCheckbox = document.getElementById('lookVignetteCheckbox');
    var poserVignetteOverlay = document.getElementById('poserVignetteOverlay');

    var posePresetRow = document.getElementById('posePresetRow');
    var resetPoseBtn = document.getElementById('resetPoseBtn');
    var limbSlidersGrid = document.getElementById('limbSlidersGrid');

    var downloadViewBtn = document.getElementById('downloadViewBtn');
    var saveViewBtn = document.getElementById('saveViewBtn');
    var downloadSheetBtn = document.getElementById('downloadSheetBtn');
    var downloadGifBtn = document.getElementById('downloadGifBtn');
    var downloadSkinBtn = document.getElementById('downloadSkinBtn');
    var downloadCapeBtn = document.getElementById('downloadCapeBtn');

    // ===== TOAST =====
    function showToast(title, message, type) {
        type = type || 'success';
        if (!toastContainer) return;
        var toast = document.createElement('div');
        toast.className = 'toast' + (type === 'error' ? ' error-toast' : '');
        var icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-triangle';
        else if (type === 'info') icon = 'fa-info-circle';
        toast.innerHTML =
            '<div class="toast-icon"><i class="fas ' + icon + '"></i></div>' +
            '<div class="toast-content">' +
                '<div class="toast-title"></div>' +
                '<div class="toast-message"></div>' +
            '</div>';
        toast.querySelector('.toast-title').textContent = title;
        toast.querySelector('.toast-message').textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(function () { toast.classList.add('show'); }, 100);
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 300);
        }, 3000);
    }
    window.showToast = showToast;

    // ===== AUDIO =====
    function initAudio() {
        try {
            levelUpSound = new Audio('/assets/audio/levelup.ogg');
            levelUpSound.volume = 0.3;
            levelUpSound.preload = 'auto';
        } catch (e) { /* ignore */ }
    }

    function playLevelUpSound() {
        if (!soundEnabled || !levelUpSound) return;
        try {
            levelUpSound.currentTime = 0;
            levelUpSound.play().catch(function () {});
        } catch (e) { /* ignore */ }
    }

    function playClickSound() {
        if (!soundEnabled) return;
        var now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        var last = window.__mcCraftLastClickSoundAt || 0;
        if (now - last < 120) return;
        window.__mcCraftLastClickSoundAt = now;
        try {
            var ctx = window.__mcCraftAudioCtx || (window.__mcCraftAudioCtx = new (window.AudioContext || window.webkitAudioContext)());
            if (ctx.state === 'suspended') {
                ctx.resume().then(function () {
                    window.__mcCraftLastClickSoundAt = 0;
                    playClickSound();
                }).catch(function () {});
                return;
            }
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            setTimeout(function () { osc.stop(); }, 100);
        } catch (e) { /* ignore */ }
    }

    // ===== SOUND TOGGLE =====
    function updateSoundIcon() {
        var src = soundEnabled ? '/assets/img/backgrounds/sound-on.svg' : '/assets/img/backgrounds/sound-off.svg';
        if (soundIcon) soundIcon.src = src;
        if (mobileSoundIcon) mobileSoundIcon.src = src;
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('mc-craft-sound', soundEnabled);
        updateSoundIcon();
        playClickSound();
        showToast('Sound', soundEnabled ? (lang === 'de' ? 'Sound an' : 'Sound on') : (lang === 'de' ? 'Sound aus' : 'Sound off'));
    }

    function initSoundToggle() {
        updateSoundIcon();
        if (soundBtn) soundBtn.addEventListener('click', toggleSound);
        if (mobileSoundBtn) mobileSoundBtn.addEventListener('click', toggleSound);
    }

    // ===== THEME SYSTEM =====
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('mc-craft-theme', theme);
        currentTheme = theme;
    }

    function updateActiveThemeButtons() {
        document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
            option.classList.toggle('active', option.dataset.theme === currentTheme);
        });
    }

    function initThemeSwitcher() {
        applyTheme(currentTheme);
        updateActiveThemeButtons();
        if (themeBtn) {
            themeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                themeDropdown.classList.toggle('show');
                playClickSound();
            });
        }
        document.addEventListener('click', function (e) {
            if (themeDropdown && !e.target.closest('.theme-switcher')) {
                themeDropdown.classList.remove('show');
            }
        });
        document.querySelectorAll('.theme-option, .theme-option-btn').forEach(function (option) {
            option.addEventListener('click', function () {
                var theme = option.dataset.theme;
                applyTheme(theme);
                updateActiveThemeButtons();
                if (themeDropdown) themeDropdown.classList.remove('show');
                playClickSound();
                showToast(lang === 'de' ? 'Theme geändert' : 'Theme changed', lang === 'de' ? ('Zu ' + (THEME_NAMES[theme] || theme) + ' gewechselt') : ('Switched to ' + (THEME_NAMES[theme] || theme)));
            });
        });
    }

    // ===== MOBILE MENU =====
    function closeMobileMenu() {
        if (mobileNav) mobileNav.classList.remove('show');
        document.body.style.overflow = '';
        playClickSound();
    }

    function initMobileMenu() {
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function () {
                mobileNav.classList.add('show');
                document.body.style.overflow = 'hidden';
                playClickSound();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
        if (mobileNav) {
            mobileNav.addEventListener('click', function (e) {
                if (e.target === mobileNav) closeMobileMenu();
            });
            document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
                link.addEventListener('click', closeMobileMenu);
            });
        }
    }

    // ===== SCROLL EFFECTS =====
    function initScrollEffects() {
        window.addEventListener('scroll', function () {
            if (header) header.classList.toggle('scrolled', window.scrollY > 50);
            if (backToTop) backToTop.classList.toggle('show', window.scrollY > 300);
        });
        if (backToTop) {
            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                playClickSound();
            });
        }
    }

    // ===== SKIN VIEWER =====
    function initSkinViewer() {
        try {
            viewer = new skinview3d.SkinViewer({
                canvas: document.getElementById('poserCanvas'),
                width: 400,
                height: 460,
                skin: STEVE_SKIN_URL,
                preserveDrawingBuffer: true
            });
            viewer.autoRotate = false;
            viewer.autoRotateSpeed = 0.6;
            viewer.controls.enableZoom = true;
            viewer.controls.enableRotate = true;
            viewer.controls.enablePan = true;
            viewer.camera.position.z = 55;
            setSecondLayerVisible(secondLayerVisible);
            captureLimbDefaults();
            applyAnimationPose('idle');
            window.__skinPoserViewer = viewer;
        } catch (error) {
            console.error('Failed to initialize skin viewer:', error);
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? '3D-Viewer konnte nicht geladen werden' : '3D viewer could not be loaded', 'error');
        }
    }

    // ===== PART VISIBILITY (per body part + its overlay layer, like the chibi editor) =====
    // skinview3d gives every body part an innerLayer and an outerLayer mesh. The
    // eyes switch those meshes only - never the part's group, which "Head only"
    // uses - so both features combine. An overlay is shown only when the global
    // "2nd layer" button AND its own eye are on.
    var PART_KEYS = ['head', 'body', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'];
    var partVisibility = {};   // key -> false when hidden ('head' = base, 'head-layer' = overlay)

    function isPartOn(key) {
        return partVisibility[key] !== false;
    }

    function applyPartVisibility() {
        if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
        var skin = viewer.playerObject.skin;
        PART_KEYS.forEach(function (key) {
            var part = skin[key];
            if (!part) return;
            if (part.innerLayer) part.innerLayer.visible = isPartOn(key);
            if (part.outerLayer) part.outerLayer.visible = secondLayerVisible && isPartOn(key + '-layer');
        });
    }

    function syncPartCheckboxes() {
        document.querySelectorAll('#poserPartsList input[data-part]').forEach(function (cb) {
            cb.checked = isPartOn(cb.dataset.part);
        });
    }

    function initPartVisibility() {
        var list = document.getElementById('poserPartsList');
        if (!list) return;
        list.addEventListener('change', function (e) {
            var cb = e.target;
            if (!cb || !cb.dataset || !cb.dataset.part) return;
            if (cb.checked) delete partVisibility[cb.dataset.part];
            else partVisibility[cb.dataset.part] = false;
            applyPartVisibility();
            playClickSound();
        });
        var showAll = document.getElementById('showAllPartsBtn');
        if (showAll) {
            showAll.addEventListener('click', function () {
                partVisibility = {};
                syncPartCheckboxes();
                applyPartVisibility();
                playClickSound();
            });
        }
    }

    function setSecondLayerVisible(visible) {
        if (!viewer || !viewer.playerObject) return false;
        var applied = false;
        var playerObject = viewer.playerObject;

        if (typeof playerObject.setOuterLayerVisible === 'function') {
            playerObject.setOuterLayerVisible(visible);
            applied = true;
        }
        if (playerObject.skin && typeof playerObject.skin.setOuterLayerVisible === 'function') {
            playerObject.skin.setOuterLayerVisible(visible);
            applied = true;
        }
        var outerParts = ['head2', 'body2', 'leftArm2', 'rightArm2', 'leftLeg2', 'rightLeg2'];
        [playerObject.skin, playerObject].forEach(function (partRoot) {
            if (!partRoot) return;
            outerParts.forEach(function (partName) {
                var part = partRoot[partName];
                if (part && typeof part.visible === 'boolean') {
                    part.visible = visible;
                    applied = true;
                }
            });
        });
        if (typeof playerObject.traverse === 'function') {
            var outerPartSet = {};
            outerParts.forEach(function (n) { outerPartSet[n.toLowerCase()] = true; });
            playerObject.traverse(function (node) {
                var nodeName = String(node.name || '').toLowerCase();
                if (outerPartSet[nodeName] && typeof node.visible === 'boolean') {
                    node.visible = visible;
                    applied = true;
                }
            });
        }
        // Every caller (start-up, the 2nd-layer button, each skin load) resets all
        // overlays at once - put the per-part choices back on top.
        applyPartVisibility();
        return applied;
    }

    function toggleLayer() {
        secondLayerVisible = !secondLayerVisible;
        setSecondLayerVisible(secondLayerVisible);
        updateToggleButton(layerToggleBtn, secondLayerVisible, lang === 'de' ? '2. Ebene: An' : '2nd Layer: On', lang === 'de' ? '2. Ebene: Aus' : '2nd Layer: Off');
        playClickSound();
    }

    function updateToggleButton(btn, on, onLabel, offLabel) {
        if (!btn) return;
        btn.textContent = on ? onLabel : offLabel;
        btn.classList.toggle('btn-primary', on);
        btn.classList.toggle('btn-outline', !on);
    }

    // ===== BACKGROUND =====
    function applyGradientBackground() {
        if (!viewer || !bgColorInput || !bgColor2Input) return;
        transparentBg = false;
        applyVignette();
        if (canvasWrapper) canvasWrapper.classList.remove('bg-checkerboard');
        var w = 512, h = 256;
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, bgColorInput.value);
        gradient.addColorStop(1, bgColor2Input.value);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
        canvas.toBlob(function (blob) {
            if (!blob) return;
            var url = URL.createObjectURL(blob);
            try {
                viewer.loadPanorama(url);
            } catch (e) {
                console.error('Gradient background could not be applied:', e);
            }
        }, 'image/png');
    }

    function applyTransparentBackground() {
        transparentBg = true;
        applyVignette();
        if (canvasWrapper) canvasWrapper.classList.add('bg-checkerboard');
        if (viewer) {
            try { viewer.background = null; } catch (e) { /* ignore */ }
        }
    }

    function loadPanoramaFile(file) {
        if (!viewer || !file) return;
        var url = URL.createObjectURL(file);
        try {
            viewer.loadPanorama(url);
            transparentBg = false;
            applyVignette();
            if (canvasWrapper) canvasWrapper.classList.remove('bg-checkerboard');
            showToast(lang === 'de' ? 'Panorama geladen' : 'Panorama loaded', file.name, 'success');
        } catch (e) {
            console.error('Panorama could not be loaded:', e);
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Panorama wird von diesem Viewer nicht unterstützt' : 'Panorama is not supported by this viewer', 'error');
        }
    }

    // ===== EARS =====
    var earsColor = '#ffffff';

    function applyEarsColor() {
        if (!viewer || !viewer.playerObject || !viewer.playerObject.ears) return;
        viewer.playerObject.ears.traverse(function (node) {
            if (node.isMesh && node.material && node.material.color) {
                node.material.map = null;
                node.material.needsUpdate = true;
                node.material.color.set(earsColor);
            }
        });
    }

    var LOOK_PRESETS = {
        soft:     { roughness: 0.7,  metalness: 0,    unlit: 0,    tint: [1, 1, 1],          lightMul: 1.0 },
        glossy:   { roughness: 0.2,  metalness: 0.15, unlit: 0,    tint: [1.05, 1.05, 1.1],   lightMul: 1.35 },
        clay:     { roughness: 0.95, metalness: 0,    unlit: 0,    tint: [1.05, 0.97, 0.9],   lightMul: 0.8 },
        plastic:  { roughness: 0.4,  metalness: 0.05, unlit: 0,    tint: [0.97, 1.0, 1.05],   lightMul: 1.2 },
        matte:    { roughness: 1.0,  metalness: 0,    unlit: 0,    tint: [0.9, 0.9, 0.9],     lightMul: 0.8 },
        metallic: { roughness: 0.3,  metalness: 0.55, unlit: 0,    tint: [0.88, 0.94, 1.06],  lightMul: 2.8 },
        embossed: { roughness: 1.0,  metalness: 0,    unlit: 0.4,  tint: [1, 1, 1],           lightMul: 1.1 },
        flat:     { roughness: 1.0,  metalness: 0,    unlit: 1.0,  tint: [1, 1, 1],           lightMul: 1.0 }
    };
    var lookMaterialBaselines = null;
    var outlineMeshes = [];
    var currentLookLightMul = 1;

    function applyLightIntensities() {
        if (viewer && viewer.globalLight && lightIntensityRange) {
            var pct = parseFloat(lightIntensityRange.value);
            viewer.globalLight.intensity = (pct / 100) * LIGHT_AMBIENT_BASE * currentLookLightMul;
        }
        if (viewer && viewer.cameraLight && lightIntensity2Range) {
            var pct2 = parseFloat(lightIntensity2Range.value);
            viewer.cameraLight.intensity = (pct2 / 100) * LIGHT_DIRECTIONAL_BASE * currentLookLightMul;
        }
    }

    function collectLookMaterials() {
        var mats = [];
        if (!viewer || !viewer.playerObject) return mats;
        viewer.playerObject.traverse(function (node) {
            if (node.isMesh && node.material && !node.userData.isOutlineMesh && mats.indexOf(node.material) === -1) {
                mats.push(node.material);
            }
        });
        return mats;
    }

    function ensureLookBaselines() {
        if (lookMaterialBaselines) return;
        lookMaterialBaselines = collectLookMaterials().map(function (mat) {
            return {
                material: mat,
                color: mat.color ? mat.color.getHex() : null,
                opacity: typeof mat.opacity === 'number' ? mat.opacity : 1,
                transparent: !!mat.transparent
            };
        });
    }

    function applyLook(name) {
        if (!LOOK_PRESETS[name] || !viewer || !viewer.playerObject) return;
        currentLook = name;

        // Real PBR layer (skin-poser-pbr.js) loaded and ready: it has actual
        // MeshPhysicalMaterial + a RoomEnvironment reflection map, so let it own the
        // material entirely instead of the tint/light-multiplier approximation below.
        if (window.applyPhysicalLook) {
            window.applyPhysicalLook(name);
            // The PBR module now drives its own key/fill/rim rig for real directional
            // shading; this old flat ambient+camera light stays on (so the Lighting
            // tab sliders keep doing something) but scaled well down, or it washes the
            // new rig's shading back out to flat again.
            currentLookLightMul = 0.35;
            applyLightIntensities();
            applyLookTransparency();
            return;
        }

        ensureLookBaselines();
        var preset = LOOK_PRESETS[name];
        var blend = preset.unlit || 0;
        var tint = preset.tint || [1, 1, 1];
        lookMaterialBaselines.forEach(function (entry) {
            var mat = entry.material;
            if (entry.color !== null) {
                var hex = entry.color;
                var r = ((hex >> 16) & 255) / 255 * tint[0];
                var g = ((hex >> 8) & 255) / 255 * tint[1];
                var b = (hex & 255) / 255 * tint[2];
                mat.color.setRGB(r * (1 - blend), g * (1 - blend), b * (1 - blend));
            }
            if ('roughness' in mat) mat.roughness = preset.roughness;
            if ('metalness' in mat) mat.metalness = preset.metalness;
            if (mat.emissive) mat.emissive.setRGB(blend, blend, blend);
            if ('emissiveIntensity' in mat) mat.emissiveIntensity = blend;
            if ('emissiveMap' in mat) mat.emissiveMap = blend > 0 ? mat.map : null;
            mat.needsUpdate = true;
        });
        currentLookLightMul = preset.lightMul || 1;
        applyLightIntensities();
        applyLookTransparency();
    }
    // The PBR module's own bootstrap (once the skin texture is ready) needs to run
    // through this wrapper too, not just window.applyPhysicalLook directly - otherwise
    // the light-multiplier dial-down above never happens on first load, only once the
    // user manually touches the Look dropdown.
    window.__mcCraftApplyLook = applyLook;

    function applyLookTransparency() {
        if (window.applyPhysicalTransparency) {
            window.applyPhysicalTransparency(lookTransparent);
            return;
        }
        if (!lookMaterialBaselines) return;
        lookMaterialBaselines.forEach(function (entry) {
            var mat = entry.material;
            mat.transparent = lookTransparent ? true : entry.transparent;
            mat.opacity = lookTransparent ? 0.55 : entry.opacity;
            mat.needsUpdate = true;
        });
    }

    function applyVignette() {
        if (!poserVignetteOverlay) return;
        poserVignetteOverlay.classList.toggle('active', lookVignette && !transparentBg);
    }

    // Inverted-hull outline: a slightly-enlarged, back-face-only black clone of
    // every limb mesh, parented to that mesh so it inherits its pose for free.
    // Thickness doubles as the on/off switch (0 = no outline), matching the
    // reference tool's own outline UX.
    function clearOutlineMeshes() {
        outlineMeshes.forEach(function (mesh) {
            if (mesh.parent) mesh.parent.remove(mesh);
        });
        outlineMeshes = [];
    }

    function rebuildOutlineMeshes() {
        clearOutlineMeshes();
        if (!viewer || !viewer.playerObject || outlineWidth <= 0) return;
        var targets = [];
        viewer.playerObject.traverse(function (node) {
            if (node.isMesh && node.geometry && node.material && !node.userData.isOutlineMesh) targets.push(node);
        });
        targets.forEach(function (mesh) {
            var outlineMat = mesh.material.clone();
            outlineMat.map = null;
            outlineMat.emissiveMap = null;
            if (outlineMat.color) outlineMat.color.setRGB(0, 0, 0);
            if (outlineMat.emissive) outlineMat.emissive.setRGB(0, 0, 0);
            if ('emissiveIntensity' in outlineMat) outlineMat.emissiveIntensity = 0;
            if ('roughness' in outlineMat) outlineMat.roughness = 1;
            if ('metalness' in outlineMat) outlineMat.metalness = 0;
            outlineMat.side = 1; // THREE.BackSide - no THREE global to reference; a stable three.js constant
            // "Dissolve edges" softens the hard voxel silhouette by fading the outline
            // shell translucent instead of solid black, without touching the shared
            // body materials the Look presets depend on.
            outlineMat.transparent = dissolveEdgesEnabled;
            outlineMat.opacity = dissolveEdgesEnabled ? 0.35 : 1;
            outlineMat.needsUpdate = true;

            var outlineMesh = mesh.clone();
            outlineMesh.position.set(0, 0, 0);
            outlineMesh.rotation.set(0, 0, 0);
            outlineMesh.material = outlineMat;
            outlineMesh.geometry = mesh.geometry;
            outlineMesh.userData.isOutlineMesh = true;
            outlineMesh.renderOrder = -1;
            var s = 1 + outlineWidth * 0.012;
            outlineMesh.scale.set(s, s, s);
            mesh.add(outlineMesh);
            outlineMeshes.push(outlineMesh);
        });
    }

    function applyOutlineWidth(w) {
        outlineWidth = Math.max(0, Math.min(10, w || 0));
        rebuildOutlineMeshes();
    }

    function initLookControls() {
        if (lookSelect) {
            lookSelect.addEventListener('change', function () {
                applyLook(lookSelect.value);
                playClickSound();
            });
        }
        if (outlineWidthRange) {
            outlineWidthRange.addEventListener('input', function () {
                applyOutlineWidth(parseInt(outlineWidthRange.value, 10));
                if (outlineWidthValue) outlineWidthValue.textContent = outlineWidth;
            });
        }
        if (lookTransparentCheckbox) {
            lookTransparentCheckbox.addEventListener('change', function () {
                lookTransparent = lookTransparentCheckbox.checked;
                applyLookTransparency();
                playClickSound();
            });
        }
        if (lookVignetteCheckbox) {
            lookVignetteCheckbox.addEventListener('change', function () {
                lookVignette = lookVignetteCheckbox.checked;
                applyVignette();
                playClickSound();
            });
        }
        applyLook(currentLook);
        applyVignette();
    }

    function toggleEars() {
        earsOn = !earsOn;
        if (viewer && typeof viewer.loadEars === 'function') {
            try {
                if (earsOn) {
                    viewer.loadEars(currentSkinUrl, { textureType: 'skin' });
                    applyEarsColor();
                } else if (viewer.playerObject && viewer.playerObject.ears) {
                    viewer.playerObject.ears.visible = false;
                }
            } catch (e) {
                console.warn('Ears are not supported for this skin/viewer:', e);
                showToast(lang === 'de' ? 'Hinweis' : 'Note', lang === 'de' ? 'Ears konnten nicht geladen werden' : 'Ears could not be loaded', 'info');
            }
        }
        updateToggleButton(earsToggleBtn, earsOn, lang === 'de' ? 'Ears: An' : 'Ears: On', lang === 'de' ? 'Ears: Aus' : 'Ears: Off');
        playClickSound();
    }

    // ===== CAPE / ELYTRA =====
    function applyBackEquipment(mode) {
        backEquipmentMode = mode;
        // Only push the mode to the viewer while visibility is on - otherwise switching
        // Cape/Elytra while the cape is toggled off would silently turn it back on.
        if (viewer && viewer.playerObject && typeof viewer.playerObject.backEquipment !== 'undefined' && capeVisible) {
            try { viewer.playerObject.backEquipment = mode; } catch (e) { /* ignore */ }
        }
    }

    function applyCapeVisibility(visible) {
        capeVisible = visible;
        if (viewer && viewer.playerObject && typeof viewer.playerObject.backEquipment !== 'undefined') {
            try { viewer.playerObject.backEquipment = visible ? backEquipmentMode : null; } catch (e) { /* ignore */ }
        }
        updateToggleButton(capeVisibleBtn, visible, lang === 'de' ? 'Cape: An' : 'Cape: On', lang === 'de' ? 'Cape: Aus' : 'Cape: Off');
    }

    function loadCapeFromUrl(url) {
        if (!viewer) return;
        currentCapeUrl = url;
        // loadCape() loads its texture asynchronously and returns a promise - the old
        // synchronous try/catch always hit its success branch immediately regardless
        // of whether the cape actually loaded, and a real failure (bad URL, 404, CORS)
        // surfaced only as an unhandled rejection in the console, never as a toast.
        Promise.resolve(viewer.loadCape(url, { backEquipment: backEquipmentMode })).then(function () {
            if (downloadCapeBtn) downloadCapeBtn.style.display = '';
            // The PBR Look system swaps mesh.material to its own physical/basic twins,
            // which skinview3d's cape reload (it mutates its own permanent material's
            // .map, never mesh.material) can't reach on its own - re-applying the
            // current look refreshes those twins from the freshly loaded cape texture.
            applyLook(currentLook);
            // loadCape() always makes the cape visible on load regardless of our own
            // tracked state, so resync the toggle button to match.
            capeVisible = true;
            updateToggleButton(capeVisibleBtn, true, lang === 'de' ? 'Cape: An' : 'Cape: On', lang === 'de' ? 'Cape: Aus' : 'Cape: Off');
            showToast(lang === 'de' ? 'Cape geladen' : 'Cape loaded', '', 'success');
        }).catch(function (e) {
            console.error(e);
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Cape konnte nicht geladen werden' : 'Cape could not be loaded', 'error');
        });
    }

    function initBackEquipmentToggle() {
        if (!backEquipmentToggle) return;
        backEquipmentToggle.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-mode]');
            if (!btn) return;
            backEquipmentToggle.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            applyBackEquipment(btn.dataset.mode);
            playClickSound();
        });
        if (capeVisibleBtn) {
            capeVisibleBtn.addEventListener('click', function () {
                applyCapeVisibility(!capeVisible);
                playClickSound();
            });
        }
    }

    // ===== MODEL / SKIN LOADING =====
    function loadSkinIntoViewer(url, modelOption) {
        if (!viewer) return Promise.reject(new Error(lang === 'de' ? 'viewer nicht bereit' : 'viewer not ready'));
        currentSkinUrl = url;
        return viewer.loadSkin(url, { model: modelOption || currentModel }).then(function () {
            setSecondLayerVisible(secondLayerVisible);
            if (earsOn) {
                try { viewer.loadEars(url, { textureType: 'skin' }); applyEarsColor(); } catch (e) { /* ignore */ }
            }
            lookMaterialBaselines = null;
            applyLook(currentLook);
            rebuildOutlineMeshes();
        });
    }

    function handleSkinFile(file) {
        if (!file) return;
        if (!/image\/png/.test(file.type) && !/\.png$/i.test(file.name)) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bitte eine PNG-Datei auswählen' : 'Please select a PNG file', 'error');
            return;
        }
        var url = URL.createObjectURL(file);
        loadSkinIntoViewer(url).then(function () {
            showToast(lang === 'de' ? 'Skin geladen' : 'Skin loaded', file.name, 'success');
        }).catch(function (err) {
            console.error(err);
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Skin konnte nicht geladen werden' : 'Skin could not be loaded', 'error');
        });
    }

    function handleCapeFile(file) {
        if (!file) return;
        if (!/image\/png/.test(file.type) && !/\.png$/i.test(file.name)) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bitte eine PNG-Datei auswählen' : 'Please select a PNG file', 'error');
            return;
        }
        loadCapeFromUrl(URL.createObjectURL(file));
    }

    function initUpload() {
        if (uploadDropzone && skinFileInput) {
            uploadDropzone.addEventListener('click', function () { skinFileInput.click(); });
            uploadDropzone.addEventListener('dragover', function (e) {
                e.preventDefault();
                uploadDropzone.classList.add('drag-over');
            });
            uploadDropzone.addEventListener('dragleave', function () {
                uploadDropzone.classList.remove('drag-over');
            });
            uploadDropzone.addEventListener('drop', function (e) {
                e.preventDefault();
                uploadDropzone.classList.remove('drag-over');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleSkinFile(e.dataTransfer.files[0]);
                }
            });
        }
        if (skinFileInput) {
            skinFileInput.addEventListener('change', function (e) {
                handleSkinFile(e.target.files[0]);
            });
        }
        if (capeDropzone && capeFileInput) {
            capeDropzone.addEventListener('click', function () { capeFileInput.click(); });
            capeDropzone.addEventListener('dragover', function (e) {
                e.preventDefault();
                capeDropzone.classList.add('drag-over');
            });
            capeDropzone.addEventListener('dragleave', function () {
                capeDropzone.classList.remove('drag-over');
            });
            capeDropzone.addEventListener('drop', function (e) {
                e.preventDefault();
                capeDropzone.classList.remove('drag-over');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleCapeFile(e.dataTransfer.files[0]);
                }
            });
        }
        if (capeFileInput) {
            capeFileInput.addEventListener('change', function (e) {
                handleCapeFile(e.target.files[0]);
            });
        }
        if (capeLoadBtn && capeUrlInput) {
            capeLoadBtn.addEventListener('click', function () {
                var url = capeUrlInput.value.trim();
                if (!url) {
                    showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bitte eine Cape-URL eingeben' : 'Please enter a cape URL', 'error');
                    return;
                }
                loadCapeFromUrl(url);
            });
        }
    }

    // ===== MC-CRAFT API LOOKUP =====
    async function getPlayerData(username) {
        var player = await MCCraftAPI.getPlayer(username);
        return { username: player.username, skinUrl: player.skinUrl ? MCCraftAPI.getPlayerSkinUrl(username) : null, capeUrl: player.capeUrl || null, isSlim: !!player.isSlim };
    }

    var lastLookupTime = 0;
    async function lookupPlayer() {
        if (!usernameInput) return;
        var now = Date.now();
        if (now - lastLookupTime < 1500) {
            showToast(lang === 'de' ? 'Bitte warten' : 'Please wait', lang === 'de' ? 'Zu viele Anfragen kurz hintereinander' : 'Too many requests in a row', 'error');
            return;
        }
        var name = usernameInput.value.trim();
        if (!name) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bitte einen Spielernamen eingeben' : 'Please enter a player name', 'error');
            return;
        }
        lastLookupTime = now;
        try {
            if (lookupBtn) lookupBtn.disabled = true;
            var data = await getPlayerData(name);
            var skinToLoad = data.skinUrl || (data.isSlim ? ALEX_SKIN_URL : STEVE_SKIN_URL);
            await loadSkinIntoViewer(skinToLoad, data.isSlim ? 'slim' : 'default');
            if (modelSelect) modelSelect.value = data.isSlim ? 'slim' : 'default';
            currentModel = data.isSlim ? 'slim' : 'default';

            if (data.capeUrl) {
                loadCapeFromUrl(data.capeUrl);
            } else {
                currentCapeUrl = null;
                try { viewer.loadCape(null); } catch (e) { /* ignore */ }
                if (downloadCapeBtn) downloadCapeBtn.style.display = 'none';
            }
            showToast(lang === 'de' ? 'Erfolg' : 'Success', data.username + (lang === 'de' ? ' geladen' : ' loaded'), 'success');
        } catch (err) {
            console.error(err);
            var code = err && err.code;
            var title = lang === 'de' ? 'Fehler' : 'Error';
            var message = lang === 'de' ? 'Spieler konnte nicht geladen werden' : 'Player could not be loaded';
            if (code === 'PLAYER_NOT_FOUND') {
                title = lang === 'de' ? 'Spieler nicht gefunden' : 'Player not found';
                message = lang === 'de'
                    ? 'Der Spieler "' + name + '" existiert nicht oder der Name/UUID ist falsch.'
                    : 'The player "' + name + '" does not exist or the name/UUID is incorrect.';
            } else if (code === 'INVALID_PLAYER_NAME') {
                title = lang === 'de' ? 'Ungültiger Spielername' : 'Invalid player name';
                message = lang === 'de' ? 'Bitte gib einen gültigen Minecraft-Spielernamen oder eine gültige UUID ein.' : 'Please enter a valid Minecraft player name or UUID.';
            } else if (code === 'PLAYER_REQUIRED') {
                title = lang === 'de' ? 'Spielername fehlt' : 'Player name required';
                message = lang === 'de' ? 'Bitte gib einen Spielernamen oder eine UUID ein.' : 'Please enter a player name or UUID.';
            } else if (code === 'RATE_LIMIT') {
                title = lang === 'de' ? 'Zu viele Anfragen' : 'Too many requests';
                message = lang === 'de' ? 'Bitte warte einen Moment und versuche es erneut.' : 'Please wait a moment and try again.';
            } else if (code === 'TIMEOUT') {
                title = lang === 'de' ? 'Zeitüberschreitung' : 'Request timed out';
                message = lang === 'de' ? 'Die MC-Craft API antwortet gerade nicht. Bitte versuche es später erneut.' : 'The MC-Craft API is not responding right now. Please try again later.';
            } else if (code === 'NETWORK_ERROR') {
                title = lang === 'de' ? 'Verbindungsfehler' : 'Connection error';
                message = lang === 'de' ? 'Die MC-Craft API konnte nicht erreicht werden.' : 'The MC-Craft API could not be reached.';
            } else if (code === 'PLAYER_API_ERROR') {
                title = lang === 'de' ? 'API nicht verfügbar' : 'API unavailable';
                message = lang === 'de' ? 'Die Spielerinformationen konnten gerade nicht geladen werden.' : 'Player information could not be loaded right now.';
            }
            showToast(title, message, 'error');
        } finally {
            if (lookupBtn) lookupBtn.disabled = false;
        }
    }

    // ===== HEAD-ONLY MODE =====
    var BODY_PARTS_TO_HIDE = ['body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

    function setHeadOnly(enabled) {
        headOnlyMode = enabled;
        if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
        var skin = viewer.playerObject.skin;
        BODY_PARTS_TO_HIDE.forEach(function (name) {
            if (skin[name]) skin[name].visible = !enabled;
        });
        if (enabled) {
            if (viewer.playerObject.cape) viewer.playerObject.cape.visible = false;
            if (viewer.playerObject.elytra) viewer.playerObject.elytra.visible = false;
        } else {
            // Restore cape/elytra visibility only if one was actually ever loaded -
            // applyBackEquipment() alone made the default/blank cape mesh visible
            // even with nothing loaded, which showed up as a white panel on the back.
            var hasCapeLoaded = !!currentCapeUrl;
            if (viewer.playerObject.cape) viewer.playerObject.cape.visible = hasCapeLoaded && backEquipmentMode === 'cape';
            if (viewer.playerObject.elytra) viewer.playerObject.elytra.visible = hasCapeLoaded && backEquipmentMode === 'elytra';
        }
        if (viewer.controls && viewer.controls.target) {
            viewer.controls.target.y = enabled ? 9 : 0;
            if (typeof viewer.controls.update === 'function') viewer.controls.update();
        }
        viewer.zoom = enabled ? 2.2 : parseFloat(zoomRange && zoomRange.value ? zoomRange.value : '1');
        updateToggleButton(headOnlyBtn, enabled, lang === 'de' ? 'Nur Kopf: An' : 'Head Only: On', lang === 'de' ? 'Nur Kopf: Aus' : 'Head Only: Off');
    }

    // ===== FRAMING / BUSTS (camera crop, independent of viewing angle) =====
    var FRAMING_PRESETS = {
        full: { zoom: 1, targetY: 0 },
        half: { zoom: 1.6, targetY: 4 },
        portrait: { zoom: 1.9, targetY: 7 },
        head: { zoom: 2.2, targetY: 8.5 }
    };
    var currentFraming = 'full';

    function applyFraming(name) {
        var preset = FRAMING_PRESETS[name];
        if (!preset || !viewer) return;
        currentFraming = name;
        if (!headOnlyMode) {
            viewer.zoom = preset.zoom;
            if (zoomRange) zoomRange.value = Math.min(2, preset.zoom);
            if (viewer.controls && viewer.controls.target) {
                viewer.controls.target.y = preset.targetY;
                if (typeof viewer.controls.update === 'function') viewer.controls.update();
            }
        }
        if (framingPresetRow) {
            framingPresetRow.querySelectorAll('button').forEach(function (b) {
                b.classList.toggle('active', b.dataset.framing === name);
            });
        }
    }

    function initFramingPresets() {
        if (!framingPresetRow) return;
        framingPresetRow.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-framing]');
            if (!btn) return;
            applyFraming(btn.dataset.framing);
            playClickSound();
        });
    }

    // ===== ANGLE PRESETS =====
    // Top/Bottom need the CAMERA itself repositioned (polar angle), not just a
    // model.rotation.y spin like the other angles - restores the normal
    // horizontal position for every other angle in case it was previously
    // top/bottom. Distance is read back from the camera rather than a fixed
    // constant so it stays correct whatever zoom/framing is currently active.
    function applyCameraPolarView(name) {
        if (!viewer || !viewer.camera || !viewer.controls) return;
        var target = viewer.controls.target;
        var distance = viewer.camera.position.distanceTo(target) || 55;
        if (name === 'top') {
            viewer.camera.position.set(target.x, target.y + distance, target.z + 0.01);
        } else if (name === 'bottom') {
            viewer.camera.position.set(target.x, target.y - distance, target.z + 0.01);
        } else {
            viewer.camera.position.set(target.x, target.y, target.z + distance);
        }
        if (typeof viewer.controls.update === 'function') viewer.controls.update();
    }

    function applyAnglePreset(name) {
        if (!viewer || !viewer.playerObject) return;
        currentAngle = name;
        viewer.autoRotate = false;
        updateToggleButton(autoRotateBtn, false, lang === 'de' ? 'Auto-Rotation: An' : 'Auto-Rotate: On', lang === 'de' ? 'Auto-Rotation: Aus' : 'Auto-Rotate: Off');

        applyCameraPolarView(name);
        if (name !== 'top' && name !== 'bottom') {
            viewer.playerObject.rotation.y = ANGLE_ROTATION_Y[name] || 0;
            limbRotations.model.y = (ANGLE_ROTATION_Y[name] || 0) * 180 / Math.PI;
        }
        syncLimbSlidersUI();

        // Angle changes no longer touch zoom/framing themselves (framing
        // persists across angle changes, matching "orbit or pick an angle and
        // the framing follows") - "face" is a one-click shortcut that also
        // switches framing to the head crop, as a convenience.
        if (name === 'face') applyFraming('head');

        if (anglePresetRow) {
            anglePresetRow.querySelectorAll('button').forEach(function (b) {
                b.classList.toggle('active', b.dataset.angle === name);
            });
        }
    }

    function initAnglePresets() {
        if (!anglePresetRow) return;
        anglePresetRow.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-angle]');
            if (!btn) return;
            applyAnglePreset(btn.dataset.angle);
            playClickSound();
        });
    }

    // ===== ROTATION LOCK =====
    var rotationLocked = false;

    function toggleRotationLock() {
        rotationLocked = !rotationLocked;
        if (viewer && viewer.controls) {
            viewer.controls.enableRotate = !rotationLocked;
            viewer.controls.enablePan = !rotationLocked;
        }
        updateToggleButton(lockRotationBtn, rotationLocked, lang === 'de' ? 'Rotation gesperrt' : 'Rotation Locked', lang === 'de' ? 'Rotation sperren' : 'Lock Rotation');
        playClickSound();
    }

    // ===== CAMERA READOUT (azimuth/polar, matches the reference site's display) =====
    function updateCameraReadout() {
        if (!viewer || !viewer.camera || !viewer.controls || !cameraReadout) return;
        var target = viewer.controls.target;
        var dx = viewer.camera.position.x - target.x;
        var dy = viewer.camera.position.y - target.y;
        var dz = viewer.camera.position.z - target.z;
        var radius = Math.sqrt(dx * dx + dy * dy + dz * dz);
        var azimuth = Math.atan2(dx, dz) * 180 / Math.PI;
        if (azimuth < 0) azimuth += 360;
        var polar = radius > 0 ? Math.acos(Math.max(-1, Math.min(1, dy / radius))) * 180 / Math.PI : 90;
        cameraReadout.textContent = (lang === 'de' ? 'Azimut ' : 'Azimuth ') + azimuth.toFixed(1) + '° · Polar ' + polar.toFixed(1) + '°';
    }

    function initCameraReadout() {
        if (!viewer || !viewer.controls) return;
        viewer.controls.addEventListener('change', updateCameraReadout);
        updateCameraReadout();
    }

    // ===== CLICK-TO-SELECT (click a body part in the viewport to jump to its sliders) =====
    function selectLimbInPanel(limb) {
        var group = document.querySelector('.limb-slider-group[data-limb-group="' + limb + '"]');
        if (!group) return;
        group.scrollIntoView({ behavior: 'smooth', block: 'center' });
        group.classList.add('limb-slider-group-highlight');
        setTimeout(function () { group.classList.remove('limb-slider-group-highlight'); }, 1500);
    }

    function initPartClickSelect() {
        if (!viewer || !viewer.canvas) return;
        var canvas = viewer.canvas;
        var selectableLimbs = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        var dragStart = null;
        canvas.addEventListener('pointerdown', function (e) {
            dragStart = { x: e.clientX, y: e.clientY };
        });
        canvas.addEventListener('pointerup', function (e) {
            if (!dragStart) return;
            var moved = Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y);
            dragStart = null;
            if (moved > 6) return; // was a drag/orbit, not a click
            if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
            var rect = canvas.getBoundingClientRect();
            var clickX = e.clientX - rect.left;
            var clickY = e.clientY - rect.top;
            var Vector3Ctor = viewer.playerObject.position.constructor;
            var best = null, bestDist = Infinity;
            selectableLimbs.forEach(function (limb) {
                var part = viewer.playerObject.skin[limb];
                if (!part || part.visible === false) return;
                var worldPos = new Vector3Ctor();
                part.getWorldPosition(worldPos);
                var ndc = worldPos.project(viewer.camera);
                var px = (ndc.x * 0.5 + 0.5) * rect.width;
                var py = (1 - (ndc.y * 0.5 + 0.5)) * rect.height;
                var dist = Math.hypot(px - clickX, py - clickY);
                if (dist < bestDist) { bestDist = dist; best = limb; }
            });
            if (best && bestDist < 120) selectLimbInPanel(best);
        });
    }

    // ===== POSING =====
    function applyLimbRotation(limb) {
        if (!viewer || !viewer.playerObject) return;
        var part = limb === 'model' ? viewer.playerObject : (viewer.playerObject.skin && viewer.playerObject.skin[limb]);
        if (!part || !part.rotation) return;
        var r = limbRotations[limb];
        part.rotation.set(r.x * Math.PI / 180, r.y * Math.PI / 180, r.z * Math.PI / 180);
    }

    function applyAllLimbRotations() {
        LIMBS.forEach(applyLimbRotation);
    }

    // ===== SELECTED PART: POSITION & SCALE =====
    // The rig's pivot points (captured once, right after the viewer is built) are the
    // "0" that the Position sliders offset from and the "1x" that Scale multiplies -
    // loadSkin()/model-type swaps only replace geometry/texture, never these Group
    // instances, so a one-time capture stays valid for the life of the viewer.
    function captureLimbDefaults() {
        if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
        POSABLE_LIMBS.forEach(function (limb) {
            var part = viewer.playerObject.skin[limb];
            if (!part || !part.position) return;
            limbDefaultPositions[limb] = { x: part.position.x, y: part.position.y, z: part.position.z };
        });
    }

    function applyLimbPosition(limb) {
        if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
        var part = viewer.playerObject.skin[limb];
        var base = limbDefaultPositions[limb];
        var off = limbPositionOffsets[limb];
        if (!part || !part.position || !base || !off) return;
        part.position.set(base.x + off.x, base.y + off.y, base.z + off.z);
    }

    function applyLimbScale(limb) {
        if (!viewer || !viewer.playerObject || !viewer.playerObject.skin) return;
        var part = viewer.playerObject.skin[limb];
        if (!part || !part.scale) return;
        part.scale.setScalar(limbScales[limb] || 1);
    }

    function applyAllLimbTransforms() {
        POSABLE_LIMBS.forEach(function (limb) {
            applyLimbPosition(limb);
            applyLimbScale(limb);
        });
    }

    function syncLimbSlidersUI() {
        LIMBS.forEach(function (limb) {
            ['x', 'y', 'z'].forEach(function (axis) {
                var slider = document.querySelector('.limb-slider-row[data-limb="' + limb + '"][data-axis="' + axis + '"][data-kind="rot"] input');
                var valueEl = document.querySelector('.limb-slider-row[data-limb="' + limb + '"][data-axis="' + axis + '"][data-kind="rot"] .limb-slider-value');
                var value = limbRotations[limb][axis];
                if (slider) slider.value = value;
                if (valueEl) valueEl.textContent = value + '°';

                if (limb === 'model') return;
                var posSlider = document.querySelector('.limb-slider-row[data-limb="' + limb + '"][data-axis="' + axis + '"][data-kind="pos"] input');
                var posValueEl = document.querySelector('.limb-slider-row[data-limb="' + limb + '"][data-axis="' + axis + '"][data-kind="pos"] .limb-slider-value');
                var posValue = limbPositionOffsets[limb][axis];
                if (posSlider) posSlider.value = posValue;
                if (posValueEl) posValueEl.textContent = posValue.toFixed(1);
            });
            if (limb === 'model') return;
            var scaleSlider = document.querySelector('.limb-scale-row[data-limb="' + limb + '"] input');
            var scaleValueEl = document.querySelector('.limb-scale-row[data-limb="' + limb + '"] .limb-slider-value');
            var scaleValue = limbScales[limb];
            if (scaleSlider) scaleSlider.value = scaleValue;
            if (scaleValueEl) scaleValueEl.textContent = scaleValue.toFixed(2) + 'x';
        });
    }

    function stopBuiltinAnimation() {
        if (viewer) viewer.animation = null;
        if (posePresetRow) {
            posePresetRow.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        }
    }

    function resetPose() {
        POSABLE_LIMBS.forEach(function (l) {
            limbRotations[l] = { x: 0, y: 0, z: 0 };
            limbPositionOffsets[l] = { x: 0, y: 0, z: 0 };
            limbScales[l] = 1;
        });
        applyAllLimbRotations();
        applyAllLimbTransforms();
        syncLimbSlidersUI();
        stopBuiltinAnimation();
        if (viewer && viewer.playerObject) {
            viewer.playerObject.position.y = headOnlyMode ? 10 : 0;
        }
        playClickSound();
    }

    function applyStaticPose(name) {
        var pose = STATIC_POSES[name];
        if (!pose) return;
        stopBuiltinAnimation();
        POSABLE_LIMBS.forEach(function (l) {
            limbRotations[l] = { x: pose[l].x, y: pose[l].y, z: pose[l].z };
        });
        applyAllLimbRotations();
        syncLimbSlidersUI();
        setActivePosePreset(name);
    }

    function applyAnimationPose(key) {
        var ctorName = ANIMATION_POSES[key];
        var ctor = ctorName && window.skinview3d && window.skinview3d[ctorName];
        if (typeof ctor !== 'function' || !viewer) return;
        POSABLE_LIMBS.forEach(function (l) { limbRotations[l] = { x: 0, y: 0, z: 0 }; });
        syncLimbSlidersUI();
        var anim = new ctor();
        anim.speed = key === 'run' ? 0.85 : key === 'fly' ? 0.9 : key === 'swim' ? 0.75 : key === 'crouch' ? 0.5 : 0.6;
        viewer.animation = anim;
        setActivePosePreset(key);
    }

    function setActivePosePreset(key) {
        if (!posePresetRow) return;
        posePresetRow.querySelectorAll('button').forEach(function (b) {
            b.classList.toggle('active', b.dataset.pose === key);
        });
    }

    function buildLimbSliders() {
        if (!limbSlidersGrid) return;
        var frag = document.createDocumentFragment();
        LIMBS.forEach(function (limb) {
            var group = document.createElement('div');
            group.className = 'limb-slider-group';
            group.dataset.limbGroup = limb;
            var h4 = document.createElement('h4');
            h4.innerHTML = '<i class="fas fa-child-reaching"></i> ' + LIMB_LABELS[limb];
            group.appendChild(h4);

            var posable = limb !== 'model';

            if (posable) {
                var posLabel = document.createElement('p');
                posLabel.className = 'limb-slider-subhead';
                posLabel.textContent = 'Position';
                group.appendChild(posLabel);
                ['x', 'y', 'z'].forEach(function (axis) {
                    var row = document.createElement('div');
                    row.className = 'limb-slider-row';
                    row.dataset.limb = limb;
                    row.dataset.axis = axis;
                    row.dataset.kind = 'pos';

                    var axisLabel = document.createElement('span');
                    axisLabel.textContent = axis.toUpperCase();
                    row.appendChild(axisLabel);

                    var input = document.createElement('input');
                    input.type = 'range';
                    input.min = '-3';
                    input.max = '3';
                    input.step = '0.1';
                    input.value = '0';
                    input.addEventListener('input', function () {
                        limbPositionOffsets[limb][axis] = parseFloat(input.value);
                        valueEl.textContent = parseFloat(input.value).toFixed(1);
                        applyLimbPosition(limb);
                    });
                    row.appendChild(input);

                    var valueEl = document.createElement('span');
                    valueEl.className = 'limb-slider-value';
                    valueEl.textContent = '0.0';
                    row.appendChild(valueEl);

                    group.appendChild(row);
                });
            }

            var rotLabel = document.createElement('p');
            rotLabel.className = 'limb-slider-subhead';
            rotLabel.textContent = 'Rotation';
            group.appendChild(rotLabel);
            ['x', 'y', 'z'].forEach(function (axis) {
                var row = document.createElement('div');
                row.className = 'limb-slider-row';
                row.dataset.limb = limb;
                row.dataset.axis = axis;
                row.dataset.kind = 'rot';

                var axisLabel = document.createElement('span');
                axisLabel.textContent = axis.toUpperCase();
                row.appendChild(axisLabel);

                var input = document.createElement('input');
                input.type = 'range';
                input.min = '-180';
                input.max = '180';
                input.step = '1';
                input.value = '0';
                input.addEventListener('input', function () {
                    limbRotations[limb][axis] = parseInt(input.value, 10);
                    valueEl.textContent = input.value + '°';
                    stopBuiltinAnimation();
                    applyLimbRotation(limb);
                });
                row.appendChild(input);

                var valueEl = document.createElement('span');
                valueEl.className = 'limb-slider-value';
                valueEl.textContent = '0°';
                row.appendChild(valueEl);

                group.appendChild(row);
            });

            if (posable) {
                var scaleLabel = document.createElement('p');
                scaleLabel.className = 'limb-slider-subhead';
                scaleLabel.textContent = lang === 'de' ? 'Skalierung' : 'Scale';
                group.appendChild(scaleLabel);

                var scaleRow = document.createElement('div');
                scaleRow.className = 'limb-scale-row';
                scaleRow.dataset.limb = limb;

                var scaleAxisLabel = document.createElement('span');
                scaleAxisLabel.textContent = 'S';
                scaleRow.appendChild(scaleAxisLabel);

                var scaleInput = document.createElement('input');
                scaleInput.type = 'range';
                scaleInput.min = '0.5';
                scaleInput.max = '2';
                scaleInput.step = '0.05';
                scaleInput.value = '1';
                scaleInput.addEventListener('input', function () {
                    limbScales[limb] = parseFloat(scaleInput.value);
                    scaleValueEl.textContent = parseFloat(scaleInput.value).toFixed(2) + 'x';
                    applyLimbScale(limb);
                });
                scaleRow.appendChild(scaleInput);

                var scaleValueEl = document.createElement('span');
                scaleValueEl.className = 'limb-slider-value';
                scaleValueEl.textContent = '1.00x';
                scaleRow.appendChild(scaleValueEl);

                group.appendChild(scaleRow);
            }

            frag.appendChild(group);
        });
        limbSlidersGrid.appendChild(frag);
    }

    function initPosePresets() {
        if (!posePresetRow) return;
        posePresetRow.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-pose]');
            if (!btn) return;
            var key = btn.dataset.pose;
            if (STATIC_POSES[key]) {
                applyStaticPose(key);
            } else {
                applyAnimationPose(key);
            }
            playClickSound();
        });
        if (resetPoseBtn) resetPoseBtn.addEventListener('click', resetPose);
    }

    // ===== VIEWER OPTION CONTROLS =====
    function initViewerControls() {
        if (bgColorInput) {
            bgColorInput.addEventListener('input', applyGradientBackground);
        }
        if (bgColor2Input) {
            bgColor2Input.addEventListener('input', applyGradientBackground);
        }
        if (bgTransparentBtn) {
            bgTransparentBtn.addEventListener('click', function () {
                applyTransparentBackground();
                playClickSound();
            });
        }
        if (panoramaDropzone && panoramaFileInput) {
            panoramaDropzone.addEventListener('click', function () { panoramaFileInput.click(); });
            panoramaDropzone.addEventListener('dragover', function (e) {
                e.preventDefault();
                panoramaDropzone.classList.add('drag-over');
            });
            panoramaDropzone.addEventListener('dragleave', function () {
                panoramaDropzone.classList.remove('drag-over');
            });
            panoramaDropzone.addEventListener('drop', function (e) {
                e.preventDefault();
                panoramaDropzone.classList.remove('drag-over');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    loadPanoramaFile(e.dataTransfer.files[0]);
                }
            });
        }
        if (panoramaFileInput) {
            panoramaFileInput.addEventListener('change', function (e) {
                loadPanoramaFile(e.target.files[0]);
            });
        }
        if (nametagInput) {
            nametagInput.addEventListener('input', function () {
                if (!viewer) return;
                try { viewer.nameTag = nametagInput.value.trim() || null; } catch (e) { /* ignore */ }
            });
        }
        if (earsColorInput) {
            earsColorInput.addEventListener('input', function () {
                earsColor = earsColorInput.value;
                applyEarsColor();
            });
        }
        if (earsColorResetBtn) {
            earsColorResetBtn.addEventListener('click', function () {
                earsColor = '#ffffff';
                if (earsColorInput) earsColorInput.value = earsColor;
                applyEarsColor();
                playClickSound();
            });
        }
        if (layerToggleBtn) layerToggleBtn.addEventListener('click', toggleLayer);
        if (earsToggleBtn) earsToggleBtn.addEventListener('click', toggleEars);
        if (headOnlyBtn) {
            headOnlyBtn.addEventListener('click', function () {
                setHeadOnly(!headOnlyMode);
                playClickSound();
            });
        }
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', function () {
                if (!viewer) return;
                viewer.autoRotate = !viewer.autoRotate;
                updateToggleButton(autoRotateBtn, viewer.autoRotate, lang === 'de' ? 'Auto-Rotation: An' : 'Auto-Rotate: On', lang === 'de' ? 'Auto-Rotation: Aus' : 'Auto-Rotate: Off');
                playClickSound();
            });
        }
        if (lockRotationBtn) lockRotationBtn.addEventListener('click', toggleRotationLock);
        if (zoomRange) {
            zoomRange.addEventListener('input', function () {
                if (viewer) viewer.zoom = parseFloat(zoomRange.value);
            });
        }
        if (modelSelect) {
            modelSelect.addEventListener('change', function () {
                currentModel = modelSelect.value;
                loadSkinIntoViewer(currentSkinUrl, currentModel).catch(function () {});
            });
        }
        if (lookupBtn) lookupBtn.addEventListener('click', lookupPlayer);
        if (usernameInput) {
            usernameInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') lookupPlayer();
            });
        }
    }

    // ===== SCENE LIGHTING (light intensity + sun position) =====
    var SUN_RADIUS = 45;
    // Sliders are 0-300%; 100% maps to these baseline values (the previous
    // fixed defaults), so "300%" means "3x the normal light".
    var LIGHT_AMBIENT_BASE = 3;
    var LIGHT_DIRECTIONAL_BASE = 2.2;
    var LIGHT_HEIGHT_BASE = 35;
    var currentSunHeight = LIGHT_HEIGHT_BASE;
    var currentSunNormX = 0;
    var currentSunNormY = 0.3;

    function applySunFromPad(normX, normY) {
        if (!viewer || !viewer.cameraLight) return;
        currentSunNormX = normX;
        currentSunNormY = normY;
        var x = normX * SUN_RADIUS;
        var z = normY * SUN_RADIUS;
        viewer.cameraLight.position.set(x, currentSunHeight, z);
        if (sunPositionDot) {
            sunPositionDot.style.left = (50 + normX * 50) + '%';
            sunPositionDot.style.top = (50 + normY * 50) + '%';
        }
    }

    function initSceneLighting() {
        if (viewer && viewer.cameraLight && viewer.scene) {
            // cameraLight is a child of the camera by default (a "headlamp" that
            // rotates with every orbit drag), so a manually set position is only
            // ever relative to the camera, not a fixed sun. Move it into the
            // scene so the sun-position pad controls a real world-space light.
            viewer.scene.add(viewer.cameraLight);
            // Its physically-correct inverse-square decay makes it nearly
            // invisible at the distance used here, which is also why the
            // intensity/color sliders barely showed any effect - disable decay
            // so intensity and color changes are actually visible.
            viewer.cameraLight.decay = 0;
        }
        if (lightIntensityRange) {
            lightIntensityRange.addEventListener('input', function () {
                var pct = parseFloat(lightIntensityRange.value);
                if (lightIntensityValue) lightIntensityValue.textContent = pct + '%';
                applyLightIntensities();
            });
            applyLightIntensities();
        }
        if (lightIntensity2Range) {
            lightIntensity2Range.addEventListener('input', function () {
                var pct = parseFloat(lightIntensity2Range.value);
                if (lightIntensity2Value) lightIntensity2Value.textContent = pct + '%';
                applyLightIntensities();
            });
            applyLightIntensities();
        }
        if (lightColorInput) {
            lightColorInput.addEventListener('input', function () {
                if (viewer && viewer.cameraLight && viewer.cameraLight.color) {
                    viewer.cameraLight.color.set(lightColorInput.value);
                }
            });
        }
        // Shadows section (Eigenschatten/Bodenschatten/Kanten auflösen + Stärke): the
        // real toggles live in the PBR module (it owns the renderer/scene/lights), so
        // this just forwards to window.setShading etc., guarded in case the PBR layer
        // hasn't finished loading yet.
        if (shadingCheckbox) {
            shadingCheckbox.addEventListener('change', function () {
                if (window.setShading) window.setShading(shadingCheckbox.checked);
            });
        }
        if (groundShadowCheckbox) {
            groundShadowCheckbox.addEventListener('change', function () {
                if (window.setGroundShadowVisible) window.setGroundShadowVisible(groundShadowCheckbox.checked);
            });
        }
        if (dissolveEdgesCheckbox) {
            dissolveEdgesCheckbox.addEventListener('change', function () {
                dissolveEdgesEnabled = dissolveEdgesCheckbox.checked;
                rebuildOutlineMeshes();
            });
        }
        if (shadowIntensityRange) {
            shadowIntensityRange.addEventListener('input', function () {
                var pct = parseFloat(shadowIntensityRange.value);
                if (shadowIntensityValue) shadowIntensityValue.textContent = pct + '%';
                if (window.setShadowIntensity) window.setShadowIntensity(pct);
            });
        }
        if (lightHeightRange) {
            lightHeightRange.addEventListener('input', function () {
                var pct = parseFloat(lightHeightRange.value);
                if (lightHeightValue) lightHeightValue.textContent = pct + '%';
                currentSunHeight = (pct / 100) * LIGHT_HEIGHT_BASE;
                applySunFromPad(currentSunNormX, currentSunNormY);
            });
        }

        if (sunPositionPad) {
            var handlePad = function (clientX, clientY) {
                var rect = sunPositionPad.getBoundingClientRect();
                var normX = ((clientX - rect.left) / rect.width) * 2 - 1;
                var normY = ((clientY - rect.top) / rect.height) * 2 - 1;
                normX = Math.max(-1, Math.min(1, normX));
                normY = Math.max(-1, Math.min(1, normY));
                applySunFromPad(normX, normY);
            };

            var dragging = false;
            sunPositionPad.addEventListener('pointerdown', function (e) {
                dragging = true;
                sunPositionPad.setPointerCapture(e.pointerId);
                handlePad(e.clientX, e.clientY);
            });
            sunPositionPad.addEventListener('pointermove', function (e) {
                if (!dragging) return;
                handlePad(e.clientX, e.clientY);
            });
            sunPositionPad.addEventListener('pointerup', function () { dragging = false; });
            sunPositionPad.addEventListener('pointercancel', function () { dragging = false; });

            // Positive normY moves the light toward +Z, the camera's side (see
            // handlePad above) - start it slightly toward the camera/front so
            // the default view is actually lit instead of mostly backlit.
            applySunFromPad(0, 0.3);
        }

        applyGradientBackground();
    }

    // ===== EXPORT =====
    function triggerBlobDownload(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    function downloadCurrentView() {
        if (!viewer || !viewer.canvas) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Viewer nicht bereit' : 'Viewer not ready', 'error');
            return;
        }
        try {
            viewer.canvas.toBlob(function (blob) {
                if (!blob) {
                    showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bild konnte nicht erstellt werden' : 'Image could not be created', 'error');
                    return;
                }
                triggerBlobDownload(blob, 'minecraft-skin-render.png');
                saveRenderBlob(blob).then(renderMyRendersGrid);
                showToast(lang === 'de' ? 'Download gestartet' : 'Download started', 'minecraft-skin-render.png', 'success');
            }, 'image/png');
        } catch (e) {
            console.error(e);
            showToast(lang === 'de' ? 'Fehler' : 'Error', (lang === 'de' ? 'Export nicht möglich: ' : 'Export not possible: ') + e.message, 'error');
        }
    }

    function saveCurrentViewToGallery() {
        if (!viewer || !viewer.canvas) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Viewer nicht bereit' : 'Viewer not ready', 'error');
            return;
        }
        try {
            viewer.canvas.toBlob(function (blob) {
                if (!blob) {
                    showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bild konnte nicht erstellt werden' : 'Image could not be created', 'error');
                    return;
                }
                saveRenderBlob(blob).then(function () {
                    renderMyRendersGrid();
                    showToast(lang === 'de' ? 'Gespeichert' : 'Saved', lang === 'de' ? 'In "Meine Renders" abgelegt' : 'Added to "My Renders"', 'success');
                });
            }, 'image/png');
        } catch (e) {
            console.error(e);
            showToast(lang === 'de' ? 'Fehler' : 'Error', (lang === 'de' ? 'Speichern nicht möglich: ' : 'Could not save: ') + e.message, 'error');
        }
    }

    function downloadAngleSheet() {
        if (!viewer || !viewer.canvas || !viewer.playerObject) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Viewer nicht bereit' : 'Viewer not ready', 'error');
            return;
        }
        // Evenly-spaced 90° turntable, now that more angle presets exist to pick from.
        var angles = ['front', 'side', 'back', 'sideLeft'];
        var w = viewer.canvas.width;
        var h = viewer.canvas.height;
        var sheet = document.createElement('canvas');
        sheet.width = w * 2;
        sheet.height = h * 2;
        var ctx = sheet.getContext('2d');

        var wasAutoRotate = viewer.autoRotate;
        var prevY = viewer.playerObject.rotation.y;
        var prevZoom = viewer.zoom;
        viewer.autoRotate = false;

        angles.forEach(function (name, i) {
            viewer.playerObject.rotation.y = ANGLE_ROTATION_Y[name] || 0;
            if (typeof viewer.render === 'function') {
                try { viewer.render(); } catch (e) { /* ignore */ }
            }
            var x = (i % 2) * w;
            var y = Math.floor(i / 2) * h;
            ctx.drawImage(viewer.canvas, x, y, w, h);
        });

        viewer.playerObject.rotation.y = prevY;
        viewer.autoRotate = wasAutoRotate;
        viewer.zoom = prevZoom;
        applyAnglePreset(currentAngle);

        sheet.toBlob(function (blob) {
            if (!blob) {
                showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Bild konnte nicht erstellt werden' : 'Image could not be created', 'error');
                return;
            }
            triggerBlobDownload(blob, 'minecraft-skin-render-sheet.png');
            saveRenderBlob(blob).then(renderMyRendersGrid);
            showToast(lang === 'de' ? 'Download gestartet' : 'Download started', 'minecraft-skin-render-sheet.png', 'success');
        }, 'image/png');
    }

    // One loop of each built-in animation, in skinview3d progress units
    // (progress grows by seconds * speed; the poses are pure functions of it).
    var GIF_LOOPS = {
        idle: { length: Math.PI },
        walk: { length: Math.PI / 4 },
        run: { length: 2 * Math.PI / 15 },
        crouch: { length: 0.25 },
        wave: { length: 2 },
        // Arms repeat every 1.3, legs every 12/13: five arm cycles line both up.
        // The first cycle is the dive-in, so it is played before recording.
        swim: { length: 6.5, warmup: 1.3 },
        // Not a loop: the glide into the flying pose, which is then held.
        fly: { length: 1.5, hold: 2000 }
    };
    var GIF_MAX_FRAMES = 90;
    var GIF_MIN_DELAY = 30;

    function activeAnimationKey() {
        var btn = posePresetRow && posePresetRow.querySelector('button.active');
        var key = btn ? btn.dataset.pose : null;
        return viewer.animation && GIF_LOOPS[key] ? key : null;
    }

    // Records the running animation frame by frame at its on-screen speed.
    function captureAnimationFrames(gif, key) {
        var anim = viewer.animation;
        var player = viewer.playerObject;
        var loop = GIF_LOOPS[key];
        var ms = loop.length / (anim.speed || 1) * 1000;
        // GIF delays are whole centiseconds, so pick the delay first and fit the frames to it.
        var delay = Math.max(GIF_MIN_DELAY, Math.ceil(ms / GIF_MAX_FRAMES / 10) * 10);
        var frames = Math.max(2, Math.round(ms / delay));
        var step = loop.length / (loop.hold ? frames - 1 : frames);
        var start = loop.warmup || 0;
        var savedProgress = anim.progress;
        anim.progress = 0;
        anim.update(player, 0);
        for (var p = 0; p < start; p += 0.02) {
            anim.progress = p;
            anim.update(player, 0);
        }
        for (var i = 0; i < frames; i++) {
            anim.progress = start + i * step;
            anim.update(player, 0);
            viewer.render();
            gif.addFrame(viewer.canvas, { copy: true, delay: loop.hold && i === frames - 1 ? loop.hold : delay });
        }
        anim.progress = savedProgress;
        anim.update(player, 0);
    }

    // A still pose turns once around; the camera stays where it is.
    function captureTurntableFrames(gif) {
        var wrapper = viewer.playerWrapper;
        var startY = wrapper.rotation.y;
        var frames = 36;
        for (var i = 0; i < frames; i++) {
            wrapper.rotation.y = startY + i * 2 * Math.PI / frames;
            viewer.render();
            gif.addFrame(viewer.canvas, { copy: true, delay: 80 });
        }
        wrapper.rotation.y = startY;
    }

    // Exports what the viewer shows: the active animation, or the current pose turning.
    function downloadAnimationGif() {
        if (!viewer || !viewer.canvas || !viewer.playerObject) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Viewer nicht bereit' : 'Viewer not ready', 'error');
            return;
        }
        if (typeof window.GIF !== 'function') {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'GIF-Encoder nicht verfügbar' : 'GIF encoder not available', 'error');
            return;
        }
        if (!downloadGifBtn || downloadGifBtn.disabled) return;

        var key = activeAnimationKey();
        var fileName = 'minecraft-skin-' + (key || 'pose') + '.gif';
        var w = viewer.canvas.width;
        var h = viewer.canvas.height;
        var wasAutoRotate = viewer.autoRotate;
        viewer.autoRotate = false;

        var originalBtnHtml = downloadGifBtn.innerHTML;
        downloadGifBtn.disabled = true;
        downloadGifBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (lang === 'de' ? 'Animation wird aufgenommen...' : 'Recording animation...');

        var gif = new GIF({
            workers: 2,
            quality: 10,
            width: w,
            height: h,
            workerScript: '/assets/JS/vendor/gif/gif.worker.js'
        });

        // Frames are taken synchronously, so the viewer's own loop cannot move the model in between.
        try {
            if (key) captureAnimationFrames(gif, key);
            else captureTurntableFrames(gif);
        } finally {
            viewer.autoRotate = wasAutoRotate;
        }

        gif.on('progress', function (p) {
            downloadGifBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (lang === 'de' ? 'GIF wird erstellt... ' : 'Building GIF... ') + Math.round(p * 100) + '%';
        });

        gif.on('finished', function (blob) {
            downloadGifBtn.disabled = false;
            downloadGifBtn.innerHTML = originalBtnHtml;
            triggerBlobDownload(blob, fileName);
            saveRenderBlob(blob).then(renderMyRendersGrid);
            showToast(lang === 'de' ? 'Download gestartet' : 'Download started', fileName, 'success');
        });

        gif.render();
    }

    // ===== MY RENDERS (personal gallery, saved in-browser via IndexedDB) =====
    var RENDERS_DB_NAME = 'mc-craft-skin-poser';
    var RENDERS_STORE = 'renders';
    var RENDERS_MAX = 30;

    function openRendersDB() {
        return new Promise(function (resolve, reject) {
            if (!window.indexedDB) { reject(new Error(lang === 'de' ? 'IndexedDB nicht verfügbar' : 'IndexedDB not available')); return; }
            var req = indexedDB.open(RENDERS_DB_NAME, 1);
            req.onupgradeneeded = function () {
                var db = req.result;
                if (!db.objectStoreNames.contains(RENDERS_STORE)) {
                    db.createObjectStore(RENDERS_STORE, { keyPath: 'id', autoIncrement: true });
                }
            };
            req.onsuccess = function () { resolve(req.result); };
            req.onerror = function () { reject(req.error); };
        });
    }

    function pruneOldRenders(db) {
        var tx = db.transaction(RENDERS_STORE, 'readwrite');
        var store = tx.objectStore(RENDERS_STORE);
        var req = store.getAllKeys();
        req.onsuccess = function () {
            var keys = req.result;
            if (keys.length <= RENDERS_MAX) return;
            keys.sort(function (a, b) { return a - b; });
            keys.slice(0, keys.length - RENDERS_MAX).forEach(function (k) { store.delete(k); });
        };
    }

    function saveRenderBlob(blob) {
        return openRendersDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(RENDERS_STORE, 'readwrite');
                tx.objectStore(RENDERS_STORE).add({ blob: blob, createdAt: Date.now() });
                tx.oncomplete = function () { pruneOldRenders(db); resolve(); };
                tx.onerror = function () { reject(tx.error); };
            });
        }).catch(function (e) { console.warn('Render could not be saved locally:', e); });
    }

    function getAllRenders() {
        return openRendersDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(RENDERS_STORE, 'readonly');
                var req = tx.objectStore(RENDERS_STORE).getAll();
                req.onsuccess = function () {
                    resolve(req.result.sort(function (a, b) { return b.createdAt - a.createdAt; }));
                };
                req.onerror = function () { reject(req.error); };
            });
        });
    }

    function deleteRender(id) {
        return openRendersDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(RENDERS_STORE, 'readwrite');
                tx.objectStore(RENDERS_STORE).delete(id);
                tx.oncomplete = function () { resolve(); };
                tx.onerror = function () { reject(tx.error); };
            });
        });
    }

    function clearAllRenders() {
        return openRendersDB().then(function (db) {
            return new Promise(function (resolve, reject) {
                var tx = db.transaction(RENDERS_STORE, 'readwrite');
                tx.objectStore(RENDERS_STORE).clear();
                tx.oncomplete = function () { resolve(); };
                tx.onerror = function () { reject(tx.error); };
            });
        });
    }

    function renderMyRendersGrid() {
        var grid = document.getElementById('myRendersGrid');
        var emptyMsg = document.getElementById('myRendersEmpty');
        if (!grid) return;
        getAllRenders().then(function (records) {
            grid.innerHTML = '';
            if (!records.length) {
                if (emptyMsg) emptyMsg.style.display = '';
                return;
            }
            if (emptyMsg) emptyMsg.style.display = 'none';
            var frag = document.createDocumentFragment();
            records.forEach(function (record) {
                var item = document.createElement('div');
                item.className = 'my-render-item';

                var img = document.createElement('img');
                img.src = URL.createObjectURL(record.blob);
                img.alt = lang === 'de' ? 'Gespeicherter Render' : 'Saved render';
                item.appendChild(img);

                var actions = document.createElement('div');
                actions.className = 'my-render-actions';

                var downloadBtn = document.createElement('button');
                downloadBtn.className = 'btn btn-outline';
                downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
                downloadBtn.title = lang === 'de' ? 'Herunterladen' : 'Download';
                downloadBtn.addEventListener('click', function () {
                    triggerBlobDownload(record.blob, 'minecraft-skin-render-' + record.id + '.png');
                });
                actions.appendChild(downloadBtn);

                var deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-outline';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.title = lang === 'de' ? 'Löschen' : 'Delete';
                deleteBtn.addEventListener('click', function () {
                    deleteRender(record.id).then(renderMyRendersGrid);
                    playClickSound();
                });
                actions.appendChild(deleteBtn);

                item.appendChild(actions);
                frag.appendChild(item);
            });
            grid.appendChild(frag);
        }).catch(function () { /* IndexedDB unavailable - leave empty state */ });
    }

    function downloadAllRenders() {
        getAllRenders().then(function (records) {
            if (!records.length) {
                showToast(lang === 'de' ? 'Hinweis' : 'Note', lang === 'de' ? 'Keine gespeicherten Renders vorhanden' : 'No saved renders yet', 'info');
                return;
            }
            records.forEach(function (record, i) {
                setTimeout(function () {
                    triggerBlobDownload(record.blob, 'minecraft-skin-render-' + record.id + '.png');
                }, i * 300);
            });
            showToast(lang === 'de' ? 'Download gestartet' : 'Download started', records.length + (lang === 'de' ? ' Bilder' : ' images'), 'success');
        });
    }

    function initMyRenders() {
        renderMyRendersGrid();
        var clearBtn = document.getElementById('clearRendersBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                clearAllRenders().then(renderMyRendersGrid);
                playClickSound();
            });
        }
        var downloadAllBtn = document.getElementById('downloadAllRendersBtn');
        if (downloadAllBtn) {
            downloadAllBtn.addEventListener('click', function () {
                downloadAllRenders();
                playClickSound();
            });
        }
    }

    // ===== EXAMPLE GALLERY (curated, static manifest) =====
    function initExampleGallery() {
        var grid = document.getElementById('exampleGalleryGrid');
        var emptyMsg = document.getElementById('exampleGalleryEmpty');
        if (!grid) return;
        fetch('/assets/img/skin-poser-gallery/manifest.json')
            .then(function (res) { return res.ok ? res.json() : { images: [] }; })
            .then(function (data) {
                var images = (data && data.images) || [];
                if (!images.length) return;
                if (emptyMsg) emptyMsg.style.display = 'none';
                var frag = document.createDocumentFragment();
                images.forEach(function (item) {
                    var fig = document.createElement('figure');
                    fig.className = 'example-gallery-item';
                    var img = document.createElement('img');
                    img.src = '/assets/img/skin-poser-gallery/' + item.file;
                    img.alt = item['caption_' + lang] || item.caption_de || item.file;
                    img.loading = 'lazy';
                    fig.appendChild(img);
                    if (item['caption_' + lang] || item.caption_de) {
                        var figcap = document.createElement('figcaption');
                        figcap.textContent = item['caption_' + lang] || item.caption_de;
                        fig.appendChild(figcap);
                    }
                    frag.appendChild(fig);
                });
                grid.appendChild(frag);
            })
            .catch(function () { /* manifest missing/unreachable - leave empty state */ });
    }

    // ===== BACKGROUND GALLERY (curated preset panoramas) =====
    function initBackgroundGallery() {
        var grid = document.getElementById('bgPresetGrid');
        if (!grid) return;
        fetch('/assets/img/skin-poser-backgrounds/manifest.json')
            .then(function (res) { return res.ok ? res.json() : { images: [] }; })
            .then(function (data) {
                var images = (data && data.images) || [];
                var frag = document.createDocumentFragment();
                images.forEach(function (item) {
                    var url = '/assets/img/skin-poser-backgrounds/' + item.file;
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'bg-preset-item';
                    var img = document.createElement('img');
                    img.src = url;
                    img.alt = item['caption_' + lang] || item.caption_de || item.file;
                    img.loading = 'lazy';
                    btn.appendChild(img);
                    btn.addEventListener('click', function () {
                        if (!viewer) return;
                        transparentBg = false;
                        applyVignette();
                        if (canvasWrapper) canvasWrapper.classList.remove('bg-checkerboard');
                        try { viewer.loadPanorama(url); } catch (e) { /* ignore */ }
                        grid.querySelectorAll('.bg-preset-item').forEach(function (b) { b.classList.remove('active'); });
                        btn.classList.add('active');
                        playClickSound();
                    });
                    frag.appendChild(btn);
                });
                grid.appendChild(frag);
            })
            .catch(function () { /* manifest missing/unreachable - leave grid empty */ });
    }

    async function downloadTexture(url, filenameSuffix) {
        if (!url) {
            showToast(lang === 'de' ? 'Fehler' : 'Error', lang === 'de' ? 'Zuerst einen Skin/Cape laden' : 'Load a skin/cape first', 'error');
            return;
        }
        try {
            var response = await fetch(url);
            if (!response.ok) throw new Error(lang === 'de' ? 'Datei konnte nicht geladen werden' : 'File could not be loaded');
            var blob = await response.blob();
            triggerBlobDownload(blob, 'minecraft-' + filenameSuffix + '.png');
            showToast(lang === 'de' ? 'Download gestartet' : 'Download started', '', 'success');
        } catch (error) {
            console.error(error);
            showToast(lang === 'de' ? 'Fehler' : 'Error', error.message, 'error');
        }
    }

    function initExportControls() {
        if (downloadViewBtn) downloadViewBtn.addEventListener('click', downloadCurrentView);
        if (saveViewBtn) saveViewBtn.addEventListener('click', saveCurrentViewToGallery);
        if (downloadSheetBtn) downloadSheetBtn.addEventListener('click', downloadAngleSheet);
        if (downloadGifBtn) downloadGifBtn.addEventListener('click', downloadAnimationGif);
        if (downloadSkinBtn) downloadSkinBtn.addEventListener('click', function () { downloadTexture(currentSkinUrl, 'skin'); });
        if (downloadCapeBtn) downloadCapeBtn.addEventListener('click', function () { downloadTexture(currentCapeUrl, 'cape'); });
    }

    // ===== LOADER / SPLASH SYNC =====
    var LOADER_TEXTS = [
        lang === 'de' ? '3D Skin-Poser wird geladen...' : 'Loading 3D Skin Poser...',
        lang === 'de' ? '3D-Renderer wird initialisiert...' : 'Initializing 3D renderer...',
        lang === 'de' ? 'Standard-Skin wird geladen...' : 'Loading default skin...',
        lang === 'de' ? 'Fast fertig...' : 'Almost done...'
    ];

    function waitForSplashGone(callback) {
        if (!document.getElementById('mcSplashOverlay')) {
            callback();
            return;
        }
        var observer = new MutationObserver(function () {
            if (!document.getElementById('mcSplashOverlay')) {
                observer.disconnect();
                callback();
            }
        });
        observer.observe(document.body, { childList: true });
    }

    function runLoaderAnimation() {
        waitForSplashGone(function () {
                            playLevelUpSound();
                            showToast(lang === 'de' ? '3D Skin-Poser geladen!' : '3D Skin Poser loaded!', lang === 'de' ? 'Viel Spaß beim Posieren' : 'Have fun posing');
                        });
    }

    // ===== SETTINGS TABS (Skin/Posen/Look/Licht/Kamera) =====
    function initSettingsTabs() {
        var tabRow = document.getElementById('settingsTabRow');
        if (!tabRow) return;
        var tabs = tabRow.querySelectorAll('.poser-settings-tab');
        var panels = document.querySelectorAll('.poser-settings-panel');
        tabRow.addEventListener('click', function (e) {
            var btn = e.target.closest('.poser-settings-tab');
            if (!btn) return;
            var key = btn.dataset.panel;
            tabs.forEach(function (t) { t.classList.toggle('active', t === btn); });
            panels.forEach(function (p) { p.hidden = p.dataset.panel !== key; });
            playClickSound();
        });
    }

    // ===== STICKY VIEWER (JS-driven, see CSS comment on .poser-viewer-col for why) =====
    function initStickyViewer() {
        var viewerCol = document.querySelector('.poser-viewer-col');
        var layout = document.querySelector('.poser-layout');
        if (!viewerCol || !layout) return;

        var TOP_OFFSET = 86;
        var placeholder = document.createElement('div');
        placeholder.style.display = 'none';
        layout.insertBefore(placeholder, viewerCol);

        var mode = 'static'; // 'static' | 'fixed' | 'bottom'

        function isDesktopLayout() {
            return window.innerWidth > 992;
        }

        function reset() {
            mode = 'static';
            viewerCol.style.position = '';
            viewerCol.style.top = '';
            viewerCol.style.left = '';
            viewerCol.style.width = '';
            placeholder.style.display = 'none';
        }

        function update() {
            if (!isDesktopLayout()) {
                if (mode !== 'static') reset();
                return;
            }

            var layoutRect = layout.getBoundingClientRect();
            var viewerHeight = viewerCol.offsetHeight;
            var slotRect = mode === 'static' ? viewerCol.getBoundingClientRect() : placeholder.getBoundingClientRect();
            var naturalTop = slotRect.top;
            var spaceBelow = layoutRect.bottom - TOP_OFFSET - viewerHeight;

            if (naturalTop <= TOP_OFFSET && spaceBelow > 0) {
                if (mode !== 'fixed') {
                    placeholder.style.width = slotRect.width + 'px';
                    placeholder.style.height = viewerHeight + 'px';
                    placeholder.style.display = 'block';
                }
                mode = 'fixed';
                viewerCol.style.position = 'fixed';
                viewerCol.style.top = TOP_OFFSET + 'px';
                viewerCol.style.left = slotRect.left + 'px';
                viewerCol.style.width = slotRect.width + 'px';
            } else if (naturalTop <= TOP_OFFSET && spaceBelow <= 0) {
                if (mode !== 'bottom') {
                    placeholder.style.width = slotRect.width + 'px';
                    placeholder.style.height = viewerHeight + 'px';
                    placeholder.style.display = 'block';
                }
                mode = 'bottom';
                viewerCol.style.position = 'absolute';
                viewerCol.style.top = (layout.offsetHeight - viewerHeight) + 'px';
                viewerCol.style.left = '0';
                viewerCol.style.width = slotRect.width + 'px';
            } else if (mode !== 'static') {
                reset();
            }
        }

        var ticking = false;
        function onScrollOrResize() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                update();
                ticking = false;
            });
        }

        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
        update();
    }

    // ===== INIT =====
    function init() {
        initSkinViewer();
        buildLimbSliders();
        initUpload();
        initBackEquipmentToggle();
        initAnglePresets();
        initPosePresets();
        initViewerControls();
        initExportControls();
        initSceneLighting();
        initLookControls();
        initFramingPresets();
        initCameraReadout();
        initPartClickSelect();
        initMyRenders();
        initExampleGallery();
        initBackgroundGallery();
        initSettingsTabs();
        initPartVisibility();
        initStickyViewer();
        runLoaderAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
