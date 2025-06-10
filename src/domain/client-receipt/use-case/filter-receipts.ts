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
    return new Date(y, m - 1, d);
  }

  return receipts.filter(r => {
    const { clientName = '', cnpj: rc = '', status: st = '', receiptDate } = r;
    const dateObj = parseDMY(receiptDate);
    const from =
      dateFrom && new Date(...dateFrom.split('-').map(Number).reverse());
    const to = dateTo && new Date(...dateTo.split('-').map(Number).reverse());

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
