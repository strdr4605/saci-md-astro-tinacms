# T6 build report

Task: T6 — Sitemap and index hygiene
Commit: `fix(seo): remove duplicate old page from index and sitemap`

## Files changed

- `src/pages/old.astro` — adds `<meta name="robots" content="noindex, follow">`. The page stays online with status 200.
- `astro.config.mjs` — the sitemap integration gets a `filter` that drops `/old/` and a `serialize` that sets `lastmod` to the build date on every URL. The content has no date field.
- `scripts/seo-check.mjs` — new T6 rules (see below). `/old/` moved from `EXEMPT` to the new `NOINDEX` set. `EXEMPT` is now empty.

## New checker rules

| Check | Rule |
|---|---|
| `noindex-page-exists` | Every `NOINDEX` page has an `index.html` in `dist/`. |
| `noindex-meta` | Every `NOINDEX` page has a robots meta tag with `noindex`. |
| `noindex-not-in-sitemap` | No `NOINDEX` page is in `sitemap-0.xml`. |
| `sitemap-lastmod` | Every `<url>` in `sitemap-0.xml` has a valid `<lastmod>`. |
| `internal-link-exists` (extended) | Now checks `<a>` and `<link>` targets, on sitemap pages and on `NOINDEX` pages. A path with a file extension (for example `/categorie/plasa.md`, `/Saci%20Polietilena%2050x92.md`) must exist as a file in `dist/`. Other paths must exist as `<path>/index.html`. The path is decoded first, so `%20` slugs resolve. |

No existing rule was removed or weakened. Because `/old/` is no longer exempt, its absence from the sitemap is now enforced, and the `indexable` rule still fails any sitemap page that carries `noindex`.

## Check output

Old build (parent commit, dist before the change), new checker:

```
seo-check: 30 pages, 74 failures, 0 notes
```

Failures: `noindex-meta`, `noindex-not-in-sitemap`, `sitemap-lastmod` on all 30 URLs, and the universal rules on `/old/` (it was in the sitemap and no longer exempt).

New build (`npm run build:astro`, exit 0), new checker:

```
seo-check: 29 pages, 0 failures, 0 notes
```

Manual checks on the new `dist/`:

- `/old/` is not in `dist/sitemap-0.xml` (0 matches).
- 29 sitemap URLs. Each has an `index.html` in `dist/` and a `<lastmod>`. Example: `<loc>https://saci.md/</loc><lastmod>2026-11-13T13:06:33.595Z</lastmod>`.
- `dist/old/index.html` has `<meta name="robots" content="noindex, follow">`.
- Negative test: removal of `dist/categorie/plasa.md` and `dist/Saci Polietilena 50x92.md` gives 3 failures (2 `internal-link-exists`, 1 `markdown-twin-exists`). After the files were put back: 0 failures.

## Open points

1. `lastmod` is the build date for every URL. Each deploy changes all dates. Google may ignore `lastmod` when it does not match real changes. A per-file date (git or content `updatedAt`) is better. The price feature owns `src/content.config.ts`, so this task does not add a date field.
2. `/old/` keeps its old markup: 2 `h1`, no `alt`, no `lang="ro"`, no canonical. These do not matter for a `noindex` page. A redirect from `/old/` to `/` is an alternative if the page has no more use.
3. The link check does not check `img src` targets. T7 changes the images and can add that rule.
