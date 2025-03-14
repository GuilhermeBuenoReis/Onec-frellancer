import { z } from 'zod';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { getGetPendingsQueryKey, useCreatePending } from '@/http/generated/api';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const pendingSchema = z.object({
  client: z.string().nonempty('Cliente é obrigatório'),
  callReason: z.string().nonempty('Motivo do Chamado é obrigatório'),
  status: z.enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído']),
  priority: z.string().nonempty('Prioridade é obrigatória'),
  responsible: z.string().nonempty('Responsável é obrigatório'),
  category: z.enum([
    'SAC',
    'Atendimento',
    'Financeiro',
    'Diretoria',
    'Comercial',
    'Auditoria',
  ]),
  description: z.string().nonempty('Descrição é obrigatória'),
});

type PendingFormData = z.infer<typeof pendingSchema>;

export interface Pending extends PendingFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export function PendingForm() {
  const queryClient = useQueryClient();
  const { mutateAsync: createPending } = useCreatePending();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PendingFormData>({
    resolver: zodResolver(pendingSchema),
    defaultValues: {
      status: 'Aberto',
      category: 'SAC',
    },
  });

  async function handleSubmitPendingDataForm({
    client,
    callReason,
    status,
    priority,
    responsible,
    category,
    description,
  }: PendingFormData) {
    try {
      await createPending({
        data: {
          client,
          callReason,
          status,
          priority,
          responsible,
          category,
          description,
        },
      });

      toast.success('Pendência criada com sucesso!');
      reset();

      queryClient.invalidateQueries({ queryKey: getGetPendingsQueryKey() });
    } catch (error) {
      toast.error('Algo deu errado. Tente novamente mais tarde!');
    }
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleSubmitPendingDataForm)}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            id="cliente"
            placeholder="Nome do Cliente"
            {...register('client')}
          />
          {errors.client && (
            <p className="text-red-500 text-sm mt-1">{errors.client.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="motivo">Motivo do Chamado</Label>
          <Input
            id="motivo"
            placeholder="Motivo do Chamado"
            {...register('callReason')}
          />
          {errors.callReason && (
            <p className="text-red-500 text-sm mt-1">
              {errors.callReason.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>{field.value}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Encaminhado">Encaminhado</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="prioridade">Prioridade</Label>
          <Input
            id="prioridade"
            placeholder="Ex: Alta, Média, Baixa"
            {...register('priority')}
          />
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="responsavel">Responsável</Label>
          <Input
            id="responsavel"
            placeholder="Nome do Responsável"
            {...register('responsible')}
          />
          {errors.responsible && (
            <p className="text-red-500 text-sm mt-1">
              {errors.responsible.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>{field.value}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAC">SAC</SelectItem>
                  <SelectItem value="Atendimento">Atendimento</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Diretoria">Diretoria</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Auditoria">Auditoria</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Detalhes da pendência"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Adicionar Pendência</Button>
      </div>
    </form>
  );
}
