export type Call = {
  client: string;
  callReason: string;
  status: 'Aberto' | 'Encaminhado' | 'Pendente' | 'Concluído';
  priority: 'Alta' | 'Média' | 'Baixa';
  responsible: string;
  category:
    | 'SAC'
    | 'Atendimento'
    | 'Financeiro'
    | 'Diretoria'
    | 'Comercial'
    | 'Auditoria';
  description: string;
};
