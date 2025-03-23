import { inject, injectable } from 'tsyringe';
import { PermissionGroup } from '../DTOs/permission.group';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { FindOnePermissionGroupUseCaseInterface } from './interfaces/find.one.permission.group.use.case.interface';
import { NotFoundError } from '../../../error/not.found.error';

@injectable()
export class FindOnePermissionGroupUseCase
  implements FindOnePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
  ) {}

  public async execute(id: string): Promise<PermissionGroup> {
    const result =
      await this._permissionGroupRepository.findOne<PermissionGroup>({
        filter: { id },
        relationships: { rules: true, users: true },
      });
    if (!result) {
      throw new NotFoundError('Grupo de permissão não encontrado.');
    }
    return result;
  }
}
