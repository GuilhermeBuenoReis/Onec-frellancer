'use client';

import { useGetContract } from '@/generated/hooks/contractHooks/useGetContract';
import type { GetContract200 } from '@/generated/types/GetContract';
import { DataTableSkeleton } from '../../-components/data-table-skeleton';
import { useContractFilters } from '../../-context/contract-filter-context';
import { CreateColumnsParamsContract } from './columns';
import { DataTableContract } from './data-table';

export function ContractTableFromAPI() {
  const { filters } = useContractFilters();
  const { data, isLoading } = useGetContract();
  const contracts = Array.isArray(data?.data) ? data.data : [];

  const lower = (v?: string | null) => v?.toLowerCase() ?? '';

  const filteredContracts: GetContract200 = contracts
    .filter(contract => {
      const match = {
        client: filters.client
          ? lower(contract.client).includes(lower(filters.client))
          : true,

        partner: filters.partner
          ? lower(contract.partner).includes(lower(filters.partner))
          : true,

        status:
          Array.isArray(filters.status) && filters.status.length > 0
            ? filters.status.map(lower).includes(lower(contract.status))
            : true,

        cnpj: filters.cnpj
          ? lower(contract.cnpj).includes(lower(filters.cnpj))
          : true,

        sindic: filters.sindic
          ? lower(contract.sindic).includes(lower(filters.sindic))
          : true,

        year: filters.year
          ? lower(contract.year).includes(lower(filters.year))
          : true,

        matter: filters.matter
          ? lower(contract.matter).includes(lower(filters.matter))
          : true,

        forecast: filters.forecast
          ? lower(contract.forecast).includes(lower(filters.forecast))
          : true,

        city: filters.city
          ? lower(contract.city).includes(lower(filters.city))
          : true,

        state: filters.state
          ? lower(contract.state).includes(lower(filters.state))
          : true,

        email: filters.email
          ? lower(contract.email).includes(lower(filters.email))
          : true,
      };

      return Object.values(match).every(Boolean);
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
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTableContract columns={columns} data={filteredContracts} />
      </div>
    </div>
  );
}
