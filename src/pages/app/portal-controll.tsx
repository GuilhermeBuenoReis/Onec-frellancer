import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Helmet } from 'react-helmet';
import { useGetPortalControlls } from '@/http/generated/api';
import {
  PortalControleForm,
  type CreatePortalControllInput,
} from '@/components/portal-controle-form';

export function PortalControllDashboard() {
  const { data: portalControlls, refetch } =
    useGetPortalControlls<CreatePortalControllInput[]>();
  const [filter, setFilter] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!portalControlls) return [];
    return filter
      ? portalControlls.filter(
          item =>
            item.enterprise.toLowerCase().includes(filter.toLowerCase()) ||
            item.product.toLowerCase().includes(filter.toLowerCase())
        )
      : portalControlls;
  }, [portalControlls, filter]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Helmet title="Portal Controll Dashboard" />

      <div
        className={`fixed inset-0 z-50 transition-transform transform md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-8 container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Dashboard do Portal de Controle
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-200"
                >
                  Filtrar por Enterprise
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl rounded-lg">
                <DropdownMenuItem onClick={() => setFilter('')}>
                  Todos
                </DropdownMenuItem>
                {portalControlls &&
                  Array.from(
                    new Set(portalControlls.map(item => item.enterprise))
                  ).map(enterprise => (
                    <DropdownMenuItem
                      key={enterprise}
                      onClick={() => setFilter(enterprise)}
                    >
                      {enterprise}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="flex justify-center bg-white shadow-md rounded p-1">
              <TabsTrigger
                value="list"
                className="px-4 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-white transition-colors"
              >
                Listagem
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="px-4 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200 data-[state=active]:bg-gray-800 data-[state=active]:text-white transition-colors"
              >
                Formulário
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <Card className="p-6 shadow-lg rounded-xl bg-white">
                <Table className="min-w-full table-fixed">
                  <TableHead>
                    <TableRow>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Empresa
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Produto
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        % Honorário
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Compensação
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Honorário
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Imposto
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Valor
                      </TableCell>
                      <TableCell className="w-1/8 px-6 py-3 border-t border-gray-200 text-left">
                        Situação
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="hover:bg-gray-100 transition-colors duration-150"
                      >
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.enterprise}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.product}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.percentageHonorary}%
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.compensation}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.honorary}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.tax}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.value}
                        </TableCell>
                        <TableCell className="border-t border-gray-200 text-left">
                          {item.situation}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="create">
              <Card className="p-8 shadow-lg rounded-xl bg-white">
                <PortalControleForm onCreate={refetch} />
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
