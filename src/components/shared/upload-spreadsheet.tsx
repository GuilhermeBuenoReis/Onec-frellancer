'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { FileIcon, Loader2, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUploadSpreadsheet } from '../../hooks/use-upload-spreadsheet';
import { cn } from '../../lib/utils';
import {
  type UploadSpreadsheetSchema,
  uploadSpreadsheetSchema,
} from '../../schemas/upload-spreadsheet-schema';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CheckAnimated } from './check-animated';

export function UploadSpreadsheet() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UploadSpreadsheetSchema>({
    resolver: zodResolver(uploadSpreadsheetSchema),
    mode: 'onChange',
  });

  const file = watch('file');
  const type = watch('type');

  const uploadMutation = useUploadSpreadsheet();

  function simulateProgress() {
    setUploading(true);
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
    }, 300);
  }

  const onSubmit = (data: UploadSpreadsheetSchema) => {
    simulateProgress();
    uploadMutation.mutate(data, {
      onSuccess: () => {
        setTimeout(() => {
          setCompleted(false);
          setProgress(0);
          reset();
          location.reload();
        }, 1200);
      },
      onError: () => {
        setUploading(false);
        setCompleted(false);
        setProgress(0);
        alert('Erro ao enviar a planilha.');
      },
    });
  };

  const sending = uploadMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'w-full max-w-[90%] sm:max-w-sm border border-dashed border-input rounded-xl p-6 flex flex-col items-center justify-start text-center gap-4',
        'bg-muted text-muted-foreground transition-all min-h-[180px] mt-3 mx-auto'
      )}
    >
      <UploadCloud className="w-8 h-8 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">Upload files</p>
      <p className="text-xs text-muted-foreground">Apenas .xls, .xlsx e .csv</p>

      {/* Select Tipado */}
      <Select
        value={type}
        onValueChange={value => setValue('type', value as any)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o tipo de dados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="negotiation">Negociações</SelectItem>
          <SelectItem value="client">Clientes</SelectItem>
          <SelectItem value="partner">Parceiros</SelectItem>
        </SelectContent>
      </Select>
      {errors.type && (
        <span className="text-xs text-red-600">{errors.type.message}</span>
      )}

      {/* Input de arquivo */}
      <Input
        type="file"
        accept=".xls,.xlsx,.csv"
        {...register('file')}
        onChange={e => {
          setValue('file', e.target.files?.[0]!);
        }}
        className="block"
      />
      {errors.file && (
        <span className="text-xs text-red-600">{errors.file.message}</span>
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

      <Button type="submit" disabled={uploadMutation.isPending || uploading}>
        {uploadMutation.isPending ? 'Enviando...' : 'Enviar'}
      </Button>
    </form>
  );
}
