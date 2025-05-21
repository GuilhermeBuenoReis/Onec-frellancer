import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sidebar } from './sidebar';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { List } from 'lucide-react';
import { useCreateClient, useCreateCredential } from '@/http/generated/api';

// Zod schemas
const credentialSchema = z.object({
  channelHead: z.string().nullable(),
  partner: z.string().nullable(),
  cnpj: z.string().nullable(),
  agentIndicator: z.string().nullable(),
});
const clientSchema = z.object({
  enterprise: z.string().nullable(),
  competenceMonth: z.string().nullable(),
  cnpj: z.string().nullable(),
  product: z.string().nullable(),
  contestation: z.string().nullable(),
  returned: z.string().nullable(),
});
const contestationSchema = z.object({
  credential: credentialSchema,
  client: clientSchema,
});

type ContestationForm = z.infer<typeof contestationSchema>;

export function CredentialEmptyView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(prev => !prev);
  }

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContestationForm>({
    resolver: zodResolver(contestationSchema),
    defaultValues: {
      credential: {
        channelHead: null,
        partner: null,
        cnpj: null,
        agentIndicator: null,
      },
      client: {
        enterprise: null,
        competenceMonth: null,
        cnpj: null,
        product: null,
        contestation: null,
        returned: null,
      },
    },
  });

  // Orval hooks
  const { mutateAsync: mutateCredential } = useCreateCredential();
  const { mutateAsync: mutateClient } = useCreateClient();

  // Create credential, retornando ID como string (UUID)
  async function createCredential(
    data: ContestationForm['credential']
  ): Promise<{ id: string }> {
    const body = {
      channelHead: data.channelHead,
      partner: data.partner,
      cnpj: data.cnpj,
      agentIndicator: data.agentIndicator,
    };
    const res = await mutateCredential({ data: body });
    // assume res is { id: string }
    return res as unknown as { id: string };
  }

  // Create client, aceita credentialId como string
  async function createClient(
    data: ContestationForm['client'],
    credentialId: string
  ): Promise<unknown> {
    const body = { ...data, credentialId };
    const res = await mutateClient({ data: body });
    return res;
  }

  // Submit handler
  async function onSubmit(data: ContestationForm) {
    try {
      const createdCred = await createCredential(data.credential);
      const credId = createdCred.id;

      await createClient(data.client, credId);
      alert('Contestação criada com sucesso!');
    } catch (error) {
      console.error('Erro no onSubmit:', error);
      alert('Falha ao criar contestação.');
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col p-6 md:p-10 bg-gray-50">
        <header className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <button type="button" onClick={toggleSidebar}>
            <List className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Contestações</h1>
          <div className="w-6 h-6" />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white shadow-sm rounded-xl p-6 border space-y-6 text-center max-w-xl">
            <h2 className="text-xl font-semibold text-gray-700">
              Ops! Ainda não há contestações registradas.
            </h2>
            <p className="text-gray-500">
              Parece que este parceiro ainda não teve nenhuma contestação. Que
              tal iniciar agora?
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Nova Contestação</Button>
              </SheetTrigger>
              <SheetContent size="md" side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Nova Contestação</SheetTitle>
                  <SheetDescription>
                    Preencha os dados de credencial e cliente abaixo.
                  </SheetDescription>
                </SheetHeader>
                <form
                  id="new-contestation-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 p-4"
                >
                  {/* Credential */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Informações da Credencial
                    </h3>
                    <Label htmlFor="credential.channelHead">
                      Chefe de Canal
                    </Label>
                    <Input
                      {...register('credential.channelHead')}
                      id="credential.channelHead"
                    />
                    {errors.credential?.channelHead && (
                      <p className="text-red-500 text-sm">
                        {errors.credential.channelHead.message}
                      </p>
                    )}
                    <Label htmlFor="credential.partner">Parceria</Label>
                    <Input
                      {...register('credential.partner')}
                      id="credential.partner"
                    />
                    {errors.credential?.partner && (
                      <p className="text-red-500 text-sm">
                        {errors.credential.partner.message}
                      </p>
                    )}
                    <Label htmlFor="credential.cnpj">CNPJ (Credencial)</Label>
                    <Input
                      {...register('credential.cnpj')}
                      id="credential.cnpj"
                    />
                    {errors.credential?.cnpj && (
                      <p className="text-red-500 text-sm">
                        {errors.credential.cnpj.message}
                      </p>
                    )}
                    <Label htmlFor="credential.agentIndicator">
                      Indicador de Agente
                    </Label>
                    <Input
                      {...register('credential.agentIndicator')}
                      id="credential.agentIndicator"
                    />
                    {errors.credential?.agentIndicator && (
                      <p className="text-red-500 text-sm">
                        {errors.credential.agentIndicator.message}
                      </p>
                    )}
                  </section>
                  {/* Client */}
                  <section className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Informações do Cliente
                    </h3>
                    <Label htmlFor="client.enterprise">Empresa</Label>
                    <Input
                      {...register('client.enterprise')}
                      id="client.enterprise"
                    />
                    {errors.client?.enterprise && (
                      <p className="text-red-500 text-sm">
                        {errors.client.enterprise.message}
                      </p>
                    )}
                    <Label htmlFor="client.competenceMonth">
                      Mês de Competência
                    </Label>
                    <Controller
                      control={control}
                      name="client.competenceMonth"
                      render={({ field }) => (
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={date =>
                            date && field.onChange(date.toISOString())
                          }
                        />
                      )}
                    />
                    {errors.client?.competenceMonth && (
                      <p className="text-red-500 text-sm">
                        {errors.client.competenceMonth.message}
                      </p>
                    )}
                    <Label htmlFor="client.cnpj">CNPJ (Cliente)</Label>
                    <Input {...register('client.cnpj')} id="client.cnpj" />
                    {errors.client?.cnpj && (
                      <p className="text-red-500 text-sm">
                        {errors.client.cnpj.message}
                      </p>
                    )}
                    <Label htmlFor="client.product">Produto</Label>
                    <Input
                      {...register('client.product')}
                      id="client.product"
                    />
                    {errors.client?.product && (
                      <p className="text-red-500 text-sm">
                        {errors.client.product.message}
                      </p>
                    )}
                    <Label htmlFor="client.contestation">Contestações</Label>
                    <Input
                      type="number"
                      {...register('client.contestation')}
                      id="client.contestation"
                    />
                    {errors.client?.contestation && (
                      <p className="text-red-500 text-sm">
                        {errors.client.contestation.message}
                      </p>
                    )}
                    <Label htmlFor="client.returned">Retornos</Label>
                    <Input
                      type="number"
                      {...register('client.returned')}
                      id="client.returned"
                    />
                    {errors.client?.returned && (
                      <p className="text-red-500 text-sm">
                        {errors.client.returned.message}
                      </p>
                    )}
                  </section>
                </form>
                <SheetFooter>
                  <Button
                    type="submit"
                    form="new-contestation-form"
                    className="w-full"
                  >
                    Salvar
                  </Button>
                  <SheetClose asChild>
                    <Button variant="ghost" className="w-full">
                      Cancelar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </main>
      </div>
    </div>
  );
}
