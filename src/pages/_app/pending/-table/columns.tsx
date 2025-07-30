import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import type { GetPendings200 } from '@/generated';
import { RowActionsPopover } from '../-components/row-actions-popover';

type PendingRow = GetPendings200[number];

export const columns: ColumnDef<PendingRow>[] = [
  {
    accessorKey: 'client',
    header: 'Cliente',
  },
  {
    accessorKey: 'callReason',
    header: 'Motivo',
  },
  {
    accessorKey: 'responsible',
    header: 'Responsável',
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => {
      const value = row.original.priority ?? '';
      return (
        <Badge
          variant={
            value === 'Alta'
              ? 'destructive'
              : value === 'Média'
                ? 'default'
                : 'secondary'
          }
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      const category = row.original.category ?? '';
      const colorMap: Record<string, 'default' | 'secondary' | 'destructive'> =
        {
          SAC: 'destructive',
          Atendimento: 'default',
          Financeiro: 'secondary',
          Diretoria: 'default',
          Comercial: 'secondary',
          Auditoria: 'destructive',
        };
      return (
        <Badge variant={colorMap[category] ?? 'secondary'}>{category}</Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status ?? '';
      const colorMap: Record<string, 'default' | 'secondary' | 'destructive'> =
        {
          Aberto: 'destructive',
          Encaminhado: 'default',
          Pendente: 'default',
          Concluído: 'secondary',
        };
      return <Badge variant={colorMap[status] ?? 'default'}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) =>
      row.original.createdAt ? (
        <div className="text-right text-muted-foreground">
          {format(new Date(row.original.createdAt), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </div>
      ) : null,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
    cell: ({ row }) =>
      row.original.updatedAt ? (
        <div className="text-right text-muted-foreground">
          {format(new Date(row.original.updatedAt), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </div>
      ) : null,
  },
  {
    id: 'actions',
    cell: ({ row }) => <RowActionsPopover data={row.original} />,
  },
];
