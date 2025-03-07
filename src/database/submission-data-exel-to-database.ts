import { useReadExcelFile } from "@/hooks/use-exel-reader";

export function submissionDataExcelToDatabase() {
  const file = event.target.files?.[0];
  if (!file) return;


  try {
    const parsedData = await useReadExcelFile(file);
    setData(parsedData);
    console.log('✅ Dados processados:', parsedData);

    const contracts = parsedData['Contratos']?.map((contract: any) => ({
      city: contract['Cidade'],
      client: contract['CLIENTE'],
      state: contract['Estado'],
      cnpj: contract['CNPJ'],
      sindic: contract['Sindic'],
      year: contract['ANO'],
      matter: contract['MATÉRIA'],
      forecast: contract['Previsao'],
      contractTotal: contract['CONTRATO TOTAL'],
      percentage: contract['PERCENTUAL'],
      signedContract: contract['CONTRATO ASSINADO'],
      status: contract['STATUS'],
      averageGuide: contract['MÉDIA DE GUIA'],
      partner: contract['PARCEIRO'],
      partnerCommission: contract['Comissão parceiro'],
      counter: contract['Contador'],
      email: contract['e-mail responsável'],
    }));

    const negotiations = parsedData['Dados']?.map((dataNegotiation: any) => ({
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

    const partners = parsedData['Parceiros']?.map((partner: any) => ({
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

    if (contracts) {
      contracts.forEach(contract => {
        createContract(contract);
      });
    }

    if (negotiations) {
      negotiations.forEach(negotiation => {
        createDataNegotiation(negotiation);
      });
    }

    if (partners) {
      partners.forEach(partner => {
        createPartner(partner);
      });
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error);
  } finally {
    setLoading(false);
  }
}