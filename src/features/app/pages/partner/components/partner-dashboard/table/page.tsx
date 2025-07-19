'use client';

import { useState } from 'react';
import { statsByMonth } from '../../../../../../../constants/partner-monthly-stats';
import type { PartnerFormData } from '../../../types/partner-type-data';
import { createPartnerColumns } from './columns';
import { DataTable } from './data-table';

export function PartnerTablePage() {
  const [_, setPartners] = useState<PartnerFormData[]>(statsByMonth);

  function handleEdit(updated: PartnerFormData) {
    setPartners(prev =>
      prev.map(p => (p.partnerId === updated.partnerId ? updated : p))
    );
  }

  function handleDelete(id: string) {
    setPartners(prev => prev.filter(p => p.partnerId !== id));
  }

  const columns = createPartnerColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });
  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Tabela de Dados do Parceiro</h1>
        <DataTable columns={columns} data={statsByMonth} />
      </div>
    </div>
  );
}
