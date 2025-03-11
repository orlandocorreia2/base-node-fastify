import { inject, injectable } from 'tsyringe';
import { BaseRepository } from '../../../shared/repository/base.repository';
import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';

@injectable()
export class UserPermissionGroupRepository extends BaseRepository {
  constructor(
    @inject('UserPermissionGroupRepositoryInfra')
    userPermissionGroupRepositoryInfra: BaseRepositoryInterface,
  ) {
    super();
    this._infraRepositoryInfra = userPermissionGroupRepositoryInfra;
  }
}
