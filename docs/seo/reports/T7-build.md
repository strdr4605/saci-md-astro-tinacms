# T7 build report

Task: T7 — Images and speed
Commit: `perf(seo): webp images, dimensions and lazy loading`

## Files changed

### public/

- 15 new WebP files. Each PNG above 100 KB became a WebP at quality 80.
  `cwebp -q 80` did the 14 PNG conversions. `sharp` did the JPEG conversion in
  the last row, because the source JPEG is CMYK and `cwebp` cannot read it.

| WebP | Source | Before | After |
|---|---|---|---|
| `Menajeri.webp` | `Menajeri.png` | 1,304,163 B | 25,024 B |
| `Plasa.webp` | `Plasa.png` | 1,911,161 B | 158,582 B |
| `Polietilena.webp` | `Polietilena.png` | 1,250,055 B | 18,770 B |
| `Rafie.webp` | `Rafie.png` | 1,439,646 B | 46,464 B |
| `big_bags.webp` | `big_bags.png` | 1,371,890 B | 38,242 B |
| `green2_55x95.webp` | `green2_55x95.png` | 373,523 B | 51,644 B |
| `hero.webp` | `hero.png` | 1,528,793 B | 125,562 B |
| `polietilena100micron_50x80.webp` | `polietilena100micron_50x80.png` | 1,225,419 B | 74,612 B |
| `polietilena80micron_35x65.webp` | `polietilena80micron_35x65.png` | 1,051,887 B | 61,864 B |
| `poster.webp` | `poster.png` | 842,284 B | 109,072 B |
| `red2_55x95.webp` | `red2_55x95.png` | 547,071 B | 76,484 B |
| `white1_50x100.webp` | `white1_50x100.png` | 480,435 B | 61,672 B |
| `white1_55x95.webp` | `white1_55x95.png` | 345,172 B | 38,460 B |
| `white_50x100.webp` | `white_50x100.png` | 318,210 B | 42,998 B |
| `simconstructgrup_poster.webp` | `simconstructgrup_poster.jpg` | 733,772 B | 80,008 B |

- 14 PNG files deleted. No file references them any more. The small arrow PNGs
  (`left_arrow.png`, `right_arrow.png`, `up_arrow.png`, `down_arrow.png`) stay.
  They are under 1.1 KB and are used by `/old/`.
- No JPEG file was deleted. `plasa_tubulara.jpg` stays, because
  `content/products/Plasa-tubulara.md` loads it and that file belongs to
  another task.

### src/

- `src/layouts/Layout.astro` — `og:image` and `twitter:image` now use
  `https://saci.md/poster.webp`.
- `src/pages/old.astro` — all 37 images now point to WebP or to the small
  arrow PNGs. Each image has `alt`, `width`, `height` and `loading`. The
  poster above the fold keeps `loading="eager"`.
- `src/components/Hero.astro` — the hero image has `width="1976"`,
  `height="796"` and `loading="eager"`. The arrow icon has `width="24"`,
  `height="25"` and `loading="lazy"`.
- `src/components/Header.astro` — the logo has `width="140"`, `height="56"`
  and `loading="lazy"`.
- `src/components/Mascot.astro` — the arrow icon and the mascot have
  `width`, `height` and `loading="lazy"`. The mascot sizes come from the
  import metadata.
- `src/components/CategoriesNavigation.astro` — the category preview images
  get `loading="lazy"`.

### scripts/

- `scripts/seo-check.mjs` — new T7 rules. See below.
- `scripts/tmp-t7-convert.mjs` — the one-shot conversion script of the
  previous agent. Deleted. The conversions are done and the script has no
  task left.

## public/ size

| State | Bytes | Files |
|---|---|---|
| Before the task | 20,806,543 (19.84 MiB) | 60 |
| After the task | 7,826,292 (7.46 MiB) | 61 |

The folder lost 12.38 MiB (62%). The image weight of `/old/` fell from
5.92 MB to 0.60 MB (90%).

## New checker rules

| Check | Rule |
|---|---|
| `img-alt` (moved) | The old rule now runs inside the new function. It still checks every `<img>` of every sitemap page. It now also checks the `noindex` pages and the pages outside the sitemap. |
| `img-width` | Every `<img>` has a numeric `width` attribute. |
| `img-height` | Every `<img>` has a numeric `height` attribute. |
| `img-exists` | Every local `src` of an `<img>` exists in `dist/`. |
| `image-size` | Every raster image file in `dist/` is under 250 KB. SVG is vector, so it has no size rule. |
| `png-size` | No PNG file in `dist/` is over 100 KB. |

Two groups of files stay outside the rules. Both groups are named in the
checker, so a new file cannot slip in.

1. **Product images.** The `imgSrc` values in `content/products/*.md` have
   different pixel sizes (177x176, 500x500, 1000x1000, 1200x1200). Their
   dimensions belong to the product task. `CategoryProduct.astro` and
   `[productSlug].astro` are not part of T7. The checker reads the `imgSrc`
   values from the content and does not ask for `width` and `height` on them.
   The `alt` rule still applies to them.
2. **Two JPEG files.** `plasa_tubulara.jpg` (274 KB) is loaded by the product
   page of another task. `simconstructgrup_poster.jpg` (716 KB) is the source
   JPEG. `/old/` now loads the 80 KB WebP, but the task does not allow
   deleting a JPEG.

No existing rule was removed or weakened. The `img-alt` rule keeps its name
and its condition.

## Check output

Build (`npm run build:astro`, exit 0), then check (`npm run check:seo`):

```
seo-check: 31 pages, 0 failures, 0 notes
```

Negative tests on `dist/`:

- Removed `width="1976"` from the hero image: 1 `img-width` failure.
- Renamed the hero image source: 1 `img-exists` failure.
- Added a 300 KB JPEG in `dist/`: 1 `image-size` failure.
- Added a 200 KB PNG in `dist/`: 1 `png-size` failure.

After the test files were removed: 0 failures.

## Open points

1. `public/` still holds three SVG files that no page loads: `Hero.svg`
   (1.5 MB), `hero2.svg` (1.6 MB) and `poster.svg` (1.3 MB). They are 4.4 MB
   of the 7.46 MB folder. SVG is not in the T7 scope. A later task can
   compress or delete them.
2. Six WebP files are ready but not used yet: `Plasa.webp`, `hero.webp`,
   `Rafie.webp`, `big_bags.webp`, `Menajeri.webp` and `Polietilena.webp`.
   Their PNG sources had no reference either.
3. `public/simconstructgrup_poster.jpg` (716 KB) stays in the folder. The
   page loads the WebP, so the JPEG is dead weight. The task does not allow
   deleting a JPEG.
4. The header logo gets `loading="lazy"`, because the task asks for lazy
   loading on all images except the hero. The logo is above the fold, so
   `loading="eager"` may be better for it.
