import { MultipartFile } from '@fastify/multipart';
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
  createdById?: string;
  name: string;
  email: string;
  password: string;
  expiredAt: string;
  phone?: string;
  address?: string;
};

export type CreateUserUseCaseProps = {
  createdById: string;
  name: string;
  email: string;
  expiredAt: string;
  phone?: string;
  address?: string;
  permissionGroupsId?: string[];
};

export type ResetUserPasswordUseCaseProps = {
  token: string;
  password: string;
};

export type CreateUsersBatchUseCaseProps = {
  createdById: string;
  multipartData?: MultipartFile;
};

export type UpdateUserUseCaseProps = {
  id?: string;
  name: string;
  expiredAt: string;
  password?: string;
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

export type ResetUserPasswordRequestProps = {
  token: string;
  password: string;
};

export type CreateUserForgotPasswordRequestProps = {
  email: string;
};

export type UpdateUserRequestProps = {
  name: string;
  password?: string;
  expiredAt: string;
  phone?: string;
  address?: string;
  permissionGroupsId?: string[];
};

export type PaginateUserProps<T> = DBPaginateProps<T>;
