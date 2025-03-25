import { useState } from 'react';
import { Card } from './card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ContractStatus {
  status: string | null;
  count: number;
}

interface StatusCardsInputProps {
  contractStatus: ContractStatus[];
}

export function StatusCardsInput({ contractStatus }: StatusCardsInputProps) {
  const [filtered, setFiltered] = useState<ContractStatus[]>(contractStatus);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const statusOptions = [
    'CONCLUIDO',
    'CANCELADO',
    'FINALIZADO',
    'AGUARDANDO RECEBER',
    'Não informado',
    'PAGO',
    'PERDIDO',
    'ATIVO',
    'MIGRADO',
  ];

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '');

  const handleSelect = (status: string) => {
    setSelectedStatus(status);
    if (status === '') {
      setFiltered(contractStatus);
    } else {
      const normalizedStatus = normalize(status);
      const filteredData = contractStatus.filter(item => {
        const itemStatus = item.status || '';
        return normalize(itemStatus).includes(normalizedStatus);
      });
      setFiltered(filteredData);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-4 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-all cursor-pointer">
            {selectedStatus || 'Selecione o status'}
            <ChevronDown size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => handleSelect('')}>
              Todos
            </DropdownMenuItem>
            {statusOptions.map(status => (
              <DropdownMenuItem
                key={status}
                onClick={() => handleSelect(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filtered.slice(0, 16).map(item => (
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
