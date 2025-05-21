import { FastifyReply } from 'fastify';
import {
  PaginatePermissionGroupProps,
  PermissionGroup,
} from '../../DTOs/permission.group';
import { BaseResponse } from '../../../../shared/response/base.response';
import { User } from '../../../../modules/users/DTOs/user';
import { PermissionRule } from '../../../../modules/permision.groups/DTOs/permission.rule';

type PaginatePermissionGroupResponseProps = {
  result: PaginatePermissionGroupProps<PermissionGroup>;
  reply: FastifyReply;
};

type itemProps = {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: { user: User }[];
  rules?: PermissionRule[];
};

export class PaginatePermissionGroupResponse extends BaseResponse {
  static success({ result, reply }: PaginatePermissionGroupResponseProps) {
    const items = result.items.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        users: item.users?.map(itemUser => ({
          id: itemUser.user.id,
          name: itemUser.user.name,
        })),
        rules: item.rules?.map(itemRule => ({
          id: itemRule.permissionRule.id,
          rule: itemRule.permissionRule.rule,
        })),
      };
    });

    const paginateData =
      this.setPaginateData<PaginatePermissionGroupProps<any>>(result);
    paginateData.data.items = items;
    return reply.status(200).send(paginateData);
  }
}
