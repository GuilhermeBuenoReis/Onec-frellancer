export interface INegotiation {
  id: string;
  title: string | null;
  client: string | null;
  user: string | null;
  tags: string | null;
  step: string | null;
  status: string; // não é nullable no DTO
  value: number | null;
  startsDate: string | null;
  observation: string | null;
  averageGuide: number | null;
  partnerId: string | null;
}
