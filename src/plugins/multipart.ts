import fp from 'fastify-plugin';
import multipart, { FastifyMultipartOptions } from '@fastify/multipart';

export default fp<FastifyMultipartOptions>(async fastify => {
  await fastify.register(multipart, {
    limits: {
      fieldSize: 1000000,
      fileSize: 1024 * 1024 * 100,
    },
  });
  // await fastify.register(multipart, {
  //   attachFieldsToBody: true,
  //   limits: {
  //     fieldSize: 1000000,
  //     fileSize: 1024 * 1024 * 100,
  //   },
  //   throwFileSizeLimit: true,
  // });
});
