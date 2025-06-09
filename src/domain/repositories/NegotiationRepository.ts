import type { Negotiation } from '../entities/negotiation/Negotiation';

export interface NegotiationRepository {
  create(data: Partial<Negotiation>): Promise<Negotiation | null>;
  select(): Promise<Negotiation[]>;
  update(id: string, data: Partial<Negotiation>): Promise<Negotiation | null>;
  delete(id: string): Promise<boolean>;
}
