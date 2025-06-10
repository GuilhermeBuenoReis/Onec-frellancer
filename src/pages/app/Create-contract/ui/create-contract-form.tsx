import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateContractForm } from '@/hooks/useCreateContractForm';

export function CreateContractForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    isSubmitting,
  } = useCreateContractForm();

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Mapeia cada campo explicitamente */}
      <div className="flex flex-col">
        <label className="mb-2">Cliente</label>
        <Input {...register('client')} placeholder="Nome do cliente" />
        {errors.client && (
          <span className="text-red-500 text-sm">{errors.client.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Cidade</label>
        <Input {...register('city')} placeholder="Cidade" />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Estado</label>
        <Input {...register('state')} placeholder="Estado" />
        {errors.state && (
          <span className="text-red-500 text-sm">{errors.state.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">CNPJ</label>
        <Input {...register('cnpj')} placeholder="CNPJ" />
        {errors.cnpj && (
          <span className="text-red-500 text-sm">{errors.cnpj.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Síndico</label>
        <Input {...register('sindic')} placeholder="Síndico" />
        {errors.sindic && (
          <span className="text-red-500 text-sm">{errors.sindic.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Ano</label>
        <Input {...register('year')} placeholder="Ano" />
        {errors.year && (
          <span className="text-red-500 text-sm">{errors.year.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Matéria</label>
        <Input {...register('matter')} placeholder="Matéria" />
        {errors.matter && (
          <span className="text-red-500 text-sm">{errors.matter.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Previsão</label>
        <Input {...register('forecast')} placeholder="Previsão" />
        {errors.forecast && (
          <span className="text-red-500 text-sm">
            {errors.forecast.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Total do Contrato</label>
        <Input {...register('contractTotal')} placeholder="Total do contrato" />
        {errors.contractTotal && (
          <span className="text-red-500 text-sm">
            {errors.contractTotal.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Porcentagem (%)</label>
        <Input
          {...register('percentage', { valueAsNumber: true })}
          type="number"
          placeholder="Porcentagem"
        />
        {errors.percentage && (
          <span className="text-red-500 text-sm">
            {errors.percentage.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Contrato Assinado</label>
        <Input
          {...register('signedContract')}
          placeholder="Contrato assinado"
        />
        {errors.signedContract && (
          <span className="text-red-500 text-sm">
            {errors.signedContract.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Status</label>
        <Input {...register('status')} placeholder="Status" />
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Guia Média</label>
        <Input
          {...register('averageGuide', { valueAsNumber: true })}
          type="number"
          placeholder="Guia média"
        />
        {errors.averageGuide && (
          <span className="text-red-500 text-sm">
            {errors.averageGuide.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Parceiro</label>
        <Input {...register('partner')} placeholder="Parceiro" />
        {errors.partner && (
          <span className="text-red-500 text-sm">{errors.partner.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Comissão do Parceiro</label>
        <Input
          {...register('partnerCommission', { valueAsNumber: true })}
          type="number"
          placeholder="Comissão do parceiro"
        />
        {errors.partnerCommission && (
          <span className="text-red-500 text-sm">
            {errors.partnerCommission.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Contratante</label>
        <Input {...register('counter')} placeholder="Contratante" />
        {errors.counter && (
          <span className="text-red-500 text-sm">{errors.counter.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-2">E-mail</label>
        <Input {...register('email')} placeholder="E-mail" />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Criando...' : 'Criar Contrato'}
        </Button>
      </div>
    </form>
  );
}
