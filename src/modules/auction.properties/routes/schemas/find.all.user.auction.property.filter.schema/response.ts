import { getVersion } from '../../../../../utils/helper';
import { z } from 'zod';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.array(
      z.object({
        id: z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
        name: z.string({ description: 'Name filter' }),
        filter: z.string({
          description:
            'https://dev.meuleilaoonline.com/dashboard?uf=SP&city=SAO+PAULO&page=1&qtdItemsPerPage=50',
        }),
      }),
    ),
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
