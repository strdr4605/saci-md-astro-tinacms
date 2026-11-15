# L4 live check — deploy preview of PR #37

Date: 2026-11-15
Preview: https://deploy-preview-37--agitated-curran-28f99b.netlify.app
Head: 9979f2e5 (feature/seo-saci-legume)

## HTTP

| URL | Status |
|---|---|
| `/` | 200 |
| `/saci-pentru-legume/` | 200 |
| `/saci-pentru-legume.md` | 200 |
| `/ghid/cum-alezi-sacii-pentru-legume/` | 200 |
| `/categorie/polipropilena/` | 200 |
| `/contact/` | 200 |
| `/despre-noi/` | 200 |
| `/saci-plasa-30x34/` | 200 |
| `/old/` | 200 with `<meta name="robots" content="noindex, follow">` |
| `/llms.txt` | 200, holds the 4 category pages and the landing page |
| `/product-index.json` | 200 |
| `/sitemap-index.xml` | 200, points to `https://saci.md/sitemap-0.xml` |

`/sitemap.xml` is 404 on purpose. The site serves `sitemap-index.xml`.

## Schema on the live HTML

- `/saci-pentru-legume/`: `CollectionPage`, `ItemList` with the 5 product URLs
  (`/saci-plasa-30x34/`, `/saci-plasa-40x58/`, `/saci-plasa-52x72/`,
  `/sac-polipropilena-50x80/`, `/sac-polipropilena-50x100/`), `FAQPage` with 6
  questions.
- `/categorie/plasa/`: `ItemList` with the 3 product URLs of the category.
- `/saci-plasa-30x34/`: title `Saci Plasă 30x34 – Chișinău | Saci.md`, canonical
  `https://saci.md/saci-plasa-30x34/`, visible breadcrumb
  `Home / Plasă / Saci Plasă 30x34`, `BreadcrumbList` with the same three levels.
  The `offers` node is absent, because the product has no price yet.
- Every page: `Organization` and `LocalBusiness`.

## Markdown twins

Every new page carries `<link rel="alternate" type="text/markdown">` to its twin.
The twins return 200.

## Notes

- The preview serves the production domain inside the JSON-LD and in the
  canonical. That is the site config and it is correct for master.
- The live check runs on the preview, not on saci.md. The production URLs come
  after the merge and the deploy of master.
