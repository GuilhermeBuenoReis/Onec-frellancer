import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchHeader({
  search,
  onSearchChange,
  onSearchSubmit,
  onOpenCreate,
  onExport,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  onSearchSubmit: () => void;
  onOpenCreate: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
      <h1 className="text-3xl font-bold text-gray-800">
        Controle de Contratos
      </h1>
      <div className="flex items-center gap-3">
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <Input
            placeholder="Buscar empresa, status, cidade ou estado..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="px-3 py-2 border-none focus:ring-0 w-60"
          />
          <Button variant="ghost" onClick={onSearchSubmit}>
            <Search className="w-5 h-5" />
          </Button>
        </div>
        <Button variant="outline" onClick={onOpenCreate}>
          Novo
        </Button>
        <Button variant="outline" onClick={onExport}>
          Exportar para Excel
        </Button>
      </div>
    </div>
  );
}
