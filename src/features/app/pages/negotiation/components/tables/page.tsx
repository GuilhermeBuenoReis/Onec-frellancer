'use client';

import { useState } from 'react';
import { negociacoesContratos } from '../../../../../../constants/negotiation-data';
import type { NegotiationFormData } from '../../schemas/negotiation-schema';
import { CreateColumnsParamsNegotiation } from './columns';
import { DataTable } from './data-table';

export default function NegotiationDemoTable() {
  const mappedData = negociacoesContratos.map(n => ({
    id: n.id,
    client: n.cliente,
    cnpj: n.cnpj,
    city: n.cidade,
    state: n.estado,
    date: n.data,
    status: n.status,
    subject: n.materia,
    forecast: n.forecast,
    contractTotal: n.totalContrato,
    percentage: n.porcentagem,
    averageGuide: n.guiaMedia,
    partner: n.parceiro,
    commission: n.comissao,
    contract: n.contrato,
    contact: n.contato,
    email: n.email,
    title: n.titulo,
    user: n.usuario,
    tags: n.tags,
    stage: n.etapa,
    amount: n.valor,
    note: n.observacao,
    partnerId: n.parceiroId,
  }));

  const [_, setNegotiation] = useState<NegotiationFormData[]>();

  function handleEdit(updated: NegotiationFormData) {
    setNegotiation(prev => prev!.map(p => (p.id === updated.id ? updated : p)));
  }

  function handleDelete(id: string) {
    setNegotiation(prev => prev!.filter(p => p.id !== id));
  }

  const columns = CreateColumnsParamsNegotiation({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="min-w-[640px] max-w-7xl mx-auto">
        <DataTable columns={columns} data={mappedData} />
      </div>
    </div>
  );
}
