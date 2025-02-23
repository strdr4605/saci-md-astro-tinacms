// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import yeskunallumami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    yeskunallumami({ id: "66be9a3f-6a8b-4cc7-9104-bf59fbf772d2" }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
});
