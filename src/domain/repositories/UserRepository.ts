import type { User } from '../entities/User';

export interface UserRepository {
  create(userData: Omit<User, 'id'>): Promise<User | null>;
  select(): Promise<User[]>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}
