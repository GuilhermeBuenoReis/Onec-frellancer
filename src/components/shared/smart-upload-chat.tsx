'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FileSpreadsheet, Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { env } from '@/env';
import { useGetPartners } from '@/generated';
import { useLunnaIntentParser } from '@/hooks/use-lunna-intent-parser';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
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

export function SmartUploadChat() {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Olá! Eu sou a Lunna. Posso te ajudar a enviar suas planilhas ✨',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [requirePartnerSelect, setRequirePartnerSelect] = useState(false);
  const [requireMonthSelect, setRequireMonthSelect] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<DataType>('Contratos');
  const [data, setData] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: partnersData } = useGetPartners();
  const partners = partnersData?.data || [];

  const parseIntent = useLunnaIntentParser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showUploader]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content) return;

    setMessages(prev => [...prev, { from: 'user', text: content }]);
    setNewMessage('');

    const intent = parseIntent(content);

    switch (intent) {
      case 'upload':
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              from: 'bot',
              text: 'Perfeito! Agora escolha o tipo de dado e envie a planilha abaixo.',
            },
          ]);
          setShowUploader(true);
        }, 500);
        break;
      case 'honorarios':
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              from: 'bot',
              text: 'Entendido! Selecione abaixo o parceiro e o mês desejado para associar os honorários.',
            },
          ]);
          setRequirePartnerSelect(true);
          setRequireMonthSelect(true);
          setShowUploader(true);
        }, 500);
        break;
      default:
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              from: 'bot',
              text: 'Desculpe, ainda estou aprendendo. Por enquanto só consigo ajudar com upload de planilhas. 😅',
            },
          ]);
        }, 600);
        break;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);

    const reader = new FileReader();
    reader.onload = ev => {
      const data = new Uint8Array(ev.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true });
      const sheetIndex = type === 'Parceiros' ? 3 : 0;
      const sheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
      const raw = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
        range: sheet['!ref'],
        blankrows: false,
      });

      const transformed = raw.map(row => {
        const output: Record<string, any> = {};
        for (const [key, val] of Object.entries(
          row as Record<string, unknown>
        )) {
          output[normalizeHeader(key)] = val;
        }
        return output;
      });

      setData(transformed);
      toast.success(
        `📄 ${selected.name} carregado com ${transformed.length} registros`
      );
    };
    reader.readAsArrayBuffer(selected);
  };

  const handleUpload = async () => {
    if (!file || !data.length)
      return toast.error('Nenhum arquivo ou dados carregados');

    setUploading(true);
    let progress = 0;
    const step = 100 / data.length;

    for (const item of data) {
      try {
        await fetch(endpoints[type], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
          credentials: 'include',
        });
        progress += step;
        setProgress(Math.min(100, progress));
      } catch (err) {
        console.error(err);
        toast.error('Erro ao enviar um dos registros');
      }
    }

    setUploading(false);
    setCompleted(true);
    toast.success('Upload concluído ✅');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center gap-2 h-10 px-4 text-sm"
        >
          <FileSpreadsheet className="size-4" />
          <span className="hidden sm:inline">Subir planilhas com a Lunna</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full max-w-full sm:max-w-[400px] p-4 flex flex-col">
        <SheetHeader>
          <SheetTitle>Assistente Lunna</SheetTitle>
          <SheetDescription>
            Converse comigo para enviar suas planilhas e organizar os dados.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <section className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 pr-2 overflow-y-auto">
            <div className="flex flex-col gap-3 pb-2">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg text-sm shadow ${
                        msg.from === 'user'
                          ? 'ml-auto bg-primary text-primary-foreground'
                          : 'mr-auto bg-muted text-muted-foreground'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />

              {showUploader && (
                <>
                  <Select
                    value={type}
                    onValueChange={v => setType(v as DataType)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de dado" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(endpoints).map(key => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                  />

                  {file && !uploading && (
                    <Button onClick={handleUpload} className="w-full mt-2">
                      Enviar dados
                    </Button>
                  )}

                  {uploading && (
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <Loader2 className="animate-spin text-muted-foreground" />
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}

                  {completed && (
                    <div className="flex flex-col items-center gap-2 mt-4">
                      <CheckAnimated />
                      <span className="text-sm text-green-600">
                        Upload finalizado!
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </section>

        <form onSubmit={handleSendMessage} className="pt-4">
          <div className="relative border border-input rounded-xl bg-muted flex items-center">
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full resize-none bg-transparent px-4 py-3 text-sm"
              rows={1}
            />
            <div className="p-2">
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="rounded-full"
              >
                <Send className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
