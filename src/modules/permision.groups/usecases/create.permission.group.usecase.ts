import { inject, injectable } from 'tsyringe';
import { PermissionGroupRepositoryInterface } from '../interfaces/permission.group.repository.interface';
import { UnprocessableError } from '@/error/unprocessable';
import { CreatePermissionGroup } from '../interfaces/permission.group';
import { CreatePermissionGroupUseCaseInterface } from '../interfaces/create.permission.group.use.case.interface';
import { CreatePermissionGroupRule } from '../interfaces/permission.group.rule';
import { PermissionGroupRuleRepositoryInterface } from '../interfaces/permission.group.rule.repository.interface';

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
    const permissionGroup = await this._permissionGroupRepository.create(
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
