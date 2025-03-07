// FileUpload.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  onFileUpload: (file: File, fileName: string) => void;
}

function FileUpload(props: FileUploadProps) {
  const { onFileUpload } = props;
  const [fileName, setFileName] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          onFileUpload(file, file.name);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <Label htmlFor="file-upload" className="block mb-4">
          <span className="text-xl font-medium text-gray-700">
            Selecione sua planilha
          </span>
        </Label>
        <Label htmlFor="file-upload" className="w-full cursor-pointer">
          <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
            <p className="text-gray-600 text-center text-lg">
              Clique ou arraste o arquivo aqui
            </p>
          </div>
        </Label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".xls,.xlsx"
        />
        {isUploading && (
          <div className="w-full mt-4">
            <Progress value={progress} className="rounded-full" />
            <p className="text-center text-gray-500 mt-2">
              {progress}% carregado
            </p>
          </div>
        )}
        {fileName && !isUploading && (
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-700">Arquivo selecionado:</p>
            <p className="text-xl font-bold text-blue-600">{fileName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { FileUpload };
