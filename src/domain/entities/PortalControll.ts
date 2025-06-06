export class PortalControll {
  constructor(
    public id: string,
    public monthOfCalculation: string | null,
    public competenceMonth: string | null,
    public contract: number | null,
    public enterprise: string | null,
    public product: string | null,
    public percentageHonorary: number | null,
    public compensation: number | null,
    public honorary: number | null,
    public tax: number | null,
    public tj: number | null,
    public value: number | null,
    public situation: string | null,
    public partnerId: string
  ) {}
}
