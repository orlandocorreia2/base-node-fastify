import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';
import { CreatePermissionGroup, PermissionGroup } from './permission.group';

export interface PermissionGroupRepositoryInterface
  extends BaseRepositoryInterface {
  findOne(data: any): Promise<PermissionGroup>;
  create(data: CreatePermissionGroup): Promise<PermissionGroup>;
}
