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
          description: z.string({
            description: 'Grupo com todas as permissões',
          }),
          createdAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
          updatedAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
          users: z.optional(
            z.array(
              z.object({
                id: z.string(),
                name: z.string(),
              }),
            ),
          ),
          rules: z.optional(
            z.array(
              z.object({
                id: z.string(),
                rule: z.string(),
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
