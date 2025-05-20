import { body } from "./body";
import { response } from "./response";

export const createUserSchema = {
  tags: ["Users"],
  description: "Create a new user",
  body,
  response,
};
