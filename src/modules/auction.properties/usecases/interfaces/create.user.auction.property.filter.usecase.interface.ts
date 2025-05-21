import { CreateUserAuctionPropertyFilterProps } from '../../DTOs/user.auction.property.filter';

export interface CreateUserAuctionPropertyFilterUseCaseInterface {
  execute(data: CreateUserAuctionPropertyFilterProps): Promise<void>;
}
