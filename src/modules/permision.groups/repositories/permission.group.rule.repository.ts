import { BaseRepository } from '../../../shared/repository/base.repository';
import { BaseRepositoryInterface } from '../../../shared/repository/interfaces/base.repository.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PermissionGroupRuleRepository extends BaseRepository {
  constructor(
    @inject('PermissionGroupRuleRepositoryInfra')
    _permissionGroupRuleRepositoryInfra: BaseRepositoryInterface,
  ) {
    super();
    this._infraRepositoryInfra = _permissionGroupRuleRepositoryInfra;
  }
}
