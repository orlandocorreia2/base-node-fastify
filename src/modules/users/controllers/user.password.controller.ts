import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { ResetUserPasswordUseCaseInterface } from '../usecases/interfaces/reset.user.password.use.case.interface';
import { ResetUserPasswordRequestProps } from '../DTOs/user';
import { ResetUserPasswordResponse } from './responses/reset.user.password.response';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class UserPasswordController {
  constructor(
    @inject('ResetUserPasswordUseCase')
    private readonly _resetUserPasswordUseCase: ResetUserPasswordUseCaseInterface,
  ) {}

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { token, password } = request.body as ResetUserPasswordRequestProps;
      await this._resetUserPasswordUseCase.execute({
        token,
        password,
      });
      return ResetUserPasswordResponse.success({ reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
