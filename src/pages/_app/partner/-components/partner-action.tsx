import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DeletePartnerAlert } from './delete-partner';
import { UpdatePartner } from './update-partner';

type ModalType = 'edit' | 'delete' | null;

export function PartnerAction() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => setActiveModal('edit')}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-red-500"
            onClick={() => setActiveModal('delete')}
          >
            <Trash className="mr-2 w-4 h-4" />
            Deletar
          </Button>
        </PopoverContent>
      </Popover>

      {activeModal === 'edit' && (
        <UpdatePartner open onOpenChange={() => setActiveModal(null)} />
      )}
      {activeModal === 'delete' && (
        <DeletePartnerAlert open onOpenChange={() => setActiveModal(null)} />
      )}
    </>
  );
}
