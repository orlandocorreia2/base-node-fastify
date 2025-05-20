import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';

type ResetUserPasswordResponseProps = {
  reply: FastifyReply;
};

export class ResetUserPasswordResponse extends BaseResponse {
  static success({ reply }: ResetUserPasswordResponseProps) {
    const dataResult = {
      message: 'Senha atualizada com sucesso!',
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
