import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useGetOnePartner,
  useUpdatePartner,
  useDeletePartner,
  getGetOnePartnerQueryKey,
} from '@/http/generated/api';
import type { GetOnePartner200 } from '@/http/generated/api';
import { QueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

interface Partner extends GetOnePartner200 {
  commissionEvolution?: { month: string; commission: number }[];
  contractDistribution?: { name: string; value: number }[];
}

export function PartnerDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: partner,
    isLoading,
    error,
  } = id ? useGetOnePartner(id) : { data: null, isLoading: false, error: null };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({});

  const { mutateAsync: updatePartner } = useUpdatePartner();
  const { mutateAsync: deletePartner } = useDeletePartner();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (partner) {
      setFormData({ ...(partner as Partner) });
    }
  }, [partner]);

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error)
    return (
      <p className="p-4">Ocorreu um erro ao buscar os dados do parceiro.</p>
    );
  if (!partner) return <p className="p-4">Nenhum parceiro encontrado.</p>;

  const partnerData = partner as Partner;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Partner
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const sanitizedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== null)
      );
      await updatePartner({ id: partnerData.id, data: sanitizedFormData });
      alert('Parceiro atualizado com sucesso!');
      setEditDialogOpen(false);

      queryClient.invalidateQueries({
        queryKey: getGetOnePartnerQueryKey(partnerData.id),
      });
    } catch (error) {
      alert('Erro ao atualizar o parceiro!');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja deletar este parceiro?'
    );
    if (confirmDelete) {
      try {
        await deletePartner({ id: partnerData.id });
        alert('Parceiro deletado com sucesso!');
        navigate('/rh');
      } catch (error) {
        alert('Erro ao deletar o parceiro!');
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Dashboard de Parceiro" />
      <aside className="hidden md:flex">
        <Sidebar />
        <div className="w-2 cursor-col-resize bg-gray-300" />
      </aside>
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
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-8">
          <Card className="mb-6">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Link to="/rh" className="bg-zinc-300 rounded-full p-1">
                    <ArrowLeft />
                  </Link>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {partnerData.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
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
                <div className="flex w-full justify-between">
                  <div className="flex gap-4">
                    <Dialog
                      open={editDialogOpen}
                      onOpenChange={setEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer">Editar</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg sm:w-full">
                        <DialogHeader>
                          <DialogTitle>Editar Parceiro</DialogTitle>
                          <DialogDescription>
                            Atualize as informações necessárias.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleUpdateSubmit}
                          className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-auto pr-2"
                        >
                          <div>
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              id="name"
                              value={formData.name || ''}
                              onChange={e => handleInputChange(e, 'name')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cpfOrCnpj">CPF/CNPJ</Label>
                            <Input
                              id="cpfOrCnpj"
                              value={formData.cpfOrCnpj || ''}
                              onChange={e => handleInputChange(e, 'cpfOrCnpj')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Cidade</Label>
                            <Input
                              id="city"
                              value={formData.city || ''}
                              onChange={e => handleInputChange(e, 'city')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">Estado</Label>
                            <Input
                              id="state"
                              value={formData.state || ''}
                              onChange={e => handleInputChange(e, 'state')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="commission">Comissão Atual</Label>
                            <Input
                              id="commission"
                              type="number"
                              value={formData.commission?.toString() || ''}
                              onChange={e => handleInputChange(e, 'commission')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="portal">Portal</Label>
                            <Input
                              id="portal"
                              value={formData.portal || ''}
                              onChange={e => handleInputChange(e, 'portal')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="channelHead">Head do Canal</Label>
                            <Input
                              id="channelHead"
                              value={formData.channelHead || ''}
                              onChange={e =>
                                handleInputChange(e, 'channelHead')
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="regional">Regional</Label>
                            <Input
                              id="regional"
                              value={formData.regional || ''}
                              onChange={e => handleInputChange(e, 'regional')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="coordinator">Coordenador</Label>
                            <Input
                              id="coordinator"
                              value={formData.coordinator || ''}
                              onChange={e =>
                                handleInputChange(e, 'coordinator')
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="agent">Agente</Label>
                            <Input
                              id="agent"
                              value={formData.agent || ''}
                              onChange={e => handleInputChange(e, 'agent')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="indicator">Indicador</Label>
                            <Input
                              id="indicator"
                              value={formData.indicator || ''}
                              onChange={e => handleInputChange(e, 'indicator')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="contract">Contrato</Label>
                            <Input
                              id="contract"
                              value={formData.contract || ''}
                              onChange={e => handleInputChange(e, 'contract')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                              id="phone"
                              value={formData.phone || ''}
                              onChange={e => handleInputChange(e, 'phone')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              value={formData.email || ''}
                              onChange={e => handleInputChange(e, 'email')}
                            />
                          </div>
                          <div>
                            <Label htmlFor="responsible">Responsável</Label>
                            <Input
                              id="responsible"
                              value={formData.responsible || ''}
                              onChange={e =>
                                handleInputChange(e, 'responsible')
                              }
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="cursor-pointer">
                              Salvar
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      className="cursor-pointer"
                    >
                      Deletar
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <Button className="cursor-pointer">
                      <Link to={`/portal/${partnerData.id}/upload`}>
                        Adicionar novo honorário
                      </Link>
                    </Button>

                    <Button className="cursor-pointer">
                      <Link to={`/portal/${partner.id}/information-honorary`}>
                        Consultar os honorários
                      </Link>
                    </Button>
                    <Button className="cursor-pointer">
                      <Link to="/contestation">Contestação</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
