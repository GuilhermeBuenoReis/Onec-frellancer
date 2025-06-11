import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { NegotiationFormValues as NegotiationFormData } from '@/domain/negotiation/form-schema';

type FieldConfig = {
  field: keyof NegotiationFormData;
  label: string;
  opts?: {
    as?: 'textarea';
    type?: string;
    step?: string;
  };
};

const fields: FieldConfig[] = [
  { field: 'title', label: 'Título' },
  { field: 'client', label: 'Cliente' },
  { field: 'user', label: 'Usuário' },
  { field: 'tags', label: 'Tags' },
  { field: 'step', label: 'Etapa' },
  { field: 'status', label: 'Status' },
  {
    field: 'value',
    label: 'Valor',
    opts: { type: 'number', step: '0.01' },
  },
  { field: 'partnerId', label: 'Parceiro ID' },
  {
    field: 'startsDate',
    label: 'Data Início',
    opts: { type: 'date' },
  },
  {
    field: 'observation',
    label: 'Observação',
    opts: { as: 'textarea' },
  },
  {
    field: 'averageGuide',
    label: 'Guia Média',
    opts: { type: 'number', step: '0.01' },
  },
];

export function CreateNegotiationSheet({
  open,
  setOpen,
  register,
  errors,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  register: any;
  errors: any;
  onSubmit: any;
  isSubmitting: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Nova Negociação</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Criar Negociação</SheetTitle>
        </SheetHeader>
        <form onSubmit={onSubmit} className="space-y-4 p-4">
          {fields.map(({ field, label, opts }) => (
            <div key={field} className="space-y-1">
              <Label className="block text-sm font-medium">{label}</Label>

              {opts?.as === 'textarea' ? (
                <Textarea {...register(field)} className="w-full" />
              ) : (
                <Input
                  {...register(
                    field,
                    opts?.type === 'number'
                      ? { valueAsNumber: true }
                      : undefined
                  )}
                  {...(opts as React.InputHTMLAttributes<HTMLInputElement>)}
                  className="w-full"
                />
              )}

              {errors[field] && (
                <p className="text-red-600 text-sm">{errors[field].message}</p>
              )}
            </div>
          ))}

          <SheetFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
