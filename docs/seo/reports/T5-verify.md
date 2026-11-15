# T5 verification report (independent verifier)

Commit: `rklxqktvtnkm` "feat(seo): local business schema, contact and about pages". Build: `npm run build:astro` OK. Check: `npm run check:seo` → `33 pages, 0 failures, 0 notes`. Builder report claims reproduced.

1. PASS — Pages/twins live: curl on `dist/` → `/contact/` 200, `/despre-noi/` 200, `/contact.md` 200 (text/markdown), `/despre-noi.md` 200; twins carry name, address, phone, city (`dist/contact.md:1-19`, `dist/despre-noi.md:1-21`), same facts as the pages.
2. PASS — `src/pages/contact.astro:8-11`, `src/pages/despre-noi.astro:8-11`: 1 title, 1 description, 1 h1; 182 / 204 words of text (140 / 155 in `<main>`); "Chișinău" in title and description; "069 149 730" and "Nicolae Dimo 17/1" in the text.
3. PASS — `src/layouts/Layout.astro:123-141` LocalBusiness: name, url, logo, image (poster.webp), telephone, address (streetAddress, addressLocality Chișinău, addressCountry MD), areaServed (2), hasMap; Organization still at `:98`; `sameAs: []` at `:120`; comment `:87-92` names GBP URL, Facebook URL, email, CUI, opening hours.
4. PASS — `src/components/Footer.astro:2-5`: "© Sim Construct Grup S.R.L." kept, links `/contact/` and `/despre-noi/`; same footer built on home, /saci-pentru-legume/, both new pages.
5. PASS — `public/llms.txt:140-141` lists both; `dist/sitemap-0.xml` holds `https://saci.md/contact/` and `https://saci.md/despre-noi/`.
6. PASS — Grep of both pages + twins: no mailto, no social URL, no CUI, no year, no headcount, no hours, no delivery-time promise, no shop/showroom claim. "depozit" is pre-existing site wording (`src/lib/categories.ts:34`, `src/lib/legume.ts:32`). Uses (legume, cereale, făină, zahăr, gunoi, construcții, big bags) and "cu bucata și angro" match `content/categories/*` and `src/lib/categories.ts`.
7. PASS — `jj diff -r rklxqktvtnkm --summary`: 9 files (llms.txt, seo-check.mjs, Footer.astro, Layout.astro, 2 new pages, 2 new twins, report). None of the 17 forbidden paths touched.
8. PASS — `scripts/seo-check.mjs` diff: +93 lines, only 2 removed (a placeholder comment; `UNIVERSAL.descriptionMax` → per-route value, tighter for "/"). Scratch copy `/tmp/t5-scratch`: broken telephone → FAIL `local-business-telephone`; title without Chișinău → FAIL `title-mentions`; cut text → FAIL `min-words`+`min-prose-words`; phone dropped in page+twin → FAIL `text-mentions`+`markdown-twin-mentions`; footer link removed → FAIL `internal-link`. Restored copy: 0 failures.
9. PASS — `npm run check:seo` 0 failures; `dist/index.html` hero "Saci și Big Bag-uri … Vezi produsele" + 37 `<img>` + 12 product links; `/old/` 200 with `noindex, follow`, its source untouched.

## Findings

- F1 (low) — `src/pages/contact.astro`: no in-content link to `/despre-noi/`; the new rule `scripts/seo-check.mjs:233` passes only on the site-wide footer link (`src/components/Footer.astro:5`).
- F2 (low) — `src/layouts/Layout.astro:19` changes the home `<title>` and drops "polipropilenă și polietilenă"; the `og:title` default (`:21`) still uses the old wording, so title and og:title differ.
- F3 (info) — "depozit" wording for Nicolae Dimo 17/1 comes from the old site text; not a new claim, no shop/showroom.

VERDICT: PASS
