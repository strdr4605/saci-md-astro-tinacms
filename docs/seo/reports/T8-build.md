# T8 build report — guide article "Cum alegi saci pentru legume"

Task: T8 — guide article at `/ghid/cum-alezi-sacii-pentru-legume/`.
Workspace: `/Users/strdr4605/P/saci-md-seo`.

## Files changed

| File | Change |
|---|---|
| `src/lib/legume.ts` | new shared copy of the guide (`GUIDE_*` exports, sections, size table, FAQ) |
| `src/pages/ghid/[slug].astro` | new page, static route for `GUIDE_SLUG`, Article + FAQPage + BreadcrumbList schema |
| `src/pages/ghid/[slug].md.ts` | new Markdown twin, own builder, no change to `src/lib/markdown.ts` |
| `src/pages/saci-pentru-legume.astro` | one link to the guide |
| `public/llms.txt` | entry for the guide and its `.md` twin |
| `scripts/seo-check.mjs` | new T8 rules (see below) |
| `docs/seo/reports/T8-build.md` | this report |

No file of the price feature was touched.

## What the page holds

- `h1`: "Cum alegi saci pentru legume în Chișinău" (contains "saci pentru legume" and "Chișinău").
- 1308 words in `<p>` tags of `<main>` (checker needs 700).
- 12 `h2` headings: sizes table, "Cum aleg mărimea sacului", "Când folosesc saci din plasă", "Când folosesc saci de rafie, adică polipropilenă", "Când folosesc saci din polietilenă și big bag-uri", "Cât costă sacii pentru legume", "Cum se depozitează și se refolosesc sacii", "Livrare și contact în Chișinău", product list, categories, FAQ, contact.
- Table with the five sizes and their capacity: 30x34 (7 kg), 40x58 (20 kg), 52x72 (35 kg), 50x80 (20–30 kg), 50x100 (40 kg).
- Links to the five products, to `/saci-pentru-legume/` and to the four category pages.
- Schema: `Article` (headline, datePublished 2026-11-13, author Sim Construct Grup S.R.L.), `FAQPage` with 5 questions, `BreadcrumbList` with 3 levels.
- Sitemap entry, `llms.txt` entry, Markdown twin at `/ghid/cum-alezi-sacii-pentru-legume.md`.

## Facts used (all from the site)

- Capacities from `content/products/*.md`: plasa 30x34 = 7 kg, plasa 40x58 = 20 kg, plasa 52x72 = 35 kg, rafie 50x80 = 20–30 kg, rafie 50x100 = 40 kg.
- Polipropilenă: țesută 600–1200 den, fund cusut, capăt sigilat, rezistent la apă și lumină, reciclabilă după curățare, 50x100 în seturi de 100 bucăți.
- Polietilenă: folie densă, 50x80 la 120 microni ține până la 30 kg, pentru nisip, pietriș, gunoi, construcții.
- Big bag: polipropilenă, 4 mânere, fund plat, 90x90x160 ≈ 1 tonă, 90x90x110 ≈ 500 kg, 75x110x240 pentru europalet.
- Adresă str. Nicolae Dimo 17/1, Chișinău; telefon 069 149 730; livrare în Chișinău și în Moldova; vânzare cu bucata și angro.

The guide does not name opening hours, does not promise same-day delivery, does not name a retail pack, does not rank the bag types, and does not say that a price is shown on the page.

## New checker rules (T8)

Added to `scripts/seo-check.mjs`, route `/ghid/cum-alezi-sacii-pentru-legume/`:

- `h1Mentions`, `titleMentions`, `descriptionMentions`.
- `minWords: 700`, `minProseWords: 700`.
- `jsonLdTypes: ["Article", "FAQPage", "BreadcrumbList"]`.
- `h2Min: 4` (new rule type).
- `articleSchema: true` (new rule type): an `Article`/`BlogPosting` node with `headline`, `datePublished` and the author "Sim Construct Grup".
- `productLinks` (new rule type): the five product links on the page and in the twin.
- `links`: the landing page and the four category pages.
- `textMentions`: the material names, the five sizes, the capacities, `grosime`, `angro`, the address, the phone, `livrare în Chișinău`, `Moldova`.
- `twinMentions`, `markdownTwin: true`, `llmsTxt: true`.

No existing rule was changed or removed. On the old build the route does not exist, so the route, sitemap, twin and `llms.txt` rules fail.

## Check output

```
$ npm run build:astro
✓ Completed in 67ms.  (dist/ghid/cum-alezi-sacii-pentru-legume/index.html and .md written)

$ npm run check:seo
seo-check: 31 pages, 0 failures, 0 notes
```

## Open points

- The Markdown twin of the landing page (`src/pages/saci-pentru-legume.md.ts`) does not link to the guide. That file was not in the allowed list of this task.
- `public/.well-known/ai-catalog.json` has no entry for the guide. The price agent owns that file (T2 wave).
- The guide uses a static `datePublished` (2026-11-13). Change it when the page is edited.
- The `40x58` product file lists the size as "40 x 50 cm" in its specs, while the product name and the site use 40x58. The guide uses 40x58, like the rest of the site.
