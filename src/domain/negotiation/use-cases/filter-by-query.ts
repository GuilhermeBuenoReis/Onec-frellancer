import type { INegotiation } from '../INegotiation';

export function filterByQuery(
  negos: INegotiation[],
  q: string
): INegotiation[] {
  if (!q.trim()) return negos;
  const term = q.toLowerCase();
  return negos.filter(n =>
    [n.client, n.status].some(f => f?.toLowerCase().includes(term))
  );
}
