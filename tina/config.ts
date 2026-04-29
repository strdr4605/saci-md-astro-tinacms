import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

const categoryFields = [
  {
    name: "name",
    label: "Category Name",
    type: "string" as const,
    isTitle: true,
    required: true,
  },
];

const productFields = [
  {
    type: "string" as const,
    name: "name",
    label: "Name",
    isTitle: true,
    required: true,
  },
  {
    type: "image" as const,
    label: "Product Image",
    name: "imgSrc",
  },
  {
    type: "string" as const,
    name: "description",
    label: "Description",
    ui: { component: "textarea" },
  },
  {
    type: "string" as const,
    name: "specs",
    label: "Specifications",
    list: true,
  },
  {
    type: "string" as const,
    name: "slug",
    label: "Slug",
    description: "Example: sac-polipropilena-50x80",
  },
];

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
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

  schema: {
    collections: [
      {
        name: "categories_ro",
        label: "🇷🇴 Categorii",
        path: "content/ro/categories",
        format: "md",
        fields: categoryFields,
      },
      {
        name: "products_ro",
        label: "🇷🇴 Produse",
        path: "content/ro/products",
        format: "md",
        fields: [
          ...productFields,
          {
            name: "categoryPath",
            label: "Categorie",
            description: "Categoria din care face parte",
            type: "reference" as const,
            collections: ["categories_ro"],
          },
        ],
      },
      {
        name: "categories_en",
        label: "🇬🇧 Categories",
        path: "content/en/categories",
        format: "md",
        fields: categoryFields,
      },
      {
        name: "products_en",
        label: "🇬🇧 Products",
        path: "content/en/products",
        format: "md",
        fields: [
          ...productFields,
          {
            name: "categoryPath",
            label: "Category",
            description: "The category this product belongs to",
            type: "reference" as const,
            collections: ["categories_en"],
          },
        ],
      },
      {
        name: "categories_ru",
        label: "🇷🇺 Категории",
        path: "content/ru/categories",
        format: "md",
        fields: categoryFields,
      },
      {
        name: "products_ru",
        label: "🇷🇺 Товары",
        path: "content/ru/products",
        format: "md",
        fields: [
          ...productFields,
          {
            name: "categoryPath",
            label: "Категория",
            description: "Категория, к которой относится товар",
            type: "reference" as const,
            collections: ["categories_ru"],
          },
        ],
      },
    ],
  },
});
