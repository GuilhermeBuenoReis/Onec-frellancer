'use client';

import { calls } from '../../../../../../constants/call';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function PendingCallsTablePage() {
  const mutableCalls = calls.slice();

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable columns={columns} data={mutableCalls} />
      </div>
    </div>
  );
}
