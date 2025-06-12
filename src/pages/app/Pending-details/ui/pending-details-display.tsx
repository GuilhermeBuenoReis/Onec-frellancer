import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { IPending } from '@/domain/pending/IPending';

export function PendingDetailsDisplay({ pending }: { pending: IPending }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendência #{pending.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p>
          <strong>Cliente:</strong> {pending.client}
        </p>
        <p>
          <strong>Motivo:</strong> {pending.callReason}
        </p>
        <p>
          <strong>Prioridade:</strong> {pending.priority}
        </p>
        <p>
          <strong>Responsável:</strong> {pending.responsible}
        </p>
        <p>
          <strong>Categoria:</strong> {pending.category}
        </p>
        <p>
          <strong>Descrição:</strong> {pending.description}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span
            className={`px-2 py-1 rounded ${
              pending.status === 'Aberto'
                ? 'bg-green-100 text-green-800'
                : pending.status === 'Concluído'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {pending.status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
