'use client';

import { Button } from '../ui/button';
import { FileIcon, Loader2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Progress } from '../ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckAnimated } from './check-animated';
import { Input } from '../ui/input';

export function UploadSpreadsheet() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];

    if (
      selected &&
      [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
      ].includes(selected.type)
    ) {
      setFile(selected);
      setUploading(true);
      simulateProgress();
    }
  }

  function simulateProgress() {
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
    }, 300); // total ~3s
  }

  function handleEnviar() {
    setSending(true);
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  return (
    <div
      className={cn(
        'w-full max-w-[90%] sm:max-w-sm border border-dashed border-input rounded-xl p-6 flex flex-col items-center justify-start text-center gap-4',
        'bg-muted text-muted-foreground transition-all min-h-[180px] mt-3 mx-auto'
      )}
    >
      {!file && (
        <>
          <UploadCloud className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Upload files</p>
          <p className="text-xs text-muted-foreground">
            Apenas .xls, .xlsx e .csv
          </p>

          <Input
            type="file"
            accept=".xls,.xlsx,.csv"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer w-full sm:w-auto"
          >
            Selecionar arquivo
          </Button>
        </>
      )}

      {file && uploading && (
        <div className="w-full flex flex-col items-center gap-2 mt-3">
          <FileIcon className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm truncate max-w-[200px] text-foreground">
            {file.name}
          </span>
          <Progress
            value={progress}
            className="w-full h-2"
            progressSuccess={true}
          />
          <span className="text-xs text-muted-foreground">Enviando...</span>
        </div>
      )}

      {file && completed && !sending && (
        <AnimatePresence>
          <motion.div
            key="completed-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full flex flex-col items-center gap-3"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <CheckAnimated size={32} />
            </motion.div>

            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Upload completo
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {file.name}
            </span>
            <Button onClick={handleEnviar} className="mt-2" variant="default">
              Enviar
            </Button>
          </motion.div>
        </AnimatePresence>
      )}

      {sending && (
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Enviando para o banco...
          </span>
        </div>
      )}
    </div>
  );
}
