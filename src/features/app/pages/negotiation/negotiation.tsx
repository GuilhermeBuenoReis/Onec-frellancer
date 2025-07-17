import { NegotiationTabAction } from './components/negotiation-tabs-action';
import { SectionCards } from './components/section-cards';

export function Negotiation() {
  return (
    <div
      className="min-w-full min-h-full p-24
     flex flex-col items-center gap-4"
    >
      <SectionCards />

      <NegotiationTabAction />
    </div>
  );
}
