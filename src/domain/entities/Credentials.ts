export class Credential {
  constructor(
    public id: string,
    public channelHead: string | null,
    public partner: string | null,
    public cnpj: string | null,
    public agentIndicator: string | null
  ) {}
}
