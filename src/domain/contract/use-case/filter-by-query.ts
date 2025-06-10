import type { IContract } from '../IContract';

export function filterByQuery(
  contracts: IContract[],
  query: string
): IContract[] {
  if (!query) return contracts;
  const q = query.toLowerCase();
  return contracts.filter(c =>
    [c.client, c.status, c.city, c.state].some(f =>
      f?.toLowerCase().includes(q)
    )
  );
}
