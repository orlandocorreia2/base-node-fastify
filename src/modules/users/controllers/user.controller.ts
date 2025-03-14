import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequestProps } from '../DTOs/user';
import { CreateUserUseCaseInterface } from '../usecases/interfaces/create.user.use.case.interface';
import { FastifyAuthRequest, PaginateRequestProps } from '../../../types/types';
import { PaginateUsersUseCaseInterface } from '../usecases/interfaces/paginate.users.use.case.interface';
import { PaginateUserResponse } from './responses/paginate.user.response';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private _createUserUseCase: CreateUserUseCaseInterface,
    @inject('PaginateUsersUseCase')
    private _paginateUsersUseCase: PaginateUsersUseCaseInterface,
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

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, qtdItemsPerPage } = request.query as PaginateRequestProps;
      const result = await this._paginateUsersUseCase.execute({
        page,
        qtdItemsPerPage,
      });
      return PaginateUserResponse.success({ result, reply });
    } catch (error) {
      PaginateUserResponse.error(error);
    }
  }
}
