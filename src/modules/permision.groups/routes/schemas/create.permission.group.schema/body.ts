import { z } from 'zod';

export const body = z.object({
  name: z
    .string({ message: 'User name is required.' })
    .describe('John Doe')
    .min(3, { message: 'User name is invalid.' }),
  description: z.string().optional(),
  permissionRulesId: z.array(
    z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
  ),
});
