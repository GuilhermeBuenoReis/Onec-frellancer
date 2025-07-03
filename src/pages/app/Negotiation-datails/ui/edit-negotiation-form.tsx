// Novo componente: UpdateNegotiationSheet, mesma lógica do UpdateContractSheet

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function UpdateNegotiationSheet({
  formData,
  onChange,
  onSubmit,
  isLoading,
}: {
  formData: Partial<INegotiation>;
  onChange: <K extends keyof INegotiation>(field: K, value: INegotiation[K]) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Editar</Button>
      </SheetTrigger>
      <SheetContent side="right" size="lg" className="p-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-center">
            Editar Negociação
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <Input
              value={formData.title ?? ''}
              onChange={e => onChange('title', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <Input
              value={formData.client ?? ''}
              onChange={e => onChange('client', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Usuário</label>
            <Input
              value={formData.user ?? ''}
              onChange={e => onChange('user', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tags</label>
            <Input
              value={formData.tags ?? ''}
              onChange={e => onChange('tags', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Etapa</label>
            <Input
              value={formData.step ?? ''}
              onChange={e => onChange('step', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={formData.status ?? ''}
              onChange={e => onChange('status', e.target.value as any)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Selecione um status</option>
              <option value="Ganho">Ganho</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Perdido">Perdido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Valor (R$)</label>
            <Input
              type="number"
              step="0.01"
              value={formData.value ?? ''}
              onChange={e => onChange('value', Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data Início</label>
            <Input
              type="date"
              value={formData.startsDate?.slice(0, 10) ?? ''}
              onChange={e => onChange('startsDate', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Observação</label>
            <Textarea
              rows={4}
              value={formData.observation ?? ''}
              onChange={e => onChange('observation', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Guia Média</label>
            <Input
              type="number"
              step="0.01"
              value={formData.averageGuide ?? ''}
              onChange={e => onChange('averageGuide', Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Parceiro ID</label>
            <Input
              value={formData.partnerId ?? ''}
              onChange={e => onChange('partnerId', e.target.value)}
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
