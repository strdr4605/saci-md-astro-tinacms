// Deterministic SEO checks on the built site.
// Run with: npm run check:seo (needs `npm run build` first).
//
// The EXPECTATIONS block below is the contract. Each task in
// docs/seo/PLAN-saci-pentru-legume.md adds its own rules here in the same
// commit as the feature. Never delete or weaken a rule to make a check pass.

import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const distDir = fileURLToPath(new URL("dist/", root));
const SITE = "https://saci.md";

// ---------------------------------------------------------------- contract

// Routes that skip the universal rules. Keep this set empty if you can.
const EXEMPT = new Set();

// T6: pages that stay online but must not be indexed. Each one must exist in
// dist/, carry a robots noindex meta tag, and stay out of the sitemap.
// /old/ is a leftover duplicate of the old site.
const NOINDEX = new Set(["/old/"]);

// T7: image weight budget. Raster images only. SVG stays vector, so its size
// is not a page weight.
const IMAGE_SIZE_MAX = 250 * 1024;
const PNG_SIZE_MAX = 100 * 1024;
const RASTER_IMAGE = /\.(png|jpe?g|webp|gif|avif)$/i;

// T7: files owned by other tasks. Their size budget is not decided here.
// plasa_tubulara.jpg is loaded by content/products/Plasa-tubulara.md.
// simconstructgrup_poster.jpg is the source JPEG; the page loads the WebP.
const IMAGE_SIZE_EXEMPT = new Set([
  "plasa_tubulara.jpg",
  "simconstructgrup_poster.jpg",
]);

// Rules per route. Filled in by each task. Keys are site paths.
//   titleMentions     words that must appear in the <title>
//   descriptionMentions words that must appear in the meta description
//   h1Mentions        words that must appear in the <h1>
//   minWords          minimum count of words in the page text
//   jsonLdTypes       required @type values in the JSON-LD
//   links             paths that must appear as internal links
//   minProseWords     minimum count of words inside <p> tags of <main>
//   productsOf        category file; the page must link to every product of
//                     it and hold an ItemList with exactly their URLs
//   navId             id of a <nav>; navLinks must be in it, navForbidden not
//   productSlugs      fixed list of product slugs; the page must link to every
//                     one of them and hold an ItemList with exactly their URLs
//   faqMin            minimum count of questions in the FAQPage node; every
//                     question must also be visible in the page text
//   h2Min             minimum count of <h2> headings in the page
//   articleSchema     the page must hold an Article or BlogPosting node with a
//                     headline, a datePublished and the author
//   productLinks      product slugs the page must link to; the Markdown twin
//                     must link to them too
//   textMentions      words that must appear in the page text
//   twinMentions      words that must appear in the Markdown twin
//   markdownTwin      the page has a .md twin, an alternate link and a Link
//                     header rule for it
//   llmsTxt           the page URL must be in llms.txt
// Every route in EXPECTATIONS must be in the sitemap and in dist/.
const categoryPage = (h1Word, categoryFile) => ({
  titleMentions: ["Chișinău"],
  descriptionMentions: ["Chișinău"],
  h1Mentions: [h1Word, "Chișinău"],
  minWords: 120,
  minProseWords: 120,
  jsonLdTypes: ["CollectionPage", "ItemList"],
  productsOf: categoryFile,
  markdownTwin: true,
  llmsTxt: true,
  links: ["/saci-pentru-legume/"],
});

const EXPECTATIONS = {
  // T1: the landing page for "saci pentru legume".
  "/saci-pentru-legume/": {
    titleMentions: ["Chișinău"],
    descriptionMentions: ["Chișinău"],
    h1Mentions: ["saci pentru legume", "Chișinău"],
    minWords: 300,
    minProseWords: 300,
    jsonLdTypes: ["CollectionPage", "ItemList", "FAQPage"],
    productSlugs: [
      "saci-plasa-30x34",
      "saci-plasa-40x58",
      "saci-plasa-52x72",
      "sac-polipropilena-50x80",
      "sac-polipropilena-50x100",
    ],
    faqMin: 5,
    links: [
      "/categorie/polipropilena/",
      "/categorie/plasa/",
      "/categorie/polietilena/",
      "/categorie/big-bags/",
    ],
    textMentions: [
      "rafie",
      "polipropilenă",
      "plasă",
      "polietilenă",
      "cartofi",
      "ceapă",
      "morcov",
      "30x34",
      "40x58",
      "52x72",
      "50x80",
      "50x100",
      "Nicolae Dimo 17/1",
      "069 149 730",
      "livrare în Chișinău",
    ],
    twinMentions: [
      "Saci pentru legume în Chișinău",
      "Nicolae Dimo 17/1",
      "069 149 730",
      "Preț la cerere",
    ],
    markdownTwin: true,
    llmsTxt: true,
  },
  // T8: the guide article "Cum alegi sacii pentru legume".
  "/ghid/cum-alezi-sacii-pentru-legume/": {
    titleMentions: ["Chișinău"],
    descriptionMentions: ["Chișinău"],
    h1Mentions: ["saci pentru legume", "Chișinău"],
    minWords: 700,
    minProseWords: 700,
    jsonLdTypes: ["Article", "FAQPage", "BreadcrumbList"],
    h2Min: 4,
    articleSchema: true,
    productLinks: [
      "saci-plasa-30x34",
      "saci-plasa-40x58",
      "saci-plasa-52x72",
      "sac-polipropilena-50x80",
      "sac-polipropilena-50x100",
    ],
    links: [
      "/saci-pentru-legume/",
      "/categorie/polipropilena/",
      "/categorie/plasa/",
      "/categorie/polietilena/",
      "/categorie/big-bags/",
    ],
    textMentions: [
      "rafie",
      "polipropilenă",
      "plasă",
      "polietilenă",
      "big bag",
      "cartofi",
      "ceapă",
      "morcov",
      "roșii",
      "30x34",
      "40x58",
      "52x72",
      "50x80",
      "50x100",
      "7 kg",
      "20 kg",
      "35 kg",
      "20–30 kg",
      "40 kg",
      "grosime",
      "angro",
      "Nicolae Dimo 17/1",
      "069 149 730",
      "livrare în Chișinău",
      "Moldova",
    ],
    twinMentions: [
      "Cum alegi saci pentru legume în Chișinău",
      "30x34",
      "40x58",
      "52x72",
      "50x80",
      "50x100",
      "Nicolae Dimo 17/1",
      "069 149 730",
    ],
    markdownTwin: true,
    llmsTxt: true,
  },
  // T2: product rules
  // T4: category pages and the home page navigation.
  "/categorie/polipropilena/": categoryPage(
    "polipropilenă",
    "content/categories/Polipropilena.md",
  ),
  "/categorie/plasa/": categoryPage("plasă", "content/categories/Plasa.md"),
  "/categorie/polietilena/": categoryPage(
    "polietilenă",
    "content/categories/Polietilena.md",
  ),
  "/categorie/big-bags/": categoryPage(
    "big bag",
    "content/categories/Big-bags.md",
  ),
  "/": {
    links: [
      "/categorie/polipropilena/",
      "/categorie/plasa/",
      "/categorie/polietilena/",
      "/categorie/big-bags/",
      "/saci-pentru-legume/",
    ],
    navId: "categories-nav",
    navLinks: [
      "/categorie/polipropilena/",
      "/categorie/plasa/",
      "/categorie/polietilena/",
      "/categorie/big-bags/",
    ],
    navForbidden: ["#Polipropilenă", "#Plasă", "#Polietilenă", "#Big bags"],
  },
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

// T6: every <url> entry must hold a valid <lastmod>.
const sitemapEntries = async () => {
  const xml = await readFile(join(distDir, "sitemap-0.xml"), "utf8");
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
    loc: match[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "",
    lastmod: match[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null,
  }));
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

const productsDir = fileURLToPath(new URL("content/products/", root));

// Product slugs per category file, read from the content front matter.
const productsByCategory = async () => {
  const map = new Map();

  for (const name of await readdir(productsDir)) {
    if (!name.endsWith(".md")) continue;

    const text = await readFile(join(productsDir, name), "utf8");
    const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const field = (key) =>
      front
        .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
        ?.trim()
        .replace(/^["']|["']$/g, "");

    const category = field("categoryPath");
    const slug = field("slug");
    if (!category || !slug) continue;

    map.set(category, [...(map.get(category) ?? []), slug]);
  }

  return map;
};

// Price and unit per product slug, read from the content front matter.
const productsBySlug = async () => {
  const map = new Map();

  for (const name of await readdir(productsDir)) {
    if (!name.endsWith(".md")) continue;

    const text = await readFile(join(productsDir, name), "utf8");
    const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    const field = (key) =>
      front
        .match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]
        ?.trim()
        .replace(/^["']|["']$/g, "");

    const slug = field("slug");
    if (!slug) continue;

    const price = Number(field("price"));

    map.set(slug, {
      price: Number.isFinite(price) && price > 0 ? price : undefined,
      unit: field("unit"),
      imgSrc: field("imgSrc"),
    });
  }

  return map;
};

const linksOf = (html) =>
  [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map((match) =>
    match[1].replace(/&amp;/g, "&"),
  );

const sameRoute = (href, path) =>
  normalizePath(new URL(href, SITE).pathname) === normalizePath(path);

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

  checkImageTags(path, html);

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

  if (expectations.minProseWords) {
    const main = html.match(/<main[\s>][\s\S]*?<\/main>/)?.[0] ?? "";
    const prose = [...main.matchAll(/<p[\s>][\s\S]*?<\/p>/g)]
      .map((match) => stripTags(match[0]))
      .join(" ");
    const words = prose.split(/\s+/).filter(Boolean).length;
    if (words < expectations.minProseWords) {
      fail(
        path,
        "min-prose-words",
        `${words} words in <main> paragraphs, need ${expectations.minProseWords}`,
      );
    }
  }

  if (expectations.productsOf) {
    const slugs = (await productIndex).get(expectations.productsOf) ?? [];
    if (slugs.length === 0) {
      fail(path, "category-products", `no products for ${expectations.productsOf}`);
    }
    const expected = slugs.map((slug) => normalizePath(`/${slug}/`)).sort();

    const lists = nodes.filter((node) => node["@type"] === "ItemList");
    const matches = lists.some((list) => {
      const urls = (list.itemListElement ?? [])
        .map((item) => item.url ?? item.item?.["@id"] ?? item.item)
        .filter((url) => typeof url === "string")
        .map((url) => normalizePath(new URL(url, SITE).pathname))
        .sort();
      return JSON.stringify(urls) === JSON.stringify(expected);
    });
    if (!matches) {
      fail(
        path,
        "itemlist-products",
        `no ItemList with the ${expected.length} product URLs of ${expectations.productsOf}`,
      );
    }

    const pageLinks = linksOf(html);
    for (const slug of slugs) {
      if (!pageLinks.some((href) => sameRoute(href, `/${slug}/`))) {
        fail(path, "category-product-link", `no link to /${slug}/`);
      }
    }
  }

  if (expectations.productSlugs) {
    const expected = expectations.productSlugs
      .map((slug) => normalizePath(`/${slug}/`))
      .sort();

    const lists = nodes.filter((node) => node["@type"] === "ItemList");
    const matches = lists.some((list) => {
      const urls = (list.itemListElement ?? [])
        .map((item) => item.url ?? item.item?.["@id"] ?? item.item)
        .filter((url) => typeof url === "string")
        .map((url) => normalizePath(new URL(url, SITE).pathname))
        .sort();
      return JSON.stringify(urls) === JSON.stringify(expected);
    });
    if (!matches) {
      fail(
        path,
        "itemlist-products",
        `no ItemList with the ${expected.length} product URLs ${expected.join(", ")}`,
      );
    }

    const pageLinks = linksOf(html);
    for (const slug of expectations.productSlugs) {
      if (!pageLinks.some((href) => sameRoute(href, `/${slug}/`))) {
        fail(path, "product-link", `no link to /${slug}/`);
      }
    }

    const twin = `${normalizePath(path).replace(/\/$/, "")}.md`;
    const twinText = await readFile(
      join(distDir, twin.replace(/^\//, "")),
      "utf8",
    ).catch(() => "");

    for (const slug of expectations.productSlugs) {
      if (!twinText.includes(`/${slug}/`)) {
        fail(path, "markdown-twin-product", `no /${slug}/ in ${twin}`);
      }
    }

    // The price of the product must be on the page and in the Markdown twin.
    const pageText = stripTags(html);
    for (const slug of expectations.productSlugs) {
      const { price, unit } = (await productPrices).get(slug) ?? {};
      const expectedPrice = price
        ? `${(price / 100).toFixed(2)} lei / ${unit?.trim() || "buc"}`
        : "Preț la cerere";

      if (!pageText.includes(expectedPrice)) {
        fail(path, "product-price", `${slug}: no "${expectedPrice}" on the page`);
      }

      if (!twinText.includes(expectedPrice)) {
        fail(
          path,
          "markdown-twin-price",
          `${slug}: no "${expectedPrice}" in ${twin}`,
        );
      }
    }
  }

  if (expectations.faqMin) {
    const faqNodes = nodes.filter((node) => node["@type"] === "FAQPage");
    const pageText = stripTags(html);

    if (faqNodes.length === 0) {
      fail(path, "faq-page-node", "no FAQPage node");
    } else {
      const questions = (faqNodes[0].mainEntity ?? []).filter(
        (item) => item?.["@type"] === "Question",
      );

      if (questions.length < expectations.faqMin) {
        fail(
          path,
          "faq-question-count",
          `${questions.length} questions, need ${expectations.faqMin}`,
        );
      }

      for (const question of questions) {
        const name = question.name ?? "";
        const answer = question.acceptedAnswer?.text ?? "";

        if (!name || !answer) {
          fail(path, "faq-question-complete", `empty question: ${name}`);
          continue;
        }

        if (!pageText.includes(stripTags(name).trim())) {
          fail(path, "faq-question-visible", `question not in page: ${name}`);
        }
      }
    }
  }

  if (expectations.h2Min) {
    const headings = [...html.matchAll(/<h2[\s>]/g)].length;
    if (headings < expectations.h2Min) {
      fail(path, "h2-count", `${headings} h2 headings, need ${expectations.h2Min}`);
    }
  }

  if (expectations.articleSchema) {
    const articles = nodes.filter(
      (node) => node["@type"] === "Article" || node["@type"] === "BlogPosting",
    );

    if (articles.length === 0) {
      fail(path, "article-schema", "no Article or BlogPosting node");
    } else {
      const article = articles[0];
      if (!article.headline) {
        fail(path, "article-headline", "no headline in the Article node");
      }
      if (!article.datePublished) {
        fail(path, "article-date-published", "no datePublished in the Article node");
      }
      const author = article.author;
      const authorName =
        typeof author === "string"
          ? author
          : (author?.name ?? author?.["@id"] ?? "");
      if (!String(authorName).includes("Sim Construct Grup")) {
        fail(path, "article-author", `author is "${authorName}"`);
      }
    }
  }

  if (expectations.productLinks) {
    const pageLinks = linksOf(html);
    for (const slug of expectations.productLinks) {
      if (!pageLinks.some((href) => sameRoute(href, `/${slug}/`))) {
        fail(path, "product-link", `no link to /${slug}/`);
      }
    }

    const twin = `${normalizePath(path).replace(/\/$/, "")}.md`;
    const twinText = await readFile(
      join(distDir, twin.replace(/^\//, "")),
      "utf8",
    ).catch(() => "");

    for (const slug of expectations.productLinks) {
      if (!twinText.includes(`/${slug}/`)) {
        fail(path, "markdown-twin-product", `no /${slug}/ in ${twin}`);
      }
    }
  }

  if (expectations.textMentions) {
    const pageText = stripTags(html);

    for (const word of expectations.textMentions) {
      if (!pageText.toLowerCase().includes(word.toLowerCase())) {
        fail(path, "text-mentions", `"${word}" missing from page text`);
      }
    }
  }

  if (expectations.twinMentions) {
    const twin = `${normalizePath(path).replace(/\/$/, "")}.md`;
    const twinText = await readFile(
      join(distDir, twin.replace(/^\//, "")),
      "utf8",
    ).catch(() => "");

    for (const word of expectations.twinMentions) {
      if (!twinText.toLowerCase().includes(word.toLowerCase())) {
        fail(path, "markdown-twin-mentions", `"${word}" missing from ${twin}`);
      }
    }
  }

  if (expectations.markdownTwin) {
    const twin = `${normalizePath(path).replace(/\/$/, "")}.md`;
    const twinFile = join(distDir, twin.replace(/^\//, ""));

    if (!existsSync(twinFile)) {
      fail(path, "markdown-twin-exists", `no file at ${twinFile}`);
    }

    const alternate = html.match(
      /<link[^>]*rel="alternate"[^>]*type="[^"]*markdown"[^>]*href="([^"]+)"/,
    );

    if (!alternate) {
      fail(path, "markdown-alternate-link", "no alternate markdown link");
    } else if (
      normalizePath(new URL(alternate[1], SITE).pathname) !==
      normalizePath(twin)
    ) {
      fail(
        path,
        "markdown-alternate-link",
        `${alternate[1]} vs ${twin}`,
      );
    }

    const headers = await readFile(join(distDir, "_headers"), "utf8").catch(
      () => "",
    );

    if (
      !headers.includes(
        `Link: <${twin}>; rel="alternate"; type="text/markdown"`,
      )
    ) {
      fail(path, "markdown-header-rule", `no Link header for ${twin}`);
    }
  }

  if (expectations.llmsTxt) {
    const llms = await readFile(join(distDir, "llms.txt"), "utf8").catch(
      () => "",
    );
    const url = `${SITE}${path}`;

    if (!llms.includes(url)) {
      fail(path, "llms-txt-mentions", `${url} missing from llms.txt`);
    }
  }

  if (expectations.navId) {
    const nav =
      html.match(
        new RegExp(
          `<nav[^>]*id="${expectations.navId}"[^>]*>[\\s\\S]*?<\\/nav>`,
        ),
      )?.[0] ?? "";
    if (!nav) {
      fail(path, "nav-present", `no <nav id="${expectations.navId}">`);
    }
    const navLinks = linksOf(nav);
    for (const required of expectations.navLinks ?? []) {
      if (!navLinks.some((href) => sameRoute(href, required))) {
        fail(path, "nav-link", `#${expectations.navId} has no link to ${required}`);
      }
    }
    for (const forbidden of expectations.navForbidden ?? []) {
      if (navLinks.some((href) => decodeURIComponent(href) === forbidden)) {
        fail(path, "nav-forbidden-link", `#${expectations.navId} still links to ${forbidden}`);
      }
    }
  }

  if (titles.length === 1) seenTitles.push({ path, value: titles[0][1] });
  if (descriptions.length === 1) {
    seenDescriptions.push({ path, value: attr(descriptions[0][0], "content") ?? "" });
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

  checkInternalLinks(path, html);
};

// T7: every <img> of the built pages needs alt, width and height, and its
// source must exist in dist/. Product images come from the content front
// matter. Their size belongs to the product task, so they have no fixed
// width and height.
const checkImageTags = (path, html) => {
  for (const match of html.matchAll(/<img[^>]*>/g)) {
    const tag = match[0];

    if (tag.match(/\balt="/) === null) {
      fail(path, "img-alt", tag.slice(0, 80));
    }

    const src = attr(tag, "src");
    const isProductImage = src && productImages.has(src);

    if (!isProductImage) {
      const width = attr(tag, "width");
      const height = attr(tag, "height");

      if (!width || !Number(width)) {
        fail(path, "img-width", tag.slice(0, 80));
      }

      if (!height || !Number(height)) {
        fail(path, "img-height", tag.slice(0, 80));
      }
    }

    if (src && !/^(https?:|data:|\/\/)/i.test(src)) {
      const target = decodeURIComponent(
        new URL(src, `https://saci.md${path}`).pathname,
      );

      if (!existsSync(join(distDir, target.replace(/^\//, "")))) {
        fail(path, "img-exists", `${src} -> ${target}`);
      }
    }
  }
};

// T7: every image file in dist/ must stay inside the size budget. No PNG
// may be larger than the PNG budget.
const checkImageFiles = async () => {
  const files = [];

  const walkFiles = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkFiles(full);
      } else if (RASTER_IMAGE.test(entry.name)) {
        files.push(full);
      }
    }
  };

  await walkFiles(distDir);

  for (const file of files) {
    const name = file.slice(distDir.length).replace(/^\//, "");
    const size = (await stat(file)).size;

    if (IMAGE_SIZE_EXEMPT.has(name)) continue;

    if (size >= IMAGE_SIZE_MAX) {
      fail(name, "image-size", `${size} bytes, limit ${IMAGE_SIZE_MAX}`);
    }

    if (/\.png$/i.test(name) && size > PNG_SIZE_MAX) {
      fail(name, "png-size", `${size} bytes, limit ${PNG_SIZE_MAX}`);
    }
  }
};

// Every internal <a> and <link> target must exist in dist/. A path with a
// file extension (/categorie/plasa.md, /llms.txt) is a file. Any other path
// is a page folder with an index.html. Slugs with spaces arrive as %20.
const checkInternalLinks = (path, html) => {
  const hrefs = [
    ...html.matchAll(/<(?:a|link) [^>]*href="([^"]+)"/g),
  ].map((match) => match[1].replace(/&amp;/g, "&"));

  for (const href of hrefs) {
    if (/^(#|mailto:|tel:|https?:|\/\/)/i.test(href)) continue;
    const target = decodeURIComponent(
      new URL(href, `https://saci.md${path}`).pathname,
    );
    if (target.startsWith("/_astro") || target.startsWith("/admin")) continue;
    if (!existsSync(distTarget(target))) {
      fail(path, "internal-link-exists", `${href} -> ${target}`);
    }
  }
};

const distTarget = (target) => {
  const last = target.split("/").pop();
  return /\.[a-z0-9]+$/i.test(last)
    ? join(distDir, target.replace(/^\//, ""))
    : pageFile(target);
};

// T6: a noindex page must exist, carry noindex, and stay out of the sitemap.
const checkNoindexPage = async (path, paths) => {
  const file = pageFile(path);

  if (!existsSync(file)) {
    fail(path, "noindex-page-exists", `no file at ${file}`);
    return;
  }

  const html = await readFile(file, "utf8");
  const robots = html.match(/<meta[^>]*name="robots"[^>]*>/i)?.[0] ?? "";

  if (!/content="[^"]*noindex/i.test(robots)) {
    fail(path, "noindex-meta", "no robots noindex meta tag");
  }

  if (paths.some((sitemapPath) => normalizePath(sitemapPath) === normalizePath(path))) {
    fail(path, "noindex-not-in-sitemap", "page is in sitemap-0.xml");
  }

  checkImageTags(path, html);
  checkInternalLinks(path, html);
};

// ---------------------------------------------------------------- run

if (!existsSync(join(distDir, "sitemap-0.xml"))) {
  throw new Error("dist/sitemap-0.xml is missing. Run `npm run build` first.");
}

const paths = await sitemapPaths();
const entries = await sitemapEntries();
const productIndex = productsByCategory();
const productPrices = productsBySlug();

// T7: the images that come from the content front matter.
const productImages = new Set(
  [...(await productPrices).values()]
    .map((product) => product.imgSrc)
    .filter(Boolean),
);
const seenTitles = [];
const seenDescriptions = [];

for (const route of Object.keys(EXPECTATIONS)) {
  if (!paths.some((path) => normalizePath(path) === normalizePath(route))) {
    fail(route, "expected-route-in-sitemap", "route is not in sitemap-0.xml");
  }
  if (!existsSync(pageFile(route))) {
    fail(route, "expected-route-exists", `no file at ${pageFile(route)}`);
  }
}

for (const { loc, lastmod } of entries) {
  if (!lastmod) {
    fail(loc, "sitemap-lastmod", "no <lastmod> in sitemap-0.xml");
  } else if (Number.isNaN(Date.parse(lastmod))) {
    fail(loc, "sitemap-lastmod", `invalid date "${lastmod}"`);
  }
}
if (entries.length !== paths.length) {
  fail("sitemap-0.xml", "sitemap-lastmod", `${entries.length} <url> entries, ${paths.length} <loc> entries`);
}

for (const path of NOINDEX) {
  await checkNoindexPage(path, paths);
}

for (const path of paths) {
  if (EXEMPT.has(path)) {
    note(path, "exempt from universal rules");
    continue;
  }
  await checkPage(path);
}

const reportDuplicates = (seen, check) => {
  const byValue = new Map();
  for (const { path, value } of seen) {
    byValue.set(value, [...(byValue.get(value) ?? []), path]);
  }
  for (const [value, owners] of byValue) {
    if (owners.length > 1) fail(owners.join(", "), check, `"${value}"`);
  }
};
reportDuplicates(seenTitles, "unique-title");
reportDuplicates(seenDescriptions, "unique-description");

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
  if (EXEMPT.has(page) || NOINDEX.has(page)) continue;
  if (!paths.some((path) => normalizePath(path) === normalizePath(page))) {
    note(page, "page is not in the sitemap");
  }
}

// T7: the image rules cover every built page, also the ones outside the
// sitemap.
await checkImageFiles();

for (const page of distPages) {
  if (EXEMPT.has(page) || NOINDEX.has(page)) continue;
  if (paths.some((path) => normalizePath(path) === normalizePath(page))) {
    continue;
  }

  const html = await readFile(pageFile(page), "utf8").catch(() => "");
  if (html) checkImageTags(page, html);
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
