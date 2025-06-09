import type { IClientReceipt } from '@/domain/entities/client-receipt/IClientReceipt';
import type { GetClientReceipt200Item as ClientReceiptDto } from '@/http/models';

export function dtoToEntity(dto: ClientReceiptDto): IClientReceipt {
  return {
    id: dto.id,
    clientName: dto.clientName ?? undefined,
    cnpj: dto.cnpj ?? undefined,
    receiptDate: dto.receiptDate ?? undefined,
    competence: dto.competence ?? undefined,
    percentage: dto.percentage ?? undefined,
    compensationMonth:
      dto.compensationMonth != null ? Number(dto.compensationMonth) : undefined,
    honorary: dto.honorary ?? undefined,
    tax: dto.tax ?? undefined,
    status: dto.status ?? undefined,
  };
}
