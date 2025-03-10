import { DBPaginateProps } from '../../../types/db';

export type PermissionGroupProps = {
  id: string;
  name: string;
  description?: string;
};

export type PermissionGroup = {
  id: string;
  name: string;
  description?: string;
};

export type CreatePermissionGroup = {
  name: string;
  description?: string;
};

export type CreatePermissionGroupRequest = {
  name: string;
  description?: string;
  permissionRulesId: string[];
};

export type PaginatePermissionGroupProps<T> = DBPaginateProps<T>;
