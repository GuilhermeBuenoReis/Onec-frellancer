import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getGetContractByIdQueryKey } from '@/http/generated/api';
import { prepareUpdatePayload } from '@/domain/entities/contract/use-case/prepare-update-payload';
import { useContractApi } from '@/data/contract/contractApi';
import type { IContract } from '@/domain/entities/contract/IContract';

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

  // Form state
  const [formData, setFormData] = useState<Partial<IContract>>({});

  // Preenche o formData apenas na primeira vez que contract chega
  useEffect(() => {
    // só inicializa caso ainda não tenha um id em formData
    if (contract && !formData.id) {
      setFormData(contract);
    }
  }, [contract, formData.id]);

  // restante do hook permanece igual...
  const handleChange = <K extends keyof IContract>(
    field: K,
    value: IContract[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!contract) return;
    const payload = prepareUpdatePayload(formData);
    await updateMutation.mutateAsync(
      { id: contract.id, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id),
          });
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!contract) return;
    await deleteMutation.mutateAsync(
      { id: contract.id },
      {
        onSuccess: () => {
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
