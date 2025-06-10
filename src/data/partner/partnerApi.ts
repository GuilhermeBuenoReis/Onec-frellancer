import { useCreatePartner } from '@/http/generated/api';
import { formToDto } from './partnerService';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

export function usePartnerApi() {
  const { mutateAsync, status, reset } = useCreatePartner();
  const createPartner = (values: PartnerFormValues) =>
    mutateAsync({ data: formToDto(values) });
  return { createPartner, status, reset };
}
