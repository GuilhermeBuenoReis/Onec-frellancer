import { create } from 'zustand';
import type { ExelDataNegotiation } from '@/mappers/excel-mapper';

interface SpreadsheetStore {
  sheetData: Record<string, ExelDataNegotiation[]> | null;
  setSheetData: (data: Record<string, ExelDataNegotiation[]>) => void;
}

export const useSpreadsheetStore = create<SpreadsheetStore>(set => ({
  sheetData: null,
  setSheetData: (data: Record<string, ExelDataNegotiation[]>) =>
    set({ sheetData: data }),
}));
