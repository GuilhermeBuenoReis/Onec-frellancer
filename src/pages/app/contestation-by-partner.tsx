import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft } from 'lucide-react';

export function Contestation() {
  const navigate = useNavigate();

  // Mock data for layout demonstration
  const credentials = {
    id: '12345',
    channelHead: 'João Silva',
    partner: 'Parceiro Exemplo',
    cnpj: '00.000.000/0001-00',
    agentIndicator: 'Indicador X',
  };

  const clients = [
    {
      id: 'c1',
      enterprise: 'Empresa A',
      competenceMonth: 'Jan',
      cnpj: '11.111.111/1111-11',
      contestation: '5',
      returned: '2',
    },
    {
      id: 'c2',
      enterprise: 'Empresa B',
      competenceMonth: 'Feb',
      cnpj: '22.222.222/2222-22',
      contestation: '8',
      returned: '4',
    },
    {
      id: 'c3',
      enterprise: 'Empresa C',
      competenceMonth: 'Mar',
      cnpj: '33.333.333/3333-33',
      contestation: '3',
      returned: '1',
    },
  ];

  const contestations = [
    {
      id: 'ct1',
      date: '2025-04-01',
      description: 'Contestação fatura Abril',
      status: 'Pendente',
    },
    {
      id: 'ct2',
      date: '2025-04-15',
      description: 'Contestação taxa extra',
      status: 'Resolvida',
    },
  ];

  // Prepare chart data
  const chartData = clients.map(c => ({
    month: c.competenceMonth,
    returned: Number(c.returned),
  }));

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Back Button */}
      <div className="lg:col-span-3">
        <Button variant="default" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
      </div>

      {/* Credenciais */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Credenciais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {credentials.id}
            </div>
            <div>
              <strong>Chefe de Canal:</strong> {credentials.channelHead}
            </div>
            <div>
              <strong>Parceria:</strong> {credentials.partner}
            </div>
            <div>
              <strong>CNPJ:</strong> {credentials.cnpj}
            </div>
            <div>
              <strong>Indicador de Agente:</strong> {credentials.agentIndicator}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contestações do Partner */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Contestações de {credentials.partner}</CardTitle>
          <Button>Nova Contestação</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contestations.map(ct => (
                <TableRow key={ct.id} className="hover:bg-muted">
                  <TableCell>{ct.id}</TableCell>
                  <TableCell>{ct.date}</TableCell>
                  <TableCell>{ct.description}</TableCell>
                  <TableCell>{ct.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela de Clientes */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Detalhes dos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contestações</TableHead>
                <TableHead>Retornos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map(c => (
                <TableRow key={c.id} className="hover:bg-muted">
                  <TableCell>{c.enterprise}</TableCell>
                  <TableCell>{c.competenceMonth}</TableCell>
                  <TableCell>{c.cnpj}</TableCell>
                  <TableCell>{c.contestation}</TableCell>
                  <TableCell>{c.returned}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gráfico de Retornos */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Gráfico de Retornos por Mês</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="returned" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
