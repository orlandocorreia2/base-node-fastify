import { z } from 'zod';
import { getVersion } from '../../../../../utils/helper';

export const response = {
  200: z.object({
    version: z.string({ description: getVersion() }),
    data: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.optional(z.string()),
      address: z.optional(z.string()),
      expiredAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
      createdAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
      updatedAt: z.date({ description: '2025-03-08T00:45:12.815Z' }),
      permissionGroups: z.optional(
        z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          }),
        ),
      ),
    }),
  }),
  401: z.object({
    message: z.string().describe('Unauthorized'),
  }),
  422: z.object({
    message: z.string().describe('Unprocessable'),
  }),
  500: z.object({
    message: z.string().describe('Internal Server Error'),
  }),
};
