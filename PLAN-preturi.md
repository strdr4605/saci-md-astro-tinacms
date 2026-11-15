# Plan — public price per unit (saci.md)

Status: approved by owner of the site during a `/grilling` session. Full Q&A: `grill-preturi-saci.md`. Owner questionnaire: `to-questionnaire-lista-preturi-saci.md`.

## Decided

1. Price = the owner's public selling price, one per product.
2. Storage: integer **bani**. `4500` = 45 lei. MDL.
3. `unit` per product, fixed list: `buc`, `set`, `rolă`, `kg`, `m²`, `palet`. Empty = `buc`.
4. Display: always 2 decimals, decimal point, no thousands separator: `45.00 lei / buc`.
5. TVA text `cu TVA inclus` on card and product page.
6. Wholesale note, one sitewide string, directly under every price, card and product page: `Preț angro: se discută individual.`
7. No price set -> show `Preț la cerere`.
8. Out-of-stock product keeps its price and badge.
9. Price renders on: catalog card, product page, `/product-index.json`, `/<slug>.md`, `/index.md`, `/.well-known/ai-catalog.json`.
10. JSON-LD `offers` only when a price exists: `price` (string, 2 decimals), `priceCurrency: "MDL"`, `availability` from `outOfStock`, `url`. No `offers` key when there is no price.
11. Machine exports per product: `price` (number, lei), `priceFormatted` (string), `currency: "MDL"`, `unit`, `wholesaleNote`.
12. Product page: price block under title and badges, above the description; specs below; contact line `Prețuri și comenzi: 069 149 730`.
13. No cart, no checkout, no price sorting, no bulk price UI.
14. TinaCMS fields: `price` number, optional, label "Preț (bani)", description "Ex: 4500 = 45 lei / buc", integers only. `unit` string, optional, select from the fixed list.

## Files

| File | Change |
|---|---|
| `tina/config.ts` | products collection: add `price`, `unit` |
| `src/content.config.ts` | products schema: `price: z.number().int().optional()`, `unit: z.string().optional()` |
| `src/lib/pricing.ts` (new) | `formatPrice`, `WHOLESALE_NOTE`, `TVA_LABEL`, `formatPriceBlock` |
| `src/components/CategoryProduct.astro` | replace the dead `frontmatter.price/100` block with price line + wholesale note + "Preț la cerere" fallback |
| `src/pages/[productSlug].astro` | price block under title; contact line; JSON-LD `offers` fix |
| `src/lib/markdown.ts` | price line + wholesale note in `buildProductMarkdown`; price in `buildIndexMarkdown` |
| `src/pages/product-index.json.ts` | price fields per product |
| `src/pages/.well-known/ai-catalog.json.ts` | price fields per product |
| `content/products/*.md` (24) | add `price` and `unit` frontmatter, once the owner sends the price list |

## Helper API (`src/lib/pricing.ts`)

```ts
export const WHOLESALE_NOTE = "Preț angro: se discută individual.";
export const TVA_LABEL = "cu TVA inclus";
export const UNIT_OPTIONS = ["buc", "set", "rolă", "kg", "m²", "palet"];

formatPrice(bani: number, unit?: string): string   // "45.00 lei / buc"
formatPriceBlock(price: number | undefined, unit?: string): string
// price present -> "45.00 lei / buc · cu TVA inclus\nPreț angro: se discută individual."
// price missing -> "Preț la cerere"
```

## Steps

- Step 1: schema + `src/lib/pricing.ts`.
- Step 2: catalog card + product page + JSON-LD.
- Step 3: machine exports (`markdown.ts`, `product-index.json.ts`, `ai-catalog.json.ts`).

Each step: one implementation agent, then one verification agent (read-only review + `npm run build`).

## Verification

`npm run build` (tinacms build + astro build). Then check one product page (price block, "Preț la cerere" fallback, JSON-LD `offers`), one catalog card, `/product-index.json`, `/<slug>.md`, `/index.md`.

## Open

- Owner price list for all 24 products.
- Confirmation that prices include TVA 20%.
