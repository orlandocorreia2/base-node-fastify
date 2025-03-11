import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserUseCaseInterface } from '../interfaces/create.user.use.case.interface';
import { CreateUserRequest } from '../DTOs/user';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private _createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, expiredAt, phone, address, permissionGroupsId } =
        request.body as CreateUserRequest;
      await this._createUserUseCase.execute({
        name,
        email,
        expiredAt,
        phone,
        address,
        permissionGroupsId,
      });
      return reply.status(201).send();
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
