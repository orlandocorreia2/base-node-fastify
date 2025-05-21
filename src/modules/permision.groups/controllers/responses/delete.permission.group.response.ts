import { FastifyReply } from 'fastify';

type DeletePermissionGroupResponseProps = {
  reply: FastifyReply;
};

export class DeletePermissionGroupResponse {
  static success({ reply }: DeletePermissionGroupResponseProps) {
    return reply.status(200).send();
  }
}
