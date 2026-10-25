import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { buildProductMarkdown } from "../lib/markdown";

export const prerender = true;

export const getStaticPaths = (async () => {
  const products = await getCollection("products");

  return products.map((product: any) => ({
    params: { productSlug: product.data.slug },
    props: { product },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { product } = props as { product: any };

  const categories = await getCollection("categories");
  const category = categories.find(
    (item) => item.filePath === product.data.categoryPath,
  );

  return new Response(
    buildProductMarkdown(product, category?.data.name ?? ""),
    {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    },
  );
};
