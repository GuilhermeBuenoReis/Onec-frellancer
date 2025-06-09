export interface IClientReceipt {
  id: string;
  clientName?: string;
  cnpj?: string;
  receiptDate?: string;
  competence?: string;
  percentage?: number;
  compensationMonth?: number;
  honorary?: number;
  tax?: number;
  status?: 'PAGO' | 'NÃO PAGO' | string;
}
