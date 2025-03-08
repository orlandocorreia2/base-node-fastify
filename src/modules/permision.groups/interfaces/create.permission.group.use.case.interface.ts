import { CreatePermissionGroup, PermissionGroup } from './permission.group';

export interface CreatePermissionGroupUseCaseInterface {
  execute(
    createUser: CreatePermissionGroup,
    permissionRulesId: string[],
  ): Promise<PermissionGroup>;
}
