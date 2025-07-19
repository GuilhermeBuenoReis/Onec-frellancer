import { FilterStatus } from './components/filter-status';
import PendingCallsTablePage from './components/table/pending-calls-table-page';

export function Pending() {
  return (
    <main
      className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16
       flex flex-col items-center gap-6 lg:gap-10"
    >
      <div className="min-w-full min-h-full flex gap-16">
        <FilterStatus />
        <PendingCallsTablePage />
      </div>
    </main>
  );
}
