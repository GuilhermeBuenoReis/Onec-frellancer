export async function sendRecord(
  dataType: string,
  record: any
): Promise<boolean> {
  const endpoints: Record<string, string> = {
    Contratos: '/contract',
    Dados: '/negotiation',
    Parceiros: '/partners',
    Pendencias: '/pendings',
    Controle: '/portalcontrolls',
    ClientReceipt: '/client-receipt',
  };
  const endpoint = endpoints[dataType];
  if (!endpoint) return false;

  const res = await fetch(`http://localhost:3333${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  return res.ok;
}

export type DataType =
  | 'Contratos'
  | 'Dados'
  | 'Parceiros'
  | 'Pendencias'
  | 'Controle'
  | 'ClientReceipt';

export interface FileUploadProps {
  onFileUpload?: (file: File, name: string) => void;
}
