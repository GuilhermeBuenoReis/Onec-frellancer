import * as React from 'react';
import { useState } from 'react';
import {
  getGetContractQueryKey,
  useCreateContract,
  useGetContract,
} from '@/http/generated/api';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';

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

type ContractForm = z.infer<typeof contractSchema>;

export function CreateContractSheet() {
  const { mutateAsync: createContract } = useCreateContract();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<ContractForm>({
    resolver: zodResolver(contractSchema),
  });

  const onSubmit = async (data: ContractForm) => {
    await createContract({ data });
    reset();
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: getGetContractQueryKey() });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-green-700 text-white">Criar novo contrato</Button>
      </SheetTrigger>
      <SheetContent size="lg" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Novo Contrato</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 pt-4"
        >
          <div className="flex flex-col space-y-4 px-4">
            <Label>City</Label>
            <Input {...register('city')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Client</Label>
            <Input {...register('client')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>State</Label>
            <Input {...register('state')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>CNPJ</Label>
            <Input {...register('cnpj')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Sindic</Label>
            <Input {...register('sindic')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Year</Label>
            <Input {...register('year')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Matter</Label>
            <Textarea {...register('matter')} />
          </div>
          <div className="flex flex-col space-y-4 px-4 ">
            <Label>Forecast</Label>
            <Input {...register('forecast')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Contract Total</Label>
            <Input {...register('contractTotal')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Percentage</Label>
            <Input
              type="number"
              {...register('percentage', { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Signed Contract</Label>
            <Input {...register('signedContract')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Status</Label>
            <Input {...register('status')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Average Guide</Label>
            <Input
              type="number"
              {...register('averageGuide', { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Partner</Label>
            <Input {...register('partner')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Partner Commission</Label>
            <Input
              type="number"
              {...register('partnerCommission', { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Counter</Label>
            <Input {...register('counter')} />
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Label>Email</Label>
            <Input type="email" {...register('email')} />
          </div>
          <Button type="submit" className="mb-4 ml-4 mr-4 cursor-pointer">
            Salvar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
