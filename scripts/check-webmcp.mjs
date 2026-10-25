// Self-check for public/webmcp.js: stubs the browser globals and verifies
// that the four catalog tools register and that search_products returns hits.
// Run with: npm run check:webmcp (needs `astro build` first for dist/product-index.json)

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);

const index = JSON.parse(
  await readFile(new URL("dist/product-index.json", root), "utf8"),
);

const registered = [];

Object.defineProperty(globalThis, "navigator", {
  value: { modelContext: undefined },
  configurable: true,
});

globalThis.document = {
  modelContext: {
    registerTool: async (tool, options) => {
      registered.push({ tool, options });
    },
  },
};

globalThis.window = { addEventListener: () => {} };

globalThis.fetch = async () => ({
  ok: true,
  json: async () => index,
});

await import(new URL("public/webmcp.js", root));

await new Promise((resolve) => setTimeout(resolve, 100));

const names = registered.map((entry) => entry.tool.name).sort();

const expected = [
  "get_contact",
  "get_product",
  "list_categories",
  "search_products",
];

if (JSON.stringify(names) !== JSON.stringify(expected)) {
  throw new Error(`Unexpected tools: ${names.join(", ")}`);
}

if (!registered.every((entry) => entry.options?.signal)) {
  throw new Error("Missing AbortSignal in registerTool options");
}

const search = registered.find((entry) => entry.tool.name === "search_products");

const found = await search.tool.execute({ query: "50x80" });

if (!found.content[0].text.includes("Sac Polipropilenă 50x80")) {
  throw new Error("search_products did not find the 50x80 bag");
}

console.log("webmcp ok:", names.join(", "));
