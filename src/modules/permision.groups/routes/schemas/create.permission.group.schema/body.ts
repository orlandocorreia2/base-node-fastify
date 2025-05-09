import { z } from 'zod';

export const body = z.object({
  name: z
    .string({
      message: 'Permission group name is required.',
      description: 'Permission group name',
    })
    .min(3, { message: 'Permission group name is invalid.' })
    .transform(value => value.trim()),
  description: z
    .string()
    .optional()
    .transform(value => value?.trim()),
  permissionRulesId: z.array(
    z.string({ description: '63b33f45-568a-4415-874f-b04a7bc39645' }),
  ),
});
