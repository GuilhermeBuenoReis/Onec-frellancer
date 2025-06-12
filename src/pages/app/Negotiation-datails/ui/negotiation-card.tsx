import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { INegotiation } from '@/domain/negotiation/INegotiation';

export function NegotiationCard({
  nego,
  onView,
}: {
  nego: INegotiation;
  onView: (id: string) => void;
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{nego.title || '—'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Cliente:</strong> {nego.client || '—'}
        </p>
        <p>
          <strong>Status:</strong> {nego.status || '—'}
        </p>
        <p>
          <strong>Data Início:</strong>{' '}
          {nego.startsDate
            ? new Date(nego.startsDate).toLocaleDateString()
            : '—'}
        </p>
        <Button
          variant="outline"
          onClick={() =>
            onView(nego.id === undefined ? 'Erro ao encontrar o id' : nego.id)
          }
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
