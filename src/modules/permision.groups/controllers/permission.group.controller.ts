import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreatePermissionGroupUseCaseInterface } from '../usecases/interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroupRequest } from '../DTOs/permission.group';
import { PaginatePermissionGroupResponse } from './responses/paginate.permission.group.response';
import { CreatePermissionGroupResponse } from './responses/create.permission.group.response';
import { FastifyAuthRequest, PaginateRequestProps } from '../../../types/types';
import { PaginatePermissionGroupsUseCaseInterface } from '../usecases/interfaces/paginate.permission.groups.use.case.interface';

@injectable()
export class PermissionGroupController {
  constructor(
    @inject('CreatePermissionGroupUseCase')
    private _createPermissionGroupUseCase: CreatePermissionGroupUseCaseInterface,
    @inject('PaginatePermissionGroupsUseCase')
    private _paginatePermissionGroupsUseCase: PaginatePermissionGroupsUseCaseInterface,
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
      CreatePermissionGroupResponse.error(error);
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, qtdItemsPerPage } = request.query as PaginateRequestProps;
      const result = await this._paginatePermissionGroupsUseCase.execute({
        page,
        qtdItemsPerPage,
      });
      return PaginatePermissionGroupResponse.success({ result, reply });
    } catch (error) {
      PaginatePermissionGroupResponse.error(error);
    }
  }
}
