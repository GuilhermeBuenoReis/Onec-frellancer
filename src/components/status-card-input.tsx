import { Search } from 'lucide-react';
import { Card } from './card';
import { useState } from 'react';
import {
  useGetContractStatusCount,
  useGetContractStatusCountByFilter,
} from '@/http/generated/api';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const statusCardInputSchema = z.object({
  filter: z.string().min(1, 'O campo não pode estar vazio'),
});

type StatusCardInput = z.infer<typeof statusCardInputSchema>;

export function StatusCardsInput({
  contractStatus,
}: {
  contractStatus: { status: string | null; count: number }[];
}) {
  const { register, handleSubmit, reset } = useForm<StatusCardInput>({
    resolver: zodResolver(statusCardInputSchema),
  });
  const [filtered, setFiltered] = useState(contractStatus);

  const { data: getContractStatus } = useGetContractStatusCount();
  const { mutateAsync: statusFilter } = useGetContractStatusCountByFilter();

  if (!getContractStatus) {
    return null;
  }

  const onSubmit = async (data: StatusCardInput) => {
    try {
      const filteredData = getContractStatus.filter(item =>
        item.status?.toLowerCase().includes(data.filter.toLowerCase())
      );
      setFiltered(filteredData);

      reset();
    } catch (error) {
      console.error('Erro ao buscar contratos:', error);
    }
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-4 mb-6"
      >
        <input
          {...register('filter')}
          placeholder="Digite o status do contrato..."
          className="w-full max-w-md px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="px-3 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Search size={18} />
          Buscar
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filtered.slice(0, 3).map(item => (
          <Card
            key={item.status ?? Math.random().toString()}
            title={item.status || 'Não informado'}
            value={item.count}
          />
        ))}
      </div>
    </div>
  );
}
