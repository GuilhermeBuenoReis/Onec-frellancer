import type { ColumnDef } from '@tanstack/react-table';
import type { NegociacaoContrato } from '../../../../../../constants/negotiation-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../../../components/ui/dropdown-menu';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../../../../../../components/ui/button';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export const columns: ColumnDef<NegociacaoContrato>[] = [
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
        {formatCurrency(row.original.totalContrato)}
      </div>
    ),
  },
  {
    accessorKey: 'porcentagem',
    header: 'Porcentagem (%)',
    cell: ({ row }) => (
      <div className="text-right whitespace-nowrap">
        {row.original.porcentagem.toFixed(2)}%
      </div>
    ),
  },
  {
    accessorKey: 'guiaMedia',
    header: 'Guia Média',
    cell: ({ row }) => (
      <div className="text-right whitespace-nowrap">
        {formatCurrency(row.original.guiaMedia)}
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
        {formatCurrency(row.original.comissao)}
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
        {formatCurrency(row.original.valor)}
      </div>
    ),
  },
  {
    accessorKey: 'observacao',
    header: 'Observação',
    cell: ({ row }) => (
      <div className="truncate max-w-[250px]">{row.original.observacao}</div>
    ),
  },
  {
    accessorKey: 'parceiroId',
    header: 'Parceiro ID',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const contrato = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(contrato.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
