import { useMemo } from 'react';
import { statsByMonth } from '../../../../../constants/stats-by-month';

const monthNames = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function useDashboardData(infoType: string) {
  const validTypes = [
    'value',
    'fee',
    'compensation',
    'tax',
    'courtFee',
    'feePercentage',
  ];

  const type = validTypes.includes(infoType) ? infoType : 'value';

  const data = useMemo(() => {
    return statsByMonth.map(entry => {
      const raw = entry[type as keyof typeof entry];

      const value = raw ? parseFloat(raw) : 0;

      return {
        month: monthNames[entry.month],
        value: Number.isNaN(value) ? 0 : value,
      };
    });
  }, [type]);

  const current = data[data.length - 1] || { value: 0 };
  const previous = data[data.length - 2] || { value: 0 };

  return {
    selectedData: data,
    current,
    previous,
  };
}
