import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bagsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/bags" }),
  schema: z.object({
    name: z.string(),
    categoryPath: z.string(),
    slug: z.string(),
    imgSrc: z.string(),
    size: z.string(),
  }),
});

const categoriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/categories" }),
  schema: z.object({
    name: z.string(),
  }),
});

export const collections = {
  bags: bagsCollection,
  categories: categoriesCollection,
};
