// src/utils/mapSummaryToNegotiationTypeData.ts

import type { GetContractNegotiationSummary200 } from '../generated';
import type { NegotiationTypeData } from '../schemas/negotiation-data-type';

export function mapSummaryToNegotiationTypeData(
  summary: GetContractNegotiationSummary200['result'][number]
): NegotiationTypeData {
  return {
    id: summary.negotiationId ?? 'Não informado: id',
    title: summary.title,
    client: summary.negotiationClient,
    user: summary.user,
    tags: summary.tags,
    step: summary.step,
    status: summary.negotiationStatus,
    value: summary.value,
    date: summary.startsDate,
    observation: summary.observation,
    partnerId: summary.partnerId,
    averageGuide: summary.negotiationAverageGuide,
    createdAt: summary.negotiationCreatedAt,
    updatedAt: summary.negotiationUpdatedAt,
    contractId: summary.contractId,
    contractClient: summary.contractClient,
    city: summary.city,
    state: summary.state,
    cnpj: summary.cnpj,
    syndic: summary.sindic,
    year: summary.year,
    subject: summary.matter,
    forecast: summary.forecast,
    contractTotal: summary.contractTotal,
    percentage: summary.percentage,
    signedContract: summary.signedContract,
    contractStatus: summary.contractStatus,
    contractAverageGuide: summary.contractAverageGuide,
    partner: summary.partner,
    partnerCommission: summary.partnerCommission,
    counter: summary.counter,
    email: summary.email,
    contractCreatedAt: summary.contractCreatedAt,
    contractUpdatedAt: summary.contractUpdatedAt,
  };
}
