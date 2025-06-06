import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft, Plus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  useListCredentialClient,
  useCreateCredential,
  useCreateClient,
} from '@/http/generated/api';
import { CredentialEmptyView } from '@/components/credential-empty-view';

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

export function Contestation() {
  const navigate = useNavigate();
  const {
    data: credentialClient,
    isLoading,
    error,
  } = useListCredentialClient();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
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

  const { mutateAsync: mutateCredential } = useCreateCredential();
  const { mutateAsync: mutateClient } = useCreateClient();

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
    return res as unknown as { id: string };
  }

  async function createClient(
    data: ContestationForm['client'],
    credentialId: string
  ): Promise<unknown> {
    const body = { ...data, credentialId };
    const res = await mutateClient({ data: body });
    return res;
  }

  async function onSubmit(data: ContestationForm) {
    try {
      const createdCred = await createCredential(data.credential);
      const credId = createdCred.id;
      await createClient(data.client, credId);
      reset();
      setIsSheetOpen(false);
      alert('Contestação criada com sucesso!');
    } catch {
      alert('Falha ao criar contestação.');
    }
  }

  const firstItem =
    Array.isArray(credentialClient) && credentialClient.length > 0
      ? credentialClient[0]
      : null;

  const clientsArray = firstItem?.clients ? [firstItem.clients] : [];

  const parseCompetence = (cm: string) => {
    const raw = cm.length === 7 ? `${cm}-01` : cm;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filteredClients = useMemo(() => {
    if (!startDate && !endDate) {
      return clientsArray;
    }
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return clientsArray.filter(c => {
      const d = parseCompetence(c.competenceMonth);
      if (!d) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }, [clientsArray, startDate, endDate]);

  const chartData = filteredClients.map(c => ({
    month: c.competenceMonth || '—',
    returned: c.returned ? Number(c.returned) : 0,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Carregando…</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Erro ao buscar credenciais.
      </div>
    );
  }

  if (!firstItem) {
    return <CredentialEmptyView />;
  }

  const { id: credentialClientId, credentials } = firstItem;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <Button variant="default" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>
      </div>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Credenciais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <strong>ID:</strong> {credentialClientId || '—'}
            </div>
            <div>
              <strong>Chefe de Canal:</strong> {credentials.channelHead || '—'}
            </div>
            <div>
              <strong>Parceria:</strong> {credentials.partner || '—'}
            </div>
            <div>
              <strong>CNPJ:</strong> {credentials.cnpj || '—'}
            </div>
            <div>
              <strong>Indicador de Agente:</strong>{' '}
              {credentials.agentIndicator || '—'}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Contestações de {credentials.partner || '—'}</CardTitle>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary">
                <Plus className="mr-2" />
                Nova Contestação
              </Button>
            </SheetTrigger>
            <SheetContent size="md" side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Nova Contestação</SheetTitle>
                <SheetDescription>
                  Preencha os dados de credencial e cliente abaixo
                </SheetDescription>
              </SheetHeader>
              <form
                id="new-contestation-form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 p-4"
              >
                <section className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Informações da Credencial
                  </h3>
                  <Label htmlFor="credential.channelHead">Chefe de Canal</Label>
                  <Input
                    id="credential.channelHead"
                    {...register('credential.channelHead')}
                  />
                  {errors.credential?.channelHead && (
                    <p className="text-red-500 text-sm">
                      {errors.credential.channelHead.message}
                    </p>
                  )}
                  <Label htmlFor="credential.partner">Parceria</Label>
                  <Input
                    id="credential.partner"
                    {...register('credential.partner')}
                  />
                  {errors.credential?.partner && (
                    <p className="text-red-500 text-sm">
                      {errors.credential.partner.message}
                    </p>
                  )}
                  <Label htmlFor="credential.cnpj">CNPJ (Credencial)</Label>
                  <Input
                    id="credential.cnpj"
                    {...register('credential.cnpj')}
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
                    id="credential.agentIndicator"
                    {...register('credential.agentIndicator')}
                  />
                  {errors.credential?.agentIndicator && (
                    <p className="text-red-500 text-sm">
                      {errors.credential.agentIndicator.message}
                    </p>
                  )}
                </section>
                <section className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Informações do Cliente
                  </h3>
                  <Label htmlFor="client.enterprise">Empresa</Label>
                  <Input
                    id="client.enterprise"
                    {...register('client.enterprise')}
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
                  <Input id="client.cnpj" {...register('client.cnpj')} />
                  {errors.client?.cnpj && (
                    <p className="text-red-500 text-sm">
                      {errors.client.cnpj.message}
                    </p>
                  )}
                  <Label htmlFor="client.product">Produto</Label>
                  <Input id="client.product" {...register('client.product')} />
                  {errors.client?.product && (
                    <p className="text-red-500 text-sm">
                      {errors.client.product.message}
                    </p>
                  )}
                  <Label htmlFor="client.contestation">Contestações</Label>
                  <Input
                    id="client.contestation"
                    type="number"
                    {...register('client.contestation')}
                  />
                  {errors.client?.contestation && (
                    <p className="text-red-500 text-sm">
                      {errors.client.contestation.message}
                    </p>
                  )}
                  <Label htmlFor="client.returned">Retornos</Label>
                  <Input
                    id="client.returned"
                    type="number"
                    {...register('client.returned')}
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Cliente</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Retornos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsArray.length > 0 ? (
                clientsArray.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted">
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.competenceMonth || '—'}</TableCell>
                    <TableCell>{c.contestation || '—'}</TableCell>
                    <TableCell>{c.returned || '—'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nenhuma contestação registrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Detalhes dos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Contestações</TableHead>
                <TableHead>Retornos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsArray.length > 0 ? (
                clientsArray.map(c => (
                  <TableRow key={c.id} className="hover:bg-muted">
                    <TableCell>{c.enterprise || '—'}</TableCell>
                    <TableCell>{c.competenceMonth || '—'}</TableCell>
                    <TableCell>{c.cnpj || '—'}</TableCell>
                    <TableCell>{c.contestation || '—'}</TableCell>
                    <TableCell>{c.returned || '—'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Filtrar Gráfico por Data</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex flex-col">
            <label htmlFor="startDate" className="text-sm font-medium mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-sm font-medium mb-1">
              Data Final
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Gráfico de Retornos por Mês</CardTitle>
        </CardHeader>
        <CardContent style={{ height: 300 }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="returned" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-full text-sm">
              Sem dados para exibir no gráfico no intervalo selecionado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
