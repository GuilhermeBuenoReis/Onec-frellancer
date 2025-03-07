import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FileUpload } from '@/components/file-upload'; // Certifique-se de ter esse componente
import { useReadExcelFile } from '@/hooks/use-exel-reader';
import {
  useCreateContract,
  useCreateDataNegotiation,
  useCreatePartner,
} from '@/http/generated/api';

interface FormValues {
  file: File | null;
}

export function Upload() {
  const { control, handleSubmit } = useForm<FormValues>();
  const [data, setData] = useState<Record<string, any[]> | null>(null);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createContract } = useCreateContract();
  const { mutateAsync: createDataNegotiation } = useCreateDataNegotiation();
  const { mutateAsync: createPartner } = useCreatePartner();

  // const onSubmit = async (formData: FormValues) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   setLoading(true);
  //   try {
  //     const parsedData = await useReadExcelFile(file);
  //     setData(parsedData);
  //     console.log('✅ Dados processados:', parsedData);

  //     const contracts = parsedData['Contratos']?.map((contract: any) => ({
  //       city: contract['Cidade'],
  //       client: contract['CLIENTE'],
  //       state: contract['Estado'],
  //       cnpj: contract['CNPJ'],
  //       sindic: contract['Sindic'],
  //       year: contract['ANO'],
  //       matter: contract['MATÉRIA'],
  //       forecast: contract['Previsao'],
  //       contractTotal: contract['CONTRATO TOTAL'],
  //       percentage: contract['PERCENTUAL'],
  //       signedContract: contract['CONTRATO ASSINADO'],
  //       status: contract['STATUS'],
  //       averageGuide: contract['MÉDIA DE GUIA'],
  //       partner: contract['PARCEIRO'],
  //       partnerCommission: contract['Comissão parceiro'],
  //       counter: contract['Contador'],
  //       email: contract['e-mail responsável'],
  //     }));

  //     const negotiations = parsedData['Dados']?.map((dataNegotiation: any) => ({
  //       title: dataNegotiation['título'],
  //       client: dataNegotiation['Cliente'],
  //       user: dataNegotiation['ususario'],
  //       tags: dataNegotiation['Tags'],
  //       status: dataNegotiation['Status'],
  //       step: dataNegotiation['Etapa'],
  //       value: dataNegotiation['Valor'],
  //       startsDate: dataNegotiation['Data Início'],
  //       observation: dataNegotiation['OBS'],
  //       partnerId: dataNegotiation['PARCEIRO'],
  //       averageGuide: dataNegotiation['média'],
  //     }));

  //     const partners = parsedData['Parceiros']?.map((partner: any) => ({
  //       name: partner['NOME'],
  //       cpfOrCnpj: partner['CPF/CNPJ'],
  //       city: partner['CIDADE'],
  //       state: partner['ESTADO'],
  //       commission: partner['COMISSÃO'],
  //       portal: partner['PORTAL'],
  //       channelHead: partner['Head de Canal'],
  //       regional: partner['REGIONAL'],
  //       coordinator: partner['COORDENADOR'],
  //       agent: partner['AGENTE'],
  //       indicator: partner['INDICADOR'],
  //       contract: partner['CONTRATO'],
  //       phone: partner['TELEFONE'],
  //       email: partner['E-MAIL'],
  //       responsible: partner['responsável'],
  //     }));

  //     if (contracts) {
  //       contracts.forEach(contract => {
  //         createContract({ data: contract });
  //       });
  //     }

  //     if (partners) {
  //       partners.forEach(partner => {
  //         createPartner({ data: partner });
  //       });

  //       if (negotiations) {
  //         negotiations.forEach(negotiation =>
  //           createDataNegotiation({ data: negotiation, params: })
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Erro ao processar o arquivo:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  function onSubmit() {
    console.log('foi');
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Upload de Planilha
        </h2>

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FileUpload
              onFileUpload={(file: File, fileName: string) => {
                console.log('📂 Arquivo recebido no Controller:', file);
                onChange(file);
              }}
            />
          )}
        />

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Enviar
        </button>

        {loading && (
          <p className="mt-4 text-gray-600">Carregando dados da planilha...</p>
        )}
      </form>
    </>
  );
}
