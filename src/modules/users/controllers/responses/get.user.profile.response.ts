import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { User } from '../../DTOs/user';

type GetUserProfileResponseProps = {
  result: User;
  reply: FastifyReply;
};

export class GetUserProfileResponse extends BaseResponse {
  static success({ result, reply }: GetUserProfileResponseProps) {
    const dataResult: any = {
      id: result.id,
      name: result.name,
      email: result.email,
      expiredAt: result.expired_at,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
    if (result.phone) dataResult.phone = result.phone;
    if (result.address) dataResult.address = result.address;
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }
}
