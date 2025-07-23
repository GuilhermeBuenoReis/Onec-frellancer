import {
  useGetContract,
  useGetContractById,
  useUpdateContract,
  useDeleteContract,
  useCreateContract,
} from '@/http/generated/api';
import { dtoToEntity, formToDto } from './contractService';
import type { IContract } from '@/domain/contract/IContract';

/**
 * Lista e mapeia todos os contratos
 */
export function useGetContractsApi() {
  const { data = [], isLoading } = useGetContract();
  const list: IContract[] = data.map(dtoToEntity).reverse();
  return { list, isLoading };
}

/**
 * Detalha, atualiza e exclui um contrato por ID
 */
export function useContractApi(id: string) {
  const get = useGetContractById(id, { query: { enabled: Boolean(id) } });
  const contract = get.data ? dtoToEntity(get.data) : null;

  const update = useUpdateContract();
  const remove = useDeleteContract();

  return {
    isLoading: get.isLoading,
    isError: get.isError,
    error: get.error,
    contract,
    update,
    remove,
  };
}

/**
 * Cria um novo contrato
 */
export function useCreateContractApi() {
  const { mutateAsync, status, reset } = useCreateContract();
  const create = (form: IContract) => mutateAsync({ data: formToDto(form) });
  return { create, status, reset };
}
