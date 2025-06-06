import type { Pending } from '../entities/Pending';

export interface PendingRepository {
  create(pending: Pending): Promise<Pending | null>;
  select(): Promise<Pending[]>;
  update(
    id: string,
    data: Partial<Omit<Pending, 'id'>>
  ): Promise<Pending | null>;
  delete(id: string): Promise<boolean>;
}
