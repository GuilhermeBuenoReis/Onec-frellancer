import type { Client } from '../entities/Client';

export interface ClientRepository {
  create(data: Client): Promise<Client | null>;
  select(): Promise<Client[]>;
  update(id: string, data: Partial<Client>): Promise<Client | null>;
  delete(id: string): Promise<boolean>;
}
