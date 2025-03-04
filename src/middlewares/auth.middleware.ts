import { UnauthorizedError } from "@/error/unauthorized.error";
import { FastifyReply, FastifyRequest } from "fastify";

export const authMiddleware = (
  request: FastifyRequest,
  _: FastifyReply,
  next: any,
) => {
  if (!request.headers?.authorization) {
    throw new UnauthorizedError();
  }
  try {
    request.jwtVerify();
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError();
  }
};
