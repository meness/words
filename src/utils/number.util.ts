export const getRandomIndexes = (min: number, max: number, exclude: number, count: number): number[] => {
  if (count > max - min) {
    throw new Error('Range is too small to generate unique numbers.');
  }

  const result = new Set<number>();

  while (result.size < count) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (random !== exclude) {
      result.add(random);
    }
  }

  return Array.from(result);
};

export const formatDecimal = (value: number, locale: Intl.LocalesArgument = 'fa-IR') =>
  Intl.NumberFormat(locale, { style: 'decimal' }).format(value);

export const formatPercent = (value: number, locale: Intl.LocalesArgument = 'fa-IR') =>
  Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: 'percent'
  }).format(value);
