'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useContractFilters } from '../../-context/contract-filter-context';

const ContractFilterSchema = z.object({
  client: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  cnpj: z.string().optional(),
  sindic: z.string().optional(),
  year: z.string().optional(),
  matter: z.string().optional(),
  forecast: z.string().optional(),
  status: z.string().optional(),
  partner: z.string().optional(),
  email: z.string().optional(),
});

type ContractFilterSchemaType = z.infer<typeof ContractFilterSchema>;

export function ContractFilterDialog() {
  const { setFilters, resetFilters } = useContractFilters();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<ContractFilterSchemaType>({
    resolver: zodResolver(ContractFilterSchema),
    defaultValues: {
      client: '',
      city: '',
      state: '',
      cnpj: '',
      sindic: '',
      year: '',
      matter: '',
      forecast: '',
      status: '',
      partner: '',
      email: '',
    },
  });

  function applyFilters(values: ContractFilterSchemaType) {
    setLoading(true);

    const transformedFilters = {
      ...values,
      status: values.status ? [values.status.toLowerCase()] : [],
    };

    setTimeout(() => {
      setFilters(transformedFilters);
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
          Filtros de Contratos
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar contratos</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(applyFilters)}
          className="flex flex-col gap-4"
        >
          <Input placeholder="Cliente" {...register('client')} />
          <Input placeholder="Cidade" {...register('city')} />
          <Input placeholder="Estado" {...register('state')} />
          <Input placeholder="CNPJ" {...register('cnpj')} />
          <Input placeholder="Síndico" {...register('sindic')} />
          <Input placeholder="Ano" {...register('year')} />
          <Input placeholder="Assunto" {...register('matter')} />
          <Input placeholder="Previsão" {...register('forecast')} />
          <Input placeholder="Status (ex: ativo)" {...register('status')} />
          <Input placeholder="Parceiro" {...register('partner')} />
          <Input placeholder="Email" {...register('email')} />

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="progress"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-2 bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 flex-col"
              >
                <Button type="submit" className="w-full cursor-pointer">
                  Aplicar Filtros
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    reset();
                    resetFilters();
                    setOpen(false);
                  }}
                  className="w-full cursor-pointer"
                >
                  Limpar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </DialogContent>
    </Dialog>
  );
}
