import { z } from "zod";

export const response = {
  201: z.null().describe("User created"),
  401: z.object({
    statusCode: z.number().gt(400).lt(402),
    error: z.string().regex(/Unauthorized/),
    message: z.string(),
  }),
  422: z.object({
    statusCode: z.number().gt(421).lt(423),
    error: z.string().regex(/Unprocessable Entity/),
    message: z.string(),
  }),
  500: z.object({
    statusCode: z.number().gt(499).lt(501),
    error: z.string().regex(/Internal Server Error/),
    message: z.string(),
  }),
};
