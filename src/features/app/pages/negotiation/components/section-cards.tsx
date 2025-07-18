import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';

export function SectionCards() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contratos</CardTitle>
          <CardDescription>Total de contratos da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-primary">
          478
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>Total de ganhos da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-primary">
          {formatCurrency(123456.78)}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Valor Médio</CardTitle>
          <CardDescription>Total de Lucro da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-primary">
          {formatCurrency(152946.12)}
        </CardContent>
      </Card>
    </div>
  );
}
