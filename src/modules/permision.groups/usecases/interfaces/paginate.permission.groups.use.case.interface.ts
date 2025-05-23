import { PaginateRequestProps } from '../../../../types/types';
import {
  PaginatePermissionGroupProps,
  PermissionGroup,
} from '../../DTOs/permission.group';

export interface PaginatePermissionGroupsUseCaseInterface {
  execute(
    data: PaginateRequestProps,
  ): Promise<PaginatePermissionGroupProps<PermissionGroup>>;
}
