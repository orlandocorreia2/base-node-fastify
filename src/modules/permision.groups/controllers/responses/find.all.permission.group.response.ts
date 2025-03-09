import { FastifyReply } from 'fastify';
import { PaginatePermissionGroupProps } from '../../DTOs/permission.group';
import { BaseResponse } from '@/shared/response/base.response';

type FindAllPermissionGroupResponseProps = {
  paginatePermissionGroups: PaginatePermissionGroupProps;
  reply: FastifyReply;
};

export class FindAllPermissionGroupResponse extends BaseResponse {
  static success({
    paginatePermissionGroups,
    reply,
  }: FindAllPermissionGroupResponseProps) {
    const defaultData = this.setPaginateData(paginatePermissionGroups);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.log('Error:', error);
    throw error;
  }
}
