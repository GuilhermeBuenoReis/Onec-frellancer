'use client';

import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  useGetPartners,
  useGetPortalControllsBySelectParternRoute,
} from '@/generated';
import type { DashboardParams } from '../-types/-types';
import { FiltersProvider } from './filter-context';
import { MonthProvider } from './month-context';
import { SelectedControllProvider } from './selected-controll-context';

export function PartnerDashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const search = useSearch({ strict: false });
  const params = search as DashboardParams;

  const { data: partnersData } = useGetPartners();
  const partners = partnersData?.data ?? [];

  const partnerId = useMemo(
    () => params.id ?? partners[0]?.id ?? '',
    [params.id, partners]
  );
  const selectedMonth = params.month;

  const { data: portalControlls } = useGetPortalControllsBySelectParternRoute(
    { partnerId },
    { query: { enabled: !!partnerId } }
  );

  const entries = useMemo(() => portalControlls?.data ?? [], [portalControlls]);

  const parsedData = useMemo(() => {
    return entries
      .filter(entry => entry.competenceMonth)
      .map(entry => ({
        month: entry.competenceMonth ?? '',
        value: Number(entry.value ?? 0),
      }));
  }, [entries]);

  return (
    <FiltersProvider>
      <SelectedControllProvider>
        <MonthProvider parsedData={parsedData} selectedMonth={selectedMonth}>
          {children}
        </MonthProvider>
      </SelectedControllProvider>
    </FiltersProvider>
  );
}
