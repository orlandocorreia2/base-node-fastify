import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FindAllPermissionRulesUseCaseInterface } from '../usecases/interfaces/find.all.permission.rules.use.case.interface';
import { FindAllPermissionRuleResponse } from './responses/find.all.permission.rule.response';
import { UnexpectedError } from '../../../error/unexpected.error';

@injectable()
export class PermissionRuleController {
  constructor(
    @inject('FindAllPermissionRulesUseCase')
    private readonly _findAllPermissionRulesUseCase: FindAllPermissionRulesUseCaseInterface,
  ) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    try {
      const permissionRules =
        await this._findAllPermissionRulesUseCase.execute();
      return FindAllPermissionRuleResponse.success({ permissionRules, reply });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
