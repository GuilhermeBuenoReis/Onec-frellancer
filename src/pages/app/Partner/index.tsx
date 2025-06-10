import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { usePartnerList } from '@/hooks/usePartnerList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { PartnerGrid } from './ui/partner-grid';

export function PartnerPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading, search, setSearch, partners } = usePartnerList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando parceiros...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet>
        <title>Parceiros</title>
      </Helmet>

      <div className="hidden md:flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => {}} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative bg-white w-64 h-full shadow-lg">
            <Sidebar isOpen toggleSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-4 md:p-6 bg-gray-50 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Parceiros</h2>
            <div className="flex items-center gap-3">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Input
                  placeholder="Buscar parceiros..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="px-3 py-2 border-none focus:ring-0 w-60"
                />
                <Button variant="ghost" onClick={() => {}}>
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <Link to="/rh/parceiros/create">
                <Button>Criar parceiro</Button>
              </Link>
            </div>
          </div>

          <PartnerGrid partners={partners} />
        </main>
      </div>
    </div>
  );
}
