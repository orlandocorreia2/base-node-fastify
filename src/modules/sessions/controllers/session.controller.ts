import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { AuthUser } from '../DTOs/session';
import { CreateSessionUseCaseInterface } from '../usecases/interfaces/create.session.usecase.interface';

@injectable()
export class SessionController {
  constructor(
    @inject('CreateSessionUseCase')
    private _createSessionUseCase: CreateSessionUseCaseInterface,
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
      console.error('Error:', error);
      throw error;
    }
  }
}
