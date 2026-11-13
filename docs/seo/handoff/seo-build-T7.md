# Hand over — seo-build — T7

Task: T7 (images and speed) in `/Users/strdr4605/P/saci-md-seo`.

The first builder died with a connection error at 173k tokens. Its work is in the
jj working copy, not committed.

## Done

11 WebP files were created in public/: Menajeri, Plasa, Polietilena, Rafie,
big_bags, green2_55x95, hero, plasa_tubulara, polietilena100micron_50x80,
polietilena80micron_35x65, poster.

Check the quality and the size of each file. The rule: quality 80.

## To do

1. Convert the remaining PNG files that are larger than 100 KB and have no
   WebP yet: public/red2_55x95.png, public/white1_50x100.png,
   public/white1_55x95.png, public/white_50x100.png.
   Use: /opt/homebrew/bin/cwebp -q 80 <file> -o <file.webp>
2. Delete public/plasa_tubulara.webp. The JPEG plasa_tubulara.jpg is referenced
   by content/products/Saci-Plasa-tubulara.md, and that file belongs to another
   agent. Do not change it. Do not delete any JPEG.
3. Update every reference to a converted PNG:
   - src/layouts/Layout.astro (poster.png in the og:image)
   - src/pages/old.astro (all the PNG files)
   - any other file under src/ that still points to a .png
   Search with: grep -rn "\.png" src/ public/llms.txt public/.well-known/
4. Delete a PNG only when no file references it any more. Keep the WebP file.
   The six files Plasa.png, hero.png, Rafie.png, big_bags.png, Menajeri.png and
   Polietilena.png are used only by src/pages/old.astro.
5. Every <img> in the files you own must have alt, width and height, and
   loading="lazy". The hero image above the fold keeps loading="eager".
   Files you own: src/layouts/Layout.astro, src/pages/old.astro,
   src/components/*.astro except src/components/CategoryProduct.astro,
   src/pages/index.astro, src/pages/categorie/[slug].astro,
   src/pages/saci-pentru-legume.astro, src/pages/ghid/[slug].astro.
6. Do not touch: src/content.config.ts, tina/config.ts, tina/tina-lock.json,
   content/products/*.md, src/lib/pricing.ts, src/lib/markdown.ts,
   src/components/CategoryProduct.astro, src/pages/[productSlug].astro,
   src/pages/[productSlug].md.ts, src/pages/index.md.ts,
   src/pages/product-index.json.ts, src/pages/.well-known/ai-catalog.json.ts.
7. Checker rules in scripts/seo-check.mjs, added in the same commit:
   - every <img> of the built pages has alt, width and height,
   - every image file in dist/ is smaller than 250 KB,
   - no .png file in dist/ is larger than 100 KB,
   - every image src of the built pages exists in dist/.
   Never weaken or delete an existing rule.
8. Write docs/seo/reports/T7-build.md: files changed, size of public/ before and
   after, check output, open points.
9. Commit once: jj describe -m "perf(seo): webp images, dimensions and lazy loading" && jj commit

## Environment

- export PATH=/opt/homebrew/bin:$PATH
- node_modules is a symlink. Never run npm install or npm ci.
- Build: npm run build:astro. Check: npm run check:seo. Both must pass with 0 failures.
- The public folder was 21 MB before this task.

## Context budget

Stay under 80000 tokens. Do not read the plan file. Do not create a jj
worktree. Work in the order above and write the report as soon as the checks
pass.
