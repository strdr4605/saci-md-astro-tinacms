import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  CATEGORY_PAGES,
  SITE_URL,
  categoryPagePath,
  productPath,
} from "../../lib/categories";

export const prerender = true;

export const getStaticPaths = () =>
  CATEGORY_PAGES.map((page) => ({
    params: { slug: page.slug },
    props: { page },
  }));

export const GET: APIRoute = async ({ props }) => {
  const { page } = props as { page: (typeof CATEGORY_PAGES)[number] };

  const products = (await getCollection("products"))
    .filter((product) => product.data.categoryPath === page.categoryPath)
    .sort((a, b) =>
      a.data.name.localeCompare(b.data.name, "ro", { numeric: true }),
    );

  const lines = [
    `# ${page.h1}`,
    "",
    page.description,
    "",
    ...page.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    "## Produse din această categorie",
    "",
    ...products.map(
      (product) =>
        `- [${product.data.name}](${SITE_URL}${productPath(product.data.slug)})`,
    ),
    "",
    "## Contact",
    "",
    "Sim Construct Grup S.R.L.",
    "Telefon: +373 69 149 730",
    "Adresă: str. Nicolae Dimo 17/1, Chișinău, Republica Moldova",
    "Hartă: https://maps.app.goo.gl/GAWu84AruE7GSy628",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
