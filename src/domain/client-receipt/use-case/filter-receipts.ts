import type { IClientReceipt } from '../IClientReceipt';

export function filterReceipts(
  receipts: IClientReceipt[],
  filters: {
    name?: string;
    cnpj?: string;
    status?: 'PAGO' | 'NÃO PAGO' | 'Todos';
    dateFrom?: string;
    dateTo?: string;
  }
): IClientReceipt[] {
  const { name, cnpj, status, dateFrom, dateTo } = filters;

  function parseDMY(str?: string) {
    if (!str) return null;
    const [d, m, y] = str.split('/').map(Number);
    if ([d, m, y].some(n => Number.isNaN(n))) return null;
    return new Date(y, m - 1, d);
  }

  function parseYMD(str?: string) {
    if (!str) return null;
    const [y, m, d] = str.split('-').map(Number);
    if ([y, m, d].some(n => Number.isNaN(n))) return null;
    return new Date(y, m - 1, d);
  }

  return receipts.filter(r => {
    const { clientName = '', cnpj: rc = '', status: st = '', receiptDate } = r;

    const dateObj = parseDMY(receiptDate);
    const from = parseYMD(dateFrom);
    const to = parseYMD(dateTo);

    const matchName = name
      ? clientName.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchCnpj = cnpj ? rc.includes(cnpj) : true;
    const matchStatus = status && status !== 'Todos' ? st === status : true;
    const matchFrom = from && dateObj ? dateObj >= from : true;
    const matchTo = to && dateObj ? dateObj <= to : true;

    return matchName && matchCnpj && matchStatus && matchFrom && matchTo;
  });
}
