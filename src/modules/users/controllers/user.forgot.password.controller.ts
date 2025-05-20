import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserForgotPasswordRequestProps } from '../DTOs/user';
import { CreateUserForgotPasswordUseCaseInterface } from '../usecases/interfaces/create.user.forgot.password.use.case.interface';
import { CreateUserForgotPasswordResponse } from './responses/create.user.forgot.password.response';

@injectable()
export class UserForgotPasswordController {
  constructor(
    @inject('CreateUserForgotPasswordUseCase')
    private _createUserForgotPasswordUseCase: CreateUserForgotPasswordUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = request.body as CreateUserForgotPasswordRequestProps;
      await this._createUserForgotPasswordUseCase.execute(email);
      return CreateUserForgotPasswordResponse.success({ reply });
    } catch (error) {
      CreateUserForgotPasswordResponse.error(error);
    }
  }
}
