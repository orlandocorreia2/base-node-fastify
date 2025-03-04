import { z } from "zod";

export const body = z.object({
  email: z
    .string({ message: "User email is required." })
    .email({ message: "User email must be type of email." }),
  password: z
    .string({ message: "User password is required." })
    .min(8, { message: "User password is invalid." }),
});
