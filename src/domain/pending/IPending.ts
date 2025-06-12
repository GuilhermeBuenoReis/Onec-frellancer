export type PendingStatus = 'Aberto' | 'Encaminhado' | 'Pendente' | 'Concluído';
export type PendingCategory =
  | 'SAC'
  | 'Atendimento'
  | 'Financeiro'
  | 'Diretoria'
  | 'Comercial'
  | 'Auditoria';

export interface IPending {
  id: string;
  client: string | null;
  callReason: string | null;
  status: PendingStatus | null;
  priority: string | null;
  responsible: string | null;
  category: PendingCategory | null;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
}
