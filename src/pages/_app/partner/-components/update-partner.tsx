import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  getOnePartnerQueryKey,
  type UpdatePartnerMutationRequest,
  updatePartnerMutationRequestSchema,
  useGetOnePartner,
  useUpdatePartner,
} from '@/generated';
import { queryClient } from '@/lib/query-client';
import { useDashboardProvider } from '../-context/dashboard-context';

interface UpdatePartnerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatePartner({ open, onOpenChange }: UpdatePartnerProps) {
  const { partnerId } = useDashboardProvider();
  const { data: partner } = useGetOnePartner(partnerId);
  const { mutateAsync: updatePartner, isPending } = useUpdatePartner();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePartnerMutationRequest>({
    resolver: zodResolver(updatePartnerMutationRequestSchema),
    defaultValues: {
      name: '',
      cpfOrCnpj: '',
      city: '',
      state: '',
      commission: undefined,
      portal: '',
      channelHead: '',
      regional: '',
      coordinator: '',
      agent: '',
      indicator: '',
      contract: '',
      phone: '',
      email: '',
      responsible: '',
    },
  });

  useEffect(() => {
    if (!partner) return;
    reset({
      name: partner.data.name ?? '',
      cpfOrCnpj: partner.data.cpfOrCnpj ?? '',
      city: partner.data.city ?? '',
      state: partner.data.state ?? '',
      commission: partner.data.commission ?? undefined,
      portal: partner.data.portal ?? '',
      channelHead: partner.data.channelHead ?? '',
      regional: partner.data.regional ?? '',
      coordinator: partner.data.coordinator ?? '',
      agent: partner.data.agent ?? '',
      indicator: partner.data.indicator ?? '',
      contract: partner.data.contract ?? '',
      phone: partner.data.phone ?? '',
      email: partner.data.email ?? '',
      responsible: partner.data.responsible ?? '',
    });
  }, [partner, reset]);

  function sanitize(data: UpdatePartnerMutationRequest) {
    const entries = Object.entries(data).map(([k, v]) => {
      if (v === '' || v === null) return [k, undefined];
      if (typeof v === 'number' && Number.isNaN(v)) return [k, undefined];
      return [k, v];
    });
    return Object.fromEntries(entries) as UpdatePartnerMutationRequest;
  }

  async function handleUpdatePartner(data: UpdatePartnerMutationRequest) {
    const payload = sanitize(data);
    await updatePartner(
      { data: payload, id: partnerId },
      {
        onSuccess: () => {
          toast.success('Informações atualizadas com sucesso!');
          queryClient.invalidateQueries({
            queryKey: getOnePartnerQueryKey(partnerId),
          });
          onOpenChange(false);
        },
        onError: () => {
          toast.error('Erro ao atualizar o parceiro!');
        },
      }
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto max-h-screen p-4">
        <SheetHeader>
          <SheetTitle className="text-xl">Editar Parceiro</SheetTitle>
          <SheetDescription>
            Atualize os dados do registro selecionado.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(handleUpdatePartner)}
          className="space-y-4 mt-6 pb-8"
        >
          <div>
            <Input {...register('name')} placeholder="Nome" />
            {errors.name && (
              <p className="text-red-700 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input {...register('cpfOrCnpj')} placeholder="CPF ou CNPJ" />
            {errors.cpfOrCnpj && (
              <p className="text-red-700 text-sm mt-1">
                {errors.cpfOrCnpj.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('city')} placeholder="Cidade" />
            {errors.city && (
              <p className="text-red-700 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Input {...register('state')} placeholder="Estado" />
            {errors.state && (
              <p className="text-red-700 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="number"
              step="any"
              {...register('commission', {
                setValueAs: v =>
                  v === '' || v === null ? undefined : Number(v),
              })}
              placeholder="Comissão"
            />
            {errors.commission && (
              <p className="text-red-700 text-sm mt-1">
                {errors.commission.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('portal')} placeholder="Portal" />
            {errors.portal && (
              <p className="text-red-700 text-sm mt-1">
                {errors.portal.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('channelHead')} placeholder="Head de Canal" />
            {errors.channelHead && (
              <p className="text-red-700 text-sm mt-1">
                {errors.channelHead.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('regional')} placeholder="Regional" />
            {errors.regional && (
              <p className="text-red-700 text-sm mt-1">
                {errors.regional.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('coordinator')} placeholder="Coordenador" />
            {errors.coordinator && (
              <p className="text-red-700 text-sm mt-1">
                {errors.coordinator.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('agent')} placeholder="Agente" />
            {errors.agent && (
              <p className="text-red-700 text-sm mt-1">
                {errors.agent.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('indicator')} placeholder="Indicador" />
            {errors.indicator && (
              <p className="text-red-700 text-sm mt-1">
                {errors.indicator.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('contract')} placeholder="Contrato" />
            {errors.contract && (
              <p className="text-red-700 text-sm mt-1">
                {errors.contract.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('phone')} placeholder="Telefone" />
            {errors.phone && (
              <p className="text-red-700 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('email')} placeholder="E-mail" />
            {errors.email && (
              <p className="text-red-700 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input {...register('responsible')} placeholder="Responsável" />
            {errors.responsible && (
              <p className="text-red-700 text-sm mt-1">
                {errors.responsible.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
