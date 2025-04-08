import { getVersion } from '../../../../../utils/helper';
import { z } from 'zod';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.object({
      items: z.array(
        z.object({
          id: z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
          numberProperty: z.number({ description: '8787709298777' }),
          uf: z.string({ description: 'SP' }),
          city: z.string({ description: 'SAO PAULO' }),
          neighborhood: z.string({ description: 'SANTO AMARO' }),
          address: z.string({
            description: 'ESTRADA DOS MIRANDAS, N. 315 E 32, Apto 102, BL-02',
          }),
          price: z.number({ description: '229' }),
          appraisalValue: z.number({ description: '229' }),
          discount: z.number({ description: '0' }),
          description: z.string({
            description:
              'Apartamento, 0.00 de área total, 42.10 de área privativa, 0.00 de área do terreno,  2 qto(s), WC, 1 sala(s), cozinha.',
          }),
          saleMethod: z.string({ description: 'Leilão SFI - Edital único' }),
          accessLink: z.string({
            description:
              'https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnOrigem=index&hdnimovel=8787709298777',
          }),
          acceptFinancing: z.string({ description: 'NÀO' }),
        }),
      ),
      page: z.number({ description: '1' }),
      qtdItemsPerPage: z.number({ description: '10' }),
      total: z.number({ description: '3' }),
    }),
  }),
  401: z.object({
    message: z.string().describe('Unauthorized'),
  }),
  422: z.object({
    message: z.string().describe('Unprocessable'),
  }),
  500: z.object({
    message: z.string().describe('Internal Server Error'),
  }),
};
