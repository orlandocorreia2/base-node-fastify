import fastify, { FastifyInstance } from "fastify";
import { appRoutes } from "./routes";
import "./shared/container";
import plugins from "plugins";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const createApp = () => {
  const app: FastifyInstance = fastify({
    logger: false,
  }).withTypeProvider<ZodTypeProvider>();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(plugins.cors);
  // app.register(plugins.swagger);
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Typed API",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });
  app.register(appRoutes);

  return app;
};
