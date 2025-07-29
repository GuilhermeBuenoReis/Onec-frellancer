'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { GetPortalControllsBySelectParternRoute200 } from '@/generated';
import { RowActionsPopoverPortalControll } from './row-action-popover';

type PartnerRow = GetPortalControllsBySelectParternRoute200[number];

function formatCurrency(value: number | string | null | undefined): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value ?? 0));
}

export function createPartnerColumns(): ColumnDef<PartnerRow>[] {
  return [
    {
      accessorKey: 'monthOfCalculation',
      header: 'Mês de Cálculo',
    },
    {
      accessorKey: 'competenceMonth',
      header: 'Competência',
    },
    {
      accessorKey: 'contract',
      header: 'Contrato',
    },
    {
      accessorKey: 'enterprise',
      header: 'Empresa',
      cell: ({ getValue }) => (
        <div className="max-w-[200px] truncate" title={getValue() as string}>
          {getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'product',
      header: 'Produto',
    },
    {
      accessorKey: 'percentageHonorary',
      header: '% Honorário',
      cell: ({ getValue }) => {
        const value = getValue() as number | null;
        return <div className="text-right">{(value ?? 0).toFixed(2)}%</div>;
      },
    },
    {
      accessorKey: 'compensation',
      header: 'Compensação',
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatCurrency(getValue() as number | null)}
        </div>
      ),
    },
    {
      accessorKey: 'honorary',
      header: 'Honorário',
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatCurrency(getValue() as number | null)}
        </div>
      ),
    },
    {
      accessorKey: 'tax',
      header: 'Imposto',
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatCurrency(getValue() as number | null)}
        </div>
      ),
    },
    {
      accessorKey: 'tj',
      header: 'TJ',
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatCurrency(getValue() as number | null)}
        </div>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      cell: ({ getValue }) => (
        <div className="text-right font-medium">
          {formatCurrency(getValue() as number | null)}
        </div>
      ),
    },
    {
      accessorKey: 'situation',
      header: 'Situação',
    },
    {
      accessorKey: 'partnerId',
      header: 'Parceiro',
    },
    {
      accessorKey: 'action',
      header: 'Ações',
      cell: ({ row }) =>
        row.original.id && (
          <RowActionsPopoverPortalControll
            controllId={row.original.id}
            controll={{ ...row.original, id: row.original.id }}
          />
        ),
    },
  ];
}
