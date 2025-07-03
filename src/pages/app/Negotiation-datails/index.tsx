import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNegotiationDetail } from '@/hooks/useNegotiationDetail';
import { UpdateNegotiationSheet } from './ui/edit-negotiation-form';
import { DeleteNegotiationButton } from './ui/delete-negotiation-button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
    isUpdating,
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
        <Button onClick={() => navigate('/negotiation')} className="mt-4">
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

          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Negociação</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div><strong>ID:</strong> {negotiation.id}</div>
              <div><strong>Título:</strong> {negotiation.title ?? '—'}</div>
              <div><strong>Cliente:</strong> {negotiation.client ?? '—'}</div>
              <div><strong>Usuário:</strong> {negotiation.user ?? '—'}</div>
              <div><strong>Tags:</strong> {negotiation.tags ?? '—'}</div>
              <div><strong>Etapa:</strong> {negotiation.step ?? '—'}</div>
              <div><strong>Status:</strong> {negotiation.status ?? '—'}</div>
              <div><strong>Valor:</strong> {negotiation.value != null ? negotiation.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '—'}</div>
              <div><strong>Data Início:</strong> {negotiation.startsDate ? new Date(negotiation.startsDate).toLocaleDateString('pt-BR') : '—'}</div>
              <div><strong>Observação:</strong> {negotiation.observation ?? '—'}</div>
              <div><strong>Guia Média:</strong> {negotiation.averageGuide != null ? negotiation.averageGuide : '—'}</div>
              <div><strong>Parceiro ID:</strong> {negotiation.partnerId ?? '—'}</div>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-end">
            <UpdateNegotiationSheet
              formData={formData}
              onChange={handleChange}
              onSubmit={() => handleUpdate()}
              isLoading={isUpdating}
            />
            <DeleteNegotiationButton
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
            <Button variant="outline" onClick={() => navigate('/negotiation')}>
              Fechar
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
