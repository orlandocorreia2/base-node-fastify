import { PaginateProps } from '../../../types/db';

export interface PermissionGroup {
  id: string;
  name: string;
  description?: string;
}

export interface CreatePermissionGroup {
  name: string;
  description?: string;
}

export interface CreatePermissionGroupRequest {
  name: string;
  description?: string;
  permissionRulesId: string[];
}

export type PaginatePermissionGroupProps<T> = PaginateProps<T>;
