type Category = {
  frontmatter: {
    name?: string;
    order?: number;
    hidden?: boolean;
  };
};

export type CategoryPage = {
  slug: string;
  categoryPath: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
};

export const SITE_URL = "https://saci.md";

// One landing page per main category, at /categorie/<slug>/.
// The other categories stay as anchors on the home page.
export const CATEGORY_PAGES: CategoryPage[] = [
  {
    slug: "polipropilena",
    categoryPath: "content/categories/Polipropilena.md",
    title: "Saci din polipropilenă (rafie) în Chișinău | Saci.md",
    description:
      "Saci din polipropilenă (rafie) pentru cartofi, cereale, făină și zahăr. Mărimi de la 35x65 la 100x150 cm. Depozit în Chișinău, livrare în Moldova.",
    h1: "Saci din polipropilenă (rafie) în Chișinău",
    paragraphs: [
      "Sacii din polipropilenă se mai numesc saci de rafie. Firele de polipropilenă sunt țesute într-o pânză densă și rezistentă. Sacul are fundul cusut și gura deschisă. Sacii sunt ușor de umplut, de legat și de stivuit.",
      "Folosiți acești saci pentru cartofi, ceapă, morcov, cereale, porumb, făină, zahăr și furaje. Ei sunt potriviți și pentru nisip, pământ și resturi din construcții. Țesătura rezistă la greutate și la razele solare.",
      "Avem saci în mai multe mărimi: 35x65, 50x80, 50x90, 50x100, 55x100, 55x105, 60x110 și 100x150 cm. Un sac de 50x80 cm ține 20–30 kg. Sacul de 100x150 cm este pentru produse voluminoase.",
      "Vindem sacii cu bucata și angro. Ridicați comanda de la depozitul din Chișinău, str. Nicolae Dimo 17/1, sau cereți livrare în Chișinău și în Moldova. Sunați la 069 149 730 pentru preț și stoc.",
    ],
  },
  {
    slug: "plasa",
    categoryPath: "content/categories/Plasa.md",
    title: "Saci din plasă pentru legume și fructe, Chișinău | Saci.md",
    description:
      "Saci din plasă pentru cartofi, ceapă, morcov și fructe. Mărimi 30x34, 40x58 și 52x72 cm, pentru 7–35 kg. Depozit în Chișinău, livrare în Moldova.",
    h1: "Saci din plasă pentru legume și fructe în Chișinău",
    paragraphs: [
      "Sacii din plasă sunt pentru legume și fructe. Plasa rară lasă aerul să circule. Astfel legumele rămân proaspete mai mult timp. Cumpărătorul vede clar ce este în sac.",
      "Folosiți sacii din plasă pentru cartofi, ceapă, morcov, ardei gras, varză și fructe. Sacul se leagă ușor la gură cu un șnur. Plasa de tip rașchel este rezistentă și ușor de manevrat. Culorile vii pun în valoare produsele la piață și în magazin.",
      "Avem trei mărimi. Sacul de 30x34 cm ține aproximativ 7 kg. Sacul de 40x58 cm ține aproximativ 20 kg. Sacul de 52x72 cm ține aproximativ 35 kg. Alegeți mărimea după produs și după greutatea pe care o vindeți.",
      "Vindem sacii din plasă cu bucata și angro, pentru fermieri și depozite de legume. Ridicați comanda de la depozitul din Chișinău, str. Nicolae Dimo 17/1, sau cereți livrare în Chișinău și în Moldova. Sunați la 069 149 730 pentru preț și stoc.",
    ],
  },
  {
    slug: "polietilena",
    categoryPath: "content/categories/Polietilena.md",
    title: "Saci din polietilenă pentru construcții, Chișinău | Saci.md",
    description:
      "Saci din polietilenă pentru nisip, pietriș, resturi din construcții și uz gospodăresc. Mărimi de la 32x62 la 50x92 cm. Depozit în Chișinău.",
    h1: "Saci din polietilenă în Chișinău",
    paragraphs: [
      "Sacii din polietilenă sunt făcuți dintr-o folie densă de plastic. Ei nu lasă să treacă apa și praful. Sunt potriviți pentru materiale grele și murdare.",
      "Folosiți acești saci pentru nisip, pietriș, pământ și resturi din construcții. Ei sunt buni și pentru gunoi, pentru depozitare și pentru mutări. În gospodărie țin lucrurile curate și uscate.",
      "Avem saci în mărimile 32x62, 35x65, 38x68, 43x70, 50x80 și 50x92 cm. Sacii mici țin 18–20 kg. Sacul de 50x80 cm vine în două grosimi, 80 și 120 microni, și ține până la 30 kg.",
      "Vindem sacii cu bucata și angro, pentru firme de construcții și pentru clienți privați. Ridicați comanda de la depozitul din Chișinău, str. Nicolae Dimo 17/1, sau cereți livrare în Chișinău și în Moldova. Sunați la 069 149 730 pentru preț și stoc.",
    ],
  },
  {
    slug: "big-bags",
    categoryPath: "content/categories/Big-bags.md",
    title: "Saci Big Bag din polipropilenă în Chișinău | Saci.md",
    description:
      "Saci Big Bag din polipropilenă cu 4 mânere, pentru nisip, cereale și deșeuri în vrac. Capacitate de 500 kg până la 1 tonă. Depozit în Chișinău.",
    h1: "Saci Big Bag în Chișinău",
    paragraphs: [
      "Sacii Big Bag sunt containere flexibile din polipropilenă țesută. Fiecare sac are 4 mânere pentru ridicare. Fundul este plat. Unele modele au un tub de încărcare sus și un tub de descărcare jos.",
      "Folosiți sacii Big Bag pentru transportul și depozitarea produselor în vrac. Ei sunt potriviți pentru cereale, nisip, pământ și materiale de construcție. Ei sunt buni și pentru deșeuri textile, metalice, din lemn și din plastic.",
      "Avem mărimile 90x90x90, 90x90x110, 90x90x160 și 75x110x240 cm. Un sac de 90x90x110 cm ține aproximativ 500 kg. Sacii de 90x90x160 și 75x110x240 cm țin aproximativ 1 tonă. Sacul de 75x110x240 cm are mărimea potrivită pentru europalet.",
      "Vindem sacii Big Bag cu bucata și angro, pentru ferme, depozite și firme de construcții. Ridicați comanda de la depozitul din Chișinău, str. Nicolae Dimo 17/1, sau cereți livrare în Chișinău și în Moldova. Sunați la 069 149 730 pentru preț și stoc.",
    ],
  },
];

export function selectCategories<T extends Category>(categories: T[]): T[] {
  return categories
    .filter((category) => !category.frontmatter.hidden)
    .sort((a, b) => {
      const orderA = a.frontmatter.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.frontmatter.order ?? Number.POSITIVE_INFINITY;

      if (orderA !== orderB) return orderA - orderB;

      return (a.frontmatter.name ?? "").localeCompare(b.frontmatter.name ?? "");
    });
}

// Link target for a category in the home page navigation.
// A category with its own page gets the page URL. The other categories keep the anchor.
export function categoryHref(categoryFile: string, categoryName: string): string {
  const page = CATEGORY_PAGES.find((candidate) =>
    categoryFile.includes(candidate.categoryPath),
  );

  return page ? categoryPagePath(page.slug) : `#${categoryName}`;
}

export function categoryPagePath(slug: string): string {
  return `/categorie/${slug}/`;
}

export function productPath(productSlug: string): string {
  return `/${encodeURIComponent(productSlug)}/`;
}
