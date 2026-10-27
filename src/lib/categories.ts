type Category = {
  frontmatter: {
    name?: string;
    order?: number;
    hidden?: boolean;
  };
};

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
