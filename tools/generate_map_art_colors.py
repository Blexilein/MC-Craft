# Generates assets/JS/map-art/block-colors.json from the site's own items
# database (assets/JS/items/de_*.json) and block render images
# (assets/img/blocks/*.png|gif). Re-run whenever new blocks are added to the
# items database, so the Map-Art-Generator tool picks them up automatically.
# Requires Pillow (pip install Pillow). Run from anywhere: python3 tools/generate_map_art_colors.py
import json, glob, os, re
from PIL import Image

# ===== version ordering (for the "only blocks up to version X" picker) =====
# Tiers keep chronological eras from mixing up regardless of raw numbers
# (e.g. year-based "26.3" naming must sort after "1.21.x", not before it).
_VERSION_TIERS = [
    (re.compile(r'^Klassisch$'), 0),
    (re.compile(r'Alpha\s+(\d+)\.(\d+)(?:\.(\d+))?'), 1000),
    (re.compile(r'Beta\s+(\d+)\.(\d+)(?:\.(\d+))?'), 2000),
    (re.compile(r'Java Edition\s+(\d+)\.(\d+)(?:\.(\d+))?'), 3000),
]

def version_order(label):
    if not label:
        return 999999  # unknown -> treat as newest/uncertain
    label = label.split('/')[0].strip()  # "Java Edition X / Bedrock Edition Y" -> take Java part
    for pattern, base in _VERSION_TIERS:
        m = pattern.search(label)
        if m:
            if not m.groups():
                return base
            major = int(m.group(1))
            minor = int(m.group(2) or 0)
            patch = int(m.group(3) or 0)
            return base + major * 10000 + minor * 100 + patch
    return 999999

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(REPO)

# Filtering here is purely shape/appearance-based (non-full-cube, decorative,
# no meaningful render) — survival-obtainability is NOT a criterion. Creative-
# /command-only blocks (barrier, light, spawner, command blocks, structure
# void, jigsaw, structure/test blocks, ...) are intentionally full members of
# the palette: the block-selection picker already lets users opt out of them.
EXACT_DENY = {
    # truly no meaningful appearance at all (not even a "GM item" render) -> stays out
    'air', 'cave_air', 'void_air', 'fire', 'soul_fire', 'web', 'cobweb',
    'moving_piston',
    # flora / thin plants / non-full decoration (curated, best-effort)
    'dandelion', 'poppy', 'blue_orchid', 'allium', 'azure_bluet', 'red_tulip',
    'orange_tulip', 'white_tulip', 'pink_tulip', 'oxeye_daisy', 'cornflower',
    'lily_of_the_valley', 'wither_rose', 'torchflower', 'pitcher_plant',
    'sunflower', 'lilac', 'rose_bush', 'peony', 'tall_grass', 'large_fern',
    'short_grass', 'grass', 'fern', 'dead_bush', 'vine', 'glow_lichen',
    'hanging_roots', 'small_dripleaf', 'big_dripleaf', 'sea_pickle',
    'kelp', 'kelp_plant', 'seagrass', 'tall_seagrass', 'sugar_cane', 'bamboo',
    'bamboo_sapling', 'cactus', 'nether_wart', 'sweet_berry_bush',
    'chorus_flower', 'chorus_plant', 'cocoa', 'crimson_fungus', 'warped_fungus',
    'crimson_roots', 'warped_roots', 'weeping_vines', 'weeping_vines_plant',
    'twisting_vines', 'twisting_vines_plant', 'nether_sprouts', 'spore_blossom',
    'azalea', 'flowering_azalea', 'lily_pad', 'flower_pot', 'end_rod',
    'lightning_rod', 'scaffolding', 'tripwire', 'tripwire_hook',
    'tube_coral', 'brain_coral', 'bubble_coral', 'fire_coral', 'horn_coral',
    'dead_tube_coral', 'dead_brain_coral', 'dead_bubble_coral', 'dead_fire_coral',
    'dead_horn_coral', 'bell', 'lever', 'redstone_wire', 'redstone_torch',
    'redstone_wall_torch', 'repeater', 'comparator', 'observer_target',
    'conduit', 'turtle_egg', 'sniffer_egg', 'frogspawn', 'pointed_dripstone',
    'ladder', 'string', 'iron_bars',
    # bare/unprefixed forms that suffix matching can't catch (need leading "_")
    'torch', 'candle', 'chain', 'rail', 'bush', 'cauldron', 'skull', 'sign',
    'banner', 'button', 'wall', 'fence', 'anvil', 'chipped_anvil',
    'damaged_anvil', 'brewing_stand', 'lectern', 'grindstone',
    'daylight_detector', 'end_portal_frame', 'mangrove_propagule',
    'closed_eyeblossom', 'open_eyeblossom', 'amethyst_cluster',
    'shelf_mushroom',
    'sulfur_spike', 'wildflowers', 'leaf_litter', 'pink_petals',
    'pitcher_pod', 'glow_berries', 'cocoa_beans', 'sweet_berries',
    'cactus_flower', 'campfire', 'soul_campfire',
}
SUFFIX_DENY = (
    '_slab', '_stairs', '_door', '_trapdoor', '_button',
    '_pressure_plate', '_sign', '_hanging_sign', '_banner', '_fence',
    '_fence_gate', '_wall', '_rail', '_bed', '_torch', '_wall_torch',
    '_candle', '_candle_cake', '_lantern', '_chain', '_head', '_skull',
    '_pane', '_sapling', '_fan', '_wall_fan', '_pot', '_egg', '_button',
    '_bush', '_golem_statue', '_amethyst_bud', '_dry_grass', '_bars',
    '_seeds', '_lightning_rod',
)
# do NOT let a SUFFIX_DENY entry accidentally exclude a real full block
SUFFIX_ALLOWLIST_OVERRIDE = {
    'bamboo_block', 'stripped_bamboo_block', 'chiseled_bookshelf',
}

def is_denied(block_id):
    name = block_id.split(':', 1)[-1]
    if name in SUFFIX_ALLOWLIST_OVERRIDE:
        return False
    if name in EXACT_DENY:
        return True
    for suf in SUFFIX_DENY:
        if name.endswith(suf):
            return True
    return False

def clean_icon_path(icon):
    icon = (icon or '').strip()
    icon = re.sub(r'/+', '/', icon)
    icon = re.sub(r'(?<=[a-zA-Z0-9_-])png$', '.png', icon)
    icon = re.sub(r'(?<=[a-zA-Z0-9_-])gif$', '.gif', icon)
    return icon

def resolve_path(icon):
    cleaned = clean_icon_path(icon)
    candidates = [cleaned.lstrip('/'), (icon or '').strip().lstrip('/')]
    for c in candidates:
        if c and os.path.isfile(c):
            return c
    return None

# Block render images are 300x300 isometric renders (top face + two shaded
# side faces). This box samples only the top-face diamond, calibrated by
# visual inspection of Stone.png / Grass_Block.png, so side-face shading
# doesn't bias the averaged color.
CROP = (0.30, 0.08, 0.70, 0.35)  # x0,y0,x1,y1 fractions

def average_top_color(path):
    im = Image.open(path).convert('RGBA')
    w, h = im.size
    box = (int(CROP[0]*w), int(CROP[1]*h), int(CROP[2]*w), int(CROP[3]*h))
    crop = im.crop(box)
    px = crop.load()
    r = g = b = n = 0
    for yy in range(crop.height):
        for xx in range(crop.width):
            pr, pg, pb, pa = px[xx, yy]
            if pa < 16:
                continue
            r += pr; g += pg; b += pb; n += 1
    if n == 0:
        # fallback: whole image average, ignore transparent pixels
        w2, h2 = im.size
        px2 = im.load()
        r = g = b = n = 0
        for yy in range(h2):
            for xx in range(w2):
                pr, pg, pb, pa = px2[xx, yy]
                if pa < 16:
                    continue
                r += pr; g += pg; b += pb; n += 1
        if n == 0:
            return None
    return (round(r / n), round(g / n), round(b / n))

def load_en_names():
    names = {}
    for f in sorted(glob.glob('assets/JS/items/en_*.json')):
        data = json.load(open(f, encoding='utf-8'))
        for entry in data:
            bid = entry.get('id', '')
            if bid and bid not in names:
                names[bid] = entry.get('name') or ''
    return names

def main():
    en_names = load_en_names()
    files = sorted(glob.glob('assets/JS/items/de_*.json'))
    seen = {}
    for f in files:
        data = json.load(open(f, encoding='utf-8'))
        for entry in data:
            if str(entry.get('type', '')).lower() != 'block':
                continue
            bid = entry.get('id', '')
            if not bid or bid in seen:
                continue
            seen[bid] = entry

    total = len(seen)
    denied = 0
    missing_icon = 0
    decode_failed = 0
    out = []

    for bid, entry in seen.items():
        if is_denied(bid):
            denied += 1
            continue
        path = resolve_path(entry.get('icon'))
        if not path:
            missing_icon += 1
            print('MISSING ICON', bid, entry.get('icon'))
            continue
        try:
            color = average_top_color(path)
        except Exception as e:
            decode_failed += 1
            print('DECODE FAIL', bid, path, e)
            continue
        if color is None:
            decode_failed += 1
            print('NO PIXELS', bid, path)
            continue
        out.append({
            'id': bid, 'icon': '/' + path, 'r': color[0], 'g': color[1], 'b': color[2],
            'category': entry.get('category') or 'Sonstiges',
            'versionLabel': entry.get('version') or 'Unbekannt',
            'versionOrder': version_order(entry.get('version')),
            'nameDe': entry.get('name') or bid.split(':', 1)[-1],
            'nameEn': en_names.get(bid) or bid.split(':', 1)[-1],
        })

    print(f'total block-type entries (deduped): {total}')
    print(f'denied (filtered out): {denied}')
    print(f'missing icon file: {missing_icon}')
    print(f'decode failed: {decode_failed}')
    print(f'FINAL kept: {len(out)}')

    out.sort(key=lambda e: e['id'])
    outdir = 'assets/JS/map-art'
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'block-colors.json'), 'w', encoding='utf-8') as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
    print('wrote', os.path.join(outdir, 'block-colors.json'))

if __name__ == '__main__':
    main()
