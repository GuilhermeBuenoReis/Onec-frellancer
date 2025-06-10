export interface INegotiation {
  id: string;
  client: string;
  status: 'ATIVO' | 'GANHO' | 'PERDIDO' | string;
  startsDate?: string;
  value?: number;
}
