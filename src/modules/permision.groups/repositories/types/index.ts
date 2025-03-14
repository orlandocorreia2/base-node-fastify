import { CreatePermissionGroup } from '../../DTOs/permission.group';

export type CreatePermissionGroupRepositoryProps = {
  created_by_id: string;
  name: string;
  description?: string;
};

export type CreateManyPermissionGroupRulesRepositoryProps = {
  permissionGroupId: string;
  permissionRulesId: string[];
};
