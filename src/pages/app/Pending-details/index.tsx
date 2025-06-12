import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { usePendingDetail } from '@/hooks/usePendingDetail';
import { PendingDetailsDisplay } from './ui/pending-details-display';
import { EditPendingForm } from './ui/edit-pending-form';
import { DeletePendingButton } from './ui/delete-pending-button';
import { Button } from '@/components/ui/button';

export function PendingDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { isLoading, error, pending, handleUpdate, handleDelete, isDeleting } =
    usePendingDetail(id);

  if (isLoading) return <p>Carregando…</p>;
  if (error) return <p className="text-red-600">Erro: {String(error)}</p>;
  if (!pending) return <p>Pendência não encontrada.</p>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-6">
          <Card>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Pendência #{pending.id}</h2>
                <div className="space-x-2">
                  <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                      <Button>Editar</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Editar Pendência</DialogTitle>
                        <DialogDescription>
                          Atualize os campos abaixo
                        </DialogDescription>
                      </DialogHeader>
                      <EditPendingForm
                        defaultValues={pending}
                        onSubmit={async data => {
                          await handleUpdate(data);
                          setEditOpen(false);
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                  <DeletePendingButton
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                  <Button variant="outline" onClick={() => navigate(-1)}>
                    Fechar
                  </Button>
                </div>
              </div>
              <PendingDetailsDisplay pending={pending} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
