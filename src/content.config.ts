import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bagsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/bags" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    imgSrc: z.string(),
  }),
});

export const collections = {
  bags: bagsCollection,
};
