import type { INegotiation } from '@/domain/negotiation/INegotiation';
import type {
  CreateDataNegotiationBody,
  GetNegotiation200Item as NegotiationDto,
} from '@/http/models';

export function dtoToEntity(dto: NegotiationDto): INegotiation {
  return {
    id: dto.id,
    title: dto.title ?? null,
    client: dto.client ?? null,
    user: dto.user ?? null,
    tags: dto.tags ?? null,
    step: dto.step ?? null,
    status: dto.status,
    value: dto.value ?? null,
    startsDate: dto.startsDate ?? null,
    observation: dto.observation ?? null,
    averageGuide: dto.averageGuide ?? null,
    partnerId: dto.partnerId ?? null,
  };
}

export function formToCreateDto(form: INegotiation): CreateDataNegotiationBody {
  return {
    ...form,
  };
}
