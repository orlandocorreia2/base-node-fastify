import { FastifyReply } from 'fastify';
import { PermissionGroup } from '../../DTOs/permission.group';
import { BaseResponse } from '../../../../shared/response/base.response';

type UpdatePermissionGroupResponseProps = {
  result: PermissionGroup;
  reply: FastifyReply;
};

export class UpdatePermissionGroupResponse extends BaseResponse {
  static success({ result, reply }: UpdatePermissionGroupResponseProps) {
    const dataResult = {
      id: result.id,
      name: result.name,
      description: result.description,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      rules: result.rules?.map(ruleItem => ({
        id: ruleItem.permissionRule.id,
        rule: ruleItem.permissionRule.rule,
        type: ruleItem.permissionRule.type,
        description: ruleItem.permissionRule.description,
      })),
      users: result.users?.map(userItem => ({
        id: userItem.user.id,
        name: userItem.user.name,
      })),
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
