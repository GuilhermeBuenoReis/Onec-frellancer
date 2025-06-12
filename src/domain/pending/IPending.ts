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
  client: string;
  callReason: string;
  status: PendingStatus;
  priority: string;
  responsible: string;
  category: PendingCategory;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
