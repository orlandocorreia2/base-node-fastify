import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreatePermissionGroupUseCaseInterface } from '../usecases/interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroupRequest } from '../DTOs/permission.group';
import { PaginatePermissionGroupResponse } from './responses/paginate.permission.group.response';
import { CreatePermissionGroupResponse } from './responses/create.permission.group.response';
import { PaginatePermissionGroupsUseCaseInterface } from '../usecases/interfaces/paginate.permission.groups.use.case.interface';
import { FindOnePermissionGroupUseCaseInterface } from '../usecases/interfaces/find.one.permission.group.use.case.interface';
import { FindOnePermissionGroupResponse } from './responses/find.one.permission.group.response';
import { UpdatePermissionGroupUseCaseInterface } from '../usecases/interfaces/update.permission.group.use.case.interface';
import { UpdatePermissionGroupResponse } from './responses/update.permission.group.response';
import { DeletePermissionGroupUseCaseInterface } from '../usecases/interfaces/delete.permission.group.use.case.interface';
import { DeletePermissionGroupResponse } from './responses/delete.permission.group.response';
import {
  FastifyAuthRequest,
  PaginateRequestProps,
  ParamRequestProps,
} from '../../../types/types';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class PermissionGroupController {
  constructor(
    @inject('CreatePermissionGroupUseCase')
    private readonly _createPermissionGroupUseCase: CreatePermissionGroupUseCaseInterface,
    @inject('PaginatePermissionGroupsUseCase')
    private readonly _paginatePermissionGroupsUseCase: PaginatePermissionGroupsUseCaseInterface,
    @inject('FindOnePermissionGroupUseCase')
    private readonly _findOnePermissionGroupUseCase: FindOnePermissionGroupUseCaseInterface,
    @inject('UpdatePermissionGroupUseCase')
    private readonly _updatePermissionGroupUseCase: UpdatePermissionGroupUseCaseInterface,
    @inject('DeletePermissionGroupUseCase')
    private readonly _deletePermissionGroupUseCase: DeletePermissionGroupUseCaseInterface,
  ) {}

  async create(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const created_by_id = request.user.id;
      const { name, description, permissionRulesId } =
        request.body as CreatePermissionGroupRequest;
      await this._createPermissionGroupUseCase.execute({
        created_by_id,
        name,
        description,
        permissionRulesId,
      });
      return CreatePermissionGroupResponse.success({ reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, qtdItemsPerPage, filter } =
        request.query as PaginateRequestProps;
      const result = await this._paginatePermissionGroupsUseCase.execute({
        page,
        qtdItemsPerPage,
        filter,
      });
      return PaginatePermissionGroupResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const result = await this._findOnePermissionGroupUseCase.execute(id);
      return FindOnePermissionGroupResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async update(request: FastifyAuthRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      const { name, description, permissionRulesId } =
        request.body as CreatePermissionGroupRequest;
      const result = await this._updatePermissionGroupUseCase.execute({
        id,
        name,
        description,
        permissionRulesId,
      });
      return UpdatePermissionGroupResponse.success({ result, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as ParamRequestProps;
      await this._deletePermissionGroupUseCase.execute(id);
      return DeletePermissionGroupResponse.success({ reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
