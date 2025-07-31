'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FileSpreadsheet, Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { env } from '@/env';
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

type ChatMessage = { from: 'bot' | 'user'; text: string };

const endpoints: Record<DataType, string> = {
  Contratos: `${env.VITE_API_URL}/contract`,
  Dados: `${env.VITE_API_URL}/negotiation`,
  Parceiros: `${env.VITE_API_URL}/partners`,
  Pendencias: `${env.VITE_API_URL}/pendings`,
  Controle: `${env.VITE_API_URL}/portalcontrolls`,
  ClientReceipt: `${env.VITE_API_URL}/client-receipt`,
};

const normalizeHeader = (header: string): string =>
  header
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w]/g, '')
    .toLowerCase();

export function SmartUploadChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: 'bot',
      text: 'Olá! Eu sou a Lunna. Posso te ajudar a enviar suas planilhas ✨',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<DataType>('Contratos');
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
              text: 'Entendido! Selecione abaixo o tipo e envie sua planilha de honorários.',
            },
          ]);
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
      const arrayBuffer = new Uint8Array(ev.target?.result as ArrayBuffer);
      const workbook = XLSX.read(arrayBuffer, {
        type: 'array',
        cellDates: true,
      });
      const sheetIndex = type === 'Parceiros' ? 3 : 0;
      const sheetName = workbook.SheetNames[sheetIndex];
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) {
        toast.error('A planilha selecionada não possui a aba esperada');
        return;
      }

      const raw = XLSX.utils.sheet_to_json(sheet, {
        defval: null,
        raw: true,
        range: sheet['!ref'],
        blankrows: false,
      }) as Record<string, unknown>[];

      const transformed = raw.map(row => {
        const output: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(row)) {
          output[normalizeHeader(key)] = val;
        }
        return output;
      });

      setDataRows(transformed);
      toast.success(
        `📄 ${selected.name} carregado com ${transformed.length} registros`
      );
    };
    reader.readAsArrayBuffer(selected);
  };

  const handleUpload = async () => {
    if (!file || !dataRows.length) {
      toast.error('Nenhum arquivo ou dados carregados');
      return;
    }

    setUploading(true);
    let current = 0;
    const step = 100 / dataRows.length;

    for (const item of dataRows) {
      try {
        await fetch(endpoints[type], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
          credentials: 'include',
        });
        current += step;
        setProgress(Math.min(100, current));
      } catch {
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
                      {(Object.keys(endpoints) as DataType[]).map(key => (
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
