export type CreatePermissionGroupUseCaseProps = {
  created_by_id: string;
  name: string;
  description?: string;
  permissionRulesId: string[];
};

export type UpdatePermissionGroupUseCaseProps = {
  id: string;
  name: string;
  description?: string;
  permissionRulesId: string[];
};
