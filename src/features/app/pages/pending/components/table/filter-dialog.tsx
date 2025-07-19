'use client';

import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../components/ui/dialog';
import { Input } from '../../../../../../components/ui/input';

interface FilterDialogProps {
  onApply: (filters: {
    client?: string;
    responsible?: string;
    status?: string;
    category?: string;
  }) => void;
}

export function FilterDialog({ onApply }: FilterDialogProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    client: '',
    responsible: '',
    status: '',
    category: '',
  });

  function handleApply() {
    onApply(filters);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <Funnel className="size-4" />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar chamados</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Cliente"
            value={filters.client}
            onChange={e =>
              setFilters(prev => ({ ...prev, client: e.target.value }))
            }
          />
          <Input
            placeholder="Responsável"
            value={filters.responsible}
            onChange={e =>
              setFilters(prev => ({ ...prev, responsible: e.target.value }))
            }
          />
          <Input
            placeholder="Status"
            value={filters.status}
            onChange={e =>
              setFilters(prev => ({ ...prev, status: e.target.value }))
            }
          />
          <Input
            placeholder="Categoria"
            value={filters.category}
            onChange={e =>
              setFilters(prev => ({ ...prev, category: e.target.value }))
            }
          />

          <Button onClick={handleApply} className="w-full">
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
