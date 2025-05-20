import { CreateManyUserPermissionGroupsRepositoryProps } from '../types';

export interface UserPermissionGroupRepositoryInterface {
  deleteMany(userId: string): Promise<void>;

  createMany<T>(
    data: CreateManyUserPermissionGroupsRepositoryProps,
  ): Promise<T>;
}
