import { PermissionGroup } from '../../DTOs/permission.group';

export interface FindOnePermissionGroupUseCaseInterface {
  execute(id?: string): Promise<PermissionGroup>;
}
