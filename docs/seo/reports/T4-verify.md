# T4 verification

Task: T4 — Category pages
Commit: loxprmxu (d786b491) "feat(seo): category pages"
Parent: vnxvqwlm (1160be0d) "chore(seo): plan, verification skill, checker, context monitor"
Verifier: independent verifier agent, 2026-11-13. This report replaces the earlier `T4-verify.md` that the commit holds.

## L1 checker

PASS. `npm run build:astro` exit 0. `npm run check:seo` exit 0:

```
note /old/: exempt from universal rules
seo-check: 30 pages, 0 failures, 1 notes
```

## Acceptance criteria (built output in dist/)

Proof script: `/tmp/t4-crit.mjs` (reads `dist/`, `content/products/*.md`).

1. 4 URLs return 200 — PASS — `src/pages/categorie/[slug].astro:13`, `src/lib/categories.ts:22-78`. `dist/categorie/{polipropilena,plasa,polietilena,big-bags}/index.html` exist: `"file":true` x4.
2. Unique title, description, one h1, at least 120 words — PASS — `src/lib/categories.ts:26-77`, `src/pages/categorie/[slug].astro:83`.
   - polipropilena: title 52 chars "Saci din polipropilenă (rafie) în Chișinău | Saci.md", desc 146, 1 h1, 134 words in `<p>` (176 in `<main>`)
   - plasa: title 58, desc 145, 1 h1, 151 words (184)
   - polietilena: title 59, desc 139, 1 h1, 131 words (170)
   - big-bags: title 52, desc 143, 1 h1, 147 words (179)
   - 4 titles and 4 descriptions are different. Checker `unique-title`, `unique-description` pass.
3. `ItemList` with the product URLs of the category — PASS — `src/pages/categorie/[slug].astro:41-52`. Exact set match against `categoryPath` in `content/products/*.md`: 8/8, 3/3, 7/7, 4/4 (`"match":true` x4). Every URL resolves to `dist/<slug>/index.html` (`"urlsResolve":true` x4).
4. Home navigation links to the pages, old anchors do not — PASS — `src/components/CategoriesNavigation.astro:40,63`. `<nav id="categories-nav">` hrefs in `dist/index.html`: `/categorie/polipropilena/`, `/categorie/big-bags/`, `/categorie/polietilena/`, `/categorie/plasa/` (mobile + desktop), plus `#Plasă tubulară si stretch` (no page for that category). `#Polipropilenă`, `#Big bags`, `#Polietilenă`, `#Plasă` remain only as section `h2` self links (`src/components/Category.astro:26`), outside the navigation.
5. Pages in `dist/sitemap-0.xml` — PASS. `"sitemap":true` x4 for `https://saci.md/categorie/<slug>/</loc>`.
6. Markdown twin at `/categorie/<slug>.md`, alternate link not 404 — PASS — `src/pages/categorie/[slug].md.ts:12-52`, `src/layouts/Layout.astro:75`. `altHref` = `/categorie/<slug>.md`, file exists (`"twin":true` x4, 216–226 words). `dist/_headers` has `Link: </categorie/<slug>.md>; rel="alternate"` for all 4 (`"header":true` x4).
7. `public/llms.txt` lists the 4 pages — PASS — `public/llms.txt:127-131`; `dist/llms.txt` contains all 4 URLs (`"llms":true` x4).

## L2 content

- Romanian text, no English filler: pass. Last paragraph of each page repeats one contact pattern (address, phone, delivery). Acceptable.
- City, address `str. Nicolae Dimo 17/1`, phone `069 149 730`, delivery: pass (`src/lib/categories.ts:34,48,62,76`).
- Product links name the product (`h3`, `img alt`): pass (`src/pages/categorie/[slug].astro:93-108`).
- No price shown. Not a T4 criterion. No second price formatter: pass.
- `public/.well-known/ai-catalog.json` does not list the pages: L2 item, not a T4 criterion. See finding 4.

## L3 diff

- Price feature files untouched: PASS. `jj diff -r loxprmxu --stat` lists only: `astro.config.mjs`, `docs/seo/PLAN-saci-pentru-legume.md`, `docs/seo/reports/T4-build.md`, `docs/seo/reports/T4-verify.md`, `public/llms.txt`, `scripts/seo-check.mjs`, `src/components/CategoriesNavigation.astro`, `src/lib/categories.ts`, `src/pages/categorie/[slug].astro`, `src/pages/categorie/[slug].md.ts`. None of the 12 owned files.
- Only T4 scope: PASS with notes. `astro.config.mjs` is a T6 file (findings 1, 3). `[slug].md.ts` and `public/llms.txt` are outside the T4 file list, but criteria 6 and 7 need them.
- Checker not weakened: PASS. `jj diff -r loxprmxu --git -- scripts/seo-check.mjs | grep '^-'` gives one removed line only: the comment `// T4: "/categorie/<slug>/": { ... }`. No rule deleted or relaxed. New rules: `min-prose-words`, `category-products`, `itemlist-products`, `category-product-link`, `markdown-twin-exists`, `markdown-alternate-link`, `markdown-header-rule`, `llms-txt-mentions`, `nav-present`, `nav-link`, `nav-forbidden-link`, `unique-title`, `unique-description`, `expected-route-in-sitemap`, `expected-route-exists`.
- Schema types: `CollectionPage` + `ItemList` + `BreadcrumbList` on a listing page: pass.
- New rules have power: PROVEN.
  - Parent `vnxvqwlm` in workspace `/tmp/verify-T4-parent` with the new checker: build exit 0, check exit 1, `seo-check: 26 pages, 20 failures` (`expected-route-in-sitemap` x4, `expected-route-exists` x4, `nav-link` x4, `nav-forbidden-link` x4, `internal-link` x4).
  - Per-page rules cannot fire on the parent (no pages). Mutation test: T4 `dist/` copied into the temp workspace, then 2 paragraphs and 1 ItemList item removed on `/plasa/`, duplicate title on `/big-bags/`, `polietilena.md` deleted, one URL removed from `llms.txt`, parent `_headers` restored. Result `30 pages, 9 failures`: `min-prose-words`, `itemlist-products`, `markdown-twin-exists`, `markdown-header-rule` x4, `llms-txt-mentions`, `unique-title`.
  - Workspace forgotten (`jj workspace forget verify-T4-parent`) and `/tmp/verify-T4-parent` removed.
  - Deviation: revset `parents(@- | @)` resolves to 2 commits (loxprmxu, vnxvqwlm). I used `-r vnxvqwlm`.

## L4 live

Not deployed.

## Verdict

VERDICT: PASS

## Findings

1. Plan edited in the task commit — `docs/seo/PLAN-saci-pentru-legume.md:141-143` adds criteria 6 and 7. `docs/seo/reports/T4-build.md` says the orchestrator made these changes after the build. — Confirm with the orchestrator. If yes, no action.
2. Stale verify report in the commit — the commit holds an earlier `docs/seo/reports/T4-verify.md` (finding 4 there says `findMarkdownFiles` is not recursive; the commit now fixes it). — This report replaces it.
3. Side effect of the recursive scan — `astro.config.mjs:25-39` now also finds `dist/.well-known/agent-skills/*/SKILL.md`. `dist/_headers:29` and 3 more rules target `/.well-known/agent-skills/saci-order-request/SKILL` and `.../saci-catalog-search/SKILL` (with and without `/`). These pages do not exist. Rules 49 → 61 (+8 category, +4 dead). Harmless but wrong. — Skip `.well-known` in the scan, or scan only `categorie/`.
4. `public/.well-known/ai-catalog.json` does not list the category pages (L2 checklist). — Add later. The generator `src/pages/.well-known/ai-catalog.json.ts` belongs to the price feature.
5. `Layout.astro` adds a site-wide `WebPage` (url `https://saci.md`) and an `ItemList` "Categorii de produse" (6 items) to every page, so each category page holds 2 `ItemList` nodes and a `WebPage` beside the `CollectionPage`. Pre-existing. — Limit these nodes to the home page in T5.
6. Checker header comment `scripts/seo-check.mjs:30-33` does not document the keys `markdownTwin` and `llmsTxt`. Minor. — Add 2 comment lines.
