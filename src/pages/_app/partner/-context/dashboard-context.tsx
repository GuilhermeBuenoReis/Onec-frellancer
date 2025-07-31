'use client';

import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  useGetPartners,
  useGetPortalControllsBySelectParternRoute,
} from '@/generated';
import type { DashboardParams } from '../-types/-types';
import { useFiltersContext } from './filter-context';
import { useMonthContext } from './month-context';
import { useSelectedControllContext } from './selected-controll-context';

export function useDashboardProvider() {
  const search = useSearch({ strict: false });
  const params = search as DashboardParams;

  const { info, totals, updateParam, setTotals, setFilters } =
    useFiltersContext();

  const {
    viewType,
    availableMonths,
    current,
    previous,
    selectedData,
    lastSixMonthsData,
  } = useMonthContext();

  const {
    selectedControllId,
    selectedControllData,
    setSelectedControllId,
    setSelectedControllData,
  } = useSelectedControllContext();

  const { data: partnersData } = useGetPartners();
  const partners = partnersData?.data ?? [];

  const partnerId = useMemo(
    () => params.id ?? partners[0]?.id ?? '',
    [params.id, partners]
  );

  const partner = useMemo(
    () => partners.find(p => p.id === partnerId),
    [partnerId, partners]
  );

  const { data: portalControlls } = useGetPortalControllsBySelectParternRoute(
    { partnerId },
    { query: { enabled: !!partnerId } }
  );

  const entries = useMemo(() => portalControlls?.data ?? [], [portalControlls]);

  return {
    ...params,
    info,
    totals,
    updateParam,
    setTotals,
    setFilters,

    viewType,
    availableMonths,
    current,
    previous,
    selectedData,
    lastSixMonthsData,

    selectedControllId,
    selectedControllData,
    setSelectedControllId,
    setSelectedControllData,

    partnerId,
    partner,

    entries,
  };
}
