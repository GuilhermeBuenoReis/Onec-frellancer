import { Button } from '@/components/ui/button';

export function DeleteNegotiationButton({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
      {isDeleting ? 'Deletando...' : 'Deletar'}
    </Button>
  );
}
