# T1 verification (round 5)

Task: T1 — landing page `/saci-pentru-legume/`. Copy only. Workspace: `/Users/strdr4605/P/saci-md-seo`.
Build: `npm run build:astro` OK. Checker: `npm run check:seo` → `30 pages, 0 failures, 0 notes`.

## Items

1. PASS — F11 closed. `src/lib/legume.ts:35` (polietilenă): "…resturi din construcții, gunoi și pentru mutări… dar sunt utili pentru transport". `acoperirea paletilor` 0 in `src/lib/legume.ts` and 0 in `dist/saci-pentru-legume/index.html`. Uses match `src/lib/categories.ts:60` (polietilenă); `transport` supported by `content/products/Saci-Polietilena-32x62.md`.
2. FAIL — F12 half closed. `src/lib/legume.ts:37` and `:60`: "Prețul curent apare la fiecare produs din listă." No "Preț la cerere" claim left in the copy, so the sentence is true after the price list lands. It is false today: the five product cards in `dist/saci-pentru-legume/index.html` show `Preț la cerere` (5 hits, `formatPriceBlock` in `src/lib/pricing.ts:21`), the five product front matters hold no `price`. The copy contradicts the page it sits on. Fix: word it true in both states, e.g. "Fiecare produs din listă are prețul pe pagina lui." (2 sentences).
3. PASS — F14 closed. `cea mai` 0 and `cei mai` 0 in `src/lib/legume.ts` and in the built page. `src/lib/legume.ts:36` keeps only "sacul de 40x58 cm este cel mai potrivit" for a crate of potatoes: supported by `content/products/Saci-Plasa-40x58.md:8` (20 kg) and `src/lib/categories.ts:plasa`. "cei mai potriviți" for 50x80/50x100 is gone; that sentence now reads "folosiți sacii de polipropilenă de 50x80 cm și 50x100 cm".
4. FAIL — same defect as item 2: `src/lib/legume.ts:37` and `:60` state a fact the site does not support yet (a price on every product). No other unsupported claim found: rafie/plasă/polietilenă uses, capacities (7 kg / 20 kg / 35 kg / 20–30 kg / 40 kg), fundul cusut, șnurul de la gură, "după curățare sacii pot fi reciclați" all match `src/lib/categories.ts` and `content/products/Sac-Polipropilena-50x100.md:8`. Minor, non-blocking: `src/lib/legume.ts:34` "pe paleți sau în remorcă" is editorial (not stated on the site).
5. PASS — topic covered. cartofi, ceapă, morcov, roșii, rafie, plasă, polietilenă, sizes 30x34 / 40x58 / 52x72 / 50x80 / 50x100, `str. Nicolae Dimo 17/1`, `069 149 730`, livrare în Chișinău și în Moldova: all present in `src/lib/legume.ts` and in `dist/saci-pentru-legume/index.html` (roșii 5, `Nicolae Dimo 17/1` 6, `069 149 730` 8, `în Moldova` 8).
6. PASS — `npm run check:seo` → `30 pages, 0 failures, 0 notes`. `npm run build:astro` OK.

## Open, not T1's file

- F13 still open: copy uses `40x58` (`src/lib/legume.ts:34,36,54`), the product card prints `Dimensiuni sac: 40 x 50 cm` (`content/products/Saci-Plasa-40x58.md:6`). The copy matches `src/lib/categories.ts` and the slug; the front matter is the outlier. Owner of the price/data file must confirm.

VERDICT: FAIL
