'use client';

import type { UpdatePortalControllMutationRequest } from '@/generated';
import { useDashboardProvider } from '../-context/dashboard-context';
import { PartnerTableSkeleton } from '../-skeleton/table-skeleton';
import { createPartnerColumns } from './columns';
import { DataTable } from './data-table';

type filteredDataType = {
  id: string;
  monthOfCalculation: string | null;
  competenceMonth: string | null;
  contract: number | null;
  enterprise: string | null;
  product: string | null;
  percentageHonorary: number | null;
  compensation: number | null;
  honorary: number | null;
  tax: number | null;
  tj: number | null;
  value: number | null;
  situation: string | null;
  partnerId: string;
}[];

export function PartnerTableFromAPI() {
  const { selectedControllData, entries } = useDashboardProvider();

  const isValidEntry = (
    entry: any
  ): entry is UpdatePortalControllMutationRequest & { id: string } => {
    return (
      typeof entry === 'object' &&
      entry !== null &&
      typeof entry.id === 'string' &&
      entry.monthOfCalculation !== undefined &&
      entry.competenceMonth !== undefined &&
      entry.contract !== undefined &&
      entry.enterprise !== undefined &&
      entry.product !== undefined &&
      entry.percentageHonorary !== undefined &&
      entry.compensation !== undefined &&
      entry.tax !== undefined &&
      entry.partnerId !== undefined
    );
  };

  const filteredData = selectedControllData
    ? isValidEntry(selectedControllData)
      ? [selectedControllData]
      : []
    : (entries ?? []).filter(isValidEntry);

  const columns = createPartnerColumns();

  if (!filteredData.length) {
    return (
      <div className="text-center py-8">
        <PartnerTableSkeleton />
      </div>
    );
  }

  const columnLabels = {
    monthOfCalculation: 'Mês de Cálculo',
    competenceMonth: 'Competência',
    contract: 'Contrato',
    enterprise: 'Empresa',
    product: 'Produto',
    percentageHonorary: '% Honorário',
    compensation: 'Compensação',
    honorary: 'Honorário',
    tax: 'Imposto',
    tj: 'TJ',
    value: 'Valor',
    situation: 'Situação',
    partnerId: 'Parceiro',
    action: 'Ações',
  };

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable
          columns={columns}
          data={filteredData as filteredDataType}
          columnLabels={columnLabels}
        />
      </div>
    </div>
  );
}
