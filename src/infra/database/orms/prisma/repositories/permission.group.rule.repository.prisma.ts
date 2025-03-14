import { injectable } from 'tsyringe';
import { prisma } from '../client';
import { PermissionGroupRuleRepositoryInterface } from '../../../../../modules/permision.groups/repositories/interfaces/permission.group.rule.repository.interface';
import { CreateManyPermissionGroupRulesRepositoryProps } from '../../../../../modules/permision.groups/repositories/types';

@injectable()
export class PermissionGroupRuleRepositoryPrisma
  implements PermissionGroupRuleRepositoryInterface
{
  constructor(private _model = prisma.permissionGroupRule) {}
  async deleteMany(permissionGroupId: string): Promise<void> {
    await this._model.deleteMany({
      where: { permission_group_id: permissionGroupId },
    });
  }

  async createMany<T>({
    permissionGroupId,
    permissionRulesId,
  }: CreateManyPermissionGroupRulesRepositoryProps): Promise<T> {
    const dataPermissionGroupRule = permissionRulesId.map(permissionRuleId => ({
      permission_group_id: permissionGroupId,
      permission_rule_id: permissionRuleId,
    }));
    const result = await this._model.createMany({
      data: dataPermissionGroupRule,
    });
    return result as T;
  }
}
