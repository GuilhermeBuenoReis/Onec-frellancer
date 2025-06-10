export interface IContract {
  id?: string;
  city: string | null;
  state: string | null;
  client: string | null;
  cnpj: string | null;
  year: string | null;
  matter: string | null;
  forecast: string | null;
  contractTotal: string | null;
  percentage: number | null;
  averageGuide: number | null;
  partner: string | null;
  partnerCommission: number | null;
  signedContract: string | null;
  counter: string | null;
  email: string | null;
  status: string | null;
}
