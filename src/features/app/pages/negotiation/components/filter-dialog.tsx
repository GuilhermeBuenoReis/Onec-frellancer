'use client';

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Funnel, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../../components/ui/button';
import { Calendar } from '../../../../../components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { Input } from '../../../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover';
import { useNegotiationFilters } from '../../../../../context/negotiation-filter-context';

export function NegotiationFilterDialog() {
  const { setFilters, resetFilters } = useNegotiationFilters();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  function applyFilters() {
    setLoading(true);
    setTimeout(() => {
      setFilters({
        status,
        startDate,
        endDate,
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
          <Funnel className="w-4 h-4" />
          Filtros de Negociação
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar negociações</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left">
                {startDate
                  ? `Início: ${format(startDate, 'dd/MM/yyyy')}`
                  : 'Selecionar data de início'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left">
                {endDate
                  ? `Fim: ${format(endDate, 'dd/MM/yyyy')}`
                  : 'Selecionar data final'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                captionLayout="dropdown"
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
                className="flex gap-2"
              >
                <Button
                  onClick={applyFilters}
                  className="w-full cursor-pointer"
                >
                  Aplicar Filtros
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    resetFilters();
                    setOpen(false);
                  }}
                  className="w-full"
                >
                  Limpar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
