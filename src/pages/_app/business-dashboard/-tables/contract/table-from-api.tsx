'use client';

import { useNegotiationFilters } from '@/context/dashboard-filter-context';
import { useGetContract } from '@/generated/hooks/contractHooks/useGetContract';
import type { GetContract200 } from '@/generated/types/GetContract';
import { DataTableSkeleton } from '../../-components/data-table-skeleton';
import { ContractProvider } from '../../-context/contract-context';
import { CreateColumnsParamsContract } from './columns';
import { DataTableContract } from './data-table';

export function ContractTableFromAPI() {
  const { filters } = useNegotiationFilters();
  const { data, isLoading } = useGetContract();
  const contracts = Array.isArray(data?.data) ? data.data : [];

  const lower = (v?: string | null) => v?.toLowerCase() ?? '';

  const filteredContracts: GetContract200 = contracts
    .filter(contract => {
      if (!filters.isWalletActive) return true;

      const normalized = lower(contract.status);
      const statusMatch =
        Array.isArray(filters.status) && filters.status.length > 0
          ? filters.status.includes(normalized)
          : true;

      return statusMatch;
    })
    .sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });

  const columns = CreateColumnsParamsContract();

  if (isLoading)
    return (
      <div className="text-center py-8">
        <DataTableSkeleton />
      </div>
    );

  return (
    <ContractProvider>
      <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="min-w-[640px] max-w-7xl mx-auto">
          <DataTableContract columns={columns} data={filteredContracts} />
        </div>
      </div>
    </ContractProvider>
  );
}
