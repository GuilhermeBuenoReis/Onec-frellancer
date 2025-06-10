export interface ICredentialInfo {
  id: string;
  channelHead: string | null;
  partner: string | null;
  cnpj: string | null;
  agentIndicator: string | null;
}

export interface IClientContestation {
  id: string;
  enterprise: string | null;
  competenceMonth: string | null;
  cnpj: string | null;
  product: string | null;
  contestation: string | null;
  returned: string | null;
}

export interface IContestationData {
  credential: ICredentialInfo;
  clients: IClientContestation[];
}
