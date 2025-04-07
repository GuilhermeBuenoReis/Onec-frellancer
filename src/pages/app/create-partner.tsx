'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/sidebar';
import { useCreatePartner } from '@/http/generated/api';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Schema de validação
const formSchema = z.object({
  name: z.string().nullable(),
  cpfOrCnpj: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  commission: z.number().nullable(),
  portal: z.string().nullable(),
  channelHead: z.string().nullable(),
  regional: z.string().nullable(),
  coordinator: z.string().nullable(),
  agent: z.string().nullable(),
  indicator: z.string().nullable(),
  contract: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  responsible: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export function CreatePartner() {
  const { mutateAsync: createPartner } = useCreatePartner();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleCreatePartner({
    name,
    cpfOrCnpj,
    city,
    state,
    commission,
    portal,
    channelHead,
    regional,
    coordinator,
    agent,
    indicator,
    contract,
    phone,
    email,
    responsible,
  }: FormData) {
    try {
      await createPartner({
        data: {
          name,
          cpfOrCnpj,
          city,
          state,
          commission,
          portal,
          channelHead,
          regional,
          coordinator,
          agent,
          indicator,
          contract,
          phone,
          email,
          responsible,
        },
      });
      toast.success('Parceiro criado com sucesso!');
      reset();
      navigate('/rh');
    } catch (error) {
      toast.error('Erro ao criar parceiro!');
      console.error('Error creating partner:', error);
    }
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
          <Link
            to="/rh"
            className="inline-flex items-center mb-6 bg-zinc-300 rounded-2xl p-2 hover:bg-zinc-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Link>

          <form
            onSubmit={handleSubmit(handleCreatePartner)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label htmlFor="name" className="font-medium text-gray-700">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Digite o nome"
                  {...register('name')}
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label
                  htmlFor="cpfOrCnpj"
                  className="font-medium text-gray-700"
                >
                  CPF/CNPJ
                </Label>
                <Input
                  id="cpfOrCnpj"
                  placeholder="Digite o CPF ou CNPJ"
                  {...register('cpfOrCnpj')}
                  className="mt-2"
                />
                {errors.cpfOrCnpj && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cpfOrCnpj.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="city" className="font-medium text-gray-700">
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="Digite a cidade"
                  {...register('city')}
                  className="mt-2"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="state" className="font-medium text-gray-700">
                  Estado
                </Label>
                <Input
                  id="state"
                  placeholder="Digite o estado"
                  {...register('state')}
                  className="mt-2"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label
                  htmlFor="commission"
                  className="font-medium text-gray-700"
                >
                  Comissão
                </Label>
                <Input
                  id="commission"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('commission', { valueAsNumber: true })}
                  className="mt-2"
                />
                {errors.commission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.commission.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="portal" className="font-medium text-gray-700">
                  Portal
                </Label>
                <Input
                  id="portal"
                  placeholder="Digite o portal"
                  {...register('portal')}
                  className="mt-2"
                />
                {errors.portal && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.portal.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label
                  htmlFor="channelHead"
                  className="font-medium text-gray-700"
                >
                  Líder de Canal
                </Label>
                <Input
                  id="channelHead"
                  placeholder="Digite o líder de canal"
                  {...register('channelHead')}
                  className="mt-2"
                />
                {errors.channelHead && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.channelHead.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="regional" className="font-medium text-gray-700">
                  Regional
                </Label>
                <Input
                  id="regional"
                  placeholder="Digite a regional"
                  {...register('regional')}
                  className="mt-2"
                />
                {errors.regional && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.regional.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label
                  htmlFor="coordinator"
                  className="font-medium text-gray-700"
                >
                  Coordenador
                </Label>
                <Input
                  id="coordinator"
                  placeholder="Digite o coordenador"
                  {...register('coordinator')}
                  className="mt-2"
                />
                {errors.coordinator && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.coordinator.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="agent" className="font-medium text-gray-700">
                  Agente
                </Label>
                <Input
                  id="agent"
                  placeholder="Digite o agente"
                  {...register('agent')}
                  className="mt-2"
                />
                {errors.agent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.agent.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="indicator"
                  className="font-medium text-gray-700"
                >
                  Indicador
                </Label>
                <Input
                  id="indicator"
                  placeholder="Digite o indicador"
                  {...register('indicator')}
                  className="mt-2"
                />
                {errors.indicator && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.indicator.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="contract" className="font-medium text-gray-700">
                  Contrato
                </Label>
                <Input
                  id="contract"
                  placeholder="Digite o contrato"
                  {...register('contract')}
                  className="mt-2"
                />
                {errors.contract && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contract.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="phone" className="font-medium text-gray-700">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(XX) XXXXX-XXXX"
                  {...register('phone')}
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* E-mail */}
              <div className="flex flex-col">
                <Label htmlFor="email" className="font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  {...register('email')}
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label
                  htmlFor="responsible"
                  className="font-medium text-gray-700"
                >
                  Responsável
                </Label>
                <Input
                  id="responsible"
                  placeholder="Digite o responsável"
                  {...register('responsible')}
                  className="mt-2"
                />
                {errors.responsible && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.responsible.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="text-white font-medium px-8 py-3 rounded-md cursor-pointer"
              >
                Salvar Parceiro
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
