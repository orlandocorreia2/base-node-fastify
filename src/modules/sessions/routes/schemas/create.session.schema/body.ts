import { z } from 'zod';

export const body = z.object({
  email: z
    .string({ message: 'User email is required.' })
    .email({ message: 'User email must be type of email.' })
    .describe('johndoe@email.com')
    .transform(value => value.trim()),
  password: z
    .string({ message: 'User password is required.' })
    .min(8, { message: 'User password is invalid.' })
    .describe('6rx2@AGFS9I')
    .transform(value => value.trim()),
});
