import { z } from "zod";

export const response = {
  200: z.object({
    id: z.string().describe("21108cd9-0303-4815-a55f-dfddc72958b0"),
    email: z.string().describe("johndoe@email.com"),
    name: z.string().describe("Jonh Doe")
  }),
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
