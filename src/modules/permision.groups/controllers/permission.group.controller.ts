import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroupRequest } from '../interfaces/permission.group';

@injectable()
export class PermissionGroupController {
  constructor(
    @inject('CreatePermissionGroupUseCase')
    private _createPermissionGroupUseCase: CreatePermissionGroupUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description, permissionRulesId } =
        request.body as CreatePermissionGroupRequest;
      await this._createPermissionGroupUseCase.execute(
        {
          name,
          description,
        },
        permissionRulesId,
      );
      return reply.status(201).send();
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
