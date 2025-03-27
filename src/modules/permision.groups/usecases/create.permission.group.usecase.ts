import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable.error';
import { PermissionGroup } from '../DTOs/permission.group';
import { CreatePermissionGroupUseCaseInterface } from './interfaces/create.permission.group.use.case.interface';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
import { CreatePermissionGroupUseCaseProps } from './types';
import { PermissionGroupRuleRepositoryInterface } from '../repositories/interfaces/permission.group.rule.repository.interface';

@injectable()
export class CreatePermissionGroupUseCase
  implements CreatePermissionGroupUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
    @inject('PermissionGroupRuleRepository')
    private _permissionGroupRuleRepository: PermissionGroupRuleRepositoryInterface,
  ) {}

  public async execute({
    created_by_id,
    name,
    description,
    permissionRulesId,
  }: CreatePermissionGroupUseCaseProps) {
    const permissionGroupAlreadyRegistered =
      await this._permissionGroupRepository.findOne({ filter: { name } });
    if (permissionGroupAlreadyRegistered) {
      throw new UnprocessableError(
        'Grupo de permissão já está cadastrado na plataforma!',
      );
    }
    const permissionGroup =
      await this._permissionGroupRepository.create<PermissionGroup>({
        created_by_id,
        name,
        description,
      });
    await this._permissionGroupRuleRepository.createMany({
      permissionGroupId: permissionGroup.id,
      permissionRulesId,
    });
    return permissionGroup;
  }
}
