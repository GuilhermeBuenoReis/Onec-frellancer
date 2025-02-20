import { create } from 'zustand';

interface SpreadsheetStore {
  sheetData: string | null;
  setSheetData: (data: string) => void;
}

export function useSpreadsheetStore() {
  return create<SpreadsheetStore>(set => ({
    sheetData: null,
    setSheetData: (data: string) => set({ sheetData: data }),
  }));
}
