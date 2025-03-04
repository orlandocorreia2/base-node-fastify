import { z } from "zod";

export const body = z.object({
  name: z
    .string({ message: "User name is required." })
    .min(3, { message: "User name is invalid." })
    .default("Jonh Doe"),
  email: z
    .string({ message: "User email is required." })
    .email({ message: "User email must be type of email." })
    .default("jonhdoe@email.com"),
});
