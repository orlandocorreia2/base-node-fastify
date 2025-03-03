import fastify, { FastifyInstance } from "fastify";
import { initRoutes } from "./routes";

export const createApp = () => {
  const app: FastifyInstance = fastify({ logger: false });

  initRoutes(app);

  return app;
};
