import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CreatePartnerForm } from './ui/create-partner-form';

export function CreatePartnerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(o => !o)}
      />

      <main className="flex-1 bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
          <Link
            to="/rh"
            className="inline-flex items-center mb-6 bg-zinc-300 rounded-2xl p-2 hover:bg-zinc-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Link>

          <h1 className="text-2xl font-bold mb-6 text-center">
            Criar Novo Parceiro
          </h1>

          <CreatePartnerForm />
        </div>
      </main>
    </div>
  );
}
