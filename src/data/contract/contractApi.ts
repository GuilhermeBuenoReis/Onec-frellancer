import {
  useGetContractById,
  useUpdateContract,
  useDeleteContract,
} from '@/http/generated/api';
import { dtoToEntity } from './contractService';

export function useContractApi(id: string) {
  const get = useGetContractById(id, { query: { enabled: Boolean(id) } });
  const contract = get.data ? dtoToEntity(get.data) : null;
  return {
    isLoading: get.isLoading,
    isError: get.isError,
    error: get.error,
    contract,
    updateMutation: useUpdateContract(),
    deleteMutation: useDeleteContract(),
  };
}
