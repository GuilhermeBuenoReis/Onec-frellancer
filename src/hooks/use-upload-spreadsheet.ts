import { useMutation } from '@tanstack/react-query';
import * as XLSX from 'xlsx';

import {
  useCreateClientReceipt,
  useCreateContract,
  useCreateDataNegotiation,
  useCreatePartner,
  useCreatePending,
  useCreatePortalControll,
} from '@/generated';
import {
  type DataType,
  transformExcelData,
} from '@/utils/spreadsheet-transform';

export function useUploadSpreadsheet() {
  const partnerMutation = useCreatePartner();
  const negotiationMutation = useCreateDataNegotiation();
  const contractMutation = useCreateContract();
  const pendingMutation = useCreatePending();
  const portalMutation = useCreatePortalControll();
  const clientReceiptMutation = useCreateClientReceipt();

  const handlers: Record<
    DataType,
    { mutateAsync: (input: any) => Promise<any> }
  > = {
    partner: partnerMutation,
    negotiation: negotiationMutation,
    contract: contractMutation,
    pendings: pendingMutation,
    portalcontrolls: portalMutation,
    'client-receipt': clientReceiptMutation,
  };

  return useMutation({
    mutationFn: async ({
      file,
      type,
      partnerId,
      selectedMonth,
    }: {
      file: File;
      type: DataType;
      partnerId?: string;
      selectedMonth?: string;
    }) => {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
      const sheetIndex = type === 'partner' ? 3 : 0;
      const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
      const raw = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
        range: sheet['!ref'],
        blankrows: false,
      });

      const transformed = transformExcelData(raw, type);
      const mutation = handlers[type];

      for (const record of transformed) {
        const payload: any = { data: { ...record } };

        if (type === 'portalcontrolls') {
          if (partnerId) payload.data.partnerId = partnerId;
          if (selectedMonth) payload.data.month = selectedMonth;
        }

        await mutation.mutateAsync(payload);
      }

      return true;
    },
  });
}
