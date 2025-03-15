import { inject, injectable } from 'tsyringe';
import { PermissionGroup } from '../DTOs/permission.group';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { FindOnePermissionGroupUseCaseInterface } from './interfaces/find.one.permission.group.use.case.interface';
import { UnprocessableError } from '../../../error/unprocessable';

@injectable()
export class FindOnePermissionGroupUseCase
  implements FindOnePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
  ) {}

  public async execute(id?: string): Promise<PermissionGroup> {
    if (!id) {
      throw new UnprocessableError('Permission group id is required.');
    }
    const result =
      await this._permissionGroupRepository.findOne<PermissionGroup>({
        filter: { id },
        relationships: { rules: true, users: true },
      });
    return result;
  }
}
