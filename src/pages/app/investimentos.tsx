// pages/Investimentos.tsx
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { FileUpload } from '@/components/file-upload';
import { useSpreadsheetStore } from '@/store/spreadsheet';

function Investimentos() {
  const { sheetData, setSheetData } = useSpreadsheetStore()();

  function handleFileUpload(data: string) {
    setSheetData(data);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Upload de Planilha
          </h2>
          <FileUpload onFileUpload={handleFileUpload} />
          {sheetData && (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Conteúdo da Planilha:
              </h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {sheetData}
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export { Investimentos };
function useInvestmentStore() {
  throw new Error('Function not implemented.');
}
