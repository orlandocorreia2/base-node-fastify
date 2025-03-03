import { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/users/routes";

export const initRoutes = (app: FastifyInstance) => {
  userRoutes(app);
};
