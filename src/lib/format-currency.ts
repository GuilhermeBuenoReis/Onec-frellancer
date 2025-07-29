export function formatCurrency(value: number | string | null) {
  const numericValue =
    typeof value === 'string' ? parseFloat(value) : (value ?? 0);

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(numericValue);
}
