import {
  CreatePermissionGroup,
  PermissionGroup,
} from '../../DTOs/permission.group';

export interface CreatePermissionGroupUseCaseInterface {
  execute(
    createUser: CreatePermissionGroup,
    permissionRulesId: string[],
  ): Promise<PermissionGroup>;
}
