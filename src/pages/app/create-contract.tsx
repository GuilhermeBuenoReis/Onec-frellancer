import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateContract } from '@/http/generated/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const contractSchema = z.object({
  city: z.string().nullable(),
  client: z.string().nullable(),
  state: z.string().nullable(),
  cnpj: z.string().nullable(),
  sindic: z.string().nullable(),
  year: z.string().nullable(),
  matter: z.string().nullable(),
  forecast: z.string().nullable(),
  contractTotal: z.string().nullable(),
  percentage: z.number().nullable(),
  signedContract: z.string().nullable(),
  status: z.string().nullable(),
  averageGuide: z.number().nullable(),
  partner: z.string().nullable(),
  partnerCommission: z.number().nullable(),
  counter: z.string().nullable(),
  email: z.string().nullable(),
});

type ContractFormValues = z.infer<typeof contractSchema>;

export function CreateContract() {
  const { mutate: createContract } = useCreateContract();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      city: null,
      client: null,
      state: null,
      cnpj: null,
      sindic: null,
      year: null,
      matter: null,
      forecast: null,
      contractTotal: null,
      percentage: null,
      signedContract: null,
      status: null,
      averageGuide: null,
      partner: null,
      partnerCommission: null,
      counter: null,
      email: null,
    },
  });

  const onSubmit = async ({
    averageGuide,
    city,
    client,
    cnpj,
    contractTotal,
    counter,
    email,
    forecast,
    matter,
    partner,
    partnerCommission,
    percentage,
    signedContract,
    sindic,
    state,
    status,
    year,
  }: ContractFormValues) => {
    try {
      createContract({
        data: {
          averageGuide,
          city,
          client,
          cnpj,
          contractTotal,
          counter,
          email,
          forecast,
          matter,
          partner,
          partnerCommission,
          percentage,
          signedContract,
          sindic,
          state,
          status,
          year,
        },
      });
      toast.success('Contrato criado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.log('Error creating contract:', error);
      toast.error('Erro ao criar contrato. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Header toggleSidebar={() => console.log('Sidebar toggled')} />
        <main className="w-full p-4 md:p-8 overflow-y-auto">
          <Helmet title="Criar Contrato" />
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Criar Novo Contrato
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Cliente</label>
                <Input {...register('client')} placeholder="Nome do cliente" />
                {errors.client && (
                  <span className="text-red-500 text-sm">
                    {errors.client.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Cidade</label>
                <Input {...register('city')} placeholder="Cidade" />
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Estado</label>
                <Input {...register('state')} placeholder="Estado" />
                {errors.state && (
                  <span className="text-red-500 text-sm">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">CNPJ</label>
                <Input {...register('cnpj')} placeholder="CNPJ" />
                {errors.cnpj && (
                  <span className="text-red-500 text-sm">
                    {errors.cnpj.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Síndico</label>
                <Input {...register('sindic')} placeholder="Síndico" />
                {errors.sindic && (
                  <span className="text-red-500 text-sm">
                    {errors.sindic.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Ano</label>
                <Input {...register('year')} placeholder="Ano" />
                {errors.year && (
                  <span className="text-red-500 text-sm">
                    {errors.year.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Assunto</label>
                <Input {...register('matter')} placeholder="Assunto" />
                {errors.matter && (
                  <span className="text-red-500 text-sm">
                    {errors.matter.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Previsão</label>
                <Input {...register('forecast')} placeholder="Previsão" />
                {errors.forecast && (
                  <span className="text-red-500 text-sm">
                    {errors.forecast.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Total do Contrato</label>
                <Input
                  {...register('contractTotal')}
                  placeholder="Total do contrato"
                />
                {errors.contractTotal && (
                  <span className="text-red-500 text-sm">
                    {errors.contractTotal.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Porcentagem</label>
                <Input
                  {...register('percentage', { valueAsNumber: true })}
                  type="number"
                  placeholder="Porcentagem"
                />
                {errors.percentage && (
                  <span className="text-red-500 text-sm">
                    {errors.percentage.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Contrato Assinado</label>
                <Input
                  {...register('signedContract')}
                  placeholder="Contrato assinado"
                />
                {errors.signedContract && (
                  <span className="text-red-500 text-sm">
                    {errors.signedContract.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Status</label>
                <Input {...register('status')} placeholder="Status" />
                {errors.status && (
                  <span className="text-red-500 text-sm">
                    {errors.status.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Guia Média</label>
                <Input
                  {...register('averageGuide', { valueAsNumber: true })}
                  type="number"
                  placeholder="Guia média"
                />
                {errors.averageGuide && (
                  <span className="text-red-500 text-sm">
                    {errors.averageGuide.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Parceiro</label>
                <Input {...register('partner')} placeholder="Parceiro" />
                {errors.partner && (
                  <span className="text-red-500 text-sm">
                    {errors.partner.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">
                  Comissão do Parceiro
                </label>
                <Input
                  {...register('partnerCommission', { valueAsNumber: true })}
                  type="number"
                  placeholder="Comissão do parceiro"
                />
                {errors.partnerCommission && (
                  <span className="text-red-500 text-sm">
                    {errors.partnerCommission.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">Contratante</label>
                <Input {...register('counter')} placeholder="Contratante" />
                {errors.counter && (
                  <span className="text-red-500 text-sm">
                    {errors.counter.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-700">E-mail</label>
                <Input {...register('email')} placeholder="E-mail" />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit">Criar Contrato</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
