import { MultipartFile } from '@fastify/multipart';
import { CreateAuctionPropertiesBatchUseCaseExecuteResponseProps } from '../types';

export interface CreateAuctionPropertiesBatchUseCaseInterface {
  execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<CreateAuctionPropertiesBatchUseCaseExecuteResponseProps>;
}
