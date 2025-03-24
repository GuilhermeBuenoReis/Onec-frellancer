import { useForm, Controller } from 'react-hook-form';
import { FileUpload } from '@/components/file-upload';
import { Helmet } from 'react-helmet';
import { Sidebar } from '@/components/sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

interface FormValues {
  file: File | null;
}

export function Upload() {
  const { control } = useForm<FormValues>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Helmet title="Upload" />

      <div
        className={`fixed md:static z-20 ${sidebarOpen ? 'block' : 'hidden'} md:flex`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <form className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
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
    </div>
  );
}
