import { PermissionGroup } from '../../DTOs/permission.group';
import { CreatePermissionGroupUseCaseProps } from '../types';

export interface CreatePermissionGroupUseCaseInterface {
  execute(data: CreatePermissionGroupUseCaseProps): Promise<PermissionGroup>;
}
