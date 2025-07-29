'use client';

import { motion } from 'framer-motion';
import { FileIcon, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { env } from '@/env';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CheckAnimated } from './check-animated';

type DataType =
  | 'Contratos'
  | 'Dados'
  | 'Parceiros'
  | 'Pendencias'
  | 'Controle'
  | 'ClientReceipt';

const endpoints: Record<DataType, string> = {
  Contratos: `${env.VITE_API_URL}/contract`,
  Dados: `${env.VITE_API_URL}/negotiation`,
  Parceiros: `${env.VITE_API_URL}/partners`,
  Pendencias: `${env.VITE_API_URL}/pendings`,
  Controle: `${env.VITE_API_URL}/portalcontrolls`,
  ClientReceipt: `${env.VITE_API_URL}/client-receipt`,
};

const normalizeString = (value: unknown): string | null => {
  const str = value != null ? String(value).trim() : '';
  return str === '' ? null : str;
};

const normalizeNumber = (value: unknown): number | null => {
  if (value == null) return null;
  const num =
    typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isNaN(num) ? null : num;
};

const normalizeHeader = (header: string): string =>
  header
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w]/g, '')
    .toLowerCase();

const parseExcelDate = (serial: number): Date => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  const total_seconds = Math.floor(86400 * fractional_day);
  const seconds = total_seconds % 60;
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor(total_seconds / 60) % 60;
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
};

const formatDateBR = (value: unknown): string | null => {
  if (value == null) return null;
  let dateObj: Date;
  if (typeof value === 'number') {
    dateObj = parseExcelDate(value);
  } else {
    const parsed = new Date(String(value));
    if (Number.isNaN(parsed.getTime())) return null;
    dateObj = parsed;
  }
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const yyyy = dateObj.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const transformExcelData = (rawData: any[], dataType: DataType) => {
  const rows = rawData
    .filter(row =>
      Object.values(row).some(v => v != null && String(v).trim() !== '')
    )
    .map(row => {
      const out: Record<string, any> = {};
      Object.entries(row).forEach(([key, val]) => {
        out[normalizeHeader(key)] = val;
      });
      return out;
    });

  switch (dataType) {
    case 'Contratos':
      return rows.map(r => ({
        city: normalizeString(r['cidade']),
        client: normalizeString(r['cliente']),
        state: normalizeString(r['estado']),
        cnpj: normalizeString(r['cnpj']),
        sindic: normalizeString(r['sindic']),
        year: formatDateBR(r['ano']),
        matter: normalizeString(r['materia']),
        forecast: normalizeString(r['previsao']),
        contractTotal: normalizeString(r['contrato_total']),
        percentage: normalizeNumber(r['percentual']) ?? 0,
        signedContract: normalizeString(r['contrato_assinado']),
        status: normalizeString(r['status']),
        averageGuide: normalizeNumber(r['media_de_guia']) ?? 0,
        partner: normalizeString(r['parceiro']),
        partnerCommission: normalizeNumber(r['comissao_parceiro']) ?? 0,
        counter: normalizeString(r['contador']),
        email: normalizeString(r['email_responsavel']),
      }));
    case 'Dados':
      return rows.map(r => ({
        title: normalizeString(r['titulo']),
        client: normalizeString(r['cliente']),
        user: normalizeString(r['ususario']),
        tags: normalizeString(r['tags']),
        step: normalizeString(r['etapa']),
        status: normalizeString(r['status']),
        value: normalizeNumber(r['valor']),
        partnerId: normalizeString(r['parceiro']),
        startsDate: formatDateBR(r['data_inicio']),
        observation: normalizeString(r['obs']),
        averageGuide: normalizeNumber(r['media_guia']),
      }));
    case 'Parceiros':
      return rows.map(r => ({
        name: normalizeString(r['nome']),
        cpfOrCnpj: normalizeString(r['cpf_cnpj']),
        city: normalizeString(r['cidade']),
        state: normalizeString(r['estado']),
        commission: normalizeNumber(r['comissao']) ?? 0,
        portal: normalizeString(r['portal']),
        channelHead: normalizeString(r['head_de_canal']),
        regional: normalizeString(r['regional']),
        coordinator: normalizeString(r['coordenador']),
        agent: normalizeString(r['agente']),
        indicator: normalizeString(r['indicador']),
        contract: normalizeString(r['contrato']),
        phone: normalizeString(r['telefone']),
        email: normalizeString(r['email']),
        responsible: normalizeString(r['responsavel']),
      }));
    default:
      return rows;
  }
};

export function UploadSpreadsheet() {
  const [file, setFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState<DataType>('Contratos');
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file && uploading) simulateProgress();
  }, [file]);

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      if (value >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setUploading(false);
          setCompleted(true);
        }, 300);
      } else {
        setProgress(value);
      }
    }, 300);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    const reader = new FileReader();

    reader.onload = ev => {
      const data = new Uint8Array(ev.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const sheetIndex = dataType === 'Parceiros' ? 3 : 0;
      const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
      const raw = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
        range: sheet['!ref'],
        blankrows: false,
      });
      const transformed = transformExcelData(raw, dataType);
      setTransformedData(transformed);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || transformedData.length === 0) {
      setError('Arquivo ou dados inválidos');
      toast.error('Erro ao enviar. Verifique o arquivo.');
      return;
    }

    try {
      for (const rec of transformedData) {
        await fetch(endpoints[dataType], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rec),
        });
      }
      toast.success(`${transformedData.length} registros enviados!`);
      simulateProgress();
    } catch (err) {
      console.error(err);
      toast.error('Erro no envio da planilha.');
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full max-w-[90%] sm:max-w-sm border border-dashed border-input rounded-xl p-6 flex flex-col items-center justify-start text-center gap-4 bg-muted text-muted-foreground transition-all min-h-[180px] mt-3 mx-auto"
    >
      <UploadCloud className="w-8 h-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">Upload de planilha</p>
      <p className="text-xs text-muted-foreground">.xls, .xlsx ou .csv</p>

      <Select
        value={dataType}
        onValueChange={value => setDataType(value as DataType)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Tipo de dados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Contratos">Contratos</SelectItem>
          <SelectItem value="Dados">Negociações</SelectItem>
          <SelectItem value="Parceiros">Parceiros</SelectItem>
          <SelectItem value="Pendencias">Pendências</SelectItem>
          <SelectItem value="Controle">Controle</SelectItem>
          <SelectItem value="ClientReceipt">Recebimentos</SelectItem>
        </SelectContent>
      </Select>

      <Input type="file" accept=".xls,.xlsx,.csv" onChange={handleFileChange} />
      {error && <span className="text-xs text-red-600">{error}</span>}

      {file && uploading && (
        <div className="w-full flex flex-col items-center gap-2 mt-3">
          <FileIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm truncate max-w-[200px] text-foreground">
            {file.name}
          </span>
          <Progress value={progress} className="w-full h-2" />
          <span className="text-xs text-muted-foreground">Enviando...</span>
        </div>
      )}

      {file && completed && !uploading && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="w-full flex flex-col items-center gap-3"
        >
          <CheckAnimated size={32} />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            Upload completo
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {file.name}
          </span>
        </motion.div>
      )}

      <Button type="submit" disabled={uploading}>
        {uploading ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
