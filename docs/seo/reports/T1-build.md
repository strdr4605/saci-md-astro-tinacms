# T1 build report — landing page /saci-pentru-legume/

Task: T1 — Landing page `/saci-pentru-legume/`
Commit: one commit for this task, `feat(seo): landing page for saci pentru legume` (see `jj log`).

## Files changed

| File | Change |
|---|---|
| `src/lib/legume.ts` | new. Copy of the page: title, description, h1, 7 paragraphs, 6 FAQ entries, the five product slugs, `PRICE_ON_REQUEST`. |
| `src/pages/saci-pentru-legume.astro` | new. The page. Renders the copy, 5 product cards, FAQ block, `CollectionPage` + `ItemList` + `FAQPage` + `BreadcrumbList` schema. |
| `src/pages/saci-pentru-legume.md.ts` | new. The Markdown twin at `/saci-pentru-legume.md`. Own builder, does not touch `src/lib/markdown.ts`. |
| `public/llms.txt` | new entry for the landing page. |
| `scripts/seo-check.mjs` | new T1 rules. No existing rule changed. |
| `docs/seo/reports/T1-build.md` | this report. |

Not touched: `src/content.config.ts`, `tina/*`, `content/products/*`, `src/lib/pricing.ts`,
`src/lib/markdown.ts`, `src/components/CategoryProduct.astro`, `src/pages/[productSlug].astro`,
`src/pages/[productSlug].md.ts`, `src/pages/index.md.ts`, `src/pages/product-index.json.ts`,
`src/pages/.well-known/ai-catalog.json.ts`.

## Checker rules added (scripts/seo-check.mjs)

New expectation keys, used by the route `/saci-pentru-legume/`:

- `h1Mentions: ["saci pentru legume", "Chișinău"]`
- `minWords: 300`, `minProseWords: 300` (words inside `<p>` of `<main>`)
- `jsonLdTypes: ["CollectionPage", "ItemList", "FAQPage"]`
- `productSlugs` — an `ItemList` with exactly the five product URLs, a link to each
  product, and each product URL in the Markdown twin
- `faqMin: 5` — a `FAQPage` node with at least 5 questions, each with a name and an
  answer, and each question visible in the page text
- `textMentions` — rafie, polipropilenă, plasă, polietilenă, cartofi, ceapă, morcov,
  the five sizes, `Preț la cerere`, `Nicolae Dimo 17/1`, `069 149 730`, `livrare în Chișinău`
- `twinMentions` — h1, address, phone, price label in the Markdown twin
- `markdownTwin: true` — twin file, `rel="alternate"` link, `Link` header rule
- `llmsTxt: true` — the page URL in `llms.txt`

No existing rule was removed or weakened.

## Check output

Rules fail on the old build (before the new page):

```
FAIL /saci-pentru-legume/ expected-route-in-sitemap: route is not in sitemap-0.xml
FAIL /saci-pentru-legume/ expected-route-exists: no file at .../dist/saci-pentru-legume/index.html
seo-check: 29 pages, 2 failures, 0 notes
```

After `npm run build:astro`:

```
npm run check:seo
seo-check: 30 pages, 0 failures, 0 notes
```

Built output: `dist/saci-pentru-legume/index.html` and `dist/saci-pentru-legume.md` exist.
`dist/sitemap-0.xml` holds `https://saci.md/saci-pentru-legume/`.
The page text holds 700 words in `<p>` tags, the h1 is `Saci pentru legume în Chișinău`,
the title is 67 characters, the description is 154 characters.

## Price

The price feature is not on master. No product holds a `price` value, so every product
card shows `Preț la cerere` (`PRICE_ON_REQUEST` in `src/lib/legume.ts`). No price
formatter was written. When `src/lib/pricing.ts` lands, one task swaps this constant for
`formatPrice(price, unit)` in the page and in the Markdown twin.

## Open points

1. `public/.well-known/ai-catalog.json` has no entry for the new page. The plan puts that
   entry in the T2 wave, because the price agent owns the file.
2. The FAQ answers are hidden in `<details>`. The text is in the HTML, so search engines
   can read it. The design may change to an open block.
3. The five products come from the `products` collection, filtered by the slugs in
   `src/lib/legume.ts`. A product missing from the collection drops out of the page and
   breaks the `ItemList` rule of the checker.

## Fixes after the first verification

The first verification failed. The fixes are in the commit
`fix(seo): landing page shows the product price`.

- The page and the Markdown twin read `product.data.price` and `product.data.unit` and
  use `formatPriceBlock` from `src/lib/pricing.ts`. The constant `PRICE_ON_REQUEST` is gone.
- The checker has a price rule. It reads the price from the front matter and requires the
  same price on the page and in the Markdown twin.
- The copy no longer promises same day delivery, opening hours or a retail pack.
- The dimension order in the FAQ is width first.
- The copy names roșii.
- The landing page links the four category pages.
- The home page link is in `src/components/Hero.astro`. This report was wrong about it.
