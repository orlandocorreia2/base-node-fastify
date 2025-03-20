import { z } from "zod";

export const response = {
  201: z.null().describe("No content"),
  401: z.object({
    message: z.string().describe("Unauthorized"),
  }),
  422: z.object({
    message: z.string().describe("Unprocessable"),
  }),
  500: z.object({
    message: z.string().describe("Internal Server Error"),
  }),
};
