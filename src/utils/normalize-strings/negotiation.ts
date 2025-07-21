import type { GetContract200 } from '../../generated';
import type { GetContractNegotiationSummary200 } from '../../generated/types/GetContractNegotiationSummary';

type ContractItem = GetContract200[number];

export const fieldLabels: Record<keyof ContractItem, string> = {
  id: 'Id do contrato',
  city: 'Cidade',
  client: 'Cliente do contrato',
  state: 'Estado',
  cnpj: 'CNPJ',
  sindic: 'Síndico',
  year: 'Ano',
  matter: 'Matéria',
  forecast: 'Previsão',
  contractTotal: 'Total de Contrato',
  percentage: 'Percentual',
  signedContract: 'Contrato Assinado',
  status: 'Status do contrato',
  averageGuide: 'Guia Média do Contrato',
  partner: 'Parceiro',
  partnerCommission: 'Comissão do Parceiro',
  counter: 'Contador',
  email: 'E-mail do responsável',
};
