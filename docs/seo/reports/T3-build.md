# T3 build report — product title, description, breadcrumbs, related products

Task: T3 — product pages of `saci.md`.
Workspace: `/Users/strdr4605/P/saci-md-seo`.

## Files changed

| File | Change |
|---|---|
| `src/pages/[productSlug].astro` | title, description, canonical, visible breadcrumb, `BreadcrumbList` schema, "Alte produse" section |
| `src/lib/markdown.ts` | one line added: the breadcrumb of the Markdown twin |
| `scripts/seo-check.mjs` | new T3 rules (see below) |
| `docs/seo/reports/T3-build.md` | this report |

No file of the price feature was touched. The price block, the `formatPriceBlock`
helper and the `offers` schema of the product page stay as they were.

## What the product page holds now

- `title`: `{name} – {price} – Chișinău | Saci.md`. The price part appears only when
  the product holds a `price` value. 28 to 49 characters today (limit 65).
  With a price the longest title reaches 62 characters.
- `description`: `{name} – {use} în Chișinău. Ridicare de la str. Nicolae Dimo 17/1
  sau livrare în Moldova.` 114 to 136 characters (range 70 to 160). It is no longer
  a slice of the body text.
- The use comes from `CATEGORY_USE` in the page: polipropilenă "pentru cartofi,
  cereale și făină", plasă "pentru legume și fructe", polietilenă "pentru nisip,
  pietriș și gunoi", big bags "pentru cereale, nisip și deșeuri", plasă tubulară
  și stretch "pentru ambalare și paletizare".
- `canonical`: `https://saci.md/{encodeURIComponent(slug)}/`. The three slugs with
  spaces now hold `%20`, as the sitemap does. The links to the products use the
  same form, through `productPath()` of `src/lib/categories.ts`.
- Visible breadcrumb: `Home / Polipropilenă / Sac Polipropilenă 50x100`. The
  second level points to the category page. The two categories without a page
  ("Plasă tubulară si stretch") point to the anchor of the home page.
- Schema: the `Product` node stays, with its `offers`. A `BreadcrumbList` node
  with the same three levels was added. Both sit in one `@graph`.
- "Alte produse": the other products of the same category, then the rest of the
  catalog up to four links. Every product page holds 4 to 7 product links.
- Markdown twin: `- Breadcrumb: Home / Polipropilenă / Sac Polipropilenă 50x100`
  under the title. The price line of the twin stays as the price feature wrote it.

## New checker rules (T3)

Added to `scripts/seo-check.mjs`. The rules run on every product route, read
from `content/products/*.md`.

- `product-title-length`: at most 65 characters.
- `product-title-name`, `product-title-city`: the name and "Chișinău" in the title.
- `product-title-price`: the price in the title when the product holds one; no
  price in the title when the product holds none.
- `product-description-length`: 70 to 160 characters.
- `product-description-name`, `product-description-city`, `product-description-use`.
- `product-canonical-encoded`: the canonical must be the encoded product URL.
- `product-breadcrumb`: the visible breadcrumb must read `Home / {category} / {name}`.
- `product-breadcrumb-schema`: a `BreadcrumbList` node with the same three
  levels, the positions 1, 2, 3 and the encoded URL of the last level.
- `related-product-link`: a link to every other product of the same category.
- `related-product-count`: at least two product links on the page.
- `markdown-twin-price`: the price of the product in the Markdown twin.
- `markdown-twin-breadcrumb`: the breadcrumb in the Markdown twin.

No existing rule was changed or removed. The diff of the checker holds
additions only.

The rules fail on the old build. With the old sources and the new checker:

```
$ npm run check:seo
seo-check: 31 pages, 347 failures, 0 notes
```

The failures name the missing city in the title and in the description, the
unencoded canonical, the missing breadcrumb, the missing `BreadcrumbList`, the
missing product links and the missing breadcrumb in the twin.

## Check output

```
$ npm run build:astro
✓ Completed in 1.11s.  (dist/ holds the 24 product pages and the 24 Markdown twins)

$ npm run check:seo
seo-check: 31 pages, 0 failures, 0 notes
```

Pages checked by hand: `/sac-polipropilena-50x100/` (normal slug),
`/Saci Polietilena 50x92/` (slug with spaces) and `/saci-plasa-30x34/`
(landing page product).

The price path was tested with a temporary `price: 4500` in one content file.
The title held `Sac Polipropilenă 50x100 – 45.00 lei – Chișinău | Saci.md`,
the twin held `Preț: 45.00 lei / buc · cu TVA inclus`, and the checker passed.
The content file was restored before the commit.

## Open points

- The category "Plasă tubulară si stretch" holds two products. A product of that
  category has only one other product of the same category. The page then adds
  products of the other categories, so the page still holds four product links.
  The checker rule `related-product-link` asks for every other product of the
  same category, and `related-product-count` asks for two product links.
- The Markdown twin holds the price as "Preț: la cerere" for a product without a
  price, while the page holds "Preț la cerere". The price line belongs to the
  price feature, so `src/lib/markdown.ts` was not changed for it.
- The word "Home" in the breadcrumb comes from the plan. The category pages and
  the guide page use "Saci.md" for the first level.
- The `keywords` meta of the product page now holds the name of the category.
  Before, it held the empty body of the category file.
