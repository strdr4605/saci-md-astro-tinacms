# T1 verification (round 3)

Task: T1 — landing page `/saci-pentru-legume/`.
Workspace: `/Users/strdr4605/P/saci-md-seo`, jj working copy `@` = `rsunpwnkkvrw`, parent `tvonlkluporr` (`fix(seo): landing page shows the product price`).
Task commits: `lzksmvlqlxnv` → `nnmwzvpunxyy` → `tvonlkluporr`. Parent of the task: `e4e97529830c`.
Build: `npm run build:astro` OK. Checker: `npm run check:seo` → `30 pages, 0 failures, 0 notes`.

## Criteria

1. PASS — `dist/saci-pentru-legume/index.html` (HTTP 200 via static server) and `dist/saci-pentru-legume.md` (200, `text/markdown`). Own route file `src/pages/saci-pentru-legume.md.ts:16` (`prerender = true`).
2. PASS — `dist/saci-pentru-legume/index.html:105` `<h1 …>Saci pentru legume în Chișinău</h1>`; source `src/lib/legume.ts:17`.
3. PASS — 790 words in `<main>` (limit 300). All terms found: rafie 8, polipropilenă 11, plasă 12, polietilenă 4, cartofi 6, ceapă 7, morcov 6, roșii 3, 30x34/40x58/52x72/50x80/50x100 each 6, `Nicolae Dimo 17/1` 4, `069 149 730` 4, `livrare în Chișinău` 3, price `Preț la cerere` on every card. Text `src/lib/legume.ts:31-39`.
4. PASS — five links in `dist/saci-pentru-legume/index.html:105-109`: `/saci-plasa-30x34/`, `/saci-plasa-40x58/`, `/saci-plasa-52x72/`, `/sac-polipropilena-50x80/`, `/sac-polipropilena-50x100/`. Slug list `src/lib/legume.ts:20-26`.
5. PASS — 6 `<details>` questions in the FAQ block (`index.html:118`); FAQPage node has the same 6 `Question` items with the same names (JSON-LD `index.html:88`). Source of truth `src/lib/legume.ts:41-72`.
6. PASS — JSON-LD `index.html:88`: `CollectionPage`, `ItemList` with `numberOfItems: 5` and the five `saci.md/…` URLs, `FAQPage`, plus `BreadcrumbList`.
7. PASS — `dist/sitemap-0.xml` holds `/saci-pentru-legume/`; `public/llms.txt:134` `- [Saci pentru legume în Chișinău](https://saci.md/saci-pentru-legume/)`.
8. PASS — home `dist/index.html` has `href="/saci-pentru-legume/"` (Hero, `src/components/Hero.astro:43`); each of `dist/categorie/{polipropilena,plasa,polietilena,big-bags}/index.html` has 1 link (source `src/pages/categorie/[slug].astro:86`); the landing page links all four category pages (`index.html` §"Mai multe tipuri de saci"). See finding F7 for the twin.
9. PASS — no `price` in the five front matters (`content/products/Saci-Plasa-30x34.md` … `Sac-Polipropilena-50x100.md`); every card shows `Preț la cerere` (5× in `index.html:105-109`). Page reads `product.data.price` / `product.data.unit` and calls `formatPriceBlock` from `src/lib/pricing.ts` (`src/pages/saci-pentru-legume.astro:7,123`). No own formatter. See finding F6.
10. PASS — `jj diff --from e4e97529830c --to tvonlkluporr --summary` touches only: `docs/seo/PLAN-saci-pentru-legume.md`, `docs/seo/reports/T1-build.md`, `docs/seo/reports/T1-verify.md`, `public/llms.txt`, `scripts/seo-check.mjs`, `src/components/Hero.astro`, `src/lib/legume.ts`, `src/pages/categorie/[slug].astro`, `src/pages/saci-pentru-legume.astro`, `src/pages/saci-pentru-legume.md.ts`. No price feature file touched.
11. PASS — `diff` of `scripts/seo-check.mjs` (603 → 810 lines) is additions only: new keys `productSlugs`, `faqMin`, `textMentions`, `twinMentions`, helper `productsBySlug`, new expectation block for `/saci-pentru-legume/`, new price rule. The only removed line is the placeholder comment `// T1: "/saci-pentru-legume/": { ... }`. No rule deleted, relaxed or stubbed.
12. FAIL — copy holds claims the site does not support and one that the site contradicts. Findings F1-F5.

## Findings

- F1 (high) Contradiction. `src/lib/legume.ts:33` "Saci de rafie … sunt cei mai rezistenți" and FAQ answer 2 "Ei sunt mai rezistenți". The site says the opposite: `content/products/Saci-Plasa-40x58.md:10` "aceștia oferă o rezistență superioară față de sacii țesuți". Rafie = țesuți. Fix: drop the ranking claim, or fix the plasă body copy.
- F2 (medium) Unsupported. `src/lib/legume.ts:35` and FAQ 1: polietilenă "utili pentru transportul scurt, pentru acoperirea paletilor și pentru ambalarea produselor deja uscate" / "Sacul din polietilenă este pentru transport scurt și acoperire". The site (`src/lib/categories.ts:63-67`) lists only nisip, pietriș, pământ, construcții, gunoi, depozitare, mutări. `transport scurt` and `acoperire` are new.
- F3 (medium) Unsupported. `src/lib/legume.ts:38` "Depozitul și birourile sunt la str. Nicolae Dimo 17/1". The site only ever says `depozitul` (`src/lib/categories.ts:34`); no office is mentioned anywhere.
- F4 (medium) Unsupported. FAQ 3: "Primele două numere sunt lățimea și lungimea sacului". No site text defines the order of the two numbers. Also the site data is inconsistent: the card of `saci-plasa-40x58` shows `Dimensiuni sac: 40 x 50 cm` (`content/products/Saci-Plasa-40x58.md:6`) while the copy says 40x58. Ask the owner for the order, then fix both.
- F5 (low) Soft. `src/lib/legume.ts:36` "sacii de polipropilenă de 50x80 cm și 50x100 cm sunt cei mai eficienți" for "produse voluminoase"; the site reserves "produse voluminoase" for 100x150 (`src/lib/categories.ts:33`). Also "roșii" (`legume.ts:34,43`) appears in no site text, and "se spală și se refolosește" (`legume.ts:33`) softens "După curățare, sacii pot fi reciclați".
- F6 (low) Missing topic. The site states `livrare în Chișinău și în Moldova` in four category pages (`src/lib/categories.ts:34,48,62,76`). The landing page downgrades this to "cereți … posibilitatea livrării" (`legume.ts:38`), losing the `Moldova` delivery topic of the query.
- F7 (low) The Markdown twin lists only three category pages; `big-bags` is missing (`src/pages/saci-pentru-legume.md.ts:38-41`). The HTML page has four.
- F8 (low) `.split("\n")[0]` on `formatPriceBlock` (`saci-pentru-legume.astro:123`, `saci-pentru-legume.md.ts:30`) drops the line `Preț angro: se discută individual.` for a product that has a price. Not a custom formatter; no product has a price today.
- F9 (process) The builder edited the acceptance criteria of its own task: `docs/seo/PLAN-saci-pentru-legume.md:102` "The landing page links to the three category pages." → "four category pages". The count is right (four pages exist), but the spec must not be changed by the builder.
- F10 (low) The builder committed the round-1 verifier report `docs/seo/reports/T1-verify.md` inside the fix commit. This report replaces it.

VERDICT: FAIL
