'use client';

import { createContext, useContext, useMemo } from 'react';

interface MonthContextType {
  availableMonths: string[];
  current: { value: number; month: string };
  previous: { value: number; month: string };
  selectedData: { month: string; value: number }[];
  lastSixMonthsData: { month: string; value: number }[];
  viewType: 'selected' | 'last6';
}

const MonthContext = createContext<MonthContextType | null>(null);

export function MonthProvider({
  children,
  parsedData,
  selectedMonth,
}: {
  children: React.ReactNode;
  parsedData: { month: string; value: number }[];
  selectedMonth?: string;
}) {
  const groupedByMonth = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of parsedData) {
      if (!entry.month) continue;
      map.set(entry.month, (map.get(entry.month) ?? 0) + entry.value);
    }
    return Array.from(map.entries()).map(([month, value]) => ({
      month,
      value,
    }));
  }, [parsedData]);

  const availableMonths = useMemo(() => {
    const unique = [...new Set(groupedByMonth.map(d => d.month))];
    return unique.sort((a, b) => {
      const [ma, ya] = a.split('/').map(Number);
      const [mb, yb] = b.split('/').map(Number);
      return ya !== yb ? ya - yb : ma - mb;
    });
  }, [groupedByMonth]);

  const selectedData = useMemo(() => {
    if (!selectedMonth) return groupedByMonth;
    return groupedByMonth.filter(d => d.month === selectedMonth);
  }, [groupedByMonth, selectedMonth]);

  const current = useMemo(
    () => selectedData[selectedData.length - 1] ?? { value: 0, month: '' },
    [selectedData]
  );
  const previous = useMemo(() => {
    const index = groupedByMonth.findIndex(d => d.month === current.month);
    if (index <= 0) return { value: 0, month: '' };
    return groupedByMonth[index - 1];
  }, [groupedByMonth, current]);

  const viewType: 'selected' | 'last6' = selectedMonth ? 'selected' : 'last6';

  return (
    <MonthContext.Provider
      value={{
        availableMonths,
        selectedData,
        lastSixMonthsData: groupedByMonth,
        current,
        previous,
        viewType,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
}

export const useMonthContext = () => {
  const ctx = useContext(MonthContext);
  if (!ctx)
    throw new Error('useMonthContext precisa estar dentro do MonthProvider');
  return ctx;
};
