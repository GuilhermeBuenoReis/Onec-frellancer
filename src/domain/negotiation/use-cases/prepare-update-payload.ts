import type { INegotiation } from '../INegotiation';
import type { UpdateNegotiationBody } from '@/http/models';

export function prepareUpdatePayload(
  form: Partial<INegotiation>
): UpdateNegotiationBody {
  const payload = {} as UpdateNegotiationBody;
  Object.entries(form).forEach(([k, v]) => {
    if (v != null) (payload as any)[k] = v;
  });
  return payload;
}
