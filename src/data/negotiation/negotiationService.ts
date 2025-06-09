import type { INegotiation } from '@/domain/entities/negotiation/INegotiation';
import type { GetNegotiation200Item as NegotiationDto } from '@/http/models';

export function dtoToEntity(dto: NegotiationDto): INegotiation {
  return {
    id: dto.id,
    client: dto.client ?? '',
    status: dto.status,
    startsDate: dto.startsDate ?? undefined,
    value: dto.value ?? 0,
  };
}
