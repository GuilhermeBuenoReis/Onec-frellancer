import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { CreateContractForm } from './ui/create-contract-form';

export function CreateContractPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(o => !o)}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="w-full p-4 md:p-8 overflow-y-auto">
          <Helmet>
            <title>Criar Contrato</title>
          </Helmet>
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Criar Novo Contrato
            </h1>
            <CreateContractForm />
          </div>
        </main>
      </div>
    </div>
  );
}
