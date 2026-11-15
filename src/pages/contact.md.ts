import type { APIRoute } from "astro";
import { company } from "../lib/markdown";

export const prerender = true;

const buildContactMarkdown = () => {
  const lines = [
    `# Contact — ${company.name} în Chișinău`,
    "",
    `${company.name} produce și comercializează saci și ambalaje. Vindem cu bucata și angro.`,
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
    `${company.site}/contact/`,
    "",
  ];

  return lines.join("\n");
};

export const GET: APIRoute = async () => {
  return new Response(buildContactMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
