# T1 verification (round 6)

Task: T1 — landing page `/saci-pentru-legume/`. Copy only. Workspace: `/Users/strdr4605/P/saci-md-seo`.

## Items

1. FAIL — F12 still open. `src/lib/legume.ts:37` and `src/lib/legume.ts:60`: "Prețul fiecărui produs este afișat pe pagina produsului." True after the price list lands (cards and product pages then print the price in lei). False today: the five landing cards print `Preț la cerere` (5 hits in `dist/saci-pentru-legume/index.html`, `formatPriceBlock` in `src/lib/pricing.ts:21`), the five product front matters hold no `price` (`content/products/Saci-Plasa-30x34.md` and the other four), and the product page prints `Preț la cerere` (1 hit in `dist/saci-plasa-30x34/index.html`). No price is displayed anywhere today, so the copy contradicts its own page. Fix: word it true in both states, e.g. "Prețul fiecărui produs se cere la 069 149 730 și apare pe pagina produsului."
2. PASS — topic named. `src/lib/legume.ts:37` (cartofi, ceapă, morcov, roșii), `:33` (rafie, plasă, polietilenă), `:33-36` and `:56` (sizes 30x34, 40x58, 52x72, 50x80, 50x100), `:37` and `:38` (str. Nicolae Dimo 17/1, 069 149 730, livrare în Chișinău și în Moldova). Same terms in the built page (`dist/saci-pentru-legume/index.html`): cartofi 12, ceapă 13, morcov 12, roșii 5, rafie 21, plasă 15, polietilenă 15, 30x34 16, 40x58 14, 52x72 14, 50x80 13, 50x100 13, `Nicolae Dimo 17/1` 6, `069 149 730` 8, `livrare în Chișinău` 3, `în Moldova` 8.
3. PASS — `npm run build:astro` OK (server built, 59 markdown Link rules). `npm run check:seo` → `seo-check: 30 pages, 0 failures, 0 notes`.

VERDICT: FAIL
