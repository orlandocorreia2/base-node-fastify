import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { container } from "tsyringe";

export const userRoutes = (app: FastifyInstance) => {
  const userController = container.resolve(UserController);

  app.post("/users", userController.create);
  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findOne);
  app.patch("/users/:id", userController.update);
  app.delete("/users/:id", userController.delete);
};
