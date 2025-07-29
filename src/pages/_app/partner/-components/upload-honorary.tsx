'use client';

import { useSearch } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useCreatePortalControll } from '@/generated';

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

const monthToAbbrev: Record<string, string> = {
  Janeiro: 'Jan',
  Fevereiro: 'Fev',
  Março: 'Mar',
  Abril: 'Abr',
  Maio: 'Mai',
  Junho: 'Jun',
  Julho: 'Jul',
  Agosto: 'Ago',
  Setembro: 'Set',
  Outubro: 'Out',
  Novembro: 'Nov',
  Dezembro: 'Dez',
};

export function UploadHonorary() {
  const { id: partnerId } = useSearch({ from: '/_app/partner/' });
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

  async function handleUploadHonorary() {
    try {
      if (!workbook || !partnerId) {
        toast.error('Arquivo ou parceiro ausente.');
        return;
      }

      const abbrev = monthToAbbrev[selectedMonth];
      const year = new Date().getFullYear();
      const padMonth = String(
        Object.keys(monthToAbbrev).indexOf(selectedMonth) + 1
      ).padStart(2, '0');
      const formattedMonth = `${padMonth}/${year}`;

      const sheetName = workbook.SheetNames.find(name =>
        name.toLowerCase().startsWith(abbrev.toLowerCase())
      );

      if (!sheetName) {
        toast.error(`A aba que começa com "${abbrev}" não foi encontrada.`);
        return;
      }

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
            contract: parseNumber(row['Contrato']),
            enterprise:
              typeof row['Empresa'] === 'string'
                ? row['Empresa'].trim()
                : String(row['Empresa'] ?? '').trim() || null,
            product:
              typeof row['Produto'] === 'string'
                ? row['Produto'].trim()
                : String(row['Produto'] ?? '').trim() || null,
            situation:
              typeof row['Situação'] === 'string'
                ? row['Situação'].trim()
                : String(row['Situação'] ?? '').trim() || null,
            percentageHonorary: parseNumber(row['% Honorario']),
            compensation: parseNumber(row['Compensação']),
            honorary: parseNumber(row['Honorários']),
            tax: parseNumber(row['Imposto']),
            tj: parseNumber(row['TJ']),
            value: parseNumber(row['Valor R$']),
            partnerId,
          },
        });

        setProgress(Math.round(((i + 1) / total) * 100));
      }

      toast.success('Dados enviados com sucesso!');
    } catch (err) {
      toast.error('Erro ao enviar dados.');
      console.error(err);
    } finally {
      setUploading(false);
      setWorkbook(null);
      setSheetNames([]);
      setProgress(0);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 cursor-pointer"
          variant="outline"
        >
          <CirclePlus />
          Upar planilha
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="space-y-6">
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
                onClick={e => {
                  (e.target as HTMLInputElement).value = '';
                }}
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
                    {Object.keys(monthToAbbrev).map(m => (
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
                onClick={handleUploadHonorary}
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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
