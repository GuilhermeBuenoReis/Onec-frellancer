import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Sidebar } from '@/components/sidebar';

const generateClients = (count: number) =>
  Array.from({ length: count }, (_, idx) => ({
    id: idx + 1,
    date: `2025-05-${String((idx % 30) + 1).padStart(2, '0')}`,
    comp: `C${100 + idx}`,
    cnpj: `00.000.${String(idx + 1).padStart(3, '0')}/0001-XX`,
    cliente: `Cliente ${idx + 1}`,
    percentual: `${5 + (idx % 20)}%`,
    compensacaoMes: `R$ ${((idx + 1) * 100).toLocaleString()},00`,
    honorarios: `R$ ${((idx + 1) * 10).toLocaleString()},00`,
    imposto: `R$ ${((idx + 1) * 2).toLocaleString()},00`,
    status: idx % 3 === 0 ? 'Inativo' : 'Ativo',
  }));

export function ClientsDashboard() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pageSize = 10;
  const clients = generateClients(53);

  const filtered = clients.filter(
    c =>
      c.cliente.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = filtered.filter(c => c.status === 'Ativo').length;
  const inactiveCount = filtered.filter(c => c.status === 'Inativo').length;
  const pieData = [
    { name: 'Ativos', value: activeCount },
    { name: 'Inativos', value: inactiveCount },
  ];
  const COLORS = ['#34D399', '#F87171'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header e Busca */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="md:hidden p-2 rounded bg-white shadow"
            onClick={() => setSidebarOpen(o => !o)}
          >
            ☰
          </button>
          <h1 className="text-3xl font-bold">Dashboard de Clientes</h1>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar por nome ou CNPJ..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-xs"
            />
            <Button variant="outline">
              <Search className="w-5 h-5 mr-1" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Conteúdo principal em grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico e Métricas */}
          <section className="space-y-6">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Distribuição de Status</CardTitle>
              </CardHeader>
              <CardContent className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={24} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Total Filtrados',
                  value: filtered.length,
                  bg: 'from-indigo-500 to-indigo-300',
                },
                {
                  title: 'Contratos Ativos',
                  value: activeCount,
                  bg: 'from-green-500 to-green-300',
                },
                {
                  title: 'Contratos Inativos',
                  value: inactiveCount,
                  bg: 'from-red-500 to-red-300',
                },
              ].map((card, idx) => (
                <Card
                  key={idx}
                  className={`bg-gradient-to-r ${card.bg} text-white shadow`}
                >
                  <CardContent className="flex flex-col items-center py-4">
                    <CardTitle className="text-base font-medium">
                      {card.title}
                    </CardTitle>
                    <span className="mt-1 text-3xl font-semibold">
                      {card.value}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tabela com paginação */}
          <section className="lg:col-span-2">
            <Card className="shadow-md rounded-xl">
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <CardTitle>Clientes</CardTitle>
                    <CardDescription>
                      Lista detalhada com paginação
                    </CardDescription>
                  </div>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-lg">
                  <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        {[
                          'ID',
                          'Data',
                          'COMP',
                          'CNPJ',
                          'Cliente',
                          '%',
                          'Compensação',
                          'Honorários',
                          'Imposto',
                          'Status',
                        ].map((h, i) => (
                          <TableHead
                            key={i}
                            className="p-3 text-left text-xs font-semibold text-gray-700 uppercase"
                          >
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.map((c, i) => (
                        <TableRow
                          key={c.id}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.id}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.date}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.comp}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.cnpj}
                          </TableCell>
                          <TableCell className="p-2 text-sm font-medium text-gray-900">
                            {c.cliente}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.percentual}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.compensacaoMes}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.honorarios}
                          </TableCell>
                          <TableCell className="p-2 text-xs text-gray-800">
                            {c.imposto}
                          </TableCell>
                          <TableCell className="p-2 text-xs">
                            <Badge
                              variant={
                                c.status === 'Ativo' ? 'default' : 'destructive'
                              }
                            >
                              {c.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginação */}
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  >
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                    />
                    <PaginationContent>
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <PaginationItem key={idx}>
                          <PaginationLink
                            isActive={idx + 1 === currentPage}
                            onClick={() => setCurrentPage(idx + 1)}
                          >
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage(p => Math.min(p + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
