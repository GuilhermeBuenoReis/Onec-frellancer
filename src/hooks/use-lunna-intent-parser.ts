export type LunnaIntent =
  | 'upload'
  | 'honorarios'
  | 'pendencias'
  | 'contratos'
  | 'clientes'
  | 'desconhecido';

const uploadKeywords = [
  'enviar planilha',
  'subir planilha',
  'upload',
  'importar',
  'excel',
  'planilha',
];

const honorariosKeywords = [
  'honorario',
  'honorários',
  'honorário',
  'portalcontrolls',
  'hon',
];

const pendenciasKeywords = ['pendência', 'pendencias', 'pendente', 'pendings'];

const contratosKeywords = ['contrato', 'contratos'];

const clientesKeywords = ['cliente', 'clientes', 'client'];

export function useLunnaIntentParser(): (input: string) => LunnaIntent {
  return (input: string) => {
    const lower = input.toLowerCase();

    const matchesUpload = uploadKeywords.some(keyword =>
      lower.includes(keyword)
    );
    const matchesHonorarios = honorariosKeywords.some(keyword =>
      lower.includes(keyword)
    );
    const matchesPendencias = pendenciasKeywords.some(keyword =>
      lower.includes(keyword)
    );
    const matchesContratos = contratosKeywords.some(keyword =>
      lower.includes(keyword)
    );
    const matchesClientes = clientesKeywords.some(keyword =>
      lower.includes(keyword)
    );

    if (matchesHonorarios) return 'honorarios';
    if (matchesUpload) return 'upload';
    if (matchesPendencias) return 'pendencias';
    if (matchesContratos) return 'contratos';
    if (matchesClientes) return 'clientes';

    return 'desconhecido';
  };
}
