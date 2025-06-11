import { useForm } from 'react-hook-form';
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

  const form = useForm<Partial<PartnerFormValues>>({
    resolver: zodResolver(partnerSchema.partial()),
    defaultValues: partnerSchema.partial().parse({}),
  });

  const onSubmit = form.handleSubmit(async values => {
    try {
      await createPartner(values as PartnerFormValues);
      toast.success('Parceiro criado com sucesso!');
      navigate('/rh');
    } catch {
      toast.error('Erro ao criar parceiro!');
    }
  });

  return { form, onSubmit, isSubmitting: status === 'pending' };
}
