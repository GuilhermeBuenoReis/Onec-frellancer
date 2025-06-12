import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getGetOnePendingQueryKey } from '@/http/generated/api';
import { usePendingDetailApi } from '@/data/pending/pendingApi';
import type { PendingFormValues } from '@/domain/pending/form-schema';
import { formToUpdateDto } from '@/data/pending/pendingService';

export function usePendingDetail(id: string) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, pending, updateMutation, deleteMutation } =
    usePendingDetailApi(id);

  const handleUpdate = async (data: PendingFormValues) => {
    if (!pending) return;
    await updateMutation.mutateAsync(
      { id: pending.id, data: formToUpdateDto(data) },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: getGetOnePendingQueryKey(pending.id),
          }),
      }
    );
  };

  const handleDelete = async () => {
    if (!pending) return;
    await deleteMutation.mutateAsync(
      { id: pending.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetOnePendingQueryKey(pending.id),
          });
          navigate('/pendencias');
        },
      }
    );
  };

  return {
    isLoading,
    error,
    pending,
    handleUpdate,
    handleDelete,
    isUpdating: updateMutation.status === 'pending',
    isDeleting: deleteMutation.status === 'pending',
  };
}
