'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../../../../components/ui/dialog';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const [step, setStep] = useState<'question' | 'loading' | 'done'>('question');

  function handleExport(type: 'all' | 'filtered') {
    setStep('loading');
    setTimeout(() => {
      console.log('Enviado');
      setStep('done');
    }, 1500);
  }

  function resetAndClose() {
    setStep('question');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Exportar com IA
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Você deseja exportar <strong>todos os dados</strong> ou apenas
                os <strong>filtrados</strong> da tabela?
              </p>

              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <Button
                  onClick={() => handleExport('filtered')}
                  variant="outline"
                >
                  Apenas filtrados
                </Button>
                <Button onClick={() => handleExport('all')}>
                  Todos os dados
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Gerando planilha...
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-green-600 text-center py-6"
            >
              Planilha gerada com sucesso! ✅
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
