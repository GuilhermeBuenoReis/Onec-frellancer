import { useState, useMemo } from 'react';
import { useGetPartnerApi } from '@/data/partner/partnerApi';
import { filterPartners } from '@/domain/Partner/use-cases/filter-partners';
import type { IPartner } from '@/domain/Partner/IPartner';

export function usePartnerList() {
  const { partners, isLoading } = useGetPartnerApi();
  const [search, setSearch] = useState('');

  const filtered = useMemo<IPartner[]>(
    () => filterPartners(partners, search),
    [partners, search]
  );

  return {
    isLoading,
    search,
    setSearch,
    partners: filtered,
  };
}
