import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetOnePartner } from '@/generated';
import { Field } from '@/utils/field-convert';
import { useDashboardProvider } from '../-context/dashboard-context';
import { PartnerAction } from './partner-action';

export function InformationPartner() {
  const { partnerId } = useDashboardProvider();
  const { data: getDataPartner } = useGetOnePartner(partnerId);

  if (!getDataPartner) return null;

  const partner = getDataPartner.data;

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg">
              Informações do parceiro: {partner.name ?? '—'}
            </CardTitle>
            <CardDescription>
              Aqui você pode visualizar e atualizar informações do parceiro!
            </CardDescription>
          </div>
          <PartnerAction />
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <Field label="CPF | CNPJ" value={partner.cpfOrCnpj} />
          <Field label="Cidade" value={partner.city} />
          <Field label="Estado" value={partner.state} />
          <Field label="Comissão (%)" value={partner.commission} />
          <Field label="Portal" value={partner.portal} />
          <Field label="Head de Canal" value={partner.channelHead} />
          <Field label="Região" value={partner.regional} />
          <Field label="Coordenador" value={partner.coordinator} />
          <Field label="Agente" value={partner.agent} />
          <Field label="Indicador" value={partner.indicator} />
          <Field label="Contrato" value={partner.contract} />
          <Field label="Telefone" value={partner.phone} />
          <Field label="Responsável" value={partner.responsible} />
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>
              <strong>Email:</strong> {partner.email || '—'}
            </span>
            <span>
              <strong>Portal:</strong> {partner.portal || '—'}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
