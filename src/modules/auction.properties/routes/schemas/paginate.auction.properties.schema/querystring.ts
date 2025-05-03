import { z } from 'zod';

export const querystring = z.object({
  page: z
    .string({ message: 'Page is required.', description: '1' })
    .default('1'),
  qtdItemsPerPage: z
    .string({ message: 'Qtd item per page is required.', description: '10' })
    .default('10'),
  uf: z.string().optional(),
  city: z.string().optional(),
  sale_method: z.string().optional(),
  property_type: z.string().optional(),
  discount: z.string().optional(),
  appraisal_value: z.string().optional(),
});
