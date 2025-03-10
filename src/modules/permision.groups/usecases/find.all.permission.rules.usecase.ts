import { inject, injectable } from 'tsyringe';
import { PermissionRuleRepositoryInterface } from '../repositories/interfaces/permission.rule.repository.interface';
import { FindAllPermissionRulesUseCaseInterface } from './interfaces/find.all.permission.rules.use.case.interface';
import { PermissionRule } from '../DTOs/permission.rule';

@injectable()
export class FindAllPermissionRulesUseCase
  implements FindAllPermissionRulesUseCaseInterface
{
  constructor(
    @inject('PermissionRuleRepository')
    private _permissionRuleRepository: PermissionRuleRepositoryInterface,
  ) {}

  public async execute() {
    return await this._permissionRuleRepository.findMany<PermissionRule>({});
  }
}
