import { dateFutureDays } from '../../../../../utils/date';
import { z } from 'zod';

export const body = z.object({
  name: z
    .string({ message: 'User name is required.' })
    .min(3, { message: 'User name is invalid.' })
    .describe('John Doe'),
  email: z
    .string({ message: 'User email is required.' })
    .email({ message: 'User email must be type of email.' })
    .describe('johndoe@email.com'),
  phone: z.optional(z.string()).describe('11911111111'),
  address: z.optional(z.string()).describe('Avenida Paulista, 1000'),
  expiredAt: z.string().describe(dateFutureDays(30).toISOString()),
  permissionGroupsId: z.optional(
    z.array(z.string()).describe('d9546d3d-53d4-420d-86b4-469925e09463'),
  ),
});
