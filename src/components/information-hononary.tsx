import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
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

interface InformationHonorary {
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

const filterSchema = z.object({
  month: z.string(),
});
type FilterForm = z.infer<typeof filterSchema>;

export function InformationHonorary() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useGetPortalControlls<InformationHonorary[]>();

  const months = useMemo(() => {
    if (!data) return [];
    return Array.from(
      new Set(
        data.map(item => item.competenceMonth).filter((m): m is string => !!m)
      )
    ).sort();
  }, [data]);

  const { control, watch } = useForm<FilterForm>({
    resolver: zodResolver(filterSchema),
    defaultValues: { month: 'all' },
  });
  const selectedMonth = watch('month');

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedMonth === 'all') return data;
    return data.filter(d => d.competenceMonth === selectedMonth);
  }, [data, selectedMonth]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    []
  );
  const totalValue = useMemo(
    () => filteredData.reduce((sum, cur) => sum + (cur.value || 0), 0),
    [filteredData]
  );
  const totalHonorary = useMemo(
    () => filteredData.reduce((sum, cur) => sum + (cur.honorary || 0), 0),
    [filteredData]
  );
  const totalCompensation = useMemo(
    () => filteredData.reduce((sum, cur) => sum + (cur.compensation || 0), 0),
    [filteredData]
  );

  const chartData = useMemo(() => {
    const grouping: Record<
      string,
      { month: string; total: number; honorary: number; compensation: number }
    > = {};
    filteredData.forEach(item => {
      const m = item.competenceMonth || 'Sem mês';
      if (!grouping[m]) {
        grouping[m] = { month: m, total: 0, honorary: 0, compensation: 0 };
      }
      grouping[m].total += item.value || 0;
      grouping[m].honorary += item.honorary || 0;
      grouping[m].compensation += item.compensation || 0;
    });
    return Object.values(grouping).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [filteredData]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block md:flex-shrink-0">
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-64 bg-white shadow-lg">
            <Sidebar />
            <Button
              variant="ghost"
              className="m-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
      <main className="flex flex-1 flex-col overflow-auto p-4 md:p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded hover:bg-gray-200"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="ml-4 text-2xl font-semibold text-gray-800">
              Dashboard de Honorários
            </h1>
          </div>
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </Button>
        </header>

        <div className="mb-6 w-full max-w-xs">
          <Label htmlFor="month-select">Filtrar por mês:</Label>
          <Controller
            control={control}
            name="month"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="month-select" className="w-full">
                  <SelectValue placeholder="Todos meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos meses</SelectItem>
                  {months.map(m => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: 'Valor Total', value: totalValue },
            { title: 'Honorários', value: totalHonorary },
            { title: 'Compensação', value: totalCompensation },
          ].map(({ title, value }) => (
            <Card key={title} className="shadow hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold">{formatter.format(value)}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Evolução Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={v => formatter.format(v)} />
              <RechartsTooltip formatter={v => formatter.format(Number(v))} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="total"
                name="Valor"
                stroke="#4F46E5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="honorary"
                name="Honorários"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="compensation"
                name="Compensação"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
