'use client';

import { Eye, MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { NegotiationTableData } from '../types/negotiation-type-data';
import { NegotiationDeleteAlert } from './negotiation-delete-alert';
import { NegotiationEditSheet } from './negotiation-edit-sheet';
import { NegotiationViewDialog } from './negotiation-view-dialog';

interface RowActionsPopoverProps {
  data: NegotiationTableData;
  onEdit: (values: NegotiationTableData) => void;
}

export function RowActionsPopover({ data, onEdit }: RowActionsPopoverProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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
            onClick={() => setShowDetails(true)}
          >
            <Eye className="mr-2 w-4 h-4" />
            Ver detalhes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => setShowEdit(true)}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm text-red-500"
            onClick={() => setShowDelete(true)}
          >
            <Trash className="mr-2 w-4 h-4" />
            Deletar
          </Button>
        </PopoverContent>
      </Popover>

      <NegotiationViewDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        data={data}
      />
      <NegotiationEditSheet
        open={showEdit}
        onOpenChange={setShowEdit}
        data={data}
        onSave={onEdit}
      />
      <NegotiationDeleteAlert
        open={showDelete}
        onOpenChange={setShowDelete}
        negotiationId={''}
      />
    </>
  );
}
