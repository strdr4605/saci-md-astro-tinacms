# T3 verification — product titles, breadcrumbs, related products

Task commit: `zynszzwl` "feat(seo): product titles, breadcrumbs and related products". Workspace `/Users/strdr4605/P/saci-md-seo`.
Built with `npm run build:astro` (24 product pages, 24 twins). Checked with `npm run check:seo` → `31 pages, 0 failures, 0 notes`.

## Criteria

1. PASS — Title. `src/pages/[productSlug].astro:72`. 24/24 titles hold the product name and "Chișinău", 28–49 chars (limit 65). No product holds a price, so no title holds one. Scratch copy `/tmp/verify-T3` with `price: 4500` added: title `Sac Polipropilena 50x100 – 45.00 lei – Chișinău | Saci.md` (58 chars); dropping the price from the title → `FAIL /sac-polipropilena-50x100/ product-title-price: "45.00 lei" missing from the title`; a price in the title of a product without one → 24 failures.
2. PASS — Description. `src/pages/[productSlug].astro:76`. 24/24 pages, one meta each, 24 unique texts, 114–136 chars (70–160), each holds the name, the use of its category and "Chișinău".
3. PASS — Canonical. `src/pages/[productSlug].astro:79`. 24/24 canonical = `https://saci.md/<encodeURIComponent(slug)>/`; the 3 space slugs hold `%20` and match the route the page is served at. All hrefs to those 3 products use `%20` (product pages, `categorie/polietilena`, twins, `product-index.json`, `ai-catalog.json`, sitemap). Exception: the home page, see F1.
4. PASS — Visible breadcrumb. `src/pages/[productSlug].astro:169`. 24/24 `nav[aria-label="Breadcrumb"]` read `Home / Category / Product name`.
5. PASS — Schema. `src/pages/[productSlug].astro:129`. 24/24 `BreadcrumbList`, the same 3 names in the same order, `position` 1–3, level 3 `item` = the encoded canonical.
6. PASS — Related products. `src/pages/[productSlug].astro:59,223`. 24/24 pages hold 4–7 links to other products and link every product of their own category (≥1 same category).
7. PASS — Markdown twin. `src/lib/markdown.ts:25`. 24/24 twins hold `- Breadcrumb: Home / Category / Name` and `- Preț: la cerere`. Scratch with `price: 4500`: `- Preț: 45.00 lei / buc · cu TVA inclus` plus the breadcrumb line.
8. PASS — Scope. `jj diff -r zynszzwl` touches 4 files: `docs/seo/reports/T3-build.md`, `scripts/seo-check.mjs`, `src/lib/markdown.ts`, `src/pages/[productSlug].astro`. None of the 9 forbidden files.
9. PASS — Checker. `scripts/seo-check.mjs` diff is +249/−0 lines: no rule deleted, relaxed or emptied. The 15 new codes all bite (mutation in `/tmp/verify-T3`, one build per mutation): `product-title-length`, `-name`, `-city`, `-price` (both ways), `product-description-length`, `-name`, `-city`, `-use`, `product-canonical-encoded`, `product-breadcrumb`, `product-breadcrumb-schema`, `related-product-link`, `related-product-count`, `markdown-twin-price`, `markdown-twin-breadcrumb`.
10. PASS — Pages work. `npm run check:seo` → 0 failures. Parent build (`/tmp/verify-T3p`, parent sources of the 3 changed source files) compared with the T3 build: the `<article>` block of 24/24 pages is identical — photo, price block, specs and description text all kept.

## Findings

- F1 (open, not T3): the home page links to the 3 space-slug products with raw spaces — `src/components/CategoryProduct.astro:13`, `<a href={product.frontmatter.slug}>`, seen in `dist/index.html` as `href="Saci Polietilena 50x80 120mk"`. Pre-existing: the parent build shows the same three hrefs. `CategoryProduct.astro` is on the T3 forbidden list, so the commit cannot fix it. Owner: the task that owns that file, or the price task that fixes the space slugs in `content/products/*.md`.
- F2 (minor): the use per category is written twice — `CATEGORY_USE` in `src/pages/[productSlug].astro:16` and `PRODUCT_USE` in `scripts/seo-check.mjs:381`. The two lists can drift; the checker only checks the meta text, not the page body.

VERDICT: PASS
