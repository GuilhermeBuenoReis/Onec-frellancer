'use client';

import { useGetPendings } from '@/generated/hooks/pendingsHooks/useGetPendings';
import type { GetOnePending200 } from '@/generated/types/GetOnePending';
import { usePendingCallsFiltersContext } from '../-context/pending-calls-filter-context';
import { PendingTableSkeleton } from '../-skeleton/data-table-skeleton';
import { columns } from './columns';
import { DataTable } from './data-table';

export function PendingCallsTableFromAPI() {
  const { filters } = usePendingCallsFiltersContext();
  const { data, isLoading } = useGetPendings();
  const calls = Array.isArray(data?.data) ? data.data : [];

  const lower = (v?: string | null) => v?.toLowerCase() ?? '';

  const filteredData: GetOnePending200[] = calls
    .filter(call => {
      const match = {
        client: filters.client
          ? lower(call.client).includes(lower(filters.client))
          : true,
        responsible: filters.responsible
          ? lower(call.responsible).includes(lower(filters.responsible))
          : true,
        status: filters.status
          ? lower(call.status) === lower(filters.status)
          : true,
        category: filters.category
          ? lower(call.category) === lower(filters.category)
          : true,
        startDate: filters.startDate
          ? call.createdAt && new Date(call.createdAt) >= filters.startDate
          : true,
        endDate: filters.endDate
          ? call.createdAt && new Date(call.createdAt) <= filters.endDate
          : true,
      };

      return Object.values(match).every(Boolean);
    })
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });

  if (isLoading)
    return (
      <div className="text-center py-8">
        <PendingTableSkeleton />
      </div>
    );

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
