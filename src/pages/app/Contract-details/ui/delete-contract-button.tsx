import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

export function DeleteContractButton({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
      {isDeleting ? (
        'Deletando...'
      ) : (
        <>
          <Trash className="mr-1" />
          Deletar
        </>
      )}
    </Button>
  );
}
