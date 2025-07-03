import { UpdateNegotiationBody } from "@/http/models";
import { INegotiation } from "../INegotiation";

export function prepareUpdatePayload(
  form: Partial<INegotiation>
): UpdateNegotiationBody {
  const sanitized = Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, v ?? null])
  );
  return sanitized as UpdateNegotiationBody;
}
