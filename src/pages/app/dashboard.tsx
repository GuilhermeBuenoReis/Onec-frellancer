import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

type Partner = {
  id: string;
  name: string | null;
  cpfOrCnpj: string | null;
  city: string | null;
  state: string | null;
  commission: number | null;
  portal: string | null;
  channelHead: string | null;
  regional: string | null;
  coordinator: string | null;
  agent: string | null;
  indicator: string | null;
  contract: string | null;
  phone: string | null;
  email: string | null;
  responsible: string | null;
};

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Empresa X',
    cpfOrCnpj: '123.456.789-00',
    city: 'São Paulo',
    state: 'SP',
    commission: 10,
    portal: 'Portal X',
    channelHead: 'João Silva',
    regional: 'Sudeste',
    coordinator: 'Maria Oliveira',
    agent: 'Carlos Souza',
    indicator: 'José Santos',
    contract: 'Contrato 001',
    phone: '(11) 98765-4321',
    email: 'empresa@email.com',
    responsible: 'Ana Pereira',
  },
];

// Dados fictícios para o gráfico de evolução da comissão:
const commissionEvolution = [
  { month: 'Jan', commission: 10 },
  { month: 'Fev', commission: 12 },
  { month: 'Mar', commission: 11 },
  { month: 'Abr', commission: 13 },
  { month: 'Mai', commission: 14 },
  { month: 'Jun', commission: 12 },
];

// Dados fictícios para a distribuição de contratos:
const pieData = [
  { name: 'Ativos', value: 30 },
  { name: 'Finalizados', value: 50 },
  { name: 'Em Andamento', value: 20 },
];
const COLORS = ['#4CAF50', '#F44336', '#FF9800'];

export function PartnerDashboard() {
  const [search, setSearch] = useState('');
  const filteredPartners = mockPartners.filter(partner =>
    partner.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredPartners.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Nenhum parceiro encontrado.</p>
      </div>
    );
  }

  // Para este exemplo, utilizamos o primeiro parceiro filtrado
  const partner = filteredPartners[0];

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Dashboard de Parceiro" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-l-xl shadow-xl">
        <Header />
        <main className="p-8 overflow-y-auto">
          {/* Seção de Busca e Cabeçalho */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Dashboard de Detalhes do Parceiro
            </h1>
            <div className="mb-6 flex justify-center">
              <Input
                placeholder="Buscar parceiro..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-md"
              />
            </div>
            {/* Card de Detalhes do Parceiro */}
            <Card className="mb-8">
              <CardContent>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {partner.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p>
                    <strong>CPF/CNPJ:</strong> {partner.cpfOrCnpj}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {partner.city}
                  </p>
                  <p>
                    <strong>Estado:</strong> {partner.state}
                  </p>
                  <p>
                    <strong>Comissão Atual:</strong> {partner.commission}%
                  </p>
                  <p>
                    <strong>Portal:</strong> {partner.portal}
                  </p>
                  <p>
                    <strong>Head do Canal:</strong> {partner.channelHead}
                  </p>
                  <p>
                    <strong>Regional:</strong> {partner.regional}
                  </p>
                  <p>
                    <strong>Coordenador:</strong> {partner.coordinator}
                  </p>
                  <p>
                    <strong>Agente:</strong> {partner.agent}
                  </p>
                  <p>
                    <strong>Indicador:</strong> {partner.indicator}
                  </p>
                  <p>
                    <strong>Contrato:</strong> {partner.contract}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {partner.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {partner.email}
                  </p>
                  <p>
                    <strong>Responsável:</strong> {partner.responsible}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="primary">Editar Parceiro</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Linha - Evolução da Comissão */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Evolução da Comissão
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={commissionEvolution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#4a5568" />
                  <YAxis stroke="#4a5568" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="commission"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Gráfico de Pizza - Distribuição de Contratos */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Distribuição de Contratos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
