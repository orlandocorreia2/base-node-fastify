import { z } from 'zod';

export const querystring = z.object({
  page: z
    .string({ message: 'Page is required.', description: '1' })
    .default('1'),
  qtdItemsPerPage: z
    .string({ message: 'Qtd item per page is required.', description: '10' })
    .default('10'),
  uf: z
    .string()
    .optional()
    .transform(value => value?.toUpperCase().trim()),
  city: z
    .string()
    .optional()
    .transform(value => value?.toUpperCase().trim()),
  sale_method: z
    .string()
    .optional()
    .transform(value => value?.trim()),
  property_type: z
    .string()
    .optional()
    .transform(value => value?.trim()),
  discount: z.string().optional(),
  appraisal_value: z.string().optional(),
});
