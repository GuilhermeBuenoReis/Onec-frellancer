'use client';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import type { IContract } from '@/domain/contract/IContract';

interface UpdateContractSheetProps {
  formData: Partial<IContract>;
  onChange: <K extends keyof IContract>(field: K, value: IContract[K]) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function UpdateContractSheet({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: UpdateContractSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar</Button>
      </SheetTrigger>
      <SheetContent side="right" size="lg" className="p-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-center">
            Editar Contrato
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <Input
              value={formData.client ?? ''}
              onChange={e => onChange('client', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">CNPJ</label>
            <Input
              value={formData.cnpj ?? ''}
              onChange={e => onChange('cnpj', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cidade</label>
            <Input
              value={formData.city ?? ''}
              onChange={e => onChange('city', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <Input
              value={formData.state ?? ''}
              onChange={e => onChange('state', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ano</label>
            <Input
              value={formData.year ?? ''}
              onChange={e => onChange('year', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <Select
              value={formData.status ?? ''}
              onValueChange={val => onChange('status', val as any)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ganho">Ganho</SelectItem>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium">Matéria</label>
            <Input
              value={formData.matter ?? ''}
              onChange={e => onChange('matter', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Forecast</label>
            <Input
              value={formData.forecast ?? ''}
              onChange={e => onChange('forecast', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Total de Contrato
            </label>
            <Input
              value={formData.contractTotal ?? ''}
              onChange={e => onChange('contractTotal', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Porcentagem (%)</label>
            <Input
              type="number"
              value={formData.percentage ?? ''}
              onChange={e =>
                onChange('percentage', Number(e.target.value) as any)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Guide Médio</label>
            <Input
              type="number"
              value={formData.averageGuide ?? ''}
              onChange={e =>
                onChange('averageGuide', Number(e.target.value) as any)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Parceiro</label>
            <Input
              value={formData.partner ?? ''}
              onChange={e => onChange('partner', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Comissão Parceiro
            </label>
            <Input
              type="number"
              value={formData.partnerCommission ?? ''}
              onChange={e =>
                onChange('partnerCommission', Number(e.target.value) as any)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Contrato Assinado
            </label>
            <Input
              value={formData.signedContract ?? ''}
              onChange={e => onChange('signedContract', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contato</label>
            <Input
              value={formData.counter ?? ''}
              onChange={e => onChange('counter', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email ?? ''}
              onChange={e => onChange('email', e.target.value)}
            />
          </div>
        </div>

        <SheetFooter className="flex justify-end gap-2 mt-4">
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
