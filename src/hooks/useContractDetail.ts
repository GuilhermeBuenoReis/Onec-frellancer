// src/hooks/useContractDetail.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  getGetContractByIdQueryKey,
  getGetContractQueryKey,
  useGetContractById,
  useUpdateContract,
  useDeleteContract,
} from '@/http/generated/api';
import { dtoToEntity } from '@/data/contract/contractService';
import { prepareUpdatePayload } from '@/domain/contract/use-case/prepare-update-payload';
import type { IContract } from '@/domain/contract/IContract';
import type { UpdateContractBody } from '@/http/models';

export function useContractDetail(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getQuery = useGetContractById(id, { query: { enabled: Boolean(id) } });
  const contract = getQuery.data ? dtoToEntity(getQuery.data) : null;

  // Local form state initialized once
  const [formData, setFormData] = useState<Partial<IContract>>({});
  useEffect(() => {
    if (contract?.id && formData.id !== contract.id) {
      setFormData(contract);
    }
  }, [contract, formData.id]);

  // Mutations
  const updateMutation = useUpdateContract();
  const deleteMutation = useDeleteContract();

  // Handlers for form changes
  const handleChange = <K extends keyof IContract>(
    field: K,
    value: IContract[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Update contract
  const handleUpdate = () => {
    if (!contract?.id) return;
    const contractId = contract.id!;
    const payload: UpdateContractBody = prepareUpdatePayload(formData);
    updateMutation.mutate(
      { id: contractId, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contractId),
          });
        },
      }
    );
  };

  // Delete contract
  const handleDelete = () => {
    if (!contract?.id) return;
    const contractId = contract.id!;
    deleteMutation.mutate(
      { id: contractId },
      {
        onSuccess: () => {
          // Invalidate detail query
          queryClient.invalidateQueries({
            queryKey: getGetContractByIdQueryKey(contractId),
          });
          // Invalidate list query
          queryClient.invalidateQueries({ queryKey: getGetContractQueryKey() });
          // Navigate away after delete
          navigate('/dashboard');
        },
      }
    );
  };

  return {
    isLoading: getQuery.isLoading,
    isError: getQuery.isError,
    error: getQuery.error,
    contract,
    formData,
    handleChange,
    handleUpdate,
    handleDelete,
    isUpdating: updateMutation.status === 'pending',
    isDeleting: deleteMutation.status === 'pending',
  };
}
