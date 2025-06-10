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
import { Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contestationSchema,
  type ContestationForm,
} from '@/domain/contestation/formSchema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

export function ContestationFormSheet({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  onSubmit: (data: ContestationForm) => Promise<void>;
}) {
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2" />
          Nova Contestação
        </Button>
      </SheetTrigger>
      <SheetContent size="md" side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nova Contestação</SheetTitle>
          <SheetDescription>Preencha os dados abaixo</SheetDescription>
        </SheetHeader>

        <form
          id="new-contestation-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 p-4"
        >
          <section className="space-y-4">
            <h3 className="text-lg font-medium">Informações da Credencial</h3>

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
              <Label htmlFor="credential.cnpj">CNPJ (Credencial)</Label>
              <Input id="credential.cnpj" {...register('credential.cnpj')} />
              {errors.credential?.cnpj && (
                <p className="text-red-500 text-sm">
                  {errors.credential.cnpj.message}
                </p>
              )}
            </div>

            <div>
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
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium">Informações do Cliente</h3>

            <div>
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
            </div>

            <div>
              <Label htmlFor="client.competenceMonth">Mês de Competência</Label>
              <Controller
                control={control}
                name="client.competenceMonth"
                render={({ field }) => (
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
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
            </div>

            <div>
              <Label htmlFor="client.cnpj">CNPJ (Cliente)</Label>
              <Input id="client.cnpj" {...register('client.cnpj')} />
              {errors.client?.cnpj && (
                <p className="text-red-500 text-sm">
                  {errors.client.cnpj.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="client.product">Produto</Label>
              <Input id="client.product" {...register('client.product')} />
              {errors.client?.product && (
                <p className="text-red-500 text-sm">
                  {errors.client.product.message}
                </p>
              )}
            </div>

            <div>
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
            </div>

            <div>
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
            </div>
          </section>
        </form>

        <SheetFooter>
          <Button type="submit" form="new-contestation-form" className="w-full">
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
  );
}
