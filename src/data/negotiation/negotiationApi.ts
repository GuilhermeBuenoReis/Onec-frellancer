import { useGetNegotiation } from '@/http/generated/api';
import { dtoToEntity } from './negotiationService';
import type { INegotiation } from '@/domain/entities/negotiation/INegotiation';

export function useNegotiations(): {
  negotiations: INegotiation[];
  isLoading: boolean;
} {
  const { data: dtos = [], isLoading } = useGetNegotiation();
  const negotiations = dtos.map(dtoToEntity);
  return { negotiations, isLoading };
}
