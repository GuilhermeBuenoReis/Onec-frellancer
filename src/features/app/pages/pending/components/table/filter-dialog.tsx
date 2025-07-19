'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Funnel, Loader2 } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);

  function applyFilters() {
    setLoading(true);
    setTimeout(() => {
      onApply({
        category: filters.category,
        client: filters.client,
        responsible: filters.responsible,
        status: filters.status,
      });
      setLoading(false);
      setOpen(false);
    }, 800);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 items-center cursor-pointer"
        >
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

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center gap-2 text-sm text-muted-foreground py-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Aplicando filtros...
              </motion.div>
            ) : (
              <motion.div
                key="apply"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={applyFilters}
                  className="w-full cursor-pointer"
                >
                  Aplicar Filtros
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
