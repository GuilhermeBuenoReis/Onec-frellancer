import { useParams } from 'react-router-dom';
import { useState } from 'react';
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
import type { GetOnePartner200 } from '@/http/generated/api'; // Certifique-se de importar o tipo correto

// Extendendo o tipo GetOnePartner200 para incluir as novas propriedades
interface Partner extends GetOnePartner200 {
  commissionEvolution?: { month: string; commission: number }[];
  contractDistribution?: { name: string; value: number }[];
}

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

  // Fazemos a asserção de tipo para garantir que 'partner' possui as propriedades definidas em Partner
  const partnerData = partner as Partner;

  const commissionData =
    partnerData.commissionEvolution || defaultCommissionEvolution;
  const pieChartData = partnerData.contractDistribution || defaultPieData;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Dashboard de Parceiro" />
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </div>
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar />
            <div className="p-2">
              <Button onClick={() => setSidebarOpen(false)} variant="outline">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
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
                  {partnerData.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p>
                    <strong>CPF/CNPJ:</strong> {partnerData.cpfOrCnpj}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {partnerData.city}
                  </p>
                  <p>
                    <strong>Estado:</strong> {partnerData.state}
                  </p>
                  <p>
                    <strong>Comissão Atual:</strong> {partnerData.commission}%
                  </p>
                  <p>
                    <strong>Portal:</strong> {partnerData.portal}
                  </p>
                  <p>
                    <strong>Head do Canal:</strong> {partnerData.channelHead}
                  </p>
                  <p>
                    <strong>Regional:</strong> {partnerData.regional}
                  </p>
                  <p>
                    <strong>Coordenador:</strong> {partnerData.coordinator}
                  </p>
                  <p>
                    <strong>Agente:</strong> {partnerData.agent}
                  </p>
                  <p>
                    <strong>Indicador:</strong> {partnerData.indicator}
                  </p>
                  <p>
                    <strong>Contrato:</strong> {partnerData.contract}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {partnerData.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {partnerData.email}
                  </p>
                  <p>
                    <strong>Responsável:</strong> {partnerData.responsible}
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
