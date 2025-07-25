'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { PartnerFormData } from '../../../types/partner-type-data';
import { RowActionsPopover } from '../row-actions-popover';

function formatCurrency(value: number | string) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));
}

interface CreateColumnsParams {
  onEdit: (values: PartnerFormData) => void;
  onDelete: (id: string) => void;
}

export function createPartnerColumns({
  onEdit,
  onDelete,
}: CreateColumnsParams): ColumnDef<PartnerFormData>[] {
  return [
    {
      accessorKey: 'month',
      header: 'Mês',
    },
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
    },
    {
      accessorKey: 'product',
      header: 'Produto',
    },
    {
      accessorKey: 'percentageHonorary',
      header: '% Honorário',
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.percentageHonorary.toFixed(2)}%
        </div>
      ),
    },
    {
      accessorKey: 'compensation',
      header: 'Compensação',
      cell: ({ row }) => (
        <div className="text-right">
          {formatCurrency(row.original.compensation)}
        </div>
      ),
    },
    {
      accessorKey: 'honorary',
      header: 'Honorário',
      cell: ({ row }) => (
        <div className="text-right">
          {formatCurrency(row.original.honorary)}
        </div>
      ),
    },
    {
      accessorKey: 'tax',
      header: 'Imposto',
      cell: ({ row }) => (
        <div className="text-right">{formatCurrency(row.original.tax)}</div>
      ),
    },
    {
      accessorKey: 'tj',
      header: 'TJ',
      cell: ({ row }) => (
        <div className="text-right">{formatCurrency(row.original.tj)}</div>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formatCurrency(row.original.value)}
        </div>
      ),
    },
    {
      accessorKey: 'fee',
      header: 'Fee',
      cell: ({ row }) => (
        <div className="text-right">{formatCurrency(row.original.fee)}</div>
      ),
    },
    {
      accessorKey: 'feePercentage',
      header: '% Fee',
      cell: ({ row }) => (
        <div className="text-right">{row.original.feePercentage}%</div>
      ),
    },
    {
      accessorKey: 'courtFee',
      header: 'Taxa Judicial',
      cell: ({ row }) => (
        <div className="text-right">
          {formatCurrency(row.original.courtFee)}
        </div>
      ),
    },
    {
      accessorKey: 'situation',
      header: 'Situação',
    },
    {
      accessorKey: 'partnerId',
      header: 'ID do Parceiro',
    },
    {
      id: 'actions',
      header: 'Ações',
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
