import type {
  GetPartners200Item as PartnerListDto,
  CreatePartnerBody,
  UpdatePartnerBody,
} from '@/http/models';
import type { IPartner } from '@/domain/Partner/IPartner';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

export function listDtoToEntity(dto: PartnerListDto): IPartner {
  return {
    id: dto.id,
    name: dto.name,
    cpfOrCnpj: dto.cpfOrCnpj,
    city: dto.city,
    state: dto.state,
    commission: dto.commission,
    portal: dto.portal,
    channelHead: dto.channelHead,
    regional: dto.regional,
    coordinator: dto.coordinator,
    agent: dto.agent,
    indicator: dto.indicator,
    contract: dto.contract,
    phone: dto.phone,
    email: dto.email,
    responsible: dto.responsible,
  };
}

export function formToCreateDto(form: PartnerFormValues): CreatePartnerBody {
  return { ...form };
}

export function formToUpdateDto(form: PartnerFormValues): UpdatePartnerBody {
  const payload: UpdatePartnerBody = {};
  (Object.keys(form) as (keyof PartnerFormValues)[]).forEach(key => {
    const value = form[key];
    if (value != null) payload[key] = value;
  });
  return payload;
}
