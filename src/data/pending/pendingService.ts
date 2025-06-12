import type {
  GetOnePending200,
  CreatePendingBody,
  UpdatePendingBody,
} from '@/http/models';
import type { IPending } from '@/domain/pending/IPending';
import type { PendingFormValues } from '@/domain/pending/form-schema';

export function dtoToEntity(dto: GetOnePending200): IPending {
  return {
    id: dto.id,
    client: dto.client!,
    callReason: dto.callReason!,
    priority: dto.priority!,
    responsible: dto.responsible!,
    category: dto.category as IPending['category'],
    description: dto.description!,
    status: dto.status as IPending['status'],
    createdAt: dto.createdAt!,
    updatedAt: dto.updatedAt!,
  };
}

export function formToCreateDto(form: PendingFormValues): CreatePendingBody {
  return { ...form };
}

export function formToUpdateDto(form: PendingFormValues): UpdatePendingBody {
  const out: UpdatePendingBody = {};
  Object.entries(form).forEach(([k, v]) => {
    if (v != null) {
      (out as any)[k] = v;
    }
  });
  return out;
}
