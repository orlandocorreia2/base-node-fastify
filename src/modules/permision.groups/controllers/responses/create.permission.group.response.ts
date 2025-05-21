import { FastifyReply } from 'fastify';

type CreatePermissionGroupResponseProps = {
  reply: FastifyReply;
};

export class CreatePermissionGroupResponse {
  static success({ reply }: CreatePermissionGroupResponseProps) {
    return reply.status(201).send();
  }
}
