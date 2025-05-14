import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "categories",
        label: "Categorii",
        path: "content/categories",
        format: "md",
        fields: [{ name: "name", label: "Category Name", type: "string" }],
      },

      {
        name: "products",
        label: "Produse",
        path: "content/products",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nume",
            description: "Numele produsului",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            label: "Imagine produs",
            name: "imgSrc",
          },
          {
            type: "string",
            name: "body",
            label: "Descriere",
            description: "Descrierea produsului",
            isBody: true,
          },
          {
            type: "string",
            name: "specs",
            label: "Specs",
            description: "Specificații produs. Listă caracteristici",
            list: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Link",
            description: "Exemplu: /big-bag-50x50-100mk",
          },
          {
            name: "categoryPath",
            label: "Category",
            description: "Categoria din care face parte",
            type: "reference",
            collections: ["categories"],
          },
        ],
      },
    ],
  },
});
