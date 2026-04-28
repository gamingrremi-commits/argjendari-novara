/**
 * Combines class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats price in Euro
 */
export function formatPriceEUR(price: number | null): string {
  if (price === null) return 'Pyet';
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats price in Lek
 */
export function formatPriceLEK(price: number | null): string {
  if (price === null) return 'Pyet';
  return new Intl.NumberFormat('sq-AL', {
    maximumFractionDigits: 0,
  }).format(price) + ' L';
}
