import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getGetContractByIdQueryKey } from '@/http/generated/api';
import { prepareUpdatePayload } from '@/domain/contract/use-case/prepare-update-payload';
import { useContractApi } from '@/data/contract/contractApi';
import type { IContract } from '@/domain/contract/IContract';

export function useContractDetail(id: string) {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    contract,
    updateMutation,
    deleteMutation,
  } = useContractApi(id);

  const [formData, setFormData] = useState<Partial<IContract>>({});

  useEffect(() => {
    if (contract && !formData.id) {
      setFormData(contract);
    }
  }, [contract, formData.id]);

  const handleChange = <K extends keyof IContract>(
    field: K,
    value: IContract[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!contract) return;
    const payload = prepareUpdatePayload(formData);

    if (!contract.id) {
      return 'Id, não encontrado!';
    }
    await updateMutation.mutateAsync(
      { id: contract.id, data: payload },
      {
        onSuccess: () => {
          if (!contract.id) {
            return 'Id, não encontrado!';
          }
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id),
          });
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!contract) return;
    if (!contract.id) {
      return 'Id, não encontrado!';
    }
    await deleteMutation.mutateAsync(
      { id: contract.id },
      {
        onSuccess: () => {
          if (!contract.id) {
            return 'Id, não encontrado!';
          }
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id),
          });
        },
      }
    );
  };

  return {
    isLoading,
    isError,
    error,
    contract,
    formData,
    handleChange,
    handleUpdate,
    handleDelete,
    isUpdating: updateMutation.status === 'pending',
    isDeleting: deleteMutation.status === 'pending',
  };
}
