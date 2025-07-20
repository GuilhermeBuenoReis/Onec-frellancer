import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';
import type { NegotiationFormData } from '../../schemas/negotiation-schema';
import { RowActionsPopover } from '../row-actions-popover';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

interface CreateColumnsParamsNegotiationProps {
  onEdit: (values: NegotiationFormData) => void;
  onDelete: (id: string) => void;
}

export function CreateColumnsParamsNegotiation({
  onDelete,
  onEdit,
}: CreateColumnsParamsNegotiationProps): ColumnDef<NegotiationFormData>[] {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'cliente',
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
      accessorKey: 'cnpj',
      header: 'CNPJ',
    },
    {
      accessorKey: 'cidade',
      header: 'Cidade',
    },
    {
      accessorKey: 'estado',
      header: 'Estado',
    },
    {
      accessorKey: 'data',
      header: 'Data',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'titulo',
      header: 'Título',
    },
    {
      accessorKey: 'materia',
      header: 'Matéria',
    },
    {
      accessorKey: 'forecast',
      header: 'Forecast',
    },
    {
      accessorKey: 'totalContrato',
      header: 'Total Contrato',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.contractTotal)}
        </div>
      ),
    },
    {
      accessorKey: 'porcentagem',
      header: 'Porcentagem (%)',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {row.original.percentage.toFixed(2)}%
        </div>
      ),
    },
    {
      accessorKey: 'guiaMedia',
      header: 'Guia Média',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.averageGuide)}
        </div>
      ),
    },
    {
      accessorKey: 'parceiro',
      header: 'Parceiro',
    },
    {
      accessorKey: 'comissao',
      header: 'Comissão',
      cell: ({ row }) => (
        <div className="text-right whitespace-nowrap">
          {formatCurrency(row.original.commission)}
        </div>
      ),
    },
    {
      accessorKey: 'contrato',
      header: 'Contrato',
    },
    {
      accessorKey: 'contato',
      header: 'Contato',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'usuario',
      header: 'Usuário',
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => (
        <div className="truncate max-w-[200px]">
          {row.original.tags.join(', ')}
        </div>
      ),
    },
    {
      accessorKey: 'etapa',
      header: 'Etapa',
    },
    {
      accessorKey: 'valor',
      header: 'Valor',
      cell: ({ row }) => (
        <div className="text-right font-medium whitespace-nowrap">
          {formatCurrency(row.original.amount)}
        </div>
      ),
    },
    {
      accessorKey: 'observacao',
      header: 'Observação',
      cell: ({ row }) => (
        <div className="truncate max-w-[250px]">{row.original.note}</div>
      ),
    },
    {
      accessorKey: 'parceiroId',
      header: 'Parceiro ID',
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <RowActionsPopover
          data={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];
}
