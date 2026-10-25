// WebMCP: expose the saci.md catalog to AI agents in the browser.
// Feature-detects document.modelContext (older Chrome: navigator.modelContext).

(async () => {
  const modelContext = document.modelContext || navigator.modelContext;

  if (!modelContext) return;

  let index;

  try {
    const response = await fetch("/product-index.json");

    if (!response.ok) return;

    index = await response.json();
  } catch {
    return;
  }

  const controller = new AbortController();

  window.addEventListener("pagehide", () => controller.abort());

  const result = (payload) => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  });

  const normalize = (value) =>
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");

  const tools = [
    {
      name: "list_categories",
      description:
        "Listează categoriile de produse disponibile pe saci.md, cu numărul de produse din fiecare categorie.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () =>
        result({
          site: index.company.site,
          categories: index.categories,
        }),
    },
    {
      name: "search_products",
      description:
        "Caută produse în catalogul saci.md după denumire, categorie, dimensiuni sau specificații. Folosește pentru întrebări de tip 'ce saci aveți pentru zahăr' sau 'saci 50x80'.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Textul căutat: denumire produs, categorie (de exemplu 'polipropilena') sau dimensiuni (de exemplu '50x80').",
          },
          category: {
            type: "string",
            description: "Filtrează după categorie: Polipropilenă, Polietilenă, Plasă, Big bags, Plasă tubulară si stretch, Altele.",
          },
          maxResults: {
            type: "integer",
            description: "Numărul maxim de rezultate (implicit 10).",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
      execute: async ({ query, category, maxResults = 10 }) => {
        const needle = normalize(query || "");
        const wantedCategory = category
          ? normalize(category)
          : null;

        const matches = index.products
          .filter((product) => {
            if (
              wantedCategory &&
              !normalize(product.category).includes(wantedCategory)
            ) {
              return false;
            }

            if (!needle) return true;

            const haystack = normalize(
              [
                product.name,
                product.category,
                product.description,
                ...(product.specs || []),
              ].join(" "),
            );

            return haystack.includes(needle);
          })
          .slice(0, Math.max(1, Math.min(Number(maxResults) || 10, 50)));

        return result({
          query,
          count: matches.length,
          products: matches.map((product) => ({
            name: product.name,
            category: product.category,
            specs: product.specs,
            url: product.url,
            outOfStock: product.outOfStock,
          })),
        });
      },
    },
    {
      name: "get_product",
      description:
        "Întoarce detaliile complete ale unui produs saci.md: descriere, specificații, categorie și link.",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description:
              "Identificatorul produsului, de exemplu 'sac-polipropilena-50x80'.",
          },
        },
        required: ["slug"],
        additionalProperties: false,
      },
      execute: async ({ slug }) => {
        const needle = normalize(slug || "");
        const product = index.products.find(
          (item) =>
            normalize(item.slug) === needle ||
            normalize(item.name) === needle,
        );

        if (!product) {
          return result({
            error: `Produs negăsit: ${slug}`,
            availableSlugs: index.products.map((item) => item.slug),
          });
        }

        return result(product);
      },
    },
    {
      name: "get_contact",
      description:
        "Întoarce datele de contact ale companiei Sim ConstructGrup S.R.L. (saci.md): telefon, adresă și hartă.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => result(index.company),
    },
  ];

  for (const tool of tools) {
    try {
      await modelContext.registerTool(tool, { signal: controller.signal });
    } catch (error) {
      console.warn("WebMCP: registerTool failed for", tool.name, error);
    }
  }
})();
