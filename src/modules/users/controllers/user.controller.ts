import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequestProps, UpdateUserRequestProps } from '../DTOs/user';
import { CreateUserUseCaseInterface } from '../usecases/interfaces/create.user.use.case.interface';
import {
  FastifyAuthRequest,
  PaginateRequestProps,
  ParamRequestProps,
} from '../../../types/types';
import { PaginateUsersUseCaseInterface } from '../usecases/interfaces/paginate.users.use.case.interface';
import { PaginateUserResponse } from './responses/paginate.user.response';
import { FindOneUserUseCaseInterface } from '../usecases/interfaces/find.one.user.use.case.interface';
import { FindOneUserResponse } from './responses/find.one.user.response';
import { UpdateUserUseCaseInterface } from '../usecases/interfaces/update.user.use.case.interface';
import { DeleteUserUseCaseInterface } from '../usecases/interfaces/delete.user.use.case.interface';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class UserController {
  constructor(
    @inject('CreateUserUseCase')
    private readonly _createUserUseCase: CreateUserUseCaseInterface,
    @inject('PaginateUsersUseCase')
    private readonly _paginateUsersUseCase: PaginateUsersUseCaseInterface,
    @inject('FindOneUserUseCase')
    private readonly _findOneUserUseCase: FindOneUserUseCaseInterface,
    @inject('UpdateUserUseCase')
    private readonly _updateUserUseCase: UpdateUserUseCaseInterface,
    @inject('DeleteUserUseCase')
    private readonly _deleteUserUseCase: DeleteUserUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const createdById = request.user.id;
      const { name, email, expiredAt, phone, address, permissionGroupsId } =
        request.body as CreateUserRequestProps;
      await this._createUserUseCase.execute({
        createdById,
        name,
        email,
        expiredAt,
        phone,
        address,
        permissionGroupsId,
      });
      return reply.status(201).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, qtdItemsPerPage, filter } =
        request.query as PaginateRequestProps;
      const result = await this._paginateUsersUseCase.execute({
        page,
        qtdItemsPerPage,
        filter,
      });
      return PaginateUserResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const result = await this._findOneUserUseCase.execute({
        id,
        relationships: { permissionGroups: true },
      });
      return FindOneUserResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const { name, email, expiredAt, phone, address, permissionGroupsId } =
        request.body as UpdateUserRequestProps;
      const result = await this._updateUserUseCase.execute({
        id,
        name,
        email,
        expiredAt,
        phone,
        address,
        permissionGroupsId,
      });
      return FindOneUserResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      await this._deleteUserUseCase.execute(id);
      return reply.status(200).send();
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
