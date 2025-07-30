'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { GetOnePending200 } from '@/generated';
import { usePendingCallsFiltersContext } from '../-context/pending-calls-filter-context';
import { PendingDeleteAlert } from './pending-delete-alert';
import { PendingEditSheet } from './pending-edit-sheet';
import { PendingViewDialog } from './pending-view-dialog';

type ModalType = 'details' | 'edit' | 'delete' | null;

interface RowActionsPopoverProps {
  data: GetOnePending200;
}

export function RowActionsPopover({ data }: RowActionsPopoverProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const { setSelectedPending } = usePendingCallsFiltersContext();

  function handleOpenPopover() {
    setSelectedPending(data);
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
        <PendingViewDialog open onOpenChange={() => setActiveModal(null)} />
      )}
      {activeModal === 'edit' && (
        <PendingEditSheet open onOpenChange={() => setActiveModal(null)} />
      )}
      {activeModal === 'delete' && (
        <PendingDeleteAlert open onOpenChange={() => setActiveModal(null)} />
      )}
    </>
  );
}
