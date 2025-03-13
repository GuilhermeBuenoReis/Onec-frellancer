export interface ProcessedExcelData {
  contracts?: Array<{
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
  }>;
  negotiations?: Array<{
    title: any;
    client: any;
    user: any;
    tags: any;
    status: any;
    step: any;
    value: any;
    startsDate: any;
    observation: any;
    partnerId: any;
    averageGuide: any;
  }>;
  partners?: Array<{
    name: any;
    cpfOrCnpj: any;
    city: any;
    state: any;
    commission: any;
    portal: any;
    channelHead: any;
    regional: any;
    coordinator: any;
    agent: any;
    indicator: any;
    contract: any;
    phone: any;
    email: any;
    responsible: any;
  }>;
}
