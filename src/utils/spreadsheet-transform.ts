export type DataType =
  | 'contract'
  | 'negotiation'
  | 'partner'
  | 'pendings'
  | 'portalcontrolls'
  | 'client-receipt';

const normalizeString = (value: unknown): string | null => {
  const str = value != null ? String(value).trim() : '';
  return str === '' ? null : str;
};

const normalizeNumber = (value: unknown): number | null => {
  if (value == null) return null;
  const num =
    typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isNaN(num) ? null : num;
};

export function transformExcelData(rawData: any[], type: DataType): any[] {
  const nonEmptyRaw = rawData.filter(row =>
    Object.values(row).some(v => v != null && String(v).trim() !== '')
  );

  const rows = nonEmptyRaw.map(row => {
    const out: Record<string, any> = {};
    Object.entries(row).forEach(([key, val]) => {
      const normKey = key
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '_');
      out[normKey] = val;
    });
    return out;
  });

  switch (type) {
    case 'contract':
      return rows.map(r => ({
        city: normalizeString(r['cidade']),
        client: normalizeString(r['cliente']),
        state: normalizeString(r['estado']),
        cnpj: normalizeString(r['cnpj']),
        sindic: normalizeString(r['sindic']),
        year: normalizeString(r['ano']),
        matter: normalizeString(r['materia']),
        forecast: normalizeString(r['previsao']),
        contractTotal: normalizeString(r['contrato_total']),
        percentage: normalizeNumber(r['percentual']),
        signedContract: normalizeString(r['contrato_assinado']),
        status: normalizeString(r['status']),
        averageGuide: normalizeNumber(r['media_de_guia']),
        partner: normalizeString(r['parceiro']),
        partnerCommission: normalizeNumber(r['comissao_parceiro']),
        counter: normalizeString(r['contador']),
        email: normalizeString(r['email_responsavel']),
      }));
    case 'negotiation':
      return rows.map(r => ({
        title: normalizeString(r['titulo']),
        client: normalizeString(r['cliente']),
        user: normalizeString(r['usuario']),
        tags: normalizeString(r['tags']),
        step: normalizeString(r['etapa']),
        status: normalizeString(r['status']),
        value: normalizeNumber(r['valor']),
        partnerId: normalizeString(r['parceiro']),
        startsDate: normalizeString(r['data_inicio']),
        observation: normalizeString(r['obs']),
        averageGuide: normalizeNumber(r['media_guia']),
      }));
    case 'partner':
      return rows.map(r => ({
        name: normalizeString(r['nome']),
        cpfOrCnpj: normalizeString(r['cpf_cnpj']),
        city: normalizeString(r['cidade']),
        state: normalizeString(r['estado']),
        commission: normalizeNumber(r['comissao']),
        portal: normalizeString(r['portal']),
        channelHead: normalizeString(r['head_de_canal']),
        regional: normalizeString(r['regional']),
        coordinator: normalizeString(r['coordenador']),
        agent: normalizeString(r['agente']),
        indicator: normalizeString(r['indicador']),
        contract: normalizeString(r['contrato']),
        phone: normalizeString(r['telefone']),
        email: normalizeString(r['email']),
        responsible: normalizeString(r['responsavel']),
      }));
    case 'pendings':
      return rows.map(r => ({
        client: normalizeString(r['cliente']),
        callReason: normalizeString(r['motivo_do_chamado']),
        status: normalizeString(r['status']),
        priority: normalizeString(r['prioridade']),
        responsible: normalizeString(r['responsavel']),
        category: normalizeString(r['categoria']),
        description: normalizeString(r['descricao']),
      }));
    case 'portalcontrolls':
      return rows.map(r => ({
        monthOfCalculation: normalizeString(r['mes_apuracao']),
        competenceMonth: normalizeString(r['mes_competencia']),
        contract: normalizeNumber(r['contrato']),
        enterprise: normalizeString(r['empresa']),
        product: normalizeString(r['produto']),
        percentageHonorary: normalizeNumber(r['percentual_honorario']),
        compensation: normalizeNumber(r['compensacao']),
        honorary: normalizeNumber(r['honorarios']),
        tax: normalizeNumber(r['imposto']),
        tj: normalizeNumber(r['tj']),
        value: normalizeNumber(r['valor_r']),
        situation: normalizeString(r['situacao']),
      }));
    case 'client-receipt':
      return rows.map(r => ({
        receiptDate: normalizeString(r['data']),
        competence: normalizeString(r['comp']),
        cnpj: normalizeString(r['cnpj']),
        clientName: normalizeString(r['cliente']),
        percentage: normalizeNumber(r['percentual']),
        compensationMonth: normalizeString(r['compensacao_mes']),
        honorary: normalizeNumber(r['honorarios']),
        tax: normalizeNumber(r['imposto']),
        status: normalizeString(r['status']),
      }));
    default:
      return rows;
  }
}
