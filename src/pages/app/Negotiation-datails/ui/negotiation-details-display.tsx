import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { INegotiation } from '@/domain/negotiation/INegotiation';
import { ReactNode } from 'react';

export function NegotiationDetailsDisplay({
  nego,
  onEdit,
  onDelete,
  onClose,
  editTrigger,
}: {
  nego: INegotiation;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  editTrigger?: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes da Negociação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p><strong>ID:</strong> {nego.id}</p>
        <p><strong>Título:</strong> {nego.title ?? 'Título não informado!'}</p>
        <p><strong>Cliente:</strong> {nego.client ?? 'Cliente não informado!'}</p>
        <p><strong>Usuário:</strong> {nego.user ?? 'Usuário não informado!'}</p>
        <p><strong>Tags:</strong> {nego.tags ?? 'Tags não informadas!'}</p>
        <p><strong>Etapa:</strong> {nego.step ?? 'Etapa não informada!'}</p>
        <p><strong>Status:</strong> {nego.status || 'Status não informado!'}</p>
        <p><strong>Valor:</strong> {nego.value != null ? nego.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Valor não informado!'}</p>
        <p><strong>Data Início:</strong> {nego.startsDate ? new Date(nego.startsDate).toLocaleDateString('pt-BR') : 'Data de início não informada!'}</p>
        <p><strong>Observação:</strong> {nego.observation ?? 'Observação não informada!'}</p>
        <p><strong>Guia Média:</strong> {nego.averageGuide != null ? nego.averageGuide.toString() : 'Guia média não informada!'}</p>
        <p><strong>Parceiro ID:</strong> {nego.partnerId ?? 'Parceiro não informado!'}</p>
        <div className="flex gap-2 pt-4">
          {editTrigger ?? <Button onClick={onEdit}>Editar</Button>}
          <Button variant="destructive" onClick={onDelete}>Deletar</Button>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
        </div>
      </CardContent>
    </Card>
  );
}