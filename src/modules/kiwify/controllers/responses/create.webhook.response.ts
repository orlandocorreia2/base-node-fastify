import { FastifyReply } from 'fastify';

type CreateWebhookResponseProps = {
  reply: FastifyReply;
};

export class CreateWebhookResponse {
  static success({ reply }: CreateWebhookResponseProps) {
    return reply.status(200).send();
  }
}
