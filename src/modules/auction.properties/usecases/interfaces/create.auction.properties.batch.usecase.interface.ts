import { MultipartFile } from '@fastify/multipart';
import { AuctionProperty } from 'modules/auction.properties/DTOs/auction.properties';

export interface CreateAuctionPropertiesBatchUseCaseInterface {
  execute(
    createdById: string,
    multipartData: MultipartFile,
  ): Promise<AuctionProperty[]>;
}
