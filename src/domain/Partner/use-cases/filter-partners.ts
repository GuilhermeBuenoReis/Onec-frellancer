import type { IPartner } from '../IPartner';

export function filterPartners(partners: IPartner[], term: string): IPartner[] {
  if (!term.trim()) return partners;
  const lower = term.trim().toLowerCase();
  return partners.filter(p => p.name?.toLowerCase().includes(lower));
}
