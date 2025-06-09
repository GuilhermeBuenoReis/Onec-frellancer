import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useContractDetail } from '@/hooks/useContractDetail';
import { ContractInfoCard } from './ui/contract-info-card';
import { UpdateContractSheet } from './ui/update-contract-sheet';
import { DeleteContractButton } from './ui/delete-contract-button';

export function ContractDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    isLoading,
    isError,
    contract,
    formData,
    handleChange,
    handleUpdate,
    handleDelete,
    isUpdating,
    isDeleting,
  } = useContractDetail(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando contrato...
      </div>
    );
  }

  if (isError || !contract) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p>Erro ao carregar contrato ou contrato não encontrado.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(open => !open)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(open => !open)} />

        <main className="p-6 overflow-y-auto space-y-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>

          <ContractInfoCard contract={contract} />

          <div className="flex gap-2 justify-end">
            <UpdateContractSheet
              formData={formData}
              onChange={handleChange}
              onSubmit={handleUpdate}
              isLoading={isUpdating}
            />
            <DeleteContractButton
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
