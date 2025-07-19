import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '../../../../../../components/ui/badge';
import { RowActionsPopover } from '../row-actions-popover';

type Call = {
  client: string;
  callReason: string;
  status: 'Aberto' | 'Encaminhado' | 'Pendente' | 'Concluído';
  priority: 'Alta' | 'Média' | 'Baixa';
  responsible: string;
  category:
    | 'SAC'
    | 'Atendimento'
    | 'Financeiro'
    | 'Diretoria'
    | 'Comercial'
    | 'Auditoria';
  description: string;
};

export const columns: ColumnDef<Call>[] = [
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
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.priority === 'Alta'
            ? 'destructive'
            : row.original.priority === 'Média'
              ? 'default'
              : 'secondary'
        }
      >
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <RowActionsPopover
        data={row.original}
        onEdit={values => {
          // Lógica para atualizar
          console.log('Editar:', values);
        }}
        onDelete={id => {
          // Lógica para deletar
          console.log('Deletar ID:', id);
        }}
      />
    ),
  },
];
