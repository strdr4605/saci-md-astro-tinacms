import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const productsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/products" }),
  schema: z.object({
    name: z.string(),
    imgSrc: z.string(),
    specs: z.string().array().optional(),
    categoryPath: z.string(),
    slug: z.string(),
    outOfStock: z.boolean().optional(),
    price: z.number().int().optional(),
    unit: z.string().optional(),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/categories" }),
  schema: z.object({
    name: z.string(),
    order: z.number().optional(),
    hidden: z.boolean().optional(),
  }),
});

export const collections = {
  products: productsCollection,
  categories: categoriesCollection,
};
