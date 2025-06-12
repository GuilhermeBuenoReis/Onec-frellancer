import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { useGetPartnerApi } from '@/data/partner/partnerApi';
import { Input } from '@/components/ui/input';
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
import { CreatePartnerForm } from './create-partner-form';
import { PartnerDetailsDisplay } from './partner-details-display';

export function PartnerListPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { partners, isLoading } = useGetPartnerApi();
  const [search, setSearch] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = partners.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title>Parceiros</title>
      </Helmet>
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />

        <main className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Buscar parceiro..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-1/3"
            />

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button>Criar parceiro</Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-md overflow-auto"
              >
                <SheetHeader>
                  <SheetTitle>Novo Parceiro</SheetTitle>
                  <SheetDescription>
                    Preencha os dados para criar
                  </SheetDescription>
                </SheetHeader>

                <CreatePartnerForm />

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
          </div>

          {isLoading ? (
            <p>Carregando...</p>
          ) : filtered.length === 0 ? (
            <p>Nenhum parceiro encontrado.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <li key={p.id}>
                  <PartnerDetailsDisplay
                    partner={p}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onClose={() => {}}
                  />
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
