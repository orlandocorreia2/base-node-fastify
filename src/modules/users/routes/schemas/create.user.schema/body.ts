import { z } from "zod";

export const body = z.object({
  name: z
    .string({ message: "User name is required." })
    .describe("John Doe")
    .min(3, { message: "User name is invalid." }),
  email: z
    .string({ message: "User email is required." })
    .email({ message: "User email must be type of email." })
    .describe("johndoe@email.com")
});
