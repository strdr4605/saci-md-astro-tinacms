# T6 verification

Task: T6 — Sitemap and index hygiene
Commit: `uqtnroyp` (aa153a43) `fix(seo): remove duplicate old page from index and sitemap`
Parent: `loxprmxu` (e5b1beb5) `feat(seo): category pages`
Date: 2026-11-13

## Acceptance criteria

| # | Criterion | Result | File:line | Proof |
|---|---|---|---|---|
| 1 | `/old/` has `noindex` meta | PASS | `src/pages/old.astro:7` | `dist/old/index.html` holds `<meta name="robots" content="noindex, follow">` |
| 2 | `/old/` not in `dist/sitemap-0.xml` | PASS | `astro.config.mjs:136`, `astro.config.mjs:147` | `grep -c '/old/' dist/sitemap-0.xml` → `0` |
| 3 | `/old/` still returns 200 in the build | PASS | `src/pages/old.astro` | `dist/old/index.html` exists, 9.7k. No redirect for `/old/` in `netlify.toml` or `public/_redirects` |
| 4 | Every sitemap URL has a file in `dist/` | PASS | `dist/sitemap-0.xml` | script: `url entries 29`, `missing files []` |
| 5 | Every sitemap URL has `lastmod` | PASS | `astro.config.mjs:139`, `astro.config.mjs:148` | script: `no lastmod []`, one value `2026-11-13T13:16:24.773Z` |
| 6 | Checker reports zero broken internal links | PASS | `scripts/seo-check.mjs:468` | `npm run check:seo` → `seo-check: 29 pages, 0 failures, 0 notes`, exit 0 |

## L1 checker

PASS. `npm run build:astro` exit 0. `npm run check:seo` exit 0:
`seo-check: 29 pages, 0 failures, 0 notes`.

## L2 content

Not applicable. T6 adds no content. `/old/` keeps its old markup (2 `h1`, no
`alt`, no canonical). This does not matter for a `noindex` page.

## L3 diff

- Scope: PASS. The commit changes `astro.config.mjs`, `scripts/seo-check.mjs`,
  `src/pages/old.astro`, and adds `docs/seo/reports/T6-build.md`. No file of the
  price feature is touched (grep of `jj diff --stat` for the 12 owned paths: no match).
- Checker not weakened: PASS.
  - `EXEMPT` loses `/old/` (`scripts/seo-check.mjs:20`). `/old/` moves to the
    new `NOINDEX` set (`scripts/seo-check.mjs:25`). It skips only the universal
    rules of indexable pages, and gets the three noindex rules instead.
  - New rules: `noindex-page-exists` (:497), `noindex-meta` (:505),
    `noindex-not-in-sitemap` (:509), `sitemap-lastmod` (:538, :540, :544).
  - `internal-link-exists` is moved to `checkInternalLinks` (:468). It is
    stricter: it now reads `<link>` as well as `<a>`, and also runs on
    `NOINDEX` pages. A path with a file extension is checked as a file
    (`distTarget`, :485). Before, such a path was checked as
    `<path>/index.html` and always failed, so this is a fix, not a relaxation.
    The new skip of `//` hrefs covers protocol-relative external URLs only.
  - The `indexable` rule (:286) is unchanged. No rule is deleted or made to
    always pass.
- Power of the new rules: PROVEN. Parent `loxprmxu` built in workspace
  `/tmp/verify-T6-parent` (build exit 0) with the new checker:
  `seo-check: 30 pages, 74 failures, 0 notes`, exit 1. Failures by check:
  `sitemap-lastmod` 30, `noindex-meta` 1, `noindex-not-in-sitemap` 1,
  `img-alt` 37, `canonical-present` 1, `lang-ro` 1, `single-description` 1,
  `single-h1` 1, `title-length` 1 (the last six come from `/old/` that lost its
  exemption).
- Negative test of the extended link rule in the parent build: removal of
  `dist/categorie/plasa.md` gives
  `FAIL /categorie/plasa/ internal-link-exists: /categorie/plasa.md -> /categorie/plasa.md`.
  File put back after the test. Workspace removed with
  `jj workspace forget verify-T6-parent`.

## Side effects

- Markdown twin Link headers: PASS. `markdownAlternates` is unchanged. The
  build log shows `Added 57 markdown Link header rules`. All 57 rules in
  `dist/_headers` were parsed. Every page path has an `index.html`. Every Link
  target exists in `dist/` (`bad []`). The 8 category rules (4 slugs, with
  and without trailing slash) are present, for example `/categorie/plasa/` →
  `</categorie/plasa.md>`. Product rules with `%20` slugs resolve, for example
  `/Saci%20Polietilena%2050x92/`.
- `sitemap-index.xml`: PASS. Still built, points to `https://saci.md/sitemap-0.xml`.
  The `rel="sitemap"` Link header target exists.

## L4 live

Not deployed.

## Verdict

pass

## Findings

1. `lastmod` is the build date for all URLs. Each deploy changes all dates.
   Google can ignore a `lastmod` that does not follow real changes. —
   `astro.config.mjs:139` — later: use a per-page date (git or a content
   `updatedAt` field, after the price feature owns `src/content.config.ts`).
   Not a fail of T6.
2. Note: the working copy `@` (`lyumopym`) holds an edit of
   `docs/seo/PLAN-saci-pentru-legume.md` (T1 section) that this verifier did
   not make. It is not part of the T6 commit.

VERDICT: PASS
