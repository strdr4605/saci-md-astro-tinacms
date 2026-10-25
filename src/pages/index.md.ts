import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { buildIndexMarkdown } from "../lib/markdown";

export const prerender = true;

export const GET: APIRoute = async () => {
  const [products, categories] = await Promise.all([
    getCollection("products"),
    getCollection("categories"),
  ]);

  return new Response(buildIndexMarkdown(products, categories), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
