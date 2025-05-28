// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ExcelUtils {
  static normalizeString(value: any): string | null {
    if (value == null) return null;
    const str = String(value).trim();
    return str === '' ? null : str;
  }

  static normalizeNumber(value: any): number | null {
    if (value == null) return null;
    const num = Number(String(value).replace(',', '.'));
    return Number.isNaN(num) ? null : num;
  }

  static formatDateBR(value?: any): string | null {
    if (value == null) return null;
    if (value instanceof Date) {
      return value.toLocaleDateString('pt-BR');
    }
    if (typeof value === 'number') {
      const offset = value < 61 ? 1 : 2;
      const jsTime = (value - offset) * 86400 * 1000;
      const date = new Date(jsTime);
      return Number.isNaN(date.getTime())
        ? null
        : date.toLocaleDateString('pt-BR');
    }
    const str = String(value).trim();
    const parts = str.split('/').map(Number);
    if (parts.length === 3) {
      const [d, m, y] = parts;
      const date = new Date(y, m - 1, d);
      return Number.isNaN(date.getTime())
        ? null
        : date.toLocaleDateString('pt-BR');
    }
    const timestamp = Date.parse(str);
    return Number.isNaN(timestamp)
      ? null
      : new Date(timestamp).toLocaleDateString('pt-BR');
  }

  static transformContratos(rows: any[]): any[] {
    return rows.map(r => ({
      city: this.normalizeString(r['Cidade']),
      client: this.normalizeString(r['CLIENTE']),
      state: this.normalizeString(r['Estado']),
      cnpj: this.normalizeString(r['CNPJ']),
      sindic: this.normalizeString(r['Sindic']),
      year: this.normalizeString(r['ANO']),
      matter: this.normalizeString(r['MATÉRIA']),
      forecast: this.normalizeString(r['Previsao']),
      contractTotal: this.normalizeString(r['CONTRATO TOTAL']),
      percentage: this.normalizeNumber(r['PERCENTUAL']),
      signedContract: this.normalizeString(r['CONTRATO ASSINADO']),
      status: this.normalizeString(r['STATUS']),
      averageGuide: this.normalizeNumber(r['MÉDIA DE GUIA']),
      partner: this.normalizeString(r['PARCEIRO']),
      partnerCommission: this.normalizeNumber(r['Comissão parceiro']),
      counter: this.normalizeString(r['Contador']),
      email: this.normalizeString(r['e-mail responsável']),
    }));
  }

  static transformDados(rows: any[]): any[] {
    return rows.map(r => ({
      title: this.normalizeString(r['Título']),
      client: this.normalizeString(r['Cliente']),
      user: this.normalizeString(r['Usuário']),
      tags: this.normalizeString(r['Tags']),
      step: this.normalizeString(r['Etapaa']),
      status: this.normalizeString(r['Status']),
      value: this.normalizeNumber(r['Valor']),
      partnerId: this.normalizeString(r['PARCEIRO']),
      startsDate: this.normalizeString(r['Data Início']),
      observation: this.normalizeString(r['OBS']),
      averageGuide: this.normalizeNumber(r['Média Guia']),
    }));
  }

  static transformParceiros(rows: any[]): any[] {
    return rows.map(r => ({
      name: this.normalizeString(r['NOME']),
      cpfOrCnpj: this.normalizeString(r['CPF/CNPJ']),
      city: this.normalizeString(r['CIDADE']),
      state: this.normalizeString(r['ESTADO']),
      commission: this.normalizeNumber(r['COMISSÃO']),
      portal: this.normalizeString(r['PORTAL']),
      channelHead: this.normalizeString(r['Head de Canal']),
      regional: this.normalizeString(r['REGIONAL']),
      coordinator: this.normalizeString(r['COORDENADOR']),
      agent: this.normalizeString(r['AGENTE']),
      indicator: this.normalizeString(r['INDICADOR']),
      contract: this.normalizeString(r['CONTRATO']),
      phone: this.normalizeString(r['TELEFONE']),
      email: this.normalizeString(r['E-MAIL']),
      responsible: this.normalizeString(r['responsável']),
    }));
  }

  static transformPendencias(rows: any[]): any[] {
    return rows.map(r => ({
      client: this.normalizeString(r['Cliente']),
      callReason: this.normalizeString(r['Motivo do Chamado']),
      status: this.normalizeString(r['Status']),
      priority: this.normalizeString(r['Prioridade']),
      responsible: this.normalizeString(r['Responsável']),
      category: this.normalizeString(r['Categoria']),
      description: this.normalizeString(r['Descrição']),
    }));
  }

  static transformControle(rows: any[]): any[] {
    return rows.map(r => ({
      monthOfCalculation: this.normalizeString(r['Mês Apuração']),
      competenceMonth: this.normalizeString(r['Mês Competência']),
      contract: this.normalizeNumber(r['Contrato']),
      enterprise: this.normalizeString(r['Empresa']),
      product: this.normalizeString(r['Produto']),
      percentageHonorary: this.normalizeNumber(r['% Honorario']),
      compensation: this.normalizeNumber(r['Compensação']),
      honorary: this.normalizeNumber(r['Honorários']),
      tax: this.normalizeNumber(r['Imposto']),
      value: this.normalizeNumber(r['Valor R$']),
      situation: this.normalizeString(r['Situação']),
    }));
  }

  static transformClientReceipt(rows: any[]): any[] {
    return rows.map(r => ({
      receiptDate: this.formatDateBR(r['data']),
      competence: this.formatDateBR(r['COMP']),
      cnpj: this.normalizeString(r['CNPJ']),
      clientName: this.normalizeString(r['CLIENTE']),
      percentage: this.normalizeNumber(r['PERCENTUAL']),
      compensationMonth: this.normalizeString(r[' COMPENSAÇÃO MÊS ']),
      honorary: this.normalizeNumber(r[' HONORÁRIOS ']),
      tax: this.normalizeNumber(r[' IMPOSTO ']),
      status: this.normalizeString(r[' STATUS ']),
    }));
  }
}
