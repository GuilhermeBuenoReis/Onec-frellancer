import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

// Converte números Excel (serial), objetos Date e strings para data em formato BR
export const formatDateBR = (value?: any): string => {
  if (value === undefined || value === null) {
    return 'Data não informada';
  }

  // Se já for Date (usando cellDates:true e raw:true)
  if (value instanceof Date) {
    return value.toLocaleDateString('pt-BR');
  }

  // Se vier como número (serial Excel)
  if (typeof value === 'number') {
    const offset = value < 61 ? 1 : 2; // ajuste bug de 1900
    const jsTime = (value - offset) * 86400 * 1000;
    const date = new Date(jsTime);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('pt-BR');
    }
    return 'Data não informada';
  }

  // Outros tipos: tenta parsear como string ISO ou dd/mm/yyyy
  const str = String(value).trim();
  if (!str) return 'Data não informada';

  // dd/mm/yyyy
  const parts = str.split('/');
  if (parts.length === 3) {
    const [d, m, y] = parts.map(part => Number(part));
    if (
      Number.isInteger(d) &&
      d >= 1 &&
      d <= 31 &&
      Number.isInteger(m) &&
      m >= 1 &&
      m <= 12 &&
      Number.isInteger(y)
    ) {
      const date = new Date(y, m - 1, d);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString('pt-BR');
      }
    }
  }

  // Fallback para ISO ou outros formatos
  const timestamp = Date.parse(str);
  if (!Number.isNaN(timestamp)) {
    return new Date(timestamp).toLocaleDateString('pt-BR');
  }

  return 'Data não informada';
};

const normalizeNumber = (value: any): number | null =>
  value === undefined || value === null
    ? null
    : Number(String(value).replace(',', '.')) || null;

export type DataType =
  | 'Contratos'
  | 'Dados'
  | 'Parceiros'
  | 'Pendencias'
  | 'Controle'
  | 'ClientReceipt';

export interface FileUploadProps {
  onFileUpload: (file: File, fileName: string) => void;
}

const transformExcelData = (rawData: any[], dataType: DataType) => {
  switch (dataType) {
    case 'Contratos':
    case 'Dados':
    case 'Parceiros':
    case 'Pendencias':
    case 'Controle':
      return rawData;
    case 'ClientReceipt':
      return rawData.map((row: any) => ({
        receiptDate: formatDateBR(row['data']),
        competence: formatDateBR(row['COMP']),
        cnpj: String(row['CNPJ']),
        clientName: String(row['CLIENTE']),
        percentage: normalizeNumber(row['PERCENTUAL']),
        compensationMonth: String(row[' COMPENSAÇÃO MÊS ']),
        honorary: normalizeNumber(row[' HONORÁRIOS ']),
        tax: normalizeNumber(row[' IMPOSTO ']),
        status: String(row[' STATUS ']),
      }));
    default:
      return rawData;
  }
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [dataType, setDataType] = useState<DataType>('Contratos');

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = e => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { cellDates: true, type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
      });
      setTransformedData(transformExcelData(jsonData, dataType));
      setIsUploading(false);
      setProgress(100);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmitUploadFile = async (): Promise<void> => {
    setSending(true);
    const endpointMap: Record<DataType, string> = {
      Contratos: 'http://localhost:3333/contract',
      Dados: 'http://localhost:3333/negotiation',
      Parceiros: 'http://localhost:3333/partners',
      Pendencias: 'http://localhost:3333/pendings',
      Controle: 'http://localhost:3333/portalcontrolls',
      ClientReceipt: 'http://localhost:3333/client-receipt',
    };
    const endpoint = endpointMap[dataType];
    let sent = 0;
    try {
      for (const record of transformedData) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (response.ok) sent++;
      }
      toast.success(`${sent} registros enviados com sucesso!`);
    } catch (error) {
      toast.error('Erro ao enviar dados');
      console.error('Upload error:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-3">
        <Label htmlFor="data-type" className="block mb-2">
          <span className="text-lg text-gray-700">Tipo de dados:</span>
        </Label>
        <select
          id="data-type"
          value={dataType}
          onChange={e => setDataType(e.target.value as DataType)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Contratos">Contratos</option>
          <option value="Dados">Negociações</option>
          <option value="Parceiros">Parceiros</option>
          <option value="Pendencias">Pendências</option>
          <option value="Controle">Controle</option>
          <option value="ClientReceipt">Client Receipt</option>
        </select>
        <Label htmlFor="file-upload" className="w-full cursor-pointer">
          <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
            <p className="text-gray-600 text-center text-lg">
              Clique ou arraste o arquivo aqui
            </p>
          </div>
        </Label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".xls,.xlsx"
        />
        <Button onClick={handleSubmitUploadFile} disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar dados'}
        </Button>
        {isUploading && (
          <div className="w-full mt-4">
            <Progress value={progress} className="rounded-full" />
            <p className="text-center text-gray-500 mt-2">
              {progress}% carregado
            </p>
          </div>
        )}
        {fileName && !isUploading && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-blue-600">{fileName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { FileUpload };
