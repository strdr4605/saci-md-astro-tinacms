// Deterministic SEO checks on the built site.
// Run with: npm run check:seo (needs `npm run build` first).
//
// The EXPECTATIONS block below is the contract. Each task in
// docs/seo/PLAN-saci-pentru-legume.md adds its own rules here in the same
// commit as the feature. Never delete or weaken a rule to make a check pass.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const distDir = fileURLToPath(new URL("dist/", root));
const SITE = "https://saci.md";

// ---------------------------------------------------------------- contract

// Routes that skip the universal rules. /old/ is a leftover duplicate page.
// Task T6 removes this entry and adds the opposite rule.
const EXEMPT = new Set(["/old/"]);

// Rules per route. Filled in by each task. Keys are site paths.
//   titleMentions     words that must appear in the <title>
//   descriptionMentions words that must appear in the meta description
//   h1Mentions        words that must appear in the <h1>
//   minWords          minimum count of words in the page text
//   jsonLdTypes       required @type values in the JSON-LD
//   links             paths that must appear as internal links
const EXPECTATIONS = {
  // T1: "/saci-pentru-legume/": { ... }
  // T2: product rules
  // T4: "/categorie/<slug>/": { ... }
  // T5: "/": { ... }
};

const UNIVERSAL = {
  titleMin: 10,
  titleMax: 75,
  descriptionMin: 30,
  descriptionMax: 175,
};

// ---------------------------------------------------------------- helpers

const failures = [];
const notes = [];

const fail = (url, check, detail) =>
  failures.push({ url, check, detail });

const note = (url, text) => notes.push({ url, text });

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`));
  return match ? match[1] : null;
};

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ");

const normalizePath = (path) => {
  const clean = decodeURIComponent(path).replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

const pageFile = (path) => {
  const clean = normalizePath(path);
  return clean === "/"
    ? join(distDir, "index.html")
    : join(distDir, clean, "index.html");
};

const sitemapPaths = async () => {
  const xml = await readFile(join(distDir, "sitemap-0.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return decodeURIComponent(url.pathname);
  });
};

const jsonLdOf = (html) => {
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];

  return blocks.map((match) => {
    try {
      return { data: JSON.parse(match[1]), error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  });
};

const typesOf = (nodes) =>
  nodes.flatMap((node) =>
    Array.isArray(node["@graph"]) ? node["@graph"] : [node],
  );

// ---------------------------------------------------------------- checks

const checkPage = async (path) => {
  const file = pageFile(path);

  if (!existsSync(file)) {
    fail(path, "sitemap-route-exists", `no file at ${file}`);
    return;
  }

  const html = await readFile(file, "utf8");
  const expectations = EXPECTATIONS[path] ?? {};

  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  if (titles.length !== 1) {
    fail(path, "single-title", `found ${titles.length} title tags`);
  } else {
    const title = titles[0][1];
    if (
      title.length < UNIVERSAL.titleMin ||
      title.length > UNIVERSAL.titleMax
    ) {
      fail(
        path,
        "title-length",
        `${title.length} characters: "${title}"`,
      );
    }
    for (const word of expectations.titleMentions ?? []) {
      if (!title.toLowerCase().includes(word.toLowerCase())) {
        fail(path, "title-mentions", `"${word}" missing from title`);
      }
    }
  }

  const descriptions = [
    ...html.matchAll(/<meta[^>]*name="description"[^>]*>/g),
  ];
  if (descriptions.length !== 1) {
    fail(path, "single-description", `found ${descriptions.length}`);
  } else {
    const description = attr(descriptions[0][0], "content") ?? "";
    if (
      description.length < UNIVERSAL.descriptionMin ||
      description.length > UNIVERSAL.descriptionMax
    ) {
      fail(
        path,
        "description-length",
        `${description.length} characters`,
      );
    }
    for (const word of expectations.descriptionMentions ?? []) {
      if (!description.toLowerCase().includes(word.toLowerCase())) {
        fail(path, "description-mentions", `"${word}" missing`);
      }
    }
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/);
  if (!canonical) {
    fail(path, "canonical-present", "no canonical link");
  } else if (
    normalizePath(new URL(canonical[1], SITE).pathname) !==
    normalizePath(path)
  ) {
    fail(path, "canonical-matches-url", `${canonical[1]} vs ${path}`);
  }

  const headings = [...html.matchAll(/<h1[\s>]/g)];
  if (headings.length !== 1) {
    fail(path, "single-h1", `found ${headings.length} h1 tags`);
  } else {
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
    for (const word of expectations.h1Mentions ?? []) {
      if (!stripTags(h1).toLowerCase().includes(word.toLowerCase())) {
        fail(path, "h1-mentions", `"${word}" missing from h1`);
      }
    }
  }

  if (/name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
    fail(path, "indexable", "page carries noindex");
  }

  if (!/<html[^>]*lang="ro"/i.test(html)) {
    fail(path, "lang-ro", "html lang is not ro");
  }

  const images = [...html.matchAll(/<img[^>]*>/g)];
  for (const image of images) {
    if (image[0].match(/\balt="/) === null) {
      fail(path, "img-alt", image[0].slice(0, 80));
    }
  }

  const blocks = jsonLdOf(html);
  blocks.forEach((block, index) => {
    if (block.error) {
      fail(path, "jsonld-parses", `block ${index}: ${block.error}`);
    }
  });

  const nodes = typesOf(
    blocks.filter((block) => block.data).map((block) => block.data),
  );

  for (const type of expectations.jsonLdTypes ?? []) {
    if (!nodes.some((node) => node["@type"] === type)) {
      fail(path, "jsonld-type", `no ${type} node`);
    }
  }

  if (expectations.minWords) {
    const words = stripTags(html).split(/\s+/).filter(Boolean).length;
    if (words < expectations.minWords) {
      fail(path, "min-words", `${words} words, need ${expectations.minWords}`);
    }
  }

  const links = [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const required of expectations.links ?? []) {
    const found = links.some((href) =>
      normalizePath(new URL(href, SITE).pathname) ===
      normalizePath(required),
    );
    if (!found) {
      fail(path, "internal-link", `no link to ${required}`);
    }
  }

  for (const href of links) {
    if (/^(#|mailto:|tel:|https?:)/i.test(href)) continue;
    const target = decodeURIComponent(
      new URL(href, `https://saci.md${path}`).pathname,
    );
    if (target.startsWith("/_astro") || target.startsWith("/admin")) continue;
    if (!existsSync(pageFile(target))) {
      fail(path, "internal-link-exists", `${href} -> ${target}`);
    }
  }
};

// ---------------------------------------------------------------- run

if (!existsSync(join(distDir, "sitemap-0.xml"))) {
  throw new Error("dist/sitemap-0.xml is missing. Run `npm run build` first.");
}

const paths = await sitemapPaths();

for (const path of paths) {
  if (EXEMPT.has(path)) {
    note(path, "exempt from universal rules");
    continue;
  }
  await checkPage(path);
}

const distPages = [];
const walk = async (dir, prefix = "") => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "admin" || entry.name === "_astro") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, `${prefix}/${entry.name}`);
    } else if (entry.name === "index.html") {
      distPages.push(prefix === "" ? "/" : `${prefix}/`);
    }
  }
};
await walk(distDir);

for (const page of distPages) {
  if (EXEMPT.has(page)) continue;
  if (!paths.some((path) => normalizePath(path) === normalizePath(page))) {
    note(page, "page is not in the sitemap");
  }
}

for (const { url, check, detail } of failures) {
  console.error(`FAIL ${url} ${check}: ${detail}`);
}
for (const { url, text } of notes) {
  console.log(`note ${url}: ${text}`);
}

console.log(
  `seo-check: ${paths.length} pages, ${failures.length} failures, ${notes.length} notes`,
);

if (failures.length > 0) process.exit(1);
