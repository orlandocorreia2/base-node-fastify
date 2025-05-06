import { z } from 'zod';

export const body = z.object({
  name: z
    .string({ message: 'User name is required.' })
    .min(3, { message: 'User name is invalid.' })
    .describe('John Doe')
    .transform(value => value.trim()),
  password: z
    .optional(
      z
        .string({ message: 'User password is required.' })
        .min(8, { message: 'User password is invalid.' }),
    )
    .transform(value => value?.trim()),
  phone: z
    .optional(z.string())
    .describe('11911111111')
    .transform(value => value?.trim()),
  address: z
    .optional(z.string())
    .describe('Avenida Paulista, 1000')
    .transform(value => value?.trim()),
});
