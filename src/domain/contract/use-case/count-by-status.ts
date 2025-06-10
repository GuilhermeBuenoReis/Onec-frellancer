import type { IContract } from '../IContract';

export function countByStatus(
  contracts: IContract[]
): { name: string; value: number }[] {
  const map: Record<string, number> = {};
  contracts.forEach(c => {
    const key = c.status?.trim() || 'Status não informado';
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}
