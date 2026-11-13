# T8 verification report — round 2 (guide copy only)

Verifier: independent, read-only except this file. Build + check run in workspace.

## Criteria

1. PASS — all 7 round-1 unstated statements gone from `src/lib/legume.ts`: no spălare/jet de apă (0 hits, guide + site), no reuse of polietilenă (`src/lib/legume.ts:118-122` limits reuse to rafie), no "condiția de cumpărare" / no "frecvența comenzilor" (`src/lib/legume.ts:113` now only cantitate + mărime), no "costă mai mult" (0 hits), no "nu oprește apa" (0 hits), no "țesătură mai groasă" (0 hits), no "reduce numărul de transporturi" (`src/lib/legume.ts:87` now "Pentru cantități mai mari, sacul de 52x72 cm ține 35 kg"), no "roșii" in the plasa product list (`src/lib/legume.ts:86`); "roșii" stays only as a vegetable for mesh bags (`src/lib/legume.ts:141,164-170,179`). F1/F2/F3/F4 from round 1 closed.
2. PASS — 7 kg `content/products/Saci-Plasa-30x34.md:10`; 20 kg `Saci-Plasa-40x58.md:10`; 35 kg `Saci-Plasa-52x72.md:10`; 20–30 kg `Sac-Polipropilena-50x80.md:6`; 40 kg `Sac-Polipropilena-50x100.md:5`; 30 kg + 120 microni `src/lib/categories.ts:61`; 500 kg `SACI-BIB-BAGS-90X90X110.md:12`; 1 tonă `SACI-BIB-BAGS-90X90X160.md:12`; den 600–1200 `Sac-Polipropilena-50x80.md:11`; sizes 30x34/40x58/52x72/50x80/50x100 and big-bag sizes + europalet `src/lib/categories.ts:76`, `SACI-BIB-BAGS-75X110X240.md:13`. Built page holds each figure exactly once.
3. PASS — cartofi, ceapă, morcov, rafie, plasă, polietilenă, big bag, "str. Nicolae Dimo 17/1"×5, "069 149 730"×4, "livrare în Chișinău și în Moldova" all present in `dist/ghid/cum-alezi-sacii-pentru-legume/index.html`.
4. PASS — `npm run build:astro` OK; `npm run check:seo` → 31 pages, 0 failures, 0 notes.

## Findings (none blocking)

- F1 (minor, pre-existing) `src/lib/legume.ts:63` — "Un sac prea mic se rupe la încărcare" has no site source (no "rupe" in site copy). Text unchanged by round 2, accepted in round 1.
- F2 (minor, pre-existing) `src/lib/legume.ts:95` — "Sacul se umple cu lopata sau cu o mașină" is not stated on the site (guidance detail). Unchanged by round 2.
- F3 (minor) `src/lib/legume.ts:118` — heading "Cum se depozitează și se refolosesc sacii" is generic; body restricts reuse to rafie (`src/lib/legume.ts:120`).
- F4 (site, out of scope) `content/products/Saci-Plasa-40x58.md:7` — spec says "40 x 50 cm" while the product is 40x58.

VERDICT: PASS
