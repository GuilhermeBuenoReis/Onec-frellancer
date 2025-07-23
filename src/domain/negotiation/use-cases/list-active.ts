import type { INegotiation } from '../INegotiation';

export function listActiveOrWon(all: INegotiation[]): INegotiation[] {
  return all.filter(n => ['ATIVO', 'GANHO'].includes(n.status.toUpperCase()));
}

export function countActiveAndWon(all: INegotiation[]): {
  active: number;
  won: number;
} {
  return all.reduce(
    (acc, n) => {
      const status = (n.status ?? '').toUpperCase();
      if (status === 'ATIVO') acc.active++;
      if (status === 'GANHO') acc.won++;
      return acc;
    },
    { active: 0, won: 0 }
  );
}
