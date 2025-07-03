import type {
  GetContractById200 as ContractDto,
  CreateContractBody,
} from '@/http/models';
import type { IContract } from '@/domain/contract/IContract';
import type { ContractFormValues } from '@/domain/contract/formSchema';

export function dtoToEntity(dto: ContractDto): IContract {
  return {
    id: dto.id,
    city: dto.city,
    state: dto.state,
    client: dto.client,
    cnpj: dto.cnpj,
    year: dto.year,
    matter: dto.matter,
    forecast: dto.forecast,
    contractTotal: dto.contractTotal,
    percentage: dto.percentage,
    averageGuide: dto.averageGuide,
    partner: dto.partner,
    partnerCommission: dto.partnerCommission,
    signedContract: dto.signedContract,
    counter: dto.counter,
    email: dto.email,
    status: dto.status,
  };
}

export function formToDto(form: ContractFormValues): CreateContractBody {
  return {
    city: form.city,
    client: form.client,
    state: form.state,
    cnpj: form.cnpj,
    sindic: form.sindic,
    year: form.year,
    matter: form.matter,
    forecast: form.forecast,
    contractTotal: form.contractTotal,
    percentage: form.percentage,
    signedContract: form.signedContract,
    status: form.status,
    averageGuide: form.averageGuide,
    partner: form.partner,
    partnerCommission: form.partnerCommission,
    counter: form.counter,
    email: form.email,
  };
}
