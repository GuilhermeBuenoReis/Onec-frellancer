import type { IContract } from '../IContract';

export function filterContracts(
  contracts: IContract[],
  term: string
): IContract[] {
  if (!term.trim()) return contracts;
  const lower = term.trim().toLowerCase();
  return contracts.filter(c =>
    [c.client, c.status, c.city, c.state].some(field =>
      field?.toLowerCase().includes(lower)
    )
  );
}
