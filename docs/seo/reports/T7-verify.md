# T7 verify — round 3

Commit `zzytkrwz` "perf(seo): refresh the image size map, eager logo" (jj `32b9448f`). Working copy clean. All mutations ran on a copy at /tmp/t7-r3; the real repo was not modified.

1. **PASS** — image-sizes map matches its generator. Scratch copy `/tmp/t7-r3`: `node scripts/image-sizes.mjs` → `image-sizes: 47 images`, exit 0. Output is byte-for-byte identical to the committed `src/lib/image-sizes.json` (diff empty, md5 `d7e00302956a1f6a36a904aa68b803c4` both sides). Diff = 0 lines. Stale key `/simconstructgrup_poster.jpg` is absent from both the committed file and the generated file. Map keys 47 = 47 raster files in `public/`; no key without a file, no file without a key.
2. **PASS** — header logo eager. `src/components/Header.astro:14` has `loading="eager"` on the `<img src="/Logo.svg" alt="Company Logo" width="140" height="56">`. F5 closed.
3. **PASS** — build and check. Scratch copy: `npm run build:astro` exit 0, "Complete!". `npm run check:seo` exit 0 → `seo-check: 31 pages, 0 failures, 0 notes`.

F7 closed. No open blocker found.

VERDICT: PASS
