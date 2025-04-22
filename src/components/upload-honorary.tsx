import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/sidebar';
import { Menu, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Normalize helpers
const normalizeString = (value: any): string | null => {
  const str = value != null ? String(value).trim() : '';
  return str === '' ? null : str;
};

const normalizeNumber = (value: any): number | null => {
  if (value == null) return null;
  const num = Number(String(value).replace(',', '.'));
  return Number.isNaN(num) ? null : num;
};

const transformControleData = (rawData: any[]) => {
  return rawData.map(row => ({
    monthOfCalculation: normalizeString(row['Mês Apuração']),
    competenceMonth: normalizeString(row['Mês Competência']),
    contract: normalizeNumber(row['Contrato']),
    enterprise: normalizeString(row['Empresa']),
    product: normalizeString(row['Produto']),
    percentageHonorary: normalizeNumber(row['% Honorario']),
    compensation: normalizeNumber(row['Compensação']),
    honorary: normalizeNumber(row['Honorários']),
    tax: normalizeNumber(row['Imposto']),
    value: normalizeNumber(row['Valor R$']),
    situation: null,
  }));
};

export function UploadHonorary() {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = ev => {
      const bytes = new Uint8Array(ev.target?.result as ArrayBuffer);
      const wb = XLSX.read(bytes, { type: 'array' });
      const lastSheetName = wb.SheetNames[wb.SheetNames.length - 1];
      const sheet = wb.Sheets[lastSheetName];
      const raw = XLSX.utils.sheet_to_json(sheet, { defval: null });
      const transformed = transformControleData(raw);
      setData(transformed);
      setIsUploading(false);
      setProgress(100);
    };
    reader.readAsArrayBuffer(file);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const handleSubmit = async () => {
    if (data.length === 0) {
      toast.error('Nenhum dado para enviar.');
      return;
    }
    setSending(true);
    let sent = 0;
    try {
      for (const record of data) {
        const res = await fetch('http://localhost:3333/portalcontrolls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        if (res.ok) sent++;
      }
      toast.success(`${sent} registros enviados com sucesso!`);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao enviar dados.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-64 bg-white shadow-lg">
            <Sidebar />
            <Button
              variant="ghost"
              className="mt-6 mx-4"
              onClick={() => setSidebarOpen(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <header className="w-full max-w-md mb-6 flex items-center">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <ArrowLeft size={24} />
          </Button>
        </header>

        <Button
          variant="ghost"
          className="md:hidden fixed top-6 left-6 text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={28} />
        </Button>

        <form className="w-full max-w-md bg-white p-12 rounded-lg shadow-md space-y-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Upload de Planilha de Controle
          </h2>

          <label htmlFor="file-upload" className="w-full cursor-pointer">
            <div className="w-full border-2 border-gray-300 rounded-md p-12 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-all duration-150">
              <p className="text-gray-600 text-center text-base font-medium">
                Clique ou arraste sua planilha aqui
              </p>
              <span className="mt-2 text-sm text-gray-500">.xls, .xlsx</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />

          {fileName && (
            <p className="text-center text-gray-800 font-medium">
              Arquivo selecionado:{' '}
              <span className="font-normal">{fileName}</span>
            </p>
          )}

          {isUploading && (
            <div className="space-y-2">
              <Progress
                value={progress}
                className="h-3 rounded-full bg-gray-300"
              />
              <p className="text-center text-sm text-gray-600">
                Carregando: {progress}%
              </p>
            </div>
          )}

          <div className="mt-10">
            <Button
              onClick={handleSubmit}
              disabled={sending || data.length === 0}
              className="w-full py-3 text-base bg-gray-800 hover:bg-gray-900 text-white rounded-md shadow transition-colors duration-150"
            >
              {sending ? 'Enviando...' : 'Enviar Dados'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
