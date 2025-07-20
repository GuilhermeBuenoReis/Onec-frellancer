'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FileSpreadsheet, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { UploadSpreadsheet } from './upload-spreadsheet';

export function ChatIa() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Como posso te ajudar hoje?' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showUploader, setShowUploader] = useState(false);
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

    // Se falar "planilha", mostra uploader
    if (content.toLowerCase().includes('planilha')) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            from: 'bot',
            text: 'Ótimo! Envie a planilha no botão abaixo.',
          },
        ]);
        setShowUploader(true);
      }, 500);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-2 h-10 px-4 text-sm cursor-pointer sm:text-base"
        >
          <FileSpreadsheet className="size-3" />
          <span className="hidden text-sm sm:inline">
            Subir planilhas via IA
          </span>
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
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} aria-hidden="true" />

              {showUploader && (
                <motion.div
                  key="uploader"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <UploadSpreadsheet />
                </motion.div>
              )}
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
