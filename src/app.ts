import fastify, { FastifyInstance } from "fastify";
import { appRoutes } from "./routes";
import "./shared/container";
import plugins from "plugins";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

export const createApp = () => {
  const app: FastifyInstance = fastify({
    logger: false,
  }).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(plugins.cors);
  app.register(plugins.swagger);
  app.register(appRoutes);

  return app;
};
