import { useState, useMemo } from 'react';
import { ArrowRight, Menu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { useGetPortalControlls } from '@/http/generated/api';
import { Sidebar } from '@/components/sidebar';

interface PortalControlData {
  monthOfCalculation: string | null;
  competenceMonth: string | null;
  contract: number | null;
  enterprise: string | null;
  product: string | null;
  percentageHonorary: number | null;
  compensation: number | null;
  honorary: number | null;
  tax: number | null;
  value: number | null;
  situation: string | null;
}

export function PortalControllDashboard() {
  const { data } = useGetPortalControlls<PortalControlData[]>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalValue: number = useMemo(
    () => data?.reduce((acc, cur) => acc + (Number(cur.value) || 0), 0) ?? 0,
    [data]
  );
  const totalHonorary: number = useMemo(
    () => data?.reduce((acc, cur) => acc + (Number(cur.honorary) || 0), 0) ?? 0,
    [data]
  );
  const totalCompensation: number = useMemo(
    () =>
      data?.reduce((acc, cur) => acc + (Number(cur.compensation) || 0), 0) ?? 0,
    [data]
  );

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    const grouped: Record<
      string,
      { month: string; total: number; honorary: number; compensation: number }
    > = {};

    data.forEach(item => {
      if (item.competenceMonth) {
        if (!grouped[item.competenceMonth]) {
          grouped[item.competenceMonth] = {
            month: item.competenceMonth,
            total: 0,
            honorary: 0,
            compensation: 0,
          };
        }
        grouped[item.competenceMonth].total += Number(item.value) || 0;
        grouped[item.competenceMonth].honorary += Number(item.honorary) || 0;
        grouped[item.competenceMonth].compensation +=
          Number(item.compensation) || 0;
      }
    });
    return Object.values(grouped).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [data]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {isSidebarOpen && (
        <div className="absolute z-50 md:hidden">
          <Sidebar />
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 bg-gray-300 p-2 rounded"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Cabeçalho com botão de menu para mobile e filtros */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            {/* Botão de menu visível apenas em mobile */}
            <Button
              variant="outline"
              className="md:hidden mr-4"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </header>

        {/* Cards com os totais */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {}}
          >
            <CardHeader>
              <CardTitle>Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">
                {formatter.format(totalValue)}
              </p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {}}
          >
            <CardHeader>
              <CardTitle>Honorários Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">
                {formatter.format(totalHonorary)}
              </p>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {}}
          >
            <CardHeader>
              <CardTitle>Compensação Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">
                {formatter.format(totalCompensation)}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Gráfico de Linhas */}
        <section className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Evolução Mensal</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={value => formatter.format(Number(value))} />
              <RechartsTooltip
                formatter={value => formatter.format(Number(value))}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="total"
                name="Valor Total"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="honorary"
                name="Honorários"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="compensation"
                name="Compensação"
                stroke="#ffc658"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
