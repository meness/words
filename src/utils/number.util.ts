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

export const formatDecimal = (decimal: number) => Intl.NumberFormat('fa-IR', { style: 'decimal' }).format(decimal);

export const formatPercent = (percent: number) =>
  Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: 'percent'
  }).format(percent);
