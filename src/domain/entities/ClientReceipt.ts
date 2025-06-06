export class ClientReceipt {
  constructor(
    public id: string,
    public receiptDate: string | null,
    public competence: string | null,
    public cnpj: string | null,
    public clientName: string | null,
    public percentage: number | null,
    public compensationMonth: string | null,
    public honorary: number | null,
    public tax: number | null,
    public status: string | null
  ) {}
}
