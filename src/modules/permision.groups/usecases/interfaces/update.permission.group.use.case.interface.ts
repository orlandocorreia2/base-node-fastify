import { PermissionGroup } from '../../DTOs/permission.group';
import { UpdatePermissionGroupUseCaseProps } from '../types';

export interface UpdatePermissionGroupUseCaseInterface {
  execute(data: UpdatePermissionGroupUseCaseProps): Promise<PermissionGroup>;
}
