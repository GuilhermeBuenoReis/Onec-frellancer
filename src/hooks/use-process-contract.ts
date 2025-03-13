import { useState } from 'react';
import { useCreateContract } from '@/http/generated/api';
import { submissionDataExcelToDatabase } from '@/database/submission-data-exel-to-database';
import type { ProcessedExcelData } from '@/database/types';

export function useProcessContract() {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: createContract } = useCreateContract();

  async function processAndSendContract(file: File) {
    setLoading(true);
    try {
      const { contracts }: ProcessedExcelData =
        await submissionDataExcelToDatabase(file);

      // Envia cada contrato
      if (contracts) {
        for (const contract of contracts) {
          console.log('📄 Enviando contrato:', contract);
          await createContract({ data: contract });
        }
      }
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    processAndSendContract,
  };
}
