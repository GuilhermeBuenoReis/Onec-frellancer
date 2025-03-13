import { useForm, Controller } from 'react-hook-form';
import { FileUpload } from '@/components/file-upload';
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';

interface FormValues {
  file: File | null;
}

export function Upload() {
  const { control } = useForm<FormValues>();

  return (
    <div className="flex h-screen ">
      <Helmet title="Upload" />
      <Sidebar />
      <form className="p-6 bg-white rounded-lg shadow-lg flex-1">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upload de Planilha
        </h2>

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <FileUpload
              onFileUpload={(file: File) => {
                console.log('📂 Arquivo recebido:', file);
                onChange(file);
              }}
            />
          )}
        />
      </form>
    </div>
  );
}
