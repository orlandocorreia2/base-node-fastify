import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../error/unauthorized.error';

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
    console.error(error);
    throw new UnauthorizedError();
  }
};
