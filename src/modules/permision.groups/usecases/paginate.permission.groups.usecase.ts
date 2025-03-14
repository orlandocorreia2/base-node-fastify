import { inject, injectable } from 'tsyringe';
import { PaginatePermissionGroupsUseCaseInterface } from './interfaces/paginate.permission.groups.use.case.interface';
import { PaginateRequestProps } from '../../../types/types';
import {
  PaginatePermissionGroupProps,
  PermissionGroup,
} from '../DTOs/permission.group';
import { PermissionGroupRepositoryInterface } from '../repositories/interfaces/permission.group.repository.interface';

@injectable()
export class PaginatePermissionGroupsUseCase
  implements PaginatePermissionGroupsUseCaseInterface
{
  constructor(
    @inject('PermissionGroupRepository')
    private _permissionGroupRepository: PermissionGroupRepositoryInterface,
  ) {}

  public async execute({
    page,
    qtdItemsPerPage,
  }: PaginateRequestProps): Promise<
    PaginatePermissionGroupProps<PermissionGroup>
  > {
    const result = await this._permissionGroupRepository.paginate<
      PaginatePermissionGroupProps<PermissionGroup>
    >({
      page,
      qtdItemsPerPage,
      relationships: { users: true, rules: true },
    });
    return result;
  }
}
