'use client';

import { negociacoesContratos } from '../../../../../../constants/negotiation-data';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function DemoPage() {
  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable columns={columns} data={negociacoesContratos} />
      </div>
    </div>
  );
}
