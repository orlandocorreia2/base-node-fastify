import { PermissionRule } from './permission.rule';

export interface FindAllPermissionRulesUseCaseInterface {
  execute(): Promise<PermissionRule[]>;
}
