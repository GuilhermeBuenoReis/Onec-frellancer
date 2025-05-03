import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Sidebar } from '@/components/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export function InformationHonorary() {
  const { partnerId = '' } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState<'all' | string>('all');

  useEffect(() => {
    if (!partnerId) {
      toast.error('Parâmetro partnerId ausente.');
      setLoading(false);
      return;
    }
    fetch(`http://localhost:3333/portal/portalcontrolls?partnerId=${partnerId}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(records => setData(records))
      .catch(() => toast.error('Erro ao buscar dados'))
      .finally(() => setLoading(false));
  }, [partnerId]);

  // lista de meses únicos ordenados (MM/YYYY)
  const monthsAvailable = useMemo(() => {
    const setM = new Set<string>();
    data.forEach(d => {
      if (typeof d.competenceMonth === 'string') {
        setM.add(d.competenceMonth);
      }
    });
    return Array.from(setM).sort((a, b) => {
      const [am, ay] = a.split('/');
      const [bm, by] = b.split('/');
      return Number(ay) - Number(by) || Number(am) - Number(bm);
    });
  }, [data]);

  // dados do chart: soma value/honorary/compensation por month
  const chartData = useMemo(() => {
    const grouping: Record<string, any> = {};
    data.forEach(item => {
      const m = item.competenceMonth || 'Sem mês';
      if (!grouping[m])
        grouping[m] = { month: m, total: 0, honorary: 0, compensation: 0 };
      grouping[m].total += item.value ?? 0;
      grouping[m].honorary += item.honorary ?? 0;
      grouping[m].compensation += item.compensation ?? 0;
    });
    return monthsAvailable.map(
      m => grouping[m] || { month: m, total: 0, honorary: 0, compensation: 0 }
    );
  }, [data, monthsAvailable]);

  // dados filtrados para o mês selecionado (ou todos)
  const filteredForCard = useMemo(() => {
    if (filterMonth === 'all') return data;
    return data.filter(d => d.competenceMonth === filterMonth);
  }, [data, filterMonth]);

  const totals = useMemo(() => {
    return filteredForCard.reduce(
      (acc, cur) => ({
        total: acc.total + (cur.value ?? 0),
        honorary: acc.honorary + (cur.honorary ?? 0),
        compensation: acc.compensation + (cur.compensation ?? 0),
      }),
      { total: 0, honorary: 0, compensation: 0 }
    );
  }, [filteredForCard]);

  if (loading) return <p className="text-center py-8">Carregando...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="hidden md:block md:w-64">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard Honorários</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </header>

        <div className="flex items-center mb-6 space-x-4">
          <Label>Filtrar mês:</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filterMonth === 'all' ? 'Todos os meses' : filterMonth}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meses disponíveis</DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => setFilterMonth('all')}>
                Todos os meses
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {monthsAvailable.map(m => (
                <DropdownMenuItem key={m} onSelect={() => setFilterMonth(m)}>
                  {m}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Valor Total</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {totals.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </CardContent>
          </Card>
          <Card className="shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Honorários</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {totals.honorary.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </CardContent>
          </Card>
          <Card className="shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>Compensação</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {totals.compensation.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </CardContent>
          </Card>
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Evolução Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={v =>
                  v.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Tooltip
                formatter={v =>
                  v.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="total"
                name="Valor"
                stroke="#4F46E5"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="honorary"
                name="Honorários"
                stroke="#10B981"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="compensation"
                name="Compensação"
                stroke="#F59E0B"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
