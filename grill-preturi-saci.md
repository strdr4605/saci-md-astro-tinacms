# Grill Q&A — public price per unit for saci.md

Session date: 2026-11-08. Source: `/grilling` session with the site owner.
Outcome: implementation spec in `PLAN-preturi.md`. Owner questionnaire in `to-questionnaire-lista-preturi-saci.md`.

## Round 1 — model of the price

**Q1. What does the number mean?** "Preț de piață" is ambiguous: market/reference price, the owner's selling price, or both.
**Answer:** (b) single published selling price per product. It is the price the owner quotes. "De piață" means "current market rate", not a comparator.

**Q2. Which products get a price?** All products, or only bag categories?
**Answer:** All. Each carries its own unit.

**Q3. Unit of sale per product?** "Per bag" is wrong for sets, rolls, kg and m².
**Answer:** One `unit` field per product. Fixed list: `buc`, `set`, `rolă`, `kg`, `m²`, `palet`. Default `buc`.

**Q4. Wholesale note: global or per product?**
**Answer:** One sitewide note. No per-product field.

**Q5. Storage format and display format?**
**Answer:** (a) integer bani — `4500` = 45 lei. Currency MDL, TVA included. Display decisions later (Q13, Q20).

## Round 2 — where the price lives

**Q6. Where does the price render?**
**Answer:** (c) catalog card + product page + machine exports (`/product-index.json`, `/<slug>.md`, `/index.md`, `ai-catalog.json`). One helper used by all.

**Q7. Wholesale note: where, and who edits it?**
**Answer:** (a) hardcoded string next to the pricing helper. Rendered under every price on card and product page. No new collection, no CMS field.

**Q8. Product with no price yet?**
**Answer:** (b) show "Preț la cerere". Not an empty price, not zero.

**Q9. JSON-LD `offers`?**
**Answer:** (a) emit `offers` only when a price exists, with `price`, `priceCurrency: "MDL"`, `availability` derived from `outOfStock`, and `url`. (Today the block has `priceCurrency` but no `price` — invalid for Google rich results — and hardcodes `InStock` on every product, including out-of-stock ones.)

**Q10. Number format and VAT wording?**
**Answer:** (b) `1250.5 lei / buc` style — decimal point, no thousands separator — plus the TVA mention.

**Q11. Catalog ordering by price?**
**Answer:** No. Not asked for; current order stays.

**Q12. How does the owner enter 25 prices?**
**Answer:** (a) one product at a time in TinaCMS. No bulk price-list UI.

## Round 3 — entry UX and payload

**Q13. How does the owner type the price?**
**Answer:** Bani only. 45 lei = 4500. Storage and display both built around bani. Display rule settled in Q20.

**Q14. `unit`: free text or fixed list?**
**Answer:** Fixed list (`buc`, `set`, `rolă`, `kg`, `m²`, `palet`).

**Q15. Out-of-stock product: price still shown?**
**Answer:** (a) price shown, red "Stoc temporar epuizat" badge stays.

**Q16. What exactly goes into the machine exports?**
**Answer:** (a) `price` (number, lei) + `priceFormatted` (string) + `currency: "MDL"` + `unit` + `wholesaleNote` string.

**Q17. Where do the 25 prices come from?**
**Answer:** (a) the owner sends the price list. Fallback: ship empty, owner fills TinaCMS.

**Q18. Is there any purchase flow?**
**Answer:** (a) price display only. No cart, no checkout. Contact by phone.

## Round 4 — last details

**Q19. Making bani entry safe.**
**Answer:** (a) TinaCMS label "Preț (bani)" + description "Ex: 4500 = 45 lei / buc". Integer only.

**Q20. Decimal display rule.**
**Answer:** Always 2 decimals: `45.00 lei / buc`, `12.50 lei / buc`.

**Q21. TVA wording and placement.**
**Answer:** (a) `45.00 lei / buc · cu TVA inclus` on card and product page. Prices are TVA 20% inclusive — still to be confirmed by the owner.

**Q22. Wholesale note, exact text and placement.**
**Answer:** (a) directly under the price on card and product page. Text: "Preț angro: se discută individual."

**Q23. Product page price block.**
**Answer:** (a) price block directly under the title and badges, above the description. Below it the specs and a contact line "Prețuri și comenzi: 069 149 730".

## Send round — questionnaire for the owner

**S1. Who is the recipient?** The site owner himself (Sim Construct Grup, Moldova, non-technical, Romanian).

**S2. Does the recipient open TinaCMS?** No. The document carries a fill-in table.

**S3. How do answers come back?** (a) he fills the Markdown and sends it back; (c) he sends his existing list (Excel, WhatsApp, photo) and we transcribe.

**S4. Deadline and effort.** ~10 minutes, 3 days from sending; exact date left blank.

**S5. How much of the plan does he confirm?** Full plan in Romanian, business-level words, with a short optional "ce facem tehnic" section.

## Still open

- Owner price list for all 24 products (name, price in lei, unit).
- Confirmation that the quoted prices include TVA 20%.
- Deadline date for the questionnaire.
