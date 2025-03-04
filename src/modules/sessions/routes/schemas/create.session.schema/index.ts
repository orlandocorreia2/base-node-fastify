import { body } from "./body";
import { response } from "./response";

export const createSessionSchema = {
  tags: ["Sessions"],
  description: "Create a new session",
  body,
  response,
};
