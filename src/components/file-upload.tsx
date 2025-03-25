import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from './ui/button';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

export type DataType = 'Contratos' | 'Dados' | 'Parceiros';

export interface FileUploadProps {
  onFileUpload: (file: File, fileName: string) => void;
}

const normalizeString = (value: any): string | null => {
  const str = value !== undefined && value !== null ? String(value).trim() : '';
  return str === '' ? null : str;
};

const normalizeNumber = (value: any): number | null =>
  value === undefined || value === null
    ? null
    : Number(String(value).replace(',', '.')) || null;

const transformExcelData = (rawData: any[], dataType: DataType) => {
  switch (dataType) {
    case 'Contratos': {
      return rawData.map((contract: any) => {
        return {
          city: normalizeString(contract['Cidade']) || 'Cidade não informada',
          client:
            normalizeString(contract['CLIENTE']) || 'Cliente não informado',
          state: normalizeString(contract['Estado']) || 'Estado não informado',
          cnpj: normalizeString(contract['CNPJ']) || 'CNPJ não informado',
          sindic: normalizeString(contract['Sindic']) || 'Sindic não informado',
          year: normalizeString(contract['ANO']) || 'Ano não informado',
          matter:
            normalizeString(contract['MATÉRIA']) || 'Matéria não informada',
          forecast:
            normalizeString(contract['Previsao']) || 'Previsão não informada',
          contractTotal:
            normalizeString(contract['CONTRATO TOTAL']) ||
            'Contrato total não informado',
          percentage: normalizeNumber(contract['PERCENTUAL']) ?? 0,
          signedContract:
            normalizeString(contract['CONTRATO ASSINADO']) || 'Não informado',
          status: normalizeString(contract['STATUS']) || null,
          averageGuide: normalizeNumber(contract['MÉDIA DE GUIA']) ?? 0,
          partner:
            normalizeString(contract['PARCEIRO']) || 'Parceiro não informado',
          partnerCommission:
            normalizeNumber(contract['Comissão parceiro']) ?? 0,
          counter:
            normalizeString(contract['Contador']) || 'Contador não informado',
          email:
            normalizeString(contract['e-mail responsável']) ||
            'Email não informado',
        };
      });
    }
    case 'Dados':
      return rawData.map((row: any) => ({
        title: normalizeString(row['Título']) || 'Título não informado',
        client: normalizeString(row['Cliente']) || 'Cliente não informado',
        user: normalizeString(row['Usuário']) || 'Usuário não informado',
        tags: normalizeString(row['Tags']) || 'Tags não informadas',
        step: normalizeString(row['Etapaa']) || 'Etapa não informada',
        status: normalizeString(row['Status']) || 'Status não informado',
        value: row['Valor']
          ? Number(String(row['Valor']).replace(',', '.'))
          : 0,
        partnerId: normalizeString(row['PARCEIRO']) || 'Parceiro não informado',
        startsDate: row['Data Início']
          ? String(row['Data Início'])
          : 'Data não informada',
        observation: normalizeString(row['OBS']) || 'Observação não informada',
        averageGuide: row['Média Guia']
          ? Number(String(row['Média Guia']).replace(',', '.'))
          : 0,
      }));
    case 'Parceiros':
      return rawData.map((row: any) => ({
        name: normalizeString(row['NOME']) || 'Nome não informado',
        cpfOrCnpj: normalizeString(row['CPF/CNPJ']) || 'CPF/CNPJ não informado',
        city: normalizeString(row['CIDADE']) || 'Cidade não informada',
        state: normalizeString(row['ESTADO']) || 'Estado não informado',
        commission: normalizeNumber(row['COMISSÃO']) ?? 0,
        portal: normalizeString(row['PORTAL']) || 'Portal não informado',
        channelHead:
          normalizeString(row['Head de Canal']) ||
          'Head de Canal não informado',
        regional: normalizeString(row['REGIONAL']) || 'Regional não informado',
        coordinator:
          normalizeString(row['COORDENADOR']) || 'Coordenador não informado',
        agent: normalizeString(row['AGENTE']) || 'Agente não informado',
        indicator:
          normalizeString(row['INDICADOR']) || 'Indicador não informado',
        contract: normalizeString(row['CONTRATO']) || 'Contrato não informado',
        phone: normalizeString(row['TELEFONE']) || 'Telefone não informado',
        email: normalizeString(row['E-MAIL']) || 'Email não informado',
        responsible:
          normalizeString(row['responsável']) || 'Responsável não informado',
      }));
    default:
      return rawData;
  }
};

const FileUpload: React.FC<FileUploadProps> = props => {
  const { onFileUpload } = props;
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sheetData, setSheetData] = useState<any[]>([]);
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
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          onFileUpload(file, file.name);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    const reader = new FileReader();
    reader.onload = e => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      let sheetIndex = 0;
      if (dataType === 'Parceiros') sheetIndex = 3;
      if (!workbook.SheetNames[sheetIndex]) {
        console.error(`Sheet not found at position ${sheetIndex + 1}`);
        setIsUploading(false);
        return;
      }
      const sheetName = workbook.SheetNames[sheetIndex];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null });
      setSheetData(jsonData);
      const transformed = transformExcelData(jsonData, dataType);
      setTransformedData(transformed);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmitUploadFile = async (): Promise<void> => {
    setSending(true);
    let enviados = 0;
    let endpoint = '';
    if (dataType === 'Contratos') {
      endpoint = 'http://localhost:3333/contract';
    } else if (dataType === 'Dados') {
      endpoint = 'http://localhost:3333/negotiation';
    } else if (dataType === 'Parceiros') {
      endpoint = 'http://localhost:3333/partners';
    }
    try {
      for (let i = 0; i < transformedData.length; i++) {
        const record = transformedData[i];
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            'Error sending record:',
            record,
            response.status,
            errorText
          );
        } else {
          enviados++;
        }
      }
      toast.success(`${enviados} registros enviados com sucesso!`);
    } catch (error) {
      toast.error('Erro ao enviar dados');
      console.error('Error during upload:', error);
    } finally {
      setSending(false);
    }
  };

  const handleDataTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDataType(e.target.value as DataType);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-3">
        <Label htmlFor="file-upload" className="block mb-4">
          <span className="text-xl font-medium text-gray-700">
            Selecione sua planilha
          </span>
        </Label>
        <div>
          <Label htmlFor="data-type" className="block mb-2">
            <span className="text-lg text-gray-700">Tipo de dados:</span>
          </Label>
          <select
            id="data-type"
            value={dataType}
            onChange={handleDataTypeChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Contratos">Contratos</option>
            <option value="Dados">Negociações</option>
            <option value="Parceiros">Parceiros</option>
          </select>
        </div>
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
        <Button
          onClick={handleSubmitUploadFile}
          disabled={sending}
          type="button"
        >
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
            <p className="text-lg text-gray-700">Arquivo selecionado:</p>
            <p className="text-xl font-bold text-blue-600">{fileName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { FileUpload };
