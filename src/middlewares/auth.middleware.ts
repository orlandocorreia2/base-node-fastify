import { UnauthorizedError } from '@/error/unauthorized.error';
import { FastifyReply, FastifyRequest } from 'fastify';

export const authMiddleware = async (
  request: FastifyRequest,
  _: FastifyReply,
) => {
  if (!request.headers?.authorization) {
    throw new UnauthorizedError();
  }
  try {
    await request.jwtVerify();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError();
  }
};
