import { useMutation } from '@tanstack/react-query';
import { uploadSpreadsheet } from '../context/upload-spreadsheet';

export function useUploadSpreadsheet() {
  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: string }) => {
      return uploadSpreadsheet(file, type);
    },
    mutationKey: ['upload-spreadsheet'],
  });
}
