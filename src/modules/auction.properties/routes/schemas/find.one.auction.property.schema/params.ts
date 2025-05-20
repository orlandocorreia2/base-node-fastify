import { z } from 'zod';

export const params = z.object({
  id: z.string({
    message: 'Id is required.',
    description: 'f3ea4819-0955-4839-815f-a92e13aadbb3',
  }),
});
