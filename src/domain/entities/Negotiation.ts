export class Negotiation {
  constructor(
    public id: string,
    public title: string | null,
    public client: string | null,
    public user: string | null,
    public tags: string | null,
    public status: string | null,
    public step: string | null,
    public value: number | null,
    public startsDate: string | null,
    public observation: string | null,
    public partnerId: string | null,
    public averageGuide: number | null
  ) {}
}
