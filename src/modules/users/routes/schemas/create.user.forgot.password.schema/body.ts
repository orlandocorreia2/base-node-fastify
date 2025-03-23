import { z } from 'zod';

export const body = z.object({
  email: z
    .string({ message: 'User email is required.' })
    .email({ message: 'User email must be type of email.' })
    .describe('johndoe@email.com'),
});
