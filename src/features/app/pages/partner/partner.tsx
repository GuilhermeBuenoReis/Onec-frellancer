import { useSearchParams } from 'react-router';
import { ListPartnerAside } from './components/list-partner-aside';
import { PartnerDashboard } from './components/partner-dashboard';

export function Partner() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'Selecione um parceiro';

  return (
    <main
      className="w-full min-h-screen px-4 py-8 sm:px-6 lg:px-24 lg:py-16
     flex flex-col items-center gap-6 lg:gap-10"
    >
      <div className="min-w-full min-h-full flex gap-16">
        <ListPartnerAside />
        <PartnerDashboard name={name} />
      </div>
    </main>
  );
}
