---
name: seo-verify
description: Verify an SEO task in the saci.md Astro site against the plan in docs/seo/PLAN-saci-pentru-legume.md. Use when checking a landing page, product page, category page, schema, sitemap, or image change before it ships. Runs the deterministic checker and reviews the content by hand.
---

# SEO verification (saci.md)

Verify one task of `docs/seo/PLAN-saci-pentru-legume.md`.
Read the task section. Then run the four layers below.
Report pass or fail per criterion. Give the file and the line for each fail.

Do not change source files. The only file you may write is your report.

Another agent builds the price feature. Do not fix the price feature. Report
its defects instead. The files it owns are `src/content.config.ts`,
`tina/config.ts`, `content/products/*.md`, and the offer block of
`src/pages/[productSlug].astro`.

## L1 — Deterministic checker

```sh
npm run build:astro # writes dist/
npm run check:seo   # scripts/seo-check.mjs
```

Do not run `npm ci` or `npm install`. The `node_modules` folder is a link to
the node modules of the main workspace.
Do not run `npm run build`. It also runs Tina and needs the credentials of `.env`.

The checker fails on a missing title, a missing or wrong description, a wrong
canonical, more or fewer than one `h1`, `noindex` on an indexable page,
broken JSON-LD, a missing schema node, a product offer without a price, an
image without `alt`, a broken internal link, a missing route, or a route in
the sitemap without a file in `dist/`.

A failing check is a fail. Report the check name and the URL.

## L2 — Content checklist

Check these by reading the built page and the source content.

- The `title` tag holds the product or page name, the price if there is one, and "Chișinău". Length 15 to 65 characters.
- The `description` meta holds the name, the use, and "Chișinău". Length 70 to 160 characters. It is not a slice of the body text.
- The `h1` holds the main query words. There is one `h1`.
- The page has the city, the address, the phone, and the delivery information for a local query.
- The text names the products a buyer wants: cartofi, ceapă, morcov, roșii, and the material names rafie, polipropilenă, plasă.
- The text is in Romanian. It has no English filler, no keyword stuffing, and no repeated sentence blocks.
- The page links to the products it sells. The link text names the product.
- The markdown twin exists for the page and holds the same facts as the HTML page.
- The page appears in `public/llms.txt` and in `public/.well-known/ai-catalog.json`.

## L3 — Diff check

```sh
jj diff --stat
jj diff
```

- The commit touches only the files that the task names.
- `scripts/seo-check.mjs` gained rules. It did not lose rules. Compare with the parent commit.
- The new schema types are correct for the page. A `Product` node sits on a product page. A `CollectionPage` node sits on a listing page.
- The `availability` value matches the `outOfStock` flag in the content.
- The prices in the page text equal the prices in the content files.

## L4 — Live check

Run this only for a deployed build.

```sh
curl -sS -o /dev/null -w '%{http_code}\n' https://saci.md/saci-pentru-legume/
```

- The live URL returns 200.
- The live page shows the same title as the built page.
- The JSON-LD parses in the Schema validator. The `Product` node has an `offers` node with `price` and `availability`.
- The site map at `https://saci.md/sitemap-0.xml` lists the new URL.

## Context budget

The parent agent measures the context of every agent:

```sh
node scripts/agent-ctx.mjs --workspace /Users/strdr4605/P/saci-md-seo --max 120000
```

| Context size | Action |
|---|---|
| below 100000 | Work. |
| 100000 to 120000 | Run `/compact` now. Keep the task. Report after the compact. |
| above 120000 | Stop. Write `docs/seo/handoff/<agent>-T<n>.md`. Exit. |

Keep the messages short. Put the findings in the report file. Give the path.
A session that grows fast must hand over instead of reading more files.

## Report format

Write the report to `docs/seo/reports/T<n>-verify.md`.

```markdown
# T<n> verification

Task: <name>
Commit: <jj change id>

## L1 checker
<pass or fail, with the check names>

## L2 content
- criterion: pass or fail (file:line)

## L3 diff
- criterion: pass or fail (file:line)

## L4 live
<pass, fail, or "not deployed">

## Verdict
pass | fail

## Findings
1. <finding> — <file:line> — <fix>
```

Send the verdict and the count of findings with
`hc send $HC_TERMINAL_ID "T<n>: <verdict>, <n> findings, report: <path>"`.
