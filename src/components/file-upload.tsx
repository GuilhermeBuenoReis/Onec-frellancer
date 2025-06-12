import type React from 'react';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from './ui/button';

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

const PENDING_CATEGORIES = [
  'SAC',
  'Atendimento',
  'Financeiro',
  'Diretoria',
  'Comercial',
  'Auditoria',
] as const;
type PendingCategory = (typeof PENDING_CATEGORIES)[number];

const normalizeHeader = (header: string): string =>
  header
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
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
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }
    dateObj = parsed;
  }

  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const yyyy = dateObj.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

const transformExcelData = (rawData: any[], dataType: DataType) => {
  const nonEmptyRaw = rawData.filter(row =>
    Object.values(row).some(v => v != null && String(v).trim() !== '')
  );
  const rows = nonEmptyRaw.map(row => {
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
    case 'Pendencias':
      return rows.map(r => {
        const rawCat = normalizeString(r['categoria']) || '';
        const found = PENDING_CATEGORIES.find(
          c => c.toLowerCase() === rawCat.toLowerCase()
        );
        const category: PendingCategory = found ?? 'SAC';
        return {
          client: normalizeString(r['cliente']),
          callReason: normalizeString(r['motivo_do_chamado']),
          status: normalizeString(r['status']),
          priority: normalizeString(r['prioridade']),
          responsible: normalizeString(r['responsavel']),
          category,
          description: normalizeString(r['descricao']),
        };
      });
    case 'Controle':
      return rows.map(r => ({
        monthOfCalculation: normalizeString(r['mes_apuracao']),
        competenceMonth: normalizeString(r['mes_competencia']),
        contract: normalizeNumber(r['contrato']),
        enterprise: normalizeString(r['empresa']),
        product: normalizeString(r['produto']),
        percentageHonorary: normalizeNumber(r['percentual_honorario']),
        compensation: normalizeNumber(r['compensacao']),
        honorary: normalizeNumber(r['honorarios']),
        tax: normalizeNumber(r['imposto']),
        value: normalizeNumber(r['valor_r']),
        situation: null,
      }));
    case 'ClientReceipt':
      return rows.map(r => ({
        receiptDate: formatDateBR(r['data']),
        competence: formatDateBR(r['comp']),
        cnpj: normalizeString(r['cnpj']),
        clientName: normalizeString(r['cliente']),
        percentage: normalizeNumber(r['percentual']),
        compensationMonth: normalizeString(r['compensacao_mes']),
        honorary: normalizeNumber(r['honorarios']),
        tax: normalizeNumber(r['imposto']),
        status: normalizeString(r['status']),
      }));
    default:
      return rows;
  }
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [transformedData, setTransformedData] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [dataType, setDataType] = useState<DataType>('Contratos');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!fileName) return;

    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
        return next;
      });
    }, 200);

    const reader = new FileReader();
    reader.onload = ev => {
      const data = new Uint8Array(ev.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const raw = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
        range: sheet['!ref'],
        blankrows: false,
      });
      const transformed = transformExcelData(raw, dataType);
      setTransformedData(transformed);
      onFileUpload(file, file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (!transformedData.length) {
      toast.error('Nenhum registro para enviar.');
      return;
    }

    setSending(true);
    const endpoints: Record<DataType, string> = {
      Contratos: 'http://localhost:3333/contract',
      Dados: 'http://localhost:3333/negotiation',
      Parceiros: 'http://localhost:3333/partners',
      Pendencias: 'http://localhost:3333/pendings',
      Controle: 'http://localhost:3333/portalcontrolls',
      ClientReceipt: 'http://localhost:3333/client-receipt',
    };

    try {
      for (const rec of transformedData) {
        await fetch(endpoints[dataType], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rec),
        });
      }
      toast.success(`${transformedData.length} registros enviados!`);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar dados');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col gap-3">
        <Label htmlFor="data-type">
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
          <option value="ClientReceipt">Recebimentos de Cliente</option>
        </select>

        <Label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
            <p className="text-gray-600 text-center text-lg">
              Clique ou arraste para selecionar o arquivo
            </p>
          </div>
        </Label>
        <input
          id="file-upload"
          type="file"
          accept=".xls,.xlsx"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          onClick={handleSubmit}
          disabled={sending || !transformedData.length}
        >
          {sending ? 'Enviando...' : 'Enviar dados'}
        </Button>

        {isUploading && <Progress value={progress} className="mt-4 w-full" />}
      </div>
    </div>
  );
};
