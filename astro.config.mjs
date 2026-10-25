// @ts-check
import { defineConfig } from "astro/config";

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import yeskunallumami from "@yeskunall/astro-umami";

const encodePath = (path) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const findMarkdownFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(path)));
    } else if (entry.name.endsWith(".md")) {
      files.push(path);
    }
  }

  return files;
};

// Adds a per-page Link header for the markdown version of that page.
const markdownAlternates = {
  name: "markdown-alternates",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const headersPath = join(root, "_headers");
      const base = await readFile(headersPath, "utf8").catch(() => "");
      const markdownFiles = await findMarkdownFiles(root);

      const rules = [];

      for (const file of markdownFiles) {
        const filePath = relative(root, file).split(/[\\/]/).join("/");
        const href = `/${encodePath(filePath)}`;
        const pagePath =
          filePath === "index.md" ? "/" : `/${encodePath(filePath.slice(0, -3))}`;
        const links = [
          `  Link: </llms.txt>; rel="describedby"`,
          `  Link: </.well-known/ai-catalog.json>; rel="api-catalog"`,
          `  Link: <${href}>; rel="alternate"; type="text/markdown"`,
        ];

        rules.push(`${pagePath}\n${links.join("\n")}`);

        if (pagePath !== "/") {
          rules.push(`${pagePath}/\n${links.join("\n")}`);
        }
      }

      const section = `\n# Markdown alternatives for agents (generated)\n${rules.join("\n\n")}\n`;

      await writeFile(headersPath, `${base}${section}`);

      logger.info(`Added ${rules.length} markdown Link header rules`);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://saci.md",
  integrations: [
    react(),
    sitemap(),
    yeskunallumami({ id: "66be9a3f-6a8b-4cc7-9104-bf59fbf772d2" }),
    markdownAlternates,
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
