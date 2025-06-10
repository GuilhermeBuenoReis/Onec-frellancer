import { useGetClientReceipt } from '@/http/generated/api';
import { dtoToEntity } from './clientReceiptService';
import type { IClientReceipt } from '@/domain/client-receipt/IClientReceipt';

export function useClientReceipts(): {
  receipts: IClientReceipt[];
  isLoading: boolean;
} {
  const { data: dtos = [], isLoading } = useGetClientReceipt();
  const receipts = dtos.map(dtoToEntity);
  return { receipts, isLoading };
}
