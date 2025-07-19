'use client';

import { useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import { calls } from '../../../../../../constants/call';
import { columns } from './columns';
import { DataTable } from './data-table';
import { ExportDialog } from './export-dialog';
import { FilterDialog } from './filter-dialog';

export default function PendingCallsTablePage() {
  const [exportOpen, setExportOpen] = useState(false);

  const mutableCalls = calls.slice();

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold">Chamados Pendentes</h1>
          <div className="flex gap-2">
            <FilterDialog
              onApply={filters => {
                // Aqui futuramente aplicar filtros ao estado
                console.log('Filtros aplicados:', filters);
              }}
            />
            <Button variant="secondary" onClick={() => setExportOpen(true)}>
              Exportar com IA
            </Button>
          </div>
        </div>
        <DataTable columns={columns} data={mutableCalls} />
        <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
      </div>
    </div>
  );
}
