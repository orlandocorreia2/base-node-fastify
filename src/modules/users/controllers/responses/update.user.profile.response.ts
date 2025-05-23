import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { User } from '../../DTOs/user';

type UpdateUserProfileResponseProps = {
  result: User;
  reply: FastifyReply;
};

export class UpdateUserProfileResponse extends BaseResponse {
  static success({ result, reply }: UpdateUserProfileResponseProps) {
    const dataResult = {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      address: result.address,
      expiredAt: result.expired_at,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }
}
