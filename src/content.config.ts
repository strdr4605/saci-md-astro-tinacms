import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/products" }),
  schema: z.object({
    name: z.string(),
    imgSrc: z.string(),
    specs: z.string().array(),
    categoryPath: z.string(),
    slug: z.string(),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/categories" }),
  schema: z.object({
    name: z.string(),
  }),
});

export const collections = {
  products: productsCollection,
  categories: categoriesCollection,
};
