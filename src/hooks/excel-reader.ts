export type ReaderType = 'partner' | 'negotiation' | 'contract';

export function unifiedReader(rawData: any[], type: ReaderType) {
  const normalizeString = (value: any) =>
    value !== undefined && value !== null ? String(value).trim() : null;

  switch (type) {
    case 'partner':
      return rawData.map((row: any) => ({
        name: normalizeString(row['NOME']) || '',
        cpfOrCnpj: normalizeString(row['CPF/CNPJ']) || '',
        city: normalizeString(row['CIDADE']),
        state: normalizeString(row['ESTADO']),
        commission: row['COMISSÃO']
          ? Number(row['COMISSÃO'].toString().replace(',', '.'))
          : null,
        portal: normalizeString(row['PORTAL']),
        channelHead: normalizeString(row['Head de Canal']),
        regional: normalizeString(row['REGIONAL']),
        coordinator: normalizeString(row['COORDENADOR']),
        agent: normalizeString(row['AGENTE']),
        indicator: normalizeString(row['INDICADOR']),
        contract: normalizeString(row['CONTRATO']),
        phone: normalizeString(row['TELEFONE']),
        email: normalizeString(row['E-MAIL']),
        responsible: normalizeString(row['responsável']),
      }));

    case 'negotiation':
      return rawData.map((row: any) => ({
        title: normalizeString(row['Título']) || '',
        client: normalizeString(row['Cliente']) || '',
        user: normalizeString(row['Usuário']) || '',
        tags: normalizeString(row['Tags']) || '',
        step: normalizeString(row['Etapaa']) || '',
        status: normalizeString(row['Status']) || '',
        value: row['Valor']
          ? Number(row['Valor'].toString().replace(',', '.'))
          : 0,
        partnerId: normalizeString(row['PARCEIRO']) || '',
        startsDate: row['Data Início'] ? String(row['Data Início']) : null,
        observation: normalizeString(row['OBS']),
        averageGuide: row['Média Guia']
          ? Number(row['Média Guia'].toString().replace(',', '.'))
          : null,
      }));

    case 'contract':
      return rawData.map((contract: any) => ({
        city: contract['Cidade'] || null,
        client: contract['CLIENTE'] || null,
        state: contract['Estado'] || null,
        cnpj: contract['CNPJ'] || null,
        sindic: contract['Sindic'] || null,
        year: contract['ANO'] ? String(contract['ANO']) : null,
        matter: contract['MATÉRIA'] || null,
        forecast: contract['Previsao'] ? String(contract['Previsao']) : null,
        contractTotal: contract['CONTRATO TOTAL']
          ? String(contract['CONTRATO TOTAL'])
          : null,
        percentage: contract['PERCENTUAL']
          ? Number(contract['PERCENTUAL'].toString().replace(',', '.'))
          : null,
        signedContract: contract['CONTRATO ASSINADO'] || null,
        status: contract['STATUS'] || null,
        averageGuide: contract['MÉDIA DE GUIA']
          ? Number(contract['MÉDIA DE GUIA'].toString().replace(',', '.'))
          : null,
        partner: contract['PARCEIRO'] || null,
        partnerCommission: contract['Comissão parceiro']
          ? Number(contract['Comissão parceiro'].toString().replace(',', '.'))
          : null,
        counter: contract['Contador'] || null,
        email: contract['e-mail responsável'] || null,
      }));

    default:
      throw new Error(
        "Tipo inválido especificado. Use 'partner', 'negotiation' ou 'contract'."
      );
  }
}
