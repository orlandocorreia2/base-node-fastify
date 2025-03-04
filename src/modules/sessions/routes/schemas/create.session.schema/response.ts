import { z } from "zod";

export const response = {
  201: z.object({
    token: z.string(),
  }),
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
