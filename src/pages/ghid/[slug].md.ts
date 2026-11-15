import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, productPath } from "../../lib/categories";
import {
  GUIDE_AUTHOR,
  GUIDE_DATE_PUBLISHED,
  GUIDE_FAQ,
  GUIDE_H1,
  GUIDE_LEAD,
  GUIDE_PRODUCT_SLUGS,
  GUIDE_SECTIONS,
  GUIDE_SIZE_TABLE,
  GUIDE_SLUG,
} from "../../lib/legume";

export const prerender = true;

export const getStaticPaths = (async () => {
  return [{ params: { slug: GUIDE_SLUG } }];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async () => {
  const products = (await getCollection("products"))
    .filter((product) => GUIDE_PRODUCT_SLUGS.includes(product.data.slug))
    .sort(
      (a, b) =>
        GUIDE_PRODUCT_SLUGS.indexOf(a.data.slug) -
        GUIDE_PRODUCT_SLUGS.indexOf(b.data.slug),
    );

  const lines = [
    `# ${GUIDE_H1}`,
    "",
    `${GUIDE_AUTHOR} · ${GUIDE_DATE_PUBLISHED}`,
    "",
    ...GUIDE_LEAD.flatMap((paragraph) => [paragraph, ""]),
    "## Mărimile sacilor și capacitatea lor",
    "",
    "| Mărime | Tip | Capacitate | Pentru ce produs |",
    "| --- | --- | --- | --- |",
    ...GUIDE_SIZE_TABLE.map(
      (row) => `| ${row.size} | ${row.type} | ${row.capacity} | ${row.use} |`,
    ),
    "",
    ...GUIDE_SECTIONS.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    ]),
    "## Sacii din ghid, cu link la pagina produsului",
    "",
    ...products.flatMap((product) => [
      `- [${product.data.name}](${SITE_URL}${productPath(product.data.slug)}) — ${(product.data.specs ?? []).join(", ")}`,
    ]),
    "",
    "## Categoriile de saci de pe site",
    "",
    `- [Saci din polipropilenă (rafie) pentru recolte și cereale](${SITE_URL}/categorie/polipropilena/)`,
    `- [Saci din plasă pentru cartofi, ceapă, morcov și fructe](${SITE_URL}/categorie/plasa/)`,
    `- [Saci din polietilenă pentru nisip, gunoi și construcții](${SITE_URL}/categorie/polietilena/)`,
    `- [Saci Big Bag pentru recolte și volume mari](${SITE_URL}/categorie/big-bags/)`,
    `- [Toate sacii pentru legume din catalog](${SITE_URL}/saci-pentru-legume/)`,
    "",
    "## Întrebări frecvente",
    "",
    ...GUIDE_FAQ.flatMap((entry) => [
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
    "Livrare în Chișinău și în Moldova, ridicare de la depozit.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
