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
        label: "Categories",
        path: "content/categories",
        format: "md",
        fields: [{ name: "name", label: "Category Name", type: "string" }],
      },

      {
        name: "bag",
        label: "Bags",
        path: "content/bags",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true,
          },
          {
            name: "categoryPath",
            label: "Category",
            type: "reference",
            collections: ["categories"],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          { type: "string", name: "slug", label: "Link" },
          {
            type: "image",
            label: "Bag image",
            name: "imgSrc",
          },
        ],
      },
    ],
  },
});
