import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { PermissionGroup } from '../DTOs/permission.group';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { UpdatePermissionGroupUseCaseProps } from './types';
import { PermissionGroupRuleRepositoryInterface } from '../repositories/interfaces/permission.group.rule.repository.interface';
import { UpdatePermissionGroupUseCaseInterface } from './interfaces/update.permission.group.use.case.interface';

@injectable()
export class UpdatePermissionGroupUseCase
  implements UpdatePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
    @inject('PermissionGroupRuleRepository')
    private _permissionGroupRuleRepository: PermissionGroupRuleRepositoryInterface,
  ) {}

  public async execute({
    id,
    name,
    description,
    permissionRulesId,
  }: UpdatePermissionGroupUseCaseProps) {
    const permissionGroup = await this._permissionGroupRepository.findOne({
      filter: { id },
    });
    if (!permissionGroup) {
      throw new UnprocessableError('Grupo de permissão não encontrado.');
    }
    const anotherPermissionGroupWithSameName =
      await this._permissionGroupRepository.findOne({
        filter: { NOT: { id }, AND: { name } },
      });
    if (anotherPermissionGroupWithSameName) {
      throw new UnprocessableError(
        `Permission group with this name: ${name} has already registered!`,
      );
    }
    const permissionGroupUpdated =
      await this._permissionGroupRepository.update<PermissionGroup>({
        id,
        name,
        description,
      });
    await this._permissionGroupRuleRepository.deleteMany(id);
    await this._permissionGroupRuleRepository.createMany({
      permissionGroupId: id,
      permissionRulesId,
    });
    return await this._permissionGroupRepository.findOne<PermissionGroup>({
      filter: { id },
      relationships: { rules: true, users: true },
    });
  }
}
