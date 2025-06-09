import type { GetContractById200 as ContractDto } from '@/http/models';
import type { IContract } from '@/domain/entities/contract/IContract';

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
