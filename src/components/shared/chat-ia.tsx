'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { FileSpreadsheet, Send } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadSpreadsheet } from './upload-spreadsheet';

export function ChatIa() {
  const [messages, setMessages] = useState<any[]>([
    { from: 'bot', text: 'Olá! Como posso te ajudar hoje?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showSelect, setShowSelect] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    const content = newMessage.trim();
    if (!content) return;

    setMessages(prev => [...prev, { from: 'user', text: content }]);
    setNewMessage('');

    if (content.toLowerCase().includes('planilha')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            from: 'bot',
            text: 'Qual tipo de planilha você deseja subir?',
            isSelect: true,
          },
        ]);
        setShowSelect(true);
      }, 500);
    }
  }

  function handleSelect(value: string) {
    setSelectedType(value);
    setShowSelect(false);

    setMessages(prev => [
      ...prev,
      { from: 'user', text: `Planilha: ${value}` },
      {
        from: 'bot',
        text: `Perfeito! Agora envie sua planilha de ${value.toLowerCase()}.`,
        isUploader: true,
      },
    ]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="flex items-center gap-2 h-10 px-4 text-sm cursor-pointer sm:text-base"
        >
          <FileSpreadsheet className="size-4" />
          <span className="hidden sm:inline">Subir planilhas via IA</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-[400px] p-4 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Converse com a IA</SheetTitle>
          <SheetDescription>
            Faça perguntas, envie planilhas, explore dados e muito mais.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <section className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 pr-2 overflow-y-auto">
            <div className="flex flex-col gap-3">
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

                    {msg.isSelect && showSelect && (
                      <div className="mt-2 ml-2">
                        <Select onValueChange={handleSelect}>
                          <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Selecione a planilha" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Negociações">
                              Negociações
                            </SelectItem>
                            <SelectItem value="Contratos">Contratos</SelectItem>
                            <SelectItem value="Parceiros">Parceiros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {msg.isUploader && selectedType && <UploadSpreadsheet />}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          </ScrollArea>
        </section>

        <form onSubmit={handleSendMessage} className="pt-4">
          <div className="relative border border-input rounded-xl bg-muted focus-within:ring-2 focus-within:ring-ring flex items-center">
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
              rows={1}
            />
            <div className="flex items-center p-2">
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
