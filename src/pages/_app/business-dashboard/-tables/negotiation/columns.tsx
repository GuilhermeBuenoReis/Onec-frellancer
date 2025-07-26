import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GetNegotiation200 } from '@/generated/types/GetNegotiation';
import { RowActionsPopover } from './row-actions-popover';

function formatCurrency(value: number | string | null) {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (!num || Number.isNaN(num)) return 'Não informado';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
}

export function CreateColumnsParamsNegotiation(): ColumnDef<
  GetNegotiation200[number]
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
      accessorKey: 'status',
      header: 'Status',
      enableColumnFilter: true,
      filterFn: (row, columnId, filterValue) => {
        const rowValue =
          (row.getValue(columnId) as string)?.toLowerCase() ?? '';
        return (filterValue as string[]).includes(rowValue);
      },
    },

    {
      accessorKey: 'title',
      header: 'Título',
    },
    {
      accessorKey: 'step',
      header: 'Etapa',
    },
    {
      accessorKey: 'startsDate',
      header: 'Data de Início',
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {row.original.value != null
            ? formatCurrency(row.original.value)
            : 'Não informado'}
        </div>
      ),
    },
    {
      accessorKey: 'averageGuide',
      header: 'Guia Média',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {row.original.averageGuide != null
            ? formatCurrency(row.original.averageGuide)
            : 'Não informado'}
        </div>
      ),
    },
    {
      accessorKey: 'user',
      header: 'Usuário',
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="truncate max-w-[200px]">
          {row.original.tags ?? 'Não informado'}
        </div>
      ),
    },
    {
      accessorKey: 'observation',
      header: 'Observação',
      cell: ({ row }) => (
        <div className="truncate max-w-[250px]">
          {row.original.observation ?? 'Não informado'}
        </div>
      ),
    },
    {
      accessorKey: 'partnerId',
      header: 'Parceiro',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <RowActionsPopover
          negotiationId={row.original.id}
          negotiation={{ ...row.original, negotiation: row.original }}
        />
      ),
    },
  ];
}
