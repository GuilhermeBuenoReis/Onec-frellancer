import type { ClientReceipt } from '../entities/ClientReceipt';

export interface ClientReceiptRepository {
  create(data: ClientReceipt): Promise<ClientReceipt | null>;
  select(): Promise<ClientReceipt[]>;
  update(
    id: string,
    data: Partial<ClientReceipt>
  ): Promise<ClientReceipt | null>;
  delete(id: string): Promise<boolean>;
}
