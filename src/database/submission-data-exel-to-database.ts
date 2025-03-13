import { useExcelReader } from '@/hooks/use-exel-reader';
import type { ProcessedExcelData } from './types'; // ajuste o caminho conforme necessário

export async function submissionDataExcelToDatabase(
  file: File
): Promise<ProcessedExcelData> {
  if (!file) throw new Error('Arquivo não informado');

  try {
    const parsedData = await useExcelReader(file);
    console.log('Dados lidos:', parsedData);

    const contracts = parsedData?.Contratos?.map((contract: any) => ({
      city: contract['Cidade'] || null, // Cidade
      client: contract['CLIENTE'] || '', // CLIENTE
      state: contract['Estado'] || null, // Estado
      cnpj: contract['CNPJ'] || null, // CNPJ
      sindic: contract['Sindic'] || null, // Sindic
      year: contract['ANO'] || null, // ANO
      matter: contract['MATÉRIA'] || null,
      forecast: contract['Previsao'] || null,
      contractTotal: contract['CONTRATO TOTAL'] || null,
      percentage: contract['PERCENTUAL']
        ? parseFloat(contract['PERCENTUAL'])
        : null, // PERCENTUAL
      signedContract: contract['CONTRATO ASSINADO'] || null, // CONTRATO ASSINADO
      status: contract['STATUS'] || null, // STATUS
      averageGuide: contract['MÉDIA DE GUIA']
        ? parseFloat(contract['MÉDIA DE GUIA'])
        : null, // MÉDIA DE GUIA
      partner: contract['PARCEIRO'] || null, // PARCEIRO
      partnerCommission: contract['Comissão parceiro']
        ? parseFloat(contract['Comissão parceiro'])
        : null, // Comissão parceiro
      counter: contract['Contador'] || null, // Contador
      email: contract['e-mail responsável'] || null, // e-mail responsável
    }));

    // Aqui mantemos o mapeamento dos outros campos como estavam
    const negotiations = parsedData?.Dados?.map((dataNegotiation: any) => ({
      title: dataNegotiation['título'],
      client: dataNegotiation['Cliente'],
      user: dataNegotiation['ususario'],
      tags: dataNegotiation['Tags'],
      status: dataNegotiation['Status'],
      step: dataNegotiation['Etapa'],
      value: dataNegotiation['Valor'],
      startsDate: dataNegotiation['Data Início'],
      observation: dataNegotiation['OBS'],
      partnerId: dataNegotiation['PARCEIRO'],
      averageGuide: dataNegotiation['média'],
    }));

    const partners = parsedData?.Parceiros?.map((partner: any) => ({
      name: partner['NOME'],
      cpfOrCnpj: partner['CPF/CNPJ'],
      city: partner['CIDADE'],
      state: partner['ESTADO'],
      commission: partner['COMISSÃO'],
      portal: partner['PORTAL'],
      channelHead: partner['Head de Canal'],
      regional: partner['REGIONAL'],
      coordinator: partner['COORDENADOR'],
      agent: partner['AGENTE'],
      indicator: partner['INDICADOR'],
      contract: partner['CONTRATO'],
      phone: partner['TELEFONE'],
      email: partner['E-MAIL'],
      responsible: partner['responsável'],
    }));

    return { contracts, negotiations, partners };
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error);
    throw error;
  }
}
