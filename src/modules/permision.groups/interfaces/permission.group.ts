export interface PermissionGroup {
  id: string;
  name: string;
  description?: string;
}

export interface CreatePermissionGroup {
  name: string;
  description?: string;
}
