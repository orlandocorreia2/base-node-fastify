import { getVersion } from '@/utils/helper';
import { z } from 'zod';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.array(
      z.object({
        id: z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
        rule: z.string({ description: 'createUser' }),
        type: z.string({ description: 'user' }),
        description: z.string({ description: 'Create user permission' }),
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
