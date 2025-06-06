export class Client {
  constructor(
    public id: string,
    public enterprise: string | null,
    public cnpj: string | null,
    public competenceMonth: string | null,
    public product: string | null,
    public contestation: string | null,
    public returned: string | null
  ) {}
}
