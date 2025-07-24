'use client';

import { useGetContract } from '../../../../../../generated/hooks/contractHooks/useGetContract';
import { CreateColumnsParamsContract } from './columns-contract';
import { DataTableContract } from './data-table-contract';

export function ContractTableFromAPI() {
  const { data, isLoading } = useGetContract();
  const contracts = Array.isArray(data?.data) ? data.data : [];

  const mappedContracts = contracts.map(c => ({
    id: c.id ?? '',
    client: c.client ?? null,
    city: c.city ?? null,
    state: c.state ?? null,
    cnpj: c.cnpj ?? null,
    sindic: c.sindic ?? null,
    year: c.year ?? null,
    matter: c.matter ?? null,
    forecast: c.forecast ?? null,
    contractTotal: c.contractTotal ?? null,
    percentage: c.percentage ?? null,
    signedContract: c.signedContract ?? null,
    status: c.status ?? null,
    averageGuide: c.averageGuide ?? null,
    partner: c.partner ?? null,
    partnerCommission: c.partnerCommission ?? null,
    counter: c.counter ?? null,
    email: c.email ?? null,
  }));

  const columns = CreateColumnsParamsContract();

  if (isLoading)
    return <div className="text-center py-8">Carregando contratos...</div>;

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTableContract columns={columns} data={mappedContracts} />
      </div>
    </div>
  );
}
