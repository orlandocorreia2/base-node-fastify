import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { User } from '../../DTOs/user';

type FindOneUserResponseProps = {
  result: User;
  reply: FastifyReply;
};

export class FindOneUserResponse extends BaseResponse {
  static success({ result, reply }: FindOneUserResponseProps) {
    const dataResult = {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      address: result.address,
      expiredAt: result.expired_at,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      permissionGroups: result.permissionGroups?.map(permissionGroupItem => ({
        id: permissionGroupItem.permissionGroup.id,
        name: permissionGroupItem.permissionGroup.name,
      })),
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.log('Error:', error);
    throw error;
  }
}
