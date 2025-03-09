import { inject, injectable } from 'tsyringe';
import { PaginatePermissionGroupsUseCaseInterface } from './interfaces/paginate.permission.groups.use.case.interface';
import { PermissionGroupRepositoryInterface } from './interfaces/permission.group.repository.interface';
import { PaginateRequestProps } from '@/types/types';
import { PaginatePermissionGroupProps } from '../DTOs/permission.group';

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
  }: PaginateRequestProps): Promise<PaginatePermissionGroupProps> {
    return await this._permissionGroupRepository.paginate<PaginatePermissionGroupProps>(
      {
        page,
        qtdItemsPerPage,
      },
    );
  }
}
