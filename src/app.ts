import fastify, { FastifyInstance } from "fastify";

export const createApp = () => {
  const app: FastifyInstance = fastify({ logger: false });

  app.get("/users", (req, res) => {
    res.send({ message: "ok" });
  });

  return app;
};
