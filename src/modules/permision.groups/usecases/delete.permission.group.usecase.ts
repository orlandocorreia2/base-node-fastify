import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable';
import { PermissionGroup } from '../DTOs/permission.group';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { DeletePermissionGroupUseCaseInterface } from './interfaces/delete.permission.group.use.case.interface';

@injectable()
export class DeletePermissionGroupUseCase
  implements DeletePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
  ) {}

  public async execute(id: string) {
    if (!id) {
      throw new UnprocessableError('Permission group id is required!');
    }
    const permissionGroup =
      await this._permissionGroupRepository.findOne<PermissionGroup>({
        filter: { id },
        relationships: { users: true },
      });
    if (!permissionGroup) {
      throw new UnprocessableError('Permission group not found!');
    }
    if (permissionGroup.users?.length) {
      throw new UnprocessableError(
        'This permission group has users added, remove users from the group to be able to delete!',
      );
    }
    await this._permissionGroupRepository.delete(id);
  }
}
