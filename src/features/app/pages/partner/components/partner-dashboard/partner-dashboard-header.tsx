'use client';

import { Button } from '../../../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../../../../../components/ui/select';

const infoOptions = [
  { value: 'value', label: 'Valor' },
  { value: 'fee', label: 'Honorário' },
  { value: 'compensation', label: 'Compensação' },
  { value: 'tax', label: 'Imposto' },
  { value: 'courtFee', label: 'Taxa judicial' },
  { value: 'feePercentage', label: '% Honorário' },
];

interface DashboardHeaderProps {
  name: string;
  infoType: string;
  onChange: (value: string) => void;
  showTotals: boolean;
  onToggleTotals: () => void;
}

export function DashboardHeader({
  name,
  infoType,
  onChange,
  showTotals,
  onToggleTotals,
}: DashboardHeaderProps) {
  return (
    <section
      className="w-full p-4 space-y-2"
      aria-label="Partner overview controls"
    >
      <header className="w-full flex flex-col justify-between sm:flex-row sm:items-center gap-2">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold">
            {infoOptions.find(i => i.value === infoType)?.label} Visão geral
          </h2>
          <p className="text-sm text-muted-foreground">
            {name === 'Select a partner'
              ? 'Nenhum parceiro selecionado.'
              : `Mostrando dados de ${name}.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onToggleTotals();
            }}
            type="button"
          >
            {showTotals ? 'Ocultar totais' : 'Mostrar totais'}
          </Button>

          <Select value={infoType} onValueChange={onChange}>
            <SelectTrigger className="cursor-pointer">Fitlro</SelectTrigger>
            <SelectContent>
              {infoOptions.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
    </section>
  );
}
