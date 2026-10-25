import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://saci.md";

export const GET: APIRoute = async () => {
  const [products, categories] = await Promise.all([
    getCollection("products"),
    getCollection("categories"),
  ]);

  const categoryName = (path: string) =>
    categories.find((c) => c.filePath === path)?.data.name ?? "";

  const data = {
    company: {
      name: "Sim Construct Grup S.R.L.",
      site: SITE,
      phone: "+37369149730",
      phoneDisplay: "069 149 730",
      address: "str. Nicolae Dimo 17/1, Chișinău, Republica Moldova",
      map: "https://maps.app.goo.gl/GAWu84AruE7GSy628",
    },
    categories: categories.map((category) => ({
      name: category.data.name,
      productCount: products.filter((p) =>
        category.filePath.includes(p.data.categoryPath),
      ).length,
    })),
    products: products.map((product) => ({
      name: product.data.name,
      slug: product.data.slug,
      url: `${SITE}/${encodeURIComponent(product.data.slug)}`,
      markdownUrl: `${SITE}/${encodeURIComponent(product.data.slug)}.md`,
      category: categoryName(product.data.categoryPath),
      specs: product.data.specs ?? [],
      description: product.body.trim(),
      image: product.data.imgSrc,
      outOfStock: product.data.outOfStock ?? false,
    })),
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
