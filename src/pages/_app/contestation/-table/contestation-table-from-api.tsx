'use client';

import { useGetContestation } from '@/generated/hooks/contestationHooks/useGetContestation';
import { useContestationFiltersContext } from '../-context/contestation-filters-context';
import { columns } from './columns';
import { ContestationDataTable } from './data-table';

export function ContestationTableFromAPI() {
  const { filters } = useContestationFiltersContext();
  const { data, isLoading } = useGetContestation();
  const contestations = Array.isArray(data?.data) ? data.data : [];

  const lower = (v?: string | null) => v?.toLowerCase() ?? '';

  const filteredData = contestations
    .filter(entry => {
      const match = {
        client: filters.client
          ? lower(entry.client).includes(lower(filters.client))
          : true,
        product: filters.product
          ? lower(entry.product).includes(lower(filters.product))
          : true,
        competence: filters.competence
          ? lower(entry.competence).includes(lower(filters.competence))
          : true,
        status: filters.status
          ? lower(entry.status ?? '') === lower(filters.status)
          : true,
        startDate: filters.startDate
          ? entry.createdAt && new Date(entry.createdAt) >= filters.startDate
          : true,
        endDate: filters.endDate
          ? entry.createdAt && new Date(entry.createdAt) <= filters.endDate
          : true,
      };

      return Object.values(match).every(Boolean);
    })
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });
  if (isLoading) return;
  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <ContestationDataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
