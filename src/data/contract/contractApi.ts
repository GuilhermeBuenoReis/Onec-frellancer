import {
  useGetContractById,
  useUpdateContract,
  useDeleteContract,
  useCreateContract,
  useGetContract,
} from '@/http/generated/api';
import { dtoToEntity, type formToDto } from './contractService';
import type { IContract } from '@/domain/contract/IContract';

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

export function useCreateContractApi() {
  const { mutateAsync, status, reset } = useCreateContract();
  const createContract = (formDto: ReturnType<typeof formToDto>) =>
    mutateAsync({ data: formDto });
  return { createContract, status, reset };
}

export function useGetContractApi() {
  const { data, isLoading } = useGetContract();
  const contracts: IContract[] = (data ?? []).map(dtoToEntity).reverse();
  return { contracts, isLoading };
}
