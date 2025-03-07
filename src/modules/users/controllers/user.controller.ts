import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserUseCaseInterface } from '../interfaces/create.user.use.case.interface';
import { CreateUser } from '../interfaces/user';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private _createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email } = request.body as CreateUser;
      await this._createUserUseCase.execute({ name, email });
      return reply.status(201).send();
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

  async findAll(_, reply: FastifyReply) {
    reply.send({ message: 'Todos Usuários' });
  }

  async findOne(_, reply: FastifyReply) {
    reply.send({ message: 'Um usuário' });
  }

  async update(_, reply: FastifyReply) {
    reply.send({ message: 'Atualizando um usuário' });
  }

  async delete(_, reply: FastifyReply) {
    reply.send({ message: 'EXcluindo um usuário' });
  }
}
