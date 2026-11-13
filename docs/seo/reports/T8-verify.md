# T8 verification report — guide article "Cum alegi saci pentru legume"

Task commit: `mtmvyvny` (cbf79028) "feat(seo): guide article about bags for vegetables". Parent: `smlrwzrs` (T1).
Read only. Build: `npm run build:astro` OK. Check: `npm run check:seo` → 31 pages, 0 failures, 0 notes.

## Criteria

1. PASS — `dist/ghid/cum-alezi-sacii-pentru-legume/index.html` + `dist/ghid/cum-alezi-sacii-pentru-legume.md`; static server on `dist` → 200 / 200; twin starts `# Cum alegi saci pentru legume în Chișinău`.
2. PASS — `src/lib/legume.ts:53` `GUIDE_H1 = "Cum alegi saci pentru legume în Chișinău"`; built `<h1>` = same, contains "saci pentru legume" and "Chișinău".
3. PASS — 1308 words in `<p>` of `<main>` (1597 incl. tables/FAQ), ≥ 700. `dist/ghid/.../index.html`.
4. PASS — `src/lib/legume.ts:62-199`. Counts in built page: cartofi 12, ceapă 11, morcov 9, roșii 7, rafie 18, polipropilenă 13, plasă 19, polietilenă 8, big bag 6, 30x34/40x58/52x72/50x80/50x100 = 6/6/7/7/7, kg 19, preț 10, "Nicolae Dimo 17/1" 4, "069 149 730" 7, "livrare în Chișinău" 3, "în Moldova" 5, angro 5.
5. PASS — 12 `<h2>` in `dist/ghid/.../index.html`; question-form: "Cum aleg mărimea sacului", "Când folosesc saci din plasă", "Cât costă sacii pentru legume", "Cum se depozitează și se refolosesc sacii" (`src/lib/legume.ts:72-139`).
6. PASS — built page links: `/saci-plasa-30x34/`, `/saci-plasa-40x58/`, `/saci-plasa-52x72/`, `/sac-polipropilena-50x80/`, `/sac-polipropilena-50x100/`, `/saci-pentru-legume/` (x2), `/categorie/polipropilena|plasa|polietilena|big-bags/`. Twin has the same 10 links.
7. PASS — `dist/ghid/.../index.html` JSON-LD `@graph`: Article (headline, datePublished 2026-11-13, author "Sim Construct Grup S.R.L."), FAQPage (5 Q), BreadcrumbList (3 items). Source `src/pages/ghid/[slug].astro:38-84`.
8. PASS — `dist/sitemap-0.xml` holds `ghid/cum-alezi-sacii-pentru-legume/`; `public/llms.txt:137`; landing page links it (`src/pages/saci-pentru-legume.astro:147`, built `dist/saci-pentru-legume/index.html`).
9. PASS — no same-day delivery, no opening hours, no retail pack, no price on page (grep: no "lei", no price block; only "seturi de câte 100 de bucăți", stated in `content/products/Sac-Polipropilena-50x100.md:11`). No bag-type ranking beyond what the categories state. All capacities trace to product files: 7 kg (`Saci-Plasa-30x34.md:9`), 20 kg (`Saci-Plasa-40x58.md:9`), 35 kg (`Saci-Plasa-52x72.md:9`), 20–30 kg (`Sac-Polipropilena-50x80.md:8`), 40 kg (`Sac-Polipropilena-50x100.md:7`), 30 kg (`Saci-Polietilena-50x80-120mk.md:9`), 500 kg (`SACI-BIB-BAGS-90X90X110.md:13`), 1 tonă (`SACI-BIB-BAGS-90X90X160.md:13`). Findings below: not-false but not stated by the site.
10. PASS — commit touches only `docs/seo/reports/T8-build.md`, `public/llms.txt`, `scripts/seo-check.mjs`, `src/lib/legume.ts`, `src/pages/ghid/[slug].astro`, `src/pages/ghid/[slug].md.ts`, `src/pages/saci-pentru-legume.astro`. None of the 11 forbidden files changed (`jj show -r mtmvyvny --stat`).
11. PASS — `jj diff -r mtmvyvny -- scripts/seo-check.mjs`: 0 removed lines, only additions (new rule types `h2Min`, `articleSchema`, `productLinks` + route block). Bite test in an isolated copy (`/tmp/t8check`, workspace untouched): rename `<h2>`→`<h3>` → FAIL h2-count; drop one product href → FAIL product-link; remove Article node → FAIL jsonld-type + article-schema; delete twin `.md` → FAIL markdown-twin-exists/mentions; remove llms.txt entry → FAIL llms-txt-mentions; replace phone → FAIL text-mentions.
12. PASS — `npm run build:astro` completed; `npm run check:seo` = 31 pages, 0 failures, 0 notes. `jj status`: working copy clean.

## Findings (no false claim found; statements the site does not state)

- `src/lib/legume.ts:121` "Sacii din plasă se spală cu jet de apă și se lasă la soare" — washing method not stated anywhere in `content/` or `src/lib/categories.ts`.
- `src/lib/legume.ts:122` "Sacii din polietilenă se curăță și se refolosesc" — reuse of polietilenă not stated on the site (only rafie "după curățare, sacii pot fi reciclați", `Sac-Polipropilena-50x100.md:11`).
- `src/lib/legume.ts:112,188` price factor "condiția de cumpărare" — site lists mărime, grosime, cantitate, tip material; no fourth factor. Also "Un sac mai mare costă mai mult" / "un material mai gros costă mai mult" — no price data exists in `content/products/*.md` (price = "la cerere"), so these are unbacked generalisations.
- `src/lib/legume.ts:88` "Plasa nu oprește apa" — true of mesh but not stated on the site.
- `src/lib/legume.ts:76` "au nevoie de saci cu fund și cu o țesătură mai groasă" — no source states plasa has no bottom or is thinner.
- `src/lib/legume.ts:86` plasa list adds "roșii" — the site lists cartofi, ceapă, morcov, ardei gras, varză, fructe (`src/lib/categories.ts:46`); roșii is not in any product or category file (already in the T1 landing copy).
- `src/lib/legume.ts:87` "sacul de 52x72 cm reduce numărul de transporturi" — inference, not stated.
- Page shows the product spec "Dimensiuni sac: 40 x 50 cm" for the 40x58 bag (from `content/products/Saci-Plasa-40x58.md:7`) next to the guide table row "40x58" — pre-existing product data, but visible on the new page.

VERDICT: PASS
