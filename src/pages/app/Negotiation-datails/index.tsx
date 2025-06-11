import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNegotiationDetail } from '@/hooks/useNegotiationDetail';
import { NegotiationDetailsDisplay } from './ui/negotiation-details-display';
import { EditNegotiationForm } from './ui/edit-negotiation-form';
import { DeleteNegotiationButton } from './ui/delete-negotiation-button';
import type { NegotiationFormValues } from '@/domain/negotiation/form-schema';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function NegotiationDetailPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    isLoading,
    negotiation,
    formData,
    handleChange,
    handleUpdate,
    handleDelete,
    isDeleting,
  } = useNegotiationDetail(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando detalhes da negociação…
      </div>
    );
  }

  if (!negotiation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-600">
        <p>Negociação não encontrada.</p>
        <Button className="mt-4" onClick={() => navigate('/negotiation')}>
          ← Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="p-6 space-y-6 overflow-y-auto">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>

          <NegotiationDetailsDisplay
            nego={negotiation}
            onEdit={() => {}}
            onDelete={handleDelete}
            onClose={() => navigate('/negotiation')}
          />

          <EditNegotiationForm
            defaultValues={formData as NegotiationFormValues}
            onSubmit={(data: any) => {
              (Object.keys(data) as (keyof INegotiation)[]).forEach(key => {
                handleChange(key, data[key]);
              });
              handleUpdate();
            }}
          />

          <DeleteNegotiationButton
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </main>
      </div>
    </div>
  );
}
