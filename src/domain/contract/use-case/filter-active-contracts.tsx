import type { IContract } from '../IContract';

export function filterActiveContracts(contracts: IContract[]): IContract[] {
  return contracts.filter(c => (c.status ?? '').toLowerCase() === 'ativo');
}
