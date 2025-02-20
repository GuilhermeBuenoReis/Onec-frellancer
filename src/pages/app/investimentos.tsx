// pages/Investimentos.tsx
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const investmentSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  valor: z.number().min(1, 'Valor deve ser maior que zero'),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

export function Investimentos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues: { nome: '', valor: 0 },
  });

  const onSubmit: SubmitHandler<InvestmentFormValues> = data => {
    console.log(data);
    // Lógica para processar o investimento
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Novo Investimento
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-gray-700 mb-1">Nome</label>
              <Input type="text" {...register('nome')} className="w-full" />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Valor</label>
              <Input
                type="number"
                {...register('valor', { valueAsNumber: true })}
                className="w-full"
              />
              {errors.valor && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.valor.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mt-4">
              Adicionar Investimento
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
