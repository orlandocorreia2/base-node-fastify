import { getVersion } from '../../../../../utils/helper';
import { z } from 'zod';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.object({
      totalRegisteredUsers: z.number().describe('10'),
      totalRenewalUsers: z.number().describe('5'),
      totalNotRegisteredUsers: z.number().describe('1'),
      notRegisteredUsers: z.array(
        z
          .string()
          .describe(
            'Erro na linha: 2. Usuário(a): com nome: Jonh Doe e email: jonhdoe@ não cadastrado devido a falha de validação.',
          ),
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
