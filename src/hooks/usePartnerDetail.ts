// src/hooks/usePartnerDetail.ts
import { usePartnerDetailApi } from '@/data/partner/partnerApi';
import { useQueryClient } from '@tanstack/react-query';
import { getGetOnePartnerQueryKey } from '@/http/generated/api';
import { formToUpdateDto } from '@/data/partner/partnerService';
import type { PartnerFormValues } from '@/domain/Partner/form-schema';

export function usePartnerDetail(id: string) {
  const queryClient = useQueryClient();
  const { isLoading, error, partner, updateMutation, deleteMutation } =
    usePartnerDetailApi(id);

  const handleUpdate = async (data: PartnerFormValues) => {
    if (!partner?.id) return;
    const dto = formToUpdateDto(data);
    await updateMutation.mutateAsync(
      { id: partner.id, data: dto },
      {
        onSuccess: () => {
          if (!partner?.id) return;
          queryClient.invalidateQueries({
            queryKey: getGetOnePartnerQueryKey(partner.id),
          });
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!partner?.id) return;
    await deleteMutation.mutateAsync(
      { id: partner.id },
      {
        onSuccess: () => {
          if (!partner?.id) return;
          queryClient.invalidateQueries({
            queryKey: getGetOnePartnerQueryKey(partner.id),
          });
        },
      }
    );
  };

  return {
    isLoading,
    error,
    partner,
    handleUpdate,
    handleDelete,
    isUpdating: updateMutation.status === 'pending',
    isDeleting: deleteMutation.status === 'pending',
  };
}
