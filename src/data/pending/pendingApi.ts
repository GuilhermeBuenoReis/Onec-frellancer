import {
  useGetPendings,
  useGetOnePending,
  useCreatePending,
  useUpdatePending,
  useDeletePending,
} from '@/http/generated/api';
import { dtoToEntity } from './pendingService';
import type { IPending } from '@/domain/pending/IPending';

export function usePendingListApi() {
  const q = useGetPendings();
  const pendings: IPending[] = (q.data ?? []).map(dtoToEntity);
  return { ...q, pendings };
}

export function usePendingDetailApi(id: string) {
  const get = useGetOnePending(id, { query: { enabled: !!id } });
  const createMutation = useCreatePending();
  const updateMutation = useUpdatePending();
  const deleteMutation = useDeletePending();

  const pending: IPending | null =
    get.data != null ? dtoToEntity(get.data) : null;

  return {
    isLoading: get.isLoading,
    error: get.error,
    pending,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
