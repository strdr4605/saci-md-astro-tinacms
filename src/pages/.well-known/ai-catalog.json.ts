import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://saci.md";

// URN-safe identifier: ASCII, lowercase, dashes only
const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const queries: Record<string, string[]> = {
  Polipropilenă: [
    "saci albi din polipropilenă",
    "saci pentru zahăr și făină",
    "saci rafie 50x80",
  ],
  Polietilenă: [
    "saci de polietilenă pentru gunoi",
    "folie pentru materiale de construcții",
    "saci PE 50x80",
  ],
  Plasă: [
    "saci plasă pentru fructe și legume",
    "rașchel 30x34",
    "saci mesh pentru cireșe",
  ],
  "Big bags": [
    "big bags FIBC",
    "saci jumbo 90x90x110",
    "containere flexibile pentru cereale",
  ],
  "Plasă tubulară si stretch": [
    "plasă tubulară pentru ambalare",
    "stretch film pentru paletizare",
    "folie de împachetat palete",
  ],
  Altele: ["alte produse de ambalare", "saci și consumabile diverse"],
};

export const GET: APIRoute = async () => {
  const products = await getCollection("products");
  const categories = await getCollection("categories");

  const categoryEntries = categories.map((category) => ({
    identifier: `urn:air:saci.md:category:${slugify(category.data.name)}`,
    displayName: `${category.data.name} — catalog saci.md`,
    type: "text/html",
    url: `${SITE}/#${category.data.name}`,
    representativeQueries: queries[category.data.name] ?? [
      category.data.name.toLowerCase(),
    ],
  }));

  const productEntries = products.map((product) => ({
    identifier: `urn:air:saci.md:product:${slugify(product.data.slug)}`,
    displayName: product.data.name,
    type: "text/html",
    url: `${SITE}/${encodeURIComponent(product.data.slug)}`,
    representativeQueries: [
      product.data.name.toLowerCase(),
      `${product.data.name.toLowerCase()} preț`,
      `specificații ${product.data.name.toLowerCase()}`,
    ],
  }));

  const catalog = {
    specVersion: "1.0",
    host: {
      displayName: "Sim Construct Grup S.R.L. (saci.md)",
      identifier: "did:web:saci.md",
    },
    entries: [
      {
        identifier: "urn:air:saci.md:resource:llms-txt",
        displayName: "Catalog saci.md pentru agenți AI",
        type: "text/plain",
        url: `${SITE}/llms.txt`,
        representativeQueries: [
          "ce vinde saci.md",
          "catalog saci Moldova",
          "contact Sim Construct Grup",
        ],
      },
      {
        identifier: "urn:air:saci.md:resource:catalog-markdown",
        displayName: "Catalog saci.md în Markdown",
        type: "text/markdown",
        url: `${SITE}/index.md`,
        representativeQueries: [
          "catalog saci.md în markdown",
          "lista produselor cu dimensiuni",
        ],
      },
      ...categoryEntries,
      ...productEntries,
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
