import {
  useGetNegotiation,
  useGetNegotiationById,
  useUpdateNegotiation,
  useDeleteNegotiation,
  useCreateDataNegotiation,
} from '@/http/generated/api';
import { dtoToEntity, formToCreateDto } from './negotiationService';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

/** Lista e mapeia todas */
export function useNegotiationsApi() {
  const { data = [], isLoading } = useGetNegotiation();
  const list: INegotiation[] = data.map(dtoToEntity).reverse();
  return { list, isLoading };
}

export function useNegotiationApi(id: string) {
  const get = useGetNegotiationById(id);
  const dto = get.data && get.data.length > 0 ? get.data[0] : null;
  const negotiation = dto ? dtoToEntity(dto) : null;
  return {
    isLoading: get.isLoading,
    negotiation,
    update: useUpdateNegotiation(),
    remove: useDeleteNegotiation(),
  };
}

export function useCreateNegotiationApi() {
  const { mutateAsync, status } = useCreateDataNegotiation();
  const create = (form: INegotiation) =>
    mutateAsync({ data: formToCreateDto(form) });
  return { create, status };
}
