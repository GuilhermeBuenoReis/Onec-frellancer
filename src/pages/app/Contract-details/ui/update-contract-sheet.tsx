import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { IContract } from '@/domain/entities/contract/IContract';

export function UpdateContractSheet({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: {
  formData: Partial<IContract>;
  onChange: <K extends keyof IContract>(field: K, value: IContract[K]) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar</Button>
      </SheetTrigger>
      <SheetContent side="right" size="lg" className="p-3 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-center text-2xl font-semibold">
            Editar Contrato
          </SheetTitle>
        </SheetHeader>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <input
              type="text"
              placeholder="Cliente não informado!"
              value={formData.client ?? ''}
              onChange={e => onChange('client', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">CNPJ</label>
            <input
              type="text"
              placeholder="CNPJ não informado!"
              value={formData.cnpj ?? ''}
              onChange={e => onChange('cnpj', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cidade</label>
            <input
              type="text"
              placeholder="Cidade não informada!"
              value={formData.city ?? ''}
              onChange={e => onChange('city', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              placeholder="Estado não informado!"
              value={formData.state ?? ''}
              onChange={e => onChange('state', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ano</label>
            <input
              type="text"
              placeholder="Ano não informado!"
              value={formData.year ?? ''}
              onChange={e => onChange('year', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              type="text"
              placeholder="Status não informado!"
              value={formData.status ?? ''}
              onChange={e => onChange('status', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Matéria</label>
            <input
              type="text"
              placeholder="Matéria não informada!"
              value={formData.matter ?? ''}
              onChange={e => onChange('matter', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Forecast</label>
            <input
              type="text"
              placeholder="Forecast não informado!"
              value={formData.forecast ?? ''}
              onChange={e => onChange('forecast', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Total de Contrato
            </label>
            <input
              type="text"
              placeholder="Total não informado!"
              value={formData.contractTotal ?? ''}
              onChange={e => onChange('contractTotal', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Porcentagem (%)</label>
            <input
              type="number"
              placeholder="Porcentagem não informada!"
              value={formData.percentage ?? undefined}
              onChange={e => onChange('percentage', Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Guide Médio</label>
            <input
              type="number"
              placeholder="Guide médio não informado!"
              value={formData.averageGuide ?? undefined}
              onChange={e => onChange('averageGuide', Number(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Parceiro</label>
            <input
              type="text"
              placeholder="Parceiro não informado!"
              value={formData.partner ?? ''}
              onChange={e => onChange('partner', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Comissão Parceiro
            </label>
            <input
              type="number"
              placeholder="Comissão não informada!"
              value={formData.partnerCommission ?? undefined}
              onChange={e =>
                onChange('partnerCommission', Number(e.target.value))
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Contrato Assinado
            </label>
            <input
              type="text"
              placeholder="Informação de assinatura não informada!"
              value={formData.signedContract ?? ''}
              onChange={e => onChange('signedContract', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contato</label>
            <input
              type="text"
              placeholder="Contato não informado!"
              value={formData.counter ?? ''}
              onChange={e => onChange('counter', e.target.value)}
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <input
              type="email"
              placeholder="Email não informado!"
              value={formData.email ?? ''}
              onChange={e => onChange('email', e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </form>

        <SheetFooter className="flex justify-end gap-2">
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
          <SheetClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
