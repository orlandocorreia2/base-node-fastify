import { inject, injectable } from 'tsyringe';
import { PermissionRuleRepositoryInterface } from '../interfaces/permission.rule.repository.interface';
import { FindAllPermissionRulesUseCaseInterface } from '../interfaces/find.all.permission.rules.use.case.interface';

@injectable()
export class FindAllPermissionRulesUseCase
  implements FindAllPermissionRulesUseCaseInterface
{
  constructor(
    @inject('PermissionRuleRepository')
    private _permissionRuleRepository: PermissionRuleRepositoryInterface,
  ) {}

  public async execute() {
    return await this._permissionRuleRepository.findMany();
  }
}
