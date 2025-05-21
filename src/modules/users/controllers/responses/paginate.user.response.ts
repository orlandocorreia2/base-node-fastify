import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { PaginateUserProps, User } from '../../DTOs/user';

type PaginateUserResponseProps = {
  result: PaginateUserProps<User>;
  reply: FastifyReply;
};

export class PaginateUserResponse extends BaseResponse {
  static success({ result, reply }: PaginateUserResponseProps) {
    const items = result.items.map((item: User) => {
      const permissionGroups: { id: string; name: string }[] = [];
      item.permissionGroups?.forEach(permissionGroupItem => {
        permissionGroups.push({
          id: permissionGroupItem.permissionGroup.id,
          name: permissionGroupItem.permissionGroup.name,
        });
      });
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        expiredAt: item.expired_at,
        phone: item.phone,
        address: item.address,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        permissionGroups,
      };
    });
    const paginateData = this.setPaginateData<PaginateUserProps<any>>(result);
    paginateData.data.items = items;
    return reply.status(200).send(paginateData);
  }
}
