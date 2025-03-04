import { z } from "zod";

export const response = {
  201: z.null().describe("User created"),
  401: z.object({
    message: z.string(),
  }),
  422: z.object({
    message: z.string(),
  }),
  500: z.object({
    message: z.string(),
  }),
};
