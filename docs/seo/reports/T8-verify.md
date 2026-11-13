# T8 verification report — round 2 (guide copy only)

Verifier: independent. Read-only except this file. Build/check run in workspace.

## Criteria

1. FAIL — Round-1 findings: 6 of 7 removed (no "spal/jet de apă" `src/lib/legume.ts`, no "condiția de cumpărare", no "costă mai mult", no "nu oprește apa", no "țesătură mai groasă", no "reduce numărul de transporturi", no "roșii" in plasa product list `src/lib/legume.ts:86`). New unstated statements replace them (see F1–F3).
2. PASS — 7 kg `Saci-Plasa-30x34.md:9`; 20 kg `Saci-Plasa-40x58.md:9`; 35 kg `Saci-Plasa-52x72.md:9`; 20–30 kg `Sac-Polipropilena-50x80.md:6`; 40 kg `Sac-Polipropilena-50x100.md:5`; 30 kg + 120 microni `Saci-Polietilena-50x80-120mk.md:9`; 500 kg `SACI-BIB-BAGS-90X90X110.md:12`; 1 tonă `SACI-BIB-BAGS-90X90X160.md:12`; den 600–1200 `Sac-Polipropilena-50x80.md:11`; sizes 30x34/40x58/52x72/50x80/50x100 correct; big-bag sizes + europalet `SACI-BIB-BAGS-75X110X240.md:12`. Built page kg counts: 7 kg×3, 20 kg×3, 35 kg×4, 20–30 kg×3, 40 kg×4, 30 kg×2, 500 kg×1, 1 tonă×1.
3. PASS — cartofi, ceapă, morcov, rafie, plasă, polietilenă, big bag, "str. Nicolae Dimo 17/1"×6, "069 149 730"×10, "livrare în Chișinău și în Moldova" present in built guide (`dist/ghid/cum-alezi-sacii-pentru-legume/index.html`).
4. PASS — `npm run build:astro` OK; `npm run check:seo` → 31 pages, 0 failures, 0 notes.

## Findings

- F1 (blocker) `src/lib/legume.ts:113` — price factor "în funcție de ... frecvența comenzilor" is not stated anywhere on the site (site states mărime, grosime, cantitate only: `src/lib/categories.ts:37`, `src/lib/legume.ts:37,188,221`). This is the removed round-1 "condiția de cumpărare" defect re-introduced in new wording.
- F2 (blocker) `src/lib/legume.ts:87` — "sacul de 52x72 cm ... este alegerea uzuală" for a multi-producer depot is not stated on the site (`src/lib/categories.ts:47` says only "Alegeți mărimea după produs și după greutatea"). Same swap as removed "reduce numărul de transporturi".
- F3 (minor) `src/lib/legume.ts:121` — "După folosire, uscați sacii la loc aerisit" states a plasă cleaning/drying method; site states drying only for rafie (`content/products/Sac-Polipropilena-50x100.md:11`). Washing finding only partly fixed.
- F4 (minor, quality) `src/lib/legume.ts:112-113` — two consecutive paragraphs both start "Sacii se vând cu bucata și angro."; near-duplicate price copy.

VERDICT: FAIL
