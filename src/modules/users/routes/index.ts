import { container } from "tsyringe";
import { FastifyTypedInstance } from "@/types/types";
import { UserController } from "../controllers/user.controller";
import { createUserSchema } from "./schemas/create.user.schema";

export const userRoutesModule = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);

  app.post("/users", { schema: createUserSchema }, (request, reply) =>
    userController.create(request, reply),
  );

  app.get("/users/profile", (request) => {
    return request.user;
  });
};
