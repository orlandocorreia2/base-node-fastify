import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';

type UserProfileResponseProps = {
  result: {
    id: string;
    name: string;
    email: string;
    expiredAt: string;
    phone?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
    permissionGroups?: {
      permissionGroup: {
        id: string;
        name: string;
      };
    }[];
    permissionRules?: { id: string; rule: string }[];
  };
  reply: FastifyReply;
};

export class UserProfileResponse extends BaseResponse {
  static success({ result, reply }: UserProfileResponseProps) {
    const permissionGroups: { id: string; name: string }[] = [];
    result.permissionGroups?.forEach(permissionGroupItem => {
      permissionGroups.push({
        id: permissionGroupItem.permissionGroup.id,
        name: permissionGroupItem.permissionGroup.name,
      });
    });
    const data = {
      id: result.id,
      name: result.name,
      email: result.email,
      expiredAt: result.expiredAt,
      phone: result.phone,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      permissionGroups,
    };
    const defaultData = this.setDefaultData(data);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
