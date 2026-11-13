import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, productPath } from "../lib/categories";
import {
  LEGUME_FAQ,
  LEGUME_H1,
  LEGUME_PARAGRAPHS,
  LEGUME_PRODUCT_SLUGS,
  PRICE_ON_REQUEST,
} from "../lib/legume";

export const prerender = true;

export const GET: APIRoute = async () => {
  const products = (await getCollection("products"))
    .filter((product) => LEGUME_PRODUCT_SLUGS.includes(product.data.slug))
    .sort(
      (a, b) =>
        LEGUME_PRODUCT_SLUGS.indexOf(a.data.slug) -
        LEGUME_PRODUCT_SLUGS.indexOf(b.data.slug),
    );

  const lines = [
    `# ${LEGUME_H1}`,
    "",
    ...LEGUME_PARAGRAPHS.flatMap((paragraph) => [paragraph, ""]),
    "## Saci pentru legume: mărimi și preț",
    "",
    ...products.flatMap((product) => [
      `- [${product.data.name}](${SITE_URL}${productPath(product.data.slug)}) — ${(product.data.specs ?? []).join(", ")} — ${PRICE_ON_REQUEST}`,
    ]),
    "",
    "## Mai multe tipuri de saci",
    "",
    `- [Saci din polipropilenă (rafie) pentru recolte și cereale](${SITE_URL}/categorie/polipropilena/)`,
    `- [Saci din plasă pentru cartofi, ceapă, morcov și fructe](${SITE_URL}/categorie/plasa/)`,
    `- [Saci din polietilenă pentru nisip, gunoi și construcții](${SITE_URL}/categorie/polietilena/)`,
    "",
    "## Întrebări frecvente",
    "",
    ...LEGUME_FAQ.flatMap((entry) => [
      `### ${entry.question}`,
      "",
      entry.answer,
      "",
    ]),
    "## Contact și livrare în Chișinău",
    "",
    "Sim Construct Grup S.R.L.",
    "Telefon: 069 149 730",
    "Adresă: str. Nicolae Dimo 17/1, Chișinău, Republica Moldova",
    "Livrare în Chișinău, ridicare de la depozit.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
