import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import { useGetNegotiation } from '../../../../../generated/hooks/negotiationHooks';

export function SectionCards() {
  const { data: responseNegotiation } = useGetNegotiation();
  const negotiations = responseNegotiation?.data ?? [];

  const totalNegotiationMemo = useMemo(() => {
    return negotiations.length;
  }, [negotiations]);

  const totalNegotiationValueMemo = useMemo(() => {
    return negotiations.reduce(
      (acc, negotiation) => acc + (negotiation.value ?? 0),
      0
    );
  }, [negotiations]);

  const totalNegotiationAverageGuideMemo = useMemo(() => {
    return negotiations.reduce(
      (acc, negotiation) => acc + (negotiation.averageGuide ?? 0),
      0
    );
  }, [negotiations]);

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
          {totalNegotiationMemo}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>Total de ganhos da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-primary">
          {formatCurrency(totalNegotiationValueMemo)}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Valor Médio</CardTitle>
          <CardDescription>Total de Lucro da empresa!</CardDescription>
        </CardHeader>
        <CardContent className="text-xl font-semibold text-primary">
          {formatCurrency(totalNegotiationAverageGuideMemo)}
        </CardContent>
      </Card>
    </div>
  );
}
