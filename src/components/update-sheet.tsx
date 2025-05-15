import type React from 'react';
import type { FormEvent } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type UpdateSheetProps<T extends Record<string, any>> = {
  title: string;
  formData: Partial<T>;
  onChange: (field: keyof T, value: T[keyof T]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  trigger: React.ReactNode;
  isLoading?: boolean;
};

export function UpdateSheet<T extends Record<string, any>>({
  title,
  formData,
  onChange,
  onSubmit,
  trigger,
  isLoading = false,
}: UpdateSheetProps<T>) {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side="right" size="lg" className="w-[400px] sm:w-[540px]">
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>

          <form
            onSubmit={onSubmit}
            className="flex-1 overflow-y-auto mt-4 space-y-4 px-4"
          >
            {Object.entries(formData).map(([field, value]) => (
              <div key={field} className="flex flex-col">
                <Label htmlFor={field}>{field}</Label>
                <Input
                  id={field}
                  name={field}
                  value={value as string}
                  onChange={e =>
                    onChange(field as keyof T, e.target.value as T[keyof T])
                  }
                />
              </div>
            ))}

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 mb-2 w-full cursor-pointer"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
