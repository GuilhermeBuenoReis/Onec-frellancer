import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
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
import { useGetOnePartner } from '@/http/generated/api';

const defaultCommissionEvolution = [
  { month: 'Jan', commission: 10 },
  { month: 'Fev', commission: 12 },
  { month: 'Mar', commission: 11 },
  { month: 'Abr', commission: 13 },
  { month: 'Mai', commission: 14 },
  { month: 'Jun', commission: 12 },
];

const defaultPieData = [
  { name: 'Ativos', value: 30 },
  { name: 'Finalizados', value: 50 },
  { name: 'Em Andamento', value: 20 },
];

const COLORS = ['#4CAF50', '#F44336', '#FF9800'];

export function PartnerDashboard() {
  const { id } = useParams();
  const {
    data: partner,
    isLoading,
    error,
  } = id ? useGetOnePartner(id) : { data: null, isLoading: false, error: null };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao buscar os dados do parceiro.</p>;
  if (!partner) return <p>Nenhum parceiro encontrado.</p>;

  const commissionData =
    partner.commissionEvolution || defaultCommissionEvolution;
  const pieChartData = partner.contractDistribution || defaultPieData;

  console.log(partner.contract);

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Dashboard de Parceiro" />
      <div
        className={`fixed inset-0 z-50 transition-transform transform md:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-8 overflow-y-auto">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-10">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Dashboard de Detalhes do Parceiro
            </h1>
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
                  <Button variant="default">Editar Parceiro</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Evolução da Comissão
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={commissionData}>
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Distribuição de Contratos
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          index
                        }`}
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
