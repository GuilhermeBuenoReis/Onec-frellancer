import type React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useCreatePortalControll } from '@/http/generated/api';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function formatMonth(value: any): string | null {
  if (value == null) return null;
  if (typeof value === 'number') {
    const d = XLSX.SSF.parse_date_code(value);
    if (d?.y && d?.m) return `${String(d.m).padStart(2, '0')}/${d.y}`;
  }
  if (value instanceof Date) {
    return `${String(value.getMonth() + 1).padStart(2, '0')}/${value.getFullYear()}`;
  }
  const s = String(value).trim();
  const m = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (m) return `${m[1].padStart(2, '0')}/${m[2]}`;
  const dt = new Date(s);
  if (!Number.isNaN(dt.getTime()))
    return `${String(dt.getMonth() + 1).padStart(2, '0')}/${dt.getFullYear()}`;
  return null;
}

function parseNumber(value: any): number | null {
  if (value == null || value === '') return null;
  if (typeof value === 'number') return Number.isNaN(value) ? null : value;
  const str = String(value)
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
    .replace('%', '');
  const n = parseFloat(str);
  return Number.isNaN(n) ? null : n;
}

const monthToIndex: Record<string, number> = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

export function UploadHonorary() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const navigate = useNavigate();
  const { mutateAsync: createPortal } = useCreatePortalControll();

  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array', cellDates: true });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
      toast.success('Arquivo carregado!');
    } catch {
      toast.error('Erro ao ler arquivo');
    }
  };

  const handleUpload = async () => {
    if (!workbook || !partnerId) {
      toast.error('Arquivo ou parceiro ausente.');
      return;
    }

    const monthIndex = monthToIndex[selectedMonth];
    const year = new Date().getFullYear();
    const padMonth = String(monthIndex).padStart(2, '0');
    const formattedMonth = `${padMonth}/${year}`;

    const sheetName =
      workbook.SheetNames[monthIndex - 1] || workbook.SheetNames[0];
    const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null,
    });

    setUploading(true);
    setProgress(0);

    const total = rows.length;
    for (let i = 0; i < total; i++) {
      const row = rows[i];

      await createPortal({
        data: {
          monthOfCalculation: formattedMonth,
          competenceMonth: formattedMonth,
          contract:
            row['Contrato'] != null ? parseNumber(row['Contrato']) : null,
          enterprise:
            row['Empresa'] != null ? String(row['Empresa']).trim() : null,
          product:
            row['Produto'] != null ? String(row['Produto']).trim() : null,
          percentageHonorary: parseNumber(row['% Honorario']),
          compensation: parseNumber(row['Compensação']),
          honorary: parseNumber(row['Honorários']),
          tax: parseNumber(row['Imposto']),
          tj: parseNumber(row['TJ']),
          value: parseNumber(row['Valor R$']),
          situation:
            row['Situação'] != null ? String(row['Situação']).trim() : null,
          partnerId,
        },
      });

      setProgress(Math.round(((i + 1) / total) * 100));
    }

    toast.success('Dados enviados com sucesso!');
    setUploading(false);
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center py-8">
      <Card className="w-full max-w-lg space-y-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Upload Honorários
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />

          {sheetNames.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selectedMonth}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Selecione mês</DropdownMenuLabel>
                {Object.keys(monthToIndex).map(m => (
                  <DropdownMenuItem
                    key={m}
                    onSelect={() => setSelectedMonth(m)}
                  >
                    {m}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading || !workbook}
            className="w-full"
          >
            {uploading ? `Enviando (${progress}%)` : 'Enviar Dados'}
          </Button>

          {uploading && (
            <Progress value={progress} className="h-2 rounded-full" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
