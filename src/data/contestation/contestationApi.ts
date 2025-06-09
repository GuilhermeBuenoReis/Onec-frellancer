import { useListCredentialClient } from '@/http/generated/api';
import { dtoToEntity } from './contestationService';

export function useContestationApi() {
  const { data: dtos, isLoading, error } = useListCredentialClient();
  const data = dtos?.map(dtoToEntity) ?? [];
  return { data, isLoading, error };
}
