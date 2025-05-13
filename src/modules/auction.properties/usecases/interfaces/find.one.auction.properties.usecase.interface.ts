import { AuctionProperty } from '../../DTOs/auction.properties';

export interface FindOneAuctionPropertiesUseCaseInterface {
  execute(id: string): Promise<AuctionProperty>;
}
