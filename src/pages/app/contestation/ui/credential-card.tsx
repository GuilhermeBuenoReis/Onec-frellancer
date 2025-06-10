import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { ICredentialInfo } from '@/domain/contestation/IContestation';

export function CredentialCard({ info }: { info: ICredentialInfo }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credenciais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <strong>ID:</strong> {info.id}
        </div>
        <div>
          <strong>Chefe de Canal:</strong> {info.channelHead ?? '—'}
        </div>
        <div>
          <strong>Parceria:</strong> {info.partner ?? '—'}
        </div>
        <div>
          <strong>CNPJ:</strong> {info.cnpj ?? '—'}
        </div>
        <div>
          <strong>Indicador:</strong> {info.agentIndicator ?? '—'}
        </div>
      </CardContent>
    </Card>
  );
}
