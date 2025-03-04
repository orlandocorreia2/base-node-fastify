import { UserController } from "../controllers/user.controller";
import { container } from "tsyringe";
import { createUserSchema } from "./schemas/create.user.schema";
import { FastifyTypedInstance } from "@/types/types";
import { z } from "zod";

export const userRoutes = (app: FastifyTypedInstance) => {
  const userController = container.resolve(UserController);

  app.post("/users", { schema: createUserSchema }, (request, reply) =>
    userController.create(request, reply)
  );
};
