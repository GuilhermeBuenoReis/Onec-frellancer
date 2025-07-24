import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import type { NegotiationTableData } from '../../types/negotiation-type-data';
import type { NegotiationFormData } from '../../types/schemas/negotiation-schema';
import { RowActionsPopover } from '../row-actions-popover';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

interface CreateColumnsParamsNegotiationProps {
  onEdit: (values: NegotiationFormData) => void;
}

export function CreateColumnsParamsNegotiation({
  onEdit,
}: CreateColumnsParamsNegotiationProps): ColumnDef<NegotiationTableData>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
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
      header: 'Parceiro ID',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <RowActionsPopover data={row.original} onEdit={onEdit} />
      ),
    },
  ];
}
