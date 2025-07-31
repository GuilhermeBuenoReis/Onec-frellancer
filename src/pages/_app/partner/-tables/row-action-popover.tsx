'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { UpdatePortalControll200 } from '@/generated';
import { usePortalControllContext } from '../-context/portal-controll-context';
import { PortalControllDeleteAlert } from './delete-alert';
import { PortalControllEditSheet } from './edit-form-sheet';
import { PortalControllViewAllInformationDialog } from './view-all-information-dialog';

type ModalType = 'details' | 'edit' | 'delete' | null;

interface RowActionsPopoverPortalControllProps {
  controllId: string;
  controll: UpdatePortalControll200;
}

export function RowActionsPopoverPortalControll({
  controllId,
  controll,
}: RowActionsPopoverPortalControllProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { setControllId, setControllData } = usePortalControllContext();

  function handleOpenPopover() {
    setControllId(controllId);
    setControllData(controll);
  }

  return (
    <>
      <Popover onOpenChange={open => open && handleOpenPopover()}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
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
        <PortalControllViewAllInformationDialog
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'edit' && (
        <PortalControllEditSheet
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'delete' && (
        <PortalControllDeleteAlert
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
