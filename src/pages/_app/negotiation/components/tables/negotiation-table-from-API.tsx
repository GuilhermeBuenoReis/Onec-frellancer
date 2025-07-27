'use client';

import { useGetNegotiation } from '@/generated/hooks/negotiationHooks/useGetNegotiation';
import { useDashboardContext } from '@/pages/_app/business-dashboard/-context/dashboard-filter-context';
import type { NegotiationTableData } from '../../types/negotiation-type-data';
import { CreateColumnsParamsNegotiation } from './columns-negotiation';
import { DataTableNegotiation } from './data-table-negotiation';

export function NegotiationTableFromAPI() {
  const { filters } = useDashboardContext();
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

  const filteredData = mappedData.filter(n => {
    const lower = (v?: string | null) => v?.toLowerCase() ?? '';
    const match = {
      title: filters.title
        ? lower(n.title).includes(lower(filters.title))
        : true,
      client: filters.client
        ? lower(n.client).includes(lower(filters.client))
        : true,
      user: filters.user ? lower(n.user).includes(lower(filters.user)) : true,
      tags: filters.tags ? lower(n.tags).includes(lower(filters.tags)) : true,

      status:
        Array.isArray(filters.status) && filters.status.length > 0
          ? filters.status.includes(lower(n.status))
          : true,

      step: filters.step ? lower(n.step) === lower(filters.step) : true,
      startDate: filters.startDate
        ? n.startsDate && new Date(n.startsDate) >= filters.startDate
        : true,
      endDate: filters.endDate
        ? n.startsDate && new Date(n.startsDate) <= filters.endDate
        : true,
    };

    return Object.values(match).every(Boolean);
  });

  const columns = CreateColumnsParamsNegotiation({
    onEdit: () => {},
  });

  if (isLoading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTableNegotiation columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
