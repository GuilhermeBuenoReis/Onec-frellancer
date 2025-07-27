'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { UpdateNegotiation200 } from '@/generated';
import { useNegotiationContext } from '../../-context/negotiation-context';
import { ContractDeleteAlert } from './delete-alert';
import { NegotiationEditSheet } from './edit-form-sheet';
import { NegotiationViewAllInformationDialog } from './view-all-information-dialog';

type ModalType = 'details' | 'edit' | 'delete' | null;

interface RowActionsPopoverProps {
  negotiationId: string;
  negotiation: UpdateNegotiation200;
}

export function RowActionsPopover({
  negotiationId,
  negotiation,
}: RowActionsPopoverProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const { setNegotiationId, setNegotiationData } = useNegotiationContext();

  function handleOpenPopover() {
    setNegotiationId(negotiationId);
    setNegotiationData(negotiation);
  }

  return (
    <>
      <Popover onOpenChange={open => open && handleOpenPopover()}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => setActiveModal('details')}
          >
            <Eye className="mr-2 w-4 h-4" />
            Ver detalhes
          </Button>
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

      {activeModal === 'details' && (
        <NegotiationViewAllInformationDialog
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'edit' && (
        <NegotiationEditSheet open onOpenChange={() => setActiveModal(null)} />
      )}
      {activeModal === 'delete' && (
        <ContractDeleteAlert open onOpenChange={() => setActiveModal(null)} />
      )}
    </>
  );
}
