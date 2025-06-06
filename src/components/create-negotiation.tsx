'use client';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Sidebar } from '@/components/sidebar';
import { useCreateDataNegotiation } from '@/http/generated/api';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  title: z.string().nullable(),
  client: z.string().nullable(),
  user: z.string().nullable(),
  tags: z.string().nullable(),
  step: z.string().nullable(),
  status: z.string().nullable(),
  value: z.number().nullable(),
  partnerId: z.string().nullable(),
  startsDate: z.string().nullable(),
  observation: z.string().nullable(),
  averageGuide: z.number().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export function CreateNegotiation() {
  const { mutateAsync: negotiation } = useCreateDataNegotiation();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleCreateNegotiation({
    averageGuide,
    client,
    observation,
    partnerId,
    startsDate,
    status,
    step,
    tags,
    title,
    user,
    value,
  }: FormData) {
    try {
      await negotiation({
        data: {
          title,
          client,
          user,
          tags,
          step,
          status,
          value,
          partnerId,
          startsDate,
          observation,
          averageGuide,
        },
      });
      toast.success('Negociação criada com sucesso!');
      reset();
      navigate('/financas');
    } catch (error) {
      toast.error('Erro ao criar negociação!');
      console.error('Error creating negotiation:', error);
    }
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={false}
        toggleSidebar={(): void => {
          throw new Error('Function not implemented.');
        }}
      />

      <main className="flex-1 bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
          <Link
            to="/financas"
            className="inline-flex items-center mb-6 bg-zinc-300 rounded-2xl p-2 hover:bg-zinc-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Link>
          <form
            onSubmit={handleSubmit(handleCreateNegotiation)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label htmlFor="title" className="font-medium text-gray-700">
                  Título
                </Label>
                <Input
                  id="title"
                  placeholder="Digite o título"
                  {...register('title')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="client" className="font-medium text-gray-700">
                  Cliente
                </Label>
                <Input
                  id="client"
                  placeholder="Nome do Cliente"
                  {...register('client')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.client && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.client.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="user" className="font-medium text-gray-700">
                  Usuário
                </Label>
                <Input
                  id="user"
                  placeholder="Usuário Responsável"
                  {...register('user')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.user && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.user.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="tags" className="font-medium text-gray-700">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Ex: urgente, interna"
                  {...register('tags')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tags.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="step" className="font-medium text-gray-700">
                  Etapa
                </Label>
                <Input
                  id="step"
                  placeholder="Ex: Iniciação"
                  {...register('step')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.step && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.step.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="status" className="font-medium text-gray-700">
                  Status
                </Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ''}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
                        {field.value || 'Selecione o status'}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Iniciado">Iniciado</SelectItem>
                        <SelectItem value="Em andamento">
                          Em andamento
                        </SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="value" className="font-medium text-gray-700">
                  Valor
                </Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="R$ 0,00"
                  {...register('value', { valueAsNumber: true })}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.value && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.value.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="partnerId"
                  className="font-medium text-gray-700"
                >
                  ID do Parceiro
                </Label>
                <Input
                  id="partnerId"
                  placeholder="Ex: 123"
                  {...register('partnerId')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.partnerId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.partnerId.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="startsDate"
                  className="font-medium text-gray-700"
                >
                  Data de Início
                </Label>
                <Input
                  id="startsDate"
                  type="date"
                  {...register('startsDate')}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.startsDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startsDate.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="averageGuide"
                  className="font-medium text-gray-700"
                >
                  Guia Média
                </Label>
                <Input
                  id="averageGuide"
                  type="number"
                  placeholder="Ex: 5.4"
                  step="0.1"
                  {...register('averageGuide', { valueAsNumber: true })}
                  className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                />
                {errors.averageGuide && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.averageGuide.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <Label
                htmlFor="observation"
                className="font-medium text-gray-700"
              >
                Observações
              </Label>
              <Textarea
                id="observation"
                placeholder="Digite suas observações aqui..."
                rows={4}
                {...register('observation')}
                className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              />
              {errors.observation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.observation.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="text-white font-medium px-8 py-3 rounded-md cursor-pointer"
              >
                Salvar Negociação
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
