'use client';

import { useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../../../components/ui/dialog';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const [loading, setLoading] = useState(false);

  function handleExport(type: 'all' | 'filtered') {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      console.log(
        `Exportando ${type === 'all' ? 'todos' : 'filtrados'} os dados`
      );
    }, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar dados da tabela</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Deseja exportar todos os dados ou apenas os filtrados?
          </p>

          <div className="flex flex-col gap-2">
            <Button onClick={() => handleExport('filtered')} disabled={loading}>
              Exportar filtrados
            </Button>
            <Button
              onClick={() => handleExport('all')}
              disabled={loading}
              variant="outline"
            >
              Exportar todos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
