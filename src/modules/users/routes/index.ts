import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

export const userRoutes = (app: FastifyInstance) => {
  app.post("/users", new UserController().create);
  app.get("/users", new UserController().findAll);
  app.get("/users/:id", new UserController().findOne);
  app.patch("/users/:id", new UserController().update);
  app.delete("/users/:id", new UserController().delete);
};
