import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserForgotPasswordRequestProps } from '../DTOs/user';
import { CreateUserForgotPasswordUseCaseInterface } from '../usecases/interfaces/create.user.forgot.password.use.case.interface';
import { CreateUserForgotPasswordResponse } from './responses/create.user.forgot.password.response';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class UserForgotPasswordController {
  constructor(
    @inject('CreateUserForgotPasswordUseCase')
    private readonly _createUserForgotPasswordUseCase: CreateUserForgotPasswordUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = request.body as CreateUserForgotPasswordRequestProps;
      await this._createUserForgotPasswordUseCase.execute(email);
      return CreateUserForgotPasswordResponse.success({ reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
