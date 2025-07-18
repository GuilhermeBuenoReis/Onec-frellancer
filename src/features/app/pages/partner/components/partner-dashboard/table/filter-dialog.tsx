'use client';

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Funnel, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../../../../../../components/ui/button';
import { Calendar } from '../../../../../../../components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../../components/ui/dialog';
import { Input } from '../../../../../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../../../components/ui/popover';

interface FilterDialogProps {
  onApply: (filters: {
    contract?: string;
    enterprise?: string;
    product?: string;
    date?: string;
  }) => void;
}

export function FilterDialog({ onApply }: FilterDialogProps) {
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState('');
  const [enterprise, setEnterprise] = useState('');
  const [product, setProduct] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  function applyFilters() {
    setLoading(true);
    setTimeout(() => {
      onApply({
        contract,
        enterprise,
        product,
        date: date ? format(date, 'yyyy-MM') : undefined,
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
          Filtros avançados
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtros avançados</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Contrato"
            value={contract}
            onChange={e => setContract(e.target.value)}
          />
          <Input
            placeholder="Empresa"
            value={enterprise}
            onChange={e => setEnterprise(e.target.value)}
          />
          <Input
            placeholder="Produto"
            value={product}
            onChange={e => setProduct(e.target.value)}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left">
                {date ? format(date, 'dd/MM/yyyy') : 'Selecionar data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                startMonth={new Date(2025, 0, 1)}
                endMonth={new Date(new Date().getFullYear() + 1, 11, 31)}
                autoFocus
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
