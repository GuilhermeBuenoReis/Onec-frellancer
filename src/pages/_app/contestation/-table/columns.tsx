import type { ColumnDef } from '@tanstack/react-table';
import type { GetContestation200 } from '@/generated';
import { formatCurrency } from '@/lib/format-currency';
import { ContestationActionColumn } from '../-components/row-action-popover';

const formatDate = (date: string | null) =>
  date ? new Date(date).toLocaleDateString('pt-BR') : '-';

export const columns: ColumnDef<GetContestation200[number]>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'client',
    header: 'Cliente',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'user',
    header: 'Usuário',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'step',
    header: 'Etapa',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: info => formatCurrency(info.getValue() as number | null),
  },
  {
    accessorKey: 'startsDate',
    header: 'Data de Início',
    cell: info => formatDate(info.getValue() as string | null),
  },
  {
    accessorKey: 'observation',
    header: 'Observação',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'averageGuide',
    header: 'Guia Média',
    cell: info => formatCurrency(info.getValue() as number | null),
  },
  {
    accessorKey: 'partnerId',
    header: 'ID do Parceiro',
    cell: info => info.getValue() ?? '-',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: info => formatDate(info.getValue() as string | null),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
    cell: info => formatDate(info.getValue() as string | null),
  },
  {
    id: 'actions',
    header: 'Ação',
    cell: ({ row }) => (
      <ContestationActionColumn
        data={{ ...row.original, id: row.original.id! }}
      />
    ),
  },
];
