import { Button } from '@/components/ui/button';

export function DeletePartnerButton({
  onDelete,
  isDeleting,
}: {
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
      {isDeleting ? 'Deletando...' : 'Deletar Parceiro'}
    </Button>
  );
}
