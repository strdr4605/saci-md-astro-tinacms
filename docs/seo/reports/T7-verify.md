# T7 verify — round 2

Commits: `d1661b3` + `deaa7b1` + fix `7c21738`. Build `npm run build:astro` exit 0. Check `npm run check:seo` → `31 pages, 0 failures, 0 notes`. All mutations ran on copies under /tmp; repo and repo `dist/` untouched (`git status` clean).

1. **PASS** F1 — 155 `<img>` in 32 dist HTML files: alt attribute 155/155 (29 `alt=""` on decorative arrows), width 155/155, height 155/155, loading 155/155 (153 lazy, 2 eager). Missing: 0 of each. Home 37/37, category pages 4/4 to 9/9, product pages 25/25 photos complete.
2. **FAIL** F2 map — dimensions correct: sharp read all 40 distinct img srcs of all pages, 0 mismatches (sample 27: `/hero-warehouse.webp` attr 1976x796 = file 1976x796, `/saci_plasa_30x34.jpg` attr 177x176 = file 177x176, `/Logo.svg` attr 140x56 = file 140x56). But the map does not match the files: committed `src/lib/image-sizes.json` has 48 keys, public/ holds 47 raster files. It still lists the deleted `/simconstructgrup_poster.jpg` (1011x573). Scratch run `node scripts/image-sizes.mjs` gives 47 keys; diff vs committed = 4 extra lines.
3. **PASS** F3 — scratch copy of dist/ in /tmp/t7-check, checker run there: no width → `img-width` + `img-size-matches-file` exit 1; no height → `img-height` exit 1; width 1977 → `img-size-matches-file` exit 1; height 797 → `img-size-matches-file` exit 1; no alt → `img-alt` exit 1; missing file → `img-exists` exit 1; product photo width 180 → `img-size-matches-file` on `/saci-plasa-30x34/` exit 1. Restored copy → 0 failures. Rule now covers product photos.
4. **PASS** F6 — `public/simconstructgrup_poster.jpg` deleted; absent from public/ and dist/; no page or component references it (`src/pages/old.astro:136` uses the .webp only). `dist/simconstructgrup_poster.webp` still served.
5. **PASS** pages work — check:seo 0 failures; home shows hero `/hero-warehouse.webp` (eager, fetchpriority high), logo `/Logo.svg`, 30 product photos; every product page shows its own photo with the real size; the 4 category pages show their photos.
6. **PASS** scope — `git diff --name-only 2cfabc6 HEAD` leaves untouched: src/content.config.ts, tina/config.ts, tina/tina-lock.json, content/products/*.md, src/lib/pricing.ts, src/lib/markdown.ts, src/pages/index.md.ts, src/pages/product-index.json.ts, src/pages/.well-known/ai-catalog.json.ts. CategoryProduct.astro and [productSlug].astro changed, as allowed.

## Findings

- **F7 (blocks 2)** — `src/lib/image-sizes.json` still holds `/simconstructgrup_poster.jpg`, a file deleted in the same commit. The map disagrees with its own generator, and `node scripts/image-sizes.mjs` drops the key. No page uses it, so nothing renders wrong. Fix: run the script, commit the 4 removed lines.
- F4 closed — `src/pages/saci-pentru-legume.astro` reads 177x176 and 1200x1200 from the map, not the hardcoded 224x224.
- F5 open, note — the above-the-fold logo `/Logo.svg` keeps `loading="lazy"` (`src/components/Header.astro:14`). Eager fits better.
- F3 closed — the checker no longer skips content images; it compares every img against the map.

VERDICT: FAIL
