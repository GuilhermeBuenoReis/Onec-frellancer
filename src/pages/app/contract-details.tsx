import { type FormEvent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  type GetContract200Item,
  type UpdateContractBody,
  getGetContractByIdQueryKey,
  useGetContractById,
  useUpdateContract,
  useDeleteContract,
} from '@/http/generated/api';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UpdateSheet } from '@/components/update-sheet';

function isNonNull<T>(v: T): v is NonNullable<T> {
  return v != null;
}

export function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  console.log('[ContractDetail] parâmetro id recebido:', id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: contract,
    isLoading,
    isError,
    error,
  } = useGetContractById(id ?? '', {
    query: { enabled: Boolean(id) },
  });

  useEffect(() => {
    if (isError) {
      console.error('[ContractDetail] erro ao buscar contrato:', error);
    }
  }, [isError, error]);

  const [formData, setFormData] = useState<Partial<GetContract200Item>>({});

  useEffect(() => {
    if (contract) {
      console.log('[ContractDetail] contrato recebido do hook:', contract);
      setFormData(contract);
    }
  }, [contract]);

  const updateMutation = useUpdateContract();
  const deleteMutation = useDeleteContract();
  const isUpdating = updateMutation.status === 'pending';
  const isDeleting = deleteMutation.status === 'pending';

  const handleChange = <K extends keyof GetContract200Item>(
    field: K,
    value: GetContract200Item[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contract) return;

    const entries = Object.entries(formData)
      .filter(([, v]) => isNonNull(v))
      .map(
        ([k, v]) =>
          [k, v] as [
            keyof GetContract200Item,
            NonNullable<GetContract200Item[keyof GetContract200Item]>,
          ]
      );

    const payload = entries.reduce<UpdateContractBody>(
      (acc, [key, value]) => Object.assign(acc, { [key]: value }),
      {}
    );

    await updateMutation.mutateAsync(
      { id: contract.id, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id),
          });
          alert('Contrato atualizado com sucesso!');
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!contract || !window.confirm('Deseja realmente deletar este contrato?'))
      return;

    await deleteMutation.mutateAsync(
      { id: contract.id },
      {
        onSuccess: () => {
          alert('Contrato deletado com sucesso!');
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id),
          });
          navigate(-1); // volta à página anterior
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando contrato...
      </div>
    );
  }

  if (isError || !contract) {
    return (
      <div className="text-center mt-8">
        Erro ao carregar contrato ou contrato não existe.
      </div>
    );
  }

  // 11. Renderiza detalhes do contrato
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={false} toggleSidebar={() => {}} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => {}} />
        <main className="p-6 overflow-y-auto">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Contrato: {contract.client}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <strong>Id</strong> {contract.id}
                </div>
                <div>
                  <strong>Cidade:</strong> {contract.city}
                </div>
                <div>
                  <strong>Estado:</strong> {contract.state}
                </div>
                <div>
                  <strong>Cliente:</strong> {contract.client}
                </div>
                <div>
                  <strong>CNPJ:</strong> {contract.cnpj}
                </div>
                <div>
                  <strong>Ano:</strong> {contract.year}
                </div>
                <div>
                  <strong>Status:</strong> {contract.status}
                </div>
                <div>
                  <strong>Matéria:</strong> {contract.matter}
                </div>
                <div>
                  <strong>Forecast:</strong> {contract.forecast}
                </div>
                <div>
                  <strong>Total:</strong> {contract.contractTotal}
                </div>
                <div>
                  <strong>Porcentagem:</strong> {contract.percentage}
                </div>
                <div>
                  <strong>Guide Médio:</strong> {contract.averageGuide}
                </div>
                <div>
                  <strong>Parceiro:</strong> {contract.partner}
                </div>
                <div>
                  <strong>Comissão Parceiro:</strong>{' '}
                  {contract.partnerCommission}
                </div>
                <div>
                  <strong>Assinado:</strong> {contract.signedContract}
                </div>
                <div>
                  <strong>Contato:</strong> {contract.counter} /{' '}
                  {contract.email}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 gap-3">
                <div className="flex items-center gap-4">
                  <UpdateSheet
                    title="Editar Contrato"
                    trigger={<Button className="bg-orange-400">Editar</Button>}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isUpdating}
                  />
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deletando...' : 'Deletar'}
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => navigate(-1)}>Voltar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
