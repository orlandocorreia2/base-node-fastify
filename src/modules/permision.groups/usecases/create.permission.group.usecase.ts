import { inject, injectable } from 'tsyringe';
import { PermissionGroupRepositoryInterface } from '../interfaces/permission.group.repository.interface';
import { UnprocessableError } from '@/error/unprocessable';
import { CreatePermissionGroup } from '../interfaces/permission.group';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';

@injectable()
export class CreatePermissionGroupUseCase
  implements CreatePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
  ) {}

  public async execute(createPermissionGroup: CreatePermissionGroup) {
    const permissionGroupAlreadyRegistered =
      await this._permissionGroupRepository.findOne({
        name: createPermissionGroup.name,
      });
    if (permissionGroupAlreadyRegistered) {
      throw new UnprocessableError('Permission Group already registered!');
    }
    return await this._permissionGroupRepository.create(createPermissionGroup);
  }
}
