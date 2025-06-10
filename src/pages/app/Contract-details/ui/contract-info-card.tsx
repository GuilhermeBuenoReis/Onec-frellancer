import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { IContract } from '@/domain/contract/IContract';

export function ContractInfoCard({ contract }: { contract: IContract }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Contrato</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>ID:</strong> {contract.id}
        </div>
        <div>
          <strong>Cliente:</strong>{' '}
          {contract.client ?? 'Cliente não informado!'}
        </div>
        <div>
          <strong>CNPJ:</strong> {contract.cnpj ?? 'CNPJ não informado!'}
        </div>
        <div>
          <strong>Cidade:</strong> {contract.city ?? 'Cidade não informada!'}
        </div>
        <div>
          <strong>Estado:</strong> {contract.state ?? 'Estado não informado!'}
        </div>
        <div>
          <strong>Ano:</strong> {contract.year ?? 'Ano não informado!'}
        </div>
        <div>
          <strong>Status:</strong> {contract.status ?? 'Status não informado!'}
        </div>
        <div>
          <strong>Matéria:</strong>{' '}
          {contract.matter ?? 'Matéria não informado!'}
        </div>
        <div>
          <strong>Forecast:</strong>{' '}
          {contract.forecast ?? 'Forecast não informado!'}
        </div>
        <div>
          <strong>Total de Contrato:</strong>{' '}
          {contract.contractTotal ?? 'Total dos contratos não informado!'}
        </div>
        <div>
          <strong>Porcentagem (%):</strong>{' '}
          {contract.percentage != null
            ? `${contract.percentage}`
            : 'Porcentagem não informado!'}
        </div>
        <div>
          <strong>Guide Médio:</strong>{' '}
          {contract.averageGuide != null
            ? `${contract.averageGuide}`
            : 'Guia média não informado!'}
        </div>
        <div>
          <strong>Parceiro:</strong> {contract.partner ?? '—'}
        </div>
        <div>
          <strong>Comissão Parceiro:</strong>{' '}
          {contract.partnerCommission != null
            ? `${contract.partnerCommission}`
            : 'Comissão Parceiro não informada!'}
        </div>
        <div>
          <strong>Contrato Assinado:</strong>{' '}
          {contract.signedContract ?? 'Contrato Assinado não informada!'}
        </div>
        <div>
          <strong>Contato:</strong>{' '}
          {contract.counter ?? 'Contato não informado!'}
        </div>
        <div>
          <strong>Email:</strong> {contract.email ?? 'Email não informado!'}
        </div>
      </CardContent>
    </Card>
  );
}
