import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroup } from '../interfaces/permission.group';

@injectable()
export class PermissionGroupController {
  constructor(
    @inject('CreatePermissionGroupUseCase')
    private _createPermissionGroupUseCase: CreatePermissionGroupUseCaseInterface,
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description } = request.body as CreatePermissionGroup;
      await this._createPermissionGroupUseCase.execute({ name, description });
      return reply.status(201).send();
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
