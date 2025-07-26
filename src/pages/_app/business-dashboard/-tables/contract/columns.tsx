import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GetContract200 } from '@/generated/types/GetContract';

function formatCurrency(value: number | string | null) {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (!num || Number.isNaN(num)) return 'Não informado';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
}

export function CreateColumnsParamsContract(): ColumnDef<
  GetContract200[number]
>[] {
  return [
    {
      accessorKey: 'client',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'city',
      header: 'Cidade',
      cell: ({ row }) => row.original.city ?? 'Não informado',
    },
    {
      accessorKey: 'state',
      header: 'Estado',
      cell: ({ row }) => row.original.state ?? 'Não informado',
    },
    {
      accessorKey: 'cnpj',
      header: 'CNPJ',
      cell: ({ row }) => row.original.cnpj ?? 'Não informado',
    },
    {
      accessorKey: 'sindic',
      header: 'Síndico',
      cell: ({ row }) => row.original.sindic ?? 'Não informado',
    },
    {
      accessorKey: 'year',
      header: 'Ano',
      cell: ({ row }) => row.original.year ?? 'Não informado',
    },
    {
      accessorKey: 'matter',
      header: 'Matéria',
      cell: ({ row }) => row.original.matter ?? 'Não informado',
    },
    {
      accessorKey: 'forecast',
      header: 'Previsão',
      cell: ({ row }) => row.original.forecast ?? 'Não informado',
    },
    {
      accessorKey: 'contractTotal',
      header: 'Valor Contrato',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.contractTotal)}
        </div>
      ),
    },
    {
      accessorKey: 'percentage',
      header: '% Comissão',
      cell: ({ row }) =>
        row.original.percentage != null
          ? `${row.original.percentage}%`
          : 'Não informado',
    },
    {
      accessorKey: 'signedContract',
      header: 'Assinado?',
      cell: ({ row }) => row.original.signedContract ?? 'Não informado',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => row.original.status ?? 'Não informado',
    },
    {
      accessorKey: 'averageGuide',
      header: 'Guia Média',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.averageGuide)}
        </div>
      ),
    },
    {
      accessorKey: 'partner',
      header: 'Parceiro',
      cell: ({ row }) => row.original.partner ?? 'Não informado',
    },
    {
      accessorKey: 'partnerCommission',
      header: 'Comissão Parceiro',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.partnerCommission)}
        </div>
      ),
    },
    {
      accessorKey: 'counter',
      header: 'Atendente',
      cell: ({ row }) => row.original.counter ?? 'Não informado',
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.original.email ?? 'Não informado',
    },
  ];
}
