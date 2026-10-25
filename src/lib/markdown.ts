export const company = {
  name: "Sim Construct Grup S.R.L.",
  site: "https://saci.md",
  phone: "+373 69 149 730",
  address: "str. Nicolae Dimo 17/1, Chișinău, Republica Moldova",
  map: "https://maps.app.goo.gl/GAWu84AruE7GSy628",
};

const productUrl = (slug: string) =>
  `${company.site}/${encodeURIComponent(slug)}`;

export const buildProductMarkdown = (
  product: any,
  categoryName: string,
): string => {
  const lines = [
    `# ${product.data.name}`,
    "",
    `- Categorie: ${categoryName}`,
    ...(product.data.specs ?? []).map((spec: string) => `- ${spec}`),
    `- Stoc: ${product.data.outOfStock ? "epuizat momentan" : "disponibil"}`,
    `- Pagina produsului: ${productUrl(product.data.slug)}`,
    "",
    "## Descriere",
    "",
    product.body.trim(),
    "",
    "## Contact",
    "",
    `${company.name}`,
    `Telefon: ${company.phone}`,
    `Adresă: ${company.address}`,
    `Hartă: ${company.map}`,
    "",
  ];

  return lines.join("\n");
};

export const buildIndexMarkdown = (
  products: any[],
  categories: any[],
): string => {
  const categoryName = (path: string) =>
    categories.find((category) => category.filePath === path)?.data.name ?? "";

  const lines = [
    `# saci.md — catalog saci polipropilenă, polietilenă, plasă, big bags`,
    "",
    `${company.name} produce și comercializează saci și ambalaje în Chișinău, Moldova.`,
    "",
    `Telefon: ${company.phone}`,
    `Adresă: ${company.address}`,
    `Hartă: ${company.map}`,
    "",
  ];

  for (const category of categories) {
    const categoryProducts = products.filter((product) =>
      category.filePath.includes(product.data.categoryPath),
    );

    if (categoryProducts.length === 0) continue;

    lines.push(`## ${category.data.name}`, "");

    for (const product of categoryProducts) {
      const specs = (product.data.specs ?? []).join("; ");

      lines.push(
        `- [${product.data.name}](${productUrl(product.data.slug)}) — ${specs || categoryName(product.data.categoryPath)}`,
      );
    }

    lines.push("");
  }

  return lines.join("\n");
};
