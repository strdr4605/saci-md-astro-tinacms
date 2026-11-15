# T7 verify — images and speed

Commits: `d1661b3` perf(seo): webp images, dimensions and lazy loading · `deaa7b1` perf(seo): remove the unused svg files.
Build: `npm run build:astro` exit 0. Check: `npm run check:seo` → `seo-check: 31 pages, 0 failures, 0 notes`.

1. **PASS** — public 20.8 MB → 3.5 MB. `git ls-tree -r -l 2cfabc6 public/` = 20,806,543 B; `git ls-tree -r -l deaa7b1 public/` = 3,239,461 B; `du -sh public/` = 3.5M.
2. **PASS** — dist image budget. Biggest non-exempt raster `dist/Plasa.webp` 158,582 B; over 250 KB only `dist/simconstructgrup_poster.jpg` 733,772 B and `dist/plasa_tubulara.jpg` 280,810 B (both exempt). Biggest PNG `dist/down_arrow.png` 1,066 B (limit 102,400 B).
3. **FAIL** — 155 `<img>` in 32 dist HTML files. alt 155/155. width+height only 75/155 (80 missing): 34 in `dist/index.html` (10 `src/components/CategoriesNavigation.astro:43,67` + 24 `src/components/CategoryProduct.astro:16`), 22 in `dist/categorie/*/index.html` (`src/pages/categorie/[slug].astro:103`), 24 in `dist/<product>/index.html` (`src/pages/[productSlug].astro:82`). `loading` only 107/155 (48 missing: 24 `dist/index.html` + 24 product pages, same two files). `loading="eager"` only 2 (`src/components/Hero.astro:4`, `src/pages/old.astro:36`).
4. **PASS** — every img src exists. Scan of all 32 dist HTML files: 155/155 local img src resolve under `dist/`; 0 dangling asset refs in html/xml/json/css/js.
5. **PASS** — home page. `dist/index.html` hero `/hero-warehouse.webp` attr 1976x796 = sharp 1976x796 webp; logo `/Logo.svg` 140x56 = sharp 140x56 svg; arrow `/arrowDown.svg` 24x25 = sharp 24x25 svg. Map = iframe `src/components/Map.astro:4`, present in `dist/index.html` `<section id="map">`. Hero/logo/map classes unchanged vs 2cfabc6. (Saci-pentru-legume has 5 wrong 224x224 attrs — pre-existing, F4.)
6. **PASS** — WebP valid. sharp reads all 15 new webp: `dist/hero-warehouse.webp` webp 1976x796, `dist/Plasa.webp` webp 1024x1024, `dist/poster.webp` webp 1024x900.
7. **PASS** — scope. `git diff --name-only 2cfabc6 deaa7b1` = 45 files, none in the forbidden list. Commit 2 touches only `public/Hero.svg`, `public/hero2.svg`, `public/poster.svg`; `git grep` at 2cfabc6 shows zero references, so the delete breaks nothing.
8. **PASS** — checker only adds rules. `git show d1661b3 -- scripts/seo-check.mjs` = +114/−7; the 7 deletions are the old `img-alt` block moved into `checkImageTags` (`scripts/seo-check.mjs:808`), rule name and condition kept. New rules bite (mutated a copy of dist/, then reverted): img-alt, img-width (`:824`), img-height (`:828`), img-exists (`:838`), image-size (`:870`), png-size (`:874`) each gave 1 failure, exit 1.
9. **PASS** — `npm run check:seo` = 0 failures. All 24 `content/products/*.md` pages still show their `imgSrc` photo; `/saci-pentru-legume/` and `/ghid/` keep their images.

## Findings

- **F1 (blocks 3)** — 48 product photos have no `width`/`height` and no `loading`. 24 come from `src/components/CategoryProduct.astro:16` and 24 from `src/pages/[productSlug].astro:82`; both files are forbidden to touch, so T7 cannot close them. Needs a plan decision, not a code fix.
- **F2 (blocks 3)** — 32 in-scope images still lack `width`/`height`: `src/components/CategoriesNavigation.astro:43,67` (10, builder touched this file) and `src/pages/categorie/[slug].astro:103` (22, untouched by the commits).
- **F3** — `scripts/seo-check.mjs:817` skips width/height for any img whose src is a content `imgSrc`, so the 80 gaps pass silently. The build report table says "Every `<img>` has a numeric width attribute"; the code does not.
- **F4 (pre-existing, not T7)** — `src/pages/saci-pentru-legume.astro:104` hardcodes 224x224 for 5 photos whose real sizes are 177x176 and 1200x1200 → wrong aspect ratio. Same in 2cfabc6.
- **F5** — `src/components/Header.astro:14` gives the above-the-fold logo `loading="lazy"`. Allowed by criterion 3, but eager fits an above-the-fold logo.
- **F6** — `public/simconstructgrup_poster.jpg` (716 KB) stays in public/ although no page loads it; only its WebP is used.

VERDICT: FAIL
