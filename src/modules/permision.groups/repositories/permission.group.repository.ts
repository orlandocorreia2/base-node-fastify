import { BaseRepository } from '@/shared/repository/base.repository';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PermissionGroupRepository extends BaseRepository {
  constructor(
    @inject('PermissionGroupRepositoryInfra')
    permissionGroupRepositoryInfra: BaseRepositoryInterface,
  ) {
    super();
    this._infraRepositoryInfra = permissionGroupRepositoryInfra;
  }
}
