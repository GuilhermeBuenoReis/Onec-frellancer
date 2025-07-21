'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
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

const NegotiationFilterSchema = z.object({
  title: z.string().optional(),
  client: z.string().optional(),
  step: z.string().optional(),
  user: z.string().optional(),
  tags: z.string().optional(),
  status: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

type NegotiationFilterSchemaType = z.infer<typeof NegotiationFilterSchema>;

export function NegotiationFilterDialog() {
  const { setFilters, resetFilters } = useNegotiationFilters();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control } =
    useForm<NegotiationFilterSchemaType>({
      resolver: zodResolver(NegotiationFilterSchema),
      defaultValues: {
        title: '',
        client: '',
        step: '',
        user: '',
        tags: '',
        status: '',
        startDate: undefined,
        endDate: undefined,
      },
    });

  function applyFilters(values: NegotiationFilterSchemaType) {
    setLoading(true);
    setTimeout(() => {
      setFilters(values);
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

        <form
          onSubmit={handleSubmit(applyFilters)}
          className="flex flex-col gap-4"
        >
          <Input placeholder="Cliente" {...register('client')} />
          <Input placeholder="Título" {...register('title')} />
          <Input placeholder="Usuário" {...register('user')} />
          <Input placeholder="Status" {...register('status')} />
          <Input placeholder="Etapa" {...register('step')} />
          <Input placeholder="Tags" {...register('tags')} />

          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left w-full"
                  >
                    {field.value
                      ? `Início: ${format(field.value, 'dd/MM/yyyy')}`
                      : 'Selecionar data de início'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left w-full"
                  >
                    {field.value
                      ? `Fim: ${format(field.value, 'dd/MM/yyyy')}`
                      : 'Selecionar data final'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            )}
          />

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
