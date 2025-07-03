import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getGetContractByIdQueryKey } from '@/http/generated/api';
import { prepareUpdatePayload } from '@/domain/contract/use-case/prepare-update-payload';
import { useContractApi } from '@/data/contract/contractApi';
import type { IContract } from '@/domain/contract/IContract';

export function useContractDetail(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    if (!contract?.id) return 'Id não encontrado!';
    const payload = prepareUpdatePayload(formData);

    await updateMutation.mutateAsync(
      { id: contract.id, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id!),
          });
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!contract?.id) return 'Id não encontrado!';

    await deleteMutation.mutateAsync(
      { id: contract.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contract.id!),
          });

          queryClient.invalidateQueries({
            queryKey: ['https://api.onecsis.com.br/contract'],
          });

          navigate('/dashboard');
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
