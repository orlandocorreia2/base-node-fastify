import { FastifyReply } from 'fastify';
import { BaseResponse } from '../../../../shared/response/base.response';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from '../../usecases/types';

type CreateAuctionPropertiesBatchProps = {
  result: CreateAuctionPropertiesBatchUseCaseExecuteResponseProps;
  reply: FastifyReply;
};

export class CreateAuctionPropertiesBatchResponse extends BaseResponse {
  static success({ result, reply }: CreateAuctionPropertiesBatchProps) {
    const dataResult = {
      message: result.message,
    };
    const defaultData = this.setDefaultData(dataResult);
    return reply.status(200).send(defaultData);
  }

  static error(error: unknown) {
    console.error('Error:', error);
    throw error;
  }
}
