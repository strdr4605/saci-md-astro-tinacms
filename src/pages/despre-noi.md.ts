import type { APIRoute } from "astro";
import { company } from "../lib/markdown";

export const prerender = true;

const buildDespreNoiMarkdown = () => {
  const lines = [
    `# Despre noi — ${company.name} în Chișinău`,
    "",
    `${company.name} produce și comercializează saci și ambalaje. Vindem cu bucata și angro.`,
    "",
    "## Ce producem și vândem",
    "",
    "Saci și ambalaje pentru legume, cereale, făină, zahăr, gunoi și material de construcții, plus big bags și alte ambalaje.",
    "",
    "## Adresă",
    "",
    company.address,
    "",
    "## Telefon",
    "",
    `Telefon: 069 149 730 (${company.phone})`,
    "",
    "## Hartă",
    "",
    company.map,
    "",
    "## Livrare",
    "",
    "Livrăm în Chișinău și în Republica Moldova.",
    "",
    "## Pagina companiei",
    "",
    `${company.site}/despre-noi/`,
    "",
  ];

  return lines.join("\n");
};

export const GET: APIRoute = async () => {
  return new Response(buildDespreNoiMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
