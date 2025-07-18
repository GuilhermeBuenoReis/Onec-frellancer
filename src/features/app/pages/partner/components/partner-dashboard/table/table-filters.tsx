import type { Table } from '@tanstack/react-table';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Button } from '../../../../../../../components/ui/button';
import { Calendar } from '../../../../../../../components/ui/calendar';
import { Input } from '../../../../../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../../../components/ui/popover';

interface TableFiltersProps {
  table: Table<any>;
}

export function TableFilters({ table }: TableFiltersProps) {
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  const fromDate = dayjs('2020-01-01').toDate();
  const toDate = dayjs().add(1, 'year').endOf('year').toDate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Input
          placeholder="Filtrar por contrato..."
          value={
            (table.getColumn('contract')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('contract')?.setFilterValue(event.target.value)
          }
          className="w-full sm:w-[200px]"
        />

        <Input
          placeholder="Filtrar por empresa..."
          value={
            (table.getColumn('enterprise')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('enterprise')?.setFilterValue(event.target.value)
          }
          className="w-full sm:w-[200px]"
        />

        <Input
          placeholder="Filtrar por produto..."
          value={(table.getColumn('product')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('product')?.setFilterValue(event.target.value)
          }
          className="w-full sm:w-[200px]"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[180px] justify-start text-left cursor-pointer"
            >
              {dateFilter
                ? format(dateFilter, 'dd/MM/yyyy')
                : 'Filtrar por data'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={date => {
                setDateFilter(date);
                table
                  .getColumn('monthOfCalculation')
                  ?.setFilterValue(date ? format(date, 'yyyy-MM') : '');
              }}
              captionLayout="dropdown"
              startMonth={fromDate}
              endMonth={toDate}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
