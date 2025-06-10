import type { INegotiation } from '../INegotiation';

export function listActiveOrWon(all: INegotiation[]): INegotiation[] {
  return all.filter(n => ['ATIVO', 'GANHO'].includes(n.status.toUpperCase()));
}
