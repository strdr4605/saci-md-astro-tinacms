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
  "Prețul se discută în funcție de mărime, de cantitate și de tipul de material. Sunați la 069 149 730 și cereți prețul. Pentru ferme și depozite de legume pregătim și oferte de angro.",
  "Depozitul este la str. Nicolae Dimo 17/1, Chișinău. Ridicați comanda de acolo sau cereți livrare în Chișinău și în Moldova. Pentru alte localități din Republica Moldova, cereți la 069 149 730 posibilitatea livrării.",
];

// ---------------------------------------------------------------- guide
// The guide article /ghid/cum-alezi-sacii-pentru-legume/.
// The page and the Markdown twin import this file. They do not repeat the text.

export const GUIDE_SLUG = "cum-alezi-sacii-pentru-legume";
export const GUIDE_PATH = `/ghid/${GUIDE_SLUG}/`;

export const GUIDE_TITLE = "Cum alegi saci pentru legume în Chișinău | Saci.md";

export const GUIDE_DESCRIPTION =
  "Ghid pentru sacii de legume în Chișinău: mărimile 30x34, 40x58, 52x72, 50x80 și 50x100 cm cu capacități în kg, rafie, plasă, polietilenă și big bag.";

export const GUIDE_H1 = "Cum alegi saci pentru legume în Chișinău";

export const GUIDE_DATE_PUBLISHED = "2026-11-13";

export const GUIDE_AUTHOR = "Sim Construct Grup S.R.L.";

// The products that the guide links to. The same five as the landing page.
export const GUIDE_PRODUCT_SLUGS = LEGUME_PRODUCT_SLUGS;

export const GUIDE_LEAD: string[] = [
  "Alegerea sacului pentru legume depinde de două lucruri: de produsul pe care îl vindeți și de greutatea pe care o puneți într-un sac. Un sac prea mic se rupe la încărcare, iar un sac prea mare rămâne gol și se deformează în remorcă. La Sim Construct Grup găsiți saci din plasă, saci de rafie din polipropilenă, saci din polietilenă și big bag-uri. Ghidul de mai jos explică mărimile, capacitățile și tipul de sac pentru fiecare situație.",
  "Sacii se vând cu bucata și angro. Pentru ferme, depozite de legume și piețe pregătim comenzi mari la preț de angro. Depozitul este la str. Nicolae Dimo 17/1, Chișinău. Livrăm în Chișinău și în Moldova. Pentru preț și stoc sunați la 069 149 730.",
];

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    heading: "Cum aleg mărimea sacului",
    paragraphs: [
      "Mărimea se alege în funcție de produs și de greutatea pe care o vindeați la kilogram. Cartofii și ceapa se vând în cantități mari și se manipulează des, deci au nevoie de saci rezistenți. Morcovul și ardeiul gras sunt legume delicate, care nu suportă mult timp fără aer.",
      "Capacitatea de încărcare a fiecărui model este cea mai bună referință. Sacul de plasă de 30x34 cm ține 7 kg. Sacul de plasă de 40x58 cm ține 20 kg. Sacul de plasă de 52x72 cm ține 35 kg. Sacul de rafie de 50x80 cm ține 20–30 kg, iar sacul de rafie de 50x100 cm ține 40 kg.",
      "Dacă vindeați la kilogram și deschideți sacul la piață, sacul de 30x34 cm este suficient pentru o cantitate mică. Pentru o ladă de cartofi, sacul de 40x58 cm este potrivit. Pentru morcov și ceapă vândute la kilogram, sacul de 52x72 cm oferă loc pentru marfă fără să se deformeze. Pentru cereale și pentru cantități mari, folosiți sacul de rafie de 50x80 cm sau de 50x100 cm.",
      "Nu umpleți sacul până la capacitatea maximă. Sacul plin până la limită se deformează, iar transportul pe paleți devine greu. Lăsați spațiu liber la gură, pentru legare.",
    ],
  },
  {
    heading: "Când folosesc saci din plasă",
    paragraphs: [
      "Sacii din plasă sunt făcuți din material plastic tip rașchel, cu ochiuri rare. Aerul circulă liber prin ochiuri, iar umiditatea legumelor se evaporă. Astfel legumele rămân proaspete mai mult timp, iar cumpărătorul vede clar ce este în sac.",
      "Plasa este alegerea obișnuită pentru morcov, ceapă, cartofi, ardei gras, varză și fructe. Sacul se leagă ușor la gură cu șnurul de legare, iar culorile vii ale plaselor pun în valoare marfa la piață și în magazin.",
      "Cele trei mărimi de plasă sunt 30x34 cm, cu 7 kg, 40x58 cm, cu 20 kg, și 52x72 cm, cu 35 kg. Pentru o livrare mică, sacul de 30x34 cm este suficient. Pentru cantități mai mari, sacul de 52x72 cm ține 35 kg.",
      "Dacă transportați legume umede sau murdare, folosiți sacul de rafie sau o ladă, iar plasă pentru marfa curată.",
    ],
  },
  {
    heading: "Când folosesc saci de rafie, adică polipropilenă",
    paragraphs: [
      "Rafie este denumirea comercială pentru sacii țesuți din polipropilenă. Firele sunt țesute într-o pânză, iar grosimea țesăturii este cuprinsă între 600 și 1200 den. Sacul are fundul cusut și gura deschisă, iar un capăt este sigilat. Materialul este rezistent la apă și la lumină.",
      "Sacul de rafie de 50x80 cm ține 20–30 kg, iar sacul de 50x100 cm ține 40 kg. Folosiți rafie pentru cantități mari de cartofi, ceapă și morcov, pentru recolte, cereale, porumb, făină și zahăr. Sacul se umple cu lopata sau cu o mașină, se leagă la gură și se transportă pe paleți sau în remorcă.",
      "Țesătura de polipropilenă rezistă la apă și la razele solare, deci sacul poate sta în curte sau în remorcă. După curățare, sacii pot fi reciclați. Sacul de 50x100 cm se livrează în seturi de câte 100 de bucăți.",
      "Pentru legume delicate, care trebuie să rămână proaspete, rafie nu este prima alegere: pânza nu lasă aerul să circule. Folosiți plasă în acest caz.",
    ],
  },
  {
    heading: "Când folosesc saci din polietilenă și big bag-uri",
    paragraphs: [
      "Sacii din polietilenă sunt făcuți dintr-o folie densă de plastic. Folia nu lasă să treacă apa și praful. Acești saci sunt pentru nisip, pietriș, pământ, resturi din construcții, gunoi și pentru mutări. Sacul de polietilenă de 50x80 cm, în grosimea de 120 microni, ține până la 30 kg.",
      "Pentru legume, polietilena nu este alegerea potrivită: sacul este închis la aer, iar umiditatea rămâne înăuntru. Folosiți polietilena pentru transportul deșeurilor din pivniță sau din grădină, nu pentru marfă care se vinde la piață.",
      "Big bag-urile sunt containere flexibile din polipropilenă, cu 4 mânere și cu fund plat. Un sac Big Bag de 90x90x160 cm susține aproximativ 1 tonă, în funcție de tipul de încărcătură. Mărimile disponibile sunt 90x90x90 cm, 90x90x110 cm, 90x90x160 cm și 75x110x240 cm, iar sacul de 75x110x240 cm are mărimea potrivită pentru europalet.",
      "Big bag-ul este pentru recolte și volume mari: cereale, nisip, pământ, materiale de construcție și deșeuri lemnoase, metalice și plastice. Sacul de 90x90x110 cm ține aproximativ 500 kg.",
    ],
  },
  {
    heading: "Cât costă sacii pentru legume",
    paragraphs: [
      "Prețul depinde de mărimea sacului, de grosimea materialului și de cantitatea comandată. Sacii se vând cu bucata și angro, iar pentru comenzi mari discutăm prețul individual.",
      "Pentru ferme, depozite de legume și piețe, discutăm prețul de angro în funcție de cantitate și de mărime.",
      "Prețul se discută la telefon. Sunați la 069 149 730 și spuneți ce mărime, ce tip de sac și ce cantitate doriți. La telefon aflați prețul pentru comanda dumneavoastră și cereți livrarea.",
    ],
  },
  {
    heading: "Cum se depozitează și se refolosesc sacii",
    paragraphs: [
      "Sacii de rafie se curăță și se refolosesc. Țesătura de polipropilenă rezistă la apă și la lumină, iar după curățare sacii pot fi reciclați. Păstrați sacii uscați și la loc uscat, cu gura în sus, ca să nu rămână apă în fund.",
      "Sacii din plasă au ochiuri rare, prin care aerul circulă.",
      "Sacii din polietilenă țin lucrurile curate și uscate în gospodărie. Nu folosiți sacii de polietilenă pentru legume.",
    ],
  },
  {
    heading: "Livrare și contact în Chișinău",
    paragraphs: [
      "Depozitul este la str. Nicolae Dimo 17/1, Chișinău, Republica Moldova. Puteți ridica comanda de la depozit sau cereți livrare în Chișinău și în Moldova. Pentru alte localități din Republica Moldova, cereți la 069 149 730 posibilitatea livrării.",
      "Sunați la 069 149 730 înainte de a comanda. La telefon confirmați mărimea, tipul de sac, cantitatea, prețul și locul de livrare.",
    ],
  },
];

export type GuideSize = {
  size: string;
  type: string;
  capacity: string;
  use: string;
};

export const GUIDE_SIZE_TABLE: GuideSize[] = [
  {
    size: "30x34 cm",
    type: "Plasă",
    capacity: "7 kg",
    use: "Cartofi, ceapă, morcov, roșii, cantități mici",
  },
  {
    size: "40x58 cm",
    type: "Plasă",
    capacity: "20 kg",
    use: "Cartofi, ceapă, roșii, o ladă de legume",
  },
  {
    size: "52x72 cm",
    type: "Plasă",
    capacity: "35 kg",
    use: "Morcov, ceapă, cartofi, cantități mari",
  },
  {
    size: "50x80 cm",
    type: "Rafie (polipropilenă)",
    capacity: "20–30 kg",
    use: "Cartofi, ceapă, recolte, cereale",
  },
  {
    size: "50x100 cm",
    type: "Rafie (polipropilenă)",
    capacity: "40 kg",
    use: "Cantități mari de cartofi, ceapă, cereale",
  },
];

export const GUIDE_FAQ: LegumeFaq[] = [
  {
    question: "Ce sac aleg pentru cartofi, ceapă, morcov și roșii?",
    answer:
      "Alegeți după cantitatea pe care o puneți într-un sac. Pentru cartofi și ceapă, care se vând în cantități mari, luați rafie de 50x80 cm sau de 50x100 cm. Pentru morcov și roșii, care trebuie să rămână proaspete, luați plasă de 40x58 cm sau de 52x72 cm.",
  },
  {
    question: "Ce diferență este între rafie, plasă și polietilenă?",
    answer:
      "Rafie este sacul țesut din polipropilenă, cu fund cusut, rezistent la apă și la lumină. Plasa are ochiuri rare, lasă aerul să circule și este bună pentru legume proaspete. Polietilena este o folie densă, care nu lasă apa și praful să treacă, și este pentru nisip, gunoi și construcții.",
  },
  {
    question: "Cum se calculează prețul sacilor?",
    answer:
      "Prețul depinde de mărime, de grosimea materialului și de cantitatea comandată. Sacii se vând cu bucata și angro. Sunați la 069 149 730 și cereți prețul pentru mărimea și cantitatea dorite.",
  },
  {
    question: "Livrați sacii pentru legume în Chișinău și în Moldova?",
    answer:
      "Da. Livrăm în Chișinău și în Moldova. Puteți și să ridicați comanda de la depozitul de la str. Nicolae Dimo 17/1, sau să cereți la 069 149 730 posibilitatea livrării în localitatea dumneavoastră.",
  },
  {
    question: "Cum se transportă și se depozitează sacii de rafie?",
    answer:
      "Țesătura de polipropilenă rezistă la apă și la lumină, deci sacii pot fi ținuți în curte sau în remorcă. După curățare, ei pot fi reciclați. Păstrați sacii uscați, cu gura în sus, ca să nu rămână apă în fund.",
  },
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
      "Prețul depinde de mărime, de grosime și de cantitatea comandată. Sunați la 069 149 730 și cereți prețul. Pentru comenzi de angro, discutăm prețul individual.",
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
