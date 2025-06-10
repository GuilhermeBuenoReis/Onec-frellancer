import type { IContract } from '../IContract';
import type { ContractFormValues } from '../formSchema';

export function mapFormToEntity(form: ContractFormValues): IContract {
  return { ...form };
}
