// Copy of the landing page /saci-pentru-legume/.
// The page and the Markdown twin import this file. They do not repeat the text.

export const LEGUME_PATH = "/saci-pentru-legume/";

export type LegumeFaq = {
  question: string;
  answer: string;
};

export const LEGUME_TITLE =
  "Saci pentru legume în Chișinău: rafie, plasă, polietilenă | Saci.md";

export const LEGUME_DESCRIPTION =
  "Saci pentru legume în Chișinău: rafie din polipropilenă, saci din plasă și polietilenă pentru cartofi, ceapă, morcov. Livrare în Chișinău și în Moldova.";

export const LEGUME_H1 = "Saci pentru legume în Chișinău";

// The five products of the landing page.
export const LEGUME_PRODUCT_SLUGS = [
  "saci-plasa-30x34",
  "saci-plasa-40x58",
  "saci-plasa-52x72",
  "sac-polipropilena-50x80",
  "sac-polipropilena-50x100",
];

// The price comes from the product front matter through src/lib/pricing.ts.
// A product with no price shows "Preț la cerere" from formatPriceBlock.

export const LEGUME_PARAGRAPHS = [
  "Dacă vindeți cartofi, ceapă sau morcov și căutați saci pentru legume în Chișinău, la Sim Construct Grup găsiți trei familii de saci: rafie din polipropilenă, saci din plasă și saci din polietilenă. Sacii se vând cu bucata și angro. Depozitul este la str. Nicolae Dimo 17/1, Chișinău.",
  "Saci de rafie, adică saci țesuți din polipropilenă, au fundul cusut și gura deschisă. Sacul de 50x80 cm ține 20–30 kg, iar sacul de 50x100 cm ține până la 40 kg. Țesătura de polipropilenă este rezistentă la apă și la lumină, iar după curățare sacii pot fi reciclați. Pentru legume, rafie este alegerea bună când transportați cantități mari de cartofi sau ceapă, pe paleți sau în remorcă.",
  "Saci din plasă, de tip rașchel, sunt făcuți pentru legume delicate. Plasa rară lasă aerul să circule, iar produsele rămân proaspete mai mult timp. Cumpărătorul vede clar ce este în sac, iar sacul se leagă ușor cu șnurul de la gură. Sacul de 30x34 cm ține aproximativ 7 kg, sacul de 40x58 cm aproximativ 20 kg, iar sacul de 52x72 cm aproximativ 35 kg. Plasa este alegerea obișnuită pentru morcov, ceapă, roșii și ardei gras.",
  "Saci din polietilenă sunt folosiți pentru nisip, pietriș, pământ, resturi din construcții, gunoi și pentru mutări. Folia densă nu lasă să treacă apa și praful. Acești saci nu sunt aerisiți, de aceea nu se țin mult timp pentru legume, dar sunt utili pentru transport.",
  "Alegeți mărimea după produs și după greutatea pe care o vindeați. Pentru cantități mici, sacul de 30x34 cm este suficient. Pentru o ladă de cartofi, sacul de 40x58 cm este cel mai potrivit. Pentru morcov și ceapă vândute la kilogram, folosiți sacul de 52x72 cm. Pentru cereale și cantități mari, folosiți sacii de polipropilenă de 50x80 cm și 50x100 cm.",
  "Prețul se discută în funcție de mărime, de cantitate și de tipul de material. Prețul curent apare la fiecare produs din listă. Sunați la 069 149 730 și cereți prețul. Pentru ferme și depozite de legume pregătim și oferte de angro.",
  "Depozitul este la str. Nicolae Dimo 17/1, Chișinău. Ridicați comanda de acolo sau cereți livrare în Chișinău și în Moldova. Pentru alte localități din Republica Moldova, cereți la 069 149 730 posibilitatea livrării.",
];

export const LEGUME_FAQ: LegumeFaq[] = [
  {
    question: "Ce sac aleg pentru cartofi, ceapă, morcov și roșii?",
    answer:
      "Pentru cartofi și ceapă, care se vând în cantități mari și suportă greutate, alegeți sacul de rafie din polipropilenă. Pentru morcov, roșii și legume delicate, care trebuie să rămână proaspete, alegeți sacul din plasă. Sacul din polietilenă este pentru nisip, gunoi și construcții, nu pentru legume.",
  },
  {
    question: "Ce diferență este între sacii de rafie și sacii din plasă?",
    answer:
      "Sacii de rafie sunt țesuți din polipropilenă, cu fundul cusut. Țesătura lor este rezistentă la apă și la lumină. Sacii din plasă au ochiuri rare. Aerul circulă liber, legumele rămân proaspete, iar cumpărătorul vede conținutul sacului.",
  },
  {
    question: "Ce înseamnă mărimile 30x34, 40x58, 52x72, 50x80 și 50x100?",
    answer:
      "Sunt dimensiunile sacului, în centimetri. Sacul de 30x34 cm ține aproximativ 7 kg, cel de 40x58 cm aproximativ 20 kg, iar cel de 52x72 cm aproximativ 35 kg. Sacul de polipropilenă de 50x80 cm ține 20–30 kg, iar cel de 50x100 cm până la 40 kg.",
  },
  {
    question: "Cât costă sacii pentru legume?",
    answer:
      "Prețul depinde de mărime, de grosime și de cantitatea comandată. Prețul curent apare la fiecare produs din listă. Sunați la 069 149 730 și cereți prețul. Pentru comenzi de angro, discutăm prețul individual.",
  },
  {
    question: "Livrați sacii în Chișinău?",
    answer:
      "Da. Livrăm în Chișinău și în Moldova. Puteți și să ridicați comanda de la depozitul de la str. Nicolae Dimo 17/1, sau să cereți la 069 149 730 posibilitatea livrării în localitatea dumneavoastră.",
  },
  {
    question: "Pot să cumpăr sacii cu bucata sau numai angro?",
    answer:
      "Ambele variante sunt posibile. Fermierii și depozitele de legume primesc seturi de saci cu preț de angro, iar sacii se pot lua și cu bucata.",
  },
];
