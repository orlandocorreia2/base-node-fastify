import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FindAllPermissionRulesUseCaseInterface } from '../usecases/interfaces/find.all.permission.rules.use.case.interface';
import { FindAllPermissionRuleResponse } from './responses/find.all.permission.rule.response';

@injectable()
export class PermissionRuleController {
  constructor(
    @inject('FindAllPermissionRulesUseCase')
    private _findAllPermissionRulesUseCase: FindAllPermissionRulesUseCaseInterface,
  ) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    try {
      const permissionRules =
        await this._findAllPermissionRulesUseCase.execute();
      return FindAllPermissionRuleResponse.success({ permissionRules, reply });
    } catch (error) {
      FindAllPermissionRuleResponse.error(error);
    }
  }
}
