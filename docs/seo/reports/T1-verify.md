# T1 verification

Task: T1 — Landing page `/saci-pentru-legume/`
Commit: `085a7f60` (`feat(seo): landing page for saci pentru legume`), parent `c2e1dc09`
Workspace: `/Users/strdr4605/P/saci-md-seo` (jj working copy `58b11ea3`)

## L1 checker

- `npm run build:astro` → build OK.
- `npm run check:seo` → `seo-check: 30 pages, 0 failures, 0 notes`. PASS.
- New rules have power. Parent commit built in a throwaway worktree with the new checker:
  `FAIL /saci-pentru-legume/ expected-route-in-sitemap`,
  `FAIL /saci-pentru-legume/ expected-route-exists`,
  `FAIL / internal-link: no link to /saci-pentru-legume/`,
  `FAIL /categorie/{big-bags,plasa,polietilena,polipropilena}/ internal-link: no link to /saci-pentru-legume/`
  → `seo-check: 29 pages, 7 failures`. PASS (rules fail without the commit).
- Mutation test on the built page (link `/saci-plasa-52x72/` → `/other/`) →
  `FAIL /saci-pentru-legume/ product-link: no link to /saci-plasa-52x72/`. PASS (rules bite).
- Price rule: MISSING. `grep -n "price\|Preț\|offer" scripts/seo-check.mjs` returns only the two literal `"Preț la cerere"` strings in the T1 expectation block (lines 96, 105). No rule compares a product price to the page text. See finding 1. FAIL.

## L2 content

- `/saci-pentru-legume/` returns 200 (static build): `dist/saci-pentru-legume/index.html` exists. PASS.
- `/saci-pentru-legume.md` twin: `dist/saci-pentru-legume.md` exists, `Link:` header rule in `dist/_headers:307`. PASS.
- `h1` = "Saci pentru legume în Chișinău" — contains "saci pentru legume" and "Chișinău". PASS.
- Word count: 700 words in `<main>` `<p>` tags (min 300), 1506 words in the whole page. PASS.
- Topics present in page text: rafie, polipropilenă, plasă, polietilenă, cartofi, ceapă, morcov, 30x34, 40x58, 52x72, 50x80, 50x100, Preț la cerere, str. Nicolae Dimo 17/1, 069 149 730, livrare în Chișinău. PASS.
- Five product links present: `/saci-plasa-30x34/`, `/saci-plasa-40x58/`, `/saci-plasa-52x72/`, `/sac-polipropilena-50x80/`, `/sac-polipropilena-50x100/`. PASS.
- FAQ block: 6 questions with answers. `FAQPage` node holds the same 6 questions. PASS.
- Schema: `CollectionPage` + `ItemList` with the five product URLs + `FAQPage` + `BreadcrumbList`. PASS.
- `dist/sitemap-0.xml` holds `https://saci.md/saci-pentru-legume/`. PASS.
- `public/llms.txt:134` mentions the page. PASS.
- Home page links to `/saci-pentru-legume/` (`src/components/Hero.astro:43`). PASS.
- All four category pages link to it (`src/pages/categorie/[slug].astro:86`). PASS.
- Landing page links to the three category pages polipropilena, plasa, polietilena. PASS. Note: the fourth category page `big-bags` is not linked from the landing page (finding 6).
- No product holds a price, so every card shows "Preț la cerere" (5 cards, `src/pages/saci-pentru-legume.astro:122`). PASS for today.
- Page writes no price formatter. PASS. But the page never reads `product.data.price` at all — finding 1.
- Copy lives in `src/lib/legume.ts`; page and twin import it. PASS.
- Markdown twin has its own builder, `src/lib/markdown.ts` untouched. PASS.
- `src/content.config.ts` unchanged. PASS (but see finding 1: the page does not read the price fields).

## L3 diff

- Files touched: `docs/seo/PLAN-saci-pentru-legume.md`, `docs/seo/reports/T1-build.md` (new), `public/llms.txt`, `scripts/seo-check.mjs`, `src/components/Hero.astro`, `src/lib/legume.ts` (new), `src/pages/categorie/[slug].astro`, `src/pages/saci-pentru-legume.astro` (new), `src/pages/saci-pentru-legume.md.ts` (new).
- None of the price-owned files touched (`src/content.config.ts`, `tina/*`, `content/products/*`, `src/lib/pricing.ts`, `src/lib/markdown.ts`, `src/components/CategoryProduct.astro`, `src/pages/[productSlug].astro`, `src/pages/[productSlug].md.ts`, `src/pages/index.md.ts`, `src/pages/product-index.json.ts`, `src/pages/.well-known/ai-catalog.json.ts`). PASS.
- `scripts/seo-check.mjs` diff adds only. `diff -u` against the parent shows exactly one removed line, a placeholder comment `// T1: "/saci-pentru-legume/": { ... }` replaced by the real block. No rule deleted, relaxed or made unconditional. PASS.
- Category pages gained a stronger rule (`links: ["/saci-pentru-legume/"]`). PASS.

## L4 live

Not deployed. `https://saci.md/saci-pentru-legume/` → 404 (expected, the commit is not on master).

## Verdict

FAIL

## Findings

1. The page never shows a price. `src/lib/legume.ts:31` defines a constant `PRICE_ON_REQUEST = "Preț la cerere"`, and `src/pages/saci-pentru-legume.astro:122` and `src/pages/saci-pentru-legume.md.ts:30` print it for every card. The page does not read `product.data.price` and does not use `formatPrice` from `src/lib/pricing.ts`. Proof: in a throwaway worktree of this commit I added `price`/`unit` to the five products and `price`/`unit` to the schema, rebuilt, and the landing page still printed "Preț la cerere" 12 times and "45.00 lei" 0 times, while `npm run check:seo` reported `0 failures`. This breaks the T1 criterion "The page shows the price of every product when the product holds a `price` value" and the criterion "It reads the fields of the price feature", and it breaks the price contract "Use the helper. Do not write a second formatter" in spirit, because the label is duplicated outside the helper. Fix: read `product.data.price` in the page and in the twin, render `formatPrice(price, unit)` when a price exists and `Preț la cerere` when it does not, and drop the `PRICE_ON_REQUEST` constant.
2. The checker has no price rule. `scripts/seo-check.mjs` has no rule that requires a price when the product holds one, so after the price feature lands a landing page with a wrong price still passes (`0 failures` in the same worktree test as finding 1). The T1 rule set also pins the literal string "Preț la cerere" as required page text (lines 96 and 105), so the checker will fail the page once prices exist. Fix: add a rule that reads the product front matter and requires the formatted price on the landing page, on the product card and in the Markdown twin, and make the "Preț la cerere" mention conditional on the product having no price.
3. Copy claims the site does not support. `src/lib/legume.ts:40` and `:67` promise same-day delivery in all districts of Chișinău for orders placed before 15:00 and delivery across the Republic of Moldova by common transport or own van; `:34` claims own stock in a depot at str. Nicolae Dimo 17/1; `:39` promises a written offer the same day; `:72` says a private client can buy one pack of bags. No delivery terms, no opening hours and no retail pack exist anywhere on the site (`public/llms.txt`, `src/layouts/Layout.astro`, `content/`). The plan lists the warehouse hours as an open question. Fix: keep only what the site states (address, phone, pickup from str. Nicolae Dimo 17/1, delivery in Chișinău on request) and drop the hours, the same-day promise and the retail pack.
4. Wrong dimension order in the FAQ. `src/lib/legume.ts:57` says "Primele două numere sunt lungimea și lățimea sacului". The products state "Dimensiuni sac: 50 x 80 cm", "Dimensiuni: 50 x 100 cm", so the first number is the width and the second the length. Fix: swap the order in the sentence.
5. The builder report is wrong about the home page link. `docs/seo/reports/T1-build.md:72` says the landing page is not linked from the home page; `src/components/Hero.astro:43` adds that link and `dist/index.html:110` contains `href="/saci-pentru-legume/"`. Fix the report.
6. The landing page does not link the fourth category page `big-bags`. The plan writes "the three category pages" but T4 builds four. Fix: add the big-bags link, or fix the plan wording.
7. Missing topic from the query set: "roșii". The skill checklist (`.agents/skills/seo-verify/SKILL.md`, L2) asks for cartofi, ceapă, morcov and roșii. The page has the first three only. Fix: name roșii once in the copy.
8. Out-of-scope file in the commit. `docs/seo/PLAN-saci-pentru-legume.md` was edited (the builder command lines changed from `claude` to `/opt/homebrew/bin/pi`). The plan is not a T1 file. Fix: keep the plan change in a separate commit.

## Notes for the next task

- `src/lib/legume.ts` holds the price label as a constant. When the price feature lands on master, `src/lib/pricing.ts` must be imported and the constant removed, in the page and in the Markdown twin.
- `scripts/seo-check.mjs` line 96 and 105 pin "Preț la cerere" as required text. Both must become conditional in the price wave, otherwise the checker fails the page on purpose.
- The `ItemList` of the landing page must keep exactly the five product URLs. The `products` collection filter in `src/pages/saci-pentru-legume.astro:17` drops a product that leaves the collection, and the checker then fails on `itemlist-products`.
