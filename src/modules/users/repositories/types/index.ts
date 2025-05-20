export type CreateUserRepositoryProps = {
  created_by_id: string;
  name: string;
  email: string;
  password: string;
  expired_at: Date;
  phone?: string;
  address?: string;
};

export type UpdateUserRepositoryProps = {
  id: string;
  name: string;
  email: string;
  password?: string;
  expired_at: Date;
  deleted_at?: Date | null;
  phone?: string;
  address?: string;
};

export type CreateManyUserPermissionGroupsRepositoryProps = {
  userId: string;
  permissionGroupsId: string[];
};
