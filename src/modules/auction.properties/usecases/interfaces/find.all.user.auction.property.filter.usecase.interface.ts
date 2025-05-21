import { UserAuctionPropertyFilterProps } from '../../DTOs/user.auction.property.filter';

export interface FindAllUserAuctionPropertyFilterUseCaseInterface {
  execute(userId: string): Promise<UserAuctionPropertyFilterProps[]>;
}
