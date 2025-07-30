'use client';

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Funnel, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDataTableContext } from '../-context/data-table-context';

export function FilterDialog() {
  const { setFilters } = useDataTableContext();

  const [open, setOpen] = useState(false);
  const [client, setClient] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  function applyFilters() {
    setLoading(true);
    setTimeout(() => {
      const formatted = [
        client && { id: 'client', value: client },
        responsible && { id: 'responsible', value: responsible },
        status && { id: 'status', value: status },
        category && { id: 'category', value: category },
        createdAt && {
          id: 'createdAt',
          value: format(createdAt, 'yyyy-MM-dd'),
        },
      ].filter(Boolean) as { id: string; value: string }[];

      setFilters(formatted);
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
          <Funnel className="w-4 h-4" />
          Filtros avançados
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar chamados</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Cliente"
            value={client}
            onChange={e => setClient(e.target.value)}
          />
          <Input
            placeholder="Responsável"
            value={responsible}
            onChange={e => setResponsible(e.target.value)}
          />
          <Input
            placeholder="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />
          <Input
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left">
                {createdAt
                  ? format(createdAt, 'dd/MM/yyyy')
                  : 'Selecionar data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={createdAt}
                onSelect={setCreatedAt}
                captionLayout="dropdown"
                startMonth={new Date(2024, 0, 1)}
                endMonth={new Date(new Date().getFullYear() + 1, 11, 31)}
              />
            </PopoverContent>
          </Popover>

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
