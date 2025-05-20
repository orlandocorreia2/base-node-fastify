import { z } from 'zod';
import { dateFutureDays } from '../../../../../utils/date';

export const body = z.object({
  name: z
    .string({ message: 'User name is required.' })
    .min(3, { message: 'User name is invalid.' })
    .describe('John Doe')
    .transform(value => value.trim()),
  email: z
    .string({ message: 'User email is required.' })
    .email({ message: 'User email must be type of email.' })
    .describe('johndoe@email.com')
    .transform(value => value.trim()),
  phone: z
    .optional(z.string())
    .describe('11911111111')
    .transform(value => value?.trim()),
  address: z
    .optional(z.string())
    .describe('Avenida Paulista, 1000')
    .transform(value => value?.trim()),
  expiredAt: z
    .string()
    .describe(dateFutureDays(30).toISOString())
    .transform(value => value.trim()),
  permissionGroupsId: z.optional(
    z.array(z.string()).describe('d9546d3d-53d4-420d-86b4-469925e09463'),
  ),
});
