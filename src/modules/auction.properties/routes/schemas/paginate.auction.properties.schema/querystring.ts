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
  saleMethod: z
    .string()
    .optional()
    .transform(value => value?.trim()),
  propertyType: z
    .string()
    .optional()
    .transform(value => value?.trim()),
  discount: z.string().optional(),
  price: z.string().optional(),
  acceptFinancing: z.string().optional(),
  favorite: z.string().optional(),
  orderBy: z.string().optional(),
  orderByDirection: z.string().optional(),
});
