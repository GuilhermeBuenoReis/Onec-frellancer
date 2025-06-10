import { useCreatePartner, useGetPartners } from '@/http/generated/api';
import { dtoToEntity, formToDto } from './partnerService';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

export function usePartnerApi() {
  const { mutateAsync, status, reset } = useCreatePartner();
  const createPartner = (values: PartnerFormValues) =>
    mutateAsync({ data: formToDto(values) });
  return { createPartner, status, reset };
}

export function useGetPartnerApi() {
  const { data, isLoading } = useGetPartners();
  const partners = (data ?? []).map(dtoToEntity);
  return { partners, isLoading };
}
