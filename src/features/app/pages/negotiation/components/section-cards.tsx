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
    <div className="w-full grid grid-cols-3 items-center gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contratos</CardTitle>
          <CardDescription>Total de contratos da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl">478</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>Total de ganhos da empresa!</CardDescription>
        </CardHeader>
        <CardContent>{formatCurrency(123456.78)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Valor Médio</CardTitle>
          <CardDescription>Total de Lucro da empresa!</CardDescription>
        </CardHeader>
        <CardContent>{formatCurrency(152946.12)}</CardContent>
      </Card>
    </div>
  );
}
