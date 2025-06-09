import type { ListCredentialClient200Item as ContDto } from '@/http/models';
import type {
  IContestationData,
  ICredentialInfo,
  IClientContestation,
} from '@/domain/entities/contestation/IContestation';

export function dtoToEntity(dto: ContDto): IContestationData {
  const cred: ICredentialInfo = {
    id: dto.id,
    channelHead: dto.credentials.channelHead,
    partner: dto.credentials.partner,
    cnpj: dto.credentials.cnpj,
    agentIndicator: dto.credentials.agentIndicator,
  };
  const clients: IClientContestation[] = dto.clients.map((c: any) => ({
    id: c.id,
    enterprise: c.enterprise,
    competenceMonth: c.competenceMonth,
    cnpj: c.cnpj,
    product: c.product,
    contestation: c.contestation,
    returned: c.returned,
  }));
  return { credential: cred, clients };
}
