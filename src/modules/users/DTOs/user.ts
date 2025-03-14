import { DBPaginateProps } from '../../../types/db';
import { PermissionGroup } from '../../permision.groups/DTOs/permission.group';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  expired_at: Date;
  phone?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
  permissionGroups?: { permissionGroup: PermissionGroup }[];
};

export type CreateUser = {
  created_by_id?: string;
  name: string;
  email: string;
  password: string;
  expiredAt: string;
  phone?: string;
  address?: string;
};

export type CreateUserUseCaseProps = {
  created_by_id: string;
  name: string;
  email: string;
  expiredAt: string;
  phone?: string;
  address?: string;
  permissionGroupsId?: string[];
};

export type CreateUserRequestProps = {
  name: string;
  email: string;
  expiredAt: string;
  phone?: string;
  address?: string;
  permissionGroupsId?: string[];
};

export type PaginateUserProps<T> = DBPaginateProps<T>;
