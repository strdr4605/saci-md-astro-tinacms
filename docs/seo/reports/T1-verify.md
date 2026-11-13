# T1 verification (round 4)

Task: T1 — landing page `/saci-pentru-legume/`.
Workspace: `/Users/strdr4605/P/saci-md-seo`, jj `@` = `xulnllqtnxow` (empty), parent `ylwkvvkmlsvn` (`fix(seo): landing page copy matches the product facts`), before that `rsunpwnkkvrw` (`docs(seo): the landing page links the four category pages`).
Build: `npm run build:astro` OK. Checker: `npm run check:seo` → `30 pages, 0 failures, 0 notes`.

## Criteria

1. PASS — `dist/saci-pentru-legume/index.html` and `dist/saci-pentru-legume.md` built; `src/pages/saci-pentru-legume.md.ts:12` `prerender = true`; `dist/_headers:307` `Link: </saci-pentru-legume.md>; rel="alternate"`.
2. PASS — `dist/saci-pentru-legume/index.html` `<h1 …>Saci pentru legume în Chișinău</h1>`; source `src/lib/legume.ts:19`.
3. PASS — 823 words in `<main>` (limit 300), 637 in `<p>`. All terms found: rafie 7, polipropilenă 8, plasă 6, polietilenă 4, cartofi 6, ceapă 7, morcov 6, roșii 3, each size 6, `Nicolae Dimo 17/1` 4, `069 149 730` 5, `livrare în Chișinău` 3, `Preț la cerere` 8.
4. PASS — five product links in the built HTML: `/saci-plasa-30x34/`, `/saci-plasa-40x58/`, `/saci-plasa-52x72/`, `/sac-polipropilena-50x80/`, `/sac-polipropilena-50x100/`.
5. PASS — 6 `<details>` in the FAQ block, names equal to the 6 `FAQPage` questions in the JSON-LD; source `src/lib/legume.ts:41-72`.
6. PASS — JSON-LD `@graph`: `CollectionPage`, `ItemList` (`numberOfItems: 5`, the five `saci.md/…` URLs), `FAQPage` (6 questions), `BreadcrumbList` (2 items).
7. PASS — `dist/sitemap-0.xml` holds `/saci-pentru-legume/`; `public/llms.txt:134` lists it.
8. PASS — `dist/index.html` has `href="/saci-pentru-legume/"`; each of the four `dist/categorie/*/index.html` has 1; the landing page links all four category pages (`/categorie/{polipropilena,plasa,polietilena,big-bags}/`), and the Markdown twin lists the same four (`src/pages/saci-pentru-legume.md.ts:35-38`).
9. PASS — no `price` in the five front matters; every card shows `Preț la cerere`; the page reads `product.data.price` / `product.data.unit` and calls `formatPriceBlock` from `src/lib/pricing.ts` (`src/pages/saci-pentru-legume.astro:123-129`), no own formatter.
10. PASS — `jj diff --from uqtnroypoqxx (T6) --to @ --summary` touches only `docs/seo/PLAN-saci-pentru-legume.md`, `docs/seo/handoff/`, `docs/seo/reports/`, `public/llms.txt`, `scripts/seo-check.mjs`, `src/components/Hero.astro`, `src/lib/legume.ts`, `src/pages/categorie/[slug].astro`, `src/pages/saci-pentru-legume.astro`, `src/pages/saci-pentru-legume.md.ts`. No price-owned file touched.
11. PASS — `scripts/seo-check.mjs` diff from the task parent `e4e97529830c` to `@`: 183 added lines, the only removed line is the placeholder `// T1: "/saci-pentru-legume/": { ... }`. No rule deleted or relaxed. The new commits do not touch the checker.
12. FAIL — F1, F3, F4, F5, F6, F7, F8 fixed. F2 only partly fixed: `src/lib/legume.ts:35` still claims the polietilenă use `acoperirea paletilor` (finding F11).

## Findings

- F11 (medium, open) Unsupported use. `src/lib/legume.ts:35` "dar sunt utili pentru transport și pentru acoperirea paletilor". `src/lib/categories.ts:60` lists only nisip, pietriș, pământ, resturi din construcții, gunoi, depozitare, mutări. `transport` is supported by the product pages (`content/products/Saci-Polietilena-32x62.md:8` "transportului"), `acoperirea paletilor` is nowhere on the site; the only pallet-covering text belongs to the stretch film (`content/products/Stretch.md:8`). Fix: drop the clause.
- F12 (low, follow-up) Self-invalidating copy. `src/lib/legume.ts:37` and `:60` say every product shows `«Preț la cerere»`. True today, false as soon as the price feature lands (T2 wave). Fix in the T2 wave, not now.
- F13 (low, open, not T1's file) Data mismatch. The copy says `40x58 cm` (`src/lib/legume.ts:34,36,54`) while the card prints `Dimensiuni sac: 40 x 50 cm` (`content/products/Saci-Plasa-40x58.md:6`). The file is owned by the price agent; the owner must confirm the size.
- F14 (low, soft) `src/lib/legume.ts:36` "sacii de polipropilenă de 50x80 cm și 50x100 cm sunt cei mai potriviți" for "cereale și cantități mari". The site reserves the big size for voluminoase (`src/lib/categories.ts:33`). Not a contradiction, but the ranking is editorial.
- F9 (closed) The spec line was fixed by the orchestrator commit `rsunpwnkkvrw` (`docs/seo/PLAN-saci-pentru-legume.md:102` now says four category pages), not by the builder.
- F10 (repeated) The builder commit `ylwkvvkmlsvn` contains `docs/seo/reports/T1-verify.md` (the round-3 report) and a new `docs/seo/handoff/seo-verify-T1.md`. The builder sweeps verifier files into its commit. This report replaces the round-3 file.
- F1 (closed) "cei mai rezistenți" gone; the page claims no ranking against `content/products/Saci-Plasa-40x58.md:10` ("rezistență superioară față de sacii țesuți").
- F3 (closed) no office claim: `birouri` 0 in the built page.
- F4 (closed) no order of the two numbers: `Primele două` 0. The 40x58/40x50 mismatch is F13.
- F5 (closed) no `produse voluminoase` for 50x80/50x100, no `cei mai eficienți`, no `se spală și se refolosește`; "roșii" stays, and `după curățare sacii pot fi reciclați` matches `content/products/Sac-Polipropilena-50x100.md:8`.
- F6 (closed) `src/lib/legume.ts:38,65` say delivery in Chișinău and in Moldova, like `src/lib/categories.ts:34,48,62,76`.
- F7 (closed) The twin lists the four category pages (`src/pages/saci-pentru-legume.md.ts:38` big-bags added).
- F8 (closed) `src/pages/saci-pentru-legume.astro:125-129` renders `formatPriceBlock(...).split("\n")[1]` (`Preț angro: se discută individual.`) when a price exists; the twin joins the lines (`src/pages/saci-pentru-legume.md.ts:30`). Checked `formatPriceBlock(12345,"buc")` → line 0 `123.45 lei / buc · cu TVA inclus`, line 1 `Preț angro: se discută individual.`; without a price there is no line 1.

VERDICT: FAIL
