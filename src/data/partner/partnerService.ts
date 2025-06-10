import type { CreatePartnerBody } from '@/http/models';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';
import type { GetPartners200Item as PartnerDto } from '@/http/models/';
import type { IPartner } from '@/domain/Partner/IPartner';

export function formToDto(form: PartnerFormValues): CreatePartnerBody {
  return {
    name: form.name,
    cpfOrCnpj: form.cpfOrCnpj,
    city: form.city,
    state: form.state,
    commission: form.commission,
    portal: form.portal,
    channelHead: form.channelHead,
    regional: form.regional,
    coordinator: form.coordinator,
    agent: form.agent,
    indicator: form.indicator,
    contract: form.contract,
    phone: form.phone,
    email: form.email,
    responsible: form.responsible,
  };
}

export function dtoToEntity(dto: PartnerDto): IPartner {
  return {
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
