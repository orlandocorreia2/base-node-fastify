import { AuctionProperty } from '../../DTOs/auction.properties';

export interface FindOneAuctionPropertiesBatchUseCaseInterface {
  execute(id: string): Promise<AuctionProperty>;
}
