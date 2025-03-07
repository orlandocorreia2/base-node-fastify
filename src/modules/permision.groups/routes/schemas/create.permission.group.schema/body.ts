import { z } from 'zod';

export const body = z.object({
  name: z
    .string({ message: 'User name is required.' })
    .describe('John Doe')
    .min(3, { message: 'User name is invalid.' }),
  description: z.string().optional(),
});
