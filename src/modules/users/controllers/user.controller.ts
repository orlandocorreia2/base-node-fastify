import { FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequestProps } from '../DTOs/user';
import { CreateUserUseCaseInterface } from '../usecases/interfaces/create.user.use.case.interface';
import { FastifyAuthRequest } from '../../../types/types';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private _createUserUseCase: CreateUserUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const created_by_id = request.user.id;
      const { name, email, expiredAt, phone, address, permissionGroupsId } =
        request.body as CreateUserRequestProps;
      await this._createUserUseCase.execute({
        created_by_id,
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
