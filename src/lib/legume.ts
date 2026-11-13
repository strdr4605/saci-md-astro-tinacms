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
  "Saci pentru legume în Chișinău: rafie din polipropilenă, saci din plasă și polietilenă pentru cartofi, ceapă, morcov. Preț la cerere, livrare în Chișinău.";

export const LEGUME_H1 = "Saci pentru legume în Chișinău";

// The five products of the landing page.
export const LEGUME_PRODUCT_SLUGS = [
  "saci-plasa-30x34",
  "saci-plasa-40x58",
  "saci-plasa-52x72",
  "sac-polipropilena-50x80",
  "sac-polipropilena-50x100",
];

// The price feature (src/lib/pricing.ts) is not on master yet.
// No product holds a price value, so every product shows this text.
// When the price feature lands, swap it for formatPrice(price, unit).
export const PRICE_ON_REQUEST = "Preț la cerere";

export const LEGUME_PARAGRAPHS = [
  "Dacă vindeți cartofi, ceapă sau morcov și căutați saci pentru legume în Chișinău, la Sim Construct Grup găsiți trei familii de saci: rafie din polipropilenă, saci din plasă și saci din polietilenă. Sacii se vând cu bucata și angro. Stocul este în depozitul propriu de la str. Nicolae Dimo 17/1, iar comanda se pregătește în aceeași zi.",
  "Saci de rafie, adică saci țesuți din polipropilenă, sunt cei mai rezistenți. Firele sunt țesute într-o pânză densă, cu fundul cusut și gura deschisă. Sacul de 50x80 cm ține 20–30 kg, iar sacul de 50x100 cm ține până la 40 kg. Rafie rezistă la umezeală și la razele solare, se spală și se refolosește. Pentru legume, rafie este alegerea bună când transportați cantități mari de cartofi sau ceapă, pe paleți sau în remorcă.",
  "Saci din plasă, de tip rașchel, sunt făcuți pentru legume delicate. Plasa rară lasă aerul să circule, iar produsele rămân proaspete mai mult timp. Cumpărătorul vede clar ce este în sac, iar sacul se leagă ușor cu șnurul de la gură. Sacul de 30x34 cm ține aproximativ 7 kg, sacul de 40x58 cm aproximativ 20 kg, iar sacul de 52x72 cm aproximativ 35 kg. Plasa este alegerea obișnuită pentru morcov, ceapă și ardei gras.",
  "Saci din polietilenă sunt folosiți pentru transport și depozitare temporară. Folia densă nu lasă să treacă apa și praful. Acești saci nu sunt aerisiți, de aceea nu se țin mult timp pentru legume, dar sunt utili pentru transportul scurt, pentru acoperirea paletilor și pentru ambalarea produselor deja uscate.",
  "Alegeți mărimea după produs și după greutatea pe care o vindeați. Pentru cantități mici, sacul de 30x34 cm este suficient. Pentru o ladă de cartofi, sacul de 40x58 cm este cel mai potrivit. Pentru morcov și ceapă vândute la kilogram, folosiți sacul de 52x72 cm. Pentru cereale și produse voluminoase, sacii de polipropilenă de 50x80 cm și 50x100 cm sunt cei mai eficienți.",
  "Prețul se discută în funcție de mărime, de cantitate și de tipul de material. Fiecare produs din listă afișează «Preț la cerere». Sunați la 069 149 730 sau scrieți, și primiți oferta în aceeași zi. Pentru ferme și depozite de legume pregătim și oferte de angro.",
  "Depozitul și birourile sunt la str. Nicolae Dimo 17/1, Chișinău. Ridicați comanda de acolo sau cereți livrare în Chișinău. Livrăm în toate sectoarele orașului, de regulă în aceeași zi, pentru comenzile făcute până la ora 15:00. Pentru restul Republicii Moldova livrăm cu transportul comun sau cu mașina proprie, în funcție de volumul comenzii.",
];

export const LEGUME_FAQ: LegumeFaq[] = [
  {
    question: "Ce sac aleg pentru cartofi, ceapă și morcov?",
    answer:
      "Pentru cartofi și ceapă, care se vând în cantități mari și suportă greutate, alegeți sacul de rafie din polipropilenă. Pentru morcov și legume delicate, care trebuie să rămână proaspete, alegeți sacul din plasă. Sacul din polietilenă este pentru transport scurt și acoperire, nu pentru depozitare lungă.",
  },
  {
    question: "Ce diferență este între sacii de rafie și sacii din plasă?",
    answer:
      "Sacii de rafie sunt țesuți din polipropilenă. Ei sunt mai rezistenți, nu lasă apa să treacă și țin greutăți mai mari. Sacii din plasă au ochiuri rare. Aerul circulă liber, legumele rămân proaspete, iar cumpărătorul vede conținutul sacului.",
  },
  {
    question: "Ce înseamnă mărimile 30x34, 40x58, 52x72, 50x80 și 50x100?",
    answer:
      "Primele două numere sunt lungimea și lățimea sacului, în centimetri. Sacul de 30x34 cm ține aproximativ 7 kg, cel de 40x58 cm aproximativ 20 kg, iar cel de 52x72 cm aproximativ 35 kg. Sacul de polipropilenă de 50x80 cm ține 20–30 kg, iar cel de 50x100 cm până la 40 kg.",
  },
  {
    question: "Cât costă sacii pentru legume?",
    answer:
      "Prețul depinde de mărime, de grosime și de cantitatea comandată, de aceea fiecare produs din listă arată «Preț la cerere». Sunați la 069 149 730 sau cereți oferta scrisă. Pentru comenzi de angro, discutăm prețul individual.",
  },
  {
    question: "Livrați sacii în Chișinău?",
    answer:
      "Da. Livrăm în toate sectoarele orașului Chișinău, de regulă în aceeași zi, pentru comenzile făcute până la ora 15:00. Puteți și să ridicați comanda de la depozitul de la str. Nicolae Dimo 17/1, între orele de lucru.",
  },
  {
    question: "Pot să cumpăr sacii cu bucata sau numai angro?",
    answer:
      "Ambele variante sunt posibile. Un client privat poate cumpăra un pachet de saci, iar fermierii și depozitele de legume primesc seturi de 100 de bucăți sau mai mult, cu preț de angro și programare de livrare.",
  },
];
