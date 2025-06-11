import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { usePartnerDetail } from '@/hooks/usePartnerDetail';
import { PartnerDetailsDisplay } from './ui/partner-details-display';
import { EditPartnerForm } from './ui/edit-partner-form';
import { DeletePartnerButton } from './ui/delete-partner-button';

export function PartnerDashboardPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    isLoading,
    error,
    partner,
    handleUpdate,
    handleDelete,
    isUpdating,
    isDeleting,
  } = usePartnerDetail(id);

  if (isLoading) return <p className="p-4">Carregando...</p>;
  if (error)
    return <p className="p-4 text-red-600">Erro ao carregar parceiro.</p>;
  if (!partner) return <p className="p-4">Parceiro não encontrado.</p>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title>Dashboard do Parceiro</title>
      </Helmet>
      <aside className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(o => !o)}
        />
      </aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar isOpen toggleSidebar={() => setSidebarOpen(false)} />
            <div className="p-2">
              <Button onClick={() => setSidebarOpen(false)}>Fechar</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-4 md:p-8">
          <Card className="mb-6">
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Link to="/rh">
                  <Button variant="ghost">← Voltar</Button>
                </Link>
                <h2 className="text-2xl font-semibold">{partner.name}</h2>
              </div>

              <PartnerDetailsDisplay
                partner={partner}
                onEdit={() => setSheetOpen(true)}
                onDelete={handleDelete}
                onClose={() => navigate('/rh')}
              />

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <></>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full max-w-md overflow-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Editar Parceiro</SheetTitle>
                    <SheetDescription>Faça alterações e salve</SheetDescription>
                  </SheetHeader>

                  <EditPartnerForm
                    defaultValues={partner}
                    onSubmit={(data: any) => {
                      handleUpdate(data);
                      setSheetOpen(false);
                    }}
                  />

                  <SheetFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSheetOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
