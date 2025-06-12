import type { UpdateContractBody } from '@/http/models';
import type { IContract } from '@/domain/contract/IContract';

export function prepareUpdatePayload(
  formData: Partial<IContract>
): UpdateContractBody {
  const payload = {} as UpdateContractBody;

  (Object.entries(formData) as [keyof IContract, unknown][]).forEach(
    ([key, value]) => {
      if (value != null) {
        (payload as any)[key] = value;
      }
    }
  );

  return payload;
}
