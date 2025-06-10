import type { Contract } from '../entities/contract/Contract';

export interface ContractRepository {
  create(data: Contract): Promise<Contract | null>;
  select(): Promise<Contract[]>;
  update(id: string, data: Partial<Contract>): Promise<Contract | null>;
  delete(id: string): Promise<boolean>;
  selectCountStatus(): Promise<
    { status: string | null; count: number }[] | null
  >;
}
