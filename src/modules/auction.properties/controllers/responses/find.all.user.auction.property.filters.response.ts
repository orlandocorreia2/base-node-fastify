import { FastifyReply } from 'fastify';
import { UserAuctionPropertyFilterProps } from '../../DTOs/user.auction.property.filter';
import { BaseResponse } from '../../../../shared/response/base.response';

type FindAllUserAuctionPropertyFiltersResponseProps = {
  result: UserAuctionPropertyFilterProps[];
  reply: FastifyReply;
};

export class FindAllUserAuctionPropertyFiltersResponse extends BaseResponse {
  static success({
    result,
    reply,
  }: FindAllUserAuctionPropertyFiltersResponseProps) {
    const defaultData = this.setDefaultData(result);
    return reply.status(200).send(defaultData);
  }
}
