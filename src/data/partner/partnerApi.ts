import {
  useGetPartners,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
} from '@/http/generated/api';
import {
  listDtoToEntity,
  formToCreateDto,
  formToUpdateDto,
} from './partnerService';
import type { IPartner } from '@/domain/Partner/IPartner';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

// Criação
export function usePartnerApi() {
  const { mutateAsync, status, reset } = useCreatePartner();
  const createPartner = (form: PartnerFormValues) =>
    mutateAsync({ data: formToCreateDto(form) });
  return { createPartner, status, reset };
}

// Listagem
export function useGetPartnerApi() {
  const { data, isLoading } = useGetPartners();
  const partners: IPartner[] = (data ?? []).map(listDtoToEntity);
  return { partners, isLoading };
}

export function usePartnerDetailApi(id: string) {
  const { data, isLoading, error } = useGetPartners();
  const partner: IPartner | undefined = (data ?? [])
    .map(listDtoToEntity)
    .find(p => p.id === id);
  const updateMutation = useUpdatePartner();
  const deleteMutation = useDeletePartner();
  return { isLoading, error, partner, updateMutation, deleteMutation };
}
