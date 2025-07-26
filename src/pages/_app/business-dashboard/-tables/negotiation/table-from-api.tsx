'use client';

import { useNegotiationFilters } from '@/context/dashboard-filter-context';
import { useGetNegotiation } from '@/generated/hooks/negotiationHooks/useGetNegotiation';
import type { GetNegotiation200 } from '@/generated/types/GetNegotiation';
import { CreateColumnsParamsNegotiation } from './columns';
import { DataTableNegotiation } from './data-table';

export function NegotiationTableFromAPI() {
  const { filters } = useNegotiationFilters();
  const { data, isLoading } = useGetNegotiation();
  const negotiations = Array.isArray(data?.data) ? data.data : [];

  const filteredData: GetNegotiation200 = negotiations.filter(n => {
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

  const columns = CreateColumnsParamsNegotiation();

  if (isLoading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTableNegotiation columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
