import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { useContestation } from '@/hooks/useContestation';
import { CredentialCard } from './ui/credential-card';
import { ContestationFormSheet } from './ui/contestation-form-sheet';
import { ContestationTable } from './ui/contestation-table';
import { ContestationChart } from './ui/contestation-chart';

export function ContestationPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const {
    isLoading,
    error,
    credential,
    clients,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    chartData,
  } = useContestation();

  if (isLoading) return <div>Carregando…</div>;
  if (error) return <div className="text-red-600">Erro ao carregar dados.</div>;
  if (!credential) return <div>Nenhuma credencial encontrada.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <main className="flex-1 p-6 space-y-6">
        <Button variant="default" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>

        <CredentialCard info={credential} />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Contestações</h2>
          <ContestationFormSheet
            open={false}
            setOpen={() => {}}
            onSubmit={async data => {
              console.log(data);
            }}
          />
        </div>

        <ContestationTable data={clients} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label>Data Inicial</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>Data Final</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <ContestationChart data={chartData} />
      </main>
    </div>
  );
}
