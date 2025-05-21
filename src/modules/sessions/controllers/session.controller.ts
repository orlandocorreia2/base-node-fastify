import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { AuthUser } from '../DTOs/session';
import { CreateSessionUseCaseInterface } from '../usecases/interfaces/create.session.usecase.interface';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class SessionController {
  constructor(
    @inject('CreateSessionUseCase')
    private readonly _createSessionUseCase: CreateSessionUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as AuthUser;
      const session = await this._createSessionUseCase.execute({
        email,
        password,
      });
      return reply.status(200).send(session);
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
