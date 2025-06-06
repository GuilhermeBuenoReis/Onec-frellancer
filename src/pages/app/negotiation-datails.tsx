import { useState, useMemo, useEffect, type Key } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  useGetNegotiation,
  useGetNegotiationById,
  type GetNegotiation200Item,
  useUpdateNegotiation,
  useDeleteNegotiation,
  getGetNegotiationByIdQueryKey,
} from '@/http/generated/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const negotiationsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  client: z.string().optional(),
  user: z.string().optional(),
  tags: z.string().optional(),
  step: z.string().optional(),
  status: z.string().optional(),
  value: z.number().optional(),
  startsDate: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
  averageGuide: z.number().optional().nullable(),
  partnerId: z.string().optional().nullable(),
});

type NegotiationFormValues = z.infer<typeof negotiationsSchema>;

export function NegotiationListWithFilter() {
  const navigate = useNavigate();
  const { data: negotiations = [], isLoading } = useGetNegotiation();
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterClient, setFilterClient] = useState<string>('');
  const [filterStartsDate, setFilterStartsDate] = useState<string>('');

  const filteredNegotiations = useMemo(() => {
    return negotiations.filter((n: GetNegotiation200Item) => {
      const matchesStatus = filterStatus
        ? n.status?.toLowerCase().includes(filterStatus.toLowerCase())
        : true;
      const matchesClient = filterClient
        ? n.client?.toLowerCase().includes(filterClient.toLowerCase())
        : true;
      const matchesDate = filterStartsDate
        ? dayjs(n.startsDate).isSame(filterStartsDate, 'day')
        : true;
      return matchesStatus && matchesClient && matchesDate;
    });
  }, [negotiations, filterStatus, filterClient, filterStartsDate]);

  useEffect(() => {
    if (!negotiations.length) {
      return;
    }
  }, [negotiations]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Carregando negociações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-white">
            <CardTitle className="text-2xl text-gray-800 text-center">
              Filtrar Negociações
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <Select onValueChange={setFilterStatus} value={filterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Ganho">Ganho</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Cliente
                </label>
                <Input
                  type="text"
                  placeholder="Pesquisar cliente"
                  value={filterClient}
                  onChange={e => setFilterClient(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Data Início
                </label>
                <Input
                  type="date"
                  value={filterStartsDate}
                  onChange={e => setFilterStartsDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNegotiations.map(
            (negotiation: {
              id: Key | null | undefined;
              title: any;
              client: any;
              status: any;
              startsDate:
                | string
                | number
                | Date
                | dayjs.Dayjs
                | null
                | undefined;
            }) => (
              <Card key={negotiation.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">
                    {negotiation.title || '—'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <span className="font-medium">Cliente:</span>{' '}
                    {negotiation.client || '—'}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    {negotiation.status || '—'}
                  </p>
                  <p>
                    <span className="font-medium">Data Início:</span>{' '}
                    {negotiation.startsDate
                      ? dayjs(negotiation.startsDate).format('DD/MM/YYYY')
                      : '—'}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/negotiation/${negotiation.id}`)}
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export function NegotiationDetails() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }

  const navigate = useNavigate();
  const { data: negotiations = [], isLoading } = useGetNegotiationById(id);
  const { mutateAsync: updateNegotiation } = useUpdateNegotiation();
  const { mutateAsync: deleteNegotiation } = useDeleteNegotiation();
  const queryClient = new QueryClient();

  const negotiation = negotiations.find(n => n.id === id);

  const { handleSubmit, register, formState, reset } =
    useForm<NegotiationFormValues>({
      resolver: zodResolver(negotiationsSchema),
      defaultValues: {} as NegotiationFormValues,
    });

  useEffect(() => {
    if (negotiation) {
      reset(negotiation as NegotiationFormValues);
    }
  }, [negotiation, reset]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Carregando detalhes...</p>
      </div>
    );
  }

  if (!negotiation) {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <Card className="max-w-md w-full shadow-md">
          <CardHeader>
            <CardTitle>Negociação não encontrada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Não foi possível localizar a negociação com ID
              <span className="font-medium ml-1">{id}</span>.
            </p>
            <Button variant="outline" onClick={() => navigate('/negotiation')}>
              ← Voltar ao Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  async function handleSubmitUpdateNegotiation({
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
  }: NegotiationFormValues) {
    if (!negotiation?.id) {
      return 'Negociação não encontrada! Tente novamente mais tarde';
    }

    await updateNegotiation(
      {
        id: negotiation.id,
        data: {
          averageGuide,
          observation,
          partnerId,
          startsDate,
          client,
          status,
          step,
          tags,
          title,
          user,
          value,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetNegotiationByIdQueryKey(negotiation.id),
          });
          toast.success('Atualizado com sucesso!');
        },
      }
    );
  }

  const handleDelete = async () => {
    if (
      !negotiation ||
      !window.confirm('Deseja realmente deletar este contrato?')
    )
      return;

    await deleteNegotiation(
      { id: negotiation.id },
      {
        onSuccess: () => {
          toast.success('Negociação deletada com sucesso!');
          queryClient.invalidateQueries({
            queryKey: getGetNegotiationByIdQueryKey(negotiation.id),
          });
          navigate(-1);
        },
        onError: () => {
          toast.error('Erro ao deletar a negociação!');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/negotiation')}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-white">
            <CardTitle className="text-2xl text-gray-800 text-center">
              Detalhes da Negociação
            </CardTitle>
          </CardHeader>

          <CardContent className="bg-white flex flex-col items-center gap-6 w-full">
            <div className="grid grid-cols-2 w-full gap-4">
              <Card className="">
                <CardHeader className="text-blue-500 text-2xl font-bold">
                  Valor
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                  {negotiation.value?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }) || '0.00'}
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="text-orange-400 text-2xl font-bold">
                  Guia média
                </CardHeader>
                <CardContent className="text-xl font-semibold">
                  {negotiation.averageGuide?.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }) || '0.00'}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Título
                </label>
                <p className="text-gray-800">
                  {negotiation.title || 'Título não informado!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Cliente
                </label>
                <p className="text-gray-800">
                  {negotiation.client || 'Cliente não informado!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Usuário
                </label>
                <p className="text-gray-800">
                  {negotiation.user || 'Usuário não informado!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Tags
                </label>
                <p className="text-gray-800">
                  {negotiation.tags || 'Tag não informada!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Etapa
                </label>
                <p className="text-gray-800">
                  {negotiation.step || 'Etapa não informada!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <p
                  className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                    negotiation.status === 'Ganho'
                      ? 'bg-green-100 text-green-800'
                      : negotiation.status === 'Em Andamento'
                        ? 'bg-yellow-100 text-yellow-800'
                        : negotiation.status === 'Perdido'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {negotiation.status || 'Não Informado'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Parceiro
                </label>
                <p className="text-gray-800">
                  {negotiation.partnerId || 'Parceiro não informado!'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Data Início
                </label>
                <p className="text-gray-800">
                  {negotiation.startsDate
                    ? dayjs(negotiation.startsDate).format('DD/MM/YYYY')
                    : '—'}
                </p>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Observação
                </label>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {negotiation.observation || '—'}
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600">
                  Guia Média
                </label>
                <p className="text-gray-800">
                  {negotiation.averageGuide != null
                    ? negotiation.averageGuide.toFixed(2)
                    : 'Guia média não informado!'}
                </p>
              </div>
            </div>

            <div className="mt-8 flex w-full justify-between">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="bg-amber-500">Editar</Button>
                  </SheetTrigger>

                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="text-center p-2 text-2xl font-semibold">
                        Editar negociações
                      </SheetTitle>
                    </SheetHeader>

                    <form
                      onSubmit={handleSubmit(handleSubmitUpdateNegotiation)}
                      className="space-y-4 p-4"
                    >
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Título
                        </label>
                        <Input
                          type="text"
                          {...register('title')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.title && (
                          <p className="text-sm text-red-600">
                            {formState.errors.title.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Cliente
                        </label>
                        <Input
                          type="text"
                          {...register('client')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.client && (
                          <p className="text-sm text-red-600">
                            {formState.errors.client.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Usuário
                        </label>
                        <Input
                          type="text"
                          {...register('user')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.user && (
                          <p className="text-sm text-red-600">
                            {formState.errors.user.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Tags
                        </label>
                        <Input
                          type="text"
                          {...register('tags')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.tags && (
                          <p className="text-sm text-red-600">
                            {formState.errors.tags.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Etapa
                        </label>
                        <Input
                          type="text"
                          {...register('step')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.step && (
                          <p className="text-sm text-red-600">
                            {formState.errors.step.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Status
                        </label>
                        <Input
                          type="text"
                          {...register('status')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.status && (
                          <p className="text-sm text-red-600">
                            {formState.errors.status.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Valor
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          {...register('value', { valueAsNumber: true })}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.value && (
                          <p className="text-sm text-red-600">
                            {formState.errors.value.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Data Início
                        </label>
                        <Input
                          type="date"
                          {...register('startsDate')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.startsDate && (
                          <p className="text-sm text-red-600">
                            {formState.errors.startsDate.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Observação
                        </label>
                        <textarea
                          {...register('observation')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          rows={3}
                        />
                        {formState.errors.observation && (
                          <p className="text-sm text-red-600">
                            {formState.errors.observation.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Guia Média
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          {...register('averageGuide', { valueAsNumber: true })}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.averageGuide && (
                          <p className="text-sm text-red-600">
                            {formState.errors.averageGuide.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-600">
                          Parceiro
                        </label>
                        <Input
                          type="text"
                          {...register('partnerId')}
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                        {formState.errors.partnerId && (
                          <p className="text-sm text-red-600">
                            {formState.errors.partnerId.message}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            reset(negotiation as NegotiationFormValues)
                          }
                        >
                          Cancelar
                        </Button>
                        <Button type="submit">Salvar</Button>
                      </div>
                    </form>
                  </SheetContent>
                </Sheet>

                <Button className="bg-red-600" onClick={handleDelete}>
                  Deletar
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate('/negotiation')}
              >
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
