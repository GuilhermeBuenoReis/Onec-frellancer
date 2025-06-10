export class Partner {
  constructor(
    public id: string,
    public name: string | null,
    public cpfOrCnpj: string | null,
    public city: string | null,
    public state: string | null,
    public commission: number | null,
    public portal: string | null,
    public channelHead: string | null,
    public regional: string | null,
    public coordinator: string | null,
    public agent: string | null,
    public indicator: string | null,
    public contract: string | null,
    public phone: string | null,
    public email: string | null,
    public responsible: string | null
  ) {}
}
