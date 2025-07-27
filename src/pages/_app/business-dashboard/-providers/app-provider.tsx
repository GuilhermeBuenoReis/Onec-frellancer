import { ContractProvider } from '../-context/contract-context';
import { ContractFiltersProvider } from '../-context/contract-filter-context';
import { DashboardFiltersProvider } from '../-context/dashboard-filter-context';
import { DashboardTabProvider } from '../-context/data-tabs-context';
import { NegotiationProvider } from '../-context/negotiation-context';
import { NegotiationFiltersProvider } from '../-context/negotiation-filter-context';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <DashboardFiltersProvider>
      <DashboardTabProvider>
        <NegotiationProvider>
          <NegotiationFiltersProvider>
            <ContractProvider>
              <ContractFiltersProvider>{children}</ContractFiltersProvider>
            </ContractProvider>
          </NegotiationFiltersProvider>
        </NegotiationProvider>
      </DashboardTabProvider>
    </DashboardFiltersProvider>
  );
}
