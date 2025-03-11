export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  expiredAt: Date;
  phone?: string;
  address?: string;
};

export type CreateUser = {
  name: string;
  email: string;
  expiredAt: Date;
  phone?: string;
  address?: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  expiredAt: string;
  phone?: string;
  address?: string;
  permissionGroupsId?: string[];
};
