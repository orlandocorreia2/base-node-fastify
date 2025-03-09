import { PaginateRequestProps } from '@/types/types';
import { PaginatePermissionGroupProps } from '../../DTOs/permission.group';

export interface PaginatePermissionGroupsUseCaseInterface {
  execute({
    page,
    qtdItemsPerPage,
  }: PaginateRequestProps): Promise<PaginatePermissionGroupProps>;
}
