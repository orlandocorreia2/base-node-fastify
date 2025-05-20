import { User } from '../../users/DTOs/user';
import { DBPaginateProps } from '../../../types/db';
import { PermissionRule } from './permission.rule';

export type PermissionGroupProps = {
  id: string;
  created_by_id: string;
  name: string;
  description?: string;
};

export type PermissionGroup = {
  id: string;
  created_by_id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: { user: User }[];
  rules?: { permissionRule: PermissionRule }[];
};

export type CreatePermissionGroup = {
  created_by_id: string;
  name: string;
  description?: string;
};

export type CreatePermissionGroupRequest = {
  name: string;
  description?: string;
  permissionRulesId: string[];
};

export type PaginatePermissionGroupProps<T> = DBPaginateProps<T>;
