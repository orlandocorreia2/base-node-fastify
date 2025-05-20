import { CreateManyPermissionGroupRulesRepositoryProps } from '../types';

export interface PermissionGroupRuleRepositoryInterface {
  deleteMany(permissionGroupId: string): Promise<void>;
  createMany<T>(
    data: CreateManyPermissionGroupRulesRepositoryProps,
  ): Promise<T>;
}
