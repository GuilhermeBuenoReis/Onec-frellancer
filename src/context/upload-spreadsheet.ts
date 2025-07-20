import { api } from '../config/axios';

export async function uploadSpreadsheet(file: File, type: string) {
  if (!type) throw new Error('Tipo de planilha não selecionado.');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await api.post('/upload-xlsx', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
