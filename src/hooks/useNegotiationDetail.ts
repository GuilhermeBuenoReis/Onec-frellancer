
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useNegotiationApi } from '@/data/negotiation/negotiationApi';
import { prepareUpdatePayload } from '@/domain/negotiation/use-cases/prepare-update-payload';
import { getGetNegotiationByIdQueryKey } from '@/http/generated/api';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function useNegotiationDetail(id: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, negotiation, update, remove } = useNegotiationApi(id);
  const [formData, setFormData] = useState<Partial<INegotiation>>({});

  // Inicializa formData somente uma vez ao carregar negociação
  useEffect(() => {
    if (negotiation && negotiation.id && formData.id !== negotiation.id) {
      setFormData(negotiation);
    }
  }, [negotiation, formData.id]);

  const handleChange = <K extends keyof INegotiation>(
    field: K,
    value: INegotiation[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!negotiation?.id) return;
    const payload = prepareUpdatePayload(formData);
    await update.mutateAsync(
      { id: negotiation.id, data: payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetNegotiationByIdQueryKey(negotiation.id!) });
        },
      }
    );
  };

  const handleDelete = async () => {
    if (!negotiation?.id) return;
    await remove.mutateAsync(
      { id: negotiation.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetNegotiationByIdQueryKey(negotiation.id!) });
          // Após exclusão, retorna ao dashboard de negociações
          navigate('/negotiation');
        },
      }
    );
  };

  return {
    isLoading,
    negotiation,
    formData,
    handleChange,
    handleUpdate,
    handleDelete,
    isUpdating: update.status === 'pending',
    isDeleting: remove.status === 'pending',
  };
}
