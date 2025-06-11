import type { INegotiation } from '../INegotiation';

export function filterActive(negos: INegotiation[]): INegotiation[] {
  return negos.filter(n =>
    ['ativo', 'ganho'].includes(n.status?.toLowerCase() ?? '')
  );
}
