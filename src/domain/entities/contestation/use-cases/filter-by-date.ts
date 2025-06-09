import type { IClientContestation } from '../IContestation';

export function filterByDate(
  clients: IClientContestation[],
  start?: Date,
  end?: Date
): IClientContestation[] {
  return clients.filter(c => {
    if (!c.competenceMonth) return false;
    const date = new Date(c.competenceMonth);
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  });
}
