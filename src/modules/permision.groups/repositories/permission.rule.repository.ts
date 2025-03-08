import { BaseRepository } from '@/shared/repository/base.repository';
import { BaseRepositoryInterface } from '@/shared/repository/interfaces/base.repository.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PermissionRuleRepository extends BaseRepository {
  constructor(
    @inject('PermissionRuleRepositoryInfra')
    _permissionRuleRepositoryInfra: BaseRepositoryInterface,
  ) {
    super();
    this._infraRepositoryInfra = _permissionRuleRepositoryInfra;
  }
}
