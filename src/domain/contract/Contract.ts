export class Contract {
  constructor(
    public id: string,
    public city: string | null,
    public client: string | null,
    public state: string | null,
    public cnpj: string | null,
    public sindic: string | null,
    public year: string | null,
    public matter: string | null,
    public forecast: string | null,
    public contractTotal: string | null,
    public percentage: number | null,
    public signedContract: string | null,
    public status: string | null,
    public averageGuide: number | null,
    public partner: string | null,
    public partnerCommission: number | null,
    public counter: string | null,
    public email: string | null
  ) {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o contrato para ser deletado!');
    }
  }
}
