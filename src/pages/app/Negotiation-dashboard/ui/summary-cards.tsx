import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function formatCurrencyBRL(value: string | number): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;

  if (Number.isNaN(number)) return 'R$ 0,00';

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
}

export function SummaryCards({
  totalProjects,
  totalValue,
  averageValue,
}: {
  totalProjects: number;
  totalValue: number;
  averageValue: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[
        ['Contratos', totalProjects.toString()],
        ['Valor Total', formatCurrencyBRL(totalValue)],
        ['Valor Médio', formatCurrencyBRL(averageValue)],
      ].map(([title, value]) => (
        <Card key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{value}</CardContent>
        </Card>
      ))}
    </div>
  );
}
