import fp from 'fastify-plugin';
import fastifyJwt, { FastifyJwtSignOptions } from '@fastify/jwt';
import { env } from '../utils/env';

export default fp<FastifyJwtSignOptions>(async fastify => {
  await fastify.register(fastifyJwt, { secret: env({ key: 'JWT_SECRET' }) });
});
