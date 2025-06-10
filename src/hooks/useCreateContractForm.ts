import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contractSchema,
  type ContractFormValues,
} from '@/domain/contract/formSchema';
import { formToDto } from '@/data/contract/contractService';
import { useCreateContractApi } from '@/data/contract/contractApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function useCreateContractForm() {
  const navigate = useNavigate();
  const { createContract, status } = useCreateContractApi();

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractSchema),
    defaultValues: contractSchema.parse({
      city: null,
      client: null,
      state: null,
      cnpj: null,
      sindic: null,
      year: null,
      matter: null,
      forecast: null,
      contractTotal: null,
      percentage: null,
      signedContract: null,
      status: null,
      averageGuide: null,
      partner: null,
      partnerCommission: null,
      counter: null,
      email: null,
    }),
  });

  const onSubmit = form.handleSubmit(async values => {
    try {
      await createContract(formToDto(values));
      toast.success('Contrato criado com sucesso!');
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao criar contrato. Tente novamente mais tarde.');
    }
  });

  return { form, onSubmit, isSubmitting: status === 'pending' };
}
