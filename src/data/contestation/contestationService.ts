import type { ListCredentialClient200Item as ContDto } from '@/http/models';
import type {
  IContestationData,
  ICredentialInfo,
  IClientContestation,
} from '@/domain/contestation/IContestation';

export function dtoToEntity(dto: ContDto): IContestationData {
  const credential: ICredentialInfo = {
    id: dto.id,
    channelHead: dto.credentials.channelHead,
    partner: dto.credentials.partner,
    cnpj: dto.credentials.cnpj,
    agentIndicator: dto.credentials.agentIndicator,
  };

  const rawClients = (() => {
    if (Array.isArray(dto.clients)) {
      return dto.clients;
    }
    if (
      (dto.clients as any).items &&
      Array.isArray((dto.clients as any).items)
    ) {
      return (dto.clients as any).items;
    }
    if ((dto.clients as any).data && Array.isArray((dto.clients as any).data)) {
      return (dto.clients as any).data;
    }
    return [];
  })();

  const clients: IClientContestation[] = rawClients.map((c: any) => ({
    id: c.id,
    enterprise: c.enterprise,
    competenceMonth: c.competenceMonth,
    cnpj: c.cnpj,
    product: c.product,
    contestation: c.contestation,
    returned: c.returned,
  }));

  return { credential, clients };
}
