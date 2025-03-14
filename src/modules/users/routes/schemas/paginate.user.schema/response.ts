import { getVersion } from '../../../../../utils/helper';
import { z } from 'zod';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.object({
      items: z.array(
        z.object({
          id: z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
          name: z.string({ description: 'Administrador' }),
          email: z.string({ description: 'jonhdoe@email.com' }),
          expiredAt: z.date({ description: '2298-12-28T01:05:14.688Z' }),
          phone: z.optional(z.string({ description: '11911111111' })),
          address: z.optional(
            z.string({ description: 'Avenida Paulista, 1000' }),
          ),
          createdAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
          updatedAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
          permissionGroups: z.optional(
            z.array(
              z.object({
                id: z.string(),
                name: z.string(),
              }),
            ),
          ),
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
