import { inject, injectable } from 'tsyringe';
import { UnprocessableError } from '../../../error/unprocessable';
import {
  CreatePermissionGroup,
  PermissionGroup,
} from '../DTOs/permission.group';
import { CreatePermissionGroupUseCaseInterface } from './interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroupRule } from '../DTOs/permission.group.rule';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';
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

  public async execute(
    createPermissionGroup: CreatePermissionGroup,
    permissionRulesId: string[],
  ) {
    const permissionGroupAlreadyRegistered =
      await this._permissionGroupRepository.findOne({
        name: createPermissionGroup.name,
      });
    if (permissionGroupAlreadyRegistered) {
      throw new UnprocessableError('Permission Group already registered!');
    }
    const permissionGroup =
      await this._permissionGroupRepository.create<PermissionGroup>(
        createPermissionGroup,
      );
    const permissionGroupRules: CreatePermissionGroupRule[] =
      permissionRulesId.map(permissionRuleId => ({
        permission_group_id: permissionGroup.id,
        permission_rule_id: permissionRuleId,
      }));
    await this._permissionGroupRuleRepository.createMany(permissionGroupRules);
    return permissionGroup;
  }
}
