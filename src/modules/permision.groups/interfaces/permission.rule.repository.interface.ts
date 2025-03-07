import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { PermissionRule } from './permission.rule';

export interface PermissionRuleRepositoryInterface
  extends BaseRepositoryInterface {
  findMany(): Promise<PermissionRule[]>;
}
