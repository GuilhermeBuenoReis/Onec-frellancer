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
import { useListCredentialClient } from '@/http/generated/api';
import { CredentialEmptyView } from '@/components/credential-empty-view';

export function Contestation() {
  const navigate = useNavigate();
  const {
    data: credentialClient,
    isLoading,
    error,
  } = useListCredentialClient();

  if (isLoading) return <div>Carregando…</div>;
  if (error) return <div>Erro ao buscar credenciais.</div>;
  if (!credentialClient || credentialClient.length === 0) {
    return <CredentialEmptyView />;
  }
  const { credentials, clients, id: credentialClientId } = credentialClient[0];

  const chartData = Array.isArray(clients)
    ? clients.map(c => ({
        month: c.competenceMonth,
        returned: c.returned,
      }))
    : [];

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <strong>ID:</strong> {credentialClientId}
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
      {/* <Card className="lg:col-span-2">
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
              {credentials.map(ct => (
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
      </Card> */}

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
              {Array.isArray(clients)
                ? clients.map(c => (
                    <TableRow key={c.id} className="hover:bg-muted">
                      <TableCell>{c.enterprise}</TableCell>
                      <TableCell>{c.competenceMonth}</TableCell>
                      <TableCell>{c.cnpj}</TableCell>
                      <TableCell>{c.contestation}</TableCell>
                      <TableCell>{c.returned}</TableCell>
                    </TableRow>
                  ))
                : null}
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
