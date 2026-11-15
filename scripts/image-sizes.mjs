// Writes the natural size of every image of public/ into src/lib/image-sizes.json.
// The site keeps the images in public/, so Astro cannot read their size at build
// time. The map lets the components set correct width and height attributes.
// Run with: node scripts/image-sizes.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDir = join(root, "public");
const productsDir = join(root, "content/products");

const sizes = {};

for (const name of await readdir(publicDir)) {
  if (!/\.(png|jpe?g|webp|avif|gif)$/i.test(name)) continue;

  try {
    const meta = await sharp(join(publicDir, name)).metadata();
    if (meta.width && meta.height) sizes[`/${name}`] = [meta.width, meta.height];
  } catch {
    // Not a readable image. Skip it.
  }
}

const missing = [];

for (const name of await readdir(productsDir)) {
  if (!name.endsWith(".md")) continue;

  const text = await readFile(join(productsDir, name), "utf8");
  const src = text.match(/^imgSrc:\s*(.+)$/m)?.[1]?.trim();

  if (src && !sizes[src]) missing.push(`${name} -> ${src}`);
}

await writeFile(
  join(root, "src/lib/image-sizes.json"),
  `${JSON.stringify(sizes, null, 2)}\n`,
);

console.log(`image-sizes: ${Object.keys(sizes).length} images`);

if (missing.length > 0) {
  console.log(`missing sizes: ${missing.join(", ")}`);
}
