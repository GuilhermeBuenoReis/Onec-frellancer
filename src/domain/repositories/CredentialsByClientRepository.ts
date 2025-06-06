export interface Contestation {
  id: string;
  credential: {
    id: string;
    channelHead: string;
    partner: string;
    cnpj: string;
    agentIndicator: string;
  } | null;
  client: {
    id: string;
    enterprise: string;
    competenceMonth: string;
    cnpj: string;
    contestation: string;
    returned: string;
  } | null;
}

export interface CredentialsByClientRepository {
  selectCredentialsAndClients(): Promise<{ contestation: Contestation }>;
}
