# T5 build report — local entity signals

Task: T5 — Local entity signals (Chișinău)
Commit: one commit for this task, `feat(seo): local business schema, contact and about pages` (see `jj log`).

## Files changed

| File | Change |
|---|---|
| `src/layouts/Layout.astro` | The `Organization` script block is now a `@graph` with the `Organization` node (kept) and a new `LocalBusiness` node. The default `title` now holds "Chișinău". The `WebSite.publisher` points to `https://saci.md/#organization`. |
| `src/pages/contact.astro` | new. The page `/contact/`. Company name, address, phone as `tel:` link, map link, embedded map (`src/components/Map.astro`), delivery area. `ContactPage` + `BreadcrumbList` schema. |
| `src/pages/contact.md.ts` | new. The Markdown twin `/contact.md`. Own builder, does not touch `src/lib/markdown.ts`. |
| `src/pages/despre-noi.astro` | new. The page `/despre-noi/`. Who the company is, what it makes and sells, address, phone, map, delivery area. `AboutPage` + `BreadcrumbList` schema. |
| `src/pages/despre-noi.md.ts` | new. The Markdown twin `/despre-noi.md`. Own builder. |
| `src/components/Footer.astro` | Links to `/contact/` and `/despre-noi/`. The company name stays. |
| `public/llms.txt` | The two new pages in the page list. |
| `scripts/seo-check.mjs` | New T5 rules. No existing rule removed or weakened. |
| `docs/seo/reports/T5-build.md` | this report. |

Not touched: `src/content.config.ts`, `tina/config.ts`, `tina/tina-lock.json`,
`content/products/*.md`, `src/lib/pricing.ts`, `src/lib/markdown.ts`,
`src/components/CategoryProduct.astro`, `src/pages/[productSlug].astro`,
`src/pages/[productSlug].md.ts`, `src/pages/index.md.ts`,
`src/pages/product-index.json.ts`, `src/pages/.well-known/ai-catalog.json.ts`,
`src/lib/categories.ts`, `src/lib/legume.ts`, `src/pages/categorie/[slug].astro`,
`src/pages/saci-pentru-legume.astro`, `src/pages/ghid/[slug].astro`.

## Facts used

Only the facts of the task. Company: Sim Construct Grup S.R.L. Phone: +373 69 149 730.
Address: str. Nicolae Dimo 17/1, Chișinău, Republica Moldova.
Map: https://maps.app.goo.gl/GAWu84AruE7GSy628.
Activity: the production and the trade of bags and packaging. Delivery in Chișinău
and in Moldova. The sale with the piece and wholesale.

The phone, the address and the map come from `company` in `src/lib/markdown.ts`.
The file is not changed. The pages import it, they do not repeat the values.

## Schema

`src/layouts/Layout.astro`, one `@graph` with two nodes:

- `Organization` (`https://saci.md/#organization`): name, url, logo, description,
  address, telephone, `contactPoint` (telephone, contactType, areaServed),
  `sameAs: []`.
- `LocalBusiness` (`https://saci.md/#localbusiness`): name, url, logo, image,
  description, telephone, address (streetAddress, addressLocality Chișinău,
  addressCountry MD), areaServed (Chișinău, Republica Moldova),
  `hasMap` with the Google Maps link.

No `geo`, no `priceRange`, no `openingHoursSpecification`: these values are not
known. A comment above the script block says that `sameAs` waits for the links.

The pages add their own nodes: `/contact/` holds `ContactPage` (mainEntity points
to the `LocalBusiness` node) and `BreadcrumbList`. `/despre-noi/` holds `AboutPage`
(mainEntity points to the `Organization` node) and `BreadcrumbList`.

## Checker rules added (scripts/seo-check.mjs)

New expectation keys:

- `descriptionMax` — the maximum count of characters in the meta description of a
  route. The home page now uses 160.
- `localBusiness` — the route must hold a `LocalBusiness` node with the telephone,
  the street address, the locality Chișinău, the country MD, at least two areas
  and a map.

New routes:

- `/contact/`: title and description hold "Chișinău", h1 holds "Contact" and
  "Chișinău", at least 120 words of text and 120 words in the paragraphs of
  `<main>`, the nodes `ContactPage`, `LocalBusiness` and `BreadcrumbList`, the
  `LocalBusiness` facts, the text holds the company name, the phone, the address,
  the city and the country, the twin holds the phone, the address and the city,
  the Markdown twin with its alternate link and its `Link` header rule, the URL in
  `llms.txt`, a link to `/despre-noi/`.
- `/despre-noi/`: the same list with "Despre noi", the nodes `AboutPage`,
  `Organization` and `BreadcrumbList`, and a link to `/contact/`.
- `/`: the title and the description must hold "Chișinău", the description has at
  most 160 characters, the page holds the `LocalBusiness` facts.

No existing rule was removed or weakened. The diff of the checker is additive.

## Check output

```sh
$ npm run build:astro
[build] Complete!

$ npm run check:seo
seo-check: 33 pages, 0 failures, 0 notes
```

Built files: `dist/contact/index.html`, `dist/despre-noi/index.html`,
`dist/contact.md`, `dist/despre-noi.md`. The two pages are in `dist/sitemap-0.xml`.
`dist/_headers` holds the `Link` rules for the two twins.

## Open points

The following facts are not known. They are not on the site and no value was
invented for them. Each one needs the answer of the owner.

| Fact | Where it goes |
|---|---|
| Google Business Profile URL | `sameAs` of the `Organization` node in `src/layouts/Layout.astro`. |
| Facebook URL | `sameAs` of the `Organization` node in `src/layouts/Layout.astro`. |
| Email address | A `mailto:` link and a `ContactPoint` with the email. Not on `/contact/`. |
| Company ID (CUI) | The `identifier` of the `Organization` node. Not on the pages. |
| Opening hours | `openingHoursSpecification` of the `LocalBusiness` node. Not on the pages. |

Also open, not asked by this task:

- `geo` of the `LocalBusiness` node. The coordinates of the map embed exist in
  `src/components/Map.astro`, but the exact geo of the shop is not confirmed.
- `priceRange` of the `LocalBusiness` node.

## Deviation from the plan

`docs/seo/PLAN-saci-pentru-legume.md`, T5, asks for a non-empty `sameAs`, for
`geo`, for `openingHoursSpecification`, for `priceRange`, and for the email, the
company ID and the hours on the two pages. The plan lists these values as open
questions 2, 3 and 4, and it says to ask the owner before guessing. The task
gives only the facts above. The values are missing, so the nodes hold the known
facts only. The table above names each missing value and its place.
