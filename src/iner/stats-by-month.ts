export type PartnerMonthlyStats = {
  month: number;
  value: string;
  fee: string;
  compensation: string;
  tax: string;
  courtFee: string;
  feePercentage: string;
};

export const statsByMonth: PartnerMonthlyStats[] = [
  {
    month: 1,
    value: '1276799.95',
    fee: '9902587.08',
    compensation: '35360199.30',
    tax: '1694090.64',
    courtFee: '870568.54',
    feePercentage: '1376.00',
  },
  {
    month: 2,
    value: '3310452.12',
    fee: '10785001.47',
    compensation: '39764320.12',
    tax: '2582130.98',
    courtFee: '1412350.23',
    feePercentage: '1563.00',
  },
  {
    month: 3,
    value: '5290876.00',
    fee: '13025487.20',
    compensation: '42120000.00',
    tax: '2834210.77',
    courtFee: '2188654.11',
    feePercentage: '2245.00',
  },
  {
    month: 4,
    value: '7250900.10',
    fee: '18600000.00',
    compensation: '55875000.50',
    tax: '3998900.00',
    courtFee: '3240000.00',
    feePercentage: '2590.00',
  },
  {
    month: 5,
    value: '9320100.50',
    fee: '20100000.00',
    compensation: '60780000.00',
    tax: '4745000.32',
    courtFee: '4430000.00',
    feePercentage: '3190.00',
  },
];
