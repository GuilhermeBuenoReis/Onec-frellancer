import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { IPartner } from '@/domain/Partner/IPartner';

export function PartnerDetailsDisplay({
  partner,
  onEdit,
  onDelete,
  onClose,
}: {
  partner: IPartner;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const fields = [
    ['Nome', partner.name],
    ['CPF/CNPJ', partner.cpfOrCnpj],
    ['Cidade', partner.city],
    ['Estado', partner.state],
    ['Comissão', partner.commission != null ? `${partner.commission}%` : null],
    ['Portal', partner.portal],
    ['Head Canal', partner.channelHead],
    ['Regional', partner.regional],
    ['Coordenador', partner.coordinator],
    ['Agente', partner.agent],
    ['Indicador', partner.indicator],
    ['Contrato', partner.contract],
    ['Telefone', partner.phone],
    ['E-mail', partner.email],
    ['Responsável', partner.responsible],
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Parceiro</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {fields.map(([label, value]) => (
          <p key={label}>
            <strong>{label}:</strong> {value ?? 'Não informado!'}
          </p>
        ))}

        <div className="flex gap-2 pt-4">
          <Button onClick={onEdit}>Editar</Button>
          <Button variant="destructive" onClick={onDelete}>
            Deletar
          </Button>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
