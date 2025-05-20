import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable.error';
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
    const permissionGroup =
      await this._permissionGroupRepository.findOne<PermissionGroup>({
        filter: { id },
        relationships: { users: true },
      });
    if (!permissionGroup) {
      throw new UnprocessableError('Grupo de permissão não encontrado!');
    }
    if (permissionGroup.users?.length) {
      throw new UnprocessableError(
        'Este grupo de permissões contém usuários adicionados. Para excluir remova os usuários do grupo!',
      );
    }
    await this._permissionGroupRepository.delete(id);
  }
}
