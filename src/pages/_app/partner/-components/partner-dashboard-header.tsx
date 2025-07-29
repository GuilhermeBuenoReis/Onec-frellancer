'use client';

import { CalendarIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDashboardProvider } from '../-context/dashboard-context';
import { UploadHonorary } from './upload-honorary';

const monthNames: Record<string, string> = {
  '01': 'Jan',
  '02': 'Fev',
  '03': 'Mar',
  '04': 'Abr',
  '05': 'Mai',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Ago',
  '09': 'Set',
  '10': 'Out',
  '11': 'Nov',
  '12': 'Dez',
};

function formatMonthLabel(monthYear: string) {
  const [month, year] = monthYear.split('/');
  const shortMonth = monthNames[month.padStart(2, '0')] ?? month;
  return `${shortMonth}/${year}`;
}

function sortMonths(months: string[]) {
  return months.sort((a, b) => {
    const [ma, ya] = a.split('/').map(Number);
    const [mb, yb] = b.split('/').map(Number);
    return ya !== yb ? ya - yb : ma - mb;
  });
}

export function DashboardHeader() {
  const { partner, month, availableMonths, updateParam, setTotals, totals } =
    useDashboardProvider();

  const uniqueMonths = useMemo(() => {
    const validMonths = availableMonths.filter((m): m is string => !!m);
    return sortMonths([...new Set(validMonths)]);
  }, [availableMonths]);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <div>
        <h2 className="text-2xl font-semibold">Informações do parceiro!</h2>
        {partner?.name && (
          <p className="text-sm text-muted-foreground">
            Dados referentes a:{' '}
            <span className="font-semibold">{partner.name}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <UploadHonorary />

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setTotals(totals === 'on' ? 'off' : 'on');
          }}
          className="cursor-pointer"
        >
          {totals === 'on' ? 'Ocultar total' : 'Mostrar total'}
        </Button>

        <Select
          onValueChange={value => updateParam('month', value)}
          value={month}
        >
          <SelectTrigger className="w-[160px]">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            {uniqueMonths.map(m => (
              <SelectItem key={m} value={m}>
                {formatMonthLabel(m)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
