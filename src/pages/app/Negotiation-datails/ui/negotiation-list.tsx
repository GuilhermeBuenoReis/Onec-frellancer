import { NegotiationFilterForm } from './negotiation-filter-form';
import { NegotiationCard } from './negotiation-card';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function NegotiationList({
  negotiations,
  query,
  onQueryChange,
  onView,
}: {
  negotiations: INegotiation[];
  query: string;
  onQueryChange: (q: string) => void;
  onView: (id: string) => void;
}) {
  return (
    <>
      <NegotiationFilterForm query={query} onQueryChange={onQueryChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {negotiations.map(n => (
          <NegotiationCard key={n.id} nego={n} onView={onView} />
        ))}
      </div>
    </>
  );
}
