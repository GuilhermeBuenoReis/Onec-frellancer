'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { UpdatePortalControll200 } from '@/generated';
import { useDashboardProvider } from '../-context/dashboard-context';
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
  const [open, setOpen] = useState(false);
  const { setSelectedControllId, setSelectedControllData } =
    useDashboardProvider();

  // só vamos travar propagação nos botões do conteúdo (não no trigger)
  const stopBubbling = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const handleSelect = useCallback(
    (type: ModalType) => {
      setSelectedControllId(controllId);
      setSelectedControllData(controll);
      setOpen(false);
      setActiveModal(type);
    },
    [controllId, controll, setSelectedControllData, setSelectedControllId]
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            // sem preventDefault aqui!
            onClick={e => e.stopPropagation()}
            data-partner-actions
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-44 p-1"
          onOpenAutoFocus={e => e.preventDefault()} // ok manter pra não roubar foco
          data-partner-actions
        >
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={e => {
              stopBubbling(e);
              handleSelect('details');
            }}
            data-partner-actions
          >
            <Eye className="mr-2 w-4 h-4" />
            Ver detalhes
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={e => {
              stopBubbling(e);
              handleSelect('edit');
            }}
            data-partner-actions
          >
            <Pencil className="mr-2 w-4 h-4" />
            Editar
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-sm text-red-500"
            onClick={e => {
              stopBubbling(e);
              handleSelect('delete');
            }}
            data-partner-actions
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
