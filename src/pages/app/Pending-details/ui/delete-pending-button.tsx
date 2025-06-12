import { Button } from '@/components/ui/button';

export function DeletePendingButton({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
      {isDeleting ? 'Excluindo…' : 'Deletar'}
    </Button>
  );
}
