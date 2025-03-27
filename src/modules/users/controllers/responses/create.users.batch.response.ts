import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { UserCreateBatchMessagesProps } from '../../usecases/types';

type CreateUsersBatchResponseProps = {
  result: UserCreateBatchMessagesProps;
  reply: FastifyReply;
};

export class CreateUsersBatchResponse extends BaseResponse {
  static success({ result, reply }: CreateUsersBatchResponseProps) {
    const defaultData = this.setDefaultData(result);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.log('Error:', error);
    throw error;
  }
}
