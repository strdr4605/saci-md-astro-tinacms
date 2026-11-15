# T4 build report — Category pages

Task: T4 — Category pages
Commit: `feat(seo): category pages`

## Files changed

- `src/pages/categorie/[slug].astro` (new). Builds the four pages from `CATEGORY_PAGES`. Each page has a breadcrumb, one `h1`, four paragraphs of text, and the product cards with links. The JSON-LD has a `@graph` with `CollectionPage`, `ItemList` (product name and URL per item) and `BreadcrumbList`.
- `src/lib/categories.ts`. Adds `CATEGORY_PAGES` (slug, category file, title, description, h1, text), `categoryHref`, `categoryPagePath`, `productPath`. `selectCategories` did not change.
- `src/components/CategoriesNavigation.astro`. The four category links point to `/categorie/<slug>/`. "Plasă tubulară si stretch" and "Altele" keep the `#` anchor, because they have no page.
- `scripts/seo-check.mjs`. New T4 rules (see below).
- `docs/seo/reports/T4-build.md` (this file).

The files of the price feature did not change. The page does not import `CategoryProduct.astro` and does not show prices.

## Checker rules added

| Rule | What it checks |
|---|---|
| `expected-route-in-sitemap` | Every route in `EXPECTATIONS` is in `dist/sitemap-0.xml`. |
| `expected-route-exists` | Every route in `EXPECTATIONS` has a file in `dist/`. |
| `min-prose-words` | At least 120 words in the `<p>` tags of `<main>`. Header and footer text do not count. |
| `itemlist-products` | One `ItemList` node holds exactly the product URLs of the category. The list of products comes from `content/products/*.md` (`categoryPath`), not from the page code. |
| `category-product-link` | The page links to every product of the category. |
| `nav-link` / `nav-forbidden-link` | `<nav id="categories-nav">` on `/` links to the four pages and has no old anchor (`#Polipropilenă`, `#Plasă`, `#Polietilenă`, `#Big bags`). |
| `unique-title` / `unique-description` | No two checked pages share a title or a description. |

Per page: `titleMentions` and `descriptionMentions` "Chișinău"; `h1Mentions` the material and "Chișinău"; `minWords` 120; `jsonLdTypes` `CollectionPage` and `ItemList`. `/` gets `links` to the four pages.

No existing rule was changed or removed.

## Check output

Old build (parent commit) with the new checker:

```
seo-check: 26 pages, 20 failures, 1 notes
```

Failures: `expected-route-in-sitemap` ×4, `expected-route-exists` ×4, `nav-link` ×4, `nav-forbidden-link` ×4, `internal-link` ×4.

New build:

```
npm run build:astro  -> Complete!
npm run check:seo    -> seo-check: 30 pages, 0 failures, 1 notes
note /old/: exempt from universal rules
```

Manual check of `dist/`:

| Page | Title (chars) | Description (chars) | h1 | Words in `<p>` | ItemList items |
|---|---|---|---|---|---|
| `/categorie/polipropilena/` | 52 | 146 | Saci din polipropilenă (rafie) în Chișinău | 134 | 8 |
| `/categorie/plasa/` | 58 | 145 | Saci din plasă pentru legume și fructe în Chișinău | 151 | 3 |
| `/categorie/polietilena/` | 59 | 139 | Saci din polietilenă în Chișinău | 131 | 7 |
| `/categorie/big-bags/` | 52 | 143 | Saci Big Bag în Chișinău | 147 | 4 |

All four URLs are in `dist/sitemap-0.xml` and have `dist/categorie/<slug>/index.html`.

## Open points

Resolved by the orchestrator after the build, before the verification:
- The Markdown twin now exists at `src/pages/categorie/[slug].md.ts`.
- `public/llms.txt` lists the four category pages.
- `astro.config.mjs` sends the `Link` header for the category Markdown twins.
- `scripts/seo-check.mjs` checks the Markdown twin and the llms.txt entry.

Still open:
1. Prices. The pages show no price. When the price feature is on master, show the price with `formatPrice` from `src/lib/pricing.ts` (T3).
4. `Category.astro` on the home page still has `href="#<category>"` on the section `h2`. This is a self-link of the section, not navigation. It did not change.
5. "Plasă tubulară si stretch" and "Altele" have no category page. Their navigation link stays an anchor.
6. Three product slugs hold spaces (`Saci Polietilena 50x80 80mk`, `Saci Polietilena 50x80 120mk`, `Saci Polietilena 50x92`). The URLs are encoded (`%20`). A slug fix belongs to the price feature owner (`content/products/*.md`).
7. Product order on `/categorie/polietilena/`: the Romanian sort puts "Polietilena" before "Polietilenă", so 50x80 and 50x92 come before 32x62. Fixing the product names fixes the order.
8. Text facts come from the product files: sizes, 7/20/35 kg for plasă, 18–20 kg and 30 kg for polietilenă, 500 kg and 1 t for Big Bag. "Vindem cu bucata și angro" and "livrare în Chișinău și în Moldova" come from the site texts. The owner should confirm the delivery area.
