# SEO plan — "saci pentru legume" (Chișinău)

Target query: `de unde cumpăr saci pentru legume rafie polipropilenă Chișinău Moldova`.
Target URL: `https://saci.md/saci-pentru-legume/`.
Goal: top 10 organic for the query. Measure in Google Search Console (web).

## Status

All eight tasks are built and verified. The reports are in
`docs/seo/reports/`. The checker reads 33 pages with 0 failures.

| Task | Result | Notes |
|---|---|---|
| T1 landing page | PASS | 790 words, FAQ, CollectionPage + ItemList + FAQPage, 5 products |
| T2 price check | PASS | verification only, no code |
| T3 product pages | PASS | 24 pages: title, description, encoded canonical, breadcrumb, related products |
| T4 category pages | PASS | 4 pages, ItemList, Markdown twins |
| T5 local entity | PASS | LocalBusiness, /contact/, /despre-noi/ |
| T6 sitemap hygiene | PASS | /old/ noindex, lastmod on every URL |
| T7 images | PASS | public 20.8 MB to 3.5 MB, dimensions on every image |
| T8 guide article | PASS | 1300 words, Article + FAQPage schema |

Open, outside the reach of this branch:

- The price feature agent must add the category pages and the landing page to
  `src/pages/.well-known/ai-catalog.json.ts` and `src/pages/product-index.json.ts`.
- The price feature agent must write the currency in the Markdown twins.
- The owner must send the price list. The site then shows the prices with no
  code change. The checker fails if the landing page shows a wrong price.
- The owner must send the Google Business Profile URL, the Facebook URL, the
  email address, the CUI and the opening hours. Then `sameAs`, `openingHours`
  and the contact details follow in one small commit.
- `content/products/Saci-Plasa-40x58.md` says `40 x 50 cm` while the name and
  the slug say 40x58. The owner must confirm.

## Facts about the current site

Read these files before you change anything. Do not assume.

- No page targets "saci pentru legume". Categories are anchors on the home page only. See `src/components/Categories.astro` and `src/pages/index.astro`.
- Product pages hold one paragraph of text. See `content/products/*.md` and `src/pages/[productSlug].astro`.
- Product schema has no price. `offers` in `src/pages/[productSlug].astro` has only `priceCurrency` and `availability`.
- `availability` is always `InStock`. The `outOfStock` field in the content is ignored.
- `Organization.sameAs` is an empty array. See `src/layouts/Layout.astro`.
- The home page `h1` is "Saci și Big Bag-uri". It has no keyword and no city.
- The site has no breadcrumbs and no FAQ.
- `src/pages/old.astro` is a duplicate page. It is in `dist/sitemap-0.xml`. It has no `noindex`.
- `public/` holds PNG files of 1.2–2.2 MB that no page loads. See `public/Banner pentru agricultură, construcții și industrie.png` and the other PNG files.
- The site already serves `llms.txt`, `index.md`, per product `.md` files, `/.well-known/agent-skills/`, and `/webmcp.js`. Keep these working.

## Task list

Run the tasks in the order of the run order below. Each task ends with a commit.
A verifier agent checks each task.

### Ownership and run order

Another agent builds the price feature in the main workspace. It owns these
files: `src/content.config.ts`, `tina/config.ts`, `tina/tina-lock.json`,
`content/products/*.md`, `src/lib/pricing.ts`, `src/lib/markdown.ts`,
`src/components/CategoryProduct.astro`, `src/pages/[productSlug].astro`,
`src/pages/[productSlug].md.ts`, `src/pages/index.md.ts`,
`src/pages/product-index.json.ts`, `src/pages/.well-known/ai-catalog.json.ts`.

Its plan is `PLAN-preturi.md` in the main workspace. It runs in steps. Its work
is not on master yet.

| Order | Task | Files that the price feature does not own |
|---|---|---|
| 1 | T4 category pages | new `src/pages/categorie/[slug].astro` |
| 2 | T6 sitemap hygiene | `src/pages/old.astro`, `astro.config.mjs` |
| 3 | T5 local entity | `src/layouts/Layout.astro`, new contact pages |
| 4 | T8 guide article | new `src/pages/ghid/[slug].astro` |
| 5 | T1 landing page | new `src/pages/saci-pentru-legume.astro`, new `src/pages/saci-pentru-legume.md.ts` |
| 6 | T7 images | `public/`, `src/components/` |
| 7 | T3 product titles | waits for the price feature on master |
| 8 | T2 price check | waits for the price feature on master |

Before a task that touches a shared file, check that the price feature is on
master. Then move the workspace onto the new master.

```sh
jj log -r 'master' --no-graph -n 3
jj rebase -r master
```

## Price contract

The price feature owns the price. These rules come from `PLAN-preturi.md`.

- The field `price` holds an integer in bani. The value 4500 means 45.00 lei.
  The field is optional. The field `unit` holds `buc`, `set`, `rolă`, `kg`,
  `m²`, or `palet`. Empty means `buc`.
- A price shows as `45.00 lei / buc`. Two decimals, a point, no thousand
  separator. The text `cu TVA inclus` follows the price. The line
  `Preț angro: se discută individual.` follows it.
- A product with no price shows `Preț la cerere`.
- The helper `src/lib/pricing.ts` holds `formatPrice(bani, unit)` and
  `formatPriceBlock(price, unit)`. Use the helper. Do not write a second
  formatter.
- The product schema has `offers` only when the product holds a price. The
  `offers.price` is a string with two decimals. The `offers.priceCurrency` is
  `MDL`. The `offers.availability` comes from the `outOfStock` flag. The
  `offers.url` is the product URL.

### T1 — Landing page `/saci-pentru-legume/`

Files: `src/pages/saci-pentru-legume.astro`, `src/pages/saci-pentru-legume.md.ts`,
`src/lib/legume.ts`, `public/llms.txt`, `scripts/seo-check.mjs`.

Acceptance criteria:

- The URL `/saci-pentru-legume/` returns 200. The URL `/saci-pentru-legume.md`
  returns the Markdown twin.
- The `h1` contains "saci pentru legume" and "Chișinău".
- The page has at least 300 words of Romanian text. The text covers: rafie (polipropilenă), plasă, polietilenă; cartofi, ceapă, morcov; sizes; price; the address `str. Nicolae Dimo 17/1`; the phone `069 149 730`; delivery in Chișinău.
- The page shows these five products with links: `saci-plasa-30x34`, `saci-plasa-40x58`, `saci-plasa-52x72`, `sac-polipropilena-50x80`, `sac-polipropilena-50x100`.
- The page has a FAQ block with at least 5 questions and answers.
- The page shows the price of every product when the product holds a `price`
  value. It uses `formatPrice` from `src/lib/pricing.ts` when that file is on
  master. It shows `Preț la cerere` when the product holds no price.
- The page adds no field and no collection to `src/content.config.ts`. It reads
  the fields of the price feature.
- The copy lives in `src/lib/legume.ts`. The page and the Markdown twin import
  it. They do not repeat the text.
- The Markdown twin is the file `src/pages/saci-pentru-legume.md.ts`. It has
  its own builder. It does not change `src/lib/markdown.ts`.
- Schema: `CollectionPage` and `ItemList` with all product URLs. Schema: `FAQPage` with the same questions.
- The page is in `dist/sitemap-0.xml`.
- The home page links to `/saci-pentru-legume/`. Every category page links to
  it. The landing page links to the four category pages.
- `public/llms.txt` mentions the new page. The entry of
  `public/.well-known/ai-catalog.json` comes in the T2 wave, because the
  price agent owns that file.

### T2 — Price check (verification only)

The price feature is built by another agent. This task only checks it.
Files: none. The task writes the report `docs/seo/reports/T2-verify.md`.

Acceptance criteria:

- The price feature is on master.
- Every product page shows a price in lei. The value comes from the `price`
  field in bani.
- The product schema has `offers.price` in lei, `priceCurrency` "MDL", and
  `availability` "OutOfStock" for a product with `outOfStock: true`.
- The `availability` value matches the `outOfStock` flag.
- The landing page shows the same price as the product page.
- `scripts/seo-check.mjs` has a rule that checks the price. The rule came with
  the price feature. This task does not add the rule.

### T3 — Product title, description, breadcrumbs, related products

Files: `src/pages/[productSlug].astro`.

Acceptance criteria:

- The `title` tag contains the product name, the price, and "Chișinău". The length is at most 65 characters. The price part appears only when the product holds a `price` value.
- The `description` meta contains the product name, the use, and "Chișinău". The length is 70 to 160 characters.
- The `canonical` link is URL encoded. Three product slugs hold spaces.
- The page shows a visible breadcrumb: `Home / Polipropilenă / Sac Polipropilenă 50x100`.
- The schema has `BreadcrumbList` with the same three levels.
- The page links to at least two other products of the same category.
- The markdown twin `/{slug}.md` contains the price and the breadcrumb.

### T4 — Category pages

Files: `src/pages/categorie/[slug].astro`, `src/lib/categories.ts`, `src/components/CategoriesNavigation.astro`.

Acceptance criteria:

- The URLs `/categorie/polipropilena/`, `/categorie/plasa/`, `/categorie/polietilena/`, `/categorie/big-bags/` return 200.
- Each page has a unique `title`, a `description`, an `h1`, and at least 120 words of text.
- Each page has an `ItemList` schema with the product URLs of the category.
- The home page navigation links to these URLs. The old anchor links do not.
- Every category page is in `dist/sitemap-0.xml`.
- Every category page has a Markdown twin at `/categorie/<slug>.md`. The
  alternate link of the page is not a 404.
- `public/llms.txt` lists the four category pages.

### T5 — Local entity signals

Files: `src/layouts/Layout.astro`, `src/pages/contact.astro`, `src/pages/despre-noi.astro`.

Acceptance criteria:

- The schema has one `Organization` node with a non-empty `sameAs` array. It lists the Google Business Profile and the Facebook page.
- The schema has one `LocalBusiness` node with the address, `geo`, `openingHoursSpecification`, `telephone`, `areaServed`, and the price range.
- The `ContactPoint` node has `contactType` and `areaServed`.
- The pages `/contact/` and `/despre-noi/` return 200. They show the address, the phone, the email, the company ID, and the hours.
- The pages carry the `LocalBusiness` node and a `BreadcrumbList` node.
- The home page `title` contains "Chișinău". The home page `description` contains "Chișinău" and has at most 160 characters.

### T6 — Sitemap and index hygiene

Files: `src/pages/old.astro`, `astro.config.mjs`.

Acceptance criteria:

- `/old/` has a `noindex` meta tag and is no longer in `dist/sitemap-0.xml`.
- Every URL in `dist/sitemap-0.xml` returns 200 in the built output.
- The sitemap lists `lastmod` for each URL.
- `scripts/seo-check.mjs` reports zero broken internal links.

### T7 — Images and speed

Files: `public/*.png`, `src/components/*.astro`.

Acceptance criteria:

- No PNG file above 100 KB remains in `public/`. The unused files are deleted. The used files are WebP or AVIF.
- Every `img` element has an `alt` attribute.
- Every `img` element has `width` and `height` attributes.
- Images below the fold have `loading="lazy"`.

### T8 — Guide article

Files: `content/pages/*.md`, `src/pages/blog/[slug].astro`.

Acceptance criteria:

- The page `/ghid/cum-alezi-sacii-pentru-legume/` returns 200.
- The page has at least 600 words. It compares rafie, plasă, and polietilenă. It links to at least four products.
- The page has a `FAQPage` node and a `BreadcrumbList` node.
- The page is in `dist/sitemap-0.xml` and in `public/llms.txt`.

## Agent protocol

Work in the workspace `/Users/strdr4605/P/saci-md-seo`.
The jj bookmark is `feature/seo-saci-legume`. The base is `master`.

One task at a time. For each task:

1. Start a builder agent. It changes files and commits with jj.
2. Start a verifier agent. It only reads. It writes a report.
3. Fix the findings. Move to the next task.

```sh
# Builder
hc run --bg --name seo-build --cwd /Users/strdr4605/P/saci-md-seo /opt/homebrew/bin/pi -p \
  "Read docs/seo/PLAN-saci-pentru-legume.md. Implement task T1 only. Follow the acceptance criteria of T1. Update scripts/seo-check.mjs so the checker covers T1. Run npm run build:astro and npm run check:seo. Commit with jj (description starts with 'feat(seo):'). Report with hc send \$HC_TERMINAL_ID when done or stuck. Do not start other agents."

# Verifier
hc run --bg --name seo-verify --cwd /Users/strdr4605/P/saci-md-seo /opt/homebrew/bin/pi -p \
  "Read docs/seo/PLAN-saci-pentru-legume.md and .agents/skills/seo-verify/SKILL.md. Verify task T1 in the current jj working copy. Do not change any file except your report at docs/seo/reports/T1-verify.md. Run npm run build:astro and npm run check:seo. Report with hc send \$HC_TERMINAL_ID when done or stuck. Do not start other agents."
```

Notes for the agents:

- The workspace `node_modules` is a link to the node modules of the main workspace. Do not run `npm ci` or `npm install`. It breaks the build.
- Use `npm run build:astro`. The command `npm run build` also runs Tina. It needs the credentials of `.env`.
- Use `jj`, not git. Do not touch the bookmark `feature/seo-saci-legume` of another branch.

Rules for the builder:

- Change only the files that the task names. Add a file when the task needs one.
- Update `scripts/seo-check.mjs` in the same commit. Never weaken a rule to pass the check.
- Run `npm run check:seo` before the commit. The command must pass.
- Use jj, not git. One task, one commit.
- Keep the messages short. Write long findings to a file. Give the path.

Rules for the verifier:

- Read only. The only file it may write is its report.
- Check the acceptance criteria of the task. Check that the checker was not weakened.
- Report the findings as pass or fail per criterion. Give the file and the line for each fail.
- Keep the messages short. Write the findings to the report file. Give the path.

## Context budget

The parent agent watches the context size of every child agent. The size
grows fast when an agent reads the whole plan, the build log, and the files.
The limit of a session is 200000 tokens. The work stops at 120000 tokens.

Measure the size of all sessions of the workspace:

```sh
node scripts/agent-ctx.mjs --workspace /Users/strdr4605/P/saci-md-seo --max 120000
```

The command exits with code 1 when a session is above the limit.

| Context size | Action |
|---|---|
| below 100000 | None. Let the agent work. |
| 100000 to 120000 | Send the compact command to the agent. |
| above 120000 | Stop the agent. Take a hand over file. Start a new agent with that file. |

Compact command:

```sh
hc send seo-build "Context at N tokens. Run /compact now. Keep the task. Then report."
```

Stop and hand over command:

```sh
hc send seo-build "Context at N tokens. Stop now. Write the hand over file docs/seo/handoff/seo-build-T1.md. Then exit."
```

Hand over file format:

```markdown
# Hand over — <agent> — T<n>

Task: <name>
State: <what is done, what is left>
Files changed: <list>
Decisions: <choices and the reason>
Checker: <result of npm run check:seo>
Next steps: <the exact commands to run>
```

The new agent starts with the hand over file in its first message. It reads the
plan file and the hand over file. It does not read the old session.

### Commit split

Proposed commits, one per task, in the run order:

1. `chore(seo): plan, verification skill, checker, context monitor`
2. `feat(seo): category pages`
3. `fix(seo): remove duplicate old page from index and sitemap`
4. `feat(seo): landing page for saci pentru legume`
5. `feat(seo): local business schema, contact and about pages`
6. `feat(seo): guide article about bags for vegetables`
7. `perf(seo): webp images and lazy loading`
8. `feat(seo): product titles, breadcrumbs, related products` (after the price feature lands)
9. T2 is a check. It writes no code.

Push only after the user says "go".

## Verification layers

| Layer | What it checks | Who |
|---|---|---|
| L1 | The built output. `npm run check:seo` runs `scripts/seo-check.mjs`. | Builder and verifier |
| L2 | The content. The checklist in `.agents/skills/seo-verify/SKILL.md`. | Verifier agent |
| L3 | The diff. The checker must not be weaker than before. | Verifier agent |
| L4 | The live site. Fetch the URL. Run the Schema validator. | Verifier agent, after deploy |

## Open questions

These block tasks. Ask the user before you guess.

1. The price and the stock count for each product. T2 needs them.
2. The Google Business Profile URL and the Facebook page URL. T5 needs them.
3. The email address and the company ID. T5 needs them.
4. The opening hours of the warehouse. T5 needs them.
5. The name of the person who deploys to Netlify.
6. The need for a Russian version of the pages.
