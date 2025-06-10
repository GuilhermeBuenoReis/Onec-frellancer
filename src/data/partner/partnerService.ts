import type { CreatePartnerBody } from '@/http/models';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

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
