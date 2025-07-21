'use client';

import { useGetNegotiation } from '../../../../../../generated/hooks/negotiationHooks/useGetNegotiation';
import type { NegotiationTableData } from '../../types/negotiation-type-data';
import { CreateColumnsParamsNegotiation } from './columns';
import { DataTable } from './data-table';

export default function NegotiationTableFromAPI() {
  const { data, isLoading } = useGetNegotiation();
  const negotiations = Array.isArray(data?.data) ? data.data : [];

  const mappedData: NegotiationTableData[] = negotiations.map(n => ({
    id: n.id ?? '',
    title: n.title ?? null,
    client: n.client ?? null,
    user: n.user ?? null,
    tags: n.tags ?? null,
    step: n.step ?? null,
    status: n.status,
    value: n.value ?? null,
    startsDate: n.startsDate ?? null,
    observation: n.observation ?? null,
    averageGuide: n.averageGuide ?? null,
    partnerId: n.partnerId ?? null,
  }));

  const columns = CreateColumnsParamsNegotiation({
    onEdit: () => {},
    onDelete: () => {},
  });

  if (isLoading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable columns={columns} data={mappedData} />
      </div>
    </div>
  );
}
