export interface ExelDataNegotiation {
  id?: string;
  title: string;
  client: string;
  user: string;
  tags: string;
  status: string;
  step: string | null;
  value: number | null;
  startsDate: string | null;
  observation: string | null;
  partnerId: string | null;
  averageGuide: number | null;
}

export function mapToExelDataNegotiation(row: any): ExelDataNegotiation {
  return {
    id: row['id'] || undefined,
    title: row['título'] || '',
    client: row['Cliente'] || '',
    user: row['ususario'] || '',
    tags: row['Tags'] || '',
    status: row['Status'] || '',
    step: row['Etapa'] || null,
    value: row['Valor'] ? parseFloat(row['Valor']) : null,
    startsDate: row['Data Início'] || null,
    observation: row['OBS'] || null,
    partnerId: row['PARCEIRO'] || null,
    averageGuide: row['média'] ? parseFloat(row['média']) : null,
  };
}

// Interface e mapper para Partner
export interface Partner {
  id?: string;
  name: string;
  cpfOrCnpj: string;
  city: string | null;
  state: string | null;
  commission: number | null;
  portal: string | null;
  channelHead: string | null;
  regional: string | null;
  coordinator: string | null;
  agent: string | null;
  indicator: string | null;
  contract: string | null;
  phone: string | null;
  email: string | null;
  responsible: string | null;
}

export function mapToPartner(row: any): Partner {
  return {
    id: row['id'] || undefined,
    name: row['NOME'] || '',
    cpfOrCnpj: row['CPF/CNPJ'] || '',
    city: row['CIDADE'] || null,
    state: row['ESTADO'] || null,
    commission: row['COMISSÃO'] ? parseFloat(row['COMISSÃO']) : null,
    portal: row['PORTAL'] || null,
    channelHead: row['Head de Canal'] || null,
    regional: row['REGIONAL'] || null,
    coordinator: row['COORDENADOR'] || null,
    agent: row['AGENTE'] || null,
    indicator: row['INDICADOR'] || null,
    contract: row['CONTRATO'] || null,
    phone: row['TELEFONE'] || null,
    email: row['E-MAIL'] || null,
    responsible: row['responsável'] || null,
  };
}

// Interface e mapper para Contract
export interface Contract {
  id?: string;
  city: string | null;
  client: string;
  state: string | null;
  cnpj: string | null;
  sindic: string | null;
  year: string | null;
  matter: string | null;
  forecast: string | null;
  contractTotal: string | null;
  percentage: number | null;
  signedContract: string | null;
  status: string | null;
  averageGuide: number | null;
  partner: string | null;
  partnerCommission: number | null;
  counter: string | null;
  email: string | null;
}

export function mapToContract(row: any): Contract {
  return {
    id: row['id'] || undefined,
    city: row['Cidade'] || null,
    client: row['CLIENTE'] || '',
    state: row['Estado'] || null,
    cnpj: row['CNPJ'] || null,
    sindic: row['Sindic'] || null,
    year: row['ANO'] || null,
    matter: row['MATÉRIA'] || null,
    forecast: row['Previsao'] || null,
    contractTotal: row['CONTRATO TOTAL'] || null,
    percentage: row['PERCENTUAL'] ? parseFloat(row['PERCENTUAL']) : null,
    signedContract: row['CONTRATO ASSINADO'] || null,
    status: row['STATUS'] || null,
    averageGuide: row['MÉDIA DE GUIA']
      ? parseFloat(row['MÉDIA DE GUIA'])
      : null,
    partner: row['PARCEIRO'] || null,
    partnerCommission: row['Comissão parceiro']
      ? parseFloat(row['Comissão parceiro'])
      : null,
    counter: row['Contador'] || null,
    email: row['e-mail responsável'] || null,
  };
}
