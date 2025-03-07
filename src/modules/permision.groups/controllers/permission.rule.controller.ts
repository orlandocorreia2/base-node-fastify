import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { FindAllPermissionRulesUseCaseInterface } from '../interfaces/find.all.permission.rules.use.case.interface';
import { getVersion } from '@/utils/helper';

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
      return reply
        .status(200)
        .send({ version: getVersion(), data: permissionRules });
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
