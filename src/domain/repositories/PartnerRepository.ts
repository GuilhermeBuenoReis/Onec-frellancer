import type { Partner } from '../entities/Partner';

export interface PartnerRepository {
  create(partner: Partner): Promise<Partner | null>;
  select(): Promise<Partner[]>;
  update(
    id: string,
    partner: Partial<Omit<Partner, 'id'>>
  ): Promise<Partner | null>;
  delete(id: string): Promise<boolean>;
}
