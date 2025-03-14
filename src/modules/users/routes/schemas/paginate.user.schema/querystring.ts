import { z } from 'zod';

export const querystring = z.object({
  page: z
    .string({ message: 'Page is required.', description: '1' })
    .default('1'),
  qtdItemsPerPage: z
    .string({ message: 'Qtd item per page is required.', description: '10' })
    .default('10'),
});
