import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';

type CreateUserForgotPasswordProps = {
  reply: FastifyReply;
};

export class CreateUserForgotPasswordResponse extends BaseResponse {
  static success({ reply }: CreateUserForgotPasswordProps) {
    const dataResult = {
      message:
        'Foi enviado para o email um link para redefinir a senha. Acesse para continuar.',
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.log('Error:', error);
    throw error;
  }
}
