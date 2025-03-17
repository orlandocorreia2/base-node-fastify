import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../error/unauthorized.error';

export const canMiddleware = async (
  request: FastifyRequest,
  _: FastifyReply,
) => {
  console.log('Can: ', request);
  try {
    await request.jwtVerify();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError();
  }
};
