'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import type { GetContestationById200 } from '@/generated';
import { useContestationFiltersContext } from '../-context/contestation-filters-context';
import { ContestationDeleteAlert } from './delete-contestation';
import { ContestationEditSheet } from './edit-form-sheet';
import { ContestationViewDialog } from './view-all-information';

type ModalType = 'details' | 'edit' | 'delete' | null;

interface ContestationActionColumnProps {
  data: GetContestationById200;
}

export function ContestationActionColumn({
  data,
}: ContestationActionColumnProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { setSelectedContestation } = useContestationFiltersContext();

  function handleOpenPopover() {
    setSelectedContestation(data);
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
        <ContestationViewDialog
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'edit' && (
        <ContestationEditSheet open onOpenChange={() => setActiveModal(null)} />
      )}
      {activeModal === 'delete' && (
        <ContestationDeleteAlert
          open
          onOpenChange={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
