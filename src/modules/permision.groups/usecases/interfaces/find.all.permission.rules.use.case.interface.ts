import { PermissionRule } from '../../DTOs/permission.rule';

export interface FindAllPermissionRulesUseCaseInterface {
  execute(): Promise<PermissionRule[]>;
}
