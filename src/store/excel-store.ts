import { create } from 'zustand';

interface ExcelStore {
  excelData: Record<string, any[]>;
  setExcelData: (data: Record<string, any[]>) => void;
}

export const useExcelStore = create<ExcelStore>(set => ({
  excelData: {},
  setExcelData: data => set({ excelData: data }),
}));
