import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';
import {
  CreatePermissionGroupRule,
  PermissionGroupRule,
} from './permission.group.rule';

export interface PermissionGroupRuleRepositoryInterface
  extends BaseRepositoryInterface {
  createMany(data: CreatePermissionGroupRule[]): Promise<PermissionGroupRule[]>;
}
