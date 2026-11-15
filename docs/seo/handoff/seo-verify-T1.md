# Hand over — seo-verify — T1

Task: verify T1 (landing page /saci-pentru-legume/) in
`/Users/strdr4605/P/saci-md-seo`.

## State

Round 1 failed with 8 findings. The builder fixed them in the commit
`fix(seo): landing page shows the product price`. The round 2 verifier ran out
of context (215k tokens) before it wrote the report. Round 3 starts here.

Commits of the task, oldest first:

1. `feat(seo): landing page for saci pentru legume`
2. `docs(seo): use pi agents in the agent protocol`
3. `fix(seo): landing page shows the product price`

The branch `feature/seo-saci-legume` sits on the pushed price branch
`feat/product-prices` (0b6f2aad). The commit ids of the task changed in the
rebase. Use `jj log --no-graph -n 6` for the current ids.

## Fixes to check

- The page and the twin read `product.data.price` and `product.data.unit` and
  use `formatPriceBlock` from `src/lib/pricing.ts`.
- The checker has a price rule. It reads the price from the front matter and
  requires the same price on the page and in the twin.
- The copy has no same day delivery, no opening hours, no retail pack.
- The FAQ says width first, length second.
- The copy names roșii.
- The landing page links the four category pages.

## Proofs already done, do not repeat them

- Round 1 built the parent commit with the new checker: 7 failures. The rules
  have power.
- Round 1 mutated the built page: the rules caught it.
- The price rule was tested by the orchestrator: a product with `price: 4500`
  in a scratch build showed "45.00 lei / buc" on the page and the checker
  stayed at 0 failures. The rule compares the front matter with the page text.

## Still to check

- Every acceptance criterion of T1 in `docs/seo/PLAN-saci-pentru-legume.md`,
  section "T1 — Landing page".
- The diff touches no price feature file.
- The checker only adds rules.
- The Romanian copy holds no claim the site does not support.
