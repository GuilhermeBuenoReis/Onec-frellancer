import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
import {
  DollarSign,
  Users,
  Award,
  FileText,
  Scale,
  Percent,
} from 'lucide-react';
import { useGetPortalControllsBySelectParternRoute } from '@/http/generated/api';

export function InformationHonorary() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const [mes, setMes] = useState<number | null>(null);

  const {
    data: portal,
    isLoading,
    isError,
  } = useGetPortalControllsBySelectParternRoute({ partnerId: partnerId ?? '' });

  const registros = (portal ?? [])
    .map(item => {
      const raw = item.competenceMonth ?? '';
      const [mm, yy] = raw.split('/');
      const mesNum = mm ? Number(mm) : 0;
      return {
        competenceMonth: raw,
        mes: mesNum,
        valor: item.value ?? 0,
        honorario: item.honorary ?? 0,
        compensacao: item.compensation ?? 0,
        imposto: item.tax ?? 0,
        tj: item.tj ?? 0,
        percHonorario: item.percentageHonorary ?? 0,
      };
    })
    .reverse();

  const filtrados = mes ? registros.filter(r => r.mes === mes) : registros;

  const totals = useMemo(
    () => ({
      valor: filtrados.reduce((a, c) => a + c.valor, 0),
      honorario: filtrados.reduce((a, c) => a + c.honorario, 0),
      compensacao: filtrados.reduce((a, c) => a + c.compensacao, 0),
      imposto: filtrados.reduce((a, c) => a + c.imposto, 0),
      tj: filtrados.reduce((a, c) => a + c.tj, 0),
      percHonorario: filtrados.reduce((a, c) => a + c.percHonorario, 0),
    }),
    [filtrados]
  );

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const colorMap: Record<string, string> = {
    valor: '#3b82f6',
    honorario: '#10b981',
    compensacao: '#f59e0b',
    imposto: '#ef4444',
    tj: '#8b5cf6',
  };

  if (!partnerId) {
    toast.error('Parceiro não encontrado');
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={false}
        toggleSidebar={(): void => {
          throw new Error('Function not implemented.');
        }}
      />
      <main className="flex-1 flex flex-col bg-gray-100">
        <header className="flex items-center justify-between p-6 bg-white shadow">
          <h1 className="text-2xl font-semibold">Painel de Honorários</h1>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-auto">
          {isLoading ? (
            <p className="text-center mt-10">Carregando...</p>
          ) : isError ? (
            <p className="text-center mt-10">Erro ao carregar dados.</p>
          ) : (
            <Tabs defaultValue="dashboard" className="w-full space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="dashboard">Resumo</TabsTrigger>
                  <TabsTrigger value="grafico">Gráfico</TabsTrigger>
                </TabsList>
                <Select
                  value={mes !== null ? mes.toString() : 'all'}
                  onValueChange={value =>
                    setMes(value === 'all' ? null : Number(value))
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar mês" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {monthNames.map((name, index) => (
                      <SelectItem key={name} value={(index + 1).toString()}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="dashboard">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <DollarSign className="h-6 w-6 text-blue-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Valor
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-green-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Honorários
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.honorario.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Compensação
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.compensacao.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-red-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        Imposto
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.imposto.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <Scale className="h-6 w-6 text-purple-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        TJ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.tj.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
                    <CardHeader className="flex items-center space-x-2">
                      <Percent className="h-6 w-6 text-indigo-500" />
                      <CardTitle className="text-lg font-medium text-gray-700">
                        % Honorário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {totals.percHonorario.toFixed(2)}%
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="grafico">
                <div className="bg-white rounded-lg shadow p-6">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={filtrados}
                      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="competenceMonth" />
                      <YAxis />
                      <Tooltip
                        formatter={val =>
                          typeof val === 'number'
                            ? val.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                            : val
                        }
                      />
                      <Legend verticalAlign="top" height={36} />
                      {[
                        'valor',
                        'honorario',
                        'compensacao',
                        'imposto',
                        'tj',
                      ].map(key => (
                        <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          name={
                            key === 'valor'
                              ? 'Valor'
                              : key === 'honorario'
                                ? 'Honorários'
                                : key === 'compensacao'
                                  ? 'Compensação'
                                  : key.charAt(0).toUpperCase() + key.slice(1)
                          }
                          stroke={colorMap[key]}
                          strokeWidth={3}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
