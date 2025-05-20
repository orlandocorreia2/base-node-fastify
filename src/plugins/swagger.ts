import fp from 'fastify-plugin';
import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwaggerUi from '@fastify/swagger-ui';

export default fp<SwaggerOptions>(async fastify => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Typed API',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });
  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
});
