import { FastifyReply } from 'fastify';
import { PermissionRule } from '../../DTOs/permission.rule';
import { BaseResponse } from '../../../../shared/response/base.response';

type FindAllPermissionGroupResponseProps = {
  permissionRules: PermissionRule[];
  reply: FastifyReply;
};

export class FindAllPermissionRuleResponse extends BaseResponse {
  static success({
    permissionRules,
    reply,
  }: FindAllPermissionGroupResponseProps) {
    const defaultData = this.setDefaultData(permissionRules);
    return reply.status(200).send(defaultData);
  }
}
