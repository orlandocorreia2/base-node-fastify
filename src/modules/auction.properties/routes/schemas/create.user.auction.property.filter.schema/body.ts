import { z } from 'zod';

export const body = z.object({
  name: z
    .string({ message: 'Filter name is required.' })
    .describe('Filter')
    .transform(value => value.trim()),
  filter: z
    .string({ message: 'Filter is required.' })
    .describe(
      'https://dev.meuleilaoonline.com/dashboard?uf=SP&city=SAO+PAULO&page=1&qtdItemsPerPage=50',
    )
    .transform(value => value.trim()),
});
