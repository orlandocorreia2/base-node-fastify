import fastify, { FastifyInstance } from "fastify";
import { appRoutes, sessionRoutes } from "./routes";
import "./shared/container";
import plugins from "plugins";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

const app: FastifyInstance = fastify({
  logger: false,
}).withTypeProvider<ZodTypeProvider>();

(() => {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(plugins.jwt);
  app.register(plugins.cors);
  app.register(plugins.swagger);
  app.register(appRoutes);
  app.register(sessionRoutes);
})();

export { app };
