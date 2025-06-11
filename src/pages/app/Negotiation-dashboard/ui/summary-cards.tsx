import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function SummaryCards({
  totalProjects,
  totalValue,
  averageValue,
}: { totalProjects: number; totalValue: number; averageValue: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {[
        ['Projetos', totalProjects.toString()],
        ['Valor Total', `R$ ${totalValue.toLocaleString()}`],
        ['Valor Médio', `R$ ${averageValue}`],
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
