'use client';

import { createContext, useContext, useState } from 'react';
import * as XLSX from 'xlsx';

type ExportType = 'all' | 'filtered';

interface ExportContextType {
  setAllData: (data: any[]) => void;
  setFilteredData: (data: any[]) => void;
  exportToXLSX: (type: ExportType) => Promise<void>;
}

const ExportContext = createContext<ExportContextType | null>(null);

export function ExportProvider({ children }: { children: React.ReactNode }) {
  const [allData, setAllDataState] = useState<any[]>([]);
  const [filteredData, setFilteredDataState] = useState<any[]>([]);

  function setAllData(data: any[]) {
    setAllDataState(data);
  }

  function setFilteredData(data: any[]) {
    setFilteredDataState(data);
  }

  async function exportToXLSX(type: ExportType) {
    const dataToExport = type === 'all' ? allData : filteredData;

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Exportação');

    XLSX.writeFile(workbook, `export-${type}.xlsx`);
  }

  return (
    <ExportContext.Provider
      value={{ setAllData, setFilteredData, exportToXLSX }}
    >
      {children}
    </ExportContext.Provider>
  );
}

export function useExportContext() {
  const context = useContext(ExportContext);
  if (!context) {
    throw new Error('useExportContext deve ser usado dentro de ExportProvider');
  }
  return context;
}
