import * as XLSX from 'xlsx';
import {
  mapToExelDataNegotiation,
  mapToPartner,
  mapToContract,
} from '@/mappers/excel-mapper';

const identifySheetType = (sheetName: string): string => {
  const lowerSheetName = sheetName.toLowerCase();

  if (lowerSheetName.includes('dados')) return 'negotiation';
  if (lowerSheetName.includes('parceiros')) return 'partner';
  if (lowerSheetName.includes('contratos')) return 'contract';

  return 'unknown';
};

export const useReadExcelFile = async (
  file: File
): Promise<Record<string, any[]>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return reject('Erro ao ler o arquivo');

      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetsData: Record<string, any[]> = {};

      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (rawData.length === 0) return;

        const sheetType = identifySheetType(sheetName);
        let transformedData: any[] = [];

        console.log(
          `📊 Processando folha: "${sheetName}" | Tipo: ${sheetType}`
        );

        if (sheetType === 'negotiation') {
          transformedData = rawData.map(mapToExelDataNegotiation);
        } else if (sheetType === 'partner') {
          transformedData = rawData.map(mapToPartner);
        } else if (sheetType === 'contract') {
          transformedData = rawData.map(mapToContract);
        } else {
          console.warn(`⚠️ Tipo de aba desconhecido: ${sheetName}`);
        }

        sheetsData[sheetName] = transformedData;
      });

      resolve(sheetsData);
    };

    reader.readAsArrayBuffer(file);
  });
};
