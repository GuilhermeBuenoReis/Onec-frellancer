import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  partnerSchema,
  type PartnerFormValues,
} from '@/domain/Partner/form-schema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePartnerApi } from '@/data/partner/partnerApi';

export function useCreatePartnerForm() {
  const navigate = useNavigate();
  const { createPartner, status } = usePartnerApi();

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: partnerSchema.parse({}),
  });

  const onSubmit: SubmitHandler<PartnerFormValues> = async values => {
    try {
      await createPartner(values);
      toast.success('Parceiro criado com sucesso!');
      navigate('/rh');
    } catch {
      toast.error('Erro ao criar parceiro!');
    }
  };

  return { form, onSubmit, isSubmitting: status === 'pending' };
}
