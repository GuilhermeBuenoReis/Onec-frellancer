// PortalControleForm.tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  getGetPortalControllsQueryKey,
  useCreatePortalControll,
} from '@/http/generated/api';
import { QueryClient } from '@tanstack/react-query';

export const createPortalControllSchema = z.object({
  enterprise: z.string().min(1, 'Required'),
  product: z.string().min(1, 'Required'),
  percentageHonorary: z.coerce.number(),
  compensation: z.coerce.number(),
  honorary: z.coerce.number(),
  tax: z.coerce.number(),
  value: z.coerce.number(),
  situation: z.string().min(1, 'Required'),
});

export type CreatePortalControllInput = z.infer<
  typeof createPortalControllSchema
>;

interface PortalControleFormProps {
  onCreate: () => void;
}

export function PortalControleForm({ onCreate }: PortalControleFormProps) {
  const queryClient = new QueryClient();

  const { mutateAsync: createMutation } = useCreatePortalControll();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePortalControllInput>({
    resolver: zodResolver(createPortalControllSchema),
  });

  const onSubmit = async ({
    enterprise,
    compensation,
    honorary,
    percentageHonorary,
    product,
    situation,
    tax,
    value,
  }: CreatePortalControllInput) => {
    await createMutation({
      data: {
        enterprise,
        compensation,
        honorary,
        percentageHonorary,
        product,
        situation,
        tax,
        value,
      },
    });

    queryClient.invalidateQueries({
      queryKey: getGetPortalControllsQueryKey(),
    });

    reset();
    onCreate();
  };

  return (
    <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-1">
          <Label htmlFor="enterpriseForm">Empresa</Label>
          <Input
            id="enterpriseForm"
            className="w-full"
            {...register('enterprise')}
          />
          {errors.enterprise && (
            <p className="text-xs text-red-500">{errors.enterprise.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="productForm">Produto</Label>
          <Input id="productForm" className="w-full" {...register('product')} />
          {errors.product && (
            <p className="text-xs text-red-500">{errors.product.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="percentageHonoraryForm">
            Porcentagem do honorário
          </Label>
          <Input
            id="percentageHonoraryForm"
            type="number"
            className="w-full"
            {...register('percentageHonorary')}
          />
          {errors.percentageHonorary && (
            <p className="text-xs text-red-500">
              {errors.percentageHonorary.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="compensationForm">Compensação</Label>
          <Input
            id="compensationForm"
            type="number"
            className="w-full"
            {...register('compensation')}
          />
          {errors.compensation && (
            <p className="text-xs text-red-500">
              {errors.compensation.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="honoraryForm">Honorário</Label>
          <Input
            id="honoraryForm"
            type="number"
            className="w-full"
            {...register('honorary')}
          />
          {errors.honorary && (
            <p className="text-xs text-red-500">{errors.honorary.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="taxForm">Imposto</Label>
          <Input
            id="taxForm"
            type="number"
            className="w-full"
            {...register('tax')}
          />
          {errors.tax && (
            <p className="text-xs text-red-500">{errors.tax.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="valueForm">Valor</Label>
          <Input
            id="valueForm"
            type="number"
            className="w-full"
            {...register('value')}
          />
          {errors.value && (
            <p className="text-xs text-red-500">{errors.value.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="situationForm">Situação</Label>
          <Input
            id="situationForm"
            className="w-full"
            {...register('situation')}
          />
          {errors.situation && (
            <p className="text-xs text-red-500">{errors.situation.message}</p>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full cursor-pointer">
        Criar
      </Button>
    </form>
  );
}
