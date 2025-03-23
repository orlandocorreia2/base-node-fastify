import { z } from 'zod';
import { getVersion } from '../../../../../utils/helper';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.object({
      message: z
        .string()
        .describe(
          'Foi enviado para o email um link para redefinir a senha. Acesse para continuar.',
        ),
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
