export const WHOLESALE_NOTE = "Preț angro: se discută individual.";

export const TVA_LABEL = "cu TVA inclus";

export const UNIT_OPTIONS = ["buc", "set", "rolă", "kg", "m²", "palet"];

export const formatPrice = (bani: number, unit?: string): string => {
  const unitLabel = unit?.trim() || "buc";

  return `${(bani / 100).toFixed(2)} lei / ${unitLabel}`;
};

export const formatPriceValue = (bani: number): string =>
  (bani / 100).toFixed(2);

export const formatPriceBlock = (
  price: number | undefined,
  unit?: string,
): string => {
  if (!price) {
    return "Preț la cerere";
  }

  return `${formatPrice(price, unit)} · ${TVA_LABEL}\n${WHOLESALE_NOTE}`;
};
