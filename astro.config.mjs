// @ts-check
import { defineConfig } from "astro/config";

import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
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

// Every page that has a Markdown twin: products, the index, the categories.
// The agent skills are files, not pages. They get no twin rule.
const findMarkdownFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".well-known") continue;

    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
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
          `  Link: </.well-known/agent-skills/index.json>; rel="describedby"`,
          `  Link: </sitemap-index.xml>; rel="sitemap"`,
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

// Writes the Agent Skills discovery index with SHA-256 digests of each SKILL.md.
const agentSkillsIndex = {
  name: "agent-skills-index",
  hooks: {
    "astro:build:done": async ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const skillsDir = join(root, ".well-known", "agent-skills");
      const directories = await readdir(skillsDir, { withFileTypes: true });
      const skills = [];

      for (const directory of directories) {
        if (!directory.isDirectory()) continue;

        const file = join(skillsDir, directory.name, "SKILL.md");
        const bytes = await readFile(file).catch(() => null);

        if (!bytes) continue;

        const description =
          bytes
            .toString("utf8")
            .match(/^description:\s*(.+)$/m)?.[1]
            ?.trim() ?? "";

        skills.push({
          name: directory.name,
          type: "skill-md",
          description,
          url: `/.well-known/agent-skills/${directory.name}/SKILL.md`,
          digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
        });
      }

      await writeFile(
        join(skillsDir, "index.json"),
        JSON.stringify(
          {
            $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
            skills,
          },
          null,
          2,
        ),
      );

      logger.info(`Agent skills index: ${skills.length} skills`);
    },
  },
};

// /old/ is a duplicate of the old site. It stays online with noindex.
const EXCLUDED_FROM_SITEMAP = ["/old/"];

// The content has no date field. Every URL gets the build date as lastmod.
const BUILD_DATE = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  site: "https://saci.md",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !EXCLUDED_FROM_SITEMAP.includes(new URL(page).pathname),
      serialize: (item) => ({ ...item, lastmod: BUILD_DATE }),
    }),
    yeskunallumami({ id: "66be9a3f-6a8b-4cc7-9104-bf59fbf772d2" }),
    markdownAlternates,
    agentSkillsIndex,
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
